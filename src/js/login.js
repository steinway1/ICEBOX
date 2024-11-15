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

class SignModal {
  constructor(rootEl) {
    this.rootEl = rootEl
    this.adjustEl = rootEl.querySelector('.sign-modal__adjust')
    this.backdrop = rootEl.querySelector('.sign-modal__backdrop')
    this.container = rootEl.querySelector('.sign-modal__container')
    this.formsArr = [...rootEl.querySelectorAll('form')]
    this.evtOpenArr = document.querySelectorAll('[data-evt="openSignModal"]')
    this.evtCloseArr = document.querySelectorAll('[data-evt="closeSignModal"]')
    this.evtJsToggleSign = document.querySelectorAll('.js-toggle-sign')
    this.contentArr = [...rootEl.querySelectorAll('[data-sign-content]')]
    this.evtSwitchContentArr = rootEl.querySelectorAll('[data-sign-switch]')
    this.evtTogglePassword = [...rootEl.querySelectorAll('[data-evt="togglePassword"]')]
    this.loader = rootEl.querySelector('.sign-modal__loader')
    this.jsSubmitArr = [...rootEl.querySelectorAll('.js-submit')]
    this.otpArr = [...this.rootEl.querySelectorAll('input.--otp')]
    this.locked = false
    this.opened = true
    this.activeContent = undefined
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
    if (activeSection == section) return
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
      if (window.menu) {
        if (window.menu.state) {
          window.menu.state = false
        }
      }
      const content = this.contentArr.find(e => e.dataset.signContent == 'sms') || this.contentArr[0]
      this.opened = true
      this.rootEl.style.display = 'block'
      this.adjustEl.style.height = 'auto'
      this.contentArr.forEach(e => e.style.display = 'none')
      content.style.display = 'flex'
      // content.querySelector('input').focus()
      lockScroll()
      const show = () => {
        this.backdrop.style.opacity = 1
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
        const contentName = el.dataset.signSwitch
        if (contentName) {
          this.switch(contentName)
        }
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
    $.each(this.formsArr, function (index) {
      $(arr[index]).on('submit', function () {
        if ($(this).parsley().isValid()) {
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
    this.switch('phone_register')
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

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.sign-modal')
  if (modal) {
    window.signModal = new SignModal(modal)
    window.signModal.init()
    initValidators()
  }
})

$(document).ready(function () {
  $('#btn_confirm_otp').on('click', function () {
    confirmLoginOtp();
  });
  $('#resend-otp-btn').on('click', function () {
    resendOtp();
  });
  $('#frm_login_otp').on('submit', function (e) {
    alert('form submittd');
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
        alert(MsgClass);
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