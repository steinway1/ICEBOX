

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

  Number.prototype.between = function (min, max) {
    return this >= min && this <= max
  }

  const body = document.querySelector('body'),
    pageBackdrop = document.querySelector('.am-backdrop'),
    amHeader = document.querySelector('.am-header')

  const
    IS_VISIBLE = 'is-visible',
    IS_ACTIVE = 'is-active',
    IS_HIDDEN = 'is-hidden',
    __BACK = '--back',
    __MOVING = '--moving',
    __STASH = '--stash'

  HTMLElement.prototype.isVisible = function () {
    return window.getComputedStyle(this).getPropertyValue('display') !== 'none'
  }

  const getTransitionTime = (target) => {
    let el = target instanceof jQuery ? target[0] : target;
    return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
  }

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
      }
    }
  }

  const whaleCardsArr = [...document.querySelectorAll('.whale-card')]
  const whaleCards = {
    init: function () {
      const main = document.querySelector('.main_whales')
      if (main) {
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

  const toolbar = {
    init: function () {
      Object.values(this.initFn).forEach((fn) => {
        if (typeof fn === 'function') {
          try {
            fn()
          } catch (err) {
            console.log(`toolbar init fn err : ${err.message}`)
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

  pageBackdrop.onclick = () => { pageSearch.close(); pageMenu.close(); pageSidebar.close() }


  const pageObjects = [
    orderZoom,
    orderNotes,
    pageSearch,
    pageMenu,
    pageSidebar,
    whalesPage,
    whaleCards,
    editModal,
    toolbar,
    gTip
  ]

  pageObjects.forEach((obj) => {
    if (obj.init !== undefined && typeof obj.init === 'function') {
      try {
        obj.init()
      } catch (err) {
        console.error(err.message)
      }
    }
  })


  // SWIPER

  // const
  //   swiper = document.querySelector('.swiper'),
  //   stash = document.querySelector('.swiper__stash'),
  //   holder = document.querySelector('.swiper__cards')

  // if (swiper && stash && holder) {

  //   let
  //     card,
  //     drag,
  //     deg,
  //     degOffset = 25,
  //     maxDrag = 350,
  //     minDrag = 100,
  //     maxPrevCards = 20,
  //     maxNextCards = 20,
  //     downEvents = ['mousedown', 'touchstart', 'click'],
  //     moveEvents = ['mousemove', 'touchmove'],
  //     upEvents = ['mouseup', 'touchend'],
  //     memoryCards = {},
  //     initCard

  //   swiper.open = function () {
  //     lockScroll()
  //     swiper.style.display = 'block'
  //     setTimeout(() => {
  //       swiper.classList.add(IS_VISIBLE)
  //     }, 1);
  //   }
  //   swiper.close = function () {
  //     unlockScroll()
  //     swiper.classList.remove(IS_VISIBLE)
  //     setTimeout(() => {
  //       swiper.style.display = 'none'
  //       destroy()
  //     }, getTransitionTime(swiper));
  //   }

  //   const createSwiper = () => {
  //     memoryCards = {}
  //     let fromCard = initCard !== null && initCard !== undefined ? initCard : [...document.querySelectorAll('.whale-card')][0]

  //     let
  //       nextCards = [],
  //       prevCards = [],
  //       next = fromCard.nextElementSibling,
  //       prev = fromCard.previousElementSibling

  //     if (fromCard) {
  //       while (next && nextCards.length < maxNextCards) {
  //         nextCards = [...nextCards, next]
  //         next = next.nextElementSibling
  //       }
  //       while (prev && prevCards.length < maxPrevCards) {
  //         prevCards = [...prevCards, prev]
  //         prev = prev.previousElementSibling
  //       }
  //       nextCards = [fromCard, ...nextCards]

  //       memoryCards.prev = prevCards
  //       memoryCards.next = nextCards
  //     } else { return }

  //     console.log(memoryCards)
  //   }



  //   document.querySelectorAll('[data-evt="cardGoCRM"]').forEach((btn) => {
  //     btn.onclick = () => {
  //       initCard = btn.closest('.whale-card')
  //       createSwiper()
  //       swiper.open()
  //     }
  //   })
  // }

