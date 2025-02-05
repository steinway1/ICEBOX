class PageTip {
  constructor() {
    this.tipElem = null
    this.handleHover()
  }

  handleHover() {
    document.querySelectorAll('[data-tip]').forEach(elem => {
      elem.addEventListener('mouseenter', e => {
        this.createTip()
        this.tipElem.textContent = elem.dataset.tip
        this.setTipPosition(elem)
      })

      elem.addEventListener('mouseleave', e => {
        this.destroyTip()
      })
    })
  }

  createTip(elem) {
    if (!this.tipElem) {
      this.tipElem = document.createElement('div')
      this.tipElem.classList.add('page-tip')
      document.body.append(this.tipElem)
    }
  }

  setTipPosition(elem) {
    const { left, top, width, height } = elem.getBoundingClientRect()
    const tipWidth = this.tipElem.getBoundingClientRect().width
    const tipHeight = this.tipElem.getBoundingClientRect().height
    const elemHeight = elem.offsetHeight
    const elemWidth = elem.offsetWidth

    let topPosition = top - tipHeight - 14
    let leftPosition = (left + (elemWidth / 2)) - (tipWidth / 2)

    if (topPosition < 100) {
      topPosition = top + elemHeight + 14
      this.tipElem.classList.add('--top')
    }

    if (leftPosition < 0) {
      leftPosition = left
      this.tipElem.classList.add('--left')
    }

    this.tipElem.style.top = `${topPosition}px`
    this.tipElem.style.left = `${leftPosition}px`

    // let tipLeft = left + width / 2 - tipWidth / 2
    // if (tipLeft + tipWidth > window.innerWidth) {
    //   tipLeft = window.innerWidth - tipWidth
    // }
    // if (tipLeft < 0) {
    //   tipLeft = 0
    // }

    // let tipTop = top - tipHeight - 10
    // if (tipTop < 0) {
    //   tipTop = top + height + 10
    // }

    // this.tipElem.style.left = `${tipLeft}px`
    // this.tipElem.style.top = `${tipTop}px`
  }

  destroyTip() {
    if (this.tipElem) {
      this.tipElem.remove()
      this.tipElem = null
    }
  }
}

export function initPageTips() {
  new PageTip()
}