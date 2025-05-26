import {
  updateInputsAllowOnlyDecimals,
  initLottieElements,
  bindToggleCustomerRows,
  bindFingerSizeInput,
  attachDatePickers,
  updateLiveDateTime,
  bindCopyOrderDetails,
  initSelectStates,
  bindRemoveNote,
  wrapKeywordsElements,
  shieldCodeElements,
  bindCopyCodeBtn,
  bindToggleSpaceBox,
  bindToggleSpaceTheme,
  bindInputDecimals,
  bindClipboardContent,
} from './modules/general/init-fn';

import { initToolbar } from './modules/elements/tool-bar';
import { initPageTips } from './modules/elements/page-tips';
import { initOrderNotes } from './modules/elements/order-notes';
import { initPageSearch } from './modules/elements/page-search';
import { initPageMenu } from './modules/elements/page-menu';
import { initPageSidebar } from './modules/elements/page-sidebar';
import { initGTip } from './modules/elements/g-tip';
import { initWhaleCards } from './modules/elements/whale-cards';
import { initEditModal } from './modules/elements/edit-modal';
import { initSwapModal } from './modules/elements/swap-modal';
import { initAddModal } from './modules/elements/add-modal';
import { initOrdersModal } from './modules/elements/orders-modal';
import { initFingerModal } from './modules/elements/fingers-modal';
import { initPsSelect } from './modules/elements/ps-select';

class PageElements {
  constructor() {
    this.initFnArr = [
      updateInputsAllowOnlyDecimals,
      initLottieElements,
      initToolbar,
      initPageTips,
      initOrderNotes,
      initPageSearch,
      initPageMenu,
      initPageSidebar,
      initGTip,
      initWhaleCards,
      initEditModal,
      initSwapModal,
      initAddModal,
      initOrdersModal,
      initFingerModal,
      initPsSelect,
      bindToggleCustomerRows,
      bindFingerSizeInput,
      attachDatePickers,
      updateLiveDateTime,
      bindCopyOrderDetails,
      initSelectStates,
      bindRemoveNote,
      wrapKeywordsElements,
      shieldCodeElements,
      bindCopyCodeBtn,
      bindToggleSpaceBox,
      bindToggleSpaceTheme,
      bindInputDecimals,
      bindClipboardContent,
    ];
    this.#init();
  }
  #init() {
    for (const fn of this.initFnArr) {
      if (fn && typeof fn === 'function') {
        fn();
      }
    }
  }
}

export function initPageElements() {
  new PageElements();
}
