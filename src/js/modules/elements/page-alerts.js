const pageAlerts = {
  classes: {
    fullWidth: 'page-alert_backdrop',
    error: 'page-alert_error',
    warning: 'page-alert_warning',
    info: 'page-alert_info',
    visible: 'is-visible'
  },
  init: function () {
    this.cacheDOM()
    this.bindEvents()
    // this.fullWidth()
  },
  cacheDOM: function () {
    this.container = $('.page-alert')
    this.title = $('.page-alert-title')
    this.subtitle = $('.page-alert-text')
    this.close = $('[data-evt="hidePageAlert"]')
  },
  bindEvents: function () {
    this.close.click(this.hideAlert.bind(this))
    clearTimeout(alertTimer)
  },
  fullWidth: function () {
    this.container.addClass(this.classes.fullWidth)
  },
  showAlert: function (errorType = function () { pageAlerts.resetAlert() }, title, text, hideTime = 2500) {
    clearTimeout(alertTimer)
    this.resetAlert();

    this.container.addClass(this.classes.visible).addClass(errorType)
    this.changeMsg(title, text)
    alertTimer = window.setTimeout(function () {
      pageAlerts.hideAlert()
    }, hideTime)
  },
  hideAlert: function () {
    this.container.removeClass(this.classes.visible)
  },
  changeMsg: function (title, text) {
    this.title.html(title)
    this.subtitle.html(text)
  },
  resetAlert: function () {
    this.container.removeClass(function () {
      let i = pageAlerts.classes
      return `${i.warning} ${i.info} ${i.error}`
    })
  }
}

module.exports = pageAlerts