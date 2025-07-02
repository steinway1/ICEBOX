// src-sw/js/modules/elements/modal-search.ts

import type { SearchResults } from "../../types/items";

import { modalSearchStore as store } from "../../store/index";

import { CLASSNAMES } from "../../utils/constants";
import { getTransitionTime, lockScroll, unlockScroll } from "../../utils/utils";

import { fakeAjaxGetSearchResults } from "../../ajax/fake-ajax";

export class ModalSearch {
  private static readonly ROOT_SELECTOR = "#modalSearch";
  private static readonly INPUT_SELECTOR = "#modalSearchInput";
  private static readonly TOGGLE_SELECTOR = "[data-action='modalSearchToggle']";
  private static readonly RESULTS_SELECTOR = "#modalSearchResults";
  private static readonly RESULTS_COUNT_SELECTOR = "#modalSearchResultsCount";
  private static readonly RESULTS_LIST_SELECTOR = "#modalSearchResultsList";
  private static readonly RESULTS_LINK_SELECTOR = "#modalSearchResultsLink";

  private typingTimer: number | null = null;
  private static readonly TYPING_DELAY = 1000;

  private rootEl: HTMLElement | null = document.querySelector(
    ModalSearch.ROOT_SELECTOR,
  );
  private inputEl: HTMLInputElement | null = document.querySelector(
    ModalSearch.INPUT_SELECTOR,
  );

  // Actions
  private toggleElArr: Array<HTMLElement> = Array.from(
    document.querySelectorAll(ModalSearch.TOGGLE_SELECTOR),
  ) as HTMLElement[];

  // Results
  private resultsEl: HTMLElement | null = document.querySelector(
    ModalSearch.RESULTS_SELECTOR,
  );
  private resultsCountEl: HTMLElement | null = document.querySelector(
    ModalSearch.RESULTS_COUNT_SELECTOR,
  );
  private resultsListEl: HTMLElement | null = document.querySelector(
    ModalSearch.RESULTS_LIST_SELECTOR,
  );
  private resultsLinkEl: HTMLAnchorElement | null = document.querySelector(
    ModalSearch.RESULTS_LINK_SELECTOR,
  );

  constructor() {
    if (!this.rootEl) {
      return;
    }

    this.init();
  }

  private init() {
    this.subscribe();
    this.addEventListeners();
  }

  /**
   * --- --- API
   */
  public open() {
    const { rootEl, inputEl } = this;
    if (!rootEl) return;

    lockScroll();

    this.reset();

    rootEl.style.display = "block";
    window.innerWidth > 991 && inputEl?.focus();
    requestAnimationFrame(() => {
      rootEl.classList.add(CLASSNAMES.IS_OPEN);
    });
  }

  public close() {
    const { rootEl } = this;
    if (!rootEl) return;

    unlockScroll();

    rootEl.classList.remove(CLASSNAMES.IS_OPEN);
    this.abortSearch();
    setTimeout(() => {
      rootEl.style.display = "none";
    }, getTransitionTime(rootEl));
  }

  public reset() {
    const { rootEl, inputEl, resultsListEl, resultsLinkEl } = this;
    if (!rootEl || !inputEl) return;

    inputEl.value = "";
    rootEl.classList.add(CLASSNAMES.IS_EMPTY);
    rootEl.classList.remove(CLASSNAMES.IS_SKELETON);
    resultsListEl && (resultsListEl.innerHTML = "");
    resultsLinkEl && (resultsLinkEl.href = "#");

    this.abortSearch();
  }

  /**
   * --- --- Subscribers
   */
  private subscribe() {
    store.subscribe(
      (state) => state.isOpen,
      (isOpen) => {
        isOpen ? this.open() : this.close();
      },
    );
  }

  /**
   * --- --- Private Methods
   */
  private async handleInput(e: Event) {
    const { rootEl, inputEl } = this;
    if (!rootEl || !inputEl) return;

    if (inputEl.value.length === 0) {
      this.reset();
      return;
    }

    rootEl.classList.add(CLASSNAMES.IS_SKELETON);
    rootEl.classList.remove(CLASSNAMES.IS_EMPTY);

    store.get().setQuery(inputEl.value);

    this.abortSearch();

    this.typingTimer = window.setTimeout(async () => {
      this.handleSearch();
    }, ModalSearch.TYPING_DELAY);
  }

  private async handleSearch() {
    const { rootEl, inputEl } = this;
    if (!rootEl || !inputEl) return;

    const query = inputEl.value;

    if (query.length === 0) {
      this.reset();
      return;
    }

    try {
      this.setLoading(true);

      /**
       * @CHOU Setup here
       * put the real AJAX request here
       *
       * @returns {Promise<SearchResults>}
       * Search results – see {@link SearchResults}
       */
      const res: SearchResults = await fakeAjaxGetSearchResults(query);

      if (!res) {
        this.setLoading(false);
        return;
      }

      this.setLoading(false);
      this.renderResults(res);
    } catch (err) {
      console.error(err);
    }
  }

  /**
   *
   * --- --- Helpers
   */
  private abortSearch() {
    if (this.typingTimer !== null) {
      clearTimeout(this.typingTimer);
    }
  }
  private setSkeleton(isSkeleton: boolean) {
    const { rootEl } = this;
    if (!rootEl) return;

    rootEl.classList.toggle(CLASSNAMES.IS_SKELETON, isSkeleton);
  }
  private setEmpty(isEmpty: boolean) {
    const { rootEl } = this;
    if (!rootEl) return;

    rootEl.classList.toggle(CLASSNAMES.IS_EMPTY, isEmpty);
  }
  private setLoading(isLoading: boolean) {
    const { rootEl } = this;
    if (!rootEl) return;

    this.setSkeleton(isLoading);
    this.setEmpty(!isLoading);
  }
  private renderResults(items: SearchResults) {
    const {
      rootEl,
      resultsEl,
      resultsListEl,
      resultsCountEl,
      resultsLinkEl,
      inputEl,
    } = this;

    if (
      !rootEl ||
      !resultsEl ||
      !resultsListEl ||
      !resultsCountEl ||
      !inputEl
    ) {
      return;
    }

    /** Empty response ― show "no results" */
    if (items.length === 0) {
      resultsCountEl.textContent = "0";
      resultsListEl.innerHTML = "";
      this.setSkeleton(false);
      this.setEmpty(true);
      return;
    }

    /** Build cards HTML */
    const cardsHTML = items
      .map((item) => {
        const { url, cover, name, brand, meta, price } = item;
        return `
          <a href="${url}" class="modal-search__card">
            <img src="${cover}" alt="${name ?? ""}" />
            <div class="modal-search__card-details">
              <h4>
                <span>${brand ?? ""}</span>
                <span>${name ?? ""}</span>
              </h4>
              <strong>$ ${price}</strong>
            </div>
          </a>
        `;
      })
      .join("");

    /** Insert into DOM */
    resultsListEl.innerHTML = cardsHTML;
    resultsCountEl.textContent = String(items.length);

    /** Button "Show all results" leads to full-text search */
    if (resultsLinkEl) {
      const query = encodeURIComponent(inputEl.value.trim());
      resultsLinkEl.href = `/search?query=${query}`;
    }

    this.setSkeleton(false);
    this.setEmpty(false);
  }

  /**
   * --- --- Event listeners
   */
  private addEventListeners() {
    this.toggleElArr.forEach((el) => {
      el.addEventListener("click", () => {
        store.get().setIsOpen(!store.get().isOpen);
      });
    });

    this.inputEl?.addEventListener("input", (e) => {
      this.handleInput(e);
    });
  }
}
