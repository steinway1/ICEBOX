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
    let target = this instanceof jQuery ? $(this).get(0) : this;
    return window.getComputedStyle(target).getPropertyValue('display') !== 'none'
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
        "/assets/public-2020/js/plugins/phone/utils.js",
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


const getOrdinalTxt = (n) => {
  return n % 10 == 1 && n % 100 != 11 ? 'st' : n % 10 == 2 && n % 100 != 12 ? 'nd' : n % 10 == 3 && n % 100 != 13 ? 'rd' : 'th'
}
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
  hide() {
    let el = this._parent.find(`.${this.settings.class}`);
    if (this.elExist()) {
      Object.assign(el[0].style, { opacity: 0 });
      contentBackdropTimer = window.setTimeout(function () {
        el.remove();
      }, parseFloat(window.getComputedStyle(el[0]).transitionDuration) * 1000 +
      1);
    }
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

    this.loginLink = $('.login-nav__link')
  },
  bindEvents: function () {
    this.loginBtn.on('mouseover mouseleave', function (evt) {
      let dd = header.loginDropdown
      if (dd.length) {
        switch (evt.type) {
          case 'mouseover':
            dd.css({ display: 'block', opacity: 1 })
            break;
          case 'mouseleave':
            dd.css({ display: 'none', opacity: 0 })
            break;
        }
      }
    })
    this.loginLink.click(function (e) {
      e.stopPropagation()
    })
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
    this.bindToggle();
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
    })
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
    this.fn.initZoom()
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
    // checkSummary: () => {
    //   // If there is a list, then collapse description else nothing.
    //   let container = productPage.summaryContainer,
    //     list = container.find("ul"),
    //     cls = productPage.classes.isCollapsed;
    //   if (list.length == 0) {
    //     return false;
    //   } else {
    //     const button = $("<button>", {
    //       class: "product__summary-toggle",
    //       html: "Show More...",
    //     }).on("click", function () {
    //       if (container.hasClass(cls)) {
    //         container.removeClass(cls);
    //         this.innerHTML = "Show Less...";
    //       } else {
    //         container.addClass(cls);
    //         this.innerHTML = "Show More...";
    //       }
    //     });

    //     container.addClass(cls).append(button);
    //   }
    // },
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
        if (triggerEl.length) {
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

      const introEls = [...$('#payLaterBoxIntro').find('h3, p, button')]
      const details = document.getElementById('payLaterBoxDetails')

      if (args && args.length && details) {
        const toggle = () => {
          if (window.getComputedStyle(details).display == 'none') {
            details.style.display = 'block'; introEls.forEach((el) => { el.style.display = 'none' })
          } else {
            introEls.forEach((el) => { el.style.display = 'block' }); details.style.display = 'none'
          }
        }

        args.forEach(el => el.onclick = () => {
          toggle()
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
    $('#filterSort a').click(function() {
      if (!$(this).hasClass(IS_ACTIVE)) {
        $(this).addClass(IS_ACTIVE).siblings().removeClass(IS_ACTIVE)
      }
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
    },
    togglePayModal: () => {
      let evt = [...$('[data-evt="togglePayModal"]')]
      evt.forEach((el) => {
        el.onclick = () => {
          let modal = $('.pay-modal')
          if (modal.length) {
            if (modal.isVisible()) {
              unlockScroll()
              modal.css({ opacity: 0 })
              setTimeout(() => {
                modal.hide()
              }, getTransitionTime(modal));
            } else {
              lockScroll()
              modal.show()
              setTimeout(() => {
                modal.css({ opacity: 1 })
              }, 1);
            }
          }
        }
      })
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


/* #region Page Alers */
var alertTimer;
const pageAlerts = {
  classes: {
    fullWidth: 'page-alert_backdrop',
    error: 'page-alert_error',
    warning: 'page-alert_warning',
    info: 'page-alert_info',
    visible: 'is-visible'
  },
  init: function () {
    this.cacheDOM()
    this.bindEvents()
    // this.fullWidth()
  },
  cacheDOM: function () {
    this.container = $('.page-alert')
    this.title = $('.page-alert-title')
    this.subtitle = $('.page-alert-text')
    this.close = $('[data-evt="hidePageAlert"]')
  },
  bindEvents: function () {
    this.close.click(this.hideAlert.bind(this))
    clearTimeout(alertTimer)
  },
  fullWidth: function () {
    this.container.addClass(this.classes.fullWidth)
  },
  showAlert: function (errorType = function () { pageAlerts.resetAlert() }, title, text, hideTime = 2500) {
    clearTimeout(alertTimer)
    this.resetAlert();

    this.container.addClass(this.classes.visible).addClass(errorType)
    this.changeMsg(title, text)
    alertTimer = window.setTimeout(function () {
      pageAlerts.hideAlert()
    }, hideTime)
  },
  hideAlert: function () {
    this.container.removeClass(this.classes.visible)
  },
  changeMsg: function (title, text) {
    this.title.html(title)
    this.subtitle.html(text)
  },
  resetAlert: function () {
    this.container.removeClass(function () {
      let i = pageAlerts.classes
      return `${i.warning} ${i.info} ${i.error}`
    })
  }
}

function showMessage(type, title, msg) {
  var alert_type = (type === 'success') ? pageAlerts.classes.info : pageAlerts.classes.error;
  pageAlerts.showAlert(alert_type, title, msg);
}
/* #endregion */


/* #region Sell Pages */
const bookModal = {
  step: 1,
  apptData: {},

  root: document.querySelector('.book-sell'),
  backdrop: document.querySelector('.book-sell__backdrop'),
  container: document.querySelector('.book-sell__container'),

  evtNextStep: $('[data-evt="bookModalNext"]'),
  evtBackStep: $('[data-evt="bookModalBack"]'),
  evtToggle: $('[data-evt="toggleBookModal"]'),

  sectionDate: $('#bookSectionDate'),
  sectionPersonal: $('#bookSectionPersonal'),
  sectionConfirm: $('#bookSectionConfirm'),

  inputName: document.getElementById('bookFullName'),
  inputEmail: document.getElementById('bookEmail'),
  inputPhone: document.getElementById('bookPhone'),
  inputArr: [this.inputName, this.inputEmail, this.inputPhone],

  confirmName: document.getElementById('bookConfirmName'),
  confirmEmail: document.getElementById('bookConfirmEmail'),
  confirmPhone: document.getElementById('bookConfirmPhone'),
  confirmDate: document.getElementById('bookConfirmDate'),
  confirmTime: document.getElementById('bookConfirmTime'),

  init: function () {
    if (this.root !== null) {
      this.dateTime.init()
      this.attachEvents()
    }
  },

  close: function () {
    unlockScroll()
    this.container.style.transform = 'translateX(100%)'
    this.backdrop.style.opacity = 0
    setTimeout(() => {
      this.root.style.display = 'none'
    }, getTransitionTime(this.container));
  },
  open: function () {
    if (!$('.book-sell__date-box').length) { bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(true)) }
    lockScroll()
    this.root.style.display = 'block'
    setTimeout(() => {
      this.container.style.transform = 'translateX(0%)'
      this.backdrop.style.opacity = 1
    }, 1);
  },
  toggle: function () {
    if (window.getComputedStyle(this.root).getPropertyValue('display') !== 'none') {
      this.close()
    } else {
      this.open()
    }
  },
  attachEvents: function () {
    this.evtToggle.click(function () {
      bookModal.toggle()
    })
    this.evtNextStep.click(function () {
      switch (bookModal.step) {
        case 1:
          if (bookModal.apptData.date) {
            bookModal.step = 2
            bookModal.sectionDate.hide()
            bookModal.sectionPersonal.show()
            bookModal.observer()
          }
          break;
        case 2:
          if (bookModal.inputName.value && bookModal.inputEmail.value && bookModal.inputPhone.value) {
            bookModal.step = 3
            bookModal.sectionPersonal.hide()
            bookModal.sectionConfirm.show()
            bookModal.apptData.name = bookModal.inputName.value
            bookModal.apptData.email = bookModal.inputEmail.value
            bookModal.apptData.phone = bookModal.inputPhone.value
            bookModal.observer()
          }
          break;
        case 3:
          alert(JSON.stringify(bookModal.apptData)) // change later
          bookModal.close()
          setTimeout(() => {
            bookModal.reset()
          }, getTransitionTime(bookModal.container));
          break;
      }
    })
    this.evtBackStep.click(function () {
      switch (bookModal.step) {
        case 1:
          bookModal.close()
          break;
        case 2:
          --bookModal.step
          bookModal.observer()
          bookModal.sectionPersonal.hide()
          bookModal.sectionDate.show()
          break;
        case 3:
          --bookModal.step
          bookModal.observer()
          bookModal.sectionConfirm.hide()
          bookModal.sectionPersonal.show()
          break;
      }
    })
    const attachInputObesrver = () => {
      let arr = [bookModal.inputName, bookModal.inputEmail, bookModal.inputPhone]
      arr.forEach((el) => { el.oninput = () => { bookModal.observer() } })
    }
    attachInputObesrver()
  },

  dateTime: {
    intervals: [[11, 0o0, 0o0], [13, 30, 0o0], [15, 30, 0o0], [16, 0o0, 0o0], [16, 30, 0o0]],
    daysPerView: 3,
    holder: document.getElementById('bookSellDates'),

    init: function () {
      this.attachEvents()
      this.appendBoxes(this.getDates(true))
    },
    renderHTML: (date) => {
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }), day = date.getDate(), month = date.toLocaleDateString('en-US', { month: 'short' }), time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })

      let ifPast = new Date() > date ? ' disabled' : ''
      let dayTime = date.getDay() == 6 ? 'Closed' : date.getDay() == 0 ? 'Closed' : time
      let isWeekend = date.getDay() == 6 ? ' is-closed' : date.getDay() == 0 ? ' is-closed' : ''

      return `
      <div class="book-sell__date-box${isWeekend}" data-time="${String(date)}"${ifPast}>
        <span>${weekday}, ${day}${getOrdinalTxt(day)} ${month}</span>
        <span>${dayTime}</span>
      </div>
      `
    },
    appendBoxes: function (arr) {
      arr.forEach((el) => this.holder.insertAdjacentHTML('beforeend', el))
    },
    getDates: function (isNext) {
      let daysArr = [], initial = 0
      let arr = [...document.querySelectorAll('.book-sell__date-box')]
      let initialDate

      if (arr.length == 0) {
        initialDate = new Date()
      } else {
        if (isNext == true) {
          initialDate = new Date(arr[arr.length - 1].getAttribute('data-time'))
        } else {
          initialDate = new Date(arr[0].getAttribute('data-time'))
        }
      }

      if (arr.length !== 0) {
        arr.forEach(el => el.remove());
        if (isNext == true) {
          initialDate.setDate(initialDate.getDate() + 1)
        } else { initialDate.setDate(initialDate.getDate() - 1) }
      }

      while (initial !== this.daysPerView) {
        let dayDate = new Date(initialDate)
        if (isNext == true) { daysArr.push(new Date(dayDate.setDate(initialDate.getDate() + initial))) } else {
          daysArr.push(new Date(dayDate.setDate(initialDate.getDate() - initial)))
        }
        ++initial
      }

      let ints = isNext == true ? this.intervals : this.intervals.slice().reverse()

      let htmlArr = daysArr.reduce((acc, date) => {
        ints.forEach((interval) => {
          let thisDate = new Date(date)
          thisDate.setHours(...interval)
          acc.push(this.renderHTML(thisDate))
        })
        return acc
      }, [])

      if (isNext == true) { return htmlArr } else { return htmlArr.reverse() }
    },
    attachEvents: function () {
      $('[data-switch-time]').click(function () {
        let attr = $(this).attr('data-switch-time')
        switch (attr) {
          case 'next':
            bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(true))
            break;
          case 'prev':
            if ([...document.querySelectorAll('.book-sell__date-box')][0])
              bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(false))
            break;
        }
      }),
        $(document).on('click', '.book-sell__date-box', function () {
          $(this).toggleClass(IS_ACTIVE).siblings().removeClass(IS_ACTIVE)
          bookModal.observer()
        })
    }
  },

  observer: function () {
    switch (this.step) {
      case 1:
        let activeDate = $('.book-sell__date-box').filter(`.${IS_ACTIVE}`)
        if (activeDate.length) {
          this.apptData.date = new Date(activeDate.attr('data-time'))
          this.evtNextStep.attr('disabled', false)
        } else {
          delete this.apptData.date
          this.evtNextStep.attr('disabled', true)
        }
        break;
      case 2:
        if (this.inputName.value && this.inputEmail.value && this.inputPhone.value && this.apptData.date) {
          this.evtNextStep.attr('disabled', false)
        } else {
          this.evtNextStep.attr('disabled', true)
        }
        break;
      case 3:
        this.confirmName.innerHTML = this.apptData.name
        this.confirmEmail.innerHTML = this.apptData.email
        this.confirmPhone.innerHTML = this.apptData.phone
        this.confirmDate.innerHTML = `${this.apptData.date.getDate()}${getOrdinalTxt(this.apptData.date.getDate())} ${this.apptData.date.toLocaleDateString('en-US', { month: 'long' })}`
        this.confirmTime.innerHTML = this.apptData.date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })
        break;
    }
  },
  reset: function () {
    bookModal.step = 1
    let inputArr = [this.inputName, this.inputEmail, this.inputPhone]
    inputArr.forEach((el) => { el.value = '' })
    $('.book-sell__date-box').removeClass(IS_ACTIVE)
    bookModal.sectionConfirm.hide()
    bookModal.sectionPersonal.hide()
    bookModal.sectionDate.show()
    Object.values(bookModal.apptData).forEach((el) => {
      delete el
    })
    $('.book-sell__date-box').remove()
    bookModal.observer()
  }
}
const sellPage = {
  faqItems: [...document.querySelectorAll('.sell-faq-item')],
  init: function () {
    if (this.faqItems.length) {
      this.attachFaq()
      $('.sell-faq-item__main').eq(0).trigger('click')
    }
  },
  attachFaq: function () {
    this.faqItems.forEach((el, index) => {
      $(el).click(function () {
        let main = $(this).find('.sell-faq-item__main'),
          p = $(this).find('p'), svg = $(this).find('svg')
        if (main.height() == 0) {
          $(this).addClass(IS_ACTIVE)
          main.css({ height: `${p[0].scrollHeight}px` })
          svg.css({ transform: 'rotate(180deg)' })
        } else {
          $(this).removeClass(IS_ACTIVE)
          main.css({ height: `0px` })
          svg.css({ transform: 'rotate(0deg)' })
        }
      })
    })
  }
}
/* #endregion */


