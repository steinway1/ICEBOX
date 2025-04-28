import { getTransitionTime } from "../general/utils";

/**
 * Class to handle UI select elements
 * @class
 */
class UISelect {
  /**
   * Constructor for UISelect class
   * @param {Object} options - Configuration options
   * @param {string} options.activeClass - Class for active state
   * @param {string} options.btnClass - Class for button element
   * @param {string} options.dropClass - Class for dropdown element
   * @param {string} options.listClass - Class for list element
   */
  constructor({ activeClass = "--active", uiClass = ".ui-select", btnClass = ".ui-select__btn", dropClass = ".ui-select__drop", selectedClass = "--selected", searchSelector = "[data-select-search]", currentSelector = "[data-current]", listClass = ".ui-select__list" } = {}) {
    this.activeClass = activeClass;
    this.btnClass = btnClass;
    this.dropClass = dropClass;
    this.listClass = listClass;
    this.selectedClass = selectedClass;
    this.searchSelector = searchSelector;
    this.currentSelector = currentSelector;

    this.bindedSet = new WeakSet();
    this.activeSet = new Set();

    document.addEventListener("click", (e) => {
      if (!e.target.closest(uiClass) && this.activeSet.size) {
        this.activeSet.forEach((select) => {
          this.hide(select);
        });
      }
    });
  }

  /**
   * Bind the select element
   * @param {Element} select - The select element
   */
  bind(select) {
    if (this.bindedSet.has(select)) return;
    this.bindedSet.add(select);

    const { btn, drop, list, search, labels, current } = this.getDOM(select);
    if (!btn || !drop || !list) return;

    this.update(select);

    /**
     * Toggle visibility of the select element
     * @param {Element} btn - The button element
     */
    document.addEventListener("click", (e) => {
      const { target } = e;
      if (btn.contains(target)) {
        e.stopPropagation();
        this.toggle(select);
      }
    });

    /**
     * Search within the select element
     * @param {Element} search - The search element
     */
    if (search) {
      search.addEventListener("input", () => {
        const searchTerm = search.value.toLowerCase();

        labels.forEach((label) => {
          const labelText = label.textContent.toLowerCase();
          const isVisible = !searchTerm || labelText.includes(searchTerm);
          label.style.display = isVisible ? "block" : "none";
        });
      });
    }

    /**
     * Bind Labels Change to current element
     */
    if (current) {
      labels.forEach((label) => {
        const input = label.querySelector("input[type='radio']");
        if (!input) return;

        input.addEventListener("change", () => {
          this.update(select);
        });
      });
    }
  }

  /**
   * Get DOM elements for the select element
   * @param {Element} select - The select element
   * @returns {Object} DOM elements
   */
  getDOM(select) {
    const btn = select.querySelector(this.btnClass);
    const drop = select.querySelector(this.dropClass);
    const list = drop ? drop.querySelector(this.listClass) : null;
    const search = drop ? drop.querySelector(this.searchSelector) : null;
    const labels = list ? [...list.querySelectorAll("label")] : null;
    const current = select.querySelector(this.currentSelector);

    if (!btn || !drop || !list) {
      console.warn("Incorrect select structure", select);
      return;
    }
    return { btn, drop, list, search, labels, current };
  }

  /**
   * Show the select element
   * @param {Element} select - The select element
   */
  show(select) {
    if (this.activeSet.has(select)) return;
    this.activeSet.add(select);

    if (this.activeSet.size) {
      this.activeSet.forEach((select2) => {
        if (select2 !== select) {
          this.hide(select2);
        }
      });
    }

    const { drop } = this.getDOM(select);

    drop.style.display = "block";
    requestAnimationFrame(() => {
      select.classList.add(this.activeClass);
    });
  }

  /**
   * Hide the select element
   * @param {Element} select - The select element
   */
  hide(select) {
    if (!this.activeSet.has(select)) return;
    this.activeSet.delete(select);

    const { drop, list } = this.getDOM(select);
    select.classList.remove(this.activeClass);

    setTimeout(() => {
      drop.style.display = "none";
    }, getTransitionTime(list));
  }

  /**
   * Toggle the select element
   * @param {Element} select - The select element
   */
  toggle(select) {
    if (select.classList.contains(this.activeClass)) {
      this.hide(select);
    } else {
      this.show(select);
    }
  }

  /**
   * Update the current element
   * @param {Element} select - The select element
   */
  update(select) {
    const { current, labels } = this.getDOM(select);
    const defaultText = select.querySelector("[data-empty-text]")?.textContent ?? "No selected";
    const activeLabel = this.getActiveLabel(labels);

    this.updateCurrentText(current, activeLabel?.textContent ?? defaultText);
    this.toggleSelectedClass(select, !!activeLabel);
  }

  reset(select) {
    const { list } = this.getDOM(select);
    list.scrollTop = 0;

    const searchInput = list.querySelector("[data-select-search]");
    if (searchInput) {
      searchInput.value = "";
    }

    this.update(select);
  }

  getActiveLabel(labels) {
    return [...labels].find((label) => label.querySelector("input[type='radio']").checked);
  }

  updateCurrentText(current, text) {
    current.textContent = text;
  }

  toggleSelectedClass(select, isSelected) {
    select.classList.toggle(this.selectedClass, isSelected);
  }
}

export default UISelect;
