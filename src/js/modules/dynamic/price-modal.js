class PriceModal {
  constructor(card, id) {
    if (!card) {
      console.warn('Missing card')
      return
    }

    this.card = card
    this.id = id
    this.name = undefined
    this.imgSrc = undefined
    this.elem = undefined
    this.input = undefined
    this.closeArr = []
    this.submitArr = []

    this.setup()
    this.show()
  }

  signup() {
    this.reset()

    const email = this.input.value
    const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (!reg.test(String(email).toLowerCase())) {
      this.error('Invalid email address')
      return
    }

    this.elem.classList.add('--loading')

    const error = this.error.bind(this)
    const success = this.success.bind(this)

    $.ajax({
      url: '/json/signup-price',
      type: 'POST',
      data: { id: this.id, email: email },
      success: function (data) {
        var r = $.parseJSON(data);
        if (!r.error) {
          success()
        }else{
          error(r.msg);
        }
      },
      error: function () {
        error('Something went wrong')
      }
    })
  }

  error(msg) {
    this.reset()
    this.elem.classList.add('--error')
    this.elem.querySelector('.price-modal__error').textContent = msg
  }

  success(msg = 'Great! You are signed up!') {
    this.reset()
    this.elem.classList.add('--success')
    this.elem.querySelector('.price-modal__error').textContent = msg
    setTimeout(() => {
      if (window.priceModal) {
        this.destroy()
      }
    }, 1300);
  }

  reset() {
    this.elem.classList.remove('--error')
    this.elem.classList.remove('--loading')
  }

  setup() {
    const nameElem = this.card.querySelector('.product-card__name')
    const imgElem = this.card.querySelector('.product-card__img')

    if (!nameElem || !imgElem) {
      console.warn('Missing name element or img')
      return
    }

    this.name = nameElem.textContent
    this.imgSrc = imgElem.getAttribute('src')
  }

  get renderHTML() {
    return `
			<div class="price-modal__header">
				<h2>Sign up for price alerts</h2>
				<p>We'll send you an email if price is changed.</p>
			</div>
			<div class="price-modal__item">
				<img src="${this.imgSrc}" alt="">
				<div><h3>${this.name}</h3></div>
			</div>
			<div class="price-modal__main">
				<input type="text" placeholder="Your Email Address...">
        <div class="price-modal__error">Something went wrong</div>
				<div class="price-modal__footer">
					<button class="--sub">Close</button>
					<button data-evt="submit">Submit</button>
				</div>
			</div>
    `
  }

  create() {
    const modal = createElem('div', {
      className: 'price-modal',
      innerHTML: this.renderHTML
    })
    return modal
  }

  destroy() {
    unlockScroll()
    this.elem.classList.remove(__VISIBLE)

    const backdrop = window.priceModalBackdrop
    if (backdrop) {
      backdrop.hide(true)
    }

    setTimeout(() => {
      this.elem.remove()
      window.priceModalBackdrop = undefined
      window.signPriceModal = undefined
    }, getTransitionTime(this.elem));
  }

  show() {
    lockScroll()
    this.elem = this.create()
    this.input = this.elem.querySelector('input')
    document.body.appendChild(this.elem)
    this.input.focus()
    this.closeArr.push(this.elem.querySelector('.--sub'))
    this.submitArr.push(this.elem.querySelector('[data-evt="submit"]'))

    for (const elem of this.closeArr) {
      elem.addEventListener('click', () => {
        this.destroy()
      })
    }

    for (const elem of this.submitArr) {
      elem.addEventListener('click', () => {
        this.signup()
      })
    }

    this.input.addEventListener('input', () => {
      this.reset()

      if (this.input.value) {
        this.elem.classList.add('--unlocked')
      } else {
        this.elem.classList.remove('--unlocked')
      }
    })

    this.input.addEventListener('keydown', (e) => {
      const keyIsEnter = e.key === 'Enter'
      if (keyIsEnter && this.input.value) {
        e.preventDefault()
        this.submitArr[0].click()
      }
    })

    requestAnimationFrame(() => {
      this.elem.classList.add(__VISIBLE)
      window.priceModalBackdrop = new Backdrop({
        half: true,
        callback: () => {
          this.destroy()
        }
      })
    })
  }
}

module.exports = PriceModal