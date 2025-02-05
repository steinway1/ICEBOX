import { createElem, lockScroll, unlockScroll, toArray } from '../general/utils'

export default class AskModal {
  constructor(settings = {}) {
    this.heading = settings.heading || 'Are You Sure You Want To Exit?'
    this.subheading = settings.subheading || 'You will lose all unsaved progress.'
    this.exitText = settings.exitText || 'Exit'
    this.submitText = settings.submitText || 'Keep'
    this.cancelCallback = this.destroy
    this.submitCallback = settings.submitCallback
    this.msg = settings.msg
  }

  get renderHTML() {
    return `
      <div data-evt="closeAskModal"></div>
      <div>
        <h4>${this.heading}</h4>
        <p>${this.subheading}</p>
        <div>
          <button>${this.exitText}</button>
          <button>${this.submitText}</button>
        </div>
      </div>
    `
  }

  create() {
    const modal = createElem('div', {
      className: 'ask-modal',
      innerHTML: this.renderHTML
    })
    const buttons = [...modal.querySelectorAll('button')]
    const closeEvt = [...modal.querySelectorAll('[data-evt="closeAskModal"]')]
    buttons[0].onclick = () => { this.cancelCallback() }
    buttons[1].onclick = () => {
      const submitArr = toArray(this.submitCallback)
      for (const fn of submitArr) {
        if (typeof fn === 'function') {
          fn()
        }
      }
      this.destroy()
    }
    for (const evt of closeEvt) {
      evt.onclick = () => { this.destroy() }
    }
    return modal
  }

  destroy() {
    unlockScroll()
    const modal = document.querySelector('.ask-modal')
    if (modal) {
      modal.remove()
    }
  }

  show() {
    lockScroll()
    const elem = this.create()
    document.body.appendChild(elem)
    document.addEventListener('keydown', (e) => {
      const isEnter = e.key === 'Enter' || e.keyCode === 13
      const modal = document.querySelector('.ask-modal')
      if (isEnter && modal) {
        const modalIsVisible = window.getComputedStyle(modal).getPropertyValue('display') !== 'none'
        if (modalIsVisible) {
          e.preventDefault()
          const buttons = [...modal.querySelectorAll('button')]
          buttons[1].click()
        }
      }
    })
  }
}