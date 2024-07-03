const
  __HIDDEN = '--hidden',
  __VISIBLE = '--visible',
  __ACTIVE = '--active',
  __HALF = '--half',
  __LOCKED = '--locked',
  __EXPANDED = '--expanded',
  __COLLAPSED = '--collapsed',
  IS_HIDDEN = 'is-hidden',
  IS_ACTIVE = 'is-active'

/* #region  Utils */
class RippleEffect {
  constructor(el, event) {
    this.el = el
    this.event = event
    this.rippleClass = "eff_ripple-circle"
    this.animateClass = "ripple-circle_animated"
  }
  push() {
    if (window.getComputedStyle(this.el).position === "static") {
      this.el.style.position = 'relative'
    }
    if (window.getComputedStyle(this.el).overflow !== "hidden") {
      this.el.style.overflow = 'hidden'
    }
    if (!this.el.querySelector(`.${this.rippleClass}`)) {
      this.el.appendChild(createElem('span', { className: this.rippleClass }))
    }
    let circle = this.el.querySelector(`.${this.rippleClass}`)
    circle.classList.remove(this.animateClass)

    if (!circle.clientHeight && !circle.clientWidth) {
      let d = Math.max(this.el.clientWidth, this.el.clientHeight)
      circle.style.height = '52px'
      circle.style.width = '52px'
    }
    const x = this.event.pageX - this.el.offsetLeft - (circle.clientWidth / 2)
    const y = this.event.pageY - this.el.offsetTop - ((circle.clientHeight / 2) * 3.7)

    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.classList.add(this.animateClass)
  }
}

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
function createElem(tagName, options) {
  const { className, id, innerHTML, style, attributes, toAppend } = options
  const elem = document.createElement(tagName)
  if (className) elem.className = className;
  if (id) elem.id = id;
  if (innerHTML) elem.innerHTML = innerHTML;
  if (style) {
    for (const key in options.style) { elem.style[key] = options.style[key] }
  }
  if (attributes) {
    for (const key in options.attributes) { elem.setAttribute(key, options.attributes[key]) }
  }
  if (toAppend) {
    for (const child of toArray(toAppend)) { elem.appendChild(child) }
  }
  return elem
}
function getTransitionTime(target) {
  return parseFloat(window.getComputedStyle(target).transitionDuration) * 1000;
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function bind(targets, events, callback) {
  for (const target of toArray(targets)) {
    for (const event of toArray(events)) {
      target.addEventListener(event, callback)
    }
  }
}
function addClass(target, ...classes) {
  if (!target) throw new Error('addClasses ERROR : target not found')
  if (!classes) throw new Error('addClasses ERROR : Expected at least one class')
  for (const cls of classes) {
    target.classList.add(cls)
  }
}
function removeClass(target, ...classes) {
  if (!target) throw new Error('removeClasses ERROR : target not found')
  if (!classes) throw new Error('removeClasses ERROR : Expected at least one class')
  for (const cls of classes) {
    target.classList.remove(cls)
  }
}
function getEvtArr(evt, type = undefined) {
  if (type) {
    return [...document.querySelectorAll(`[data-${type}-evt="${evt}"]`)]
  } else {
    return [...document.querySelectorAll(`[data-evt="${evt}"]`)]
  }
}
function addClickEvent(target, callback) {
  if (!target) throw new Error('addClickEvent ERROR : target not found')
  if (!callback) throw new Error('addClickEvent ERROR : callback not found')
  target.addEventListener('click', (e) => {
    e.preventDefault()
    callback()
  })
}
/* #endregion */

/* #region  Page Backdrop */
class Backdrop {
  constructor(settings = {}) {
    this.el = createElem('div', {
      className: 'page-backdrop',
    })
    this.callback = settings.callback || null
    this.zIndex = settings.zIndex || undefined
    this.background = settings.background || undefined
    this.half = settings.half || false
    this.show()
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) {
        this.hide()
      }
    })
  }

  show() {
    document.body.appendChild(this.el)
    if (this.zIndex) {
      this.el.style.zIndex = this.zIndex
    }
    if (this.half) {
      this.el.classList.add(__HALF)
    }
    this.el.style.display = 'block'
    setTimeout(() => {
      this.el.style.opacity = '1'
    }, 1);
  }

  hide() {
    this.el.style.opacity = '0'
    setTimeout(() => {
      this.el.style.display = 'none'
      this.el.remove()
    }, getTransitionTime(this.el));

    if (this.callback) {
      this.callback()
    }
  }
}
/* #endregion */

/* #region  Menu */
class Menu {
  constructor() {
    this.rootEl = document.querySelector('.menu2')
    this.state = false
    this.init()
  }

