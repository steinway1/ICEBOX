class PageMsg {
  constructor(settings = {}) {
    this.settings = settings
    this.type = settings?.type || ''
    this.heading = settings?.heading || 'Something went wrong'
    this.text = settings?.text || 'Text is not specified'
    this.id = settings?.id || null
    this.elem = null
    this.show()
  }
  show() {
    this.create()
    this.append()
  }
  create() {
    this.elem = document.querySelector(`.page-msg[data-msg-id="${this.settings?.id}"]`) || document.createElement('div');
    this.elem.className = `page-msg --${this.settings.type}`;
    this.elem.innerHTML = `
    <div class="page-msg__wrapper">
      <div class="page-msg__heading">${this.settings.heading}</div>
      <div class="page-msg__text">${this.settings.text}</div>
    </div>
    `
    this.elem.setAttribute('data-msg-id', this.settings.id)
  }
  append() {
    if (document.querySelector(`.page-msg[data-msg-id="${this.settings?.id}"]`)) {
      this.update()
    } else {
      document.body.appendChild(this.elem)
    }
  }
  update() {
    if (this.elem) {
      const textElement = this.elem.querySelector('.page-msg__text');
      const headingElement = this.elem.querySelector('.page-msg__heading');
      
      if (textElement && this.settings?.text) {
        textElement.innerHTML = this.settings.text;
      }
      
      if (headingElement && this.settings?.heading) {
        headingElement.innerHTML = this.settings.heading;
      }
      
      if (this.settings?.type) {
        this.elem.className = `page-msg --${this.settings.type}`;
      }
      
      if (this.settings?.id) {
        this.elem.setAttribute('data-msg-id', this.settings.id);
      }
    }
  }
  destroy() {
    this.elem?.remove()
  }
}

module.exports = PageMsg