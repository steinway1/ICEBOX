import { createElem } from "../utils/createElem";
import { CLASSNAMES } from "../utils/constants";
import { lockScroll, unlockScroll, getTransitionTime } from "../utils/utils";

interface ModalAskBase {
  title: string;
  description: string;
  discardCallback?: () => void;
  submitCallback?: () => void;
  openCallback?: () => void;
}

type ModalAskContent =
  | { innerHTML: string; elementsToAppend?: never }
  | { elementsToAppend: HTMLElement | HTMLElement[]; innerHTML?: never };

export type ModalAskSettings = ModalAskBase & ModalAskContent;

/**
 * Dynamic modal ask
 * Usage example:
 *
    const askSettings: ModalAskSettings = {
      title: "Add new watches",
      description:
        "Set the number you'd like to add, and the cards will be added.",
      discardCallback: () => {
        console.log("discard");
      },
      submitCallback: () => {
        console.log("submit");
      },
      elementsToAppend: modalAskRow,
    };
    new ModalAsk(askSettings);
 * });
 */
export class ModalAsk {
  private settings: ModalAskSettings;
  private title: ModalAskSettings["title"];
  private description: ModalAskSettings["description"];
  private discardCallback?: ModalAskSettings["discardCallback"];
  private submitCallback?: ModalAskSettings["submitCallback"];
  private openCallback?: ModalAskSettings["openCallback"];

  private innerHTML?: ModalAskSettings["innerHTML"];
  private elementsToAppend?: ModalAskSettings["elementsToAppend"];

  private modal: HTMLElement | null;
  private closeButtonArr: Element[] | [];
  private submitButtonArr: Element[] | [];

  constructor(settings: ModalAskSettings) {
    this.settings = settings;
    this.title = settings.title;
    this.description = settings.description;
    this.discardCallback = settings.discardCallback;
    this.submitCallback = settings.submitCallback;
    this.openCallback = settings.openCallback;

    if ("innerHTML" in settings) {
      this.innerHTML = settings.innerHTML;
    } else {
      const elements = settings.elementsToAppend;
      this.elementsToAppend = Array.isArray(elements) ? elements : [elements];
    }

    this.modal = null;
    this.closeButtonArr = [];
    this.submitButtonArr = [];

    this.init();
  }

  private init() {
    const { title, description, innerHTML, elementsToAppend } = this.settings;

    /** Return error if title or description is not provided */
    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    /** Return error if innerHTML or elementsToAppend is not provided */
    if (!innerHTML && !elementsToAppend) {
      throw new Error("Either innerHTML or elementsToAppend is required");
    }

    this.render();
  }

  /**
   * RENDER
   */

  private render() {
    const { modal, modalContent, closeButtonArr, submitButtonArr } =
      this.create();

    this.modal = modal;
    this.closeButtonArr = closeButtonArr;
    this.submitButtonArr = submitButtonArr;

    /** Append modal to body */
    document.body.appendChild(modal);
    this.bindEvents();
    this.open();
  }

  /**
   * —————————————————— CREATE ——————————————————
   */

  private create() {
    const { title, description, innerHTML, elementsToAppend } = this.settings;
    const modalInnerHTML = renderInnerHTML(title, description);

    /** Create modal */
    const modal = createElem({
      tag: "div",
      className: ["modal-ask"],
      innerHTML: modalInnerHTML,
    });

    /** Get modal content holder */
    const modalContent = modal.querySelector("[data-modal-ask-content]");
    const closeButtonArr = [
      ...modal.querySelectorAll("[data-action='modalAskClose']"),
    ];
    const submitButtonArr = [
      ...modal.querySelectorAll("[data-action='modalAskSubmit']"),
    ];

    if (!modalContent) {
      throw new Error("Modal content not found");
    }

    /** Append innerHTML if provided */
    if (innerHTML) {
      modalContent.innerHTML = innerHTML;
    }

    /** Append elementsToAppend if provided */
    if (elementsToAppend) {
      if (Array.isArray(elementsToAppend)) {
        elementsToAppend.forEach((element) => {
          modalContent.appendChild(element);
        });
      } else {
        modalContent.appendChild(elementsToAppend);
      }
    }

    /** Return modal */
    return { modal, modalContent, closeButtonArr, submitButtonArr };
  }
  private bindEvents() {
    const { closeButtonArr, submitButtonArr } = this;

    closeButtonArr.forEach((button) => {
      button.addEventListener("click", () => {
        this.close();
      });
    });

    submitButtonArr.forEach((button) => {
      button.addEventListener("click", () => {
        this.submit();
      });
    });
  }

