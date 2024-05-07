const
  IS_VISIBLE = 'is-visible',
  IS_ACTIVE = 'is-active',
  IS_HIDDEN = 'is-hidden',
  __BACK = '--back',
  __MOVING = '--moving',
  __STASH = '--stash',
  __FILLED = '--filled',
  __FOCUSED = '--focused',
  __HOVERED = '--hovered',
  __BLANK = '--blank',
  __ADDED = '--added'

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

function getAdminUserName() {
  return 'Zahir'
}

function allowInputDigits(input) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '')
  })
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

function allowInputSum(input) {
  input.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9.,]/g, '').replace(/,/g, '.')
    if (/^0+/.test(e.target.value)) {
      e.target.value = e.target.value.replace(/^0+/, '')
    }
  })
  input.addEventListener('keydown', (e) => {
    const alreadyContainsDotOrComma = e.target.value.includes('.') || e.target.value.includes(',')
    if (alreadyContainsDotOrComma && (e.key === '.' || e.key === ',')) {
      e.preventDefault()
    }
  })
}

class AskModal {
  constructor(settings = {}) {
    this.heading = settings.heading || 'Are You Sure You Want To Exit?'
    this.subheading = settings.subheading || 'You will lose all unsaved progress.'
    this.exitText = settings.exitText || 'Exit'
    this.submitText = settings.submitText || 'Keep'
    this.cancelCallback = this.destroy
    this.submitCallback = settings.submitCallback
    this.msg = settings.msg
  }

