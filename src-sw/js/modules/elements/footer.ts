// src-sw/js/modules/elements/footer.ts

export class Footer {
  private static readonly ROOT_SELECTOR = ".footer";

  private rootEl: HTMLElement | null = document.querySelector(
    Footer.ROOT_SELECTOR,
  );

  constructor() {
    if (!this.rootEl) return;
    this.init();
  }
  init() {
    this.bindToggleRows();
  }

  // Private
  private bindToggleRows() {
    const { rootEl } = this;
    if (!rootEl) return;

    const colsArr = Array.from(
      rootEl.querySelectorAll(".footer__nav-col"),
    ) as HTMLElement[];

    colsArr.forEach((colEl) => {
      const headEl = colEl.querySelector(".footer__nav-col-head");
      const bodyEl = colEl.querySelector(".footer__nav-col-body");
      if (!headEl || !bodyEl) return;

      headEl.addEventListener("click", () => {
        colEl.classList.toggle("--expanded");
      });
    });
  }
}
