import $ from 'jquery'
import LockPin from '../dynamic/lock-pin'
import CrmSwiper from '../dynamic/crm-swiper'
import { getTransitionTime } from '../general/utils'
import { __SEALED, __REVEALED, __EDIT, IS_ACTIVE, IS_VISIBLE } from '../general/constants'

export default class WhalesPage {
  constructor(rootEl) {
    this.rootEl = rootEl
    if (!rootEl) return

    this.initFn = {
      attachMoreBtnClick: this.attachMoreBtnClick.bind(this),
      attachDropdownBtnClick: this.attachDropdownBtnClick.bind(this),
      attachViewSwitch: this.attachViewSwitch.bind(this),
      attachDocClick: this.attachDocClick.bind(this),
      attachCRM: this.attachCRM.bind(this),
      attachToggleQuestion: this.attachToggleQuestion.bind(this),
      attachAvatarUpload: this.attachAvatarUpload.bind(this),
    };
    this.init()
  }

  init() {
    const pin = new LockPin({
      code: 3256,
    });
    pin.push();

    Object.values(this.initFn).forEach((fn) => {
      if (typeof fn === 'function') {
        try {
          fn();
        } catch (err) {
          console.log(`whales init fn err : ${err.message}`);
        }
      }
    });

    this.hidePhones();
  }

  toggleView(viewType = 'list') {
    const grid = document.querySelector('.tb-grid-container');
    const list = document.querySelector('.tb-table-container');

    if (list !== undefined && grid !== undefined) {
      switch (viewType) {
        case 'grid':
          list.style.opacity = 0;
          setTimeout(() => {
            list.style.display = 'none';
            grid.style.display = 'block';
            setTimeout(() => {
              grid.style.opacity = 1;
            }, 3);
          }, getTransitionTime(list));
          break;
        case 'list':
          grid.style.opacity = 0;
          setTimeout(() => {
            grid.style.display = 'none';
            list.style.display = 'block';
            setTimeout(() => {
              list.style.opacity = 1;
            }, 3);
          }, getTransitionTime(list));
          break;
        default:
          break;
      }
    }
  }