  // Methods
  open() {
    if (!this.state && this.rootEl) {
      lockScroll()
      this.state = true
      this.rootEl.style.display = 'block'
      if (window.innerWidth > 479) {
        window.menuBackdrop = new Backdrop({
          callback: () => { this.close() }
        })
      }
      if (window.pageSearch) {
        if (window.pageSearch.state) {
          window.pageSearch.close()
        }
      }
      setTimeout(() => {
        addClass(this.rootEl, __VISIBLE)
      }, 10)
    }
  }
  close() {
    if (this.state && this.rootEl) {
      unlockScroll()
      this.state = false
      removeClass(this.rootEl, __VISIBLE)
      setTimeout(() => { this.rootEl.style.display = 'none' }, getTransitionTime(this.rootEl))
      if (window.menuBackdrop) {
        window.menuBackdrop.hide()
        delete window.menuBackdrop
      }
    }
  }
  toggle() {
    if (this.state) {
      this.close()
    } else {
      this.open()
    }
  }

  // Bind
  bindEvents() {
    // toggle menu
    for (const el of getEvtArr('toggleMenu')) {
      addClickEvent(el, () => { this.toggle() })
    }
    // toggle inner dropdown
    for (const el of getEvtArr('toggleDropdown', 'menu')) {
      addClickEvent(el, () => {
        const item = el.parentNode.closest('.menu2__nav-item')
        const dropdown = el.parentNode.querySelector('[data-menu-dropdown]')
        if (item && dropdown) {
          const adjustEl = dropdown.querySelector('.menu2__dropdown-adjust')
          if (!adjustEl) throw new Error('menu__dropdown-adjust element not found')

          const height = dropdown.offsetHeight
          if (height !== 0) {
            dropdown.style.height = `${height}px`
            setTimeout(() => {
              item.classList.remove(__ACTIVE)
              dropdown.style.height = '0px'
              adjustEl.style.opacity = 0
              adjustEl.style.transform = 'translateY(-32px)'
            }, 5);
          } else {
            item.classList.add(__ACTIVE)
            const scrollHeight = adjustEl.scrollHeight
            dropdown.style.height = `${scrollHeight}px`
            adjustEl.style.opacity = 1
            adjustEl.style.transform = 'translateY(0px)'
          }
        }
      })
    }
  }

  // Init
  init() {
    if (this.rootEl) {
      this.bindEvents()
      this.close()
    }
  }
}
/* #endregion */

/* #region  Header Search */
class PageSearch {
  constructor() {
    this.rootEl = document.querySelector('.header-search')
    this.state = false
    this.init()
  }

  open() {
    if (!this.state && this.rootEl) {
      const input = this.rootEl.querySelector('input')
      this.state = true
      lockScroll()
      this.rootEl.classList.add(__VISIBLE)
      if (input) {
        input.focus()
      }
      window.searchBackdrop = new Backdrop({
        callback: () => { this.close() },
        zIndex: 40,
        half: true
      })
    }
  }

  close() {
    if (this.state && this.rootEl) {
      unlockScroll()
      this.state = false
      this.rootEl.classList.remove(__VISIBLE)
      if (window.searchBackdrop) {
        window.searchBackdrop.hide()
        delete window.searchBackdrop
      }
    }
  }

  toggle() {
    if (this.state) {
      this.close()
    } else {
      this.open()
    }
  }

  bindEvents() {
    for (const el of getEvtArr('toggleSearch')) {
      addClickEvent(el, () => { this.toggle() })
    }
  }

  init() {
    if (this.rootEl) {
      this.bindEvents()
    }
  }
}
/* #endregion */

/* #region  Login Dropdown  */
class LoginDropdown {
  constructor() {
    this.rootEl = document.querySelector('.login-dropdown')
    this.init()
  }

  bindEvents() {
    const events = ['mouseenter', 'mouseleave']
    getEvtArr('toggleAccountDropdown').forEach(el => {
      for (const evt of events) {
        el.parentNode.closest('div').addEventListener(evt, (e) => {
          const event = e.type
          switch (event) {
            case 'mouseenter':
              this.rootEl.style.display = 'block'
              setTimeout(() => { this.rootEl.classList.add(__ACTIVE) }, 5);
              break
            case 'mouseleave':
              this.rootEl.classList.remove(__ACTIVE)
              setTimeout(() => { this.rootEl.style.display = 'none' }, getTransitionTime(this.rootEl));
              break
          }
        })
      }
    })
  }

  init() {
    if (this.rootEl) {
      this.bindEvents()
    }
  }
}
/* #endregion Login Dropdown */

/* #region  Cart Modal */
class Cart {
  constructor() {
    this.rootEl = document.querySelector('.cart-modal')
    this.container = document.querySelector('.cart-modal__container')
    this.state = false
    this.init()
  }

