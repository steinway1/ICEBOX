import { getTransitionTime } from '../general/utils'
import { IS_VISIBLE } from '../general/constants'

/**
* Swiper component for customer relationship management interface.
* Allows navigation through cards representing different entities or data points.
*
* @class
* @param {Object} settings - Configuration settings for the swiper component.
* @param {HTMLElement} initialCard - The initial card to be displayed on swiper load.
*/
export default class CrmSwiper {
	constructor(settings, initialCard) {
		this.settings = {
			startEvents: settings.startEvents || ['mousedown', 'touchstart', 'click'],
			endEvents: settings.endEvents || ['mouseup', 'touchend'],
			moveEvents: settings.moveEvents || ['mousemove', 'touchmove'],
			maxPrevCards: settings.maxPrevCards || 50,
			maxNextCards: settings.maxNextCards || 50,
			loadMoreAmount: settings.loadMoreAmount || 50,
			autoLoad: settings.autoLoad || false
		}
		this.initialized = false
		this.opened = false
		this.initialCard = initialCard || document.querySelectorAll('#grid_view .whale-card')[0]
		this.anchorCard = null
		this.anchorCardIndex = undefined
		this.activeCard = null
		this.lastActive = undefined
		this.nextCards = []
		this.prevCards = []
		this.storage = []
		this.cardClass = 'whale-card'
		this.swiperClass = 'swiper__card'
		this.stashClass = '--stash'
		this.highlightClass = '--highlight'
		this.emptyClass = '--empty'
		this.keyEvents = ['ArrowLeft', 'ArrowRight', 'Escape']
		this.modal = document.querySelector('.swiper')
		this.holder = document.querySelector('.swiper__cards')
		this.stash = document.querySelector('.swiper__stash')
		this.grid = document.querySelector('.tb-grid')
		this.evtNextArr = [...document.querySelectorAll('[data-swiper-evt="nextCard"]')]
		this.evtPrevArr = [...document.querySelectorAll('[data-swiper-evt="prevCard"]')]
		this.evtClose = [...document.querySelectorAll('[data-swiper-evt="close"]')]
		this.evtLoadMore = [...document.querySelectorAll('[data-swiper-evt="loadMore"]')]
	}

	/**
	 * Settings basic methods
	 * 
	 * @anchor {HTMLElement}
	 * @cards {Array}
	 * @initialCard {HTMLElement}
	 * @index {Number}
	 */
	get getGridCards() {
		if (this.grid) {
			return [...this.grid.querySelectorAll('.whale-card')]
		}
	}
	get getAllSwiperCards() {
		if (this.holder) {
			return [...this.holder.querySelectorAll('.whale-card')]
		}
	}
	get getLastActive() {
		return this.holder.querySelectorAll('.swiper__card').length ?
			[...this.holder.querySelectorAll('.swiper__card')].at(-1) :
			[...this.stash.querySelectorAll('.swiper__card')].at(-1)
	}
	addCardsToSwiper(cardsArr) {
		if (Array.isArray(cardsArr)) for (const card of cardsArr) {
			if (card) {
				card.classList.add(this.swiperClass)
				card.classList.add(this.stashClass)
				this.holder.appendChild(card)
				setTimeout(() => {
					card.classList.remove(this.stashClass)
				}, 1);
			} else {
				throw new Error('JS : Add Cards To Swiper Error')
			}
		}
	}
	addCardsToStash(cardsArr) {
		if (Array.isArray(cardsArr)) {
			for (const card of cardsArr) {
				if (card) {
					card.classList.add(this.swiperClass)
					card.classList.add(this.stashClass)
					this.stash.appendChild(card)
				} else {
					throw new Error('JS : Add Cards To Stash Error')
				}
			}
		}
	}
	setAnchor(index) {
		this.anchorCard = this.getGridCards[index] || undefined
	}
	findCardIndexInGrid(card) {
		return this.getGridCards.indexOf(card)
	}

	/**
	 * Initial setup
	 * Set anchor
	 * Add cards to stash
	 * Add cards to swiper 
	 * 
	 * Open {@link CrmSwiper#open}
	 * Attach events {@link CrmSwiper#attachEvents}
	 */
	initialSetup() {
		if (this.initialCard) {
			this.setAnchor(this.findCardIndexInGrid(this.initialCard) + this.settings.maxNextCards + 1)
			let next = this.initialCard.nextElementSibling
			let prev = this.initialCard.previousElementSibling

			while (next && this.nextCards.length < this.settings.maxNextCards) {
				this.nextCards = [...this.nextCards, next]
				next = next.nextElementSibling
			}
			this.nextCards = [this.initialCard, ...this.nextCards]
			while (prev && this.prevCards.length < this.settings.maxPrevCards) {
				this.prevCards = [...this.prevCards, prev]
				prev = prev.previousElementSibling
			}
			try {
				this.addCardsToStash(this.prevCards.reverse())
				this.addCardsToSwiper(this.nextCards.reverse())
				this.open()
				this.attachEvents()
			} catch (err) {
				throw new Error(`JS Initial Swiper Setup Error: ${err.message}`)
			}
		}
	}

