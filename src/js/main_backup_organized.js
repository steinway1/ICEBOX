const IS_VISIBLE = "is-visible",
  IS_ACTIVE = "is-active",
  BUTTON_LOADING = "button_loading",
  IS_HIDDEN = 'is-hidden',
  IS_EXPANDED = 'is-expanded',
  IS_MINIMIZED = 'is-minimized',
  IS_COPIED = 'is-copied',
  IS_ERROR = 'is-error',
  IS_EMPTY = 'is-empty',
  __TRUE = '--true',
  __FALSE = '--false',
  __FADE = '--fade',
  __HALF = '--half',
  __SELECTED = '--selected',
  __LOADED = '--loaded',
  __HIDDEN = '--hidden',
  __VISIBLE = '--visible'

let $body = $('body')

const __VALID = '--valid',
  __INVALID = '--invalid',
  __PENDING = '--pending',
  __LOCKED = '--locked',
  __ACTIVE = '--active',
  __EXPANDED = '--expanded'

const paceOptions = {
  ajax: true,
  document: true,
  elements: {
    selectors: ['main']
  }
};

var UPLOADED_BLOG_IMG;


/* #region  Utils */
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function lockScroll() {
  setTimeout(function () {
    if (!document.body.hasAttribute("ib-scroll-lock")) {
      let o = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute("ib-scroll-lock", o),
        (document.body.style.overflow = "hidden"),
        (document.body.style.position = "fixed"),
        (document.body.style.top = "-" + o + "px"),
        (document.body.style.left = "0"),
        (document.body.style.width = "100%");
    }
  }, 1);
}
function unlockScroll() {
  if (document.body.hasAttribute("ib-scroll-lock")) {
    let o = document.body.getAttribute("ib-scroll-lock");
    document.body.removeAttribute("ib-scroll-lock"),
      (document.body.style.overflow = ""),
      (document.body.style.position = ""),
      (document.body.style.top = ""),
      (document.body.style.left = ""),
      (document.body.style.width = ""),
      window.scroll(0, o);
  }
}
function elemDisplayed(elem) {
  if (!elem) return false
  let target = elem instanceof jQuery ? elem.get(0) : elem
  return window.getComputedStyle(target).getPropertyValue('display') !== 'none'
}
function createElem(tagName, options) {
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
function removeClasses(elem, ...classes) {
  for (const cls of classes) {
    elem.classList.remove(cls)
  }
}
function addClasses(elem, ...classes) {
  for (const cls of classes) {
    elem.classList.add(cls)
  }
}
function formatAsCurrency(string) {
  string = typeof string === 'string' ? string : string.toString()
  const number = parseFloat(string.replace(/,/g, ''))
  const parts = number.toFixed(2).split('.')
  const digits = parts[0]
  const decimal = parts[1]
  const integer = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${integer}.${decimal}`
}
function getEvtDOM(attr) {
  return $(`[data-evt="${attr}"]`);
}
function getTransitionTime(elem) {
  let el = elem instanceof jQuery ? elem[0] : elem;
  return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
}
function getOrdinalTxt(n) {
  return n % 10 == 1 && n % 100 != 11 ? 'st' : n % 10 == 2 && n % 100 != 12 ? 'nd' : n % 10 == 3 && n % 100 != 13 ? 'rd' : 'th'
}
function getZIndex(elem) {
  return parseInt(window.getComputedStyle(elem).getPropertyValue('z-index'))
}
function toggleAdminBar() {
  let bar = document.querySelector('.iba-toolbar')
  if (bar && bar !== null) {
    if (bar.classList.contains(IS_MINIMIZED)) {
      bar.classList.remove(IS_MINIMIZED)
    } else {
      bar.classList.add(IS_MINIMIZED)
    }
  }
}
/* #endregion Utils */


/* #region  Ajax */
function applyRedeemCode() {
  const value = $('#redeem_input').val();
  if (value != '') {
    $.ajax({
      url: '/json/redeem-promo-code',
      type: 'POST',
      data: { code: value },
      success: function (data) {
        var r = $.parseJSON(data);
        if (!r.error) {
          $('.checkout-redeem').show();
        } else {
          showMessage('error', 'Error', r.msg);
        }
      }
    });
  }
}
/* #endregion Ajax */


class Backdrop {
  constructor(settings = {}) {
    this.el = createElem('div', {
      className: 'page-backdrop',
    })
    this.callback = settings.callback || null
    this.zIndex = settings.zIndex || undefined
    this.background = settings.background || undefined
    this.half = settings.half || false
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
      this.el.style.opacity = '1'
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

class PageConfetti {
  constructor() {
    this.el = null
    this.containerEl = null
    this.confettiFrequency = 3
    this.confettiInterval = 50
    this.timeToDestroy = 8000
    this.confettiColors = ['#0095c6', '#1ab8ec', '#8cdffa', '#d8f3fc']
    this.confettiAnimations = ['slow', 'medium', 'fast']
  }

  createHolder() {
    this.el = createElem('div', {
      className: 'confetti-holder'
    })
    document.body.appendChild(this.el)
  }

  setup() {
    const containerEl = createElem('div', {
      className: 'confetti-container'
    })
    this.el.appendChild(containerEl)
    this.containerEl = containerEl
  }

  render() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div')
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px'
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)]
      const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + 'px'
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)]

      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation)
      confettiEl.style.left = confettiLeft
      confettiEl.style.width = confettiSize
      confettiEl.style.height = confettiSize
      confettiEl.style.backgroundColor = confettiBackground

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl)
      }, 3000)

      this.containerEl.appendChild(confettiEl)
    }, this.confettiInterval)
  }

  destroy() {
    const el = this.el
    if (el) {
      el.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(el)
      }, getTransitionTime(el));
    }
  }

  push(infinity = false) {
    this.createHolder()
    this.setup()
    this.render()
    if (!infinity) {
      setTimeout(() => {
        this.destroy()
      }, this.timeToDestroy);
    }
  }
}

class LockPin {
  constructor(settings = {}) {
    this.code = settings.code || 1234
    this.maxLength = this.code.toString().length
    this.unlockTime = settings.unlockTime || 600
    this.currentPin = []
    this.isLocked = false
  }

  /**
   * Utils
   */
  renderHTML() {
    let html = `
    <div class="pin-lock">
	<div class="pin-lock__wrapper">
		<div class="pin-lock__holder">
			<div class="pin-lock__title-group">
				<h3>Enter PIN Code</h3>
				<span>This page is locked with pin.</span>
			</div>
			<div data-pin-output class="pin-lock__output">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div class="pin-lock__btn-grid">
				<button>1</button>
				<button>2</button>
				<button>3</button>
				<button>4</button>
				<button>5</button>
				<button>6</button>
				<button>7</button>
				<button>8</button>
				<button>9</button>
				<button data-pin-evt="clear">Clear</button>
				<button>0</button>
				<button data-pin-evt="submit">Enter</button>
			</div>
		</div>
	</div>
</div>
    `
    return html
  }
  appendScreen() {
    document.body.insertAdjacentHTML('beforeend', this.renderHTML())
  }
  setElements() {
    this.holder = document.querySelector('.pin-lock')
    this.btnArr = [...this.holder.querySelectorAll('button')]
    this.output = this.holder.querySelector('[data-pin-output]')
    this.outputSpanArr = [...this.output.querySelectorAll('span')]
    this.evtClear = this.holder.querySelector('[data-pin-evt="clear"]')
    this.evtSubmit = this.holder.querySelector('[data-pin-evt="submit"]')
    this.btnArrFiltered = this.btnArr.filter((btn) => {
      if (!btn.dataset.pinEvt) { return btn }
    })
  }

  /**
   * Methods
   */
  unlock() {
    unlockScroll()
    this.output.classList.remove(__FALSE)
    this.output.classList.add(__TRUE)
    setTimeout(() => {
      this.holder.classList.add(__FADE)
      setTimeout(() => {
        this.destroy()
      }, getTransitionTime(this.holder));
    }, this.unlockTime);
  }
  reset() {
    this.currentPin = []
    this.update()
    this.isLocked = false
    removeClasses(this.output, __FALSE, __TRUE)
  }
  update() {
    const pin = this.currentPin
    const length = pin.length
    if (length == 0) {
      this.outputSpanArr.forEach((span) => {
        span.innerHTML = ''
      })
    } else if ((length - 1) < this.maxLength) {
      this.outputSpanArr.forEach((span, i) => {
        if (i < length) {
          span.innerHTML = pin[i]
        } else {
          span.innerHTML = ''
        }
      })
    }
    if (length === this.maxLength) {
      this.submit()
    }
  }
  submit() {
    if (this.currentPin.length > 0) {
      this.isLocked = true
      if (this.currentPin.join('') == this.code) {
        this.unlock()
      } else {
        this.output.classList.add(__FALSE)
        setTimeout(() => {
          this.reset()
        }, 700);
      }
    }
  }
  destroy() {
    this.holder.remove()
  }

  /**
   * Attach Events
   */
  attachButtonClick() {
    for (const btn of this.btnArrFiltered) {
      btn.addEventListener('click', (e) => {
        if (!this.isLocked) {
          const num = Number(e.target.innerHTML)
          this.currentPin.push(num)
          this.update()
        }
      })
    }
    this.evtClear.addEventListener('click', () => {
      if (!this.isLocked) {
        this.reset()
      }
    })
    this.evtSubmit.addEventListener('click', () => {
      if (!this.isLocked) {
        this.submit()
      }
    })
  }
  attachDocEvents() {
    document.addEventListener('keydown', (e) => {
      if (this.holder) {
        if (!this.isLocked) {
          e.preventDefault()
          const key = e.key
          if (key === 'Backspace') {
            if (this.currentPin.length > 0) {
              this.currentPin.pop()
              this.update()
            }
          } else if (key === 'Enter') {
            this.submit()
          } else if (key === 'Escape') {
            this.reset()
          } else if (key >= 0 && key <= 9) {
            for (const btn of this.btnArrFiltered) {
              if (btn.innerHTML === key && this.currentPin.length < this.maxLength) {
                btn.click()
                break
              }
            }
          }
        }
      }
    })
  }

  push() {
    lockScroll()
    this.appendScreen()
    this.setElements()
    this.attachButtonClick()
    this.attachDocEvents()
  }
}

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


/* #region  Page elements */
const pageEls = new Object({
  init: function () {
    Object.values(this.attachEvent).forEach((target) => {
      if (typeof target === 'function') {
        try {
          target()
        } catch (err) {
          console.error(err)
        }
      }
    })
  },
  attachEvent: {
    filterDropdown: () => {
      let dropdownEls = Array.from($('.filter-dropdown'))

      for (let i = 0; i < dropdownEls.length; i++) {
        const el = dropdownEls[i];
        $(el).hover(function () {
          let thisCurrent = $(this).find('.filter-dropdown__current'),
            list = $(this).find('.filter-dropdown__list'),
            scrollContainer = list.find('> div'),
            buttons = Array.from(scrollContainer.find('> div')),
            main = $(this).find('.filter-dropdown__main')

          const scrollH = scrollContainer[0].scrollHeight

          if (list.height() == 0) {
            list.css({ height: `${scrollH}px` })
            main.addClass(IS_ACTIVE)
          } else {
            list.css({ height: '0px' })
            main.removeClass(IS_ACTIVE)
          }

          $.each(buttons, function (i) {
            buttons[i].onclick = () => {
              let sibs = $(buttons[i]).siblings()
              sibs.removeClass(IS_ACTIVE)
              buttons[i].classList.add(IS_ACTIVE)

              let val = $(buttons[i]).html()
              thisCurrent.html(val)
            }
          })
        })
      }
    },
    trackingDateUpdate: () => {
      const dates = [...document.querySelectorAll('[data-track="updated_date"]')]
      const nowDate = new Date()

      if (dates.length) {
        const day = nowDate.getDate()
        const month = nowDate.toLocaleDateString('en-US', { month: 'short' })
        const year = nowDate.getFullYear()
        let hours = nowDate.getHours()
        const minutes = nowDate.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12

        for (const date of dates) {
          date.innerHTML = `${day} ${month}, ${year}, ${hours}:${minutes} ${ampm}`
        }
      }
    },
    pageFilters: () => {
      let filterRows = Array.from($('.filter-row'))
      for (let i = 0; i < filterRows.length; i++) {
        const el = $(filterRows[i]),
          header = el.find('.filter-row__header'),
          body = el.find('.filter-row__body'),
          container = el.find('.filter-row__container'),
          icon = header.find('svg')

        header.click(() => {
          let currentBodyHeight = body.height()
          if (currentBodyHeight !== 0) {
            body.css({ height: `${currentBodyHeight}px` })
            setTimeout(() => {
              body.css({ height: 0 })
              container.css({ transform: 'translateY(-24px)', opacity: 0 })
              icon.css({ transform: 'rotate(0deg)' })
            }, 1);
          } else {
            let scrollH = container[0].scrollHeight
            body.css({ height: scrollH })
            container.css({ transform: 'translateY(0px)', opacity: 1 })
            icon.css({ transform: 'rotate(180deg)' })
          }
        })
      }
    },
    faqLists: () => {
      const headArr = [...document.querySelectorAll('.faq-head')]
      let liArr = []
      for (const faqHead of headArr) {
        const li = faqHead.closest('li')
        const body = faqHead.nextElementSibling
        if (li && body) {
          liArr.push(li)
          li.show = () => {
            li.classList.add(__ACTIVE)
            const scrollHeight = body.scrollHeight
            body.style.height = `${scrollHeight}px`
            setTimeout(() => {
              body.style.height = 'auto'
            }, 1);
          }
          li.hide = () => {
            li.classList.remove(__ACTIVE)
            body.style.height = 0
          }

          faqHead.onclick = () => {
            console.log(body)
            if (body.offsetHeight !== 0) {
              li.hide()
            } else {
              li.show()
            }
          }

          // Transform letters
          const h6 = faqHead.querySelector('h6')
          if (h6) {
            const capitalized = h6.textContent.toLowerCase().replace(/(\b)(\w)/g, (match, p1, p2) => p2.toUpperCase())
            h6.textContent = capitalized
          }

          // Reveal first
          if (liArr[0] === li) li.show()
        }
      }
    },
    listings: () => {
      const listings = [...document.querySelectorAll('.listing-set')]
      for (const listing of listings) {
        const buttonArray = [...listing.querySelectorAll('.listing-btn:not(.--disabled)')]
        buttonArray.forEach((btn) => {
          btn.addEventListener('click', () => {
            btn.classList.add(IS_ACTIVE)
            buttonArray.forEach((arrBtn) => {
              if (arrBtn != btn) arrBtn.classList.remove(IS_ACTIVE)
            })
          })
        })
      }
    },
    removeZeroSubheading: () => {
      const arr = [...document.querySelectorAll('.results__subheading')]
      for (const subheading of arr) {
        if (subheading.innerHTML.length < 1) {
          subheading.remove()
        }
      }
    },
    initTelInput: () => {
      let telInputArr = Array.from($('[data-input="tel"]'));

      for (var i = 0; i < telInputArr.length; i++) {
        iti = intlTelInput(telInputArr[i], {
          initialCountry: "auto",
          preferredCountries: ["us", "gb", "br", "cn", "es", "it"],
          autoPlaceholder: "aggressive",
          useFullscreenPopup: true,
          utilsScript:
            "/assets/public-2020/js/plugins/phone/utils.js",
          geoIpLookup: function (callback) {
            fetch("https://ipinfo.io/json", {
              cache: "reload",
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Failed: " + response.status);
              })
              .then((ipjson) => {
                callback(ipjson.country);
              })
              .catch((e) => {
                callback("us");
              });
          },
        });
      }
    },
    initCustomUploads: () => {
      this.arr = [...document.querySelectorAll('[data-custom-upload]')]

      const renderOutputFile = (file, imgSrc = '') => {
        let imgElem = imgSrc ? `<div class="--filled" style="background-image: url(${imgSrc})"></div>` : `<div></div>`
        return `
        <div class="custom-upload__file">
          <div>
            ${imgElem}
            <span data-custom-name>${file.name}</span>
          </div>
          <div>
            <div data-evt="custom_upload_remove" class="--remove"></div>
          </div>
        </div>
        `
      }
      const bindBoxEvents = (box, input) => {
        box.ondragover = (e) => {
          e.preventDefault(); box.classList.add(__ACTIVE)
        }
        box.ondragleave = (e) => {
          e.preventDefault(); box.classList.remove(__ACTIVE)
        }
        box.addEventListener('drop', (e) => {
          e.preventDefault()
          box.classList.remove(__ACTIVE)
          const files = e.dataTransfer.files
          const newDataTransfer = new DataTransfer()

          for (const file of files) {
            newDataTransfer.items.add(file)
          }
          input.files = newDataTransfer.files
          input.dispatchEvent(new Event('change', { 'bubbles': true }))
        })
        box.addEventListener('click', (e) => {
          input.click()
        })
      }
      const setIndexes = (upload) => {
        const files = [...upload.querySelectorAll('.custom-upload__file')]
        for (let i = 0; i < files.length; i++) {
          files[i].dataset.customIndex = i
        }
      }
      const processFiles = (files, upload) => {
        const output = upload.querySelector('.custom-upload__files')
        const currentFiles = [...upload.querySelectorAll('.custom-upload__file')]

        for (const file of currentFiles) {
          file.remove()
        }

        for (const file of files) {
          const fileIsImage = file.type.match('image.*')
          if (fileIsImage) {
            let reader = new FileReader()
            reader.onload = (e) => {
              output.insertAdjacentHTML('beforeend', renderOutputFile(file, e.target.result))
            }
            reader.readAsDataURL(file)
          } else {
            output.insertAdjacentHTML('beforeend', renderOutputFile(file))
          }
        }
        setIndexes(upload)
      }

      for (const upload of this.arr) {
        const box = upload.querySelector('.custom-upload__box')
        const input = upload.querySelector('input')

        if (box) {
          bindBoxEvents(box, input)
        }

        input.addEventListener('change', (e) => {
          const files = e.target.files
          processFiles(files, upload)
        })
      }

      document.addEventListener('click', (e) => {
        const target = e.target
        if (e.target.closest('[data-evt="custom_upload_remove"]')) {
          const upload = target.closest('[data-custom-upload]')
          if (!upload) throw new Error('data-custom-upload not found')
          const input = upload.querySelector('input[type="file"]')
          if (!input) throw new Error('input[type="file"] not found')
          const nameEl = e.target.closest('.custom-upload__file').querySelector('*[data-custom-name]')
          if (!nameEl) throw new Error('data-custom-name not found')

          const name = nameEl.innerHTML
          const newDataTransfer = new DataTransfer()
          const { files } = input

          for (let i = 0; i < files.length; i++) {
            if (files[i].name !== name) {
              newDataTransfer.items.add(files[i])
            }
          }

          if (newDataTransfer.items.length === 0) {
            input.value = ''
          } else {
            input.files = newDataTransfer.files
          }

          input.dispatchEvent(new Event('change', { 'bubbles': true }))
        }
      })
    },
    attachPayModal: () => {
      let evtOpenLater = $('[data-evt="payModalLater"]'),
        evtOpenCrypto = $('[data-evt="payModalCrypto"]'),
        evtClose = $('[data-evt="closePayModal"]'),
        crypto = $('#payModalCrypto'),
        later = $('#payModalLater'),
        modal = $('.pay-modal')

      const openModal = () => {
        lockScroll()
        modal.show()
        setTimeout(() => {
          modal.css({ opacity: 1 })
        }, 1);
      }

      const closeModal = () => {
        unlockScroll()
        modal.css({ opacity: 0 })
        setTimeout(() => {
          modal.hide()
        }, getTransitionTime(modal));
      }

      evtOpenLater.add(evtOpenCrypto).click(function () {
        openModal()
        crypto.add(later).hide()
        if ($(this).is(evtOpenCrypto)) {
          crypto.show()
        }
        if ($(this).is(evtOpenLater)) {
          later.show()
        }
      })

      evtClose.click(function () {
        closeModal()
      })
    },
    attachToggleInputs: function () {
      const arr = [...document.querySelectorAll('[data-input-toggle]')]
      for (const input of arr) {
        const btn = input.parentNode.querySelector('button') || input.parentNode.querySelector('input[type="submit"]')
        if (btn) {
          input.addEventListener('input', () => {
            const value = input.value
            if (value) {
              btn.disabled = false
              return
            }
            btn.disabled = true
            return
          })

          input.addEventListener('keydown', (e) => {
            const keyIsEnter = e.key === 'Enter'
            if (keyIsEnter) {
              e.preventDefault()
              btn.click()
            }
          })

          btn.addEventListener('click', () => {
            const value = input.value
            input.value = ''
            input.dispatchEvent(new Event('input'))
          })
        }
      }
    },
    formatGoldChainsSubheading: () => {
      const subheading = document.querySelector('.results__subheading')
      if (subheading) {
        const text = 'Welcome to our collection of fine 14k solid gold chains, where luxury meets affordability'
        if (subheading.innerHTML.includes(text)) {
          const sentences = subheading.innerHTML.split('.').filter(sentence => sentence.trim() !== '')
          if (sentences[0] === text) {
            subheading.innerHTML = `
            <strong>${text}.</strong>
            ${sentences.slice(1).join('. ')}
            `
          }
        }
      }
    },
    setPageFilters: () => {
      const filters = Array.from(document.querySelectorAll('.page-filter-box')).reduce((acc, box) => {
        if (box.querySelector('.page-filter-drop') !== null && box.querySelector('.page-filter-btn') !== null) { acc.push(box) }
        return acc
      }, [])

      if (filters.length !== 0) {
        window.pageFilters = {}
        window.filterModal = {}

        filterModal = {
          el: document.querySelector('.filter-modal'),
          backdrop: document.querySelector('.filter-modal__backdrop'),
          container: document.querySelector('.filter-modal__container'),
          title: document.querySelector('.filter-modal-title'),
          content: document.querySelector('.filter-modal__content'),
          evtClose: document.querySelectorAll('[data-filter-evt="close"]'),
          open: function () {
            lockScroll()
            if (this.el !== undefined) {
              this.el.style.display = 'block'
              setTimeout(() => {
                this.backdrop.style.opacity = 1
                this.container.classList.add(IS_VISIBLE)
              }, 1);
            }
          },
          close: function () {
            unlockScroll()
            if (this.el !== undefined) {
              this.backdrop.style.opacity = 0
              this.container.classList.remove(IS_VISIBLE)
              setTimeout(() => {
                this.el.style.display = 'none'
              }, getTransitionTime(this.backdrop));
            }
          },
          isHidden: function () {
            return window.getComputedStyle(this.el).getPropertyValue('display') == 'none'
          },
          bindEvents: function () {
            this.evtClose.forEach((el) => {
              el.onclick = () => {
                const labels = [...filterModal.content.querySelectorAll('label')]
                const links = [...filterModal.content.querySelectorAll('a')]
                const emptyBox = document.querySelector('.page-filter-drop.is-empty')
                filterModal.close()
                setTimeout(() => {
                  if (emptyBox !== null) {
                    const toMove = links.length !== 0 ? links : labels
                    toMove.forEach((node) => { emptyBox.querySelector('div').appendChild(node) })
                    emptyBox.classList.remove(IS_EMPTY)
                    $('.filter-modal__content').empty()
                  }
                }, getTransitionTime(filterModal.container));
              }
            })
          },
          appendLabels: function (nodes) {
            this.content.appendChild(nodes)
          }
        }
        filterModal.bindEvents()


        filters.forEach((filter, i) => {
          const drop = filter.querySelector('.page-filter-drop')
          const trigger = filter.querySelector('.page-filter-btn')
          const labels = [...drop.querySelectorAll('label')]
          const buttons = [...drop.querySelectorAll('label > div')]
          const inputs = [...drop.querySelectorAll('input')]
          const links = [...drop.querySelectorAll('a')]

          pageFilters[i] = {
            drop: drop,
            trigger: trigger,
            labels: labels,
            buttons: buttons,
            inputs: inputs,
            links: links
          }
          pageFilters[i].drop.show = function () {
            this.style.display = 'block'
            setTimeout(() => {
              this.style.opacity = 1
              this.style.transform = 'translateY(0px)'
            }, 1);
          }
          pageFilters[i].drop.hide = function () {
            this.style.opacity = 0
            this.style.transform = 'translateY(10px)'
            setTimeout(() => {
              this.style.display = 'none'
            }, getTransitionTime(this));
          }
          pageFilters[i].drop.isHidden = function () {
            return window.getComputedStyle(this).getPropertyValue('display') == 'none'
          }
        })

        pageFilters.observeCheckState = function () {
          for (const key in this) {
            const obj = this[key]
            if (typeof obj !== 'function') {
              if (obj.inputs.some(input => input.checked)) {
                obj.trigger.classList.add(IS_ACTIVE)
              } else {
                obj.trigger.classList.remove(IS_ACTIVE)
              }
            }
          }
        }
        pageFilters.attachInputOnChange = function () {
          for (const key in this) {
            const obj = this[key]
            if (typeof obj !== 'function') {
              obj.inputs.forEach((input) => {
                input.onchange = () => {
                  pageFilters.observeCheckState()
                }
              })
            }
          }
        }
        pageFilters.atLeastOneVisible = function () {
          for (const key in this) {
            if (typeof this[key] !== 'function') {
              if (!this[key].drop.isHidden()) return true
            }
          }
        }
        pageFilters.showAll = function () {
          for (const key in this) {
            const obj = this[key]
            if (typeof obj !== 'function') {
              obj.drop.show()
            }
          }
        }
        pageFilters.hideAll = function (node) {
          for (const key in this) {
            const obj = this[key]
            if (typeof obj !== 'function') {
              if (node !== null && node !== undefined) {
                if (!obj.drop.isSameNode(node)) { obj.drop.hide() }
              } else {
                obj.drop.hide()
              }
            }
          }
        }
        pageFilters.attachTriggerClick = function () {
          for (const key in this) {
            const obj = this[key]
            if (typeof obj !== 'function') {
              obj.trigger.onclick = () => {
                if (window.innerWidth > 991) {
                  if (obj.drop.isHidden()) {
                    pageFilters.hideAll(obj.drop)
                    obj.drop.show()
                    const isIntersecting = obj.drop.getBoundingClientRect().right > window.innerWidth
                    if (isIntersecting) obj.drop.style.right = 0
                  } else {
                    obj.drop.hide()
                  }
                } else {
                  const title = obj.trigger.querySelector('span').innerHTML
                  filterModal.open()
                  filterModal.title.innerHTML = title
                  obj.drop.classList.add(IS_EMPTY)
                  const toMove = obj.links.length !== 0 ? obj.links : obj.labels
                  toMove.forEach((node) => { filterModal.appendLabels(node) })
                }
              }
            }
          }
        }
        pageFilters.attachWindowEvents = function () {
          document.addEventListener('click', function (event) {
            const target = event.target
            if (!target.closest('.page-filter-box') && pageFilters.atLeastOneVisible()) {
              pageFilters.hideAll()
            }
          })
          // window.addEventListener('scroll', function () {
          //   if (pageFilters.atLeastOneVisible()) {
          //     pageFilters.hideAll()
          //   }
          // })
        }
        pageFilters.init = function () {
          pageFilters.observeCheckState()
          pageFilters.attachInputOnChange()
          pageFilters.attachTriggerClick()
          pageFilters.attachWindowEvents()
        }

        try {
          pageFilters.init()
        } catch (err) {
          console.log(err.message)
        }
      }
    },
    initProductZoom: () => {
      const isDesktop = window.innerWidth > 991
      window.removeSlider = (target) => {
        unlockScroll()
        const slider = target.closest('.zoom_slider'); slider.css({ opacity: 0 })
        setTimeout(() => { slider.hide() }, 400);
      }

      const setDesktopZoom = () => {
        [...document.querySelectorAll('.product-media-img')].reduce((acc, el) => {
          if (el && el !== null) {
            if (!/(placeholder|store|pay)/gi.test(el.getAttribute('src'))) {
              acc.push($(el).parent('.product-media__inner-wrap'))
            }
          }
          return acc
        }, []).forEach((el) => {
          $(el).zoom({ magnify: 1.9, on: 'click' })
          $(el).on('mouseleave', function () { $(document).trigger('click') })
        })
      }

      const setMobileZoom = () => {
        const sliders = [...document.querySelectorAll('.product-slider')] // Get all existing sliders

        sliders.forEach((slider, index) => {
          const button = $('<button/>', { class: `product__zoom-btn zoom_btn${index}` }); button.appendTo($(slider)) // Create & append zoom button
          const renderNewSlider = (slider, index) => { // Get HTML new zoom slider
            let mediaArr = [...slider.querySelectorAll('img')].reduce((acc, img) => {
              const src = img.getAttribute('src')
              if (!acc.includes(src) && !/(placeholder|store|pay)/gi.test(src)) { acc.push(src) }
              return acc
            }, []).sort()

            this.renderMedia = () => {
              return mediaArr.reduce((acc, src) => {
                acc += `<div class="splide__slide"><img src="${src}"></div>`
                return acc
              }, '')
            }

            return `
            <div class="zoom_slider zsl${index}">
              <div>
                <div class="zoom_slider_logo"><img src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}"></div>
                <button class="zoom_slider-close" onclick="removeSlider($(this))"></button>
                <div class="zoom-sl${index} splide">
                  <div class="splide__track">
                    <div class="splide__list">
                    ${this.renderMedia()}
                    </div>
                  </div>
                  <div class="splide__arrows">
                    <div class="splide__arrow--prev"></div>
                    <div class="splide__arrow--next"></div>
                  </div>
                </div>
              </div>
            </div>`
          }
          const appendNewSlider = (html) => { $body.append(html) } // Append Zoom Slider
          const initNewSlider = (index) => { // Splide Initialization
            this.settings = {
              type: "loop",
              perPage: 1,
              perMove: 1,
              autoplay: 0,
              gap: "12px",
              arrows: 1,
              pagination: 0,
              speed: 800,
              drag: false,
              dragAngleThreshold: 0
            }
            const zoomSlider = new Splide(`.zoom-sl${index}`, this.settings);
            zoomSlider.mount()
          }
          const initZoom = (index) => { // Initialize jQuery zoom for the new slider
            let slides = [...document.querySelector(`.zoom_slider.zsl${index}`).querySelectorAll('.splide__slide')]
            slides.forEach((slide) => {
              $(slide).zoom({
                magnify: 1.4,
                onZoomIn: function () {
                  $(this).closest('.splide').css('border-color', '#e6eaec')
                },
                onZoomOut: function () {
                  $(this).closest('.splide').css('border-color', '#0095c6')
                }
              })
            })
          }
          const showNewSlider = (index) => {
            let localSlider = $(`.zoom_slider.zsl${index}`)
            if (localSlider) { localSlider.show(); lockScroll(); setTimeout(() => { localSlider.css({ opacity: 1 }) }, 1); }
          }
          const openSlider = (index) => {
            let slider = $(`.zoom_slider.zsl${index}`)
            if (slider) { slider.show(); lockScroll(); setTimeout(() => { slider.css({ opacity: 1 }) }, 1); }
          }

          button.click(() => {
            const localSlider = document.querySelector(`.zoom_slider.zsl${index}`)
            if (!localSlider) {
              appendNewSlider(renderNewSlider(slider, index))
              initNewSlider(index)
              initZoom(index)
              showNewSlider(index)
            } else {
              openSlider(index)
            }
          })
        })
      }

      const setZoom = () => {
        $(document).ready(function () {
          if (document.querySelector('.main_product_zoom') == null) {
            if (isDesktop && $('.main_product').length) { setDesktopZoom() } else {
              setMobileZoom()
            }
          }
        })
      }

      return setZoom()
    },
    initTestProductZoom: () => {
      let zoomOpenCount = 0

      const setZoom = () => {
        const
          srcIsValid = (src) => {
            return !/(placeholder|store|pay)/gi.test(src)
          },
          filterMedia = (arr) => {
            return arr.reduce((acc, media) => {
              const
                img = media.querySelector('img'),
                thumbAncestor = media.closest('.product-slider_thumbnails'),
                zoomAncestor = media.closest('.zoom-modal')

              if (img && img !== null && thumbAncestor == null && zoomAncestor == null) {
                const src = img.getAttribute('src')
                if (srcIsValid(src)) { acc.push(media) }
              }
              return acc
            }, [])
          },
          getSrcArr = (arr) => {
            return arr.reduce((acc, media) => {
              const img = media.querySelector('img')
              if (img !== null) {
                if (img.hasAttribute('src')) {
                  const src = img.getAttribute('src')
                  if (srcIsValid(src) && !acc.includes(src)) { acc.push(src) }
                }
              }
              return acc
            }, [])
          },
          renderSlidesHTML = (srcArr) => {
            return srcArr.reduce((acc, src) => {
              acc += `<div style="cursor: zoom-in" class="zoom-modal__slide splide__slide"><img loading="eager" alt="" src="${src}"></div>`
              return acc
            }, '')
          },
          renderSplideHTML = (slidesHTML) => {
            let productTitle = $('.product__item-title').html(),
              price = $('.product__item-price').eq(-1).html()
            return `
          <div class="zoom-modal splide">
            <button data-evt="closeZoomModal" class="zoom-modal__close-btn"></button>
            <div class="zoom-modal__holder">
              <div class="splide__arrows">
                <div class="splide__arrow--prev"></div>
                <div class="splide__arrow--next"></div>
              </div>
              <div class="zoom-modal__header">
                <img src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}" loading="lazy" alt="">
                <img style="display: none" src="${String.raw`./assets/logo.svg`}" loading="lazy" alt="">
              </div>
              <div class="zoom-modal__footer">
                <h1 class="zoom-modal__name">${productTitle}</h1>
                <a href="javascript:void(0)" data-evt="closeZoomModal" class="zoom-modal__buy-btn" onclick="addToCart()">Add To Cart<span>${price} USD</span></a>
              </div>
              <div class="zoom-modal__slider">
                <div class="splide__track">
                  <div class="splide__list">
                    ${slidesHTML}
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
          },
          initZoomSlider = (indexToGo = 0) => {
            const
              settings = {
                type: "loop",
                perPage: 1,
                perMove: 1,
                autoplay: 0,
                gap: "12px",
                arrows: 1,
                pagination: 0,
                speed: 800,
                drag: false,
                dragAngleThreshold: 0
              },
              slider = document.querySelector('.zoom-modal')
            if (slider !== null) {
              const zoomSlider = new Splide('.zoom-modal', settings);
              zoomSlider.mount()
              zoomSlider.go(indexToGo)
            }
          },
          initPressZoom = (slider) => {
            const slides = [...slider.querySelectorAll('.splide__slide')],
              zoomValue = window.innerWidth > 479 ? 2.2 : 1.6
            slides.forEach((slide) => {
              $(slide).zoom({
                magnify: zoomValue,
                on: 'grab',
                onZoomIn: function () {
                  $('.zoom-modal .splide__arrows').css({ opacity: 0 })
                  $('.zoom-hint').css({ opacity: 0 })
                },
                onZoomOut: function () {
                  $('.zoom-modal .splide__arrows').css({ opacity: 1 })
                }
              })
            })
          }

        const mediaArr = filterMedia([...document.querySelectorAll('.product-media')])

        mediaArr.forEach((el) => {
          el.onclick = () => {
            lockScroll()
            try {
              const
                sibSrcArr = getSrcArr(filterMedia([...el.parentNode.closest('div').querySelectorAll('.product-media')])),
                splideHTML = renderSplideHTML(renderSlidesHTML(sibSrcArr))

              $body.append(splideHTML)
              initZoomSlider(sibSrcArr.indexOf(el.querySelector('img').getAttribute('src')))

              let zoomModal = document.querySelector('.zoom-modal'),
                holder = zoomModal.querySelector('.zoom-modal__holder')
              initPressZoom(zoomModal)

              let zoomHint = $('<\div>', { class: 'zoom-hint' })

              setTimeout(() => {
                zoomModal.style.opacity = 1
                if (zoomOpenCount <= 1) { $(holder).append(zoomHint); setTimeout(() => { zoomHint.css({ opacity: 1 }) }, 500) }
              }, 1);

              zoomModal.addEventListener('mousedown', () => {
                zoomHint.css({ opacity: 0 });
                setTimeout(() => {
                  zoomHint.remove()
                }, 450)
              })
              document.onkeydown = (e) => {
                e = e || window.event
                let isEsc = false
                if ('key' in e) {
                  isEsc = (e.key === "Escape" || e.key === "Esc");
                } else {
                  isEsc = (e.keyCode === 27);
                }
                if (isEsc) {
                  e.preventDefault()
                  unlockScroll()
                  let modal = $('.zoom-modal')
                  if (modal.length) {
                    modal.css({ opacity: 0 })
                    setTimeout(() => {
                      modal.remove()
                    }, getTransitionTime(modal));
                  }
                }
              }
              zoomOpenCount++
            } catch {
              throw new Error('JS : Init Product Zoom Error')
            }
          }
        })

        $(document).on('click', '[data-evt="closeZoomModal"]', function () {
          unlockScroll()
          let modal = $('.zoom-modal')
          if (modal.length) {
            modal.css({ opacity: 0 })
            setTimeout(() => {
              modal.remove()
            }, getTransitionTime(modal));
          }
        })
      }

      if (document.querySelector('.main_product_zoom') !== null) { setZoom() }
    },
    attachStickyScroll: () => {
      const bar = $('.filter-sidebar'), overlay = $('.filter-sidebar__overlay')
      if (bar.length && overlay.length) {
        const els = bar.find('.filter-row')
        $.each(els, function (i) {
          els[i].onclick = () => {
            let cont = $(this).find('.filter-row__container')
            setTimeout(() => {
              let currentHeight = bar.height()
              let scrollHeight = bar[0].scrollHeight
              if ((currentHeight - scrollHeight) <= -5) {
                overlay.css({ opacity: 1 })
              } else {
                overlay.css({ opacity: 0 })
              }
            }, getTransitionTime(cont));
          }
        })
        bar[0].addEventListener('scroll', function (e) {
          if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
            overlay.css({ opacity: 0 })
          } else { overlay.css({ opacity: 1 }) }
        })
      }
    },
    attachCheckoutCopy: () => {
      const btnArr = [...document.querySelectorAll('.crypto-how-btn'), ...document.querySelectorAll('.copy-address-btn')]
      if (btnArr.length) {
        btnArr.forEach((btn) => {
          btn.onclick = () => {
            if (!window.getSelection().toString()) {
              let details = btn.closest('.checkout-form__radio-details')
              if (details !== null) {
                let address = details.querySelector('.copy-address-btn__typo').innerHTML
                async function copyAddress() {
                  try {
                    await navigator.clipboard.writeText(address);
                    details.classList.add(IS_COPIED)
                    setTimeout(() => {
                      details.classList.remove(IS_COPIED)
                    }, 1300);
                  } catch (err) {
                    details.classList.remove(IS_COPIED, IS_ERROR)
                    setTimeout(() => {
                      details.classList.remove(IS_COPIED, IS_ERROR)
                    }, 2100);
                  }
                }
                copyAddress()
              }
            }
          }
        })
      }
    },
    adjustStickyEls: () => {
      const elsArr = [...document.querySelectorAll('.filter-sidebar.to-stick'), ...document.querySelectorAll('.sticky-filters')]
      const header = document.querySelector('.header')

      if (elsArr.length && header) {
        function adjust() {
          let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue('height'))
          elsArr.forEach((el) => {
            let topValue = $(window).width() > 991 ? headerHeight + 24 : headerHeight
            Object.assign(el.style, { top: `${topValue}px` })
          })
        }
        ['load', 'resize'].forEach((event) => { window.addEventListener(event, () => { adjust() }) })
      }
    },
    bindCardFav: () => {
      const buttons = document.querySelectorAll('.card-item-fav')
      buttons.forEach(btn => btn.onclick = () => {
        if (btn.classList.contains(IS_ACTIVE)) {
          btn.classList.remove(IS_ACTIVE)
        } else {
          btn.classList.add(IS_ACTIVE)
        }
      })
    },
    observeSmartPictures: () => {
      const arr = [...document.querySelectorAll('.smart-picture')]
      for (const el of arr) {
        const img = el.querySelector('img')
        if (!img) {
          el.classList.add(__LOADED)
        } else {
          if (img.complete || img.src.length === 0) {
            el.classList.add(__LOADED)
          } else {
            img.addEventListener('load', () => {
              el.classList.add(__LOADED)
            })
          }
        }
      }
    }
  }
})
/* #endregion */


