class SellWatch {
  constructor() {
    this.form = document.querySelector('form#sell_my_watch')
    if (!this.form) {
      return
    }
    this.sectionsArr = [...document.querySelectorAll('[data-ask-section]')]
    this.progressBar = document.querySelector('.ask-page__progress-bar')
    this.currentStepElem = document.querySelector('[data-step-current]')
    this.countStepElem = document.querySelector('[data-step-count]')
    this.contentContainer = document.querySelector('.ask-page__quiz-content')
    this.adjustContainer = document.querySelector('.ask-page__quiz-adjust')

    this.focusedEl = undefined
    this.watchBrand = {
      name: undefined
    }
    this.uploadInput = this.form.querySelector('input[type="file"]')
    this.regExp = {
      rolex: /\brolex\b/i,
      audemars: /\baudemars\b/i,
      richard: /\brichard\b/i,
      patek: /\bpatek\b/i,
      cartier: /\bcartier\b/i,
      breitling: /\bbreitling\b/i
    }

    this.locked = false
    this.steps = this.sectionsArr.length
    this.currentStep = 1
    this.activeSection = this.sectionsArr[0]
    this.endReached = false
    this.atTheStart = true
    this.init()
  }

  /**
   * Getters
   */
  get getActiveSection() {
    return this.activeSection
  }
  get getCurrentStep() {
    return this.currentStep
  }
  get getFocusedEl() {
    return this.focusedEl
  }

  /**
   * Methods
   */
  toggleSectionStatus(section, condition) {
    if (condition === false) {
      section.classList.remove(__VALID)
    } else {
      section.classList.add(__VALID)
    }
    const btn = [...section.querySelectorAll('[data-sell-evt="next"]')]
    btn.forEach(btn => btn.disabled = !condition)
  }
  validateSection(section) {
    section = this.getActiveSection

    const
      requiredArr = [...section.querySelectorAll('[required]:not([disabled])')],
      radioArr = [...section.querySelectorAll('input[type="radio"]:not([disabled])')],
      checkboxArr = [...section.querySelectorAll('input[type="checkbox"]:not([disabled])')],
      inputArr = [...section.querySelectorAll('input:not([type="checkbox"]):not([type="radio"])')],
      selectArr = [...section.querySelectorAll('select[required]')],
      phoneArr = [...section.querySelectorAll('[data-validate="phone"]')],
      fileArr = [...section.querySelectorAll('input[type="file"]')]

    const radioArrByName = Array.from(
      new Set(radioArr.map(radio => radio.name)),
      name => radioArr.filter(radio => radio.name === name)
    )

    if (requiredArr.some(input => !input.value)) {
      this.toggleSectionStatus(section, false)
      return false
    }

    for (const radioGroup of radioArrByName) {
      if (radioGroup.every(radio => !radio.checked)) {
        this.toggleSectionStatus(section, false)
        return false
      }
    }

    if (checkboxArr.length && checkboxArr.every(checkbox => !checkbox.checked)) {
      this.toggleSectionStatus(section, false)
      return false
    }

    if (phoneArr.length) {
      for (const input of phoneArr) {
        const value = input.value
        const valueDigits = value.replace(/\D/g, '').length
        const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}\-\d{4}$/
        if (!regex.test(value) && valueDigits < 11) {
          this.toggleSectionStatus(section, false)
          return false
        }
      }
    }

    for (const fileInput of fileArr) {
      const files = fileInput.files
      if (!files.length) {
        this.toggleSectionStatus(section, false)
        return false
      }
    }

