import SwitchCardColor from './elements/switch-card-color';

/**
 * Initializes lazy loading for product card images using Intersection Observer
 * Handles loading, retries, and error states for product images
 */
export function initLazyLoadForProductCards() {
  const MAX_RETRIES = 2;
  const RETRY_DELAY = 500;

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          checkAndLoadImage(img, observerInstance, 1);
        }
      });
    },
    { rootMargin: '100px 0px', threshold: 0 },
  );

  const images = document.querySelectorAll('.product-card__img[data-src]');
  images.forEach(img => observer.observe(img));

  function checkAndLoadImage(img, observerInstance, attempt) {
    const dataSrc = img.dataset.src;

    if (isValidSrc(dataSrc)) {
      loadImage(img, observerInstance);
      return;
    }

    if (attempt >= MAX_RETRIES) {
      handleBrokenImage(img);
      observerInstance.unobserve(img);
      return;
    }

    setTimeout(() => {
      checkAndLoadImage(img, observerInstance, attempt + 1);
    }, RETRY_DELAY * attempt);
  }

  function isValidSrc(src) {
    return src && src !== 'undefined' && src.trim() !== '';
  }

  function loadImage(img, observerInstance) {
    img.src = img.dataset.src;
    img.removeAttribute('data-src');

    img.addEventListener(
      'load',
      () => {
        const parent = img.closest('.product-card__media');
        parent?.classList.add('--loaded');
        observerInstance.unobserve(img);
      },
      { once: true },
    );

    img.addEventListener(
      'error',
      () => {
        handleBrokenImage(img);
        observerInstance.unobserve(img);
      },
      { once: true },
    );
  }

  function handleBrokenImage(img) {
    const parent = img.closest('.product-card__media');
    parent?.classList.add('--empty');
    console.warn('Image failed to load:', img);
  }
}

/**
 * Initializes international telephone input fields
 * Sets up with US as default country and configures input behavior
 */
export function initTelInput() {
  let telInputArr = Array.from($('[data-input="tel"]'));
  for (var i = 0; i < telInputArr.length; i++) {
    let iti = intlTelInput(telInputArr[i], {
      initialCountry: 'us',
      preferredCountries: ['us'],
      autoPlaceholder: 'aggressive',
      useFullscreenPopup: true,
      utilsScript: '/assets/public-2020/js/plugins/phone/utils.js',
    });
  }
}

/**
 * Initializes banner image uploader functionality */
export function initBannerUploader() {
  const input = document.querySelector('#bannerInputUpload');
  if (!input) return;

  const smartPicture = input.closest('.smart-picture');
  if (input && smartPicture) {
    input.addEventListener('change', async e => {
      const picture = input.files[0];
      if (!picture) return;

      const formData = new FormData();
      formData.append('picture', picture);
      formData.append('page_url', window.location.href);
      try {
        smartPicture.classList.remove('--loaded');

        const response = await fetch('/admin/ajax/upload-banner', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();

        if (!data.error) {
          smartPicture.classList.add('--loaded');
          smartPicture.querySelector('img').src = data.url;
        } else {
          console.error('Upload failed:', data.msg || 'Unknown error');
        }
      } catch (err) {
        console.error('An error occurred while uploading:', err);
      }
    });
  }
}

/**
 * Observes smart picture images and adds loaded class when loaded
 */
export function observeSmartPictures() {
  const smartPictures = document.querySelectorAll('.smart-picture');
  smartPictures.forEach(el => {
    const img = el.querySelector('img');
    if (img) {
      img.addEventListener('load', () => {
        el.classList.add('--loaded');
      });

      if (img.complete) {
        el.classList.add('--loaded');
      }
    } else {
      el.classList.add('--loaded');
    }
  });
}

/**
 * Initializes copy buttons
 * Adds event listener to copy buttons to copy text to clipboard
 */
export function initCopyButtons() {
  const copyArr = [...document.querySelectorAll('[data-evt-copy]')];
  if (copyArr.length) {
    for (const btn of copyArr) {
      btn.addEventListener('click', () => {
        const textToCopy = btn.dataset.evtCopy;
        if (textToCopy) {
          navigator.clipboard.writeText(textToCopy);
        }
      });
    }
  }
}

/**
 * Observes floating whatsapp button and adds hidden class when intersecting with footer
 */
export function observeFloatWhatsapp() {
  const elem = document.querySelector('.wa-float');
  const triggerElem = document.querySelector('.footer');
  if (!elem || !triggerElem) return;

  let offset = 120;
  let observer = null;

  const callback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        elem.classList.add(__HIDDEN);
      } else {
        elem.classList.remove(__HIDDEN);
      }
    });
  };

  observer = new IntersectionObserver(callback, {
    root: null,
    rootMargin: `0px 0px -${offset}px 0px`,
    threshold: 0,
  });

  observer.observe(triggerElem);
}

