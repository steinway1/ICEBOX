import EventBus from '../../../event-bus';
import ChainCalculatorCore from './helpers/chain-calculator-core';
import CalculatorMode from './helpers/calculator-mode';
import BulkTableRenderer from './helpers/bulk-table-renderer';

import { debounce, showMessage, appendPageLoader, removePageLoader } from '../../general/utils';
import { fakeAjaxGetChainItem, fakeAjaxGetSubcategoryItems } from '../../general/fake-ajax';

export default class CalculatorGoldChain {
  static EVT = { UPDATE: 'calculator-chain-update' };

  constructor(rootEl) {
    this.root = rootEl;
    this.box = rootEl.querySelector("[data-calc-type='goldChain']");

    /* inputs */
    this.selKarat = this.box.querySelector('#chainKarat');
    this.selLength = this.box.querySelector('#chainLength');
    this.inpWeight = this.box.querySelector('#chainWeight');
    this.inpItemUrl = this.box.querySelector('#goldChainItemUrl');

    /* outputs */
    this.outCost = this.box.querySelector("[data-result='chainCost']");
    this.outRetail = this.box.querySelector("[data-result='chainRetail']");
    this.outGpi = this.box.querySelector("[data-result='chainGramPerInch']");

    /* table edits should also trigger recalc */
    this.tblMetal = this.root.querySelector('#metalBaseCostTable');

    /* Event bus */
    this.bus = EventBus.getInstance();

    /* Single / Bulk toggles */
    this.selCategory = this.box.querySelector('#goldChainCategory');
    this.selSubcategory = this.box.querySelector('#goldChainSubcategory');
    this.bulkTableContainer = this.root.querySelector('#bulk-table-container');

    this.mode = new CalculatorMode({
      calcInstance: this,
      rootEl: this.box,
      inpToggleModeArrSelector: 'input[name="goldChainItemType"]',
      spaceBoxToggleSelector: '.space__items-calc',
    });

    /* core with resolver from DOM */
    this.core = new ChainCalculatorCore({
      basePriceResolver: sel => parseFloat(document.querySelector(sel)?.value.replace(',', '.')) || 0,
      retailStep: 5,
    });

    this.#bindListeners();
    this.#bindItemUrlListener();
    this.emitUpdate();
  }

  get getCurrentMode() {
    return this.mode.getCurrentMode;
  }

  /** ------- API ------- */

  emitUpdate() {
    this.bus.emit(CalculatorGoldChain.EVT.UPDATE);
  }

  /** ------- PRIVATE ------- */
  async #calcFromUrl() {
    const url = this.inpItemUrl?.value;
    if (!url) {
      showMessage({ msg: 'URL cannot be empty' });
      return;
    }

