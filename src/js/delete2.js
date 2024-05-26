const IS_HIDDEN = 'is-hidden'
const IS_LOCKED = 'is-locked'

function callWithDelay(callback, delay) {
  setTimeout(callback, delay)
}
function getTransitionTime(target) {
  let el = target instanceof jQuery ? target[0] : target;
  return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
}

class SignModal {
  constructor(root) {
    this.root = root
    this.adjustEl = root.querySelector('.sign-modal__adjust')
    this.backdrop = root.querySelector('.sign-modal__backdrop')
    this.container = root.querySelector('.sign-modal__container')
    this.evtOpenArr = document.querySelectorAll('[data-evt="openSignModal"]')
    this.evtCloseArr = document.querySelectorAll('[data-evt="closeSignModal"]')
    this.contentArr = [...root.querySelectorAll('[data-sign-content]')]
    this.evtSwitchContentArr = root.querySelectorAll('[data-sign-switch]')
    this.loader = root.querySelector('.sign-modal__loader')
    this.jsSubmitArr = [...root.querySelectorAll('.js-submit')]
    this.locked = false
    this.opened = false
    this.activeContent = undefined
  }

  /**
   * Utils
   */
  lockModal() {
    this.root.classList.add(IS_LOCKED)
    this.locked = true
  }
  unlockModal() {
    this.root.classList.remove(IS_LOCKED)
    this.locked = false
  }

  /**
   * Methods
   */
  open() {
    if (!this.opened) {
      this.opened = true
      this.root.style.display = 'block'
      lockScroll()
      const show = () => {
        this.backdrop.style.opacity = 1
        this.container.classList.remove(IS_HIDDEN)
      }
      callWithDelay(show, 1)
    }
  }
  close() {
    if (this.opened) {
      this.opened = false
      this.backdrop.style.opacity = 0
      this.container.classList.add(IS_HIDDEN)
      unlockScroll()
      callWithDelay(() => { this.root.style.display = 'none' }, getTransitionTime(this.backdrop))
    }
  }
  loadingOn() {
    if (this.loader && !this.locked) {
      this.unlockModal()
      this.loader.style.display = 'flex'
      callWithDelay(() => { this.loader.style.opacity = '1' }, 10)
    }
  }
  loadingOff() {
    if (this.loader) {
      this.loader.style.opacity = '0'
      callWithDelay(() => {
        this.loader.style.display = 'none'; this.locked = false
      }, getTransitionTime(this.loader))
    }
  }
  switchContent(contentName) {
    let section = this.contentArr.find(e => e.dataset.signContent === contentName)
    let activeSection = this.contentArr.find((el) => {
      let displayProperty = window.getComputedStyle(el).display
      return displayProperty !== 'none'
    })
    if (!section) throw new Error(`Expected to find section with data-sign-content=${contentName}`)
    if (section === activeSection) throw new Error(`Expected to find different section than ${activeSection.dataset.signContent}`)

    this.activeContent = section
    this.lockModal()
    const currentHeight = this.adjustEl.offsetHeight
    this.adjustEl.style.opacity = 0
    this.adjustEl.style.height = `${currentHeight}px`
    setTimeout(() => {
      this.contentArr.forEach(e => e.style.display = 'none')
      section.style.display = 'flex'
      const newHeight = section.scrollHeight
      this.adjustEl.style.height = `${newHeight}px`

      callWithDelay(() => {
        this.adjustEl.style.opacity = '1'
        this.unlockModal()
      }, 5)
    }, getTransitionTime(this.adjustEl));
  }

  /**
   * Bind Events
   */
  bindLoading() {
    this.jsSubmitArr.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        this.loadingOn()
        setTimeout(() => {
          this.loadingOff()
        }, 2000);
      })
    })
  }
  bindToggleVisibility() {
    this.evtOpenArr.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.open()
      })
    })
    this.evtCloseArr.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.close()
      })
    })
  }
  bindSwitchContent() {
    for (const el of this.evtSwitchContentArr) {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        const contentName = el.dataset.signSwitch
        this.switchContent(contentName)
      })
    }
  }

  /**
   * Initial
   */
  initialSetup() {
    this.root.style.display = 'none'
    this.backdrop.style.opacity = 0
    this.container.classList.add(IS_HIDDEN)
  }
  initTelInput() {
    let telInputArr = Array.from(document.querySelectorAll('[data-input="tel"]'))

    for (var i = 0; i < telInputArr.length; i++) {
      let iti = intlTelInput(telInputArr[i], {
        initialCountry: "auto",
        preferredCountries: ["us", "gb", "br", "cn", "es", "it"],
        autoPlaceholder: false,
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/23.0.10/js/utils.min.js",
        geoIpLookup: function (callback) {
          fetch("https://ipinfo.io/json", {
            cache: "reload",
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Failed: " + response.status);
            })
            .then((ipjson) => {
              callback(ipjson.country);
            })
            .catch((e) => {
              callback("us");
            });
        },
      });
    }
  }
  init() {
    if (this.root) {
      // this.initialSetup()
      this.initTelInput()
      this.bindLoading()
      this.bindToggleVisibility()
      this.bindSwitchContent()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.sign-modal')
  if (modal) {
    const signModal = new SignModal(modal)
    signModal.init()
  }
})