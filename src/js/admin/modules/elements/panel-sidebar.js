import { throttle } from "../general/utils";

export default class PanelSidebar {
  static className = {
    top: "--top-scroll",
    bottom: "--bottom-scroll",
  };

  constructor() {
    this.rootEl = document.querySelector(".panel__area-sidebar.--sticky");
    if (!this.rootEl) return;

    this.init();
  }

  init() {
    this.#bindScrollEvents();
  }

  #bindScrollEvents() {
    const bar = this.rootEl;
    const handleScroll = throttle(() => {
      const current = bar.scrollTop;
      const scrollHeight = bar.scrollHeight;
      const height = bar.clientHeight;

      const showTop = current > 12;
      const showBottom = scrollHeight > current + height + 90;

      bar.classList.toggle(PanelSidebar.className.top, showTop);
      bar.classList.toggle(PanelSidebar.className.bottom, showBottom);
    }, 5);

    bar.addEventListener("scroll", handleScroll);
    handleScroll();
  }
}
