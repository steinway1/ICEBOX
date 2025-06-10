export default class SalesModal {
  constructor() {
    this.init();
  }

  init() {
    this.renderDOM();
    if (this.modal.length) {
      this.bindEvents();
    }
  }

  renderDOM() {
    this.modal = $('.sale-history-modal');
    this.container = $('.sale-history__container');
    this.evtClose = $('[data-evt="closeSalesModal"]');
  }

  bindEvents() {
    this.evtClose.click(() => {
      this.close();
    });
  }

  open() {
    window.addEventListener(
      'keydown',
      evt => {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          this.close();
        }
      },
      { once: true },
    );
    lockScroll();
    this.modal.show();
    setTimeout(() => {
      this.modal.css({ 'background-color': 'rgba(13, 16, 26, .7)' });
      this.container.css({ transform: 'translateX(0%)' });
    }, 1);
  }

  close() {
    unlockScroll();
    this.modal.css({ 'background-color': 'rgba(13, 16, 26, 0)' });
    this.container.css({ transform: 'translateX(100%)' });
    setTimeout(() => {
      this.modal.hide();
    }, getTransitionTime(this.modal));
  }
}