  get renderHTML() {
    return `
      <div data-evt="closeAskModal"></div>
      <div>
        <h4>${this.heading}</h4>
        <p>${this.subheading}</p>
        <div>
          <button>${this.exitText}</button>
          <button>${this.submitText}</button>
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
    buttons[0].onclick = () => { this.cancelCallback() }
    buttons[1].onclick = () => {
      const submitArr = toArray(this.submitCallback)
      for (const fn of submitArr) {
        if (typeof fn === 'function') {
          fn()
        }
      }
      this.destroy()
    }
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
/* #endregion */

function pageMsg(settings = {}) {
  this.heading = settings.heading || 'Something went wrong'
  this.msg = settings.msg || 'Undefined message'
  this.timeout = settings.timeout || 5000
  this.keep = settings.keep || false
  this.callback = settings.callback || null
  this.hideCallback = settings.hideCallback || null
  this.type = settings.type || ''
  this.id = settings.id || null
  /**
   * Types:
   * 'error'
   * 'success'
   * 'warning'
   */

  const hide = () => {
    msgElem.style.transform = 'translateY(calc(100% + 20px))'
    msgElem.style.opacity = 0
    setTimeout(() => {
      msgElem.remove()
    }, getTransitionTime(msgElem));
    if (this.hideCallback) {
      this.hideCallback()
    }
  }

  const html = `
  <h4>${this.heading}</h4>
  <p>${this.msg}</p>
  `
  const msgElem = createElem('div', {
    className: `page-msg ${this.type}`,
    innerHTML: html,
    style: {
      'transform': 'translateY(calc(100% + 20px))',
      'opacity': 0
    }
  })

  const closeBtn = createElem('button', {})

  closeBtn.onclick = () => {
    hide()
  }

  msgElem.prepend(closeBtn)
  document.body.appendChild(msgElem)

  setTimeout(() => {
    msgElem.style.transform = 'translateY(0)'
    msgElem.style.opacity = 1
  }, 10)

  if (!this.keep) {
    setTimeout(() => {
      if (document.body.contains(msgElem)) {
        hide()
      }
    }, this.timeout);
  }

  if (this.callback) {
    callback()
  }
}

function toArray(value) {
  return Array.isArray(value) ? value : [value];
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

Number.prototype.between = function (min, max) {
  return this >= min && this <= max
}
HTMLElement.prototype.isVisible = function () {
  return window.getComputedStyle(this).getPropertyValue('display') !== 'none'
}
Array.prototype.handleToggleActiveState = function () {
  for (const elem of this) {
    elem.onclick = () => {
      const siblings = [...elem.parentElement.children].filter(e => e.tagName === 'BUTTON' && e !== elem)
      elem.classList.add(IS_ACTIVE)
      for (const sibling of siblings) {
        sibling.classList.remove(IS_ACTIVE)
      }
    }
  }
}

const getTransitionTime = (target) => {
  let el = target instanceof jQuery ? target[0] : target;
  return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
}

/**
* Swiper component for customer relationship management interface.
* Allows navigation through cards representing different entities or data points.
*
* @class
* @param {Object} settings - Configuration settings for the swiper component.
* @param {HTMLElement} initialCard - The initial card to be displayed on swiper load.
*/
class crmSwiper {
  constructor(settings, initialCard) {
    this.settings = {
      startEvents: settings.startEvents || ['mousedown', 'touchstart', 'click'],
      endEvents: settings.endEvents || ['mouseup', 'touchend'],
      moveEvents: settings.moveEvents || ['mousemove', 'touchmove'],
      maxPrevCards: settings.maxPrevCards || 50,
      maxNextCards: settings.maxNextCards || 50,
      loadMoreAmount: settings.loadMoreAmount || 50,
      autoLoad: settings.autoLoad || false
    }
    this.initialized = false
    this.opened = false
    this.initialCard = initialCard || document.querySelectorAll('#grid_view .whale-card')[0]
    this.anchorCard = null
    this.anchorCardIndex = undefined
    this.activeCard = null
    this.lastActive = undefined
    this.nextCards = []
    this.prevCards = []
    this.storage = []
    this.cardClass = 'whale-card'
    this.swiperClass = 'swiper__card'
    this.stashClass = '--stash'
    this.highlightClass = '--highlight'
    this.emptyClass = '--empty'
    this.keyEvents = ['ArrowLeft', 'ArrowRight', 'Escape']
    this.modal = document.querySelector('.swiper')
    this.holder = document.querySelector('.swiper__cards')
    this.stash = document.querySelector('.swiper__stash')
    this.grid = document.querySelector('.tb-grid')
    this.evtNextArr = [...document.querySelectorAll('[data-swiper-evt="nextCard"]')]
    this.evtPrevArr = [...document.querySelectorAll('[data-swiper-evt="prevCard"]')]
    this.evtClose = [...document.querySelectorAll('[data-swiper-evt="close"]')]
    this.evtLoadMore = [...document.querySelectorAll('[data-swiper-evt="loadMore"]')]
  }

  /**
   * Settings basic methods
   * 
   * @anchor {HTMLElement}
   * @cards {Array}
   * @initialCard {HTMLElement}
   * @index {Number}
   */
  get getGridCards() {
    if (this.grid) {
      return [...this.grid.querySelectorAll('.whale-card')]
    }
  }
  get getAllSwiperCards() {
    if (this.holder) {
      return [...this.holder.querySelectorAll('.whale-card')]
    }
  }
  get getLastActive() {
    return this.holder.querySelectorAll('.swiper__card').length ?
      [...this.holder.querySelectorAll('.swiper__card')].at(-1) :
      [...this.stash.querySelectorAll('.swiper__card')].at(-1)
  }
  addCardsToSwiper(cardsArr) {
    if (Array.isArray(cardsArr)) for (const card of cardsArr) {
      if (card) {
        card.classList.add(this.swiperClass)
        card.classList.add(this.stashClass)
        this.holder.appendChild(card)
        setTimeout(() => {
          card.classList.remove(this.stashClass)
        }, 1);
      } else {
        throw new Error('JS : Add Cards To Swiper Error')
      }
    }
  }
  addCardsToStash(cardsArr) {
    if (Array.isArray(cardsArr)) {
      for (const card of cardsArr) {
        if (card) {
          card.classList.add(this.swiperClass)
          card.classList.add(this.stashClass)
          this.stash.appendChild(card)
        } else {
          throw new Error('JS : Add Cards To Stash Error')
        }
      }
    }
  }
  setAnchor(index) {
    this.anchorCard = this.getGridCards[index] || undefined
  }
  findCardIndexInGrid(card) {
    return this.getGridCards.indexOf(card)
  }

  /**
   * Initial setup
   * Set anchor
   * Add cards to stash
   * Add cards to swiper 
   * 
   * Open {@link crmSwiper#open}
   * Attach events {@link crmSwiper#attachEvents}
   */
  initialSetup() {
    if (this.initialCard) {
      this.setAnchor(this.findCardIndexInGrid(this.initialCard) + this.settings.maxNextCards + 1)
      let next = this.initialCard.nextElementSibling
      let prev = this.initialCard.previousElementSibling

      while (next && this.nextCards.length < this.settings.maxNextCards) {
        this.nextCards = [...this.nextCards, next]
        next = next.nextElementSibling
      }
      this.nextCards = [this.initialCard, ...this.nextCards]
      while (prev && this.prevCards.length < this.settings.maxPrevCards) {
        this.prevCards = [...this.prevCards, prev]
        prev = prev.previousElementSibling
      }
      try {
        this.addCardsToStash(this.prevCards.reverse())
        this.addCardsToSwiper(this.nextCards.reverse())
        this.open()
        this.attachEvents()
      } catch (err) {
        throw new Error(`JS Initial Swiper Setup Error: ${err.message}`)
      }
    }
  }

  /**
   * Class methods
   * Initializes swiper
   * 
   * @initial {HTMLElement}
   */
  init() {
    if (this.modal && this.getGridCards.length && this.initialCard) {
      this.initialized = true
      this.initialSetup()
    }
  }
  next() {
    const card = [...this.holder.querySelectorAll('.whale-card')].at(-1)
    if (!card) return
    this.nextCards = this.nextCards.filter((c) => c !== card)
    this.prevCards = [...this.prevCards, card]
    card.classList.add(this.stashClass)
    this.checkCardsAvailability()
    setTimeout(() => {
      this.stash.appendChild(card)
    }, getTransitionTime(card));
  }
  prev() {
    const card = [...this.stash.querySelectorAll('.whale-card')].at(-1)
    if (!card) return
    this.prevCards = this.prevCards.filter((c) => c !== card)
    this.nextCards = [...this.nextCards, card]
    this.holder.appendChild(card)
    this.checkCardsAvailability()
    setTimeout(() => {
      card.classList.remove(this.stashClass)
    }, 1);
  }
  open() {
    if (this.initialized) {
      this.opened = true
      this.modal.style.display = 'block'
      setTimeout(() => {
        this.modal.classList.add(IS_VISIBLE)
      }, 1);
    }
  }
  close() {
    if (this.initialized) {
      this.opened = false
      this.modal.classList.remove(IS_VISIBLE)
      this.modal.classList.remove(this.emptyClass)
      this.destroy()
      setTimeout(() => {
        this.modal.style.display = 'none'
      }, getTransitionTime(this.modal));
    }
  }
  destroy() {
    this.returnCards()
    this.highlightLast()
    this.initialized = false
    this.nextCards = []
    this.prevCards = []
    this.initialCard = null
    this.anchorCard = undefined
    this.anchorCardIndex = undefined
  }
  returnCards() {
    this.lastActive = this.getLastActive
    const cards = [...this.prevCards, ...this.nextCards.reverse()]
    if (!cards.length) return
    if (this.anchorCard !== undefined) {
      for (const card of cards) {
        card.classList.remove(this.swiperClass, this.stashClass)
        this.grid.insertBefore(card, this.anchorCard)
      }
    } else {
      for (const card of cards) {
        card.classList.remove(this.swiperClass, this.stashClass)
        this.grid.appendChild(card)
      }
    }
  }
  highlightLast() {
    if (!this.lastActive) return
    const distance = this.lastActive.getBoundingClientRect().top + window.scrollY
    this.lastActive.classList.add(this.highlightClass)
    this.grid.classList.add(this.highlightClass)
    window.scrollTo({ top: distance - 200 })
    setTimeout(() => {
      this.lastActive.classList.remove(this.highlightClass)
      this.grid.classList.remove(this.highlightClass)
    }, getTransitionTime(this.lastActive) * 4.9);
  }
  checkCardsAvailability() {
    const cards = [...this.holder.querySelectorAll('.whale-card')]
    if (cards.length == 1) {
      setTimeout(() => {
        this.close()
      }, 500);
    }
  }
  cardsAvailabilityResolve() {
    return
    const hasMoreCards = this.nextCards.length > 0
    if (!hasMoreCards) {
      this.modal.classList.add(this.emptyClass)
    } else {
      this.modal.classList.remove(this.emptyClass)
    }
    return hasMoreCards
  }
  loadMore() {
    if (!this.anchorCard) return
    this.initialCard = this.anchorCard
    this.setAnchor(this.findCardIndexInGrid(this.initialCard) + this.settings.maxNextCards + 1)
    let next = this.initialCard.nextElementSibling

    while (next && this.nextCards.length < this.settings.maxNextCards) {
      this.nextCards = [...this.nextCards, next]
    }
    this.nextCards = [this.initialCard, ...this.nextCards]
    try {
      this.addCardsToSwiper(this.nextCards.reverse())
    } catch (err) {
      throw new Error(`JS Load More Swiper Setup Error: ${err.message}`)
    }
  }

  /**
   * Attach events
   * 
   * @start {mousedown, touchstart, click}
   * @end {mouseup, touchend}
   * @move {mousedown, touchstart, click}
   * @click {data-evt="nextCard"}
   * @keydown {ArrowRight}
   * @keydown {ArrowLeft}
   * @keydown {Escape}
   */
  attachEvents() {
    for (const element of this.evtNextArr) {
      element.onclick = () => {
        this.next()
      }
    }
    for (const element of this.evtPrevArr) {
      element.onclick = () => {
        this.prev()
      }
    }
    for (const element of this.evtClose) {
      element.onclick = () => {
        this.close()
      }
    }
    for (const element of this.evtLoadMore) {
      element.onclick = () => {
        this.loadMore()
      }
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        this.evtNextArr[0].click()
      }
      if (e.key === 'ArrowLeft') {
        this.evtPrevArr[0].click()
      }
      if (e.key === 'Escape') {
        e.preventDefault()
        this.close()
      }
    })
  }

}



const body = document.querySelector('body'),
  pageBackdrop = document.querySelector('.am-backdrop'),
  amHeader = document.querySelector('.am-header')

function pageBackdropOn() {
  pageBackdrop.style.display = 'block'
  setTimeout(() => {
    pageBackdrop.style.opacity = '1'
  }, 1);
}
function pageBackdropOff() {
  pageBackdrop.style.opacity = '0'
  setTimeout(() => {
    pageBackdrop.style.display = 'none'
  }, getTransitionTime(pageBackdrop));
}

const orderZoom = {
  init: function () {
    try {
      this.attachEvents()
    } catch {
      console.log('admin zoom err')
    }
  },
  renderHTML: function (imgSrc) {
    return `
      <div class="am-zoom-modal">
        <div><img src="${imgSrc}" alt=""><button data-am-evt="closeZoom">CLOSE</button></div>
      </div>
      `
  },
  createZoom: function (src) {
    body.insertAdjacentHTML('beforeend', orderZoom.renderHTML(src))
  },
  removeZoom: function () {
    const modal = document.querySelector('.am-zoom-modal')
    if (modal !== null) {
      modal.remove()
    }
  },
  attachEvents: function () {
    const zoomBtn = [...document.querySelectorAll('.am-zoom-btn')]

    document.addEventListener('click', (e) => {
      let target = e.target
      if (target.hasAttribute('data-am-evt') && target.getAttribute('data-am-evt') == 'closeZoom') {
        orderZoom.removeZoom()
      }
    })

    document.addEventListener('click', (e) => {
      let target = e.target
      if (target.classList.contains('am-zoom-modal')) {
        orderZoom.removeZoom()
      }
    })

    zoomBtn.forEach((btn) => {
      btn.onclick = () => {
        let src = btn.parentNode.closest('.am-item__pic-wrap').querySelector('img').src
        orderZoom.createZoom(src)
      }
    })

  }
}

const orderNotes = {
  init: function () {
    this.attachEvents()
  },
  appendNote: function (parent, author, text) {
    let date = new Date(Date.now()).toLocaleString()
    const html = `
      <div class="am-item-note">
        <div>
        <span>${author}</span>:
        ${text}
        </div>
        <div>${date}</div>
      </div>
     `
    parent.insertAdjacentHTML('beforeend', html)
  },
  attachEvents: function () {
    const submitButtons = [...document.querySelectorAll('[data-am-evt="submitNote"]')],
      inputs = [...document.querySelectorAll('.am-note-input')]

    submitButtons.forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault()
        const parent = btn.parentNode.closest('.am-item__note-wrap')
        if (parent !== null) {
          const input = parent.querySelector('.am-note-input'),
            val = input.value
          if (val.length !== 0) {
            input.value = ''
            orderNotes.appendNote(parent, 'Steinway', val)
          } else {
            input.focus()
          }
        }
      }
    })

    inputs.forEach((input) => {
      input.onkeydown = (e) => {
        if (e.key == 'Enter') {
          e.preventDefault()
          const val = input.value
          if (val.length !== 0) {
            const parent = input.parentNode.closest('.am-item__note-wrap')
            input.value = ''
            orderNotes.appendNote(parent, 'Steinway', val)
          }
        }
      }
    })
  }
}

const pageSearch = {
  init: function () {
    this.renderDOM()
    if (this.el !== null) {
      this.attachEvents()
    }
  },
  renderDOM: function () {
    this.el = document.querySelector('.am-header__mob-search')
    this.evtToggle = [...document.querySelectorAll('[data-am-evt="toggleSearch"]')]
  },
  hide: function () {
    this.el.classList.remove(IS_VISIBLE)
  },
  show: function () {
    this.el.classList.add(IS_VISIBLE)
  },
  open: function () {
    lockScroll()
    this.show()
    pageMenu.hide()
    pageBackdropOn()
  },
  close: function () {
    unlockScroll()
    this.hide()
    pageBackdropOff()
  },
  attachEvents: function () {
    this.evtToggle.forEach((el) => {
      el.onclick = () => {
        if (pageSearch.el.classList.contains(IS_VISIBLE)) {
          pageSearch.close()
        } else {
          pageSearch.open()
        }
      }
    })
  }
}

const pageMenu = {
  init: function () {
    this.renderDOM()
    if (this.el !== null) {
      this.attachEvents()
    }
  },
  renderDOM: function () {
    this.el = document.querySelector('.am-header__page-nav')
    this.evtToggle = [...document.querySelectorAll('[data-am-evt="togglePageNav"]')]
  },
  hide: function () {
    this.el.classList.remove(IS_VISIBLE)
  },
  show: function () {
    this.el.classList.add(IS_VISIBLE)
  },
  open: function () {
    lockScroll()
    this.show()
    pageSearch.hide()
    pageBackdropOn()
  },
  close: function () {
    unlockScroll()
    this.hide()
    pageBackdropOff()
  },
  attachEvents: function () {
    this.evtToggle.forEach((el) => {
      el.onclick = () => {
        if (pageMenu.el.classList.contains(IS_VISIBLE)) {
          pageMenu.close()
        } else {
          pageMenu.open()
        }
      }
    })
  }
}

const pageSidebar = {
  init: function () {
    this.renderDOM()
    if (this.el !== null) {
      this.attachEvents()
    }
  },
  renderDOM: function () {
    this.el = document.querySelector('.am-sidebar')
    this.evtToggle = [...document.querySelectorAll('[data-am-evt="toggleSidebar"]')]
  },
  hide: function () {
    this.el.classList.remove(IS_VISIBLE)
  },
  show: function () {
    this.el.classList.add(IS_VISIBLE)
  },
  open: function () {
    lockScroll()
    this.show()
    pageSearch.hide()
    pageMenu.hide()
    amHeader.style.transform = 'translateY(-100%)'
    pageBackdropOn()
  },
  close: function () {
    unlockScroll()
    this.hide()
    amHeader.style.transform = 'translateY(0%)'
    pageBackdropOff()
  },
  attachEvents: function () {
    this.evtToggle.forEach((el) => {
      el.onclick = () => {
        if (pageSidebar.el.classList.contains(IS_VISIBLE)) {
          pageSidebar.close()
        } else {
          pageSidebar.open()
        }
      }
    })
  }
}

const whalesPage = {
  init: function () {
    Object.values(this.initFn).forEach((fn) => {
      if (typeof fn === 'function') {
        try {
          fn()
        } catch (err) {
          console.log(`whales init fn err : ${err.message}`)
        }
      }
    })
  },
  toggleView: function (viewType = 'list') {
    const grid = document.querySelector('.tb-grid-container')
    const list = document.querySelector('.tb-table-container')
    if (list !== undefined && grid !== undefined) {
      switch (viewType) {
        case 'grid':
          list.style.opacity = 0
          setTimeout(() => {
            list.style.display = 'none'
            grid.style.display = 'block'
            setTimeout(() => {
              grid.style.opacity = 1
            }, 3);
          }, getTransitionTime(list));
          break;
        case 'list':
          grid.style.opacity = 0
          setTimeout(() => {
            grid.style.display = 'none'
            list.style.display = 'block'
            setTimeout(() => {
              list.style.opacity = 1
            }, 3);
          }, getTransitionTime(list));
          break;
        default:
          break;
      }
    }
  },
  initFn: {
    attachDropdownBtnClick: () => {
      const btnArr = [...document.querySelectorAll('[data-tb-dropdown]')]
      btnArr.forEach((btn) => {
        btn.onclick = () => {
          const dropdown = btn.parentNode.querySelector('.tb-dropdown')
          if (dropdown !== null) {
            if (dropdown.isVisible()) {
              btn.classList.remove(IS_ACTIVE)
              dropdown.classList.remove(IS_VISIBLE)
              setTimeout(() => {
                dropdown.style.display = 'none'
              }, getTransitionTime(dropdown));
            } else {
              dropdown.style.display = 'block'
              btn.classList.add(IS_ACTIVE)
              setTimeout(() => {
                dropdown.classList.add(IS_VISIBLE)
              }, 1);
            }
          }
        }
      })
    },
    attachViewSwitch: () => {
      const btnArr = [...document.querySelectorAll('[data-switch-view]')]
      cosnt = removeCls = () => {
        btnArr.forEach((btn) => { btn.classList.remove(IS_ACTIVE) })
      }
      btnArr.forEach((btn) => {
        btn.onclick = () => {
          const attr = btn.getAttribute('data-switch-view')
          if (attr !== null && !btn.classList.contains(IS_ACTIVE)) {
            removeCls()
            btn.classList.add(IS_ACTIVE)
            whalesPage.toggleView(attr)
          }
        }
      })
    },
    attachDocClick: () => {
      const dropdowns = [...document.querySelectorAll('.tb-dropdown')]
      const dropButtons = [...document.querySelectorAll('[data-tb-dropdown]')]

      document.addEventListener('click', function (e) {
        const target = e.target
        if (!target.closest('.tb-btn')) {
          dropdowns.forEach((drop) => {
            drop.classList.remove(IS_VISIBLE)
            setTimeout(() => {
              drop.style.display = 'none'
            }, getTransitionTime(drop));
          })
          dropButtons.forEach((btn) => { btn.classList.remove(IS_ACTIVE) })
        }
      })
    },
    attachCRM: () => {
      if (window.innerWidth < 1024) return
      const evtGoCrm = [
        ...document.querySelectorAll('[data-evt="goCRM"]')
      ]
      for (const element of evtGoCrm) {
        element.onclick = () => {
          const card = element.parentNode.closest('.whale-card') || null
          const swiperInstance = new crmSwiper({}, card).init()
        }
      }
      document.onclick = (e) => {
        const target = e.target
        if (target.closest('[data-evt="cardGoCRM"]')) {
          const card = target.closest('.whale-card')
          if (card) {
            const swiperInstance = new crmSwiper({}, card).init()
          }
        }
      }
    }
  }
}

const whaleCardsArr = [...document.querySelectorAll('.whale-card')]
const whaleCards = {
  init: function () {
    const main = document.querySelector('.main_whales')
    if (main) {
      this.updateRadioQuiz()
      Object.values(this.initFn).forEach((fn) => {
        if (typeof fn === 'function') {
          try {
            fn()
          } catch (err) {
            console.log(`whales cards init fn err : ${err.message}`)
          }
        }
      })
    }
  },
  updateNotesCount: (cards = whaleCardsArr) => {
    cards = Array.isArray(cards) ? cards : [cards]
    cards.forEach((card) => {
      const
        noteCount = card.querySelector('.whale-notes-count'),
        notes = card.querySelectorAll('.whale-card__note')
      if (noteCount) {
        let count = notes.length || 0
        noteCount.innerHTML = count
      }
    })
  },
  appendNote: function (parent, author, text) {
    let date = new Date(Date.now()).toLocaleString()
    const html = `
      <div class="whale-card__note">
        <div class="whale-card__note-date">${date}</div>
        <div class="whale-card__note-text">
        <span class="whale-card__note-author">${author}</span>:
        ${text}
        </div>
      </div>
     `
    parent.insertAdjacentHTML('beforeend', html)
  },
  updateRadioQuiz: function () {
    const inputs = [...document.querySelectorAll('#grid_view input[type="radio"]')]
    for (const input of inputs) {
      if (input.checked) {
        input.checked = !input.checked
        setTimeout(() => {
          input.checked = !input.checked
        }, 1);
      }
    }
  },
  initFn: {
    setInitialStats: () => {
      whaleCards.updateNotesCount()
    },
    attachNoteButtonClick: () => {
      const arr = [...document.querySelectorAll('[data-evt="toggleWhaleNotes"]')]
      arr.forEach((btn) => {
        btn.onclick = () => {
          const
            card = btn.closest('.whale-card'),
            noteContainer = card.querySelector('.whale-card__notes'),
            cells = card.querySelector('.whale-card__cells')
          if (noteContainer && cells) {
            if (noteContainer.isVisible()) {
              btn.classList.remove(IS_ACTIVE)
              noteContainer.classList.remove(IS_VISIBLE)
              cells.classList.remove(IS_HIDDEN)
              setTimeout(() => {
                noteContainer.style.display = 'none'
              }, getTransitionTime(noteContainer));
            } else {
              btn.classList.add(IS_ACTIVE)
              noteContainer.style.display = 'block'
              cells.classList.add(IS_HIDDEN)
              setTimeout(() => {
                noteContainer.classList.add(IS_VISIBLE)
              }, 1);
            }
          }
        }
      })
    },
    attachNoteSubmit: () => {
      const inputs = [...document.querySelectorAll('.am-note-input')]
      const buttons = [...document.querySelectorAll('[data-whale-evt="submitNote"]')]
      inputs.forEach((input) => {
        input.submit = () => {
          const val = input.value
          if (val) {
            const holder = input.parentNode.closest('.whale-card__notes').querySelector('.whale-card__notes-scroll')
            if (holder) {
              input.value = ''
              whaleCards.appendNote(holder, 'Zahir', val)
              holder.scrollTop = holder.scrollHeight
            }
          }
        }
        input.onkeydown = (e) => {
          if (e.key == 'Enter' || e.keyCode == 13) {
            e.preventDefault()
            input.submit()
          }
        }
      })
      buttons.forEach((btn) => {
        btn.onclick = () => {
          const input = btn.parentNode.querySelector('.am-note-input')
          input.submit()
        }
      })
    },
    attachContractSearch: () => {
      return
      const evtArr = [...document.querySelectorAll('[data-evt="contractGoogleSearch"]')]
      const googleContract = (name) => {
        const query = `${name} contract`
        const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(url, '_blank');
      }
      evtArr.forEach((btn) => {
        btn.onclick = () => {
          const card = btn.parentNode.closest('.whale-card')
          if (card) {
            const name = card.querySelector('.whale-card__name').textContent
            googleContract(name)
          }
        }
      })
    }
  }
}

const editModal = {
  init: function () {
    if (document.querySelector('.edit-modal')) {
      Object.values(this.initFn).forEach((fn) => {
        if (typeof fn === 'function') {
          try {
            fn()
          } catch (err) {
            console.log(`edit modal init fn err : ${err.message}`)
          }
        }
      })
    }
  },
  open: function () {
    lockScroll()
    const modal = document.querySelector('.edit-modal')
    if (modal) {
      modal.style.display = 'block'
      setTimeout(() => {
        modal.classList.add(IS_VISIBLE)
      }, 1);
    }
  },
  close: function () {
    unlockScroll()
    const modal = document.querySelector('.edit-modal')
    if (modal) {
      modal.classList.remove(IS_VISIBLE)
      setTimeout(() => {
        modal.style.display = 'none'
      }, getTransitionTime(modal));
    }
  },
  initFn: {
    bindToggle: function () {
      const closeEvt = document.querySelectorAll('[data-evt="closeEditModal"]')
      const openEvt = document.querySelectorAll('[data-evt="openEditModal"]')
      closeEvt.forEach((btn) => {
        btn.onclick = () => {
          editModal.close()
        }
      })
      openEvt.forEach((btn) => {
        btn.onclick = () => {
          editModal.open()
        }
      })
      document.addEventListener('keydown', (e) => {
        if (e.key == 'Escape' || e.keyCode == 27) {
          const modal = document.querySelector('.edit-modal')
          if (modal) {
            modal.classList.remove(IS_VISIBLE)
            setTimeout(() => {
              modal.style.display = 'none'
            }, getTransitionTime(modal));
          }
        }
      })
    }
  }
}

const gTip = {
  card: null,
  query: undefined,
  elem: document.querySelector('.g-tip'),
  input: document.querySelector('.g-tip__input'),
  init: function () {
    if (this.elem && this.input) {
      this.extendElem()
      this.bindEvents()
    }
  },
  extendElem: function () {
    this.elem.open = () => {
      if (gTip.card) {
        const anchor = gTip.card.querySelector('.ext-search')
        if (anchor) {
          const rect = anchor.getBoundingClientRect(), box = gTip.elem
          box.style.display = 'block'

          let left = rect.left > (box.offsetWidth / 2) ?
            rect.left - (box.offsetWidth / 2) + (anchor.offsetWidth / 2) :
            rect.left

          let top = (window.innerHeight - rect.bottom) < (box.offsetHeight + 20) ?
            window.scrollY + rect.top - box.offsetHeight - 10 :
            window.scrollY + rect.top + anchor.offsetHeight + 10

          if (left < 0) {
            left = 0;
          } else if (left + box.offsetWidth > window.innerWidth) {
            left = window.innerWidth - box.offsetWidth;
          }

          box.style.left = `${left}px`
          box.style.top = `${top}px`
        }
      }
    }
    this.elem.reset = () => {
      const box = gTip.elem
      box.style.display = 'none'
      if (gTip.card) {
        gTip.card = null
        gTip.query = undefined
      }
    }
    this.elem.submit = () => {
      const query = `${name} contract`
      const url = `https://www.google.com/search?q=${encodeURIComponent(gTip.query)}`;
      window.open(url, '_blank');
    }
  },
  bindEvents: () => {
    const btnArr = [...document.querySelectorAll('[data-evt="openGoogleTip"]')]
    btnArr.forEach((btn) => {
      btn.onclick = (e) => {
        gTip.card = e.target.closest('.whale-card')
        gTip.elem.open()
      }
    })

    const queries = [...document.querySelectorAll('.g-tip__queries a')]
    queries.forEach((query) => {
      query.onclick = (e) => {
        if (gTip.card) {
          let name = gTip.card.querySelector('.whale-card__name')
          if (name) {
            gTip.query = `${name.textContent} ${query.textContent}`
            gTip.elem.submit()
          }
        }
      }
    })

    const input = gTip.elem.querySelector('input')
    const submitInputArr = [...document.querySelectorAll('[data-evt="submitGoogleTip"]')]
    if (input) {
      input.onkeydown = (e) => {
        if (e.key == 'Enter') {
          e.preventDefault()
          if (gTip.card) {
            let name = gTip.card.querySelector('.whale-card__name')
            if (name) {
              gTip.query = `${name.textContent} ${input.value}`
              gTip.elem.submit()
            }
          }
        }
      }
    }
    submitInputArr.forEach((btn) => {
      btn.onclick = () => {
        if (gTip.card) {
          let name = gTip.card.querySelector('.whale-card__name')
          if (name) {
            gTip.query = `${name.textContent} ${input.value}`
            gTip.elem.submit()
          }
        }
      }
    })

    window.onscroll = () => {
      gTip.elem.reset()
    }

    document.addEventListener('click', (e) => {
      const target = e.target
      if (!target.classList.contains('ext-search') && !target.closest('.g-tip')) {
        gTip.elem.reset()
      }
    })
  }
}

