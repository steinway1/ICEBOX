
const setFiltersStickyPos = () => {
  const pageFilters = document.querySelector('.page-filters'),
    header = document.querySelector('.header')

  if (pageFilters !== null && header !== null) {
    function adjust() {
      try {
        let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue('height'))
        pageFilters.style.top = `${headerHeight}px`
      } catch {
        console.log('page filters err')
      }
    }
    ['load', 'resize'].forEach((event) => { window.addEventListener(event, () => { adjust() }) })
  }
}

const setPageFilters = () => {
  
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
      window.addEventListener('scroll', function () {
        if (pageFilters.atLeastOneVisible()) {
          pageFilters.hideAll()
        }
      })
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
}