/* #region  Loan App */
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
document.addEventListener('DOMContentLoaded', () => {
  const loanCaseHolder = document.querySelector('[data-id="loan-apply"]')
  if (loanCaseHolder) {
    const loanApp = new LoanApp(loanCaseHolder)
    loanApp.init()
  }
})
/* #endregion */


/* #region  Job Apply App */
class JobApp {
  constructor(holder, settings = {}) {
    this.holder = holder
    this.filesHolder = this.holder.querySelector('#job_files_upload')
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
    if (input) {
      input.classList.add(__INVALID)
    }
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
    $('#job_application_form').submit();
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
    } else {
      this.toggle()
    }
  }
  validate(section) {
    const requiredTextInputs = [...section.querySelectorAll('input[type="text"][required]:not(.--disabled'), ...section.querySelectorAll('input[type="email"][required]')]
    const emptyInputs = requiredTextInputs.filter(input => !input.value)
    const numberInputs = section.querySelectorAll('input[data-validate="number"]')
    const selectInputs = section.querySelectorAll('select[required]')
    const emailInputs = section.querySelectorAll('input[data-validate="email"]')
    const zipInputs = section.querySelectorAll('input[data-validate="zip_code"]')
    const fileInputs = section.querySelectorAll('input[required][type="file"]')
    const sectionID = section.dataset.loanSection

    if (requiredTextInputs.some(input => input.classList.contains(__INVALID))) return false

    if (selectInputs.length) {
      for (const select of selectInputs) {
        if (!select.value) {
          this.showInputError(select, 'Please select an option')
          return false
        }
      }
    }
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
    if (fileInputs.length) {
      for (const input of fileInputs) {
        if (!input.files[0]) {
          console.log(input.files)
          this.showInputError(null, 'Please upload a file')
          return false
        }
      }
    }
    this.clearErrors()
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
        heading.innerHTML = 'Job Application'
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
  bindResumeUpload() {
    const input = document.querySelector('#job_resume')
    const box = document.querySelector('[data-loan="files_upload"]')
    const holder = this.filesHolder
    // if (!input || !box || !holder) throw new Error('JS : Bind ID Upload : Input or Box or Holder not found')

    if (input && box && holder) {

      function processFiles(files) {
        const allowedExtensions = ['pdf', 'docx', 'doc']
        for (const file of files) {
          const name = file.name.toLowerCase()
          const extension = name.split('.').pop()
          if (allowedExtensions.includes(extension)) {
            console.log(file)
          }
        }
      }

      box.onclick = () => {
        this.clearErrors()
        input.click()
      }
      input.onchange = (e) => {
        processFiles(e.target.files)
      }
      box.ondragover = (e) => {
        this.clearErrors()
        e.preventDefault()
        box.classList.add(IS_ACTIVE)
      }
      box.ondragleave = (e) => {
        this.clearErrors()
        e.preventDefault()
        box.classList.remove(IS_ACTIVE)
      }
      box.ondrop = (e) => {
        this.clearErrors()
        e.preventDefault()
        box.classList.remove(IS_ACTIVE)
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
    this.bindResumeUpload()
    this.bindDualSelect()
    this.bindFormatting()
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const jobCaseHolder = document.querySelector('[data-id="job-apply"]')
  if (jobCaseHolder) {
    const jobApp = new JobApp(jobCaseHolder)
    jobApp.init()
  }
})
/* #endregion */


/* #region  Sell My Watch */
class SellWatch {
  constructor() {
    this.form = document.querySelector('form#sell_my_watch')
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
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form#sell_my_watch')
  if (form) {
    window.sellMyWatch = new SellWatch()
    window.sellMyWatch.init()
  }
})
/* #endregion */


/* #region  Loose Diamonds */
class LooseDiamonds {
  constructor() {
    this.main = document.querySelector('.loose_diamonds')
    this.resultsContainer = document.querySelector('.loose__results')
    this.viewBtnArr = [...document.querySelectorAll('.loose__view-btn')]
    this.looseSelectArr = [...document.querySelectorAll('.loose-select')]
    this.dmBtnArr = [...document.querySelectorAll('.dm-filter-btn')]
    this.sortModalActive = false
    if (this.main) {
      this.init()
    }
  }

  // Methods
  listView() {
    this.main.classList.add('--list')
  }
  gridView() {
    this.main.classList.remove('--list')
  }
  observeFilters() {
    for (const select of this.looseSelectArr) {
      const btnArr = [...select.querySelectorAll('.loose-filter-btn')]
      const inputArr = [...select.querySelectorAll('input[type="text"]')]

      const someIsChecked = btnArr.some(el => el.classList.contains(__ACTIVE))
      const someIsValue = inputArr.some(el => el.value.length > 0)

      if (someIsChecked || someIsValue) {
        select.classList.add(__SELECTED)
      } else {
        select.classList.remove(__SELECTED)
      }
    }
  }
  resetFilters() {
    for (const select of this.looseSelectArr) {
      const btnArr = [...select.querySelectorAll('.loose-filter-btn')]
      const inputArr = [...select.querySelectorAll('input[type="text"]')]

      btnArr.forEach(el => el.classList.remove(__ACTIVE))
      inputArr.forEach(el => el.value = '')

      select.classList.remove(__SELECTED)
    }
  }
  openSortModal() {
    const sortModal = document.querySelector('.sort-modal')
    const closeCallback = () => { this.closeSortModal(true) }
    if (sortModal) {
      window.looseSortBackdrop = new Backdrop({
        half: true,
        callback: closeCallback
      })
      lockScroll()
      sortModal.style.display = 'block'
      setTimeout(() => {
        sortModal.classList.add(__ACTIVE)
      }, 5);
    }
  }
  closeSortModal(cond = false) {
    const sortModal = document.querySelector('.sort-modal')
    if (sortModal) {
      unlockScroll()
      sortModal.classList.remove(__ACTIVE)
      setTimeout(() => {
        sortModal.style.display = 'none'
      }, getTransitionTime(sortModal));
      if (!cond) {
        const backdrop = window.looseSortBackdrop
        if (backdrop) {
          backdrop.hide()
        }
      }

      const rowArr = [...document.querySelectorAll('.sort-modal-row')]
      for (const row of rowArr) {
        row.querySelector('.sort-modal-row__body').style.height = 0
      }
    }
  }
  applyFilters() {
    this.closeSortModal()
  }
  hideAdmin(target) {
    if (target) {
      const item = target.closest('.dm-item')
      const adminBar = item.querySelector('.dm-item__admin')
      if (adminBar) {
        adminBar.style.display = 'none'
      }
    }
  }

  // Bind Events
  bindLooseSelects() {
    for (const select of this.looseSelectArr) {
      const btn = select.querySelector('.loose-select__btn')
      const drop = select.querySelector('.loose-select__drop')
      if (btn && drop) {
        btn.addEventListener('click', () => {
          if (select.classList.contains(__ACTIVE)) {
            select.classList.remove(__ACTIVE)
          } else {
            this.looseSelectArr.forEach(el => el.classList.remove(__ACTIVE))
            select.classList.add(__ACTIVE)
          }
        })
      }
    }

    window.addEventListener('scroll', () => {
      if (this.looseSelectArr.some(el => el.classList.contains(__ACTIVE))) {
        this.looseSelectArr.forEach(el => el.classList.remove(__ACTIVE))
      }
    })

    document.addEventListener('click', (e) => {
      const target = e.target
      if (!target.closest('.loose-select')) {
        this.looseSelectArr.forEach(el => el.classList.remove(__ACTIVE))
      }
    })
  }
  bindFilterBtnGroup() {
    const groupArr = [...document.querySelectorAll('[data-filter-group]')]
    for (const group of groupArr) {
      const btnArr = [...group.querySelectorAll('.loose-filter-btn')]
      for (const btn of btnArr) {
        btn.addEventListener('click', () => {
          btn.classList.toggle(__ACTIVE)
          this.observeFilters()
        })
      }
    }

    for (const select of this.looseSelectArr) {
      const inputArr = [...select.querySelectorAll('input[type="text"]')]
      for (const input of inputArr) {
        input.addEventListener('input', () => {
          this.observeFilters()
        })
      }
    }
  }
  bindDmSelectClick() {
    const fade = (except = undefined) => {
      this.dmBtnArr.forEach(el => {
        if (el !== except && !el.classList.contains(__ACTIVE)) {
          el.classList.add(__FADE)
        }
      })
    }

    const reset = () => {
      this.dmBtnArr.forEach(el => {
        el.classList.remove(__ACTIVE)
        el.classList.remove(__FADE)
      })
    }

    for (const btn of this.dmBtnArr) {
      btn.addEventListener('click', () => {
        const someFaded = this.dmBtnArr.some(el => el.classList.contains(__FADE))
        const targetActive = btn.classList.contains(__ACTIVE)
        const targetFaded = btn.classList.contains(__FADE)
        const target = btn

        if (targetActive) {
          target.classList.remove(__ACTIVE)
          if (this.dmBtnArr.some(el => el.classList.contains(__ACTIVE))) {
            target.classList.add(__FADE)
          } else {
            reset()
          }
        } else {
          target.classList.add(__ACTIVE)
          target.classList.remove(__FADE)
          fade(target)
        }

      })
    }
  }
  bindSortModalEvents() {
    const modal = document.querySelector('.sort-modal')
    if (modal) {
      const rowArr = [...modal.querySelectorAll('.sort-modal-row')]
      for (const row of rowArr) {
        const head = row.querySelector('.sort-modal-row__head')
        const body = row.querySelector('.sort-modal-row__body')

        if (head && body) {
          head.addEventListener('click', () => {
            if (body.clientHeight > 0) {
              row.classList.remove(__ACTIVE)
              body.style.height = 0
            } else {
              rowArr.forEach((r) => {
                if (r !== row) {
                  r.classList.remove(__ACTIVE)
                  r.querySelector('.sort-modal-row__body').style.height = 0
                }
              })
              row.classList.add(__ACTIVE)
              const content = body.querySelector('.sort-modal-row__content')
              body.style.height = `${content.scrollHeight + 1}px`
            }
          })
        }
      }
    }
  }

  init() {
    this.bindLooseSelects()
    this.bindFilterBtnGroup()
    this.bindDmSelectClick()
    this.observeFilters()
    this.bindSortModalEvents()
  }
}
document.addEventListener('DOMContentLoaded', () => {
  window.loose = new LooseDiamonds()
})
/* #endregion */


/* #region  Tips */
class PageTip {
  constructor() {
    this.tipElem = null
    this.handleHover()
  }

  handleHover() {
    document.querySelectorAll('[data-tip]').forEach(elem => {
      elem.addEventListener('mouseenter', e => {
        this.createTip(elem)
        this.tipElem.textContent = elem.dataset.tip
        this.setTipPosition(elem)
      })

      elem.addEventListener('mouseleave', e => {
        this.destroyTip()
      })
    })
  }

  createTip(target = undefined) {
    if (!this.tipElem) {
      this.tipElem = document.createElement('div')
      this.tipElem.classList.add('page-tip')
      document.body.append(this.tipElem)

      if (target) {
        const extraClass = target.dataset.tipClass
        if (extraClass) {
          this.tipElem.classList.add(`--${extraClass}`)
        }
      }
    }
  }

  setTipPosition(elem) {
    const { left, top, width, height } = elem.getBoundingClientRect()
    const tipWidth = this.tipElem.getBoundingClientRect().width
    const tipHeight = this.tipElem.getBoundingClientRect().height
    const elemHeight = elem.offsetHeight
    const elemWidth = elem.offsetWidth

    let topPosition = top - tipHeight - 8
    let leftPosition = (left + (elemWidth / 2)) - (tipWidth / 2)

    if (topPosition < 100) {
      topPosition = top + elemHeight + 8
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
document.addEventListener('DOMContentLoaded', () => {
  new PageTip()
})
/* #endregion */


/* #region  Header JS */
const header = {
  init: function () {
    this.renderDOM();
    this.bindEvents();
    this.setDropdowns()
  },
  renderDOM: function () {
    // Login Dropdown
    this.loginBtn = $('[data-evt="toggleAccountDropdown"]');
    this.loginDropdown = $(".login-dropdown");

    // Search
    this.searchBtn = $('[data-evt="toggleSearch"]');
    this.searchBlock = $(".header-search");

    this.loginLink = $('.login-nav__link')
  },
  bindEvents: function () {
    this.loginBtn.on('mouseover mouseleave', function (evt) {
      let dd = header.loginDropdown
      if (dd.length) {
        switch (evt.type) {
          case 'mouseover':
            dd.css({ display: 'block', opacity: 1 })
            break;
          case 'mouseleave':
            dd.css({ display: 'none', opacity: 0 })
            break;
        }
      }
    })
    this.loginLink.click(function (e) {
      e.stopPropagation()
    })

    this.searchBtn.click(() => {
      let el = header.searchBlock;

      function hideSearch() {
        el.removeClass(IS_VISIBLE);
        unlockScroll();
      }

      if (el.hasClass(IS_VISIBLE)) {
        hideSearch()
        if (window.searchBackdrop) {
          window.searchBackdrop.hide();
        }
      } else {
        lockScroll();
        el.addClass(IS_VISIBLE);
        el.find("input").focus();

        window.searchBackdrop = new Backdrop({
          half: true,
          zIndex: (getZIndex(document.querySelector('header')) - 1),
          callback: hideSearch
        })
      }
    });
  },
  setDropdowns: function (...args) {
    args = Array.from(document.querySelectorAll('.header__sub-link'))

    if (args.length !== 0 && args) {

      const dd = document.querySelector('.nav-drop')
      const cont = [...document.querySelectorAll('.nav-drop__content')]
      const subLink = [...document.querySelectorAll('.nav-drop_more')]
      const IS_ACTIVE = 'is-active'

      let hideDelayTime, showDelayTime

      if (dd && cont && subLink) {
        const pos = (el) => {
          return {
            top: el.getBoundingClientRect().top + el.offsetHeight,
            left: el.getBoundingClientRect().left + (el.offsetWidth / 2) - (dd.offsetWidth / 2)
          }
        }

        const fn = {
          initial: () => {
            dd.style.top = `${pos(args[0]).top}px`
            dd.style.left = `${pos(args[0]).left}px`
          },
          hide: () => {
            dd.style.opacity = 0
            dd.style.display = 'none'
            args.forEach(el => el.classList.remove(IS_ACTIVE))
          },
          show: (el) => {
            args.forEach(el => el.classList.remove(IS_ACTIVE))
            el.classList.add(IS_ACTIVE)
            dd.style.display = 'block'
            dd.style.top = `${pos(el).top}px`
            dd.style.left = `${pos(el).left}px`
            dd.style.opacity = 1
          },
          switchContent: (attr) => {
            cont.forEach(el => el.style.display = 'none')
            cont.filter(el => el.id == `dd_${attr}`).forEach(el => el.style.display = 'block')
          }
        }

        const { initial: setInitial, hide: hide, show: show, switchContent: switchContent } = fn

        for (let i = 0; i < subLink.length; i++) {
          const el = subLink[i],
            content = el.querySelector('.nav-drop__sub')
          el.onmouseover = () => { content.style.display = 'block' }
          el.onmouseleave = () => { content.style.display = 'none' }
        }

        dd.onmouseover = (e) => {
          if (hideDelayTime) window.clearTimeout(hideDelayTime)
        }

        dd.onmouseleave = (e) => {
          window.clearTimeout(showDelayTime)
          hideDelayTime = window.setTimeout(() => {
            hide()
          }, 150);
        }


        args.forEach((el) => {
          el.onmouseover = (e) => {
            const attr = el.dataset.dropdown
            if (attr) {
              window.clearTimeout(hideDelayTime)
              showDelayTime = window.setTimeout(() => {
                switchContent(attr)
                show(el)
              }, 200);
            }
          }

          el.onmouseleave = (e) => {
            window.clearTimeout(showDelayTime)
            hideDelayTime = window.setTimeout(() => {
              hide()
            }, 150);
          }
        })

        window.onscroll = () => {
          window.clearTimeout(showDelayTime)
          hide(); setInitial()
        }

        setInitial()
      }
    }
  }
}
/* #endregion */


/* #region  Footer */
const footer = new Object({
  init: function () {
    function attach() {
      if (window.innerWidth < 992) {
        let footerHeader = Array.from($(".footer-col__header"));

        $.each(footerHeader, function (i) {
          let col = $(footerHeader[i]).closest(".footer-col"),
            body = col.find(".footer-col__body");

          if (body.length && col.length) {
            footerHeader[i].onclick = () => {
              if (body.height() == 0) {
                let scrH = body.find(".footer-col__body-scroll")[0]
                  .scrollHeight;
                body.css({
                  height: `${scrH}px`,
                });
              } else {
                let h = body.css("height");
                body.css("height", h);
                setTimeout(() => {
                  body.css({
                    height: "0px",
                  });
                }, 1);
              }
            };
          }
        });
      }
    }

    $(window).on("load resize", function () {
      attach();
    });
  },
})
/* #endregion */


/* #region  Cart Modal */
const cartModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindToggle();
  },
  renderDOM: function () {
    this._ = $(".cart-modal");
    this.backdrop = this._.find(".cart-modal__backdrop");
    this.container = this._.find(".cart-modal__container");
    this.evtToggle = getEvtDOM("toggleCart");
  },
  bindToggle: function () {
    $(document).on('click', '[data-evt="toggleCart"]', function () {
      let el = $(".cart-modal")
      if (el.length) {
        let container = $(".cart-modal__container"),
          backdrop = $(".cart-modal__backdrop")
        if (elemDisplayed(el)) {
          unlockScroll();
          Object.assign(backdrop[0].style, { opacity: 0 });
          Object.assign(container[0].style, { transform: "translateX(100%)" });
          setTimeout(() => {
            el.hide();
          }, getTransitionTime(container));
        } else {
          lockScroll();
          el.show();
          setTimeout(() => {
            Object.assign(backdrop[0].style, { opacity: 1 });
            Object.assign(container[0].style, { transform: "translateX(0%)" });
          }, 1);
        }
      }
    })
  },
  toggle: function () {
    let el = cartModal._;
    if (el.length) {
      if (elemDisplayed(el)) {
        cartModal.close();
      } else {
        cartModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._.show();
    setTimeout(() => {
      Object.assign(this.backdrop[0].style, { opacity: 1 });
      Object.assign(this.container[0].style, { transform: "translateX(0%)" });
    }, 1);
  },
  close: function () {
    unlockScroll();
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(100%)" });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(cartModal.container));
  },
})
/* #endregion */


/* #region  Pg Filters (?) */
const pgFilter = {
  init: function () {
    this.setFiltersStickyPos()
  },
  setFiltersStickyPos: function () {
    const pageFilters = document.querySelector('.page-filters'),
      header = document.querySelector('.header')

    if (pageFilters !== null && header !== null) {
      function adjust() {
        let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue('height'))
        pageFilters.style.top = `${headerHeight}px`
      }
      adjust()
      window.addEventListener('resize', () => {
        adjust()
      })
    }
  }
}
/* #endregion Pg Filters (?) */


/* #region Mobile Menu */
class Menu {
  constructor(rootSelector = '.menu') {
    this._state = false
    this.overState = false
    this.rootEl = document.querySelector(rootSelector)

    if (!this.rootEl) {
      return
    }

    this.contentList = this.rootEl.querySelector('.menu__content-list')
    this.overList = this.rootEl.querySelector('.menu__over-list')
    this.subListArr = [...this.rootEl.querySelectorAll('[data-menu-list]')]
    this.activeListName = this.rootEl.querySelector('#activeListName')

    this.init()
  }

  get state() {
    return this._state
  }

  set state(value) {
    this._state = value
    if (this._state) {
      this.open(true)
    } else {
      this.close(true)
    }
  }

  open(fromSetter = false) {
    if (!fromSetter) {
      this._state = true
    }

    this.rootEl.style.display = 'block'
    setTimeout(() => {
      lockScroll()
      this.rootEl.classList.add(__ACTIVE)
      window.menuBackdrop = new Backdrop({
        half: true,
        callback: () => { this.close() }
      })
    }, 5);
  }

  close(fromSetter = false) {
    if (!fromSetter) {
      this._state = false
    }

    if (window.menuBackdrop) {
      window.menuBackdrop.hide(true)
    }

    unlockScroll()
    this.rootEl.classList.remove(__ACTIVE)

    if (this.overState) {
      this.closeOverList()
    }

    setTimeout(() => {
      this.contentList.scrollTop = 0
      this.rootEl.style.display = 'none'
    }, getTransitionTime(this.rootEl));
  }

  toggle() {
    this.state = !this.state
  }

  openOverList() {
    if (!this.overState) {
      this.overState = true
      this.overList.style.display = 'block'
      this.overList.scrollTop = 0
      this.rootEl.classList.add('--over-active')
      setTimeout(() => {
        this.contentList.classList.add(__HIDDEN)
        this.overList.classList.add(__VISIBLE)
      }, 5);
    }
  }

  closeOverList() {
    if (this.overState) {
      this.overState = false
      this.contentList.classList.remove(__HIDDEN)
      this.overList.classList.remove(__VISIBLE)
      this.rootEl.classList.remove('--over-active')
      this.contentList.scrollTop = 0

      setTimeout(() => {
        this.overList.style.display = 'none'
      }, getTransitionTime(this.overList));

      if (this.activeListName) {
        this.activeListName.innerHTML = this.activeListName.dataset.title || 'Explore Icebox'
      }
    }
  }

  goToNavList(name, item = undefined) {
    if (name) {
      const list = this.subListArr.find(el => el.dataset.menuList === name)
      if (!list) throw new Error('data-menu-list not found')

      this.subListArr.forEach((el) => {
        if (el !== list) {
          el.style.display = 'none'
        } else {
          el.style.display = 'block'
        }
      })
      if (this.activeListName && item) {
        this.activeListName.innerHTML = item.querySelectorAll('span')[0].innerHTML
      }
      this.openOverList()
    }
  }

  reset() {
    this.state = false
    this.overState = false
    this.contentList.scrolTop = 0
    this.overList.scrollTop = 0
  }

  // Events
  bindEvents() {
    const evtNavArr = [...document.querySelectorAll('[data-menu-nav]')]
    evtNavArr.forEach((item) => {
      item.onclick = () => {
        if (this.state && !this.overState) {
          const listName = item.dataset.menuNav
          this.goToNavList(listName, item)
        }
      }
    })

    const evtToggleMenuArr = [...document.querySelectorAll('[data-evt="toggleMenu"]')]
    evtToggleMenuArr.forEach((el) => {
      el.addEventListener('click', () => {
        this.open()
      })
    })
  }

  init() {
    this.reset()
    this.bindEvents()
  }
}
document.addEventListener('DOMContentLoaded', () => {
  window.menu = new Menu('.menu')
})
/* #endregion Mobile Menu */


/* #region  Currency Modal */
const currencyModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindEvents();
  },
  renderDOM: function () {
    this._ = $(".cur-modal");
    this.backdrop = this._.find(".cur-modal__backdrop");
    this.container = this._.find(".cur-modal__container");
    this.evtToggle = getEvtDOM("toggleCurrency");
    this.input = this._.find("input");
  },
  bindEvents: function () {
    if (currencyModal.evtToggle.length) {
      $.each(currencyModal.evtToggle, (i) => {
        currencyModal.evtToggle[i].onclick = () => {
          currencyModal.toggle();
        };
      });
    }

    if (currencyModal.input.length) {
      currencyModal.input.on("keyup", function () {
        currencyModal.intraSearch($(this));
      });
    }
  },
  toggle: function () {
    this.input.val("").trigger("keyup");
    let modal = currencyModal._;
    if (modal.length) {
      if (elemDisplayed(modal)) {
        currencyModal.close();
      } else {
        currencyModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._.show();
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 });
      this.container.css({ transform: "translateX(0%)" });
    }, 1);
  },
  close: function () {
    unlockScroll();
    this.backdrop.css({ opacity: 0 });
    this.container.css({ transform: "translateX(100%)" });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(currencyModal.backdrop));
  },
  intraSearch: function (input) {
    let val = input.val().toLowerCase(),
      arr = [...$(".cur-item")];
    $.each(arr, function (index) {
      let txt = $(arr[index]).find(".cur-item__name").text().toLowerCase();
      if (~txt.indexOf(val)) {
        $(arr[index]).show();
      } else {
        $(arr[index]).hide();
      }
    });
  },
})
/* #endregion */



