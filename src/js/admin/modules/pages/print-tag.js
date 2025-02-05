import { toArray, createElem } from '../general/utils'
import { __FILLED, __HOVERED, IS_ACTIVE } from '../general/constants'
import PageMsg from '../dynamic/page-msg'

export default class PrintTag {
  constructor(rootEl) {
    this.rootEl = rootEl
    if (!this.rootEl) return

    this.main = this.rootEl
    this.previewInputsHolder = document.querySelector('#tagPreviewInputs')
    this.previewDetails = document.querySelector('#tagPreviewDetails')
    this.previewImage = document.querySelector('#tagPreviewImage')
    this.previewImageInput = document.querySelector('#tag_image')
    this.tagElem = document.querySelector('#tagPreview')
    this.printList = document.querySelector('#print_list')
    this.previewInputs = []
    this.previewOutputObj = {}
    this.tagsToPrint = {}
    this.renderedHTMLToPrint = ''
    this.init()
  }

  get getPreviewObj() {
    return this.previewOutputObj
  }

  get getPreviewImageBackgroundURL() {
    const style = window.getComputedStyle(this.previewImage)
    const url = style.getPropertyValue('background-image')
    const regex = /^url\((['"]?)(.*)\1\)$/
    const matches = url.match(regex)
    let backgroundImageUrl = ''
    if (matches && matches[2]) {
      backgroundImageUrl = matches[2]
    }
    return backgroundImageUrl
  }

  /**
   * 
   * Utils
   */
  renderDetailsHTML() {
    let html = ''
    for (const [key, value] of Object.entries(this.previewOutputObj)) {
      if ('value' in value) {
        html += `
        <span data-title="${value.title}">${value.value}</span>
        `
      }
    }
    return html
  }
  bindInput(input, callback) {
    if (input) {
      input.addEventListener('input', callback)
    }
  }
  createLabelFromOutputObj() {
    const currentLabels = [...this.printList.querySelectorAll('label')]
    const label = createElem('label', {
      className: 'print-tag-label',
      attributes: {
        'data-tag-id': currentLabels.length + 1
      },
      innerHTML: `
      <input type="checkbox" checked>
      <div>
        <div class="print-tag-label__main">
          <div class="print-tag-label__img-wrap">
            <div class="print-tag-label__img" style="background-image: url(${this.getPreviewImageBackgroundURL})"></div>
          </div>
          <div class="print-tag-label__details">
            ${this.renderDetailsHTML()}
          </div>
        </div>
      </div>
      `
    })
    return label
  }

  /**
   * 
   * Extenders
   */
  extendPrintListItemToggle(label) {
    let labelArr = label ? toArray(label) : [...document.querySelectorAll('.print-tag-label')]
    for (const elem of labelArr) {
      const input = elem.querySelector('input')
      input.addEventListener('change', () => {
        this.observePrintList()
      })
    }
  }

  /**
   * 
   * Methods
   */
  updatePreviewObjFromInputs() {
    this.previewOutputObj = {}
    if (this.previewInputs.length) {
      this.previewInputs.forEach((input, index) => {
        this.previewOutputObj[index] = {
          id: input.id,
          title: input.closest('div').querySelector('label').innerHTML,
          value: input.value
        }
      })
    }
  }
  updateOutputPreviewDetails() {
    let filled = 0, html = ``
    const obj = this.previewOutputObj
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const keyObj = obj[key]
        if ('value' in keyObj && keyObj.value.length !== 0) {
          ++filled
          html += `
          <div id="${keyObj.id}">
            <span>${keyObj.title}</span>
            <span>${keyObj.value}</span>
          </div>
          `
        }
      }
    }
    if (filled) {
      this.previewDetails.innerHTML = html
      this.previewDetails.classList.add(__FILLED)
    } else {
      this.previewDetails.innerHTML = ''
      this.previewDetails.classList.remove(__FILLED)
    }
  }
  clearPreviewInputs() {
    if (this.previewInputs.length) {
      for (const input of this.previewInputs) {
        input.value = ''
        input.dispatchEvent(new Event('change'))
      }
    }
    if (this.previewImage && this.previewImageInput) {
      this.previewImage.style.backgroundImage = ''
      this.previewImage.classList.remove(__FILLED)
      this.previewImageInput.value = ''
    }
    this.previewOutputObj = {}
  }

  /** 
   * 
   * Printing
   */
  observePrintList() {
    if (!this.printList) throw new Error('No print list found')
    const labels = [...this.printList.querySelectorAll('.print-tag-label')]
    const inputs = labels.map((label) => {
      return label.querySelector('input')
    })
    const printBtnArr = [...document.querySelectorAll('[data-tag-evt="print_selected"]')]
    if (labels.length) {
      this.printList.classList.add(__FILLED)
    } else {
      this.printList.classList.remove(__FILLED)
    }

    if (inputs.some(input => input.checked)) {
      printBtnArr.forEach(btn => btn.removeAttribute('disabled'))
    } else {
      printBtnArr.forEach(btn => btn.setAttribute('disabled', 'disabled'))
    }
  }
  saveTag() {
    const elem = this.createLabelFromOutputObj()
    this.printList.appendChild(elem)
    this.observePrintList()
    this.clearPreviewInputs()
    this.updatePreviewObjFromInputs()
    this.updateOutputPreviewDetails()
  }
  printSelected() {
    this.tagsToPrint = {}
    const labels = [...this.printList.querySelectorAll('label')].reduce((acc, label) => {
      const inputCheckbox = label.querySelector('input[type="checkbox"]')
      if (inputCheckbox.checked) {
        acc.push(label)
      }
      return acc
    }, [])
    if (!labels.length) {
      new PageMsg({
        type: 'error',
        heading: 'No labels selected',
        msg: 'Select at least one label'
      })
    } else {
      labels.forEach((label, index) => {
        const img_url = label.querySelector('.print-tag-label__img').style.backgroundImage
        const spans = [...label.querySelectorAll('span')]

        this.tagsToPrint[index] = {}
        this.tagsToPrint[index].details = []
        this.tagsToPrint[index].img_url = img_url

        spans.forEach((span) => {
          if (!span.textContent.trim().length) return
          this.tagsToPrint[index].details.push({
            title: span.getAttribute('data-title'),
            value: span.textContent
          })
        })
      })
    }
    this.renderPrintHTML()
  }
  printAll() {
    const labels = [...this.printList.querySelectorAll('label')]
    if (!labels.length) {
      new PageMsg({
        type: 'error',
        heading: 'No Tags Found',
        msg: 'Add at least one tag to print list'
      })
      return
    }
    this.tagsToPrint = {}
    labels.forEach((label, index) => {
      const img_url = label.querySelector('.print-tag-label__img').style.backgroundImage
      const spans = [...label.querySelectorAll('span')]
      this.tagsToPrint[index] = {}
      this.tagsToPrint[index].details = []
      this.tagsToPrint[index].img_url = img_url
      spans.forEach((span) => {
        if (!span.textContent.trim().length) return
        this.tagsToPrint[index].details.push({
          title: span.getAttribute('data-title'),
          value: span.textContent
        })
      })
    })
    this.renderPrintHTML()
  }
  renderPrintHTML() {
    this.renderedHTMLToPrint = ''
    for (const key in this.tagsToPrint) {
      const obj = this.tagsToPrint[key]
      let renderDetailsHTML = () => {
        let html = ''
        if (obj.details.length) {
          for (const details in obj.details) {
            if (obj.details[details].title && obj.details[details].value) {
              html += `
              <div>
                <span>${obj.details[details].title}</span>
                <span>${obj.details[details].value}</span>
              </div>
              `
            }
          }
        }
        return html
      }
      this.renderedHTMLToPrint += `
	      <div id="tagPreview" class="tag-preview">
		      <img class="tag-preview__logo" src="./assets/blue-logo.svg" alt="Icebox logo">
		      <div id="tagPreviewImage" class="tag-preview__item-img --filled" style="background-image:${obj.img_url}"></div>
		      <div id="tagPreviewDetails" class="tag-preview__details --filled">
            ${renderDetailsHTML()}
          </div>
	      </div>
      `
    }
    console.log(this.renderedHTMLToPrint)
  }

  /**
   * 
   * Bind Events
   */
  bindPreviewInputs() {
    if (this.previewInputsHolder) {
      const textInputsArr = [...this.previewInputsHolder.querySelectorAll('input[type="text"]')]
      textInputsArr.forEach((input, index, inputs) => {
        this.previewInputs.push(input)
        this.previewOutputObj[index] = {
          id: input.id,
          value: '',
          title: input.closest('div').querySelector('label').innerHTML
        }

        input.oninput = () => {
          const value = input.value
          this.previewOutputObj[index].value = value
          this.updateOutputPreviewDetails()
        }

        input.addEventListener('change', () => {
          const value = input.value
          const divParent = input.closest('div')
          if (value.length) {
            divParent.classList.add(__FILLED)
          } else {
            divParent.classList.remove(__FILLED)
          }
        })

        input.onblur = () => {
          const value = input.value
          const divParent = input.closest('div')
          if (value.length) {
            divParent.classList.add(__FILLED)
          } else {
            divParent.classList.remove(__FILLED)
          }
        }

        input.onkeydown = (e) => {
          const
            isEnter = e.key === 'Enter' || e.keyCode === 13,
            isBackscape = e.key === 'Backspace' || e.key === 'Delete',
            isEsc = e.key === 'Escape' || e.key === 'Esc',
            isUp = e.key === 'ArrowUp',
            isDown = e.key === 'ArrowDown',
            next = inputs[index + 1],
            prev = inputs[index - 1]

          if (isEnter || isDown) {
            if (next !== undefined) { next.focus() }
          }
          if (isBackscape) {
            if (input.value.length == 0 && prev !== undefined) { prev.focus() }
          }
          if (isEsc) {
            e.preventDefault(); input.blur()
          }
          if (isUp) {
            if (prev !== undefined) { prev.focus() }
          }
        }
      })
    }
  }
  bindPreviewImageUpload() {
    const
      input = document.querySelector('#tag_image'),
      label = document.querySelector('#upload_tag-image'),
      imageElem = this.previewImage

    if (input) {

      function processImage(file) {
        if (file) {
          let reader = new FileReader()
          reader.onload = (e) => {
            imageElem.classList.add(__FILLED)
            imageElem.style.backgroundImage = `url(${e.target.result})`
          }
          reader.readAsDataURL(file)
        }
      }

      if (label) {
        label.ondragover = (e) => {
          e.preventDefault()
          label.classList.add(IS_ACTIVE)
        }
        label.ondragleave = (e) => {
          e.preventDefault()
          label.classList.remove(IS_ACTIVE)
        }
        label.ondrop = (e) => {
          e.preventDefault()
          label.classList.remove(IS_ACTIVE)
          const
            files = [...e.dataTransfer.items],
            file = files.find((item) => { if (item.kind === 'file') { return item } })
          processImage(file.getAsFile())
        }
      }

      input.onchange = (e) => {
        const file = [...e.target.files][0]
        processImage(file)
      }

    }
  }
  bindTagHover() {
    const tag = this.tagElem
    if (tag) {
      const row = tag.closest('.print-tag__row')
      const elementInRow = [...row.querySelectorAll('*')]
      window.previewTagHoverTimeout = undefined

      tag.addEventListener('mouseover', () => {
        window.previewTagHoverTimeout = setTimeout(() => {
          tag.classList.add(__HOVERED)
        }, 800)
      })

      tag.addEventListener('mouseleave', () => {
        clearTimeout(window.previewTagHoverTimeout)
        tag.classList.remove(__HOVERED)
      })
    }
  }
  bindClear() {
    const elemArr = [...document.querySelectorAll('[data-tag-evt="clearInputs"]')]
    for (const elem of elemArr) {
      elem.addEventListener('click', () => {
        this.clearPreviewInputs()
        this.updatePreviewObjFromInputs()
        this.updateOutputPreviewDetails()
      })
    }
  }
  bindPrintListItemToggle() {
    this.extendPrintListItemToggle()
  }
  bindSave() {
    document.querySelectorAll('[data-tag-evt="save"]').forEach((btn) => {
      btn.onclick = () => { this.saveTag() }
    })
  }
  bindPrintListClick() {
    if (this.printList) {
      this.printList.addEventListener('click', () => {
        this.observePrintList()
      })
    }
  }
  bindPrint() {
    const selectedArr = [...document.querySelectorAll('[data-tag-evt="print_selected"]')]
    selectedArr.forEach((btn) => {
      btn.onclick = () => { this.printSelected() }
    })
    const allArr = [...document.querySelectorAll('[data-tag-evt="print_all"]')]
    allArr.forEach((btn) => {
      btn.onclick = () => { this.printAll() }
    })
  }

  /**
   * 
   * Init
   */
  init() {
    this.bindPreviewInputs()
    this.bindPreviewImageUpload()
    this.bindClear()
    this.observePrintList()
    this.bindPrintListItemToggle()
    this.bindPrintListClick()
    this.bindPrint()
    this.bindSave()
  }
}