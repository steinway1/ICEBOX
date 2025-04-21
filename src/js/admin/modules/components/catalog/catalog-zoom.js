import PageMsg from "../../dynamic/page-msg";

/**
 * @class CatalogZoom
 * @description A class for zooming in and out of the catalog
 * @param {HTMLElement} rootEl - The root element of the catalog
 */
export default class CatalogZoom {
  constructor(rootEl, { minZoom = 0.5, maxZoom = 1, zoomStep = 0.1 } = {}) {
    this.rootEl = rootEl;
    this.sheetGrid = this.rootEl.querySelector(".catalog__sheets-grid");

    if (!this.sheetGrid) {
      console.warn("No sheet grid found");
      return;
    }

    this.currentZoom = 1;
    this.zoomStep = zoomStep;
    this.maxZoom = maxZoom;
    this.minZoom = minZoom;
  }

  /**
   * @returns {number} The current zoom level
   */
  get getCurrentZoom() {
    return this.currentZoom;
  }

  /**
   * @returns {number} The minimum zoom level
   */
  get getMinZoom() {
    return this.minZoom;
  }

  /**
   * @description Zooms out the catalog
   * @returns {void}
   */
  zoomOut() {
    if (this.currentZoom <= this.minZoom) {
      new PageMsg({
        type: "error",
        heading: "Error",
        msg: "Cannot zoom out further",
      });
      return;
    }

    this.sheetGrid.style.transform = `scale(${
      this.currentZoom - this.zoomStep
    })`;
    this.currentZoom -= this.zoomStep;
  }

  /**
   * @description Zooms in the catalog
   * @returns {void}
   */
  zoomIn() {
    if (this.currentZoom >= this.maxZoom) {
      new PageMsg({
        type: "error",
        heading: "Error",
        msg: "Cannot zoom in further",
      });
      return;
    }

    this.sheetGrid.style.transform = `scale(${
      this.currentZoom + this.zoomStep
    })`;
    this.currentZoom += this.zoomStep;
  }
}
