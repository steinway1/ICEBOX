const ZoomGallery = require('../dynamic/zoom-gallery')

class ProductPage {
  constructor() {
    this.optionsArr = [...document.querySelectorAll('.product__item-option:not(.--static)')]
    this.optionsRow = document.querySelector('.side-row__options')
    this.colorPickArr = [...document.querySelectorAll('.color-pick')]
    this.toggleRowArr = [...document.querySelectorAll('.toggle-row')]
    this.description = document.querySelector('#product_description')
    this.galleryDesktopArr = [...document.querySelector('#gallery_desktop').querySelectorAll('.product__gallery')]
    this.galleryMobileArr = [...document.querySelector('#gallery_mobile').querySelectorAll('.product__gallery')]

    this.optionModal = document.querySelector('.option-modal')
    this.optionModalContent = document.querySelector('.option-modal__content')
    this.optionModalNextElem = document.querySelector('[data-option-modal-next]')
    this.optionModalName = document.querySelector('[data-option-modal-name]')
    this.evtNextOption = document.querySelector('[data-evt="optionModalNext"]')
    this.evtCloseOptionModalArr = document.querySelectorAll('[data-evt="optionModalClose"]')
    this.favBtn = document.querySelector('.product__add-fav')
    this.activeOptionIndex = undefined

    this.fixedBar = document.querySelector('.fixed-bar')
    this.fixedBarTrigger = document.querySelector('.side-row__payments')

    this.galleryZoomInstance = null

    this.init()
  }

  init() {
    if (window.innerWidth > 991) {
      this.bindOptionToggleDesktop()
    } else {
      this.bindOptionToggleMobile()
      this.bindOptionModalEvents()
      this.bindPullDown()
    }
    this.setActiveOptionsText()
    this.bindOptionButtonClick()
    this.bindOptionButtonClickInputValue()
    // this.bindColorPick()
    this.bindToggleRow()
    this.bindToggleFav()
    this.setupDescription()
    this.setupSplide()
    this.setupGallery()
    this.observeFixedBar()
    this.positionFixedBar()
    this.setFixedBarMedia()
    this.formatPrice()
    this.bindGalleryZoom()

    setTimeout(() => {
      this.formatPrice()
    }, 2000);
  }

  // Gallery
  setupDesktopGallery() {
    for (const gallery of this.galleryDesktopArr) {
      const thumbs = [...gallery.querySelector('.product__thumb-gallery').querySelectorAll('.product-media')]
      const media = [...gallery.querySelector('.product__main-gallery').querySelectorAll('.product-media')]

      if (thumbs.length && media.length) {
        thumbs.forEach((thumb, index) => {
          thumb.addEventListener('click', () => {
            media.forEach(el => el.style.display = 'none')
            media[index].style.display = 'block'
          })
        })
      }
    }
  }
  setupMobileGallery() {
    for (const gallery of this.galleryMobileArr) {
      const mainSplide = gallery.querySelector('.product__main-gallery.splide')
      const thumbsSplide = gallery.querySelector('.product__thumb-gallery.splide')

      if (mainSplide && thumbsSplide) {
        const main = new Splide(mainSplide, {
          type: "loop",
          perPage: 1,
          perMove: 1,
          gap: 8,
          arrows: false,
          pagination: false,
          speed: 750,
          breakpoints: {
            991: {
              perPage: 2
            },
            767: {
              perPage: 1.5
            },
            479: {
              perPage: 1
            }
          }
        })

        const thumbs = new Splide(thumbsSplide, {
          rewind: true,
          pagination: false,
          arrows: false,
          cover: true,
          isNavigation: true,
          fixedWidth: 38,
          gap: 4
        })
        main.sync(thumbs)
        main.mount()
        thumbs.mount()
      }
    }
  }
  setupGallery() {
    if (window.innerWidth > 991) {
      this.setupDesktopGallery()
    } else {
      this.setupMobileGallery()
    }
  }

