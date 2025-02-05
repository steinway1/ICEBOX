import { lockScroll, unlockScroll } from '../general/utils';
import { IS_VISIBLE, EVENTS } from '../general/constants';
import PopupBackdrop from '../dynamic/popup-backdrop';
import EventBus from '../../event-bus';

class PageMenu {
  constructor() {
    this.rootEl = document.querySelector('.am-header__page-nav');
    if (this.rootEl !== null) {
      this.evtToggle = [...document.querySelectorAll('[data-am-evt="togglePageNav"]')];
      this.popupInstance = null;
      window.pageMenu = this; // Добавляем ссылку на экземпляр в глобальный объект
      this.attachEvents();
      this.bindGlobalEvents();
    }
  }

  hide() {
    this.rootEl.classList.remove(IS_VISIBLE);
  }

  show() {
    this.rootEl.classList.add(IS_VISIBLE);
  }

  open() {
    const eventBus = EventBus.getInstance()
    eventBus.emit(EVENTS.PAGE_SEARCH.CLOSE)
    eventBus.emit(EVENTS.PAGE_SIDEBAR.CLOSE)
    lockScroll();
    this.show();
    this.popupInstance = new PopupBackdrop({
      zIndex: 10,
      callback: () => {
        this.close();
      },
    });
  }

  close() {
    unlockScroll();
    this.hide();
    if (this.popupInstance) {
      this.popupInstance.hide();
      this.popupInstance = null;
    }
  }

  attachEvents() {
    this.evtToggle.forEach((el) => {
      el.onclick = () => {
        if (this.rootEl.classList.contains(IS_VISIBLE)) {
          this.close();
        } else {
          this.open();
        }
      };
    });
  }
  bindGlobalEvents() {
    const eventBus = EventBus.getInstance()
    this._closeHandler = () => {
      this.close()
    }
    eventBus.on(EVENTS.PAGE_MENU.CLOSE, this._closeHandler)
  }
}

export function initPageMenu() {
  new PageMenu();
}