/* #region  Homepage SPLIDE */
const homepageCategoriesSlider = new Object({
  init: function () {
    const el = document.querySelector('.home-categories-splide')
    if (el && el !== null) {
      let slider = new Splide(el, {
        type: "loop",
        perPage: 7,
        perMove: 2,
        autoplay: 0,
        gap: "8px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1680: { perPage: 6, },
          1120: { perPage: 5, },
          767: { perPage: 3, perMove: 2 },
          600: { perPage: 2, gap: 6 }
        }
      })
      slider.mount()
    }
  }
})
const homePageSplide = new Object({
  init: function () {
    const homeSplideArr = Array.from(
      document.getElementsByClassName("home-splide")
    );

    $.each(homeSplideArr, function (i) {
      const el = homeSplideArr[i];
      let main = new Splide(el, {
        type: "loop",
        perPage: 5,
        perMove: 1,
        autoplay: 0,
        gap: "8px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1980: {
            perPage: 5
          },
          1680: {
            perPage: 4
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "24px", col: "8px" }
            }
          },
          478: {
            grid: {
              rows: 2,
              cols: 2
            },
          },
        },
      }).mount(window.splide.Extensions);
    });
  },
})
/* #endregion */


/* #region  PG Data / Guide Modal Data / PGM Data */
const pgSelect = {
  initalized: undefined,
  init: function () {
    this.renderDOM();
    this.initalized = true;
  },
  getAttrDOM: function (att) {
    return $(`[data-pg-set="${att}"]`);
  },
  renderDOM: function () {
    // Shape
    this.shapeImg = this.getAttrDOM("shapeImg");
    this.shapeTitle = this.getAttrDOM("shapeTitle");
    this.shapeDescription = this.getAttrDOM("shapeDescription");

    // Color
    this.colorImg = this.getAttrDOM("colorImg");
    this.colorTitle = this.getAttrDOM("colorTitle");
    this.colorDescription = this.getAttrDOM("colorDescription");

    // Clarity
    this.clarityImg = this.getAttrDOM("clarityImg");
    this.clartyTitle = this.getAttrDOM("clarityTitle");
    this.clarityDescription = this.getAttrDOM("clarityDescription");

    // Ring Size
    this.currentSize = this.getAttrDOM("currentSize");
    this.circSize = this.getAttrDOM("circSize");
    this.dSize = this.getAttrDOM("dSize");
    this.euSize = this.getAttrDOM("euSize");
    this.ukSize = this.getAttrDOM("ukSize");
  },
  attachControls: function (sArr, sBtn) {
    if (!this.initalized) {
      pgSelect.init();
    }
    let selectArr = sArr,
      selectBtn = sBtn;
    for (let i = 0; i < selectArr.length; i++) {
      let thisAttr = selectArr[i].getAttribute("data-pg-select"),
        btnArr = Array.from($(selectArr[i]).find(selectBtn));

      function setPgSelectEvent() {
        let dataSet;
        switch (thisAttr) {
          case "shape":
            dataSet = pgSelect.shape;
            break;
          case "color":
            dataSet = pgSelect.color;
            break;
          case "clarity":
            dataSet = pgSelect.clarity;
            break;
          case "ring-size":
            dataSet = pgSelect.ringSize;
            break;
        }
        return { dataSet };
      }

      $.each(btnArr, function (i) {
        btnArr[i].onclick = () => {
          setPgSelectEvent().dataSet.changeDetails(i);
          $.each(btnArr, function (i) {
            btnArr[i].classList.remove("is-active");
          });
          $(this).addClass("is-active");
        };
      });
    }
  },
  shape: {
    changeDetails: function (index) {
      pgSelect.shapeImg.attr("src", pgSelect.data.shape[index].url);
      pgSelect.shapeTitle.html(pgSelect.data.shape[index].title);
      pgSelect.shapeDescription.html(pgSelect.data.shape[index].description);
    },
  },
  color: {
    changeDetails: function (index) {
      pgSelect.colorImg.attr("src", pgSelect.data.color[index].url);
      pgSelect.colorTitle.html(pgSelect.data.color[index].title);
      pgSelect.colorDescription.html(pgSelect.data.color[index].description);
    },
  },
  clarity: {
    changeDetails: function (index) {
      pgSelect.clarityImg.attr("src", pgSelect.data.clarity[index].url);
      pgSelect.clartyTitle.html(pgSelect.data.clarity[index].title);
      pgSelect.clarityDescription.html(
        pgSelect.data.clarity[index].description
      );
    },
  },
  ringSize: {
    changeDetails: function (index) {
      pgSelect.currentSize.html(pgSelect.data.ringSize[index].us);
      pgSelect.circSize.html(pgSelect.data.ringSize[index].circ);
      pgSelect.dSize.html(pgSelect.data.ringSize[index].diameter);
      pgSelect.euSize.html(pgSelect.data.ringSize[index].europe);
      pgSelect.ukSize.html(pgSelect.data.ringSize[index].uk);
    },
  },
  data: {
    shape: [
      {
        url: "https://i.ibb.co/ZBmcG0f/dmg-shape-round.png",
        title: "Round",
        description:
          "A classic and timeless shape, the round diamond is known for its brilliant sparkle and perfect symmetry.",
      },
      {
        url: "https://i.ibb.co/rdNkYyp/dmg-shape-priness.png",
        title: "Princess",
        description:
          "A square-shaped diamond with sharp corners and exceptional brilliance, known for its modern and clean lines.",
      },
      {
        url: "https://i.ibb.co/271bsCZ/dmg-shape-oval.png",
        title: "Oval",
        description:
          "A modified brilliant cut diamond with an elongated shape, known for its brilliance and ability to create the illusion of longer, slender fingers.",
      },
      {
        url: "https://i.ibb.co/qyQnV1f/dmg-shape-pear.png",
        title: "Pear",
        description:
          "An elegant combination of a round and marquise shape, sometimes called a teardrop, offering a unique and graceful appearance.",
      },
      {
        url: "https://i.ibb.co/NVdgJtv/dmg-shape-emerald.png",
        title: "Emerald",
        description:
          "A rectangular shape with stepped facets, highlighting the diamonds clarity and showcasing a timeless and sophisticated look.",
      },
    ],
    color: [
      {
        url: "https://i.ibb.co/MDnYmGh/dmg-color-near.png",
        title: "K - Last Grade",
        description:
          "The color may be visible to the unaided eye. Diamonds with a K-color grade can be a smart choice, offering excellent value for money.",
      },
      {
        url: "https://i.ibb.co/MDnYmGh/dmg-color-near.png",
        title: "J - Last Grade",
        description:
          'Color in diamonds graded as "near-colorless" may be slightly visible to the naked eye, especially in fancy shapes or diamonds larger than 1 carat.',
      },
      {
        url: "https://i.ibb.co/JkK4B3C/dmg-color-slight.png",
        title: "I - Slightly Detectable",
        description:
          "Upon close examination, the color may be barely noticeable, but it still provides exceptional value.",
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "H - Near Colorless",
        description:
          'The "near-colorless" grade of CA exhibits noticeable color only when compared to much higher color grades, offering excellent value.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "G - Almost Colorless",
        description:
          'This grade is the highest level of "near-colorless" and may show some color in comparison to the even higher "colorless" grades, but it offers excellent value.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "F - Colorless",
        description:
          'The "colorless" grade is most valued when placed in platinum or white gold, with a faint color that can be identified by a skilled gemologist.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "E - Colorless",
        description:
          'This grade, best showcased in platinum or white gold, is so "colorless" that even trained eyes would struggle to detect traces of color.',
      },
    ],
    clarity: [
      {
        url: "https://i.ibb.co/Gp8pKwK/clarity-i3.png",
        title: "I1, I2, I3 - Included",
        description:
          "Diamonds in this clarity range have inclusions that are easily visible under 10x magnification and may also be visible to the naked eye. These diamonds may have reduced brilliance and sparkle due to their inclusions.",
      },
      {
        url: "https://i.ibb.co/ZHBvJz9/clarity-si1-si2.png",
        title: "SI1 & SI2 - Slightly Included",
        description:
          "These grades have noticeable inclusions under 10x magnification, some of which might be visible to the naked eye. SI diamonds generally offer good value as they have inclusions that might not significantly affect the appearance of the diamond.",
      },
      {
        url: "https://i.ibb.co/27xG7GC/clarity-vs1-vs2.png",
        title: "VS1 & VS2 - Very Slightly Included",
        description:
          "These grades have minor inclusions that are visible under 10x magnification but are considered relatively small and not easily noticeable to the naked eye.",
      },
      {
        url: "https://i.ibb.co/d61wnL9/clarity-vvs1-vvs2.png",
        title: "VVS1 & VVS2 - Very, Very Slightly Included",
        description:
          "These grades indicate that inclusions are extremely difficult to see even under 10x magnification. VVS diamonds may have minor inclusions that are barely visible to a skilled grader.",
      },
      {
        url: "https://i.ibb.co/WKsqs99/clarity-fl-if.png",
        title: "FL & IF - Flawless",
        description:
          "These are the highest clarity grades. Flawless diamonds have no visible inclusions or blemishes under 10x magnification, even by a skilled grader. Internally Flawless diamonds have no internal inclusions but may have minor surface blemishes.",
      },
    ],
    ringSize: [
      { us: 4, europe: "47", uk: "H 1/2", diameter: "14.9", circ: "46.8" },
      { us: 4.5, europe: "48", uk: "I 1/2", diameter: "15.3", circ: "48" },
      { us: 5, europe: "49", uk: "J 1/2", diameter: "15.7", circ: "49.3" },
      { us: 5.5, europe: "51", uk: "K 1/2", diameter: "16.1", circ: "50.6" },
      { us: 6, europe: "52", uk: "L 1/2", diameter: "16.5", circ: "51.9" },
      { us: 6.5, europe: "53", uk: "M 1/2", diameter: "16.9", circ: "53.1" },
      { us: 7, europe: "54", uk: "N 1/2", diameter: "17.3", circ: "54.4" },
      { us: 7.5, europe: "55", uk: "O 1/2", diameter: "17.7", circ: "55.7" },
      { us: 8, europe: "57", uk: "P 1/2", diameter: "18.1", circ: "57.0" },
      { us: 8.5, europe: "58", uk: "Q 1/2", diameter: "18.5", circ: "58.3" },
      { us: 9, europe: "59", uk: "R 1/2", diameter: "19.0", circ: "59.5" },
      { us: 9.5, europe: "61", uk: "S 1/2", diameter: "19.4", circ: "60.8" },
      { us: 10, europe: "62", uk: "T 1/2", diameter: "19.8", circ: "62.1" },
      { us: 10.5, europe: "63", uk: "U 1/2", diameter: "20.2", circ: "63.4" },
      { us: 11, europe: "64", uk: "V 1/2", diameter: "20.6", circ: "64.6" },
      { us: 11.5, europe: "66", uk: "W 1/2", diameter: "21.0", circ: "65.9" },
      { us: 12, europe: "67", uk: "X 1/2", diameter: "21.4", circ: "67.2" },
      { us: 12.5, europe: "68", uk: "Z 1/2", diameter: "21.8", circ: "68.5" },
    ],
  },
}
/* #endregion */
/* #region  PG Modal / Guide Modal / PGM Modal */
const pgModal = new Object({
  initialized: undefined,
  init: function () {
    this.renderDOM();
    this.bindEvents();
    Object.values(this.initFn).forEach((target) => {
      if (typeof target === "function") target();
    });
    this.intialized = true;
  },

  renderDOM: function () {
    // Root
    this.modal = $(".pg-modal");
    this.container = $(".pg-modal__container");
    this.backdrop = $(".pg-modal__backdrop");
    this.close = $('[data-evt="closePgModal"]');

    // Sections
    this.section = $(".pg-section");
    this.row = $(".pg-row");
    this.scrollContainer = $(".pg-modal__overscroll");
    this.sectionBracelets = this.section.filter("#pgBracelets");
    this.sectionDiamonds = this.section.filter("#pgDiamonds");
    this.sectionRings = this.section.filter("#pgRings");
    this.sectionNecklaces = this.section.filter("#pgNecklaces");

    // Controls
    this.switchBtn = $(".pg-switch-btn");

    // Select Tabs
    this.selectArr = Array.from($(".pg-select"));
    this.selectBtn = $(".pg-select-btn");
  },
  bindEvents: function () {
    this.close.click(function () {
      pgModal.fn.closeModal();
    });
  },

  fn: {
    openModal: function (target) {
      lockScroll();
      pgModal.modal.show();
      setTimeout(() => {
        pgModal.backdrop.css({ opacity: 1 });
        pgModal.container.removeClass("is-hidden");
      }, 1);
      let att = $(target).attr("data-pg-open");
      pgModal.section.hide();
      switch (att) {
        case "diamonds":
          pgModal.sectionDiamonds.show();
          break;
        case "rings":
          pgModal.sectionRings.show();
          break;
        case "bracelets":
          pgModal.sectionBracelets.show();
          break;
        case "necklaces":
          pgModal.sectionNecklaces.show();
          break;
        default:
          pgModal.section[0].show();
          break;
      }
      pgModal.scrollContainer[0].scrollTop = 0;
      pgSelect.attachControls(pgModal.selectArr, pgModal.selectBtn);
    },
    closeModal: function () {
      unlockScroll();
      pgModal.backdrop.css({ opacity: 0 });
      pgModal.container.addClass("is-hidden");
      setTimeout(() => {
        pgModal.modal.hide();
      }, 475);
    },
    setMobile: function () {
      if ($(window).width() < 480) {
        let arr = Array.from(pgModal.section);
        for (let i = 0; i < arr.length; i++) {
          let nArr = Array.from($(arr[i]).find(pgModal.row));
          $.each(nArr, function (i) {
            if (i > 0) {
              $(nArr[i]).hide();
            }
          });
        }
      }
    },
    attachSectionControls: function () {
      pgModal.section.each(function () {
        let btnArr = [...$(this).find(pgModal.switchBtn)];
        let rowArr = [...$(this).find(pgModal.row)];
        $.each(btnArr, function (i) {
          btnArr[i].onclick = () => {
            $.each(rowArr, function (i) {
              $(rowArr[i]).hide();
            });
            $.each(btnArr, function (i) {
              $(btnArr[i]).removeClass("is-active");
            });
            $(this).addClass("is-active");
            $(rowArr[i]).show();
          };
        });
      });
    },
  },

  initFn: {
    setInitial: () => {
      pgModal.fn.closeModal();
      pgModal.fn.setMobile();
      pgModal.fn.attachSectionControls();
    },
  },
})
/* #endregion */


