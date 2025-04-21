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
    CHANGE_VIEW: "catalog-change-view",
    CHANGE_TITLE_FONT: "catalog-change-title-font",
    CHANGE_COVER: "catalog-change-cover",
    CHANGE_CONTACTS: "catalog-change-contacts",
    CHANGE_TEXT_ALIGN: "catalog-change-text-align",
    HIDE_BORDERS: "catalog-hide-borders",
    HIDE_HEADER_FOOTER: "catalog-hide-header-footer",
    HIDE_PLACEHOLDERS: "catalog-hide-placeholders",
    MINIMIZE_PRICE: "catalog-minimize-price",
    SHOW_COVER: "catalog-show-cover",
    SHOW_CONTACTS: "catalog-show-contacts",
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
    this.#attachSettingsListeners();
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

    this.eventBus.on(
      Catalog.Events.SWITCH_COLLECTION,
      (collectionName, input) => this.switcher.switch(collectionName, input),
    );

    /**
     * Settings
     */
    this.eventBus.on(Catalog.Events.CHANGE_VIEW, (view) =>
      this.settings.changeView(view),
    );
    this.eventBus.on(Catalog.Events.CHANGE_TITLE_FONT, (fontName) =>
      this.settings.changeTitleFont(fontName),
    );
    this.eventBus.on(Catalog.Events.CHANGE_COVER, (coverType) =>
      this.settings.changeCover(coverType),
    );
    this.eventBus.on(Catalog.Events.CHANGE_CONTACTS, (contactsType) =>
      this.settings.changeContacts(contactsType),
    );
    this.eventBus.on(Catalog.Events.CHANGE_TEXT_ALIGN, (textAlign) =>
      this.settings.changeTextAlign(textAlign),
    );
    this.eventBus.on(Catalog.Events.HIDE_BORDERS, (hideBorders) =>
      this.settings.hideBorders(hideBorders),
    );
    this.eventBus.on(Catalog.Events.HIDE_HEADER_FOOTER, (hideHeaderFooter) =>
      this.settings.hideHeaderFooter(hideHeaderFooter),
    );
    this.eventBus.on(Catalog.Events.HIDE_PLACEHOLDERS, (hidePlaceholders) =>
      this.settings.hidePlaceholders(hidePlaceholders),
    );
    this.eventBus.on(Catalog.Events.MINIMIZE_PRICE, (minimizePrice) =>
      this.settings.minimizePrice(minimizePrice),
    );
    this.eventBus.on(Catalog.Events.SHOW_COVER, (showCover) =>
      this.settings.showCover(showCover),
    );
    this.eventBus.on(Catalog.Events.SHOW_CONTACTS, (showContacts) =>
      this.settings.showContacts(showContacts),
    );

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
    const inputArr = [
      ...this.rootEl.querySelectorAll('input[name="catalog_collection"]'),
    ];

    inputArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        const catalogName = input.value;

        this.eventBus.emit(
          Catalog.Events.SWITCH_COLLECTION,
          catalogName,
          input,
        );
      });
    });
  }
  #attachSettingsListeners() {
    /**
     * Change View
     */
    const changeViewArr = [
      ...document.querySelectorAll('input[name="catalog_view"]'),
    ];

    changeViewArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(Catalog.Events.CHANGE_VIEW, e.target.value);
      });
    });

    /**
     * Change Title Font
     */
    const changeTitleFontArr = [
      ...document.querySelectorAll('input[name="catalog_title_font"]'),
    ];

    changeTitleFontArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(Catalog.Events.CHANGE_TITLE_FONT, e.target.value);
      });
    });

    /**
     * Change Text Align
     */
    const changeTextAlignArr = [
      ...document.querySelectorAll('input[name="catalog_text_align"]'),
    ];

    changeTextAlignArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(Catalog.Events.CHANGE_TEXT_ALIGN, e.target.value);
      });
    });

    /**
     * Hide Borders
     */
    const hideBordersArr = [
      ...document.querySelectorAll('input[name="catalog_hide_borders"]'),
    ];

    hideBordersArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(Catalog.Events.HIDE_BORDERS, e.target.checked);
      });
    });

    /**
     * Hide Header & Footer
     */
    const hideHeaderFooterArr = [
      ...document.querySelectorAll('input[name="catalog_hide_header_footer"]'),
    ];

    hideHeaderFooterArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(Catalog.Events.HIDE_HEADER_FOOTER, e.target.checked);
      });
    });

    /**
     * Hide Placeholders
     */
    const hidePlaceholdersArr = [
      ...document.querySelectorAll('input[name="catalog_hide_placeholders"]'),
    ];

    hidePlaceholdersArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(Catalog.Events.HIDE_PLACEHOLDERS, e.target.checked);
      });
    });

    /**
     * Minimize Price
     */
    const minimizePriceArr = [
      ...document.querySelectorAll('input[name="catalog_minimize_price"]'),
    ];

    minimizePriceArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(Catalog.Events.MINIMIZE_PRICE, e.target.checked);
      });
    });

    /**
     * Show Cover
     */
    const showCoverArr = [
      ...document.querySelectorAll('input[name="catalog_cover_page"]'),
    ];

    showCoverArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(
          Catalog.Events.SHOW_COVER,
          e.target.value === "show",
        );
      });
    });

    /**
     * Show Contacts
     */
    const showContactsArr = [
      ...document.querySelectorAll('input[name="catalog_contacts_page"]'),
    ];

    showContactsArr.forEach((input) => {
      input.addEventListener("change", (e) => {
        this.eventBus.emit(
          Catalog.Events.SHOW_CONTACTS,
          e.target.value === "show",
        );
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

  /**
   * Utils methods
   */
}
