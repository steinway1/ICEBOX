export default class AskModal {
  constructor(options) {
    this.question = options.question;

    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });

    this.modal = document.createElement("div");
    this.modal.className = "m-popup --visible --ask";
    this.modal.style.display = "block";

    this.modal.innerHTML = `
					<div class="m-popup__handler"></div>
					<div class="m-popup__title">
							<h3>${this.question}</h3>
					</div>
					<div class="m-popup__main">
							<div class="m-popup__wrapper">
									<div class="m-popup__main">
											<div class="m-popup__input-row">
													<input
															class="m-popup__input"
															data-customer-input=""
															type="text"
															name="amount"
															placeholder="Amount"
															autocomplete="off"
													/>
											</div>
											<div class="m-popup__btn-group">
													<div class="m-popup__btn is-dim" data-ask-close>Close</div>
													<div class="m-popup__btn" data-ask-submit>Submit</div>
											</div>
											<div class="m-popup__msg" style="display: none;">Please enter a value</div>
									</div>
							</div>
					</div>
			`;

    this.backdrop = document.createElement("div");
    this.backdrop.className = "page-backdrop";
    this.backdrop.style.display = "block";
    this.backdrop.style.opacity = "1";

    this.input = this.modal.querySelector("[data-customer-input]");
    this.closeButton = this.modal.querySelector("[data-ask-close]");
    this.submitButton = this.modal.querySelector("[data-ask-submit]");
    this.message = this.modal.querySelector(".m-popup__msg");

    this.closeButton.addEventListener("click", () => this.handleClose());
    this.submitButton.addEventListener("click", () => this.handleSubmit());

    this.input.addEventListener("input", () => {
      this.message.style.display = "none";
    });

    document.body.appendChild(this.modal);
    document.body.appendChild(this.backdrop);
    this.input.focus();
  }

  handleClose() {
    this.reject("Modal closed");
    this.destroy();
  }

  handleSubmit() {
    const value = this.input.value.trim();
    if (value === "") {
      this.message.style.display = "block";
    } else {
      this.resolve(value);
      this.destroy();
    }
  }

  destroy() {
    this.modal.remove();
    this.backdrop.remove();
  }

  getPromise() {
    return this.promise;
  }
}
