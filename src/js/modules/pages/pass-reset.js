class PassReset {
  static IS_EMPTY = 'is-empty';
  static IS_DISABLED = 'is-disabled';

  constructor() {
    if ($('.pass-reset-page').length) {
      this.renderDOM();
      this.bindEvents();
    }
  }

  renderDOM() {
    this.form = $('#passResetForm');
    this.submitBtn = $('#passResetSubmit');
    this.inputArr = [...this.form.find('input[type="password"]')];
    this.error = $('.pass-reset-error');
    this.loader = $('.pass-reset-loader');
    this.main = $('.pass-reset__main');
    this.result = $('.pass-reset__result');
  }

  bindEvents() {
    // submit click
    $.each(this.submitBtn, i => {
      this.submitBtn[i].onclick = e => {
        e.preventDefault();
        this.form.submit();
      };
    });

    // input events
    $.each(this.inputArr, i => {
      this.inputArr[i].oninput = () => {
        let arr = this.inputArr;
        let pass1 = arr[0].value,
          pass2 = arr[1].value;
        if (pass2.length == 0) {
          this.hideError();
        } else {
          if (pass1.length !== pass2.length) {
            this.showError('Different password length');
          } else {
            this.hideError();
            if (pass1 === pass2) {
              this.successError();
            } else {
              this.showError("Passwords don't match");
            }
          }
        }
      };
    });

    // form submit
    this.form[0].onsubmit = e => {
      e.preventDefault();
      if (this.formValid()) {
        Object.assign(this.submitBtn[0].style, { color: 'transparent', height: '14px', 'border-radius': '50px' });
        this.form.addClass(PassReset.IS_DISABLED);
        this.hideError();
        this.loader[0].animate({ width: '100%' }, { duration: 3000, fill: 'forwards' }).onfinish = () => {
          const formData = new FormData(e.target),
            obj = {};
          formData.forEach((value, key) => (obj[key] = value));
          Object.assign(this.main[0].style, { opacity: 0 });
          Object.assign(this.result[0].style, { opacity: 0 });
          setTimeout(() => {
            this.main.hide();
            this.result.show();
            setTimeout(() => {
              Object.assign(this.result[0].style, { opacity: 1 });
            }, 5);
          }, 401);
          // alert(JSON.stringify(obj))
        };
      }
    };
  }

  formValid() {
    let arr = this.inputArr;
    arr.forEach(el => el.classList.remove(PassReset.IS_EMPTY));

    if (arr.length !== 0) {
      let emptyInput = arr.filter(el => el.value.length == 0);

      if (emptyInput.length !== 0) {
        $.each(emptyInput, i => {
          emptyInput[i].classList.add(PassReset.IS_EMPTY);
          setTimeout(() => {
            emptyInput[i].classList.remove(PassReset.IS_EMPTY);
          }, 400);
        });
      } else {
        let pass1 = arr[0].value,
          pass2 = arr[1].value;
        if (pass1 === pass2) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  showError(text = 'Something went wrong...') {
    this.error.html(text);
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 1, transform: 'translateX(-50%) translateY(0px)' });
  }

  hideError() {
    Object.assign(this.error[0].style, {
      color: '#c02942',
      opacity: 0,
      transform: 'translateX(-50%) translateY(14px)',
    });
  }

  successError(text = 'Passwords match!') {
    this.error.html(text);
    Object.assign(this.error[0].style, { color: '#088d7b', opacity: 1, transform: 'translateX(-50%) translateY(0px)' });
  }
}

export default PassReset;
