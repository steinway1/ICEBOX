import html2pdf from "html2pdf.js";
import PageMsg from "../../dynamic/page-msg";
import { appendPageLoader, removePageLoader } from "../../general/utils";

export default class CatalogPrint {
  constructor(catalogInstance) {
    this.catalogInstance = catalogInstance;
  }
  #updateElemToPrint() {
    const originalElem = document.querySelector("#catalogList");

    if (originalElem) {
      this.printElem = originalElem.cloneNode(true);
    }

    const cover = document.querySelector("#catalogCover");
    const contacts = document.querySelector("#catalogContacts");

    if (document.body.classList.contains("show-cover") && cover) {
      this.printElem.insertBefore(
        cover.cloneNode(true),
        this.printElem.firstChild,
      );
    }

    if (document.body.classList.contains("show-contacts") && contacts) {
      this.printElem.appendChild(contacts.cloneNode(true));
    }
  }


  async print() {
    this.#updateElemToPrint();

    if (!this.printElem) {
      new PageMsg({
        heading: "Print element not found",
        msg: `Please try again. Expected element with id="catalogList"`,
        type: "error",
      });
      return;
    }

    const options = {
      margin: 0,
      filename: `${this.catalogInstance?.selectedCollection?.title || "catalog"}.pdf`,
      image: { type: "jpg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        windowWidth: 8.5 * 96,
        windowHeight: 11 * 96,
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    appendPageLoader();
    html2pdf()
      .from(this.printElem)
      .set(options)
      .save()
      .then(() => {
        removePageLoader();
      });
  }
}
