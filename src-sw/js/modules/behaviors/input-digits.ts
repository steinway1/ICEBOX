/**
 * Usage:
 * new InputDigits(input: HTMLInputElement);s
 */
export class InputDigits {
  private el: HTMLInputElement;

  constructor(el: HTMLInputElement) {
    this.el = el;
    this.handleInput = this.handleInput.bind(this);
    this.init();
  }

  private init() {
    this.el.addEventListener("input", this.handleInput);
  }

  private handleInput(e: Event) {
    // Remove all non-digit characters
    const input = e.target as HTMLInputElement;
    const digitsOnly = input.value.replace(/\D/g, "");
    if (input.value !== digitsOnly) {
      input.value = digitsOnly;
    }
  }
}
