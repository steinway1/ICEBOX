import Splide from '../../splide';

/**
 * Edit Article Page
 * {@category Blog}
 * {@page add-blog.twig}
 */
var EditArticle = function (articleContent, options) {
  articleContent = document.querySelector(`.${articleContent}`);
  if (!articleContent) {
    showMessage('error', 'Article content not found, ECA-1');
    throw new Error(`EditArticle ERROR : articleContent is required : ${articleContent}`);
  }
  this.articleContent = articleContent;
  this.loremMd =
    'The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.';
  this.loremMd =
    'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.';
  var options = options || {
    setInitialLayout: true,
  };

  /** ----------------------- Utils Functions ----------------------- */

  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  function bind(targets, events, callback) {
    for (const target of toArray(targets)) {
      for (const event of toArray(events)) {
        target.addEventListener(event, callback);
      }
    }
  }

  function append(parent, ...childs) {
    for (const child of childs) {
      parent.appendChild(child);
    }
  }

  function prepend(parent, ...childs) {
    for (const child of childs) {
      parent.insertBefore(child, parent.firstChild);
    }
  }

  function hide(...targets) {
    for (const target of toArray(targets)) {
      target.style.display = 'none';
    }
  }

  function show(...targets) {
    for (const target of toArray(targets)) {
      target.style.display = 'block';
    }
  }

  function error(text, errCode) {
    errCode = errCode || 'Undefined';
    text = text || 'Undefined';
    const els = document.querySelectorAll('.edit-article-error');
    const offset = els.length;
    const error = createElem('div', {
      className: 'edit-article-error',
      innerHTML: `
        <span>ERR CODE: ${errCode}</span>
        <span data-edit-error>${text}</span>
        `,
      style: {
        'margin-bottom': `${offset * 10}px`,
      },
    });
    document.body.appendChild(error);
    const show = () => addClasses(error, IS_VISIBLE);
    const hide = () => error.remove();
    setTimeout(show, 1);
    // setTimeout(() => {
    //   if (error) hide()
    // }, 7 * 1000);
    bind(error, 'click', hide);
  }

  function clearValue(...targets) {
    for (const target of toArray(targets)) {
      target.value = '';
    }
  }

  function setValue(value, ...targets) {
    for (const target of toArray(targets)) {
      target.value = value;
    }
  }

  function clearSelection() {
    const selection = window.getSelection();
    if (selection.rangeCount == 0) return;
    selection.removeAllRanges();
  }

  function removeClasses(target, ...classes) {
    if (!target) throw new Error('removeClasses ERROR : target not found');
    if (!classes) throw new Error('removeClasses ERROR : Expected at least one class');
    for (const cls of classes) {
      target.classList.remove(cls);
    }
  }

  function addClasses(target, ...classes) {
    if (!target) throw new Error('addClasses ERROR : target not found');
    if (!classes) throw new Error('addClasses ERROR : Expected at least one class');
    for (const cls of classes) {
      target.classList.add(cls);
    }
  }

  function getCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-GB', options);
    return currentDate;
  }

  function closestParent(target, selector) {
    if (target && target.parentNode) {
      return target.parentNode.closest(selector);
    }
    throw new Error('closestParent ERROR : target not found');
  }

  function createElem(tagName, options) {
    const { className, id, innerHTML, style, attributes, toAppend } = options;
    const elem = document.createElement(tagName);
    if (className) elem.className = className;
    if (id) elem.id = id;
    if (innerHTML) elem.innerHTML = innerHTML;
    if (style) {
      for (const key in options.style) {
        elem.style[key] = options.style[key];
      }
    }
    if (attributes) {
      for (const key in options.attributes) {
        elem.setAttribute(key, options.attributes[key]);
      }
    }
    if (toAppend) {
      for (const child of toArray(toAppend)) {
        elem.appendChild(child);
      }
    }
    return elem;
  }

  function append(parent, ...childs) {
    if (parent instanceof NodeList || parent instanceof HTMLCollection || parent instanceof Array) {
      throw new Error('parent must be an element');
    } else {
      for (const child of childs) {
        parent.appendChild(child);
      }
    }
  }

  function updateSectionsControls() {
    const update = () => {
      const sections = [...document.querySelectorAll('.article-content-section')].filter(
        section => section.querySelector('.content-section-controls') !== null,
      );

      for (const section of sections) {
        const attr = 'data-section-modify';
        const upBtn = section.querySelector(`[${attr}="moveUp"]`);
        const downBtn = section.querySelector(`[${attr}="moveDown"]`);
        const checkSectionPosition = () => {
          section.previousElementSibling === null ? (upBtn.disabled = true) : (upBtn.disabled = false);
          section.nextElementSibling === null ? (downBtn.disabled = true) : (downBtn.disabled = false);
        };

        checkSectionPosition();
      }
    };
    return update();
  }

  function updateCover(imgUrl) {
    const holder = document.querySelector('.article-cover');
    const box = document.querySelector('[data-edit-box="cover"]');
    if (!holder || !box) throw new Error('appendCover ERROR : holder or box not found');

    const img = createElem('img', {
      className: 'article_editable',
      style: {
        'background-image': `url(${imgUrl})`,
      },
      attributes: {
        id: 'article_cover',
      },
    });
    append(holder, img);
    holder.classList.add('editable');
    hide(box);

    const toggle = () => {
      img.remove();
      holder.classList.remove('editable');
      box.style.display = 'flex';
    };
    bind(img, 'click', toggle);
    window.UPLOADED_BLOG_IMG = imgUrl;
  }

  function bindImageSection(section) {
    const input = section.querySelector('.blog__image-input');
    const box = section.querySelector('.blog-edit-box');

    if (!box) throw new Error('JS : Append Welcome Cover : Cover Edit Box not found');
    if (!input) throw new Error('JS : Append Welcome Cover : Cover Input not found');

    function updateImage(imgUrl) {
      box.style.backgroundImage = `url(${imgUrl})`;
      box.classList.add('--filled');
    }

    function processFile(file) {
      if (!file) throw new Error('No file selected');
      if (!file.type.match('image.*')) throw new Error('Not an image');

      // Create a new FileList with the single file to preserve it in the input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;

      let reader = new FileReader();
      reader.onload = e => {
        updateImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    box.onclick = () => {
      input.click();
    };
    input.onchange = e => {
      processFile(e.target.files[0]);
    };
    box.ondragover = e => {
      e.preventDefault();
      box.classList.add(IS_ACTIVE);
    };
    box.ondragleave = e => {
      e.preventDefault();
      box.classList.remove(IS_ACTIVE);
    };
    box.ondrop = e => {
      e.preventDefault();
      box.classList.remove(IS_ACTIVE);
      processFile(e.dataTransfer.files[0]);
    };
  }

  function bindLinkCardImageUpload(card) {
    const input = card.querySelector('input');
    const box = card.querySelector('.blog-edit-box');

    if (!box) throw new Error('JS : Append Welcome Cover : Cover Edit Box not found');
    if (!input) throw new Error('JS : Append Welcome Cover : Cover Input not found');

    function updateImage(imgUrl) {
      box.style.backgroundImage = `url(${imgUrl})`;
      box.classList.add('--filled');
    }

    function processFile(file) {
      if (!file) throw new Error('No file selected');
      if (!file.type.match('image.*')) throw new Error('Not an image');

      // Create a new FileList with the single file to preserve it in the input
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      input.files = dataTransfer.files;

      let reader = new FileReader();
      reader.onload = e => {
        updateImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    box.onclick = () => {
      input.click();
    };
    input.onchange = e => {
      processFile(e.target.files[0]);
    };
    box.ondragover = e => {
      e.preventDefault();
      box.classList.add(IS_ACTIVE);
    };
    box.ondragleave = e => {
      e.preventDefault();
      box.classList.remove(IS_ACTIVE);
    };
    box.ondrop = e => {
      e.preventDefault();
      box.classList.remove(IS_ACTIVE);
      processFile(e.dataTransfer.files[0]);
    };
  }

  /** ----------------------- Create Section Elements ----------------------- */

  var Create = new Object();

  /** Create : Product Card */
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
        <input data-input="blogCardLink" type="text" placeholder="Paste product link" class="blog-card__input" required="true">
      </div>
      `,
    });
    return card;
  };

  Create.LinkCard = () => {
    const inputBox = createElem('div', {
      className: 'blog-edit-box',
      attributes: {
        'data-edit-box': 'cardImage',
      },
      innerHTML: `
        <input type="file" name="files[]" accept="image/jpeg, image/png, image/webp, image/gif" data-input="cardImage">
      `,
    });

    const card = createElem('div', {
      className: 'blog-link-card',
      innerHTML: `
        <button class="blog-link-card__remove-btn"></button>
        <a href="javascript:void(0)"></a>
        <div>
          <h4 contenteditable>Some title goes here...</h4>
          <p contenteditable>Some description goes here..</p>
          <input data-input="linkCardLink" type="text" placeholder="Link (optional)" class="blog-card__input">
        </div>
      `,
    });

    card.querySelector('a').appendChild(inputBox);
    bindLinkCardImageUpload(card);
    return card;
  };

  /** Create : Disclaimer */
  Create.disclaimer = () => {
    return createElem('div', { className: 'blog__cards-disclaimer' });
  };

  /** Create : Section Controls */
  Create.sectionControls = () => {
    const controls = createElem('div', {
      className: 'content-section-controls',
      innerHTML: `
      <button data-section-modify="moveUp">Move Up</button>
      <button data-section-modify="moveDown">Move Down</button>
      <button data-section-modify="remove">Remove</button>
      `,
    });
    return controls;
  };

  /** Create : List Item */
  Create.listItem = text => {
    const item = createElem('p', {
      className: 'list-item tip_edit',
      innerHTML: `<p contenteditable="true" spellcheck="false">${text}</p>
      <button class="list-item__remove-btn"></button>
      `,
    });
    return item;
  };

  /** ----------------------- Create Sections ----------------------- */

  var CreateSection = new Object();

  /** Create : Large Title */
  CreateSection.largeTitle = () => {
    const section = createElem('div', {
      className: 'article-content-section --heading',
      attributes: {
        'data-content-type': 'large_title',
      },
    });
    const heading = createElem('h3', {
      innerHTML: 'Large Heading',
      attributes: {
        contenteditable: true,
        spellcheck: false,
      },
    });
    append(section, heading, Create.sectionControls());
    return section;
  };

  /** Create : Tiny Title */
  CreateSection.tinyTitle = () => {
    const section = createElem('div', {
      className: 'article-content-section --heading',
      attributes: {
        'data-content-type': 'tiny_title',
      },
    });
    const heading = createElem('h4', {
      innerHTML: 'Tiny Heading',
      attributes: {
        contenteditable: true,
        spellcheck: false,
      },
    });
    append(section, heading, Create.sectionControls());
    return section;
  };

  /** Create : Text Block */
  CreateSection.textBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --text',
      attributes: {
        'data-content-type': 'text',
      },
    });
    const p = createElem('p', {
      className: 'tip_edit',
      innerHTML: this.loremMd,
      attributes: {
        contenteditable: true,
        spellcheck: false,
      },
    });
    append(section, p, Create.sectionControls());
    return section;
  };

  /** Create : Spacer */
  CreateSection.spacer = () => {
    const section = createElem('div', {
      className: 'article-content-section --spacer',
      attributes: {
        'data-content-type': 'spacer',
      },
    });
    append(section, Create.sectionControls());
    return section;
  };

  /** Create : Spacer Empty */
  CreateSection.spacerEmpty = () => {
    const section = createElem('div', {
      className: 'article-content-section --spacer-empty',
      attributes: {
        'data-content-type': 'spacer_empty',
      },
      innerHTML: `<div class="empty-space-adjust"></div>`,
    });

    const input = createElem('input', {
      className: 'blog__product-input',
      attributes: {
        placeholder: 'Spacer height from 48 to 999',
        'data-input': 'spacerEmpty',
        'data-input-initial': true,
        required: true,
      },
    });

    append(section, input, Create.sectionControls());
    return section;
  };

  /** Create : Product Block */
  CreateSection.productBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --product',
      attributes: {
        'data-content-type': 'product',
      },
    });
    const grid = createElem('div', { className: 'blog__cards-grid' });
    const moreBtn = createElem('button', {
      className: 'blog-edit-box',
      attributes: {
        'data-content-edit': true,
        'data-edit-box': 'addProductCard',
      },
      innerHTML: `<span>Add Product</span>`,
    });
    const disclaimer = Create.disclaimer();
    const card = Create.blogCard();
    append(grid, card, moreBtn);
    append(section, grid, disclaimer, Create.sectionControls());
    return section;
  };

  /** Create : Cards Block */
  CreateSection.cardsBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --cards',
      attributes: {
        'data-content-type': 'cards',
      },
    });
    const grid = createElem('div', { className: 'blog__cards-grid' });

    const moreBtn = createElem('button', {
      className: 'blog-edit-box',
      attributes: {
        'data-content-edit': true,
        'data-edit-box': 'addLinkCard',
      },
      innerHTML: `<span>Add Card</span>`,
    });

    const card = Create.LinkCard();
    append(grid, card, moreBtn);
    append(section, grid, Create.sectionControls());
    return section;
  };

  /** Create : Slider Block */
  CreateSection.sliderBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --slider',
      innerHTML: `
      <div class="blog__cards-disclaimer"></div>
      `,
      attributes: {
        'data-content-type': 'slider',
      },
    });
    const inputs = [];
    for (let i = 0; i < 3; i++) {
      const input = createElem('input', {
        className: 'blog__product-input',
        attributes: {
          placeholder: 'Paste product link',
          'data-input': 'blogSliderCard',
          'data-input-initial': true,
          required: true,
        },
      });
      inputs.push(input);
    }
    append(section, ...inputs, Create.sectionControls());
    return section;
  };

  /** Create : YouTube Embed */
  CreateSection.ytEmbed = () => {
    const section = createElem('div', {
      className: 'article-content-section --yt-embed',
      attributes: {
        'data-content-type': 'youtube',
      },
    });
    const disclaimer = createElem('div', {
      className: 'blog__cards-disclaimer',
    });
    const textarea = createElem('textarea', {
      className: 'blog__product-input',
      attributes: {
        placeholder: 'YouTube Embed Link',
        'data-input': 'ytEmbed',
      },
    });
    append(section, disclaimer, textarea, Create.sectionControls());
    return section;
  };

  /** Create : List */
  CreateSection.list = () => {
    const section = createElem('div', {
      className: 'article-content-section --list',
      attributes: {
        'data-content-type': 'list',
      },
    });
    const listItems = Array(3)
      .fill()
      .map((_, i) =>
        Create.listItem(
          i === 0
            ? 'On the other hand, we denounce with righteous indignation and dislike men who are...'
            : i === 2
              ? 'These cases are perfectly simple and easy to distinguish.'
              : 'In a free hour, when our power of choice is untrammelled and when nothing prevents our being',
        ),
      );

    const addItemBtn = createElem('button', {
      className: 'blog-edit-box',
      attributes: {
        'data-edit-box': 'addListItem',
      },
      innerHTML: `<span>Add List Item</span>`,
    });

    append(section, ...listItems, addItemBtn, Create.sectionControls());
    return section;
  };

  /** Create : Button Link */
  CreateSection.buttonLink = () => {
    // button
    const section = createElem('div', {
      className: 'article-content-section --button',
      attributes: {
        'data-content-type': 'button',
      },
    });

    const btn = createElem('a', {
      className: 'blog__btn-link',
      attributes: {
        href: '#',
        target: '_blank',
      },
      innerHTML: `<span>Explore more</span>`,
    });

    // Inputs
    const inputContainer = createElem('div', {
      className: 'flex-col gap-8',
    });

    const inputUrl = createElem('input', {
      className: 'blog__product-input',
      attributes: {
        placeholder: 'Button link',
        'data-input': 'buttonLink',
      },
    });

    const inputTitle = createElem('input', {
      className: 'blog__product-input',
      attributes: {
        placeholder: 'Button title',
        'data-input': 'buttonTitle',
      },
    });

    // Stylize button
    const stylizeContainer = createElem('div', {
      className: 'flex-wrap gap-16',
    });

    const stylizeColorBlack = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
        <input data-input="button-stylize-theme" type="radio" name="button-stylize-theme" value="black" checked>
        <span>Black theme</span>
      `,
    });

    const stylizeColorBlue = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
        <input data-input="button-stylize-theme" type="radio" name="button-stylize-theme" value="blue">
        <span>Blue theme</span>
      `,
    });

    const stylizeColorGrey = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
        <input data-input="button-stylize-theme" type="radio" name="button-stylize-theme" value="grey">
        <span>Grey theme</span>
      `,
    });

    append(stylizeContainer, stylizeColorBlack, stylizeColorBlue, stylizeColorGrey);
    append(inputContainer, inputUrl, inputTitle);
    append(section, btn, inputContainer, stylizeContainer, Create.sectionControls());
    return section;
  };

  /** Create : Icebox Map */
  CreateSection.map = () => {
    const section = createElem('div', {
      className: 'article-content-section --map',
      attributes: {
        'data-content-type': 'map',
      },
    });

    const iframe = createElem('iframe', {
      attributes: {
        src: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13255.429758921076!2d-84.39182751162193!3d33.841786929379396!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f505f4376e605b%3A0x13dd0214a5f77093!2sIcebox%20Diamonds%20%26%20Watches!5e0!3m2!1sen!2stn!4v1756299034342!5m2!1sen!2stn',
        width: '600',
        height: '450',
        style: 'border:0;',
        allowfullscreen: '',
        loading: 'lazy',
        referrerpolicy: 'no-referrer-when-downgrade',
      },
    });

    // Stylize Map
    const stylizeContainer = createElem('div', {
      className: 'content-section-controls gap-16',
    });

    const stylizeTheme1 = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
            <input data-input="map-stylize-theme" type="radio" name="map-stylize-theme" value="theme1" checked>
            <span>Theme 1</span>
          `,
    });

    const stylizeTheme2 = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
            <input data-input="map-stylize-theme" type="radio" name="map-stylize-theme" value="theme2">
            <span>Theme 2</span>
          `,
    });

    const stylizeTheme3 = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
            <input data-input="map-stylize-theme" type="radio" name="map-stylize-theme" value="theme3">
            <span>Theme 3</span>
          `,
    });

    append(stylizeContainer, stylizeTheme1, stylizeTheme2, stylizeTheme3);
    append(section, iframe, stylizeContainer, Create.sectionControls());
    return section;
  };

  /** Create : Image */
  CreateSection.image = () => {
    const section = createElem('div', {
      className: 'article-content-section --image',
      attributes: {
        'data-content-type': 'image',
      },
    });

    const inputBox = createElem('div', {
      className: 'blog-edit-box',
      attributes: {
        'data-edit-box': 'image',
      },
    });

    const input = createElem('input', {
      className: 'blog__image-input',
      attributes: {
        type: 'file',
        name: 'files[]',
        'data-input': 'image',
        accept: 'image/jpeg, image/png, image/webp, image/gif',
      },
    });

    // Stylize Image
    const stylizeContainer = createElem('div', {
      className: 'content-section-controls gap-16',
    });

    const stylizeTheme1 = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
                <input data-input="image-stylize-theme" type="radio" name="image-stylize-theme" value="16-6" checked>
                <span>16:6</span>
              `,
    });

    const stylizeTheme2 = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
                <input data-input="image-stylize-theme" type="radio" name="image-stylize-theme" value="16-9">
                <span>16:9</span>
              `,
    });

    const stylizeTheme3 = createElem('label', {
      className: 'custom-checkbox',
      innerHTML: `
                <input data-input="image-stylize-theme" type="radio" name="image-stylize-theme" value="4-3">
                <span>4:3</span>
              `,
    });

    append(stylizeContainer, stylizeTheme1, stylizeTheme2, stylizeTheme3);
    append(inputBox, input);
    append(section, inputBox, stylizeContainer, Create.sectionControls());

    return section;
  };

  /** ----------------------- Append Welcome ----------------------- */

  var HandleWelcome = new Object();

  /** Handle Welcome : Heading */
  HandleWelcome.heading = input => {
    const value = input.value;
    const holder = document.querySelector('.article__title-wrap');
    const box = input.closest('.blog-edit-box');

    if (!holder) throw new Error('JS : Append Welcome Heading : Title Holder not found');
    if (!box) throw new Error('JS : Append Welcome Heading : Title Box not found');
    if (value) {
      const heading = createElem('h3', {
        className: 'article-title editable',
        innerHTML: value,
        attributes: {
          id: 'article_title',
        },
      });
      prepend(holder, heading);
      hide(box);
      clearValue(input);

      const toggle = () => {
        const value = heading.innerHTML;
        heading.remove();
        show(box);
        setValue(value, input);
        input.focus();
      };
      bind(heading, ['click', 'contextmenu'], toggle);
    }
  };

  /** Handle Welcome : Summary */
  HandleWelcome.summary = input => {
    const value = input.value ? (/lorem/i.test(input.value) ? 'Add Summary' : input.value) : 'Add Summary';
    const holder = document.querySelector('.article__title-wrap');
    const box = input.closest('.blog-edit-box');
    if (!holder) throw new Error('JS : Append Welcome Summary : Title Holder not found');
    if (!box) throw new Error('JS : Append Welcome Summary : Title Box not found');

    const summary = createElem('p', {
      className: 'article-summary editable',
      innerHTML: value,
      attributes: {
        id: 'article_summary',
      },
    });
    append(holder, summary);
    hide(box);
    clearValue(input);

    const toggle = () => {
      const value = /Lorem/gi.test(summary.innerHTML) ? '' : summary.innerHTML;
      summary.remove();
      show(box);
      setValue(value, input);
      input.focus();
    };
    bind(summary, ['click', 'contextmenu'], toggle);
  };

  /** Handle Welcome : Minutes */
  HandleWelcome.minutes = input => {
    const value = input.value;
    const holder = document.querySelector('.article-welcome');
    const box = input.closest('.blog-edit-box');
    if (!holder) throw new Error('JS : Append Welcome Minutes : Minutes Holder not found');
    if (!box) throw new Error('JS : Append Welcome Minutes : Minutes Box not found');

    const minutes = createElem('span', {
      className: 'read-time editable',
      innerHTML: `${value} min reading`,
      attributes: {
        id: 'article_read_time',
      },
    });
    append(holder, minutes);
    hide(box);
    clearValue(input);

    const toggle = () => {
      const value = minutes.innerHTML.replace(' min reading', '');
      minutes.remove();
      show(box);
      setValue(value, input);
      input.focus();
    };
    bind(minutes, ['click', 'contextmenu'], toggle);
  };

  /** Handle Welcome : Author */
  HandleWelcome.author = input => {
    const value = input.value,
      holder = document.querySelector('.post-author'),
      box = input.closest('.blog-edit-box');
    if (!holder) throw new Error('JS : Append Welcome Author : Author Holder not found');
    if (!box) throw new Error('JS : Append Welcome Author : Author Box not found');

    if (value) {
      const element = createElem('span', {
        className: 'article-author editable',
        innerHTML: value,
        attributes: {
          id: 'article_author',
        },
      });
      const date = createElem('span', {
        className: 'article_editable',
        innerHTML: `Posted on ${getCurrentDate()}`,
        attributes: {
          id: 'article_date',
        },
      });

      append(holder, element, date);
      hide(box);
      clearValue(input);

      const toggle = () => {
        const value = element.innerHTML;
        element.remove();
        date.remove();
        show(box);
        setValue(value, input);
        input.focus();
      };
      bind(element, ['click', 'contextmenu'], toggle);
      bind(date, ['click', 'contextmenu'], toggle);
    }
  };

  /** Handle Welcome : Cover */
  HandleWelcome.cover = input => {
    const box = closestParent(input, '.blog-edit-box');
    if (!box) throw new Error('JS : Append Welcome Cover : Cover Edit Box not found');

    function processFile(file) {
      if (!file) throw new Error('No file selected');
      if (!file.type.match('image.*')) throw new Error('Not an image');
      let reader = new FileReader();
      reader.onload = e => {
        updateCover(e.target.result);
      };
      reader.readAsDataURL(file);
    }

    box.onclick = () => {
      input.click();
    };
    input.onchange = e => {
      processFile(e.target.files[0]);
      input.value = '';
    };
    box.ondragover = e => {
      e.preventDefault();
      box.classList.add(IS_ACTIVE);
    };
    box.ondragleave = e => {
      e.preventDefault();
      box.classList.remove(IS_ACTIVE);
    };
    box.ondrop = e => {
      e.preventDefault();
      box.classList.remove(IS_ACTIVE);
      processFile(e.dataTransfer.files[0]);
    };
  };

  /** ----------------------- Add Sections ----------------------- */

  var AddSection = new Object();

  /** Add : Large Title */
  AddSection.largeTitle = () => {
    const section = CreateSection.largeTitle();
    append(articleContent, section);
  };

  /** Add : Tiny Title */
  AddSection.tinyTitle = () => {
    const section = CreateSection.tinyTitle();
    append(articleContent, section);
  };

  /** Add : Text Block */
  AddSection.textBlock = () => {
    const section = CreateSection.textBlock();
    append(articleContent, section);
  };

  /** Add : Spacer */
  AddSection.spacer = () => {
    const section = CreateSection.spacer();
    append(articleContent, section);
  };

  /** Add : Spacer Empty */
  AddSection.spacerEmpty = () => {
    const section = CreateSection.spacerEmpty();
    append(articleContent, section);
  };

  /** Add : Product Block */
  AddSection.productBlock = () => {
    const section = CreateSection.productBlock();
    append(articleContent, section);
  };

  /** Add : Slider Block */
  AddSection.sliderBlock = () => {
    const section = CreateSection.sliderBlock();
    append(articleContent, section);
  };

  /** Add : YouTube Embed */
  AddSection.ytEmbed = () => {
    const section = CreateSection.ytEmbed();
    append(articleContent, section);
  };

  /** Add : List */
  AddSection.list = () => {
    const section = CreateSection.list();
    append(articleContent, section);
  };

  /** Add : Button Link */
  AddSection.buttonLink = () => {
    const section = CreateSection.buttonLink();
    append(articleContent, section);
  };

  /** Add : Google Maps */
  AddSection.map = () => {
    const section = CreateSection.map();
    append(articleContent, section);
  };

  /** Add : Image */
  AddSection.image = () => {
    const section = CreateSection.image();
    append(articleContent, section);
    bindImageSection(section);
  };

  /** Add : Cards */
  AddSection.cards = () => {
    const section = CreateSection.cardsBlock();
    append(articleContent, section);
  };

  /** ----------------------- Section Modify Events ----------------------- */

  var _section = new Object();

  /** Modify section : Remove */
  _section.remove = section => {
    const h = section.scrollHeight;
    section.style.height = h + 'px';
    setTimeout(() => {
      section.style.height = 0;
      section.style.opacity = 0;
      setTimeout(() => {
        section.remove();
        updateSectionsControls();
      }, getTransitionTime(section));
    }, 1);
  };

  /** Modify section : Move Up */
  _section.moveUp = section => {
    const prev = section.previousElementSibling;
    if (prev !== null) {
      section.style.opacity = 0;
      prev.style.opacity = 0;
      setTimeout(() => {
        articleContent.insertBefore(section, prev);
        updateSectionsControls();
        setTimeout(() => {
          section.style.opacity = 1;
          prev.style.opacity = 1;
        }, 1);
      }, getTransitionTime(section));
    }
  };

  /** Modify section : Move Down */
  _section.moveDown = section => {
    const next = section.nextElementSibling;
    if (next !== null) {
      section.style.opacity = 0;
      next.style.opacity = 0;
      setTimeout(() => {
        articleContent.insertBefore(next, section);
        setTimeout(() => {
          section.style.opacity = 1;
          next.style.opacity = 1;
        }, 1);
        updateSectionsControls();
      }, getTransitionTime(section));
    }
  };

  /**
   *
   * Bind Document Events
   * --section controls
   * --add product : product block
   * --add slider : slider block
   * --youtube embed input
   */
  var BindDocument = new Object();

  /** Bind : Section Controls */
  BindDocument.sectionControls = () => {
    document.addEventListener('click', event => {
      const target = event.target;
      const attr = target.getAttribute('data-section-modify');
      if (attr) {
        const section = closestParent(target, '.article-content-section');
        const content = articleContent;
        if (!section) throw new Error(`Expected to find closest article-content-section`);
        switch (attr) {
          case 'remove':
            _section.remove(section);
            break;
          case 'moveUp':
            _section.moveUp(section);
            break;
          case 'moveDown':
            _section.moveDown(section);
            break;
        }
      }
    });
  };

  /** Bind : Add Product Card */
  BindDocument.addProductCard = () => {
    document.addEventListener('click', event => {
      const target = event.target;
      if (target.closest('[data-edit-box="addProductCard"]')) {
        const grid = target.closest('.blog__cards-grid');
        if (!grid) throw new Error(`Expected to find closest .blog__cards-grid`);
        const card = Create.blogCard();
        const arr = [...grid.querySelectorAll('.blog-card')];
        if (!arr.length) {
          t.before(card);
        } else {
          arr.at(-1).after(card);
        }
      }
    });
  };

  /** Bind : Add Link Card */
  BindDocument.addLinkCard = () => {
    document.addEventListener('click', event => {
      const target = event.target;
      if (target.closest('[data-edit-box="addLinkCard"]')) {
        const grid = target.closest('.blog__cards-grid');
        if (!grid) throw new Error(`Expected to find closest .blog__cards-grid`);
        const card = Create.LinkCard();
        const arr = [...grid.querySelectorAll('.blog-link-card')];
        if (!arr.length) {
          t.before(card);
        } else {
          arr.at(-1).after(card);
        }
      }
    });
  };

  /** Bind : Link Card Remove */
  BindDocument.linkCardRemove = () => {
    document.addEventListener('click', event => {
      const target = event.target;
      if (target.closest('.blog-link-card__remove-btn')) {
        const card = target.closest('.blog-link-card');

        if (card) {
          const grid = card.closest('.blog__cards-grid');
          const allCards = grid ? grid.querySelectorAll('.blog-link-card') : [];

          if (allCards.length > 1) {
            card.remove();
          } else {
            error("You can't remove the only card", 'ECA-24');
          }
        }
      }
    });
  };

  /** Bind : YouTube Embed Input */
  BindDocument.ytEmbedInput = () => {
    const validateRegExp = /^<iframe.*src=["'].*youtube.*["'].*<\/iframe>$/i;
    document.addEventListener('input', event => {
      const target = event.target;
      const value = target.value;
      if (target.closest('textarea[data-input="ytEmbed"]')) {
        const section = target.closest('.article-content-section');
        if (!section) throw new Error(`Expected to find closest article-content-section`);

        if (value.length == 0) {
          removeClasses(target, __VALID, __INVALID);
          removeClasses(section, __VALID, __INVALID, __PENDING);
          const iFrame = section.querySelector('iframe');
          if (iFrame) iFrame.remove();
          return;
        } else {
          if (validateRegExp.test(value)) {
            addClasses(target, __VALID);
            addClasses(section, __VALID, __PENDING);
            removeClasses(target, __INVALID);
            removeClasses(section, __INVALID);
            target.blur();
            setTimeout(() => {
              section.insertAdjacentHTML('afterbegin', value);
              setTimeout(() => {
                section.classList.remove(__PENDING);
              }, 1500);
            }, 200);
          } else {
            const iFrame = section.querySelector('iframe');
            if (iFrame) iFrame.remove();
            addClasses(target, __INVALID);
            addClasses(section, __INVALID);
            removeClasses(target, __VALID);
            removeClasses(section, __VALID, __PENDING);
          }
        }
      }
    });
  };

  /** Bind : Spacer Empty Input */
  BindDocument.spacerEmptyInput = () => {
    const MIN_HEIGHT = 48;
    const MAX_HEIGHT = 999;
    const DEFAULT_HEIGHT = 68;

    document.addEventListener('input', event => {
      const target = event.target;
      if (target.closest('[data-input="spacerEmpty"]')) {
        const section = target.closest('.article-content-section');
        if (!section) throw new Error(`Expected to find closest article-content-section`);

        const val = target.value;

        // Check if the value is a number
        if (val && !/^\d+$/.test(val)) {
          addClasses(target, __INVALID);
          return;
        }

        // Find the empty-space-adjust element
        const emptySpaceAdjust = section.querySelector('.empty-space-adjust');

        // If the value is empty, set default height
        if (!val) {
          removeClasses(target, __INVALID);
          if (emptySpaceAdjust) {
            emptySpaceAdjust.style.height = `${DEFAULT_HEIGHT}px`;
          }
          return;
        }

        const numVal = parseInt(val, 10);

        // Check the range using constants
        if (numVal >= MIN_HEIGHT && numVal <= MAX_HEIGHT) {
          removeClasses(target, __INVALID);

          // Set the height
          if (emptySpaceAdjust) {
            emptySpaceAdjust.style.height = `${numVal}px`;
          }
        } else {
          addClasses(target, __INVALID);
        }
      }
    });
  };

  /** Bind : Product Card Input */
  BindDocument.productCardInput = () => {
    const validate = input => {
      const val = input.value;
      let valid;

      if (val.length == 0) return;
      const id = val.split('-').at(-1);
      const urlRegex = /^(?:https?:\/\/)?(?:www\.)?icebox\.com\/(?:product\/)?[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/i;

      if (id.match(/^[0-9]+$/) && urlRegex.test(val) && id.length >= 4) {
        addClasses(input, __VALID);
        removeClasses(input, __INVALID);
        valid = true;
      } else {
        addClasses(input, __INVALID);
        removeClasses(input, __VALID);
        valid = false;
      }

      return valid;
    };

    document.addEventListener('input', e => {
      const t = e.target;

      if (t.closest('[data-input="blogCardLink"]')) {
        const val = t.value;
        if (!val.length) {
          t.classList.remove(__VALID);
          t.classList.remove(__INVALID);
        } else {
          validate(t);
        }
      }

      if (t.closest('[data-input="blogSliderCard"]')) {
        const val = t.value;
        const nextInput = t.nextElementSibling
          ? t.nextElementSibling.tagName === 'INPUT'
            ? t.nextElementSibling
            : null
          : null;

        if (val.length === 0) {
          t.classList.remove(__VALID);
          t.classList.remove(__INVALID);
          if (nextInput && !nextInput.required) {
            nextInput.remove();
            return;
          }
        } else {
          validate(t);
          if (!nextInput) {
            if (validate(t)) {
              const input = createElem('input', {
                className: 'blog__product-input',
                attributes: {
                  placeholder: 'Paste product link',
                  'data-input': 'blogSliderCard',
                },
              });
              t.after(input);
            }
          } else {
            if (!nextInput.required && !validate(nextInput)) {
              nextInput.remove();
            }
          }
        }
      }
    });
  };

  /** Bind : List Item Remove */
  BindDocument.listItemRemove = () => {
    document.addEventListener('click', event => {
      const target = event.target;
      if (target.closest('.list-item__remove-btn')) {
        const listItem = target.closest('.list-item');
        if (!listItem) throw new Error(`Expected to find closest .list-item`);

        const section = listItem.closest('.article-content-section');
        if (!section) throw new Error(`Expected to find closest .article-content-section`);

        const allListItems = section.querySelectorAll('.list-item');

        if (allListItems.length === 1) {
          _section.remove(section);
        } else {
          listItem.remove();
        }
      }
    });
  };

  /** Bind : List Item Add */
  BindDocument.listItemAdd = () => {
    document.addEventListener('click', event => {
      const target = event.target;
      if (target.closest('[data-edit-box="addListItem"]')) {
        const section = target.closest('.article-content-section');
        if (!section) throw new Error(`Expected to find closest .article-content-section`);

        const listItems = section.querySelectorAll('.list-item');
        const newItem = Create.listItem(
          'On the other hand, we denounce with righteous indignation and dislike men who are...',
        );

        if (listItems.length === 0) {
          section.insertBefore(newItem, section.firstChild);
        } else {
          listItems[listItems.length - 1].after(newItem);
        }
      }
    });
  };

  /** Bind : Selection Change */
  BindDocument.selectionChange = () => {
    document.addEventListener('selectionchange', event => {
      const element = event.target.activeElement;
      const selection = window.getSelection();
      Tip.hide();
      if (String(selection).length > 0) {
        const range = selection.getRangeAt(0);
        const anchor = selection.anchorNode;
        let parent = anchor.parentElement;
        if (parent.tagName === 'SPAN' || parent.tagName === 'A') {
          parent = parent.parentNode.closest('p.tip_edit');
        }
        if (parent) {
          if (parent.classList.contains('tip_edit') && String(selection).length > 0) {
            Tip.move(range);
          }
        }
      }
    });
  };

  /** Bind : Button Link Input */
  BindDocument.buttonLinkInput = () => {
    document.addEventListener('input', event => {
      const target = event.target;
      if (target.dataset.input === 'buttonLink') {
        const section = target.closest('.article-content-section');
        if (section) {
          const button = section.querySelector('.blog__btn-link');
          if (button) {
            button.href = target.value || '#';
          }
        }
      }
      if (target.dataset.input === 'buttonTitle') {
        const section = target.closest('.article-content-section');
        if (section) {
          const button = section.querySelector('.blog__btn-link span');
          if (button) {
            button.textContent = target.value || 'Button title';
          }
        }
      }
    });
  };

  /** Bind : Button Link Stylize */
  BindDocument.buttonLinkStylize = () => {
    document.addEventListener('change', event => {
      const target = event.target;
      if (target.closest('[data-input="button-stylize-theme"]')) {
        const section = target.closest('.article-content-section');
        if (section) {
          const button = section.querySelector('.blog__btn-link');

          if (button) {
            const theme = target.value;

            switch (theme) {
              case 'black':
                button.className = 'blog__btn-link --black';
                break;
              case 'blue':
                button.className = 'blog__btn-link --blue';
                break;
              case 'grey':
                button.className = 'blog__btn-link --grey';
                break;
            }
          }
        }
      }
    });
  };

  /** Bind : Map Stylize */
  BindDocument.mapStylize = () => {
    document.addEventListener('change', event => {
      const target = event.target;
      if (target.closest('[data-input="map-stylize-theme"]')) {
        const section = target.closest('.article-content-section');
        if (section) {
          const iframe = section.querySelector('iframe');
          if (iframe) {
            iframe.className = `map-iframe --${target.value}`;
          }
        }
      }
    });
  };

  /** Bind : Image Stylize */
  BindDocument.imageStylize = () => {
    document.addEventListener('change', event => {
      const target = event.target;
      if (target.closest('[data-input="image-stylize-theme"]')) {
        const section = target.closest('.article-content-section');
        if (section) {
          const box = section.querySelector('.blog-edit-box');
          if (box) {
            let filledClass = '';
            if (box.classList.contains('--filled')) {
              filledClass = '--filled';
            }
            box.className = `blog-edit-box --${target.value} ${filledClass}`;
          }
        }
      }
    });
  };

  /** ----------------------- Tip ----------------------- */

  var Tip = new Object();

  /** Tip : Move */
  Tip.move = selectionRange => {
    const tip = document.querySelector('.edit-tip');
    if (!tip || !selectionRange) return;
    const rangeRect = selectionRange.getBoundingClientRect();
    const tipRect = tip.getBoundingClientRect();
    const left = Math.min(
      Math.max(rangeRect.left + rangeRect.width / 2 - tipRect.width / 2),
      window.innerWidth - tipRect.width - 8,
    );
    tip.style.top = `${rangeRect.top + window.scrollY - 54}px`;
    tip.style.left = `${left}px`;
    tip.classList.add(IS_VISIBLE);
  };

  /** Tip : Hide */
  Tip.hide = () => {
    const tip = document.querySelector('.edit-tip');
    if (!tip) return;
    tip.classList.remove(IS_VISIBLE);
  };

  /** Tip : Bind */
  Tip.bind = () => {
    const arr = [
      ...document.querySelectorAll('[data-edit-tip="bold"]'),
      ...document.querySelectorAll('[data-edit-tip="italic"]'),
      ...document.querySelectorAll('[data-edit-tip="highlight"]'),
      ...document.querySelectorAll('[data-edit-tip="highlightFull"]'),
      ...document.querySelectorAll('[data-edit-tip="list"]'),
      ...document.querySelectorAll('[data-edit-tip="clear"]'),
      ...document.querySelectorAll('[data-edit-tip="link"]'),
    ];
    for (const btn of arr) {
      const cls = btn.dataset.editTip;
      if (!cls) throw new Error(`Expected to find data-edit-tip attribute`);
      btn.addEventListener('click', function () {
        Editable.wrapIntoSpan(cls);
        clearSelection();
      });
    }
  };

  /** ----------------------- Editable ----------------------- */

  var Editable = new Object();

  /** Editable : Clear */
  Editable.clear = function (spans) {
    spans = toArray(spans);
    for (const span of spans) {
      const text = span.textContent;
      const fragment = document.createDocumentFragment();
      const div = document.createElement('div');

      div.innerHTML = text;
      while (div.firstChild) {
        fragment.appendChild(div.firstChild);
      }
      span.parentNode.replaceChild(fragment, span);
    }
  };

  /** Editable : Wrap */
  Editable.wrap = function (range, cls, customTag) {
    const tag = customTag || 'span';
    const attributes =
      tag == 'a'
        ? {
            href: '#',
            target: '_blank',
          }
        : {};
    const currentFragment = range.cloneContents();
    const newSpan = createElem(tag, { className: cls, toAppend: currentFragment, attributes });
    range.deleteContents();
    range.insertNode(newSpan);
  };

  /** Editable : Wrap Into Span */
  Editable.wrapIntoSpan = cls => {
    const selection = window.getSelection();
    if (String(selection).length < 1) {
      showMessage('Expected to have selectiom, ECA-2');
      throw new Error(`Expected to have selection`);
    }
    const anchor = selection.anchorNode;
    if (anchor === null) {
      showMessage('Expected selection to have anchor, ECA-3');
      throw new Error(`Expected selection to have anchor`);
    }
    const parent = anchor.parentElement;
    const paragraphParent = parent.classList.contains('tip_edit') ? parent : parent.closest('p.tip_edit');
    const range = selection.getRangeAt(0);

    // If no editable paragraph
    if (!paragraphParent) {
      showMessage('Expected to find closest Editable Paragraph, ECA-4');
      throw new Error(`Expected to find closest Editable Paragraph`);
    }
    if (!range) {
      showMessage('Expected to have range, ECA-5');
      throw new Error(`Expected to have range`);
    }

    // If clear parent
    if (cls === 'clear') {
      const spans = [...paragraphParent.querySelectorAll('span'), ...paragraphParent.querySelectorAll('a')].filter(
        span => range.intersectsNode(span),
      );
      Editable.clear(spans);
      return;
    }

    if (cls === 'link') {
      const spans = [...paragraphParent.querySelectorAll('span'), ...paragraphParent.querySelectorAll('a')].filter(
        span => range.intersectsNode(span),
      );
      Editable.clear(spans);
      Editable.wrap(range, cls, 'a');
      return;
    }

    // If parent is a SPAN
    if (parent.tagName === 'SPAN') {
      parent.className = cls;
      return;
    }

    // If parent is a LINK
    if (parent.tagName === 'A') {
      let spanParent = parent.parentNode.closest('span');
      if (spanParent) {
        while (spanParent.parentNode.tagName == 'SPAN') {
          spanParent = spanParent.parentNode.closest('span');
        }
        const spansWithinSpanParent = spanParent.querySelectorAll('span');
        Editable.clear([...spansWithinSpanParent, parent]);
        spanParent.className = cls;
      } else {
        parent.outerHTML = `<span class="${cls}">${parent.textContent}<span>`;
      }
      return;
    }

    // If parent is a PARAGRAPH
    if (parent.tagName === 'P') {
      const spans = [...parent.querySelectorAll('span'), ...parent.querySelectorAll('a')].filter(span =>
        range.intersectsNode(span),
      );
      Editable.clear(spans);
    }

    // Wrap selection into span
    Editable.wrap(range, cls);
  };

  /** ----------------------- Main ----------------------- */

  var Article = new Object();

  /** Bind : Add Sections */
  Article.bindAddSections = function () {
    this.arr = [...document.querySelectorAll('[data-add-section]')];
    for (const box of this.arr) {
      const attr = box.dataset.addSection;
      if (!attr) {
        console.error(box, `has no data-add-section attribute`);
        continue;
      }
      const func = AddSection[attr];
      if (!func) {
        console.error(box, `has no related function ${attr} in Add Object`);
        continue;
      }
      bind(box, 'click', func);
      bind(box, 'click', clearSelection);
      bind(box, 'click', updateSectionsControls);
    }
  };

  /** Bind : Welcome Section */
  Article.bindWelcomeSection = function () {
    const inputsArr = [
      ...document.querySelectorAll('[data-blog-edit="heading"]'),
      ...document.querySelectorAll('[data-blog-edit="summary"]'),
      ...document.querySelectorAll('[data-blog-edit="minutes"]'),
      ...document.querySelectorAll('[data-blog-edit="author"]'),
    ];
    const inputCoverUpload = document.querySelector('[data-blog-edit="cover"]');

    for (const input of inputsArr) {
      let attr = input.getAttribute('data-blog-edit');

      input.onkeydown = e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          input.blur();
        }
      };
      const Event = HandleWelcome[attr];
      if (!Event) {
        console.error(input, `has no related function ${attr} in HandleWelcome Object`);
        continue;
      }
      input.onblur = () => {
        HandleWelcome[attr](input);
      };
      input.onfocus = () => {
        if (attr == 'minutes') input.select();
      };
      input.oninput = e => {
        if (attr == 'minutes') e.target.value = e.target.value.replace(/\D/g, '');
      };
    }
    if (inputCoverUpload) {
      const Event = HandleWelcome.cover;
      if (!Event) {
        console.error(inputCoverUpload, `has no related function cover in HandleWelcome Object`);
        return;
      }
      HandleWelcome.cover(inputCoverUpload);
    }
  };

  /** Bind : Document Events */
  Article.bindDocumentEvents = function () {
    BindDocument.sectionControls();
    BindDocument.addProductCard();
    BindDocument.addLinkCard();
    BindDocument.linkCardRemove();
    BindDocument.ytEmbedInput();
    BindDocument.spacerEmptyInput();
    BindDocument.productCardInput();
    BindDocument.listItemRemove();
    BindDocument.listItemAdd();
    BindDocument.selectionChange();
    BindDocument.buttonLinkInput();
    BindDocument.buttonLinkStylize();
    BindDocument.mapStylize();
    BindDocument.imageStylize();
  };

  /** Bind : Tip */
  Article.bindTip = function () {
    Tip.bind();
  };

  /** Set Initial Layout */
  Article.setInitialLayout = function () {
    if (!options.setInitialLayout) return;
    const { largeTitle, tinyTitle, textBlock, productBlock, sliderBlock, spacer, ytEmbed, map } = AddSection;
    largeTitle();
    tinyTitle();
    textBlock();
    map();
  };

  /** Init : Splide */
  Article.initSplide = function () {
    const splides = [...document.querySelectorAll('.splide_blog')];
    for (const splide of splides) {
      new Splide(splide, {
        type: 'loop',
        perPage: 3,
        pagination: 0,
        gap: 8,
        perMove: 1,
        breakpoints: {
          768: {
            perPage: 2,
          },
          479: {
            perPage: 1,
          },
        },
      }).mount();
    }
  };

  /** Init : Article */
  Article.init = function () {
    const funcArr = [
      this.setInitialLayout,
      updateSectionsControls,
      this.bindAddSections,
      this.bindWelcomeSection,
      this.bindDocumentEvents,
      this.bindTip,
      this.initSplide,
    ];
    for (const func of funcArr) {
      try {
        func.call(this);
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  /** ----------------------- Process Export Functions ----------------------- */

  function clearSection(section) {
    const cloned = section.cloneNode(true);
    const controls = cloned.querySelector('.content-section-controls');
    const textarea = cloned.querySelector('textarea');
    const disclaimers = cloned.querySelectorAll('.blog__cards-disclaimer');
    const editBoxes = cloned.querySelectorAll('.blog-edit-box');
    const inputs = cloned.querySelectorAll('.blog-card__input');
    const productInputs = cloned.querySelectorAll('.blog__product-input');
    const flexWrapDivs = cloned.querySelectorAll('.flex-wrap');
    const flexDivs = cloned.querySelectorAll('.flex');

    const elemsToRemoves = [
      controls,
      ...disclaimers,
      ...editBoxes,
      ...inputs,
      textarea,
      ...productInputs,
      ...flexWrapDivs,
      ...flexDivs,
    ];

    elemsToRemoves.forEach(elem => {
      if (elem) elem.remove();
    });

    const elems = cloned.querySelectorAll('*');
    for (const elem of elems) {
      elem.removeAttribute('contenteditable');
      elem.removeAttribute('spellcheck');
      removeClasses(elem, 'tip_edit');
    }
    return cloned;
  }

  function processText(section) {
    let cleared = clearSection(section);
    return cleared.outerHTML;
  }

  function processEmbed(section) {
    const iframe = section.querySelector('iframe');
    if (!iframe) {
      showMessage('Export Error: No iframe found in Embed Section , ECA-E9');
      return null;
    }
    let cleared = clearSection(section);
    return cleared.outerHTML;
  }

  function processProduct(section) {
    let items = {};

    const inputs = [...section.querySelectorAll('input')];

    for (const input of inputs) {
      const value = input.value;
      const index = inputs.indexOf(input);
      if (!value) {
        if (!input.required) {
          continue;
        } else {
          error(`Export Error: Link for product not found. Section: ${section.dataset.contentType}`, 'ECA-E10');
          continue;
        }
      } else {
        if (input.classList.contains(__INVALID)) {
          error(`Export Error: Link for product is invalid. Section: ${section.dataset.contentType}`, 'ECA-E11');
          continue;
        } else {
          items[index] = {
            link: value,
            id: value.match(/-\d{4}$/)[0].slice(1),
          };
        }
      }
    }

    return items;
  }

  function processCards(section) {
    let items = [];
    const cards = section.querySelectorAll('.blog-link-card');

    for (const card of cards) {
      const fileInput = card.querySelector('input[type="file"]');
      const linkInput = card.querySelector('input[data-input="linkCardLink"]');
      const h4 = card.querySelector('h4');
      const p = card.querySelector('p');

      if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
        error(`Export Error: No image uploaded to the card. Section: ${section.dataset.contentType}`, 'ECA-E25');
        return null;
      }

      if (!h4 || h4.innerHTML.trim().length === 0) {
        error(`Export Error: Card title is missing. Section: ${section.dataset.contentType}`, 'ECA-E26');
        return null;
      }

      if (!p || p.innerHTML.trim().length === 0) {
        error(`Export Error: Card description is missing. Section: ${section.dataset.contentType}`, 'ECA-E27');
        return null;
      }

      items.push(card);
    }

    const resHTML = items
      .map(card => {
        const clonedCard = card.cloneNode(true);

        // Remove input elements
        const inputs = clonedCard.querySelectorAll('input');
        inputs.forEach(input => input.remove());

        // Remove remove button
        const removeBtn = clonedCard.querySelector('.blog-link-card__remove-btn');
        if (removeBtn) removeBtn.remove();

        // Replace blog-edit-box with image
        const editBox = clonedCard.querySelector('.blog-edit-box');
        const fileInput = card.querySelector('input[type="file"]');
        const linkInput = card.querySelector('input[data-input="linkCardLink"]');

        if (editBox && fileInput && fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const reader = new FileReader();
          reader.onload = function (e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.alt = '';

            // Check if linkInput has a value
            if (linkInput && linkInput.value.trim()) {
              const link = document.createElement('a');
              link.href = linkInput.value.trim();
              link.target = '_blank';
              link.appendChild(img);
              editBox.replaceWith(link);
            } else {
              const wrapper = document.createElement('div');
              wrapper.appendChild(img);
              editBox.replaceWith(wrapper);
            }
          };
          reader.readAsDataURL(file);
        }

        return clonedCard.outerHTML;
      })
      .join('');

    return resHTML;
  }

  function processButtonLink(section) {
    const buttonLink = section.querySelector('.blog__btn-link');
    const linkInput = section.querySelector('input[data-input="buttonLink"]');
    const titleInput = section.querySelector('input[data-input="buttonTitle"]');

    if (!buttonLink) {
      error(`Export Error: Button link is not found. Section: ${section.dataset.contentType}`, 'ECA-E28');
      return null;
    }

    if (!linkInput || !linkInput.value.trim()) {
      error(`Export Error: Button link URL is not provided. Section: ${section.dataset.contentType}`, 'ECA-E29');
      return null;
    }

    if (!titleInput || !titleInput.value.trim()) {
      error(`Export Error: Button link title is not provided. Section: ${section.dataset.contentType}`, 'ECA-E30');
      return null;
    }

    let cleared = clearSection(section);
    return cleared.outerHTML;
  }

  function processImage(section) {
    const imageInput = section.querySelector('input[type="file"]');
    if (!imageInput || !imageInput.files || imageInput.files.length === 0) {
      error(`Export Error: Image is not found. Section: ${section.dataset.contentType}`, 'ECA-E31');
      return null;
    }

    return imageInput.files[0];
  }

  /** ----------------------- Export Article ----------------------- */

  var _export = {};
  _export.obj = {};
  _export.obj.raw = String();

  /** Export : Title */
  _export.getTitle = () => {
    const title = document.querySelector('#article_title');
    if (!title || !title.innerHTML) {
      showMessage('Export Error: Title is not provided, ECA-E1');
      return null;
    }
    return title.innerHTML;
  };

  /** Export : Summary */
  _export.getSummary = () => {
    const summary = document.querySelector('#article_summary');
    if (!summary || !summary.innerHTML) {
      showMessage('error', 'Provide excerpt or type "lorem"', 'Export Error: Provide excerpt or type "lorem", ECA-E2');
      return null;
    }
    return summary.innerHTML;
  };

  /** Export : Author */
  _export.getAuthor = () => {
    const author = document.querySelector('#article_author');
    if (!author || !author.innerHTML) {
      showMessage('error', 'Author is not provided', 'Export Error: Author is not provided, ECA-E3');
      return null;
    }
    return author.innerHTML;
  };

  /** Export : Read Time */
  _export.getReadTime = () => {
    const minutes = document.querySelector('#article_read_time');
    if (!minutes || !minutes.innerHTML) {
      showMessage('error', 'Read time is not provided', 'Export Error: Read time is not provided, ECA-E4');
      return null;
    }
    return parseInt(minutes.innerHTML);
  };

  /** Export : Cover */
  _export.getCover = () => {
    if (!window.UPLOADED_BLOG_IMG) {
      showMessage('error', 'Cover is not provided', 'Export Error: Cover is not provided, ECA-E5');
      return null;
    }
    return window.UPLOADED_BLOG_IMG;
  };

  /** Export : Content */
  _export.getContent = () => {
    let sections = {};
    const sectionsArr = [...articleContent.querySelectorAll('.article-content-section')];
    if (!sectionsArr.length) {
      showMessage('Export Error: No content found, ECA-E6');
      return null;
    }
    for (const section of sectionsArr) {
      const type = section.dataset.contentType;
      if (!type) {
        error(`Export Error: No content type found. Section Index: ${sectionsArr.indexOf(section)}`, 'ECA-E7');
      } else {
        const index = sectionsArr.indexOf(section);
        let targetSection = (sections[index] = {});
        targetSection.type = type;
        //targetSection.element = section

        const textTypes = ['large_title', 'tiny_title', 'text', 'spacer', 'spacer_empty', 'list'];
        const productTypes = ['product', 'slider'];
        const cardsTypes = ['cards'];
        const embedTypes = ['youtube', 'map'];
        const buttonTypes = ['button'];
        const imageTypes = ['image'];

        if (textTypes.includes(type)) {
          targetSection.raw = processText(section);
        } else if (productTypes.includes(type)) {
          targetSection.items = processProduct(section);
        } else if (cardsTypes.includes(type)) {
          targetSection.raw = processCards(section);
        } else if (embedTypes.includes(type)) {
          targetSection.raw = processEmbed(section);
        } else if (buttonTypes.includes(type)) {
          targetSection.raw = processButtonLink(section);
        } else if (imageTypes.includes(type)) {
          targetSection.file = processImage(section);
        } else {
          error(
            `Export Error: No processor for such content type. Section Index: ${sectionsArr.indexOf(section)}`,
            'ECA-E8',
          );
        }
      }
    }

    return sections;
  };

  /** Export : Do */
  _export.do = () => {
    let obj = {};
    obj.content = _export.getContent();
    obj.author = _export.getAuthor();
    obj.cover = _export.getCover();
    obj.read_time = _export.getReadTime();
    obj.summary = _export.getSummary();
    obj.title = _export.getTitle();

    /**
     * Remove Proto
     */
    const removeProto = object => {
      if (object === null || typeof object !== 'object') {
        return object;
      }

      const newObj = Object.create(null);
      for (const key in object) {
        if (object.hasOwnProperty(key)) {
          if (typeof object[key] === 'object') {
            newObj[key] = removeProto(object[key]);
          } else {
            newObj[key] = object[key];
          }
        }
      }

      return newObj;
    };

    const cleanObj = removeProto(obj);

    /**
     * Save Article
     */
    $.ajax({
      url: '/admin/ajax/add-blog',
      type: 'POST',
      data: { article: JSON.stringify(cleanObj) },
      success: function (data) {
        var r = $.parseJSON(data);
        if (!r.error) {
          showMessage('success', r.msg);
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        } else {
          showMessage('error', r.msg);
        }
      },
    });
  };

  Article.add = AddSection;
  Article.create = CreateSection;
  Article.holder = this.articleContent;
  Article.export = _export;

  return Article;
};

/**
 * Init Edit Blog / Add Article
 */
document.addEventListener('DOMContentLoaded', () => {
  const articleContent = document.querySelector('.editable__content');

  if (articleContent) {
    const Article = new EditArticle('editable__content', {
      setInitialLayout: true,
    });
    Article.init();

    const saveArticleArr = [...document.querySelectorAll('[data-evt="saveArticle"]')];
    for (const btn of saveArticleArr) {
      btn.onclick = Article.export.do;
    }
  }
});
