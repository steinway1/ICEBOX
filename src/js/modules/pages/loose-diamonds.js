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

module.exports = LooseDiamonds