import { createElem } from '../../modules/general/utils'
import { getTransitionTime } from '../../modules/general/utils'

export default class PopupBackdrop {
  constructor(settings = {}) {
    this.el = createElem('div', {
      className: 'page-backdrop',
    })
    this.callback = settings.callback || null
    this.instant = settings.instant || false
    this.zIndex = settings.zIndex
    this.show()
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) {
        this.hide()
      }
      if (this.callback) {
        this.callback()
      }
    })
  }

  show() {
    if (this.instant) {
      this.el.classList.add('--instant')
    }
    if (this.zIndex) {
      this.el.style.zIndex = this.zIndex
    }
    document.body.appendChild(this.el)
    this.el.style.display = 'block'
    setTimeout(() => {
      this.el.style.opacity = '1'
    }, 1);
  }

  hide() {
    this.el.style.opacity = '0'
    setTimeout(() => {
      this.el.style.display = 'none'
      this.el.remove()
    }, getTransitionTime(this.el));
  }
}