  open() {
    if (!this.state && this.rootEl) {
      lockScroll()
      this.state = true
      this.rootEl.style.display = 'block'
      window.cartBackdrop = new Backdrop({
        half: true,
        callback: () => {
          this.close()
        }
      })
      if (window.pageSearch) {
        if (window.pageSearch.state) {
          window.pageSearch.close()
        }
      }
      setTimeout(() => {
        this.rootEl.classList.add(__ACTIVE)
      }, 5);
    }
  }
  close() {
    if (this.state && this.rootEl) {
      unlockScroll()
      this.state = false
      this.rootEl.classList.remove(__ACTIVE)
      if (window.cartBackdrop) {
        window.cartBackdrop.hide()
        delete window.cartBackdrop
      }
      setTimeout(() => {
        this.rootEl.style.display = 'none'
      }, getTransitionTime(this.container));
    }
  }
  toggle() {
    if (this.state) {
      this.close()
    } else {
      this.open()
    }
  }

  bindEvents() {
    for (const el of getEvtArr('toggleCart')) {
      addClickEvent(el, () => { this.toggle() })
    }
  }

  init() {
    if (this.rootEl) {
      this.bindEvents()
    }
  }
}
/* #endregion Cart Modal */

/* #region  Sign Modal  */
function initValidators() {
  $(".needs-validation").parsley({
    errorClass: 'is-invalid text-danger',
    successClass: 'is-valid',
    errorsWrapper: '<div class="invalid-feedback"></div>',
    errorTemplate: '<span></span>',
    trigger: 'change'
  });
}

function resetBtnStates(el) {
  el.removeClass('is-successful');
  el.removeClass('is-failed');
}

function showAlternativeBtnText(el, msg, css_class) {
  var original_msg = $(el).html();
  resetBtnStates($(el));
  $(el).addClass(css_class).html(msg);
  setTimeout(function () {
    resetBtnStates($(el));
    $(el).html(original_msg);
  }, 4000);
}

function resetSignMessage() {
  const el = document.querySelector('.sign-modal__message')
  if (el) {
    el.classList.remove('is-successful')
    el.classList.remove('is-failed')
    el.style.display = 'none'
    el.innerHTML = ''
  }
}

function showSignMessage(msg, css_class) {
  const el = document.querySelector('.sign-modal__message')
  if (el) {
    var original_msg = el.innerHTML
    resetSignMessage()
    el.classList.add(css_class)
    el.style.display = 'flex'
    el.innerHTML = msg
    setTimeout(function () {
      resetSignMessage()
      el.innerHTML = original_msg
    }, 4000);
  }
}

window.Parsley.on('form:submit', function () {
  //console.log("submit form");
  var form = $(this.$element[0]);
  var url = form.attr('action');
  var btn = form.find(".js-loading-btn");
  $.ajax({
    type: "POST",
    url: url,
    data: form.serialize(), // serializes the form's elements.
    success: function (data) {
      var r = $.parseJSON(data);
      if (!r.error) {
        //show success state on button and return message in r.msg
        showSignMessage(r.msg, 'is-successful');
        window.setTimeout(function () {
          if (r.link != undefined && r.link != '') {
            window.location.href = r.link;
          } else {
            window.location.reload();
          }
        }, 3000);
      } else {
        //show failed state on button and return message in r.msg
        showSignMessage(r.msg, 'is-failed');
      }
    }
  });
  return false;
});