/* #region  Product Page : Main */
const productPage = new Object({
  initialized: undefined,
  classes: {
    isActive: "is-active",
    isCollapsed: "is-collapsed",
  },

  init: function () {
    // NEW UPDATE -- DELETE LATER
    const new_page_exist = document.querySelector('.main_product_upd') !== null
    if (!new_page_exist) {
      this.renderDOM();
      this.bindEvents();
      this.bindToggleSummary()
      Object.values(this.initFn).forEach((target) => {
        if (typeof target === "function") target();
      });
      this.intialized = true;
      // this.fn.initZoom()
    }
  },
  renderDOM: function () {
    this.evtExpandSummary = $('[data-evt="expandSummary"]');
    this.summaryContainer = $(".product__item-summary");
    this.buyBtn = $(".buy-btn");
    this.moreBtn = $('.product__more-btn')
    // Options
    this.optionBtn = $(".option-btn");
    this.optionBlock = $(".product__item-option");
    this.optionBody = $(".product-option__body");
    this.optionHead = $(".product-option__head");
    // Gold Color
    this.goldOption = $(".option_gold-color");
    this.goldOptionBtn = this.goldOption.find(this.optionBtn);
    // Diamond Color
    this.dmColorOption = $(".option_diamond-color");
    this.dmColorOptionBtn = this.dmColorOption.find(this.optionBtn);
    // Ring Size
    this.ringOption = $(".option_ring-size");
    // Floating controls
    this.floatingBtn = $(".floating-btn-mobile");
    // Guide controls
    this.evtOpenGuide = $("[data-pg-open]");
  },
  bindEvents: function () {
    this.optionBtn.click(function () {
      if ($(this).not(`.${IS_ACTIVE}`)) {
        $(this).siblings().removeClass(IS_ACTIVE)
        $(this).addClass(IS_ACTIVE)
      }
    })
    this.optionHead.click(function () {
      productPage.fn.toggleOptionVisible($(this));
    });
    this.goldOptionBtn.click(function () {
      return
      let thisAttr = $(this).attr("data-color");
      productPage.fn.switchGoldColor(thisAttr);
    });
    this.dmColorOptionBtn.click(function () {
      let thisAttr = $(this).attr("data-dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    });
    this.evtOpenGuide.click(function () {
      productPage.fn.openGuideModal($(this));
    });
    this.buyBtn.click(function () {
      $(this).addClass(BUTTON_LOADING);
      setTimeout(() => {
        $(this).removeClass(BUTTON_LOADING);
      }, 2000);
    });
    this.moreBtn.click(function () {
      productPage.fn.toggleMoreDetails($(this))
    })
  },

  fn: {
    toggleFavState: () => {
      // Active / Disactive Favorite Button
      let el = productPage.favButton[0],
        cls = productPage.classes.isActive,
        isActive = el.classList.contains(cls);

      if (isActive) {
        el.classList.remove(cls);
      } else {
        el.classList.add(cls);
      }
    },
    toggleButtonState: (target) => {
      // Active / Disactive Option Button
      let parent = target.closest(productPage.optionBody),
        els = [...parent.find(productPage.optionBtn)],
        cls = productPage.classes.isActive,
        isActived = els.filter((el) => el.classList.contains(cls));

      $(isActived).removeClass(cls);
      target.addClass(cls)
    },
    toggleOptionVisible: (target) => {
      // Show / Hide Option Body
      let thisOption = target.closest(productPage.optionBlock),
        thisBody = thisOption.find(productPage.optionBody),
        thisWrapper = thisBody.find(".product-option__wrapper"),
        isExpanded = thisBody[0].clientHeight !== 0;

      if (isExpanded) {
        const currentHeight = thisBody.css("height");

        thisOption.addClass(productPage.classes.isCollapsed);
        thisBody.css({ height: currentHeight });
        setTimeout(() => {
          thisBody.css({ height: 0 });
          thisWrapper.css({ transform: "translateY(-8px)", opacity: 0 });
          target.css('border-color', '#dcdfe7')
        }, 3);
      } else {
        const transitionTime =
          parseFloat(
            window.getComputedStyle(thisBody[0]).transitionDuration
          ) * 1000,
          toHeight = thisWrapper[0].scrollHeight;

        thisOption.removeClass(productPage.classes.isCollapsed);
        thisBody.css({ height: `${toHeight}px` });
        thisWrapper.css({ transform: "translateY(0px)", opacity: 1 });
        target.css('border-color', '#171c29')
        setTimeout(() => {
          thisBody.css({ height: "auto" });
        }, transitionTime);
      }
    },
    switchGoldColor: (attr) => {
      // Toggle Gold Color Header Background
      let color, textColor
      switch (attr) {
        case "Yellow": color = "#f1e9d8", textColor = "#171c29"; break;
        case "Rose": color = "#f0dcda", textColor = "#171c29"; break;
        case "White": color = "#f1f1f1", textColor = "#171c29"; break;
        case "Red": color = "#d4474f", textColor = "#ffffff"; break;
        case "Steel": color = "#ebebeb", textColor = "#171c29"; break;
        case "Blue": color = "#e6f2f8", textColor = "#171c29"; break;
        case "Black": color = "#232323", textColor = "#ffffff"; break;
        case "Platinum": color = "#e7e7e4", textColor = "#171c29"; break;
        case "Two_tone": color = "linear-gradient(34deg, #ebe3d3, #f8f6f2 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Navy_blue": color = "#223164", textColor = "#ffffff"; break;
        case "Two_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f0dcda 55%, #fff)", textColor = "#171c29"; break;
        default: color = "#e6f2f8", textColor = "#171c29"; break;
      }
      productPage.goldOption
        .find(productPage.optionHead)
        .css({ "background": color, color: textColor });
    },
    switchDiamondColor: (attr) => {
      // Toggle Diamond Color Header Background
      let bgColor, textColor;
      switch (attr) {
        case "White":
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
        case "Black":
          (bgColor = "#434343"), (textColor = "#ffffff");
          break;
        case "Blue":
          (bgColor = "#e3eeff"), (textColor = "#171c29");
          break;
        case "Yellow":
          (bgColor = "#fff9e4"), (textColor = "#171c29");
          break;
        default:
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
      }
      productPage.dmColorOption
        .find(productPage.optionHead)
        .css({ "background-color": bgColor, color: textColor });
    },
    toggleMoreDetails: (target) => {
      // Show / Hide Warranty or More Details
      let $this = target,
        els = productPage.moreBtn,
        container = $('.product__about-wrap')

      els.removeClass(IS_ACTIVE)
      $this.addClass(IS_ACTIVE)

      container.hide()

      if ($this[0].classList.contains('for_more')) container.filter('.for_more').show()
      if ($this[0].classList.contains('for_warranty')) container.filter('.for_warranty').show()
    },
    openGuideModal: (target) => {
      if (target) {
        pgModal.fn.openModal(target);
      }
    },
  },

  initFn: {
    setupSummary: () => {
      const
        sum = document.querySelector('.product__item-summary'),
        maxHeight = 150

      if (sum) {
        let isBigger = sum.scrollHeight > maxHeight
        if (isBigger) {
          sum.style.height = `${maxHeight}px`
          sum.insertAdjacentHTML(
            'beforeend',
            `<div class="product__item-summary-gradient"></div>
            `
          )

          const expandElement = document.createElement('div');
          expandElement.classList.add('product__item-summary-expand');
          expandElement.onclick = () => {
            const gradient = sum.querySelector('.product__item-summary-gradient')
            gradient.remove()
            expandElement.remove()
            sum.style.height = 'auto'
          };

          sum.appendChild(expandElement);
        }
      }
    },
    // Events Fires on initialization
    // checkSummary: () => {
    //   // If there is a list, then collapse description else nothing.
    //   let container = productPage.summaryContainer,
    //     list = container.find("ul"),
    //     cls = productPage.classes.isCollapsed;
    //   if (list.length == 0) {
    //     return false;
    //   } else {
    //     const button = $("<button>", {
    //       class: "product__summary-toggle",
    //       html: "Show More...",
    //     }).on("click", function () {
    //       if (container.hasClass(cls)) {
    //         container.removeClass(cls);
    //         this.innerHTML = "Show Less...";
    //       } else {
    //         container.addClass(cls);
    //         this.innerHTML = "Show More...";
    //       }
    //     });

    //     container.addClass(cls).append(button);
    //   }
    // },
    checkGoldColor: () => {
      return
      // On load check active gold color
      let buttons = [...productPage.goldOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("color");
      productPage.fn.switchGoldColor(thisAttr);
    },
    checkGoldColorNumber: () => {
      const cont = productPage.goldOption,
        btn = cont.find(productPage.optionBtn)
      if (btn.length < 3) {
        cont.find('.options-block').css({ display: 'flex' })
      }
    },
    checkDmColor: () => {
      // On load check active diamond color
      let buttons = [...productPage.dmColorOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    },
    checkRingSizes: () => {
      // If there is ring sizes less than 5.5 && more than 11.5 then add more buttons
      let thisOption = productPage.ringOption;
      let arr = Array.from(thisOption.find(productPage.optionBtn));
      if (arr.length > 15) {
        let sliced = [];
        sliced.push(arr.slice(0, 3), arr.slice(-3));
        $.each(sliced, function (i) {
          $(sliced[i]).hide();
        });

        let smallerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "smallerSizes",
        });

        let biggerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "biggerSizes",
        });

        smallerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(0, 3), function (i) {
            $(arr.slice(0, 3)[i]).css({ display: "flex" });
          });
        });
        biggerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(-3), function (i) {
            $(arr.slice(-3)[i]).css({ display: "flex" });
          });
        });

        let parent = thisOption.find(".options-block");

        parent.append(biggerBtn);
        parent.prepend(smallerBtn);
      }
    },
    initTippy: () => {
      // Initiale tippy
      if ($(window).width() >= 992) {
        tippy(".item-option__mark", {
          allowHTML: false,
          delay: 200,
          // theme: 'ib_options',
          maxWidth: 270,
        });
      }
    },
    initFloating: () => {
      // Initialize floating button mobile
      let el = productPage.floatingBtn
      if (el.length) {
        let elHeight = el[0].scrollHeight
        function attachTrigger() {
          let triggerEl = $("#productAddCart");
          if (triggerEl.length) {
            $(window).scroll(function () {
              let hT = triggerEl.offset().top,
                hH = triggerEl.outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();

              if (wS + 100 > hT - wH && hT > wS + 100 && wS + 100 + wH > hT) {
                el.css({ transform: `translateY(${elHeight}px)` });
              } else {
                el.css({ transform: `translateY(0px)` });
              }
            });
          }
        }
        if (el.length > 0) {
          if ($(window).width() > 479) {
            el.hide();
          } else {
            attachTrigger();
          }
          $(window).on("load resize", function () {
            if ($(window).width() > 479) {
              el.hide();
            } else {
              el.show();
              attachTrigger();
            }
          });
        }
      }
    },
    attachPayLaterBoxEvents: function (...args) {
      args = [...document.querySelectorAll('[data-paylater]')]

      const introEls = [...$('#payLaterBoxIntro').find('h3, p, button')]
      const details = document.getElementById('payLaterBoxDetails')

      if (args && args.length && details) {
        const toggle = () => {
          if (window.getComputedStyle(details).display == 'none') {
            details.style.display = 'block'; introEls.forEach((el) => { el.style.display = 'none' })
          } else {
            introEls.forEach((el) => { el.style.display = 'block' }); details.style.display = 'none'
          }
        }

        args.forEach(el => el.onclick = () => {
          toggle()
        })
      }
    }
  },

  bindToggleSummary: function () {
    return
    const sum = document.querySelector('.product__item-summary')
    if (sum) {
      const currentHeight = sum.offsetHeight
      const line = sum.closest('.side-row__line')

      if (!line) return
      if (currentHeight < 250) return

      const toggleBtn = createElem('button', {
        className: 'toggle-summary',
        innerHTML: 'Show more'
      })

      toggleBtn.onclick = () => {
        const elem = document.querySelector('.product__item-summary')
        if (elem.offsetHeight > 180) {
          elem.style.height = '180px'
          elem.classList.remove(__EXPANDED)
          toggleBtn.innerHTML = 'Show more'
        } else {
          const scrollH = document.querySelector('.product__item-summary').scrollHeight
          elem.style.height = `${scrollH}px`
          elem.classList.add(__EXPANDED)
          toggleBtn.innerHTML = 'Show less'
        }
      }

      line.appendChild(toggleBtn)
      sum.style.height = `180px`
      sum.classList.add('--limited')
    }
  }
})
/* #endregion */


