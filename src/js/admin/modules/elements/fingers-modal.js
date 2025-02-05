import { getTransitionTime, lockScroll, unlockScroll } from '../general/utils'
import PopupBackdrop from '../dynamic/popup-backdrop'
import { __LOADING, __VISIBLE } from '../general/constants'
import PageMsg from '../dynamic/page-msg'

class FingerModal {
	constructor() {
		this.rootEl = document.querySelector('.finger-modal')
		if (!this.rootEl) return

		this.inputArr = [...this.rootEl.querySelectorAll('input.finger-input')]
		this.fingerPathArr = [...this.rootEl.querySelectorAll('.finger-path')]
		this.modalWhaleName = this.rootEl.querySelector('[data-finger-whale]')
		this.whaleToSave = undefined
		window.fingerModal = this
		this.init()
	}

	// Methods
	findRelativeInput(path) {
		const valid = path ? path.id ? true : false : false
		if (!valid) throw new Error('class FingerModal. findRelativeInput : path not found')

		const fingerCode = path.id.replace(/\D/g, '')
		const input = this.inputArr.find((input) => { return input.dataset.fingerInput == fingerCode })
		return input || this.inputArr[0]
	}
	findRelativePath(input) {
		const valid = input && input.dataset.fingerInput
		if (!valid) throw new Error('class FingerModal. findRelativePath : input not found or invalid')

		const fingerCode = input.dataset.fingerInput;

		const path = this.fingerPathArr.find((path) => {
			return path.id.replace(/\D/g, '') === fingerCode;
		});

		return path || null;
	}
	setupModal(whale) {
		if (!whale) return
		this.whaleToSave = whale
		const name = whale.name
		const fingers = whale.fingers

		if (this.modalWhaleName) {
			this.modalWhaleName.textContent = name
		}

		for (const finger in fingers) {
			const key = finger
			const value = fingers[key]

			const input = document.querySelector(`input[data-finger-input="${key}"]`)

			if (input) {
				input.value = value || ''
			}
		}

		this.observeValues()
	}
	save() {
		if (!this.whaleToSave) return
		const fingers = {}
		for (const input of this.inputArr) {
			const key = input.dataset.fingerInput
			const value = input.value
			fingers[key] = value
		}
		this.whaleToSave.fingers = fingers
		$.ajax({
			url: '/admin/json/save-whale-fingers',
			type: 'POST',
			data: { id: this.whaleToSave.id, fingers: fingers },
			success: function (data) {
				console.log('fingers were saved');
			}
		})
		this.hide()
	}

	// Visibility
	async fetchWhale(whaleId) {
		try {
			console.log(`fetching whales ${whaleId} finger data`);
			const response = await fetch(`/admin/json/whale-fingers/${whaleId}`);

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();

			// Check if there's an error in the response
			if (data.error) {
				throw new Error('Error fetching whale data');
			}

			// Return the whale data
			return data.whale_data;
		} catch (error) {
			console.error('There was a problem with the fetch operation:', error);
		}
	}
	async show(whaleId) {
		lockScroll()
		this.rootEl.style.display = 'block'
		this.rootEl.classList.add(__LOADING)
		window.FingerBackdrop = new PopupBackdrop({
			callback: () => { this.hide() }
		})

		setTimeout(async () => {
			this.rootEl.classList.add(__VISIBLE)

			try {
				const whale = await this.fetchWhale(whaleId)

				if (!whale) {
					new PageMsg({
						type: 'error',
						heading: 'No Whale',
						msg: 'Whale ID not found'
					})
					throw new Error('Whale not found')
				}

				this.setupModal(whale)
				this.rootEl.classList.remove(__LOADING)

			} catch (error) {
				console.error('Fetch data failed', error)
				this.hide()
			}
		}, 5)
	}
	hide() {
		unlockScroll()
		this.rootEl.classList.remove(__VISIBLE)
		if (window.FingerBackdrop) {
			window.FingerBackdrop.hide(true)
		}
		setTimeout(() => {
			this.rootEl.style.display = 'none'
			this.whaleToSave = undefined
		}, getTransitionTime(this.rootEl))
	}

	// Observation
	observeValues() {
		for (const input of this.inputArr) {
			const path = this.findRelativePath(input)
			const value = input.value

			if (path) {
				if (value) {
					path.classList.add('force')
				} else {
					path.classList.remove('force')
				}
			}
		}
	}

	// Bind Events
	bindFingerClick() {
		for (const path of this.fingerPathArr) {
			path.addEventListener('click', () => {
				const input = this.findRelativeInput(path)
				if (input) {
					input.focus()
				}
			})
		}
	}
	bindInputEvents() {
		const validateValue = (value) => {
			const num = parseFloat(value)
			return /^(\d+(\.5?)?)?$/.test(value) && num <= 25
		}

		for (const input of this.inputArr) {
			input.addEventListener('input', () => {
				// Resrtict Numeric Value
				const value = input.value
				if (!validateValue(value)) {
					input.value = value.slice(0, -1)
				}

				// Observe value
				this.observeValues()
			})
		}
	}

	// Init
	setInputPlaceholder() {
		this.inputArr.forEach((input) => {
			input.placeholder = 'Unset'
		})
	}

	init() {
		this.bindFingerClick()
		this.bindInputEvents()
		this.setInputPlaceholder()
	}
}

export function initFingerModal() {
	new FingerModal()
}