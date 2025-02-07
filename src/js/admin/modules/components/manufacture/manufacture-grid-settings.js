import { themeQuartz } from "ag-grid-community";

const gridTheme = {
  suppressRowHoverHighlight: true,
  overlayLoadingTemplate:
    '<div class="ag-overlay-loading-center">Data is loading...</div>',
  loading: true,
  theme: themeQuartz.withParams({
    accentColor: "#1787EE",
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E4EC",
    borderRadius: 3,
    fontFamily: "inherit",
    columnBorder: { color: "#E0E4EC" },
    fontSize: 13,
    foregroundColor: "#2C364B",
    headerBackgroundColor: "#FFFFFF",
    headerFontSize: 13,
    headerFontWeight: 600,
    headerVerticalPaddingScale: 1.6,
    spacing: 6,
    wrapperBorderRadius: 0,
  }),
};

const autoSizeColumns = [
  "pic",
  "date",
  "receipt",
  "po",
  "style",
  "price",
  "manage",
];

function setupGrid(columnDefs, ajaxGetTableData) {
  return {
    ...gridTheme,
    pagination: true,
    paginationPageSize: 20,
    paginationPageSizeSelector: [20, 30, 40, 50, 100, 1000],
		alwaysShowHorizontalScroll: true,
    onGridReady: async (params) => {
      const gridApi = params.api;
      try {
        const data = await ajaxGetTableData();

        if (!data) {
          throw new Error("No data returned");
        }

        gridApi.setGridOption("columnDefs", columnDefs);
        gridApi.setGridOption("rowData", data);
        gridApi.autoSizeColumns(autoSizeColumns);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        gridApi.setGridOption("loading", false);
      }
    },
  };
}

export { setupGrid };
