import "./modules/pages/globals";

import { ModalSearch } from "./modules/elements/modal-search";
import { ModalView } from "./modules/elements/modal-view";
import { ModalFilter } from "./modules/elements/modal-filter";
import { ModalSign } from "./modules/elements/modal-sign";
import { Menu } from "./modules/elements/menu";

import { initBehaviors } from "./modules/behaviors/init";

import { signModalStore } from "./store/sign-modal-store";

document.addEventListener("DOMContentLoaded", () => {
  initBehaviors();

  new ModalSearch();
  new ModalView();
  new ModalFilter();
  new ModalSign();
  new Menu();
});
