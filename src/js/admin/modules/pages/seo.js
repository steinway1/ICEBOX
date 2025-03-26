import PageMsg from "../dynamic/page-msg";
import { appendPageLoader, removePageLoader } from "../general/utils";
import PopupBackdrop from "../dynamic/popup-backdrop";
import {
  lockScroll,
  unlockScroll,
  delay,
  getTransitionTime,
} from "../general/utils";
import { __VISIBLE, __HIDDEN } from "../general/constants";
import { fakeAjaxGetSeoPage, fakeFetchSaveSeoPage } from "../general/fake-ajax";

export default class Seo {
  constructor() {
    this.trArr = [...document.querySelectorAll("[data-tr-seo-page]")];
    this.editBtnArr = [...document.querySelectorAll("[data-edit-seo-page]")];
    this.addBtnArr = [...document.querySelectorAll("[data-add-seo-page]")];
    this.saveBtnArr = [...document.querySelectorAll("[data-save-popup]")];
    this.activeTr = null;
    this.backdrop = null;

    // Popup
    this.popup = document.querySelector("[data-seo-popup]");

    // Popup Inputs
    this.titleInput = this.popup.querySelector("#pageTitle");
    this.urlInput = this.popup.querySelector("#pageUrl");
    this.descriptionTextarea = this.popup.querySelector("#pageDescription");
    this.structuredDataTextarea = this.popup.querySelector(
      "#pageStructuredData"
    );
    this.headingInput = this.popup.querySelector("#pageHeading");
    this.subheadingTextarea = this.popup.querySelector("#pageSubheading");
    this.form = this.popup.querySelector("#seoPageEditForm");

    // Keywords
    this.keywordsContainer = this.popup.querySelector(
      "[data-keywords-container]"
    );
    this.keywordsTextarea = this.popup.querySelector("#pageKeywords");
    this.keywordsInput = this.popup.querySelector("[data-keywords-input]");

    this.init();
  }

  init() {
    this.#bindFocusTr();
    this.#bindEditSeoPage();
    this.#bindAddSeoPage();
    this.#bindKeywordsInput();
    this.#bindKeywordsRemove();
    this.#bindPopupEvents();
    this.#bindSavePopup();
  }