const initTelInput = () => {
  let telInputArr = Array.from($('[data-input="tel"]'));

  for (var i = 0; i < telInputArr.length; i++) {
    iti = intlTelInput(telInputArr[i], {
      initialCountry: "auto",
      preferredCountries: ["us", "gb", "br", "cn", "es", "it"],
      autoPlaceholder: "aggressive",
      useFullscreenPopup: true,
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

class SignModal {
  constructor() {
    this.rootEl = document.querySelector('.sign-modal')
    this.adjustEl = this.rootEl.querySelector('.sign-modal__adjust')
    this.backdrop = this.rootEl.querySelector('.sign-modal__backdrop')
    this.container = this.rootEl.querySelector('.sign-modal__container')
    this.formsArr = [...this.rootEl.querySelectorAll('form')]
    this.evtOpenArr = document.querySelectorAll('[data-evt="openSignModal"]')
    this.evtCloseArr = document.querySelectorAll('[data-evt="closeSignModal"]')
    this.evtJsToggleSign = document.querySelectorAll('.js-toggle-sign')
    this.contentArr = [...this.rootEl.querySelectorAll('[data-sign-content]')]
    this.evtSwitchContentArr = this.rootEl.querySelectorAll('[data-sign-switch]')
    this.evtTogglePassword = [...this.rootEl.querySelectorAll('[data-evt="togglePassword"]')]
    this.loader = this.rootEl.querySelector('.sign-modal__loader')
    this.jsSubmitArr = [...this.rootEl.querySelectorAll('.js-submit')]
    this.otpArr = [...this.rootEl.querySelectorAll('input.--otp')]
    this.locked = false
    this.opened = true
    this.activeContent = undefined
    this.init()
  }

  /**
   * Getters
   */
  get getActiveContent() {
    return this.contentArr.find(e => window.getComputedStyle(e).display !== 'none')
  }

  /**
   * Utils
   */
  lockModal() {
    this.rootEl.classList.add(__LOCKED)
    this.locked = true
  }
  unlockModal() {
    this.rootEl.classList.remove(__LOCKED)
    this.locked = false
  }

  /**
   * Methods
   */
  switch(contentType) {
    let section = this.contentArr.find(e => e.dataset.signContent === contentType) || this.contentArr[0]
    let activeSection = this.contentArr.find((el) => {
      let displayProperty = window.getComputedStyle(el).display
      return displayProperty !== 'none'
    })
    if (!section) throw new Error(`Expected to find section with data-sign-content=${contentType}`)
    if (contentType == 'otp') {
      this.otpArr.forEach((el) => {
        el.value = ''
      })
    }

    this.activeContent = section
    this.lockModal()
    const currentHeight = this.adjustEl.offsetHeight
    this.adjustEl.style.opacity = 0
    this.adjustEl.style.height = `${currentHeight}px`
    setTimeout(() => {
      this.contentArr.forEach(e => e.style.display = 'none')
      section.style.display = 'flex'
      const newHeight = section.scrollHeight
      this.adjustEl.style.height = `${newHeight}px`

      setTimeout(() => {
        this.adjustEl.style.opacity = '1'
        this.unlockModal()
      }, 5)
      setTimeout(() => {
        this.adjustEl.style.height = 'auto'
      }, getTransitionTime(this.adjustEl));
    }, getTransitionTime(this.adjustEl));
  }
  toggle() {
    if (this.opened) {
      this.close()
    } else {
      this.open()
    }
  }
  open() {
    if (!this.opened) {
      const content = this.contentArr.find(e => e.dataset.signContent == 'sms') || this.contentArr[0]
      this.opened = true
      this.rootEl.style.display = 'block'
      this.adjustEl.style.height = 'auto'
      this.contentArr.forEach(e => e.style.display = 'none')
      content.style.display = 'flex'
      content.querySelector('input').focus()
      lockScroll()
      window.signBackdrop = new Backdrop({
        half: true,
        callback: () => {
          this.close()
        }
      })
      if (window.pageSearch) {
        if (window.pageSearch.state) {
          window.pageSearch.close()
        }
      }
      if (window.menu) {
        if (window.menu.state) {
          window.menu.close()
        }
      }
      const show = () => {
        this.container.classList.remove(IS_HIDDEN)
      }
      setTimeout(show, 1)
    }
  }
  close() {
    if (this.opened) {
      this.opened = false
      this.backdrop.style.opacity = 0
      this.container.classList.add(IS_HIDDEN)
      unlockScroll()
      if (window.signBackdrop) {
        window.signBackdrop.hide()
        delete window.signBackdrop
      }
      setTimeout(() => {
        this.rootEl.style.display = 'none'
      }, getTransitionTime(this.backdrop))
    }
  }
  startLoading() {
    if (this.loader && !this.locked) {
      this.unlockModal()
      this.loader.style.display = 'flex'
      setTimeout(() => { this.loader.style.opacity = '1' }, 10)
    }
  }
  stopLoading() {
    if (this.loader) {
      this.loader.style.opacity = '0'
      setTimeout(() => {
        this.loader.style.display = 'none'
        this.locked = false
      }, getTransitionTime(this.loader))
    }
  }

  /**
   * Bind Events
   */
  bindToggleVisiblity() {
    // Open
    for (const el of this.evtOpenArr) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        this.toggle()
      })
    }
    // Close
    for (const el of this.evtCloseArr) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        this.close()
      })
    }
    // Toggle
    for (const el of this.evtJsToggleSign) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        this.toggle()
      })
    }
  }
  bindSwitchContent() {
    for (const el of this.evtSwitchContentArr) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        const contentName = el.dataset.signSwitch
        this.switch(contentName)
      })
    }
  }
  bindOTPInput() {
    const inputs = this.otpArr
    for (const input of inputs) {
      input.addEventListener('paste', (e) => {
        const data = e.clipboardData.getData('text');
        const value = data.split("");
        if (value.length === inputs.length) {
          inputs.forEach((input, index) => (input.value = value[index]));
        }
      })
      input.addEventListener('input', (e) => {
        const value = e.target.value
        if (value.length > 1) {
          e.target.value = value.replace(/./g, '')
        }
        if (value.match(/\D/g)) {
          e.target.value = ''
        }
        if (value.length > 0) {
          const nextInput = e.target.nextElementSibling
          const valueIsDigit = value.match(/\d/g)
          if (nextInput && valueIsDigit) {
            nextInput.focus()
          }
        }
      })
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace') {
          e.target.value = ''
          const prevInput = e.target.previousElementSibling
          if (prevInput) {
            prevInput.focus()
          }
        }
        if (e.key === 'ArrowLeft') {
          const prevInput = e.target.previousElementSibling
          if (prevInput) {
            prevInput.focus()
          }
        } else if (e.key === 'ArrowRight') {
          const nextInput = e.target.nextElementSibling
          if (nextInput) {
            nextInput.focus()
          }
        }
      })
    }
  }
  bindTogglePassword() {
    for (const btn of this.evtTogglePassword) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const input = btn.parentNode.querySelector('input')
        if (input) {
          const type = input.getAttribute('type') === 'password' ? 'text' : 'password'
          const svgShow = btn.querySelector('.svg_pass_show')
          const svgHide = btn.querySelector('.svg_pass_hide')

          input.type = type
          if (svgShow && svgHide) {
            if (type === 'text') {
              svgShow.style.display = 'none'
              svgHide.style.display = 'inline'
            } else {
              svgShow.style.display = 'inline'
              svgHide.style.display = 'none'
            }
          }
        }
      })
    }
  }
  bindSubmit() {
    this.formsArr.forEach((form) => {
      form.addEventListener('submit', () => {
        if ($(form).parsley().isValid()) {
          this.startLoading()
        }
      })
    })
  }

  /**
   * Initialize
   */
  initialSetup() {
    this.rootEl.style.display = 'none'
    this.close()
    this.switch()
  }
  init() {
    if (this.rootEl) {
      this.bindToggleVisiblity()
      this.bindSwitchContent()
      this.bindOTPInput()
      this.bindTogglePassword()
      this.bindSubmit()
      this.initialSetup()
    }
  }
}

