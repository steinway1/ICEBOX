class AddCartModal {
  constructor() {
    this.elem = null
    this.nameElem = null
    this.priceElem = null
    this.salePriceElem = null
    this.src = null
    this.categoryElem = null
    this.heading = 'Item added to cart.'
  }

  _setProduct() {
    const name = document.querySelector('#item_name')
    const price = document.querySelector('#current_base_price')
    const salePrice = document.querySelector('.old_price')
    const category = document.querySelector('.side-row__category')
    const src = (() => {

      const gallery = [...document.querySelectorAll('#gallery_desktop .product__gallery')].find((el) => {
        if (window.getComputedStyle(el).display !== 'none') {
          return el
        }
      })
      const img = gallery.querySelector('.product__main-gallery img')
      if (!img) throw new Error('No image found')

      return img.src
    })()

    if (!name || !price || !src) {
      throw new Error('Missing elements : name, price, src')
    }

    this.nameElem = name
    this.priceElem = price
    this.salePriceElem = salePrice ? salePrice : null
    this.src = src
    this.categoryElem = category ? category : null
  }

  _renderItemHTML() {
    const name = this.nameElem.textContent
    const price = this.priceElem.textContent
    const salePrice = this.salePriceElem ? this.salePriceElem.textContent : null
    const category = this.categoryElem ? `<div class="cart-item__category">${this.categoryElem.textContent}</div>` : ''
    const src = this.src

    return `
    <div class="cart-item">
      <div class="cart-item__media">
        <img src="${src}">
      </div>
      <div class="cart-item__details">
      ${category}
      <h3 class="cart-item-name">${name}</h3>
      <div class="cart-item__price-row">
        <span class="cart-item-price">${price}</span>
        <span class="cart-item-price_sale">$3,500</span>
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
        <button onclick="window.addCartModal.destroy()">
          <svg width="100%" height="100%" viewbox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 3L21 21" stroke="currentColor" stroke-width="3"></path>
            <path d="M21 3L3 21" stroke="currentColor" stroke-width="3"></path>
          </svg>
        </button>
      </div>
      ${this._renderItemHTML()}
      <div class="add-cart-modal__footer">
        <a href="javascript:void(0)" onclick="event.preventDefault(); window.addCartModal.destroy()" class="--sub">Back To Shopping</a>
        <a href="/cart">Go To Checkout</a>
      </div>
    </div>
    `
  }

  _createElement() {
    this._setProduct()

    this.elem = createElem('div', {
      className: 'add-cart-modal',
      innerHTML: this._renderHTML()
    })
  }

  show() {
    this._createElement()

    if (!this.elem) throw new Error('No element created')

    lockScroll()
    document.querySelector('header').appendChild(this.elem)
    this.elem.style.display = 'block'

    requestAnimationFrame(() => {
      this.elem.classList.add(__VISIBLE)
    })

    window.addCartModalBackdrop = new Backdrop({
      opacity: 0.7,
      zIndex: 90,
      callback: () => {
        this.destroy()
      }
    })
  }

  destroy() {
    if (this.elem) {

      unlockScroll()
      this.elem.classList.remove(__VISIBLE)      
      
      const backdrop = window.addCartModalBackdrop
      if (backdrop) {
        backdrop.hide(true)
        delete window.addCartModalBackdrop
      }

      setTimeout(() => {
        this.elem.remove()
        this._clear()
      }, getTransitionTime(this.elem))
    }
  }

  _clear() {
    this.elem = null
    this.nameElem = null
    this.priceElem = null
    this.salePriceElem = null
    this.src = null
    this.categoryElem = null
  }
}

module.exports = AddCartModal