import EventBus from '../../../event-bus';
import DiamondCalculatorCore from './helpers/diamond-calculator-core';
import CalculatorMode from './helpers/calculator-mode';
import BulkTableRenderer from './helpers/bulk-table-renderer';

import { debounce, showMessage, appendPageLoader, removePageLoader } from '../../general/utils';
import { fakeAjaxGetDiamondItem, fakeAjaxGetSubcategoryItems, fakeAjaxGetSubcategories } from '../../general/fake-ajax';
import { METALS_BASE_COST_MAP_DIAMOND as METAL_MAP } from './helpers/metals-base-cost-map';

export default class CalculatorDiamondJewelry {
  static EVT = { UPDATE: 'calculator-diamond-jewelry-update' };

  constructor(rootEl) {
    this.root = rootEl;
    this.box = rootEl.querySelector("[data-calc-type='diamondJewelry']");

    /* inputs */
    this.selShape = this.box.querySelector('#diaShape');
    this.selQual = this.box.querySelector('#diaQuality');
    this.selMetal = this.box.querySelector('#diaMetal');
    this.inpCtw = this.box.querySelector('#diaCtw');
    this.inpGram = this.box.querySelector('#diaGramWeight');
    this.inpItemUrl = this.box.querySelector('#diamondItemUrl');

    /* outputs */
    this.outDiamond = this.box.querySelector("[data-result='diaDiamondCost']");
    this.outMetal = this.box.querySelector("[data-result='diaMetalCost']");
    this.outTotal = this.box.querySelector("[data-result='diaCost']");
    this.outRetail = this.box.querySelector("[data-result='diaRetail']");

    /* tables for look‑up */
    this.tblDiamond = this.root.querySelector('#diamondBaseCostTable');
    this.tblMetal = this.root.querySelector('#metalBaseCostTable');

    /* Event bus */
    this.bus = EventBus.getInstance();

    /* Single / Bulk toggles */
    this.selCategory = this.box.querySelector('#diaCategory');
    this.selSubcategory = this.box.querySelector('#diaSubcategory');
    this.bulkTableContainer = this.root.querySelector('#bulk-table-container');

    this.mode = new CalculatorMode({
      calcInstance: this,
      rootEl: this.box,
      inpToggleModeArrSelector: 'input[name="diaItemType"]',
      spaceBoxToggleSelector: '.space__items-calc',
    });

    /* core */
    this.core = new DiamondCalculatorCore({
      basePriceResolver: sel => parseFloat(document.querySelector(sel)?.value || 0),
      diamondUnitResolver: (shape, quality) => this.getDiamondUnit(shape, quality),
    });

    this.#bindInputListeners();
    this.#bindUrlListeners();
    this.#bindCategoryListeners();
    this.emitUpdate();
  }
  get getCurrentMode() {
    return this.mode.getCurrentMode;
  }

  /** ------- API ------- */

  emitUpdate() {
    this.bus?.emit(CalculatorDiamondJewelry.EVT.UPDATE);
  }

  /** ------- PRIVATE ------- */

  /** Calculate and render DOM */
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
       * @CHOU Setup ajax : Get Diamond Item by URL
       * Expected response:
       * {
       *  shape: 'RND',
       *  quality: 'FG-VVS',
       *  metal: '14K',
       *  ctw: 0.5,
       *  weight: 1.0,
       * }
       */
      const item = await fakeAjaxGetDiamondItem(url);
      const errs = this._validateItem(item);

      if (errs.length > 0) {
        this.#showError(errs.join('\n'));
        return;
      }

      const { shape, quality, metal, ctw, weight } = item;

      this.selShape.value = shape;
      this.selQual.value = quality;
      this.selMetal.value = metal;
      this.inpCtw.value = ctw;
      this.inpGram.value = weight;

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

