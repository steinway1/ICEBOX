const PageMsg = require('../dynamic/page-msg')

class NoPage {
  constructor() {
    this.grid = document.querySelector('.nopage__categories')
    this.linksArr = [...document.querySelectorAll('.nopage-link[data-id]')]
    if (!this.grid || !this.linksArr.length) return

    this.addEvtArr = [...document.querySelectorAll('[data-evt="addNewTabLink"]')]

    this.saveTimer = null
    this.saveDelay = 2000
    this.saveMsgInstance = null
    this.saveMsgId = 91827
    this.isSaving = false;
    this.pendingSave = false;
    this.hideMsgTimer = null;

    window.noPage = this
    this.init()
  }
  init() {
    this.bindDraggable()
    this.bindInputEvents()
    this.bindAddNewLink()
  }
  bindDraggable() {
    const container = this.grid
    let draggedItem = null
    let dragClone = null
    let placeholder = null
    let isDragging = false
    const saveCallback = this.save.bind(this)

    container.addEventListener('mousedown', function (e) {
      const target = e.target.closest('.nopage-link:not(.--add)')
      const main = e.target.closest('.nopage-link__main')

      if (!target || e.button !== 0) return
      if (!main) return

      draggedItem = target
      isDragging = false

      dragClone = draggedItem.cloneNode(true)
      dragClone.classList.add('dragging-clone')
      document.body.appendChild(dragClone)

      const rect = draggedItem.getBoundingClientRect()
      dragClone.style.width = `${rect.width}px`
      dragClone.style.height = `${rect.height}px`
      dragClone.style.left = `${e.pageX - rect.width / 2}px`
      dragClone.style.top = `${e.pageY - rect.height / 2}px`

      draggedItem.style.display = 'none'
      container.classList.add('--dragging')

      placeholder = document.createElement('div')
      placeholder.className = 'nopage-link-placeholder'
      draggedItem.parentNode.insertBefore(placeholder, draggedItem)

      document.addEventListener('mousemove', onDragStart)
      document.addEventListener('mouseup', stopDrag)
    });

    function onDragStart(e) {
      if (!isDragging) {
        isDragging = true
        document.removeEventListener('mousemove', onDragStart)
        document.addEventListener('mousemove', onDrag)
      }
    }

    function onDrag(e) {
      if (!draggedItem) return

      document.body.style.userSelect = 'none'

      const rect = dragClone.getBoundingClientRect()
      dragClone.style.left = `${e.pageX - rect.width / 2}px`
      dragClone.style.top = `${e.pageY - rect.height / 2}px`

      const elements = document.elementsFromPoint(e.clientX, e.clientY)
      const targetItem = elements.find(
        (el) =>
          el.classList.contains('nopage-link') &&
          el !== draggedItem &&
          el !== placeholder &&
          !el.classList.contains('--add')
      )
      if (targetItem) {
        const rect = targetItem.getBoundingClientRect()
        const middleY = rect.top + rect.height / 2

        if (e.clientY > middleY) {
          container.insertBefore(placeholder, targetItem.nextSibling)
        } else {
          container.insertBefore(placeholder, targetItem)
        }
      }
    }

    function stopDrag() {
      if (!draggedItem) return

      document.body.style.userSelect = 'auto'

      container.insertBefore(draggedItem, placeholder)
      placeholder.remove()
      dragClone.remove()

      draggedItem.style.display = 'flex'
      container.classList.remove('--dragging')
      draggedItem = null
      placeholder = null
      dragClone = null
      isDragging = false

      document.removeEventListener('mousemove', onDrag)
      document.removeEventListener('mouseup', stopDrag)

      saveCallback()
    }
  }
  bindInputEvents() {
    const linksArr = [...document.querySelectorAll('.nopage-link')]
    for (const link of linksArr) {
      if (link.isInitialized) return

      link.isInitialized = true
      this.#bindInputs(link)
    }
  }
  bindAddNewLink() {
    for (const link of this.addEvtArr) {
      link.addEventListener('click', () => {
        this.addNewLink(link)
        this.save()
      })
    }
  }
  #fakeFetchSave(url, data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const fakeResponse = {
          ok: true,
          statusText: 'OK',
          json: async () => ({}),
        };
        resolve(fakeResponse);
      }, 2500);
    })
  }
  showSaveMsg(type, heading, text) {
    if (this.saveMsgInstance) {
      this.saveMsgInstance.destroy()
    }

    this.saveMsgInstance = new PageMsg({
      type,
      heading,
      text,
      id: this.saveMsgId
    })
  }

  // input Events
  #bindInputs(linkElem) {
    const inputArr = [...linkElem.querySelectorAll('input[data-for]')]
    for (const input of inputArr) {

      input.addEventListener('input', () => {
        this.handleInput(input, linkElem)
      })
    }
  }

  // Methods
  addNewLink() {
    const elem = createElem('div', {
      className: 'nopage-link',
      innerHTML: `
      ${this.renderNewLinkInnerHTML()}
      `
    })
    this.#bindInputs(elem)
    this.grid.appendChild(elem)
  }
  renderNewLinkInnerHTML() {
    return `
<a data-href="" href="" class="nopage-link__main">
  <div>
    <img data-src="" src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM=" alt="">
  </div>
  <div>
    <div data-heading="">Empty Heading</div>
    <span>Shop Now</span>
  </div>
</a>
<div class="nopage-link__controls">
  <div class="sign-form__item">
    <div class="sign-form__input-wrap">
      <input data-for="heading" type="text" class="sign-form__input" placeholder="Tab heading" value=""
        required="">
    </div>
  </div>
  <div class="sign-form__item">
    <div class="sign-form__input-wrap">
      <input data-for="href" type="text" class="sign-form__input" placeholder="Link" value="" required="">
    </div>
  </div>
  <div class="sign-form__item">
    <div class="sign-form__input-wrap">
      <input data-for="src" type="text" class="sign-form__input" placeholder="Image URL"
        value="" required="">
    </div>
  </div>
</div>
    `
  }
  handleInput(input, link) {
    if (this.saveTimer) {
      clearTimeout(this.saveTimer)
    }

    const setFor = input.getAttribute('data-for')
    const target = link.querySelector(`[data-${setFor}]`)

    if (setFor === 'heading') {
      target.textContent = input.value ? input.value : 'Empty Heading'
    } else if (setFor === 'src') {
      target.src = input.value ? input.value : ''
    }

    this.saveTimer = setTimeout(() => {
      this.save()
    }, this.saveDelay)
  }
  async save() {
    if (this.hideMsgTimer) clearTimeout(this.hideMsgTimer);

    if (this.isSaving) {
      this.pendingSave = true;
      return;
    }

    try {
      this.isSaving = true;
      this.showSaveMsg('loading', 'Saving...', 'Data is being saved...');
      /**
       * @CHOU Replace here
       * Need to save new data (cards order, new input values)
       */
      const response = await this.#fakeFetchSave();
      if (!response.ok) throw new Error(`Error: ${response.status}`);

      this.showSaveMsg('success', 'Saved!', 'Data saved successfully!');

    } catch (err) {
      this.showSaveMsg('error', 'Error!', 'Failed to save data');
    } finally {
      this.isSaving = false;
      if (this.pendingSave) {
        this.pendingSave = false;
        this.save();
      }
      this.hideMsgTimer = setTimeout(() => {
        this.saveMsgInstance?.destroy();
        this.saveMsgInstance = null;
      }, 2000);
    }
  }
}

module.exports = NoPage