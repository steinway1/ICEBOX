import ManufactureGrid from "../components/manufacture/manufacture-grid";

export default class Manufacture {
  /**
   * Types Handler {@link ManufactureGrid}
   * @type {string[]}
   */
  #GridTypesToRender = ["manual", "saks", "auto", "online"];

  constructor(rootEl) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;

    this.init();
  }

  init() {
    this.initGrids();
  }
  initGrids() {
    for (const type of this.#GridTypesToRender) {
      new ManufactureGrid(type);
    }
  }
}
