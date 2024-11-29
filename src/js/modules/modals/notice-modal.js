class NoticeModal {
  constructor() {
    this.init();
    this.elem = null;
    this.text = null;

    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this._bindPullDown = this._bindPullDown.bind(this);
    this._unbindPullDown = this._unbindPullDown.bind(this);
  }

  init() {
    this._bindDocumentClick();
  }

  // Events
  _bindDocumentClick() {
    document.addEventListener('click', (e) => {
      const elem = e.target.closest('[data-notice]');
      if (!elem) return;

      const text = elem.getAttribute('data-notice');
      if (!text) return;

      this.create(text);
      this.show();
    });
  }

  // Bind Pull-Down Gesture
  _bindPullDown() {
    if (!this.elem) return;

    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let isMoving = false;

    const modal = this.elem;
    const transition = window.getComputedStyle(modal).transition;

    // Touch Start
    const onTouchStart = (e) => {
      const touch = e.touches[0];
      startY = touch.clientY;
      isDragging = true;
      isMoving = false;
      modal.style.transition = 'none';
    };

    // Touch Move
    const onTouchMove = (e) => {
      if (!isDragging) return;

      currentY = e.touches[0].clientY;
      let diffY = currentY - startY;

      if (diffY > 0) {
        isMoving = true;
        e.preventDefault()
        modal.style.transform = `translateY(${diffY}px)`;
      }
    };

    // Touch End
    const onTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      if (isMoving) {
        let diffY = currentY - startY;
        let hideOffset = modal.offsetHeight * 0.2;
        modal.style.transition = 'transform 0.3s ease';

        if (diffY > hideOffset) {
          modal.style.transform = `translateY(100%)`
          this.hide()
        } else {
          modal.style.transform = `translateY(0%)`;
          modal.removeAttribute('style');
        }
      }
    };

    this._pullDownHandlers = {
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    };

    modal.addEventListener('touchstart', onTouchStart, { passive: false });
    modal.addEventListener('touchmove', onTouchMove, { passive: false });
    modal.addEventListener('touchend', onTouchEnd);
  }

  // Unbind Pull-Down Gesture
  _unbindPullDown() {
    if (!this.elem || !this._pullDownHandlers) return;

    const { onTouchStart, onTouchMove, onTouchEnd } = this._pullDownHandlers;

    this.elem.removeEventListener('touchstart', onTouchStart);
    this.elem.removeEventListener('touchmove', onTouchMove);
    this.elem.removeEventListener('touchend', onTouchEnd);

    this._pullDownHandlers = null;
  }

  // Show & Hide
  show() {
    if (this.elem) {
      lockScroll()

      this.elem.style.display = 'flex';

      requestAnimationFrame(() => {
        this.elem.classList.add(__VISIBLE);
        this._bindPullDown()

        window.noticeBackdrop = new window.Backdrop({
          half: true,
          callback: this.hide
        });
      });
    }
  }

  hide() {
    if (this.elem) {
      unlockScroll()

      this.elem.classList.remove(__VISIBLE);
      const backdrop = window.noticeBackdrop;

      if (backdrop) {
        backdrop.hide(true);
      }

      setTimeout(() => {
        if (this.elem) {
          this.elem.style.display = 'none';
          this.destroy()
        }
        this._unbindPullDown()
      }, getTransitionTime(this.elem))
    }
  }

  // Create & Destroy
  create(text = "Something went wrong...") {
    const modal = document.createElement('div');
    modal.className = 'notice-modal';
    modal.innerHTML = `<div class="notice-modal__typo">${text}</div>`;

    this.elem = modal;
    this.text = text;
    document.body.append(modal);
  }

  destroy() {
    if (this.elem) {
      this.elem.remove();
      this.elem = null;
      this.text = null;
    }
  }
}

module.exports = NoticeModal;
