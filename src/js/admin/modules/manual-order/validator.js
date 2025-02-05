class ItemValidator {
	constructor(contentElem) {
		this.contentElem = contentElem;
	}
	validate() {
		const itemTitleInput = this.contentElem.querySelector('input[name="item_title"]')
		const selectArr = [...this.contentElem.querySelectorAll('select[required]')]

		if (itemTitleInput) {
			if (!itemTitleInput.value) {
				return { result: false, msg: 'Item title is required.' };
			}
		} else {
			return { result: false, msg: 'No item. Please use search field to find an item.' };
		}

		if (selectArr && selectArr.length) {
			if (selectArr.every(select => !select.value)) {
				return {
					result: false,
					msg: 'Select product options...'
				}
			}
			const firstNotSelected = selectArr.find(select => !select.value)
			if (firstNotSelected) {
				return {
					result: false,
					msg: `Select option: ${firstNotSelected.getAttribute('name')}`
				}
			}
		}

		return { result: true, msg: '' };
	}
}
class CustomerValidator {
	constructor(contentElem) {
		this.contentElem = contentElem;
	}
	_validateEmail(emailString) {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(emailString);
	}

	validate() {
		const customerInputArr = [...this.contentElem.querySelectorAll('input[required][data-customer-input]')]
		const emailInput = this.contentElem.querySelector('input[name="email"][required][data-customer-input]')

		if (!customerInputArr || !customerInputArr.length) {
			return { result: false, msg: 'Something went wrong. ERR CODE: VMO79' };
		}

		if (customerInputArr.every(input => !input.value)) {
			return { result: false, msg: 'Enter customer details or use search field to find a customer.' };
		}

		const firstNotFilled = customerInputArr.find(input => !input.value)
		if (firstNotFilled) {
			return { result: false, msg: `Enter customer ${firstNotFilled.getAttribute('placeholder')}.` };
		}

		if (emailInput) {
			if (!this._validateEmail(emailInput.value)) {
				return { result: false, msg: 'Enter a valid email address.' };
			}
		}

		return { result: true, msg: '' };
	}
}
class OtherDetailsValidator {
	constructor(contentElem) {
		this.contentElem = contentElem;
	}

	validate() {
		const requiredSelectArr = [...this.contentElem.querySelectorAll('select[required]')]
		const requiredInputArr = [...this.contentElem.querySelectorAll('input[required]')]
		const dateInput = this.contentElem.querySelector('input[name="order_date"][required]')

		if (requiredSelectArr.every(select => !select.value) && requiredInputArr.every(input => !input.value)) {
			return { result: false, msg: 'Enter order details.' };
		}

		if (dateInput && !dateInput.value) {
			return { result: false, msg: 'Order date is not filled.' };
		}

		const firstNotSelected = requiredSelectArr.find(select => !select.value)
		if (firstNotSelected) {
			return { result: false, msg: `Select option: ${firstNotSelected.getAttribute('name')}` };
		}

		const firstNotFilled = requiredInputArr.find(input => !input.value)
		if (firstNotFilled) {
			return { result: false, msg: `Enter ${firstNotFilled.getAttribute('placeholder')}` };
		}

		return { result: true, msg: '' };
	}
}
export default class ManualOrderValidator {
	constructor(contentType, contentElem) {
		this.validatorStrategy = this.getValidatorStrategy(contentType, contentElem)
	}
	getValidatorStrategy(contentType, contentElem) {
		const strategies = {
			item: new ItemValidator(contentElem),
			customer: new CustomerValidator(contentElem),
			other: new OtherDetailsValidator(contentElem)
		}
		return strategies[contentType] || null
	}
	run() {
		if (!this.validatorStrategy) {
			return { result: false, msg: 'ERR: VMO76. Invalid content type' }
		}
		return this.validatorStrategy.validate()
	}
}