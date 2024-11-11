class Backdrop {
  constructor(settings = {}) {
    this.el = createElem('div', {
      className: 'page-backdrop',
    })
    this.callback = settings.callback || null
    this.zIndex = settings.zIndex || undefined
    this.background = settings.background || undefined
    this.half = settings.half || false
    this.opacity = settings.opacity || 1
    this.show()
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) {
        this.hide()
      }
    })
  }

  show() {
    document.body.appendChild(this.el)
    if (this.zIndex) {
      this.el.style.zIndex = this.zIndex
    }
    if (this.half) {
      this.el.classList.add(__HALF)
    }
    this.el.style.display = 'block'
    setTimeout(() => {
      this.el.style.opacity = this.opacity
    }, 1);
  }

  hide(ignoreCallback = false) {
    this.el.style.opacity = '0'
    setTimeout(() => {
      this.el.style.display = 'none'
      this.el.remove()
    }, getTransitionTime(this.el));

    if (this.callback && !ignoreCallback) {
      this.callback()
    }
  }
}

module.exports = Backdrop