  // Table & General
  #bindFocusTr() {
    for (const tr of this.trArr) {
      tr.addEventListener("click", () => {
        if (tr.classList.contains("--active")) {
          tr.classList.remove("--active");
          this.activeTr = null;
        } else {
          this.trArr.forEach((tr) => {
            tr.classList.remove("--active");
          });
          tr.classList.add("--active");
          this.activeTr = tr;
        }
      });
    }
  }
  #bindEditSeoPage() {
    for (const btn of this.editBtnArr) {
      btn.addEventListener("click", () => {
        if (!this.activeTr) {
          new PageMsg({
            heading: "No page selected",
            msg: "Please select a page first or add a new page",
            type: "error",
          });
          return;
        }

        this.#setupPopup();
      });
    }
  }
  #bindAddSeoPage() {
    for (const btn of this.addBtnArr) {
      btn.addEventListener("click", () => {
        this.resetPopup();
        this.showPopup();
      });
    }
  }
  #bindPopupEvents() {
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (target.closest("[data-close-popup]")) {
        this.closePopup();
      }
    });
  }
  #bindSavePopup() {
    for (const btn of this.saveBtnArr) {
      btn.addEventListener("click", () => {
        this.#save();
      });
    }
  }

  // Events Edit / Add popup
  async showPopup() {
    this.popup.style.display = "block";
    lockScroll();

    await delay(5);

    this.popup.classList.add(__VISIBLE);
    this.backdrop = new PopupBackdrop({
      callback: () => {
        this.closePopup();
      },
    });
  }
  async closePopup() {
    this.popup.classList.remove(__VISIBLE);
    if (this.backdrop) {
      this.backdrop.hide(true);
      this.backdrop = null;
    }
    unlockScroll();

    await delay(getTransitionTime(this.popup));

    this.popup.style.display = "none";
    this.resetPopup();
  }
  async resetPopup() {
    // Clear all input fields
    const inputs = this.popup.querySelectorAll("input");
    const textareas = this.popup.querySelectorAll("textarea");

    // Reset inputs
    inputs.forEach((input) => {
      input.value = "";
    });

    // Reset textareas
    textareas.forEach((textarea) => {
      textarea.value = "";
    });

    // Clear keyword tags
    if (this.keywordsContainer) {
      this.keywordsContainer.innerHTML = "";
      this.#updateKeywordsTextarea();
    }
  }
  async #setupPopup() {
    try {
      appendPageLoader();

      /**
       * @Chou Setup here get data by ID
       */
      const data = await fakeAjaxGetSeoPage(this.activeTr.dataset.id);

      if (!data) {
        new PageMsg({
          heading: "No page found",
          msg: "Cannot find page with id: " + this.activeTr.dataset.id,
          type: "error",
        });
        return;
      }

      this.#fillPopup(data);
      this.showPopup();
    } catch (err) {
      console.error(err);
    } finally {
      removePageLoader();
    }
  }
  #fillPopup(data) {
    /**
     * @Chou Check here if variables names are correct
     */
    const {
      title,
      url,
      keywords,
      description,
      heading,
      subheading,
      structured_data,
    } = data;

    this.titleInput.value = title;
    this.urlInput.value = url;
    this.descriptionTextarea.value = description;
    this.structuredDataTextarea.value = structured_data;
    this.headingInput.value = heading;
    this.subheadingTextarea.value = subheading;

    const keywordsArr = keywords.split(",");
    keywordsArr.forEach((keyword) => {
      const tag = document.createElement("div");
      tag.classList.add("m-tag", "--xs");
      tag.setAttribute("data-keyword-tag", "");
      tag.textContent = keyword;

      this.keywordsContainer.appendChild(tag);
    });

    this.#updateKeywordsTextarea();
  }
  async #save() {
    const title = this.titleInput.value;
    const url = this.urlInput.value;
    const keywords = this.#convertTagsToString(this.keywordsContainer);
    const description = this.descriptionTextarea.value;
    const structured_data = this.structuredDataTextarea.value;
    const heading = this.headingInput.value;
    const subheading = this.subheadingTextarea.value;

    /**
     * @Chou Check here if variables names are correct
     */
    const data = {
      title,
      url,
      keywords,
      description,
      structured_data,
      heading,
      subheading,
    };

    try {
      appendPageLoader();

      /**
       * @Chou Setup here save data
       */
      const response = await fakeFetchSaveSeoPage(data);
      if (!response.ok) {
        new PageMsg({
          heading: "Failed to save SEO page",
          msg: "Please try again",
          type: "error",
        });
        return;
      }

      new PageMsg({
        heading: "SEO page saved",
        msg: "SEO page saved successfully",
        type: "success",
      });

      this.closePopup();
    } catch (err) {
      console.error(err);
    } finally {
      removePageLoader();
    }
  }

  // Keywords
  #bindKeywordsRemove() {
    document.addEventListener("click", (e) => {
      const tag = e.target.closest("[data-keyword-tag]");
      if (tag && this.keywordsContainer && this.keywordsTextarea) {
        tag.remove();
        this.#updateKeywordsTextarea();
      }
    });
  }
  #bindKeywordsInput() {
    if (this.keywordsInput) {
      this.keywordsInput.addEventListener("keydown", (e) => {
        if (e.key === "," || e.key === "Enter") {
          e.preventDefault();

          const keyword = this.keywordsInput.value.trim();
          if (!keyword) return;

          const tag = document.createElement("div");
          tag.classList.add("m-tag", "--xs");
          tag.setAttribute("data-keyword-tag", "");
          tag.textContent = keyword;

          this.keywordsContainer.appendChild(tag);

          this.#updateKeywordsTextarea();

          this.keywordsInput.value = "";
        }
      });
    }
  }
  #updateKeywordsTextarea() {
    const tags = this.keywordsContainer.querySelectorAll("[data-keyword-tag]");
    this.keywordsTextarea.value = this.#convertTagsToString(tags);

    console.log(this.keywordsTextarea.value);
  }
  #convertTagsToString(tags) {
    if (!tags || !tags.length) return "";
    return Array.from(tags)
      .map((tag) => tag.textContent.trim())
      .join(", ");
  }
}
