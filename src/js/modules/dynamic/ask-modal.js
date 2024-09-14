class AskModal {
  constructor(settings = {}) {
    this.heading = settings.heading || 'Are You Sure You Want To Exit?'
    this.subheading = settings.subheading || 'You will lose all unsaved progress.'
    this.exitText = settings.exitText || 'Exit'
    this.keepText = settings.keepText || 'Keep'
    this.exitCallback = settings.exitCallback
    this.keepCallback = this.destroy
  }

  get renderHTML() {
    return `
      <div data-evt="closeAskModal"></div>
      <div>
        <h4>${this.heading}</h4>
        <p>${this.subheading}</p>
        <div>
          <button>${this.exitText}</button>
          <button>${this.keepText}</button>
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
    buttons[0].onclick = () => { this.destroy(); this.exitCallback() }
    buttons[1].onclick = () => { this.keepCallback() }
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
  }
}

module.exports = AskModal