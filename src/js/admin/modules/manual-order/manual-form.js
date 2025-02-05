import ManualOrderValidator from './validator'
import ManualOrderProductSearch from './product-search'
import ManualOrderCustomerSearch from './customer-search'

import { fakeAjaxGetOrder } from '../general/fake-ajax'
import PageMsg from '../dynamic/page-msg'
import LockPin from '../dynamic/lock-pin'

import {
  AjaxGetCustomer,
  AjaxGetItem,
  submitOrderData,
  submitSaveOrderData
} from '../general/ajax'

import {
  createElem
} from '../general/utils'

import {
  updateInputsAllowOnlyDecimals
} from '../general/init-fn'

export default class ManualOrderForm {
  constructor(rootEl, popupInstance, orderID) {
    this.rootEl = rootEl
    if (!this.rootEl) {
      return
    }

    this._onDocumentClick = this._onDocumentClick.bind(this)

    this.popupInstance = popupInstance
    this.form = document.querySelector('#addManulOrderForm')

    this.selectedItem = null
    this.selectedItemElem = null
    this.selectedCustomer = null
    this.selectedCustomerElem = null
    this.otherDetails = null
    this.orderID = orderID

    this.setFromOrder = false

    this.contentItem = document.querySelector('#contentItem')
    this.contentCustomer = document.querySelector('#contentCustomer')

    this.customerInputArr = [...document.querySelectorAll('[data-customer-input]')]
    this.customerInputFirstName = document.querySelector('#customerFirstName')
    this.customerInputId = document.querySelector('#customer_id_input')
    this.customerInputLastName = document.querySelector('#customerLastName')
    this.customerInputEmail = document.querySelector('#customerEmail')
    this.customerInputPhone = document.querySelector('#customerPhone')
    this.customerPhotoWrap = document.querySelector('.m-popup__custom-pic-wrap')
    this.customerPhotoElem = document.querySelector('[data-customer-photo]')

    this.selectPickedToday = document.querySelector('#pickedUpToday')
    this.balanceElem = document.querySelector('[data-other-balance]')

    this.steps = [...this.rootEl.querySelectorAll('.m-popup__step')]
    this.searchProductContainer = document.querySelector('#searchListItems')
    this.searchCustomerContainer = document.querySelector('#searchListCustomers')
    this.selectedItemContainer = document.querySelector('#selectedItemContainer')
    this.msgEl = this.rootEl.querySelector('.m-popup__msg')
    this.init()
  }

  init() {
    if (!this.searchProductContainer) {
      console.warn('ERR: MPS02. Search product container not found')
    }

    this.productSearch = new ManualOrderProductSearch(this.searchProductContainer, this)
    this.customerSearch = new ManualOrderCustomerSearch(this.searchCustomerContainer, this)

    this.setupInitialSteps()
    this.goStep(1)
    this.bindBalanceToggle()

    if (this.orderID) {
      this.setupFromOrder(this.orderID)
    }
  }

  // setup from Order
  async setupFromOrder(orderID) {
    this.disable()

    /**
    * @CHOU Setup here
    * Need to setup function to fetch order's details
    * if they open this form by clicking "Edit Order" button
    * const order = await fakeAjaxGetOrder(orderID)
    */
    const order = await fakeAjaxGetOrder(orderID)

    if (!order || Object.keys(order).length === 0) {
      new PageMsg({
        heading: 'Invalid Order',
        msg: 'The order you are trying to edit was not found or this order is not manually created'
      })
      this.popupInstance.close()
      return
    }

    this.setFromOrder = true
    this.fillFormFromOrder(order)
    this.enable()
  }
  fillFormFromOrder(order) {
    const { customer, item, other_details } = order
    this.selectedCustomer = customer
    this.selectedItem = item

    const sections = [
      { key: 'customer', value: customer, handler: this.fillCustomerInputs.bind(this) },
      { key: 'item', value: item, handler: this.renderManualItem.bind(this) },
      { key: 'other_details', value: other_details, handler: this.fillOtherDetails.bind(this) }
    ]

    const sectionHandler = (section) => {
      const { key, value, handler } = section
      if (!value) {
        new PageMsg({
          heading: 'Something went wrong',
          msg: `${key} not found`
        })
        this.popupInstance.close()
        return
      }
      handler(value)
    }

    sections.forEach(sectionHandler)
  }

