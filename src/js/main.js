const $body = $("body");
const IS_VISIBLE = "is-visible",
  IS_ACTIVE = "is-active",
  BUTTON_LOADING = "button_loading",
  IS_HIDDEN = 'is-hidden',
  IS_EXPANDED = 'is-expanded'

/* #region  Extends */
$.fn.extend({
  exists: function () {
    return this.length;
  },
  setBackScreen: function (opacityVal, filterVal) {
    let target = this instanceof jQuery ? $(this).get(0) : this;
    Object.assign(target.style, {
      opacity: opacityVal,
      filter: `grayscale(${filterVal})`,
    });
  },
  isVisible: function () {
    return $(this).is(":visible");
  },
  appendButtonLoadingState: function (time = 3000) {
    $(this).addClass(BUTTON_LOADING).prop("disabled", true);
    setTimeout(() => {
      $(this).removeClass(BUTTON_LOADING).prop("disabled", false);
    }, time);
  },
});
/* #endregion */


/* #region  Utils */
const getEvtDOM = (att) => {
  return $(`[data-evt="${att}"]`);
},
  getTransitionTime = (target) => {
    let el = target instanceof jQuery ? target[0] : target;
    return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
  },
  windowLessDesktop = () => {
    if ($(window).width() < 991) {
      return true;
    }
  };

const initTelInput = () => {
  let telInputArr = Array.from($('[data-input="tel"]'));

  for (var i = 0; i < telInputArr.length; i++) {
    iti = intlTelInput(telInputArr[i], {
      initialCountry: "auto",
      preferredCountries: ["us", "gb", "br", "cn", "es", "it"],
      autoPlaceholder: "aggressive",
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.6/js/utils.js",
      geoIpLookup: function (callback) {
        fetch("https://ipinfo.io/json", {
          cache: "reload",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Failed: " + response.status);
          })
          .then((ipjson) => {
            callback(ipjson.country);
          })
          .catch((e) => {
            callback("us");
          });
      },
    });
  }
};
/* #endregion */


/* #region  Ripple Click Effect */
class rippleClickEffect {
  constructor(el, event) {
    this._el = el;
    this._event = event;
    this.extend = {
      rippleClass: "eff_ripple-circle",
      animateClass: "ripple-circle_animated",
    };
  }
  push() {
    if (this._el.css("position") !== "relative") {
      Object.assign(this._el[0].style, { position: "relative" });
    }
    if (this._el.css("overflow") !== "hidden") {
      Object.assign(this._el[0].style, { overflow: "hidden" });
    }
    if (this._el.find(`.${this.extend.rippleClass}`).length == 0) {
      this._el.prepend($(`<span class="${this.extend.rippleClass}"></span>`));
    }
    let circle = this._el.find(`.${this.extend.rippleClass}`);
    circle.removeClass(`${this.extend.animateClass}`);
    if (!circle.height() && !circle.width()) {
      let d = Math.max(this._el.outerWidth(), this._el.outerHeight());
      circle.css({ height: d, width: d });
    }
    let x = this._event.pageX - this._el.offset().left - circle.width() / 2,
      y = this._event.pageY - this._el.offset().top - circle.height() / 2;
    circle
      .css({ top: y + "px", left: x + "px" })
      .addClass(this.extend.animateClass);
  }
}
let rippleTriggerArr = [
  ...$(
    ".product-option__head, .option-btn, .home-welcome__link, .sign-modal__main-btn"
  ),
];
$.each(rippleTriggerArr, function (i) {
  rippleTriggerArr[i].onclick = (e) => {
    const $thisRipple = new rippleClickEffect($(this), e);
    $thisRipple.push();
  };
});
/* #endregion */


/* #region  Lock & Unlock scroll // body scroll // overflow scroll */
function lockScroll() {
  setTimeout(function () {
    if (!document.body.hasAttribute("ib-scroll-lock")) {
      let o = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute("ib-scroll-lock", o),
        (document.body.style.overflow = "hidden"),
        (document.body.style.position = "fixed"),
        (document.body.style.top = "-" + o + "px"),
        (document.body.style.left = "0"),
        (document.body.style.width = "100%");
    }
  }, 1);
}

function unlockScroll() {
  if (document.body.hasAttribute("ib-scroll-lock")) {
    let o = document.body.getAttribute("ib-scroll-lock");
    document.body.removeAttribute("ib-scroll-lock"),
      (document.body.style.overflow = ""),
      (document.body.style.position = ""),
      (document.body.style.top = ""),
      (document.body.style.left = ""),
      (document.body.style.width = ""),
      window.scroll(0, o);
  }
}
/* #endregion */


/* #region  Backdrop Class */
let contentBackdropTimer;
class contentBackdrop {
  constructor(parent = $body) {
    this._parent = parent;
    this.settings = { class: "ib-backdrop" };
  }
  show() {
    let el = $("<div>", { class: this.settings.class });
    el.on("mouseenter", function () {
      new contentBackdrop().hide(
        header.searchBlock.removeClass(IS_VISIBLE),
        unlockScroll()
      );
    });
    if (!this.elExist()) {
      this._parent.append(el);
      el.show();
      setTimeout(() => {
        Object.assign(el[0].style, { opacity: 1 });
      }, 1);
    } else {
      window.clearTimeout(contentBackdropTimer);
      let el = this._parent.find(`.${this.settings.class}`);
      Object.assign(el[0].style, { opacity: 1 });
    }
  }
  hide(done) {
    let el = this._parent.find(`.${this.settings.class}`);
    if (this.elExist()) {
      Object.assign(el[0].style, { opacity: 0 });
      contentBackdropTimer = window.setTimeout(function () {
        el.remove();
      }, parseFloat(window.getComputedStyle(el[0]).transitionDuration) * 1000 +
      1);
    }
    done();
  }
  elExist() {
    let el = this._parent.find(`.${this.settings.class}`);
    if (el.length !== 0) {
      return true;
    } else {
      return false;
    }
  }
  getEl() {
    let el = this._parent.find(`.${this.settings.class}`);
    return $(el);
  }
}
/* #endregion */


