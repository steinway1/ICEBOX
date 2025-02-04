import Inventory from './modules/pages/inventory'

class PageManager {
  constructor() {
    this.pageComponents = {
      inventory: {
        instance: Inventory,
        rootSelector: '.main_inventory'
      }
    }
    this.#init()
  }
  #init() {
    this.#initPages()
  }

  #initPages() {
    for (const key in this.pageComponents) {
      const component = this.pageComponents[key]
      const rootEl = document.querySelector(component?.rootSelector)
      if (!rootEl) continue
      new component.instance(rootEl)
    }
  }
}

export function initPage() {
  new PageManager()
}