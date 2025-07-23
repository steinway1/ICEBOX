import { ModalAsk, ModalAskSettings } from "../dynamic/modal-ask";
import { createElem } from "../utils/createElem";
import { InputDigits } from "../modules/behaviors/input-digits";
import { fakeAjaxPost } from "../ajax/fake-ajax";

export class AddWatchesModal {
  private modalInstance: ModalAsk | null;
  private inputElem: HTMLInputElement | null;

  constructor() {
    this.init();
    this.modalInstance = null;
    this.inputElem = null;
  }

  private init() {
    this.bindShowModal();
  }

  /**
   * —————————————————— Bind Events ——————————————————
   */
  private bindShowModal() {
    document.addEventListener("click", (e) => {
      const { target } = e;
      if (
        target instanceof HTMLElement &&
        target.dataset.ask === "add-watches"
      ) {
        this.showModal();
      }
    });
  }

  private showModal() {
    if (this.modalInstance) {
      return;
    }

    const { modalAskRow, inputWrap, input } = this.createContent();

    /** Create input digits */
    new InputDigits(input as HTMLInputElement);
    this.inputElem = input as HTMLInputElement;

    /** Append input to input wrap */
    inputWrap.appendChild(input);

    /** Append input wrap to modal ask row */
    modalAskRow.appendChild(inputWrap);

    /** Setup settings */
    const askSettings: ModalAskSettings = {
      title: "Add new watches",
      description:
        "Set the number you'd like to add, and the cards will be added.",
      discardCallback: () => {
        this.modalInstance = null;
        console.log("discarded");
      },
      submitCallback: () => {
        this.submit();
      },
      openCallback: () => {
        if (window.innerWidth > 991) this.inputElem?.focus();
      },
      elementsToAppend: modalAskRow,
    };

    /**
     * Create modal
     */
    this.modalInstance = new ModalAsk(askSettings);
  }

  /**
   * —————————————————— Render Content ——————————————————
   */
  async submit() {
    const { inputElem } = this;

    /** Check if input element exists */
    if (!inputElem) {
      console.warn("Input element not found");
      return;
    }

    /** Check if input value is empty */
    const value: number = Number(inputElem.value);
    if (isNaN(value)) {
      console.warn("Input value is not a number");
      return;
    }

    /** Check if input value is less than 0 */
    if (value <= 0) {
      console.warn("Input value is less than 0 or 0");
      return;
    }

    /**
     * @CHOU Setup Here
     * Put your POST request here
     */
    try {
      this.modalInstance?.setLoading(true);
      const res = await fakeAjaxPost("/admin/add-watches", value);
      /** If request is bad, throw error */
      if (!res.success) {
        throw new Error("Request failed");
      }

      this.modalInstance?.close();
    } catch (err) {
      console.error(err);
    } finally {
      this.modalInstance?.setLoading(false);
    }
  }

  /**
   * —————————————————— Render Content ——————————————————
   */
  private createContent() {
    /** Create modal ask row */
    const modalAskRow = createElem({
      tag: "div",
      className: "modal-ask__row",
    });

    /** Create input */
    const inputWrap = createElem({
      tag: "div",
      className: "input-wrap",
    });

    /** Create input */
    const input = createElem({
      tag: "input",
      className: ["input-field", "--otp"],
      attrs: {
        type: "text",
        placeholder: "0 - 999",
        pattern: "\\d*",
        inputmode: "numeric",
        "data-input-digits": "true",
        maxlength: "3",
      },
    });

    return {
      modalAskRow,
      inputWrap,
      input,
    };
  }
}
