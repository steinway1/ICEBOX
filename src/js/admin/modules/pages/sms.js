import $ from 'jquery'
import { lockScroll, unlockScroll, getTransitionTime, addClasses, createElem, showMessage } from '../general/utils'
import PopupBackdrop from '../dynamic/popup-backdrop'
import AskModal from '../dynamic/ask-modal'
import PageMsg from '../dynamic/page-msg'
import { __HIDDEN, __ACTIVE } from '../general/constants'

export default class SMS {
	constructor(rootEl) {
		this.rootEl = rootEl
		if (!rootEl) return

		this.board = document.querySelector('#sms_board')
		this.sidebar = document.querySelector('.board-sidebar')
		this.toolbar = document.querySelector('.board-toolbar')
		this.SMSModal = document.querySelector('.sms-modal')
		this.__barCollapsed = '--sidebar_collapsed'
		this.menuIsOpen = false
		this.init()
		// new PopupBackdrop()
	}
	// Initialize
	init() {
		if (this.board) {
			window.sms = this
			// this.initSelect2()
			this.bindInputEvents()
			this.bindCustomUpload()
			this.toggleSMSType()
		}
	}

	// Methods - Sidebar
	hideSidebar() {
		document.body.classList.add(this.__barCollapsed)
	}
	showSidebar() {
		document.body.classList.remove(this.__barCollapsed)
	}
	toggleSidebar() {
		if (window.innerWidth < 992) {
			this.toggleMenu()
		}
		if (document.body.classList.contains(this.__barCollapsed)) {
			this.showSidebar()
			return
		}
		this.hideSidebar()
		return
	}

	// Methods - Menu
	openMenu() {
		if (!this.menuIsOpen) {
			this.menuIsOpen = true
			lockScroll()
			window.smsMenuBackdrop = new PopupBackdrop({
				callback: () => {
					this.closeMenu()
				}
			})
			this.sidebar.style.display = 'flex'
			if (this.toolbar) {
				this.toolbar.classList.add(__HIDDEN)
			}
			setTimeout(() => {
				this.sidebar.classList.add(__ACTIVE)
			}, 5);
		}
	}
	closeMenu() {
		if (this.menuIsOpen) {
			this.menuIsOpen = false
			unlockScroll()
			this.sidebar.classList.remove(__ACTIVE)
			if (window.smsMenuBackdrop) {
				window.smsMenuBackdrop.hide()
			}
			if (this.toolbar) {
				this.toolbar.classList.remove(__HIDDEN)
			}
			setTimeout(() => {
				this.sidebar.style.display = 'none'
			}, getTransitionTime(this.sidebar));
		}
	}
	toggleMenu() {
		if (this.menuIsOpen) {
			this.closeMenu()
		} else {
			this.openMenu()
		}
	}

	// Methods - SMS Preview Events
	addToFavorites(id, event) {
		if (id) {
			const elem = event.target.classList.contains('.sms-preview__btn') ? event.target : event.target.closest('.sms-preview__btn')
			$.ajax({
				url: '/admin/json/conversation-favorite/' + id,
				type: 'GET',
				success: function (data) {
					var r = $.parseJSON(data);
					if (!r.error) {
						if (elem) {
							elem.classList.toggle(__ACTIVE)
						}
					} else {
						showMessage('error', 'Error', r.msg);
					}
				}
			})

		}
	}
	remove(id, event) {
		const remove = () => {
			if (id) {
				const elem = event.target.parentNode.closest('.sms-preview')
				if (elem) {
					$.ajax({
						url: '/admin/json/conversation-trash/' + id,
						type: 'GET',
						success: function (data) {
							var r = $.parseJSON(data);
							if (!r.error) {
								this.animateRemoveMessage(elem)
							} else {
								showMessage('error', 'Error', r.msg);
							}
						}
					})
				}
			}
		}
		const ask = new AskModal({
			heading: 'Delete Message',
			subheading: 'Are you sure want to delete this message?',
			exitText: 'Back',
			submitText: 'Delete',
			submitCallback: [remove]
		})
		ask.show()
	}

