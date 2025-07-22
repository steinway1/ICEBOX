export class InputOtp {
  private inputs: HTMLInputElement[];
  private parent: HTMLElement;

  constructor(private el: HTMLInputElement) {
    this.el = el;
    this.parent = this.findParent(el);
    this.inputs = Array.from(
      this.parent.querySelectorAll<HTMLInputElement>("input[data-input-otp]"),
    );
    this.bindEvents();
  }

  private findParent(el: HTMLElement): HTMLElement {
    let parent = el.parentElement;
    while (parent && !this.hasMultipleOtpInputs(parent)) {
      parent = parent.parentElement;
    }
    return parent || document.body;
  }

  private hasMultipleOtpInputs(parent: HTMLElement): boolean {
    return parent.querySelectorAll("input[data-input-otp]").length > 1;
  }

  private bindEvents() {
    this.inputs.forEach((input, idx) => {
      input.addEventListener("input", (e) => this.onInput(e, idx));
      input.addEventListener("keydown", (e) => this.onKeyDown(e, idx));
      input.addEventListener("focus", (e) => this.onFocus(e));
      input.addEventListener("paste", (e) => this.onPaste(e, idx));
    });
  }

  private onInput(e: Event, idx: number) {
    const input = e.target as HTMLInputElement;
    // Only allow digits
    let value = input.value.replace(/\D/g, "");
    if (value.length > 1) value = value.charAt(0);
    input.value = value;

    if (value) {
      // Move to next input if exists, else blur
      if (idx < this.inputs.length - 1) {
        this.inputs[idx + 1].focus();
        this.inputs[idx + 1].select();
      }
    }
  }

  private onKeyDown(e: KeyboardEvent, idx: number) {
    const input = e.target as HTMLInputElement;
    switch (e.key) {
      case "Backspace":
        e.preventDefault();
        if (input.value) {
          input.value = "";
        } else if (idx > 0) {
          this.inputs[idx - 1].focus();
          this.inputs[idx - 1].value = "";
          this.inputs[idx - 1].select();
        }
        break;
      case "ArrowLeft":
        e.preventDefault();
        if (idx > 0) {
          this.inputs[idx - 1].focus();
          this.inputs[idx - 1].select();
        } else {
          this.inputs[this.inputs.length - 1].focus();
          this.inputs[this.inputs.length - 1].select();
        }
        break;
      case "ArrowRight":
        e.preventDefault();
        if (idx < this.inputs.length - 1) {
          this.inputs[idx + 1].focus();
          this.inputs[idx + 1].select();
        } else {
          this.inputs[0].focus();
          this.inputs[0].select();
        }
        break;
      default:
        // Only allow digits and control keys
        if (
          !e.ctrlKey &&
          !e.metaKey &&
          !e.altKey &&
          e.key.length === 1 &&
          !/^\d$/.test(e.key)
        ) {
          e.preventDefault();
        }
        break;
    }
  }

  private onFocus(e: Event) {
    const input = e.target as HTMLInputElement;
    setTimeout(() => input.select(), 0);
  }

  private onPaste(e: ClipboardEvent, idx: number) {
    e.preventDefault();
    const paste = e.clipboardData?.getData("text") || "";
    const digits = paste.replace(/\D/g, "").split("");
    if (!digits.length) return;
    let i = idx;
    digits.forEach((d) => {
      if (i < this.inputs.length) {
        this.inputs[i].value = d;
        i++;
      }
    });
    if (i < this.inputs.length) {
      this.inputs[i].focus();
      this.inputs[i].select();
    } else {
      this.inputs[this.inputs.length - 1].blur();
    }
  }
}
