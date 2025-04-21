import UISelect from "./modules/ui/ui-select";

/**
 * Class to initialize all UI elements
 * @class
 */
class UI {
  constructor() {
    this.UISelectInstance = new UISelect();
    this.#init();
  }
  /**
   * Private method to initialize all UI elements
   */
  #init() {
    this.bindSelect();
  }

  /**
   * Bind all select elements
   */
  bindSelect() {
    const selectArr = document.querySelectorAll(".ui-select");
    selectArr.forEach((select) => {
      this.UISelectInstance.bind(select);
    });
  }
}

/**
 * Initialize all UI elements
 */
function initUI() {
  new UI();
}

export default initUI;