/* #region  Header JS */
const header = {
  init: function () {
    this.renderDOM();
    this.bindEvents();
    this.setDropdowns()
  },
  renderDOM: function () {
    // Login Dropdown
    this.loginBtn = $('[data-evt="toggleAccountDropdown"]');
    this.loginDropdown = $(".login-dropdown");

    // Search
    this.searchBtn = $('[data-evt="toggleSearch"]');
    this.searchBlock = $(".header-search");
  },
  bindEvents: function () {
    this.loginBtn.on({
      mouseenter: () => {
        Object.assign(header.loginDropdown[0].style, {
          display: "block",
          opacity: 1,
        });
      },
      mouseleave: () => {
        Object.assign(header.loginDropdown[0].style, {
          display: "none",
          opacity: 0,
        });
      },
    });
    this.searchBtn.click(() => {
      const overlay = new contentBackdrop();
      let el = header.searchBlock;

      if (el.hasClass(IS_VISIBLE)) {
        el.removeClass(IS_VISIBLE);
        unlockScroll();
        overlay.hide();
      } else {
        lockScroll();
        overlay.show();
        el.addClass(IS_VISIBLE);
        el.find("input").focus();
      }
    });
  },
  setDropdowns: function (...args) {
    args = Array.from(document.querySelectorAll('.header__sub-link'))

    if (args.length !== 0 && args) {

      const dd = document.querySelector('.nav-drop')
      const cont = [...document.querySelectorAll('.nav-drop__content')]
      const subLink = [...document.querySelectorAll('.nav-drop_more')]
      const IS_ACTIVE = 'is-active'

      let hideDelayTime, showDelayTime

      if (dd && cont && subLink) {
        const pos = (el) => {
          return {
            top: el.getBoundingClientRect().top + el.offsetHeight,
            left: el.getBoundingClientRect().left + (el.offsetWidth / 2) - (dd.offsetWidth / 2)
          }
        }

        const fn = {
          initial: () => {
            dd.style.top = `${pos(args[0]).top}px`
            dd.style.left = `${pos(args[0]).left}px`
          },
          hide: () => {
            dd.style.opacity = 0
            dd.style.display = 'none'
            args.forEach(el => el.classList.remove(IS_ACTIVE))
          },
          show: (el) => {
            args.forEach(el => el.classList.remove(IS_ACTIVE))
            el.classList.add(IS_ACTIVE)
            dd.style.display = 'block'
            dd.style.top = `${pos(el).top}px`
            dd.style.left = `${pos(el).left}px`
            dd.style.opacity = 1
          },
          switchContent: (attr) => {
            cont.forEach(el => el.style.display = 'none')
            cont.filter(el => el.id == `dd_${attr}`).forEach(el => el.style.display = 'block')
          }
        }

        const { initial: setInitial, hide: hide, show: show, switchContent: switchContent } = fn

        for (let i = 0; i < subLink.length; i++) {
          const el = subLink[i],
            content = el.querySelector('.nav-drop__sub')
          el.onmouseover = () => { content.style.display = 'block' }
          el.onmouseleave = () => { content.style.display = 'none' }
        }

        dd.onmouseover = (e) => {
          if (hideDelayTime) window.clearTimeout(hideDelayTime)
        }

        dd.onmouseleave = (e) => {
          window.clearTimeout(showDelayTime)
          hideDelayTime = window.setTimeout(() => {
            hide()
          }, 150);
        }


        args.forEach((el) => {
          el.onmouseover = (e) => {
            const attr = el.dataset.dropdown
            if (attr) {
              window.clearTimeout(hideDelayTime)
              showDelayTime = window.setTimeout(() => {
                switchContent(attr)
                show(el)
              }, 200);
            }
          }

          el.onmouseleave = (e) => {
            window.clearTimeout(showDelayTime)
            hideDelayTime = window.setTimeout(() => {
              hide()
            }, 150);
          }
        })

        window.onscroll = () => {
          window.clearTimeout(showDelayTime)
          hide(); setInitial()
        }

        setInitial()
      }
    }
  }
};
/* #endregion */


/* #region  Menu */
const menu = {
  states: {
    isActive: false,
    overIsActive: false,
  },
  init: function () {
    this.renderDOM();
    this.bindEvents();
    this.initialState();
  },
  renderDOM: function () {
    // modal
    this.modal = $(".mob-menu");
    this.backdrop = $(".mob-menu__backdrop");
    this.container = $(".mob-menu__container");
    // content
    this.main = $(".mob-menu__main-content");
    this.over = $(".mob-menu__over-content");
    this.overHeading = $(".mob-menu__over-heading");
    this.scrollContent = $(".mob-menu__scroll-content");
    this.megaLink = $(".mob-menu__mega-link");
    // events
    this.evtToggle = $('[data-evt="toggleMenu"]');
    this.evtToggleOver = [...$(".mob-menu__nav-step, .mob-menu__step-back")];
  },
  bindEvents: function () {
    $.each(this.evtToggle, function (index) {
      $(menu.evtToggle[index]).click(function () {
        menu.toggle();
      });
    });
    $.each(this.evtToggleOver, function (index) {
      $(menu.evtToggleOver[index]).click(function () {
        menu.toggleOver($(this));
      });
    });
    this.megaLink.on("click", function () {
      if (menu.states.isActive) {
        menu.toggle();
      }
    });
  },
  toggleOver: function (target) {
    let main = this.main[0],
      over = this.over[0];
    if (!menu.states.overIsActive) {
      let attr = target.attr("data-menu-nav");
      if (!attr) {
        return false;
      } else {
        let content = $(".mob-menu__step-content"),
          toShow = content.filter(`[data-menu-over="${attr}"]`),
          title =
            attr == "engagement"
              ? "Engagement & Wedding"
              : `${attr} Collection`;
        if (toShow) {
          let scrollable = $(over).find(menu.scrollContent);
          scrollable[0].scrollTop = 0;
          menu.states.overIsActive = true;
          content.hide();
          toShow.show();
          Object.assign(main.style, { transform: "translateX(-30%)" });
          Object.assign(over.style, { transform: "translateX(0%)" });
          menu.overHeading.html(title);
        }
      }
    } else {
      menu.states.overIsActive = false;
      Object.assign(main.style, { transform: "translateX(0%)" });
      Object.assign(over.style, { transform: "translateX(100%)" });
    }
  },
  toggle: function () {
    if (!menu.states.isActive) {
      menu.open();
    } else {
      menu.close();
    }
  },
  open: function () {
    lockScroll();
    menu.states.isActive = true;
    this.modal.show();
    let scrollable = this.main.find(menu.scrollContent);
    scrollable[0].scrollTop = 0;
    setTimeout(() => {
      Object.assign(this.backdrop[0].style, { opacity: 1 });
      Object.assign(this.container[0].style, { transform: "translateX(0%)" });
    }, 2);
  },
  close: function () {
    unlockScroll();
    menu.states.isActive = false;
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(-100%)" });
    setTimeout(() => {
      this.modal.hide();
    }, getTransitionTime(menu.container));
    if (menu.states.overIsActive) {
      menu.states.overIsActive = false;
      Object.assign(menu.main[0].style, { transform: "translateX(0%)" });
      Object.assign(menu.over[0].style, { transform: "translateX(100%)" });
    }
  },
  initialState: function () {
    this.modal.hide();
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(-100%)" });
    Object.assign(this.over[0].style, { transform: "translateX(100%)" });
    this.states.isActive = false;
    this.states.overIsActive = false;
  },
};
/* #endregion */


