import $ from "jquery";
import Splide from "../../lib/splide";
import PopupBackdrop from "../dynamic/popup-backdrop";
import PageMsg from "../dynamic/page-msg";
import {
  createElem,
  inputAllowOnlyDecimals,
  lockScroll,
  unlockScroll,
} from "../general/utils";
import { fakeAjaxGetPtwData, fakeFetchSuccess } from "../general/fake-ajax";

class PTW {
  availableCategoryOptions = [
    "Pendants",
    "Earrings",
    "Bracelets",
    "Necklaces",
    "Gold Chains",
    "Rings",
    "Accessories",
    "Watches",
    "Watch Market",
    "Travel Cases",
  ];

  constructor(itemID) {
    this.itemID = itemID;
    if (!this.itemID) {
      throw new Error("No Item ID provided or item ID is invalid");
    }

    this.backdropInstance = null;
    this.loadingClass = "--o-loading";
    this.disabledClass = "--disabled";
    this.popupElem = null;
    this.item = null;
    this.create();
  }
  create() {
    lockScroll();
    this.#createPopup();
    this.#bindDocumentEvents();
    this.setup();
  }

  async setup() {
    /**
     * @CHOU Setup here
     * Get item data
     * Example data that I'm using for testing:
     * {
     *   sku: '1234567890',
     *   price: '$24,500',
     *   imgSrc: "",
     *   colorOptions: [
     *     {active: true, value: "Yellow"},
     *     {active: false, value: "White"},
     *     {active: false, value: "Rose"},
     *     {active: false, value: "Green"},
     *     {active: false, value: "Blue"}
     *   ],
     *   category: 'Watches'
     * }
     */
    const item = await this.AjaxGetPtwData(this.itemID);
    // const item = await fakeAjaxGetPtwData(this.itemID);

    if (item.error) {
      this.destroy();
      new PageMsg({
        heading: "Something went wrong",
        msg: item.msg,
        type: "error",
      });
      return;
    }

    this.item = item;
    this.#renderFromItem();
    this.enable();
  }
  async submit() {
    this.disable();
    const formData = this.getFormData();

    if (!formData || Object.keys(formData).length === 0) {
      this.enable();
      new PageMsg({
        heading: "Something went wrong",
        msg: "Form data is empty or invalid",
        type: "error",
      });
      return;
    }

    /**
     * @CHOU Setup here
     * Send form data to server
     */
    const response = await this.submitPtw(formData);
    if (response.error) {
      this.enable();
      new PageMsg({
        heading: "Something went wrong",
        msg: response.msg,
        type: "error",
      });
      return;
    }
    $("#ptw_link_" + this.itemID).remove();
    $("#item_link_" + this.itemID).attr("href", response.product_url);
    $("#item_link_" + this.itemID).show();
    this.enable();
    this.destroy();
    new PageMsg({
      heading: "Success",
      msg: "Item added successfully!",
      type: "success",
    });
  }

