import {inputAllowOnlyDecimals } from './utils'

function updateInputsAllowOnlyDecimals() {
  const onlyDecimalsInputs = document.querySelectorAll('input[data-allow-decimals]')
  for (const input of onlyDecimalsInputs) {
    inputAllowOnlyDecimals(input)
  }
}

export {
  updateInputsAllowOnlyDecimals
}