  // Methods
  setActiveOptionsText() {
    for (const option of this.optionsArr) {
      const holder = option.querySelector('.product-option__head-right')
      const activeBtn = option.querySelector('.option-btn.is-active') || option.querySelector('.option-btn.active')

      if (holder && activeBtn) {

        const textContent = activeBtn.textContent

        if (textContent.length) {
          const selectedElem = createElem('div', {
            className: 'product-option-current',
            innerHTML: textContent
          })

          holder.prepend(selectedElem)
        }
      }
    }
  }
  setActiveColor(color) {
    const currentElem = document.querySelector('[data-current-color]')
    if (currentElem) {
      currentElem.innerHTML = color
    }
  }
  setActiveColorPickElem(elem) {
    this.colorPickArr.forEach((pick) => {
      if (pick === elem) {
        pick.classList.add('--active')
      } else {
        pick.classList.remove('--active')
      }
    })
  }
  setupDescription() {
    if (this.description) {
      const textContent = this.description.textContent

      const extractLastParagraph = () => {
        let elements = this.description.querySelectorAll('p, div, li')
        let holder = document.querySelector('#itemDetails')

        if (holder) {
          for (let element of elements) {
            if (
              element.textContent.trim().startsWith("These pieces are handcrafted and")
              ||
              element.textContent.trim().startsWith("This piece is handcrafted and")
            ) {
              holder.appendChild(element);
              element.classList.add('product__more-typo')
              break
            }
          }
        }
      }
      extractLastParagraph()
    }
  }
  setupSplide() {
    const splideArr = [...document.querySelectorAll('.more-row__splide')]
    for (const el of splideArr) {
      let main = new Splide(el, {
        type: "loop",
        perPage: 4,
        perMove: 1,
        autoplay: 0,
        gap: "8px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1980: {
            perPage: 5,
            perMove: 1,
          },
          1680: {
            perPage: 4,
            perMove: 1,
          },
          1120: {
            perPage: 4,
            perMove: 1,
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "10px", col: "8px" },
            },
          },
          478: {
            grid: {
              rows: 2,
              cols: 2,
              gap: { row: "24px", col: "8px" },
            },
          },
        },
      }).mount(window.splide.Extensions)
    }
  }

  // Option Modal
  revertOptions() {
    const body = this.optionModal.querySelector('.product-option__body')
    const guideBtn = this.optionModal.querySelector('.option-guide-btn')
    const emptyOption = this.optionsArr.find(option => !option.querySelector('.product-option__body'))
    const input = this.optionModal.querySelector('input[type="hidden"]')


    if (body && emptyOption) {
      if (guideBtn) {
        body.append(guideBtn)
      }
      if (input) {
        emptyOption.append(input)
      }
      emptyOption.append(body)
    }
  }
  appendOption(option = this.optionsArr[0]) {
    this.revertOptions()
    if (option) {
      const optionName = option.querySelector('.product-option-name')
      const currentIndex = this.optionsArr.indexOf(option)
      this.activeOptionIndex = currentIndex
      const nextOption = this.optionsArr[currentIndex + 1] || this.optionsArr[0]
      const nextOptionName = nextOption.querySelector('.product-option-name')
      const body = option.querySelector('.product-option__body')
      const input = option.querySelector('input[type="hidden"]')

      const guideBtn = option.querySelector('.option-guide-btn')
      const modalWrapper = this.optionModal.querySelector('.option-modal__wrapper')

      if (body) {
        this.optionModalName.innerHTML = optionName.textContent
        this.optionModalNextElem.innerHTML = nextOptionName.textContent
        this.optionModalContent.appendChild(body)

        if (input) {
          this.optionModalContent.appendChild(input)
        }

        if (guideBtn && modalWrapper) {
          modalWrapper.append(guideBtn)
        }
      }
    }
  }
  bindOptionModalEvents() {
    this.evtNextOption.addEventListener('click', () => {
      this.appendOption(this.optionsArr[this.activeOptionIndex + 1] || this.optionsArr[0])
    })
    this.evtCloseOptionModalArr.forEach((elem) => {
      elem.addEventListener('click', () => {
        this.closeOptionModal()
      })
    })
  }
  bindOptionToggleMobile() {
    for (const option of this.optionsArr) {
      const head = option.querySelector('.product-option__head')
      const body = option.querySelector('.product-option__body')

      if (head && body) {
        head.addEventListener('click', () => {
          this.appendOption(option)
          this.showOptionModal()
        })
      }
    }
  }
  showOptionModal() {
    lockScroll()
    window.optionModalBackdrop = new Backdrop({
      half: true,
      callback: () => { this.closeOptionModal() }
    })
    this.optionModal.classList.add('--visible')
  }
  closeOptionModal() {
    unlockScroll()
    this.optionModal.classList.remove('--visible')
    setTimeout(() => {
      this.optionModal.removeAttribute('style')
      this.revertOptions()
    }, getTransitionTime(this.optionModal));
    if (window.optionModalBackdrop) {
      window.optionModalBackdrop.hide(true)
    }
  }
  bindPullDown() {
    let startY = 0;
    let currentY = 0;
    let isDragging = false;
    let isMovingRoot = false;
    const rootEl = this.optionModal;
    const scroller = document.querySelector('.option-modal__content')
    const handler = document.querySelector('.option-modal__header')
    const transition = 'all 0.4s cubic-bezier(0.39, 0.575, 0.565, 1)'

    rootEl.addEventListener('touchstart', (e) => {
      const target = e.target;

      const isOnHandler = handler.contains(target) || target === handler;

      startY = e.touches[0].clientY;
      isDragging = true;
      isMovingRoot = false;

      this.isOnHandler = isOnHandler;
    }, { passive: false });

    rootEl.addEventListener('touchmove', (e) => {
      if (!isDragging) return;

      currentY = e.touches[0].clientY;
      let diffY = currentY - startY;

      rootEl.style.transition = 'none';

      if (diffY > 0) {
        if (this.isOnHandler) {
          if (!isMovingRoot) {
            isMovingRoot = true;
          }
          if (e.cancelable) {
            e.preventDefault();
          }
          rootEl.style.transform = `translateY(${diffY}px)`;
        } else {
          if (scroller.scrollTop === 0) {
            if (!isMovingRoot) {
              isMovingRoot = true;
            }
            if (e.cancelable) {
              e.preventDefault();
            }
            rootEl.style.transform = `translateY(${diffY}px)`;
          }
        }
      }
    }, { passive: false });

    rootEl.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;

      if (isMovingRoot) {
        let diffY = currentY - startY;
        let hideOffset = rootEl.offsetHeight * 0.3;
        rootEl.style.transition = transition;

        if (diffY > hideOffset) {
          this.closeOptionModal();
          rootEl.style.transform = `translateY(100%)`;
        } else {
          rootEl.removeAttribute('style');
        }
      }
    });
  }

  // Methods - Options
  hideAllOptions(exclude = null) {
    this.optionsArr.forEach(option => {
      if (option !== exclude) {
        this.hideOption(option)
      } else {
        this.showOption(option)
      }
    })
    if (exclude == null) {
      this.optionsRow.classList.remove('--active')
    }
  }
  showOption(option) {
    option.classList.add('--active')
  }
  hideOption(option) {
    option.classList.remove('--active')
  }

  // Price
  formatPrice() {
    const priceArr = [...document.querySelectorAll('.product__item-price')]

    for (const elem of priceArr) {
      const text = elem.textContent
      const containsDollar = text.includes('$')
      const parentBar = elem.closest('.fixed-bar')

      if (containsDollar && !parentBar) {
        const price = text.replace('$', '')
        elem.innerHTML = `<span class="dollar-symbol">$</span>${price.replace(/\s/g, '')}`
      }
    }
  }

  // Bind Events
  bindOptionToggleDesktop() {
    for (const option of this.optionsArr) {
      const head = option.querySelector('.product-option__head')
      const btnArr = [...option.querySelectorAll('.option-btn')]
      if (head) {
        head.addEventListener('click', () => {
          return
          if (option.classList.contains('--active')) {
            this.hideOption(option)
          } else {
            this.hideAllOptions(option)
            this.showOption(option)
          }
        })
        this.showOption(option)
      }
      // this.showOption(option)
    }

    // document.addEventListener('click', (e) => {
    //   const target = e.target
    //   if (!target.closest('.product__item-option')) {
    //     this.hideAllOptions()
    //   }
    // })
  }
  bindOptionButtonClick() {
    for (const option of this.optionsArr) {
      const btnArr = [...option.querySelectorAll('.option-btn')]
      const selectedElem = option.querySelector('.product-option-current')

      if (btnArr.length) {
        for (const btn of btnArr) {
          btn.addEventListener('click', () => {
            if (!btn.classList.contains('disabled')) {
              const textContent = btn.textContent.trim()
              if (textContent.length) {
                if (selectedElem) {
                  selectedElem.innerHTML = textContent
                }
              }

              btnArr.forEach(el => el.classList.remove(IS_ACTIVE))
              btn.classList.add(IS_ACTIVE)
            }
          })
        }
      }
    }
  }
  bindOptionButtonClickInputValue() {
    const btnArr = [...document.querySelectorAll('.option-btn')]
    for (const btn of btnArr) {
      btn.addEventListener('click', () => {
        const value = btn.dataset.value
        if (!value) throw new Error('data-value attribute is required')

        const parent = btn.closest('.product__item-option') || btn.closest('.option-modal__content')
        if (!parent) throw new Error('parent element is required')

        const input = parent.querySelector('.custom-fields-fetch')
        if (!input) throw new Error('custom-fields-fetch element is required')


        input.value = value
        const event = new Event('change', { bubbles: true })
        input.dispatchEvent(event)
        this.closeOptionModal()
      })
    }
  }
  bindColorPick() {
    this.colorPickArr.forEach((btn) => {
      btn.addEventListener('click', () => {
        const attr = btn.dataset.color
        if (attr) {
          this.setActiveColor(attr)
          this.setActiveColorPickElem(btn)

          if (this.fixedBar) {
            this.fixedBar.classList.remove('--filled')
          }
        }
      })
    })
  }
  bindToggleRow() {
    this.toggleRowArr.forEach((row) => {
      const head = row.querySelector('.toggle-row__head')
      const body = row.querySelector('.toggle-row__body')
      const wrapper = row.querySelector('.toggle-row__wrapper')

      if (head && body && wrapper) {
        head.addEventListener('click', () => {
          const scrollHeight = wrapper.scrollHeight
          const isActive = body.offsetHeight > 0 && row.classList.contains('--active')

          if (isActive) {
            body.style.height = `0px`
            row.classList.remove('--active')
          } else {
            body.style.height = `${scrollHeight}px`
            row.classList.add('--active')
          }
        })
      }
    })
  }
  bindToggleFav() {
    if (this.favBtn) {
      this.favBtn.addEventListener('click', () => {
        this.favBtn.classList.toggle('is-active')
      })
    }
  }
  bindGalleryZoom() {
    const galleryArr = [...document.querySelectorAll('#gallery_mobile .product__main-gallery')]
    for (const gallery of galleryArr) {
      gallery.addEventListener('click', (event) => {
        const mediaClicked = event.target.closest('.product-media')
        if (window.innerWidth < 480 && mediaClicked) {

          if (this.galleryZoomInstance) {
            this.galleryZoomInstance.destroy()
            this.galleryZoomInstance = null
          }

          const list = gallery.querySelector('.splide__list')
          if (list) {
            const mediaArr = [...list.querySelectorAll('.product-media:not(.splide__slide--clone)')]
            const index = mediaArr.indexOf(mediaClicked)
            this.galleryZoomInstance = new ZoomGallery(mediaArr, index)
          }
        }
      })
    }
  }

  // Fixed Bar
  positionFixedBar() {
    const header = document.querySelector('header')
    if (header && this.fixedBar && this.fixedBarTrigger) {
      this.fixedBar.style.display = 'block'

      const update = () => {
        if (window.innerWidth > 991) {
          this.fixedBar.style.zIndex = -1
          this.fixedBar.style.position = 'absolute'
          this.fixedBar.style.top = '100%'
          if (!header.contains(this.fixedBar)) {
            header.appendChild(this.fixedBar)
          }
        } else {
          const headerZIndex = window.getComputedStyle(header).getPropertyValue('z-index')
          this.fixedBar.style.zIndex = parseInt(headerZIndex, 10) - 1
          this.fixedBar.style.top = 'auto'
          this.fixedBar.style.position = 'fixed'
          if (!document.body.contains(this.fixedBar)) {
            document.body.appendChild(this.fixedBar)
          }
        }
      }

      window.addEventListener('resize', update)
      update()
    }
  }
  observeFixedBar() {
    const triggerElem = this.fixedBarTrigger;
    const bar = this.fixedBar;
    let header = document.querySelector('header');

    if (triggerElem && bar) {
      let headerOffset = header ? header.offsetHeight : 0;
      let observer = null;

      const updateObserver = () => {
        headerOffset = header ? header.offsetHeight : 0;

        if (observer) {
          observer.disconnect();
        }

        const observerCallback = (entries) => {
          entries.forEach(entry => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              bar.classList.add(__VISIBLE);
              this.setFixedBarMedia();
            } else {
              bar.classList.remove(__VISIBLE);
            }
          });
        };

        observer = new IntersectionObserver(observerCallback, {
          root: null,
          rootMargin: `-${headerOffset}px 0px 0px 0px`,
          threshold: 0
        });

        observer.observe(triggerElem);
      };

      updateObserver();

      window.addEventListener('resize', updateObserver);
    }
  }
  setFixedBarMedia() {
    if (this.fixedBar) {

      if (!this.fixedBar.querySelector('img')) {
        this.fixedBar.classList.remove('--filled')
      }

      const visibleGallery = [...document.querySelectorAll('.product__gallery')].find((el) => {
        return window.getComputedStyle(el).getPropertyValue('display') !== 'none'
      })

      if (visibleGallery) {
        const mainGallery = visibleGallery.querySelector('.product__main-gallery')
        const fixedBarMedia = document.querySelector('.fixed-bar__media')

        if (mainGallery && fixedBarMedia) {
          const image = mainGallery.querySelector('img')
          const fixedBarImage = fixedBarMedia.querySelector('img')

          if (image) {
            if (!fixedBarImage) {
              const newImg = document.createElement('img')
              newImg.src = image.src
              fixedBarMedia.appendChild(newImg)
            } else {
              fixedBarImage.src = image.src
            }

            this.fixedBar.classList.add('--filled')
          }
        }
      }
    }
  }
}

module.exports = ProductPage