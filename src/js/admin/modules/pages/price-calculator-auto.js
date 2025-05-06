import EventBus from '../../event-bus';
import InputFormatter from '../ui/input-formatter';

/** -------- COMPONENTS -------- */
// import PriceInfoModals from '../components/price-calculator/price-info-modals';
import CalculatorDiamondJewelry from '../components/price-calculator-auto/calculator-diamond-jewelry';
import CalculatorGoldChain from '../components/price-calculator-auto/calculator-gold-chain';
import CalculatorBaseCostSaver from '../components/price-calculator-auto/calculator-save-base-cost';

/**
 * @class PriceCalculator
 * @description A class for the price calculator page
 * @param {HTMLElement} rootEl - The root element of the price calculator. See page-manager.js for more information.
 */
class PriceCalculator {
  static Events = {
    ADD_BASE_DIAMOND_COST: 'add-base-diamond-cost',
  };

  constructor(rootEl) {
    this.rootEl = rootEl;
    this.eventBus = new EventBus();

    // Components
    this.calculatorDiamondJewelry = new CalculatorDiamondJewelry(this.rootEl);
    this.calculatorGoldChain = new CalculatorGoldChain(this.rootEl);
    // this.priceInfoModals = new PriceInfoModals(this.rootEl);
    this.calculatorBaseCostSaver = new CalculatorBaseCostSaver(this.rootEl);

    // DOM Elements
    this.diamondBaseCostTable = this.rootEl.querySelector('#diamondBaseCostTable');
    this.diamondBaseCostTableBody = this.diamondBaseCostTable?.querySelector('tbody');
    this.metalBaseCostTable = this.rootEl.querySelector('#metalBaseCostTable');

    this.init();
  }
  init() {
    this.#subscribe();
    this.#attachListeners();
  }

  /** --------
   * SUBSCRIBERS
   * -------- */
  #subscribe() {
    this.eventBus.on(PriceCalculator.Events.ADD_BASE_DIAMOND_COST, this.#addBaseDiamondCost.bind(this));
  }
  #attachListeners() {
    /**
     * Add Base Diamond Cost
     * @description Add a base diamond cost to the table
     */
    this.rootEl.addEventListener('click', e => {
      const addBaseDiamondCostBtn = e.target.closest("[data-evt='addBaseDiamondCost']");
      if (addBaseDiamondCostBtn) {
        this.eventBus.emit(PriceCalculator.Events.ADD_BASE_DIAMOND_COST);
      }
    });

    /**
     * Remove Base Diamond Cost
     * @description Remove a base diamond cost from the table
     */
    this.rootEl.addEventListener('click', e => {
      const removeBaseDiamondCostBtn = e.target.closest("[data-evt='removeBaseDiamondCost']");
      if (removeBaseDiamondCostBtn) {
        const row = removeBaseDiamondCostBtn.closest('tr');
        if (!row) return;
        this.#removeBaseDiamondCost(row);
      }
    });
  }

  /** ---------
   * @event ADD / REMOVE BASE DIAMOND COST
   * @description Add a base diamond cost row to the table
   * BusEvent: PriceCalculator.Events.ADD_BASE_DIAMOND_COST
   * --------- */
  /** Create the TR Row structure for the Base Diamond Cost Table */
  #buildBaseDiamondCostRow() {
    const tpl = document.createElement('template');
    tpl.innerHTML = `
		<tr data-base-cost="diaRow">
			<td><span contenteditable="true">Shape</span></td>
			<td><span contenteditable="true">Quality</span></td>
			<td>
			  <input data-input-decimal="2" type="text" class="ui-input" value="650">
			  <button data-evt="removeBaseDiamondCost" class="tr-remove-btn"></button>
			</td>
		</tr>
		`;

    const row = tpl.content.firstElementChild;
    const input = row.querySelector('input');
    new InputFormatter(input).decimalMask(2);
    return row;
  }
  #addBaseDiamondCost() {
    const row = this.#buildBaseDiamondCostRow();
    this.diamondBaseCostTableBody.appendChild(row);
    this.diamondBaseCostTableBody.scrollTo(0, this.diamondBaseCostTableBody.scrollHeight);
  }
  #removeBaseDiamondCost(row) {
    row.remove();
    this.calculatorDiamondJewelry.update();
  }
}

export default PriceCalculator;