/**
 * Binds youtube videos to the page
 * Creates a player for the youtube video and adds it to the page
 */
export function bindYoutubeVideos() {
  // Create Player
  const createPlayer = url => {
    const render = () => {
      return `
      <div class="yt-controls">
        <button data-evt="closeYoutube" class="yt-float__btn"></button>
      </div>
      <div class="yt-float__video-box">
        <div style="padding-top:56.17021276595745%" class="yt-float__video">
          <iframe src="${url}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen="">
          </iframe>
        </div>
      </div>`;
    };

    const player = createElem('div', {
      className: 'yt-float',
      innerHTML: render(),
    });
    document.body.appendChild(player);
    player.addEventListener('click', e => {
      if (e.target.closest('.yt-float__btn')) {
        player.remove();
      }
    });
  };

  document.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.yt-item') && target.closest('[data-url]')) {
      const ytElement = document.querySelector('.yt-float');
      if (ytElement) {
        ytElement.remove();
      }
      const url = target.closest('[data-url]').dataset.url;
      createPlayer(url);
    }
  });

  // Expand Youtube row
  const expandArr = [...document.querySelectorAll('[data-evt="expandYoutubeRow"]')];
  const ytRow = document.querySelector('.yt-row');
  if (ytRow) {
    for (const elem of expandArr) {
      elem.addEventListener('click', () => {
        ytRow.classList.add('--expanded');
        elem.innerHTML = 'No more videos...';
        elem.disabled = true;
      });
    }
  }
}

/**
 * Binds switch card color functionality
 * Creates a new SwitchCardColor instance when a color button is clicked
 */
export function bindSwitchCardColor() {
  document.addEventListener('click', e => {
    const { target } = e;
    if (target.closest('[data-switch-color]')) {
      const card = target.closest('.product-card');
      const color = target.dataset.switchColor;
      if (card && color) {
        new SwitchCardColor(card, color);
      }
    }
  });
}

/**
 * Initializes filter dropdowns
 * Adds event listener to filter dropdowns to show/hide the dropdown
 */
export function initFilterDropdowns() {
  let dropdownEls = Array.from($('.filter-dropdown'));

  for (let i = 0; i < dropdownEls.length; i++) {
    const el = dropdownEls[i];
    $(el).hover(function () {
      let thisCurrent = $(this).find('.filter-dropdown__current'),
        list = $(this).find('.filter-dropdown__list'),
        scrollContainer = list.find('> div'),
        buttons = Array.from(scrollContainer.find('> div')),
        main = $(this).find('.filter-dropdown__main');

      const scrollH = scrollContainer[0].scrollHeight;

      if (list.height() == 0) {
        list.css({ height: `${scrollH}px` });
        main.addClass(IS_ACTIVE);
      } else {
        list.css({ height: '0px' });
        main.removeClass(IS_ACTIVE);
      }

      $.each(buttons, function (i) {
        buttons[i].onclick = () => {
          let sibs = $(buttons[i]).siblings();
          sibs.removeClass(IS_ACTIVE);
          buttons[i].classList.add(IS_ACTIVE);

          let val = $(buttons[i]).html();
          thisCurrent.html(val);
        };
      });
    });
  }
}

/**
 * Initializes page filters
 * Adds event listener to filter rows to show/hide the dropdown
 */
export function initPageFilters() {
  let filterRows = Array.from($('.filter-row'));
  for (let i = 0; i < filterRows.length; i++) {
    const el = $(filterRows[i]),
      header = el.find('.filter-row__header'),
      body = el.find('.filter-row__body'),
      container = el.find('.filter-row__container'),
      icon = header.find('svg');

    header.click(() => {
      let currentBodyHeight = body.height();
      if (currentBodyHeight !== 0) {
        body.css({ height: `${currentBodyHeight}px` });
        setTimeout(() => {
          body.css({ height: 0 });
          container.css({ transform: 'translateY(-24px)', opacity: 0 });
          icon.css({ transform: 'rotate(0deg)' });
        }, 1);
      } else {
        let scrollH = container[0].scrollHeight;
        body.css({ height: scrollH });
        container.css({ transform: 'translateY(0px)', opacity: 1 });
        icon.css({ transform: 'rotate(180deg)' });
      }
    });
  }
}

/**
 * Initializes tracking date update
 * Updates the date of the tracking page
 */
export function initTrackingDateUpdate() {
  const dates = [...document.querySelectorAll('[data-track="updated_date"]')];
  const nowDate = new Date();

  if (dates.length) {
    const day = nowDate.getDate();
    const month = nowDate.toLocaleDateString('en-US', { month: 'short' });
    const year = nowDate.getFullYear();
    let hours = nowDate.getHours();
    const minutes = nowDate.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    for (const date of dates) {
      date.innerHTML = `${day} ${month}, ${year}, ${hours}:${minutes} ${ampm}`;
    }
  }
}