/* #region  Cart Modal */
const cartModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindEvents();
  },
  renderDOM: function () {
    this._ = $(".cart-modal");
    this.backdrop = this._.find(".cart-modal__backdrop");
    this.container = this._.find(".cart-modal__container");
    this.evtToggle = getEvtDOM("toggleCart");
  },
  bindEvents: function () {
    this.evtToggle.click(function () {
      let el = $(".cart-modal")
      if (el.exists()) {
        let container = $(".cart-modal__container"),
          backdrop = $(".cart-modal__backdrop")
        if (el.isVisible()) {
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
    });
  },
  toggle: function () {
    let el = cartModal._;
    if (el.exists()) {
      if (el.isVisible()) {
        cartModal.close();
      } else {
        cartModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._.show();
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
});
/* #endregion */


/* #region  Currency Modal */
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
    if (currencyModal.evtToggle.exists()) {
      $.each(currencyModal.evtToggle, (i) => {
        currencyModal.evtToggle[i].onclick = () => {
          currencyModal.toggle();
        };
      });
    }

    if (currencyModal.input.exists()) {
      currencyModal.input.on("keyup", function () {
        currencyModal.intraSearch($(this));
      });
    }
  },
  toggle: function () {
    this.input.val("").trigger("keyup");
    let modal = currencyModal._;
    if (modal.exists()) {
      if (modal.isVisible()) {
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
});
/* #endregion */


/* #region  Sign Modal */
const signModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindEvents();
  },
  renderDOM: function () {
    this._ = $(".sign-modal");
    this.backdrop = this._.find(".sign-modal__backdrop");
    this.container = this._.find(".sign-modal__container");
    this.footer = this._.find(".sign-modal__footer");

    this.evtToggle = Array.from($('[data-evt="toggleSign"], .js-toggle-sign'));
    this.evtTogglePassVisible = $('[data-evt="togglePasswordVisible"]');
    this.evtSwitch = $("[data-sign-switch]");

    this.view = $(".sign-modal-view");
    this.viewLogin = this.view.filter("#loginSignIn");
    this.viewPassword = this.view.filter("#loginPass");
    this.viewPhone = this.view.filter("#loginPhone");
    this.viewCode = this.view.filter("#loginCode");
    this.viewRegister = this.view.filter("#loginSignUp");

    this.submitBtn = this._.find(".js-submit");
  },

  bindEvents: function () {
    // Toggle modal
    $.each(signModal.evtToggle, (i) => {
      let target = signModal.evtToggle[i];
      target.onclick = () => {
        signModal.toggle();
      };
    });
    // Switch password visibility
    this.evtTogglePassVisible.click(function () {
      let input = $(this).siblings("input");
      if (input.exists()) {
        let type = input.attr("type");
        if (type == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      }
    });
    // Switch View
    this.evtSwitch.click(function (e) {
      let att = $(this).data("sign-switch");
      e.preventDefault();
      signModal.switch(att);
    });
    // Button Loading State
    this.submitBtn.click(function (e) {
      e.preventDefault();
      $(this).appendButtonLoadingState();
    });
  },

  switch: function (type) {
    signModal.view
      .filter(function () {
        if ($(this).isVisible()) {
          return this;
        }
      })
      .hide();
    signModal.footer.hide();

    switch (type) {
      case "login":
        signModal.viewLogin.show();
        signModal.footer.show();
        break;
      case "phone":
        signModal.viewPhone.show();
        break;
      case "password":
        signModal.viewPassword.show();
        break;
      case "register":
        signModal.viewRegister.show();
        break;
      case "code":
        signModal.viewCode.show();
        break;
      default:
        signModal.viewLogin.show();
        signModal.footer.show();
        break;
    }
  },

  toggle: function () {
    if (signModal._.isVisible()) {
      signModal.close();
    } else {
      signModal.open();
    }
  },
  close: function () {
    unlockScroll();
    signModal.backdrop.css({ opacity: 0 });
    signModal.container.css({ transform: "translateX(100%)" });
    setTimeout(() => {
      signModal._.hide();
    }, getTransitionTime(signModal.container));
  },
  open: function (...args) {
    lockScroll();
    signModal._.show();
    setTimeout(() => {
      signModal.backdrop.css({ opacity: 1 });
      signModal.container.css({ transform: "translateX(0%)" });
    }, 1);
    if (menu.states.isActive) {
      menu.close();
    }

    if (args.length !== 0) {
      $.each(args, (i) => {
        signModal.switch(args[i]);
      });
    }
  },
});
/* #endregion */


/* #region  Page Banner */
const pageBanner = new Object({
  init: function () {
    const banner = $(".page-banner");
    let bannerText = $(".page-banner-text"),
      movingEl = $(".banner-move");
    movingEl.addClass(`banner-move-${bannerText.length}`);

    let closeBtn = $(".page-banner-close");
    closeBtn.click(function () {
      let height = banner[0].scrollHeight;
      banner.css({ "margin-top": `-${height}px` });
      setTimeout(() => {
        banner.remove();
      }, getTransitionTime(banner));
    });
  },
});
/* #endregion */


/* #region  Footer */
const footer = new Object({
  init: function () {
    function attach() {
      if (windowLessDesktop()) {
        let footerHeader = Array.from($(".footer-col__header"));

        $.each(footerHeader, function (i) {
          let col = $(footerHeader[i]).closest(".footer-col"),
            body = col.find(".footer-col__body");

          if (body.length && col.length) {
            footerHeader[i].onclick = () => {
              if (body.height() == 0) {
                let scrH = body.find(".footer-col__body-scroll")[0]
                  .scrollHeight;
                body.css({
                  height: `${scrH}px`,
                });
              } else {
                let h = body.css("height");
                body.css("height", h);
                setTimeout(() => {
                  body.css({
                    height: "0px",
                  });
                }, 1);
              }
            };
          }
        });
      }
    }

    $(window).on("load resize", function () {
      attach();
    });
  },
});
/* #endregion */


/* #region  Homepage SPLIDE */
const homePageSplide = new Object({
  init: function () {
    const homeSplideArr = Array.from(
      document.getElementsByClassName("home-splide")
    );

    $.each(homeSplideArr, function (i) {
      const el = homeSplideArr[i];
      let main = new Splide(el, {
        type: "loop",
        perPage: 5,
        perMove: 1,
        autoplay: 0,
        gap: "8px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1680: {
            perPage: 6,
            perMove: 1,
          },
          1120: {
            perPage: 5,
            perMove: 1,
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "10px", col: "10px" },
            },
          },
          478: {
            grid: {
              rows: 2,
              cols: 2,
              gap: { row: "8px", col: "8px" },
            },
          },
        },
      }).mount(window.splide.Extensions);
    });
  },
});
/* #endregion */


