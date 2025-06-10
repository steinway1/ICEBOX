export default class QuizModal {
  constructor() {
    this.currentStep = undefined;
    this.isFinished = undefined;
    this.pollLength = undefined;
    this.maxStep = undefined;
    this.isInitialized = undefined;
    this.init();
  }

  init() {
    this.renderDOM();
    this.setInitial();
    this.bindEvents();
  }

  renderDOM() {
    this.modal = $('.quiz-modal');
    this.container = this.modal.find('.quiz-container');
    this.backdrop = this.modal.find('.quiz-modal__backdrop');
    this.heightContainer = this.modal.find('.quiz-container-height');
    this.poll = this.modal.find('.quiz-poll');
    this.pollArr = [...this.poll];
    this.answers = this.modal.find('.quiz-answer');
    this.fullStepText = this.modal.find('.quiz-step-text');
    this.currentStepText = this.modal.find('.quiz-current-step');
    this.maxStepText = this.modal.find('.quiz-max-step');
    this.bar = this.modal.find('.quiz-bar');
    this.evtGoNext = $('[data-evt="quizGoNext"]');
    this.evtOpen = $('[data-evt="openQuizModal"]');
    this.closeBtn = $('[data-evt="closeQuizModal"]');
  }

  bindEvents() {
    this.evtGoNext.click(() => {
      this.goNextStep();
    });
    this.closeBtn.click(() => {
      this.close();
    });
    this.evtOpen.click(() => {
      this.open();
    });
  }

  setInitial() {
    this.currentStep = 1;
    this.isFinished = false;
    this.pollLength = this.pollArr.length;
    this.maxStep = this.pollLength;

    if (this.pollLength !== 0 && this.pollLength !== undefined && this.isInitialized !== true) {
      this.isInitialized = true;
      this.currentStepText.html(this.currentStep);
      this.maxStepText.html(this.maxStep);
      this.modal.find('input[type="radio"]').prop('checked', false);
      this.evtGoNext.html('Next');
      Object.assign(this.bar[0].style, { width: `${100 / this.pollLength}%` });
    } else {
      return false;
    }
  }

  getObjectScrollHeight(obj) {
    if (obj instanceof jQuery) {
      return `${obj[0].scrollHeight}px`;
    } else {
      return `${obj.scrollHeight}px`;
    }
  }

  noEmptyAnswers() {
    let parent = $(this.pollArr[this.currentStep - 1]);
    let checkedRadio = parent.find('input[type="radio"]:checked');
    let answers = parent.find(this.answers);

    if (checkedRadio.length == 0) {
      answers.css({ opacity: '0.3' });
      setTimeout(() => {
        answers.css({ opacity: 1 });
      }, 375);
    } else {
      return true;
    }
  }

  goNextStep() {
    if (this.currentStep !== this.maxStep) {
      if (this.noEmptyAnswers()) {
        Object.assign(this.pollArr[this.currentStep - 1].style, { opacity: 0 });
        Object.assign(this.bar[0].style, {
          width: `${(100 / this.pollLength) * (this.currentStep + 1)}%`,
        });
        $.each(this.pollArr, i => {
          Object.assign(this.pollArr[i].style, { transform: `translateX(-${this.currentStep * 100}%)` });
        });
        Object.assign(this.heightContainer[0].style, {
          height: `${this.pollArr[this.currentStep].scrollHeight}px`,
        });
        ++this.currentStep;
        this.currentStepText.html(this.currentStep);
        if (this.currentStep == this.maxStep) {
          this.evtGoNext.html('Show Results');
        }
      }
    } else {
      if (this.noEmptyAnswers()) {
        Object.assign(this.heightContainer[0].style, { height: '0px' });
        Object.assign(this.bar[0].style, { width: '5%' });
        $.each(this.pollArr, i => {
          Object.assign(this.pollArr[i].style, { transform: `translateX(-${this.currentStep * 100}%)` });
        });
        Object.assign(this.pollArr[this.currentStep - 1].style, { opacity: 0 });
        this.evtGoNext.prop('disabled', true);
        this.fullStepText.text('FINDING WATCHES');
        $('.quiz-close-btn').remove();
        this.isFinished = true;
        setTimeout(() => {
          this.bar.animate({ width: '100%' }, 3000, () => {
            this.close();
          });
        }, 600);
      }
    }
  }

  open() {
    lockScroll();
    this.modal.show();
    Object.assign(this.heightContainer[0].style, {
      height: `${this.getObjectScrollHeight(this.pollArr[this.currentStep - 1])}`,
    });
    setTimeout(() => {
      Object.assign(this.backdrop[0].style, { opacity: 1 });
      Object.assign(this.container[0].style, { transform: 'translateY(0px)', opacity: 1 });
    }, 1);
  }

  close() {
    unlockScroll();
    let timeToHide = parseFloat(window.getComputedStyle(this.backdrop[0]).transitionDuration) * 1000;
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: 'translateY(32px)', opacity: 0 });
    setTimeout(() => {
      this.modal.hide();
    }, timeToHide);
  }
}
