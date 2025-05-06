import EventBus from "../../../event-bus";
import { appendPageLoader, removePageLoader } from "../../general/utils";
import { saveDiamondBaseCostOptions, saveMetalBaseCostOptions } from "../../general/ajax";
import PageMsg from "../../dynamic/page-msg";

class CalculatorBaseCostSaver {
  static Events = {
    SAVE_METAL_COST: "save-metal-cost",
    SAVE_DIAMOND_COST: "save-diamond-cost",
  };
  /**
   * @description A class for saving the base cost of metals and diamonds
   * @param {HTMLElement} rootEl - The root element of the calculator
   */
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.eventBus = new EventBus();

    this.diamondBaseCostTable = this.rootEl.querySelector("#diamondBaseCostTable");
    this.metalBaseCostTable = this.rootEl.querySelector("#metalBaseCostTable");

    this.init();
  }
  init() {
    this.#subscribe();
    this.#attachListeners();
  }

  /** --------
   * API
   * -------- */
  async saveMetalCost() {
    try {
      /** Append Loader */
      appendPageLoader("Saving metal prices...");

      const inputs = {
        gold: this.metalBaseCostTable.querySelector("input#baseGoldPrice"),
        platinum: this.metalBaseCostTable.querySelector("input#basePlatinumPrice"),
        silver: this.metalBaseCostTable.querySelector("input#baseSilverPrice"),
      };

      // Validate inputs exist
      if (Object.values(inputs).some((input) => !input)) {
        new PageMsg({ type: "error", heading: "Error!", msg: "Missing required metal price inputs" });
        console.warn("Missing required metal price inputs", inputs);
        throw new Error(`Missing required metal price inputs`);
      }

      const metalBaseCostOptions = Object.entries(inputs).reduce((acc, [key, input]) => {
        const value = parseFloat(input.value);
        if (Number.isNaN(value)) {
          new PageMsg({ type: "error", heading: "Error!", msg: `Invalid ${key} price value` });
          throw new Error(`Invalid ${key} price value`);
        }
        acc[input.name] = value;
        return acc;
      }, {});

      /**
       * @Chou - Setup the response to save the metal base cost options
       * We set these values on page by using these variables:
       * baseGoldPrice -- basePlatinumPrice -- baseSilverPrice
       * metalBaseCostOptions supposed to be an object with the following keys:
       * {
       * 	baseGoldPrice: Number,
       * 	basePlatinumPrice: Number,
       * 	baseSilverPrice: Number,
       * }
       *
       */
      const response = await saveMetalBaseCostOptions(metalBaseCostOptions);
      console.log(metalBaseCostOptions);
      if (!response.ok) throw new Error("Failed to save metal prices");

      new PageMsg({ type: "success", heading: "Success!", msg: "Metal prices saved successfully" });
    } catch (err) {
      console.error(err);
      new PageMsg({ type: "error", heading: "Error!", msg: err.message });
    } finally {
      removePageLoader();
    }
  }

  async saveDiamondCost() {
    try {
      /** Append Loader */
      appendPageLoader("Saving diamond prices...");

      /** Building Object to save from current table */
      const tableRowArr = [...this.diamondBaseCostTable.querySelectorAll("tbody tr")];
      const diamondBaseCostOptions = tableRowArr.reduce((acc, row) => {
        const [shapeTd, qualityTd, costTd] = row.querySelectorAll("td");
        if (!shapeTd || !qualityTd || !costTd) return acc;

        const shape = shapeTd.textContent.trim();
        const quality = qualityTd.textContent.trim();
        const price = parseFloat(costTd.querySelector("input")?.value);

        acc.push({ shape: shape, quality: quality, price: price });
        return acc;
      }, []);

      /**
       * @Chou - Setup the response to save the diamond base cost options
       * diamondBaseCostOptions supposed to be an array of objects with the following keys:
       * {
       * 	shape: String,
       * 	quality: String,
       * 	price: Number,
       * }
       *
       * We render these values on the page by using these variables:
       * diamondBaseCostOptions within the table #diamondBaseCostTable
       */
      const response = await saveDiamondBaseCostOptions(diamondBaseCostOptions);
      console.log(diamondBaseCostOptions);

      if (!response.ok) throw new Error("Failed to save diamond prices");

      new PageMsg({ type: "success", heading: "Success!", msg: "Diamond prices saved successfully" });
    } catch (err) {
      console.error(err);
    } finally {
      removePageLoader();
    }
  }

  /** --------
   * SUBSCRIBERS
   * -------- */
  #subscribe() {
    this.eventBus.on(CalculatorBaseCostSaver.Events.SAVE_METAL_COST, this.saveMetalCost.bind(this));
    this.eventBus.on(CalculatorBaseCostSaver.Events.SAVE_DIAMOND_COST, this.saveDiamondCost.bind(this));
  }

  /** --------
   * ATTACH LISTENERS
   * -------- */
  #attachListeners() {
    /** Save Base Metal Cost */
    this.rootEl.addEventListener("click", (e) => {
      const saveBaseMetalCostBtn = e.target.closest("[data-save='baseMetalCost']");
      if (saveBaseMetalCostBtn) {
        this.eventBus.emit(CalculatorBaseCostSaver.Events.SAVE_METAL_COST);
      }
    });

    /** Save Base Diamond Cost */
    this.rootEl.addEventListener("click", (e) => {
      const saveBaseDiamondCostBtn = e.target.closest("[data-save='baseDiamondCost']");
      if (saveBaseDiamondCostBtn) {
        this.eventBus.emit(CalculatorBaseCostSaver.Events.SAVE_DIAMOND_COST);
      }
    });
  }
}

export default CalculatorBaseCostSaver;