/* #region  PG Data / Guide Modal Data / PGM Data */
const pgSelect = {
  initalized: undefined,
  init: function () {
    this.renderDOM();
    this.initalized = true;
  },
  getAttrDOM: function (att) {
    return $(`[data-pg-set="${att}"]`);
  },
  renderDOM: function () {
    // Shape
    this.shapeImg = this.getAttrDOM("shapeImg");
    this.shapeTitle = this.getAttrDOM("shapeTitle");
    this.shapeDescription = this.getAttrDOM("shapeDescription");

    // Color
    this.colorImg = this.getAttrDOM("colorImg");
    this.colorTitle = this.getAttrDOM("colorTitle");
    this.colorDescription = this.getAttrDOM("colorDescription");

    // Clarity
    this.clarityImg = this.getAttrDOM("clarityImg");
    this.clartyTitle = this.getAttrDOM("clarityTitle");
    this.clarityDescription = this.getAttrDOM("clarityDescription");

    // Ring Size
    this.currentSize = this.getAttrDOM("currentSize");
    this.circSize = this.getAttrDOM("circSize");
    this.dSize = this.getAttrDOM("dSize");
    this.euSize = this.getAttrDOM("euSize");
    this.ukSize = this.getAttrDOM("ukSize");
  },
  attachControls: function (sArr, sBtn) {
    if (!this.initalized) {
      pgSelect.init();
    }
    let selectArr = sArr,
      selectBtn = sBtn;
    for (let i = 0; i < selectArr.length; i++) {
      let thisAttr = selectArr[i].getAttribute("data-pg-select"),
        btnArr = Array.from($(selectArr[i]).find(selectBtn));

      function setPgSelectEvent() {
        let dataSet;
        switch (thisAttr) {
          case "shape":
            dataSet = pgSelect.shape;
            break;
          case "color":
            dataSet = pgSelect.color;
            break;
          case "clarity":
            dataSet = pgSelect.clarity;
            break;
          case "ring-size":
            dataSet = pgSelect.ringSize;
            break;
        }
        return { dataSet };
      }

      $.each(btnArr, function (i) {
        btnArr[i].onclick = () => {
          setPgSelectEvent().dataSet.changeDetails(i);
          $.each(btnArr, function (i) {
            btnArr[i].classList.remove("is-active");
          });
          $(this).addClass("is-active");
        };
      });
    }
  },
  shape: {
    changeDetails: function (index) {
      pgSelect.shapeImg.attr("src", pgSelect.data.shape[index].url);
      pgSelect.shapeTitle.html(pgSelect.data.shape[index].title);
      pgSelect.shapeDescription.html(pgSelect.data.shape[index].description);
    },
  },
  color: {
    changeDetails: function (index) {
      pgSelect.colorImg.attr("src", pgSelect.data.color[index].url);
      pgSelect.colorTitle.html(pgSelect.data.color[index].title);
      pgSelect.colorDescription.html(pgSelect.data.color[index].description);
    },
  },
  clarity: {
    changeDetails: function (index) {
      pgSelect.clarityImg.attr("src", pgSelect.data.clarity[index].url);
      pgSelect.clartyTitle.html(pgSelect.data.clarity[index].title);
      pgSelect.clarityDescription.html(
        pgSelect.data.clarity[index].description
      );
    },
  },
  ringSize: {
    changeDetails: function (index) {
      pgSelect.currentSize.html(pgSelect.data.ringSize[index].us);
      pgSelect.circSize.html(pgSelect.data.ringSize[index].circ);
      pgSelect.dSize.html(pgSelect.data.ringSize[index].diameter);
      pgSelect.euSize.html(pgSelect.data.ringSize[index].europe);
      pgSelect.ukSize.html(pgSelect.data.ringSize[index].uk);
    },
  },
  data: {
    shape: [
      {
        url: "https://i.ibb.co/ZBmcG0f/dmg-shape-round.png",
        title: "Round",
        description:
          "A classic and timeless shape, the round diamond is known for its brilliant sparkle and perfect symmetry.",
      },
      {
        url: "https://i.ibb.co/rdNkYyp/dmg-shape-priness.png",
        title: "Princess",
        description:
          "A square-shaped diamond with sharp corners and exceptional brilliance, known for its modern and clean lines.",
      },
      {
        url: "https://i.ibb.co/271bsCZ/dmg-shape-oval.png",
        title: "Oval",
        description:
          "A modified brilliant cut diamond with an elongated shape, known for its brilliance and ability to create the illusion of longer, slender fingers.",
      },
      {
        url: "https://i.ibb.co/qyQnV1f/dmg-shape-pear.png",
        title: "Pear",
        description:
          "An elegant combination of a round and marquise shape, sometimes called a teardrop, offering a unique and graceful appearance.",
      },
      {
        url: "https://i.ibb.co/NVdgJtv/dmg-shape-emerald.png",
        title: "Emerald",
        description:
          "A rectangular shape with stepped facets, highlighting the diamonds clarity and showcasing a timeless and sophisticated look.",
      },
    ],
    color: [
      {
        url: "https://i.ibb.co/MDnYmGh/dmg-color-near.png",
        title: "K - Last Grade",
        description:
          "The color may be visible to the unaided eye. Diamonds with a K-color grade can be a smart choice, offering excellent value for money.",
      },
      {
        url: "https://i.ibb.co/MDnYmGh/dmg-color-near.png",
        title: "J - Last Grade",
        description:
          'Color in diamonds graded as "near-colorless" may be slightly visible to the naked eye, especially in fancy shapes or diamonds larger than 1 carat.',
      },
      {
        url: "https://i.ibb.co/JkK4B3C/dmg-color-slight.png",
        title: "I - Slightly Detectable",
        description:
          "Upon close examination, the color may be barely noticeable, but it still provides exceptional value.",
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "H - Near Colorless",
        description:
          'The "near-colorless" grade of CA exhibits noticeable color only when compared to much higher color grades, offering excellent value.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "G - Almost Colorless",
        description:
          'This grade is the highest level of "near-colorless" and may show some color in comparison to the even higher "colorless" grades, but it offers excellent value.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "F - Colorless",
        description:
          'The "colorless" grade is most valued when placed in platinum or white gold, with a faint color that can be identified by a skilled gemologist.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "E - Colorless",
        description:
          'This grade, best showcased in platinum or white gold, is so "colorless" that even trained eyes would struggle to detect traces of color.',
      },
    ],
    clarity: [
      {
        url: "https://i.ibb.co/Gp8pKwK/clarity-i3.png",
        title: "I1, I2, I3 - Included",
        description:
          "Diamonds in this clarity range have inclusions that are easily visible under 10x magnification and may also be visible to the naked eye. These diamonds may have reduced brilliance and sparkle due to their inclusions.",
      },
      {
        url: "https://i.ibb.co/ZHBvJz9/clarity-si1-si2.png",
        title: "SI1 & SI2 - Slightly Included",
        description:
          "These grades have noticeable inclusions under 10x magnification, some of which might be visible to the naked eye. SI diamonds generally offer good value as they have inclusions that might not significantly affect the appearance of the diamond.",
      },
      {
        url: "https://i.ibb.co/27xG7GC/clarity-vs1-vs2.png",
        title: "VS1 & VS2 - Very Slightly Included",
        description:
          "These grades have minor inclusions that are visible under 10x magnification but are considered relatively small and not easily noticeable to the naked eye.",
      },
      {
        url: "https://i.ibb.co/d61wnL9/clarity-vvs1-vvs2.png",
        title: "VVS1 & VVS2 - Very, Very Slightly Included",
        description:
          "These grades indicate that inclusions are extremely difficult to see even under 10x magnification. VVS diamonds may have minor inclusions that are barely visible to a skilled grader.",
      },
      {
        url: "https://i.ibb.co/WKsqs99/clarity-fl-if.png",
        title: "FL & IF - Flawless",
        description:
          "These are the highest clarity grades. Flawless diamonds have no visible inclusions or blemishes under 10x magnification, even by a skilled grader. Internally Flawless diamonds have no internal inclusions but may have minor surface blemishes.",
      },
    ],
    ringSize: [
      { us: 4, europe: "47", uk: "H 1/2", diameter: "14.9", circ: "46.8" },
      { us: 4.5, europe: "48", uk: "I 1/2", diameter: "15.3", circ: "48" },
      { us: 5, europe: "49", uk: "J 1/2", diameter: "15.7", circ: "49.3" },
      { us: 5.5, europe: "51", uk: "K 1/2", diameter: "16.1", circ: "50.6" },
      { us: 6, europe: "52", uk: "L 1/2", diameter: "16.5", circ: "51.9" },
      { us: 6.5, europe: "53", uk: "M 1/2", diameter: "16.9", circ: "53.1" },
      { us: 7, europe: "54", uk: "N 1/2", diameter: "17.3", circ: "54.4" },
      { us: 7.5, europe: "55", uk: "O 1/2", diameter: "17.7", circ: "55.7" },
      { us: 8, europe: "57", uk: "P 1/2", diameter: "18.1", circ: "57.0" },
      { us: 8.5, europe: "58", uk: "Q 1/2", diameter: "18.5", circ: "58.3" },
      { us: 9, europe: "59", uk: "R 1/2", diameter: "19.0", circ: "59.5" },
      { us: 9.5, europe: "61", uk: "S 1/2", diameter: "19.4", circ: "60.8" },
      { us: 10, europe: "62", uk: "T 1/2", diameter: "19.8", circ: "62.1" },
      { us: 10.5, europe: "63", uk: "U 1/2", diameter: "20.2", circ: "63.4" },
      { us: 11, europe: "64", uk: "V 1/2", diameter: "20.6", circ: "64.6" },
      { us: 11.5, europe: "66", uk: "W 1/2", diameter: "21.0", circ: "65.9" },
      { us: 12, europe: "67", uk: "X 1/2", diameter: "21.4", circ: "67.2" },
      { us: 12.5, europe: "68", uk: "Z 1/2", diameter: "21.8", circ: "68.5" },
    ],
  },
};
/* #endregion */


