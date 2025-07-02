import "./modules/pages/globals";

import { ModalSearch } from "./modules/elements/modal-search";
import { ModalView } from "./modules/elements/modal-view";
import { ModalFilter } from "./modules/elements/modal-filter";
import { Menu } from "./modules/elements/menu";
import { toggleDocumentLoading } from "./modules/pages/globals";
import doc from "pdfkit";

document.addEventListener("DOMContentLoaded", () => {
  new ModalSearch();
  new ModalView();
  new ModalFilter();
  new Menu();
});
