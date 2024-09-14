const heroSplide = {
  init: function () {
    try {
      this.initSplide()
    } catch (err) {
      console.log(err.message)
    }
  },
  initSplide: function () {
    const heroSplide = [...document.querySelectorAll('.hero_splide')]
    if (heroSplide.length !== 0) {
      heroSplide.forEach((slide) => {
        let slider = new Splide(slide, {
          type: "slider",
          perPage: 4,
          perMove: 2,
          autoplay: 0,
          gap: "12px",
          arrows: 1,
          pagination: 0,
          speed: 750,
          breakpoints: {
            991: { perPage: 2.5, },
            767: { perPage: 2, perMove: 1 },
            478: { perPage: 1.4, perMove: 1, gap: 8 }
          }
        })
        slider.mount()
      })
    }
  }
}

module.exports = heroSplide