  /**
   * —————————————————— API ——————————————————
   */

  public open() {
    const { modal } = this;
    if (!modal) throw new Error("Modal not found");

    lockScroll();
    modal.style.display = "flex";

    if (this.openCallback && typeof this.openCallback === "function") {
      this.openCallback();
    }

    requestAnimationFrame(() => {
      modal.classList.add(CLASSNAMES.IS_ACTIVE);
    });
  }
  public close() {
    const { modal } = this;
    if (!modal) throw new Error("Modal not found");

    unlockScroll();
    modal.classList.remove(CLASSNAMES.IS_ACTIVE);

    if (this.discardCallback && typeof this.discardCallback === "function") {
      this.discardCallback();
    }

    setTimeout(() => {
      modal.style.display = "none";
      this.destroy();
    }, getTransitionTime(modal));
  }
  public submit() {
    const { submitCallback } = this;
    if (!submitCallback || typeof submitCallback !== "function") {
      throw new Error("Submit callback not found");
    }

    submitCallback();
  }
  public destroy() {
    const { modal } = this;
    if (!modal) throw new Error("Modal not found");

    modal.remove();
  }
  public setLoading(bool: boolean) {
    const { modal } = this;
    if (!modal) throw new Error("Modal not found");

    modal.classList.toggle(CLASSNAMES.IS_LOADING, bool);
  }
}

/**
 * —————————————————— CONTENT RENDER METHODS ——————————————————
 */

function renderInnerHTML(title: string, description: string) {
  return `
    <div data-action="modalAskClose" class="modal-ask__backdrop"></div>
    <div class="modal-ask__box is-active">
      <div class="modal-ask__main">
        <div class="modal-ask__header">
          <div class="modal-ask__title-wrap" style="display: flex; flex-direction: column; align-items: flex-start;">
            <h4 style="align-self: flex-start;">${title}</h4>
            <p style="align-self: flex-start;">${description}</p>
          </div>
          <div data-action="modalAskClose" class="modal-ask__close-btn" style="align-self: flex-start;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="currentColor" fill="none">
              <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </div>
        <div data-modal-ask-content class="modal-ask__content" style="display: flex; flex-direction: column; align-items: center;">
        </div>
        <div class="modal-ask__footer" style="display: flex; justify-content: flex-end; gap: 8px;">
          <button data-action="modalAskClose" class="--sub" style="align-self: center;">Discard</button>
          <button data-action="modalAskSubmit" style="align-self: center;">Submit</button>
        </div>
      </div>
      <div class="overloader" data-text="Just a moment...">
        <svg class="overloader-container" x="0px" y="0px" viewBox="0 0 37 37" height="37" width="37" preserveAspectRatio="xMidYMid meet">
          <path class="overloader-track" fill="none" stroke-width="5" pathLength="100" d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"></path>
          <path class="overloader-car" fill="none" stroke-width="5" pathLength="100" d="M0.37 18.5 C0.37 5.772 5.772 0.37 18.5 0.37 S36.63 5.772 36.63 18.5 S31.228 36.63 18.5 36.63 S0.37 31.228 0.37 18.5"></path>
        </svg>
      </div>
    </div>
  `;
}
