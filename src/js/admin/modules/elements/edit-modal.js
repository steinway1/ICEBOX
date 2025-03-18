import { getTransitionTime, lockScroll, unlockScroll } from '../general/utils'
import { IS_VISIBLE } from '../general/constants'

export class EditModal {
  constructor() {
    this.init();
  }

  init() {
    if (document.querySelector('.edit-modal')) {
      Object.values(this.initFn).forEach((fn) => {
        if (typeof fn === 'function') {
          try {
            fn.call(this);
          } catch (err) {
            console.log(`edit modal init fn err : ${err.message}`);
          }
        }
      });
    }
  }

  open() {
    lockScroll();
    const modal = document.querySelector('.edit-modal');
    if (modal) {
      modal.style.display = 'block';
      setTimeout(() => {
        modal.classList.add(IS_VISIBLE);
      }, 1);
    }
  }

  close() {
    unlockScroll();
    const modal = document.querySelector('.edit-modal');
    if (modal) {
      modal.classList.remove(IS_VISIBLE);
      setTimeout(() => {
        modal.style.display = 'none';
      }, getTransitionTime(modal));
    }
  }

  initFn = {
    bindToggle: function () {
      const closeEvt = document.querySelectorAll('[data-evt="closeEditModal"]');
      const openEvt = document.querySelectorAll('[data-evt="openEditModal"]');

      closeEvt.forEach((btn) => {
        btn.onclick = () => {
          this.close();
        };
      });

      openEvt.forEach((btn) => {
        btn.onclick = () => {
          this.open();
        };
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
          const modal = document.querySelector('.edit-modal');
          if (modal) {
            modal.classList.remove(IS_VISIBLE);
            setTimeout(() => {
              modal.style.display = 'none';
            }, getTransitionTime(modal));
          }
        }
      });
    },
  };
}

export function initEditModal() {
  new EditModal()
}