const appendNewCustomer = (storeElement, html) => {
  const newCustomer = document.createElement('tr')
  newCustomer.classList.add(IS_ACTIVE)
  try {
    newCustomer.innerHTML = `<tr>${html}</tr>`
    storeElement.appendChild(newCustomer)
  } catch (err) {
    throw new Error(`appendNewCustomer error: ${err.message}`)
  } finally {
    console.log('appendNewCustomer success')
  }
}

const swapModal = {
  newYorkMask: /new\s*york|nyc|yor/i,
  miamiMask: /miami|mia|iam/i,
  atlantaMask: /atlanta|atl|atlant(?!.*?(flag|flagship|ship))/i,
  flagshipMask: /flagship|flag/i,
  initialized: false,
  activeStore: undefined,
  init: function () {
    this.renderDOM()
    if (!this.elem) return
    try {
      this.initFn.bindEvents()
      this.initFn.initialState()
    } catch (err) {
      throw new Error(`swapModal initialization error: ${err.message}`)
    } finally {
      this.initialized = true
    }
  },
  renderDOM: function () {
    this.elem = document.querySelector('.swap-modal')
  },
  open: function () {
    const input = this.elem.querySelectorAll('input')[0]
    lockScroll()
    this.elem.style.display = 'block'
    if (input) input.focus()
    setTimeout(() => {
      this.elem.classList.remove(IS_HIDDEN)
    }, 1);
  },
  close: function () {
    unlockScroll()
    this.elem.classList.add(IS_HIDDEN)
    setTimeout(() => {
      this.elem.style.display = 'none'
    }, getTransitionTime(this.elem));
  },
  toggle: function () {
    if (this.elem.style.display === 'none') {
      this.open()
    } else {
      this.close()
    }
  },
  renderCustomerHTML: (name, number, instagram, email) => {
    return `
    <tr>
      <td data-td="added_by">${getAdminUserName()}</td>
      <td data-td="name">${name}</td>
      <td data-td="number">${number}</td>
      <td>
        <a class="tb-social-btn instagram">
          <div>${instagram}</div>
        </a>
      </td>
      <td data-td="email">${email}</td>
      <td data-td="visit_date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
    </tr>
    `
  },
  clear: () => {
    [...swapModal.elem.querySelectorAll('input')].forEach(input => input.value = '')
  },
  getCustomerFromInputs: () => {
    const customer = {}
    const inputs = [...swapModal.elem.querySelectorAll('input')]
    for (const input of inputs) {
      const
        id = input.id,
        val = input.value
      customer[id] = val || 'Empty'
    }
    return customer
  },
  appendNewCustomer: () => {
    const customer = swapModal.getCustomerFromInputs()
    if (!customer.full_name) throw new Error('Full name is required')
    const html = swapModal.renderCustomerHTML(
      customer.full_name,
      customer.number,
      customer.instagram,
      customer.email
    )

    const store = swapModal.activeStore
    if (!store) throw new Error('No store selected')
    try {
      appendNewCustomer(store.querySelector('tbody'), html)
    } catch (err) {
      throw new Error(`appendNewCustomer error: ${err.message}`)
    } finally {
      swapModal.clear()
      swapModal.close()
    }
  },
  initFn: {
    initialState: () => {
      document.querySelectorAll('[data-store-nav]')[0].click()
      swapModal.close()
    },
    bindEvents: () => {
      const close = [...document.querySelectorAll('[data-evt="closeSwapModal"]')]
      const open = [...document.querySelectorAll('[data-evt="addSaksCustomer"]')]
      const storeNavBtnArr = [...document.querySelectorAll('[data-store-nav]')]
      const stores = [...document.querySelectorAll('[data-store-id]')]
      const addBtnArr = [...document.querySelectorAll('[data-evt="addStoreCustomer"]')]
      const inputs = [...swapModal.elem.querySelectorAll('input')]

      for (const elem of close) {
        elem.onclick = () => {
          swapModal.close()
        }
      }

      for (const elem of open) {
        elem.onclick = () => {
          swapModal.open()
        }
      }

      // Store switch
      for (const btn of storeNavBtnArr) {
        btn.onclick = () => {
          const storeId = btn.getAttribute('data-store-nav')
          if (!storeId) throw new Error('No store id found')
          const matchStore = stores.find(store => store.getAttribute('data-store-id') == storeId)
          if (!matchStore) throw new Error('No store found')

          swapModal.activeStore = matchStore
          const matching = storeNavBtnArr.filter((btn) => btn.getAttribute('data-store-nav') == storeId)
          storeNavBtnArr.forEach(btn => btn.classList.remove(IS_ACTIVE))
          matching.forEach(btn => btn.classList.add(IS_ACTIVE))

          for (const store of stores) {
            store.style.display = 'none'
            if (store == matchStore) store.style.display = 'block'
          }
        }
      }

      // Add customer
      for (const btn of addBtnArr) {
        btn.onclick = () => {
          swapModal.appendNewCustomer()
        }
      }
      for (const input of inputs) {
        input.onkeydown = (e) => {
          if (e.key == 'Enter') {
            swapModal.appendNewCustomer()
          }
        }
      }
    }
  }
}

