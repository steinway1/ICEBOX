import intlTelInput, { Iti } from "intl-tel-input";
import { Country } from "intl-tel-input/data";


export class InputTel {
  private iti: Iti | null = null;

  constructor(private el: HTMLInputElement) {
    this.init();
    this.attachInputFilter();
  }

  private init() {
    this.iti = intlTelInput(this.el, {
      initialCountry: "us",
      autoPlaceholder: "aggressive",
      placeholderNumberType: "PERSONAL_NUMBER",
      loadUtils: () => import("intl-tel-input/build/js/utils.js"),
    });
  }
  private attachInputFilter() {
    this.el.addEventListener("input", () => {
      const allowed = /[0-9+\-\s()]/g;
      const value = this.el.value;
      const filtered = value.match(allowed)?.join("") || "";
      if (value !== filtered) {
        this.el.value = filtered;
      }
    });
  }

  public getNumber(): string | undefined {
    return this.iti?.getNumber();
  }
}