  // Bind Initial events
  bindBalanceToggle() {
    this.selectPickedToday.onchange = () => {
      const enable = this.selectPickedToday.value === 'no' ? true : false
      this.balanceElem.classList.toggle('hidden', !enable)
    }
  }

  // Utils
  disable() {
    // this.rootEl.querySelectorAll('input').forEach(input => {
    //   if (!input.dataset.lockedInput) {
    //     input.disabled = true
    //   }
    // })
    this.rootEl.classList.add('--o-loading')
    this.rootEl.classList.add('--disabled')
  }
  enable() {
    this.rootEl.querySelectorAll('input').forEach(input => {
      if (input.hasAttribute('data-locked-input')) {
        return
      }
      // input.disabled = false
    })
    this.rootEl.classList.remove('--o-loading')
    this.rootEl.classList.remove('--disabled')
  }
  resetSelectedItem() {
    this.contentItem.classList.remove('--show-selected')
    this.productSearch.reset()
    this.selectedItemContainer.innerHTML = ''
    this.selectedItem = null
    this.selectedItemElem = null
  }
  resetSelectedCustomer() {
    const container = document.querySelector('#selectedCustomerInputs')
    if (container) {
      const inputArr = [...container.querySelectorAll('input')]
      inputArr.forEach(input => {
        input.value = ''
      })
    }

    if (this.customerPhotoElem) {
      this.customerPhotoElem.src = ''
      this.customerPhotoWrap.classList.remove('--filled')
    }

    if (this.customerSearch) {
      this.customerSearch.reset()
    }
  }
  resetOtherDetails() {
    const otherDetails = this.rootEl.querySelector('#otherDetails')
    if (otherDetails) {
      const textInputArr = [...otherDetails.querySelectorAll('input[type="text"]')]
      textInputArr.forEach(input => {
        input.value = ''
      })

      const selectArr = [...otherDetails.querySelectorAll('select')]
      selectArr.forEach(select => {
        select.value = ''
      })
    }
  }
  fullReset() {
    this.enable()
    this.resetSelectedItem()
    this.resetOtherDetails()
    this.resetSelectedCustomer()
    this.goStep(1)
    this.clearMsg()
  }

  // General Methods
  showMsg(type, msg = 'Something went wrong...') {
    this.rootEl.classList.add('--show-msg')
    this.rootEl.classList.add(`--${type}`)
    this.msgEl.textContent = msg
  }
  clearMsg() {
    this.rootEl.classList.remove('--show-msg')
    this.rootEl.classList.remove('--error')
    this.rootEl.classList.remove('--success')
  }

