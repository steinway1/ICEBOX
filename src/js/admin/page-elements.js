import {
  updateInputsAllowOnlyDecimals
} from './modules/general/init-fn'

class PageElements {
  constructor() {
    this.initFnArr = [
      updateInputsAllowOnlyDecimals
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

export function initPageElements() {
  new PageElements()
}