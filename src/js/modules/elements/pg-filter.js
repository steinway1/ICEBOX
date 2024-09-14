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

module.exports = pgFilter