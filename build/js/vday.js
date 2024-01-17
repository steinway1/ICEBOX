$(function () {

  const resultsPage = document.querySelector('.vday_results') == null ? false : true,
    vdayFireworksDefaults = {
      startVelocity: 20,
      spread: 250,
      zIndex: 1000,
      colors: ["cc446c", "f54b79", "cc446c", "e4aebb"]
    }

  function pushIntervalFireworks() {
    if (!resultsPage) {
      let rng = (min, max) => { return Math.random() * (max - min) + min; },
        interval = 5000

      let particleCount = window.innerWidth <= 479 ? 70 : 120

      const pushConfetti = () => {
        confetti(
          Object.assign({}, {
            particleCount,
            ...vdayFireworksDefaults,
            ticks: 450,
            origin: { x: rng(0.2, 0.8), y: rng(0.2, 0.8) },
          })
        )
      }

      setTimeout(() => { pushConfetti() }, 1000)
      setInterval(() => {
        if (document.hasFocus()) {
          pushConfetti()
        }
      }, interval);
    }
  }

  function pushVdayPageFireworks() {
    if (resultsPage) {
      const rng = (min, max) => { return Math.random() * (max - min) + min; },
        duration = 5 * 650,
        animationEnd = Date.now() + duration

      const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        let particleCount
        if (window.innerWidth <= 479) { particleCount = 25 * (timeLeft / duration) } else {
          particleCount = 65 * (timeLeft / duration)
        }

        confetti(
          Object.assign({}, {
            particleCount,
            ...vdayFireworksDefaults,
            ticks: 130,
            origin: { x: rng(0.05, 0.45), y: Math.random() - 0.2 },
          })
        );
        confetti(
          Object.assign({}, {
            particleCount,
            ...vdayFireworksDefaults,
            ticks: 130,
            origin: { x: rng(0.45, 0.95), y: Math.random() - 0.2 },
          })
        );
      }, 450);
    }
  }

  pushVdayPageFireworks()
  pushIntervalFireworks()
})