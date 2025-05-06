import InfoModal from "../../../dynamic/info-modal";
import PageMsg from "../../../dynamic/page-msg";
import { FORMULAS } from "./price-calculator-formulas";

/**
 * @class PriceInfoModals
 * @description A class for the price formula info modals
 */
class PriceInfoModals {
  /**
   * @param {HTMLElement} rootEl - The root element of the price calculator
   */
  constructor(rootEl) {
    this.rootEl = rootEl;
    this.init();
  }
  init() {
    this.rootEl.addEventListener("click", this.#handleClick.bind(this));
  }
  destroy() {
    this.rootEl.removeEventListener("click", this.#handleClick);
  }

  /** -------
   * LISTENERS
   * ------- */
  #handleClick(e) {
    const btn = e.target.closest("[data-calc-info]");
    if (!btn) return;

    // Get the calc key from the data-calc-info attribute
    const key = btn.dataset.calcInfo;
    if (!key) this.#throwError("No [data-calc-info] found", "Button has no [data-calc-info] attribute value");

    const modalData = FORMULAS[key];
    if (!modalData) this.#throwError("No modal data", `No modal data found for the [data-calc-info] attribute value: <strong>${key}</strong>`);

    const { heading, formula } = modalData;
    if (!heading || !formula) this.#throwError("No heading or formula", "Heading or formula is missing from the PriceInfoModals.Map");

    // Create the modal
    this.#createModal(heading, formula);
  }

  /** ------
   * PRIVATE
   * ------ */
  #createModal(heading, formula) {
    return new InfoModal({
      heading,
      formula,
    }).open();
  }
  #throwError(heading, msg) {
    new PageMsg({
      heading: `${heading}`,
      msg: `${msg}`,
      type: "error",
    });
    throw new Error(`${heading}: ${msg}`);
  }
}

export default PriceInfoModals;
