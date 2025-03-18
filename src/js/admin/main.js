window.$ = window.jQuery = require("jquery");

// Utils
import { onContentLoaded } from "./modules/general/utils";

// Pages
import { initPage } from "./page-manager";
import { initPageElements } from "./page-elements";
import { initPageEvents } from "./page-events";
import PageMsg from "./modules/dynamic/page-msg";
import { initGTip } from "./modules/elements/g-tip";

import { EditModal } from "./modules/elements/edit-modal";

// Initialization
onContentLoaded(() => {
  initPage();
  initPageElements();
  initPageEvents();

  window.showMessage = (settings = {}) => {
    new PageMsg(settings);
  };

  // Google Tips
  window.initGTip = initGTip;

  // editModal
  window.editModal = new EditModal();
});

// Manual Order
import { deleteManualOrder } from "./page-global";
import ManualOrderPopup from "./modules/manual-order/manual-popup";

onContentLoaded(() => {
  window.deleteManualOrder = deleteManualOrder;
  window.addManualOrder = () => {
    new ManualOrderPopup();
  };
  window.editManualOrder = (orderID) => {
    new ManualOrderPopup(orderID);
  };
});
