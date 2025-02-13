import ManufactureGrid from "../components/manufacture/manufacture-grid";
import { IS_ACTIVE } from "../general/constants";

export default class Manufacture {
  /**
   * Types Handler {@link ManufactureGrid}
   * @type {string[]}
   */
  #GridTypesToRender = ["manual", "saks", "auto", "online"];

  constructor(rootEl) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;

    this.init();
  }

  init() {
    this.bindViewSwitch();
  }
  initGrids() {
    for (const type of this.#GridTypesToRender) {
      new ManufactureGrid(type);
    }
  }

  // Events
  bindViewSwitch() {
		const viewSwitchElements = document.querySelectorAll('[data-view]');

		viewSwitchElements.forEach((view) => {
			view.addEventListener('click', () => {
				viewSwitchElements.forEach((el) => el.classList.remove(IS_ACTIVE));
				view.classList.add(IS_ACTIVE);

				const { view: viewType } = view.dataset;
	
				document.body.classList.remove('--grid', '--row');
	
				if (viewType === 'grid') {
					document.body.classList.add('--grid');
				} else if (viewType === 'rows') {
          document.body.classList.add("--row");
        }
      });
    });
  }
}