$(document).ready(function () {
  $('#btn_confirm_otp').on('click', function () {
    confirmLoginOtp();
  });
  $('#resend-otp-btn').on('click', function () {
    resendOtp();
  });
  $('#frm_login_otp').on('submit', function (e) {
    var phoneField = document.querySelector('#phone_input_Login');
    var iti = window.intlTelInputGlobals.getInstance(phoneField);
    e.preventDefault();
    var fullPhone = iti.getNumber();
    var countryCode = '+' + iti.getSelectedCountryData().dialCode;
    var phone = fullPhone.replace(countryCode, '');
    var btn = $(e.target).find(".js-loading-btn");
    $('#otp_phone').val(phone);
    $('#otp_country').val(countryCode);
    $.ajax({
      url: '/send-otp',
      type: 'POST',
      data: { country_code: countryCode, phone_number: phone },
      success: function (data) {
        var r = $.parseJSON(data);
        var MsgClass = (r.error) ? 'is-failed' : 'is-successful';
        showSignMessage(r.msg, MsgClass);
        if (!r.error) {
          $('.sign-modal__phone-span').html(fullPhone);
          window.signModal.switch('otp');
        }
      }

    });
  });
});

function confirmLoginOtp() {
  var otp = $('#otp_1').val() + $('#otp_2').val() + $('#otp_3').val() + $('#otp_4').val();
  var phone = $('#otp_phone').val();
  var countryCode = $('#otp_country').val();
  var btn = '#btn_confirm_otp';


  if (otp != '' && otp.length == 4) {
    window.signModal.startLoading();
    $.ajax({
      url: '/confirm-otp',
      type: 'POST',
      data: { country_code: countryCode, phone_number: phone, otp_code: otp },
      success: function (data) {
        var r = $.parseJSON(data);
        var MsgClass = (r.error) ? 'is-failed' : 'is-successful';
        window.signModal.stopLoading();
        showSignMessage(r.msg, MsgClass);
        if (!r.error) {
          window.location.reload();
        }
      }
    });
  } else {
    showSignMessage('Enter 4 digits OTP', 'is-failed');
  }
}

function resendOtp() {
  var phone = $('#otp_phone').val();
  var countryCode = $('#otp_country').val();
  var btn = '#resend-otp-btn';
  window.signModal.startLoading();
  $.ajax({
    url: '/resend-otp',
    type: 'POST',
    data: { country_code: countryCode, phone_number: phone },
    success: function (data) {
      var r = $.parseJSON(data);
      var MsgClass = (r.error) ? 'is-failed' : 'is-successful';
      window.signModal.stopLoading();
      showSignMessage(r.msg, MsgClass);
    }
  })
}
/* #endregion Sign Modal */

/* #region  Hero Sections */
class HeroSections {
  constructor() {
    this.rootArr = [...document.querySelectorAll('[data-hero-section]')]
    this.init()
  }

