const menu = {
  states: {
    isActive: false,
    overIsActive: false,
  },
  init: function () {
    this.renderDOM();
    if (document.querySelector('.mob-menu')) {
      this.bindEvents();
      this.initialState();
      this.attachHoverEffect()
    }
  },
  renderDOM: function () {
    // modal
    this.modal = $(".mob-menu");
    this.backdrop = $(".mob-menu__backdrop");
    this.container = $(".mob-menu__container");
    // content
    this.main = $(".mob-menu__main-content");
    this.over = $(".mob-menu__over-content");
    this.overHeading = $(".mob-menu__over-heading");
    this.scrollContent = $(".mob-menu__scroll-content");
    this.megaLink = $(".mob-menu__mega-link");
    // events
    this.evtToggle = $('[data-evt="toggleMenu"]');
    this.evtToggleOver = [...$(".mob-menu__nav-step, .mob-menu__step-back")];
  },
  bindEvents: function () {
    $.each(this.evtToggle, function (index) {
      $(menu.evtToggle[index]).click(function () {
        menu.toggle();
      });
    });
    $.each(this.evtToggleOver, function (index) {
      $(menu.evtToggleOver[index]).click(function () {
        menu.toggleOver($(this));
      });
    });
    this.megaLink.on("click", function () {
      if (menu.states.isActive) {
        menu.toggle();
      }
    });
  },
  toggleOver: function (target) {
    let main = this.main[0],
      over = this.over[0];
    if (!menu.states.overIsActive) {
      let attr = target.attr("data-menu-nav");
      if (!attr) {
        return false;
      } else {
        let content = $(".mob-menu__step-content"),
          toShow = content.filter(`[data-menu-over="${attr}"]`),
          title =
            attr == "engagement"
              ? "Engagement & Wedding"
              : `${attr} Collection`;
        if (toShow) {
          let scrollable = $(over).find(menu.scrollContent);
          scrollable[0].scrollTop = 0;
          menu.states.overIsActive = true;
          content.hide();
          toShow.show();
          over.style.display = 'block'
          setTimeout(() => {
            Object.assign(main.style, { transform: "translateX(-20%)" });
            Object.assign(over.style, { transform: "translateX(0%)", opacity: 1 });
          }, 1);
          menu.overHeading.html(title);
        }
      }
    } else {
      menu.states.overIsActive = false;
      Object.assign(main.style, { transform: "translateX(0%)" });
      Object.assign(over.style, { transform: "translateX(30%)", opacity: 0 });
      setTimeout(() => {
        over.style.display = 'none'
      }, getTransitionTime(over));
    }
  },
  toggle: function () {
    if (!menu.states.isActive) {
      menu.open();
    } else {
      menu.close();
    }
  },
  open: function () {
    lockScroll();
    menu.states.isActive = true;
    this.modal.show();
    let scrollable = this.main.find(menu.scrollContent);
    scrollable[0].scrollTop = 0;
    setTimeout(() => {
      Object.assign(this.backdrop[0].style, { opacity: 1 });
      Object.assign(this.container[0].style, { transform: "translateX(0%)" });
    }, 2);
  },
  close: function () {
    unlockScroll();
    menu.states.isActive = false;
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(-100%)" });
    setTimeout(() => {
      this.modal.hide();
    }, getTransitionTime(menu.container));
    if (menu.states.overIsActive) {
      menu.states.overIsActive = false;
      Object.assign(menu.main[0].style, { transform: "translateX(0%)" });
      Object.assign(menu.over[0].style, { transform: "translateX(30%)", opacity: 0 });
      setTimeout(() => {
        menu.over[0].style.display = 'none'
      }, getTransitionTime(menu.over[0]));
    }
  },
  initialState: function () {
    this.modal.hide();
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(-100%)" });
    Object.assign(this.over[0].style, { transform: "translateX(30%)" });
    this.states.isActive = false;
    this.states.overIsActive = false;
  },
  attachHoverEffect: function () {
    let isMobile = window.innerWidth < 479
    if (isMobile) return
    const rows = [...document.querySelectorAll('.mob-menu__nav-item')]
    rows.forEach((row) => {
      const sibs = row.parentNode.querySelectorAll('.mob-menu__nav-item')
      row.onmouseenter = () => {
        sibs.forEach((s) => {
          if (s !== row) {
            s.style.opacity = 0.5
          }
        })
      }
      row.onmouseleave = () => {
        sibs.forEach((s) => {
          if (s !== row) {
            s.style.opacity = 1
          }
        })
      }
    })
  }
};