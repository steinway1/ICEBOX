export class EmptySearchInput {
  private el: HTMLInputElement;

  constructor(el: HTMLInputElement) {
    this.el = el;
    if (!this.el) return;

    this.init();
  }

  private init() {
    this.bindSearch();
  }

  private bindSearch() {
    const { el } = this;
    if (!el) return;

    const input = el.querySelector("input");
    const button = el.querySelector("button");
    if (!input || !button) return;

    button.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const value = input.value;
      if (!value) return;

      window.location.href = `/search?query=${value}`;
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        button.click();
      }
    });
  }
}
