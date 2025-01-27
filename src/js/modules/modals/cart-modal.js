const cartModal = new Object({
  init: function () {
    this.renderDOM()
    this.bindToggle()
  },
  renderDOM: function () {
    this._ = $(".cart-modal");
    this.backdrop = this._.find(".cart-modal__backdrop");
    this.container = this._.find(".cart-modal__container");
    this.evtToggle = getEvtDOM("toggleCart");
  },
  bindToggle: function () {
    $(document).on('click', '[data-evt="toggleCart"]', function () {
      let el = $(".cart-modal")
      if (el.length) {
        let container = $(".cart-modal__container"),
          backdrop = $(".cart-modal__backdrop")
        if (elemDisplayed(el)) {
          unlockScroll();
          Object.assign(backdrop[0].style, { opacity: 0 });
          Object.assign(container[0].style, { transform: "translateX(100%)" });
          setTimeout(() => {
            el.hide();
          }, getTransitionTime(container));
        } else {
          lockScroll();
          el.show();
          setTimeout(() => {
            Object.assign(backdrop[0].style, { opacity: 1 });
            Object.assign(container[0].style, { transform: "translateX(0%)" });
          }, 1);
        }
      }
    })
  },
  toggle: function () {
    let el = cartModal._;
    if (el.length) {
      if (elemDisplayed(el)) {
        cartModal.close();
      } else {
        cartModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._?.show();
    setTimeout(() => {
      Object.assign(this.backdrop[0].style, { opacity: 1 });
      Object.assign(this.container[0].style, { transform: "translateX(0%)" });
    }, 1);
  },
  close: function () {
    unlockScroll();
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(100%)" });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(cartModal.container));
  },
})

module.exports = cartModal