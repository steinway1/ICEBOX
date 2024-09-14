const pageReviews = {
  init: function () {
    if (document.querySelector('.page-reviews.splide') !== null) {
      this.initSplide()
    }
  },
  initSplide: function () {
    try {
      let main = new Splide('.page-reviews', {
        type: "slider",
        perPage: 2.2,
        perMove: 1,
        autoplay: 0,
        pauseOnHover: 1,
        pauseOnFocus: 1,
        gap: 12,
        arrows: 1,
        pagination: 1,
        speed: 500,
        breakpoints: {
          991: {
            perPage: 1.2
          }
        }
      })
      main.mount()
    } catch {
      console.log('Page Review SPLIDE ERR')
    }
  }
}

module.exports = pageReviews