/* #region  Product Page SPLIDE */
const productSplide = new Object({
  initialized: undefined,
  init: function () {
    this.renderDOM();
    this.initSplide();
    this.initialized = true;
    this.initMoreSplide();
  },
  renderDOM: function () {
    this.sliderArr = Array.from(
      document.getElementsByClassName("product-slider")
    );
    this.thumbArr = Array.from(
      document.getElementsByClassName("product-slider_thumbnails")
    );
  },
  initSplide: function () {
    $.each(this.sliderArr, function (i) {
      const slider = productSplide.sliderArr[i];
      const thumbnails = productSplide.thumbArr[i];
      let main = new Splide(slider, {
        type: "slider",
        perPage: 1,
        perMove: 1,
        gap: 0,
        arrows: true,
        pagination: true,
        speed: 750,
        drag: false,
        noDrag: '--sirv',
        breakpoints: {
          478: {
            perPage: 1,
            perMove: 1,
          },
        },
      });
      // let thumb = new Splide(thumbnails, {
      //   rewind: true,
      //   pagination: false,
      //   arrows: false,
      //   cover: true,
      //   isNavigation: true,
      // })

      // main.on('drag', () => {
      //   const root = main.root
      //   const slide = root.querySelector('.splide__slide.is-active')
      //   const slideIsSirv = slide.classList.contains('--sirv')
      //   if (slideIsSirv) {
      //     main.destroy()
      //   }
      // })

      // main.sync(thumb);
      main.mount();
      // thumb.mount();
    });
  },
  initMoreSplide: function () {
    const moreSliderArr = Array.from(
      document.getElementsByClassName("more-row__splide")
    );

    $.each(moreSliderArr, function (i) {
      const slider = moreSliderArr[i];
      let main = new Splide(slider, {
        type: "loop",
        perPage: 4,
        perMove: 1,
        autoplay: 0,
        gap: "8px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1980: {
            perPage: 5,
            perMove: 1,
          },
          1680: {
            perPage: 4,
            perMove: 1,
          },
          1120: {
            perPage: 4,
            perMove: 1,
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "10px", col: "8px" },
            },
          },
          478: {
            grid: {
              rows: 2,
              cols: 2,
              gap: { row: "24px", col: "8px" },
            },
          },
        },
      }).mount(window.splide.Extensions);
    });
  },
})
/* #endregion */