    try {
      appendPageLoader('Fetching item...');
      this.#clearErrors();

      /**
       * @CHOU Setup ajax : Get Chain Item by URL
       * Expected response:
       * {
       *  length: '18',
       *  metal: '14K',
       *  weight: '30',
       * }
       */
      const item = await fakeAjaxGetChainItem(url);
      const errs = this._validateItem(item);
      if (errs.length > 0) {
        this.#showError(errs.join('\n'));
        return;
      }

      const { length, metal, weight } = item;

      this.selLength.value = length;
      this.selKarat.value = metal;
      this.inpWeight.value = weight;

      this.#recalcAndRender();
    } catch (err) {
      showMessage({ msg: 'Error fetching item' });
      console.error(err);
    } finally {
      removePageLoader();
    }
  }
  async #renderSubcategoryItems() {
    const category = this.selCategory.value;
    const subcategory = this.selSubcategory.value;

    if (!category || !subcategory) {
      showMessage({ msg: 'Please select a category and subcategory' });
      return;
    }

    try {
      appendPageLoader('Fetching items...');

      /**
       * @CHOU Setup ajax : Get Subcategory Items Array
       * Expected response:
       * [{
       *  title: '14k Solid Gold Rope Chain',
       *  length: '18',
       *  metal: '14K',
       *  weight: '30',
       * }]
       */
      const items = await fakeAjaxGetSubcategoryItems(category, subcategory);
      if (!items || items.length === 0) {
        showMessage({ msg: `No items found for ${category} / ${subcategory}` });
        return;
      }

      const renderer = new BulkTableRenderer({
        itemsArr: items,
        validator: this._validateItem,
        calculator: this.core,
        cols: ['Title', 'Re-Cost', 'Retail', 'GPI'],
        valuesToGet: ['title', 'metal', 'weight', 'length'],
        valuesToCalc: ['metal', 'weight', 'length'],
        calcValues: ['cost', 'retail', 'gpi'],
      });

      const result = renderer.render();
      if (!result.ok) {
        showMessage({ msg: result.error });
        return;
      }

      this.bulkTableContainer.innerHTML = result.html;
    } catch (err) {
      showMessage({ msg: 'Error fetching items' });
      console.error(err);
    } finally {
      removePageLoader();
    }
  }
  async #recalcAndRender() {
    this.softReset();
    const metal = this.selKarat.value;
    const weight = parseFloat(this.inpWeight.value.replace(',', '.')) || 0;
    const length = parseFloat(this.selLength.value) || 0;

    const vals = this.core.calculate({ metal, weight, length });

    if (!vals.ok) {
      this.#showError(vals.error);
      return;
    }

    const { cost, retail, gpi } = vals;

    this.outCost.textContent = `$ ${cost.toFixed(2)}`;
    this.outRetail.textContent = `$ ${retail.toFixed(2)}`;
    this.outGpi.textContent = `${gpi.toFixed(2)} g/in`;
  }

  /** Listeners */
  #bindListeners() {
    // Chain inputs
    [this.selKarat, this.selLength, this.inpWeight].forEach(el =>
      el.addEventListener('input', () => this.emitUpdate()),
    );
    // Metal table edits
    this.tblMetal.addEventListener(
      'input',
      debounce(() => this.emitUpdate(), 200),
    );
    // on event — render
    this.bus.on(CalculatorGoldChain.EVT.UPDATE, () => this.#recalcAndRender());
  }
  #bindItemUrlListener() {
    this.box.addEventListener('click', e => {
      if (e.target.closest('[data-evt="calcGoldChainItemUrl"]')) {
        if (this.getCurrentMode === CalculatorMode.MODE.SINGLE) {
          this.#calcFromUrl();
        } else if (this.getCurrentMode === CalculatorMode.MODE.BULK) {
          this.#renderSubcategoryItems();
        }
      }
    });
  }

  /** Reset & Errors handling */
  hardReset() {
    this.softReset();
    this.inpItemUrl.value = '';

    if (this.selKarat.options.length > 0) {
      this.selKarat.selectedIndex = 0;
    }
    if (this.selLength.options.length > 0) {
      this.selLength.selectedIndex = 0;
    }
    if (this.inpWeight.value) {
      this.inpWeight.value = '';
    }

    this.emitUpdate();
  }
  softReset() {
    this.outCost.textContent = `$ 0.00`;
    this.outRetail.textContent = `$ 0.00`;
    this.outGpi.textContent = `$ 0.00 g/in`;
    this.#clearErrors();
  }
  #clearErrors() {
    this.box.querySelectorAll('.space-box-error').forEach(el => {
      el.remove();
    });
  }
  #showError(message = 'Something went wrong') {
    const errElem = document.createElement('template');
    errElem.innerHTML = `<div class="space-box-error">${message}</div>`;
    this.box.appendChild(errElem.content);
  }
  /** Helpers */
  _validateItem(item) {
    const errs = [];
    if (!item) {
      errs.push('Item not found');
      return errs;
    }
    const length = item.length;
    const metal = item.metal;
    const weight = item.weight;

    if (!metal) errs.push('Metal is missing');
    if (!weight || isNaN(Number(weight))) errs.push('Weight is missing');
    if (!length || isNaN(Number(length))) errs.push('Length is missing');

    return errs;
  }
}
