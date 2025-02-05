import {inputAllowOnlyDecimals} from './utils'
import bodymovin from '../../lib/lottie'
import AirDatepicker from '../../lib/air-datepicker'

function updateInputsAllowOnlyDecimals() {
  const onlyDecimalsInputs = document.querySelectorAll('input[data-allow-decimals]')
  for (const input of onlyDecimalsInputs) {
    inputAllowOnlyDecimals(input)
  }
}

function initLottieElements() {
	const lottieContainers = [...document.querySelectorAll('[data-lottie="score"]')]
  lottieContainers.forEach((container) => {
    const animation = bodymovin.loadAnimation({
      container: container,
      path: 'https://gist.githubusercontent.com/steinway1/e4c3c198b9f2fc369dd72a38f3c22c73/raw/5c7af07965df5f07684b619936285a7e64b57069/toolbar-score.json',
      autoplay: true,
      renderer: 'svg',
      loop: true
    })
  })
}

function attachDatePickers() {
  const arr = [...document.querySelectorAll('[data-datepicker]')];
  for (const input of arr) {
    const options = {
      autoClose: false,
      timepicker: true,
      onSelect({ date }) {
        const datePart = date.toLocaleDateString('en-US', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        let timePart = date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        timePart = timePart.replace('am', 'AM').replace('pm', 'PM');
        input.value = `${datePart} ${timePart}`;
      }
    };

    // Если есть атрибут data-date-today, устанавливаем текущую дату
    if (input.hasAttribute('data-date-today')) {
      options.date = new Date(); // Устанавливаем текущую дату как выбранную

      // Форматируем дату сразу для input.value
      const today = new Date();
      const datePart = today.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      let timePart = today.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      timePart = timePart.replace('am', 'AM').replace('pm', 'PM');
      input.value = `${datePart}`;
    }

    new AirDatepicker(input, options);
  }
}

function bindToggleCustomerRows() {
  const arr = [...document.querySelectorAll(['[data-evt="toggleCustomerRow"]'])]
  for (const elem of arr) {
    elem.addEventListener('click', () => {
      const row = elem.closest('.limit-form__row')
      const text = elem.dataset.text || 'More Details'

      if (row) {
        if (row.classList.contains('--collapsed')) {
          row.classList.remove('--collapsed')
          elem.textContent = 'Hide'
        } else {
          row.classList.add('--collapsed')
          elem.textContent = text
        }
      }
    })
  }
}

function bindFingerSizeInput() {
  const arr = [...document.querySelectorAll('[data-finger-input]')]
  const validateValue = (value) => {
    const num = parseFloat(value)
    return /^(\d+(\.5?)?)?$/.test(value) && num <= 25
  }

  for (const input of arr) {
    input.addEventListener('input', () => {
      // Resrtict Numeric Value
      const value = input.value
      if (!validateValue(value)) {
        input.value = value.slice(0, -1)
      }
    })
  }
}

export {
  updateInputsAllowOnlyDecimals,
  initLottieElements,
  bindToggleCustomerRows,
  bindFingerSizeInput,
  attachDatePickers
}