/* #region  My Bag */
const myBag = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    formatSummaryPrice: function () {
      const lines = [...document.querySelectorAll('.summary-price')]
      for (const line of lines) {
        const span = line.querySelector('span:last-child')
        if (span) {
          const text = span.innerText
          let num = Number(text.replace(/[^0-9.-]/g, ''))
          if (num !== 0) {
            num = num.toFixed(2)
            num = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            span.innerText = `$ ${num}`
          }
        }
      }
    },
    setSalePercentValues: function () {
      const cards = [...document.querySelectorAll('.mybag-card')]
      for (const card of cards) {
        const newPrice = card.querySelector('.card-price_new')
        const oldPrice = card.querySelector('.card-price_old')
        const saleElem = card.querySelector('.mybag-card-sale')
        if (newPrice && oldPrice && saleElem) {
          const newPriceNum = Number(newPrice.innerText.replace(/[^0-9]/g, ''))
          const oldPriceNum = Number(oldPrice.innerText.replace(/[^0-9]/g, ''))
          let sale = ((oldPriceNum - newPriceNum) / oldPriceNum) * 100
          sale = Math.round(sale / 10) * 10;
          if (sale % 10 >= 5) {
            sale = Math.ceil(sale / 10) * 10;
          } else {
            sale = Math.floor(sale / 10) * 10;
          }
          saleElem.innerText = `${sale}% OFF`
        }
      }
    },
    setCapitalizeCheckoutBtn: function () {
      const btnArr = [...document.querySelectorAll('.checkout__main-btn')]
      for (const btn of btnArr) {
        const text = btn.innerText.split(' ').reduce((acc, el) => {
          acc.push(el.charAt(0).toUpperCase() + el.slice(1).toLowerCase())
          return acc
        }, [])
        btn.innerText = text.join(' ')
      }
    }

  }
})
/* #endregion */


/* #region  Account page */
const account = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    editAddress: function () {
      const evtEditAddress = Array.from($('[data-edit="address"]'))
      for (let i = 0; i < evtEditAddress.length; i++) {
        const el = evtEditAddress[i];

        $(el).click(function () {
          let details = $(this).closest('.profile-card').find('.profile-card__details'),
            form = details.filter('.form')
          if (elemDisplayed(form)) {
            details.hide().not(form).show()
          } else {
            details.show().not(form).hide()
          }
        })

      }
    },
    toggleInvoiceHeight: function () {
      const invoiceArr = [...document.querySelectorAll('.order__invoice')]
      for (const invoice of invoiceArr) {
        const header = invoice.querySelector('.order__invoice-header')
        const body = invoice.querySelector('.order__invoice-body')

        header.onclick = () => {
          const toClose = invoice.classList.contains(__ACTIVE)
          if (toClose) {
            invoice.classList.remove(__ACTIVE)
            body.style.height = `80px`
          } else {
            invoice.classList.add(__ACTIVE)
            const scrollHeight = body.scrollHeight
            body.style.height = `${scrollHeight}px`
          }
        }
      }
    }
  }
})
/* #endregion */


/* #region  Location page */
const locationPage = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    toggleStoresVisibility: function () {
      let headArr = [...$('.store-row__head')]
      $.each(headArr, function (i) {
        $(headArr[i]).click(function () {
          let rows = $('.store-row'),
            thisRow = $(this).closest(rows)
          if (elemDisplayed(thisRow.find('.store-row__body'))) {
            return false
          } else {
            rows.find('.store-row__body').show()
            rows.not(thisRow).find('.store-row__body').hide()
          }
        })
      })
    }
  }
})
/* #endregion */


/* #region Page Alers */
var alertTimer;
const pageAlerts = {
  classes: {
    fullWidth: 'page-alert_backdrop',
    error: 'page-alert_error',
    warning: 'page-alert_warning',
    info: 'page-alert_info',
    visible: 'is-visible'
  },
  init: function () {
    this.cacheDOM()
    this.bindEvents()
    // this.fullWidth()
  },
  cacheDOM: function () {
    this.container = $('.page-alert')
    this.title = $('.page-alert-title')
    this.subtitle = $('.page-alert-text')
    this.close = $('[data-evt="hidePageAlert"]')
  },
  bindEvents: function () {
    this.close.click(this.hideAlert.bind(this))
    clearTimeout(alertTimer)
  },
  fullWidth: function () {
    this.container.addClass(this.classes.fullWidth)
  },
  showAlert: function (errorType = function () { pageAlerts.resetAlert() }, title, text, hideTime = 2500) {
    clearTimeout(alertTimer)
    this.resetAlert();

    this.container.addClass(this.classes.visible).addClass(errorType)
    this.changeMsg(title, text)
    alertTimer = window.setTimeout(function () {
      pageAlerts.hideAlert()
    }, hideTime)
  },
  hideAlert: function () {
    this.container.removeClass(this.classes.visible)
  },
  changeMsg: function (title, text) {
    this.title.html(title)
    this.subtitle.html(text)
  },
  resetAlert: function () {
    this.container.removeClass(function () {
      let i = pageAlerts.classes
      return `${i.warning} ${i.info} ${i.error}`
    })
  }
}
function showMessage(type, title, msg) {
  var alert_type = (type === 'success') ? pageAlerts.classes.info : pageAlerts.classes.error;
  pageAlerts.showAlert(alert_type, title, msg);
}
/* #endregion */


