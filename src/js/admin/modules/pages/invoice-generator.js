import EventBus from "../../event-bus";
import { anyIsNaN, appendPageLoader, removePageLoader } from "../general/utils";
import html2pdf from "html2pdf.js";

class InvoiceGenerator {
  static renderNewItem() {
    const item = document.createElement("tr");
    item.innerHTML = `
      <td>${(() => {
        return (
          document.querySelectorAll("[data-gen-table] tbody tr").length + 1
        );
      })()}</td>
      <td>
        <div class="gen-item__pic"></div>
      </td>
      <td>
        <div class="gen-item__vendor-info">
          <p contenteditable>Vendor Style</p>
          <p contenteditable>Metal</p>
        </div>
        <h6 contenteditable>Item Name</h6>
        <p contenteditable>CTW</p>
      </td>
      <td>
        <p contenteditable data-item-qty>1</p>
      </td>
      <td>
        <p contenteditable>0.50</p>
      </td>
      <td>
        <p>$
          <span contenteditable data-item-unit-price>100.00</span>
          pc
        </p>
      </td>
      <td>
        <p>$
          <span data-item-amount>0.00</span>
        </p>
      </td>
    `;
    return item;
  }

  constructor(rootEl) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;

    this.Events = {
      addNewItem: [
        this.#addNewItem.bind(this),
        this.#calculate.bind(this),
        this.#bindEditableInput.bind(this),
      ],
      updateCalculations: [this.#calculate.bind(this)],
      print: [this.print.bind(this)],
      downloadPDF: [this.downloadPDF.bind(this)],
    };

    this.table = document.querySelector("[data-gen-table]");
    this.allItemsAmountElem = document.querySelector("[data-all-items-amount]");
    this.allItemsQtyElem = document.querySelector("[data-all-items-qty]");
    this.allItemsShippingElem = document.querySelector(
      "[data-all-items-shipping]"
    );

    this.currentTax = [...document.querySelectorAll("[data-current-tax]")];
    this.currentShipping = [
      ...document.querySelectorAll("[data-current-shipping]"),
    ];
    this.currentDiscount = [
      ...document.querySelectorAll("[data-current-discount]"),
    ];
    this.currentTotal = [...document.querySelectorAll("[data-total]")];

    this.fileInput = document.querySelector("#picUpload");

    this.init();
  }
  init() {
    // Events
    this.#bindDocumentEvents();
    this.#bindEditableInput();
    this.#bindImageUpload();
    this.#bindDiffInputs();

    // Event Bus
    for (const event in this.Events) {
      this.Events[event].forEach((callback) =>
        EventBus.getInstance().on(event, callback)
      );
    }

    // Other
    this.setupNowDate();

    // Initial
    this.#calculate();
  }
  get getItemsArr() {
    return document.querySelectorAll("[data-gen-table] tbody tr");
  }
  get getEditableElementsArr() {
    return [...document.querySelectorAll("[contenteditable]")];
  }

  // -- EVENTS -- //
  #bindEditableInput() {
    const editableArr = this.getEditableElementsArr;

