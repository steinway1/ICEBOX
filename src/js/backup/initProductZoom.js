
let zoomOpenCount = 0

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
          <img style="display: none" src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}" loading="lazy" alt="">
          <img src="${String.raw`./assets/logo.svg`}" loading="lazy" alt="">
        </div>
        <div class="zoom-modal__footer">
          <h1 class="zoom-modal__name">${productTitle}</h1>
          <a href="#" class="zoom-modal__buy-btn" onclick="addToCart()">Add To Cart<span>${price} USD</span></a>
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

      zoomModal.addEventListener('mousedown', () => { zoomHint.css({ opacity: 0 }); setTimeout(() => { zoomHint.remove() }, 450) })
      zoomOpenCount++
    } catch {
      throw new Error('JS : Init Product Zoom Error')
    }
  }
})

$(document).on('click', '[data-evt="closeZoomModal"]', function () {
  let modal = $('.zoom-modal')
  if (modal.length) {
    modal.css({ opacity: 0 })
    setTimeout(() => {
      modal.remove()
    }, getTransitionTime(modal));
  }
})