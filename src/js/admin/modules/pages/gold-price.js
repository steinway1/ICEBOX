export default class GoldPrice {
	constructor(rootEl) {
		this.rootEl = rootEl
		if (!this.rootEl) return

		this.table = this.rootEl.querySelector('[data-tb="gold_prices"]')
		this.init()
	}

	updateChanges() {
		if (this.table) {
			const rows = [...this.table.querySelectorAll('[data-row]')]
			rows.forEach((row, index, arr) => {
				const priceEl = row.querySelector('[data-price]')
				const prevPriceEl = arr[index + 1] ? arr[index + 1].querySelector('[data-price]') : null
				const changeEl = row.querySelector('[data-change]')

				if (priceEl && changeEl && prevPriceEl) {
					const price = Number(priceEl.innerHTML.replace(/[^0-9.]/g, ''))
					const prevPrice = Number(prevPriceEl.innerHTML.replace(/[^0-9.]/g, ''))
					const change = (price - prevPrice).toFixed(2)
					const percentChange = ((change / prevPrice) * 100).toFixed(2)
					const sign = change > 0 ? '+' : '-'
					const resultHTML = `${sign} ${percentChange.replace(/\+|-/g, '')}% / ${sign} $${change.replace(/\+|-/g, '')}`
					changeEl.innerHTML = resultHTML

					if (change < 0) {
						changeEl.classList.add('--negative')
						priceEl.classList.add('--negative')
					} else {
						priceEl.classList.add('--positive')
					}
				} else {
					changeEl.classList.add('--na')
				}
			})
		}
	}

	init() {
		this.updateChanges()
	}
}