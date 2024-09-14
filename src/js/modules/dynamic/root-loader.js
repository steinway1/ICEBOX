const rootLoader = new Object({
  class: 'root_loader',
  renderHTML: () => { return `<div class=${rootLoader.class}></div>` },
  isExist: () => { return $(document).find(`.${rootLoader.class}`).length ? true : false },

  push: function (noLock = false) {
    if (!noLock) { lockScroll() }
    if (!this.isExist()) { $body.append(rootLoader.renderHTML()) }
  },
  remove: function (noUnlock = false) {
    if (!noUnlock) unlockScroll();
    if (this.isExist()) { $(document).find(`.${rootLoader.class}`).remove() }
  }
})

module.exports = rootLoader