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
		this.bindToggleSidebar();
		this.bindToggleNotes();
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
	bindToggleSidebar() {
		function updateTipText() {
			let tipText = !document.body.classList.contains('--hide-sidebar') ? 'Show Sidebar' : 'Hide Sidebar';
			return tipText;
		}

		const toggleSidebarElements = document.querySelectorAll('[data-evt="toggleSidebar"]');
		toggleSidebarElements.forEach((el) => {
			el.setAttribute('data-tip', updateTipText());

			el.addEventListener('click', () => {
				document.body.classList.toggle('--hide-sidebar');
				el.setAttribute('data-tip', updateTipText());
			})
		})
	}
	bindToggleNotes() {
		document.addEventListener('click', (e) => {
			if (e.target.dataset.evt === 'showRowNotes') {
				const tr = e.target.closest('tr');
				if (tr) {
					if (tr.classList.contains('--active')) {
						tr.classList.remove('--active');
						e.target.textContent = 'Show Notes';
					} else {
						tr.classList.add('--active');
						e.target.textContent = 'Hide Notes';
					}
				}
			}
		})
	}
}