  initSplide() {
    for (const section of this.rootArr) {
      const splideType = section.dataset.splideSection
      const mobileGrid = section.dataset.mobileGrid
      const splideLoop = section.dataset.splideLoop

      if (splideType) {
        const splideEl = section.querySelector('.splide')
        if (splideEl) {
          let options = {
            type: "slider",
            perPage: 4,
            perMove: 1,
            autoplay: 0,
            gap: "12px",
            arrows: 1,
            pagination: 0,
            speed: 750,
            breakpoints: {
              1180: { perPage: 3 },
              991: { perPage: 2.5, },
              767: { perPage: 2, perMove: 1 },
              478: { perPage: 1.2, perMove: 1, gap: 8 }
            }
          }

          if (splideType === 'grid') {
            options.type = 'loop',
              options.perPage = 1,
              options.grid = {
                rows: 2,
                cols: 4,
                gap: { row: "12px", col: "12px" },
              }
            options.breakpoints = {
              1180: {
                grid: {
                  rows: 2,
                  cols: 3,
                  gap: { row: "8px", col: "8px" },
                }
              },
              991: {
                grid: {
                  rows: 2,
                  cols: 2,
                  gap: { row: "8px", col: "8px" },
                }
              }
            }
          } else if (mobileGrid) {
            options.breakpoints[478] = {
              perPage: 1,
              grid: {
                rows: 2,
                cols: 2,
                gap: { row: "8px", col: "8px" }
              }
            }
          }

          if (splideLoop) {
            options.type = 'loop'
          }

          const splide = new Splide(splideEl,
            options
          )
          if (splideType === 'grid' || mobileGrid) {
            splide.mount(window.splide.Extensions)
          } else {
            splide.mount()
          }
        }
      }
    }
  }

  init() {
    if (this.rootArr.length) {
      this.initSplide()
    }
  }
}
/* #endregion Hero Sections */

/* #region  Currency Modal */
class CurrencyModal {
  constructor() {
    this.rootEl = document.querySelector('.cur-modal')
    this.state = false
    this.init()
  }

  open() {
    if (!this.state) {
      lockScroll()
      this.state = true
      this.rootEl.style.display = 'block'
      window.currencyBackdrop = new Backdrop({
        half: true,
        callback: () => {
          this.close()
        }
      })
      if (window.menu) {
        if (window.menu.state) {
          window.menu.close()
        }
      }
      setTimeout(() => {
        this.rootEl.classList.add(__ACTIVE)
      }, 5);
    }
  }
  close() {
    if (this.state) {
      this.rootEl.classList.remove(__ACTIVE)
      setTimeout(() => {
        if (window.currencyBackdrop) {
          window.currencyBackdrop.hide()
          delete window.currencyBackdrop
        }

        this.rootEl.style.display = 'none'
        unlockScroll()
        this.state = false
      }, getTransitionTime(this.rootEl));
    }
  }
  toggle() {
    if (!this.state) {
      this.open()
    } else[
      this.close()
    ]
  }

  bindEvents() {
    const toggleArr = getEvtArr('toggleCurrency')
    for (const el of toggleArr) {
      el.onclick = () => { this.toggle() }
    }
  }
  bindSearch() {
    const input = document.querySelector('#currencySearch')
    if (input) {
      input.addEventListener('input', () => {
        const value = input.value.toLowerCase()
        const elsArr = [...this.rootEl.querySelectorAll('.cur-item')]
        elsArr.forEach((els) => {
          const text = els.querySelector('.cur-item__name').textContent.toLowerCase()
          if (text.indexOf(value) !== -1) {
            els.style.display = 'block'
          } else {
            els.style.display = 'none'
          }
        })
      })
    }
  }

  init() {
    if (this.rootEl) {
      this.bindEvents()
      this.bindSearch()
    }
  }
}
/* #endregion */

/* #region Connect Button  */
class ConnectButton {
  constructor() {
    this.rootEl = document.querySelector('.connect-btn')
    this.list = document.querySelector('.connect-list')
    this.delay = 80
    this.offsetTimer = undefined
    this.hideTimer = undefined
    this.state = false
    this.defaultBtnPosition = undefined
    this.defaultListPosition = undefined
    this.init()
  }

  show() {
    if (!this.state) {
      this.state = true
      clearTimeout(this.offsetTimer)
      clearTimeout(this.hideTimer)

      this.rootEl.classList.add(__ACTIVE)
      this.list.style.display = 'block'
      this.list.classList.add(__ACTIVE)

      setTimeout(() => {
        this.btnArr.reverse().forEach((btn, index) => {
          this.offsetTimer = setTimeout(() => {
            btn.classList.add(__ACTIVE)
          }, this.delay * index);
        })
      }, 5);
    }
  }