  // Methods
  disable() {
    this.popupElem.classList.add(this.disabledClass);
    this.popupElem.classList.add(this.loadingClass);
  }
  enable() {
    this.popupElem.classList.remove(this.disabledClass);
    this.popupElem.classList.remove(this.loadingClass);
  }
  destroy() {
    unlockScroll();
    if (this.popupElem) {
      this.popupElem.remove();
    }
    if (this.backdropInstance) {
      this.backdropInstance.hide();
    }
    this.#unbindDocumentEvents();
  }
  getFormData() {
    const form = this.popupElem.querySelector("#ptwForm");

    if (!form) {
      new PageMsg({
        heading: "Something went wrong",
        msg: "Form element not found",
        type: "error",
      });
      return;
    }

    const formData = new FormData(form);
    const results = Object.fromEntries(formData);
    return results;
  }
  AjaxGetPtwData(itemID) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url: "/admin/ajax/push-to-website-prepare",
        type: "POST",
        data: { id: itemID },
        success: (data) => resolve(data),
        error: (xhr, status, error) => reject(error),
      });
    });
  }
  submitPtw(formData) {
    return new Promise(function (resolve, reject) {
      $.ajax({
        url: "/admin/ajax/push-to-website-save",
        type: "POST",
        data: formData,
        success: function (data) {
          resolve(data);
        },
        error: function (xhr, status, error) {
          reject(error);
        },
      });
    });
  }

  #renderFromItem() {
    const { error, colorOptions, category, price, sku, imgSrc } = this.item;

    let optionsHTML = "";
    const imgElem = this.popupElem.querySelector("[data-ptw-image]");
    const optionsGrid = this.popupElem.querySelector("[data-ptw-options]");

    const renderMethods = [
      this.#renderSkuOption(sku),
      this.#renderPriceOption(price),
      this.#renderCategoryOption(category),
      this.#renderColorOptions(colorOptions),
      this.#renderAutoLink(),
    ];

    if (imgSrc) {
      imgElem.src = imgSrc;
    } else {
      this.popupElem.classList.add("--no-image");
    }

    for (const method of renderMethods) optionsHTML += method;

    optionsGrid.innerHTML = optionsHTML;
  }
  #createPopup() {
    this.popupElem = createElem("div", {
      className: `m-popup --ptw --visible`,
      id: "ptwPopup",
      style: {
        display: "block",
      },
    });
    this.disable();
    this.popupElem.innerHTML = this.#renderPopupInnerHTML();

    document.body.appendChild(this.popupElem);
    this.backdropInstance = new PopupBackdrop({
      instant: true,
      callback: this.destroy.bind(this),
    });
  }
  #renderPopupInnerHTML() {
    return `
      <div class="m-popup__title">
        <h3>PTW</h3>
      </div>
      <div class="m-popup__main">
        <form id="ptwForm" methods="POST" action="">
          <div class="m-popup__wrapper">
            <div class="m-popup__main">
              <div class="m-popup__input-grid">
                <picture class="m-popup__lg-pic">
                  <img data-ptw-image src="" alt="">
                </picture>
                <div data-ptw-options class="m-popop__manual-options-grid"></div>
              </div>
              <div class="m-popup__btn-group">
                <div data-close-ptw class="m-popup__btn is-dim">Close</div>
                <div data-submit-ptw class="m-popup__btn">Submit</div>
              </div>
            </div>
          </div>
        </form>
      </div>
    `;
  }
  #bindDocumentEvents() {
    document.addEventListener("click", this.#onDocumentClick);
  }
  #unbindDocumentEvents() {
    document.removeEventListener("click", this.#onDocumentClick);
  }
  #onDocumentClick = (e) => {
    const target = e.target;
    if (target.closest("[data-close-ptw]")) {
      this.destroy();
    }
    if (target.closest("[data-submit-ptw]")) {
      this.submit();
    }
  };

  // Render methods
  #renderCategoryOption(category) {
    category = category ? category : "Select...";
    return `
      <div class="m-popup__input-row">
        <label class="m-popup__label" for="ptwCategory">Category</label>
        <div class="am-select-wrap">
          <select name="ptwCategory" id="ptwCategory" class="am-select">
            <option value="${category}" selected>${category}</option>
            ${this.availableCategoryOptions
              .map((option) => {
                if (option === category) return "";
                return `<option value="${option}">${option}</option>`;
              })
              .join("")}
          </select>
        </div>
      </div>
    `;
  }
  #renderSkuOption(sku) {
    return `
      <div class="m-popup__input-row">
        <label class="m-popup__label" for="ptwSku">Internal Item Number</label>
        <input id="ptwSku" class="m-popup__input" type="text" name="ptwSku" placeholder="Internal Item Number"
          value="${sku}" autocomplete="off" required="">
      </div>
    `;
  }
  #renderPriceOption(price) {
    price = price ? price : "$100";
    return `
      <div class="m-popup__input-row">
        <label class="m-popup__label" for="ptwPrice">Price</label>
        <input id="ptwPrice" class="m-popup__input" type="text" name="ptwPrice" placeholder="Price"
          value="${price}" autocomplete="off" required="">
      </div>
    `;
  }
  #renderColorOptions(colorOptions) {
    if (!colorOptions) {
      throw new Error("No color options provided");
    }

    const colorOptionsHTML = colorOptions
      .map((option) => {
        let isActive = option.active ? "selected" : "";
        return `<option value="${option.value}" ${isActive}>${option.value}</option>`;
      })
      .join("");

    return `
      <div class="m-popup__input-row">
        <label class="m-popup__label" for="ptwColor">Color</label>
        <div class="am-select-wrap">
          <select name="ptwColor" id="ptwColor" class="am-select">
            ${colorOptionsHTML}
          </select>
        </div>
      </div>
    `;
  }
  #renderAutoLink() {
    return `
			<div class="m-popup__input-row">
        <label class="custom-checkbox --lg">
          <input type="checkbox" name="auto_link" value="auto_link" checked>
          <span>Autolink</span>
        </label>
      </div>
    `;
  }
}

export default class Inventory {
  splideOptions = {
    type: "loop",
    rewind: true,
    pagination: false,
    arrows: true,
  };

  constructor(rootEl) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;

    this.#init();
    window.Inventory = this;
  }

  #init() {
    this.initSplide();
    this.#bindDocumentEvents();
  }

  #bindDocumentEvents() {
    document.addEventListener("click", this.#onDocumentClick);
  }
  #unbindDocumentEvents() {
    document.removeEventListener("click", this.#onDocumentClick);
  }
  #onDocumentClick = (e) => {
    const target = e.target;
    if (target.closest("[data-new-ptw]")) {
      const id = target.dataset.newPtw;
      new PTW(id);
    }

    // Toggle quantities
    if (target.closest("[data-evt='toggleQuantities']")) {
      const card = target.closest(".i-card");
      if (card) {
        var id = card.getAttribute('data-id');
        const inputArr = [
          ...card
            .querySelector(".i-card__quantities")
            ?.querySelectorAll("input"),
        ];

        if (inputArr.some((input) => input.disabled)) {
          inputArr.forEach((input) => (input.disabled = false));
					target.textContent = 'Save'
					target.className = 'panel__btn bright_blue'

        } else {
          let values = {};

          inputArr.forEach((input) => {
                  let key = input.getAttribute('data-label');
                  let value = input.value;
                  values[key] = value;
                    input.disabled = true;
                  });
          $.blockUI({ message: 'Saving, Please wait...' });
          $.ajax({
            url: '/admin/ajax/update-inventory-qty',
            type: 'POST',
            data: { values: values , item : id},
            success: function(response) {
              $.unblockUI();
               if(response.error){
                 alert(response.alert);
               }
            },
            error: function(xhr, status, error) {
              console.error('Error:', error);
            }
          });
					target.textContent = 'Edit'
					target.className = 'panel__btn --border-grey'
                    target.removeAttribute('onclick')
        }
      }
    }
  };

  initSplide() {
    const splideArr = [...document.querySelectorAll(".i-card__media-splide")];
    for (const splide of splideArr) {
      const slider = new Splide(splide, Inventory.splideOptions);
      slider.mount();
    }
  }
}
