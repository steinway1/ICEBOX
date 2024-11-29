window.sirvTimer = null
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

module.exports = sirvCards