  // Events
  _bindDocumentClick() {
    document.addEventListener('click', this._onDocumentClick)
  }
  _unbindDocumentClick() {
    document.removeEventListener('click', this._onDocumentClick)
  }
  _onDocumentClick(e) {
    /** General Events */
    if (e.target.closest('[data-manual-close]')) {
      this.popupInstance.close()
    }

    if (e.target.closest('.m-popup__input-row')) {
      this.clearMsg()
    }

    /** Items */
    if (e.target.closest('[data-evt="resetManualItem"]')) {
      this.resetSelectedItem();
    }
    if (e.target.closest('[data-evt="setupManualItem"]')) {
      let id = e.target.closest('[data-id]').getAttribute('data-id');
      if (!id) {
        console.warn('ERR: MOF03. Item ID not found');
        new PageMsg({
          type: 'error',
          heading: 'Invalid Item',
          msg: 'ERR: MOF03. Item ID not found. Reference data-id attribute'
        });
        return;
      }
      this.setupManualItem(id);
    }

    /** Customer */
    if (e.target.closest('[data-evt="resetManualCustomer"]')) {
      this.resetSelectedCustomer()
    }

    if (e.target.closest('[data-evt="setupManualCustomer"]')) {
      let id = e.target.closest('[data-id]').getAttribute('data-id')
      if (!id) {
        console.warn('ERR: MOF07. Customer ID not found')
        new PageMsg({
          type: 'error',
          heading: 'Invalid Customer',
          msg: 'ERR: MOF07. Customer ID not found. Reference data-id attribute'
        })
        return
      }

      this.setupManualCustomer(id)
    }

    /** Step Switch */
    if (e.target.closest('[data-next-step]')) {
      this.clearMsg()
      this.go()
    }
    if (e.target.closest('[data-prev-step]')) {
      this.clearMsg()
      this.goStep(this.currentStep - 1)
    }

    /** Remove Sale */
    if (e.target.closest('[data-evt="removeManualSale"]')) {
      const callback = () => {
        const inputArr = e.target.parentNode.querySelectorAll('input')
        const hiddenInput = inputArr[0]
        const saleInput = inputArr[1]
        hiddenInput.hidden = !hiddenInput.hidden
        saleInput.hidden = !saleInput.hidden

        if (hiddenInput.hidden) {
          e.target.textContent = 'Edit Price'
        } else {
          e.target.textContent = 'Set Regular Price'
        }
      }

      const pin = new LockPin({
        code: 9999,
        callback: callback
      })
      pin.push()
    }

    /** Delete Item */
    if (e.target.closest('[data-evt="deleteManualItem"]')) {
      const item = e.target.closest('.m-popup__list-item')
      if (item) {
        const grid = item.nextElementSibling
        if (grid) {
          grid.remove()
          item.remove()
        }
      }
    }
  }

  // Select item methods
  async setupManualItem(id) {
    this.disable()

    try {
      // const item = await fakeAjaxGetItem(id)
      const item = await AjaxGetItem(id)

      if (!item) {
        this.showMsg('error', 'Item not found')
        return
      }

      this.selectedItem = item
      this.renderManualItem(item)
      this.productSearch.reset()

    } catch (error) {
      console.error('ERR: MOF04. Fetch item failed', error)
    } finally {
      this.enable()
    }
  }
  renderManualItem(item) {
    this.contentItem.classList.add('--show-selected')
    // Create main element of selected item
    const createPriceElem = (() => {
      let html = ''

      if (item.salePrice) {
        html = `
            <input type="text" data-locked-input data-allow-decimals name="price[]" data-old-price class="m-popup__input --bold --disabled --auto" value="${item.price}" hidden>
            <input type="text" data-sale-price data-allow-decimals name="sale_price[]" class="m-popup__input --bold --disabled --auto" value="${item.salePrice}">
            <div class="button ghost-btn --auto --red" data-evt="removeManualSale">Edit Price</div>
            `
      } else {
        html = `
            <input type="text" data-locked-input data-allow-decimals name="price[]" class="m-popup__input --bold --disabled --auto" value="${item.price}">
            `
      }

      return html
    })

    const elem = createElem('div', {
      className: 'm-popup__list-item --selected',
      innerHTML: `
        <div class="m-popup__list-item-remove" data-evt="deleteManualItem"></div>
        <input type="hidden" name="products[]" value="${item.id}"/>
        <img src="${item.img_src}" alt="">
        <div class="m-popup__list-item-col">
          <input type="text" name="item_title" class="m-popup__input --bold" value="${item.title}">
          <div class="am_flex8 m-popup__list-item-price">
            ${createPriceElem()}
          </div>
        </div>
      `
    });

    // Create reset button
    const resetButton = createElem('div', {
      className: 'blank-btn --red',
      attributes: { 'data-evt': 'resetManualItem' },
      innerHTML: 'Delete item'
    });

    // Function for creating dropdown (select) for each option
    const createSelectFields = () => {
      const options = item.options;
      if (!options || !options.length) return null;

      const gridElement = document.createElement('div');
      gridElement.classList.add('m-popop__manual-options-grid');

      const selectElementsHTML = options.map(option => {
        // Определяем содержимое для тега select
        let selectContent;

        if (option.set.length === 1) {
          // Если только один элемент - выбираем его по умолчанию
          const singleOption = option.set[0];
          selectContent = `<option value="${singleOption.caption}" selected>${singleOption.caption}</option>`;
        } else {
          // Для нескольких элементов добавляем заглушку
          selectContent = `
            <option value="" selected disabled>${option.name}</option>
            ${option.set.map(select =>
            `<option value="${select.caption}">${select.caption}</option>`
          ).join('')}
          `;
        }

        return `
          <div class="m-popup__input-row">
            <div class="m-popup__input-wrap">
              <div class="am-select-wrap">
                <select class="am-select" name="${option.input_name}" required>
                  ${selectContent}
                </select>
              </div>
            </div>
          </div>
        `;
      }).join('');

      gridElement.innerHTML = selectElementsHTML;
      return gridElement;
    };

    const selectFields = createSelectFields()

    // Add elements to container
    this.selectedItemElem = elem
    this.selectedItemContainer.appendChild(elem)
    if (selectFields) {
      this.selectedItemContainer.appendChild(selectFields)
    }
    updateInputsAllowOnlyDecimals()
    // this.selectedItemContainer.appendChild(resetButton)
  }