	/**
	 * Class methods
	 * Initializes swiper
	 * 
	 * @initial {HTMLElement}
	 */
	init() {
		if (this.modal && this.getGridCards.length && this.initialCard) {
			this.initialized = true
			this.initialSetup()
		}
	}
	next() {
		const card = [...this.holder.querySelectorAll('.whale-card')].at(-1)
		if (!card) return
		this.nextCards = this.nextCards.filter((c) => c !== card)
		this.prevCards = [...this.prevCards, card]
		card.classList.add(this.stashClass)
		this.checkCardsAvailability()
		setTimeout(() => {
			this.stash.appendChild(card)
		}, getTransitionTime(card));
	}
	prev() {
		const card = [...this.stash.querySelectorAll('.whale-card')].at(-1)
		if (!card) return
		this.prevCards = this.prevCards.filter((c) => c !== card)
		this.nextCards = [...this.nextCards, card]
		this.holder.appendChild(card)
		this.checkCardsAvailability()
		setTimeout(() => {
			card.classList.remove(this.stashClass)
		}, 1);
	}
	open() {
		if (this.initialized) {
			this.opened = true
			this.modal.style.display = 'block'
			setTimeout(() => {
				this.modal.classList.add(IS_VISIBLE)
			}, 1);
		}
	}
	close() {
		if (this.initialized) {
			this.opened = false
			this.modal.classList.remove(IS_VISIBLE)
			this.modal.classList.remove(this.emptyClass)
			this.destroy()
			setTimeout(() => {
				this.modal.style.display = 'none'
			}, getTransitionTime(this.modal));
		}
	}
	destroy() {
		this.returnCards()
		this.highlightLast()
		this.initialized = false
		this.nextCards = []
		this.prevCards = []
		this.initialCard = null
		this.anchorCard = undefined
		this.anchorCardIndex = undefined
	}
	returnCards() {
		this.lastActive = this.getLastActive
		const cards = [...this.prevCards, ...this.nextCards.reverse()]
		if (!cards.length) return
		if (this.anchorCard !== undefined) {
			for (const card of cards) {
				card.classList.remove(this.swiperClass, this.stashClass)
				this.grid.insertBefore(card, this.anchorCard)
			}
		} else {
			for (const card of cards) {
				card.classList.remove(this.swiperClass, this.stashClass)
				this.grid.appendChild(card)
			}
		}
	}
	highlightLast() {
		if (!this.lastActive) return
		const distance = this.lastActive.getBoundingClientRect().top + window.scrollY
		this.lastActive.classList.add(this.highlightClass)
		this.grid.classList.add(this.highlightClass)
		window.scrollTo({ top: distance - 200 })
		setTimeout(() => {
			this.lastActive.classList.remove(this.highlightClass)
			this.grid.classList.remove(this.highlightClass)
		}, getTransitionTime(this.lastActive) * 4.9);
	}
	checkCardsAvailability() {
		const cards = [...this.holder.querySelectorAll('.whale-card')]
		if (cards.length == 1) {
			setTimeout(() => {
				this.close()
			}, 500);
		}
	}
	cardsAvailabilityResolve() {
		return
		const hasMoreCards = this.nextCards.length > 0
		if (!hasMoreCards) {
			this.modal.classList.add(this.emptyClass)
		} else {
			this.modal.classList.remove(this.emptyClass)
		}
		return hasMoreCards
	}
	loadMore() {
		if (!this.anchorCard) return
		this.initialCard = this.anchorCard
		this.setAnchor(this.findCardIndexInGrid(this.initialCard) + this.settings.maxNextCards + 1)
		let next = this.initialCard.nextElementSibling

		while (next && this.nextCards.length < this.settings.maxNextCards) {
			this.nextCards = [...this.nextCards, next]
		}
		this.nextCards = [this.initialCard, ...this.nextCards]
		try {
			this.addCardsToSwiper(this.nextCards.reverse())
		} catch (err) {
			throw new Error(`JS Load More Swiper Setup Error: ${err.message}`)
		}
	}

	/**
	 * Attach events
	 * 
	 * @start {mousedown, touchstart, click}
	 * @end {mouseup, touchend}
	 * @move {mousedown, touchstart, click}
	 * @click {data-evt="nextCard"}
	 * @keydown {ArrowRight}
	 * @keydown {ArrowLeft}
	 * @keydown {Escape}
	 */
	attachEvents() {
		for (const element of this.evtNextArr) {
			element.onclick = () => {
				this.next()
			}
		}
		for (const element of this.evtPrevArr) {
			element.onclick = () => {
				this.prev()
			}
		}
		for (const element of this.evtClose) {
			element.onclick = () => {
				this.close()
			}
		}
		for (const element of this.evtLoadMore) {
			element.onclick = () => {
				this.loadMore()
			}
		}
		document.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') {
				this.evtNextArr[0].click()
			}
			if (e.key === 'ArrowLeft') {
				this.evtPrevArr[0].click()
			}
			if (e.key === 'Escape') {
				e.preventDefault()
				this.close()
			}
		})
	}

}