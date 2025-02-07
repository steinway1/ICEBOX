import {
  AllCommunityModule,
  ModuleRegistry,
  createGrid,
  provideGlobalGridOptions,
} from "ag-grid-community";
ModuleRegistry.registerModules([AllCommunityModule]);
provideGlobalGridOptions({ theme: "legacy" });

/**
 * setupGrid is a function that returns the grid options
 * it takes columnDefs and ajaxGetTableData as parameters
 * columnDefs is an array of column definitions and pre-defined in:
 *  @see {@link manualColumnDefs}
 *
 * ajaxGetTableData is an ajax function that returns the data
 * sample implementation:
 *  @see {@link fakeAjaxGetManualData}
 */
import { setupGrid } from "./manufacture-grid-settings";
import {
  manualColumnDefs,
  saksColumnDefs,
  autoColumnDefs,
  onlineColumnDefs,
} from "./manufacture-columns";
import {
  fakeAjaxGetManualData,
  fakeAjaxGetSaksData,
  fakeAjaxGetAutoData,
  fakeAjaxGetOnlineData,
} from "./manufacture-ajax";

export default class ManufactureGrid {
  #GridConfig = {
    manual: {
      selector: "#manufactureManualGrid",
      columnDefs: manualColumnDefs,
      /**
       * @CHOU Replace here
       * put the correct ajax function here
       */
      ajaxGetTableData: fakeAjaxGetManualData,
    },
    saks: {
      selector: "#manufactureSaksGrid",
      columnDefs: saksColumnDefs,
      /**
       * @CHOU Replace here
       * put the correct ajax function here
       */
      ajaxGetTableData: fakeAjaxGetSaksData,
    },
    auto: {
      selector: "#manufactureAutoGrid",
      columnDefs: autoColumnDefs,
      /**
       * @CHOU Replace here
       * put the correct ajax function here
       */
      ajaxGetTableData: fakeAjaxGetAutoData,
    },
    online: {
      selector: "#manufactureOnlineGrid",
      columnDefs: onlineColumnDefs,
      /**
       * @CHOU Replace here
       * put the correct ajax function here
       */
      ajaxGetTableData: fakeAjaxGetOnlineData,
    },
  };

  constructor(type) {
    this.type = type;
    this.init();
  }

  init() {
    const typeInstance = this.#GridConfig[this.type];
    if (!typeInstance) {
      console.warn(`Grid type ${this.type} not found`);
      return;
    }

    const { columnDefs, selector, ajaxGetTableData } = typeInstance;
    const gridContainer = document.querySelector(selector);

    if (!gridContainer) {
      console.warn(`Grid container ${selector} not found`);
      return;
    }

    createGrid(gridContainer, setupGrid(columnDefs, ajaxGetTableData));
  }
}
