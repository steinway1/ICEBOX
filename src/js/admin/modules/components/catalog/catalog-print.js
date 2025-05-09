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
      this.printElem.insertBefore(cover.cloneNode(true), this.printElem.firstChild);
    }

    if (document.body.classList.contains("show-contacts") && contacts) {
      this.printElem.appendChild(contacts.cloneNode(true));
    }
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

    appendPageLoader();

    const settings = this.catalogInstance.settings;
    const params = settings?.params;
    const bodyClassname = settings?.bodyClassname;
    var pageCss =  $('body').attr('class');
    fetch("/admin/ajax/generate-catalog-pdf?class="+pageCss, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          new PageMsg({
            heading: "Error",
            msg: `Pdf generation failed, please try again`,
            type: "error",
          });
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        removePageLoader();
        a.href = url;
        a.download = "catalog.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        removePageLoader();
        new PageMsg({
          heading: "Error",
          msg: `Pdf generation failed, please try again`,
          type: "error",
        });
      });
  }
}
