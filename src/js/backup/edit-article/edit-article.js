/**
 * 
 * Edit Article Page
 * {@category Edit Article}
 * {@page add-blog.twig}
 * 
 */
var EditArticle = function (articleContent, options) {
  articleContent = document.querySelector(`.${articleContent}`)
  if (!articleContent) {
    error('Article content not found', 'ECA-1')
    throw new Error(`EditArticle ERROR : articleContent is required : ${articleContent}`)
  }
  this.articleContent = articleContent
  this.loremMd = shortLoremText
  this.loremMd = mediumLoremText
  var options = options || {
    setInitialLayout: true
  }
  /**
   * 
   * Utils
   * 
   */
  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  function bind(targets, events, callback) {
    for (const target of toArray(targets)) {
      for (const event of toArray(events)) {
        target.addEventListener(event, callback)
      }
    }
  }

  function append(parent, ...childs) {
    for (const child of childs) {
      parent.appendChild(child)
    }
  }

  function prepend(parent, ...childs) {
    for (const child of childs) {
      parent.insertBefore(child, parent.firstChild)
    }
  }

  function hide(...targets) {
    for (const target of toArray(targets)) {
      target.style.display = 'none'
    }
  }

  function show(...targets) {
    for (const target of toArray(targets)) {
      target.style.display = 'block'
    }
  }

  function error(text, errCode) {
    errCode = errCode || 'Undefined'
    text = text || 'Undefined'
    const els = document.querySelectorAll('.edit-article-error')
    const offset = els.length
    const error = createElem('div', {
      className: 'edit-article-error',
      innerHTML: `
        <span>ERR CODE: ${errCode}</span>
        <span data-edit-error>${text}</span>
        `,
      style: {
        'margin-bottom': `${offset * 10}px`
      }
    })
    document.body.appendChild(error)
    const show = () => addClasses(error, IS_VISIBLE)
    const hide = () => error.remove()
    setTimeout(show, 1)
    bind(error, 'click', hide)
  }

  function clearValue(...targets) {
    for (const target of toArray(targets)) {
      target.value = ''
    }
  }

  function setValue(value, ...targets) {
    for (const target of toArray(targets)) {
      target.value = value
    }
  }

  function clearSelection() {
    const selection = window.getSelection()
    if (selection.rangeCount == 0) return
    selection.removeAllRanges()
  }

  function removeClasses(target, ...classes) {
    if (!target) throw new Error('removeClasses ERROR : target not found')
    if (!classes) throw new Error('removeClasses ERROR : Expected at least one class')
    for (const cls of classes) {
      target.classList.remove(cls)
    }
  }

  function addClasses(target, ...classes) {
    if (!target) throw new Error('addClasses ERROR : target not found')
    if (!classes) throw new Error('addClasses ERROR : Expected at least one class')
    for (const cls of classes) {
      target.classList.add(cls)
    }
  }

  function getCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-GB', options);
    return currentDate;
  }

  function closestParent(target, selector) {
    if (target && target.parentNode) {
      return target.parentNode.closest(selector)
    }
    throw new Error('closestParent ERROR : target not found')
  }

  function createElem(tagName, options) {
    const { className, id, innerHTML, style, attributes, toAppend } = options
    const elem = document.createElement(tagName)
    if (className) elem.className = className;
    if (id) elem.id = id;
    if (innerHTML) elem.innerHTML = innerHTML;
    if (style) {
      for (const key in options.style) { elem.style[key] = options.style[key] }
    }
    if (attributes) {
      for (const key in options.attributes) { elem.setAttribute(key, options.attributes[key]) }
    }
    if (toAppend) {
      for (const child of toArray(toAppend)) { elem.appendChild(child) }
    }
    return elem
  }

  function append(parent, ...childs) {
    if (parent instanceof NodeList || parent instanceof HTMLCollection || parent instanceof Array) {
      throw new Error('parent must be an element')
    } else {
      for (const child of childs) { parent.appendChild(child) }
    }
  }

  function updateSectionsControls() {
    const update = () => {
      const sections = [...document.querySelectorAll('.article-content-section')]
        .filter(section => section.querySelector('.content-section-controls') !== null)

      for (const section of sections) {
        const attr = 'data-section-modify'
        const upBtn = section.querySelector(`[${attr}="moveUp"]`)
        const downBtn = section.querySelector(`[${attr}="moveDown"]`)
        const checkSectionPosition = () => {
          section.previousElementSibling === null ? upBtn.disabled = true : upBtn.disabled = false
          section.nextElementSibling === null ? downBtn.disabled = true : downBtn.disabled = false
        }

        checkSectionPosition()
      }
    }
    return update()
  }

  function updateCover(imgUrl) {
    const holder = document.querySelector('.article-cover')
    const box = document.querySelector('[data-edit-box="cover"]')
    if (!holder || !box) throw new Error('appendCover ERROR : holder or box not found')

    const img = createElem('img', {
      className: 'article_editable',
      style: {
        'background-image': `url(${imgUrl})`
      }
    })
    append(holder, img)
    holder.classList.add('editable')
    hide(box)

    const toggle = () => {
      img.remove()
      holder.classList.remove('editable')
      box.style.display = 'flex'
    }
    bind(img, 'click', toggle)
  }

  /**
   * 
   * Create Section Elements
   * 
   */

  var Create = new Object()
  Create.blogCard = () => {
    const card = createElem('div', {
      className: 'blog-card',
      innerHTML: `
      <a href="#" target="_blank" class="blog-card__media">
        <img src="./assets/product-sample1.webp" alt="">
      </a>
      <div class="blog-card__details">
        <h5 class="blog-card__name">
          <a href="" target="_blank">Prong Set Diamond Tennis Bracelet 14K Solid Gold 1.50ctw</a>
        </h5>
        <span class="blog-card__price">$11,190</span>
        <a href="#" target="_blank" class="blog-card__link">Shop Now</a>
        <input data-input="blogCardLink" type="text" placeholder="Paste product link" class="blog-card__input">
      </div>
      `
    })
    return card
  }
  Create.disclaimer = () => {
    return createElem('div', { className: 'blog__cards-disclaimer' })
  }
  Create.sectionControls = () => {
    const controls = createElem('div', {
      className: 'content-section-controls',
      innerHTML: `
      <button data-section-modify="moveUp">Move Up</button>
      <button data-section-modify="moveDown">Move Down</button>
      <button data-section-modify="remove">Remove</button>
      `
    })
    return controls
  }

  /**
   * 
   * Create Sections
   * 
   */
  var CreateSection = new Object()
  CreateSection.largeTitle = () => {
    const section = createElem('div', {
      className: 'article-content-section --heading'
    })
    const heading = createElem('h3', {
      innerHTML: 'Large Heading',
      attributes: {
        contenteditable: true,
        spellcheck: false
      }
    })
    append(section, heading, Create.sectionControls())
    return section
  }
  CreateSection.tinyTitle = () => {
    const section = createElem('div', {
      className: 'article-content-section --heading'
    })
    const heading = createElem('h4', {
      innerHTML: 'Tiny Heading',
      attributes: {
        contenteditable: true,
        spellcheck: false
      }
    })
    append(section, heading, Create.sectionControls())
    return section
  }
  CreateSection.textBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --text'
    })
    const p = createElem('p', {
      className: 'tip_edit',
      innerHTML: this.loremMd,
      attributes: {
        contenteditable: true,
        spellcheck: false
      }
    })
    append(section, p, Create.sectionControls())
    return section
  }
  CreateSection.spacer = () => {
    const section = createElem('div', {
      className: 'article-content-section --spacer'
    })
    append(section, Create.sectionControls())
    return section
  }
  CreateSection.productBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --product'
    })
    const grid = createElem('div', { className: 'blog__cards-grid' })
    const moreBtn = createElem('button', {
      className: 'blog-edit-box',
      attributes: {
        'data-content-edit': true,
        'data-edit-box': 'addProductCard'
      },
      innerHTML: `<span>Add Product</span>`
    })
    const disclaimer = Create.disclaimer()
    const card = Create.blogCard()
    append(grid, card, moreBtn)
    append(section, grid, disclaimer, Create.sectionControls())
    return section
  }
  CreateSection.sliderBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --slider',
      innerHTML: `
      <div class="blog__cards-disclaimer"></div>
      `
    })
    const inputs = []
    for (let i = 0; i < 3; i++) {
      const input = createElem('input', {
        className: 'blog__product-input',
        attributes: {
          placeholder: 'Paste product link',
          'data-input': 'blogSliderCard',
          'data-input-initial': true,
          required: true
        }
      })
      inputs.push(input)
    }
    append(section, ...inputs, Create.sectionControls())
    return section
  }
  CreateSection.ytEmbed = () => {
    const section = createElem('div', {
      className: 'article-content-section --yt-embed'
    })
    const disclaimer = createElem('div', {
      className: 'blog__cards-disclaimer'
    })
    const textarea = createElem('textarea', {
      className: 'blog__product-input',
      attributes: {
        placeholder: 'YouTube Embed Link',
        'data-input': 'ytEmbed'
      }
    })
    append(section, disclaimer, textarea, Create.sectionControls())
    return section
  }
  CreateSection.list = () => {
    return
  }

  /**
   * 
   * Append Welcome
   * 
   */
  var HandleWelcome = new Object()
  HandleWelcome.heading = (input) => {
    const
      value = input.value,
      holder = document.querySelector('.article__title-wrap'),
      box = input.closest('.blog-edit-box')
    if (!holder) throw new Error('JS : Append Welcome Heading : Title Holder not found')
    if (!box) throw new Error('JS : Append Welcome Heading : Title Box not found')
    if (value) {
      const heading = createElem('h3', {
        className: 'article-title editable',
        innerHTML: value
      })
      prepend(holder, heading)
      hide(box)
      clearValue(input)

      const toggle = () => {
        const value = heading.innerHTML
        heading.remove()
        show(box)
        setValue(value, input)
        input.focus()
      }
      bind(heading, ['click', 'contextmenu'], toggle)
    }
  }
  HandleWelcome.summary = (input) => {
    const value = input.value ? /lorem/i.test(input.value) ? shortLoremText : input.value : shortLoremText
    const holder = document.querySelector('.article__title-wrap')
    const box = input.closest('.blog-edit-box')
    if (!holder) throw new Error('JS : Append Welcome Summary : Title Holder not found')
    if (!box) throw new Error('JS : Append Welcome Summary : Title Box not found')

    const summary = createElem('p', {
      className: 'article-summary editable',
      innerHTML: value
    })
    append(holder, summary)
    hide(box)
    clearValue(input)

    const toggle = () => {
      const value = /Lorem/gi.test(summary.innerHTML) ? '' : summary.innerHTML
      summary.remove()
      show(box)
      setValue(value, input)
      input.focus()
    }
    bind(summary, ['click', 'contextmenu'], toggle)
  }
  HandleWelcome.minutes = (input) => {
    const value = input.value
    const holder = document.querySelector('.article-welcome')
    const box = input.closest('.blog-edit-box')
    if (!holder) throw new Error('JS : Append Welcome Minutes : Minutes Holder not found')
    if (!box) throw new Error('JS : Append Welcome Minutes : Minutes Box not found')

    const minutes = createElem('span', {
      className: 'read-time editable',
      innerHTML: `${value} min reading`
    })
    append(holder, minutes)
    hide(box)
    clearValue(input)

    const toggle = () => {
      const value = minutes.innerHTML.replace(' min reading', '');
      minutes.remove()
      show(box)
      setValue(value, input)
      input.focus()
    }
    bind(minutes, ['click', 'contextmenu'], toggle)
  }
  HandleWelcome.author = (input) => {
    const
      value = input.value,
      holder = document.querySelector('.post-author'),
      box = input.closest('.blog-edit-box')
    if (!holder) throw new Error('JS : Append Welcome Author : Author Holder not found')
    if (!box) throw new Error('JS : Append Welcome Author : Author Box not found')

    if (value) {
      const element = createElem('span', {
        className: 'article_editable',
        innerHTML: value
      })
      const date = createElem('span', {
        className: 'article_editable',
        innerHTML: `Posted on ${getCurrentDate()}`
      })

      append(holder, element, date)
      hide(box)
      clearValue(input)

      const toggle = () => {
        const value = element.innerHTML
        element.remove()
        date.remove()
        show(box)
        setValue(value, input)
        input.focus()
      }
      bind(element, ['click', 'contextmenu'], toggle)
      bind(date, ['click', 'contextmenu'], toggle)
    }
  }
  HandleWelcome.cover = (input) => {
    const box = closestParent(input, '.blog-edit-box')
    if (!box) throw new Error('JS : Append Welcome Cover : Cover Edit Box not found')

    function processFile(file) {
      if (!file) throw new Error('No file selected')
      if (!file.type.match('image.*')) throw new Error('Not an image')
      let reader = new FileReader()
      reader.onload = (e) => {
        updateCover(e.target.result)
      }
      reader.readAsDataURL(file)
    }

    box.onclick = () => { input.click() }
    input.onchange = (e) => {
      processFile(e.target.files[0])
      input.value = ''
    }
    box.ondragover = (e) => {
      e.preventDefault()
      box.classList.add(IS_ACTIVE)
    }
    box.ondragleave = (e) => {
      e.preventDefault()
      box.classList.remove(IS_ACTIVE)
    }
    box.ondrop = (e) => {
      e.preventDefault()
      box.classList.remove(IS_ACTIVE)
      processFile(e.dataTransfer.files[0])
    }
  }

  /**
   * 
   * Add Sections
   * 
   */
  var AddSection = new Object()
  AddSection.largeTitle = () => {
    const section = CreateSection.largeTitle()
    append(articleContent, section)
  }
  AddSection.tinyTitle = () => {
    const section = CreateSection.tinyTitle()
    append(articleContent, section)
  }
  AddSection.textBlock = () => {
    const section = CreateSection.textBlock()
    append(articleContent, section)
  }
  AddSection.spacer = () => {
    const section = CreateSection.spacer()
    append(articleContent, section)
  }
  AddSection.productBlock = () => {
    const section = CreateSection.productBlock()
    append(articleContent, section)
  }
  AddSection.sliderBlock = () => {
    const section = CreateSection.sliderBlock()
    append(articleContent, section)
  }
  AddSection.ytEmbed = () => {
    const section = CreateSection.ytEmbed()
    append(articleContent, section)
  }
  AddSection.list = () => {
    return
  }

  /**
   * 
   * Section Modify Events
   * 
   */
  var _section = new Object()
  _section.remove = (section) => {
    const h = section.scrollHeight
    section.style.height = h + 'px'
    setTimeout(() => {
      section.style.height = 0
      section.style.opacity = 0
      setTimeout(() => {
        section.remove()
        updateSectionsControls()
      }, getTransitionTime(section))
    }, 1);
  }
  _section.moveUp = (section) => {
    const prev = section.previousElementSibling
    if (prev !== null) {
      section.style.opacity = 0
      prev.style.opacity = 0
      setTimeout(() => {
        articleContent.insertBefore(section, prev)
        updateSectionsControls()
        setTimeout(() => {
          section.style.opacity = 1
          prev.style.opacity = 1
        }, 1);
      }, getTransitionTime(section))
    }
  }
  _section.moveDown = (section) => {
    const next = section.nextElementSibling
    if (next !== null) {
      section.style.opacity = 0
      next.style.opacity = 0
      setTimeout(() => {
        articleContent.insertBefore(next, section)
        setTimeout(() => {
          section.style.opacity = 1
          next.style.opacity = 1
        }, 1);
        updateSectionsControls()
      }, getTransitionTime(section))
    }
  }

  /**
   * 
   * Bind Document Events
   * --section controls
   * --add product : product block
   * --add slider : slider block
   * --youtube embed input
   */
  var BindDocument = new Object()
  BindDocument.sectionControls = () => {
    document.addEventListener('click', (event) => {
      const target = event.target
      const attr = target.getAttribute('data-section-modify')
      if (attr) {
        const section = closestParent(target, '.article-content-section')
        const content = articleContent
        if (!section) throw new Error(`Expected to find closest article-content-section`)
        switch (attr) {
          case 'remove':
            _section.remove(section)
            break;
          case 'moveUp':
            _section.moveUp(section)
            break;
          case 'moveDown':
            _section.moveDown(section)
            break;
        }
      }
    })
  }
  BindDocument.addProductCard = () => {
    document.addEventListener('click', (event) => {
      const target = event.target
      if (target.closest('[data-edit-box="addProductCard"]')) {
        const grid = target.closest('.blog__cards-grid')
        if (!grid) throw new Error(`Expected to find closest .blog__cards-grid`)
        const card = Create.blogCard()
        const arr = [...grid.querySelectorAll('.blog-card')]
        if (!arr.length) {
          t.before(card)
        } else {
          arr.at(-1).after(card)
        }
      }
    })
  }
  BindDocument.ytEmbedInput = () => {
    const validateRegExp = /^<iframe.*src=["'].*youtube.*["'].*<\/iframe>$/i
    document.addEventListener('input', (event) => {
      const target = event.target
      const value = target.value
      if (target.closest('textarea[data-input="ytEmbed"]')) {
        const section = target.closest('.article-content-section')
        if (!section) throw new Error(`Expected to find closest article-content-section`)

        if (value.length == 0) {
          removeClasses(target, __VALID, __INVALID)
          removeClasses(section, __VALID, __INVALID, __PENDING)
          const iFrame = section.querySelector('iframe')
          if (iFrame) iFrame.remove()
          return
        } else {
          if (validateRegExp.test(value)) {
            addClasses(target, __VALID)
            addClasses(section, __VALID, __PENDING)
            removeClasses(target, __INVALID)
            removeClasses(section, __INVALID)
            target.blur()
            setTimeout(() => {
              section.insertAdjacentHTML('afterbegin', value)
              setTimeout(() => {
                section.classList.remove(__PENDING)
              }, 1500);
            }, 200);
          } else {
            const iFrame = section.querySelector('iframe')
            if (iFrame) iFrame.remove()
            addClasses(target, __INVALID)
            addClasses(section, __INVALID)
            removeClasses(target, __VALID)
            removeClasses(section, __VALID, __PENDING)
          }
        }
      }
    })
  }
  BindDocument.sliderInput = () => {
    const validate = (input) => {
      const val = input.value
      let valid

      if (val.length == 0) return
      const id = val.split('-').at(-1)
      const urlRegex = /^(?:https?:\/\/)?(?:www\.)?icebox\.com\/(?:product\/)?[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/i

      if (id.match(/^[0-9]+$/) && urlRegex.test(val) && id.length >= 4) {
        addClasses(input, __VALID)
        removeClasses(input, __INVALID)
        valid = true
      } else {
        addClasses(input, __INVALID)
        removeClasses(input, __VALID)
        valid = false
      }

      return valid
    }

    document.addEventListener('input', (e) => {
      const t = e.target
      if (t.closest('[data-input="blogSliderCard"]')) {
        const val = t.value
        const nextInput = t.nextElementSibling ? t.nextElementSibling.tagName === 'INPUT' ? t.nextElementSibling : null : null

        if (val.length === 0) {
          t.classList.remove(__VALID)
          t.classList.remove(__INVALID)
          if (nextInput && !nextInput.required) {
            nextInput.remove()
            return
          }
        } else {
          validate(t)
          if (!nextInput) {
            if (validate(t)) {
              const input = createElem('input', {
                className: 'blog__product-input',
                attributes: {
                  placeholder: 'Paste product link',
                  'data-input': 'blogSliderCard'
                }
              })
              t.after(input)
            }
          } else {
            if (!nextInput.required && !(validate(nextInput))) {
              nextInput.remove()
            }
          }
        }
      }
    })
  }
  BindDocument.selectionChange = () => {
    document.addEventListener('selectionchange', (event) => {
      const element = event.target.activeElement
      const selection = window.getSelection()
      Tip.hide()
      if (String(selection).length > 0) {
        const range = selection.getRangeAt(0)
        const anchor = selection.anchorNode
        let parent = anchor.parentElement
        if (parent.tagName === 'SPAN' || parent.tagName === 'A') {
          parent = parent.parentNode.closest('p.tip_edit')
        }
        if (parent) {
          if (parent.classList.contains('tip_edit') && String(selection).length > 0) {
            Tip.move(range)
          }
        }
      }
    })
  }

  var Tip = new Object()
  Tip.move = (selectionRange) => {
    const tip = document.querySelector('.edit-tip')
    if (!tip || !selectionRange) return
    const rangeRect = selectionRange.getBoundingClientRect()
    const tipRect = tip.getBoundingClientRect()
    const left = Math.min(
      Math.max(rangeRect.left + rangeRect.width / 2 - tipRect.width / 2),
      window.innerWidth - tipRect.width - 8
    )
    tip.style.top = `${rangeRect.top + window.scrollY - 54}px`
    tip.style.left = `${left}px`
    tip.classList.add(IS_VISIBLE)
  }
  Tip.hide = () => {
    const tip = document.querySelector('.edit-tip')
    if (!tip) return
    tip.classList.remove(IS_VISIBLE)
  }
  Tip.bind = () => {
    const arr = [
      ...document.querySelectorAll('[data-edit-tip="bold"]'),
      ...document.querySelectorAll('[data-edit-tip="italic"]'),
      ...document.querySelectorAll('[data-edit-tip="highlight"]'),
      ...document.querySelectorAll('[data-edit-tip="highlightFull"]'),
      ...document.querySelectorAll('[data-edit-tip="list"]'),
      ...document.querySelectorAll('[data-edit-tip="clear"]'),
      ...document.querySelectorAll('[data-edit-tip="link"]')
    ]
    for (const btn of arr) {
      const cls = btn.dataset.editTip
      if (!cls) throw new Error(`Expected to find data-edit-tip attribute`)
      btn.addEventListener('click', function () {
        Editable.wrapIntoSpan(cls)
        clearSelection()
      })
    }
  }

  var Editable = new Object()
  Editable.clear = function (spans) {
    spans = toArray(spans)
    for (const span of spans) {
      const text = span.textContent
      const fragment = document.createDocumentFragment()
      const div = document.createElement('div')

      div.innerHTML = text
      while (div.firstChild) {
        fragment.appendChild(div.firstChild)
      }
      span.parentNode.replaceChild(fragment, span)
    }
  }
  Editable.wrap = function (range, cls, customTag) {
    const tag = customTag || 'span'
    const attributes = tag == 'a' ? {
      href: '#',
      target: '_blank'
    } : {}
    const currentFragment = range.cloneContents()
    const newSpan = createElem(tag, { className: cls, toAppend: currentFragment, attributes })
    range.deleteContents()
    range.insertNode(newSpan)
  }
  Editable.wrapIntoSpan = (cls) => {
    const selection = window.getSelection()
    if (String(selection).length < 1) {
      error('Expected to have selection', 'ECA-2')
      throw new Error(`Expected to have selection`)
    }
    const anchor = selection.anchorNode
    if (anchor === null) {
      error('Expected selection to have anchor', 'ECA-3')
      throw new Error(`Expected selection to have anchor`)
    }
    const parent = anchor.parentElement
    const paragraphParent = parent.classList.contains('tip_edit') ? parent : parent.closest('p.tip_edit')
    const range = selection.getRangeAt(0)

    // If no editable paragraph
    if (!paragraphParent) {
      error('Expected to find closest Editable Paragraph', 'ECA-4')
      throw new Error(`Expected to find closest Editable Paragraph`)
    }
    if (!range) {
      error('Expected to have range', 'ECA-5')
      throw new Error(`Expected to have range`)
    }

    // If clear parent
    if (cls === 'clear') {
      const spans = [...paragraphParent.querySelectorAll('span'), ...paragraphParent.querySelectorAll('a')].filter(span => range.intersectsNode(span))
      Editable.clear(spans)
      return
    }

    if (cls === 'link') {
      const spans = [...paragraphParent.querySelectorAll('span'), ...paragraphParent.querySelectorAll('a')].filter(span => range.intersectsNode(span))
      Editable.clear(spans)
      Editable.wrap(range, cls, 'a')
      return
    }

    // If parent is a SPAN
    if (parent.tagName === 'SPAN') {
      parent.className = cls
      return
    }

    // If parent is a LINK
    if (parent.tagName === 'A') {
      let spanParent = parent.parentNode.closest('span')
      if (spanParent) {
        while (spanParent.parentNode.tagName == 'SPAN') {
          spanParent = spanParent.parentNode.closest('span')
        }
        const spansWithinSpanParent = spanParent.querySelectorAll('span')
        Editable.clear([...spansWithinSpanParent, parent])
        spanParent.className = cls
      } else {
        parent.outerHTML = `<span class="${cls}">${parent.textContent}<span>`
      }
      return
    }

    // If parent is a PARAGRAPH
    if (parent.tagName === 'P') {
      const spans = [...parent.querySelectorAll('span'), ...parent.querySelectorAll('a')].filter(span => range.intersectsNode(span))
      Editable.clear(spans)
    }

    // Wrap selection into span
    Editable.wrap(range, cls)
  }

  /**
   * 
   * Main
   * 
   */
  var Article = new Object()
  Article.bindAddSections = function () {
    this.arr = [...document.querySelectorAll('[data-add-section]')]
    for (const box of this.arr) {
      const attr = box.dataset.addSection
      if (!attr) {
        console.error(box, `has no data-add-section attribute`)
        continue
      }
      const func = AddSection[attr]
      if (!func) {
        console.error(box, `has no related function ${attr} in Add Object`)
        continue
      }
      bind(box, 'click', func)
      bind(box, 'click', clearSelection)
      bind(box, 'click', updateSectionsControls)
    }
  }
  Article.bindWelcomeSection = function () {
    const inputsArr = [
      ...document.querySelectorAll('[data-blog-edit="heading"]'),
      ...document.querySelectorAll('[data-blog-edit="summary"]'),
      ...document.querySelectorAll('[data-blog-edit="minutes"]'),
      ...document.querySelectorAll('[data-blog-edit="author"]')
    ]
    const inputCoverUpload = document.querySelector('[data-blog-edit="cover"]')

    for (const input of inputsArr) {
      let attr = input.getAttribute('data-blog-edit')

      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          input.blur()
        }
      }
      const Event = HandleWelcome[attr]
      if (!Event) {
        console.error(input, `has no related function ${attr} in HandleWelcome Object`)
        continue
      }
      input.onblur = () => {
        HandleWelcome[attr](input)
      }
      input.onfocus = () => {
        if (attr == 'minutes') input.select()
      }
      input.oninput = (e) => {
        if (attr == 'minutes') e.target.value = e.target.value.replace(/\D/g, '')
      }
    }
    if (inputCoverUpload) {
      const Event = HandleWelcome.cover
      if (!Event) {
        console.error(inputCoverUpload, `has no related function cover in HandleWelcome Object`)
        return
      }
      HandleWelcome.cover(inputCoverUpload)
    }
  }
  Article.bindDocumentEvents = function () {
    BindDocument.sectionControls()
    BindDocument.addProductCard()
    BindDocument.ytEmbedInput()
    BindDocument.sliderInput()
    BindDocument.selectionChange()
  }
  Article.bindTip = function () {
    Tip.bind()
  }
  Article.setInitialLayout = function () {
    if (!options.setInitialLayout) return
    const { largeTitle, textBlock, spacer } = AddSection
    largeTitle()
    textBlock()
    spacer()
    updateSectionsControls()
  }
  Article.init = function () {
    const funcArr = [
      this.setInitialLayout,
      updateSectionsControls,
      this.bindAddSections,
      this.bindWelcomeSection,
      this.bindDocumentEvents,
      this.bindTip
    ]
    for (const func of funcArr) {
      try { func() }
      catch (err) {
        console.error(err.message)
      }
    }
  }

  Article.add = AddSection
  Article.create = CreateSection
  Article.holder = this.articleContent

  return Article
}