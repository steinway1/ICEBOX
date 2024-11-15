class AddCartModal {
  constructor() {
    this.heading = 'Item added to cart.'
    this.product = null
    this.elem = null
    this.backdropInstance = null
  }

  create(product) {
    this.product = product
    if (!this.product) {
      throw new Error('AddCartModal : Product not found')
    }

    this._createElem()
    this.show()
  }

  // Create Element
  _renderItemHTML() {
    const {
      title,
      image,
      price,
      show_discount,
      original_price,
      category
    } = this.product

    const renderSalePrice = () => {
      return show_discount && original_price ? `<span class="cart-item-price_sale">${original_price}</span>` : ''
    }

    return `
    <div class="cart-item">
      <div class="cart-item__media">
        <img src="${image}">
      </div>
      <div class="cart-item__details">
      <div class="cart-item__category">${category ? category : ''}</div>
      <h3 class="cart-item-name">${title}</h3>
      <div class="cart-item__price-row">
        <span class="cart-item-price">${price}</span>
        ${renderSalePrice()}
      </div>
      </div>
    </div>
    `
  }
  _renderHTML() {
    return `
    <div class="add-cart-modal__container">
      <div class="add-cart-modal__header">
        <h3>${this.heading}</h3>
        <button data-evt="closeAddCartModal">
          <svg width="100%" height="100%" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L21 21" stroke="currentColor" stroke-width="3"></path>
            <path d="M21 3L3 21" stroke="currentColor" stroke-width="3"></path>
          </svg>
        </button>
      </div>
      ${this._renderItemHTML()}
      <div class="add-cart-modal__footer">
        <a href="javascript:void(0)" data-evt="closeAddCartModal" class="--sub">Back To Shopping</a>
        <a href="/cart">Go To Checkout</a>
      </div>
    </div>
    `
  }
  _createElem() {
    this.elem = createElem('div', {
      className: 'add-cart-modal',
      innerHTML: this._renderHTML()
    })

    this.attachEvents()
  }

  // Attach Event
  attachEvents() {
    const closeEvt = this.elem.querySelectorAll('[data-evt="closeAddCartModal"]')
    for (const evt of closeEvt) {
      evt.onclick = () => { this.destroy() }
    }
  }

  // Visibility
  show() {
    if (this.elem) {
      lockScroll()
      document.querySelector('header').appendChild(this.elem)
      this.elem.style.display = 'block'

      requestAnimationFrame(() => {
        this.elem.classList.add(__VISIBLE)
      })

      this.backdropInstance = new Backdrop({
        opacity: 0.7,
        zIndex: 90,
        callback: () => {
          this.destroy()
        }
      })
    }
  }
  destroy() {
    if (this.elem) {

      unlockScroll()
      this.elem.classList.remove(__VISIBLE)

      const backdrop = this.backdropInstance
      if (backdrop) {
        backdrop.hide(true)
        this.backdropInstance = null
      }

      setTimeout(() => {
        this.elem.remove()
        this.elem = null
        this.product = null
      }, getTransitionTime(this.elem))
    }
  }
}

module.exports = AddCartModal