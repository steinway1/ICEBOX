class CheckoutPage {
  constructor() {
    this.cartReviewItemsContainer = [...document.querySelectorAll(".cart-review__items")];

    // Mobile summary
    this.summaryMobile = document.querySelector(".summary-mobile");

    // Init
    this.init();
  }
  init() {
    this.#bindDocumentEvents();
    this.#bindInputEvents();
  }

  // Getters
  get summaryIsVisible() {
    return this.summaryMobile && window.getComputedStyle(this.summaryMobile).getPropertyValue("display") !== "none";
  }

  get getActiveFlow() {
    return document.querySelector(".checkout-flow");
  }

  // Utils
  #delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  #showErrorInput(input, msg = "Something went wrong...") {
    if (!input) {
      console.warn("Couldn't find a input. Selector : input. checkout.js - #showErrorInput()");
      return;
    }

    const parent = input.closest(".checkout-form__input-wrap");
    if (!parent) {
      console.warn("Couldn't find a parent. Selector : .checkout-form__input-wrap. checkout.js - #showErrorInput()");
      return;
    }

    const errorMsg = parent.querySelector(".checkout-form__err-msg");
    if (!errorMsg) {
      const errMsg = document.createElement("span");
      errMsg.classList.add("checkout-form__err-msg");
      errMsg.textContent = msg;
      parent.appendChild(errMsg);
    } else {
      errorMsg.textContent = msg;
    }

    parent.classList.add("--error");
  }
  #removeErrors() {
    const errorInputs = document.querySelectorAll(".checkout-form__input-wrap.--error");
    errorInputs.forEach((input) => {
      input.classList.remove("--error");
    });
  }
  #copyAddress(elem) {
    const parent = elem.closest(".checkout__pseudo-cb-drop");
    if (!parent) {
      console.error("Couldn't find a parent. Selector : .checkout__pseudo-cb-drop. checkout.js - #copyAddress()");
      return;
    }

    const address = parent.querySelector("[data-crypto-address]");
    if (!address) {
      parent.classList.add("--error");
      setTimeout(() => {
        if (parent.classList.contains("--error")) {
          parent.classList.remove("--error");
        }
      }, 3000);
      console.error("Couldn't find a address. Selector : [data-crypto-address]. checkout.js - #copyAddress()");
      return;
    }

    navigator.clipboard.writeText(address.getAttribute("data-crypto-address"));
    parent.classList.add("--copied");
    setTimeout(() => {
      if (parent.classList.contains("--copied")) {
        parent.classList.remove("--copied");
      }
    }, 1200);
  }

  // Bind Events
  #bindDocumentEvents() {
    document.addEventListener("click", this.#onDocumentClick.bind(this));
  }
  #offDocumentEvents() {
    document.removeEventListener("click", this.#onDocumentClick.bind(this));
  }
  #onDocumentClick(e) {
    const target = e.target;
    if (target.closest("[data-toggle-cart-items]")) {
      this.toggleCartItemsVisibility();
    }

    if (target.closest("[data-toggle-summary]")) {
      this.#toggleMobileSumamry();
    }

    if (target.closest("[data-submit-checkout]")) {
      e.preventDefault();
      this.#submit();
    }

    if (target.closest("[data-copy-address]")) {
      e.preventDefault();
      this.#copyAddress(target);
    }
  }
  #bindInputEvents() {
    const flow = this.getActiveFlow;
    if (flow) {
      const inputs = [...flow.querySelectorAll("input")];
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          this.#removeErrors();
        });

        input.addEventListener("keypress", (e) => {
          const isEnter = e.key === "Enter";
          if (isEnter) {
            e.preventDefault();
            this.#submit();
          }
        });
      });
    }
  }

  // Methods
  toggleCartItemsVisibility() {
    this.cartReviewItemsContainer.forEach((container) => {
      container.classList.toggle("--hide-items");
    });
  }
  #appendLoader() {
    let loader = document.querySelector(".checkout-page-loader");
    if (loader) return;

    loader = document.createElement("div");
    loader.classList.add("checkout-page-loader");
    document.body.appendChild(loader);

    lockScroll();
  }
  #removeLoader() {
    const loader = document.querySelector(".checkout-page-loader");
    if (!loader) return;

    loader.remove();
    unlockScroll();
  }

  // Submit Form
  async #submit() {
    this.#removeErrors();

    const refundInput = document.querySelector("#no_refunds");
    if (refundInput) {
      if (!refundInput.checked) {
        let highlightTimeout = false;
        const label = refundInput.closest("label");
        if (label) {
          if (highlightTimeout) {
            clearTimeout(highlightTimeout);
          }

          label.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });

          label.classList.add("--highlight");
          highlightTimeout = setTimeout(() => {
            label.classList.remove("--highlight");
          }, 1600);
          return;
        }
      }
    }

    const form = document.querySelector("#checkoutFrm");
    if (!form) {
      console.error("Couldn't find a form. Selector : #checkoutFrm. checkout.js - #submit()");
      return;
    }

    const activeFlow = this.getActiveFlow;
    if (!activeFlow) {
      console.error("Couldn't find a active flow. Selector : .checkout-flow. checkout.js - #submit()");
      return;
    }

    // Required Inputs
    const emptyRequiredInputArr = [...activeFlow.querySelectorAll("input[required]")].filter((input) => {
      if (input.type === "radio" || input.type === "checkbox" || input.classList.contains("pac-target-input")) return false;
      return !input.value;
    });
    if (emptyRequiredInputArr.length > 0) {
      this.#showErrorInput(emptyRequiredInputArr[0], "This field is required");
      emptyRequiredInputArr[0].focus();
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    this.#appendLoader();

    await this.#delay(150);
    form.submit();
  }

  // Mobile Summary
  async showMobileSummary() {
    lockScroll();
    this.summaryMobile.style.display = "flex";

    requestAnimationFrame(() => {
      this.summaryMobile.classList.add("--visible");
      window.checkoutSummaryBackdrop = new Backdrop({
        half: true,
        callback: () => {
          this.hideMobileSummary();
        },
      });
    });
  }
  async hideMobileSummary() {
    unlockScroll();
    this.summaryMobile.classList.remove("--visible");
    if (window.checkoutSummaryBackdrop) {
      window.checkoutSummaryBackdrop.hide(true);
    }

    await this.#delay(400);

    this.summaryMobile.style.display = "none";
  }
  #toggleMobileSumamry() {
    if (this.summaryIsVisible) {
      this.hideMobileSummary();
      return;
    }

    this.showMobileSummary();
  }
}

module.exports = CheckoutPage;
