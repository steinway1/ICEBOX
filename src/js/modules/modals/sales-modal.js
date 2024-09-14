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

module.exports = salesModal