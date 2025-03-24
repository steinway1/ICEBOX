import { getTransitionTime } from "../general/utils";
import { IS_ACTIVE } from "../general/constants";
import bodymovin from "../../lib/lottie";

class ToolBar {
  constructor(rootEl) {
    this.rootEl = rootEl;
    if (!this.rootEl) return;

    this.opened = false;
    this.locked = false;
    this.celebrating = false;

    this.wrapper = document.querySelector(".toolbar__wrapper");
    this.container = document.querySelector(".toolbar__container");
    this.menu = document.querySelector(".toolbar-menu");
    this.menuWrapper = document.querySelector(".toolbar-menu__wrapper");
    this.menuArr = [...document.querySelectorAll(".toolbar-content")];
    this.menuSort = document.querySelector("#toolbarSort");
    this.menuFilter = document.querySelector("#toolbarFilter");
    this.menuPoints = document.querySelector("#toolbarPoints");
    this.menuCollections = document.querySelector("#toolbarCollections");
    this.menuScore = document.querySelector("#toolbarScore");
    this.inputArr = this.rootEl.querySelectorAll("input");
    this.evtToggleSort = [
      ...document.querySelectorAll('[data-evt="toggleSortMenu"]'),
    ];
    this.evtToggleFilter = [
      ...document.querySelectorAll('[data-evt="toggleFilterMenu"]'),
    ];
    this.evtTogglePoints = [
      ...document.querySelectorAll('[data-evt="togglePoints"]'),
    ];
    this.evtReset = [
      ...document.querySelectorAll('[data-evt="resetToolbarForm"]'),
    ];
    this.evtToggleCollections = [
      ...document.querySelectorAll('[data-evt="toggleCollections"]'),
    ];

    this.init();
  }

  /**
   * Methods
   */
  observeSortState() {
    if (this.menuSort && this.evtToggleSort.length) {
      const inputs = this.menuSort.querySelectorAll("input:checked");
      if (inputs.length) {
        this.evtToggleSort.forEach((btn) => btn.classList.add(IS_ACTIVE));
      } else {
        this.evtToggleSort.forEach((btn) => btn.classList.remove(IS_ACTIVE));
      }
    }
  }
  observeFilterState() {
    if (this.menuFilter && this.evtToggleFilter.length) {
      const inputs = this.menuFilter.querySelectorAll("input:checked");
      if (inputs.length) {
        this.evtToggleFilter.forEach((btn) => btn.classList.add(IS_ACTIVE));
      } else {
        this.evtToggleFilter.forEach((btn) => btn.classList.remove(IS_ACTIVE));
      }
    }
  }
  observeInputsCheckedState() {
    this.observeSortState();
    this.observeFilterState();
  }
  toggleLocked(condition, elem) {
    if (condition && elem) {
      this.locked = condition;
      setTimeout(() => {
        this.locked = !condition;
      }, getTransitionTime(elem));
    }
  }
  hideMenuArr(timeout = 0, except = undefined) {
    this.menuArr.forEach((el) => {
      if (el !== except) {
        el.style.display = "none";
      }
    });
  }
  show(menu = this.menuArr[0]) {
    if (menu == this.menuScore) {
      this.celebrating = true;
      setTimeout(() => {
        this.celebrating = false;
      }, 50);
    }

    if (!this.locked) {
      if (!this.opened && menu) {
        this.hideMenuArr(0);
        setTimeout(() => {
          this.opened = true;
          menu.style.display = "block";
          setTimeout(() => {
            const height = menu.querySelector(".toolbar-form").offsetHeight;
            menu.querySelector(".toolbar-form").scrollTop = 0;
            this.menu.style.height = `${height + 4}px`;
            this.rootEl.classList.add(IS_ACTIVE);
            this.toggleLocked(true, this.menu);
          }, 5);
        }, 5);
      }
      if (this.opened) {
        const visibleMenu = this.menuArr.find((el) => {
          return el.style.display === "block";
        });
        if (visibleMenu) {
          if (visibleMenu !== menu) {
            this.hideMenuArr();
            setTimeout(() => {
              this.observeInputsCheckedState();
              menu.style.display = "block";
              menu.querySelector(".toolbar-form").scrollTop = 0;
              const height = menu.offsetHeight;
              this.menu.style.height = `${height + 4}px`;
              this.toggleLocked(true, this.menu);
            }, 2);
          } else {
            this.hide();
          }
        }
      }
    }
  }
  hide() {
    if (!this.locked) {
      if (this.opened) {
        this.observeInputsCheckedState();
        this.opened = false;
        this.menu.style.height = "0px";
        this.rootEl.classList.remove(IS_ACTIVE);
        this.toggleLocked(false, this.menu);
        this.hideMenuArr(getTransitionTime(this.menu));
      }
    }
  }

