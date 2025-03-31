class SellPageGsap {
  constructor() {
    this.perks = document.querySelectorAll(".sell-welcome__perk");
    this.text = document.querySelector(".sell-welcome__text");
    this.pic = document.querySelector(".sell-welcome__pic");
    this.yElements = document.querySelectorAll("[data-ygsap]");

    this.init();
  }

  init() {
    this.animatePerks();
    this.animateYElements();
    this.animateWelcome();
  }
  animatePerks() {
    this.perks.forEach((perk) => {
      gsap.fromTo(
        perk,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: perk,
            start: "top bottom-=100",
            toggleActions: "play none none reverse", // Play при скролле вниз, reverse при скролле вверх
          },
        }
      );
    });
  }
  animateWelcome() {
    const text = this.text;
    const perks = this.perks;
    const pic = this.pic;

    if (window.innerWidth > 991) {
      gsap.to(text, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "top -100%",
          scrub: 1,
        },
      });

      gsap.to(perks, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "body",
          start: "top top",
          end: "top -100%",
          scrub: 1,
        },
      });
    }

    gsap.to(pic, {
      scale: 1.3,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "top -100%",
        scrub: 1,
      },
    });
  }

  // General Gsap Animations
  animateYElements() {
    this.yElements.forEach((element) => {
      const offset = element.dataset.ygsap
        ? parseInt(element.dataset.ygsap)
        : 80;

      gsap.fromTo(
        element,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: `top bottom-=${offset}`,
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }
}

class SellPageBook {
  constructor() {
    this.rootEl = document.querySelector(".sell-book");
    if (this.rootEl) {
      this.container = this.rootEl.querySelector(".sell-book__container");
      this.inputArr = [...this.container.querySelectorAll("input")];
      this.selectArr = [...this.container.querySelectorAll("select")];
      this.scroller = this.container.querySelector(".sell-book__scroller");
      this.form = this.rootEl.querySelector("#bookApptForm");
      this.resultText = this.rootEl.querySelector("[data-sell-book-result]");

      this.active = false;

      this.#init();
    }
  }
  #init() {
    this.#bindEvents();
    this.#bindFormSubmit();
    this.close();
  }
  #bindEvents() {
    const closeArr = [...document.querySelectorAll('[data-sell-book="close"]')];
    const openArr = [...document.querySelectorAll("[data-sell-appt]")];

    closeArr.forEach((el) => {
      el.addEventListener("click", () => {
        this.close();
      });
    });

    openArr.forEach((el) => {
      el.addEventListener("click", () => {
        this.show();
      });
    });
  }
  #bindFormSubmit() {
    if (this.form) {
      this.form.addEventListener("submit", (e) => {
        e.preventDefault();
        this.submitForm();
      });
    }
  }

  // Submit Form
  async submitForm() {
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData);

    try {
      this.appendLoader();

      /**
       * @CHOU Setup here
       */
      const res = await (() => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ ok: false });
          }, 3500);
        });
      })();

      if (!res.ok) {
        this.appendResult(false);
        throw new Error("Form submission failed");
      }

      this.appendResult(true);
    } catch (err) {
      console.error(err);
    }
  }

  // Methods
  show() {
    this.active = true;
    this.rootEl.style.display = "block";
    this.scroller.scrollTo(0, 0);

    requestAnimationFrame(() => {
      this.rootEl.classList.add("--visible");
    });
  }
  close() {
    this.active = false;
    this.rootEl.classList.remove("--visible");
    setTimeout(() => {
      this.rootEl.style.display = "none";
      this.reset();
    }, 500);
  }
  reset() {
    this.resultText.textContent = "";
    this.rootEl.classList.remove("--done");
    this.rootEl.classList.remove("--over");
    this.inputArr.forEach((input) => {
      input.value = "";
    });
    this.selectArr.forEach((select) => {
      select.value = "";
    });
  }
  appendLoader() {
    this.rootEl.classList.add("--over");
  }
  removeLoader() {
    this.rootEl.classList.remove("--over");
  }
  appendResult(result) {
    this.rootEl.classList.add("--done");
    this.resultText.innerHTML = result
      ? "Great! We'll be in touch soon."
      : "Oops! Something went wrong.<br>Please try again.";
  }
}

class SellPage {
  constructor(root) {
    this.rootEl = root;
    if (!this.rootEl) return;

    this.header = document.querySelector(".sell-header");
    this.loader = document.querySelector(".sell-loader");

    this.init();
    this.gsap = new SellPageGsap();
    this.book = new SellPageBook();
  }
  async init() {
    this.#bindEvents();
    await delay(200);
    this.hideLoader();
  }
  #bindEvents() {
    this.#bindHeaderToggle();
    this.#bindLenisScroll();
  }
  #bindHeaderToggle() {
    if (this.header && this.header instanceof Element) {
      const toggleHeader = () => {
        this.header.classList.toggle("--hidden", !(window.scrollY > 100));
      };
      const throttledToggleHeader = throttle(toggleHeader, 100);
      window.addEventListener("scroll", throttledToggleHeader);
    }
  }
  #bindLenisScroll() {
    if (window.Lenis) {
      const lenis = new Lenis({
        duration: 1,
      });

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }
  }

  async hideLoader() {
    if (this.loader) {
      const lines = [...this.loader.querySelectorAll("span")];
      const logo = this.loader.querySelector(".sell-loader__logo");
      if (!lines.length || !logo) {
        this.loader.remove();
        return;
      }

      logo.classList.add("--hidden");

      await delay(150);

      lines.reverse().forEach((line, index) => {
        setTimeout(() => {
          line.style.transform = "scaleX(0)";
          if (index === lines.length - 1) {
            setTimeout(() => {
              this.loader.remove();
            }, 500);
          }
        }, index * 50);
      });
    }
  }
}

module.exports = SellPage;