/* #region Sell Pages */
const bookModal = {
  step: 1,
  apptData: {},

  root: document.querySelector('.book-sell'),
  backdrop: document.querySelector('.book-sell__backdrop'),
  container: document.querySelector('.book-sell__container'),

  evtNextStep: $('[data-evt="bookModalNext"]'),
  evtBackStep: $('[data-evt="bookModalBack"]'),
  evtToggle: $('[data-evt="toggleBookModal"]'),

  sectionDate: $('#bookSectionDate'),
  sectionPersonal: $('#bookSectionPersonal'),
  sectionConfirm: $('#bookSectionConfirm'),

  inputName: document.getElementById('bookFullName'),
  inputEmail: document.getElementById('bookEmail'),
  inputPhone: document.getElementById('bookPhone'),
  inputArr: [this.inputName, this.inputEmail, this.inputPhone],

  confirmName: document.getElementById('bookConfirmName'),
  confirmEmail: document.getElementById('bookConfirmEmail'),
  confirmPhone: document.getElementById('bookConfirmPhone'),
  confirmDate: document.getElementById('bookConfirmDate'),
  confirmTime: document.getElementById('bookConfirmTime'),

  init: function () {
    if (this.root !== null) {
      this.dateTime.init()
      this.attachEvents()
    }
  },

  close: function () {
    unlockScroll()
    this.container.style.transform = 'translateX(100%)'
    this.backdrop.style.opacity = 0
    setTimeout(() => {
      this.root.style.display = 'none'
    }, getTransitionTime(this.container));
  },
  open: function () {
    if (!$('.book-sell__date-box').length) { bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(true)) }
    lockScroll()
    this.root.style.display = 'block'
    setTimeout(() => {
      this.container.style.transform = 'translateX(0%)'
      this.backdrop.style.opacity = 1
    }, 1);
  },
  toggle: function () {
    if (window.getComputedStyle(this.root).getPropertyValue('display') !== 'none') {
      this.close()
    } else {
      this.open()
    }
  },
  attachEvents: function () {
    this.evtToggle.click(function () {
      bookModal.toggle()
    })
    this.evtNextStep.click(function () {
      switch (bookModal.step) {
        case 1:
          if (bookModal.apptData.date) {
            bookModal.step = 2
            bookModal.sectionDate.hide()
            bookModal.sectionPersonal.show()
            bookModal.observer()
          }
          break;
        case 2:
          if (bookModal.inputName.value && bookModal.inputEmail.value && bookModal.inputPhone.value) {
            bookModal.step = 3
            bookModal.sectionPersonal.hide()
            bookModal.sectionConfirm.show()
            bookModal.apptData.name = bookModal.inputName.value
            bookModal.apptData.email = bookModal.inputEmail.value
            bookModal.apptData.phone = bookModal.inputPhone.value
            bookModal.apptData.url = window.location.href;
            bookModal.observer()
          }
          break;
        case 3:
          bookModal.apptData.date_day = $('#bookConfirmDate').text();
          bookModal.apptData.time = $('#bookConfirmTime').text();
          //alert(JSON.stringify(bookModal.apptData)) // change later
          $.ajax({
            url: '/json/book-appointment',
            type: 'POST',
            data: { json: JSON.stringify(bookModal.apptData) },
            success: function (data) {
              bookModal.close()
              setTimeout(() => {
                bookModal.reset()
              }, getTransitionTime(bookModal.container));
            }
          });

          break;
      }
    })
    this.evtBackStep.click(function () {
      switch (bookModal.step) {
        case 1:
          bookModal.close()
          break;
        case 2:
          --bookModal.step
          bookModal.observer()
          bookModal.sectionPersonal.hide()
          bookModal.sectionDate.show()
          break;
        case 3:
          --bookModal.step
          bookModal.observer()
          bookModal.sectionConfirm.hide()
          bookModal.sectionPersonal.show()
          break;
      }
    })
    const attachInputObesrver = () => {
      let arr = [bookModal.inputName, bookModal.inputEmail, bookModal.inputPhone]
      arr.forEach((el) => { el.oninput = () => { bookModal.observer() } })
    }
    attachInputObesrver()
  },

  dateTime: {
    intervals: [[11, 0o0, 0o0], [13, 30, 0o0], [15, 30, 0o0], [16, 0o0, 0o0], [16, 30, 0o0]],
    daysPerView: 3,
    holder: document.getElementById('bookSellDates'),

    init: function () {
      this.attachEvents()
      this.appendBoxes(this.getDates(true))
    },
    renderHTML: (date) => {
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }), day = date.getDate(), month = date.toLocaleDateString('en-US', { month: 'short' }), time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })

      let ifPast = new Date() > date ? ' disabled' : ''
      let dayTime = date.getDay() == 6 ? 'Closed' : date.getDay() == 0 ? 'Closed' : time
      let isWeekend = date.getDay() == 6 ? ' is-closed' : date.getDay() == 0 ? ' is-closed' : ''

      return `
      <div class="book-sell__date-box${isWeekend}" data-time="${String(date)}"${ifPast}>
        <span>${weekday}, ${day}${getOrdinalTxt(day)} ${month}</span>
        <span>${dayTime}</span>
      </div>
      `
    },
    appendBoxes: function (arr) {
      arr.forEach((el) => this.holder.insertAdjacentHTML('beforeend', el))
    },
    getDates: function (isNext) {
      let daysArr = [], initial = 0
      let arr = [...document.querySelectorAll('.book-sell__date-box')]
      let initialDate

      if (arr.length == 0) {
        initialDate = new Date()
      } else {
        if (isNext == true) {
          initialDate = new Date(arr[arr.length - 1].getAttribute('data-time'))
        } else {
          initialDate = new Date(arr[0].getAttribute('data-time'))
        }
      }

      if (arr.length !== 0) {
        arr.forEach(el => el.remove());
        if (isNext == true) {
          initialDate.setDate(initialDate.getDate() + 1)
        } else { initialDate.setDate(initialDate.getDate() - 1) }
      }

      while (initial !== this.daysPerView) {
        let dayDate = new Date(initialDate)
        if (isNext == true) { daysArr.push(new Date(dayDate.setDate(initialDate.getDate() + initial))) } else {
          daysArr.push(new Date(dayDate.setDate(initialDate.getDate() - initial)))
        }
        ++initial
      }

      let ints = isNext == true ? this.intervals : this.intervals.slice().reverse()

      let htmlArr = daysArr.reduce((acc, date) => {
        ints.forEach((interval) => {
          let thisDate = new Date(date)
          thisDate.setHours(...interval)
          acc.push(this.renderHTML(thisDate))
        })
        return acc
      }, [])

      if (isNext == true) { return htmlArr } else { return htmlArr.reverse() }
    },
    attachEvents: function () {
      $('[data-switch-time]').click(function () {
        let attr = $(this).attr('data-switch-time')
        switch (attr) {
          case 'next':
            bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(true))
            break;
          case 'prev':
            if ([...document.querySelectorAll('.book-sell__date-box')][0])
              bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(false))
            break;
        }
      }),
        $(document).on('click', '.book-sell__date-box', function () {
          $(this).toggleClass(IS_ACTIVE).siblings().removeClass(IS_ACTIVE)
          bookModal.observer()
        })
    }
  },

  observer: function () {
    switch (this.step) {
      case 1:
        let activeDate = $('.book-sell__date-box').filter(`.${IS_ACTIVE}`)
        if (activeDate.length) {
          this.apptData.date = new Date(activeDate.attr('data-time'))
          this.evtNextStep.attr('disabled', false)
        } else {
          delete this.apptData.date
          this.evtNextStep.attr('disabled', true)
        }
        break;
      case 2:
        if (this.inputName.value && this.inputEmail.value && this.inputPhone.value && this.apptData.date) {
          this.evtNextStep.attr('disabled', false)
        } else {
          this.evtNextStep.attr('disabled', true)
        }
        break;
      case 3:
        this.confirmName.innerHTML = this.apptData.name
        this.confirmEmail.innerHTML = this.apptData.email
        this.confirmPhone.innerHTML = this.apptData.phone
        this.confirmDate.innerHTML = `${this.apptData.date.getDate()}${getOrdinalTxt(this.apptData.date.getDate())} ${this.apptData.date.toLocaleDateString('en-US', { month: 'long' })}`
        this.confirmTime.innerHTML = this.apptData.date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })
        break;
    }
  },
  reset: function () {
    bookModal.step = 1
    let inputArr = [this.inputName, this.inputEmail, this.inputPhone]
    inputArr.forEach((el) => { el.value = '' })
    $('.book-sell__date-box').removeClass(IS_ACTIVE)
    bookModal.sectionConfirm.hide()
    bookModal.sectionPersonal.hide()
    bookModal.sectionDate.show()
    Object.values(bookModal.apptData).forEach((el) => {
      delete el
    })
    $('.book-sell__date-box').remove()
    bookModal.observer()
  }
}
const sellPage = {
  faqItems: [...document.querySelectorAll('.sell-faq-item')],
  init: function () {
    if (this.faqItems.length) {
      this.attachFaq()
      $('.sell-faq-item__main').eq(0).trigger('click')
    }
  },
  attachFaq: function () {
    this.faqItems.forEach((el, index) => {
      $(el).click(function () {
        let main = $(this).find('.sell-faq-item__main'),
          p = $(this).find('p'), svg = $(this).find('svg')
        if (main.height() == 0) {
          $(this).addClass(IS_ACTIVE)
          main.css({ height: `${p[0].scrollHeight}px` })
          svg.css({ transform: 'rotate(180deg)' })
        } else {
          $(this).removeClass(IS_ACTIVE)
          main.css({ height: `0px` })
          svg.css({ transform: 'rotate(0deg)' })
        }
      })
    })
  }
}
/* #endregion */


/* #region rootLoader */
const rootLoader = new Object({
  class: 'root_loader',
  renderHTML: () => { return `<div class=${rootLoader.class}></div>` },
  isExist: () => { return $(document).find(`.${rootLoader.class}`).length ? true : false },

  push: function (noLock = false) {
    if (!noLock) { lockScroll() }
    if (!this.isExist()) { $body.append(rootLoader.renderHTML()) }
  },
  remove: function (noUnlock = false) {
    if (!noUnlock) unlockScroll();
    if (this.isExist()) { $(document).find(`.${rootLoader.class}`).remove() }
  }
})
/* #endregion */


/* #region pageReset */
const passReset = {
  IS_EMPTY: 'is-empty',
  IS_DISABLED: 'is-disabled',
  init: function () {
    if ($('.pass-reset-page').length) {
      this.renderDOM()
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.form = $('#passResetForm')
    this.submitBtn = $('#passResetSubmit')
    this.inputArr = [...this.form.find('input[type="password"]')]
    this.error = $('.pass-reset-error')
    this.loader = $('.pass-reset-loader')
    this.main = $('.pass-reset__main')
    this.result = $('.pass-reset__result')
  },
  bindEvents: function () {
    // submit click
    $.each(this.submitBtn, function (i) {
      passReset.submitBtn[i].onclick = (e) => {
        e.preventDefault()
        passReset.form.submit()
      }
    })
    // input events
    $.each(this.inputArr, function (i) {
      passReset.inputArr[i].oninput = () => {
        let arr = passReset.inputArr
        let pass1 = arr[0].value, pass2 = arr[1].value
        if (pass2.length == 0) {
          passReset.hideError()
        } else {
          if (pass1.length !== pass2.length) { passReset.showError('Different password length') }
          else {
            passReset.hideError(); if (pass1 === pass2) { passReset.successError() }
            else { passReset.showError("Passwords don't match") }
          }
        }
      }
    })
    // form submit
    this.form[0].onsubmit = (e) => {
      e.preventDefault()
      if (passReset.formValid()) {
        Object.assign(passReset.submitBtn[0].style, { color: 'transparent', height: '14px', 'border-radius': '50px' })
        passReset.form.addClass(passReset.IS_DISABLED)
        passReset.hideError()
        passReset.loader[0].animate({ width: '100%' }, { duration: 3000, fill: 'forwards' }).onfinish = () => {
          const formData = new FormData(e.target), obj = {}
          formData.forEach((value, key) => (obj[key] = value))
          Object.assign(passReset.main[0].style, { opacity: 0 }); Object.assign(passReset.result[0].style, { opacity: 0 })
          setTimeout(() => {
            passReset.main.hide()
            passReset.result.show()
            setTimeout(() => {
              Object.assign(passReset.result[0].style, { opacity: 1 })
            }, 5);
          }, 401);
          // alert(JSON.stringify(obj))
        }
      }
    }
  },
  formValid: function () {
    let arr = passReset.inputArr
    arr.forEach(el => el.classList.remove(passReset.IS_EMPTY))

    if (arr.length !== 0) {
      let emptyInput = arr.filter(el => el.value.length == 0)

      if (emptyInput.length !== 0) {
        $.each(emptyInput, function (i) {
          emptyInput[i].classList.add(passReset.IS_EMPTY)
          setTimeout(() => {
            emptyInput[i].classList.remove(passReset.IS_EMPTY)
          }, 400);
        })
      } else {
        let pass1 = arr[0].value, pass2 = arr[1].value
        if (pass1 === pass2) {
          return true
        } else {
          return false
        }
      }

    }
  },
  showError: function (text = 'Something went wrong...') {
    this.error.html(text)
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 1, transform: 'translateX(-50%) translateY(0px)' })
  },
  hideError: function () {
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 0, transform: 'translateX(-50%) translateY(14px)' })
  },
  successError: function (text = 'Passwords match!') {
    this.error.html(text)
    Object.assign(this.error[0].style, { color: '#088d7b', opacity: 1, transform: 'translateX(-50%) translateY(0px)' })
  }
}
/* #endregion */


/* #region Sirv */
let sirvTimer
const sirvCards = {
  visibleClass: 'is-visible',
  init: function () {
    this.cacheDOM()
    this.bindEvents()
  },
  cacheDOM: function () {
    this.cards = $('.product-card')
  },
  bindEvents: function () {
    if (this.cards) {
      this.cards.on('mouseenter mouseleave touchstart touchend', function (e) {
        switch (e.type) {

          case 'touchstart':
            sirvCards.toggleSirv($(this), 1)
            break;

          case 'touchend':
            sirvCards.toggleSirv($(this), 0)
            break;
          case 'mouseenter':
            sirvCards.toggleSirv($(this), 1)
            break;
          case 'mouseleave':
            sirvCards.toggleSirv($(this), 0)
            break;
        }
      })
    }
  },
  toggleSirv: function ($this, state) {
    let sirv = $this.find('.product-picture_sirv')
    if (sirv.length !== 0) {
      let id = sirv.find('.Sirv').attr('id')
      if (state !== 0) {
        sirv.show()
        setTimeout(() => {
          sirv.addClass(this.visibleClass)
        }, 1);
        Sirv.instance(id).play()
      } else {
        Sirv.instance(id).pause()
        sirv.removeClass(this.visibleClass)
        sirvTimer = window.setTimeout(function () {
          sirv.hide()
        }, 300)
      }
    }
  }
}
/* #endregion */


/* #region  Blog Page */
const blogPage = {
  init: function () {
    Object.values(this.initFn).forEach((fn) => {
      if (typeof fn === 'function') {
        try { fn() }
        catch { console.log('blog JS ERR') }
      }
    })
  },
  initFn: {
    attachCommentSubmit: () => {
      const commentArea = document.querySelector('[data-article="commentArea"]')
      const commentSubmit = document.querySelector('[data-article="commentSubmit"]')
      const holder = document.querySelector('.article__comments-wrap')

      if (commentArea !== null && commentSubmit !== null) {
        const submit = () => {
          const
            val = commentArea.value
          if (val.length !== 0) {
            const
              user = 'Guets',
              date = new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }),
              html = `
              <div class="article-comment"><span>${user}</span><span>${val}</span><span>${date}</span></div>
              `

            holder.insertAdjacentHTML("beforeend", html)
            commentArea.value = ''
          }
        }

        commentSubmit.onclick = () => {
          submit()
        }

        commentArea.onkeydown = (e) => {
          const isEnter = e.key === 'Enter' || e.keyCode === 13
          if (isEnter) {
            e.preventDefault()
            submit()
          }
        }
      }
    },
    createProgressBar: () => {
      const readContent = document.querySelector('.article__read-content')
      if (!readContent) return
      let y = 0
      let fullHeight = (readContent.getBoundingClientRect().bottom + 120) - (window.innerHeight * 0.7)
      const calculatePercentage = (number, total) => {
        return (number / total) * 100
      }
      const setElementWidthPercent = (el, percent) => {
        el.style.width = `${percent}%`
      }

      const
        bar = document.createElement('div'),
        progress = document.createElement('div')

      bar.className = 'blog-progress'
      bar.appendChild(progress)

      document.body.appendChild(bar)

      window.onscroll = () => {
        y = window.scrollY
        let f = calculatePercentage(y, fullHeight)
        setElementWidthPercent(progress, f)
      }
    },
    setReadingTime: () => {
      const
        readContent = document.querySelector('.article__read-content'),
        timeEl = document.querySelector('.read-time')
      if (!readContent || !timeEl) return

      const
        wordsPerMinute = 200,
        textContent = readContent.textContent,
        wordCount = textContent.split(/\s/g).length,
        readingTime = Math.ceil(wordCount / wordsPerMinute)


      timeEl.textContent = `${readingTime} min reading`
    },
    attachScroll: () => {
      return
      const img = document.querySelector('.article-top-cover img')
      if (img !== null) {
        let max = img.offsetHeight + 100
        window.onscroll = () => {
          let y = window.scrollY
          if (max > y) {
            let f = 1 - (y * 100 / max * 0.01)
            img.style.marginTop = `-${y * 0.08}px`
            img.style.opacity = f
          }
        }
      }
    }
  }
}
/* #endregion */


/* #region  Page Review */
const pageReview = {
  init: function () {
    if (document.querySelector('.page-reviews.splide') !== null) {
      this.initSplide()
    }
  },
  initSplide: function () {
    try {
      let main = new Splide('.page-reviews', {
        type: "slider",
        perPage: 2.2,
        perMove: 1,
        autoplay: 0,
        pauseOnHover: 1,
        pauseOnFocus: 1,
        gap: 12,
        arrows: 1,
        pagination: 1,
        speed: 500,
        breakpoints: {
          991: {
            perPage: 1.2
          }
        }
      })
      main.mount()
    } catch {
      console.log('Page Review SPLIDE ERR')
    }
  }
}
/* #endregion */


/* #region  Hero Splides */
const heroSplide = {
  init: function () {
    try {
      this.initSplide()
    } catch (err) {
      console.log(err.message)
    }
  },
  initSplide: function () {
    const heroSplide = [...document.querySelectorAll('.hero_splide')]
    if (heroSplide.length !== 0) {
      heroSplide.forEach((slide) => {
        let slider = new Splide(slide, {
          type: "slider",
          perPage: 4,
          perMove: 2,
          autoplay: 0,
          gap: "12px",
          arrows: 1,
          pagination: 0,
          speed: 750,
          breakpoints: {
            991: { perPage: 2.5, },
            767: { perPage: 2, perMove: 1 },
            478: { perPage: 1.4, perMove: 1, gap: 8 }
          }
        })
        slider.mount()
      })
    }
  }
}
/* #endregion */


