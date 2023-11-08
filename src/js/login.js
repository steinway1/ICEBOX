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
        showAlternativeBtnText(btn, r.msg, 'is-successful');
        window.setTimeout(function () {
          if (r.link != undefined && r.link != '') {
            window.location.href = r.link;
          } else {
            window.location.reload();
          }
        }, 3000);
      } else {
        //show failed state on button and return message in r.msg
        showAlternativeBtnText(btn, r.msg, 'is-failed');
      }
    }
  });
  return false;
});

const signModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindEvents();
    this.attachSumbitEvents()
    this.attachOTP()
  },
  renderDOM: function () {
    this._ = $(".sign-modal");
    this.backdrop = this._.find(".sign-modal__backdrop");
    this.container = this._.find(".sign-modal__container");
    this.footer = this._.find(".sign-modal__footer");

    this.evtToggle = Array.from($('[data-evt="toggleSign"], .js-toggle-sign'));
    this.evtTogglePassVisible = $('[data-evt="togglePasswordVisible"]');
    this.evtSwitch = $("[data-sign-switch]");
    this.genderButton = $('.sign-modal__gender-select')

    this.view = $(".sign-modal-view");
    this.viewLogin = this.view.filter("#loginSignIn");
    this.viewPassword = this.view.filter("#loginPass");
    this.viewPhone = this.view.filter("#loginPhone");
    this.viewCode = this.view.filter("#loginCode");
    this.viewRegister = this.view.filter("#loginSignUp");

    this.submitBtn = this._.find(".js-submit")
    this.formsArr = [...this._.find('form')]
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
    this.genderButton.click(function () {
      $(this).siblings().removeClass(IS_ACTIVE)
      $(this).addClass(IS_ACTIVE)
      let attr = $(this).attr('data-gender')
      $('#signup_gender').val(attr)
    })
    // Button Loading State
    // this.submitBtn.click(function (e) {
    //   e.preventDefault();
    //   $(this).appendButtonLoadingState();
    // });
  },
  attachOTP: function () {
    const inputs = document.querySelectorAll('.signmodal-otp');

    inputs.forEach((input, index) => {
      input.dataset.index = index;
      input.addEventListener('keyup', handleOtp);
      input.addEventListener('paste', handleOnPasteOtp);
    });

    function handleOtp(e) {
      const input = e.target;
      let value = input.value;
      let isValidInput = value.match(/[0-9a-z]/gi);
      input.value = "";
      input.value = isValidInput ? value[0] : "";

      let fieldIndex = input.dataset.index;
      if (fieldIndex < inputs.length - 1 && isValidInput) {
        input.nextElementSibling.focus();
      }

      if (e.key === 'Backspace' && fieldIndex > 0) {
        input.previousElementSibling.focus();
      }

      if (fieldIndex == inputs.length - 1 && isValidInput) {
      }
    }

    function handleOnPasteOtp(e) {
      const data = e.clipboardData.getData('text');
      const value = data.split("");
      if (value.length === inputs.length) {
        inputs.forEach((input, index) => (input.value = value[index]));
      }
    }
  },
  attachSumbitEvents: function () {
    const arr = this.formsArr
    $.each(arr, function (index) {
      $(arr[index]).on('submit', function () {
        const btn = $(this).find('.js-submit')
        if ($(this).parsley().isValid()) {
          btn.appendButtonLoadingState()
        }
      })
    })
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


document.addEventListener('DOMContentLoaded', function () {
  try {
    signModal;
    if (typeof signModal.init === "function" && typeof signModal.init !== undefined) {
      signModal.init();
    }
  } catch (error) {
    if (error instanceof ReferenceError) { console.log('sign obj not declated') }
  }
  initValidators()
})

/* LOGIN WITH PHONE NUMBER */
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
        showAlternativeBtnText(btn, r.msg, MsgClass);
        if (!r.error) {
          $('.sign-modal__phone-span').html(fullPhone);
          signModal.switch('code');
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
    $(btn).appendButtonLoadingState();
    $.ajax({
      url: '/confirm-otp',
      type: 'POST',
      data: { country_code: countryCode, phone_number: phone, otp_code: otp },
      success: function (data) {
        var r = $.parseJSON(data);
        var MsgClass = (r.error) ? 'is-failed' : 'is-successful';
        showAlternativeBtnText(btn, r.msg, MsgClass);
        if (!r.error) {
          window.location.reload();
        }
      }
    });
  } else {
    showAlternativeBtnText(btn, 'Enter 4 digits OTP', 'is-failed');
  }
}

function resendOtp() {
  var phone = $('#otp_phone').val();
  var countryCode = $('#otp_country').val();
  var btn = '#resend-otp-btn';
  $(btn).appendButtonLoadingState();
  $.ajax({
    url: '/resend-otp',
    type: 'POST',
    data: { country_code: countryCode, phone_number: phone },
    success: function (data) {
      var r = $.parseJSON(data);
      var MsgClass = (r.error) ? 'is-failed' : 'is-successful';
      showAlternativeBtnText(btn, r.msg, MsgClass);
    }
  })
}