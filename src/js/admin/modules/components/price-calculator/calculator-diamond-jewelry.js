import PageMsg from '../../dynamic/page-msg';
import EventBus from '../../../event-bus';

import { debounce } from '../../general/utils';
import { METALS_BASE_COST_MAP_DIAMOND as METALS_BASE_COST_MAP } from './metals-base-cost-map';
/**
 * @class CalculatorDiamondJewelry
 * @param {HTMLElement} rootEl - The root element of the calculator diamond jewelry
 */
class CalculatorDiamondJewelry {
  static Events = {
    UPDATE: 'calculator-diamond-jewelry-update',
  };
  static diamondKeyBuild = (shape, quality) => {
    return `${shape}|${quality}`;
  };

  constructor(rootEl) {
    this.rootEl = rootEl;
    this.container = this.rootEl.querySelector("[data-calc-type='diamondJewelry']");

    /**Inputs */
    this.selectDiaShape = this.rootEl.querySelector("select[id='diaShape']");
    this.selectDiaQuality = this.rootEl.querySelector("select[id='diaQuality']");
    this.selectDiaMetal = this.rootEl.querySelector("select[id='diaMetal']");
    this.inputCtw = this.rootEl.querySelector("input[id='diaCtw']");
    this.inputGramWeight = this.rootEl.querySelector("input[id='diaGramWeight']");

    /** Results */
    this.resultDiaCost = this.rootEl.querySelector("[data-result='diaCost']");
    this.resultDiaRetail = this.rootEl.querySelector("[data-result='diaRetail']");
    this.resultDiaDiamondCost = this.rootEl.querySelector("[data-result='diaDiamondCost']");
    this.resultDiaMetalCost = this.rootEl.querySelector("[data-result='diaMetalCost']");

    /** Base Cost */
    this.diamondBaseCostTable = this.rootEl.querySelector('#diamondBaseCostTable');
    this.metalBaseCostTable = this.rootEl.querySelector('#metalBaseCostTable');
    this.baseCostMap = null;
    this.metalsBaseCostMap = METALS_BASE_COST_MAP;

    /** Current Cost */
    this.currentDiamondCost = undefined;
    this.currentMetalCost = undefined;
    this.currentTotalCost = undefined;
    this.currentRetailPrice = undefined;

    /** Markups */
    this.retailMarkup = 3.72;
    this.retailMarkupStep = 25;

    this.eventBus = EventBus.getInstance();
    this.#subscribeEvents();
    this.#attachUpdateListeners();

    this.update();
  }

  /** --------------
   * API
   * -------------- */
  update() {
    this.#resetResultValue();
    this.#clearErrors();
    this.#buildCostMap();
    this.#calcDiamondCost();
    this.#calcMetalCost();
    this.#calcDiaCost();
    this.#calcRetailPrice();
  }
  reset() {
    this.#resetResultValue();
  }