/* #region  Mail Modal */
const mailModal = new Object({
  init: function () {
    this.renderDOM()
    if (this.modal.length) {
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.modal = $('.mail-modal')
    this.backdrop = $('.mail-modal__backdrop')
    this.container = $('.mail-modal__container')
    this.evtClose = $('[data-mail-modal="close"]')
  },
  bindEvents: function () {
    this.evtClose.on('click', function () { mailModal.close() })
  },
  open: function () {
    lockScroll()
    this.modal.show()
    this.modal.find('input').focus()
    setTimeout(() => {
      this.modal.addClass(__ACTIVE)
    }, 5);
  },
  close: function () {
    unlockScroll()
    this.modal.removeClass(__ACTIVE)
    setTimeout(() => {
      this.modal.hide()
    }, getTransitionTime(this.container));
  }
})
/* #endregion */


/* #region  Quiz Modal */
const quizModal = {
  currentStep: undefined,
  isFinished: undefined,
  pollLength: undefined,
  maxStep: undefined,
  isInitialized: undefined,
  init: function () {
    this.renderDOM()
    this.setInitial()
    this.bindEvents()
  },
  renderDOM: function () {
    this.modal = $('.quiz-modal')
    this.container = this.modal.find('.quiz-container')
    this.backdrop = this.modal.find('.quiz-modal__backdrop')
    this.heightContainer = this.modal.find('.quiz-container-height')
    this.poll = this.modal.find('.quiz-poll')
    this.pollArr = [...this.poll]
    this.answers = this.modal.find('.quiz-answer')
    this.fullStepText = this.modal.find('.quiz-step-text')
    this.currentStepText = this.modal.find('.quiz-current-step')
    this.maxStepText = this.modal.find('.quiz-max-step')
    this.bar = this.modal.find('.quiz-bar')
    this.evtGoNext = $('[data-evt="quizGoNext"]')
    this.evtOpen = $('[data-evt="openQuizModal"]')
    this.closeBtn = $('[data-evt="closeQuizModal"]')
  },
  bindEvents: function () {
    this.evtGoNext.click(function () {
      quizModal.goNextStep()
    })
    this.closeBtn.click(function () {
      quizModal.close()
    })
    this.evtOpen.click(function () {
      quizModal.open()
    })
  },
  setInitial: function () {
    this.currentStep = 1, this.isFinished = false, this.pollLength = this.pollArr.length, this.maxStep = this.pollLength
    if (this.pollLength !== 0 && this.pollLength !== undefined && this.isInitialized !== true) {
      this.isInitialized = true
      quizModal.currentStepText.html(quizModal.currentStep)
      quizModal.maxStepText.html(quizModal.maxStep)
      this.modal.find('input[type="radio"]').prop('checked', false); this.evtGoNext.html('Next')
      // Object.assign(this.heightContainer[0].style, { height: `${this.getObjectScrollHeight(this.pollArr[0])}` })
      Object.assign(this.bar[0].style, { width: `${(100 / this.pollLength)}%` })
    } else {
      return false
    }
  },
  // utils
  getObjectScrollHeight: function (obj) {
    if (obj instanceof jQuery) {
      return `${obj[0].scrollHeight}px`
    } else {
      return `${obj.scrollHeight}px`
    }
  },
  noEmptyAnswers: function () {
    let parent = $(quizModal.pollArr[(quizModal.currentStep - 1)]),
      checkedRadio = parent.find('input[type="radio"]:checked'),
      answers = parent.find(quizModal.answers)
    if (checkedRadio.length == 0) {
      answers.css({ opacity: '0.3' }); setTimeout(() => { answers.css({ opacity: 1 }) }, 375);
    } else {
      return true
    }
  },
  goNextStep() {
    if (quizModal.currentStep !== quizModal.maxStep) {
      if (quizModal.noEmptyAnswers()) {
        Object.assign(quizModal.pollArr[(quizModal.currentStep - 1)].style, { opacity: 0 })
        Object.assign(quizModal.bar[0].style, { width: `${(100 / quizModal.pollLength) * (quizModal.currentStep + 1)}%` })
        $.each(quizModal.pollArr, function (i) {
          Object.assign(quizModal.pollArr[i].style, { transform: `translateX(-${(quizModal.currentStep * 100)}%)` })
        })
        Object.assign(quizModal.heightContainer[0].style, { height: `${quizModal.pollArr[quizModal.currentStep].scrollHeight}px` })
        ++quizModal.currentStep
        quizModal.currentStepText.html(quizModal.currentStep)
        if (quizModal.currentStep == quizModal.maxStep) {
          quizModal.evtGoNext.html('Show Results')
        }
      }
    } else {
      if (quizModal.noEmptyAnswers()) {
        Object.assign(quizModal.heightContainer[0].style, { height: '0px' })
        Object.assign(quizModal.bar[0].style, { width: '5%' })
        $.each(quizModal.pollArr, function (i) {
          Object.assign(quizModal.pollArr[i].style, { transform: `translateX(-${(quizModal.currentStep * 100)}%)` })
        })
        Object.assign(quizModal.pollArr[(quizModal.currentStep - 1)].style, { opacity: 0 })
        quizModal.evtGoNext.prop('disabled', true)
        quizModal.fullStepText.text('FINDING WATCHES')
        $('.quiz-close-btn').remove()
        quizModal.isFinished = true
        setTimeout(() => {
          quizModal.bar.animate({ width: '100%' }, 3000, function () { quizModal.close() })
        }, 600);
      }
    }
  },
  open: function () {
    lockScroll()
    quizModal.modal.show()
    Object.assign(this.heightContainer[0].style, { height: `${this.getObjectScrollHeight(this.pollArr[quizModal.currentStep - 1])}` })
    setTimeout(() => {
      Object.assign(quizModal.backdrop[0].style, { opacity: 1 })
      Object.assign(quizModal.container[0].style, { transform: 'translateY(0px)', opacity: 1 })
    }, 1);
  },
  close: function () {
    unlockScroll()
    let timeToHide = (parseFloat(window.getComputedStyle(quizModal.backdrop[0]).transitionDuration) * 1000)
    Object.assign(quizModal.backdrop[0].style, { opacity: 0 })
    Object.assign(quizModal.container[0].style, { transform: 'translateY(32px)', opacity: 0 })
    setTimeout(() => {
      quizModal.modal.hide()
    }, timeToHide);
  }
}
/* #endregion Quiz Modal */


/* #region  Sales Modal */
const salesModal = {
  init: function () {
    this.renderDOM()
    if (this.modal.length) {
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.modal = $('.sale-history-modal')
    this.container = $('.sale-history__container')
    this.evtClose = $('[data-evt="closeSalesModal"]')
  },
  bindEvents: function () {
    this.evtClose.click(function () {
      salesModal.close()
    })
  },
  open: function () {
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault()
        salesModal.close()
      }
    }, { once: true })
    lockScroll()
    this.modal.show()
    setTimeout(() => {
      this.modal.css({ 'background-color': "rgba(13, 16, 26, .7)" })
      this.container.css({ 'transform': 'translateX(0%)' })
    }, 1);
  },
  close: function () {
    unlockScroll()
    this.modal.css({ 'background-color': "rgba(13, 16, 26, 0)" })
    this.container.css({ 'transform': 'translateX(100%)' })
    setTimeout(() => {
      this.modal.hide()
    }, getTransitionTime(this.modal));
  }
}
/* #endregion Sales Modal */


/* #region  Form Page */
const formPage = new Object({
  uploadedImages: [],
  init: function () {
    if (document.querySelector('.main_formpage')) {
      this.bindEvents()
      // this.imgUpload()
      this.attachImagesUploader()
      this.attachWatchesUpload()
    }
  },
  bindEvents: function () {
    $('.formpage__upload-btn').click(function () {
      if ($('#image_upload').length) { $('#image_upload').trigger('click') }
    })
    // $('#formpage_form').on('submit', function (e) {
    //   e.preventDefault();
    //   formPage.submitAjax();
    // });
  },
  submitAjax: function () { },
  attachImagesUploader: () => {
    const uploadLabel = document.querySelector('#formpage_img-uploader'),
      uploadInput = document.querySelector('#image_upload'),
      imagesWrap = $('.formpage__images-thumbnails')

    // Setting drag&drop event
    if (uploadLabel !== null) {
      uploadLabel.ondragover = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.add(IS_ACTIVE)
      }
      uploadLabel.ondragleave = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
      }
      uploadLabel.ondrop = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
        $('#image_upload').prop('files', evt.dataTransfer.files);
        const files = [], items = [...evt.dataTransfer.items]
        items.forEach((item, i) => {
          if (item.kind === 'file') {
            files.push(item.getAsFile())
          }
        })
        if (files.length) {
          $('.formpage__images-thumbnails').empty()
        }
        processFiles([...files])
      }
    }

    // Setting manual files upload
    if (uploadInput !== null) {
      uploadInput.onchange = (evt) => {
        const files = [...evt.target.files]
        $('.formpage__images-thumbnails').empty()
        processFiles(files)
      }
    }

    function processFiles(files) {
      if (files.length) {
        files.forEach((file, i) => {
          if (!file.type.match('image.*')) { return }

          let getIndex = () => {
            return $('.formpage__upload').length + 1
          }

          let reader = new FileReader()
          reader.onload = function (e) {
            let html =
              `
               <div class="formpage__upload" data-img-id="${getIndex()}">
                 <div class="formpage__input-boxes">
                   <div>
                     <input value="1" name="visible_image_${i}" id="image_${i + 1}" type="checkbox" checked>
                     <label for="image_${getIndex()}"></label>
                   </div>
                 </div>
                   <div data-name="${file.name}" style="background-image: url(${e.target.result})" class="formpage__upload-bg">
                 </div>
               </div>
             `
            imagesWrap.append(html)
          }
          reader.readAsDataURL(file)
        })
      }
    }

    // Setting checkbox toggle on appended images
    $body.on('click', ".formpage__upload-bg", function () {
      lockScroll()
      let html =
        `
      <div class="formpage-zoom">
        <div data-evt="closeFormpageZoom"></div>
        <div data-block="formpageZoom"></div>
      </div>
      `
      $body.append(html)
      $('[data-block="formpageZoom"]').attr('style', $(this).attr('style'))
    });
    $body.on('click', '[data-evt="closeFormpageZoom"]', function () {
      unlockScroll()
      $('.formpage-zoom').remove()
    })
  },
  attachWatchesUpload: () => {
    const container = document.querySelector('#watches_upload_label'),
      input = document.querySelector('#watches_upload')

    container.addEventListener("dragover", (e) => {
      e.preventDefault()
    }, false)

    container.addEventListener("dragenter", () => {
      container.classList.add(__ACTIVE)
    })

    container.addEventListener("dragleave", () => {
      container.classList.remove(__ACTIVE)
    })

    container.addEventListener("drop", (e) => {
      e.preventDefault()
      container.classList.remove(__ACTIVE)
      input.files = e.dataTransfer.files
    })
  }
})
/* #endregion Form Page */


/* #region  Tag Preview */
const tagPreview = {
  init: function () {
    try {
      if (document.querySelector('.main_print-tag') !== null) {
        this.resetOutput()
        this.attachInput()
        this.attachImageUploader()
        this.attachPreviewControls()
      }
    } catch {
      console.log('TAG PREVIEW ERR')
    }
  },
  resetOutput: function () {
    const outputHolder = document.querySelector('.tag-preview__output'),
      outputImage = document.querySelector('.tag-preview__pic')
    outputHolder.innerHTML = ''
    outputHolder.classList.add(IS_EMPTY)
    outputImage.classList.add(IS_EMPTY)
  },
  attachInput: function () {
    const outputObj = new Object(),
      inputs = [...document.querySelectorAll('input[type="text"].formpage__input')],
      outputHolder = document.querySelector('.tag-preview__output'),
      updateOutput = () => {
        let filled = 0, html = ``
        for (const key in outputObj) {
          if (outputObj.hasOwnProperty(key)) {
            const obj = outputObj[key]
            if (obj.value.length !== 0) {
              ++filled
              html += `
                <div id="${obj.id}" class="tag-output-row">
                  <span>${obj.title}</span>
                  <span>${obj.value}</span>
                </div>
                `
            }
          }
        }
        if (filled !== 0) {
          outputHolder.innerHTML = html
          outputHolder.classList.remove(IS_EMPTY)
        } else {
          outputHolder.innerHTML = ''
          outputHolder.classList.add(IS_EMPTY)
        }
      }

    inputs.forEach((input, index) => {
      outputObj[index] = {
        id: input.id,
        value: '',
        title: input.closest('.formpage__input-box').querySelector('label').innerHTML
      }

      input.oninput = () => {
        outputObj[index].value = input.value || ''
        updateOutput()
      }
      input.onkeydown = (e) => {
        const
          isEnter = e.key === 'Enter' || e.keyCode === 13,
          isBackscape = e.key === 'Backspace' || e.key === 'Delete',
          isEsc = e.key === 'Escape' || e.key === 'Esc',
          isUp = e.key === 'ArrowUp',
          isDown = e.key === 'ArrowDown',
          next = inputs[index + 1],
          prev = inputs[index - 1]

        if (isEnter || isDown) {
          if (next !== undefined) { next.focus() }
        }
        if (isBackscape) {
          if (input.value.length == 0 && prev !== undefined) { prev.focus() }
        }
        if (isEsc) {
          e.preventDefault(); input.blur()
        }
        if (isUp) {
          if (prev !== undefined) { prev.focus() }
        }
      }
      ['focus', 'blur'].forEach((ev) => {
        if (window.innerWidth <= 479) {
          const label = input.closest('.formpage__input-box').querySelector('label')
          input.addEventListener(ev, function () {
            switch (ev) {
              case 'focus':
                label.style.opacity = 0
                break;
              case 'blur':
                if (input.value.length !== 0) { label.style.opacity = 0 } else {
                  label.style.opacity = 0.5
                }
                break;
            }
          })
        }
      })

    })
  },
  attachImageUploader: function () {
    const uploadLabel = document.querySelector('#printTag_uploader'),
      uploadInput = document.querySelector('#image_upload_tag'),
      imgPreview = document.querySelector('.tag-preview__pic')

    // DRAG & DROP
    if (uploadLabel !== null) {
      uploadLabel.ondragover = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.add(IS_ACTIVE)
      }
      uploadLabel.ondragleave = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
      }
      uploadLabel.ondrop = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
        $('#image_upload_tag').prop('files', evt.dataTransfer.files);
        const files = [...evt.dataTransfer.items],
          file = files.find((item) => { if (item.kind === 'file') { return item } })
        processImage(file.getAsFile())
      }

      // MANUAL
      if (uploadInput !== null) {
        uploadInput.onchange = (evt) => {
          const file = [...evt.target.files][0]
          processImage(file)
          uploadInput.value = ''
        }
      }

      // PROCESS IMAGE
      function processImage(file) {
        if (file) {
          let reader = new FileReader()
          reader.onload = (e) => {
            imgPreview.classList.remove(IS_EMPTY)
            imgPreview.style.backgroundImage = `url(${e.target.result})`
          }
          reader.readAsDataURL(file)
        }
      }

    }
  },
  attachPreviewControls: function () {
    const modal = document.querySelector('.tag-preview-modal')
    if (modal !== null) {
      const holder = document.querySelector('.tag-preview-modal__wrapper')
      const toggle = () => {
        let displayed = window.getComputedStyle(modal).getPropertyValue('display') !== 'none'
        if (displayed) {
          unlockScroll()
          const preview = holder.querySelector('.formpage__tag-preview')
          if (preview !== null) { preview.remove() }
          modal.style.display = 'none'
        } else {
          lockScroll()
          const preview = document.querySelector('.formpage__tag-preview')
          holder.appendChild(preview.cloneNode(true))
          modal.style.display = 'block'
        }
      }

      document.addEventListener('click', function (e) {
        const target = e.target
        if (target.getAttribute('data-evt') == 'togglePrintTagPreview') {
          toggle()
        }
      })
    }
  }
}
/* #endregion Tag Preview */


/* #region  Initialize Page Objects */
/**
 * Page Objects
 */
const pageObjectsArr = [
  header,
  pgFilter,
  cartModal,
  currencyModal,
  homePageSplide,
  pgModal,
  productPage,
  productSplide,
  footer,
  pageEls,
  myBag,
  account,
  locationPage,
  pageAlerts,
  sellPage,
  bookModal,
  passReset,
  sirvCards,
  pageReview,
  blogPage,
  heroSplide,
  mailModal,
  quizModal,
  salesModal,
  formPage,
  tagPreview,
  homepageCategoriesSlider
]

const initPageObjects = () => {
  pageObjectsArr.forEach((obj) => {
    try {
      if (typeof obj.init === "function" && typeof obj.init !== undefined) {
        obj.init();
      } else {
        console.log(obj, 'No init func')
      }
    } catch (err) {
      console.log(err)
    }
  })
}
/* #endregion Initialize Page Objects */


document.addEventListener("DOMContentLoaded", function () {
  initPageObjects()
})