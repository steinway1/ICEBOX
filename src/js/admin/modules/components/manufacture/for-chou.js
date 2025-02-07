import Manufacture from "../../pages/manufacture";
import ManufactureGrid from "./manufacture-grid";
import Formatter from "./cell-formatter";
import { createGrid } from "ag-grid-community";
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

import {
  getFakeManualData,
  getFakeSaksData,
  getFakeAutoData,
  getFakeOnlineData,
} from "./manufacture-fake-data";

import {
  manualOrder,
  saksOrder,
  autoOrder,
  onlineOrder,
} from "./for-chou-interfaces";

/**
 * 
 * 
 *  -- -- Section 1 - Basic. How it works. -- --
 *
 * 
 * We use this {@link Manufacture.initGrids} function to initialize the grids.
 * In this function we loop through the {@link Manufacture.#GridTypesToRender} and create a new instance of {@link ManufactureGrid} for each type.
 *
 *
 * class {@link ManufactureGrid} uses the ag-grid library and {@link createGrid} function to create the grid.
 * class {@link ManufactureGrid} has the private field {@link ManufactureGrid.#GridConfig} which contains the configuration for each type of grid.
 *
 *
 * Each of the grid configuration has the following fields:
 * - {@link ManufactureGrid.#GridConfig.selector} - the selector for the grid.
 * - {@link ManufactureGrid.#GridConfig.columnDefs} - the column definitions for the grid.
 * - {@link ManufactureGrid.#GridConfig.ajaxGetTableData} - the ajax function to get the data for the grid.
 * Ajax function must return the data that matches the column definitions.
 *
 *
 * To setup the grid settings we use the {@link setupGrid} function.
 * This function takes the column definitions and the ajax function as parameters and returns the grid settings.
 *
 *
 * Column definitions are pre-defined in the
 * {@link manualColumnDefs},
 * {@link saksColumnDefs},
 * {@link autoColumnDefs},
 * {@link onlineColumnDefs}
 * files.
 * We don't need to get the data from the server for these columns, because they are static.
 *
 *
 * The second parameter for {@link setupGrid} is the ajax function.
 * This function must return the promise that resolves to the data.
 * Samples of ajax functions are in the
 * {@link fakeAjaxGetManualData},
 * {@link fakeAjaxGetSaksData},
 * {@link fakeAjaxGetAutoData},
 * {@link fakeAjaxGetOnlineData}
 * files.
 * These functions should be replaced with the real ones.
 *
 *
 * The data that we retrieve from these functions must match the column definitions.
 * The samples of the data for each type of grid are in the
 * {@link getFakeManualData},
 * {@link getFakeSaksData},
 * {@link getFakeAutoData},
 * {@link getFakeOnlineData}
 * files.
 *
 */



/**
 * 
 * 
 *  -- -- Section 2 - TODO. -- --
 *
 * 
 * 1. Add real ajax function to get data for Manual grid.
 * You can add this function to this file: {@link fakeAjaxGetManualData} . './manufacture-ajax.js'
 * The data that we get from this function MUST match interface {@link manualOrder}
 *
 *
 * 2. Add real ajax function to get data for Saks grid.
 * You can add this function to this file: {@link fakeAjaxGetSaksData} . './manufacture-ajax.js'
 * The data that we get from this function MUST match interface {@link saksOrder}
 *
 *
 * 3. Add real ajax function to get data for Auto grid.
 * You can add this function to this file: {@link fakeAjaxGetAutoData} . './manufacture-ajax.js'
 * The data that we get from this function MUST match interface {@link autoOrder}
 *
 *
 * 4. Add real ajax function to get data for Online grid.
 * You can add this function to this file: {@link fakeAjaxGetOnlineData} . './manufacture-ajax.js'
 * The data that we get from this function MUST match interface {@link onlineOrder}
 * 
 * 
 * 5. Export these functions and import it in the {@link ManufactureGrid} file.
 *
 * 
 * 6. In this class {@link ManufactureGrid} you can see private field {@link ManufactureGrid.#GridConfig}
 * There are comments that says "// @CHOU Replace here".
 * Replace the functions that you added in the previous steps with the real ones.
 * 
 * 
 * 7. Check the correct COLUMNS definitions in the
 * {@link manualColumnDefs},
 * {@link saksColumnDefs},
 * {@link autoColumnDefs},
 * {@link onlineColumnDefs}
 * files.
 * 
 * 
 * 8. Some cells has select dropdown.
 * There are some pre-defined options by default.
 * Check if all pre-defined data for select dropdown is correct here:
 * {@link Formatter}
 * 
 * Product categories:
 * {@link Formatter.categories}
 * 
 * Order Statuses:
 * {@link Formatter.statuses}
 * 
 * Available Vendors:
 * {@link Formatter.vendors}
 * 
 */
