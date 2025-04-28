/**
 * @class InputFormatter
 * @description Universal class for input formatting/validation
 *
 * Usage Sample:
 * new InputFormatter(input).decimalMask(2);
 */
class InputFormatter {
  /**
   * @param {HTMLInputElement|HTMLInputElement[]} inputs
   *   One input or collection of inputs (NodeList, Array)
   */
  constructor(inputs) {
    this.inputs = Array.isArray(inputs) ? inputs : inputs instanceof NodeList ? Array.from(inputs) : [inputs];
  }

  /**
   * @method decimalMask
   * @description Allows only digits and dots,
   *   after the dot maximum `precision` digits.
   * @param {number} precision — how many digits after the decimal point
   * @returns {InputFormatter} this for chaining
   */
  decimalMask(precision = 2) {
    this.inputs.forEach((input) => {
      input.addEventListener("input", () => {
        let v = input.value;

        // Return empty if no value
        if (!v) {
          input.value = "";
          return;
        }

        v = v
          // 1) Remove all except digits and dots
          .replace(/[^0-9.]/g, "")
          // 2) Keep only the first dot
          .replace(/\.{2,}/g, ".")
          // 3) Cut the fractional part to the desired length
          .replace(/^(\d*)(\.(.*))?$/, (_, intPart, dotPart, fracPart = "") => {
            if (!dotPart) return intPart; // without dot
            return intPart + "." + fracPart.slice(0, precision);
          });

        // If the string starts with a dot, add a leading zero
        if (v.startsWith(".")) v = "0" + v;

        // Remove leading zeros for whole numbers, but keep for decimals
        if (!v.includes(".") && v !== "") {
          v = String(parseInt(v, 10));
        }

        input.value = v;
      });
    });
    return this;
  }
}

export default InputFormatter;
