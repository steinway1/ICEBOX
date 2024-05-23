bindKeyEvents() {
  document.addEventListener('keydown', (e) => {
    if (this.locked) return
    if (!this.getActiveSection) return

    const section = this.getActiveSection
    const key = e.key
    const keyIsTab = key === 'Tab'
    const keyIsEnter = key === 'Enter'
    const isBackspace = key === 'Backspace'

    if (isBackspace) {
      const btn = section.querySelector('[data-sell-evt="back"]')
      if (btn && !btn.disabled) {
        e.preventDefault()
        btn.click()
      }
    }

    if (keyIsEnter) {
      const btn = section.querySelector('[data-sell-evt="next"]')
      if (btn && !btn.disabled) {
        e.preventDefault()
        btn.click()
      }
    }

    if (keyIsTab) {
      e.preventDefault()
      const focusedEl = this.getFocusedEl
      const inputs = [...section.querySelectorAll('input, select, textarea')].filter(input => !input.disabled).sort((a, b) => a.compareDocumentPosition(b) - 2)
      let elem

      if (!focusedEl) {
        elem = inputs[0]
      } else {
        const elemWithinSection = inputs.includes(focusedEl)
        if (elemWithinSection) {
          const nextElem = inputs[inputs.indexOf(focusedEl) + 1]
          if (nextElem) {
            elem = nextElem
          } else {
            elem = inputs[0]
          }
        }
      }

      this.dispatchFocusEvent(elem)
    }
  })
}


dispatchFocusEvent(elem) {
  if (elem) {
    const tag = elem.tagName
    switch (tag) {
      case 'INPUT' || 'TEXTAREA':
        const type = elem.type
        if (type === 'radio' || type === 'checkbox') {
          elem.click()
        } else {
          elem.dispatchEvent(new Event('focus'))
        }
        break;
      case 'SELECT':
        elem.focus()
        break;
      default:
        elem.dispatchEvent(new Event('focus'))
        break;
    }
  }
}


bindSetFocusedElement() {
  const inputs = [...this.form.querySelectorAll('input, select, textarea')]
  for (const input of inputs) {
    input.addEventListener('change', () => { this.focusedEl = input })
    input.addEventListener('focus', () => { this.focusedEl = input })
  }
}