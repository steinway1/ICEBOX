export default class BulkTableRenderer {
  /**
   *
   * @param {Array<Object>} itemsArr - {title: string, shape: string, quality: string, metal: string, ctw: number, weight: number}
   * @param {Function} validator - (item) => boolean
   * @param {Array<string>} cols - e.g. ['title', 'shape', 'quality', 'metal', 'ctw', 'weight']
   * @param {Array<string>} valuesToGet - e.g. ['title', 'shape', 'quality', 'metal', 'ctw', 'weight']
   * @param {Array<string>} valuesToCalc - e.g. ['metal', 'weight', 'length']
   * @param {Array<string>} calcValues - e.g. ['cost', 'retail', 'gpi']
   */
  constructor({ itemsArr, validator, calculator, cols, valuesToGet, valuesToCalc, calcValues }) {
    this.itemsArr = itemsArr;
    this.validator = validator;
    this.cols = cols;
    this.calculator = calculator;
    this.valuesToGet = valuesToGet;
    this.valuesToCalc = valuesToCalc;
    this.calcValues = calcValues;
  }

  /** ------ API ------- */
  render() {
    let res = { ok: false, error: null };

    if (!this.itemsArr || !this.cols || !this.validator) {
      res.error = 'Missing some required parameters';
      return res;
    }

    if (this.itemsArr.length === 0) {
      res.error = 'No items to render';
      return res;
    }

    res.ok = true;
    res.tableEl = this.#renderTable().tableEl;
    res.html = this.#renderTable().html;

    return res;
  }

  /** ------ PRIVATE ------- */
  #renderTable() {
    const table = document.createElement('template');
    table.innerHTML = `
      <table class="bulk-table space-table --max-md">
        <thead>
          <tr>
            ${this.cols.map(col => `<th>${col.charAt(0).toUpperCase() + col.slice(1)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${this.#renderRows()}
        </tbody>
      </table>
    `;

    return { tableEl: table.content.firstElementChild, html: table.innerHTML };
  }
  #renderRows() {
    let html = '';

    this.itemsArr.forEach(item => {
      const errors = this.validator(item);

      if (errors.length === 0) {
        const itemValues = Object.fromEntries(this.valuesToGet.map(key => [key, item[key]]));

        // Create calculation object using valuesToCalc keys
        const calcObj = Object.fromEntries(this.valuesToCalc.map(key => [key, itemValues[key]]));

        // Calculate values using spread operator to pass individual values
        const vals = this.calculator.calculate({ ...calcObj });

        // Get only the values specified in calcValues from the calculation result
        const calculatedValues = this.calcValues.map(key => vals[key]);
        const valsArr = [item.title, ...calculatedValues];

        // Render values
        const valsHtml = valsArr.map(val => `<td>${val}</td>`).join('');

        html += `<tr>${valsHtml}</tr>`;
      } else {
        html += `
          <tr class="--corrupted">
            <td>${item.title}</td>
            <td colspan="${this.cols.length - 1}">${errors.join(', ')}</td>
          </tr>
        `;
      }
    });

    return html;
  }
}