  // Select customer methods
  async setupManualCustomer(id) {
    this.disable()

    try {

      const customer = await AjaxGetCustomer(id)
      // const customer = await fakeAjaxGetCustomer(id)

      if (!customer) {
        this.showMsg('error', 'Customer not found')
        return
      }

      this.selectedCustomer = customer
      this.fillCustomerInputs(customer)
      this.customerSearch.reset()

    } catch (error) {
      console.error('ERR: MOF12. Fetch customer failed', error)
    } finally {
      this.enable()
    }
  }
  fillCustomerInputs(customer) {
    const { customer_id, first_name, last_name, email, phone, img_src } = customer
    const resetButton = createElem('div', {
      className: 'blank-btn',
      attributes: { 'data-evt': 'resetManualCustomer' },
      innerHTML: 'Reset customer'
    })

    const warnMsg = (msg) => {
      new PageMsg({
        type: 'error',
        heading: 'Warning',
        msg: msg
      })
    }
    if (customer_id) this.customerInputId.value = customer_id
    if (first_name) this.customerInputFirstName.value = first_name
    if (last_name) this.customerInputLastName.value = last_name
    if (email && !this.customerInputEmail.disabled) this.customerInputEmail.value = email
    if (phone) this.customerInputPhone.value = phone

    if (this.customerPhotoWrap) {
      this.customerPhotoWrap.classList.remove('--filled')

      if (img_src && this.customerPhotoElem) {
        this.customerPhotoElem.src = img_src
        this.customerPhotoWrap.classList.add('--filled')
      }
    }
  }

  // Other Details
  fillOtherDetails(details) {
    const handleFormElement = (name, value) => {
      const element = this.form.querySelector(`[name="${name}"]`)
      if (element) {
        const tagName = element.tagName.toLowerCase()

        if (Array.isArray(value)) {
          if (tagName === 'input' && element.type === 'checkbox') {
            for (const val of value) {
              const elem = this.form.querySelector(`[name="${name}"][value="${val}"]`)
              elem.checked = true
              elem.dispatchEvent(new Event('change', { bubbles: true }))
            }
          }
        } else {
          if (tagName === 'input') {
            element.value = value
          } else if (tagName === 'select') {
            element.value = value
            element.dispatchEvent(new Event('change', { bubbles: true }))
          }
        }
      }
    }

    for (const value in details) {
      handleFormElement(value, details[value])
    }
  }

