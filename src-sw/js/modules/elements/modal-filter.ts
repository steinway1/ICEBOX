// src-sw/js/modules/elements/modal-filter.ts

import { getTransitionTime, lockScroll, unlockScroll } from "../../utils/utils";
import { CLASSNAMES } from "../../utils/constants";
import { modalFilterStore as store } from "../../store/filter-modal-store";
import { bindFilterRowToggle } from "../../utils/bindEvent";

export class ModalFilter {
  private static readonly ROOT_SELECTOR = ".modal-filters";
  private static readonly TOGGLE_SELECTOR = "[data-action='modalFilterToggle']";

  private rootEl: HTMLElement | null = document.querySelector(
    ModalFilter.ROOT_SELECTOR,
  );
  private toggleElArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll(ModalFilter.TOGGLE_SELECTOR),
  ) as HTMLElement[];

  constructor() {
    if (!this.rootEl) return;
    this.init();
  }

  private init() {
    this.subscribe();
    this.addEventListeners();
    this.addToggleRowListeners();
  }

  /**
   * ––––––––– API –––––––––
   */
  public open() {
    const { rootEl } = this;
    if (!rootEl) return;

    lockScroll();

    rootEl.style.display = "block";
    requestAnimationFrame(() => {
      rootEl.classList.add(CLASSNAMES.IS_ACTIVE);
    });
  }

  public close() {
    const { rootEl } = this;
    if (!rootEl) return;

    unlockScroll();

    rootEl.classList.remove(CLASSNAMES.IS_ACTIVE);
    setTimeout(() => {
      rootEl.style.display = "none";
    }, getTransitionTime(rootEl));
  }

  /**
   * ––––––––– Private Methods –––––––––
   */
  private subscribe() {
    store.subscribe((state) => {
      if (state.isOpen) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  /**
   * ––––––––– Event Listeners –––––––––
   */
  private addEventListeners() {
    this.toggleElArr.forEach((toggleEl) => {
      toggleEl.addEventListener("click", () => {
        ModalFilter.handleToggle();
      });
    });
  }

  private static handleToggle() {
    store.get().setIsOpen(!store.get().isOpen);
  }

  private addToggleRowListeners() {
    const { rootEl } = this;
    if (!rootEl) return;

    const toggleRowElArr = Array.from(
      rootEl.querySelectorAll(".filter-row"),
    ) as HTMLElement[];

    toggleRowElArr.forEach((el) => {
      bindFilterRowToggle(el);
    });
  }
}
