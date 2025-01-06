class NewYear {
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
      daySelector: '[data-new-year-timer="days"]',
      hourSelector: '[data-new-year-timer="hours"]',
      minuteSelector: '[data-new-year-timer="minutes"]',
      secondSelector: '[data-new-year-timer="seconds"]',
      date: '2025-01-12 16:00:00'
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('body.--new-year')
  if (root) {
    new NewYear(root)
  }
})