export class StickyElements {
  private el: HTMLElement;
  // Map of allowed rules and their selectors
  private static offsetRulesMap: Record<string, string> = {
    header: "header",
  };

  constructor(el: HTMLElement) {
    this.el = el;
    this.init();
  }

  private init() {
    this.applyStickyOffset();
  }

  /**
   * Checks for data-sticky-rule and applies the corresponding offset if rule is allowed.
   */
  private applyStickyOffset() {
    const { el } = this;

    const rule = el.dataset.stickyRule;
    const ignoreMobile = el.dataset.stickyMobile === "false";
    const offset = el.dataset.stickyOffset;
    let numericOffset = 0;

    if (offset !== undefined) {
      const parsed = Number(offset);
      numericOffset = isNaN(parsed) ? 0 : parsed;
    }

    if (!rule) return;
    if (ignoreMobile && window.innerWidth <= 1024) {
      this.el.style.top = "";
      return;
    }

    const selector = StickyElements.offsetRulesMap[rule];
    if (!selector) return;

    const targetElem = document.querySelector(selector);
    if (targetElem && targetElem instanceof HTMLElement) {
      const totalHeight = targetElem.clientHeight;
      this.el.style.top = `${totalHeight + numericOffset}px`;
    }
  }
}
