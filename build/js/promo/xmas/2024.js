class Xmas {
  constructor(root) {
    this.root = root
    if (!root) {
      return
    }
    this.init()
  }
  init() {
    this.setupTimer()
  }

  setupTimer() {
    createTimer({
      daySelector: '[data-xmas-timer="days"]',
      hourSelector: '[data-xmas-timer="hours"]',
      minuteSelector: '[data-xmas-timer="minutes"]',
      secondSelector: '[data-xmas-timer="seconds"]',
      date: '2024-12-29 10:00:00'
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('body.--xmas')
  if (root) {
    new Xmas(root)
  }
})