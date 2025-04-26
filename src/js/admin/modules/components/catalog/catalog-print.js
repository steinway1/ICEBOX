import html2pdf from "html2pdf.js";
import PageMsg from "../../dynamic/page-msg";
import { appendPageLoader, removePageLoader } from "../../general/utils";

export default class CatalogPrint {
  constructor(catalogInstance) {
    this.catalogInstance = catalogInstance;
  }
  async waitForImagesToLoad(elem) {
    const images = elem.querySelectorAll("img");
    const promises = [];

    images.forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) {
        promises.push(
          new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          }),
        );
      }
    });

    await Promise.all(promises);
  }
  async print() {
    this.printElem = document.querySelector("#catalogList");

    if (!this.printElem) {
      new PageMsg({
        heading: "Print element not found",
        msg: `Please try again. Expected element with id="catalogPrint"`,
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
        useCORS: true,
        windowWidth: 8.5 * 96,
        windowHeight: 11 * 96,
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all"] },
    };

    appendPageLoader();
    await this.waitForImagesToLoad(this.printElem);
    html2pdf()
      .from(this.printElem)
      .set(options)
      .save()
      .then(() => {
        removePageLoader();
      });
  }
}
