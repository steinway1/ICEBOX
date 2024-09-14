const productPage = new Object({
  initialized: undefined,
  classes: {
    isActive: "is-active",
    isCollapsed: "is-collapsed",
  },

  init: function () {
    // NEW UPDATE -- DELETE LATER
    const new_page_exist = document.querySelector('.main_product_upd') !== null
    if (!new_page_exist) {
      this.renderDOM();
      this.bindEvents();
      this.bindToggleSummary()
      Object.values(this.initFn).forEach((target) => {
        if (typeof target === "function") target();
      });
      this.intialized = true;
      // this.fn.initZoom()
    }
  },
  renderDOM: function () {
    this.evtExpandSummary = $('[data-evt="expandSummary"]');
    this.summaryContainer = $(".product__item-summary");
    this.buyBtn = $(".buy-btn");
    this.moreBtn = $('.product__more-btn')
    // Options
    this.optionBtn = $(".option-btn");
    this.optionBlock = $(".product__item-option");
    this.optionBody = $(".product-option__body");
    this.optionHead = $(".product-option__head");
    // Gold Color
    this.goldOption = $(".option_gold-color");
    this.goldOptionBtn = this.goldOption.find(this.optionBtn);
    // Diamond Color
    this.dmColorOption = $(".option_diamond-color");
    this.dmColorOptionBtn = this.dmColorOption.find(this.optionBtn);
    // Ring Size
    this.ringOption = $(".option_ring-size");
    // Floating controls
    this.floatingBtn = $(".floating-btn-mobile");
    // Guide controls
    this.evtOpenGuide = $("[data-pg-open]");
  },
  bindEvents: function () {
    this.optionBtn.click(function () {
      if ($(this).not(`.${IS_ACTIVE}`)) {
        $(this).siblings().removeClass(IS_ACTIVE)
        $(this).addClass(IS_ACTIVE)
      }
    })
    this.optionHead.click(function () {
      productPage.fn.toggleOptionVisible($(this));
    });
    this.goldOptionBtn.click(function () {
      return
      let thisAttr = $(this).attr("data-color");
      productPage.fn.switchGoldColor(thisAttr);
    });
    this.dmColorOptionBtn.click(function () {
      let thisAttr = $(this).attr("data-dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    });
    this.evtOpenGuide.click(function () {
      productPage.fn.openGuideModal($(this));
    });
    this.buyBtn.click(function () {
      $(this).addClass(BUTTON_LOADING);
      setTimeout(() => {
        $(this).removeClass(BUTTON_LOADING);
      }, 2000);
    });
    this.moreBtn.click(function () {
      productPage.fn.toggleMoreDetails($(this))
    })
  },

  fn: {
    toggleFavState: () => {
      // Active / Disactive Favorite Button
      let el = productPage.favButton[0],
        cls = productPage.classes.isActive,
        isActive = el.classList.contains(cls);

      if (isActive) {
        el.classList.remove(cls);
      } else {
        el.classList.add(cls);
      }
    },
    toggleButtonState: (target) => {
      // Active / Disactive Option Button
      let parent = target.closest(productPage.optionBody),
        els = [...parent.find(productPage.optionBtn)],
        cls = productPage.classes.isActive,
        isActived = els.filter((el) => el.classList.contains(cls));

      $(isActived).removeClass(cls);
      target.addClass(cls)
    },
    toggleOptionVisible: (target) => {
      // Show / Hide Option Body
      let thisOption = target.closest(productPage.optionBlock),
        thisBody = thisOption.find(productPage.optionBody),
        thisWrapper = thisBody.find(".product-option__wrapper"),
        isExpanded = thisBody[0].clientHeight !== 0;

      if (isExpanded) {
        const currentHeight = thisBody.css("height");

        thisOption.addClass(productPage.classes.isCollapsed);
        thisBody.css({ height: currentHeight });
        setTimeout(() => {
          thisBody.css({ height: 0 });
          thisWrapper.css({ transform: "translateY(-8px)", opacity: 0 });
          target.css('border-color', '#dcdfe7')
        }, 3);
      } else {
        const transitionTime =
          parseFloat(
            window.getComputedStyle(thisBody[0]).transitionDuration
          ) * 1000,
          toHeight = thisWrapper[0].scrollHeight;

        thisOption.removeClass(productPage.classes.isCollapsed);
        thisBody.css({ height: `${toHeight}px` });
        thisWrapper.css({ transform: "translateY(0px)", opacity: 1 });
        target.css('border-color', '#171c29')
        setTimeout(() => {
          thisBody.css({ height: "auto" });
        }, transitionTime);
      }
    },
    switchGoldColor: (attr) => {
      // Toggle Gold Color Header Background
      let color, textColor
      switch (attr) {
        case "Yellow": color = "#f1e9d8", textColor = "#171c29"; break;
        case "Rose": color = "#f0dcda", textColor = "#171c29"; break;
        case "White": color = "#f1f1f1", textColor = "#171c29"; break;
        case "Red": color = "#d4474f", textColor = "#ffffff"; break;
        case "Steel": color = "#ebebeb", textColor = "#171c29"; break;
        case "Blue": color = "#e6f2f8", textColor = "#171c29"; break;
        case "Black": color = "#232323", textColor = "#ffffff"; break;
        case "Platinum": color = "#e7e7e4", textColor = "#171c29"; break;
        case "Two_tone": color = "linear-gradient(34deg, #ebe3d3, #f8f6f2 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Navy_blue": color = "#223164", textColor = "#ffffff"; break;
        case "Two_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f0dcda 55%, #fff)", textColor = "#171c29"; break;
        default: color = "#e6f2f8", textColor = "#171c29"; break;
      }
      productPage.goldOption
        .find(productPage.optionHead)
        .css({ "background": color, color: textColor });
    },
    switchDiamondColor: (attr) => {
      // Toggle Diamond Color Header Background
      let bgColor, textColor;
      switch (attr) {
        case "White":
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
        case "Black":
          (bgColor = "#434343"), (textColor = "#ffffff");
          break;
        case "Blue":
          (bgColor = "#e3eeff"), (textColor = "#171c29");
          break;
        case "Yellow":
          (bgColor = "#fff9e4"), (textColor = "#171c29");
          break;
        default:
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
      }
      productPage.dmColorOption
        .find(productPage.optionHead)
        .css({ "background-color": bgColor, color: textColor });
    },
    toggleMoreDetails: (target) => {
      // Show / Hide Warranty or More Details
      let $this = target,
        els = productPage.moreBtn,
        container = $('.product__about-wrap')

      els.removeClass(IS_ACTIVE)
      $this.addClass(IS_ACTIVE)

      container.hide()

      if ($this[0].classList.contains('for_more')) container.filter('.for_more').show()
      if ($this[0].classList.contains('for_warranty')) container.filter('.for_warranty').show()
    },
    openGuideModal: (target) => {
      if (target) {
        pgModal.fn.openModal(target);
      }
    },
  },

  initFn: {
    initSplide: () => {
      const slidesArr = [...document.querySelectorAll('.product-slider')]
      const thumbsArr = [...document.querySelectorAll('.product-slider_thumbnails')]
      const moreArr = [...document.querySelectorAll('.more-row__splide')]

      slidesArr.forEach((slider) => {
        let main = new Splide(slider, {
          type: "slider",
          perPage: 1,
          perMove: 1,
          gap: 0,
          arrows: true,
          pagination: true,
          speed: 750,
          drag: false,
          noDrag: '--sirv',
          breakpoints: {
            478: {
              perPage: 1,
              perMove: 1,
            },
          },
        })
        main.mount();
      })

      moreArr.forEach((slider) => {
        let main = new Splide(slider, {
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
        }).mount(window.splide.Extensions);
      })
    },
    setupSummary: () => {
      const
        sum = document.querySelector('.product__item-summary'),
        maxHeight = 150

      if (sum) {
        let isBigger = sum.scrollHeight > maxHeight
        if (isBigger) {
          sum.style.height = `${maxHeight}px`
          sum.insertAdjacentHTML(
            'beforeend',
            `<div class="product__item-summary-gradient"></div>
            `
          )

          const expandElement = document.createElement('div');
          expandElement.classList.add('product__item-summary-expand');
          expandElement.onclick = () => {
            const gradient = sum.querySelector('.product__item-summary-gradient')
            gradient.remove()
            expandElement.remove()
            sum.style.height = 'auto'
          };

          sum.appendChild(expandElement);
        }
      }
    },
    // Events Fires on initialization
    // checkSummary: () => {
    //   // If there is a list, then collapse description else nothing.
    //   let container = productPage.summaryContainer,
    //     list = container.find("ul"),
    //     cls = productPage.classes.isCollapsed;
    //   if (list.length == 0) {
    //     return false;
    //   } else {
    //     const button = $("<button>", {
    //       class: "product__summary-toggle",
    //       html: "Show More...",
    //     }).on("click", function () {
    //       if (container.hasClass(cls)) {
    //         container.removeClass(cls);
    //         this.innerHTML = "Show Less...";
    //       } else {
    //         container.addClass(cls);
    //         this.innerHTML = "Show More...";
    //       }
    //     });

    //     container.addClass(cls).append(button);
    //   }
    // },
    checkGoldColor: () => {
      return
      // On load check active gold color
      let buttons = [...productPage.goldOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("color");
      productPage.fn.switchGoldColor(thisAttr);
    },
    checkGoldColorNumber: () => {
      const cont = productPage.goldOption,
        btn = cont.find(productPage.optionBtn)
      if (btn.length < 3) {
        cont.find('.options-block').css({ display: 'flex' })
      }
    },
    checkDmColor: () => {
      // On load check active diamond color
      let buttons = [...productPage.dmColorOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    },
    checkRingSizes: () => {
      // If there is ring sizes less than 5.5 && more than 11.5 then add more buttons
      let thisOption = productPage.ringOption;
      let arr = Array.from(thisOption.find(productPage.optionBtn));
      if (arr.length > 15) {
        let sliced = [];
        sliced.push(arr.slice(0, 3), arr.slice(-3));
        $.each(sliced, function (i) {
          $(sliced[i]).hide();
        });

        let smallerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "smallerSizes",
        });

        let biggerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "biggerSizes",
        });

        smallerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(0, 3), function (i) {
            $(arr.slice(0, 3)[i]).css({ display: "flex" });
          });
        });
        biggerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(-3), function (i) {
            $(arr.slice(-3)[i]).css({ display: "flex" });
          });
        });

        let parent = thisOption.find(".options-block");

        parent.append(biggerBtn);
        parent.prepend(smallerBtn);
      }
    },
    initTippy: () => {
      // Initiale tippy
      if ($(window).width() >= 992) {
        tippy(".item-option__mark", {
          allowHTML: false,
          delay: 200,
          // theme: 'ib_options',
          maxWidth: 270,
        });
      }
    },
    initFloating: () => {
      // Initialize floating button mobile
      let el = productPage.floatingBtn
      if (el.length) {
        let elHeight = el[0].scrollHeight
        function attachTrigger() {
          let triggerEl = $("#productAddCart");
          if (triggerEl.length) {
            $(window).scroll(function () {
              let hT = triggerEl.offset().top,
                hH = triggerEl.outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();

              if (wS + 100 > hT - wH && hT > wS + 100 && wS + 100 + wH > hT) {
                el.css({ transform: `translateY(${elHeight}px)` });
              } else {
                el.css({ transform: `translateY(0px)` });
              }
            });
          }
        }
        if (el.length > 0) {
          if ($(window).width() > 479) {
            el.hide();
          } else {
            attachTrigger();
          }
          $(window).on("load resize", function () {
            if ($(window).width() > 479) {
              el.hide();
            } else {
              el.show();
              attachTrigger();
            }
          });
        }
      }
    },
    attachPayLaterBoxEvents: function (...args) {
      args = [...document.querySelectorAll('[data-paylater]')]

      const introEls = [...$('#payLaterBoxIntro').find('h3, p, button')]
      const details = document.getElementById('payLaterBoxDetails')

      if (args && args.length && details) {
        const toggle = () => {
          if (window.getComputedStyle(details).display == 'none') {
            details.style.display = 'block'; introEls.forEach((el) => { el.style.display = 'none' })
          } else {
            introEls.forEach((el) => { el.style.display = 'block' }); details.style.display = 'none'
          }
        }

        args.forEach(el => el.onclick = () => {
          toggle()
        })
      }
    }
  },

  bindToggleSummary: function () {
    return
    const sum = document.querySelector('.product__item-summary')
    if (sum) {
      const currentHeight = sum.offsetHeight
      const line = sum.closest('.side-row__line')

      if (!line) return
      if (currentHeight < 250) return

      const toggleBtn = createElem('button', {
        className: 'toggle-summary',
        innerHTML: 'Show more'
      })

      toggleBtn.onclick = () => {
        const elem = document.querySelector('.product__item-summary')
        if (elem.offsetHeight > 180) {
          elem.style.height = '180px'
          elem.classList.remove(__EXPANDED)
          toggleBtn.innerHTML = 'Show more'
        } else {
          const scrollH = document.querySelector('.product__item-summary').scrollHeight
          elem.style.height = `${scrollH}px`
          elem.classList.add(__EXPANDED)
          toggleBtn.innerHTML = 'Show less'
        }
      }

      line.appendChild(toggleBtn)
      sum.style.height = `180px`
      sum.classList.add('--limited')
    }
  }
})

module.exports = productPage