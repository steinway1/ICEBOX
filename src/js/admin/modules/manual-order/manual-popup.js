import ManualOrderForm from './manual-form'

import {
	lockScroll,
	unlockScroll,
	delay,
	getTransitionTime
} from '../general/utils'

import {
	__VISIBLE,
	__HIDDEN
} from '../general/constants'

import PopupBackdrop from '../dynamic/popup-backdrop'


export default class ManualOrderPopup {
	constructor(id = null) {
		this.rootEl = document.querySelector('#addManulOrderPopup')
		if (!this.rootEl) return

		this.orderID = id
		this.handler = this.rootEl.querySelector('.m-popup__handler')
		this.opened = false
		this.formInstance = null
		this.init()
	}
	init() {
		this.formInstance = new ManualOrderForm(this.rootEl, this, this.orderID)
		this.bindEvents()
		this.show()
	}

	get getInstance() {
		return this.rootEl
	}

	// Methods
	reset() {
		return
	}
	async show() {
		if (this.opened) {
			return
		}

		lockScroll()
		this.opened = true
		this.rootEl.style.display = 'block'
		this.formInstance._bindDocumentClick()
		this.rootEl.scrollTop = 0

		await delay(1)

		this.rootEl.classList.add(__VISIBLE)
		window.MPopupBackdrop = new PopupBackdrop({
			callback: () => { this.close() }
		})
	}
	async close() {
		if (!this.opened) {
			return
		}

		unlockScroll()
		this.opened = false
		this.rootEl.classList.remove(__VISIBLE)
		this.rootEl.classList.add(__HIDDEN)
		this.formInstance._unbindDocumentClick()

		if (window.MPopupBackdrop) {
			window.MPopupBackdrop.hide(true)
			delete window.MPopupBackdrop
		}

		if (window.manualOrderPopup) {
			delete window.manualOrderPopup
		}

		await delay(getTransitionTime(this.rootEl))

		this.rootEl.removeAttribute('style')
		this.rootEl.classList.remove(__HIDDEN)
		this.formInstance.fullReset()
	}

	// Events
	bindEvents() {
		document.addEventListener('click', (e) => {
			const target = e.target

			// Close
			if (target.closest('[data-m-popup="close"]')) {
				this.hide()
			}

			// Submit
			if (target.closest('[data-m-popup="submit"]')) {
				this.submit()
			}
		})
	}
	bindDragEvents() {
		if (window.innerWidth < 992) {
			const handler = this.handler
			const container = this.rootEl

			let startY = 0
			let currentY = 0
			// let containerHeight = container.offsetHeight
			let isDragging = false

			container.addEventListener('touchstart', (e) => {
				startY = e.touches[0].clientY
				isDragging = true
				container.style.transition = 'none'
			})

			container.addEventListener('touchmove', (e) => {
				if (!isDragging) return

				currentY = e.touches[0].clientY
				let diffY = currentY - startY

				if (diffY > 0) {
					container.style.transform = `translateY(${diffY}px)`
				}
			})

			container.addEventListener('touchend', (e) => {
				if (!isDragging) return
				isDragging = false

				let diffY = currentY - startY
				let hideOffset = container.offsetHeight * 0.5
				container.style.transition = 'all .3s cubic-bezier(.39, .575, .565, 1)'

				if (diffY > hideOffset) {
					this.rootEl.close()
				} else {
					container.style.transform = `translateY(0%)`
				}
			})
		}
	}
}