import { ModalSearch } from "./modules/elements/modal-search";
import { ModalView } from "./modules/elements/modal-view";
import { ModalFilter } from "./modules/elements/modal-filter";
import { Menu } from "./modules/elements/menu";

document.addEventListener("DOMContentLoaded", () => {
  new ModalSearch();
  new ModalView();
  new ModalFilter();
  new Menu();
});
