import { lockScroll, unlockScroll } from '../general/utils';
import { IS_VISIBLE, EVENTS } from '../general/constants';
import PopupBackdrop from '../dynamic/popup-backdrop';
import EventBus from '../../event-bus';

class PageSidebar {
  constructor() {
    this.rootEl = document.querySelector('.am-sidebar');
    if (this.rootEl !== null) {
      this.evtToggle = [...document.querySelectorAll('[data-am-evt="toggleSidebar"]')];
      this.popupInstance = null;
      window.pageSidebar = this; // Добавляем ссылку на экземпляр в глобальный объект
      this.attachEvents();
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
    eventBus.emit(EVENTS.PAGE_MENU.CLOSE)
    const amHeader = document.querySelector('.am-header');
    lockScroll();
    this.show();
    amHeader.style.transform = 'translateY(-100%)';
    this.popupInstance = new PopupBackdrop({
      zIndex: 11,
      callback: () => {
        this.close();
      },
    });
  }

  close() {
    const amHeader = document.querySelector('.am-header');
    unlockScroll();
    this.hide();
    amHeader.style.transform = 'translateY(0%)';
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
    eventBus.on(EVENTS.PAGE_SIDEBAR.CLOSE, this._closeHandler)
  }
}

export function initPageSidebar() {
  new PageSidebar();
}