import EventBus from '../../../event-bus';
import { ChainMath } from '../price-calculator-auto/helpers/chain-math';

import { debounce } from '../../general/utils';
import { METALS_BASE_COST_MAP_CHAIN as METALS_BASE_COST_MAP } from './metals-base-cost-map';

class CalculatorGoldChain {
  static Events = {
    UPDATE: 'calculator-chain-update',
  };

  constructor(rootEl) {
    this.rootEl = rootEl;
    this.container = this.rootEl.querySelector("[data-calc-type='goldChain']");

    /**Inputs */
    this.selectChainCarat = this.rootEl.querySelector("select[id='chainKarat']");
    this.selectChainLength = this.rootEl.querySelector("select[id='chainLength']");
    this.inputWeight = this.rootEl.querySelector("input[id='chainWeight']");

    /** Results */
    this.resultChainCost = this.rootEl.querySelector("[data-result='chainCost']");
    this.resultChainRetail = this.rootEl.querySelector("[data-result='chainRetail']");
    this.resultChainGramPerInch = this.rootEl.querySelector("[data-result='chainGramPerInch']");

    /** Current Cost */
    this.currentChainCost = undefined;
    this.currentChainRetail = undefined;
    this.currentChainGramPerInch = undefined;

    /** Base Cost */
    this.metalBaseCostTable = this.rootEl.querySelector('#metalBaseCostTable');
    this.metalsBaseCostMap = METALS_BASE_COST_MAP;

    this.eventBus = EventBus.getInstance();
    this.#subscribeEvents();
    this.#attachUpdateListeners();

    this.update();
  }

  /** --------------
   * API
   * -------------- */
  update() {
    this.reset();
    this.#clearErrors();
    this.#calcGramPerInch();
    this.#calcChainCost();
    this.#calcChainRetail();
  }
  reset() {
    this.currentChainCost = undefined;
    this.currentChainRetail = undefined;
    this.currentChainGramPerInch = undefined;
    this.resultChainCost.textContent = '$ 0.00';
    this.resultChainRetail.textContent = '$ 0.00';
    this.resultChainGramPerInch.textContent = '0 g/in';
  }

  /** --------------
   * PRIVATE
   * -------------- */
  #calcGramPerInch() {
    const length = parseFloat(this.selectChainLength.value) || 0;
    const weight = parseFloat(this.inputWeight.value) || 0;

    if (!Number.isFinite(length)) {
      this.#showError(`Invalid chain length : ${length}. Need to be a number.`);
      return;
    }

    if (!Number.isFinite(weight)) {
      this.#showError(`Invalid chain weight : ${weight}. Need to be a number.`);
      return;
    }

    const gramPerInch = weight / length;
    this.resultChainGramPerInch.textContent = `${gramPerInch.toFixed(2)}g/in`;
    this.currentChainGramPerInch = gramPerInch;
  }
  #calcChainCost() {
    const metal = this.selectChainCarat.value;
    const weight = parseFloat(this.inputWeight.value.replace(',', '.')) || 0;

    if (!metal) {
      this.#showError('Select karat / metal');
      return;
    }
    if (!weight) {
      this.#showError('Enter chain weight');
      return;
    }

    const cfg = this.metalsBaseCostMap.get(metal);
    if (!cfg) {
      this.#showError(`Unknown metal: ${metal}`);
      return;
    }

    // Get spot price from the input field
    const spotInput = document.querySelector(cfg.basePriceSelector);
    if (!spotInput) {
      this.#showError(`Base price input not found (${cfg.basePriceSelector})`);
      return;
    }

    const spot = parseFloat(spotInput.value.replace(',', '.'));
    if (!spot) {
      this.#showError('Invalid spot price value');
      return;
    }

    /* ---------- Excel Formula ----------
     * ((spot + spot*markup) * purity / 31.1 + work) * weight * 1.10
     * ----------------------------- */
    const spotWithMarkup = spot * (1 + cfg.spotMarkup);
    const pricePerGram = (spotWithMarkup * cfg.purityFraction) / cfg.unitPerOunce + cfg.workMarkup;
    const chainCost = pricePerGram * weight * 1.1; // +10%

    this.resultChainCost.textContent = `$ ${chainCost.toFixed(2)}`;
    this.currentChainCost = chainCost;
  }
  #calcChainRetail() {
    if (!this.currentChainCost || !this.currentChainGramPerInch) {
      this.#showError('Calculate cost and gram per inch first');
      return;
    }

    const retail = ChainMath.chainRetail({
      chainCost: this.currentChainCost,
      gramsPerInch: this.currentChainGramPerInch,
      roundStep: 5,
    });

    this.resultChainRetail.textContent = `$ ${retail.toFixed(2)}`;
    this.currentChainRetail = retail;
  }

  /** --------
   * UTILS
   * -------- */
  #clearErrors() {
    this.container.querySelectorAll('.space-box-error').forEach(el => {
      el.remove();
    });
  }
  #showError(message = 'Something went wrong') {
    const errElem = document.createElement('template');
    errElem.innerHTML = `<div class="space-box-error">${message}</div>`;
    this.container.appendChild(errElem.content);
  }

  /** --------
   * SUBSCRIBERS & LISTENERS
   * -------- */
  #subscribeEvents() {
    this.eventBus.on(CalculatorGoldChain.Events.UPDATE, this.update.bind(this));
  }
  #attachUpdateListeners() {
    /** Selects */
    [this.selectChainCarat, this.selectChainLength].forEach(el => {
      el.addEventListener('change', () => {
        this.eventBus.emit(CalculatorGoldChain.Events.UPDATE);
      });
    });

    /** Inputs */
    this.inputWeight.addEventListener('input', () => {
      this.eventBus.emit(CalculatorGoldChain.Events.UPDATE);
    });

    /** Base Inputs */
    this.metalBaseCostTable.addEventListener(
      'input',
      debounce(() => {
        this.update();
      }, 200),
    );
  }
}

export default CalculatorGoldChain;