/* #region rootLoader */
const rootLoader = new Object({
  class: 'root_loader',
  renderHTML: () => { return `<div class=${rootLoader.class}></div>` },
  isExist: () => { return $(document).find(`.${rootLoader.class}`).length ? true : false },

  push: function (noLock = false) {
    if (!noLock) { lockScroll() }
    if (!this.isExist()) { $body.append(rootLoader.renderHTML()) }
  },
  remove: function (noUnlock = false) {
    if (!noUnlock) unlockScroll();
    if (this.isExist()) { $(document).find(`.${rootLoader.class}`).remove() }
  }
})
/* #endregion */


/* #region pageReset */
const passReset = {
  IS_EMPTY: 'is-empty',
  IS_DISABLED: 'is-disabled',
  init: function () {
    if ($('.pass-reset-page').length) {
      this.renderDOM()
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.form = $('#passResetForm')
    this.submitBtn = $('#passResetSubmit')
    this.inputArr = [...this.form.find('input[type="password"]')]
    this.error = $('.pass-reset-error')
    this.loader = $('.pass-reset-loader')
    this.main = $('.pass-reset__main')
    this.result = $('.pass-reset__result')
  },
  bindEvents: function () {
    // submit click
    $.each(this.submitBtn, function (i) {
      passReset.submitBtn[i].onclick = (e) => {
        e.preventDefault()
        passReset.form.submit()
      }
    })
    // input events
    $.each(this.inputArr, function (i) {
      passReset.inputArr[i].oninput = () => {
        let arr = passReset.inputArr
        let pass1 = arr[0].value, pass2 = arr[1].value
        if (pass2.length == 0) {
          passReset.hideError()
        } else {
          if (pass1.length !== pass2.length) { passReset.showError('Different password length') }
          else {
            passReset.hideError(); if (pass1 === pass2) { passReset.successError() }
            else { passReset.showError("Passwords don't match") }
          }
        }
      }
    })
    // form submit
    this.form[0].onsubmit = (e) => {
      e.preventDefault()
      if (passReset.formValid()) {
        Object.assign(passReset.submitBtn[0].style, { color: 'transparent', height: '14px', 'border-radius': '50px' })
        passReset.form.addClass(passReset.IS_DISABLED)
        passReset.hideError()
        passReset.loader[0].animate({ width: '100%' }, { duration: 3000, fill: 'forwards' }).onfinish = () => {
          const formData = new FormData(e.target), obj = {}
          formData.forEach((value, key) => (obj[key] = value))
          Object.assign(passReset.main[0].style, { opacity: 0 }); Object.assign(passReset.result[0].style, { opacity: 0 })
          setTimeout(() => {
            passReset.main.hide()
            passReset.result.show()
            setTimeout(() => {
              Object.assign(passReset.result[0].style, { opacity: 1 })
            }, 5);
          }, 401);
          // alert(JSON.stringify(obj))
        }
      }
    }
  },
  formValid: function () {
    let arr = passReset.inputArr
    arr.forEach(el => el.classList.remove(passReset.IS_EMPTY))

    if (arr.length !== 0) {
      let emptyInput = arr.filter(el => el.value.length == 0)

      if (emptyInput.length !== 0) {
        $.each(emptyInput, function (i) {
          emptyInput[i].classList.add(passReset.IS_EMPTY)
          setTimeout(() => {
            emptyInput[i].classList.remove(passReset.IS_EMPTY)
          }, 400);
        })
      } else {
        let pass1 = arr[0].value, pass2 = arr[1].value
        if (pass1 === pass2) {
          return true
        } else {
          return false
        }
      }

    }
  },
  showError: function (text = 'Something went wrong...') {
    this.error.html(text)
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 1, transform: 'translateX(-50%) translateY(0px)' })
  },
  hideError: function () {
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 0, transform: 'translateX(-50%) translateY(14px)' })
  },
  successError: function (text = 'Passwords match!') {
    this.error.html(text)
    Object.assign(this.error[0].style, { color: '#088d7b', opacity: 1, transform: 'translateX(-50%) translateY(0px)' })
  }
}
/* #endregion */


