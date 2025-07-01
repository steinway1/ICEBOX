import { menuStore } from "../../store/menu-store";
import { CLASSNAMES } from "../../utils/constants";
import { lockScroll, unlockScroll } from "../../utils/utils";

export class Menu {
  private static readonly ROOT_SELECTOR = ".menu";
  private static readonly TOGGLE_SELECTOR = "[data-action='toggleMenu']";

  private rootEl: HTMLElement | null = document.querySelector(
    Menu.ROOT_SELECTOR,
  );
  private toggleElArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll(Menu.TOGGLE_SELECTOR),
  ) as HTMLElement[];

  constructor() {
    if (!this.rootEl || !this.toggleElArr) return;
    this.init();
  }

  private init() {
    this.subscribe();
    this.addEventListeners();
  }

  private subscribe() {
    menuStore.subscribe(({ isOpen }) => {
      if (isOpen) {
        this.open();
      } else {
        this.close();
      }
    });
  }

  private addEventListeners() {
    if (!this.toggleElArr) return;
    this.toggleElArr.forEach((toggleEl) => {
      toggleEl.addEventListener("click", () => {
        menuStore.set({ isOpen: !menuStore.get().isOpen });
      });
    });
  }

  private open() {
    lockScroll();
    document.body.classList.add(CLASSNAMES.IS_MENU_ACTIVE);
  }

  private close() {
    unlockScroll();
    document.body.classList.remove(CLASSNAMES.IS_MENU_ACTIVE);
  }
}
