export default class TrackPage {
  constructor(rootEl) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;
    this.init();
  }

  init() {
    this.trackOrderSwitch();
    this.resetTrackOrderForm();
  }

  trackOrderSwitch() {
    const arr = document.querySelectorAll('input[name="track_with"]');
    if (arr.length) {
      function toggleInput(value) {
        const elements = {
          phone: document.querySelector('#form_track_order .iti'),
          email: document.querySelector('#input_track_email'),
        };

        if (!elements.phone || !elements.email) {
          console.error('phone or email not found');
          return;
        }

        if (elements[value]) {
          Object.keys(elements).forEach(key => {
            elements[key].style.display = key === value ? 'block' : 'none';
          });
        } else {
          console.error(`Invalid value: ${value}`);
        }
      }

      arr.forEach(input => {
        input.addEventListener('change', () => {
          toggleInput(input.value);
        });
      });
    }
  }

  resetTrackOrderForm() {
    const elem = document.querySelector('[data-evt="reset_track_form"]');
    if (elem) {
      elem.addEventListener('click', e => {
        e.preventDefault();
        const form = document.querySelector('#form_track_order');
        if (!form) {
          console.error('form not found');
          return;
        }

        form.reset();
      });
    }
  }
}