  /** --------------
   * PRIVATE
   * -------------- */
  #resetResultValue() {
    this.resultDiaCost.textContent = '$ 0.00';
    this.resultDiaRetail.textContent = '$ 0.00';
    this.resultDiaDiamondCost.textContent = '$ 0.00';
    this.resultDiaMetalCost.textContent = '$ 0.00';
    this.currentDiamondCost = undefined;
    this.currentMetalCost = undefined;
    this.currentTotalCost = undefined;
    this.currentRetailPrice = undefined;
  }
  #buildCostMap() {
    const tableRowArr = [...this.diamondBaseCostTable.querySelectorAll('tbody tr')];
    this.baseCostMap = new Map();

    tableRowArr.forEach(row => {
      const [shapeTd, qualityTd, costTd] = row.querySelectorAll('td');
      if (!shapeTd || !qualityTd || !costTd) return;

      const shape = shapeTd.textContent.trim();
      const quality = qualityTd.textContent.trim();
      const price = parseFloat(costTd.querySelector('input')?.value);

      if (!Number.isFinite(price)) return;

      this.baseCostMap.set(CalculatorDiamondJewelry.diamondKeyBuild(shape, quality), price);
    });
  }
  #calcDiamondCost() {
    const shape = this.selectDiaShape.value;
    const quality = this.selectDiaQuality.value;
    const key = CalculatorDiamondJewelry.diamondKeyBuild(shape, quality);
    const unit = this.baseCostMap?.get(key);

    if (!unit || isNaN(unit)) {
      this.resultDiaDiamondCost.textContent = 'N/A';
      this.#showError(`Diamond Base Cost table has no data for Shape : ${shape} and Quality : ${quality}`);
      return;
    }

    const ctw = parseFloat(this.inputCtw.value.replace(',', '.')) || 0;
    const total = (ctw * unit).toFixed(2);

    this.resultDiaDiamondCost.textContent = `$ ${total}`;
    this.currentDiamondCost = total;
  }
  #calcMetalCost() {
    const metal = this.selectDiaMetal.value;
    const totalGram = parseFloat(this.inputGramWeight.value.replace(',', '.')) || 0;

    if (!metal) {
      this.resultDiaMetalCost.textContent = 'N/A';
      this.#showError('Please select a valid metal');
      return;
    }

    if (isNaN(totalGram)) {
      this.resultDiaMetalCost.textContent = 'N/A';
      this.#showError('Please enter a valid gram weight');
      return;
    }

    const config = this.metalsBaseCostMap.get(metal);
    if (!config) {
      this.resultDiaMetalCost.textContent = '$ 0.00';
      this.#showError(`Unknown metal : ${metal}. Please select a valid metal.`);
      return;
    }

    const { basePriceSelector, unitPerOunce, correction, purityFraction, workMarkup } = config;

    const basePriceInput = document.querySelector(basePriceSelector);
    if (!basePriceInput) {
      this.resultDiaMetalCost.textContent = '$ 0.00';
      this.#showError(
        `Base price input not found for metal : ${metal}. Please check the input selector : ${basePriceSelector}`,
      );
      return;
    }

    const basePrice = parseFloat(basePriceInput.value);
    if (isNaN(basePrice)) {
      this.resultDiaMetalCost.textContent = '$ 0.00';
      this.#showError(
        `Base price input is not a number for metal : ${metal}. Please check the input value : ${basePriceInput.value}`,
      );
      return;
    }

    const pricePerGram = (basePrice / unitPerOunce / (correction || 1)) * purityFraction;
    const metalCost = totalGram * (pricePerGram + workMarkup);

    this.resultDiaMetalCost.textContent = `$ ${metalCost.toFixed(2)}`;
    this.currentMetalCost = metalCost;
  }
  #calcDiaCost() {
    const diamondCost = parseFloat(this.currentDiamondCost || 0);
    const metalCost = parseFloat(this.currentMetalCost || 0);

    if (!Number.isFinite(diamondCost) || !Number.isFinite(metalCost)) {
      this.resultDiaCost.textContent = '$ 0.00';
      this.#showError(
        `Please enter a valid diamond cost and metal cost. Current Diamond Cost : ${diamondCost} and Current Metal Cost : ${metalCost}`,
      );
      return;
    }

    const total = diamondCost + metalCost;

    this.resultDiaCost.textContent = `$ ${total.toFixed(2)}`;
    this.currentTotalCost = total;
  }
  #calcRetailPrice() {
    const cost = parseFloat(this.currentTotalCost);

    if (isNaN(cost)) {
      this.resultDiaRetail.textContent = '$ 0.00';
      this.#showError(`Invalid total cost. Current Total Cost : ${cost}`);
      return;
    }

    const markup = this.retailMarkup;
    const step = this.retailMarkupStep;
    const raw = cost * markup;
    const price = Math.round(raw / step) * step;

    this.resultDiaRetail.textContent = `$ ${price.toFixed(2)}`;
    this.currentRetailPrice = price;
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
    this.eventBus.on(CalculatorDiamondJewelry.Events.UPDATE, this.update.bind(this));
  }
  #attachUpdateListeners() {
    /** Selects */
    [this.selectDiaShape, this.selectDiaQuality, this.selectDiaMetal].forEach(el => {
      el.addEventListener('change', () => {
        this.eventBus.emit(CalculatorDiamondJewelry.Events.UPDATE);
      });
    });

    /** Inputs */
    [this.inputCtw, this.inputGramWeight].forEach(el => {
      el.addEventListener(
        'input',
        debounce(() => {
          this.eventBus.emit(CalculatorDiamondJewelry.Events.UPDATE);
        }, 200),
      );
    });

    /** Base Inputs */
    [this.diamondBaseCostTable, this.metalBaseCostTable].forEach(el => {
      el.addEventListener(
        'input',
        debounce(() => {
          this.update();
        }, 200),
      );
    });
  }
}

export default CalculatorDiamondJewelry;