/**
 * Removes zero subheading
 * Removes the subheading if it is empty
 */
export function removeZeroSubheading() {
  const arr = [...document.querySelectorAll('.results__subheading')];
  for (const subheading of arr) {
    if (subheading.innerHTML.length < 1) {
      subheading.remove();
    }
  }
}

/**
 * Initializes FAQ list
 * Adds event listener to FAQ list to show/hide the dropdown
 */
export function initFaqList() {
  const headArr = [...document.querySelectorAll('.faq-head')];
  let liArr = [];
  for (const faqHead of headArr) {
    const li = faqHead.closest('li');
    const body = faqHead.nextElementSibling;
    if (li && body) {
      liArr.push(li);
      li.show = () => {
        li.classList.add(__ACTIVE);
        const scrollHeight = body.scrollHeight;
        body.style.height = `${scrollHeight}px`;
        setTimeout(() => {
          body.style.height = 'auto';
        }, 1);
      };
      li.hide = () => {
        li.classList.remove(__ACTIVE);
        body.style.height = 0;
      };

      faqHead.onclick = () => {
        console.log(body);
        if (body.offsetHeight !== 0) {
          li.hide();
        } else {
          li.show();
        }
      };

      // Transform letters
      const h6 = faqHead.querySelector('h6');
      if (h6) {
        const capitalized = h6.textContent.toLowerCase().replace(/(\b)(\w)/g, (match, p1, p2) => p2.toUpperCase());
        h6.textContent = capitalized;
      }

      // Reveal first
      if (liArr[0] === li) li.show();
    }
  }
}

/**
 * Initializes listing set
 * Adds event listener to listing set to show/hide the listing
 */
export function initListingSet() {
  const listings = [...document.querySelectorAll('.listing-set')];
  for (const listing of listings) {
    const buttonArray = [...listing.querySelectorAll('.listing-btn:not(.--disabled)')];
    buttonArray.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.add(IS_ACTIVE);
        buttonArray.forEach(arrBtn => {
          if (arrBtn != btn) arrBtn.classList.remove(IS_ACTIVE);
        });
      });
    });
  }
}

/**
 * Initializes custom uploads
 * Adds event listener to custom uploads to show/hide the upload
 */
export function initCustomUploads() {
  const arr = [...document.querySelectorAll('[data-custom-upload]')];

  const renderOutputFile = (file, imgSrc = '') => {
    let imgElem = imgSrc ? `<div class="--filled" style="background-image: url(${imgSrc})"></div>` : `<div></div>`;
    return `
    <div class="custom-upload__file">
      <div>
        ${imgElem}
        <span data-custom-name>${file.name}</span>
      </div>
      <div>
        <div data-evt="custom_upload_remove" class="--remove"></div>
      </div>
    </div>
    `;
  };
  const bindBoxEvents = (box, input) => {
    box.ondragover = e => {
      e.preventDefault();
      box.classList.add(__ACTIVE);
    };
    box.ondragleave = e => {
      e.preventDefault();
      box.classList.remove(__ACTIVE);
    };
    box.addEventListener('drop', e => {
      e.preventDefault();
      box.classList.remove(__ACTIVE);
      const files = e.dataTransfer.files;
      const newDataTransfer = new DataTransfer();

      for (const file of files) {
        newDataTransfer.items.add(file);
      }
      input.files = newDataTransfer.files;
      input.dispatchEvent(new Event('change', { bubbles: true }));
    });
    box.addEventListener('click', e => {
      input.click();
    });
  };
  const setIndexes = upload => {
    const files = [...upload.querySelectorAll('.custom-upload__file')];
    for (let i = 0; i < files.length; i++) {
      files[i].dataset.customIndex = i;
    }
  };
  const processFiles = (files, upload) => {
    const output = upload.querySelector('.custom-upload__files');
    const currentFiles = [...upload.querySelectorAll('.custom-upload__file')];

    for (const file of currentFiles) {
      file.remove();
    }

    for (const file of files) {
      const fileIsImage = file.type.match('image.*');
      if (fileIsImage) {
        let reader = new FileReader();
        reader.onload = e => {
          output.insertAdjacentHTML('beforeend', renderOutputFile(file, e.target.result));
        };
        reader.readAsDataURL(file);
      } else {
        output.insertAdjacentHTML('beforeend', renderOutputFile(file));
      }
    }
    setIndexes(upload);
  };

  for (const upload of arr) {
    const box = upload.querySelector('.custom-upload__box');
    const input = upload.querySelector('input');

    if (box) {
      bindBoxEvents(box, input);
    }

    input.addEventListener('change', e => {
      const files = e.target.files;
      processFiles(files, upload);
    });
  }

  document.addEventListener('click', e => {
    const target = e.target;
    if (e.target.closest('[data-evt="custom_upload_remove"]')) {
      const upload = target.closest('[data-custom-upload]');
      if (!upload) throw new Error('data-custom-upload not found');
      const input = upload.querySelector('input[type="file"]');
      if (!input) throw new Error('input[type="file"] not found');
      const nameEl = e.target.closest('.custom-upload__file').querySelector('*[data-custom-name]');
      if (!nameEl) throw new Error('data-custom-name not found');

      const name = nameEl.innerHTML;
      const newDataTransfer = new DataTransfer();
      const { files } = input;

      for (let i = 0; i < files.length; i++) {
        if (files[i].name !== name) {
          newDataTransfer.items.add(files[i]);
        }
      }

      if (newDataTransfer.items.length === 0) {
        input.value = '';
      } else {
        input.files = newDataTransfer.files;
      }

      input.dispatchEvent(new Event('change', { bubbles: true }));
    }
  });
}

