const
  IS_VISIBLE = 'is-visible',
  IS_ACTIVE = 'is-active',
  IS_HIDDEN = 'is-hidden',
  __BACK = '--back',
  __MOVING = '--moving',
  __STASH = '--stash'

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
    const cards = [...document.querySelectorAll('#grid_view .whale-card')]
    console.log('Update radio called')
    for (const card of cards) {
      const label = card.querySelector('.whale-card__quiz label')
      if (label) {
        const input = label.querySelector('input[type="radio"]')
        if (input) {
          console.log([card, label, input, input.checked])
        }
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
    filterOpened: false,
    elem: document.querySelector('.toolbar'),
    menu: document.querySelector('.toolbar-menu'),
    sortMenu: document.querySelector('#toolbarSort'),
    filterMenu: document.querySelector('#toolbarFilter'),
    sortToggleArr: document.querySelectorAll('[data-evt="toggleSortMenu"]'),
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
        setTimeout(() => {
          this.menu.style.height = `${this.menu.scrollHeight}px`
        }, 10)
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
          this.filterMenu.style.display = 'none'
        } else {
          if (!this.filterOpened) {
            this.closeMenu()
            this.sortOpened = false
          } else {
            this.sortOpened = true
            this.filterOpened = false
            this.sortMenu.style.display = 'block'
            this.filterMenu.style.display = 'none'
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

document.addEventListener('DOMContentLoaded', () => {
  return
  let y = 0
  let fullHeight = document.body.offsetHeight - window.innerHeight
  const calculatePercentage = (number, total) => {
    return (number / total) * 100
  }
  const setElementWidthPercent = (el, percent) => {
    el.style.width = `${percent}%`
  }

  const progressBar = document.createElement('div')
  const progressBarLine = document.createElement('div')
  progressBar.className = 'progress-bar'
  progressBarLine.className = 'progress-bar__line'

  progressBar.appendChild(progressBarLine)
  document.body.appendChild(progressBar)

  setElementWidthPercent(progressBarLine, y)

  window.onscroll = () => {
    y = window.scrollY
    setElementWidthPercent(progressBarLine, calculatePercentage(y, fullHeight))
  }
})