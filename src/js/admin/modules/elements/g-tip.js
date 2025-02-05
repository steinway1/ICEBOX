class GTip {
	constructor() {
		this.card = null;
		this.query = undefined;
		this.elem = document.querySelector('.g-tip');
		this.input = document.querySelector('.g-tip__input');
		if (this.elem && this.input) {
			this.extendElem();
			this.bindEvents();
		}
	}

	extendElem() {
		this.elem.setupLinks = () => {
			if (this.card) {
				const linksToHide = ['Contract', 'Sportrac'];
				const links = [...this.elem.querySelectorAll('a')];
				const attr = this.card.dataset.showContract;
				links.forEach((link) => {
					link.style.display = 'block';
				});
				if (!attr) {
					links.forEach((link) => {
						if (linksToHide.includes(link.textContent)) {
							link.style.display = 'none';
						}
					});
				}
			}
		};

		this.elem.open = () => {
			if (this.card) {
				const anchor = this.card.querySelector('.ext-search');
				if (anchor) {
					const rect = anchor.getBoundingClientRect();
					const box = this.elem;
					box.style.display = 'block';
					let left =
						rect.left > box.offsetWidth / 2
							? rect.left - box.offsetWidth / 2 + anchor.offsetWidth / 2
							: rect.left;
					let top =
						window.innerHeight - rect.bottom < box.offsetHeight + 20
							? window.scrollY + rect.top - box.offsetHeight - 10
							: window.scrollY + rect.top + anchor.offsetHeight + 10;

					if (left < 0) {
						left = 0;
					} else if (left + box.offsetWidth > window.innerWidth) {
						left = window.innerWidth - box.offsetWidth;
					}

					box.style.left = `${left}px`;
					box.style.top = `${top}px`;
				}
			}
		};

		this.elem.reset = () => {
			const box = this.elem;
			box.style.display = 'none';
			if (this.card) {
				this.card = null;
				this.query = undefined;
			}
		};

		this.elem.submit = () => {
			const query = `${this.query}`;
			const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
			window.open(url, '_blank');
		};
	}

	bindEvents() {
		const btnArr = [...document.querySelectorAll('[data-evt="openGoogleTip"]')];
		btnArr.forEach((btn) => {
			btn.onclick = (e) => {
				this.card = e.target.closest('.whale-card');
				this.elem.setupLinks();
				this.elem.open();
			};
		});

		const queries = [...document.querySelectorAll('.g-tip__queries a')];
		queries.forEach((query) => {
			query.onclick = (e) => {
				if (this.card) {
					const name = this.card.querySelector('.whale-card__name');
					if (name) {
						this.query = `${name.textContent} ${query.textContent}`;
						this.elem.submit();
					}
				}
			};
		});

		if (this.input) {
			this.input.onkeydown = (e) => {
				if (e.key === 'Enter') {
					e.preventDefault();
					if (this.card) {
						const name = this.card.querySelector('.whale-card__name');
						if (name) {
							this.query = `${name.textContent} ${this.input.value}`;
							this.elem.submit();
						}
					}
				}
			};
		}

		const submitInputArr = [...document.querySelectorAll('[data-evt="submitGoogleTip"]')];
		submitInputArr.forEach((btn) => {
			btn.onclick = () => {
				if (this.card) {
					const name = this.card.querySelector('.whale-card__name');
					if (name) {
						this.query = `${name.textContent} ${this.input.value}`;
						this.elem.submit();
					}
				}
			};
		});

		window.onscroll = () => {
			this.elem.reset();
		};

		document.addEventListener('click', (e) => {
			const target = e.target;
			if (!target.classList.contains('ext-search') && !target.closest('.g-tip')) {
				this.elem.reset();
			}
		});
	}
}

export function initGTip() {
	new GTip()
}