/* #region  PG Modal / Guide Modal / PGM Modal */
const pgModal = new Object({
  initialized: undefined,
  init: function () {
    this.renderDOM();
    this.bindEvents();
    Object.values(this.initFn).forEach((target) => {
      if (typeof target === "function") target();
    });
    this.intialized = true;
  },

  renderDOM: function () {
    // Root
    this.modal = $(".pg-modal");
    this.container = $(".pg-modal__container");
    this.backdrop = $(".pg-modal__backdrop");
    this.close = $('[data-evt="closePgModal"]');

    // Sections
    this.section = $(".pg-section");
    this.row = $(".pg-row");
    this.scrollContainer = $(".pg-modal__overscroll");
    this.sectionBracelets = this.section.filter("#pgBracelets");
    this.sectionDiamonds = this.section.filter("#pgDiamonds");
    this.sectionRings = this.section.filter("#pgRings");
    this.sectionNecklaces = this.section.filter("#pgNecklaces");

    // Controls
    this.switchBtn = $(".pg-switch-btn");

    // Select Tabs
    this.selectArr = Array.from($(".pg-select"));
    this.selectBtn = $(".pg-select-btn");
  },
  bindEvents: function () {
    this.close.click(function () {
      pgModal.fn.closeModal();
    });
  },

  fn: {
    openModal: function (target) {
      lockScroll();
      pgModal.modal.show();
      setTimeout(() => {
        pgModal.backdrop.css({ opacity: 1 });
        pgModal.container.removeClass("is-hidden");
      }, 1);
      let att = $(target).attr("data-pg-open");
      pgModal.section.hide();
      switch (att) {
        case "diamonds":
          pgModal.sectionDiamonds.show();
          break;
        case "rings":
          pgModal.sectionRings.show();
          break;
        case "bracelets":
          pgModal.sectionBracelets.show();
          break;
        case "necklaces":
          pgModal.sectionNecklaces.show();
          break;
        default:
          pgModal.section[0].show();
          break;
      }
      pgModal.scrollContainer[0].scrollTop = 0;
      pgSelect.attachControls(pgModal.selectArr, pgModal.selectBtn);
    },
    closeModal: function () {
      unlockScroll();
      pgModal.backdrop.css({ opacity: 0 });
      pgModal.container.addClass("is-hidden");
      setTimeout(() => {
        pgModal.modal.hide();
      }, parseFloat(window.getComputedStyle(pgModal.container[0]).transitionDuration) * 1000);
    },
    setMobile: function () {
      if ($(window).width() < 480) {
        let arr = Array.from(pgModal.section);
        for (let i = 0; i < arr.length; i++) {
          let nArr = Array.from($(arr[i]).find(pgModal.row));
          $.each(nArr, function (i) {
            if (i > 0) {
              $(nArr[i]).hide();
            }
          });
        }
      }
    },
    attachSectionControls: function () {
      pgModal.section.each(function () {
        let btnArr = [...$(this).find(pgModal.switchBtn)];
        let rowArr = [...$(this).find(pgModal.row)];
        $.each(btnArr, function (i) {
          btnArr[i].onclick = () => {
            $.each(rowArr, function (i) {
              $(rowArr[i]).hide();
            });
            $.each(btnArr, function (i) {
              $(btnArr[i]).removeClass("is-active");
            });
            $(this).addClass("is-active");
            $(rowArr[i]).show();
          };
        });
      });
    },
  },

  initFn: {
    setInitial: () => {
      pgModal.fn.closeModal();
      pgModal.fn.setMobile();
      pgModal.fn.attachSectionControls();
    },
  },
});
/* #endregion */


