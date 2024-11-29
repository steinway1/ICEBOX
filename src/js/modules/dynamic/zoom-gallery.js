class ZoomGallery {
  constructor(mediaArr, scrollIndex) {
    this.elem = null
    this.mediaArr = mediaArr
    this.scrollIndex = scrollIndex || undefined
    this.init()
  }

  // Render HTML
  _renderMediaHTML() {
    let html = ''
    for (const media of this.mediaArr) {
      const clone = media.cloneNode(true)
      clone.removeAttribute('style')
      clone.className = 'product-media'

      html += clone.outerHTML
    }
    return html
  }
  _renderInnerHTML() {
    const name = document.querySelector('#item_name')
    return `
    <div class="zoom2__wrapper">
      <div class="zoom2__scroller">
        <div class="zoom2__header">
          <h4>${name.textContent}</h4>
          <button data-zoom-close class="zoom2__close-btn"></button>
        </div>
        ${this._renderMediaHTML()}
      </div>
      <div data-zoom-close class="zoom2__footer">
        <span>Get Back</span>
      </div>
    </div>
    `
  }
  _create() {
    this.elem = document.createElement('div')
    this.elem.className = 'zoom2'
    this.elem.innerHTML = this._renderInnerHTML()
    document.body.append(this.elem)
  }
  _scrollToIndex() {
    if (this.scrollIndex) {
      const scroller = this.elem.querySelector('.zoom2__scroller')
      const mediaHeight = this.elem.querySelector('.product-media').offsetHeight
      scroller.scrollTop = mediaHeight * this.scrollIndex
    }
  }

  // Methods
  hide() {
    if (this.elem) {
      unlockScroll()
      this.elem.classList.remove(__VISIBLE)
      setTimeout(() => {
        this.elem.style.display = 'none'
        this.destroy()
      }, getTransitionTime(this.elem))
    }
  }
  open() {
    if (!this.elem) throw new Error('No element created Zoom2 ZoomGallery')

    lockScroll()
    this.elem.style.display = 'block'
    this._scrollToIndex()
    requestAnimationFrame(() => {
      this.elem.classList.add(__VISIBLE)
    })
  }

  // Events
  _bindInnerEvents() {
    if (this.elem) {
      const closeArr = [...this.elem.querySelectorAll('[data-zoom-close]')];
      closeArr.forEach((closeElem) => {
        closeElem.addEventListener('click', this.hide.bind(this));
      });
    }
  }

  // Init
  init() {
    this._create()
    this._bindInnerEvents()
    this.open()
  }
  destroy() {
    if (this.elem) {
      this.elem.remove()
      this.elem = null
    }
  }
}

module.exports = ZoomGallery