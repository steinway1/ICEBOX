class LoanApp {
  constructor(holder, settings = {}) {
    this.holder = holder
    this.filesHolder = this.holder.querySelector('#loan_files_upload')
    this.sections = [...this.holder.querySelectorAll('[data-loan-section]')]
    this.content = this.holder.querySelector('.loan-case__content')
    this.scroller = this.holder.querySelector('.loan-scroller')
    this.footer = this.holder.querySelector('.loan-case__footer')
    this.btnGroup = this.holder.querySelector('.loan-case__btn-group')
    this.evtGo = [...this.holder.querySelectorAll('[data-loan-evt="go"]')]
    this.evtToggle = [...this.holder.querySelectorAll('[data-loan-evt="toggle"]')]
    this.evtSubmit = [...this.holder.querySelectorAll('[data-loan-evt="submit"]')]
    this.evtBack = [...this.holder.querySelectorAll('[data-loan-evt="back"]')]
    this.bar = this.holder.querySelector('.loan-bar')
    this.bar_progress = this.holder.querySelector('.loan-bar__progress')
    this.flow = this.holder.querySelector('.loan-flow')
    this.finish = this.holder.querySelector('.loan-finish')
    this.maxSteps = undefined
    this.currentStep = undefined
    this.stepsLeft = undefined
    this.endReached = undefined
    this.atStart = undefined
    this.sliding = false
    this.data = {}
    this.settings = {
      scrollSpeed: settings.scrollSpeed || 600,
      easing: settings.easing || 'cubic-bezier(.39, .575, .565, 1)',
    }
    if (this.holder) {
      this.init()
    }
  }

  /**
   * Utils
   */
  get getLeftSteps() {
    return this.steps - this.currentStep
  }
  get getActiveSection() {
    return this.sections[this.currentStep]
  }
  get getActiveInput() {
    const section = this.getActiveSection
    if (section && section.contains(document.activeElement)) {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') {
        return document.activeElement
      }
    } else {
      return undefined
    }
  }
  get getLoaderHTML() {
    return `
                            <div>
                                <div>
                                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                                        <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                                        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"></path>
                                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                                    </svg>
                                </div>
                            </div>
    `
  }
  createElem(tagName, options) {
    const { className, id, innerHTML, style, attributes, toAppend } = options
    const elem = document.createElement(tagName)
    if (className) elem.className = className;
    if (id) elem.id = id;
    if (innerHTML) elem.innerHTML = innerHTML;
    if (style) {
      for (const key in options.style) { elem.style[key] = options.style[key] }
    }
    if (attributes) {
      for (const key in options.attributes) { elem.setAttribute(key, options.attributes[key]) }
    }
    if (toAppend) {
      for (const child of toArray(toAppend)) { elem.appendChild(child) }
    }
    return elem
  }
  toArray(target) {
    return Array.isArray(target) ? target : [target]
  }
  loadingOn(timeToRemove) {
    if (this.holder.querySelector('.loan-case-loader')) return
    const loader = createElem('div', {
      className: 'loan-case-loader',
      innerHTML: this.getLoaderHTML
    })
    this.holder.appendChild(loader)
    setTimeout(() => {
      this.holder.classList.add(__LOCKED)
      if (timeToRemove) {
        setTimeout(() => {
          this.holder.classList.remove(__LOCKED)
          setTimeout(() => {
            loader.remove()
          }, 350);
        }, timeToRemove);
      }
    }, 1);
  }
  loadingOff() {
    this.holder.classList.remove(__LOCKED)
    const loader = this.holder.querySelector('.loan-case-loader')
    if (loader) {
      setTimeout(() => {
        loader.remove()
      }, 350);
    }
  }
  showInputError(input, text) {
    const err = document.querySelector('.loan-input-error') ? document.querySelector('.loan-input-error') : createElem('div', {
      className: 'loan-input-error',
      innerHTML: text
    })
    input.classList.add(__INVALID)
    this.footer.prepend(err)
  }
  clearErrors() {
    const activeSection = this.getActiveSection
    const inputs = [...activeSection.querySelectorAll('input'), ...activeSection.querySelectorAll('select')]
    inputs.forEach(input => input.classList.remove(__INVALID))
    const err = this.holder.querySelector('.loan-input-error')
    if (err) err.remove()
  }
  observeBar() {
    const prevSections = this.sections.slice(0, this.currentStep).length
    const progress = (prevSections + 1) / this.steps * 100
    this.bar_progress.style.width = `${progress}%`
  }
  clearAllFields() {
    const inputs = [...this.holder.querySelectorAll('input:not([type="checkbox"])')]
    const selects = [...this.holder.querySelectorAll('select')]
    const checkboxes = [...this.holder.querySelectorAll('input[type="checkbox"]')]
    const fullArr = [...inputs, ...selects, ...checkboxes]

    inputs.forEach(input => input.value = '')
    selects.forEach(select => select.selectedIndex = 0)
    checkboxes.forEach((checkbox) => { checkbox.checked = false })
    fullArr.forEach(elem => elem.dispatchEvent(new Event('change')))
  }

  /**
   * Main
   */
  save() {
    $('#loan_form').submit();
  }
  finishMessage() {
    this.loadingOn(1000)
    setTimeout(() => {
      this.flow.style.opacity = 0
      let currentHeight = this.holder.offsetHeight
      this.holder.style.height = `${currentHeight}px`
      setTimeout(() => {
        this.finish.style.display = 'block'
        let scrollH = this.finish.scrollHeight
        this.holder.style.height = `${scrollH}px`
        setTimeout(() => {
          this.finish.style.opacity = 1
          window.scrollTo(0, 0)
          const confetti = new PageConfetti()
          confetti.push(false)
        }, 10);
      }, getTransitionTime(this.flow) + 10)
    }, 800);
  }
  slide(section) {
    section.style.display = 'flex'
    const height = section.scrollHeight
    const pxToTransform = this.sections.slice(0, this.currentStep).reduce((acc, el) => acc + el.scrollHeight, 0)
    this.content.style.height = `${height}px`
    this.scroller.style.transform = `translateY(-${pxToTransform}px)`
    this.sections.forEach(e => e.classList.remove(IS_ACTIVE))
    section.classList.add(IS_ACTIVE)
    setTimeout(() => {
      this.sliding = false
    }, getTransitionTime(this.scroller));
  }
  go(toStep) {
    if (this.holder.classList.contains(__LOCKED)) return
    const inputs = [...this.holder.querySelectorAll('input'), ...this.holder.querySelectorAll('select')]
    const step = toStep || this.currentStep || 0
    const nextStep = step + 1
    const nextSection = this.sections[nextStep]

    if (!this.sections[nextStep + 1]) {
      this.evtGo.forEach((btn) => {
        btn.innerHTML = 'Submit'
      })
    }

    if (nextSection) {
      this.sliding = true
      inputs.forEach(input => input.blur())
      this.loadingOn()
      setTimeout(() => {
        this.currentStep = nextStep
        this.slide(nextSection)
        this.loadingOff()
        this.observeBar()
      }, 600);
    } else {
      this.save()
      this.finishMessage()
    }
  }
  back(toStep) {
    if (this.holder.classList.contains(__LOCKED)) return
    this.clearErrors()
    const step = toStep || this.currentStep || 0
    const prevStep = step - 1
    const prevSection = this.sections[prevStep]
    if (prevSection) {
      this.evtGo.forEach((btn) => {
        btn.innerHTML = 'Next'
      })
      this.currentStep = prevStep
      this.slide(prevSection)
    }
  }
  validate(section) {
    const requiredTextInputs = [...section.querySelectorAll('input[type="text"][required]:not(.--disabled'), ...section.querySelectorAll('input[type="email"][required]')]
    const emptyInputs = requiredTextInputs.filter(input => !input.value)
    const numberInputs = section.querySelectorAll('input[data-validate="number"]')
    const selectInputs = section.querySelectorAll('select[required]')
    const emailInputs = section.querySelectorAll('input[data-validate="email"]')
    const zipInputs = section.querySelectorAll('input[data-validate="zip_code"]')
    const sectionID = section.dataset.loanSection

    if (requiredTextInputs.some(input => input.classList.contains(__INVALID))) return false
    if (numberInputs.length) {
      const value = numberInputs[0].value
      const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}\-\d{4}$/
      if (!regex.test(value)) {
        this.showInputError(numberInputs[0], 'Please enter a valid phone number')
        return false
      }
    }
    if (emailInputs.length) {
      const value = emailInputs[0].value
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!regex.test(value)) {
        this.showInputError(emailInputs[0], 'Please enter a valid email')
        return false
      }
    }
    if (zipInputs.length) {
      const value = zipInputs[0].value
      const regex = /^\d{5}$/
      if (!regex.test(value)) {
        this.showInputError(zipInputs[0], 'Please enter a valid zip code')
        return false
      }
    }
    if (emptyInputs.length) {
      this.showInputError(emptyInputs[0], 'This field is required')
      return false
    }
    if (selectInputs.length) {
      for (const select of selectInputs) {
        if (!select.value) {
          this.showInputError(select, 'Please select an option')
          return false
        }
      }
    }
    return true
  }
  adjustActiveSectionHeight() {
    const activeSection = this.getActiveSection
    if (activeSection) {
      const height = activeSection.scrollHeight
      this.content.style.height = `${height}px`
    }
  }
  toggle() {
    const body = document.querySelector('body')
    const headerNav = document.querySelector('.header__sub-nav')
    const welcome = document.querySelector('.subpage__welcome')
    const footerMain = document.querySelector('.footer__wrapper > .wrapper')
    const loanWelcome = document.querySelector('.loan-welcome')
    const heading = document.querySelector('.loan-case__heading')
    const backGroup = document.querySelector('.loan-case__back-group')
    const CASE_CLASS = 'loan_case'
    const elements = [headerNav, welcome, footerMain, loanWelcome]

    const hideElement = (el) => {
      const curHeight = el.scrollHeight
      el.style.height = `${curHeight}px`
      setTimeout(() => {
        el.style.overflow = 'hidden'
        el.style.height = '0px'
      }, 1);
    }
    const showElement = (el) => {
      const curHeight = window.getComputedStyle(el).getPropertyValue('height')
      const scrollHeight = el.scrollHeight
      el.style.height = `${curHeight}`
      setTimeout(() => {
        el.style.overflow = 'visible'
        el.style.height = `${scrollHeight}px`
      }, 1)
    }

    const hideLoan = () => {
      body.classList.remove(CASE_CLASS)
      for (const element of elements) {
        if (element) showElement(element)
      }

      this.scroller.style.display = 'none'
      this.content.style.height = `0px`

      if (backGroup) {
        backGroup.style.height = `0px`
      }

      if (heading) {
        heading.innerHTML = 'Welcome To the Icebox Max Approval Financing Form'
        heading.classList.remove('--big')
      }

      this.clearErrors()
      this.back(1)
      this.clearAllFields()
    }
    const showLoan = () => {
      body.classList.add('loan_case')
      for (const element of elements) {
        if (element) hideElement(element)
      }

      this.scroller.style.display = 'flex'
      this.content.style.height = `${this.sections[0].scrollHeight}px`

      if (backGroup) {
        backGroup.style.height = `${backGroup.scrollHeight}px`
      }

      if (heading) {
        heading.innerHTML = 'Financing Application'
        heading.classList.add('--big')
      }
    }

    if (body.classList.contains(CASE_CLASS)) {
      const askModal = new AskModal({
        heading: 'Are You Sure You Want To Exit Financing App?',
        subheading: 'You will lose all the progress. Keep filling out the form and get approved as soon as possible!',
        exitText: 'Exit',
        keepText: 'Keep Filling',
        exitCallback: hideLoan,
      })
      askModal.show()
    } else {
      showLoan()
    }
  }
  tabPress() {
    if (!this.sliding) {
      const activeInput = this.getActiveInput
      if (!activeInput) {
        const section = this.getActiveSection
        const inputArray = [...section.querySelectorAll('input:not(.--disabled), select:not(.--disabled)')]
        if (inputArray.length) {
          let inputToFocus
          const invalidInputs = inputArray.filter(input => input.classList.contains('--invalid'))
          if (invalidInputs.length) {
            inputToFocus = invalidInputs[0]
          } else {
            const emptyInputs = inputArray.filter(input => !input.value && input.value !== 0)
            if (emptyInputs.length) {
              inputToFocus = emptyInputs[0]
            } else {
              inputToFocus = inputArray[0]
            }
          }
          inputToFocus.focus()
        }
      } else {
        const activeInputWrap = activeInput.parentNode.closest('.loan-input-wrap')
        const nextInputWrap = activeInputWrap.nextElementSibling
        if (nextInputWrap) {
          const nextInput = nextInputWrap.querySelector('input, select')
          if (nextInput) {
            nextInput.focus()
          }
        } else {
          const firstInputWrap = this.getActiveSection.querySelector('.loan-input-wrap')
          const firstInput = firstInputWrap.querySelector('input, select')
          if (firstInput) {
            firstInput.focus()
          }
        }
      }
    }
  }

  /**
   * Bind Events
   */
  bindStepEvt() {
    this.evtGo.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const section = this.getActiveSection
        if (this.validate(section)) this.go()
      })
    })
    this.evtBack.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.back()
      })
    })
    this.evtSubmit.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        this.evtGo[0].click()
      })
    })
    this.evtToggle.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.toggle()
      })
    })

  }
  bindInputEvents() {
    const inputs = [...this.holder.querySelectorAll('input')]
    const selects = [...this.holder.querySelectorAll('select')]
    const noWebsiteCheckbox = this.holder.querySelector('#loan_employer_website')
    const inputWebsiteEmployer = this.holder.querySelector('#loan_employer_website')

    document.addEventListener('keydown', (e) => {
      const isTab = e.key === 'Tab'
      if (isTab) {
        if (document.body.classList.contains('loan_case')) {
          e.preventDefault()
          this.tabPress()
        }
      }
    })

    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        this.clearErrors()
        const parent = input.parentNode.closest('.loan-input-wrap')
        if (parent) {
          parent.classList.add('--focused')
        }
      })
      input.addEventListener('blur', () => {
        const parent = input.parentNode.closest('.loan-input-wrap')
        if (parent) {
          parent.classList.remove('--focused')
        }
      })
      input.addEventListener('keydown', (e) => {
        this.clearErrors()
        const isEnter = e.key === 'Enter'
        const isTab = e.key === 'Tab'
        if (isEnter) {
          this.evtGo[0].click()
        }
      })
    })
    selects.forEach((select) => {
      select.addEventListener('change', () => {
        this.clearErrors()
      })
    })
  }
  bindSSNInput() {
    const inputs = this.holder.querySelectorAll('input[data-format="ssn"]')
    for (const input of inputs) {
      input.addEventListener('input', (e) => {
        const value = e.target.value
        let newValue = ''
        for (let i = 0; i < value.length; i++) {
          const char = value.charAt(i)
          if (char.match(/^[0-9]$/) && newValue.length < 9) {
            newValue += char
          }
        }
        e.target.value = newValue
      })
      input.addEventListener('blur', (e) => {
        const value = e.target.value
        if (value) {
          let newValue = value.replace(/([^0-9])/g, '')
          newValue = newValue.slice(0, 3) + '—' + newValue.slice(3, 5) + '—' + newValue.slice(5)
          e.target.value = newValue
        }
      })
      input.addEventListener('focus', (e) => {
        e.target.value = e.target.value.replace(/([^0-9])/g, '')
      })
    }
  }
  bindNumberInput() {
    const inputs = this.holder.querySelectorAll('input[data-validate="number"]')
    for (const input of inputs) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault()
        let matrix = "+1 (___) ___-____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
      input.addEventListener('mouseup', event => {
        event.preventDefault()
        if (input.value.length < 4) {
          input.setSelectionRange(4, 4)
        } else {
          input.setSelectionRange(input.value.length, input.value.length)
        }
      })
    }
  }
  bindIDUpload() {
    const input = document.querySelector('#loan_id')
    const box = document.querySelector('[data-loan="files_upload"]')
    const holder = this.filesHolder
    // if (!input || !box || !holder) throw new Error('JS : Bind ID Upload : Input or Box or Holder not found')

    if (input && box && holder) {
      function processFiles(files) {
        if (!files) throw new Error('No files selected')
        files = [...files]
        if (!files.length) return
        for (const file of files) {
          if (!file.type.match('image.*')) continue
          const images = holder.querySelectorAll('img')
          for (const image of images) {
            image.remove()
          }
          let reader = new FileReader()
          reader.onload = (e) => {
            appendImage(e.target.result)
          }
          reader.readAsDataURL(file)
        }
      }

      function appendImage(imgURL) {
        const img = createElem('img', {
          style: {
            'background-image': `url(${imgURL})`
          },
        })
        holder.append(img)
      }

      box.onclick = () => { input.click() }
      input.onchange = (e) => {
        processFiles(e.target.files)
        // input.value = ''
        setTimeout(() => {
          this.adjustActiveSectionHeight()
        }, 10);
      }
      box.ondragover = (e) => {
        e.preventDefault()
        box.classList.add(IS_ACTIVE)
      }
      box.ondragleave = (e) => {
        e.preventDefault()
        box.classList.remove(IS_ACTIVE)
      }
      box.ondrop = (e) => {
        e.preventDefault()
        box.classList.remove(IS_ACTIVE)
        processFiles(e.dataTransfer.files)
      }
    }
  }
  bindDualSelect() {
    const dualArr = this.holder.querySelectorAll('[data-loan-evt="dual_select"]')
    for (const dual of dualArr) {
      const input = dual.querySelector('input:not([type="checkbox"])')
      const checkbox = dual.querySelector('input[type="checkbox"]')
      if (input && checkbox) {
        checkbox.onchange = () => {
          let isChecked = checkbox.checked
          if (isChecked) {
            input.classList.add('--disabled')
            input.setAttribute('disabled', 'disabled')
            if (input.type !== 'range') {
              input.value = ''
            }
          } else {
            input.removeAttribute('disabled')
            input.classList.remove('--disabled')
          }
        }
      }
    }

    const rangeOutputArr = [...this.holder.querySelectorAll('.custom-range__output')]
    for (const input of rangeOutputArr) {
      const parent = input.closest('[data-loan-evt="dual_select"]')
      if (parent) {
        const rangeInput = parent.querySelector('input[type="range"]')
        if (rangeInput) {
          const maxValue = rangeInput.max
          const minValue = rangeInput.min

          input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '')
          })

          input.addEventListener('blur', (e) => {
            e.target.value = Math.max(Math.min(e.target.value, maxValue), minValue)
            rangeInput.value = e.target.value
            rangeInput.dispatchEvent(new Event('input'))
          })
        }
      }
    }
  }
  bindFormatting() {
    const currencyArr = document.querySelectorAll('[data-format="currency"]')
    for (const input of currencyArr) {
      input.addEventListener('blur', () => {
        const val = input.value
        if (val.length) {
          input.value = formatAsCurrency(val)
        }
      })
    }
  }

  /**
   * Initial
   */
  setInitialVar() {
    this.steps = this.sections.length
    if (!this.steps) throw new Error('No Loan Sections Found')
    this.currentStep = 0
    this.stepsLeft = this.steps
    this.endReached = false
    this.atTheStart = true
  }
  setInitialLayout() {
    const firstSection = this.sections[0]
    const height = firstSection.scrollHeight
    this.content.style.height = `${height}px`
    this.content.style.transition = `all ${this.settings.scrollSpeed}ms ${this.settings.easing}`
    this.scroller.style.transition = `all ${this.settings.scrollSpeed}ms ${this.settings.easing}`
    // this.sections.forEach(section => section.style.display = 'flex')
  }
  init() {
    this.setInitialLayout()
    this.setInitialVar()
    this.bindStepEvt()
    this.bindInputEvents()
    this.bindNumberInput()
    this.bindSSNInput()
    this.bindIDUpload()
    this.bindDualSelect()
    this.bindFormatting()
  }
}

module.exports = LoanApp