  /**
   * Bind Events
   */
  bindEvents() {
    // Sorting
    for (const btn of this.evtToggleSort) {
      if (this.menuSort) {
        btn.addEventListener("click", () => {
          this.show(this.menuSort);
          this.observeInputsCheckedState();
        });
      }
    }

    // Filters
    for (const btn of this.evtToggleFilter) {
      if (this.menuFilter) {
        btn.addEventListener("click", () => {
          this.show(this.menuFilter);
          this.observeInputsCheckedState();
        });
      }
    }

    // Points
    for (const btn of this.evtTogglePoints) {
      if (this.menuPoints) {
        btn.addEventListener("click", () => {
          this.show(this.menuPoints);
          this.observeInputsCheckedState();
        });
      }
    }

    // Reset
    for (const btn of this.evtReset) {
      btn.addEventListener("click", () => {
        const parent = btn.parentNode.closest(".toolbar-form");
        if (parent) {
          const inputArr = parent.querySelectorAll("input");
          for (const input of inputArr) {
            input.checked = false;
            input.dispatchEvent(new Event("change"));
          }
        }
      });
    }

    // Collections
    for (const btn of this.evtToggleCollections) {
      if (this.menuCollections) {
        btn.addEventListener("click", () => {
          this.show(this.menuCollections);
        });
      }
    }

    // Input changes
    for (const input of this.inputArr) {
      input.addEventListener("change", (e) => {
        this.observeInputsCheckedState();
      });
    }

    // Document Events
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!target.closest(".toolbar") && !this.celebrating) {
        this.hide();
      }
    });
  }

  // Scores/ Celebration/ Congratulation
  pushConfetti() {
    if (!window.tsParticles) {
      console.warn("tsParticles not found");
      return;
    }

    const delayPattern = [1000, 350, 750, 750];
    const particleCount = 50;
    const colors = ["#65a6ff", "#15ddbf"];
    const spread = 75;
    const velocity = 0.2;
    const startVelocity = 35;
    const decay = 0.9;

    const duration = delayPattern.reduce((total, delay) => total + delay, 0);

    function shootConfetti() {
      confetti({
        particleCount: particleCount,
        angle: -25,
        spread: spread,
        origin: { x: 0.1, y: 0 },
        colors: colors,
        velocity: velocity,
        startVelocity: startVelocity,
        decay: decay,
      });

      confetti({
        particleCount: particleCount,
        angle: -155,
        spread: spread,
        origin: { x: 0.9, y: 0 },
        colors: colors,
        velocity: velocity,
        startVelocity: startVelocity,
        decay: decay,
      });
    }

    function go() {
      let index = 0;

      function frame() {
        if (index < delayPattern.length) {
          shootConfetti();

          setTimeout(() => {
            index++;
            requestAnimationFrame(frame);
          }, delayPattern[index]);
        }
      }

      frame();
    }

    go();
  }
  showScore() {
    this.show(this.menuScore);
    this.pushConfetti();
  }

  /**
   * Initialize
   */
  renderPTSLottie() {
    const lottieContainers = [
      ...document.querySelectorAll('[data-lottie="diamondSpin"]'),
    ];
    lottieContainers.forEach((container) => {
      const animation = bodymovin.loadAnimation({
        container: container,
        path: "https://gist.githubusercontent.com/steinway1/4de3da6a3a8364ede5c3e5fff52c5113/raw/94ab2c03988700c56cffeb4f5fc06ce2e605120f/spin-diamond.json",
        autoplay: true,
        renderer: "svg",
        loop: true,
      });
    });
  }
  init() {
    if (this.rootEl) {
      this.bindEvents();
      this.renderPTSLottie();

      window.celebrateScore = this.showScore.bind(this);
    }
  }
}

export function initToolbar() {
  const rootEl = document.querySelector(".toolbar");
  new ToolBar(rootEl);
}
