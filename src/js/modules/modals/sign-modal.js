class SignModal {
  constructor() {
    this.rootEl = document.querySelector('.sign-modal')
    if (!this.rootEl) {
      console.error('No element with class .sign-modal found.')
      return
    }
    this.adjustEl = this.rootEl.querySelector('.sign-modal__adjust')
    this.backdrop = this.rootEl.querySelector('.sign-modal__backdrop')
    this.container = this.rootEl.querySelector('.sign-modal__container')
    this.formsArr = [...this.rootEl.querySelectorAll('form')]
    this.evtOpenArr = document.querySelectorAll('[data-evt="openSignModal"]')
    this.evtCloseArr = document.querySelectorAll('[data-evt="closeSignModal"]')
    this.evtJsToggleSign = document.querySelectorAll('.js-toggle-sign')
    this.contentArr = [...this.rootEl.querySelectorAll('[data-sign-content]')]
    this.evtSwitchContentArr = this.rootEl.querySelectorAll('[data-sign-switch]')
    this.evtTogglePassword = [...this.rootEl.querySelectorAll('[data-evt="togglePassword"]')]
    this.loader = this.rootEl.querySelector('.sign-modal__loader')
    this.jsSubmitArr = [...this.rootEl.querySelectorAll('.js-submit')]
    this.otpArr = [...this.rootEl.querySelectorAll('input.--otp')]
    this.locked = false
    this.opened = true
    this.activeContent = undefined
    this.init()
  }

  /**
   * Getters
   */
  get getActiveContent() {
    return this.contentArr.find(e => window.getComputedStyle(e).display !== 'none')
  }

  /**
   * Utils
   */
  lockModal() {
    this.rootEl.classList.add(__LOCKED)
    this.locked = true
  }
  unlockModal() {
    this.rootEl.classList.remove(__LOCKED)
    this.locked = false
  }

  /**
   * Methods
   */
  switch(contentType) {
    let section = this.contentArr.find(e => e.dataset.signContent === contentType) || this.contentArr[0]
    let activeSection = this.contentArr.find((el) => {
      let displayProperty = window.getComputedStyle(el).display
      return displayProperty !== 'none'
    })
    if (!section) throw new Error(`Expected to find section with data-sign-content=${contentType}`)
    if (activeSection == section) return
    if (contentType == 'otp') {
      this.otpArr.forEach((el) => {
        el.value = ''
      })
    }

    this.activeContent = section
    this.lockModal()
    const currentHeight = this.adjustEl.offsetHeight
    this.adjustEl.style.opacity = 0
    this.adjustEl.style.height = `${currentHeight}px`
    setTimeout(() => {
      this.contentArr.forEach(e => e.style.display = 'none')
      section.style.display = 'flex'
      const newHeight = section.scrollHeight
      this.adjustEl.style.height = `${newHeight}px`

      setTimeout(() => {
        this.adjustEl.style.opacity = '1'
        this.unlockModal()
      }, 5)
      setTimeout(() => {
        this.adjustEl.style.height = 'auto'
      }, getTransitionTime(this.adjustEl));
    }, getTransitionTime(this.adjustEl));
  }
  toggle() {
    if (this.opened) {
      this.close()
    } else {
      this.open()
    }
  }
  open() {
    if (!this.opened) {
      if (window.menu) {
        if (window.menu.state) {
          window.menu.state = false
        }
      }
      const content = this.contentArr.find(e => e.dataset.signContent == 'sms') || this.contentArr[0]
      this.opened = true
      this.rootEl.style.display = 'block'
      this.adjustEl.style.height = 'auto'
      this.contentArr.forEach(e => e.style.display = 'none')
      content.style.display = 'flex'
      // content.querySelector('input').focus()
      lockScroll()
      const show = () => {
        this.backdrop.style.opacity = 1
        this.container.classList.remove(IS_HIDDEN)
      }
      setTimeout(show, 1)
    }
  }
  close() {
    if (this.opened) {
      this.opened = false
      this.backdrop.style.opacity = 0
      this.container.classList.add(IS_HIDDEN)
      unlockScroll()
      setTimeout(() => {
        this.rootEl.style.display = 'none'
      }, getTransitionTime(this.backdrop))
    }
  }
  startLoading() {
    if (this.loader && !this.locked) {
      this.unlockModal()
      this.loader.style.display = 'flex'
      setTimeout(() => { this.loader.style.opacity = '1' }, 10)
    }
  }
  stopLoading() {
    if (this.loader) {
      this.loader.style.opacity = '0'
      setTimeout(() => {
        this.loader.style.display = 'none'
        this.locked = false
      }, getTransitionTime(this.loader))
    }
  }

  /**
   * Bind Events
   */
  bindToggleVisiblity() {
    // Open
    for (const el of this.evtOpenArr) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        this.toggle()
      })
    }
    // Close
    for (const el of this.evtCloseArr) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        this.close()
      })
    }
    // Toggle
    for (const el of this.evtJsToggleSign) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        this.toggle()
        const contentName = el.dataset.signSwitch
        if (contentName) {
          this.switch(contentName)
        }
      })
    }
  }
  bindSwitchContent() {
    for (const el of this.evtSwitchContentArr) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        const contentName = el.dataset.signSwitch
        this.switch(contentName)
      })
    }
  }
  bindOTPInput() {
    const inputs = this.otpArr
    for (const input of inputs) {
      input.addEventListener('paste', (e) => {
        const data = e.clipboardData.getData('text');
        const value = data.split("");
        if (value.length === inputs.length) {
          inputs.forEach((input, index) => (input.value = value[index]));
        }
      })
      input.addEventListener('input', (e) => {
        const value = e.target.value
        if (value.length > 1) {
          e.target.value = value.replace(/./g, '')
        }
        if (value.match(/\D/g)) {
          e.target.value = ''
        }
        if (value.length > 0) {
          const nextInput = e.target.nextElementSibling
          const valueIsDigit = value.match(/\d/g)
          if (nextInput && valueIsDigit) {
            nextInput.focus()
          }
        }
      })
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          e.target.value = ''
          const prevInput = e.target.previousElementSibling
          if (prevInput) {
            prevInput.focus()
          }
        }
        if (e.key === 'ArrowLeft') {
          const prevInput = e.target.previousElementSibling
          if (prevInput) {
            prevInput.focus()
          }
        } else if (e.key === 'ArrowRight') {
          const nextInput = e.target.nextElementSibling
          if (nextInput) {
            nextInput.focus()
          }
        }
      })
    }
  }
  bindTogglePassword() {
    for (const btn of this.evtTogglePassword) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const input = btn.parentNode.querySelector('input')
        if (input) {
          const type = input.getAttribute('type') === 'password' ? 'text' : 'password'
          const svgShow = btn.querySelector('.svg_pass_show')
          const svgHide = btn.querySelector('.svg_pass_hide')

          input.type = type
          if (svgShow && svgHide) {
            if (type === 'text') {
              svgShow.style.display = 'none'
              svgHide.style.display = 'inline'
            } else {
              svgShow.style.display = 'inline'
              svgHide.style.display = 'none'
            }
          }
        }
      })
    }
  }
  bindSubmit() {
    this.formsArr.forEach((form) => {
      $(form).on('submit', function () {
        if ($(this).parsley().isValid()) {
          this.startLoading()
        }
      })
    })
  }

  /**
   * Initialize
   */
  initialSetup() {
    this.rootEl.style.display = 'none'
    this.close()
    this.switch('phone_register')
  }
  init() {
    if (this.rootEl) {
      this.bindToggleVisiblity()
      this.bindSwitchContent()
      this.bindOTPInput()
      this.bindTogglePassword()
      this.bindSubmit()
      this.initialSetup()
      this.bindKeyPress()
      initValidators()
    }
  }
}

module.exports = SignModal