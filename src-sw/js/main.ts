import "./modules/pages/globals";

import { ModalSearch } from "./modules/elements/modal-search";
import { ModalView } from "./modules/elements/modal-view";
import { ModalFilter } from "./modules/elements/modal-filter";
import { ModalSign } from "./modules/elements/modal-sign";
import { Menu } from "./modules/elements/menu";

import { initBehaviors } from "./modules/behaviors/init";
import { AdminBehaviors } from "./admin";

import { initPageTips } from "./modules/elements/page-tips";

document.addEventListener("DOMContentLoaded", () => {
  initBehaviors();

  new ModalSearch();
  new ModalView();
  new ModalFilter();
  new ModalSign();
  new Menu();

  new AdminBehaviors();

  initPageTips();
});
