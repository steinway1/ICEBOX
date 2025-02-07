window.$ = window.jQuery = require("jquery");

// Utils
import { onContentLoaded } from "./modules/general/utils";

// Pages
import { initPage } from "./page-manager";
import { initPageElements } from "./page-elements";
import { initPageEvents } from "./page-events";

// Initialization
onContentLoaded(() => {
  initPage();
  initPageElements();
  initPageEvents();
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
