import PageMsg from "../../dynamic/page-msg";
import { fakeAjaxGetCatalogCollection } from "../../general/fake-ajax";
import { AjaxGetCatalogCollection } from "../../general/ajax";
import {
  appendPageLoader,
  removePageLoader,
  arrayIntoChunks,
} from "../../general/utils";

import CatalogSheetsGenerator from "./catalog-sheet-generator";

export default class CatalogSwitcher {
  constructor(rootEl, catalogInstance) {
    this.rootEl = rootEl;
    this.list = this.rootEl.querySelector("#catalogList");
    this.catalogTitleArr = [
      ...this.rootEl.querySelectorAll("[data-catalog-title]"),
    ];
    this.catalogItemsCountArr = [
      ...this.rootEl.querySelectorAll("[data-catalog-items-count]"),
    ];

    this.catalogInstance = catalogInstance;
  }

  async switch(collectionName, input) {
    try {
      appendPageLoader();

      /**
       * @CHOU
       * Put the real AJAX call here
       */
      const collection = await AjaxGetCatalogCollection(collectionName);
      if (!collection) {
        new PageMsg({
          type: "error",
          heading: "Collection not found",
          msg: `Collection ${collectionName} not found. Please try again`,
        });
        input.checked = false;
        this.catalogInstance.selectedCollection = null;
        this.list.innerHTML =
          new CatalogSheetsGenerator().generatePlaceholder();
        throw new Error("Collection not found");
      }

      this.#renderHTML(collection);
      this.catalogInstance.selectedCollection = collection;
    } catch (err) {
      console.error("class CatalogSwitcher", err);
    } finally {
      removePageLoader();
    }
  }

  #renderHTML(collection) {
    const { title, items } = collection;
    if (!items.length) {
      throw new Error("No items found");
    }

    this.catalogTitleArr.forEach((el) => {
      el.textContent = title;
    });

    this.catalogItemsCountArr.forEach((el) => {
      el.textContent = `${items.length}`;
    });

    const chunks = arrayIntoChunks(items, 4);
    const html = new CatalogSheetsGenerator(title, chunks).generate();

    if (html) {
      this.list.innerHTML = html;
    }
  }
}