    for (const editable of editableArr) {
      if (editable.bindedInput) return;
      editable.addEventListener("input", () => {
        EventBus.getInstance().emit("updateCalculations");
      });
    }
  }
  #bindImageUpload() {
    // Handle click on gen-item__pic
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("gen-item__pic")) {
        this.activeImageElement = e.target;
        this.fileInput.click();
      }
    });

    // Handle file selection
    this.fileInput.addEventListener("change", (e) => {
      if (this.activeImageElement && e.target.files.length > 0) {
        const file = e.target.files[0];
        if (file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.activeImageElement.style.backgroundImage = `url(${e.target.result})`;
            this.activeImageElement.style.backgroundSize = "100% 100%";
          };
          reader.readAsDataURL(file);
        }
        this.fileInput.value = ""; // Reset input
      }
    });

    // Handle drag and drop
    document.addEventListener("dragover", (e) => {
      if (e.target.classList.contains("gen-item__pic")) {
        e.preventDefault();
      }
    });

    document.addEventListener("drop", (e) => {
      if (e.target.classList.contains("gen-item__pic")) {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onload = (event) => {
            e.target.style.backgroundImage = `url(${event.target.result})`;
            e.target.style.backgroundSize = "100% 100%";
          };
          reader.readAsDataURL(files[0]);
        }
      }
    });
  }
  #bindDiffInputs() {
    const inputsArr = [...document.querySelectorAll("[data-diff-input]")];
    inputsArr.forEach((input) => {
      input.addEventListener("input", (e) => {
        let value = e.target.value;

        if (input.hasAttribute("data-input-ship")) {
          // Only allow numbers and decimal point for shipping
          value = value.replace(/[^\d.]/g, "");

          // Ensure only one decimal point
          const parts = value.split(".");
          if (parts.length > 2) {
            value = parts[0] + "." + parts.slice(1).join("");
          }

          // Limit to 2 decimal places
          if (parts.length === 2) {
            value = parts[0] + "." + parts[1].slice(0, 2);
          }

          // Remove leading zeros
          value = value.replace(/^0+(\d)/, "$1");
        } else {
          // Original handling for tax and discount
          value = value.replace(/[^\d.%]/g, "");
          value = value.replace(/^0+(\d)/, "$1");
          value = value.replace(/^%/, "");

          const parts = value.split(".");
          if (parts.length > 2) {
            value = parts[0] + "." + parts.slice(1).join("");
          }

          if (value.includes("%")) {
            value = value.split(".")[0];

            if (!/\d+%/.test(value)) {
              value = value.replace(/%/g, "");
            } else {
              let numValue = parseInt(value);
              if (numValue > 100) {
                numValue = 100;
              }
              value = numValue + "%";
            }
          } else {
            if (parts.length === 2) {
              value = parts[0] + "." + parts[1].slice(0, 2);
            }
          }
        }

        e.target.value = value;

        // Get the corresponding data-set element based on input type
        let setElements;
        if (input.hasAttribute("data-input-tax")) {
          setElements = this.currentTax;
        } else if (input.hasAttribute("data-input-ship")) {
          setElements = this.currentShipping;
        } else if (input.hasAttribute("data-input-discount")) {
          setElements = this.currentDiscount;
        }

        // Update the corresponding element's text content if found
        if (setElements) {
          setElements.forEach((elem) => {
            elem.textContent = value;
          });
          EventBus.getInstance().emit("updateCalculations");
        }
      });
    });
  }

  // -- EVENTS DELEGATION -- //
  #bindDocumentEvents() {
    document.addEventListener("click", this.#delegationEvents.bind(this));
  }
  #delegationEvents(e) {
    const target = e.target;

    // Bind Add New Item
    if (target.closest('[data-gen="addNewItem"]')) {
      EventBus.getInstance().emit("addNewItem");
    }

    // Bind Print
    if (target.closest("[data-do-print]")) {
      EventBus.getInstance().emit("print");
    }

    // Bind Download PDF
    if (target.closest("[data-do-pdf]")) {
      EventBus.getInstance().emit("downloadPDF");
    }
  }

  // -- ADD ITEM -- //
  #addNewItem() {
    this.table
      ?.querySelector("tbody")
      ?.appendChild(InvoiceGenerator.renderNewItem());
  }

  // -- CALCULATIONS -- //
  #calculate() {
    this.#calculateItems();
    this.#calculateTotal();
  }
  #calculateItems() {
    let allItemsAmount = 0;
    let allItemsQty = 0;

    for (const item of this.getItemsArr) {
      const itemQty = item.querySelector("[data-item-qty]");
      const itemUnitPrice = item.querySelector("[data-item-unit-price]");
      const itemAmount = item.querySelector("[data-item-amount]");

      const qtyNumber = Number(itemQty?.textContent);
      const unitPriceNumber = Number(itemUnitPrice?.textContent);

      // Check if any of the values are NaN
      if (anyIsNaN(qtyNumber, unitPriceNumber)) {
        itemAmount && (itemAmount.textContent = "Error");
        console.warn("#calculateItems - Error in item: ", item);
        continue;
      }

      const total = qtyNumber * unitPriceNumber;
      itemAmount && (itemAmount.textContent = total.toFixed(2));

      allItemsAmount += total;
      allItemsQty += qtyNumber;
    }

    // Check if any of the values are NaN
    if (anyIsNaN(allItemsAmount, allItemsQty)) {
      this.allItemsAmountElem &&
        (this.allItemsAmountElem.textContent = "Error");
      this.allItemsQtyElem && (this.allItemsQtyElem.textContent = "Error");
      console.warn("#calculateItems - Error in all items");
      return;
    }

    // Calculate Shipping
    const shippingNumber = Number(this.allItemsShippingElem?.textContent);
    if (!anyIsNaN(shippingNumber)) {
      allItemsAmount += shippingNumber;
    }

    this.allItemsQtyElem.textContent = allItemsQty;
    this.allItemsAmountElem.textContent = allItemsAmount.toFixed(2);
  }
  #calculateTotal() {
    let total = 0;

    const itemsTotal = Number(this.allItemsAmountElem?.textContent);
    const shippingTotal = Number(this.currentShipping[0]?.textContent || 0);
    const taxTotal = this.currentTax[0]?.textContent || "0";
    const discountTotal = this.currentDiscount[0]?.textContent || "0";

    if (isNaN(itemsTotal)) {
      console.warn("#calculateTotal - Error in items total");
      return;
    }

    total = itemsTotal;

    // Handle discount first
    if (String(discountTotal).endsWith("%")) {
      // Remove % and convert to number
      const discountPercent = parseFloat(String(discountTotal));
      if (!isNaN(discountPercent)) {
        total -= (total * discountPercent) / 100;
      }
    } else {
      const discount = Number(discountTotal);
      if (!isNaN(discount)) {
        total -= discount;
      }
    }

    // Handle tax
    if (String(taxTotal).endsWith("%")) {
      const taxPercent = parseFloat(String(taxTotal));
      if (!isNaN(taxPercent)) {
        total += (total * taxPercent) / 100;
      }
    } else {
      const tax = Number(taxTotal);
      if (!isNaN(tax)) {
        total += tax;
      }
    }

    // Add shipping
    // No need to calculate because itemsTotal is already with shipping fee

    // if (String(shippingTotal).endsWith("%")) {
    //   const shippingPercent = parseFloat(String(shippingTotal));
    //   if (!isNaN(shippingPercent)) {
    //     total += (total * shippingPercent) / 100;
    //   }
    // } else {
    //   if (!isNaN(shippingTotal)) {
    //     total += shippingTotal;
    //   }
    // }

    // Update total element
    this.currentTotal.forEach((elem) => {
      elem.textContent = Number(total).toFixed(2);
    });
  }

  // -- OTHER -- //
  setupNowDate() {
    const elemArrToSetup = [...document.querySelectorAll("[data-set-date]")];
    for (const elem of elemArrToSetup) {
      const today = new Date();
      const day = today.getDate().toString().padStart(2, "0");
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const year = today.getFullYear();
      elem.textContent = `${day}/${month}/${year}`;
    }
  }

  // -- PRINTING -- //
  print() {
    const element = document.querySelector(".gen-paper");
    if (!element) {
      console.error("Element .gen-paper not found");
      return;
    }

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(`
						<html>
						<head>
								<title>Print</title>
				`);

    const stylesheets = document.querySelectorAll(
      'link[rel="stylesheet"], style'
    );
    stylesheets.forEach((sheet) => {
      printWindow.document.write(sheet.outerHTML);
    });

    printWindow.document.write(`<base href="${window.location.href}">`);
    printWindow.document.write(`
        <style>
            * {
                pointer-events: none !important;
            }
            @page {
                size: letter;
                margin: 0.5in;
            }
            body {
                margin: 0;
                padding: 0;
            }
            .gen-paper {
                width: 100%;
                font-weight: 700 !important;
                box-sizing: border-box;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
                pointer-events: none !important;
            }
            .gen-table {
                font-weight: 700 !important;
            }
            .gen-paper h4 {
                font-weight: 800 !important;
            }
            .gen-paper h5 {
                font-weight: 800 !important;
            }
        </style>
    `);

    printWindow.document.write("</head><body>");
    printWindow.document.write(element.outerHTML);
    printWindow.document.write("</body></html>");
    printWindow.document.close();

    printWindow.document.fonts.ready.then(() => {
      printWindow.print();
      printWindow.onafterprint = () => printWindow.close();
    });
  }
  downloadPDF() {}
}

export default InvoiceGenerator;
