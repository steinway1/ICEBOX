// src-sw/js/modules/elements/modal-view.ts

import { CLASSNAMES } from "../../utils/constants";
import type { Item } from "../../types/items";
import { getTransitionTime, lockScroll, unlockScroll } from "../../utils/utils";
import { fakeAjaxGetItemById } from "../../ajax/fake-ajax";
import { delay, createElement } from "../../utils/utils";
import { modalQuickViewStore as store } from "../../store/quick-view-store";
import { AjaxGetItemById } from "../../ajax/ajax";
import { signModalStore } from "../../store/sign-modal-store";
import { sign } from "@splidejs/splide/src/js/utils";

export class ModalView {
  private readonly rootEl: HTMLElement | null =
    document.querySelector(".modal-view");
  private readonly itemImageEl: HTMLElement | null = document.querySelector(
    "#modalViewItemImage",
  );
  private readonly itemTitleEl: HTMLElement | null = document.querySelector(
    "#modalViewItemTitle",
  );
  private readonly itemDetailsEl: HTMLElement | null = document.querySelector(
    "#modalViewItemDetails",
  );
  private readonly closeElArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll("[data-action='modalViewClose']"),
  );

  private openedTime: number;
  private openedLimit: number;

  constructor() {
    if (!this.rootEl) return;

    this.openedTime = 0;
    this.openedLimit = 10;
    this.init();
  }
  private init() {
    this.addEventListeners();
  }

  /**
   * --- --- API
   */
  public async open(id: Item["id"]) {
    const { rootEl } = this;
    if (!rootEl || !id) return;

    lockScroll();

    this.reset();
    rootEl.style.display = "block";

    requestAnimationFrame(() => {
      rootEl.classList.add(CLASSNAMES.IS_OPEN);
      this.handleOpenByItemId(id);
    });
  }
  public close() {
    const { rootEl } = this;
    if (!rootEl) return;

    unlockScroll();

    rootEl.classList.remove(CLASSNAMES.IS_OPEN);

    setTimeout(() => {
      rootEl.style.display = "none";
    }, getTransitionTime(rootEl));
  }
  public reset() {
    const { rootEl, itemDetailsEl, itemImageEl, itemTitleEl } = this;
    if (!rootEl) return;

    rootEl.style.display = "none";
    rootEl.classList.remove(CLASSNAMES.IS_OPEN);
    itemDetailsEl && (itemDetailsEl.innerHTML = "");
    itemImageEl && (itemImageEl.innerHTML = "");
    itemTitleEl && (itemTitleEl.innerHTML = "");
  }

  /**
   * --- --- Subscribers
   */
  private subscribe() {
    store.subscribe(
      (state) => ({ open: state.isOpen, id: state.selectedId }),
      ({ open, id }) => {
        if (open && id !== null) {
          this.open(id);
        } else {
          this.close();
        }
      },
    );
  }

  /**
   * Event listeners
   */
  private addEventListeners() {
    /** Quick view */
    document.addEventListener("click", (e) => {
      const target = e.target as any;
      const quickViewEl = target.closest("[data-action='quickView']");

      if (!quickViewEl) return;

      const id = quickViewEl.dataset.id;
      if (!id) {
        throw new Error("No id found");
      }

      /**
       * @CHOU - put correct logic here
       * Check if user is authorized
       */
      const isAuthorized = (window as any).isUserAuthorized
        ? (window as any).isUserAuthorized()
        : false;

      if (!isAuthorized && this.openedTime >= this.openedLimit) {
        signModalStore.set({ isOpen: true, view: "phone" });
        return;
      }

      this.open(Number(id));
      this.openedTime += 1;
    });

    /** Close */
    this.closeElArr.forEach((el) => {
      el.addEventListener("click", () => {
        this.close();
      });
    });
  }

  /**
   * --- --- Private Methods
   */
  private async handleOpenByItemId(id: Item["id"]) {
    const { rootEl } = this;
    if (!rootEl || !id) {
      return;
    }

    try {
      this.setLoading(true);
      /**
       * @CHOU Setup here
       * put the real AJAX request here
       *
       * @returns {Promise<Item>}
       * Item – see {@link Item}
       */
      const item = await AjaxGetItemById(id);

      if (!item) {
        this.reset();
        return;
      }

      store.get().setItem(item);
      this.handleInsertItem(item);
    } catch (err) {
      console.error(err);
    } finally {
      this.setLoading(false);
    }
  }

  private handleInsertItem(item: Item) {
    const {
      model,
      img_src,
      name,
      brand,
      meta,
      price,
      msrp,
      condition,
      description,
      material,
      papers,
      box,
      price_msrp_diff_percentage,
      less_msrp,
      above_msrp,
    } = item;
    const { itemImageEl, itemTitleEl, itemDetailsEl } = this;

    /** Put image */
    itemImageEl && itemImageEl.appendChild(this.renderImage(img_src));

    /** Put title & meta description */
    if (itemTitleEl) {
      const { titleEl, metaEl } = this.renderTitle({ name, brand });
      itemTitleEl.appendChild(titleEl);
      itemTitleEl.appendChild(metaEl);
    }

    if (!itemDetailsEl) return;

    /** Price , MSRP , Diff */
    const priceEl = this.renderPrice({
      price,
      msrp,
      less_msrp,
      above_msrp,
      price_msrp_diff_percentage,
    });
    priceEl && itemDetailsEl.appendChild(priceEl);

    /** Put description */
    const descriptionEl = this.renderDescription(description ?? "");
    descriptionEl && itemDetailsEl.appendChild(descriptionEl);

    /** Put specs */
    const specsEl = this.renderSpecs({ material, papers, box, condition });
    specsEl && itemDetailsEl.appendChild(specsEl);
  }

  /**
   * --- --- Private Render Methods
   */
  private renderImage(src: string) {
    const imgEl = createElement("img", { src });
    return imgEl;
  }
  private renderTitle({ name, brand }: { name?: string; brand?: string }) {
    const titleEl = createElement("h4", {
      text: name ?? "Undefined name",
    });
    const metaEl = createElement("p", { text: brand ?? "Undefined brand" });
    return { titleEl, metaEl };
  }
  private renderSpecs({
    material,
    papers,
    box,
    condition,
  }: {
    material?: string;
    papers?: boolean;
    box?: boolean;
    condition?: string;
  }) {
    const specsEl = createElement("div", {
      className: "modal-view__specs",
    });

    material &&
      specsEl.appendChild(
        createElement("div", {
          className: "modal-view__spec --material",
          text: material,
        }),
      );

    papers !== undefined &&
      specsEl.appendChild(
        createElement("div", {
          className: "modal-view__spec --papers",
          text: papers ? "With Papers" : "No Papers",
        }),
      );

    box !== undefined &&
      specsEl.appendChild(
        createElement("div", {
          className: "modal-view__spec --box",
          text: box ? "Have Box" : "No Box",
        }),
      );

    condition &&
      specsEl.appendChild(
        createElement("div", {
          className: "modal-view__spec --condition",
          text: condition,
        }),
      );

    return Array.from(specsEl.querySelectorAll("*")).length ? specsEl : null;
  }
  private renderDescription(description: string) {
    if (!description) return null;
    const descriptionElWrap = createElement("div", {
      className: "modal-view__description-wrap",
    });
    const descriptionEl = createElement("p", {
      innerHTML: description,
      className: "modal-view__description",
    });
    descriptionElWrap.appendChild(descriptionEl);

    if (description.length > 5) {
      const moreEl = createElement("span", {
        className: "modal-view__description-more",
        text: "Show more",
      });

      moreEl.addEventListener("click", () => {
        descriptionEl.classList.toggle(CLASSNAMES.IS_EXPANDED);
        moreEl.textContent = descriptionEl.classList.contains(
          CLASSNAMES.IS_EXPANDED,
        )
          ? "Show Less"
          : "Show More";
      });

      descriptionElWrap.appendChild(moreEl);
    }

    return descriptionElWrap;
  }
  private renderPrice({
    price,
    msrp,
    less_msrp,
    above_msrp,
    price_msrp_diff_percentage,
  }: {
    price: string;
    msrp: string | undefined;
    less_msrp: boolean | undefined;
    above_msrp: boolean | undefined;
    price_msrp_diff_percentage: number | undefined;
  }) {
    if (!price) return null;

    const priceEl = createElement("div", {
      className: "modal-view__price",
      innerHTML: `
        <div class="flex flex-wrap flex-center gap-12">
          ${price ? `<span class="text-lg"><strong>Price:  ${price}</strong></span>` : ""}
          ${price_msrp_diff_percentage ? `<span class="text-xs font-bold text-${less_msrp ? "green" : "red"}">${price_msrp_diff_percentage}% ${less_msrp ? "less" : "above"} MSRP</span>` : ""}
        </div>
        ${msrp ? `<span class="text-xs opacity-70">MSRP:  ${msrp}</span>` : ""}
      `,
    });

    return priceEl;
  }

  /**
   * --- --- Helpers
   */
  private setLoading(isLoading: boolean) {
    const { rootEl } = this;
    if (!rootEl) return;

    rootEl.classList.toggle(CLASSNAMES.IS_LOADING, isLoading);
  }
}
