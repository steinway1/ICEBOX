const mailModal = new Object({
  object_to_render: null,
  init: function () {
    this.renderDOM();
    if (this.modal.length) {
      this.bindEvents();
    }
  },
  renderDOM: function () {
    this.modal = $(".mail-modal");
    this.backdrop = $(".mail-modal__backdrop");
    this.container = $(".mail-modal__container");
    this.evtClose = $('[data-mail-modal="close"]');
  },
  bindEvents: function () {
    this.evtClose.on("click", function () {
      mailModal.close();
    });
  },
  open: function (object) {
    lockScroll();
    this.modal.show();
    this.modal.find("input").focus();
    setTimeout(() => {
      this.modal.addClass(__ACTIVE);
    }, 5);

    if (object) {
      this.object_to_render = object;
    }
  },
  close: function () {
    unlockScroll();
    this.modal.removeClass(__ACTIVE);
    setTimeout(() => {
      this.modal.hide();
    }, getTransitionTime(this.container));

    if (this.object_to_render) {
      window.addCartModal.create(this.object_to_render);
    }
  },
});

module.exports = mailModal;
