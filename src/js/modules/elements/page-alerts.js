class PageAlerts {
  #classes = {
    fullWidth: 'page-alert_backdrop',
    error: 'page-alert_error',
    warning: 'page-alert_warning',
    info: 'page-alert_info',
    visible: 'is-visible',
  };

  #alertTimer;

  constructor() {
    this.init();
  }

  init() {
    this.#cacheDOM();
    this.#bindEvents();
  }

  #cacheDOM() {
    this.container = $('.page-alert');
    this.title = $('.page-alert-title');
    this.subtitle = $('.page-alert-text');
    this.close = $('[data-evt="hidePageAlert"]');
  }

  #bindEvents() {
    this.close.click(this.hideAlert.bind(this));
    clearTimeout(this.#alertTimer);
  }

  fullWidth() {
    this.container.addClass(this.#classes.fullWidth);
  }

  showAlert(errorType = () => this.resetAlert(), title, text, hideTime = 2500) {
    clearTimeout(this.#alertTimer);
    this.resetAlert();

    this.container.addClass(this.#classes.visible).addClass(errorType);
    this.#changeMsg(title, text);
    this.#alertTimer = window.setTimeout(() => {
      this.hideAlert();
    }, hideTime);
  }

  hideAlert() {
    this.container.removeClass(this.#classes.visible);
  }

  #changeMsg(title, text) {
    this.title.html(title);
    this.subtitle.html(text);
  }

  resetAlert() {
    this.container.removeClass(() => {
      const i = this.#classes;
      return `${i.warning} ${i.info} ${i.error}`;
    });
  }
}

export default PageAlerts;
