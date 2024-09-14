const currencyModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindEvents();
  },
  renderDOM: function () {
    this._ = $(".cur-modal");
    this.backdrop = this._.find(".cur-modal__backdrop");
    this.container = this._.find(".cur-modal__container");
    this.evtToggle = getEvtDOM("toggleCurrency");
    this.input = this._.find("input");
  },
  bindEvents: function () {
    if (currencyModal.evtToggle.length) {
      $.each(currencyModal.evtToggle, (i) => {
        currencyModal.evtToggle[i].onclick = () => {
          currencyModal.toggle();
        };
      });
    }

    if (currencyModal.input.length) {
      currencyModal.input.on("keyup", function () {
        currencyModal.intraSearch($(this));
      });
    }
  },
  toggle: function () {
    this.input.val("").trigger("keyup");
    let modal = currencyModal._;
    if (modal.length) {
      if (elemDisplayed(modal)) {
        currencyModal.close();
      } else {
        currencyModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._.show();
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 });
      this.container.css({ transform: "translateX(0%)" });
    }, 1);
  },
  close: function () {
    unlockScroll();
    this.backdrop.css({ opacity: 0 });
    this.container.css({ transform: "translateX(100%)" });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(currencyModal.backdrop));
  },
  intraSearch: function (input) {
    let val = input.val().toLowerCase(),
      arr = [...$(".cur-item")];
    $.each(arr, function (index) {
      let txt = $(arr[index]).find(".cur-item__name").text().toLowerCase();
      if (~txt.indexOf(val)) {
        $(arr[index]).show();
      } else {
        $(arr[index]).hide();
      }
    });
  },
})

module.exports = currencyModal