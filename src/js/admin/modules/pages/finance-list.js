import $ from 'jquery'
import { getTransitionTime } from '../general/utils'
import AskModal from '../dynamic/ask-modal'
import LockPin from '../dynamic/lock-pin'

export default class FinanceList {
	constructor(rootEl) {
		this.rootEl = rootEl;
		if (!this.rootEl) return

		this.submitToRemove = null;
		this.init();
	}

	init() {
		if (document.querySelector('.main_fin_list') !== null) {
			for (const elem of Object.values(this.bindEvents)) {
				if (elem !== undefined && typeof elem === 'function') {
					try {
						elem.call(this);
					} catch (err) {
						console.log(`FinanceList init fn err: ${err.message}`);
					}
				}
			}
			this.lockPIN();
		}
	}

	lockPIN() {
		const lockPIN = new LockPin({
			code: 3256,
		});
		lockPIN.push();

		document.addEventListener('click', (e) => {
			const target = e.target;
			if (
				target.closest('.fin-item__details') &&
				target.hasAttribute('data-locked')
			) {
				const callback = () => {
					target.removeAttribute('data-locked');
				};
				const pin = new LockPin({
					code: 3256,
					callback: callback,
				});
				pin.push();
			}
		});
	}

	deleteSubmit(submit) {
		if (submit) {
			const currentHeight = submit.offsetHeight;
			submit.style.height = `${currentHeight}px`;
			submit.style.pointerEvents = 'none';
			setTimeout(() => {
				submit.style.opacity = 0;
				submit.style.transform = 'translateY(-12px)';
				submit.style.height = `0px`;
				setTimeout(() => {
					submit.remove();
				}, getTransitionTime(submit));
			}, 5);
		}
	}

	bindEvents = {
		documentEvents: function () {
			document.addEventListener('click', (e) => {
				const application_id = $(e.target).attr('data-id');

				// Remove Submit
				if (e.target.closest('[data-evt="remove_fin_item"]')) {
					const submit = e.target.closest('.fin-item');
					if (submit !== null) {
						const remove = () => {
							this.deleteSubmit(submit);
						};
						const ask = new AskModal({
							heading: 'Delete This Application?',
							subheading: 'This application will be permanently deleted',
							exitText: 'Back',
							submitText: 'Delete',
							submitCallback: [remove],
						});
						ask.show();
					}
				}

				// Edit modal
				if (e.target.closest('[data-evt="edit_fin_item"]')) {
					alert('Open Edit Modal');
				}
			});
		},

		temp: function () {
			return;
			const modal = document.querySelector('.edit-modal');
			const backdrop = document.querySelector('.edit-modal__backdrop');
			const container = document.querySelector('.edit-modal__container');
			if (modal) {
				modal.style.display = 'block';
				backdrop.style.opacity = 1;
				container.style.transform = 'translateX(0)';
			}
		},
	};
}