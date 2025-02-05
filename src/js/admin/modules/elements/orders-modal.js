import { getTransitionTime, lockScroll, unlockScroll } from '../general/utils'
import { __VISIBLE } from '../general/constants'
import PopupBackdrop from '../dynamic/popup-backdrop'

class OrdersModal {
	constructor() {
		this.rootEl = document.querySelector('.orders-modal')
		if (!this.rootEl) return
		
		window.ordersModal = this
		this.list = document.querySelector('#orders_modal_list')
	}

	// Methods
	close() {
		unlockScroll()
		this.rootEl.classList.remove(__VISIBLE)
		if (window.orderModalBackdrop) {
			window.orderModalBackdrop.hide()
		}
		setTimeout(() => {
			this.rootEl.style.display = 'none'
		}, getTransitionTime(this.rootEl));
	}

	open() {
		lockScroll()
		this.rootEl.style.display = 'block'
		window.orderModalBackdrop = new PopupBackdrop({
			callback: () => { this.close() }
		})
		setTimeout(() => {
			this.rootEl.classList.add(__VISIBLE)
		}, 5);
	}
}

export function initOrdersModal() {
  new OrdersModal()
}