  // Switch steps
  setupInitialSteps() {
    const steps = [...this.rootEl.querySelectorAll('[data-step]')]
    const bar = this.rootEl.querySelector('.m-popup__progress-bar span')
    const title = this.rootEl.querySelector('.m-popup__progress-title')
    const nextStepBtn = this.rootEl.querySelector('[data-next-step]')
    const prevStepBtn = this.rootEl.querySelector('[data-prev-step]') || this.rootEl.querySelector('[data-manual-close]')

    if (!steps || !title || !bar) return

    this.steps = steps
    this.progressTitle = title
    this.progressBar = bar
    this.currentStep = 1
    this.stepTitles = [
      'Step 1. Client info.',
      'Step 2. Item details.',
      'Step 3. Other details.'
    ]
    if (nextStepBtn && prevStepBtn) {
      this.nextStepBtn = nextStepBtn
      this.prevStepBtn = prevStepBtn
    }
  }
  goStep(step = 1) {
    if (step < 1) {
      new PageMsg({ msg: "ERR: MOF88. Step can't be less than 1" })
      step = 1
    }

    if (step > this.steps.length) {
      new PageMsg({ msg: "ERR: MOF89. Step can't be more than " + this.steps.length })
      step = this.steps.length
    }

    this.currentStep = step
    const container = this.steps[step - 1]
    const isLastStep = this.currentStep === this.steps.length;
    const isFirstStep = this.currentStep === 1;

    this.progressTitle.textContent = this.stepTitles[step - 1]
    this.progressBar.style.width = `${(step / this.steps.length) * 100}%`
    this.steps.forEach((elem) => {
      if (elem === container) {
        elem.style.display = 'block'
      } else {
        elem.style.display = 'none'
      }
    })

    if (this.nextStepBtn) {
      const text = step === this.steps.length ? 'Finish' : 'Next Step'
      this.nextStepBtn.textContent = text

      // this.nextStepBtn.toggleAttribute('data-next-step', !isLastStep);
      // this.nextStepBtn.toggleAttribute('data-manual-submit', isLastStep);
    }

    if (this.prevStepBtn) {
      const text = step === 1 ? 'Close' : 'Previous Step'
      this.prevStepBtn.textContent = text

      this.prevStepBtn.toggleAttribute('data-prev-step', !isFirstStep);
      this.prevStepBtn.toggleAttribute('data-manual-close', isFirstStep);
    }
  }
  go() {
    let contentType = this.currentStep === 1 ? 'customer' : this.currentStep === 2 ? 'item' : 'other';
    //alert(contentType)
    const validator = new ManualOrderValidator(contentType, this.steps[this.currentStep - 1]);
    const validate = validator.run();

    if (!validate.result) {
      this.showMsg('error', validate.msg);
      return;
    }

    if (this.currentStep === this.steps.length) {
      this.submit();
    } else {
      this.goStep(this.currentStep + 1);
    }
  }

  // Close & Submit
  getFormData() {
    const formData = new FormData(this.form);

    const config = {
      ignore: ['itemSearch', 'customerSearch'],
      arrays: ['paid_method']
    };

    const result = Object.fromEntries(
      config.arrays.map(key => [key, formData.getAll(key)]).filter(([_, values]) => values.length > 0)
    );

    const cleanEntries = Array.from(formData).filter(([key]) => ![...config.ignore, ...config.arrays].includes(key));

    return {
      ...Object.fromEntries(cleanEntries),
      ...result
    };
  }
  async submit() {

    const data = this.getFormData()
    this.disable()

    if (!data || Object.keys(data).length === 0) {
      this.enable()
      this.showMsg('error', 'ERR: MOF99. Form data is empty')
      return
    }

    let response = null;

    try {
      if (!this.setFromOrder) {
        response = await submitOrderData(data);
      } else {
        /**
         * @CHOU Setup here
         * Need to setup function to save updated order's details
         * if they open the modal by clicking "Edit order" button.
         */
        response = await submitSaveOrderData(data);
      }

      if (response.error) {
        throw new Error(`${response.msg}`)
      }

      this.popupInstance.close()
      this.fullReset()
    } catch (error) {
      this.showMsg('error', `Something went wrong: ${error.message}`)
    } finally {
      this.enable()
      if (response && response.order_link) {
        window.location.href = response.order_link;
      } else {
        this.showMsg('error', 'Order link is unavailable.')
        window.location.reload();
      }
    }
  }
}