	// Methods - Tags
	addTag(id, event) {
		event.stopPropagation()
		const elem = event.target
		const tagsHolder = elem.parentNode.closest('.sms-preview__footer')
		if (!tagsHolder) throw new Error('class SMS. addTag : tagsHolder not found')

		if (!tagsHolder.querySelector('.sms-tag-add')) {
			const renderHTML = () => {
				return `
        <div class="sms-tag-add">
          <input type="text" class="sms-tag --blue">
          <select name="" id="" class="sms-tag" onchange="window.sms.changeTagColor(event)">
            <option value="blue" selected>Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
            <option value="red">Red</option>
          </select>
          <button class="sms-tag_btn --cancel" onclick="window.sms.cancelTag(event)"></button>
          <button class="sms-tag_btn --confirm" onclick="window.sms.confirmTag(event,${id})"></button>
        </div>
        `
			}
			tagsHolder.insertAdjacentHTML('beforeend', renderHTML())
			const input = tagsHolder.querySelector('input.sms-tag')
			input.focus()
		}
	}
	changeTagColor(event) {
		const elem = event.target
		const parent = elem.closest('.sms-tag-add')
		if (!parent) throw new Error('class SMS. changeTagColor : parent not found')
		const input = parent.querySelector('input.sms-tag')
		const option = elem.options[elem.selectedIndex].value
		input.classList.remove(...input.classList)
		addClasses(input, 'sms-tag', `--${option}`)
	}
	cancelTag(event) {
		const elem = event.target
		const parent = elem.closest('.sms-tag-add')
		if (parent) {
			parent.remove()
		} else {
			throw new Error('class SMS. cancelTag : parent not found')
		}
	}
	confirmTag(event, id) {
		const elem = event.target
		const parent = elem.closest('.sms-tag-add')
		const tagsHolder = parent.parentNode.closest('.sms-preview__footer')
		if (!parent) throw new Error('class SMS. confirmTag : parent not found')

		const input = parent.querySelector('input.sms-tag')
		const value = input.value

		if (!value) {
			new PageMsg({
				type: 'error',
				heading: 'No Value',
				msg: 'You can\'t add tag with empty value.'
			})
			throw new Error('class SMS. confirmTag : value not found')
		}

		const className = input.className
		const newTag = createElem('div', {
			innerHTML: value,
			className: className
		})
		tagsHolder.appendChild(newTag)
		storeNewTag(value, className, id);
		this.cancelTag(event)
	}

	// Methods - General
	toggleSMSType() {
		const nameGroup = [...document.querySelectorAll('input[name="new_sms_type"]')]
		if (nameGroup.length) {
			const selected = nameGroup.find(input => input.checked)
			if (selected) {
				const value = selected.value
				const forms = [...this.SMSModal.querySelectorAll('form')]

				switch (value) {
					case 'single':
						for (const form of forms) {
							if (form.id == 'new_sms_single') {
								form.style.display = 'block'
							} else {
								form.style.display = 'none'
							}
						}
						$('#sms_send_btn_global').attr('onclick', 'window.sms.sendNewSMS(0)');
						break;
					case 'bulk':
						for (const form of forms) {
							if (form.id == 'new_sms_bulk') {
								form.style.display = 'block'
							} else {
								form.style.display = 'none'
							}
						}
						$('#sms_send_btn_global').attr('onclick', 'window.sms.sendNewSMS(1)');
						break;
					default:
						for (const form of forms) {
							form.style.display = 'none'
						}
						forms[0].style.display = 'block'
						break;
				}
			}
		}
	}
	toggleMMSMode(event) {
		const target = event.target
		const form = target.parentNode.closest('form')
		const label = target.closest('label')
		if (form) {
			const isChecked = target.checked
			if (isChecked) {
				form.classList.add('--mms')
				label.querySelector('span').textContent = 'Disable MMS'
			} else {
				form.classList.remove('--mms')
				label.querySelector('span').textContent = 'Enable MMS'
			}
		}
	}

	// SMS
	initSelect2() {
		$('#sms_single_whale').select2({
			placeholder: "Select a whale",
			ajax: {
				url: '/admin/json/search-whale',
				dataType: 'json'
			}
		})
		$('#sms_bulk_whale').select2({
			placeholder: "Select a whales...",
			ajax: {
				url: '/admin/json/search-whale',
				dataType: 'json'
			}
		})
	}
	sendNewSMS(type = 0) {
		if (type == 0) {
			$('#submit_sms_btn').click();
		} else {
			$('#submit_bulk_sms_btn').click();
		}

	}
	openSMSModal() {
		lockScroll()
		if (this.SMSModal) {
			this.SMSModal.style.display = 'block'
			window.SMSModalBackdrop = new PopupBackdrop({
				instant: true,
				callback: () => {
					this.closeSMSModal(1)
				}
			})
			if (this.menuIsOpen && window.innerWidth < 992) {
				this.closeMenu()
			}
		}
	}
	closeSMSModal(offBackdrop) {
		unlockScroll()
		if (this.SMSModal) {
			this.SMSModal.style.display = 'none'
			const inputs = [...this.SMSModal.querySelectorAll('input[type="text"], textarea')]
			for (const input of inputs) {
				input.value = ''
			}
		}
		if (!offBackdrop) {
			if (window.SMSModalBackdrop) {
				window.SMSModalBackdrop.hide()
			}
		}
	}
	bindInputEvents() {
		const input = document.querySelector('#new_converation_message')
		const button = document.querySelector('.sms-viewer__btn')
		if (input && button) {
			input.addEventListener('keydown', (e) => {
				const keyIsEnter = e.key === 'Enter'
				if (keyIsEnter) {
					e.preventDefault()
					button.click()
					input.value = ''
				}
			})
		}
	}
	bindCustomUpload() {
		const btnArr = [...document.querySelectorAll('[data-custom-upload].--btn')]
		for (const btn of btnArr) {
			btn.addEventListener('click', () => {
				const input = btn.querySelector('input[type="file"]')
				if (input) {
					input.dispatchEvent(new MouseEvent('click'))
				}
			})
		}
	}

	// Utils
	animateRemoveMessage(elem) {
		elem.style.transform = 'translateX(18px)'
		elem.style.opacity = 0
		setTimeout(() => {
			elem.remove()
		}, getTransitionTime(elem));
	}
}