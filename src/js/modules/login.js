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

window.initValidators = initValidators
window.resetBtnStates = resetBtnStates
window.showAlternativeBtnText = showAlternativeBtnText
window.resetSignMessage = resetSignMessage
window.showSignMessage = showSignMessage
window.confirmLoginOtp = confirmLoginOtp
window.resendOtp = resendOtp

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