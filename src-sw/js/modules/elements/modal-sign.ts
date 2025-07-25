import { signModalStore, SignView } from "../../store/sign-modal-store";
import { CLASSNAMES } from "../../utils/constants";
import {
  getTransitionTime,
  lockScroll,
  unlockScroll,
  delay,
} from "../../utils/utils";

export class ModalSign {
  private rootEl: HTMLElement | null = document.querySelector(".sign-modal");

  private viewElArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll("[data-sign-view]"),
  ) as HTMLElement[];
  private switchBtnArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll(".sign-modal__switch-btn"),
  ) as HTMLElement[];
  private goSignArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll("[data-sign-go]"),
  ) as HTMLElement[];
  private mainEl: HTMLElement | null =
    document.querySelector(".sign-modal__main");
  private closeElArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll("[data-action='modalSignClose']"),
  ) as HTMLElement[];
  private openElArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll("[data-action='modalSignOpen']"),
  ) as HTMLElement[];

  constructor() {
    if (!this.rootEl) return;
    this.subscribe();
    this.bindEventListeners();

    this.onChangeView(signModalStore.get().view);
    this.setLoading(signModalStore.get().isLoading);
    this.setLoadingText(signModalStore.get().loadingText);
    this.setShowMsg(
      signModalStore.get().isShowMsg,
      signModalStore.get().msgText,
      signModalStore.get().isErr,
    );
  }

  /**
   * --------- API ---------
   */
  public async open() {
    const { rootEl } = this;
    if (!rootEl) return;

    lockScroll();
    rootEl.style.display = "flex";

    await delay(10);

    rootEl.classList.add(CLASSNAMES.IS_OPEN);
  }
  public async close() {
    const { rootEl } = this;
    if (!rootEl) return;

    rootEl.classList.remove(CLASSNAMES.IS_OPEN);
    unlockScroll();

    await delay(getTransitionTime(rootEl));

    rootEl.style.display = "none";
  }

  /**
   * --------- PRIVATE METHODS ---------
   */
  private subscribe() {
    // Subscribe Open/Close
    signModalStore.subscribe(({ isOpen }) => {
      if (isOpen) {
        this.open();
      } else {
        this.close();
      }
    });

    // Subscribe View
    signModalStore.subscribe(
      (st) => st.view,
      (view) => this.onChangeView(view),
    );

    // Subscribe Loading
    signModalStore.subscribe(
      (st) => st.isLoading,
      (isLoading) => this.setLoading(isLoading),
    );

    // Subscribe Loading Text
    signModalStore.subscribe(
      (st) => st.loadingText,
      (loadingText) => this.setLoadingText(loadingText),
    );

    // Subscribe Show Msg
    signModalStore.subscribe(
      (st) => ({
        isShowMsg: st.isShowMsg,
        isErr: st.isErr,
        msgText: st.msgText,
      }),
      ({ isShowMsg, isErr, msgText }) =>
        this.setShowMsg(isShowMsg, msgText, isErr),
    );

    // Subscribe Msg Text
    signModalStore.subscribe(
      (st) => st.msgText,
      (msgText) => this.setMsgText(msgText),
    );
  }

  /**
   * --------- BIND EVENT LISTENERS ---------
   */
  private bindEventListeners() {
    // Close modal
    this.closeElArr.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        signModalStore.set({ isOpen: false });
      });
    });

    // Open modal
    this.openElArr.forEach((el) => {
      el.addEventListener("click", () => {
        signModalStore.set({ isOpen: true });
      });
    });

    // Switch view
    this.goSignArr.forEach((el) => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const view = el.dataset.signGo as SignView;
        const currentView = signModalStore.get().view;

        if (!view) throw new Error("View value not found");
        if (view === currentView) {
          return;
        }

        signModalStore.set({ view });
      });
    });
  }

  /**
   * Change view
   */
  private async onChangeView(view: SignView) {
    const { mainEl, viewElArr } = this;
    if (!mainEl || !viewElArr) return;

    const viewToShow = viewElArr.find((el) => el.dataset.signView === view);
    if (!viewToShow) throw new Error("View not found");

    /**
     * Additional actions
     */
    if (view === "reg" || view === "phone") {
      this.switchBtnArr.forEach((el) => {
        if (el.dataset.signGo === view) {
          el.classList.add(CLASSNAMES.IS_ACTIVE);
        } else {
          el.classList.remove(CLASSNAMES.IS_ACTIVE);
        }
      });
    }

    /**
     * Reset main height
     * Hide main element
     */
    const transitionTime = getTransitionTime(mainEl);
    mainEl.style.height = mainEl.offsetHeight + "px";
    mainEl.style.opacity = "0";

    await delay(transitionTime);

    /**
     * Show new view
     * Get new view height
     */
    let scrollHeight = 0;
    viewElArr.forEach((el) => {
      if (el.dataset.signView === view) {
        el.style.display = "block";
        scrollHeight = el.scrollHeight;
      } else {
        el.style.display = "none";
      }
    });

    await delay(5);

    /**
     * Set new height
     */
    mainEl.style.height = scrollHeight + "px";
    mainEl.style.opacity = "1";

    await delay(transitionTime);

    mainEl.style.height = "auto";
  }

  /**
   * -------- UTILS --------
   */
  private setLoading(bool: boolean) {
    this.rootEl?.classList.toggle(CLASSNAMES.IS_LOADING, bool);
  }

  private setLoadingText(text: string) {
    const { rootEl } = this;
    if (!rootEl) return;
    const overloader = rootEl.querySelector(".overloader");
    if (!overloader) return;

    (overloader as HTMLElement).dataset.text = text;
  }

  private setShowMsg(bool: boolean, text: string, isErr?: boolean) {
    const { rootEl } = this;
    if (!rootEl) return;

    rootEl.classList.toggle(CLASSNAMES.IS_SHOW_MSG, bool);
    rootEl.classList.toggle(CLASSNAMES.IS_ERR, isErr);

    this.setMsgText(text);
  }

  private setMsgText(text: string) {
    const { rootEl } = this;
    if (!rootEl) return;
    const msg = rootEl.querySelector(".sign-modal__msg");
    if (!msg) return;
    (msg as HTMLElement).textContent = text;
  }
}
