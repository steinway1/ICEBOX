import { getTransitionTime, lockScroll, unlockScroll } from "../general/utils";

/*  Dynamic Information modal components.
    Usage:

      import InfoModal from "./InfoModal.js";
      const modal = new InfoModal({
        heading: "Heading",
        content: "<p>Any HTML content</p>",
        extraClass: "my-extra-class",
        formula: "DIA Cut + DIA Quality"
      });
*/

export default class InfoModal {
  /**
   * @param {Object}  opts
   * @param {String}  [opts.heading=""]      Heading H4
   * @param {String}  [opts.content=""]      HTML Info Modal Content
   * @param {String}  [opts.extraClass=""]    Additional class for the root node
   * @param {String}  [opts.formula=""]       Formula to display instead of content
   */
  constructor(opts = {}) {
    this.opts = Object.assign({ heading: "", content: "", extraClass: "", formula: false }, opts);
    this.isMobile = window.matchMedia("(max-width: 991.98px)").matches;

    this._dragStartY = 0;
    this._currentDeltaY = 0;
    this._dragging = false;

    this._build();
    this._bindEvents();
    this.open();
  }

  /** --------------
   * API
   * -------------- */
  open() {
    lockScroll();
    document.body.appendChild(this._root);

    requestAnimationFrame(() => {
      this._root.classList.add("i-modal--active");
    });
  }

  close() {
    if (!this._root) return;
    unlockScroll();
    this._root.classList.remove("i-modal--active");
    setTimeout(() => this._destroy(), getTransitionTime(this._root));
  }

  /** --------------
   * PRIVATE
   * -------------- */
  /** Create the modal DOM structure */
  _build() {
    const tpl = document.createElement("template");
    tpl.innerHTML = `
      <div class="i-modal ${this.opts.extraClass}">
        <div data-imodal-close class="i-modal__backdrop"></div>
        <div class="i-modal__container">
          <button data-imodal-close class="i-modal__close-btn"></button>
          <div class="i-modal__slide-handler"></div>
          <div class="i-modal__wrapper">
            <h4>${this.opts.heading}</h4>
            <div class="i-modal__content">${
              this.opts.formula
                ? `<div class="formula-tab">
                <div class="formula-text">
                  ${this.opts.formula}
                </div>
              </div>`
                : this.opts.content
            }</div>
          </div>
        </div>
      </div>`;

    this._root = tpl.content.firstElementChild;
    this._container = this._root.querySelector(".i-modal__container");
    this._contentEl = this._root.querySelector(".i-modal__content");
  }

  /** Assign all necessary event listeners */
  _bindEvents() {
    this._root.addEventListener("click", (e) => {
      if (e.target.closest("[data-imodal-close]")) this.close();
    });

    this._escHandler = (e) => e.key === "Escape" && this.close();
    window.addEventListener("keydown", this._escHandler);

    // mobile drag‑dismiss
    if (this.isMobile) {
      this._pointerDown = this._onPointerDown.bind(this);
      this._container.addEventListener("pointerdown", this._pointerDown, { passive: true });
    }
  }

  /** --------------
   * MOBILE EVENT SWIPE HANDLERS
   * -------------- */
  _onPointerDown(e) {
    if (this._contentEl.contains(e.target) && this._contentEl.scrollTop > 0) return;

    this._dragging = true;
    this._dragStartY = e.clientY;
    this._currentDeltaY = 0;

    this._container.style.transition = "none";

    this._pointerMove = this._onPointerMove.bind(this);
    this._pointerUp = this._onPointerUp.bind(this);

    window.addEventListener("pointermove", this._pointerMove);
    window.addEventListener("pointerup", this._pointerUp);
  }

  /** Pointer movement */
  _onPointerMove(e) {
    if (!this._dragging) return;
    const deltaY = e.clientY - this._dragStartY;
    if (deltaY < 0) return;

    this._currentDeltaY = deltaY;
    this._container.style.transform = `translateY(${deltaY}px)`;
  }

  /** Pointer up */
  _onPointerUp() {
    if (!this._dragging) return;
    this._dragging = false;

    window.removeEventListener("pointermove", this._pointerMove);
    window.removeEventListener("pointerup", this._pointerUp);

    this._container.style.transition = "";

    if (this._currentDeltaY > 80) {
      this.close();
    } else {
      this._container.style.transform = "";
    }
  }

  /** Full cleanup and deletion of DOM */
  _destroy() {
    window.removeEventListener("keydown", this._escHandler);
    if (this.isMobile) {
      this._container.removeEventListener("pointerdown", this._pointerDown);
    }
    this._root.remove();
    this._root = this._container = this._contentEl = null;
  }

  /** --------------
   * STATIC
   * -------------- */
  static open(opts) {
    return new InfoModal(opts);
  }
}