if (pageBackdrop) {
  pageBackdrop.onclick = () => { pageSearch.close(); pageMenu.close(); pageSidebar.close() }
}

const pageObjects = [
  orderZoom,
  orderNotes,
  pageSearch,
  pageMenu,
  pageSidebar,
  whalesPage,
  whaleCards,
  editModal,
  gTip
]

for (const obj of pageObjects) {
  if (obj && typeof obj.init === 'function') {
    try {
      obj.init();
    } catch (err) {
      throw new Error(`Error executing obj.init: ${err.message}`);
    }
  }
}

const whaleCardAttachAvatarUpload = () => {
  document.onclick = (e) => {
    const target = e.target
    if (target.classList.contains('.avatar-upload-btn') || target.closest('.avatar-upload-btn')) {
      try {
        const input = target.querySelector('input')
        if (input) input.click()
      } catch (e) {
        throw new Error(`Upload avatar error: ${e.message}`)
      }
    }
  }

  document.addEventListener('change', (e) => {
    const target = e.target
    if (target.matches('input[data-input="avatar_upload"][type="file"]')) {
      const reader = new FileReader()
      try {
        reader.onload = (e) => {
          const img = target.closest('.whale-card .whale-card__avatar').querySelector('img')
          if (img) {
            img.src = e.target.result
          }
        }
        reader.readAsDataURL(target.files[0])
      } catch (err) {
        throw new Error(`Upload avatar error: ${err.message}`)
      }
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {

  const pageToolbar = {
    menuOpened: false,
    sortOpened: false,
    pointsOpened: false,
    filterOpened: false,
    elem: document.querySelector('.toolbar'),
    menu: document.querySelector('.toolbar-menu'),
    sortMenu: document.querySelector('#toolbarSort'),
    pointsMenu: document.querySelector('#toolbarPoints'),
    filterMenu: document.querySelector('#toolbarFilter'),
    sortToggleArr: document.querySelectorAll('[data-evt="toggleSortMenu"]'),
    ptsToggleArr: document.querySelectorAll('[data-evt="togglePoints"]'),
    filterToggleArr: document.querySelectorAll('[data-evt="toggleFilterMenu"]'),
    resetFormArr: document.querySelectorAll('[data-evt="resetToolbarForm"]'),

    init: function () {
      if (this.elem) {
        this.attachEvents()
        Object.values(this.initFn).forEach((fn) => {
          if (typeof fn === 'function') {
            try {
              fn()
            } catch (err) {
              console.log(`toolbar init fn err : ${err.message}`)
            }
          }
        })
      }
    },
    openMenu: function () {
      if (this.menu) {
        this.menuOpened = true
        this.elem.classList.add(IS_ACTIVE)
        const heightElem = document.querySelector('.toolbar-menu__wrapper')
        setTimeout(() => {
          this.menu.style.height = `${heightElem.scrollHeight}px`
        }, 30)
      }
    },
    closeMenu: function () {
      if (this.menu) {
        this.menuOpened = false
        this.elem.classList.remove(IS_ACTIVE)
        this.menu.style.height = 0
      }
    },
    adjustMenuHeight: function () {
      const wrapper = document.querySelector('.toolbar-menu__wrapper')
      if (wrapper) {
        let height = wrapper.clientHeight
        this.menu.style.height = `${height}px`
      }
    },
    toggleMenu: function () {
      if (this.menuOpened) {
        this.closeMenu()
      } else {
        this.openMenu()
      }
    },
    openSort: function () {
      if (this.menu && this.sortMenu) {
        this.checkSortState()
        this.checkFilterState()
        if (!this.menuOpened) {
          this.openMenu()
          this.sortOpened = true
          this.sortMenu.style.display = 'block'
          this.pointsMenu.style.display = 'none'
        } else {
          if (!this.filterOpened && !this.pointsOpened) {
            this.closeMenu()
            this.sortOpened = false
          } else {
            this.sortOpened = true
            this.filterOpened = false
            this.pointsOpened = false
            this.sortMenu.style.display = 'block'
            this.pointsMenu.style.display = 'none'
            this.adjustMenuHeight()
          }
        }
      }
    },
    openPoints: function () {
      if (this.menu && this.pointsMenu) {
        if (!this.menuOpened) {
          this.pointsOpened = true
          this.pointsMenu.style.display = 'block'
          this.sortMenu.style.display = 'none'
          this.openMenu()
        } else {
          if (!this.sortOpened) {
            this.closeMenu()
            this.pointsOpened = false
          } else {
            this.pointsOpened = true
            this.sortOpened = false
            this.pointsMenu.style.display = 'block'
            this.sortMenu.style.display = 'none'
            this.adjustMenuHeight()
          }
        }
      }
    },
    openFilter: function () {
      if (this.menu && this.filterMenu) {
        this.checkSortState()
        this.checkFilterState()
        if (!this.menuOpened) {
          this.openMenu()
          this.filterOpened = true
          this.filterMenu.style.display = 'block'
          this.sortMenu.style.display = 'none'
        } else {
          if (!this.sortOpened) {
            this.closeMenu()
            this.filterOpened = false
          } else {
            this.filterOpened = true
            this.sortOpened = false
            this.filterMenu.style.display = 'block'
            this.sortMenu.style.display = 'none'
            this.adjustMenuHeight()
          }
        }
      }
    },
    checkSortState: function () {
      if (this.sortMenu && this.sortToggleArr.length) {
        const inputs = this.sortMenu.querySelectorAll('input:checked')
        inputs.length ? this.sortToggleArr.forEach((btn) => btn.classList.add(IS_ACTIVE)) : this.sortToggleArr.forEach((btn) => btn.classList.remove(IS_ACTIVE))
      }
    },
    checkFilterState: function () {
      if (this.filterMenu && this.filterToggleArr.length) {
        const inputs = this.filterMenu.querySelectorAll('input:checked')
        inputs.length ? this.filterToggleArr.forEach((btn) => btn.classList.add(IS_ACTIVE)) : this.filterToggleArr.forEach((btn) => btn.classList.remove(IS_ACTIVE))
      }
    },

    attachEvents: function () {
      this.sortToggleArr.forEach((btn) => {
        btn.onclick = () => {
          this.openSort()
        }
      })
      this.filterToggleArr.forEach((btn) => {
        btn.onclick = () => {
          this.openFilter()
        }
      })
      this.ptsToggleArr.forEach((btn) => {
        btn.onclick = () => {
          this.openPoints()
        }
      })
      this.resetFormArr.forEach((btn) => {
        btn.onclick = () => {
          const form = btn.parentNode.closest('.toolbar-form')
          if (form) {
            let inputs = form.querySelectorAll('input:checked')
            inputs.forEach((input) => { input.checked = false })
          }
        }
      })
    },

    initFn: {
      renderPTSLottie: () => {
        const lottieContainers = [...document.querySelectorAll('[data-lottie="diamondSpin"]')]
        lottieContainers.forEach((container) => {
          const animation = bodymovin.loadAnimation({
            container: container,
            path: 'https://gist.githubusercontent.com/steinway1/4de3da6a3a8364ede5c3e5fff52c5113/raw/94ab2c03988700c56cffeb4f5fc06ce2e605120f/spin-diamond.json',
            autoplay: true,
            renderer: 'svg',
            loop: true
          })
        })
      }
    }
  }

  pageToolbar.init()
  swapModal.init()
  whaleCardAttachAvatarUpload()
})


/**
 * Print tag pag / PRINT
 */
class PrintTag {
  constructor() {
    this.main = document.querySelector('.main_print-tag')
    this.previewInputsHolder = document.querySelector('#tagPreviewInputs')
    this.previewDetails = document.querySelector('#tagPreviewDetails')
    this.previewImage = document.querySelector('#tagPreviewImage')
    this.previewImageInput = document.querySelector('#tag_image')
    this.tagElem = document.querySelector('#tagPreview')
    this.printList = document.querySelector('#print_list')
    this.previewInputs = []
    this.previewOutputObj = {}
    this.tagsToPrint = {}
    this.renderedHTMLToPrint = ''
  }

  get getPreviewObj() {
    return this.previewOutputObj
  }

  get getPreviewImageBackgroundURL() {
    const style = window.getComputedStyle(this.previewImage)
    const url = style.getPropertyValue('background-image')
    const regex = /^url\((['"]?)(.*)\1\)$/
    const matches = url.match(regex)
    let backgroundImageUrl = ''
    if (matches && matches[2]) {
      backgroundImageUrl = matches[2]
    }
    return backgroundImageUrl
  }

  /**
   * 
   * Utils
   */
  renderDetailsHTML() {
    let html = ''
    for (const [key, value] of Object.entries(this.previewOutputObj)) {
      if ('value' in value) {
        html += `
        <span data-title="${value.title}">${value.value}</span>
        `
      }
    }
    return html
  }
  bindInput(input, callback) {
    if (input) {
      input.addEventListener('input', callback)
    }
  }
  createLabelFromOutputObj() {
    const currentLabels = [...this.printList.querySelectorAll('label')]
    const label = createElem('label', {
      className: 'print-tag-label',
      attributes: {
        'data-tag-id': currentLabels.length + 1
      },
      innerHTML: `
      <input type="checkbox" checked>
      <div>
        <div class="print-tag-label__main">
          <div class="print-tag-label__img-wrap">
            <div class="print-tag-label__img" style="background-image: url(${this.getPreviewImageBackgroundURL})"></div>
          </div>
          <div class="print-tag-label__details">
            ${this.renderDetailsHTML()}
          </div>
        </div>
      </div>
      `
    })
    return label
  }

  /**
   * 
   * Extenders
   */
  extendPrintListItemToggle(label) {
    let labelArr = label ? toArray(label) : [...document.querySelectorAll('.print-tag-label')]
    for (const elem of labelArr) {
      const input = elem.querySelector('input')
      input.addEventListener('change', () => {
        this.observePrintList()
      })
    }
  }

  /**
   * 
   * Methods
   */
  updatePreviewObjFromInputs() {
    this.previewOutputObj = {}
    if (this.previewInputs.length) {
      this.previewInputs.forEach((input, index) => {
        this.previewOutputObj[index] = {
          id: input.id,
          title: input.closest('div').querySelector('label').innerHTML,
          value: input.value
        }
      })
    }
  }
  updateOutputPreviewDetails() {
    let filled = 0, html = ``
    const obj = this.previewOutputObj
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const keyObj = obj[key]
        if ('value' in keyObj && keyObj.value.length !== 0) {
          ++filled
          html += `
          <div id="${keyObj.id}">
            <span>${keyObj.title}</span>
            <span>${keyObj.value}</span>
          </div>
          `
        }
      }
    }
    if (filled) {
      this.previewDetails.innerHTML = html
      this.previewDetails.classList.add(__FILLED)
    } else {
      this.previewDetails.innerHTML = ''
      this.previewDetails.classList.remove(__FILLED)
    }
  }
  clearPreviewInputs() {
    if (this.previewInputs.length) {
      for (const input of this.previewInputs) {
        input.value = ''
        input.dispatchEvent(new Event('change'))
      }
    }
    if (this.previewImage && this.previewImageInput) {
      this.previewImage.style.backgroundImage = ''
      this.previewImage.classList.remove(__FILLED)
      this.previewImageInput.value = ''
    }
    this.previewOutputObj = {}
  }

  /** 
   * 
   * Printing
   */
  observePrintList() {
    if (!this.printList) throw new Error('No print list found')
    const labels = [...this.printList.querySelectorAll('.print-tag-label')]
    const inputs = labels.map((label) => {
      return label.querySelector('input')
    })
    const printBtnArr = [...document.querySelectorAll('[data-tag-evt="print_selected"]')]
    if (labels.length) {
      this.printList.classList.add(__FILLED)
    } else {
      this.printList.classList.remove(__FILLED)
    }

    if (inputs.some(input => input.checked)) {
      printBtnArr.forEach(btn => btn.removeAttribute('disabled'))
    } else {
      printBtnArr.forEach(btn => btn.setAttribute('disabled', 'disabled'))
    }
  }
  saveTag() {
    const elem = this.createLabelFromOutputObj()
    this.printList.appendChild(elem)
    this.observePrintList()
    this.clearPreviewInputs()
    this.updatePreviewObjFromInputs()
    this.updateOutputPreviewDetails()
  }
  printSelected() {
    this.tagsToPrint = {}
    const labels = [...this.printList.querySelectorAll('label')].reduce((acc, label) => {
      const inputCheckbox = label.querySelector('input[type="checkbox"]')
      if (inputCheckbox.checked) {
        acc.push(label)
      }
      return acc
    }, [])
    if (!labels.length) {
      new pageMsg({
        type: 'error',
        heading: 'No labels selected',
        msg: 'Select at least one label'
      })
    } else {
      labels.forEach((label, index) => {
        const img_url = label.querySelector('.print-tag-label__img').style.backgroundImage
        const spans = [...label.querySelectorAll('span')]

        this.tagsToPrint[index] = {}
        this.tagsToPrint[index].details = []
        this.tagsToPrint[index].img_url = img_url

        spans.forEach((span) => {
          if (!span.textContent.trim().length) return
          this.tagsToPrint[index].details.push({
            title: span.getAttribute('data-title'),
            value: span.textContent
          })
        })
      })
    }
    this.renderPrintHTML()
  }
  printAll() {
    const labels = [...this.printList.querySelectorAll('label')]
    if (!labels.length) {
      new pageMsg({
        type: 'error',
        heading: 'No Tags Found',
        msg: 'Add at least one tag to print list'
      })
      return
    }
    this.tagsToPrint = {}
    labels.forEach((label, index) => {
      const img_url = label.querySelector('.print-tag-label__img').style.backgroundImage
      const spans = [...label.querySelectorAll('span')]
      this.tagsToPrint[index] = {}
      this.tagsToPrint[index].details = []
      this.tagsToPrint[index].img_url = img_url
      spans.forEach((span) => {
        if (!span.textContent.trim().length) return
        this.tagsToPrint[index].details.push({
          title: span.getAttribute('data-title'),
          value: span.textContent
        })
      })
    })
    this.renderPrintHTML()
  }
  renderPrintHTML() {
    this.renderedHTMLToPrint = ''
    for (const key in this.tagsToPrint) {
      const obj = this.tagsToPrint[key]
      let renderDetailsHTML = () => {
        let html = ''
        if (obj.details.length) {
          for (const details in obj.details) {
            if (obj.details[details].title && obj.details[details].value) {
              html += `
              <div>
                <span>${obj.details[details].title}</span>
                <span>${obj.details[details].value}</span>
              </div>
              `
            }
          }
        }
        return html
      }
      this.renderedHTMLToPrint += `
	      <div id="tagPreview" class="tag-preview">
		      <img class="tag-preview__logo" src="./assets/blue-logo.svg" alt="Icebox logo">
		      <div id="tagPreviewImage" class="tag-preview__item-img --filled" style="background-image:${obj.img_url}"></div>
		      <div id="tagPreviewDetails" class="tag-preview__details --filled">
            ${renderDetailsHTML()}
          </div>
	      </div>
      `
    }
    console.log(this.renderedHTMLToPrint)
  }

  /**
   * 
   * Bind Events
   */
  bindPreviewInputs() {
    if (this.previewInputsHolder) {
      const textInputsArr = [...this.previewInputsHolder.querySelectorAll('input[type="text"]')]
      textInputsArr.forEach((input, index, inputs) => {
        this.previewInputs.push(input)
        this.previewOutputObj[index] = {
          id: input.id,
          value: '',
          title: input.closest('div').querySelector('label').innerHTML
        }

        input.oninput = () => {
          const value = input.value
          this.previewOutputObj[index].value = value
          this.updateOutputPreviewDetails()
        }

        input.addEventListener('change', () => {
          const value = input.value
          const divParent = input.closest('div')
          if (value.length) {
            divParent.classList.add(__FILLED)
          } else {
            divParent.classList.remove(__FILLED)
          }
        })

        input.onblur = () => {
          const value = input.value
          const divParent = input.closest('div')
          if (value.length) {
            divParent.classList.add(__FILLED)
          } else {
            divParent.classList.remove(__FILLED)
          }
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
      })
    }
  }
  bindPreviewImageUpload() {
    const
      input = document.querySelector('#tag_image'),
      label = document.querySelector('#upload_tag-image'),
      imageElem = this.previewImage

    if (input) {

      function processImage(file) {
        if (file) {
          let reader = new FileReader()
          reader.onload = (e) => {
            imageElem.classList.add(__FILLED)
            imageElem.style.backgroundImage = `url(${e.target.result})`
          }
          reader.readAsDataURL(file)
        }
      }

      if (label) {
        label.ondragover = (e) => {
          e.preventDefault()
          label.classList.add(IS_ACTIVE)
        }
        label.ondragleave = (e) => {
          e.preventDefault()
          label.classList.remove(IS_ACTIVE)
        }
        label.ondrop = (e) => {
          e.preventDefault()
          label.classList.remove(IS_ACTIVE)
          const
            files = [...e.dataTransfer.items],
            file = files.find((item) => { if (item.kind === 'file') { return item } })
          processImage(file.getAsFile())
        }
      }

      input.onchange = (e) => {
        const file = [...e.target.files][0]
        processImage(file)
      }

    }
  }
  bindTagHover() {
    const tag = this.tagElem
    if (tag) {
      const row = tag.closest('.print-tag__row')
      const elementInRow = [...row.querySelectorAll('*')]
      window.previewTagHoverTimeout = undefined

      tag.addEventListener('mouseover', () => {
        window.previewTagHoverTimeout = setTimeout(() => {
          tag.classList.add(__HOVERED)
        }, 800)
      })

      tag.addEventListener('mouseleave', () => {
        clearTimeout(window.previewTagHoverTimeout)
        tag.classList.remove(__HOVERED)
      })
    }
  }
  bindClear() {
    const elemArr = [...document.querySelectorAll('[data-tag-evt="clearInputs"]')]
    for (const elem of elemArr) {
      elem.addEventListener('click', () => {
        this.clearPreviewInputs()
        this.updatePreviewObjFromInputs()
        this.updateOutputPreviewDetails()
      })
    }
  }
  bindPrintListItemToggle() {
    this.extendPrintListItemToggle()
  }
  bindSave() {
    document.querySelectorAll('[data-tag-evt="save"]').forEach((btn) => {
      btn.onclick = () => { this.saveTag() }
    })
  }
  bindPrintListClick() {
    if (this.printList) {
      this.printList.addEventListener('click', () => {
        this.observePrintList()
      })
    }
  }
  bindPrint() {
    const selectedArr = [...document.querySelectorAll('[data-tag-evt="print_selected"]')]
    selectedArr.forEach((btn) => {
      btn.onclick = () => { this.printSelected() }
    })
    const allArr = [...document.querySelectorAll('[data-tag-evt="print_all"]')]
    allArr.forEach((btn) => {
      btn.onclick = () => { this.printAll() }
    })
  }

  /**
   * 
   * Init
   */
  init() {
    this.bindPreviewInputs()
    this.bindPreviewImageUpload()
    this.bindClear()
    this.observePrintList()
    this.bindPrintListItemToggle()
    this.bindPrintListClick()
    this.bindPrint()
    this.bindSave()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const printTagMain = document.querySelector('.main_print-tag')
  if (printTagMain) {
    const printTag = new PrintTag()
    printTag.init()
  }
})

/**
 * Point of sale page / POS PAGE
 * 
 */
class PosPage {
  constructor() {
    this.main = document.querySelector('.main_pos')
    this.details = this.main.querySelector('[data-pos="details"]')
    this.billTo = this.main.querySelector('#bill_to')
    this.billFrom = this.main.querySelector('#bill_from')
    this.items = this.main.querySelector('[data-pos="items"]')
    this.data = {}
  }

  get getNotesValue() {
    let value = null
    const notes = this.main.querySelector('[data-pos-input="notes"]')
    if (notes) {
      value = notes.value
    }
    return value
  }

  get getTermsValue() {
    let value = null
    const terms = this.main.querySelector('[data-pos-input="terms"]')
    if (terms) {
      value = terms.value
    }
    return value
  }

  get getItemsAsObj() {
    const items = [...this.main.querySelectorAll('[data-pos-item]')]
    const obj = {}
    items.forEach((item, index) => {
      const nameInput = item.querySelector('[data-pos-input="item_name"]')
      const qtyInput = item.querySelector('[data-pos-input="item_qty"]')
      const rateInput = item.querySelector('[data-pos-input="item_rate"]')
      const amountInput = item.querySelector('[data-pos-input="item_amount"]')
      if (nameInput && qtyInput && rateInput && amountInput) {
        obj[index + 1] = {
          name: nameInput.textContent || 'Name is not found',
          qty: qtyInput.value || 0,
          rate: rateInput.value || 0,
          amount: amountInput.value.replace(/[^0-9.]/g, '')
        }
      } else {
        console.warn(`${item} - Item has no data-pos-input="item_name" or data-pos-input="item_qty" or data-pos-input="item_rate" or data-pos-input="item_amount"`)
      }
    })
    return obj
  }

  get getAllItemsAmount() {
    let value
    const items = [...this.main.querySelectorAll('[data-pos-item]')]
    for (const item of items) {
      const amount = item.querySelector('[data-item-amount]')
      if (amount) {
        value = (value || 0) + Number(amount.value.replace(/[^0-9.]/g, ''))
      }
    }
    return value
  }

  get dueValue() {
    let value
    value = this.getAllItemsAmount
    return value
  }

  get getActiveCurrencyText() {
    const select = this.main.querySelector('[data-pos-select="currency"]')
    let text = select.options[select.selectedIndex].innerHTML
    const hasBrackets = text.includes('(') && text.includes(')')
    if (hasBrackets) {
      text = text.substring(text.indexOf('(') + 1, text.indexOf(')'))
    }
    return text
  }

  get getActiveCurrencyValue() {
    this.main.querySelector('[data-pos-select="currency"]').value
  }

  get getTaxValue() {
    const input = this.main.querySelector('[data-tax]')
    if (input) {
      return Number(input.value)
    } else {
      return undefined
    }
  }

  get getDiscountValue() {
    const input = this.main.querySelector('[data-discount]')
    if (input) {
      return Number(input.value)
    } else {
      return undefined
    }
  }

  get getShippingValue() {
    const input = this.main.querySelector('[data-shipping]')
    if (input) {
      return Number(input.value)
    } else {
      return undefined
    }
  }

  get getSubtotalValue() {
    return this.getAllItemsAmount
  }

  get getAmountPaid() {
    const input = this.main.querySelector('[data-paid-amount]')
    if (input) {
      return Number(input.value)
    }
  }

  get getTotalValue() {
    let value = 0 + this.getSubtotalValue,
      taxValue = 0, discountValue = 0, shippingValue = 0
    if (this.getTaxValue) {
      taxValue = (this.getSubtotalValue * this.getTaxValue) / 100
    }
    if (this.getDiscountValue) {
      discountValue = value * (this.getDiscountValue / 100)
    }
    if (this.getShippingValue) {
      shippingValue = this.getShippingValue
    }
    value = value + taxValue - discountValue + shippingValue
    return value
  }

  get getDueValue() {
    return this.getTotalValue - this.getAmountPaid
  }

  get getBillTo() {
    if (!this.billTo) return undefined
    let obj = {}
    obj.lines = {}
    const inputs = [...this.billTo.querySelectorAll('input:not([data-title])')]
    const inputTitle = this.billTo.querySelector('[data-title]')
    obj.title = inputTitle ? inputTitle.value : ''
    inputs.forEach((input, index) => {
      if (index == 0) {
        obj.name = input.value
      } else {
        obj.lines[index] = {
          name: input.value
        }
      }
    })
    return obj
  }

  get getDetails() {
    if (!this.details) return undefined
    let obj = {}
    const detailsArr = [...this.details.querySelectorAll('.pos-doc__details-box:not([data-prevent])')]
    detailsArr.forEach((details, index) => {
      const inputs = [...details.querySelectorAll('input:not([data-title])')]
      if (inputs.length > 1) {
        obj[index] = {
          title: inputs[0].value,
          value: inputs[1].value
        }
      }
    })
    return obj
  }

  get getBillFrom() {
    if (!this.billFrom) return undefined
    let obj = {}
    obj.lines = {}
    const inputs = [...this.billFrom.querySelectorAll('input:not([data-title])')]
    const inputTitle = this.billFrom.querySelector('[data-title]')
    obj.title = inputTitle ? inputTitle.value : ''
    inputs.forEach((input, index) => {
      if (index == 0) {
        obj.name = input.value
      } else {
        obj.lines[index] = {
          name: input.value
        }
      }
    })
    return obj
  }

  get getInvoiceNumber() {
    const input = this.main.querySelector('[data-pos-input="invoice_number"]')
    if (input) {
      return input.value
    }
    return undefined
  }

  /**
   * Change Invoice From
   */
  toggleSwisswatches() {
    this.main.classList.add('--swisswatches')
    this.changeInvoiceFrom('swisswatches')
  }
  toggleIcebox() {
    this.main.classList.remove('--swisswatches')
    this.changeInvoiceFrom('icebox')
  }
  changeInvoiceFrom(store = 'icebox') {
    store = store.toLowerCase()
    const holder = this.main.querySelector('#bill_from')
    if (holder) {
      [...holder.querySelectorAll('*')].forEach(el => el.remove())
      switch (store) {
        case 'swisswatches':
          holder.insertAdjacentHTML('beforeend', this.renderBillFromHTML('swisswatches'))
          break;
        case 'icebox':
          holder.insertAdjacentHTML('beforeend', this.renderBillFromHTML('icebox'))
          break;
        default:
          holder.insertAdjacentHTML('beforeend', this.renderBillFromHTML('icebox'))
          break;
      }
    }
  }

  /**
   * Calculation Methods
   */
  updateValues() {
    this.updateItemsPrice()
    this.updateSubtotal()
    this.updateTotal()
    this.updateDue()
  }
  updateItemsPrice(item) {
    const itemsArr = item ? toArray(item) : [...this.main.querySelectorAll('[data-pos-item]')]
    for (const item of itemsArr) {
      const
        qty = item.querySelector('[data-item-qty]'),
        rate = item.querySelector('[data-item-rate]'),
        amount = item.querySelector('[data-item-amount]')

      if (qty && rate && amount) {
        if (qty.value && rate.value) {
          let totalAmount = parseInt(qty.value) * parseFloat(rate.value)
          if (totalAmount > 0) {
            amount.value = `${this.getActiveCurrencyText} ${formatAsCurrency(totalAmount)}`
          } else {
            amount.value = `${this.getActiveCurrencyText} 0.00`
          }
        } else {
          amount.value = `${this.getActiveCurrencyText} 0.00`
        }
      } else {
        console.warn(`${item} - Item has no data-item-qty or data-item-rate or data-item-amount`)
      }
    }
    this.updateSubtotal()
  }
  updateSubtotal() {
    const subtotalArr = [...this.main.querySelectorAll('[data-subtotal]')]
    for (const elem of subtotalArr) {
      elem.textContent = `${formatAsCurrency(this.getSubtotalValue)}`
    }
  }
  updateTotal() {
    const totalArr = [...this.main.querySelectorAll('[data-total]')]
    for (const elem of totalArr) {
      if (elem.tagName === 'INPUT') {
        elem.value = `${this.getActiveCurrencyText} ${formatAsCurrency(this.getTotalValue)}`
      } else {
        elem.textContent = `${formatAsCurrency(this.getTotalValue)}`
      }
    }
  }
  updateDue() {
    const totalArr = [...this.main.querySelectorAll('[data-due]')]
    for (const elem of totalArr) {
      if (elem.tagName === 'INPUT') {
        elem.value = `${this.getActiveCurrencyText} ${formatAsCurrency(this.getDueValue)}`
      } else {
        elem.textContent = `${formatAsCurrency(this.getDueValue)}`
      }
    }
  }


  /**
   * Utils
   */
  updateCurrency(select) {
    select = select ? select : this.main.querySelector('[data-pos-select="currency"]')
    const currency = select.value
    let text = select.options[select.selectedIndex].innerHTML
    const hasBrackets = text.includes('(') && text.includes(')')
    if (hasBrackets) {
      text = text.substring(text.indexOf('(') + 1, text.indexOf(')'))
    }

    const currencyArr = [...this.main.querySelectorAll('[data-currency]')]
    for (const elem of currencyArr) {
      if (elem.tagName === 'INPUT') {
        if (elem.value && elem.value.trim() !== '') {
          const valueWords = elem.value.trim().split(' ')
          const value = valueWords[1]
          elem.value = `${text} ${value}`
        }
      } else {
        elem.textContent = text
      }
    }
    this.data.currency = {
      text: text,
      value: currency
    }
  }
  updateBillFrom(select) {
    select = select ? select : this.main.querySelector('[data-pos-select="bill_from"]')
    const store = select.value
    switch (store) {
      case 'swisswatches':
        this.toggleSwisswatches()
        break;
      case 'icebox':
        this.toggleIcebox()
        break;
      default:
        this.toggleIcebox()
        break;
    }
  }
  createDetailsBox() {
    const elem = createElem('div', {
      className: 'pos-doc__details-box',
      attributes: {
        'data-removable': true
      },
      innerHTML: `
      <div class="pos-input-group --blank">
        <input type="text" class="pos-input --dim" value="Title">
      </div>
      <div class="pos-input-group">
        <input type="text" class="pos-input --md">
      </div>
      `
    })
    this.extendRemovableEl(elem)
    // this.extendToggleBlankInput(elem.querySelector('input.--md'))
    return elem
  }
  createBillSmLine() {
    const elem = createElem('div', {
      className: 'pos-input-group',
      attributes: {
        'data-removable': true
      },
      innerHTML: `
      <input data-input-toggle type="text" class="pos-input --sm" value="" placeholder="Line">
      `
    })
    this.extendRemovableEl(elem)
    this.extendToggleBlankInput(elem.querySelector('input'))
    return elem
  }
  createItemLine() {
    const elem = createElem('div', {
      className: 'pos-doc-item',
      attributes: {
        'data-removable': true,
        'data-pos-item': true
      },
      innerHTML: `
      <div class="pos-doc-item__title">
      <h5 data-pos-input="item_name" class="pos-doc-title" contenteditable spellcheck="false"></h5>
    </div>
    <div class="pos-doc-item__details">
      <div>
        <div class="pos-input-group">
          <input data-pos-input="item_qty" data-item-qty data-allow="digits" type="text" class="pos-input" value="" placeholder="">
        </div>
      </div>
      <div>
        <div class="pos-input-group">
          <div data-currency class="pos-input-spot">${this.getActiveCurrencyText}</div>
          <input data-pos-input="item_rate" data-item-rate data-allow="sum" type="text" class="pos-input" value="" placeholder="0.00">
        </div>
      </div>
      <div>
        <div class="pos-input-group --blank" data-locked>
          <input data-pos-input="item_amount" data-item-amount data-currency type="text" class="pos-input" value="${this.getActiveCurrencyText} 0.00" placeholder="">
        </div>
      </div>
    </div>
      `
    })
    this.extendRemovableEl(elem)
    const editableEls = [...elem.querySelectorAll('[contenteditable]')]
    const allowEls = [...elem.querySelectorAll('[data-allow]')]
    const inputEls = [...elem.querySelectorAll('input')]
    for (const editableEl of editableEls) {
      this.extendEditableEl(editableEl)
    }
    for (const allowEl of allowEls) {
      this.extendAllowEl(allowEl)
    }
    for (const inputEl of inputEls) {
      this.extendUpdateInput(inputEl)
    }
    return elem
  }
  createShippingLine() {
    const span = createElem('span', {
      innerHTML: 'Shipping'
    })
    const inputGroup = createElem('div', {
      className: 'pos-input-group',
      innerHTML: `
      <div data-currency class="pos-input-spot">${this.getActiveCurrencyText}</div>
      <input data-shipping data-allow="sum" type="text" class="pos-input" value="" placeholder="">
      `
    })
    const allowEls = [...inputGroup.querySelectorAll('[data-allow]')]
    const inputEls = [...inputGroup.querySelectorAll('input')]
    for (const allowEl of allowEls) {
      this.extendAllowEl(allowEl)
    }
    for (const inputEl of inputEls) {
      this.extendUpdateInput(inputEl)
    }
    return [span, inputGroup]
  }
  createTaxLine() {
    const span = createElem('span', {
      innerHTML: 'Tax'
    })
    const inputGroup = createElem('div', {
      className: 'pos-input-group',
      innerHTML: `
      <div class="pos-input-spot">%</div>
      <input data-tax type="text" class="pos-input" value="" placeholder="">
      `
    })
    const allowEls = [...inputGroup.querySelectorAll('[data-allow]')]
    const inputEls = [...inputGroup.querySelectorAll('input')]
    allowEls.forEach(allowEl => this.extendAllowEl(allowEl))
    inputEls.forEach(inputEl => this.extendUpdateInput(inputEl))
    return [span, inputGroup]
  }
  createDiscountLine() {
    const span = createElem('span', {
      innerHTML: 'Discount'
    })
    const inputGroup = createElem('div', {
      className: 'pos-input-group',
      innerHTML: `
      <div class="pos-input-spot">%</div>
      <input data-discount type="text" class="pos-input" value="" placeholder="">
      `
    })
    const allowEls = [...inputGroup.querySelectorAll('[data-allow]')]
    const inputEls = [...inputGroup.querySelectorAll('input')]
    allowEls.forEach(allowEl => this.extendAllowEl(allowEl))
    inputEls.forEach(inputEl => this.extendUpdateInput(inputEl))
    return [span, inputGroup]
  }
  renderBillFromHTML(store = 'icebox') {
    store = store.toLowerCase()
    let html
    switch (store) {
      case 'swisswatches':
        html = `
        <div class="pos-input-group --blank">
          <input data-title type="text" class="pos-input" value="Bill From:">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --lg" value="SwissWatches.com">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="3255 Peachtree Road NE Ste 3">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="Atlanta, GA 30305">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="404-842-0266">
        </div>
       `
        break;
      case 'icebox':
        html = `
        <div class="pos-input-group --blank">
          <input data-title type="text" class="pos-input" value="Bill From:">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --lg" value="Icebox Diamonds &amp; Watches">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="3255 Peachtree Road NE Ste 2">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="Atlanta, GA 30305">
        </div>
        <div class="pos-input-group --blank">
          <input type="text" class="pos-input --sm" value="404-842-0266">
        </div>
       `
        break;
    }
    return html
  }


  /**
   * Extenders
   */
  extendRemovableEl(target) {
    target.addEventListener('mouseover', () => {
      if (target.querySelector('.remove-btn')) return
      const removeBtn = createElem('button', {
        className: 'remove-btn',
        attributes: {
          'data-pos-remove': true,
          'data-pos-update': true
        }
      })
      target.appendChild(removeBtn)
    })
    target.addEventListener('mouseleave', () => {
      const removeBtn = target.querySelector('.remove-btn')
      if (removeBtn) {
        removeBtn.remove()
      }
    })
  }
  extendToggleBlankInput(input) {
    input.addEventListener('blur', () => {
      const group = input.parentNode.closest('.pos-input-group')
      const value = input.value
      if (group && value.length !== 0) {
        group.classList.add(__BLANK)
      }
    })
    input.addEventListener('focus', () => {
      const group = input.parentNode.closest('.pos-input-group')
      if (group) {
        group.classList.remove(__BLANK)
      }
    })
    input.addEventListener('keydown', (e) => {
      const isEnter = e.key === 'Enter' || e.keyCode === 13
      if (isEnter) {
        e.preventDefault()
        input.blur()
      }
    })
  }
  extendEditableEl(target) {
    target.addEventListener('input', (e) => {
      const text = e.target.textContent
      if (text.length === 0) {
        target.classList.remove(__FILLED)
      } else {
        target.classList.add(__FILLED)
      }
    })
  }
  extendAllowEl(target) {
    const attr = target.getAttribute('data-allow')
    if (attr) {
      switch (attr) {
        case 'digits':
          allowInputDigits(target)
          break;
        case 'sum':
          allowInputSum(target)
          break;
        default:
          throw new Error(`Unknown allow attribute: ${attr}`)
      }
    }
  }
  extendUpdateInput(input) {
    input.addEventListener('input', () => {
      this.updateValues()
    })
  }

  /**
   * Attach Events
   */
  attachRemovableElements() {
    const arr = [...this.main.querySelectorAll('[data-removable]')]
    for (const elem of arr) {
      this.extendRemovableEl(elem)
    }
  }
  attachAddElements() {
    const arr = [...this.main.querySelectorAll('[data-pos-add]')]
    for (const elem of arr) {
      elem.addEventListener('click', () => {
        const addAttr = elem.dataset.posAdd
        let elemToAdd, holder
        switch (addAttr) {
          case 'details_box':
            holder = this.details
            elemToAdd = this.createDetailsBox()
            break;
          case 'bill_line_sm':
            holder = this.billTo
            elemToAdd = this.createBillSmLine()
            break;
          case 'item_line':
            holder = this.items
            elemToAdd = this.createItemLine()
            break;
          case 'sum_line_tax':
          case 'sum_line_shipping':
          case 'sum_line_discount':
            holder = elem.parentNode.closest('.pos-doc-sum__line')
            if (!holder) throw new Error('PosPage : Add Elements : Holder not found')
            holder.classList.add(__ADDED)
            holder.setAttribute('data-removable', true)
            this.extendRemovableEl(holder)
            elemToAdd = addAttr == 'sum_line_shipping' ? this.createShippingLine() : addAttr == 'sum_line_tax' ? this.createTaxLine() : this.createDiscountLine()
            break;
          default:
            elemToAdd = undefined
            holder = undefined
            throw new Error('Unknown element to add')
        }
        if (!holder) throw new Error('PosPage : Add Elements : Holder not found')
        if (!elemToAdd) throw new Error('PosPage : Add Elements : Element is undefined')
        toArray(elemToAdd).forEach((el) => holder.appendChild(el))
        this.updateCurrency()
      })
    }
  }
  attachToggleBlankInput() {
    const arr = [...document.querySelectorAll('[data-input-toggle]')]
    for (const input of arr) {
      this.extendToggleBlankInput(input)
    }
  }
  attachEditableElements() {
    const arr = [...this.main.querySelectorAll('[contenteditable]')]
    for (const elem of arr) {
      this.extendEditableEl(elem)
    }
  }
  attachAllowElements() {
    const arr = [...this.main.querySelectorAll('[data-allow]')]
    for (const elem of arr) {
      this.extendAllowEl(elem)
    }
  }
  attachChangeCurrency() {
    const selectArr = [...this.main.querySelectorAll('[data-pos-select="currency"]')]
    for (const select of selectArr) {
      select.onchange = () => {
        this.updateCurrency(select)
      }
    }
  }
  attachChangeBillFrom() {
    const selectArr = [...this.main.querySelectorAll('[data-pos-select="bill_from"]')]
    for (const select of selectArr) {
      select.onchange = () => {
        this.updateBillFrom(select)
      }
    }
  }
  attachDatePickers() {
    const arr = [...this.main.querySelectorAll('[data-datepicker]')]
    for (const input of arr) {
      new AirDatepicker(input, {
        autoClose: false,
        dateFormat(date) {
          return date.toLocaleString('us', {
            year: 'numeric',
            day: '2-digit',
            month: 'long'
          });
        }
      })
    }
  }
  attachDocumentClick() {
    document.addEventListener('click', (e) => {
      const target = e.target
      // Remove elements
      if (target.matches('[data-pos-remove]')) {
        const parent = target.closest('[data-removable]')
        if (parent.classList.contains('pos-doc-sum__line')) {
          parent.classList.remove(__ADDED)
          parent.removeAttribute('data-removable')
          const elemToRemove = [...parent.querySelectorAll('span'), ...parent.querySelectorAll('.pos-input-group')]
          elemToRemove.forEach((el) => el.remove())
        } else {
          target.closest('[data-removable]').remove()
        }
      }
      // Update Value
      if (target.matches('[data-pos-update]')) {
        this.updateValues()
      }
    })
  }
  attachSave() {
    const saveEvtArr = [...this.main.querySelectorAll('[data-pos-save]')]
    for (const elem of saveEvtArr) {
      elem.addEventListener('click', () => {
        this.save()
      })
    }
  }

  /**
   * Attach Calculations
   */
  attachItemInputChange() {
    const inputArr = [...this.main.querySelectorAll('input[data-item-qty], input[data-item-rate], input[data-paid-amount]')]
    for (const input of inputArr) {
      input.addEventListener('input', (e) => {
        this.updateValues()
      })
    }
  }

  /**
   * Save event
   */
  save() {
    this.data = {}
    let data = this.data
    data.billTo = this.getBillTo
    data.billFrom = this.getBillFrom
    data.currency = {
      text: this.getActiveCurrencyText,
      value: this.getActiveCurrencyValue
    }
    data.details = this.getDetails
    data.number = this.getInvoiceNumber
    data.items = this.getItemsAsObj
    data.notes = this.getNotesValue
    data.terms = this.getTermsValue
    data.itemsAmount = this.getAllItemsAmount
    data.subtotal = this.getSubtotalValue
    data.total = this.getTotalValue
    data.tax = this.getTaxValue || 0
    data.shipping = this.getShippingValue || 0
    data.discount = this.getDiscountValue || 0
    data.balanceDue = this.getDueValue
    console.log(this.data)
    new pageMsg({
      type: 'success',
      heading: 'Invoice Saved',
      msg: 'Invoice saved successfully',
      timeout: 1400
    })
  }

  /**
   * Initial
   */
  init() {
    if (this.main) {
      // Attach events
      this.attachDocumentClick()
      this.attachRemovableElements()
      this.attachAddElements()
      this.attachToggleBlankInput()
      this.attachEditableElements()
      this.attachAllowElements()
      this.attachChangeCurrency()
      this.attachChangeBillFrom()
      this.attachDatePickers()
      this.attachSave()

      // Attach calculations
      this.attachItemInputChange()

      // Starters
      this.updateCurrency()
      this.updateBillFrom()
      this.updateValues()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const posMain = document.querySelector('.main_pos')
  if (posMain) {
    const POS = new PosPage()
    POS.init()
  }
})

class GoldPrice {
  constructor() {
    this.table = document.querySelector('[data-tb="gold_prices"]')
  }

  updateChanges() {
    if (this.table) {
      const rows = [...this.table.querySelectorAll('[data-row]')]
      rows.forEach((row, index, arr) => {
        const priceEl = row.querySelector('[data-price]')
        const prevPriceEl = arr[index + 1] ? arr[index + 1].querySelector('[data-price]') : null
        const changeEl = row.querySelector('[data-change]')

        if (priceEl && changeEl && prevPriceEl) {
          const price = Number(priceEl.innerHTML.replace(/[^0-9.]/g, ''))
          const prevPrice = Number(prevPriceEl.innerHTML.replace(/[^0-9.]/g, ''))
          const change = (price - prevPrice).toFixed(2)
          const percentChange = ((change / prevPrice) * 100).toFixed(2)
          const sign = change > 0 ? '+' : '-'
          const resultHTML = `${sign} ${percentChange.replace(/\+|-/g, '')}% / ${sign} $${change.replace(/\+|-/g, '')}`
          changeEl.innerHTML = resultHTML

          if (change < 0) {
            changeEl.classList.add('--negative')
            priceEl.classList.add('--negative')
          } else {
            priceEl.classList.add('--positive')
          }
        } else {
          changeEl.classList.add('--na')
        }
      })
    }
  }

  init() {
    this.updateChanges()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const goldMain = document.querySelector('.main_gold')
  if (goldMain) {
    const goldPricePage = new GoldPrice()
    goldPricePage.init()
  }
})

/**
 * Finance List Page
 */

const FinanceList = {
  submitToRemove: null,
  init: function () {
    if (document.querySelector('.main_fin_list') !== null) {
      for (const elem of Object.values(FinanceList.bindEvents)) {
        if (elem !== undefined && typeof elem == 'function') elem();
      }
    }
  },
  bindEvents: {
    documentEvents: function () {
      document.addEventListener('click', (e) => {
        // Remove Submit
        if (e.target.closest('[data-evt="remove_fin_item"]')) {
          const submit = e.target.closest('.fin-item')
          if (submit !== null) {
            const remove = () => {
              FinanceList.deleteSubmit(submit)
            }
            const removeMessage = () => {
              new pageMsg({
                heading: 'Submit Removed',
                msg: 'Application has been removed successfully',
              })
            }
            const ask = new AskModal({
              heading: 'Delete This Submit?',
              subheading: 'This application will be permanently deleted with no undo.',
              exitText: 'Back',
              submitText: 'Delete',
              submitCallback: [remove, removeMessage]
            })
            ask.show()
          }
        }
      })
    },
    temp: function () {
      return
      const modal = document.querySelector('.edit-modal')
      const backdrop = document.querySelector('.edit-modal__backdrop')
      const container = document.querySelector('.edit-modal__container')
      if (modal) {
        modal.style.display = 'block'
        backdrop.style.opacity = 1
        container.style.transform = 'translateX(0)'
      }
    }
  },
  deleteSubmit(submit) {
    if (submit) {
      const currentHeight = submit.offsetHeight
      submit.style.height = `${currentHeight}px`
      submit.style.pointerEvents = 'none'
      setTimeout(() => {
        submit.style.opacity = 0
        submit.style.transform = 'translateY(-12px)'
        submit.style.height = `0px`
        setTimeout(() => {
          submit.remove()
        }, getTransitionTime(submit));
      }, 5);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  FinanceList.init()
})