  adjustPos(offset) {
    if (offset == 'default') {
      this.rootEl.style.bottom = `${this.defaultBtnPosition}px`
      this.list.style.bottom = `${this.defaultListPosition}px`
    } else {
      this.rootEl.style.bottom = `${offset}px`
      this.list.style.bottom = `${this.defaultListPosition + offset - this.defaultBtnPosition}px`
    }
  }

  hide(timeToHide = 700) {
    if (this.state) {
      this.state = false
      clearTimeout(this.offsetTimer)
      clearTimeout(this.hideTimer)

      this.hideTimer = setTimeout(() => {

        this.rootEl.classList.remove(__ACTIVE)
        this.list.classList.remove(__ACTIVE)

        this.btnArr.reverse().forEach((btn, index) => {
          this.offsetTimer = setTimeout(() => {
            btn.classList.remove(__ACTIVE)
            if (index === this.btnArr.length - 1) {
              setTimeout(() => {
                this.list.style.display = 'none'
              }, getTransitionTime(btn));
            }
          }, this.delay * index);
        })
      }, timeToHide);
    }
  }

  bindEvents() {
    if (window.innerWidth > 991) {
      this.rootEl.onmouseenter = () => {
        this.show()
      }
      this.rootEl.onmouseleave = () => {
        this.hide()
      }
      this.list.onmouseenter = () => {
        this.show()
      }
      this.list.onmouseleave = () => {
        this.hide()
      }
    } else {
      this.rootEl.onclick = () => {
        if (!this.state) {
          this.show()
        } else {
          this.hide(0)
        }
      }
      document.addEventListener('click', (e) => {
        const t = e.target
        if (t !== this.rootEl && t !== this.list && this.state && t.closest('.connect-btn') === null) {
          this.hide(0)
        }
      })
      window.addEventListener('scroll', () => {
        if (this.state) {
          this.hide(0)
        }
      })
    }
    window.addEventListener('resize', () => {
      this.setup()
    })
  }

  setup() {
    this.btnArr = [...this.list.querySelectorAll('a')]

    const buttonHeight = this.rootEl.clientHeight
    const bottomPosition = window.innerHeight - this.rootEl.getBoundingClientRect().bottom
    const bottomOffset = bottomPosition + buttonHeight + 8

    this.list.style.bottom = `${bottomOffset}px`
    this.defaultListPosition = bottomOffset
    this.defaultBtnPosition = parseInt(window.getComputedStyle(this.rootEl).bottom)
  }

  init() {
    if (this.rootEl && this.list) {
      this.setup()
      this.bindEvents()
      this.hide(0)
    }
  }
}
/* #endregion Connect Button */

/* #region Footer */
class Footer {
  constructor() {
    this.rootEl = document.querySelector('.footer') || document.querySelector('footer')
    this.init()
  }

  bindEvents() {
    const headersArr = [...this.rootEl.querySelectorAll('.footer-col__header')]
    for (const header of headersArr) {
      const content = header.parentNode.querySelector('.footer-col__body')
      if (content) {
        header.addEventListener('click', () => {
          if (window.innerWidth < 992) {
            const contentHeight = content.clientHeight
            if (contentHeight == 0) {
              content.style.height = 'auto'
            } else {
              content.style.height = 0
            }
          }
        })
      }
    }
  }

  init() {
    if (this.rootEl) {
      this.bindEvents()
    }
  }
}
/* #endregion Footer */

/* #region Product Page */
class ProductPage {
  constructor() {
    this.rootEl = document.querySelector('#product-page')
    this.optionArr = [...document.querySelectorAll('.product__item-option')]
    if (!this.rootEl) {
      return
    }
    this.init()
  }

  // Methods
  togglePayLater() {
    const intro = document.querySelector('#payLaterBoxIntro')
    const details = document.querySelector('#payLaterBoxDetails')
    if (intro && details) {
      if (details.clientHeight) {
        details.style.display = 'none'
      } else {
        details.style.display = 'block'
      }
    }
  }

