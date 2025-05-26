class TermsModal {
  constructor() {
    this.root = document.querySelector('[data-terms-modal]');
    if (!this.root) return;

    this.container = this.root.querySelector('.pg-modal__container');
    this.init();
  }

  init() {
    this.#handleToggleClick();
  }

  show() {
    lockScroll();
    this.root.style.display = 'block';
    requestAnimationFrame(() => {
      this.root.classList.add('is-active');
    });
  }

  hide() {
    unlockScroll();
    this.root.classList.remove('is-active');
    setTimeout(() => {
      this.root.style.display = 'none';
    }, getTransitionTime(this.container));
  }

  #handleToggleClick() {
    document.querySelectorAll('[data-evt="closeTermsModal"]').forEach(el => {
      el.addEventListener('click', () => {
        this.hide();
      });
    });
    document.querySelectorAll('[data-evt="openTermsModal"]').forEach(el => {
      el.addEventListener('click', () => {
        this.show();
      });
    });
  }
}

module.exports = TermsModal;