/**
 * Initializes sticky elements
 * Adds event listener to sticky elements to show/hide the dropdown
 */
export function initStickyEls() {
  const elsArr = [
    ...document.querySelectorAll('.filter-sidebar.to-stick'),
    ...document.querySelectorAll('.sticky-filters'),
  ];
  const header = document.querySelector('.header');

  if (elsArr.length && header) {
    function adjust() {
      let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue('height'));
      elsArr.forEach(el => {
        let topValue = $(window).width() > 991 ? headerHeight + 24 : headerHeight;
        Object.assign(el.style, { top: `${topValue}px` });
      });
    }
    ['load', 'resize'].forEach(event => {
      window.addEventListener(event, () => {
        adjust();
      });
    });
  }
}

/**
 * Initializes sticky scroll
 * Adds event listener to sticky scroll to show/hide the dropdown
 */
export function initStickyScroll() {
  const bar = $('.filter-sidebar'),
    overlay = $('.filter-sidebar__overlay');
  if (bar.length && overlay.length) {
    const els = bar.find('.filter-row');
    $.each(els, function (i) {
      els[i].onclick = () => {
        let cont = $(this).find('.filter-row__container');
        setTimeout(() => {
          let currentHeight = bar.height();
          let scrollHeight = bar[0].scrollHeight;
          if (currentHeight - scrollHeight <= -5) {
            overlay.css({ opacity: 1 });
          } else {
            overlay.css({ opacity: 0 });
          }
        }, getTransitionTime(cont));
      };
    });
    bar[0].addEventListener('scroll', function (e) {
      if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        overlay.css({ opacity: 0 });
      } else {
        overlay.css({ opacity: 1 });
      }
    });
  }
}

/**
 * Initializes toggle inputs
 * Adds event listener to toggle inputs to show/hide the dropdown
 */
export function initToggleInputs() {
  const arr = [...document.querySelectorAll('[data-input-toggle]')];
  for (const input of arr) {
    const btn = input.parentNode.querySelector('button') || input.parentNode.querySelector('input[type="submit"]');
    if (btn) {
      input.addEventListener('input', () => {
        const value = input.value;
        if (value) {
          btn.disabled = false;
          return;
        }
        btn.disabled = true;
        return;
      });

      input.addEventListener('keydown', e => {
        const keyIsEnter = e.key === 'Enter';
        if (keyIsEnter) {
          e.preventDefault();
          btn.click();
        }
      });

      btn.addEventListener('click', () => {
        const value = input.value;
        input.value = '';
        input.dispatchEvent(new Event('input'));
      });
    }
  }
}

/**
 * Initializes pay modal
 * Adds event listener to pay modal to show/hide the modal
 */
export function initPayModal() {
  let evtOpenLater = $('[data-evt="payModalLater"]'),
    evtOpenCrypto = $('[data-evt="payModalCrypto"]'),
    evtClose = $('[data-evt="closePayModal"]'),
    crypto = $('#payModalCrypto'),
    later = $('#payModalLater'),
    modal = $('.pay-modal');

  const openModal = () => {
    lockScroll();
    modal.show();
    setTimeout(() => {
      modal.css({ opacity: 1 });
    }, 1);
  };

  const closeModal = () => {
    unlockScroll();
    modal.css({ opacity: 0 });
    setTimeout(() => {
      modal.hide();
    }, getTransitionTime(modal));
  };

  evtOpenLater.add(evtOpenCrypto).click(function () {
    openModal();
    crypto.add(later).hide();
    if ($(this).is(evtOpenCrypto)) {
      crypto.show();
    }
    if ($(this).is(evtOpenLater)) {
      later.show();
    }
  });

  evtClose.click(function () {
    closeModal();
  });
}