/* #region Sirv */
let sirvTimer
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
/* #endregion */


const initPageObjects = () => {
  const objArr = [
    header,
    menu,
    cartModal,
    currencyModal,
    pageBanner,
    homePageSplide,
    pgModal,
    productPage,
    filterModal,
    footer,
    pageEls,
    myBag,
    account,
    locationPage,
    pageAlerts,
    sellPage,
    bookModal,
    passReset,
    sirvCards
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

function initProductZoom() {
  const isDesktop = window.innerWidth > 991
  window.removeSlider = (target) => {
    unlockScroll()
    const slider = target.closest('.zoom_slider'); slider.css({ opacity: 0 })
    setTimeout(() => { slider.hide() }, 400);
  }

  const setDesktopZoom = () => {
    [...document.querySelectorAll('.product-media__inner-wrap')].reduce((acc, el) => {
      if (el.querySelector('img') && el.querySelector('img') !== null) {
        if (!/(placeholder|store|pay)/gi.test(el.querySelector('img').getAttribute('src'))) {
          acc.push(el)
        }
      }
      return acc
    }, []).forEach((el) => { jQuery(el).zoom({ magnify: 1.6 }) })
  }
  const setMobileZoom = () => {
    const sliders = [...document.querySelectorAll('.product-slider')] // Get all existing sliders

    sliders.forEach((slider, index) => {
      const button = $('<button/>', { class: `product__zoom-btn zoom_btn${index}` }); button.appendTo($(slider)) // Create & append zoom button
      const renderNewSlider = (slider, index) => { // Get HTML new zoom slider
        let mediaArr = [...slider.querySelectorAll('img')].reduce((acc, img) => {
          const src = img.getAttribute('src')
          if (!acc.includes(src) && !/(placeholder|store|pay)/gi.test(src)) { acc.push(src) }
          return acc
        }, []).sort()

        this.renderMedia = () => {
          return mediaArr.reduce((acc, src) => {
            acc += `<div class="splide__slide"><img src="${src}"></div>`
            return acc
          }, '')
        }

        return `
          <div class="zoom_slider zsl${index}">
            <div>
              <div class="zoom_slider_logo"><img src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}"></div>
              <button class="zoom_slider-close" onclick="removeSlider($(this))"></button>
              <div class="zoom-sl${index} splide">
                <div class="splide__track">
                  <div class="splide__list">
                  ${this.renderMedia()}
                  </div>
                </div>
                <div class="splide__arrows">
                  <div class="splide__arrow--prev"></div>
                  <div class="splide__arrow--next"></div>
                </div>
              </div>
            </div>
          </div>`
      }
      const appendNewSlider = (html) => { $body.append(html) } // Append Zoom Slider
      const initNewSlider = (index) => { // Splide Initialization
        this.settings = {
          type: "loop",
          perPage: 1,
          perMove: 1,
          autoplay: 0,
          gap: "12px",
          arrows: 1,
          pagination: 0,
          speed: 800,
          drag: false,
          dragAngleThreshold: 0
        }
        const zoomSlider = new Splide(`.zoom-sl${index}`, this.settings);
        zoomSlider.mount()
      }
      const initZoom = (index) => { // Initialize jQuery zoom for the new slider
        let slides = [...document.querySelector(`.zoom_slider.zsl${index}`).querySelectorAll('.splide__slide')]
        slides.forEach((slide) => {
          $(slide).zoom({
            magnify: 1.4,
            onZoomIn: function () {
              $(this).closest('.splide').css('border-color', '#e6eaec')
            },
            onZoomOut: function () {
              $(this).closest('.splide').css('border-color', '#0095c6')
            }
          })
        })
      }
      const showNewSlider = (index) => {
        let localSlider = $(`.zoom_slider.zsl${index}`)
        if (localSlider) { localSlider.show(); lockScroll(); setTimeout(() => { localSlider.css({ opacity: 1 }) }, 1); }
      }
      const openSlider = (index) => {
        let slider = $(`.zoom_slider.zsl${index}`)
        if (slider) { slider.show(); lockScroll(); setTimeout(() => { slider.css({ opacity: 1 }) }, 1); }
      }

      button.click(() => {
        const localSlider = document.querySelector(`.zoom_slider.zsl${index}`)
        if (!localSlider) {
          appendNewSlider(renderNewSlider(slider, index))
          initNewSlider(index)
          initZoom(index)
          showNewSlider(index)
        } else {
          openSlider(index)
        }
      })
    })
  }

  const setZoom = () => {
    $(document).ready(function () {
      if (isDesktop && $('.main_product').length) { setDesktopZoom() } else {
        setMobileZoom()
      }
    })
  }

  return setZoom()
}

function attachStickyScroll() {
  const bar = $('.filter-sidebar'), overlay = $('.filter-sidebar__overlay')
  if (bar.length && overlay.length) {
    const els = bar.find('.filter-row')
    $.each(els, function (i) {
      els[i].onclick = () => {
        let cont = $(this).find('.filter-row__container')
        setTimeout(() => {
          let currentHeight = bar.height()
          let scrollHeight = bar[0].scrollHeight
          if ((currentHeight - scrollHeight) <= -5) {
            overlay.css({ opacity: 1 })
          } else {
            overlay.css({ opacity: 0 })
          }
        }, getTransitionTime(cont));
      }
    })
    bar[0].addEventListener('scroll', function (e) {
      if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        overlay.css({ opacity: 0 })
      } else { overlay.css({ opacity: 1 }) }
    })
  }
}

const mailModal = new Object({
  init: function () {
    this.renderDOM()
    if (this.modal.length) {
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.modal = $('.mail-modal')
    this.backdrop = $('.mail-modal__backdrop')
    this.container = $('.mail-modal__container')
    this.evtClose = $('[data-mail-modal="close"]')
  },
  bindEvents: function () {
    this.evtClose.on('click', function () { mailModal.close() })
  },
  open: function () {
    lockScroll()
    this.modal.show()
    this.modal.find('input').focus()
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 })
      this.container.css({ transform: 'translateY(0px)', opacity: 1 })
    }, 2);
  },
  close: function () {
    unlockScroll()
    this.backdrop.css({ opacity: 0 })
    this.container.css({ transform: 'translateY(42px)', opacity: 0 })
    setTimeout(() => {
      this.modal.hide()
    }, getTransitionTime(this.container));
  }
})

