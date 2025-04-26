import EventBus from "../../event-bus";
import CatalogZoom from "../components/catalog/catalog-zoom";
import CatalogSwitcher from "../components/catalog/catalog-switcher";
import CatalogSettings from "../components/catalog/catalog-settings";
import CatalogPrint from "../components/catalog/catalog-print";
import PanelSidebar from "../elements/panel-sidebar";

import PageMsg from "../dynamic/page-msg";

/**
 * @class Catalog
 * @description A class for the catalog page
 * @param {HTMLElement} rootEl - The root element of the catalog
 */
export default class Catalog {
  static Events = {
    ZOOM_IN: "catalog-zoom-in",
    ZOOM_OUT: "catalog-zoom-out",
    SWITCH_COLLECTION: "catalog-switch-collection",
    UPDATE_SETTINGS: "catalog-update-settings",
    PRINT_CATALOG: "catalog-print",
  };

  constructor(rootEl) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;

    this.eventBus = EventBus.getInstance();
    this.zoom = new CatalogZoom(this.rootEl);
    this.switcher = new CatalogSwitcher(this.rootEl, this);
    this.settings = new CatalogSettings(this.rootEl);
    this.sidebar = new PanelSidebar();
    this.printer = new CatalogPrint(this);

    this.selectedCollection = null;

    this.list = this.rootEl.querySelector("#catalogList");
    this.printArr = [...document.querySelectorAll("[data-print-catalog]")];
    this.#init();
  }
  #init() {
    this.#subscribeToEvents();
    this.#attachZoomListeners();
    this.#attachCollectionSwitcherListeners();
    this.#attachPrintListeners();
  }

  /**
   * Subscribe to event bus events
   */
  #subscribeToEvents() {
    /**
     * @description Subscribe to the zoom in / outevent
     */
    this.eventBus.on(Catalog.Events.ZOOM_IN, () => this.zoom.zoomIn());
    this.eventBus.on(Catalog.Events.ZOOM_OUT, () => this.zoom.zoomOut());

    this.eventBus.on(Catalog.Events.SWITCH_COLLECTION, (collectionName, input) => this.switcher.switch(collectionName, input));

    /**
     * Printing
     */
    this.eventBus.on(Catalog.Events.PRINT_CATALOG, () => {
      this.printer.print();
    });
  }

  /**
   * Attach DOM event listeners to control elements
   */
  #attachZoomListeners() {
    const zoomInBtn = this.rootEl.querySelector("[data-catalog-zoom-in]");
    const zoomOutBtn = this.rootEl.querySelector("[data-catalog-zoom-out]");

    if (zoomInBtn) {
      zoomInBtn.addEventListener("click", () => {
        this.eventBus.emit(Catalog.Events.ZOOM_IN);
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener("click", () => {
        this.eventBus.emit(Catalog.Events.ZOOM_OUT);
      });
    }
  }
  #attachCollectionSwitcherListeners() {
    const inputArr = [...this.rootEl.querySelectorAll('input[name="catalog_collection"]')];

    inputArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        const catalogName = input.value;

        this.eventBus.emit(Catalog.Events.SWITCH_COLLECTION, catalogName, input);
      });
    });
  }
  #attachPrintListeners() {
    this.printArr.forEach((printElem) => {
      printElem.addEventListener("click", (e) => {
        if (!this.selectedCollection) {
          new PageMsg({
            heading: "No collection selected",
            msg: "Please select a collection to print",
            type: "error",
          });
          return;
        }
        this.eventBus.emit(Catalog.Events.PRINT_CATALOG);
      });
    });
  }
}
