class PageConfetti {
  constructor() {
    this.el = null
    this.containerEl = null
    this.confettiFrequency = 3
    this.confettiInterval = 50
    this.timeToDestroy = 8000
    this.confettiColors = ['#0095c6', '#1ab8ec', '#8cdffa', '#d8f3fc']
    this.confettiAnimations = ['slow', 'medium', 'fast']
  }

  createHolder() {
    this.el = createElem('div', {
      className: 'confetti-holder'
    })
    document.body.appendChild(this.el)
  }

  setup() {
    const containerEl = createElem('div', {
      className: 'confetti-container'
    })
    this.el.appendChild(containerEl)
    this.containerEl = containerEl
  }

  render() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div')
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px'
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)]
      const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + 'px'
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)]

      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation)
      confettiEl.style.left = confettiLeft
      confettiEl.style.width = confettiSize
      confettiEl.style.height = confettiSize
      confettiEl.style.backgroundColor = confettiBackground

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl)
      }, 3000)

      this.containerEl.appendChild(confettiEl)
    }, this.confettiInterval)
  }

  destroy() {
    const el = this.el
    if (el) {
      el.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(el)
      }, getTransitionTime(el));
    }
  }

  push(infinity = false) {
    this.createHolder()
    this.setup()
    this.render()
    if (!infinity) {
      setTimeout(() => {
        this.destroy()
      }, this.timeToDestroy);
    }
  }
}

module.exports = PageConfetti