/* #region  Product Page : Main */
const productPage = new Object({
  initialized: undefined,
  classes: {
    isActive: "is-active",
    isCollapsed: "is-collapsed",
  },

  init: function () {
    this.renderDOM();
    this.bindEvents();
    Object.values(this.initFn).forEach((target) => {
      if (typeof target === "function") target();
    });
    this.intialized = true;
  },
  renderDOM: function () {
    this.favButton = $(".product__add-fav");
    this.evtExpandSummary = $('[data-evt="expandSummary"]');
    this.summaryContainer = $(".product__item-summary");
    this.buyBtn = $(".buy-btn");
    this.moreBtn = $('.product__more-btn')
    // Options
    this.optionBtn = $(".option-btn");
    this.optionBlock = $(".product__item-option");
    this.optionBody = $(".product-option__body");
    this.optionHead = $(".product-option__head");
    // Gold Color
    this.goldOption = $("#optionGoldColor");
    this.goldOptionBtn = this.goldOption.find(this.optionBtn);
    // Diamond Color
    this.dmColorOption = $("#optionDiamondsColor");
    this.dmColorOptionBtn = this.dmColorOption.find(this.optionBtn);
    // Ring Size
    this.ringOption = $("#optionRingSize");
    // Floating controls
    this.floatingBtn = $(".floating-btn-mobile");
    // Guide controls
    this.evtOpenGuide = $("[data-pg-open]");
  },
  bindEvents: function () {
    this.favButton[0].onclick = () => {
      productPage.fn.toggleFavState();
    };
    this.optionBtn.click(function () {
      productPage.fn.toggleButtonState($(this));
    });
    this.optionHead.click(function () {
      productPage.fn.toggleOptionVisible($(this));
    });
    this.goldOptionBtn.click(function () {
      let thisAttr = $(this).attr("data-color");
      productPage.fn.switchGoldColor(thisAttr);
    });
    this.dmColorOptionBtn.click(function () {
      let thisAttr = $(this).attr("data-dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    });
    this.evtOpenGuide.click(function () {
      productPage.fn.openGuideModal($(this));
    });
    this.buyBtn.click(function () {
      $(this).addClass(BUTTON_LOADING);
      setTimeout(() => {
        $(this).removeClass(BUTTON_LOADING);
      }, 2000);
    });
    this.moreBtn.click(function () {
      productPage.fn.toggleMoreDetails($(this))
    })
  },

  fn: {
    toggleFavState: () => {
      // Active / Disactive Favorite Button
      let el = productPage.favButton[0],
        cls = productPage.classes.isActive,
        isActive = el.classList.contains(cls);

      if (isActive) {
        el.classList.remove(cls);
      } else {
        el.classList.add(cls);
      }
    },
    toggleButtonState: (target) => {
      // Active / Disactive Option Button
      let parent = target.closest(productPage.optionBody),
        els = [...parent.find(productPage.optionBtn)],
        cls = productPage.classes.isActive,
        isActived = els.filter((el) => el.classList.contains(cls));

      $(isActived).removeClass(cls);
      target.addClass(cls);
    },
    toggleOptionVisible: (target) => {
      // Show / Hide Option Body
      let thisOption = target.closest(productPage.optionBlock),
        thisBody = thisOption.find(productPage.optionBody),
        thisWrapper = thisBody.find(".product-option__wrapper"),
        isExpanded = thisBody[0].clientHeight !== 0;

      if (isExpanded) {
        const currentHeight = thisBody.css("height");

        thisOption.addClass(productPage.classes.isCollapsed);
        thisBody.css({ height: currentHeight });
        setTimeout(() => {
          thisBody.css({ height: 0 });
          thisWrapper.css({ transform: "translateY(-26px)", opacity: 0 });
        }, 3);
      } else {
        const transitionTime =
          parseFloat(
            window.getComputedStyle(thisBody[0]).transitionDuration
          ) * 1000,
          toHeight = thisWrapper[0].scrollHeight;

        thisOption.removeClass(productPage.classes.isCollapsed);
        thisBody.css({ height: `${toHeight}px` });
        thisWrapper.css({ transform: "translateY(0px)", opacity: 1 });
        setTimeout(() => {
          thisBody.css({ height: "auto" });
        }, transitionTime);
      }
    },
    switchGoldColor: (attr) => {
      // Toggle Gold Color Header Background
      let color, textColor
      switch (attr) {
        case "Yellow": color = "#f1e9d8", textColor = "#171c29"; break;
        case "Rose": color = "#f0dcda", textColor = "#171c29"; break;
        case "White": color = "#f1f1f1", textColor = "#171c29"; break;
        case "Red": color = "#d4474f", textColor = "#ffffff"; break;
        case "Steel": color = "#ebebeb", textColor = "#171c29"; break;
        case "Blue": color = "#e6f2f8", textColor = "#171c29"; break;
        case "Black": color = "#232323", textColor = "#ffffff"; break;
        case "Platinum": color = "#e7e7e4", textColor = "#171c29"; break;
        case "Two_tone": color = "linear-gradient(34deg, #ebe3d3, #f8f6f2 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Navy_blue": color = "#223164", textColor = "#ffffff"; break;
        case "Two_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f0dcda 55%, #fff)", textColor = "#171c29"; break;
        default: color = "#e6f2f8", textColor = "#171c29"; break;
      }
      productPage.goldOption
        .find(productPage.optionHead)
        .css({ "background": color, color: textColor });
    },
    switchDiamondColor: (attr) => {
      // Toggle Diamond Color Header Background
      let bgColor, textColor;
      switch (attr) {
        case "White":
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
        case "Black":
          (bgColor = "#434343"), (textColor = "#ffffff");
          break;
        case "Blue":
          (bgColor = "#e3eeff"), (textColor = "#171c29");
          break;
        case "Yellow":
          (bgColor = "#fff9e4"), (textColor = "#171c29");
          break;
        default:
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
      }
      productPage.dmColorOption
        .find(productPage.optionHead)
        .css({ "background-color": bgColor, color: textColor });
    },
    toggleMoreDetails: (target) => {
      // Show / Hide Warranty or More Details
      let $this = target,
        els = productPage.moreBtn,
        container = $('.product__about-wrap')

      els.removeClass(IS_ACTIVE)
      $this.addClass(IS_ACTIVE)

      container.hide()

      if ($this[0].classList.contains('for_more')) container.filter('.for_more').show()
      if ($this[0].classList.contains('for_warranty')) container.filter('.for_warranty').show()
    },
    openGuideModal: (target) => {
      if (target) {
        pgModal.fn.openModal(target);
      }
    },
  },

  initFn: {
    // Events Fires on initialization
    checkSummary: () => {
      // If there is a list, then collapse description else nothing.
      let container = productPage.summaryContainer,
        list = container.find("ul"),
        cls = productPage.classes.isCollapsed;
      if (list.length == 0) {
        return false;
      } else {
        const button = $("<button>", {
          class: "product__summary-toggle",
          html: "Show More...",
        }).on("click", function () {
          if (container.hasClass(cls)) {
            container.removeClass(cls);
            this.innerHTML = "Show Less...";
          } else {
            container.addClass(cls);
            this.innerHTML = "Show More...";
          }
        });

        container.addClass(cls).append(button);
      }
    },
    checkGoldColor: () => {
      // On load check active gold color
      let buttons = [...productPage.goldOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("color");
      productPage.fn.switchGoldColor(thisAttr);
    },
    checkGoldColorNumber: () => {
      const cont = productPage.goldOption,
        btn = cont.find(productPage.optionBtn)
      if (btn.length < 3) {
        cont.find('.options-block').css({ display: 'flex' })
      }
    },
    checkDmColor: () => {
      // On load check active diamond color
      let buttons = [...productPage.dmColorOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    },
    checkRingSizes: () => {
      // If there is ring sizes less than 5.5 && more than 11.5 then add more buttons
      let thisOption = productPage.ringOption;
      let arr = Array.from(thisOption.find(productPage.optionBtn));
      if (arr.length > 15) {
        let sliced = [];
        sliced.push(arr.slice(0, 3), arr.slice(-3));
        $.each(sliced, function (i) {
          $(sliced[i]).hide();
        });

        let smallerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "smallerSizes",
        });

        let biggerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "biggerSizes",
        });

        smallerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(0, 3), function (i) {
            $(arr.slice(0, 3)[i]).css({ display: "flex" });
          });
        });
        biggerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(-3), function (i) {
            $(arr.slice(-3)[i]).css({ display: "flex" });
          });
        });

        let parent = thisOption.find(".options-block");

        parent.append(biggerBtn);
        parent.prepend(smallerBtn);
      }
    },
    initTippy: () => {
      // Initiale tippy
      if ($(window).width() >= 992) {
        tippy(".item-option__mark", {
          allowHTML: false,
          delay: 200,
          // theme: 'ib_options',
          maxWidth: 270,
        });
      }
    },
    initFloating: () => {
      // Initialize floating button mobile
      let el = productPage.floatingBtn,
        elHeight = el[0].scrollHeight;
      function attachTrigger() {
        let triggerEl = $("#productAddCart");
        $(window).scroll(function () {
          let hT = triggerEl.offset().top,
            hH = triggerEl.outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();

          if (wS + 100 > hT - wH && hT > wS + 100 && wS + 100 + wH > hT) {
            el.css({ transform: `translateY(${elHeight}px)` });
          } else {
            el.css({ transform: `translateY(0px)` });
          }
        });
      }
      if (el.length > 0) {
        if ($(window).width() > 479) {
          el.hide();
        } else {
          attachTrigger();
        }
        $(window).on("load resize", function () {
          if ($(window).width() > 479) {
            el.hide();
          } else {
            el.show();
            attachTrigger();
          }
        });
      }
    },
    attachPayLaterBoxEvents: function (...args) {
      args = [...document.querySelectorAll('[data-paylater]')]

      const intro = document.getElementById('payLaterBoxIntro')
      const details = document.getElementById('payLaterBoxDetails')

      if (args && args.length && details) {
        const toggle = (cond) => {
          if (cond) {
            intro.style.display = 'none'; details.style.display = 'block'
          } else {
            intro.style.display = 'flex'; details.style.display = 'none'
          }
        }

        args.forEach(el => el.onclick = () => {
          if (window.getComputedStyle(intro).display == 'none') {
            toggle(0)
          } else {
            toggle(1)
          }
        })
      }
    }
  },
});
/* #endregion */


