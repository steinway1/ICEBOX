export class PassToggle {
  constructor(private el: HTMLElement) {
    this.el = el;
    this.init();
  }

  private init() {
    this.bindToggleClick();
  }

  private bindToggleClick() {
    this.el.addEventListener("click", () => {
      const parent = this.el.parentElement;
      if (!parent) return;
      const input = parent.querySelector("input");
      if (!input) return;
      input.type = input.type === "password" ? "text" : "password";
      this.el.classList.toggle("--active", input.type === "text");
    });
  }
}
