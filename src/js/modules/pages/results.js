import CareModal from '../modals/care-modal';

class ResultsPage {
  constructor() {
    this.rootEl = document.querySelector('.main_results');
    this.filterBoxArr = [...document.querySelectorAll('.page-filter-box')];
    this.filterModal = document.querySelector('.filter-modal');
    this.cardsGrid = document.querySelector('.cards-grid');
    this.stickySearch = document.querySelector('.results__sticky-search');
    this.filterModalActive = false;
    this.filters = {};
    this.careModalInstance = null;
    this.init();
  }

  init() {
    this.setupDesktopFilters();
    this.bindTouchEvents();
    this.bindClickEvents();
    this.setupMobileFilters();
    this.observeFilters();
    this.formatGoldChainsSubheading();
    this.setStickyBar();
    this.bindStickySearch();
    this.adjustStickyBarOnResize();
    this.formatFilterTitles();
    this.bindViewSwitch();
    this.bindCareModal();
    this.changeToLowerCaseSubcategories();
    this.bindEditableBannerText();
  }

  // Methods
  async bindEditableBannerText() {
    const editableBannerText = document.getElementById('resultsBannerText');
    if (!editableBannerText) return;

    const categoryId = editableBannerText.dataset.categoryId;
    if (!categoryId) return;

    let initialText = editableBannerText.innerHTML.trim();
    let hasChanges = false;

    // Get or create the save button
    function getOrCreateSaveBtn() {
      let saveBtn = editableBannerText.nextElementSibling;
      if (!saveBtn || !saveBtn.classList.contains('results-banner__save-btn')) {
        saveBtn = document.createElement('span');
        saveBtn.className = 'results-banner__save-btn';
        saveBtn.textContent = 'Save';
        editableBannerText.parentNode.insertBefore(saveBtn, editableBannerText.nextSibling);
      }
      editableBannerText.classList.add('--edited');
      return saveBtn;
    }

    // Remove the save button
    function removeSaveBtn() {
      const saveBtn = editableBannerText.nextElementSibling;
      if (saveBtn && saveBtn.classList.contains('results-banner__save-btn')) {
        saveBtn.remove();
      }
      editableBannerText.classList.remove('--edited');
    }

    // Get the cleaned text
    function getCleanedText() {
      return editableBannerText.innerHTML.trim();
    }

    // Show or hide the save button
    function showOrHideSaveBtn() {
      const currentText = getCleanedText();
      if (currentText !== initialText) {
        hasChanges = true;
        getOrCreateSaveBtn();
      } else {
        hasChanges = false;
        removeSaveBtn();
      }
    }

    // Listen for input events (contentEditable changes)
    editableBannerText.addEventListener('input', showOrHideSaveBtn);
    editableBannerText.addEventListener('blur', showOrHideSaveBtn);

    // Save button click
    editableBannerText.parentNode.addEventListener('click', async e => {
      const saveBtn = editableBannerText.nextElementSibling;
      if (saveBtn && saveBtn.classList.contains('results-banner__save-btn') && e.target === saveBtn) {
        const newText = getCleanedText();
        if (newText !== initialText) {
          try {
            saveBtn.textContent = 'Saving...';
            saveBtn.disabled = true;

            /**
             * @CHOU Put the correct request here
             */
            const response = await fetch('/admin/category/banner-text', {
              method: 'POST',
              body: JSON.stringify({
                category_id: categoryId,
                banner_text: newText,
              }),
            });
            if (response.ok) {
              initialText = newText;
              hasChanges = false;
              removeSaveBtn();
            } else {
              saveBtn.textContent = 'Error';
              setTimeout(() => {
                saveBtn.textContent = 'Save';
                saveBtn.disabled = false;
              }, 2000);
            }
          } catch (err) {
            saveBtn.textContent = 'Error';
            setTimeout(() => {
              saveBtn.textContent = 'Save';
              saveBtn.disabled = false;
            }, 2000);
          }
        }
      }
    });
  }