/* #region  Product Page SPLIDE */
const productSplide = new Object({
  initialized: undefined,
  init: function () {
    this.renderDOM();
    this.initSplide();
    this.initialized = true;
    this.initMoreSplide();
  },
  renderDOM: function () {
    this.sliderArr = Array.from(
      document.getElementsByClassName("product-slider")
    );
    this.thumbArr = Array.from(
      document.getElementsByClassName("product-slider_thumbnails")
    );
  },
  initSplide: function () {
    $.each(this.sliderArr, function (i) {
      const slider = productSplide.sliderArr[i];
      const thumbnails = productSplide.thumbArr[i];
      let main = new Splide(slider, {
        type: "loop",
        perPage: 2,
        perMove: 1,
        autoplay: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        gap: "10px",
        arrows: false,
        pagination: false,
        speed: 750,
        breakpoints: {
          478: {
            perPage: 1,
            perMove: 1,
          },
        },
      });
      let thumb = new Splide(thumbnails, {
        fixedWidth: 58,
        gap: 6,
        rewind: true,
        pagination: false,
        arrows: false,
        cover: true,
        isNavigation: true,
      });
      main.sync(thumb);
      main.mount();
      thumb.mount();
    });
  },
  initMoreSplide: function () {
    const moreSliderArr = Array.from(
      document.getElementsByClassName("more-row__splide")
    );

    $.each(moreSliderArr, function (i) {
      const slider = moreSliderArr[i];
      let main = new Splide(slider, {
        type: "loop",
        perPage: 5,
        perMove: 1,
        autoplay: 0,
        gap: "12px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1680: {
            perPage: 5,
            perMove: 1,
          },
          1120: {
            perPage: 4,
            perMove: 1,
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "10px", col: "10px" },
            },
          },
          478: {
            grid: {
              rows: 2,
              cols: 2,
              gap: { row: "10px", col: "10px" },
            },
          },
        },
      }).mount(window.splide.Extensions);
    });
  },
});

if (typeof productSplide.init === "function") {
  productSplide.init();
}
/* #endregion */