  hidePhones() {
    const phoneCellArr = [...document.querySelectorAll('[data-cell="phone"]')];

    for (const cell of phoneCellArr) {
      const evtReveal = cell.querySelector('[data-cell-evt="reveal"]');
      const evtEdit = cell.querySelector('[data-cell-evt="edit"]');
      const evtSMS = cell.querySelector('[data-cell-evt="sms"]');
      const input = cell.querySelector('.whale-card__input');
      const cellValue = cell.querySelector('.cell-value');
      let phoneValue;

      if (cellValue && evtEdit && evtReveal && input) {
        phoneValue = cellValue.innerText;

        cell.seal = () => {
          if (!cell.classList.contains(__SEALED)) {
            cell.classList.add(__SEALED);
            const lastFourDigits = phoneValue.replace(/ /g, '').replace(/-/g, '').slice(-4);
            cellValue.innerText = `···· ${lastFourDigits}`;
          }
        };

        cell.reveal = () => {
          cell.classList.remove(__SEALED);
          cell.classList.add(__REVEALED);
          cellValue.innerText = phoneValue;
          evtReveal.remove();
        };

        cell.edit = () => {
          cell.classList.add(__EDIT);
          input.value = phoneValue;
          input.focus();
          evtEdit.innerHTML = 'Save';
        };

        cell.save = () => {
          cell.classList.remove(__EDIT);
          cell.classList.remove(__SEALED);
          cellValue.innerText = input.value;
          phoneValue = input.value;
          evtEdit.innerHTML = 'Edit';
          evtReveal.remove();
        };

        cell.seal();

        // Events
        evtReveal.onclick = () => {
          const pin = new LockPin({
            code: 3257,
            callback: cell.reveal,
            allowClose: true,
          });
          pin.push();
        };

        evtEdit.onclick = () => {
          if (cell.classList.contains(__EDIT)) {
            cell.save();
          } else {
            const pin = new LockPin({
              code: 3257,
              callback: cell.edit,
              allowClose: true,
            });
            pin.push();
          }
        };

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.keyCode === 13) {
            cell.save();
          }
        });
      }
    }
  }

  attachMoreBtnClick() {
    document.addEventListener('click', (e) => {
      const target = e.target;
      const btn =
        e.target.dataset.evt === 'whale_toggle_more'
          ? e.target
          : e.target.closest('[data-evt="whale_toggle_more"]');
      if (btn) {
        const card = target.closest('.whale-card');
        const drop_menu = card.parentNode.querySelector('.whale-more-drop');
        document.querySelectorAll('.whale-card.--drop-active').forEach((elCard) => {
          if (elCard !== card) {
            elCard.classList.remove('--drop-active');
          }
        });
        if (card && drop_menu) {
          const is_active = card.classList.contains('--drop-active');
          if (is_active) {
            card.classList.remove('--drop-active');
          } else {
            card.classList.add('--drop-active');
          }
        }
      }
      if (!target.closest('.whale-more-wrap')) {
        document.querySelectorAll('.whale-card.--drop-active').forEach((card) => {
          card.classList.remove('--drop-active');
        });
      }
    });
  }

  attachDropdownBtnClick() {
    const btnArr = [...document.querySelectorAll('[data-tb-dropdown]')];
    btnArr.forEach((btn) => {
      btn.onclick = () => {
        const dropdown = btn.parentNode.querySelector('.tb-dropdown');
        if (dropdown !== null) {
          if (window.getComputedStyle(dropdown).getPropertyValue('display') !== 'none') {
            btn.classList.remove(IS_ACTIVE);
            dropdown.classList.remove(IS_VISIBLE);
            setTimeout(() => {
              dropdown.style.display = 'none';
            }, getTransitionTime(dropdown));
          } else {
            dropdown.style.display = 'block';
            btn.classList.add(IS_ACTIVE);
            setTimeout(() => {
              dropdown.classList.add(IS_VISIBLE);
            }, 1);
          }
        }
      };
    });
  }

  attachViewSwitch() {
    const btnArr = [...document.querySelectorAll('[data-switch-view]')];
    const removeCls = () => {
      btnArr.forEach((btn) => {
        btn.classList.remove(IS_ACTIVE);
      });
    };
    btnArr.forEach((btn) => {
      btn.onclick = () => {
        const attr = btn.getAttribute('data-switch-view');
        if (attr !== null && !btn.classList.contains(IS_ACTIVE)) {
          removeCls();
          btn.classList.add(IS_ACTIVE);
          this.toggleView(attr);
        }
      };
    });
  }

  attachDocClick() {
    const dropdowns = [...document.querySelectorAll('.tb-dropdown')];
    const dropButtons = [...document.querySelectorAll('[data-tb-dropdown]')];
    document.addEventListener('click', function (e) {
      const target = e.target;
      if (!target.closest('.tb-btn')) {
        dropdowns.forEach((drop) => {
          drop.classList.remove(IS_VISIBLE);
          setTimeout(() => {
            drop.style.display = 'none';
          }, getTransitionTime(drop));
        });
        dropButtons.forEach((btn) => {
          btn.classList.remove(IS_ACTIVE);
        });
      }
    });
  }

  attachCRM() {
    if (window.innerWidth < 1024) return;
    const evtGoCrm = [...document.querySelectorAll('[data-evt="goCRM"]')];
    for (const element of evtGoCrm) {
      element.onclick = () => {
        const card = element.parentNode.closest('.whale-card') || null;
        const swiperInstance = new CrmSwiper({}, card).init();
      };
    }
    document.onclick = (e) => {
      const target = e.target;
      if (target.closest('[data-evt="cardGoCRM"]')) {
        const card = target.closest('.whale-card');
        if (card) {
          const swiperInstance = new CrmSwiper({}, card).init();
        }
      }
    };
  }

  attachToggleQuestion() {
    const input = document.querySelector('#show_questions');
    if (input) {
      const span = input.parentNode.querySelector('span');
      input.addEventListener('change', () => {
        const isChecked = input.checked;
        if (isChecked) {
          document.body.classList.add('--visible_questions');
        } else {
          document.body.classList.remove('--visible_questions');
        }
      });
    }
  }

  attachAvatarUpload() {
    document.addEventListener('change', (e) => {
      const target = e.target
      if (target.matches('input[data-input="avatar_upload"][type="file"]')) {
        const reader = new FileReader()
        try {
          reader.onload = (e) => {
            const img = target.closest('.whale-card .whale-card__avatar').querySelector('img')
            if (img) {
              img.src = e.target.result
            }
          }
          reader.readAsDataURL(target.files[0])
        } catch (err) {
          throw new Error(`Upload avatar error: ${err.message}`)
        }
      }
    })
  }
}