const bfsModal = new Object({
  transitionTime: () => { return getTransitionTime(bfsModal._) },
  init: function () {
    this.renderDOM()
    if (this._.length && this._ !== null) {
      this.attachEvents()
    }
  },
  renderDOM: function () {
    this._ = $('.bfs-modal')
    this.evtClose = $('[data-evt="closeBfsModal"]')
  },
  attachEvents: function () {
    this.evtClose.click(function (e) {
      bfsModal.close()
    })
  },
  open: function () {
    if (this._.length) {
      lockScroll()
      this._.show()
      setTimeout(() => {
        this._.css({ opacity: 1 })
      }, 1);
    }
  },
  close: function () {
    if (this._.length) {
      unlockScroll()
      this._.css({ opacity: 0 })
      setTimeout(() => {
        this._.hide()
      }, this.transitionTime());
    }
  }
})

const quizModal = {
  currentStep: undefined,
  isFinished: undefined,
  pollLength: undefined,
  maxStep: undefined,
  isInitialized: undefined,
  init: function () {
    this.renderDOM()
    this.setInitial()
    this.bindEvents()
  },
  renderDOM: function () {
    this.modal = $('.quiz-modal')
    this.container = this.modal.find('.quiz-container')
    this.backdrop = this.modal.find('.quiz-modal__backdrop')
    this.heightContainer = this.modal.find('.quiz-container-height')
    this.poll = this.modal.find('.quiz-poll')
    this.pollArr = [...this.poll]
    this.answers = this.modal.find('.quiz-answer')
    this.fullStepText = this.modal.find('.quiz-step-text')
    this.currentStepText = this.modal.find('.quiz-current-step')
    this.maxStepText = this.modal.find('.quiz-max-step')
    this.bar = this.modal.find('.quiz-bar')
    this.evtGoNext = $('[data-evt="quizGoNext"]')
    this.evtOpen = $('[data-evt="openQuizModal"]')
    this.closeBtn = $('[data-evt="closeQuizModal"]')
  },
  bindEvents: function () {
    this.evtGoNext.click(function () {
      quizModal.goNextStep()
    })
    this.closeBtn.click(function () {
      quizModal.close()
    })
    this.evtOpen.click(function() {
      quizModal.open()
    })
  },
  setInitial: function () {
    this.currentStep = 1, this.isFinished = false, this.pollLength = this.pollArr.length, this.maxStep = this.pollLength
    if (this.pollLength !== 0 && this.pollLength !== undefined && this.isInitialized !== true) {
      this.isInitialized = true
      quizModal.currentStepText.html(quizModal.currentStep)
      quizModal.maxStepText.html(quizModal.maxStep)
      this.modal.find('input[type="radio"]').prop('checked', false); this.evtGoNext.html('Next')
      // Object.assign(this.heightContainer[0].style, { height: `${this.getObjectScrollHeight(this.pollArr[0])}` })
      Object.assign(this.bar[0].style, { width: `${(100 / this.pollLength)}%` })
    } else {
      return false
    }
  },
  // utils
  getObjectScrollHeight: function (obj) {
    if (obj instanceof jQuery) {
      return `${obj[0].scrollHeight}px`
    } else {
      return `${obj.scrollHeight}px`
    }
  },
  noEmptyAnswers: function () {
    let parent = $(quizModal.pollArr[(quizModal.currentStep - 1)]),
      checkedRadio = parent.find('input[type="radio"]:checked'),
      answers = parent.find(quizModal.answers)
    if (checkedRadio.length == 0) {
      answers.css({ opacity: '0.3' }); setTimeout(() => { answers.css({ opacity: 1 }) }, 375);
    } else {
      return true
    }
  },
  goNextStep() {
    if (quizModal.currentStep !== quizModal.maxStep) {
      if (quizModal.noEmptyAnswers()) {
        Object.assign(quizModal.pollArr[(quizModal.currentStep - 1)].style, { opacity: 0 })
        Object.assign(quizModal.bar[0].style, { width: `${(100 / quizModal.pollLength) * (quizModal.currentStep + 1)}%` })
        $.each(quizModal.pollArr, function (i) {
          Object.assign(quizModal.pollArr[i].style, { transform: `translateX(-${(quizModal.currentStep * 100)}%)` })
        })
        Object.assign(quizModal.heightContainer[0].style, { height: `${quizModal.pollArr[quizModal.currentStep].scrollHeight}px` })
        ++quizModal.currentStep
        quizModal.currentStepText.html(quizModal.currentStep)
        if (quizModal.currentStep == quizModal.maxStep) {
          quizModal.evtGoNext.html('Show Results')
        }
      }
    } else {
      if (quizModal.noEmptyAnswers()) {
        Object.assign(quizModal.heightContainer[0].style, { height: '0px' })
        Object.assign(quizModal.bar[0].style, { width: '5%' })
        $.each(quizModal.pollArr, function (i) {
          Object.assign(quizModal.pollArr[i].style, { transform: `translateX(-${(quizModal.currentStep * 100)}%)` })
        })
        Object.assign(quizModal.pollArr[(quizModal.currentStep - 1)].style, { opacity: 0 })
        quizModal.evtGoNext.prop('disabled', true)
        quizModal.fullStepText.text('FINDING WATCHES')
        $('.quiz-close-btn').remove()
        quizModal.isFinished = true
        setTimeout(() => {
          quizModal.bar.animate({ width: '100%' }, 3000, function () { quizModal.close() })
        }, 600);
      }
    }
  },
  open: function () {
    lockScroll()
    quizModal.modal.show()
    Object.assign(this.heightContainer[0].style, { height: `${this.getObjectScrollHeight(this.pollArr[quizModal.currentStep - 1])}` })
    setTimeout(() => {
      Object.assign(quizModal.backdrop[0].style, { opacity: 1 })
      Object.assign(quizModal.container[0].style, { transform: 'translateY(0px)', opacity: 1 })
    }, 1);
  },
  close: function () {
    unlockScroll()
    let timeToHide = (parseFloat(window.getComputedStyle(quizModal.backdrop[0]).transitionDuration) * 1000)
    Object.assign(quizModal.backdrop[0].style, { opacity: 0 })
    Object.assign(quizModal.container[0].style, { transform: 'translateY(32px)', opacity: 0 })
    setTimeout(() => {
      quizModal.modal.hide()
    }, timeToHide);
  }
}


document.addEventListener("DOMContentLoaded", function () {
  initPageObjects();
  initTelInput();
  initProductZoom()
  attachStickyScroll()
  mailModal.init()
  bfsModal.init()
  quizModal.init()
});