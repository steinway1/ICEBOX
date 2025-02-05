import { lockScroll, unlockScroll } from '../general/utils'
import { IS_VISIBLE, EVENTS } from '../general/constants'
import PopupBackdrop from '../dynamic/popup-backdrop'
import EventBus from '../../event-bus'

class PageSearch {
	constructor() {
		this.rootEl = document.querySelector('.am-header__mob-search');

		if (this.rootEl !== null) {
			this.evtToggle = [...document.querySelectorAll('[data-am-evt="toggleSearch"]')];
			this.popupInstance = null;
			window.pageSearch = this
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
		eventBus.emit(EVENTS.PAGE_MENU.CLOSE)
		eventBus.emit(EVENTS.PAGE_SIDEBAR.CLOSE)
		lockScroll();
		this.show();
		this.popupInstance = new PopupBackdrop({
			zIndex: 9,
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
		eventBus.on(EVENTS.PAGE_SEARCH.CLOSE, this._closeHandler)
	}
}

export function initPageSearch() {
	new PageSearch()
}