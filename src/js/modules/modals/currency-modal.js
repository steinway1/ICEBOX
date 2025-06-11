import $ from 'jquery';
import { getEvtDOM, elemDisplayed, lockScroll, unlockScroll, getTransitionTime } from '../utils';

export default class CurrencyModal {
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.init();
  }

  init() {
    this.renderDOM();
    this.bindEvents();
  }

  renderDOM() {
    this._ = $('.cur-modal');
    this.backdrop = this._.find('.cur-modal__backdrop');
    this.container = this._.find('.cur-modal__container');
    this.evtToggle = getEvtDOM('toggleCurrency');
    this.input = this._.find('input');
  }

  bindEvents() {
    if (this.evtToggle && this.evtToggle.length) {
      $(this.evtToggle).each((i, toggle) => {
        toggle.onclick = () => this.toggle();
      });
    }

    if (this.input.length) {
      this.input.on('keyup', () => this.intraSearch(this.input));
    }
  }

  toggle() {
    this.input.val('').trigger('keyup');
    if (this._.length) {
      if (elemDisplayed(this._)) {
        this.close();
      } else {
        this.open();
      }
    }
  }

  open() {
    lockScroll();
    this._.show();
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 });
      this.container.css({ transform: 'translateX(0%)' });
    }, 1);
  }

  close() {
    unlockScroll();
    this.backdrop.css({ opacity: 0 });
    this.container.css({ transform: 'translateX(100%)' });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(this.backdrop));
  }

  intraSearch(input) {
    const val = input.val().toLowerCase();
    const arr = [...$('.cur-item')];
    arr.forEach(item => {
      const txt = $(item).find('.cur-item__name').text().toLowerCase();
      if (txt.includes(val)) {
        $(item).show();
      } else {
        $(item).hide();
      }
    });
  }
}
