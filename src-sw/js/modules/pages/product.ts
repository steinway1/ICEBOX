import Swiper from "swiper";
import {
  EffectCoverflow,
  EffectCreative,
  Thumbs,
  FreeMode,
  Navigation,
  Zoom,
} from "swiper/modules";
import "swiper/css/zoom";

export class Product {
  private rootEl: HTMLElement | null = document.querySelector(".body--product");

  constructor() {
    if (!this.rootEl) return;
    this.init();
  }

  private init() {
    this.initMediaSliders();
  }

  /**
   * ——————————————— SLIDERS ———————————————
   */
  private initMediaSliders() {
    //  Thumbnails slider
    const thumbsSwiper = new Swiper(".swiper--product-thumbnails", {
      modules: [Thumbs, FreeMode],
      spaceBetween: 12,
      watchSlidesProgress: true,
      slidesPerView: "auto",
      direction: "horizontal",
      breakpoints: {
        1024: {
          direction: "vertical",
        },
      },
    });

    //  Main slider
    const mainSwiper = new Swiper(".swiper--product-main", {
      modules: [EffectCoverflow, EffectCreative, Thumbs, Navigation, Zoom],
      effect: "creative",
      loop: true,
      spaceBetween: 12,
      thumbs: {
        swiper: thumbsSwiper,
      },
      creativeEffect: {
        limitProgress: 1,
        prev: {
          translate: [0, 0, -130],
          scale: 1.6,
          opacity: 1,
        },
        next: {
          translate: ["100%", 0, 0],
          scale: 1,
          opacity: 0,
        },
      },
      navigation: {
        nextEl: ".swiper--product-button-next",
        prevEl: ".swiper--product-button-prev",
      },
      zoom: {
        maxRatio: 2.5,
        panOnMouseMove: true,
      },
    });
  }
}
