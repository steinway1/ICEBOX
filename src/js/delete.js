slide(section) {
  section.style.display = 'flex'
  const height = section.scrollHeight
  const pxToTransform = this.sections.slice(0, this.currentStep).reduce((acc, el) => acc + el.scrollHeight, 0)
  this.content.style.height = `${height}px`
  this.scroller.style.transform = `translateY(-${pxToTransform}px)`
  this.sections.forEach(e => e.classList.remove(IS_ACTIVE))
  section.classList.add(IS_ACTIVE)
  setTimeout(() => {
    this.sliding = false
  }, getTransitionTime(this.scroller));
}

go(toStep) {
  if (this.holder.classList.contains(__LOCKED)) return
  const inputs = [...this.holder.querySelectorAll('input'), ...this.holder.querySelectorAll('select')]
  const step = toStep || this.currentStep || 0
  const nextStep = step + 1
  const nextSection = this.sections[nextStep]

  if (!this.sections[nextStep + 1]) {
    this.evtGo.forEach((btn) => {
      btn.innerHTML = 'Submit'
    })
  }

  if (nextSection) {
    this.sliding = true
    inputs.forEach(input => input.blur())
    this.loadingOn()
    setTimeout(() => {
      this.currentStep = nextStep
      this.slide(nextSection)
      this.loadingOff()
      this.observeBar()
    }, 600);
  } else {
    this.save()
    this.finishMessage()
  }
}

back(toStep) {
  if (this.holder.classList.contains(__LOCKED)) return
  this.clearErrors()
  const step = toStep || this.currentStep || 0
  const prevStep = step - 1
  const prevSection = this.sections[prevStep]
  if (prevSection) {
    this.evtGo.forEach((btn) => {
      btn.innerHTML = 'Next'
    })
    this.currentStep = prevStep
    this.slide(prevSection)
  } else {
    this.toggle()
  }
}