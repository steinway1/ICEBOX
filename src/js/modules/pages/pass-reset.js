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

module.exports = passReset