  changeToLowerCaseSubcategories() {
    const tabs = [...document.querySelectorAll('.results__subcategories-wrap .custom-checkbox')];
    for (const tab of tabs) {
      const span = tab.querySelector('span');
      if (span) {
        const text = span.textContent;
        const toUpperCase = str => str[0].toUpperCase() + str.slice(1);
        const correctText = text.toLowerCase().split(' ').map(toUpperCase).join(' ');
        span.textContent = correctText;
      }
    }
  }
  showFilterModal() {
    lockScroll();
    window.filterModalBackdrop = new Backdrop({
      half: true,
      callback: () => {
        this.hideFilterModal();
      },
    });

    this.filterModal.style.display = 'flex';
    setTimeout(() => {
      this.filterModal.style.transform = 'translateY(0)';
    }, 3);
  }

  hideFilterModal() {
    unlockScroll();
    if (window.filterModalBackdrop) {
      window.filterModalBackdrop.hide(true);
    }
    this.filterModal.style.transform = 'translateY(100%)';
    setTimeout(() => {
      this.filterModal.style.display = 'none';
    }, getTransitionTime(this.filterModal));
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  observeFilters() {
    for (const filter in this.filters) {
      if (this.filters.hasOwnProperty(filter)) {
        const { btnArr, list } = this.filters[filter];

        const radios = [...list.querySelectorAll('input[type="radio"]')];
        const checkboxes = [...list.querySelectorAll('input[type="checkbox"]')];
        const links = [...list.querySelectorAll('a')];

        const isFilled =
          radios.some(radio => radio.checked) ||
          checkboxes.some(checkbox => checkbox.checked) ||
          links.some(link => link.classList.contains('is-active'));

        btnArr.forEach(btn => btn.classList.toggle('--filled', isFilled));
      }
    }
  }

  // Desktop
  setupDesktopFilters() {
    this.filterBoxArr.forEach((box, index) => {
      const btn = box.querySelector('.page-filter-btn');
      const drop = box.querySelector('.page-filter-drop');

      if (!btn || !drop) {
        return false;
      }

      const optionsArr = drop.querySelector('a')
        ? [...drop.querySelectorAll('a')]
        : [...drop.querySelectorAll('label')];

      if (optionsArr.length) {
        this.filters[index] = { btnArr: [btn], list: drop };

        optionsArr.forEach(option => {
          option.addEventListener('change', () => {
            this.observeFilters();

            const input = option.querySelector('input');
            if (input) {
              if (input.type === 'radio') {
                box.classList.remove('--focused');
              }
            }
          });
        });
      }

      btn.addEventListener('click', () => {
        const isFocused = box.classList.contains('--focused');
        this.filterBoxArr.forEach(el => el.classList.remove('--focused'));
        if (!isFocused) box.classList.add('--focused');
      });
    });

    document.addEventListener('click', e => {
      if (!e.target.closest('.page-filter-box')) {
        this.filterBoxArr.forEach(box => box.classList.remove('--focused'));
      }
    });
  }

  // Mobile
  setupMobileFilters() {
    const filterButtonArr = [...this.filterModal.querySelectorAll('.filter-modal__filter-btn')];
    const filterListArr = [...this.filterModal.querySelectorAll('.filter-modal__options-list')];

    filterButtonArr.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        filterButtonArr.forEach(el => el.classList.toggle('--active', el === btn));
        filterListArr.forEach(l => (l.style.display = l === filterListArr[index] ? 'block' : 'none'));
      });
    });

    filterButtonArr[0].dispatchEvent(new Event('click'));
  }

  getFilterDisplayName(btn, filter) {
    const filterId = filter.id ? filter.id : null;
    const btnSpan = btn.querySelector('span');
    const rawName = filterId && btnSpan ? btnSpan.innerText.toLowerCase() : 'Sort By';
    return rawName.includes('subcategories') || rawName.includes('subcategory')
      ? 'Subcategories'
      : rawName.includes('price') || rawName.includes('price range')
        ? 'Price'
        : rawName;
  }

  createFilterButton(displayName) {
    return createElem('button', {
      className: 'filter-modal__filter-btn',
      innerHTML: `<span>${displayName}</span>`,
    });
  }

  createFilterList(optionsArr) {
    const list = createElem('div', {
      className: 'filter-modal__options-list',
      style: { display: 'none' },
    });
    optionsArr.forEach(el => list.appendChild(el));
    return list;
  }

  setupFilterModalButtonBehavior(filterModalButton, list, filterBtnArr, listsArr) {
    filterModalButton.addEventListener('click', () => {
      filterBtnArr.forEach(btn => btn.classList.toggle('--active', btn === filterModalButton));
      listsArr.forEach(l => (l.style.display = l === list ? 'block' : 'none'));
    });
  }

  setupFilterObject(index, btn, filterModalButton, list) {
    this.filters[index] = { btnArr: [btn, filterModalButton], list: list };
  }

  bindFilterButtonClick(btn, filterModalButton, list, filterBtnArr, listsArr) {
    btn.addEventListener('click', () => {
      this.showFilterModal();
      filterBtnArr.forEach(btn => btn.classList.remove('--active'));
      listsArr.forEach(l => (l.style.display = 'none'));
      filterModalButton.classList.add('--active');
      list.style.display = 'block';
    });
  }

  unwrapFilters() {
    const groups = [...document.querySelectorAll('.page-filters__group')];
    groups.forEach(group => {
      while (group.firstChild) {
        group.parentNode.insertBefore(group.firstChild, group);
      }
      group.remove();
    });
  }

  bindTouchEvents() {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;

    const container = this.filterModal;
    const handler = this.filterModal.querySelector('.filter-modal__header');

    handler.addEventListener('touchstart', e => {
      startY = e.touches[0].clientY;
      isDragging = true;
      container.style.transition = 'none';
    });

    handler.addEventListener('touchmove', e => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      let diffY = currentY - startY;

      if (diffY > 0) {
        container.style.transform = `translateY(${diffY}px)`;
      }
    });

    handler.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;

      let diffY = currentY - startY;
      let hideOffset = container.offsetHeight * 0.5;
      container.style.transition = 'all .35s ease';

      if (diffY > hideOffset) {
        this.hideFilterModal();
      } else {
        container.style.transform = `translateY(0%)`;
      }
    });
  }

  bindClickEvents() {
    const closeArr = [...document.querySelectorAll('[data-evt="closeFilterModal"]')];
    closeArr.forEach(close => {
      close.addEventListener('click', () => this.hideFilterModal());
    });

    const openArr = [...document.querySelectorAll('[data-evt="openFilterModal"]')];
    openArr.forEach(open => {
      open.addEventListener('click', () => {
        this.showFilterModal();

        const buttons = this.filterModal.querySelectorAll('.filter-modal__filter-btn');
        buttons[0].click();

        if (open.innerHTML.toLowerCase().includes('sort')) {
          buttons.forEach(btn => {
            if (btn.innerHTML.toLowerCase().includes('sort')) {
              btn.click();
            }
          });
        }
      });
    });
  }

  formatGoldChainsSubheading() {
    const subheading = document.querySelector('.results__subheading');
    if (subheading) {
      const text = 'Welcome to our collection of fine 14k solid gold chains, where luxury meets affordability';
      if (subheading.innerHTML.includes(text)) {
        const sentences = subheading.innerHTML.split('.').filter(sentence => sentence.trim() !== '');
        if (sentences[0] === text) {
          subheading.innerHTML = `
          <strong>${text}.</strong>
          ${sentences.slice(1).join('. ')}
          `;
        }
      }
    }
  }

  setStickyBar() {
    const bar = document.querySelector('.page-filters');
    const stickySearch = document.querySelector('.results__sticky-search');
    const topBanner = document.querySelector('.top-banner');
    const header = document.querySelector('.header');

    let searchOffset = 0;
    let barOffset = 0;

    if (topBanner) {
      if (window.getComputedStyle(topBanner).position === 'sticky') {
        const bannerHeight = topBanner.offsetHeight;
        searchOffset += bannerHeight;
        barOffset += bannerHeight;
      }
    }

    if (header) {
      const headerHeight = header.offsetHeight;
      searchOffset += headerHeight;
      barOffset += headerHeight;
    }

    if (stickySearch && window.innerWidth < 991) {
      const stickySearchHeight = stickySearch.offsetHeight;
      barOffset += stickySearchHeight - 1;
    }

    const adjustStickySearch = () => {
      if (!stickySearch) return;
      stickySearch.style.top = `${searchOffset}px`;
      stickySearch.style.position = 'sticky';
    };

    const adjustBar = () => {
      if (!bar) return;
      bar.style.top = `${barOffset}px`;
      bar.style.position = 'sticky';
    };

    adjustStickySearch();
    adjustBar();
  }
  bindStickySearch() {
    if (this.stickySearch) {
      const input = this.stickySearch.querySelector('input');
      if (input) {
        input.addEventListener('focus', () => {
          lockScroll();
          window.stickySearchBackdrop = new Backdrop({
            half: true,
            zIndex: 9,
            callback: () => {
              input.blur();
            },
          });
        });

        input.addEventListener('blur', () => {
          unlockScroll();
          if (window.stickySearchBackdrop) {
            window.stickySearchBackdrop.hide(true);
          }
        });
      }
    }
  }

  adjustStickyBarOnResize() {
    window.addEventListener(
      'resize',
      this.debounce(() => {
        this.setStickyBar();
      }, 100),
    );
  }

  formatFilterTitles() {
    const arr = [
      ...document.querySelectorAll('.page-filter-btn'),
      ...document.querySelectorAll('.filter-modal__filter-btn'),
    ];
    for (const btn of arr) {
      const span = btn.querySelector('span:first-child');
      if (span) {
        const rawName = span.innerText.toLowerCase();
        const name =
          rawName.includes('subcategories') || rawName.includes('subcategory')
            ? 'Subcategories'
            : rawName.includes('price') || rawName.includes('price range')
              ? 'Price'
              : rawName;

        if (name.toLowerCase() !== rawName.toLowerCase()) {
          span.innerText = name;
        }
      }
    }
  }

  // View
  switchView(mode) {
    if (!this.cardsGrid) return;

    const isLess = mode === 'less';
    this.cardsGrid.classList.add('--hidden');

    setTimeout(() => {
      this.cardsGrid.classList.toggle('--less', isLess);
      setTimeout(() => {
        this.cardsGrid.classList.remove('--hidden');
      }, 100);
    }, getTransitionTime(this.cardsGrid));
  }

  bindViewSwitch() {
    const buttons = {
      more: document.querySelector('[data-results-evt="viewMore"]'),
      less: document.querySelector('[data-results-evt="viewLess"]'),
    };

    const toggleView = (activeBtn, inactiveBtn, mode) => {
      if (!activeBtn.classList.contains('is-active')) {
        activeBtn.classList.add('is-active');
        inactiveBtn.classList.remove('is-active');
        this.switchView(mode);
      }
    };

    if (buttons.more && buttons.less) {
      buttons.more.addEventListener('click', () => toggleView(buttons.more, buttons.less, 'more'));
      buttons.less.addEventListener('click', () => toggleView(buttons.less, buttons.more, 'less'));
    }
  }

  // Other
  bindCareModal() {
    if (document.querySelector('.care-modal')) {
      this.careModalInstance = new CareModal();
    }
  }
}

export default ResultsPage;
