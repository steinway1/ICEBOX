import { getTransitionTime, lockScroll, unlockScroll } from '../general/utils'
import { getAdminUserName } from '../general/utils'
import { appendNewCustomer } from '../general/utils'
import { IS_ACTIVE, IS_HIDDEN } from '../general/constants'

class SwapModal {
	constructor() {
		this.newYorkMask = /new\s*york|nyc|yor/i;
		this.miamiMask = /miami|mia|iam/i;
		this.atlantaMask = /atlanta|atl|atlant(?!.*?(flag|flagship|ship))/i;
		this.flagshipMask = /flagship|flag/i;
		this.initialized = false;
		this.activeStore = undefined;
		this.elem = null;

		this.init()
	}

	init() {
		this.renderDOM();
		if (!this.elem) return;

		try {
			this.initFn.bindEvents.call(this);
			this.initFn.initialState.call(this);
		} catch (err) {
			throw new Error(`SwapModal initialization error: ${err.message}`);
		} finally {
			this.initialized = true;
		}
	}

	renderDOM() {
		this.elem = document.querySelector('.swap-modal');
	}

	open() {
		const input = this.elem.querySelectorAll('input')[0];
		lockScroll();
		this.elem.style.display = 'block';
		if (input) input.focus();
		setTimeout(() => {
			this.elem.classList.remove(IS_HIDDEN);
		}, 1);
	}

	close() {
		unlockScroll();
		this.elem.classList.add(IS_HIDDEN);
		setTimeout(() => {
			this.elem.style.display = 'none';
		}, getTransitionTime(this.elem));
	}

	toggle() {
		if (this.elem.style.display === 'none') {
			this.open();
		} else {
			this.close();
		}
	}

	renderCustomerHTML(name, number, instagram, email) {
		return `
      <tr>
        <td data-td="added_by">${getAdminUserName()}</td>
        <td data-td="name">${name}</td>
        <td data-td="number">${number}</td>
        <td>
          <a class="tb-social-btn instagram">
            <div>${instagram}</div>
          </a>
        </td>
        <td data-td="email">${email}</td>
        <td data-td="visit_date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
      </tr>
    `;
	}

	clear() {
		[...this.elem.querySelectorAll('input')].forEach(input => input.value = '');
	}

	getCustomerFromInputs() {
		const customer = {};
		const inputs = [...this.elem.querySelectorAll('input')];
		for (const input of inputs) {
			const id = input.id;
			const val = input.value;
			customer[id] = val || 'Empty';
		}
		return customer;
	}

	appendNewCustomer() {
		const customer = this.getCustomerFromInputs();
		if (!customer.full_name) throw new Error('Full name is required');
		const html = this.renderCustomerHTML(
			customer.full_name,
			customer.number,
			customer.instagram,
			customer.email
		);
		const store = this.activeStore;
		if (!store) throw new Error('No store selected');
		try {
			appendNewCustomer(store.querySelector('tbody'), html);
		} catch (err) {
			throw new Error(`appendNewCustomer error: ${err.message}`);
		} finally {
			this.clear();
			this.close();
		}
	}

	initFn = {
		initialState: () => {
			document.querySelectorAll('[data-store-nav]')[0]?.click();
			this.close();
		},

		bindEvents: () => {
			const close = [...document.querySelectorAll('[data-evt="closeSwapModal"]')];
			const open = [...document.querySelectorAll('[data-evt="addSaksCustomer"]')];
			const storeNavBtnArr = [...document.querySelectorAll('[data-store-nav]')];
			const stores = [...document.querySelectorAll('[data-store-id]')];
			const addBtnArr = [...document.querySelectorAll('[data-evt="addStoreCustomer"]')];
			const inputs = [...this.elem.querySelectorAll('input')];

			// Close modal
			for (const elem of close) {
				elem.onclick = () => {
					this.close();
				};
			}

			// Open modal
			for (const elem of open) {
				elem.onclick = () => {
					this.open();
				};
			}

			// Store switch
			for (const btn of storeNavBtnArr) {
				btn.onclick = () => {
					const storeId = btn.getAttribute('data-store-nav');
					if (!storeId) throw new Error('No store id found');
					const matchStore = stores.find(store => store.getAttribute('data-store-id') == storeId);
					if (!matchStore) throw new Error('No store found');
					this.activeStore = matchStore;

					const matching = storeNavBtnArr.filter(btn => btn.getAttribute('data-store-nav') == storeId);
					storeNavBtnArr.forEach(btn => btn.classList.remove(IS_ACTIVE));
					matching.forEach(btn => btn.classList.add(IS_ACTIVE));

					for (const store of stores) {
						store.style.display = 'none';
						if (store == matchStore) store.style.display = 'block';
					}
				};
			}

			// Add customer
			for (const btn of addBtnArr) {
				btn.onclick = () => {
					this.appendNewCustomer();
				};
			}

			// Input keydown
			for (const input of inputs) {
				input.onkeydown = (e) => {
					if (e.key === 'Enter') {
						this.appendNewCustomer();
					}
				};
			}
		},
	};
}

export function initSwapModal() {
	new SwapModal()
}