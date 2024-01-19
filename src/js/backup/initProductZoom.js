
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
    if (isDesktop && $('.main_product').length) { setDesktopZoom() } else {
      setMobileZoom()
    }
  })
}

return setZoom()