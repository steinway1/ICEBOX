const pageEls = new Object({
  init: function () {
    Object.values(this.attachEvent).forEach((target) => {
      if (typeof target === 'function') {
        try {
          target()
        } catch (err) {
          console.error(err)
        }
      }
    })
  },
  attachEvent: {
    // Track Order
    trackOrderSwitch: () => {
      const arr = document.querySelectorAll('input[name="track_with"]')
      if (arr.length) {

        function toggleInput(value) {
          const elements = {
            phone: document.querySelector('#form_track_order .iti'),
            email: document.querySelector('#input_track_email')
          }

          if (!elements.phone || !elements.email) {
            console.error('phone or email not found')
            return
          }

          if (elements[value]) {
            Object.keys(elements).forEach(key => {
              elements[key].style.display = key === value ? 'block' : 'none'
            })
          } else {
            console.error(`Invalid value: ${value}`)
          }
        }

        arr.forEach((input) => {
          input.addEventListener('change', () => {
            toggleInput(input.value)
          })
        })
      }
    },
    resetTrackOrderForm: () => {
      const elem = document.querySelector('[data-evt="reset_track_form"]')
      if (elem) {
        elem.addEventListener('click', (e) => {
          e.preventDefault()
          const form = document.querySelector('#form_track_order')
          if (!form) {
            console.error('form not found')
            return
          }

          form.reset()
        })
      }
    },
    // Other
    filterDropdown: () => {
      let dropdownEls = Array.from($('.filter-dropdown'))

      for (let i = 0; i < dropdownEls.length; i++) {
        const el = dropdownEls[i];
        $(el).hover(function () {
          let thisCurrent = $(this).find('.filter-dropdown__current'),
            list = $(this).find('.filter-dropdown__list'),
            scrollContainer = list.find('> div'),
            buttons = Array.from(scrollContainer.find('> div')),
            main = $(this).find('.filter-dropdown__main')

          const scrollH = scrollContainer[0].scrollHeight

          if (list.height() == 0) {
            list.css({ height: `${scrollH}px` })
            main.addClass(IS_ACTIVE)
          } else {
            list.css({ height: '0px' })
            main.removeClass(IS_ACTIVE)
          }

          $.each(buttons, function (i) {
            buttons[i].onclick = () => {
              let sibs = $(buttons[i]).siblings()
              sibs.removeClass(IS_ACTIVE)
              buttons[i].classList.add(IS_ACTIVE)

              let val = $(buttons[i]).html()
              thisCurrent.html(val)
            }
          })
        })
      }
    },
    trackingDateUpdate: () => {
      const dates = [...document.querySelectorAll('[data-track="updated_date"]')]
      const nowDate = new Date()

      if (dates.length) {
        const day = nowDate.getDate()
        const month = nowDate.toLocaleDateString('en-US', { month: 'short' })
        const year = nowDate.getFullYear()
        let hours = nowDate.getHours()
        const minutes = nowDate.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12

        for (const date of dates) {
          date.innerHTML = `${day} ${month}, ${year}, ${hours}:${minutes} ${ampm}`
        }
      }
    },
    pageFilters: () => {
      let filterRows = Array.from($('.filter-row'))
      for (let i = 0; i < filterRows.length; i++) {
        const el = $(filterRows[i]),
          header = el.find('.filter-row__header'),
          body = el.find('.filter-row__body'),
          container = el.find('.filter-row__container'),
          icon = header.find('svg')

        header.click(() => {
          let currentBodyHeight = body.height()
          if (currentBodyHeight !== 0) {
            body.css({ height: `${currentBodyHeight}px` })
            setTimeout(() => {
              body.css({ height: 0 })
              container.css({ transform: 'translateY(-24px)', opacity: 0 })
              icon.css({ transform: 'rotate(0deg)' })
            }, 1);
          } else {
            let scrollH = container[0].scrollHeight
            body.css({ height: scrollH })
            container.css({ transform: 'translateY(0px)', opacity: 1 })
            icon.css({ transform: 'rotate(180deg)' })
          }
        })
      }
    },
    faqLists: () => {
      const headArr = [...document.querySelectorAll('.faq-head')]
      let liArr = []
      for (const faqHead of headArr) {
        const li = faqHead.closest('li')
        const body = faqHead.nextElementSibling
        if (li && body) {
          liArr.push(li)
          li.show = () => {
            li.classList.add(__ACTIVE)
            const scrollHeight = body.scrollHeight
            body.style.height = `${scrollHeight}px`
            setTimeout(() => {
              body.style.height = 'auto'
            }, 1);
          }
          li.hide = () => {
            li.classList.remove(__ACTIVE)
            body.style.height = 0
          }

          faqHead.onclick = () => {
            console.log(body)
            if (body.offsetHeight !== 0) {
              li.hide()
            } else {
              li.show()
            }
          }

          // Transform letters
          const h6 = faqHead.querySelector('h6')
          if (h6) {
            const capitalized = h6.textContent.toLowerCase().replace(/(\b)(\w)/g, (match, p1, p2) => p2.toUpperCase())
            h6.textContent = capitalized
          }

          // Reveal first
          if (liArr[0] === li) li.show()
        }
      }
    },
    listings: () => {
      const listings = [...document.querySelectorAll('.listing-set')]
      for (const listing of listings) {
        const buttonArray = [...listing.querySelectorAll('.listing-btn:not(.--disabled)')]
        buttonArray.forEach((btn) => {
          btn.addEventListener('click', () => {
            btn.classList.add(IS_ACTIVE)
            buttonArray.forEach((arrBtn) => {
              if (arrBtn != btn) arrBtn.classList.remove(IS_ACTIVE)
            })
          })
        })
      }
    },
    removeZeroSubheading: () => {
      const arr = [...document.querySelectorAll('.results__subheading')]
      for (const subheading of arr) {
        if (subheading.innerHTML.length < 1) {
          subheading.remove()
        }
      }
    },
    initTelInput: () => {
      let telInputArr = Array.from($('[data-input="tel"]'));

      for (var i = 0; i < telInputArr.length; i++) {
        iti = intlTelInput(telInputArr[i], {
          initialCountry: "auto",
          preferredCountries: ["us", "gb", "br", "cn", "es", "it"],
          autoPlaceholder: "aggressive",
          useFullscreenPopup: true,
          utilsScript:
            "/assets/public-2020/js/plugins/phone/utils.js",
          geoIpLookup: function (callback) {
            fetch("https://ipinfo.io/json", {
              cache: "reload",
            })
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Failed: " + response.status);
              })
              .then((ipjson) => {
                callback(ipjson.country);
              })
              .catch((e) => {
                callback("us");
              });
          },
        });
      }
    },
    initCustomUploads: () => {
      this.arr = [...document.querySelectorAll('[data-custom-upload]')]

      const renderOutputFile = (file, imgSrc = '') => {
        let imgElem = imgSrc ? `<div class="--filled" style="background-image: url(${imgSrc})"></div>` : `<div></div>`
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
        `
      }
      const bindBoxEvents = (box, input) => {
        box.ondragover = (e) => {
          e.preventDefault(); box.classList.add(__ACTIVE)
        }
        box.ondragleave = (e) => {
          e.preventDefault(); box.classList.remove(__ACTIVE)
        }
        box.addEventListener('drop', (e) => {
          e.preventDefault()
          box.classList.remove(__ACTIVE)
          const files = e.dataTransfer.files
          const newDataTransfer = new DataTransfer()

          for (const file of files) {
            newDataTransfer.items.add(file)
          }
          input.files = newDataTransfer.files
          input.dispatchEvent(new Event('change', { 'bubbles': true }))
        })
        box.addEventListener('click', (e) => {
          input.click()
        })
      }
      const setIndexes = (upload) => {
        const files = [...upload.querySelectorAll('.custom-upload__file')]
        for (let i = 0; i < files.length; i++) {
          files[i].dataset.customIndex = i
        }
      }
      const processFiles = (files, upload) => {
        const output = upload.querySelector('.custom-upload__files')
        const currentFiles = [...upload.querySelectorAll('.custom-upload__file')]

        for (const file of currentFiles) {
          file.remove()
        }

        for (const file of files) {
          const fileIsImage = file.type.match('image.*')
          if (fileIsImage) {
            let reader = new FileReader()
            reader.onload = (e) => {
              output.insertAdjacentHTML('beforeend', renderOutputFile(file, e.target.result))
            }
            reader.readAsDataURL(file)
          } else {
            output.insertAdjacentHTML('beforeend', renderOutputFile(file))
          }
        }
        setIndexes(upload)
      }

      for (const upload of this.arr) {
        const box = upload.querySelector('.custom-upload__box')
        const input = upload.querySelector('input')

        if (box) {
          bindBoxEvents(box, input)
        }

        input.addEventListener('change', (e) => {
          const files = e.target.files
          processFiles(files, upload)
        })
      }

      document.addEventListener('click', (e) => {
        const target = e.target
        if (e.target.closest('[data-evt="custom_upload_remove"]')) {
          const upload = target.closest('[data-custom-upload]')
          if (!upload) throw new Error('data-custom-upload not found')
          const input = upload.querySelector('input[type="file"]')
          if (!input) throw new Error('input[type="file"] not found')
          const nameEl = e.target.closest('.custom-upload__file').querySelector('*[data-custom-name]')
          if (!nameEl) throw new Error('data-custom-name not found')

          const name = nameEl.innerHTML
          const newDataTransfer = new DataTransfer()
          const { files } = input

          for (let i = 0; i < files.length; i++) {
            if (files[i].name !== name) {
              newDataTransfer.items.add(files[i])
            }
          }

          if (newDataTransfer.items.length === 0) {
            input.value = ''
          } else {
            input.files = newDataTransfer.files
          }

          input.dispatchEvent(new Event('change', { 'bubbles': true }))
        }
      })
    },
    attachPayModal: () => {
      let evtOpenLater = $('[data-evt="payModalLater"]'),
        evtOpenCrypto = $('[data-evt="payModalCrypto"]'),
        evtClose = $('[data-evt="closePayModal"]'),
        crypto = $('#payModalCrypto'),
        later = $('#payModalLater'),
        modal = $('.pay-modal')

      const openModal = () => {
        lockScroll()
        modal.show()
        setTimeout(() => {
          modal.css({ opacity: 1 })
        }, 1);
      }

      const closeModal = () => {
        unlockScroll()
        modal.css({ opacity: 0 })
        setTimeout(() => {
          modal.hide()
        }, getTransitionTime(modal));
      }

      evtOpenLater.add(evtOpenCrypto).click(function () {
        openModal()
        crypto.add(later).hide()
        if ($(this).is(evtOpenCrypto)) {
          crypto.show()
        }
        if ($(this).is(evtOpenLater)) {
          later.show()
        }
      })

      evtClose.click(function () {
        closeModal()
      })
    },
    attachToggleInputs: function () {
      const arr = [...document.querySelectorAll('[data-input-toggle]')]
      for (const input of arr) {
        const btn = input.parentNode.querySelector('button') || input.parentNode.querySelector('input[type="submit"]')
        if (btn) {
          input.addEventListener('input', () => {
            const value = input.value
            if (value) {
              btn.disabled = false
              return
            }
            btn.disabled = true
            return
          })

          input.addEventListener('keydown', (e) => {
            const keyIsEnter = e.key === 'Enter'
            if (keyIsEnter) {
              e.preventDefault()
              btn.click()
            }
          })

          btn.addEventListener('click', () => {
            const value = input.value
            input.value = ''
            input.dispatchEvent(new Event('input'))
          })
        }
      }
    },
    initProductZoom: () => {
      const isDesktop = window.innerWidth > 991
      window.removeSlider = (target) => {
        unlockScroll()
        const slider = target.closest('.zoom_slider'); slider.css({ opacity: 0 })
        setTimeout(() => { slider.hide() }, 400);
      }

      const setDesktopZoom = () => {
        [...document.querySelectorAll('.product-media-img')].reduce((acc, el) => {
          if (el && el !== null) {
            if (!/(placeholder|store|pay)/gi.test(el.getAttribute('src'))) {
              acc.push($(el).parent('.product-media__inner-wrap'))
            }
          }
          return acc
        }, []).forEach((el) => {
          $(el).zoom({ magnify: 1.9, on: 'click' })
          $(el).on('mouseleave', function () { $(document).trigger('click') })
        })
      }

      const setMobileZoom = () => {
        const sliders = [...document.querySelectorAll('.product-slider')] // Get all existing sliders

        sliders.forEach((slider, index) => {
          const button = $('<button/>', { class: `product__zoom-btn zoom_btn${index}` }); button.appendTo($(slider)) // Create & append zoom button
          const renderNewSlider = (slider, index) => { // Get HTML new zoom slider
            let mediaArr = [...slider.querySelectorAll('img')].reduce((acc, img) => {
              const src = img.getAttribute('src')
              if (!acc.includes(src) && !/(placeholder|store|pay)/gi.test(src)) { acc.push(src) }
              return acc
            }, []).sort()

            this.renderMedia = () => {
              return mediaArr.reduce((acc, src) => {
                acc += `<div class="splide__slide"><img src="${src}"></div>`
                return acc
              }, '')
            }

            return `
            <div class="zoom_slider zsl${index}">
              <div>
                <div class="zoom_slider_logo"><img src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}"></div>
                <button class="zoom_slider-close" onclick="removeSlider($(this))"></button>
                <div class="zoom-sl${index} splide">
                  <div class="splide__track">
                    <div class="splide__list">
                    ${this.renderMedia()}
                    </div>
                  </div>
                  <div class="splide__arrows">
                    <div class="splide__arrow--prev"></div>
                    <div class="splide__arrow--next"></div>
                  </div>
                </div>
              </div>
            </div>`
          }
          const appendNewSlider = (html) => { $body.append(html) } // Append Zoom Slider
          const initNewSlider = (index) => { // Splide Initialization
            this.settings = {
              type: "loop",
              perPage: 1,
              perMove: 1,
              autoplay: 0,
              gap: "12px",
              arrows: 1,
              pagination: 0,
              speed: 800,
              drag: false,
              dragAngleThreshold: 0
            }
            const zoomSlider = new Splide(`.zoom-sl${index}`, this.settings);
            zoomSlider.mount()
          }
          const initZoom = (index) => { // Initialize jQuery zoom for the new slider
            let slides = [...document.querySelector(`.zoom_slider.zsl${index}`).querySelectorAll('.splide__slide')]
            slides.forEach((slide) => {
              $(slide).zoom({
                magnify: 1.4,
                onZoomIn: function () {
                  $(this).closest('.splide').css('border-color', '#e6eaec')
                },
                onZoomOut: function () {
                  $(this).closest('.splide').css('border-color', '#0095c6')
                }
              })
            })
          }
          const showNewSlider = (index) => {
            let localSlider = $(`.zoom_slider.zsl${index}`)
            if (localSlider) { localSlider.show(); lockScroll(); setTimeout(() => { localSlider.css({ opacity: 1 }) }, 1); }
          }
          const openSlider = (index) => {
            let slider = $(`.zoom_slider.zsl${index}`)
            if (slider) { slider.show(); lockScroll(); setTimeout(() => { slider.css({ opacity: 1 }) }, 1); }
          }

          button.click(() => {
            const localSlider = document.querySelector(`.zoom_slider.zsl${index}`)
            if (!localSlider) {
              appendNewSlider(renderNewSlider(slider, index))
              initNewSlider(index)
              initZoom(index)
              showNewSlider(index)
            } else {
              openSlider(index)
            }
          })
        })
      }

      const setZoom = () => {
        $(document).ready(function () {
          if (document.querySelector('.main_product_zoom') == null) {
            if (isDesktop && $('.main_product').length) { setDesktopZoom() } else {
              setMobileZoom()
            }
          }
        })
      }

      return setZoom()
    },
    initTestProductZoom: () => {
      let zoomOpenCount = 0

      const setZoom = () => {
        const
          srcIsValid = (src) => {
            return !/(placeholder|store|pay)/gi.test(src)
          },
          filterMedia = (arr) => {
            return arr.reduce((acc, media) => {
              const
                img = media.querySelector('img'),
                thumbAncestor = media.closest('.product-slider_thumbnails'),
                zoomAncestor = media.closest('.zoom-modal')

              if (img && img !== null && thumbAncestor == null && zoomAncestor == null) {
                const src = img.getAttribute('src')
                if (srcIsValid(src)) { acc.push(media) }
              }
              return acc
            }, [])
          },
          getSrcArr = (arr) => {
            return arr.reduce((acc, media) => {
              const img = media.querySelector('img')
              if (img !== null) {
                if (img.hasAttribute('src')) {
                  const src = img.getAttribute('src')
                  if (srcIsValid(src) && !acc.includes(src)) { acc.push(src) }
                }
              }
              return acc
            }, [])
          },
          renderSlidesHTML = (srcArr) => {
            return srcArr.reduce((acc, src) => {
              acc += `<div style="cursor: zoom-in" class="zoom-modal__slide splide__slide"><img loading="eager" alt="" src="${src}"></div>`
              return acc
            }, '')
          },
          renderSplideHTML = (slidesHTML) => {
            let productTitle = $('.product__item-title').html(),
              price = $('.product__item-price').eq(-1).html()
            return `
          <div class="zoom-modal splide">
            <button data-evt="closeZoomModal" class="zoom-modal__close-btn"></button>
            <div class="zoom-modal__holder">
              <div class="splide__arrows">
                <div class="splide__arrow--prev"></div>
                <div class="splide__arrow--next"></div>
              </div>
              <div class="zoom-modal__header">
                <img src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}" loading="lazy" alt="">
                <img style="display: none" src="${String.raw`./assets/logo.svg`}" loading="lazy" alt="">
              </div>
              <div class="zoom-modal__footer">
                <h1 class="zoom-modal__name">${productTitle}</h1>
                <a href="javascript:void(0)" data-evt="closeZoomModal" class="zoom-modal__buy-btn" onclick="addToCart()">Add To Cart<span>${price} USD</span></a>
              </div>
              <div class="zoom-modal__slider">
                <div class="splide__track">
                  <div class="splide__list">
                    ${slidesHTML}
                  </div>
                </div>
              </div>
            </div>
          </div>
          `
          },
          initZoomSlider = (indexToGo = 0) => {
            const
              settings = {
                type: "loop",
                perPage: 1,
                perMove: 1,
                autoplay: 0,
                gap: "12px",
                arrows: 1,
                pagination: 0,
                speed: 800,
                drag: false,
                dragAngleThreshold: 0
              },
              slider = document.querySelector('.zoom-modal')
            if (slider !== null) {
              const zoomSlider = new Splide('.zoom-modal', settings);
              zoomSlider.mount()
              zoomSlider.go(indexToGo)
            }
          },
          initPressZoom = (slider) => {
            const slides = [...slider.querySelectorAll('.splide__slide')],
              zoomValue = window.innerWidth > 479 ? 2.2 : 1.6
            slides.forEach((slide) => {
              $(slide).zoom({
                magnify: zoomValue,
                on: 'grab',
                onZoomIn: function () {
                  $('.zoom-modal .splide__arrows').css({ opacity: 0 })
                  $('.zoom-hint').css({ opacity: 0 })
                },
                onZoomOut: function () {
                  $('.zoom-modal .splide__arrows').css({ opacity: 1 })
                }
              })
            })
          }

        const mediaArr = filterMedia([...document.querySelectorAll('.product-media')])

        mediaArr.forEach((el) => {
          el.onclick = () => {
            lockScroll()
            try {
              const
                sibSrcArr = getSrcArr(filterMedia([...el.parentNode.closest('div').querySelectorAll('.product-media')])),
                splideHTML = renderSplideHTML(renderSlidesHTML(sibSrcArr))

              $body.append(splideHTML)
              initZoomSlider(sibSrcArr.indexOf(el.querySelector('img').getAttribute('src')))

              let zoomModal = document.querySelector('.zoom-modal'),
                holder = zoomModal.querySelector('.zoom-modal__holder')
              initPressZoom(zoomModal)

              let zoomHint = $('<\div>', { class: 'zoom-hint' })

              setTimeout(() => {
                zoomModal.style.opacity = 1
                if (zoomOpenCount <= 1) { $(holder).append(zoomHint); setTimeout(() => { zoomHint.css({ opacity: 1 }) }, 500) }
              }, 1);

              zoomModal.addEventListener('mousedown', () => {
                zoomHint.css({ opacity: 0 });
                setTimeout(() => {
                  zoomHint.remove()
                }, 450)
              })
              document.onkeydown = (e) => {
                e = e || window.event
                let isEsc = false
                if ('key' in e) {
                  isEsc = (e.key === "Escape" || e.key === "Esc");
                } else {
                  isEsc = (e.keyCode === 27);
                }
                if (isEsc) {
                  e.preventDefault()
                  unlockScroll()
                  let modal = $('.zoom-modal')
                  if (modal.length) {
                    modal.css({ opacity: 0 })
                    setTimeout(() => {
                      modal.remove()
                    }, getTransitionTime(modal));
                  }
                }
              }
              zoomOpenCount++
            } catch {
              throw new Error('JS : Init Product Zoom Error')
            }
          }
        })

        $(document).on('click', '[data-evt="closeZoomModal"]', function () {
          unlockScroll()
          let modal = $('.zoom-modal')
          if (modal.length) {
            modal.css({ opacity: 0 })
            setTimeout(() => {
              modal.remove()
            }, getTransitionTime(modal));
          }
        })
      }

      if (document.querySelector('.main_product_zoom') !== null) { setZoom() }
    },
    attachStickyScroll: () => {
      const bar = $('.filter-sidebar'), overlay = $('.filter-sidebar__overlay')
      if (bar.length && overlay.length) {
        const els = bar.find('.filter-row')
        $.each(els, function (i) {
          els[i].onclick = () => {
            let cont = $(this).find('.filter-row__container')
            setTimeout(() => {
              let currentHeight = bar.height()
              let scrollHeight = bar[0].scrollHeight
              if ((currentHeight - scrollHeight) <= -5) {
                overlay.css({ opacity: 1 })
              } else {
                overlay.css({ opacity: 0 })
              }
            }, getTransitionTime(cont));
          }
        })
        bar[0].addEventListener('scroll', function (e) {
          if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
            overlay.css({ opacity: 0 })
          } else { overlay.css({ opacity: 1 }) }
        })
      }
    },
    attachCheckoutCopy: () => {
      const btnArr = [...document.querySelectorAll('.crypto-how-btn'), ...document.querySelectorAll('.copy-address-btn')]
      if (btnArr.length) {
        btnArr.forEach((btn) => {
          btn.onclick = () => {
            if (!window.getSelection().toString()) {
              let details = btn.closest('.checkout-form__radio-details')
              if (details !== null) {
                let address = details.querySelector('.copy-address-btn__typo').innerHTML
                async function copyAddress() {
                  try {
                    await navigator.clipboard.writeText(address);
                    details.classList.add(IS_COPIED)
                    setTimeout(() => {
                      details.classList.remove(IS_COPIED)
                    }, 1300);
                  } catch (err) {
                    details.classList.remove(IS_COPIED, IS_ERROR)
                    setTimeout(() => {
                      details.classList.remove(IS_COPIED, IS_ERROR)
                    }, 2100);
                  }
                }
                copyAddress()
              }
            }
          }
        })
      }
    },
    adjustStickyEls: () => {
      const elsArr = [...document.querySelectorAll('.filter-sidebar.to-stick'), ...document.querySelectorAll('.sticky-filters')]
      const header = document.querySelector('.header')

      if (elsArr.length && header) {
        function adjust() {
          let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue('height'))
          elsArr.forEach((el) => {
            let topValue = $(window).width() > 991 ? headerHeight + 24 : headerHeight
            Object.assign(el.style, { top: `${topValue}px` })
          })
        }
        ['load', 'resize'].forEach((event) => { window.addEventListener(event, () => { adjust() }) })
      }
    },
    bindCardFav: () => {
      const buttons = document.querySelectorAll('.card-item-fav')
      buttons.forEach(btn => btn.onclick = () => {
        if (btn.classList.contains(IS_ACTIVE)) {
          btn.classList.remove(IS_ACTIVE)
        } else {
          btn.classList.add(IS_ACTIVE)
        }
      })
    },
    observeSmartPictures: () => {
      const arr = [...document.querySelectorAll('.smart-picture')]
      for (const el of arr) {
        const img = el.querySelector('img')
        if (!img) {
          el.classList.add(__LOADED)
        } else {
          if (img.complete || img.src.length === 0) {
            el.classList.add(__LOADED)
          } else {
            img.addEventListener('load', () => {
              el.classList.add(__LOADED)
            })
          }
        }
      }
    }
  }
})

module.exports = pageEls