    this.toggleSectionStatus(section, true)
    return true
  }
  arrangeModels(string) {
    const
      inputArr = [...this.form.querySelectorAll('input[type="radio"][name="model"]')],
      groupInputArr = inputArr.filter(input => input.dataset.group),
      filteredArr = groupInputArr.filter(input => { return string.toLowerCase().includes(input.dataset.group) }),
      modelGrid = this.form.querySelector('[data-sell-grid="model"]'),
      modelInput = this.form.querySelector('input#watch_model'),
      modelInputParent = modelInput.closest('.survey-box__named-grid')

    inputArr.forEach(input => input.checked = false)
    // inputArr.forEach(input => input.dispatchEvent(new Event('change')))
    modelInput.value = ''
    modelInput.dispatchEvent(new Event('input'))

    if (!filteredArr.length) {
      modelGrid.style.display = 'none'
      modelInputParent.style.display = 'flex'
      modelInput.disabled = false
      inputArr.forEach(input => {
        input.disabled = true
        input.checked = false
        // input.dispatchEvent(new Event('change'))
      })
    } else {
      modelGrid.style.display = 'flex'
      modelInputParent.style.display = 'none'
      modelInput.disabled = true
      inputArr.forEach(input => {
        const label = input.closest('label')
        input.disabled = false
        input.checked = false
        if (!filteredArr.includes(input) && input.value !== 'Other') {
          if (input.value) {
            label.style.display = 'none'
          }
        } else {
          label.style.display = 'block'
        }
        // input.dispatchEvent(new Event('change'))
      })
    }
  }

  /**
   * Utils
   */
  observeStepsElements() {
    this.currentStepElem.innerHTML = this.currentStep
  }
  observeBarElements() {
    const elements = this.progressBar.querySelectorAll('span')
    elements.forEach((element, index) => {
      if (index < this.currentStep) {
        element.classList.add(__ACTIVE)
      } else {
        element.classList.remove(__ACTIVE)
      }
    })
  }
  scrollToForm() {
    if (this.form) {
      const headerHeight = parseInt(window.getComputedStyle(document.querySelector('header')).getPropertyValue('height'))
      const boundTop = this.form.getBoundingClientRect().top
      if ((boundTop - headerHeight) < -30) {
        const distance = (window.scrollY + this.form.getBoundingClientRect().top) - (headerHeight + 70)
        zenscroll.toY(distance)
      }
    }
  }
  dispatchFocusEvent(elem) {
    if (elem) {
      const tag = elem.tagName
      switch (tag) {
        case 'INPUT' || 'TEXTAREA':
          const type = elem.type
          if (type === 'radio' || type === 'checkbox') {
            elem.click()
          } else {
            if (type === 'file') {
              elem.click()
            } else {
              elem.focus()
            }
          }
          break;
        case 'SELECT':
          elem.focus()
          break;
        default:
          elem.dispatchEvent(new Event('focus'))
          break;
      }
    }
  }

  /**
   * Events
   */
  slide(section, activeSection, number) {
    const sectionIndex = this.sectionsArr.indexOf(section)
    const activeSectionIndex = this.sectionsArr.indexOf(activeSection)

    let fromTranslate = 'translateY(24px)'
    let toTranslate = 'translateY(-24px)'

    if (activeSectionIndex > sectionIndex) {
      fromTranslate = 'translateY(-24px)'
      toTranslate = 'translateY(24px)'

      const inputs = [...activeSection.querySelectorAll('input')]
    }

    this.locked = true
    activeSection.style.opacity = 0
    activeSection.style.pointerEvents = 'none'
    activeSection.style.transform = toTranslate
    section.style.opacity = 0
    section.style.pointerEvents = 'none'
    section.style.transform = fromTranslate
    setTimeout(() => {
      activeSection.style.display = 'none'
      activeSection.classList.remove(__ACTIVE)
      section.style.display = 'flex'
      section.classList.add(__ACTIVE)
      setTimeout(() => {
        section.style.opacity = 1
        section.style.transform = 'translateY(0px)'
        section.style.pointerEvents = 'auto'

        this.locked = false
        this.activeSection = section
        this.currentStep = number
        this.observeStepsElements()
        this.observeBarElements()

        if (section === this.sectionsArr[this.sectionsArr.length - 1]) {
          this.form.submit()
        }
      }, 30)
    }, getTransitionTime(activeSection))
  }
  finish() {
    const confetti = new PageConfetti()
    confetti.push()
  }
  go(number) {
    if (!this.locked) {
      const section = this.sectionsArr[number - 1]
      const activeSection = this.getActiveSection

      if (!section) {
        const error = number < 1 ? 'Section number cannot be less than 1' : 'Section number cannot be greater than ' + this.sectionsArr.length
        throw new Error(error)
      }
      if (!activeSection) {
        throw new Error('No active section')
      }

      if (section !== activeSection) {
        this.slide(section, activeSection, number)
        this.scrollToForm()
        this.focusedEl = undefined
      }
    }
  }


  /**
   * Bind Events
   */
  bindToggleStepsControls() {
    for (const section of this.sectionsArr) {
      const inputs = [...section.querySelectorAll('input, select')]
      inputs.forEach((input) => {
        const isCheckboxOrRadio = input.type === 'checkbox' || input.type === 'radio' || input.type === 'file'
        if (isCheckboxOrRadio) {
          input.addEventListener('change', (e) => {
            this.validateSection(section)
          })
        } else {
          input.addEventListener('input', (e) => {
            this.validateSection(section)
          })
        }
      })
    }
  }
  bindDualSelect() {
    const dualArr = [...this.form.querySelectorAll('input[data-dual]')]
    for (const input of dualArr) {
      const
        name = input.name,
        dualName = input.dataset.dual,
        nameInputArr = [...this.form.querySelectorAll(`input[name="${name}"]`)],
        holder = this.form.querySelector(`div[data-dual="${dualName}"]`)

      if (holder) {
        const select = holder.querySelector('select, input')
        if (select) {
          nameInputArr.forEach((nameInput) => {
            nameInput.addEventListener('change', () => {
              if (input.checked) {
                select.disabled = false
                holder.style.display = 'flex'
              } else {
                select.disabled = true
                holder.style.display = 'none'
              }
            })
          })
        }
      }
    }
  }
  bindBrandSelect() {
    const brandSelectArr = [...this.form.querySelectorAll('*[name="brand"]')]
    const elsToName = [...this.form.querySelectorAll('[data-sell-brand]')]
    for (const input of brandSelectArr) {
      input.addEventListener('change', (e) => {
        if (input.disabled) return
        const value = input.value
        if (value && value.toLowerCase() !== 'other') {
          this.watchBrand.name = value
          elsToName.forEach(el => el.innerHTML = this.watchBrand.name)
        } else {
          this.watchBrand.name = undefined
          elsToName.forEach(el => el.innerHTML = 'your brand')
        }

        // Setup models
        this.arrangeModels(value)
      })
    }
  }
  bindPhoneInput() {
    const inputs = [...this.form.querySelectorAll('input[data-validate="phone"]')]
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
  bindCurrencyInput() {
    const inputArr = [...this.form.querySelectorAll('input[data-format="currency"]')]
    for (const input of inputArr) {
      input.addEventListener('blur', () => {
        if (input.value) {
          input.value = formatAsCurrency(input.value)
        }
      })
    }
  }
  bindHandlers() {
    const nextArr = [...this.form.querySelectorAll('[data-sell-evt="next"]')]
    const backArr = [...this.form.querySelectorAll('[data-sell-evt="back"]')]

    for (const btn of nextArr) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        if (!btn.disabled) {
          this.go(this.getCurrentStep + 1)
        }
      })
    }

    for (const btn of backArr) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        if (!btn.disabled) {
          this.go(this.getCurrentStep - 1)
        }
      })
    }
  }
  bindSetFocusedElement() {
    const inputs = [...this.form.querySelectorAll('input, select, textarea')]
    for (const input of inputs) {
      input.addEventListener('change', () => { this.focusedEl = input })
      input.addEventListener('focus', () => { this.focusedEl = input })
    }
  }
  bindKeyEvents() {
    document.addEventListener('keydown', (e) => {
      if (this.locked) return
      if (!this.getActiveSection) return

      const section = this.getActiveSection
      const key = e.key
      const keyIsTab = key === 'Tab'
      const keyIsEnter = key === 'Enter'
      const isBackspace = key === 'Backspace'

      if (isBackspace) {
        if (!document.activeElement || !document.activeElement.contains(section)) return
        const btn = section.querySelector('[data-sell-evt="back"]')
        if (btn && !btn.disabled) {
          e.preventDefault()
          btn.click()
        }
      }

      if (keyIsEnter) {
        const btn = section.querySelector('[data-sell-evt="next"]')
        if (btn) {
          e.preventDefault()
          if (!btn.disabled) {
            btn.click()
          }
        }
      }

      if (keyIsTab) {
        e.preventDefault()
        const focusedEl = this.getFocusedEl
        const inputs = [...section.querySelectorAll('input, select, textarea')].filter((input) => {
          if (!input.disabled) {
            const selectBox = input.parentNode.closest('.survey-select')
            if (selectBox) {
              if (selectBox.style.display !== 'none') {
                return input
              }
            } else {
              return input
            }
          }
        }).sort((a, b) => a.compareDocumentPosition(b) - 2)
        let elem

        if (!focusedEl) {
          elem = inputs[0]
        } else {
          const elemWithinSection = inputs.includes(focusedEl)
          if (elemWithinSection) {
            const nextElem = inputs[inputs.indexOf(focusedEl) + 1]
            if (nextElem) {
              elem = nextElem
            } else {
              elem = inputs[0]
            }
          } else {
            elem = inputs[0]
          }
        }

        this.dispatchFocusEvent(elem)
      }
    })
  }
  bindSubmit() {
    $(this.form).on('submit', function (e) {
      e.preventDefault();
      var form = $(this);
      var formData = new FormData(this);
      var actionUrl = form.attr('action');
      $.ajax({
        url: actionUrl,
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
          var r = $.parseJSON(data);
          if (!r.error) {
            this.finish()
          } else {
            //show error message 
            alert(r.msg);
          }
        }
      })
    });
  }

  /**
   * Setup
   */
  setupBar() {
    if (this.progressBar) {
      let html = ''
      this.sectionsArr.forEach((section, index) => {
        html += `<span data-bar-id="${index}"></span>`
      })
      this.progressBar.innerHTML = html
    }
    if (this.currentStepElem && this.countStepElem) {
      this.currentStepElem.innerHTML = 1
      this.countStepElem.innerHTML = this.sectionsArr.length
    }
  }
  setup() {
    this.setupBar()
    this.go(1)
    this.observeStepsElements()
    this.observeBarElements()
    this.bindHandlers()
  }


  /**
   * Initialize
   */
  init() {
    if (this.form) {
      this.bindDualSelect()
      this.bindToggleStepsControls()
      this.bindBrandSelect()
      this.bindPhoneInput()
      this.bindCurrencyInput()
      this.bindSetFocusedElement()
      this.bindKeyEvents()
      this.bindSubmit()
      this.setup()
    }
  }
}

module.exports = SellWatch