class BlackFriday {
  constructor(root) {
    if (!root) {
      return
    }
    this.init()
  }

  init() {
    this.setupTimer()
    this.setupVanta()

    if (document.querySelector('.main_results')) {
      this.pushConfetti()
    }
  }

  // Timer
  setupTimer() {
    createTimer({
      daySelector: '[data-black-timer="days"]',
      hourSelector: '[data-black-timer="hours"]',
      minuteSelector: '[data-black-timer="minutes"]',
      secondSelector: '[data-black-timer="seconds"]',
      date: '2024-11-30 10:00:00'
    })
  }
  // Confetti
  pushConfetti() {
    const colors = ["#ec575a", "#E5C1BD"]
    const shots = 5
    const pauseDuration = 2000
    let currentShot = 0

    let y, count

    if (window.innerWidth > 991) {
      y = 0.6
      count = 50
    } else {
      y = 0.8
      count = 38
    }

    function shoot() {
      confetti({
        particleCount: count,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: y },
        colors: colors,
      });

      confetti({
        particleCount: count,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: y },
        colors: colors,
      });

      currentShot++;
      if (currentShot < shots) {
        setTimeout(shoot, pauseDuration)
      }
    }
    shoot();
  }
  // Vanta Background
  setupVanta() {
    if (window.VANTA) {
      VANTA.WAVES({
        el: "#black-canvas-1",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x10407,
        shininess: 350.00,
        waveHeight: 40.50,
        waveSpeed: 0.5,
        zoom: 20.00
      })

      VANTA.WAVES({
        el: "#black-canvas-2",
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x10407,
        shininess: 350.00,
        waveHeight: 40.50,
        waveSpeed: 0.5,
        zoom: 20.00
      })
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('body.--black-friday')
  if (root) {
    new BlackFriday(root)
  }
})