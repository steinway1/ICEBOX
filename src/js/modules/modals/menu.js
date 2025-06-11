import $ from 'jquery';
import { getEvtDOM, elemDisplayed, lockScroll, unlockScroll, getTransitionTime } from '../utils';

class Menu {
  constructor(rootSelector = '.menu') {
    this._state = false;
    this.overState = false;
    this.rootEl = document.querySelector(rootSelector);

    if (!this.rootEl) {
      return;
    }

    this.contentList = this.rootEl.querySelector('.menu__content-list');
    this.overList = this.rootEl.querySelector('.menu__over-list');
    this.subListArr = [...this.rootEl.querySelectorAll('[data-menu-list]')];
    this.activeListName = this.rootEl.querySelector('#activeListName');

    this.init();
  }

  get state() {
    return this._state;
  }

  set state(value) {
    this._state = value;
    if (this._state) {
      this.open(true);
    } else {
      this.close(true);
    }
  }

  open(fromSetter = false) {
    if (!fromSetter) {
      this._state = true;
    }

    this.rootEl.style.display = 'block';
    setTimeout(() => {
      lockScroll();
      this.rootEl.classList.add(__ACTIVE);
      window.menuBackdrop = new Backdrop({
        half: true,
        callback: () => {
          this.close();
        },
      });
    }, 5);
  }

  close(fromSetter = false) {
    if (!fromSetter) {
      this._state = false;
    }

    if (window.menuBackdrop) {
      window.menuBackdrop.hide(true);
    }

    unlockScroll();
    this.rootEl.classList.remove(__ACTIVE);

    if (this.overState) {
      this.closeOverList();
    }

    setTimeout(() => {
      this.contentList.scrollTop = 0;
      this.rootEl.style.display = 'none';
    }, getTransitionTime(this.rootEl));
  }

  toggle() {
    this.state = !this.state;
  }

  openOverList() {
    if (!this.overState) {
      this.overState = true;
      this.overList.style.display = 'block';
      this.overList.scrollTop = 0;
      this.rootEl.classList.add('--over-active');
      setTimeout(() => {
        this.contentList.classList.add(__HIDDEN);
        this.overList.classList.add(__VISIBLE);
      }, 5);
    }
  }

  closeOverList() {
    if (this.overState) {
      this.overState = false;
      this.contentList.classList.remove(__HIDDEN);
      this.overList.classList.remove(__VISIBLE);
      this.rootEl.classList.remove('--over-active');
      this.contentList.scrollTop = 0;

      setTimeout(() => {
        this.overList.style.display = 'none';
      }, getTransitionTime(this.overList));

      if (this.activeListName) {
        this.activeListName.innerHTML = this.activeListName.dataset.title || 'Explore Icebox';
      }
    }
  }

  goToNavList(name, item = undefined) {
    if (name) {
      const list = this.subListArr.find(el => el.dataset.menuList === name);
      if (!list) throw new Error('data-menu-list not found');

      this.subListArr.forEach(el => {
        if (el !== list) {
          el.style.display = 'none';
        } else {
          el.style.display = 'block';
        }
      });
      if (this.activeListName && item) {
        this.activeListName.innerHTML = item.querySelectorAll('span')[0].innerHTML;
      }
      this.openOverList();
    }
  }

  reset() {
    this.state = false;
    this.overState = false;
    this.contentList.scrolTop = 0;
    this.overList.scrollTop = 0;
  }

  // Events
  bindEvents() {
    const evtNavArr = [...document.querySelectorAll('[data-menu-nav]')];
    evtNavArr.forEach(item => {
      item.onclick = () => {
        if (this.state && !this.overState) {
          const listName = item.dataset.menuNav;
          this.goToNavList(listName, item);
        }
      };
    });

    const evtToggleMenuArr = [...document.querySelectorAll('[data-evt="toggleMenu"]')];
    evtToggleMenuArr.forEach(el => {
      el.addEventListener('click', () => {
        this.open();
      });
    });
  }

  init() {
    this.reset();
    this.bindEvents();
  }
}

module.exports = Menu;