    console.log(category, subcategory);

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
       *  title: 'Jesus Of Nazareth Diamond Pendant 14k Solid Gold 9.25ctw',
       *  shape: 'RND',
       *  quality: 'FG-VVS',
       *  metal: '14K',
       *  ctw: 0.5,
       *  weight: 1.0,
       * }]
       */
      const items = await fakeAjaxGetSubcategoryItems(category, subcategory);

      if (!items || items.length === 0) {
        showMessage({ msg: `No items found for ${category} / ${subcategory}` });
        return;
      }

      const renderer = new BulkTableRenderer({
        itemsArr: items,
        validator: this._validateItem.bind(this),
        calculator: this.core,
        cols: ['title', 'DIA cost', 'Metal Cost', 'Cost', 'Retail'],
        valuesToGet: ['title', 'shape', 'quality', 'metal', 'ctw', 'weight'],
        valuesToCalc: ['shape', 'quality', 'metal', 'ctw', 'weight'],
        calcValues: ['diamondCost', 'metalCost', 'totalCost', 'retail'],
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
    const vals = this.core.calculate({
      shape: this.selShape.value,
      quality: this.selQual.value,
      metal: this.selMetal.value,
      ctw: parseFloat(this.inpCtw.value.replace(',', '.')) || 0,
      weight: parseFloat(this.inpGram.value.replace(',', '.')) || 0,
    });

    if (!vals.ok) {
      this.#showError(vals.error);
      return;
    }

    const { diamondCost, metalCost, totalCost, retail } = vals;

    this.outDiamond.textContent = `$ ${diamondCost.toFixed(2)}`;
    this.outMetal.textContent = `$ ${metalCost.toFixed(2)}`;
    this.outTotal.textContent = `$ ${totalCost.toFixed(2)}`;
    this.outRetail.textContent = `$ ${retail.toFixed(2)}`;
  }
  async #renderSubcategories() {
    const category = this.selCategory.value;
    try {
      appendPageLoader('Fetching subcategories...');

      /**
       * @CHOU Setup ajax : Get Subcategories
       * Expected response:
       * [{
       *  label: 'Rings',
       *  value: 'rings',
       * }, {
       *  label: 'Necklaces',
       *  value: 'necklaces',
       * }]
       */
      const subcategories = await fakeAjaxGetSubcategories(category);

      if (!subcategories || subcategories.length === 0) {
        showMessage({ msg: `No subcategories found for ${category}` });
        return;
      }

      this.selSubcategory.innerHTML = subcategories
        .map(sub => `<option value="${sub.value}">${sub.label}</option>`)
        .join('');
    } catch (err) {
      showMessage({ msg: 'Error fetching subcategories' });
      console.error(err);
    } finally {
      removePageLoader();
    }
  }

  /** Events & Listeners */
  #bindInputListeners() {
    /* inputs change */
    [this.selShape, this.selQual, this.selMetal, this.inpCtw, this.inpGram].forEach(el =>
      el.addEventListener('input', () => this.emitUpdate()),
    );

    /* tables edited */
    [this.tblDiamond, this.tblMetal].forEach(tbl => {
      tbl.addEventListener(
        'input',
        debounce(() => this.emitUpdate(), 200),
      );
    });

    /* bus */
    this.bus?.on(CalculatorDiamondJewelry.EVT.UPDATE, () => this.#recalcAndRender());
  }
  #bindUrlListeners() {
    this.box.addEventListener('click', e => {
      if (e.target.closest('[data-evt="calcDiamondItemUrl"]')) {
        if (this.getCurrentMode === CalculatorMode.MODE.SINGLE) {
          this.#calcFromUrl();
        } else if (this.getCurrentMode === CalculatorMode.MODE.BULK) {
          this.#renderSubcategoryItems();
        }
      }
    });
  }
  #bindCategoryListeners() {
    this.selCategory.addEventListener('change', () => {
      this.#renderSubcategories();
    });
  }

  /** Map cache */
  getDiamondUnit(shape, quality) {
    this._unitMap = this.buildUnitMap();
    const unit = this._unitMap.get(`${shape}|${quality}`);
    return unit;
  }
  buildUnitMap() {
    const map = new Map();
    this.tblDiamond.querySelectorAll('tbody tr').forEach(tr => {
      const [shapeTd, qualTd, priceTd] = tr.querySelectorAll('td');
      if (!shapeTd || !qualTd || !priceTd) return;

      const unit = parseFloat(priceTd.querySelector('input')?.value);
      if (Number.isFinite(unit)) map.set(`${shapeTd.textContent.trim()}|${qualTd.textContent.trim()}`, unit);
    });

    return map;
  }

  /** Reset & Errors handling */
  hardReset() {
    this.softReset();
    // Reset all inputs to empty or first option
    this.inpCtw.value = '';
    this.inpGram.value = '';

    // Reset selects to first options
    if (this.selShape.options.length > 0) {
      this.selShape.selectedIndex = 0;
    }
    if (this.selQual.options.length > 0) {
      this.selQual.selectedIndex = 0;
    }
    if (this.selMetal.options.length > 0) {
      this.selMetal.selectedIndex = 0;
    }

    if (this.inpItemUrl.value) {
      this.inpItemUrl.value = '';
    }

    // Trigger update after resetting values
    this.emitUpdate();
  }
  softReset() {
    this.outDiamond.textContent = `$ 0.00`;
    this.outMetal.textContent = `$ 0.00`;
    this.outTotal.textContent = `$ 0.00`;
    this.outRetail.textContent = `$ 0.00`;
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

    // Check if shape and quality exist in the unit map
    this._unitMap = this.buildUnitMap();
    if (!this._unitMap.has(`${item.shape}|${item.quality}`)) {
      errs.push(`Unsupported shape/quality: ${item.shape} / ${item.quality}`);
    }
    // Check if metal exists in the metals base cost map
    if (!METAL_MAP.has(item.metal)) {
      errs.push(`Unsupported metal: ${item.metal}`);
    }
    // Check if ctw and weight are positive numbers
    const ctw = Number(item.ctw);
    const weight = Number(item.weight);

    if (isNaN(ctw) || ctw <= 0) {
      errs.push(`Invalid diamond weight: ${item.ctw}`);
    }
    if (isNaN(weight) || weight <= 0) {
      errs.push(`Invalid metal weight: ${item.weight}`);
    }
    return errs;
  }
}
