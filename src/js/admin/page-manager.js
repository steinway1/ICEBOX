import Inventory from "./modules/pages/inventory";
import GoldPrice from "./modules/pages/gold-price";
import SMS from "./modules/pages/sms";
import PosPage from "./modules/pages/pos";
import PrintTag from "./modules/pages/print-tag";
import WhalesPage from "./modules/pages/whales";
import FinanceList from "./modules/pages/finance-list";
import Manufacture from "./modules/pages/manufacture";
import InvoiceGenerator from "./modules/pages/invoice-generator";
import Seo from "./modules/pages/seo";
import Catalog from "./modules/pages/catalog";

class PageManager {
  constructor() {
    this.pageComponents = {
      inventory: {
        instance: Inventory,
        rootSelector: ".main_inventory",
      },
      goldPrice: {
        instance: GoldPrice,
        rootSelector: ".main_gold",
      },
      sms: {
        instance: SMS,
        rootSelector: "#sms_board",
      },
      PosPage: {
        instance: PosPage,
        rootSelector: ".main_pos",
      },
      PrintTag: {
        instance: PrintTag,
        rootSelector: ".main_print-tag",
      },
      WhalesPage: {
        instance: WhalesPage,
        rootSelector: ".main_whales",
      },
      FinanceList: {
        instance: FinanceList,
        rootSelector: ".main_fin_list",
      },
      Manufacture: {
        instance: Manufacture,
        rootSelector: ".body_manufacture",
      },
      InvoiceGenerator: {
        instance: InvoiceGenerator,
        rootSelector: ".body_invoice_generator",
      },
      Seo: {
        instance: Seo,
        rootSelector: ".body_seo",
      },
      Catalog: {
        instance: Catalog,
        rootSelector: ".body_catalog",
      },
    };
    this.#init();
  }
  #init() {
    this.#initPages();
  }

  #initPages() {
    for (const key in this.pageComponents) {
      const component = this.pageComponents[key];
      const rootEl = document.querySelector(component?.rootSelector);
      if (!rootEl) continue;
      new component.instance(rootEl);
    }
  }
}

export function initPage() {
  new PageManager();
}