  // Events
  bindOptionToggle() {
    for (const option of this.optionArr) {
      const head = option.querySelector('.product-option__head')
      const body = option.querySelector('.product-option__body')
      if (head && body) {
        head.addEventListener('click', () => {
          option.classList.toggle(__EXPANDED)
        })
      }
    }
  }
  bindSelectedOptionSwitch() {
    for (const option of this.optionArr) {
      const buttonArr = [...option.querySelectorAll('.option-btn')]
      for (const button of buttonArr) {
        button.addEventListener('click', (event) => {
          const ripple = new RippleEffect(button, event).push()
          buttonArr.forEach(btn => btn.classList.remove(IS_ACTIVE))
          button.classList.add(IS_ACTIVE)
        })
      }
    }
  }
  bindAddFavorite() {
    const buttonArr = [...document.querySelectorAll('.product__add-fav')]
    for (const button of buttonArr) {
      button.addEventListener('click', (event) => {
        const ripple = new RippleEffect(button, event).push()
        button.classList.toggle(IS_ACTIVE)
      })
    }
  }
  bindSelectColor() {
    const arr = [...document.querySelectorAll('.color-pick')]
    for (const elem of arr) {
      elem.addEventListener('click', (event) => {
        const ripple = new RippleEffect(elem, event).push()
        arr.forEach(el => el.classList.remove(IS_ACTIVE))
        elem.classList.add(IS_ACTIVE)
      })
    }
  }
  bindScrollEvents() {
    const trigger = document.querySelector('.buy-btn#ajax-button')
    const floatBtn = document.querySelector('.product-float')
    const header = document.querySelector('.header')
    let offset = 0

    if (header) {
      offset = header.clientHeight
    }

    window.addEventListener('scroll', () => {
      const topOfWindow = window.scrollY
      const topOfElement = trigger.offsetTop + offset
      const bottomOfPage = document.documentElement.scrollHeight - window.innerHeight
      if (topOfWindow > topOfElement) {
        floatBtn.classList.add(__VISIBLE)
        if (window.connectButton) {
          window.connectButton.adjustPos(floatBtn.clientHeight + 12)
        }
      } else {
        floatBtn.classList.remove(__VISIBLE)
        if (window.connectButton) {
          window.connectButton.adjustPos('default')
        }
      }
      if (topOfWindow === bottomOfPage) {
        floatBtn.classList.remove(__VISIBLE)
        if (window.connectButton) {
          window.connectButton.adjustPos('default')
        }
      }
    })
  }

  // Init
  initSplide() {
    const arr = [...document.querySelectorAll('.product-slider')]
    for (const splideEl of arr) {
      const splide = new Splide(splideEl, {
        type: "slider",
        perPage: 2,
        perMove: 1,
        autoplay: false,
        pauseOnHover: true,
        pauseOnFocus: true,
        gap: "6px",
        arrows: false,
        pagination: false,
        speed: 750,
        arrows: true,
        pagination: true,
        breakpoints: {
          660: {
            perPage: 1
          }
        }
      }).mount()
    }
  }
  setOptionValues() {
    for (const option of this.optionArr) {
      const holder = option.querySelector('.product-option__head-right')
      const block = option.querySelector('.options-block')
      if (holder && block) {
        const selected = block.querySelector('.option-btn.is-active')
        if (selected) {
          const value = selected.dataset.value
          if (!value) return
          holder.appendChild(createElem('span', {
            innerHTML: value
          }))
        }
      }
    }
  }
  setSummaryState() {
    const summary = document.querySelector('.product__item-summary')
    if (summary.clientHeight > 160) {
      summary.classList.add(__COLLAPSED)
    }
    document.addEventListener('click', (e) => {
      const target = e.target
      if (target.classList.contains('.product__item-summary') || target.closest('.product__item-summary')) {
        summary.classList.remove(__COLLAPSED)
      }
    })
  }

  init() {
    if (this.rootEl) {
      this.initSplide()
      this.setOptionValues()
      this.setSummaryState()
      this.bindOptionToggle()
      this.bindSelectedOptionSwitch()
      this.bindAddFavorite()
      this.bindSelectColor()
      this.bindScrollEvents()
    }
  }
}
/* #endregion Product Page */

class WelcomeModal {
  constructor(settings = {}) {
    this.rootEl = document.querySelector('.welcome-modal')
    this.toShow = settings.toShow || false
    this.timeToShow = settings.timeToShow || 3000
    this.init()
  }

  show() {
    this.rootEl.classList.add(__VISIBLE)
  }
  hide() {
    this.rootEl.classList.remove(__VISIBLE)
    setTimeout(() => {
      this.rootEl.remove()
    }, getTransitionTime(this.rootEl));
  }
  join() {
    if (window.signModal) {
      window.signModal.open()
      this.hide()
    }
  }

  bindEvents() {
    const join = [...document.querySelectorAll('[data-welcome-evt="join"]')]
    const cancel = [...document.querySelectorAll('[data-welcome-evt="cancel"]')]

    for (const button of join) {
      button.onclick = () => { this.join() }
    }

    for (const button of cancel) {
      button.onclick = () => { this.hide() }
    }
  }

  init() {
    if (this.rootEl) {
      this.bindEvents()
      setTimeout(() => {
        this.show()
      }, this.timeToShow);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.menu = new Menu()
  window.pageSearch = new PageSearch()
  window.loginDropdown = new LoginDropdown()
  window.cart = new Cart()
  window.signModal = new SignModal()
  window.heroSections = new HeroSections()
  window.currencyModal = new CurrencyModal()
  window.connectButton = new ConnectButton()
  window.footer = new Footer()
  window.product = new ProductPage()

  window.welcomeModal = new WelcomeModal({
    toShow: true,
    timeToShow: 2000
  })
  
  initValidators()
  initTelInput()
})
