export default class CalculatorMode {
  static MODE = {
    SINGLE: 'single',
    BULK: 'bulk',
  };

  constructor({ calcInstance, rootEl, inpToggleModeArrSelector, spaceBoxToggleSelector } = {}) {
    this.calcInstance = calcInstance;
    this.root = rootEl;

    this.inpToggleModeArr = [...this.root.querySelectorAll(inpToggleModeArrSelector)];
    this.spaceBoxToggle = this.root.querySelector(spaceBoxToggleSelector);

    this.#bindToggleCalcMode();

    this.#initalSetup();
  }

  get getCurrentMode() {
    return this.inpToggleModeArr.find(inp => inp.checked)?.value || CalculatorMode.MODE.SINGLE;
  }

  #initalSetup() {
    this.#changeMode(this.getCurrentMode);
  }

  #changeMode(mode) {
    this.inpToggleModeArr.forEach(inp => {
      inp.checked = inp.value === mode;
    });
    this.spaceBoxToggle.classList.toggle('--bulk', mode === 'bulk');

    if (this.calcInstance.hardReset) this.calcInstance.hardReset();
  }

  #bindToggleCalcMode() {
    this.inpToggleModeArr.forEach(inp => {
      inp.addEventListener('change', () => this.#changeMode(inp.value));
    });
  }
}
