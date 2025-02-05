import { bindUnlockDataLockedInput } from './modules/general/events'

class PageEvents {
	constructor() {
		this.initFnArr = [
			bindUnlockDataLockedInput
		]
		this.#init()
	}
	#init() {
		for (const fn of this.initFnArr) {
			if (fn && typeof fn === 'function') {
				fn()
			}
		}
	}
}

export function initPageEvents() {
	new PageEvents()
}