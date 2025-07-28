// js/admin/adminProductCard.ts

// admin product card

export class AdminProductCard {
  constructor() {
    this.init();
  }

  init() {
    this.bindCopyUrl();
  }

  /**
   * Behaviors
   */
  private bindCopyUrl() {
    document.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (target.dataset.adminCard === "copy-url") {
        const urlInput = target.parentElement?.querySelector("input");
        if (!urlInput) return;

        urlInput.select();
        urlInput.setSelectionRange(0, 99999);
        navigator.clipboard.writeText(urlInput.value);
      }
    });
  }
}
