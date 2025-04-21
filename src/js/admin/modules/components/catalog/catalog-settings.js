import PageMsg from "../../dynamic/page-msg";

export default class CatalogSettings {
  static ViewTypes = ["grid-2x2", "list-1x4"];
  static Fonts = ["jost", "vollkorn", "dm-serif-text", "dm-sans", "arvo"];
  static TextAlign = ["left", "center", "right"];
  constructor(rootEl) {
    this.rootEl = rootEl;
  }
  changeView(type) {
    if (!CatalogSettings.ViewTypes.includes(type)) {
      new PageMsg({
        type: "error",
        heading: "Invalid view type",
        msg: `Invalid view type: ${type}. Please try again`,
      });
      throw new Error("Invalid view type");
    }

    CatalogSettings.ViewTypes.forEach((viewType) => {
      this.rootEl.classList.toggle(`view--${viewType}`, viewType === type);
    });
  }

  changeTitleFont(fontName) {
    if (!CatalogSettings.Fonts.includes(fontName)) {
      new PageMsg({
        type: "error",
        heading: "Invalid font",
        msg: `Invalid font: ${fontName}. Please try again`,
      });
      throw new Error("Invalid font");
    }

    CatalogSettings.Fonts.forEach((font) => {
      this.rootEl.classList.toggle(`font--${font}`, font === fontName);
    });
  }

  changeTextAlign(alignType) {
    if (!CatalogSettings.TextAlign.includes(alignType)) {
      new PageMsg({
        type: "error",
        heading: "Invalid text align",
        msg: `Invalid text align: ${alignType}. Please try again`,
      });
      throw new Error("Invalid text align");
    }

    CatalogSettings.TextAlign.forEach((align) => {
      this.rootEl.classList.toggle(`text-align--${align}`, align === alignType);
    });
  }

  hideBorders(hideBorders) {
    this.rootEl.classList.toggle("hide-borders", hideBorders);
  }

  hideHeaderFooter(hideHeaderFooter) {
    this.rootEl.classList.toggle("hide-header-footer", hideHeaderFooter);
  }

  hidePlaceholders(hidePlaceholders) {
    this.rootEl.classList.toggle("hide-placeholders", hidePlaceholders);
  }

  minimizePrice(minimizePrice) {
    this.rootEl.classList.toggle("minimize-price", minimizePrice);
  }

  showCover(showCover) {
    this.rootEl.classList.toggle("show-cover", showCover);
  }

  showContacts(showContacts) {
    this.rootEl.classList.toggle("show-contacts", showContacts);
  }
}
