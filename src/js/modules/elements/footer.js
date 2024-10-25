const footer = new Object({
  bindEvents: function() {
    if (window.innerWidth < 480) {
      const evtArr = [...document.querySelectorAll('.footer__col-head')]
      for (const elem of evtArr) {
        const col = elem.closest('.footer__col')
        if (!col) return

        if (!col.classList.contains('.--static')) {
          elem.addEventListener('click', () => {
            col.classList.toggle('--open')
          })
        }
      }
    }
  },
  init: function () {
    this.bindEvents()
  }
})

module.exports = footer