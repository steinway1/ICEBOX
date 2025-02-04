import { getTransitionTime } from '../../modules/general/utils'
import { lockScroll, unlockScroll } from '../../modules/general/utils'
import { __FALSE, __TRUE, __FADE } from '../../modules/general/constants'

export default class LockPin {
  constructor(settings = {}) {
    this.code = settings.code || 1234;
    this.callback = settings.callback || undefined;
    this.maxLength = this.code.toString().length;
    this.unlockTime = settings.unlockTime || 600;
    this.allowClose = settings.allowClose || false;
    this.currentPin = [];
    this.isLocked = false;

    // Handlers storage for removing event listeners later
    this.buttonHandlers = new Map();
    this.closeHandler = null;
    this.submitHandler = null;
    this.keydownHandler = null;
  }

  /**
   * Utils
   */
  renderHTML() {
    let html = `
    <div class="pin-lock">
      <div class="pin-lock__wrapper">
        <div class="pin-lock__holder">
          <div class="pin-lock__title-group">
            <h3>Enter PIN Code</h3>
            <span>This page is locked with pin.</span>
          </div>
          <div data-pin-output class="pin-lock__output">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div class="pin-lock__btn-grid">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
            <button>6</button>
            <button>7</button>
            <button>8</button>
            <button>9</button>
            <button data-pin-evt="close">Close</button>
            <button>0</button>
            <button data-pin-evt="submit">Enter</button>
          </div>
        </div>
      </div>
    </div>
    `;
    return html;
  }

  appendScreen() {
    document.body.insertAdjacentHTML('beforeend', this.renderHTML());
  }

  setElements() {
    this.holder = document.querySelector('.pin-lock');
    this.btnArr = [...this.holder.querySelectorAll('button')];
    this.output = this.holder.querySelector('[data-pin-output]');
    this.outputSpanArr = [...this.output.querySelectorAll('span')];
    this.evtClose = this.holder.querySelector('[data-pin-evt="close"]');
    this.evtSubmit = this.holder.querySelector('[data-pin-evt="submit"]');
    this.btnArrFiltered = this.btnArr.filter((btn) => {
      return !btn.dataset.pinEvt;
    });
  }

  /**
   * Methods
   */
  unlock() {
    unlockScroll();
    this.output.classList.remove(__FALSE);
    this.output.classList.add(__TRUE);
    setTimeout(() => {
      this.holder.classList.add(__FADE);
      setTimeout(() => {
        this.destroy();
      }, getTransitionTime(this.holder));
    }, this.unlockTime);

    if (this.callback !== undefined) {
      this.callback();
    }
  }

  reset() {
    this.currentPin = [];
    this.update();
    this.isLocked = false;
    removeClasses(this.output, __FALSE, __TRUE);
  }

  update() {
    const pin = this.currentPin;
    const length = pin.length;
    if (length === 0) {
      this.outputSpanArr.forEach((span) => {
        span.innerHTML = '';
      });
    } else if (length <= this.maxLength) {
      this.outputSpanArr.forEach((span, i) => {
        if (i < length) {
          span.innerHTML = pin[i];
        } else {
          span.innerHTML = '';
        }
      });
    }
    if (length === this.maxLength) {
      this.submit();
    }
  }

  submit() {
    if (this.currentPin.length > 0) {
      this.isLocked = true;
      if (this.currentPin.join('') == this.code) {
        this.unlock();
      } else {
        this.output.classList.add(__FALSE);
        setTimeout(() => {
          this.reset();
        }, 700);
      }
    }
  }

  destroy() {
    // Remove event listeners
    this.removeEventListeners();

    // Remove the holder from the DOM
    if (this.holder) {
      this.holder.remove();
    }
  }

  /**
   * Attach Events
   */
  attachButtonClick() {
    for (const btn of this.btnArrFiltered) {
      const handler = (e) => {
        if (!this.isLocked) {
          const num = Number(e.target.innerHTML);
          this.currentPin.push(num);
          this.update();
        }
      };
      btn.addEventListener('click', handler);
      this.buttonHandlers.set(btn, handler);
    }

    // Close button handler
    if (this.evtClose) {
      this.closeHandler = () => {
        if (!this.isLocked) {
          this.destroy();
          unlockScroll();
        }
      };
      this.evtClose.addEventListener('click', this.closeHandler);
    }

    // Submit button handler
    if (this.evtSubmit) {
      this.submitHandler = () => {
        if (!this.isLocked) {
          this.submit();
        }
      };
      this.evtSubmit.addEventListener('click', this.submitHandler);
    }
  }

  attachDocEvents() {
    this.keydownHandler = (e) => {
      if (this.holder) {
        if (!this.isLocked) {
          // e.preventDefault(); // Be cautious with preventDefault
          const key = e.key;

          if (key === 'Escape' && this.allowClose) {
            this.destroy();
            unlockScroll();
            return;
          }

          if (key === 'Backspace') {
            if (this.currentPin.length > 0) {
              this.currentPin.pop();
              this.update();
            }
          } else if (key === 'Enter') {
            this.submit();
          } else if (key >= '0' && key <= '9') {
            if (this.currentPin.length < this.maxLength) {
              this.currentPin.push(Number(key));
              this.update();
            }
          }
        }
      }
    };
    document.addEventListener('keydown', this.keydownHandler);
  }

  removeEventListeners() {
    // Remove button click handlers
    for (const [btn, handler] of this.buttonHandlers) {
      btn.removeEventListener('click', handler);
    }
    this.buttonHandlers.clear();

    // Remove close and submit handlers
    if (this.evtClose && this.closeHandler) {
      this.evtClose.removeEventListener('click', this.closeHandler);
      this.closeHandler = null;
    }
    if (this.evtSubmit && this.submitHandler) {
      this.evtSubmit.removeEventListener('click', this.submitHandler);
      this.submitHandler = null;
    }

    // Remove document keydown handler
    if (this.keydownHandler) {
      document.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = null;
    }
  }

  push() {
    lockScroll();
    this.appendScreen();
    this.setElements();
    this.attachButtonClick();
    this.attachDocEvents();
  }
}