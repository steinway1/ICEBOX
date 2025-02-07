import Formatter from "./cell-formatter";
const formatter = new Formatter();

import { dateComparator, priceComparator } from "./comparators";

const column = {
  number: {
    field: "#",
    width: 98,
    filter: "agNumberColumnFilter",
    cellRenderer: (params) => formatter.number(params),
  },

  type: {
    field: "type",
    width: 140,
    filter: "agTextColumnFilter",
    cellRenderer: (params) => formatter.type(params),
    sortable: false,
  },

  pic: {
    field: "pic",
    width: 82,
    autoHeight: true,
    cellRenderer: (params) => formatter.pic(params),
    sortable: false,
  },

  title: {
    field: "title",
    autoHeight: true,
    filter: "agTextColumnFilter",
    sortable: false,
    cellRenderer: (params) => formatter.title(params),
  },

  category: {
    field: "category",
    cellRenderer: (params) => formatter.category(params),
    sortable: false,
  },

  date: {
    field: "date",
    cellRenderer: (params) => formatter.date(params),
    comparator: dateComparator,
  },

  receipt: {
    field: "receipt",
    cellRenderer: (params) => formatter.receipt(params),
    sortable: false,
  },

  po: {
    field: "po",
    cellRenderer: (params) => formatter.po(params),
    sortable: false,
  },

  style: {
    field: "style",
    cellRenderer: (params) => formatter.style(params),
    sortable: false,
  },

  info: {
    field: "info",
    autoHeight: true,
    cellRenderer: (params) => formatter.info(params),
    sortable: false,
  },

  status: {
    field: "status",
    cellRenderer: (params) => formatter.status(params),
    sortable: false,
  },

  price: {
    field: "price",
    cellRenderer: (params) => formatter.price(params),
    comparator: priceComparator,
  },

  vendor: {
    field: "vendor",
    cellRenderer: (params) => formatter.vendor(params),
    sortable: false,
  },

  manage: {
    field: "manage",
    autoHeight: true,
    cellRenderer: (params) => formatter.manage(params),
    sortable: false,
  },
};

const {
  number,
  type,
  pic,
  title,
  category,
  date,
  receipt,
  po,
  style,
  info,
  status,
  price,
  vendor,
  manage,
} = column;

export const manualColumnDefs = [
  number,
  type,
  pic,
  title,
  category,
  date,
  receipt,
  po,
  style,
  info,
  status,
  price,
  vendor,
  manage,
];

export const saksColumnDefs = [
  number,
  type,
  pic,
  title,
  status,
  date,
  receipt,
  po,
  style,
  info,
  price,
  vendor,
  manage,
];

export const autoColumnDefs = [
  pic,
  title,
  info,
  date,
  style,
  po,
  vendor,
  manage,
];

export const onlineColumnDefs = [
  number,
  pic,
  title,
  info,
  receipt,
  po,
  style,
  status,
  price,
  vendor,
  manage,
];
