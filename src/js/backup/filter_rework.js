const pageFilters = {
  init: function () {
    this.renderDOM()
    if (this.row !== null) {
      this.adjustStickyPos()
      this.fn.showAll()
      // this.setup()
    }
  },
  renderDOM: function () {
    this.row = document.querySelector('.page-filters')
    this.filterBoxes = [...document.querySelectorAll('.page-filter-box')]
    this.drops = [...document.querySelectorAll('.page-filter-drop')]
  },
  adjustStickyPos: function () {
    const header = document.querySelector('.header')
    if (this.row !== null && header !== null) {

      const adjust = () => {
        let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue('height'))
        pageFilters.row.style.top = `${headerHeight}px`
      }

      ['load', 'resize'].forEach((event) => {
        window.addEventListener(event, () => {
          try {
            adjust()
          } catch (err) {
            console.log(`filters sticky pos : ${err.message}`)
          }
        })
      })
    }
  },
  setup: function () {
    let bx = pageFilters.filterBoxes
    if (bx.length !== 0) {
      let active = bx.reduce((acc, el) => {
        let drop = el.querySelector('.page-filter-drop')
        let btn = el.querySelector('.page-filter-btn')
        if (drop !== null && btn !== null) {
          acc.push(el)
        }
        return acc
      }, [])

      if (active.length !== 0) {
        const setObj = () => {

        }
      }
    }
  },
  fn: {
    showDrop: function (drop) {
      drop.style.display = 'block'
      setTimeout(() => {
        drop.style.opacity = 1
        drop.style.transform = 'translateY(0px)'
      }, 1);
    },
    hideDrop: function (drop) {
      drop.style.opacity = 0
      drop.style.transform = 'translateY(10px)'
      setTimeout(() => {
        drop.style.display = 'none'
      }, getTransitionTime(drop));
    },
    showAll: function () {
      const drops = pageFilters.drops
      if (drops.length) {
        drops.forEach((el) => {
          pageFilters.fn.showDrop(el)
        })
      }
    },
    hideAll: function () {
      const drops = pageFilters.drops
      if (drops.length) {
        drops.forEach((el) => {
          pageFilters.fn.hideDrop(el)
        })
      }
    }
  }
}