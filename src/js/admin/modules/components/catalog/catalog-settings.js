import PageMsg from "../../dynamic/page-msg";
import EventBus from "../../../event-bus";

export default class CatalogSettings {
  static Map = [
    { name: "catalog_collection", key: "collectionID", valueKey: "value" },
    { name: "catalog_title_font", key: "font", valueKey: "value", transform: (value) => `font--${value}` },
    { name: "catalog_cover_page", key: "coverPage", valueKey: "value", transform: (value) => (value === "show" ? "show-cover" : "") },
    { name: "catalog_contacts_page", key: "contactsPage", valueKey: "value", transform: (value) => (value === "show" ? "show-contacts" : "") },
    { name: "catalog_text_align", key: "textAlign", valueKey: "value", transform: (value) => `text-align--${value}` },
    { name: "catalog_view", key: "view", valueKey: "value", transform: (value) => `view--${value}` },
    { name: "catalog_hide_borders", key: "hideBorders", valueKey: "checked", transform: (value) => (value ? "hide-borders" : "") },
    { name: "catalog_hide_header_footer", key: "hideHeaderFooter", valueKey: "checked", transform: (value) => (value ? "hide-header-footer" : "") },
    { name: "catalog_hide_placeholders", key: "hidePlaceholders", valueKey: "checked", transform: (value) => (value ? "hide-placeholders" : "") },
    { name: "catalog_minimize_prices", key: "minimizePrices", valueKey: "checked", transform: (value) => (value ? "minimize-price" : "") },

    { name: "catalog_cover_page", key: "showCoverPage", valueKey: (value) => (value === "show" ? true : false) },
    { name: "catalog_contacts_page", key: "showContactsPage", valueKey: (value) => (value === "show" ? true : false) },
  ];
  static UPDATE_SETTINGS = "catalog-update-settings";
  static STORAGE_KEY = "catalog-settings";

  constructor(rootEl) {
    this.rootEl = rootEl;
    this.eventBus = EventBus.getInstance();
    this.params = {};
    this.bodyClassname = "body_catalog";
    this.eventBus.on(CatalogSettings.UPDATE_SETTINGS, () => this.update());
    this.#attachListeners();

    const savedSettings = localStorage.getItem(CatalogSettings.STORAGE_KEY);
    if (savedSettings) {
      this.params = JSON.parse(savedSettings);
      this.restoreInputs();
      this.apply();
    } else {
      this.update();
    }
  }

  update() {
    this.readAllInputs();
    this.apply();
    // localStorage.setItem(CatalogSettings.STORAGE_KEY, JSON.stringify(this.params));
  }
  readAllInputs() {
    for (const { name, key, valueKey } of CatalogSettings.Map) {
      const inputArr = [...this.rootEl.querySelectorAll(`input[name="${name}"]`)];

      inputArr.forEach((input) => {
        if (typeof valueKey === "function") {
          if (input.checked) this.params[key] = valueKey(input.value);
        } else {
          if (valueKey === "checked") {
            this.params[key] = input.checked;
          } else if (input.checked) {
            this.params[key] = input.value;
          }
        }
      });
    }
  }
  apply() {
    let className = "body_catalog";
    for (const { key, transform } of CatalogSettings.Map) {
      if (this.params[key] && transform) {
        className += ` ${transform(this.params[key])}`;
      }
    }
    document.body.className = className;
  }
  restoreInputs() {
    for (const { name, key, valueKey } of CatalogSettings.Map) {
      const inputArr = [...this.rootEl.querySelectorAll(`input[name="${name}"]`)];

      inputArr.forEach((input) => {
        if (valueKey === "checked") {
          input.checked = !!this.params[key];
        } else {
          input.checked = input.value === this.params[key];
        }
      });
    }
  }

  // Subscribe to events
  #attachListeners() {
    for (const { name } of CatalogSettings.Map) {
      const inputArr = [...this.rootEl.querySelectorAll(`input[name="${name}"]`)];

      inputArr.forEach((input) => {
        input.addEventListener("change", () => this.eventBus.emit(CatalogSettings.UPDATE_SETTINGS));
      });
    }
  }
}