/* #region  Filter Modal */
const filterModal = {
  init: function () {
    this.renderDOM()
    this.bindEvents()
    this.reset()
  },
  renderDOM: function () {
    this._ = $('.filter-modal')
    this.backdrop = this._.find('.filter-modal__backdrop')
    this.container = this._.find('.filter-modal__container')
    this.content = this._.find('.filter-modal__content')
    this.evtFilter = $('[data-filter-evt]')
  },
  bindEvents: function () {
    this.evtFilter.click(function () {
      let thisAttr = $(this).attr('data-filter-evt')
      thisAttr == 'close' ? filterModal.close() : filterModal.open(thisAttr)
    })
  },
  open: function (att) {
    lockScroll()
    this._.show()
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 })
      this.container.css({ transform: 'translateX(0%)' })
    }, 1)
    this.content.hide()
    switch (att) {
      case 'openSort':
        this.content.filter('#filterSort').show()
        break;
      case 'openFilter':
        this.content.filter('#filterFilter').show()
        break
      default:
        break;
    }
  },
  close: function () {
    unlockScroll()
    this.backdrop.css({ opacity: 0 })
    this.container.css({ transform: 'translateX(100%)' })
    setTimeout(() => {
      this._.hide()
    }, getTransitionTime(this.container));
  },
  reset: function () {
    this.backdrop.css({ opacity: 0 })
    this._.hide()
    this.container.css({ transform: 'translateX(100%)' })
    this.content.eq(0).hide()
  }
}
/* #endregion */


/* #region  Page elements */
const pageEls = new Object({
  init: function () {
    Object.values(this.attachEvent).forEach((target) => {
      if (typeof target === 'function') target();
    })
  },
  attachEvent: {
    filterDropdown: () => {
      let dropdownEls = Array.from($('.filter-dropdown'))

      for (let i = 0; i < dropdownEls.length; i++) {
        const el = dropdownEls[i];
        $(el).hover(function () {
          let thisCurrent = $(this).find('.filter-dropdown__current'),
            list = $(this).find('.filter-dropdown__list'),
            scrollContainer = list.find('> div'),
            buttons = Array.from(scrollContainer.find('> div')),
            main = $(this).find('.filter-dropdown__main')

          const scrollH = scrollContainer[0].scrollHeight

          if (list.height() == 0) {
            list.css({ height: `${scrollH}px` })
            main.addClass(IS_ACTIVE)
          } else {
            list.css({ height: '0px' })
            main.removeClass(IS_ACTIVE)
          }

          $.each(buttons, function (i) {
            buttons[i].onclick = () => {
              let sibs = $(buttons[i]).siblings()
              sibs.removeClass(IS_ACTIVE)
              buttons[i].classList.add(IS_ACTIVE)

              let val = $(buttons[i]).html()
              thisCurrent.html(val)
            }
          })
        })
      }
    },
    pageFilters: () => {
      let filterRows = Array.from($('.filter-row'))
      for (let i = 0; i < filterRows.length; i++) {
        const el = $(filterRows[i]),
          header = el.find('.filter-row__header'),
          body = el.find('.filter-row__body'),
          container = el.find('.filter-row__container'),
          icon = header.find('svg')

        header.click(() => {
          let currentBodyHeight = body.height()
          if (currentBodyHeight !== 0) {
            body.css({ height: `${currentBodyHeight}px` })
            setTimeout(() => {
              body.css({ height: 0 })
              container.css({ transform: 'translateY(-24px)', opacity: 0 })
              icon.css({ transform: 'rotate(0deg)' })
            }, 1);
          } else {
            let scrollH = container[0].scrollHeight
            body.css({ height: scrollH })
            container.css({ transform: 'translateY(0px)', opacity: 1 })
            icon.css({ transform: 'rotate(180deg)' })
          }
        })
      }
    },
    faqLists: () => {
      let faqLists = Array.from($('.faq-list'))
      for (let i = 0; i < faqLists.length; i++) {
        const list = $(faqLists[i]),
          li = list.find('li')

        li.eq(0).find('.faq-body').css({ height: 'auto' })

        for (let n = 0; n < li.length; n++) {
          const el = $(li[n])
          let head = el.find('.faq-head'),
            body = el.find('.faq-body'),
            svg = el.find('svg')

          head.click(function () {
            if (body.height() == 0) {
              body.css({ height: 'auto' })
              svg.css({ transform: 'rotate(180deg)' })
            } else {
              body.css({ height: 0 })
              svg.css({ transform: 'rotate(0deg)' })
            }
          })
        }
      }
    }
  }
})
/* #endregion */


/* #region  My Bag */
const myBag = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {

    toggleFloating: function () {
      const el = $('.mybag-floating'),
        triggerElPosition = $('.mybag-summary__footer').offset().top
      $(window).scroll(function () {
        let yScroll = window.scrollY
        if (yScroll < (triggerElPosition - screen.availHeight) || yScroll > (triggerElPosition)) {
          el.removeClass(IS_HIDDEN)
        } else {
          el.addClass(IS_HIDDEN)
        }
      })
    }

  }
})
/* #endregion */


/* #region  Account page */
const account = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    editAddress: function () {
      const evtEditAddress = Array.from($('[data-edit="address"]'))
      for (let i = 0; i < evtEditAddress.length; i++) {
        const el = evtEditAddress[i];

        $(el).click(function () {
          let details = $(this).closest('.profile-card').find('.profile-card__details'),
            form = details.filter('.form')
          if (form.isVisible()) {
            details.hide().not(form).show()
          } else {
            details.show().not(form).hide()
          }
        })

      }
    },
    toggleInvoiceHeight: function () {
      const invoiceHeader = Array.from($('.order__invoice-header'))
      for (let i = 0; i < invoiceHeader.length; i++) {
        const el = invoiceHeader[i];
        $(el).click(function () {
          let body = $(this).siblings('.order__invoice-body')
          if (body.height() == 0) {
            let sHeight = body[0].scrollHeight
            body.css({ height: `${sHeight}px` })
          } else {
            body.css({ height: `${body.height()}px` })
            setTimeout(() => {
              body.css({ height: "0px" })
            }, 1);
          }
        })
      }
    }
  }
})
/* #endregion */


/* #region  Location page */
const locationPage = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    toggleStoresVisibility: function () {
      let headArr = [...$('.store-row__head')]
      $.each(headArr, function (i) {
        $(headArr[i]).click(function () {
          let rows = $('.store-row'),
            thisRow = $(this).closest(rows)
          if (thisRow.find('.store-row__body').isVisible()) {
            return false
          } else {
            rows.find('.store-row__body').show()
            rows.not(thisRow).find('.store-row__body').hide()
          }
        })
      })
    }
  }
})
/* #endregion */



const initPageObjects = () => {
  const objArr = [
    header,
    menu,
    cartModal,
    currencyModal,
    signModal,
    pageBanner,
    homePageSplide,
    pgModal,
    productPage,
    filterModal,
    footer,
    pageEls,
    myBag,
    account,
    locationPage
  ];

  for (let i = 0; i < objArr.length; i++) {
    const obj = objArr[i];
    try {
      obj;
      if (typeof obj.init === "function" && typeof obj.init !== undefined) {
        obj.init();
      }
    } catch (error) {
      if (error instanceof ReferenceError) {
        console.log("obj not declared");
      } else {
        console.log("other error");
      }
    }
  }
};

document.addEventListener("DOMContentLoaded", function () {
  initPageObjects();
  initTelInput();
})