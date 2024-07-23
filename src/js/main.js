const IS_VISIBLE = "is-visible",
  IS_ACTIVE = "is-active",
  BUTTON_LOADING = "button_loading",
  IS_HIDDEN = 'is-hidden',
  IS_EXPANDED = 'is-expanded',
  IS_MINIMIZED = 'is-minimized',
  IS_COPIED = 'is-copied',
  IS_ERROR = 'is-error',
  IS_EMPTY = 'is-empty',
  __TRUE = '--true',
  __FALSE = '--false',
  __FADE = '--fade',
  __HALF = '--half',
  __SELECTED = '--selected'

let $body = $('body')

const __VALID = '--valid',
  __INVALID = '--invalid',
  __PENDING = '--pending',
  __LOCKED = '--locked',
  __ACTIVE = '--active',
  __EXPANDED = '--expanded'

const paceOptions = {
  ajax: true,
  document: true,
  elements: {
    selectors: ['main']
  }
};

var UPLOADED_BLOG_IMG;

const shortLoremText = 'The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.'
const mediumLoremText = 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided.'


/* #region  Extends */
$.fn.extend({
  exists: function () {
    return this.length;
  },
  setBackScreen: function (opacityVal, filterVal) {
    let target = this instanceof jQuery ? $(this).get(0) : this;
    Object.assign(target.style, {
      opacity: opacityVal,
      filter: `grayscale(${filterVal})`,
    });
  },
  isVisible: function () {
    let target = this instanceof jQuery ? $(this).get(0) : this;
    return window.getComputedStyle(target).getPropertyValue('display') !== 'none'
  },
  appendButtonLoadingState: function (time = 3000) {
    $(this).addClass(BUTTON_LOADING).prop("disabled", true);
    setTimeout(() => {
      $(this).removeClass(BUTTON_LOADING).prop("disabled", false);
    }, time);
  },
});
/* #endregion */

/* #region  Zenscroll */
(function (root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory())
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory()
  } else {
    (function install() {
      // To make sure Zenscroll can be referenced from the header, before `body` is available
      if (document && document.body) {
        root.zenscroll = factory()
      } else {
        // retry 9ms later
        setTimeout(install, 9)
      }
    })()
  }
}(this, function () {
  "use strict"


  // Detect if the browser already supports native smooth scrolling (e.g., Firefox 36+ and Chrome 49+) and it is enabled:
  var isNativeSmoothScrollEnabledOn = function (elem) {
    return elem && "getComputedStyle" in window &&
      window.getComputedStyle(elem)["scroll-behavior"] === "smooth"
  }


  // Exit if it’s not a browser environment:
  if (typeof window === "undefined" || !("document" in window)) {
    return {}
  }


  var makeScroller = function (container, defaultDuration, edgeOffset) {

    // Use defaults if not provided
    defaultDuration = defaultDuration || 999 //ms
    if (!edgeOffset && edgeOffset !== 0) {
      // When scrolling, this amount of distance is kept from the edges of the container:
      edgeOffset = 9 //px
    }

    // Handling the life-cycle of the scroller
    var scrollTimeoutId
    var setScrollTimeoutId = function (newValue) {
      scrollTimeoutId = newValue
    }

    /**
     * Stop the current smooth scroll operation immediately
     */
    var stopScroll = function () {
      clearTimeout(scrollTimeoutId)
      setScrollTimeoutId(0)
    }

    var getTopWithEdgeOffset = function (elem) {
      return Math.max(0, container.getTopOf(elem) - edgeOffset)
    }

    /**
     * Scrolls to a specific vertical position in the document.
     *
     * @param {targetY} The vertical position within the document.
     * @param {duration} Optionally the duration of the scroll operation.
     *        If not provided the default duration is used.
     * @param {onDone} An optional callback function to be invoked once the scroll finished.
     */
    var scrollToY = function (targetY, duration, onDone) {
      stopScroll()
      if (duration === 0 || (duration && duration < 0) || isNativeSmoothScrollEnabledOn(container.body)) {
        container.toY(targetY)
        if (onDone) {
          onDone()
        }
      } else {
        var startY = container.getY()
        var distance = Math.max(0, targetY) - startY
        var startTime = new Date().getTime()
        duration = duration || Math.min(Math.abs(distance), defaultDuration);
        (function loopScroll() {
          setScrollTimeoutId(setTimeout(function () {
            // Calculate percentage:
            var p = Math.min(1, (new Date().getTime() - startTime) / duration)
            // Calculate the absolute vertical position:
            var y = Math.max(0, Math.floor(startY + distance * (p < 0.5 ? 2 * p * p : p * (4 - p * 2) - 1)))
            container.toY(y)
            if (p < 1 && (container.getHeight() + y) < container.body.scrollHeight) {
              loopScroll()
            } else {
              setTimeout(stopScroll, 99) // with cooldown time
              if (onDone) {
                onDone()
              }
            }
          }, 9))
        })()
      }
    }

    /**
     * Scrolls to the top of a specific element.
     *
     * @param {elem} The element to scroll to.
     * @param {duration} Optionally the duration of the scroll operation.
     * @param {onDone} An optional callback function to be invoked once the scroll finished.
     */
    var scrollToElem = function (elem, duration, onDone) {
      scrollToY(getTopWithEdgeOffset(elem), duration, onDone)
    }

    /**
     * Scrolls an element into view if necessary.
     *
     * @param {elem} The element.
     * @param {duration} Optionally the duration of the scroll operation.
     * @param {onDone} An optional callback function to be invoked once the scroll finished.
     */
    var scrollIntoView = function (elem, duration, onDone) {
      var elemHeight = elem.getBoundingClientRect().height
      var elemBottom = container.getTopOf(elem) + elemHeight
      var containerHeight = container.getHeight()
      var y = container.getY()
      var containerBottom = y + containerHeight
      if (getTopWithEdgeOffset(elem) < y || (elemHeight + edgeOffset) > containerHeight) {
        // Element is clipped at top or is higher than screen.
        scrollToElem(elem, duration, onDone)
      } else if ((elemBottom + edgeOffset) > containerBottom) {
        // Element is clipped at the bottom.
        scrollToY(elemBottom - containerHeight + edgeOffset, duration, onDone)
      } else if (onDone) {
        onDone()
      }
    }

    /**
     * Scrolls to the center of an element.
     *
     * @param {elem} The element.
     * @param {duration} Optionally the duration of the scroll operation.
     * @param {offset} Optionally the offset of the top of the element from the center of the screen.
     *        A value of 0 is ignored.
     * @param {onDone} An optional callback function to be invoked once the scroll finished.
     */
    var scrollToCenterOf = function (elem, duration, offset, onDone) {
      scrollToY(Math.max(0, container.getTopOf(elem) - container.getHeight() / 2 + (offset || elem.getBoundingClientRect().height / 2)), duration, onDone)
    }

    /**
     * Changes default settings for this scroller.
     *
     * @param {newDefaultDuration} Optionally a new value for default duration, used for each scroll method by default.
     *        Ignored if null or undefined.
     * @param {newEdgeOffset} Optionally a new value for the edge offset, used by each scroll method by default. Ignored if null or undefined.
     * @returns An object with the current values.
     */
    var setup = function (newDefaultDuration, newEdgeOffset) {
      if (newDefaultDuration === 0 || newDefaultDuration) {
        defaultDuration = newDefaultDuration
      }
      if (newEdgeOffset === 0 || newEdgeOffset) {
        edgeOffset = newEdgeOffset
      }
      return {
        defaultDuration: defaultDuration,
        edgeOffset: edgeOffset
      }
    }

    return {
      setup: setup,
      to: scrollToElem,
      toY: scrollToY,
      intoView: scrollIntoView,
      center: scrollToCenterOf,
      stop: stopScroll,
      moving: function () { return !!scrollTimeoutId },
      getY: container.getY,
      getTopOf: container.getTopOf
    }

  }


  var docElem = document.documentElement
  var getDocY = function () { return window.scrollY || docElem.scrollTop }

  // Create a scroller for the document:
  var zenscroll = makeScroller({
    body: document.scrollingElement || document.body,
    toY: function (y) { window.scrollTo(0, y) },
    getY: getDocY,
    getHeight: function () { return window.innerHeight || docElem.clientHeight },
    getTopOf: function (elem) { return elem.getBoundingClientRect().top + getDocY() - docElem.offsetTop }
  })


  /**
   * Creates a scroller from the provided container element (e.g., a DIV)
   *
   * @param {scrollContainer} The vertical position within the document.
   * @param {defaultDuration} Optionally a value for default duration, used for each scroll method by default.
   *        Ignored if 0 or null or undefined.
   * @param {edgeOffset} Optionally a value for the edge offset, used by each scroll method by default. 
   *        Ignored if null or undefined.
   * @returns A scroller object, similar to `zenscroll` but controlling the provided element.
   */
  zenscroll.createScroller = function (scrollContainer, defaultDuration, edgeOffset) {
    return makeScroller({
      body: scrollContainer,
      toY: function (y) { scrollContainer.scrollTop = y },
      getY: function () { return scrollContainer.scrollTop },
      getHeight: function () { return Math.min(scrollContainer.clientHeight, window.innerHeight || docElem.clientHeight) },
      getTopOf: function (elem) { return elem.offsetTop }
    }, defaultDuration, edgeOffset)
  }


  // Automatic link-smoothing on achors
  // Exclude IE8- or when native is enabled or Zenscroll auto- is disabled
  if ("addEventListener" in window && !window.noZensmooth && !isNativeSmoothScrollEnabledOn(document.body)) {

    var isHistorySupported = "history" in window && "pushState" in history
    var isScrollRestorationSupported = isHistorySupported && "scrollRestoration" in history

    // On first load & refresh make sure the browser restores the position first
    if (isScrollRestorationSupported) {
      history.scrollRestoration = "auto"
    }

    window.addEventListener("load", function () {

      if (isScrollRestorationSupported) {
        // Set it to manual
        setTimeout(function () { history.scrollRestoration = "manual" }, 9)
        window.addEventListener("popstate", function (event) {
          if (event.state && "zenscrollY" in event.state) {
            zenscroll.toY(event.state.zenscrollY)
          }
        }, false)
      }

      // Add edge offset on first load if necessary
      // This may not work on IE (or older computer?) as it requires more timeout, around 100 ms
      if (window.location.hash) {
        setTimeout(function () {
          // Adjustment is only needed if there is an edge offset:
          var edgeOffset = zenscroll.setup().edgeOffset
          if (edgeOffset) {
            var targetElem = document.getElementById(window.location.href.split("#")[1])
            if (targetElem) {
              var targetY = Math.max(0, zenscroll.getTopOf(targetElem) - edgeOffset)
              var diff = zenscroll.getY() - targetY
              // Only do the adjustment if the browser is very close to the element:
              if (0 <= diff && diff < 9) {
                window.scrollTo(0, targetY)
              }
            }
          }
        }, 9)
      }

    }, false)

    // Handling clicks on anchors
    var RE_noZensmooth = new RegExp("(^|\\s)noZensmooth(\\s|$)")
    window.addEventListener("click", function (event) {
      var anchor = event.target
      while (anchor && anchor.tagName !== "A") {
        anchor = anchor.parentNode
      }
      // Let the browser handle the click if it wasn't with the primary button, or with some modifier keys:
      if (!anchor || event.which !== 1 || event.shiftKey || event.metaKey || event.ctrlKey || event.altKey) {
        return
      }
      // Save the current scrolling position so it can be used for scroll restoration:
      if (isScrollRestorationSupported) {
        var historyState = history.state && typeof history.state === "object" ? history.state : {}
        historyState.zenscrollY = zenscroll.getY()
        try {
          history.replaceState(historyState, "")
        } catch (e) {
          // Avoid the Chrome Security exception on file protocol, e.g., file://index.html
        }
      }
      // Find the referenced ID:
      var href = anchor.getAttribute("href") || ""
      if (href.indexOf("#") === 0 && !RE_noZensmooth.test(anchor.className)) {
        var targetY = 0
        var targetElem = document.getElementById(href.substring(1))
        if (href !== "#") {
          if (!targetElem) {
            // Let the browser handle the click if the target ID is not found.
            return
          }
          targetY = zenscroll.getTopOf(targetElem)
        }
        event.preventDefault()
        // By default trigger the browser's `hashchange` event...
        var onDone = function () { window.location = href }
        // ...unless there is an edge offset specified
        var edgeOffset = zenscroll.setup().edgeOffset
        if (edgeOffset) {
          targetY = Math.max(0, targetY - edgeOffset)
          if (isHistorySupported) {
            onDone = function () { history.pushState({}, "", href) }
          }
        }
        zenscroll.toY(targetY, null, onDone)
      }
    }, false)

  }


  return zenscroll
}));
/* #endregion */


/* #region  Utils */
function createElem(tagName, options) {
  const { className, id, innerHTML, style, attributes, toAppend } = options
  const elem = document.createElement(tagName)
  if (className) elem.className = className;
  if (id) elem.id = id;
  if (innerHTML) elem.innerHTML = innerHTML;
  if (style) {
    for (const key in options.style) { elem.style[key] = options.style[key] }
  }
  if (attributes) {
    for (const key in options.attributes) { elem.setAttribute(key, options.attributes[key]) }
  }
  if (toAppend) {
    for (const child of toArray(toAppend)) { elem.appendChild(child) }
  }
  return elem
}
function removeClasses(target, ...classes) {
  for (const cls of classes) {
    target.classList.remove(cls)
  }
}

function addClasses(target, ...classes) {
  for (const cls of classes) {
    target.classList.add(cls)
  }
}

function formatAsCurrency(string) {
  string = typeof string === 'string' ? string : string.toString()
  const number = parseFloat(string.replace(/,/g, ''))
  const parts = number.toFixed(2).split('.')
  const digits = parts[0]
  const decimal = parts[1]
  const integer = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${integer}.${decimal}`
}

const getEvtDOM = (att) => {
  return $(`[data-evt="${att}"]`);
},
  getTransitionTime = (target) => {
    let el = target instanceof jQuery ? target[0] : target;
    return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
  },
  windowLessDesktop = () => {
    if ($(window).width() < 991) {
      return true;
    }
  };

const initTelInput = () => {
  let telInputArr = Array.from($('[data-input="tel"]'));

  for (var i = 0; i < telInputArr.length; i++) {
    iti = intlTelInput(telInputArr[i], {
      initialCountry: "auto",
      preferredCountries: ["us", "gb", "br", "cn", "es", "it"],
      autoPlaceholder: "aggressive",
      useFullscreenPopup: true,
      utilsScript:
        "/assets/public-2020/js/plugins/phone/utils.js",
      geoIpLookup: function (callback) {
        fetch("https://ipinfo.io/json", {
          cache: "reload",
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Failed: " + response.status);
          })
          .then((ipjson) => {
            callback(ipjson.country);
          })
          .catch((e) => {
            callback("us");
          });
      },
    });
  }
};


const getOrdinalTxt = (n) => {
  return n % 10 == 1 && n % 100 != 11 ? 'st' : n % 10 == 2 && n % 100 != 12 ? 'nd' : n % 10 == 3 && n % 100 != 13 ? 'rd' : 'th'
}

/* #region  Page Backdrop */
class Backdrop {
  constructor(settings = {}) {
    this.el = createElem('div', {
      className: 'page-backdrop',
    })
    this.callback = settings.callback || null
    this.zIndex = settings.zIndex || undefined
    this.background = settings.background || undefined
    this.half = settings.half || false
    this.show()
    this.el.addEventListener('click', (e) => {
      if (e.target === this.el) {
        this.hide()
      }
    })
  }

  show() {
    document.body.appendChild(this.el)
    if (this.zIndex) {
      this.el.style.zIndex = this.zIndex
    }
    if (this.half) {
      this.el.classList.add(__HALF)
    }
    this.el.style.display = 'block'
    setTimeout(() => {
      this.el.style.opacity = '1'
    }, 1);
  }

  hide() {
    this.el.style.opacity = '0'
    setTimeout(() => {
      this.el.style.display = 'none'
      this.el.remove()
    }, getTransitionTime(this.el));

    if (this.callback) {
      this.callback()
    }
  }
}
/* #endregion */

class PageConfetti {
  constructor() {
    this.el = null
    this.containerEl = null
    this.confettiFrequency = 3
    this.confettiInterval = 50
    this.timeToDestroy = 8000
    this.confettiColors = ['#0095c6', '#1ab8ec', '#8cdffa', '#d8f3fc']
    this.confettiAnimations = ['slow', 'medium', 'fast']
  }

  createHolder() {
    this.el = createElem('div', {
      className: 'confetti-holder'
    })
    document.body.appendChild(this.el)
  }

  setup() {
    const containerEl = createElem('div', {
      className: 'confetti-container'
    })
    this.el.appendChild(containerEl)
    this.containerEl = containerEl
  }

  render() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div')
      const confettiSize = Math.floor(Math.random() * 3) + 7 + 'px'
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)]
      const confettiLeft = Math.floor(Math.random() * this.el.offsetWidth) + 'px'
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)]

      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation)
      confettiEl.style.left = confettiLeft
      confettiEl.style.width = confettiSize
      confettiEl.style.height = confettiSize
      confettiEl.style.backgroundColor = confettiBackground

      confettiEl.removeTimeout = setTimeout(function () {
        confettiEl.parentNode.removeChild(confettiEl)
      }, 3000)

      this.containerEl.appendChild(confettiEl)
    }, this.confettiInterval)
  }

  destroy() {
    const el = this.el
    if (el) {
      el.style.opacity = '0'
      setTimeout(() => {
        document.body.removeChild(el)
      }, getTransitionTime(el));
    }
  }

  push(infinity = false) {
    this.createHolder()
    this.setup()
    this.render()
    if (!infinity) {
      setTimeout(() => {
        this.destroy()
      }, this.timeToDestroy);
    }
  }
}

/**
 * Lock Screen / PIN Screen
 */
class LockPin {
  constructor(settings = {}) {
    this.code = settings.code || 1234
    this.maxLength = this.code.toString().length
    this.unlockTime = settings.unlockTime || 600
    this.currentPin = []
    this.isLocked = false
  }

  /**
   * Utils
   */
  renderHTML() {
    let html = `
    <div class="pin-lock">
	<div class="pin-lock__wrapper">
		<div class="pin-lock__holder">
			<div class="pin-lock__title-group">
				<h3>Enter PIN Code</h3>
				<span>This page is locked with pin.</span>
			</div>
			<div data-pin-output class="pin-lock__output">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<div class="pin-lock__btn-grid">
				<button>1</button>
				<button>2</button>
				<button>3</button>
				<button>4</button>
				<button>5</button>
				<button>6</button>
				<button>7</button>
				<button>8</button>
				<button>9</button>
				<button data-pin-evt="clear">Clear</button>
				<button>0</button>
				<button data-pin-evt="submit">Enter</button>
			</div>
		</div>
	</div>
</div>
    `
    return html
  }
  appendScreen() {
    document.body.insertAdjacentHTML('beforeend', this.renderHTML())
  }
  setElements() {
    this.holder = document.querySelector('.pin-lock')
    this.btnArr = [...this.holder.querySelectorAll('button')]
    this.output = this.holder.querySelector('[data-pin-output]')
    this.outputSpanArr = [...this.output.querySelectorAll('span')]
    this.evtClear = this.holder.querySelector('[data-pin-evt="clear"]')
    this.evtSubmit = this.holder.querySelector('[data-pin-evt="submit"]')
    this.btnArrFiltered = this.btnArr.filter((btn) => {
      if (!btn.dataset.pinEvt) { return btn }
    })
  }

  /**
   * Methods
   */
  unlock() {
    unlockScroll()
    this.output.classList.remove(__FALSE)
    this.output.classList.add(__TRUE)
    setTimeout(() => {
      this.holder.classList.add(__FADE)
      setTimeout(() => {
        this.destroy()
      }, getTransitionTime(this.holder));
    }, this.unlockTime);
  }
  reset() {
    this.currentPin = []
    this.update()
    this.isLocked = false
    removeClasses(this.output, __FALSE, __TRUE)
  }
  update() {
    const pin = this.currentPin
    const length = pin.length
    if (length == 0) {
      this.outputSpanArr.forEach((span) => {
        span.innerHTML = ''
      })
    } else if ((length - 1) < this.maxLength) {
      this.outputSpanArr.forEach((span, i) => {
        if (i < length) {
          span.innerHTML = pin[i]
        } else {
          span.innerHTML = ''
        }
      })
    }
    if (length === this.maxLength) {
      this.submit()
    }
  }
  submit() {
    if (this.currentPin.length > 0) {
      this.isLocked = true
      if (this.currentPin.join('') == this.code) {
        this.unlock()
      } else {
        this.output.classList.add(__FALSE)
        setTimeout(() => {
          this.reset()
        }, 700);
      }
    }
  }
  destroy() {
    this.holder.remove()
  }

  /**
   * Attach Events
   */
  attachButtonClick() {
    for (const btn of this.btnArrFiltered) {
      btn.addEventListener('click', (e) => {
        if (!this.isLocked) {
          const num = Number(e.target.innerHTML)
          this.currentPin.push(num)
          this.update()
        }
      })
    }
    this.evtClear.addEventListener('click', () => {
      if (!this.isLocked) {
        this.reset()
      }
    })
    this.evtSubmit.addEventListener('click', () => {
      if (!this.isLocked) {
        this.submit()
      }
    })
  }
  attachDocEvents() {
    document.addEventListener('keydown', (e) => {
      if (this.holder) {
        if (!this.isLocked) {
          e.preventDefault()
          const key = e.key
          if (key === 'Backspace') {
            if (this.currentPin.length > 0) {
              this.currentPin.pop()
              this.update()
            }
          } else if (key === 'Enter') {
            this.submit()
          } else if (key === 'Escape') {
            this.reset()
          } else if (key >= 0 && key <= 9) {
            for (const btn of this.btnArrFiltered) {
              if (btn.innerHTML === key && this.currentPin.length < this.maxLength) {
                btn.click()
                break
              }
            }
          }
        }
      }
    })
  }

  push() {
    lockScroll()
    this.appendScreen()
    this.setElements()
    this.attachButtonClick()
    this.attachDocEvents()
  }
}

/* #endregion */

/* #region  Page Ask Modal */
class AskModal {
  constructor(settings = {}) {
    this.heading = settings.heading || 'Are You Sure You Want To Exit?'
    this.subheading = settings.subheading || 'You will lose all unsaved progress.'
    this.exitText = settings.exitText || 'Exit'
    this.keepText = settings.keepText || 'Keep'
    this.exitCallback = settings.exitCallback
    this.keepCallback = this.destroy
  }

  get renderHTML() {
    return `
      <div data-evt="closeAskModal"></div>
      <div>
        <h4>${this.heading}</h4>
        <p>${this.subheading}</p>
        <div>
          <button>${this.exitText}</button>
          <button>${this.keepText}</button>
        </div>
      </div>
    `
  }

  create() {
    const modal = createElem('div', {
      className: 'ask-modal',
      innerHTML: this.renderHTML
    })
    const buttons = [...modal.querySelectorAll('button')]
    const closeEvt = [...modal.querySelectorAll('[data-evt="closeAskModal"]')]
    buttons[0].onclick = () => { this.destroy(); this.exitCallback() }
    buttons[1].onclick = () => { this.keepCallback() }
    for (const evt of closeEvt) {
      evt.onclick = () => { this.destroy() }
    }
    return modal
  }

  destroy() {
    unlockScroll()
    const modal = document.querySelector('.ask-modal')
    if (modal) {
      modal.remove()
    }
  }

  show() {
    lockScroll()
    const elem = this.create()
    document.body.appendChild(elem)
  }
}
/* #endregion */

/* #region  Custom Upload */
function initCustomUploads() {
  this.arr = [...document.querySelectorAll('[data-custom-upload]')]

  const renderOutputFile = (file, imgSrc = '') => {
    let imgElem = imgSrc ? `<div class="--filled" style="background-image: url(${imgSrc})"></div>` : `<div></div>`
    return `
    <div class="custom-upload__file">
      <div>
        ${imgElem}
        <span data-custom-name>${file.name}</span>
      </div>
      <div>
        <div data-evt="custom_upload_remove" class="--remove"></div>
      </div>
    </div>
    `
  }
  const bindBoxEvents = (box, input) => {
    box.ondragover = (e) => {
      e.preventDefault(); box.classList.add(__ACTIVE)
    }
    box.ondragleave = (e) => {
      e.preventDefault(); box.classList.remove(__ACTIVE)
    }
    box.addEventListener('drop', (e) => {
      e.preventDefault()
      box.classList.remove(__ACTIVE)
      const files = e.dataTransfer.files
      const newDataTransfer = new DataTransfer()

      for (const file of files) {
        newDataTransfer.items.add(file)
      }
      input.files = newDataTransfer.files
      input.dispatchEvent(new Event('change', { 'bubbles': true }))
    })
    box.addEventListener('click', (e) => {
      input.click()
    })
  }
  const setIndexes = (upload) => {
    const files = [...upload.querySelectorAll('.custom-upload__file')]
    for (let i = 0; i < files.length; i++) {
      files[i].dataset.customIndex = i
    }
  }
  const processFiles = (files, upload) => {
    const output = upload.querySelector('.custom-upload__files')
    const currentFiles = [...upload.querySelectorAll('.custom-upload__file')]

    for (const file of currentFiles) {
      file.remove()
    }

    for (const file of files) {
      const fileIsImage = file.type.match('image.*')
      if (fileIsImage) {
        let reader = new FileReader()
        reader.onload = (e) => {
          output.insertAdjacentHTML('beforeend', renderOutputFile(file, e.target.result))
        }
        reader.readAsDataURL(file)
      } else {
        output.insertAdjacentHTML('beforeend', renderOutputFile(file))
      }
    }
    setIndexes(upload)
  }

  for (const upload of this.arr) {
    const box = upload.querySelector('.custom-upload__box')
    const input = upload.querySelector('input')

    if (box) {
      bindBoxEvents(box, input)
    }

    input.addEventListener('change', (e) => {
      const files = e.target.files
      processFiles(files, upload)
    })
  }

  document.addEventListener('click', (e) => {
    const target = e.target
    if (e.target.closest('[data-evt="custom_upload_remove"]')) {
      const upload = target.closest('[data-custom-upload]')
      if (!upload) throw new Error('data-custom-upload not found')
      const input = upload.querySelector('input[type="file"]')
      if (!input) throw new Error('input[type="file"] not found')
      const nameEl = e.target.closest('.custom-upload__file').querySelector('*[data-custom-name]')
      if (!nameEl) throw new Error('data-custom-name not found')

      const name = nameEl.innerHTML
      const newDataTransfer = new DataTransfer()
      const { files } = input

      for (let i = 0; i < files.length; i++) {
        if (files[i].name !== name) {
          newDataTransfer.items.add(files[i])
        }
      }

      if (newDataTransfer.items.length === 0) {
        input.value = ''
      } else {
        input.files = newDataTransfer.files
      }

      input.dispatchEvent(new Event('change', { 'bubbles': true }))
    }
  })
}

document.addEventListener('DOMContentLoaded', () => {
  initCustomUploads()
})
/* #endregion */


/* #region  Ripple Click Effect */
class rippleClickEffect {
  constructor(el, event) {
    this._el = el;
    this._event = event;
    this.extend = {
      rippleClass: "eff_ripple-circle",
      animateClass: "ripple-circle_animated",
    };
  }
  push() {
    if (this._el.css("position") !== "relative") {
      Object.assign(this._el[0].style, { position: "relative" });
    }
    if (this._el.css("overflow") !== "hidden") {
      Object.assign(this._el[0].style, { overflow: "hidden" });
    }
    if (this._el.find(`.${this.extend.rippleClass}`).length == 0) {
      this._el.prepend($(`<span class="${this.extend.rippleClass}"></span>`));
    }
    let circle = this._el.find(`.${this.extend.rippleClass}`);
    circle.removeClass(`${this.extend.animateClass}`);
    if (!circle.height() && !circle.width()) {
      let d = Math.max(this._el.outerWidth(), this._el.outerHeight());
      circle.css({ height: d, width: d });
    }
    let x = this._event.pageX - this._el.offset().left - circle.width() / 2,
      y = this._event.pageY - this._el.offset().top - circle.height() / 2;
    circle
      .css({ top: y + "px", left: x + "px" })
      .addClass(this.extend.animateClass);
  }
}
let rippleTriggerArr = [
  ...$(
    ".product-option__head, .option-btn, .home-welcome__link, .sign-modal__main-btn, .item-protect__plans button, .listing-btn"
  ),
];
$.each(rippleTriggerArr, function (i) {
  rippleTriggerArr[i].onclick = (e) => {
    const $thisRipple = new rippleClickEffect($(this), e);
    $thisRipple.push();
  };
});
/* #endregion */


/* #region  Lock & Unlock scroll // body scroll // overflow scroll */
function lockScroll() {
  setTimeout(function () {
    if (!document.body.hasAttribute("ib-scroll-lock")) {
      let o = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute("ib-scroll-lock", o),
        (document.body.style.overflow = "hidden"),
        (document.body.style.position = "fixed"),
        (document.body.style.top = "-" + o + "px"),
        (document.body.style.left = "0"),
        (document.body.style.width = "100%");
    }
  }, 1);
}

function unlockScroll() {
  if (document.body.hasAttribute("ib-scroll-lock")) {
    let o = document.body.getAttribute("ib-scroll-lock");
    document.body.removeAttribute("ib-scroll-lock"),
      (document.body.style.overflow = ""),
      (document.body.style.position = ""),
      (document.body.style.top = ""),
      (document.body.style.left = ""),
      (document.body.style.width = ""),
      window.scroll(0, o);
  }
}
/* #endregion */


/* #region  Backdrop Class */
let contentBackdropTimer;
class contentBackdrop {
  constructor(parent = $body) {
    this._parent = parent;
    this.settings = { class: "ib-backdrop" };
  }
  show() {
    let el = $("<div>", { class: this.settings.class });
    el.on("mouseenter", function () {
      new contentBackdrop().hide(
        header.searchBlock.removeClass(IS_VISIBLE),
        unlockScroll()
      );
    });
    if (!this.elExist()) {
      this._parent.append(el);
      el.show();
      setTimeout(() => {
        Object.assign(el[0].style, { opacity: 1 });
      }, 1);
    } else {
      window.clearTimeout(contentBackdropTimer);
      let el = this._parent.find(`.${this.settings.class}`);
      Object.assign(el[0].style, { opacity: 1 });
    }
  }
  hide() {
    let el = this._parent.find(`.${this.settings.class}`);
    if (this.elExist()) {
      Object.assign(el[0].style, { opacity: 0 });
      contentBackdropTimer = window.setTimeout(function () {
        el.remove();
      }, parseFloat(window.getComputedStyle(el[0]).transitionDuration) * 1000 +
      1);
    }
  }
  elExist() {
    let el = this._parent.find(`.${this.settings.class}`);
    if (el.length !== 0) {
      return true;
    } else {
      return false;
    }
  }
  getEl() {
    let el = this._parent.find(`.${this.settings.class}`);
    return $(el);
  }
}
/* #endregion */


/* #region  Results Filters */
const setPageFilters = () => {
  const filters = Array.from(document.querySelectorAll('.page-filter-box')).reduce((acc, box) => {
    if (box.querySelector('.page-filter-drop') !== null && box.querySelector('.page-filter-btn') !== null) { acc.push(box) }
    return acc
  }, [])

  if (filters.length !== 0) {
    window.pageFilters = {}
    window.filterModal = {}

    filterModal = {
      el: document.querySelector('.filter-modal'),
      backdrop: document.querySelector('.filter-modal__backdrop'),
      container: document.querySelector('.filter-modal__container'),
      title: document.querySelector('.filter-modal-title'),
      content: document.querySelector('.filter-modal__content'),
      evtClose: document.querySelectorAll('[data-filter-evt="close"]'),
      open: function () {
        lockScroll()
        if (this.el !== undefined) {
          this.el.style.display = 'block'
          setTimeout(() => {
            this.backdrop.style.opacity = 1
            this.container.classList.add(IS_VISIBLE)
          }, 1);
        }
      },
      close: function () {
        unlockScroll()
        if (this.el !== undefined) {
          this.backdrop.style.opacity = 0
          this.container.classList.remove(IS_VISIBLE)
          setTimeout(() => {
            this.el.style.display = 'none'
          }, getTransitionTime(this.backdrop));
        }
      },
      isHidden: function () {
        return window.getComputedStyle(this.el).getPropertyValue('display') == 'none'
      },
      bindEvents: function () {
        this.evtClose.forEach((el) => {
          el.onclick = () => {
            const labels = [...filterModal.content.querySelectorAll('label')]
            const links = [...filterModal.content.querySelectorAll('a')]
            const emptyBox = document.querySelector('.page-filter-drop.is-empty')
            filterModal.close()
            setTimeout(() => {
              if (emptyBox !== null) {
                const toMove = links.length !== 0 ? links : labels
                toMove.forEach((node) => { emptyBox.querySelector('div').appendChild(node) })
                emptyBox.classList.remove(IS_EMPTY)
                $('.filter-modal__content').empty()
              }
            }, getTransitionTime(filterModal.container));
          }
        })
      },
      appendLabels: function (nodes) {
        this.content.appendChild(nodes)
      }
    }
    filterModal.bindEvents()


    filters.forEach((filter, i) => {
      const drop = filter.querySelector('.page-filter-drop')
      const trigger = filter.querySelector('.page-filter-btn')
      const labels = [...drop.querySelectorAll('label')]
      const buttons = [...drop.querySelectorAll('label > div')]
      const inputs = [...drop.querySelectorAll('input')]
      const links = [...drop.querySelectorAll('a')]

      pageFilters[i] = {
        drop: drop,
        trigger: trigger,
        labels: labels,
        buttons: buttons,
        inputs: inputs,
        links: links
      }
      pageFilters[i].drop.show = function () {
        this.style.display = 'block'
        setTimeout(() => {
          this.style.opacity = 1
          this.style.transform = 'translateY(0px)'
        }, 1);
      }
      pageFilters[i].drop.hide = function () {
        this.style.opacity = 0
        this.style.transform = 'translateY(10px)'
        setTimeout(() => {
          this.style.display = 'none'
        }, getTransitionTime(this));
      }
      pageFilters[i].drop.isHidden = function () {
        return window.getComputedStyle(this).getPropertyValue('display') == 'none'
      }
    })

    pageFilters.observeCheckState = function () {
      for (const key in this) {
        const obj = this[key]
        if (typeof obj !== 'function') {
          if (obj.inputs.some(input => input.checked)) {
            obj.trigger.classList.add(IS_ACTIVE)
          } else {
            obj.trigger.classList.remove(IS_ACTIVE)
          }
        }
      }
    }
    pageFilters.attachInputOnChange = function () {
      for (const key in this) {
        const obj = this[key]
        if (typeof obj !== 'function') {
          obj.inputs.forEach((input) => {
            input.onchange = () => {
              pageFilters.observeCheckState()
            }
          })
        }
      }
    }
    pageFilters.atLeastOneVisible = function () {
      for (const key in this) {
        if (typeof this[key] !== 'function') {
          if (!this[key].drop.isHidden()) return true
        }
      }
    }
    pageFilters.showAll = function () {
      for (const key in this) {
        const obj = this[key]
        if (typeof obj !== 'function') {
          obj.drop.show()
        }
      }
    }
    pageFilters.hideAll = function (node) {
      for (const key in this) {
        const obj = this[key]
        if (typeof obj !== 'function') {
          if (node !== null && node !== undefined) {
            if (!obj.drop.isSameNode(node)) { obj.drop.hide() }
          } else {
            obj.drop.hide()
          }
        }
      }
    }
    pageFilters.attachTriggerClick = function () {
      for (const key in this) {
        const obj = this[key]
        if (typeof obj !== 'function') {
          obj.trigger.onclick = () => {
            if (window.innerWidth > 991) {
              if (obj.drop.isHidden()) {
                pageFilters.hideAll(obj.drop)
                obj.drop.show()
                const isIntersecting = obj.drop.getBoundingClientRect().right > window.innerWidth
                if (isIntersecting) obj.drop.style.right = 0
              } else {
                obj.drop.hide()
              }
            } else {
              const title = obj.trigger.querySelector('span').innerHTML
              filterModal.open()
              filterModal.title.innerHTML = title
              obj.drop.classList.add(IS_EMPTY)
              const toMove = obj.links.length !== 0 ? obj.links : obj.labels
              toMove.forEach((node) => { filterModal.appendLabels(node) })
            }
          }
        }
      }
    }
    pageFilters.attachWindowEvents = function () {
      document.addEventListener('click', function (event) {
        const target = event.target
        if (!target.closest('.page-filter-box') && pageFilters.atLeastOneVisible()) {
          pageFilters.hideAll()
        }
      })
      window.addEventListener('scroll', function () {
        if (pageFilters.atLeastOneVisible()) {
          pageFilters.hideAll()
        }
      })
    }
    pageFilters.init = function () {
      pageFilters.observeCheckState()
      pageFilters.attachInputOnChange()
      pageFilters.attachTriggerClick()
      pageFilters.attachWindowEvents()
    }

    try {
      pageFilters.init()
    } catch (err) {
      console.log(err.message)
    }
  }
}
/* #endregion Results Filters */


/* #region  Header JS */
const header = {
  init: function () {
    this.renderDOM();
    this.bindEvents();
    this.setDropdowns()
  },
  renderDOM: function () {
    // Login Dropdown
    this.loginBtn = $('[data-evt="toggleAccountDropdown"]');
    this.loginDropdown = $(".login-dropdown");

    // Search
    this.searchBtn = $('[data-evt="toggleSearch"]');
    this.searchBlock = $(".header-search");

    this.loginLink = $('.login-nav__link')
  },
  bindEvents: function () {
    this.loginBtn.on('mouseover mouseleave', function (evt) {
      let dd = header.loginDropdown
      if (dd.length) {
        switch (evt.type) {
          case 'mouseover':
            dd.css({ display: 'block', opacity: 1 })
            break;
          case 'mouseleave':
            dd.css({ display: 'none', opacity: 0 })
            break;
        }
      }
    })
    this.loginLink.click(function (e) {
      e.stopPropagation()
    })
    this.searchBtn.click(() => {
      const overlay = new contentBackdrop();
      let el = header.searchBlock;

      if (el.hasClass(IS_VISIBLE)) {
        el.removeClass(IS_VISIBLE);
        unlockScroll();
        overlay.hide();
      } else {
        lockScroll();
        overlay.show();
        el.addClass(IS_VISIBLE);
        el.find("input").focus();
      }
    });
  },
  setDropdowns: function (...args) {
    args = Array.from(document.querySelectorAll('.header__sub-link'))

    if (args.length !== 0 && args) {

      const dd = document.querySelector('.nav-drop')
      const cont = [...document.querySelectorAll('.nav-drop__content')]
      const subLink = [...document.querySelectorAll('.nav-drop_more')]
      const IS_ACTIVE = 'is-active'

      let hideDelayTime, showDelayTime

      if (dd && cont && subLink) {
        const pos = (el) => {
          return {
            top: el.getBoundingClientRect().top + el.offsetHeight,
            left: el.getBoundingClientRect().left + (el.offsetWidth / 2) - (dd.offsetWidth / 2)
          }
        }

        const fn = {
          initial: () => {
            dd.style.top = `${pos(args[0]).top}px`
            dd.style.left = `${pos(args[0]).left}px`
          },
          hide: () => {
            dd.style.opacity = 0
            dd.style.display = 'none'
            args.forEach(el => el.classList.remove(IS_ACTIVE))
          },
          show: (el) => {
            args.forEach(el => el.classList.remove(IS_ACTIVE))
            el.classList.add(IS_ACTIVE)
            dd.style.display = 'block'
            dd.style.top = `${pos(el).top}px`
            dd.style.left = `${pos(el).left}px`
            dd.style.opacity = 1
          },
          switchContent: (attr) => {
            cont.forEach(el => el.style.display = 'none')
            cont.filter(el => el.id == `dd_${attr}`).forEach(el => el.style.display = 'block')
          }
        }

        const { initial: setInitial, hide: hide, show: show, switchContent: switchContent } = fn

        for (let i = 0; i < subLink.length; i++) {
          const el = subLink[i],
            content = el.querySelector('.nav-drop__sub')
          el.onmouseover = () => { content.style.display = 'block' }
          el.onmouseleave = () => { content.style.display = 'none' }
        }

        dd.onmouseover = (e) => {
          if (hideDelayTime) window.clearTimeout(hideDelayTime)
        }

        dd.onmouseleave = (e) => {
          window.clearTimeout(showDelayTime)
          hideDelayTime = window.setTimeout(() => {
            hide()
          }, 150);
        }


        args.forEach((el) => {
          el.onmouseover = (e) => {
            const attr = el.dataset.dropdown
            if (attr) {
              window.clearTimeout(hideDelayTime)
              showDelayTime = window.setTimeout(() => {
                switchContent(attr)
                show(el)
              }, 200);
            }
          }

          el.onmouseleave = (e) => {
            window.clearTimeout(showDelayTime)
            hideDelayTime = window.setTimeout(() => {
              hide()
            }, 150);
          }
        })

        window.onscroll = () => {
          window.clearTimeout(showDelayTime)
          hide(); setInitial()
        }

        setInitial()
      }
    }
  }
};
/* #endregion */


const pgFilter = {
  init: function () {
    this.setFiltersStickyPos()
  },
  setFiltersStickyPos: function () {
    const pageFilters = document.querySelector('.page-filters'),
      header = document.querySelector('.header')

    if (pageFilters !== null && header !== null) {
      function adjust() {
        let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue('height'))
        pageFilters.style.top = `${headerHeight}px`
      }
      adjust()
      window.addEventListener('resize', () => {
        adjust()
      })
    }
  }
}


/* #region  Menu */
const menu = {
  isOpened: true,
  init: function () {
    const el = document.querySelector('.menu2')
    if (el) {
      this.renderDOM()
      this.close()
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.el = document.querySelector('.menu2')
    this.toggleArr = [...document.querySelectorAll('[data-evt="toggleMenu"]')]
    this.toggleDropdownArr = [...this.el.querySelectorAll('[data-menu-evt="toggleDropdown"]')]
    this.wrapper = this.el.querySelector('.menu2__wrapper')
  },
  bindEvents: function () {
    for (const el of this.toggleArr) {
      el.addEventListener('click', this.toggle)
    }

    for (const el of this.toggleDropdownArr) {
      el.addEventListener('click', this.toggleDropdown)
    }
  },
  toggle: function () {
    const isVisible = window.getComputedStyle(menu.el).getPropertyValue('display') !== 'none'
    if (isVisible) {
      menu.close()
    } else {
      menu.open()
    }
  },
  toggleDropdown(e) {
    const item = e.target.parentNode.closest('.menu2__nav-item')
    const dropdown = e.target.parentNode.querySelector('[data-menu-dropdown]')
    if (item && dropdown) {
      const adjustEl = dropdown.querySelector('.menu2__dropdown-adjust')
      if (!adjustEl) throw new Error('menu__dropdown-adjust element not found')

      const height = dropdown.offsetHeight
      if (height !== 0) {
        dropdown.style.height = `${height}px`
        setTimeout(() => {
          item.classList.remove(__ACTIVE)
          dropdown.style.height = '0px'
          adjustEl.style.opacity = 0
          adjustEl.style.transform = 'translateY(-32px)'
        }, 5);
      } else {
        item.classList.add(__ACTIVE)
        const scrollHeight = adjustEl.scrollHeight
        dropdown.style.height = `${scrollHeight}px`
        adjustEl.style.opacity = 1
        adjustEl.style.transform = 'translateY(0px)'
      }
    }
  },
  close: function () {
    unlockScroll()
    this.el.style.transform = 'scale(1.1)'
    this.el.style.opacity = 0
    setTimeout(() => {
      this.el.style.display = 'none'
      this.isOpened = false
    }, getTransitionTime(this.el));
  },
  open: function () {
    lockScroll()
    this.el.style.display = 'block'
    this.resetScroll()
    setTimeout(() => {
      this.el.style.transform = 'scale(1)'
      this.el.style.opacity = 1
      this.isOpened = true
    }, 5);
  },
  resetScroll: function () {
    if (this.wrapper) {
      this.wrapper.scrollTop = 0
    }
  }
}
/* #endregion */


/* #region  Cart Modal */
const cartModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindToggle();
  },
  renderDOM: function () {
    this._ = $(".cart-modal");
    this.backdrop = this._.find(".cart-modal__backdrop");
    this.container = this._.find(".cart-modal__container");
    this.evtToggle = getEvtDOM("toggleCart");
  },
  bindToggle: function () {
    $(document).on('click', '[data-evt="toggleCart"]', function () {
      let el = $(".cart-modal")
      if (el.exists()) {
        let container = $(".cart-modal__container"),
          backdrop = $(".cart-modal__backdrop")
        if (el.isVisible()) {
          unlockScroll();
          Object.assign(backdrop[0].style, { opacity: 0 });
          Object.assign(container[0].style, { transform: "translateX(100%)" });
          setTimeout(() => {
            el.hide();
          }, getTransitionTime(container));
        } else {
          lockScroll();
          el.show();
          setTimeout(() => {
            Object.assign(backdrop[0].style, { opacity: 1 });
            Object.assign(container[0].style, { transform: "translateX(0%)" });
          }, 1);
        }
      }
    })
  },
  toggle: function () {
    let el = cartModal._;
    if (el.exists()) {
      if (el.isVisible()) {
        cartModal.close();
      } else {
        cartModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._.show();
    setTimeout(() => {
      Object.assign(this.backdrop[0].style, { opacity: 1 });
      Object.assign(this.container[0].style, { transform: "translateX(0%)" });
    }, 1);
  },
  close: function () {
    unlockScroll();
    Object.assign(this.backdrop[0].style, { opacity: 0 });
    Object.assign(this.container[0].style, { transform: "translateX(100%)" });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(cartModal.container));
  },
});
/* #endregion */


/* #region  Currency Modal */
const currencyModal = new Object({
  init: function () {
    this.renderDOM();
    this.bindEvents();
  },
  renderDOM: function () {
    this._ = $(".cur-modal");
    this.backdrop = this._.find(".cur-modal__backdrop");
    this.container = this._.find(".cur-modal__container");
    this.evtToggle = getEvtDOM("toggleCurrency");
    this.input = this._.find("input");
  },
  bindEvents: function () {
    if (currencyModal.evtToggle.exists()) {
      $.each(currencyModal.evtToggle, (i) => {
        currencyModal.evtToggle[i].onclick = () => {
          currencyModal.toggle();
        };
      });
    }

    if (currencyModal.input.exists()) {
      currencyModal.input.on("keyup", function () {
        currencyModal.intraSearch($(this));
      });
    }
  },
  toggle: function () {
    this.input.val("").trigger("keyup");
    let modal = currencyModal._;
    if (modal.exists()) {
      if (modal.isVisible()) {
        currencyModal.close();
      } else {
        currencyModal.open();
      }
    }
  },
  open: function () {
    lockScroll();
    this._.show();
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 });
      this.container.css({ transform: "translateX(0%)" });
    }, 1);
  },
  close: function () {
    unlockScroll();
    this.backdrop.css({ opacity: 0 });
    this.container.css({ transform: "translateX(100%)" });
    setTimeout(() => {
      this._.hide();
    }, getTransitionTime(currencyModal.backdrop));
  },
  intraSearch: function (input) {
    let val = input.val().toLowerCase(),
      arr = [...$(".cur-item")];
    $.each(arr, function (index) {
      let txt = $(arr[index]).find(".cur-item__name").text().toLowerCase();
      if (~txt.indexOf(val)) {
        $(arr[index]).show();
      } else {
        $(arr[index]).hide();
      }
    });
  },
});
/* #endregion */


/* #region  Page Banner */
const pageBanner = new Object({
  init: function () {
    const banner = $(".page-banner");
    let bannerText = $(".page-banner-text"),
      movingEl = $(".banner-move");
    movingEl.addClass(`banner-move-${bannerText.length}`);

    let closeBtn = $(".page-banner-close");
    closeBtn.click(function () {
      let height = banner[0].scrollHeight;
      banner.css({ "margin-top": `-${height}px` });
      setTimeout(() => {
        banner.remove();
      }, getTransitionTime(banner));
    });
  },
});
/* #endregion */


/* #region  Footer */
const footer = new Object({
  init: function () {
    function attach() {
      if (windowLessDesktop()) {
        let footerHeader = Array.from($(".footer-col__header"));

        $.each(footerHeader, function (i) {
          let col = $(footerHeader[i]).closest(".footer-col"),
            body = col.find(".footer-col__body");

          if (body.length && col.length) {
            footerHeader[i].onclick = () => {
              if (body.height() == 0) {
                let scrH = body.find(".footer-col__body-scroll")[0]
                  .scrollHeight;
                body.css({
                  height: `${scrH}px`,
                });
              } else {
                let h = body.css("height");
                body.css("height", h);
                setTimeout(() => {
                  body.css({
                    height: "0px",
                  });
                }, 1);
              }
            };
          }
        });
      }
    }

    $(window).on("load resize", function () {
      attach();
    });
  },
});
/* #endregion */


/* #region  Homepage SPLIDE */
const homepageCategoriesSlider = new Object({
  init: function () {
    const el = document.querySelector('.home-categories-splide')
    if (el && el !== null) {
      let slider = new Splide(el, {
        type: "loop",
        perPage: 4,
        perMove: 2,
        autoplay: 0,
        gap: "6px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1680: { perPage: 5, },
          1120: { perPage: 4, },
          767: { perPage: 3, perMove: 2 },
          600: { perPage: 2, gap: 6, pagination: 1 }
        }
      })
      slider.mount()
    }
  }
})

const homePageSplide = new Object({
  init: function () {
    const homeSplideArr = Array.from(
      document.getElementsByClassName("home-splide")
    );

    $.each(homeSplideArr, function (i) {
      const el = homeSplideArr[i];
      let main = new Splide(el, {
        type: "loop",
        perPage: 5,
        perMove: 1,
        autoplay: 0,
        gap: "8px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1680: {
            perPage: 5,
            perMove: 1,
          },
          1120: {
            perPage: 5,
            perMove: 1,
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "10px", col: "10px" },
            },
          },
          478: {
            grid: {
              rows: 2,
              cols: 2,
              gap: { row: "8px", col: "8px" },
            },
          },
        },
      }).mount(window.splide.Extensions);
    });
  },
});
/* #endregion */


/* #region  PG Data / Guide Modal Data / PGM Data */
const pgSelect = {
  initalized: undefined,
  init: function () {
    this.renderDOM();
    this.initalized = true;
  },
  getAttrDOM: function (att) {
    return $(`[data-pg-set="${att}"]`);
  },
  renderDOM: function () {
    // Shape
    this.shapeImg = this.getAttrDOM("shapeImg");
    this.shapeTitle = this.getAttrDOM("shapeTitle");
    this.shapeDescription = this.getAttrDOM("shapeDescription");

    // Color
    this.colorImg = this.getAttrDOM("colorImg");
    this.colorTitle = this.getAttrDOM("colorTitle");
    this.colorDescription = this.getAttrDOM("colorDescription");

    // Clarity
    this.clarityImg = this.getAttrDOM("clarityImg");
    this.clartyTitle = this.getAttrDOM("clarityTitle");
    this.clarityDescription = this.getAttrDOM("clarityDescription");

    // Ring Size
    this.currentSize = this.getAttrDOM("currentSize");
    this.circSize = this.getAttrDOM("circSize");
    this.dSize = this.getAttrDOM("dSize");
    this.euSize = this.getAttrDOM("euSize");
    this.ukSize = this.getAttrDOM("ukSize");
  },
  attachControls: function (sArr, sBtn) {
    if (!this.initalized) {
      pgSelect.init();
    }
    let selectArr = sArr,
      selectBtn = sBtn;
    for (let i = 0; i < selectArr.length; i++) {
      let thisAttr = selectArr[i].getAttribute("data-pg-select"),
        btnArr = Array.from($(selectArr[i]).find(selectBtn));

      function setPgSelectEvent() {
        let dataSet;
        switch (thisAttr) {
          case "shape":
            dataSet = pgSelect.shape;
            break;
          case "color":
            dataSet = pgSelect.color;
            break;
          case "clarity":
            dataSet = pgSelect.clarity;
            break;
          case "ring-size":
            dataSet = pgSelect.ringSize;
            break;
        }
        return { dataSet };
      }

      $.each(btnArr, function (i) {
        btnArr[i].onclick = () => {
          setPgSelectEvent().dataSet.changeDetails(i);
          $.each(btnArr, function (i) {
            btnArr[i].classList.remove("is-active");
          });
          $(this).addClass("is-active");
        };
      });
    }
  },
  shape: {
    changeDetails: function (index) {
      pgSelect.shapeImg.attr("src", pgSelect.data.shape[index].url);
      pgSelect.shapeTitle.html(pgSelect.data.shape[index].title);
      pgSelect.shapeDescription.html(pgSelect.data.shape[index].description);
    },
  },
  color: {
    changeDetails: function (index) {
      pgSelect.colorImg.attr("src", pgSelect.data.color[index].url);
      pgSelect.colorTitle.html(pgSelect.data.color[index].title);
      pgSelect.colorDescription.html(pgSelect.data.color[index].description);
    },
  },
  clarity: {
    changeDetails: function (index) {
      pgSelect.clarityImg.attr("src", pgSelect.data.clarity[index].url);
      pgSelect.clartyTitle.html(pgSelect.data.clarity[index].title);
      pgSelect.clarityDescription.html(
        pgSelect.data.clarity[index].description
      );
    },
  },
  ringSize: {
    changeDetails: function (index) {
      pgSelect.currentSize.html(pgSelect.data.ringSize[index].us);
      pgSelect.circSize.html(pgSelect.data.ringSize[index].circ);
      pgSelect.dSize.html(pgSelect.data.ringSize[index].diameter);
      pgSelect.euSize.html(pgSelect.data.ringSize[index].europe);
      pgSelect.ukSize.html(pgSelect.data.ringSize[index].uk);
    },
  },
  data: {
    shape: [
      {
        url: "https://i.ibb.co/ZBmcG0f/dmg-shape-round.png",
        title: "Round",
        description:
          "A classic and timeless shape, the round diamond is known for its brilliant sparkle and perfect symmetry.",
      },
      {
        url: "https://i.ibb.co/rdNkYyp/dmg-shape-priness.png",
        title: "Princess",
        description:
          "A square-shaped diamond with sharp corners and exceptional brilliance, known for its modern and clean lines.",
      },
      {
        url: "https://i.ibb.co/271bsCZ/dmg-shape-oval.png",
        title: "Oval",
        description:
          "A modified brilliant cut diamond with an elongated shape, known for its brilliance and ability to create the illusion of longer, slender fingers.",
      },
      {
        url: "https://i.ibb.co/qyQnV1f/dmg-shape-pear.png",
        title: "Pear",
        description:
          "An elegant combination of a round and marquise shape, sometimes called a teardrop, offering a unique and graceful appearance.",
      },
      {
        url: "https://i.ibb.co/NVdgJtv/dmg-shape-emerald.png",
        title: "Emerald",
        description:
          "A rectangular shape with stepped facets, highlighting the diamonds clarity and showcasing a timeless and sophisticated look.",
      },
    ],
    color: [
      {
        url: "https://i.ibb.co/MDnYmGh/dmg-color-near.png",
        title: "K - Last Grade",
        description:
          "The color may be visible to the unaided eye. Diamonds with a K-color grade can be a smart choice, offering excellent value for money.",
      },
      {
        url: "https://i.ibb.co/MDnYmGh/dmg-color-near.png",
        title: "J - Last Grade",
        description:
          'Color in diamonds graded as "near-colorless" may be slightly visible to the naked eye, especially in fancy shapes or diamonds larger than 1 carat.',
      },
      {
        url: "https://i.ibb.co/JkK4B3C/dmg-color-slight.png",
        title: "I - Slightly Detectable",
        description:
          "Upon close examination, the color may be barely noticeable, but it still provides exceptional value.",
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "H - Near Colorless",
        description:
          'The "near-colorless" grade of CA exhibits noticeable color only when compared to much higher color grades, offering excellent value.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "G - Almost Colorless",
        description:
          'This grade is the highest level of "near-colorless" and may show some color in comparison to the even higher "colorless" grades, but it offers excellent value.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "F - Colorless",
        description:
          'The "colorless" grade is most valued when placed in platinum or white gold, with a faint color that can be identified by a skilled gemologist.',
      },
      {
        url: "https://i.ibb.co/J2JhPM4/dmg-color-clear.png",
        title: "E - Colorless",
        description:
          'This grade, best showcased in platinum or white gold, is so "colorless" that even trained eyes would struggle to detect traces of color.',
      },
    ],
    clarity: [
      {
        url: "https://i.ibb.co/Gp8pKwK/clarity-i3.png",
        title: "I1, I2, I3 - Included",
        description:
          "Diamonds in this clarity range have inclusions that are easily visible under 10x magnification and may also be visible to the naked eye. These diamonds may have reduced brilliance and sparkle due to their inclusions.",
      },
      {
        url: "https://i.ibb.co/ZHBvJz9/clarity-si1-si2.png",
        title: "SI1 & SI2 - Slightly Included",
        description:
          "These grades have noticeable inclusions under 10x magnification, some of which might be visible to the naked eye. SI diamonds generally offer good value as they have inclusions that might not significantly affect the appearance of the diamond.",
      },
      {
        url: "https://i.ibb.co/27xG7GC/clarity-vs1-vs2.png",
        title: "VS1 & VS2 - Very Slightly Included",
        description:
          "These grades have minor inclusions that are visible under 10x magnification but are considered relatively small and not easily noticeable to the naked eye.",
      },
      {
        url: "https://i.ibb.co/d61wnL9/clarity-vvs1-vvs2.png",
        title: "VVS1 & VVS2 - Very, Very Slightly Included",
        description:
          "These grades indicate that inclusions are extremely difficult to see even under 10x magnification. VVS diamonds may have minor inclusions that are barely visible to a skilled grader.",
      },
      {
        url: "https://i.ibb.co/WKsqs99/clarity-fl-if.png",
        title: "FL & IF - Flawless",
        description:
          "These are the highest clarity grades. Flawless diamonds have no visible inclusions or blemishes under 10x magnification, even by a skilled grader. Internally Flawless diamonds have no internal inclusions but may have minor surface blemishes.",
      },
    ],
    ringSize: [
      { us: 4, europe: "47", uk: "H 1/2", diameter: "14.9", circ: "46.8" },
      { us: 4.5, europe: "48", uk: "I 1/2", diameter: "15.3", circ: "48" },
      { us: 5, europe: "49", uk: "J 1/2", diameter: "15.7", circ: "49.3" },
      { us: 5.5, europe: "51", uk: "K 1/2", diameter: "16.1", circ: "50.6" },
      { us: 6, europe: "52", uk: "L 1/2", diameter: "16.5", circ: "51.9" },
      { us: 6.5, europe: "53", uk: "M 1/2", diameter: "16.9", circ: "53.1" },
      { us: 7, europe: "54", uk: "N 1/2", diameter: "17.3", circ: "54.4" },
      { us: 7.5, europe: "55", uk: "O 1/2", diameter: "17.7", circ: "55.7" },
      { us: 8, europe: "57", uk: "P 1/2", diameter: "18.1", circ: "57.0" },
      { us: 8.5, europe: "58", uk: "Q 1/2", diameter: "18.5", circ: "58.3" },
      { us: 9, europe: "59", uk: "R 1/2", diameter: "19.0", circ: "59.5" },
      { us: 9.5, europe: "61", uk: "S 1/2", diameter: "19.4", circ: "60.8" },
      { us: 10, europe: "62", uk: "T 1/2", diameter: "19.8", circ: "62.1" },
      { us: 10.5, europe: "63", uk: "U 1/2", diameter: "20.2", circ: "63.4" },
      { us: 11, europe: "64", uk: "V 1/2", diameter: "20.6", circ: "64.6" },
      { us: 11.5, europe: "66", uk: "W 1/2", diameter: "21.0", circ: "65.9" },
      { us: 12, europe: "67", uk: "X 1/2", diameter: "21.4", circ: "67.2" },
      { us: 12.5, europe: "68", uk: "Z 1/2", diameter: "21.8", circ: "68.5" },
    ],
  },
};
/* #endregion */


/* #region  PG Modal / Guide Modal / PGM Modal */
const pgModal = new Object({
  initialized: undefined,
  init: function () {
    this.renderDOM();
    this.bindEvents();
    Object.values(this.initFn).forEach((target) => {
      if (typeof target === "function") target();
    });
    this.intialized = true;
  },

  renderDOM: function () {
    // Root
    this.modal = $(".pg-modal");
    this.container = $(".pg-modal__container");
    this.backdrop = $(".pg-modal__backdrop");
    this.close = $('[data-evt="closePgModal"]');

    // Sections
    this.section = $(".pg-section");
    this.row = $(".pg-row");
    this.scrollContainer = $(".pg-modal__overscroll");
    this.sectionBracelets = this.section.filter("#pgBracelets");
    this.sectionDiamonds = this.section.filter("#pgDiamonds");
    this.sectionRings = this.section.filter("#pgRings");
    this.sectionNecklaces = this.section.filter("#pgNecklaces");

    // Controls
    this.switchBtn = $(".pg-switch-btn");

    // Select Tabs
    this.selectArr = Array.from($(".pg-select"));
    this.selectBtn = $(".pg-select-btn");
  },
  bindEvents: function () {
    this.close.click(function () {
      pgModal.fn.closeModal();
    });
  },

  fn: {
    openModal: function (target) {
      lockScroll();
      pgModal.modal.show();
      setTimeout(() => {
        pgModal.backdrop.css({ opacity: 1 });
        pgModal.container.removeClass("is-hidden");
      }, 1);
      let att = $(target).attr("data-pg-open");
      pgModal.section.hide();
      switch (att) {
        case "diamonds":
          pgModal.sectionDiamonds.show();
          break;
        case "rings":
          pgModal.sectionRings.show();
          break;
        case "bracelets":
          pgModal.sectionBracelets.show();
          break;
        case "necklaces":
          pgModal.sectionNecklaces.show();
          break;
        default:
          pgModal.section[0].show();
          break;
      }
      pgModal.scrollContainer[0].scrollTop = 0;
      pgSelect.attachControls(pgModal.selectArr, pgModal.selectBtn);
    },
    closeModal: function () {
      unlockScroll();
      pgModal.backdrop.css({ opacity: 0 });
      pgModal.container.addClass("is-hidden");
      setTimeout(() => {
        pgModal.modal.hide();
      }, 475);
    },
    setMobile: function () {
      if ($(window).width() < 480) {
        let arr = Array.from(pgModal.section);
        for (let i = 0; i < arr.length; i++) {
          let nArr = Array.from($(arr[i]).find(pgModal.row));
          $.each(nArr, function (i) {
            if (i > 0) {
              $(nArr[i]).hide();
            }
          });
        }
      }
    },
    attachSectionControls: function () {
      pgModal.section.each(function () {
        let btnArr = [...$(this).find(pgModal.switchBtn)];
        let rowArr = [...$(this).find(pgModal.row)];
        $.each(btnArr, function (i) {
          btnArr[i].onclick = () => {
            $.each(rowArr, function (i) {
              $(rowArr[i]).hide();
            });
            $.each(btnArr, function (i) {
              $(btnArr[i]).removeClass("is-active");
            });
            $(this).addClass("is-active");
            $(rowArr[i]).show();
          };
        });
      });
    },
  },

  initFn: {
    setInitial: () => {
      pgModal.fn.closeModal();
      pgModal.fn.setMobile();
      pgModal.fn.attachSectionControls();
    },
  },
});
/* #endregion */


/* #region  Product Page : Main */
const productPage_v2 = {
  init: function () {
    const new_page_exist = document.querySelector('.main_product_upd') !== null
    if (new_page_exist) {
      this.renderDOM()
      this.setDOMMethods()
      Object.values(this.initFn).forEach((fn) => {
        if (typeof fn === 'function') { fn() }
      })
    }
  },
  renderDOM: function () {
    this.optionsArr = document.querySelectorAll('.product__item-option')
    this.colorPickArr = document.querySelectorAll('.color-pick-btn')
    this.optionBtnArr = document.querySelectorAll('.option-btn')
    this.summary = document.querySelector('.product__item-summary')
    this.stickyBuyButton = document.querySelector('.product-sticky-buy')
  },
  setDOMMethods: function () {
    const optArr = productPage_v2.optionsArr
    this.setDropdown = () => {
      optArr.forEach((option) => {
        const body = option.querySelector('.product-option__body')
        const wrapper = option.querySelector('.product-option__wrapper')
        const arrow = option.querySelector('.product-option__dd-icon')
        if (body && wrapper) {
          option.open = () => {
            option.classList.add(IS_ACTIVE)
            body.style.display = 'block'
            if (arrow) { arrow.style.transform = 'rotate(180deg)' }
            setTimeout(() => {
              wrapper.style.opacity = 1
              wrapper.style.transform = 'translateY(0px)'
            }, 1);
          }
          option.close = () => {
            option.classList.remove(IS_ACTIVE)
            wrapper.style.opacity = 0
            wrapper.style.transform = 'translateY(-8px)'
            if (arrow) { arrow.style.transform = 'rotate(0deg)' }
            setTimeout(() => {
              body.style.display = 'none'
            }, getTransitionTime(wrapper))
          }
          option.toggle = () => {
            if (option.classList.contains(IS_ACTIVE)) {
              option.close()
            } else {
              option.open()
            }
          }
        }
      })
    }
    this.setHideAllOptions = () => {
      productPage_v2.optionsArr.hideVisible = () => {
        productPage_v2.optionsArr.forEach((option) => {
          if (option.classList.contains(IS_ACTIVE)) {
            option.close()
          }
        })
      }
    }
    this.setUpdateOption = () => {
      optArr.forEach((opt) => {
        opt.update = () => {
          const active = opt.querySelector('.option-btn.is-active')
          const typo = opt.querySelector('.option-btn_active-typo')
          const holder = opt.querySelector('.product-option__head-right')
          if (active && holder) {
            let val = active.getAttribute('data-value')
            if (val.length) {
              if (!typo) {
                holder.insertAdjacentHTML('afterbegin', `<span class="option-btn_active-typo">${val}</span>`)
              } else {
                typo.innerText = active.getAttribute('data-value')
              }
            }
          }
        }
      })
    }
    this.setUpdateAllOptions = () => {
      optArr.updateAll = () => {
        optArr.forEach((opt) => {
          opt.update()
        })
      }
    }

    const methods = [
      this.setDropdown,
      this.setHideAllOptions,
      this.setUpdateOption,
      this.setUpdateAllOptions
    ]
    methods.forEach((method) => { method() })
  },
  initFn: {
    attachClickOption: () => {
      productPage_v2.optionsArr.forEach((option) => {
        const head = option.querySelector('.product-option__head')
        const body = option.querySelector('.product-option__body')
        if (head && body) {
          head.onclick = () => {
            if (option.classList.contains(IS_ACTIVE)) {
              option.close()
            } else {
              productPage_v2.optionsArr.hideVisible()
              option.open()
            }
          }
        }
      })
    },
    attachDocumentClick: () => {
      document.onclick = (e) => {
        if (!e.target.closest('.product__item-option')) {
          productPage_v2.optionsArr.hideVisible()
        }
      }
    },
    attachColorClick: () => {
      const pickers = productPage_v2.colorPickArr
      pickers.forEach((picker) => {
        picker.onclick = () => {
          if (!picker.classList.contains(IS_ACTIVE)) {
            pickers.forEach((pick) => {
              if (pick !== picker) {
                pick.classList.remove(IS_ACTIVE)
              }
            })
            picker.classList.add(IS_ACTIVE)
          }
        }
      })
    },
    attachOptionBtnClick: () => {
      const buttons = productPage_v2.optionBtnArr
      buttons.forEach((btn) => {
        btn.onclick = (e) => {
          const $thisRipple = new rippleClickEffect($(btn), e);
          $thisRipple.push();
          let isActive = btn.classList.contains(IS_ACTIVE)
          let option = btn.parentNode.closest('.product__item-option')
          if (!isActive) {
            const sibs = btn.parentNode.querySelectorAll('.option-btn')
            sibs.forEach((sib) => {
              if (sib !== btn) {
                sib.classList.remove(IS_ACTIVE)
              }
            })
            btn.classList.add(IS_ACTIVE)
            option.update() // Update active typo
          }
        }
      })
    },
    setupSummary: () => {
      const
        sum = productPage_v2.summary,
        maxHeight = 150

      if (sum) {
        let isBigger = sum.scrollHeight > maxHeight
        if (isBigger) {
          sum.style.height = `${maxHeight}px`
          sum.insertAdjacentHTML(
            'beforeend',
            `<div class="product__item-summary-gradient"></div>
            `
          )

          const expandElement = document.createElement('div');
          expandElement.classList.add('product__item-summary-expand');
          expandElement.onclick = () => {
            if (sum.classList.contains(IS_EXPANDED)) {
              sum.classList.remove(IS_EXPANDED)
            } else[
              sum.classList.add(IS_EXPANDED)
            ]
          };

          sum.appendChild(expandElement);
        }
      }
    },
    setupStickyBuyButton: () => {
      const stickyButton = productPage_v2.stickyBuyButton
      if (stickyButton) {
        stickyButton.hide = () => {
          stickyButton.classList.remove(IS_VISIBLE)
        }
        stickyButton.show = () => {
          stickyButton.classList.add(IS_VISIBLE)
        }

        const mainBtn = document.querySelector('.product__side .buy-btn')
        if (mainBtn) {
          const obs = new IntersectionObserver((els) => {
            els.forEach((el) => {
              if (!el.isIntersecting) {
                stickyButton.show()
              } else {
                stickyButton.hide()
              }
            })
          })
          obs.observe(mainBtn)
        }
      }
    },
    updateOption: () => {
      productPage_v2.optionsArr.updateAll()
    }
  }
}
productPage_v2.init()

const productPage = new Object({
  initialized: undefined,
  classes: {
    isActive: "is-active",
    isCollapsed: "is-collapsed",
  },

  init: function () {
    // NEW UPDATE -- DELETE LATER
    const new_page_exist = document.querySelector('.main_product_upd') !== null
    if (!new_page_exist) {
      this.renderDOM();
      this.bindEvents();
      this.bindToggleSummary()
      Object.values(this.initFn).forEach((target) => {
        if (typeof target === "function") target();
      });
      this.intialized = true;
      // this.fn.initZoom()
    }
  },
  renderDOM: function () {
    this.evtExpandSummary = $('[data-evt="expandSummary"]');
    this.summaryContainer = $(".product__item-summary");
    this.buyBtn = $(".buy-btn");
    this.moreBtn = $('.product__more-btn')
    // Options
    this.optionBtn = $(".option-btn");
    this.optionBlock = $(".product__item-option");
    this.optionBody = $(".product-option__body");
    this.optionHead = $(".product-option__head");
    // Gold Color
    this.goldOption = $(".option_gold-color");
    this.goldOptionBtn = this.goldOption.find(this.optionBtn);
    // Diamond Color
    this.dmColorOption = $(".option_diamond-color");
    this.dmColorOptionBtn = this.dmColorOption.find(this.optionBtn);
    // Ring Size
    this.ringOption = $(".option_ring-size");
    // Floating controls
    this.floatingBtn = $(".floating-btn-mobile");
    // Guide controls
    this.evtOpenGuide = $("[data-pg-open]");
  },
  bindEvents: function () {
    this.optionBtn.click(function () {
      if ($(this).not(`.${IS_ACTIVE}`)) {
        $(this).siblings().removeClass(IS_ACTIVE)
        $(this).addClass(IS_ACTIVE)
      }
    })
    this.optionHead.click(function () {
      productPage.fn.toggleOptionVisible($(this));
    });
    this.goldOptionBtn.click(function () {
      return
      let thisAttr = $(this).attr("data-color");
      productPage.fn.switchGoldColor(thisAttr);
    });
    this.dmColorOptionBtn.click(function () {
      let thisAttr = $(this).attr("data-dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    });
    this.evtOpenGuide.click(function () {
      productPage.fn.openGuideModal($(this));
    });
    this.buyBtn.click(function () {
      $(this).addClass(BUTTON_LOADING);
      setTimeout(() => {
        $(this).removeClass(BUTTON_LOADING);
      }, 2000);
    });
    this.moreBtn.click(function () {
      productPage.fn.toggleMoreDetails($(this))
    })
  },

  fn: {
    toggleFavState: () => {
      // Active / Disactive Favorite Button
      let el = productPage.favButton[0],
        cls = productPage.classes.isActive,
        isActive = el.classList.contains(cls);

      if (isActive) {
        el.classList.remove(cls);
      } else {
        el.classList.add(cls);
      }
    },
    toggleButtonState: (target) => {
      // Active / Disactive Option Button
      let parent = target.closest(productPage.optionBody),
        els = [...parent.find(productPage.optionBtn)],
        cls = productPage.classes.isActive,
        isActived = els.filter((el) => el.classList.contains(cls));

      $(isActived).removeClass(cls);
      target.addClass(cls)
    },
    toggleOptionVisible: (target) => {
      // Show / Hide Option Body
      let thisOption = target.closest(productPage.optionBlock),
        thisBody = thisOption.find(productPage.optionBody),
        thisWrapper = thisBody.find(".product-option__wrapper"),
        isExpanded = thisBody[0].clientHeight !== 0;

      if (isExpanded) {
        const currentHeight = thisBody.css("height");

        thisOption.addClass(productPage.classes.isCollapsed);
        thisBody.css({ height: currentHeight });
        setTimeout(() => {
          thisBody.css({ height: 0 });
          thisWrapper.css({ transform: "translateY(-8px)", opacity: 0 });
          target.css('border-color', '#dcdfe7')
        }, 3);
      } else {
        const transitionTime =
          parseFloat(
            window.getComputedStyle(thisBody[0]).transitionDuration
          ) * 1000,
          toHeight = thisWrapper[0].scrollHeight;

        thisOption.removeClass(productPage.classes.isCollapsed);
        thisBody.css({ height: `${toHeight}px` });
        thisWrapper.css({ transform: "translateY(0px)", opacity: 1 });
        target.css('border-color', '#171c29')
        setTimeout(() => {
          thisBody.css({ height: "auto" });
        }, transitionTime);
      }
    },
    switchGoldColor: (attr) => {
      // Toggle Gold Color Header Background
      let color, textColor
      switch (attr) {
        case "Yellow": color = "#f1e9d8", textColor = "#171c29"; break;
        case "Rose": color = "#f0dcda", textColor = "#171c29"; break;
        case "White": color = "#f1f1f1", textColor = "#171c29"; break;
        case "Red": color = "#d4474f", textColor = "#ffffff"; break;
        case "Steel": color = "#ebebeb", textColor = "#171c29"; break;
        case "Blue": color = "#e6f2f8", textColor = "#171c29"; break;
        case "Black": color = "#232323", textColor = "#ffffff"; break;
        case "Platinum": color = "#e7e7e4", textColor = "#171c29"; break;
        case "Two_tone": color = "linear-gradient(34deg, #ebe3d3, #f8f6f2 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Tri_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f1e9d8 55%, #fff)", textColor = "#171c29"; break;
        case "Navy_blue": color = "#223164", textColor = "#ffffff"; break;
        case "Two_tone_rose": color = "linear-gradient(34deg, #f0dcda, #f8f2f4 29%, #f0dcda 55%, #fff)", textColor = "#171c29"; break;
        default: color = "#e6f2f8", textColor = "#171c29"; break;
      }
      productPage.goldOption
        .find(productPage.optionHead)
        .css({ "background": color, color: textColor });
    },
    switchDiamondColor: (attr) => {
      // Toggle Diamond Color Header Background
      let bgColor, textColor;
      switch (attr) {
        case "White":
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
        case "Black":
          (bgColor = "#434343"), (textColor = "#ffffff");
          break;
        case "Blue":
          (bgColor = "#e3eeff"), (textColor = "#171c29");
          break;
        case "Yellow":
          (bgColor = "#fff9e4"), (textColor = "#171c29");
          break;
        default:
          (bgColor = "#f0f0f0"), (textColor = "#171c29");
          break;
      }
      productPage.dmColorOption
        .find(productPage.optionHead)
        .css({ "background-color": bgColor, color: textColor });
    },
    toggleMoreDetails: (target) => {
      // Show / Hide Warranty or More Details
      let $this = target,
        els = productPage.moreBtn,
        container = $('.product__about-wrap')

      els.removeClass(IS_ACTIVE)
      $this.addClass(IS_ACTIVE)

      container.hide()

      if ($this[0].classList.contains('for_more')) container.filter('.for_more').show()
      if ($this[0].classList.contains('for_warranty')) container.filter('.for_warranty').show()
    },
    openGuideModal: (target) => {
      if (target) {
        pgModal.fn.openModal(target);
      }
    },
  },

  initFn: {
    setupSummary: () => {
      const
        sum = document.querySelector('.product__item-summary'),
        maxHeight = 150

      if (sum) {
        let isBigger = sum.scrollHeight > maxHeight
        if (isBigger) {
          sum.style.height = `${maxHeight}px`
          sum.insertAdjacentHTML(
            'beforeend',
            `<div class="product__item-summary-gradient"></div>
            `
          )

          const expandElement = document.createElement('div');
          expandElement.classList.add('product__item-summary-expand');
          expandElement.onclick = () => {
            const gradient = sum.querySelector('.product__item-summary-gradient')
            gradient.remove()
            expandElement.remove()
            sum.style.height = 'auto'
          };

          sum.appendChild(expandElement);
        }
      }
    },
    // Events Fires on initialization
    // checkSummary: () => {
    //   // If there is a list, then collapse description else nothing.
    //   let container = productPage.summaryContainer,
    //     list = container.find("ul"),
    //     cls = productPage.classes.isCollapsed;
    //   if (list.length == 0) {
    //     return false;
    //   } else {
    //     const button = $("<button>", {
    //       class: "product__summary-toggle",
    //       html: "Show More...",
    //     }).on("click", function () {
    //       if (container.hasClass(cls)) {
    //         container.removeClass(cls);
    //         this.innerHTML = "Show Less...";
    //       } else {
    //         container.addClass(cls);
    //         this.innerHTML = "Show More...";
    //       }
    //     });

    //     container.addClass(cls).append(button);
    //   }
    // },
    checkGoldColor: () => {
      return
      // On load check active gold color
      let buttons = [...productPage.goldOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("color");
      productPage.fn.switchGoldColor(thisAttr);
    },
    checkGoldColorNumber: () => {
      const cont = productPage.goldOption,
        btn = cont.find(productPage.optionBtn)
      if (btn.length < 3) {
        cont.find('.options-block').css({ display: 'flex' })
      }
    },
    checkDmColor: () => {
      // On load check active diamond color
      let buttons = [...productPage.dmColorOptionBtn],
        isActived = buttons.filter((el) =>
          el.classList.contains(productPage.classes.isActive)
        ),
        thisAttr = $(isActived).data("dm-color");
      productPage.fn.switchDiamondColor(thisAttr);
    },
    checkRingSizes: () => {
      // If there is ring sizes less than 5.5 && more than 11.5 then add more buttons
      let thisOption = productPage.ringOption;
      let arr = Array.from(thisOption.find(productPage.optionBtn));
      if (arr.length > 15) {
        let sliced = [];
        sliced.push(arr.slice(0, 3), arr.slice(-3));
        $.each(sliced, function (i) {
          $(sliced[i]).hide();
        });

        let smallerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "smallerSizes",
        });

        let biggerBtn = $("<button>", {
          class: "option-btn",
          "data-option-sub": "biggerSizes",
        });

        smallerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(0, 3), function (i) {
            $(arr.slice(0, 3)[i]).css({ display: "flex" });
          });
        });
        biggerBtn.click(function () {
          $(this).remove();
          $.each(arr.slice(-3), function (i) {
            $(arr.slice(-3)[i]).css({ display: "flex" });
          });
        });

        let parent = thisOption.find(".options-block");

        parent.append(biggerBtn);
        parent.prepend(smallerBtn);
      }
    },
    initTippy: () => {
      // Initiale tippy
      if ($(window).width() >= 992) {
        tippy(".item-option__mark", {
          allowHTML: false,
          delay: 200,
          // theme: 'ib_options',
          maxWidth: 270,
        });
      }
    },
    initFloating: () => {
      // Initialize floating button mobile
      let el = productPage.floatingBtn
      if (el.length) {
        let elHeight = el[0].scrollHeight
        function attachTrigger() {
          let triggerEl = $("#productAddCart");
          if (triggerEl.length) {
            $(window).scroll(function () {
              let hT = triggerEl.offset().top,
                hH = triggerEl.outerHeight(),
                wH = $(window).height(),
                wS = $(this).scrollTop();

              if (wS + 100 > hT - wH && hT > wS + 100 && wS + 100 + wH > hT) {
                el.css({ transform: `translateY(${elHeight}px)` });
              } else {
                el.css({ transform: `translateY(0px)` });
              }
            });
          }
        }
        if (el.length > 0) {
          if ($(window).width() > 479) {
            el.hide();
          } else {
            attachTrigger();
          }
          $(window).on("load resize", function () {
            if ($(window).width() > 479) {
              el.hide();
            } else {
              el.show();
              attachTrigger();
            }
          });
        }
      }
    },
    attachPayLaterBoxEvents: function (...args) {
      args = [...document.querySelectorAll('[data-paylater]')]

      const introEls = [...$('#payLaterBoxIntro').find('h3, p, button')]
      const details = document.getElementById('payLaterBoxDetails')

      if (args && args.length && details) {
        const toggle = () => {
          if (window.getComputedStyle(details).display == 'none') {
            details.style.display = 'block'; introEls.forEach((el) => { el.style.display = 'none' })
          } else {
            introEls.forEach((el) => { el.style.display = 'block' }); details.style.display = 'none'
          }
        }

        args.forEach(el => el.onclick = () => {
          toggle()
        })
      }
    }
  },

  bindToggleSummary: function () {
    return
    const sum = document.querySelector('.product__item-summary')
    if (sum) {
      const currentHeight = sum.offsetHeight
      const line = sum.closest('.side-row__line')

      if (!line) return
      if (currentHeight < 250) return

      const toggleBtn = createElem('button', {
        className: 'toggle-summary',
        innerHTML: 'Show more'
      })

      toggleBtn.onclick = () => {
        const elem = document.querySelector('.product__item-summary')
        if (elem.offsetHeight > 180) {
          elem.style.height = '180px'
          elem.classList.remove(__EXPANDED)
          toggleBtn.innerHTML = 'Show more'
        } else {
          const scrollH = document.querySelector('.product__item-summary').scrollHeight
          elem.style.height = `${scrollH}px`
          elem.classList.add(__EXPANDED)
          toggleBtn.innerHTML = 'Show less'
        }
      }

      line.appendChild(toggleBtn)
      sum.style.height = `180px`
      sum.classList.add('--limited')
    }
  }
});
/* #endregion */


/* #region  Product Page SPLIDE */
const productSplide = new Object({
  initialized: undefined,
  init: function () {
    this.renderDOM();
    this.initSplide();
    this.initialized = true;
    this.initMoreSplide();
  },
  renderDOM: function () {
    this.sliderArr = Array.from(
      document.getElementsByClassName("product-slider")
    );
    this.thumbArr = Array.from(
      document.getElementsByClassName("product-slider_thumbnails")
    );
  },
  initSplide: function () {
    $.each(this.sliderArr, function (i) {
      const slider = productSplide.sliderArr[i];
      const thumbnails = productSplide.thumbArr[i];
      let main = new Splide(slider, {
        type: "slider",
        perPage: 1,
        perMove: 1,
        gap: 0,
        arrows: true,
        pagination: true,
        speed: 750,
        drag: false,
        noDrag: '--sirv',
        breakpoints: {
          478: {
            perPage: 1,
            perMove: 1,
          },
        },
      });
      // let thumb = new Splide(thumbnails, {
      //   rewind: true,
      //   pagination: false,
      //   arrows: false,
      //   cover: true,
      //   isNavigation: true,
      // })

      // main.on('drag', () => {
      //   const root = main.root
      //   const slide = root.querySelector('.splide__slide.is-active')
      //   const slideIsSirv = slide.classList.contains('--sirv')
      //   if (slideIsSirv) {
      //     main.destroy()
      //   }
      // })

      // main.sync(thumb);
      main.mount();
      // thumb.mount();
    });
  },
  initMoreSplide: function () {
    const moreSliderArr = Array.from(
      document.getElementsByClassName("more-row__splide")
    );

    $.each(moreSliderArr, function (i) {
      const slider = moreSliderArr[i];
      let main = new Splide(slider, {
        type: "loop",
        perPage: 4,
        perMove: 1,
        autoplay: 0,
        gap: "8px",
        arrows: 1,
        pagination: 0,
        speed: 750,
        breakpoints: {
          1980: {
            perPage: 5,
            perMove: 1,
          },
          1680: {
            perPage: 4,
            perMove: 1,
          },
          1120: {
            perPage: 4,
            perMove: 1,
          },
          991: {
            perPage: 4,
            perMove: 1,
          },
          767: {
            grid: {
              rows: 2,
              cols: 3,
              gap: { row: "10px", col: "8px" },
            },
          },
          478: {
            grid: {
              rows: 2,
              cols: 2,
              gap: { row: "24px", col: "8px" },
            },
          },
        },
      }).mount(window.splide.Extensions);
    });
  },
});

if (typeof productSplide.init === "function") {
  productSplide.init();
}
/* #endregion */


/* #region  Filter Modal */
// const filterModal = {
//   init: function () {
//     this.renderDOM()
//     this.bindEvents()
//     this.reset()
//   },
//   renderDOM: function () {
//     this._ = $('.filter-modal')
//     this.backdrop = this._.find('.filter-modal__backdrop')
//     this.container = this._.find('.filter-modal__container')
//     this.content = this._.find('.filter-modal__content')
//     this.evtFilter = $('[data-filter-evt]')
//   },
//   bindEvents: function () {
//     this.evtFilter.click(function () {
//       let thisAttr = $(this).attr('data-filter-evt')
//       thisAttr == 'close' ? filterModal.close() : filterModal.open(thisAttr)
//     })
//     $('#filterSort a').click(function () {
//       if (!$(this).hasClass(IS_ACTIVE)) {
//         $(this).addClass(IS_ACTIVE).siblings().removeClass(IS_ACTIVE)
//       }
//     })
//   },
//   open: function (att) {
//     lockScroll()
//     this._.show()
//     setTimeout(() => {
//       this.backdrop.css({ opacity: 1 })
//       this.container.css({ transform: 'translateX(0%)' })
//     }, 1)
//     this.content.hide()
//     switch (att) {
//       case 'openSort':
//         this.content.filter('#filterSort').show()
//         break;
//       case 'openFilter':
//         this.content.filter('#filterFilter').show()
//         break
//       default:
//         break;
//     }
//   },
//   close: function () {
//     unlockScroll()
//     this.backdrop.css({ opacity: 0 })
//     this.container.css({ transform: 'translateX(100%)' })
//     setTimeout(() => {
//       this._.hide()
//     }, getTransitionTime(this.container));
//   },
//   reset: function () {
//     this.backdrop.css({ opacity: 0 })
//     this._.hide()
//     this.container.css({ transform: 'translateX(100%)' })
//     this.content.eq(0).hide()
//   }
// }
/* #endregion */


/* #region  Page elements */
const pageEls = new Object({
  init: function () {
    Object.values(this.attachEvent).forEach((target) => {
      if (typeof target === 'function') target();
    })
    this.attachToggleInputs()
  },
  attachEvent: {
    filterDropdown: () => {
      let dropdownEls = Array.from($('.filter-dropdown'))

      for (let i = 0; i < dropdownEls.length; i++) {
        const el = dropdownEls[i];
        $(el).hover(function () {
          let thisCurrent = $(this).find('.filter-dropdown__current'),
            list = $(this).find('.filter-dropdown__list'),
            scrollContainer = list.find('> div'),
            buttons = Array.from(scrollContainer.find('> div')),
            main = $(this).find('.filter-dropdown__main')

          const scrollH = scrollContainer[0].scrollHeight

          if (list.height() == 0) {
            list.css({ height: `${scrollH}px` })
            main.addClass(IS_ACTIVE)
          } else {
            list.css({ height: '0px' })
            main.removeClass(IS_ACTIVE)
          }

          $.each(buttons, function (i) {
            buttons[i].onclick = () => {
              let sibs = $(buttons[i]).siblings()
              sibs.removeClass(IS_ACTIVE)
              buttons[i].classList.add(IS_ACTIVE)

              let val = $(buttons[i]).html()
              thisCurrent.html(val)
            }
          })
        })
      }
    },
    trackingDateUpdate: () => {
      const dates = [...document.querySelectorAll('[data-track="updated_date"]')]
      const nowDate = new Date()

      if (dates.length) {
        const day = nowDate.getDate()
        const month = nowDate.toLocaleDateString('en-US', { month: 'short' })
        const year = nowDate.getFullYear()
        let hours = nowDate.getHours()
        const minutes = nowDate.getMinutes().toString().padStart(2, '0')
        const ampm = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12 || 12

        for (const date of dates) {
          date.innerHTML = `${day} ${month}, ${year}, ${hours}:${minutes} ${ampm}`
        }
      }
    },
    pageFilters: () => {
      let filterRows = Array.from($('.filter-row'))
      for (let i = 0; i < filterRows.length; i++) {
        const el = $(filterRows[i]),
          header = el.find('.filter-row__header'),
          body = el.find('.filter-row__body'),
          container = el.find('.filter-row__container'),
          icon = header.find('svg')

        header.click(() => {
          let currentBodyHeight = body.height()
          if (currentBodyHeight !== 0) {
            body.css({ height: `${currentBodyHeight}px` })
            setTimeout(() => {
              body.css({ height: 0 })
              container.css({ transform: 'translateY(-24px)', opacity: 0 })
              icon.css({ transform: 'rotate(0deg)' })
            }, 1);
          } else {
            let scrollH = container[0].scrollHeight
            body.css({ height: scrollH })
            container.css({ transform: 'translateY(0px)', opacity: 1 })
            icon.css({ transform: 'rotate(180deg)' })
          }
        })
      }
    },
    faqLists: () => {
      let faqLists = Array.from($('.faq-list'))
      for (let i = 0; i < faqLists.length; i++) {
        const list = $(faqLists[i]),
          li = list.find('li')

        li.eq(0).find('.faq-body').css({ height: 'auto' })

        for (let n = 0; n < li.length; n++) {
          const el = $(li[n])
          let head = el.find('.faq-head'),
            body = el.find('.faq-body'),
            svg = el.find('svg')

          head.click(function () {
            if (body.height() == 0) {
              body.css({ height: 'auto' })
              svg.css({ transform: 'rotate(180deg)' })
            } else {
              body.css({ height: 0 })
              svg.css({ transform: 'rotate(0deg)' })
            }
          })
        }
      }
    },
    listings: () => {
      const listings = [...document.querySelectorAll('.listing-set')]
      for (const listing of listings) {
        const buttonArray = [...listing.querySelectorAll('.listing-btn:not(.--disabled)')]
        buttonArray.forEach((btn) => {
          btn.addEventListener('click', () => {
            btn.classList.add(IS_ACTIVE)
            buttonArray.forEach((arrBtn) => {
              if (arrBtn != btn) arrBtn.classList.remove(IS_ACTIVE)
            })
          })
        })
      }
    },
    // togglePayModal: () => {
    //   let evt = [...$('[data-evt="togglePayModal"]')]
    //   evt.forEach((el) => {
    //     el.onclick = () => {
    //       let modal = $('.pay-modal')
    //       if (modal.length) {
    //         if (modal.isVisible()) {
    //           unlockScroll()
    //           modal.css({ opacity: 0 })
    //           setTimeout(() => {
    //             modal.hide()
    //           }, getTransitionTime(modal));
    //         } else {
    //           lockScroll()
    //           modal.show()
    //           setTimeout(() => {
    //             modal.css({ opacity: 1 })
    //           }, 1);
    //         }
    //       }
    //     }
    //   })
    // }
  },
  attachToggleInputs: function () {
    const arr = [...document.querySelectorAll('[data-input-toggle]')]
    for (const input of arr) {
      const btn = input.parentNode.querySelector('button') || input.parentNode.querySelector('input[type="submit"]')
      if (btn) {
        input.addEventListener('input', () => {
          const value = input.value
          if (value) {
            btn.disabled = false
            return
          }
          btn.disabled = true
          return
        })

        input.addEventListener('keydown', (e) => {
          const keyIsEnter = e.key === 'Enter'
          if (keyIsEnter) {
            e.preventDefault()
            btn.click()
          }
        })

        btn.addEventListener('click', () => {
          const value = input.value
          input.value = ''
          input.dispatchEvent(new Event('input'))
        })
      }
    }
  }
})

function applyRedeemCode() {
  const value = $('#redeem_input').val();
  if (value != '') {
    $.ajax({
      url: '/json/redeem-promo-code',
      type: 'POST',
      data: { code: value },
      success: function (data) {
        var r = $.parseJSON(data);
        if (!r.error) {
          $('.checkout-redeem').show();
        } else {
          showMessage('error', 'Error', r.msg);
        }
      }
    });
  }
}

const attachPayModal = () => {
  let evtOpenLater = $('[data-evt="payModalLater"]'),
    evtOpenCrypto = $('[data-evt="payModalCrypto"]'),
    evtClose = $('[data-evt="closePayModal"]'),
    crypto = $('#payModalCrypto'),
    later = $('#payModalLater'),
    modal = $('.pay-modal')

  const openModal = () => {
    lockScroll()
    modal.show()
    setTimeout(() => {
      modal.css({ opacity: 1 })
    }, 1);
  }

  const closeModal = () => {
    unlockScroll()
    modal.css({ opacity: 0 })
    setTimeout(() => {
      modal.hide()
    }, getTransitionTime(modal));
  }

  evtOpenLater.add(evtOpenCrypto).click(function () {
    openModal()
    crypto.add(later).hide()
    if ($(this).is(evtOpenCrypto)) {
      crypto.show()
    }
    if ($(this).is(evtOpenLater)) {
      later.show()
    }
  })

  evtClose.click(function () {
    closeModal()
  })
}
/* #endregion */


/* #region  My Bag */
const myBag = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {

    toggleFloating: function () {
      const el = $('.mybag-floating')
      if (el.length) {
        const triggerElPosition = $('.mybag-summary__footer').offset().top
        $(window).scroll(function () {
          let yScroll = window.scrollY
          if (yScroll < (triggerElPosition - screen.availHeight) || yScroll > (triggerElPosition)) {
            el.removeClass(IS_HIDDEN)
          } else {
            el.addClass(IS_HIDDEN)
          }
        })
      }
    },

    attachToggleProtect: function () {
      const plans = $('.item-protect__plans'),
        button = plans.find('button')

      button.click(function () {
        if (!$(this).is(`.${IS_ACTIVE}`)) {
          let sbs = $(this).siblings()
          sbs.removeClass(IS_ACTIVE)
          $(this).addClass(IS_ACTIVE)
        }
      })
    }

  }
})
/* #endregion */


/* #region  Account page */
const account = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    editAddress: function () {
      const evtEditAddress = Array.from($('[data-edit="address"]'))
      for (let i = 0; i < evtEditAddress.length; i++) {
        const el = evtEditAddress[i];

        $(el).click(function () {
          let details = $(this).closest('.profile-card').find('.profile-card__details'),
            form = details.filter('.form')
          if (form.isVisible()) {
            details.hide().not(form).show()
          } else {
            details.show().not(form).hide()
          }
        })

      }
    },
    toggleInvoiceHeight: function () {
      const invoiceHeader = Array.from($('.order__invoice-header'))
      for (let i = 0; i < invoiceHeader.length; i++) {
        const el = invoiceHeader[i];
        $(el).click(function () {
          let body = $(this).siblings('.order__invoice-body')
          if (body.height() == 0) {
            let sHeight = body[0].scrollHeight
            body.css({ height: `${sHeight}px` })
          } else {
            body.css({ height: `${body.height()}px` })
            setTimeout(() => {
              body.css({ height: "0px" })
            }, 1);
          }
        })
      }
    }
  }
})
/* #endregion */


/* #region  Location page */
const locationPage = new Object({
  init: function () {
    Object.values(this.attachEvents).forEach((fn) => {
      if (fn !== undefined && typeof fn == 'function') fn();
    })
  },
  attachEvents: {
    toggleStoresVisibility: function () {
      let headArr = [...$('.store-row__head')]
      $.each(headArr, function (i) {
        $(headArr[i]).click(function () {
          let rows = $('.store-row'),
            thisRow = $(this).closest(rows)
          if (thisRow.find('.store-row__body').isVisible()) {
            return false
          } else {
            rows.find('.store-row__body').show()
            rows.not(thisRow).find('.store-row__body').hide()
          }
        })
      })
    }
  }
})
/* #endregion */


/* #region Page Alers */
var alertTimer;
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

function showMessage(type, title, msg) {
  var alert_type = (type === 'success') ? pageAlerts.classes.info : pageAlerts.classes.error;
  pageAlerts.showAlert(alert_type, title, msg);
}
/* #endregion */


/* #region Sell Pages */
const bookModal = {
  step: 1,
  apptData: {},

  root: document.querySelector('.book-sell'),
  backdrop: document.querySelector('.book-sell__backdrop'),
  container: document.querySelector('.book-sell__container'),

  evtNextStep: $('[data-evt="bookModalNext"]'),
  evtBackStep: $('[data-evt="bookModalBack"]'),
  evtToggle: $('[data-evt="toggleBookModal"]'),

  sectionDate: $('#bookSectionDate'),
  sectionPersonal: $('#bookSectionPersonal'),
  sectionConfirm: $('#bookSectionConfirm'),

  inputName: document.getElementById('bookFullName'),
  inputEmail: document.getElementById('bookEmail'),
  inputPhone: document.getElementById('bookPhone'),
  inputArr: [this.inputName, this.inputEmail, this.inputPhone],

  confirmName: document.getElementById('bookConfirmName'),
  confirmEmail: document.getElementById('bookConfirmEmail'),
  confirmPhone: document.getElementById('bookConfirmPhone'),
  confirmDate: document.getElementById('bookConfirmDate'),
  confirmTime: document.getElementById('bookConfirmTime'),

  init: function () {
    if (this.root !== null) {
      this.dateTime.init()
      this.attachEvents()
    }
  },

  close: function () {
    unlockScroll()
    this.container.style.transform = 'translateX(100%)'
    this.backdrop.style.opacity = 0
    setTimeout(() => {
      this.root.style.display = 'none'
    }, getTransitionTime(this.container));
  },
  open: function () {
    if (!$('.book-sell__date-box').length) { bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(true)) }
    lockScroll()
    this.root.style.display = 'block'
    setTimeout(() => {
      this.container.style.transform = 'translateX(0%)'
      this.backdrop.style.opacity = 1
    }, 1);
  },
  toggle: function () {
    if (window.getComputedStyle(this.root).getPropertyValue('display') !== 'none') {
      this.close()
    } else {
      this.open()
    }
  },
  attachEvents: function () {
    this.evtToggle.click(function () {
      bookModal.toggle()
    })
    this.evtNextStep.click(function () {
      switch (bookModal.step) {
        case 1:
          if (bookModal.apptData.date) {
            bookModal.step = 2
            bookModal.sectionDate.hide()
            bookModal.sectionPersonal.show()
            bookModal.observer()
          }
          break;
        case 2:
          if (bookModal.inputName.value && bookModal.inputEmail.value && bookModal.inputPhone.value) {
            bookModal.step = 3
            bookModal.sectionPersonal.hide()
            bookModal.sectionConfirm.show()
            bookModal.apptData.name = bookModal.inputName.value
            bookModal.apptData.email = bookModal.inputEmail.value
            bookModal.apptData.phone = bookModal.inputPhone.value
            bookModal.apptData.url = window.location.href;
            bookModal.observer()
          }
          break;
        case 3:
          bookModal.apptData.date_day = $('#bookConfirmDate').text();
          bookModal.apptData.time = $('#bookConfirmTime').text();
          //alert(JSON.stringify(bookModal.apptData)) // change later
          $.ajax({
            url: '/json/book-appointment',
            type: 'POST',
            data: { json: JSON.stringify(bookModal.apptData) },
            success: function (data) {
              bookModal.close()
              setTimeout(() => {
                bookModal.reset()
              }, getTransitionTime(bookModal.container));
            }
          });

          break;
      }
    })
    this.evtBackStep.click(function () {
      switch (bookModal.step) {
        case 1:
          bookModal.close()
          break;
        case 2:
          --bookModal.step
          bookModal.observer()
          bookModal.sectionPersonal.hide()
          bookModal.sectionDate.show()
          break;
        case 3:
          --bookModal.step
          bookModal.observer()
          bookModal.sectionConfirm.hide()
          bookModal.sectionPersonal.show()
          break;
      }
    })
    const attachInputObesrver = () => {
      let arr = [bookModal.inputName, bookModal.inputEmail, bookModal.inputPhone]
      arr.forEach((el) => { el.oninput = () => { bookModal.observer() } })
    }
    attachInputObesrver()
  },

  dateTime: {
    intervals: [[11, 0o0, 0o0], [13, 30, 0o0], [15, 30, 0o0], [16, 0o0, 0o0], [16, 30, 0o0]],
    daysPerView: 3,
    holder: document.getElementById('bookSellDates'),

    init: function () {
      this.attachEvents()
      this.appendBoxes(this.getDates(true))
    },
    renderHTML: (date) => {
      const weekday = date.toLocaleDateString('en-US', { weekday: 'long' }), day = date.getDate(), month = date.toLocaleDateString('en-US', { month: 'short' }), time = date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })

      let ifPast = new Date() > date ? ' disabled' : ''
      let dayTime = date.getDay() == 6 ? 'Closed' : date.getDay() == 0 ? 'Closed' : time
      let isWeekend = date.getDay() == 6 ? ' is-closed' : date.getDay() == 0 ? ' is-closed' : ''

      return `
      <div class="book-sell__date-box${isWeekend}" data-time="${String(date)}"${ifPast}>
        <span>${weekday}, ${day}${getOrdinalTxt(day)} ${month}</span>
        <span>${dayTime}</span>
      </div>
      `
    },
    appendBoxes: function (arr) {
      arr.forEach((el) => this.holder.insertAdjacentHTML('beforeend', el))
    },
    getDates: function (isNext) {
      let daysArr = [], initial = 0
      let arr = [...document.querySelectorAll('.book-sell__date-box')]
      let initialDate

      if (arr.length == 0) {
        initialDate = new Date()
      } else {
        if (isNext == true) {
          initialDate = new Date(arr[arr.length - 1].getAttribute('data-time'))
        } else {
          initialDate = new Date(arr[0].getAttribute('data-time'))
        }
      }

      if (arr.length !== 0) {
        arr.forEach(el => el.remove());
        if (isNext == true) {
          initialDate.setDate(initialDate.getDate() + 1)
        } else { initialDate.setDate(initialDate.getDate() - 1) }
      }

      while (initial !== this.daysPerView) {
        let dayDate = new Date(initialDate)
        if (isNext == true) { daysArr.push(new Date(dayDate.setDate(initialDate.getDate() + initial))) } else {
          daysArr.push(new Date(dayDate.setDate(initialDate.getDate() - initial)))
        }
        ++initial
      }

      let ints = isNext == true ? this.intervals : this.intervals.slice().reverse()

      let htmlArr = daysArr.reduce((acc, date) => {
        ints.forEach((interval) => {
          let thisDate = new Date(date)
          thisDate.setHours(...interval)
          acc.push(this.renderHTML(thisDate))
        })
        return acc
      }, [])

      if (isNext == true) { return htmlArr } else { return htmlArr.reverse() }
    },
    attachEvents: function () {
      $('[data-switch-time]').click(function () {
        let attr = $(this).attr('data-switch-time')
        switch (attr) {
          case 'next':
            bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(true))
            break;
          case 'prev':
            if ([...document.querySelectorAll('.book-sell__date-box')][0])
              bookModal.dateTime.appendBoxes(bookModal.dateTime.getDates(false))
            break;
        }
      }),
        $(document).on('click', '.book-sell__date-box', function () {
          $(this).toggleClass(IS_ACTIVE).siblings().removeClass(IS_ACTIVE)
          bookModal.observer()
        })
    }
  },

  observer: function () {
    switch (this.step) {
      case 1:
        let activeDate = $('.book-sell__date-box').filter(`.${IS_ACTIVE}`)
        if (activeDate.length) {
          this.apptData.date = new Date(activeDate.attr('data-time'))
          this.evtNextStep.attr('disabled', false)
        } else {
          delete this.apptData.date
          this.evtNextStep.attr('disabled', true)
        }
        break;
      case 2:
        if (this.inputName.value && this.inputEmail.value && this.inputPhone.value && this.apptData.date) {
          this.evtNextStep.attr('disabled', false)
        } else {
          this.evtNextStep.attr('disabled', true)
        }
        break;
      case 3:
        this.confirmName.innerHTML = this.apptData.name
        this.confirmEmail.innerHTML = this.apptData.email
        this.confirmPhone.innerHTML = this.apptData.phone
        this.confirmDate.innerHTML = `${this.apptData.date.getDate()}${getOrdinalTxt(this.apptData.date.getDate())} ${this.apptData.date.toLocaleDateString('en-US', { month: 'long' })}`
        this.confirmTime.innerHTML = this.apptData.date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' })
        break;
    }
  },
  reset: function () {
    bookModal.step = 1
    let inputArr = [this.inputName, this.inputEmail, this.inputPhone]
    inputArr.forEach((el) => { el.value = '' })
    $('.book-sell__date-box').removeClass(IS_ACTIVE)
    bookModal.sectionConfirm.hide()
    bookModal.sectionPersonal.hide()
    bookModal.sectionDate.show()
    Object.values(bookModal.apptData).forEach((el) => {
      delete el
    })
    $('.book-sell__date-box').remove()
    bookModal.observer()
  }
}
const sellPage = {
  faqItems: [...document.querySelectorAll('.sell-faq-item')],
  init: function () {
    if (this.faqItems.length) {
      this.attachFaq()
      $('.sell-faq-item__main').eq(0).trigger('click')
    }
  },
  attachFaq: function () {
    this.faqItems.forEach((el, index) => {
      $(el).click(function () {
        let main = $(this).find('.sell-faq-item__main'),
          p = $(this).find('p'), svg = $(this).find('svg')
        if (main.height() == 0) {
          $(this).addClass(IS_ACTIVE)
          main.css({ height: `${p[0].scrollHeight}px` })
          svg.css({ transform: 'rotate(180deg)' })
        } else {
          $(this).removeClass(IS_ACTIVE)
          main.css({ height: `0px` })
          svg.css({ transform: 'rotate(0deg)' })
        }
      })
    })
  }
}
/* #endregion */


/* #region rootLoader */
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
/* #endregion */


/* #region pageReset */
const passReset = {
  IS_EMPTY: 'is-empty',
  IS_DISABLED: 'is-disabled',
  init: function () {
    if ($('.pass-reset-page').length) {
      this.renderDOM()
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.form = $('#passResetForm')
    this.submitBtn = $('#passResetSubmit')
    this.inputArr = [...this.form.find('input[type="password"]')]
    this.error = $('.pass-reset-error')
    this.loader = $('.pass-reset-loader')
    this.main = $('.pass-reset__main')
    this.result = $('.pass-reset__result')
  },
  bindEvents: function () {
    // submit click
    $.each(this.submitBtn, function (i) {
      passReset.submitBtn[i].onclick = (e) => {
        e.preventDefault()
        passReset.form.submit()
      }
    })
    // input events
    $.each(this.inputArr, function (i) {
      passReset.inputArr[i].oninput = () => {
        let arr = passReset.inputArr
        let pass1 = arr[0].value, pass2 = arr[1].value
        if (pass2.length == 0) {
          passReset.hideError()
        } else {
          if (pass1.length !== pass2.length) { passReset.showError('Different password length') }
          else {
            passReset.hideError(); if (pass1 === pass2) { passReset.successError() }
            else { passReset.showError("Passwords don't match") }
          }
        }
      }
    })
    // form submit
    this.form[0].onsubmit = (e) => {
      e.preventDefault()
      if (passReset.formValid()) {
        Object.assign(passReset.submitBtn[0].style, { color: 'transparent', height: '14px', 'border-radius': '50px' })
        passReset.form.addClass(passReset.IS_DISABLED)
        passReset.hideError()
        passReset.loader[0].animate({ width: '100%' }, { duration: 3000, fill: 'forwards' }).onfinish = () => {
          const formData = new FormData(e.target), obj = {}
          formData.forEach((value, key) => (obj[key] = value))
          Object.assign(passReset.main[0].style, { opacity: 0 }); Object.assign(passReset.result[0].style, { opacity: 0 })
          setTimeout(() => {
            passReset.main.hide()
            passReset.result.show()
            setTimeout(() => {
              Object.assign(passReset.result[0].style, { opacity: 1 })
            }, 5);
          }, 401);
          // alert(JSON.stringify(obj))
        }
      }
    }
  },
  formValid: function () {
    let arr = passReset.inputArr
    arr.forEach(el => el.classList.remove(passReset.IS_EMPTY))

    if (arr.length !== 0) {
      let emptyInput = arr.filter(el => el.value.length == 0)

      if (emptyInput.length !== 0) {
        $.each(emptyInput, function (i) {
          emptyInput[i].classList.add(passReset.IS_EMPTY)
          setTimeout(() => {
            emptyInput[i].classList.remove(passReset.IS_EMPTY)
          }, 400);
        })
      } else {
        let pass1 = arr[0].value, pass2 = arr[1].value
        if (pass1 === pass2) {
          return true
        } else {
          return false
        }
      }

    }
  },
  showError: function (text = 'Something went wrong...') {
    this.error.html(text)
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 1, transform: 'translateX(-50%) translateY(0px)' })
  },
  hideError: function () {
    Object.assign(this.error[0].style, { color: '#c02942', opacity: 0, transform: 'translateX(-50%) translateY(14px)' })
  },
  successError: function (text = 'Passwords match!') {
    this.error.html(text)
    Object.assign(this.error[0].style, { color: '#088d7b', opacity: 1, transform: 'translateX(-50%) translateY(0px)' })
  }
}
/* #endregion */


/* #region Sirv */
let sirvTimer
const sirvCards = {
  visibleClass: 'is-visible',
  init: function () {
    this.cacheDOM()
    this.bindEvents()
  },
  cacheDOM: function () {
    this.cards = $('.product-card')
  },
  bindEvents: function () {
    if (this.cards) {
      this.cards.on('mouseenter mouseleave touchstart touchend', function (e) {
        switch (e.type) {

          case 'touchstart':
            sirvCards.toggleSirv($(this), 1)
            break;

          case 'touchend':
            sirvCards.toggleSirv($(this), 0)
            break;
          case 'mouseenter':
            sirvCards.toggleSirv($(this), 1)
            break;
          case 'mouseleave':
            sirvCards.toggleSirv($(this), 0)
            break;
        }
      })
    }
  },
  toggleSirv: function ($this, state) {
    let sirv = $this.find('.product-picture_sirv')
    if (sirv.length !== 0) {
      let id = sirv.find('.Sirv').attr('id')
      if (state !== 0) {
        sirv.show()
        setTimeout(() => {
          sirv.addClass(this.visibleClass)
        }, 1);
        Sirv.instance(id).play()
      } else {
        Sirv.instance(id).pause()
        sirv.removeClass(this.visibleClass)
        sirvTimer = window.setTimeout(function () {
          sirv.hide()
        }, 300)
      }
    }
  }
}
/* #endregion */


/* #region  Blog Page */
const blogPage = {
  init: function () {
    Object.values(this.initFn).forEach((fn) => {
      if (typeof fn === 'function') {
        try { fn() }
        catch { console.log('blog JS ERR') }
      }
    })
  },
  initFn: {
    attachCommentSubmit: () => {
      const commentArea = document.querySelector('[data-article="commentArea"]')
      const commentSubmit = document.querySelector('[data-article="commentSubmit"]')
      const holder = document.querySelector('.article__comments-wrap')

      if (commentArea !== null && commentSubmit !== null) {
        const submit = () => {
          const
            val = commentArea.value
          if (val.length !== 0) {
            const
              user = 'Guets',
              date = new Date().toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" }),
              html = `
              <div class="article-comment"><span>${user}</span><span>${val}</span><span>${date}</span></div>
              `

            holder.insertAdjacentHTML("beforeend", html)
            commentArea.value = ''
          }
        }

        commentSubmit.onclick = () => {
          submit()
        }

        commentArea.onkeydown = (e) => {
          const isEnter = e.key === 'Enter' || e.keyCode === 13
          if (isEnter) {
            e.preventDefault()
            submit()
          }
        }
      }
    },
    createProgressBar: () => {
      const readContent = document.querySelector('.article__read-content')
      if (!readContent) return
      let y = 0
      let fullHeight = (readContent.getBoundingClientRect().bottom + 120) - (window.innerHeight * 0.7)
      const calculatePercentage = (number, total) => {
        return (number / total) * 100
      }
      const setElementWidthPercent = (el, percent) => {
        el.style.width = `${percent}%`
      }

      const
        bar = document.createElement('div'),
        progress = document.createElement('div')

      bar.className = 'blog-progress'
      bar.appendChild(progress)

      document.body.appendChild(bar)

      window.onscroll = () => {
        y = window.scrollY
        let f = calculatePercentage(y, fullHeight)
        setElementWidthPercent(progress, f)
      }
    },
    setReadingTime: () => {
      const
        readContent = document.querySelector('.article__read-content'),
        timeEl = document.querySelector('.read-time')
      if (!readContent || !timeEl) return

      const
        wordsPerMinute = 200,
        textContent = readContent.textContent,
        wordCount = textContent.split(/\s/g).length,
        readingTime = Math.ceil(wordCount / wordsPerMinute)


      timeEl.textContent = `${readingTime} min reading`
    },
    attachScroll: () => {
      return
      const img = document.querySelector('.article-top-cover img')
      if (img !== null) {
        let max = img.offsetHeight + 100
        window.onscroll = () => {
          let y = window.scrollY
          if (max > y) {
            let f = 1 - (y * 100 / max * 0.01)
            img.style.marginTop = `-${y * 0.08}px`
            img.style.opacity = f
          }
        }
      }
    }
  }
}
/* #endregion */


/* #region  Page Review */
const pageReview = {
  init: function () {
    if (document.querySelector('.page-reviews.splide') !== null) {
      this.initSplide()
    }
  },
  initSplide: function () {
    try {
      let main = new Splide('.page-reviews', {
        type: "slider",
        perPage: 2.2,
        perMove: 1,
        autoplay: 0,
        pauseOnHover: 1,
        pauseOnFocus: 1,
        gap: 12,
        arrows: 1,
        pagination: 1,
        speed: 500,
        breakpoints: {
          991: {
            perPage: 1.2
          }
        }
      })
      main.mount()
    } catch {
      console.log('Page Review SPLIDE ERR')
    }
  }
}
/* #endregion */


/* #region  Hero Splides */
const heroSplide = {
  init: function () {
    try {
      this.initSplide()
    } catch (err) {
      console.log(err.message)
    }
  },
  initSplide: function () {
    const heroSplide = [...document.querySelectorAll('.hero_splide')]
    if (heroSplide.length !== 0) {
      heroSplide.forEach((slide) => {
        let slider = new Splide(slide, {
          type: "slider",
          perPage: 4,
          perMove: 2,
          autoplay: 0,
          gap: "12px",
          arrows: 1,
          pagination: 0,
          speed: 750,
          breakpoints: {
            991: { perPage: 2.5, },
            767: { perPage: 2, perMove: 1 },
            478: { perPage: 1.4, perMove: 1, gap: 8 }
          }
        })
        slider.mount()
      })
    }
  }
}
/* #endregion */

const initPageObjects = () => {
  const objArr = [
    header,
    menu,
    pgFilter,
    cartModal,
    currencyModal,
    pageBanner,
    homePageSplide,
    pgModal,
    productPage,
    // filterModal,
    footer,
    pageEls,
    myBag,
    account,
    locationPage,
    pageAlerts,
    sellPage,
    bookModal,
    passReset,
    sirvCards,
    pageReview,
    blogPage,
    heroSplide
  ];

  for (let i = 0; i < objArr.length; i++) {
    const obj = objArr[i];
    try {
      obj;
      if (typeof obj.init === "function" && typeof obj.init !== undefined) {
        obj.init();
      }
    } catch (error) {
      console.log(error)
    }
  }
};

function initProductZoom() {
  const isDesktop = window.innerWidth > 991
  window.removeSlider = (target) => {
    unlockScroll()
    const slider = target.closest('.zoom_slider'); slider.css({ opacity: 0 })
    setTimeout(() => { slider.hide() }, 400);
  }

  const setDesktopZoom = () => {
    [...document.querySelectorAll('.product-media-img')].reduce((acc, el) => {
      if (el && el !== null) {
        if (!/(placeholder|store|pay)/gi.test(el.getAttribute('src'))) {
          acc.push($(el).parent('.product-media__inner-wrap'))
        }
      }
      return acc
    }, []).forEach((el) => {
      $(el).zoom({ magnify: 1.9, on: 'click' })
      $(el).on('mouseleave', function () { $(document).trigger('click') })
    })
  }

  const setMobileZoom = () => {
    const sliders = [...document.querySelectorAll('.product-slider')] // Get all existing sliders

    sliders.forEach((slider, index) => {
      const button = $('<button/>', { class: `product__zoom-btn zoom_btn${index}` }); button.appendTo($(slider)) // Create & append zoom button
      const renderNewSlider = (slider, index) => { // Get HTML new zoom slider
        let mediaArr = [...slider.querySelectorAll('img')].reduce((acc, img) => {
          const src = img.getAttribute('src')
          if (!acc.includes(src) && !/(placeholder|store|pay)/gi.test(src)) { acc.push(src) }
          return acc
        }, []).sort()

        this.renderMedia = () => {
          return mediaArr.reduce((acc, src) => {
            acc += `<div class="splide__slide"><img src="${src}"></div>`
            return acc
          }, '')
        }

        return `
        <div class="zoom_slider zsl${index}">
          <div>
            <div class="zoom_slider_logo"><img src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}"></div>
            <button class="zoom_slider-close" onclick="removeSlider($(this))"></button>
            <div class="zoom-sl${index} splide">
              <div class="splide__track">
                <div class="splide__list">
                ${this.renderMedia()}
                </div>
              </div>
              <div class="splide__arrows">
                <div class="splide__arrow--prev"></div>
                <div class="splide__arrow--next"></div>
              </div>
            </div>
          </div>
        </div>`
      }
      const appendNewSlider = (html) => { $body.append(html) } // Append Zoom Slider
      const initNewSlider = (index) => { // Splide Initialization
        this.settings = {
          type: "loop",
          perPage: 1,
          perMove: 1,
          autoplay: 0,
          gap: "12px",
          arrows: 1,
          pagination: 0,
          speed: 800,
          drag: false,
          dragAngleThreshold: 0
        }
        const zoomSlider = new Splide(`.zoom-sl${index}`, this.settings);
        zoomSlider.mount()
      }
      const initZoom = (index) => { // Initialize jQuery zoom for the new slider
        let slides = [...document.querySelector(`.zoom_slider.zsl${index}`).querySelectorAll('.splide__slide')]
        slides.forEach((slide) => {
          $(slide).zoom({
            magnify: 1.4,
            onZoomIn: function () {
              $(this).closest('.splide').css('border-color', '#e6eaec')
            },
            onZoomOut: function () {
              $(this).closest('.splide').css('border-color', '#0095c6')
            }
          })
        })
      }
      const showNewSlider = (index) => {
        let localSlider = $(`.zoom_slider.zsl${index}`)
        if (localSlider) { localSlider.show(); lockScroll(); setTimeout(() => { localSlider.css({ opacity: 1 }) }, 1); }
      }
      const openSlider = (index) => {
        let slider = $(`.zoom_slider.zsl${index}`)
        if (slider) { slider.show(); lockScroll(); setTimeout(() => { slider.css({ opacity: 1 }) }, 1); }
      }

      button.click(() => {
        const localSlider = document.querySelector(`.zoom_slider.zsl${index}`)
        if (!localSlider) {
          appendNewSlider(renderNewSlider(slider, index))
          initNewSlider(index)
          initZoom(index)
          showNewSlider(index)
        } else {
          openSlider(index)
        }
      })
    })
  }

  const setZoom = () => {
    $(document).ready(function () {
      if (document.querySelector('.main_product_zoom') == null) {
        if (isDesktop && $('.main_product').length) { setDesktopZoom() } else {
          setMobileZoom()
        }
      }
    })
  }

  return setZoom()
}

function initTestProductZoom() {
  let zoomOpenCount = 0

  const setZoom = () => {
    const
      srcIsValid = (src) => {
        return !/(placeholder|store|pay)/gi.test(src)
      },
      filterMedia = (arr) => {
        return arr.reduce((acc, media) => {
          const
            img = media.querySelector('img'),
            thumbAncestor = media.closest('.product-slider_thumbnails'),
            zoomAncestor = media.closest('.zoom-modal')

          if (img && img !== null && thumbAncestor == null && zoomAncestor == null) {
            const src = img.getAttribute('src')
            if (srcIsValid(src)) { acc.push(media) }
          }
          return acc
        }, [])
      },
      getSrcArr = (arr) => {
        return arr.reduce((acc, media) => {
          const img = media.querySelector('img')
          if (img !== null) {
            if (img.hasAttribute('src')) {
              const src = img.getAttribute('src')
              if (srcIsValid(src) && !acc.includes(src)) { acc.push(src) }
            }
          }
          return acc
        }, [])
      },
      renderSlidesHTML = (srcArr) => {
        return srcArr.reduce((acc, src) => {
          acc += `<div style="cursor: zoom-in" class="zoom-modal__slide splide__slide"><img loading="eager" alt="" src="${src}"></div>`
          return acc
        }, '')
      },
      renderSplideHTML = (slidesHTML) => {
        let productTitle = $('.product__item-title').html(),
          price = $('.product__item-price').eq(-1).html()
        return `
      <div class="zoom-modal splide">
        <button data-evt="closeZoomModal" class="zoom-modal__close-btn"></button>
        <div class="zoom-modal__holder">
          <div class="splide__arrows">
            <div class="splide__arrow--prev"></div>
            <div class="splide__arrow--next"></div>
          </div>
          <div class="zoom-modal__header">
            <img src="${String.raw`\themes\default\frontend\oct-2023/assets/logo.svg`}" loading="lazy" alt="">
            <img style="display: none" src="${String.raw`./assets/logo.svg`}" loading="lazy" alt="">
          </div>
          <div class="zoom-modal__footer">
            <h1 class="zoom-modal__name">${productTitle}</h1>
            <a href="javascript:void(0)" data-evt="closeZoomModal" class="zoom-modal__buy-btn" onclick="addToCart()">Add To Cart<span>${price} USD</span></a>
          </div>
          <div class="zoom-modal__slider">
            <div class="splide__track">
              <div class="splide__list">
                ${slidesHTML}
              </div>
            </div>
          </div>
        </div>
      </div>
      `
      },
      initZoomSlider = (indexToGo = 0) => {
        const
          settings = {
            type: "loop",
            perPage: 1,
            perMove: 1,
            autoplay: 0,
            gap: "12px",
            arrows: 1,
            pagination: 0,
            speed: 800,
            drag: false,
            dragAngleThreshold: 0
          },
          slider = document.querySelector('.zoom-modal')
        if (slider !== null) {
          const zoomSlider = new Splide('.zoom-modal', settings);
          zoomSlider.mount()
          zoomSlider.go(indexToGo)
        }
      },
      initPressZoom = (slider) => {
        const slides = [...slider.querySelectorAll('.splide__slide')],
          zoomValue = window.innerWidth > 479 ? 2.2 : 1.6
        slides.forEach((slide) => {
          $(slide).zoom({
            magnify: zoomValue,
            on: 'grab',
            onZoomIn: function () {
              $('.zoom-modal .splide__arrows').css({ opacity: 0 })
              $('.zoom-hint').css({ opacity: 0 })
            },
            onZoomOut: function () {
              $('.zoom-modal .splide__arrows').css({ opacity: 1 })
            }
          })
        })
      }

    const mediaArr = filterMedia([...document.querySelectorAll('.product-media')])

    mediaArr.forEach((el) => {
      el.onclick = () => {
        lockScroll()
        try {
          const
            sibSrcArr = getSrcArr(filterMedia([...el.parentNode.closest('div').querySelectorAll('.product-media')])),
            splideHTML = renderSplideHTML(renderSlidesHTML(sibSrcArr))

          $body.append(splideHTML)
          initZoomSlider(sibSrcArr.indexOf(el.querySelector('img').getAttribute('src')))

          let zoomModal = document.querySelector('.zoom-modal'),
            holder = zoomModal.querySelector('.zoom-modal__holder')
          initPressZoom(zoomModal)

          let zoomHint = $('<\div>', { class: 'zoom-hint' })

          setTimeout(() => {
            zoomModal.style.opacity = 1
            if (zoomOpenCount <= 1) { $(holder).append(zoomHint); setTimeout(() => { zoomHint.css({ opacity: 1 }) }, 500) }
          }, 1);

          zoomModal.addEventListener('mousedown', () => {
            zoomHint.css({ opacity: 0 });
            setTimeout(() => {
              zoomHint.remove()
            }, 450)
          })
          document.onkeydown = (e) => {
            e = e || window.event
            let isEsc = false
            if ('key' in e) {
              isEsc = (e.key === "Escape" || e.key === "Esc");
            } else {
              isEsc = (e.keyCode === 27);
            }
            if (isEsc) {
              e.preventDefault()
              unlockScroll()
              let modal = $('.zoom-modal')
              if (modal.length) {
                modal.css({ opacity: 0 })
                setTimeout(() => {
                  modal.remove()
                }, getTransitionTime(modal));
              }
            }
          }
          zoomOpenCount++
        } catch {
          throw new Error('JS : Init Product Zoom Error')
        }
      }
    })

    $(document).on('click', '[data-evt="closeZoomModal"]', function () {
      unlockScroll()
      let modal = $('.zoom-modal')
      if (modal.length) {
        modal.css({ opacity: 0 })
        setTimeout(() => {
          modal.remove()
        }, getTransitionTime(modal));
      }
    })
  }

  if (document.querySelector('.main_product_zoom') !== null) { setZoom() }
}

initTestProductZoom()


function attachStickyScroll() {
  const bar = $('.filter-sidebar'), overlay = $('.filter-sidebar__overlay')
  if (bar.length && overlay.length) {
    const els = bar.find('.filter-row')
    $.each(els, function (i) {
      els[i].onclick = () => {
        let cont = $(this).find('.filter-row__container')
        setTimeout(() => {
          let currentHeight = bar.height()
          let scrollHeight = bar[0].scrollHeight
          if ((currentHeight - scrollHeight) <= -5) {
            overlay.css({ opacity: 1 })
          } else {
            overlay.css({ opacity: 0 })
          }
        }, getTransitionTime(cont));
      }
    })
    bar[0].addEventListener('scroll', function (e) {
      if (this.scrollTop + this.clientHeight >= this.scrollHeight) {
        overlay.css({ opacity: 0 })
      } else { overlay.css({ opacity: 1 }) }
    })
  }
}

const mailModal = new Object({
  init: function () {
    this.renderDOM()
    if (this.modal.length) {
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.modal = $('.mail-modal')
    this.backdrop = $('.mail-modal__backdrop')
    this.container = $('.mail-modal__container')
    this.evtClose = $('[data-mail-modal="close"]')
  },
  bindEvents: function () {
    this.evtClose.on('click', function () { mailModal.close() })
  },
  open: function () {
    lockScroll()
    this.modal.show()
    this.modal.find('input').focus()
    setTimeout(() => {
      this.backdrop.css({ opacity: 1 })
      this.container.css({ transform: 'translateY(0px)', opacity: 1 })
    }, 2);
  },
  close: function () {
    unlockScroll()
    this.backdrop.css({ opacity: 0 })
    this.container.css({ transform: 'translateY(42px)', opacity: 0 })
    setTimeout(() => {
      this.modal.hide()
    }, getTransitionTime(this.container));
  }
})

const bfsModal = new Object({
  transitionTime: () => { return getTransitionTime(bfsModal._) },
  init: function () {
    this.renderDOM()
    if (this._.length && this._ !== null) {
      this.attachEvents()
    }
  },
  renderDOM: function () {
    this._ = $('.bfs-modal')
    this.evtClose = $('[data-evt="closeBfsModal"]')
  },
  attachEvents: function () {
    this.evtClose.click(function (e) {
      bfsModal.close()
    })
  },
  open: function () {
    if (this._.length) {
      lockScroll()
      this._.show()
      setTimeout(() => {
        this._.css({ opacity: 1 })
      }, 1);
    }
  },
  close: function () {
    if (this._.length) {
      unlockScroll()
      this._.css({ opacity: 0 })
      setTimeout(() => {
        this._.hide()
      }, this.transitionTime());
    }
  }
})

const quizModal = {
  currentStep: undefined,
  isFinished: undefined,
  pollLength: undefined,
  maxStep: undefined,
  isInitialized: undefined,
  init: function () {
    this.renderDOM()
    this.setInitial()
    this.bindEvents()
  },
  renderDOM: function () {
    this.modal = $('.quiz-modal')
    this.container = this.modal.find('.quiz-container')
    this.backdrop = this.modal.find('.quiz-modal__backdrop')
    this.heightContainer = this.modal.find('.quiz-container-height')
    this.poll = this.modal.find('.quiz-poll')
    this.pollArr = [...this.poll]
    this.answers = this.modal.find('.quiz-answer')
    this.fullStepText = this.modal.find('.quiz-step-text')
    this.currentStepText = this.modal.find('.quiz-current-step')
    this.maxStepText = this.modal.find('.quiz-max-step')
    this.bar = this.modal.find('.quiz-bar')
    this.evtGoNext = $('[data-evt="quizGoNext"]')
    this.evtOpen = $('[data-evt="openQuizModal"]')
    this.closeBtn = $('[data-evt="closeQuizModal"]')
  },
  bindEvents: function () {
    this.evtGoNext.click(function () {
      quizModal.goNextStep()
    })
    this.closeBtn.click(function () {
      quizModal.close()
    })
    this.evtOpen.click(function () {
      quizModal.open()
    })
  },
  setInitial: function () {
    this.currentStep = 1, this.isFinished = false, this.pollLength = this.pollArr.length, this.maxStep = this.pollLength
    if (this.pollLength !== 0 && this.pollLength !== undefined && this.isInitialized !== true) {
      this.isInitialized = true
      quizModal.currentStepText.html(quizModal.currentStep)
      quizModal.maxStepText.html(quizModal.maxStep)
      this.modal.find('input[type="radio"]').prop('checked', false); this.evtGoNext.html('Next')
      // Object.assign(this.heightContainer[0].style, { height: `${this.getObjectScrollHeight(this.pollArr[0])}` })
      Object.assign(this.bar[0].style, { width: `${(100 / this.pollLength)}%` })
    } else {
      return false
    }
  },
  // utils
  getObjectScrollHeight: function (obj) {
    if (obj instanceof jQuery) {
      return `${obj[0].scrollHeight}px`
    } else {
      return `${obj.scrollHeight}px`
    }
  },
  noEmptyAnswers: function () {
    let parent = $(quizModal.pollArr[(quizModal.currentStep - 1)]),
      checkedRadio = parent.find('input[type="radio"]:checked'),
      answers = parent.find(quizModal.answers)
    if (checkedRadio.length == 0) {
      answers.css({ opacity: '0.3' }); setTimeout(() => { answers.css({ opacity: 1 }) }, 375);
    } else {
      return true
    }
  },
  goNextStep() {
    if (quizModal.currentStep !== quizModal.maxStep) {
      if (quizModal.noEmptyAnswers()) {
        Object.assign(quizModal.pollArr[(quizModal.currentStep - 1)].style, { opacity: 0 })
        Object.assign(quizModal.bar[0].style, { width: `${(100 / quizModal.pollLength) * (quizModal.currentStep + 1)}%` })
        $.each(quizModal.pollArr, function (i) {
          Object.assign(quizModal.pollArr[i].style, { transform: `translateX(-${(quizModal.currentStep * 100)}%)` })
        })
        Object.assign(quizModal.heightContainer[0].style, { height: `${quizModal.pollArr[quizModal.currentStep].scrollHeight}px` })
        ++quizModal.currentStep
        quizModal.currentStepText.html(quizModal.currentStep)
        if (quizModal.currentStep == quizModal.maxStep) {
          quizModal.evtGoNext.html('Show Results')
        }
      }
    } else {
      if (quizModal.noEmptyAnswers()) {
        Object.assign(quizModal.heightContainer[0].style, { height: '0px' })
        Object.assign(quizModal.bar[0].style, { width: '5%' })
        $.each(quizModal.pollArr, function (i) {
          Object.assign(quizModal.pollArr[i].style, { transform: `translateX(-${(quizModal.currentStep * 100)}%)` })
        })
        Object.assign(quizModal.pollArr[(quizModal.currentStep - 1)].style, { opacity: 0 })
        quizModal.evtGoNext.prop('disabled', true)
        quizModal.fullStepText.text('FINDING WATCHES')
        $('.quiz-close-btn').remove()
        quizModal.isFinished = true
        setTimeout(() => {
          quizModal.bar.animate({ width: '100%' }, 3000, function () { quizModal.close() })
        }, 600);
      }
    }
  },
  open: function () {
    lockScroll()
    quizModal.modal.show()
    Object.assign(this.heightContainer[0].style, { height: `${this.getObjectScrollHeight(this.pollArr[quizModal.currentStep - 1])}` })
    setTimeout(() => {
      Object.assign(quizModal.backdrop[0].style, { opacity: 1 })
      Object.assign(quizModal.container[0].style, { transform: 'translateY(0px)', opacity: 1 })
    }, 1);
  },
  close: function () {
    unlockScroll()
    let timeToHide = (parseFloat(window.getComputedStyle(quizModal.backdrop[0]).transitionDuration) * 1000)
    Object.assign(quizModal.backdrop[0].style, { opacity: 0 })
    Object.assign(quizModal.container[0].style, { transform: 'translateY(32px)', opacity: 0 })
    setTimeout(() => {
      quizModal.modal.hide()
    }, timeToHide);
  }
}

function toggleAdminBar() {
  let bar = document.querySelector('.iba-toolbar')
  if (bar && bar !== null) {
    if (bar.classList.contains(IS_MINIMIZED)) {
      bar.classList.remove(IS_MINIMIZED)
    } else {
      bar.classList.add(IS_MINIMIZED)
    }
  }
}

const attachCheckoutCopy = () => {
  const btnArr = [...document.querySelectorAll('.crypto-how-btn'), ...document.querySelectorAll('.copy-address-btn')]
  if (btnArr.length) {
    btnArr.forEach((btn) => {
      btn.onclick = () => {
        if (!window.getSelection().toString()) {
          let details = btn.closest('.checkout-form__radio-details')
          if (details !== null) {
            let address = details.querySelector('.copy-address-btn__typo').innerHTML
            async function copyAddress() {
              try {
                await navigator.clipboard.writeText(address);
                details.classList.add(IS_COPIED)
                setTimeout(() => {
                  details.classList.remove(IS_COPIED)
                }, 1300);
              } catch (err) {
                details.classList.remove(IS_COPIED, IS_ERROR)
                setTimeout(() => {
                  details.classList.remove(IS_COPIED, IS_ERROR)
                }, 2100);
              }
            }
            copyAddress()
          }
        }
      }
    })
  }
}

const salesModal = {
  init: function () {
    this.renderDOM()
    if (this.modal.length) {
      this.bindEvents()
    }
  },
  renderDOM: function () {
    this.modal = $('.sale-history-modal')
    this.container = $('.sale-history__container')
    this.evtClose = $('[data-evt="closeSalesModal"]')
  },
  bindEvents: function () {
    this.evtClose.click(function () {
      salesModal.close()
    })
  },
  open: function () {
    window.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault()
        salesModal.close()
      }
    }, { once: true })
    lockScroll()
    this.modal.show()
    setTimeout(() => {
      this.modal.css({ 'background-color': "rgba(13, 16, 26, .7)" })
      this.container.css({ 'transform': 'translateX(0%)' })
    }, 1);
  },
  close: function () {
    unlockScroll()
    this.modal.css({ 'background-color': "rgba(13, 16, 26, 0)" })
    this.container.css({ 'transform': 'translateX(100%)' })
    setTimeout(() => {
      this.modal.hide()
    }, getTransitionTime(this.modal));
  }
}

const formPage = new Object({
  uploadedImages: [],
  init: function () {
    if (document.querySelector('.main_formpage')) {
      this.bindEvents()
      // this.imgUpload()
      this.attachImagesUploader()
      this.attachWatchesUpload()
    }
  },
  bindEvents: function () {
    $('.formpage__upload-btn').click(function () {
      if ($('#image_upload').length) { $('#image_upload').trigger('click') }
    })
    // $('#formpage_form').on('submit', function (e) {
    //   e.preventDefault();
    //   formPage.submitAjax();
    // });
  },
  submitAjax: function () { },
  attachImagesUploader: () => {
    const uploadLabel = document.querySelector('#formpage_img-uploader'),
      uploadInput = document.querySelector('#image_upload'),
      imagesWrap = $('.formpage__images-thumbnails')

    // Setting drag&drop event
    if (uploadLabel !== null) {
      uploadLabel.ondragover = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.add(IS_ACTIVE)
      }
      uploadLabel.ondragleave = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
      }
      uploadLabel.ondrop = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
        $('#image_upload').prop('files', evt.dataTransfer.files);
        const files = [], items = [...evt.dataTransfer.items]
        items.forEach((item, i) => {
          if (item.kind === 'file') {
            files.push(item.getAsFile())
          }
        })
        if (files.length) {
          $('.formpage__images-thumbnails').empty()
        }
        processFiles([...files])
      }
    }

    // Setting manual files upload
    if (uploadInput !== null) {
      uploadInput.onchange = (evt) => {
        const files = [...evt.target.files]
        $('.formpage__images-thumbnails').empty()
        processFiles(files)
      }
    }

    function processFiles(files) {
      if (files.length) {
        files.forEach((file, i) => {
          if (!file.type.match('image.*')) { return }

          let getIndex = () => {
            return $('.formpage__upload').length + 1
          }

          let reader = new FileReader()
          reader.onload = function (e) {
            let html =
              `
               <div class="formpage__upload" data-img-id="${getIndex()}">
                 <div class="formpage__input-boxes">
                   <div>
                     <input value="1" name="visible_image_${i}" id="image_${i + 1}" type="checkbox" checked>
                     <label for="image_${getIndex()}"></label>
                   </div>
                 </div>
                   <div data-name="${file.name}" style="background-image: url(${e.target.result})" class="formpage__upload-bg">
                 </div>
               </div>
             `
            imagesWrap.append(html)
          }
          reader.readAsDataURL(file)
        })
      }
    }

    // Setting checkbox toggle on appended images
    $body.on('click', ".formpage__upload-bg", function () {
      lockScroll()
      let html =
        `
      <div class="formpage-zoom">
        <div data-evt="closeFormpageZoom"></div>
        <div data-block="formpageZoom"></div>
      </div>
      `
      $body.append(html)
      $('[data-block="formpageZoom"]').attr('style', $(this).attr('style'))
    });
    $body.on('click', '[data-evt="closeFormpageZoom"]', function () {
      unlockScroll()
      $('.formpage-zoom').remove()
    })
  },
  attachWatchesUpload: () => {
    const container = document.querySelector('#watches_upload_label'),
      input = document.querySelector('#watches_upload')

    container.addEventListener("dragover", (e) => {
      e.preventDefault()
    }, false)

    container.addEventListener("dragenter", () => {
      container.classList.add(__ACTIVE)
    })

    container.addEventListener("dragleave", () => {
      container.classList.remove(__ACTIVE)
    })

    container.addEventListener("drop", (e) => {
      e.preventDefault()
      container.classList.remove(__ACTIVE)
      input.files = e.dataTransfer.files
    })
  }
})

const adjustStickyEls = () => {
  const elsArr = [...document.querySelectorAll('.filter-sidebar.to-stick'), ...document.querySelectorAll('.sticky-filters')]
  const header = document.querySelector('.header')

  if (elsArr.length && header) {
    function adjust() {
      let headerHeight = parseInt(window.getComputedStyle(header).getPropertyValue('height'))
      elsArr.forEach((el) => {
        let topValue = $(window).width() > 991 ? headerHeight + 24 : headerHeight
        Object.assign(el.style, { top: `${topValue}px` })
      })
    }
    ['load', 'resize'].forEach((event) => { window.addEventListener(event, () => { adjust() }) })
  }
}

function testProductSplide() {
  if (document.querySelector('.slider-viewer__main') !== null) {
    let main = new Splide('.slider-viewer__main', {
      type: "slide",
      perPage: 1,
      perMove: 1,
      autoplay: false,
      pauseOnHover: true,
      pauseOnFocus: true,
      gap: 0,
      arrows: true,
      pagination: false,
      speed: 750,
      breakpoints: {
        478: {
          perPage: 1,
          perMove: 1,
        },
      },
    });
    let thumb = new Splide('.slider-viewer__thumbs', {
      fixedWidth: 70,
      fixedHeight: 70,
      gap: 8,
      rewind: true,
      pagination: false,
      arrows: false,
      cover: true,
      isNavigation: true,
    });
    main.sync(thumb);
    main.mount();
    thumb.mount();
  }
}
testProductSplide()

const tagPreview = {
  init: function () {
    try {
      if (document.querySelector('.main_print-tag') !== null) {
        this.resetOutput()
        this.attachInput()
        this.attachImageUploader()
        this.attachPreviewControls()
      }
    } catch {
      console.log('TAG PREVIEW ERR')
    }
  },
  resetOutput: function () {
    const outputHolder = document.querySelector('.tag-preview__output'),
      outputImage = document.querySelector('.tag-preview__pic')
    outputHolder.innerHTML = ''
    outputHolder.classList.add(IS_EMPTY)
    outputImage.classList.add(IS_EMPTY)
  },
  attachInput: function () {
    const outputObj = new Object(),
      inputs = [...document.querySelectorAll('input[type="text"].formpage__input')],
      outputHolder = document.querySelector('.tag-preview__output'),
      updateOutput = () => {
        let filled = 0, html = ``
        for (const key in outputObj) {
          if (outputObj.hasOwnProperty(key)) {
            const obj = outputObj[key]
            if (obj.value.length !== 0) {
              ++filled
              html += `
                <div id="${obj.id}" class="tag-output-row">
                  <span>${obj.title}</span>
                  <span>${obj.value}</span>
                </div>
                `
            }
          }
        }
        if (filled !== 0) {
          outputHolder.innerHTML = html
          outputHolder.classList.remove(IS_EMPTY)
        } else {
          outputHolder.innerHTML = ''
          outputHolder.classList.add(IS_EMPTY)
        }
      }

    inputs.forEach((input, index) => {
      outputObj[index] = {
        id: input.id,
        value: '',
        title: input.closest('.formpage__input-box').querySelector('label').innerHTML
      }

      input.oninput = () => {
        outputObj[index].value = input.value || ''
        updateOutput()
      }
      input.onkeydown = (e) => {
        const
          isEnter = e.key === 'Enter' || e.keyCode === 13,
          isBackscape = e.key === 'Backspace' || e.key === 'Delete',
          isEsc = e.key === 'Escape' || e.key === 'Esc',
          isUp = e.key === 'ArrowUp',
          isDown = e.key === 'ArrowDown',
          next = inputs[index + 1],
          prev = inputs[index - 1]

        if (isEnter || isDown) {
          if (next !== undefined) { next.focus() }
        }
        if (isBackscape) {
          if (input.value.length == 0 && prev !== undefined) { prev.focus() }
        }
        if (isEsc) {
          e.preventDefault(); input.blur()
        }
        if (isUp) {
          if (prev !== undefined) { prev.focus() }
        }
      }
      ['focus', 'blur'].forEach((ev) => {
        if (window.innerWidth <= 479) {
          const label = input.closest('.formpage__input-box').querySelector('label')
          input.addEventListener(ev, function () {
            switch (ev) {
              case 'focus':
                label.style.opacity = 0
                break;
              case 'blur':
                if (input.value.length !== 0) { label.style.opacity = 0 } else {
                  label.style.opacity = 0.5
                }
                break;
            }
          })
        }
      })

    })
  },
  attachImageUploader: function () {
    const uploadLabel = document.querySelector('#printTag_uploader'),
      uploadInput = document.querySelector('#image_upload_tag'),
      imgPreview = document.querySelector('.tag-preview__pic')

    // DRAG & DROP
    if (uploadLabel !== null) {
      uploadLabel.ondragover = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.add(IS_ACTIVE)
      }
      uploadLabel.ondragleave = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
      }
      uploadLabel.ondrop = (evt) => {
        evt.preventDefault()
        uploadLabel.classList.remove(IS_ACTIVE)
        $('#image_upload_tag').prop('files', evt.dataTransfer.files);
        const files = [...evt.dataTransfer.items],
          file = files.find((item) => { if (item.kind === 'file') { return item } })
        processImage(file.getAsFile())
      }

      // MANUAL
      if (uploadInput !== null) {
        uploadInput.onchange = (evt) => {
          const file = [...evt.target.files][0]
          processImage(file)
          uploadInput.value = ''
        }
      }

      // PROCESS IMAGE
      function processImage(file) {
        if (file) {
          let reader = new FileReader()
          reader.onload = (e) => {
            imgPreview.classList.remove(IS_EMPTY)
            imgPreview.style.backgroundImage = `url(${e.target.result})`
          }
          reader.readAsDataURL(file)
        }
      }

    }
  },
  attachPreviewControls: function () {
    const modal = document.querySelector('.tag-preview-modal')
    if (modal !== null) {
      const holder = document.querySelector('.tag-preview-modal__wrapper')
      const toggle = () => {
        let displayed = window.getComputedStyle(modal).getPropertyValue('display') !== 'none'
        if (displayed) {
          unlockScroll()
          const preview = holder.querySelector('.formpage__tag-preview')
          if (preview !== null) { preview.remove() }
          modal.style.display = 'none'
        } else {
          lockScroll()
          const preview = document.querySelector('.formpage__tag-preview')
          holder.appendChild(preview.cloneNode(true))
          modal.style.display = 'block'
        }
      }

      document.addEventListener('click', function (e) {
        const target = e.target
        if (target.getAttribute('data-evt') == 'togglePrintTagPreview') {
          toggle()
        }
      })
    }
  }
}

const bindCardFav = () => {
  const buttons = document.querySelectorAll('.card-item-fav')
  buttons.forEach(btn => btn.onclick = () => {
    if (btn.classList.contains(IS_ACTIVE)) {
      btn.classList.remove(IS_ACTIVE)
    } else {
      btn.classList.add(IS_ACTIVE)
    }
  })
}

bindCardFav()

document.addEventListener("DOMContentLoaded", function () {
  setPageFilters()
  homepageCategoriesSlider.init()
  initPageObjects();
  initTelInput();
  initProductZoom()
  attachStickyScroll()
  attachCheckoutCopy()
  attachPayModal()
  adjustStickyEls()
  mailModal.init()
  bfsModal.init()
  quizModal.init()
  salesModal.init()
  formPage.init()
  tagPreview.init()
});


/**
 * Edit Article Page
 * {@category Blog}
 * {@page add-blog.twig}
 */
var EditArticle = function (articleContent, options) {
  articleContent = document.querySelector(`.${articleContent}`)
  if (!articleContent) {
    showMessage('error', 'Article content not found, ECA-1')
    throw new Error(`EditArticle ERROR : articleContent is required : ${articleContent}`)
  }
  this.articleContent = articleContent
  this.loremMd = shortLoremText
  this.loremMd = mediumLoremText
  var options = options || {
    setInitialLayout: true
  }

  /**
   * 
   * Utils
   * 
   */
  function toArray(value) {
    return Array.isArray(value) ? value : [value];
  }

  function bind(targets, events, callback) {
    for (const target of toArray(targets)) {
      for (const event of toArray(events)) {
        target.addEventListener(event, callback)
      }
    }
  }

  function append(parent, ...childs) {
    for (const child of childs) {
      parent.appendChild(child)
    }
  }

  function prepend(parent, ...childs) {
    for (const child of childs) {
      parent.insertBefore(child, parent.firstChild)
    }
  }

  function hide(...targets) {
    for (const target of toArray(targets)) {
      target.style.display = 'none'
    }
  }

  function show(...targets) {
    for (const target of toArray(targets)) {
      target.style.display = 'block'
    }
  }

  function error(text, errCode) {
    errCode = errCode || 'Undefined'
    text = text || 'Undefined'
    const els = document.querySelectorAll('.edit-article-error')
    const offset = els.length
    const error = createElem('div', {
      className: 'edit-article-error',
      innerHTML: `
        <span>ERR CODE: ${errCode}</span>
        <span data-edit-error>${text}</span>
        `,
      style: {
        'margin-bottom': `${offset * 10}px`
      }
    })
    document.body.appendChild(error)
    const show = () => addClasses(error, IS_VISIBLE)
    const hide = () => error.remove()
    setTimeout(show, 1)
    // setTimeout(() => {
    //   if (error) hide()
    // }, 7 * 1000);
    bind(error, 'click', hide)
  }

  function clearValue(...targets) {
    for (const target of toArray(targets)) {
      target.value = ''
    }
  }

  function setValue(value, ...targets) {
    for (const target of toArray(targets)) {
      target.value = value
    }
  }

  function clearSelection() {
    const selection = window.getSelection()
    if (selection.rangeCount == 0) return
    selection.removeAllRanges()
  }

  function removeClasses(target, ...classes) {
    if (!target) throw new Error('removeClasses ERROR : target not found')
    if (!classes) throw new Error('removeClasses ERROR : Expected at least one class')
    for (const cls of classes) {
      target.classList.remove(cls)
    }
  }

  function addClasses(target, ...classes) {
    if (!target) throw new Error('addClasses ERROR : target not found')
    if (!classes) throw new Error('addClasses ERROR : Expected at least one class')
    for (const cls of classes) {
      target.classList.add(cls)
    }
  }

  function getCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const currentDate = new Date().toLocaleDateString('en-GB', options);
    return currentDate;
  }

  function closestParent(target, selector) {
    if (target && target.parentNode) {
      return target.parentNode.closest(selector)
    }
    throw new Error('closestParent ERROR : target not found')
  }

  function createElem(tagName, options) {
    const { className, id, innerHTML, style, attributes, toAppend } = options
    const elem = document.createElement(tagName)
    if (className) elem.className = className;
    if (id) elem.id = id;
    if (innerHTML) elem.innerHTML = innerHTML;
    if (style) {
      for (const key in options.style) { elem.style[key] = options.style[key] }
    }
    if (attributes) {
      for (const key in options.attributes) { elem.setAttribute(key, options.attributes[key]) }
    }
    if (toAppend) {
      for (const child of toArray(toAppend)) { elem.appendChild(child) }
    }
    return elem
  }

  function append(parent, ...childs) {
    if (parent instanceof NodeList || parent instanceof HTMLCollection || parent instanceof Array) {
      throw new Error('parent must be an element')
    } else {
      for (const child of childs) { parent.appendChild(child) }
    }
  }

  function updateSectionsControls() {
    const update = () => {
      const sections = [...document.querySelectorAll('.article-content-section')]
        .filter(section => section.querySelector('.content-section-controls') !== null)

      for (const section of sections) {
        const attr = 'data-section-modify'
        const upBtn = section.querySelector(`[${attr}="moveUp"]`)
        const downBtn = section.querySelector(`[${attr}="moveDown"]`)
        const checkSectionPosition = () => {
          section.previousElementSibling === null ? upBtn.disabled = true : upBtn.disabled = false
          section.nextElementSibling === null ? downBtn.disabled = true : downBtn.disabled = false
        }

        checkSectionPosition()
      }
    }
    return update()
  }

  function updateCover(imgUrl) {
    const holder = document.querySelector('.article-cover')
    const box = document.querySelector('[data-edit-box="cover"]')
    if (!holder || !box) throw new Error('appendCover ERROR : holder or box not found')

    const img = createElem('img', {
      className: 'article_editable',
      style: {
        'background-image': `url(${imgUrl})`
      },
      attributes: {
        id: 'article_cover'
      }
    })
    append(holder, img)
    holder.classList.add('editable')
    hide(box)

    const toggle = () => {
      img.remove()
      holder.classList.remove('editable')
      box.style.display = 'flex'
    }
    bind(img, 'click', toggle)
    UPLOADED_BLOG_IMG = imgUrl;
  }

  /**
   * 
   * Process Export Functions
   * 
   */
  function clearSection(section) {
    const cloned = section.cloneNode(true)
    const controls = cloned.querySelector('.content-section-controls')
    const textarea = cloned.querySelector('textarea')
    const disclaimers = cloned.querySelectorAll('.blog__cards-disclaimer')
    const editBoxes = cloned.querySelectorAll('.blog-edit-box')
    const inputs = cloned.querySelectorAll('.blog-card__input')

    const elemsToRemoves = [controls, ...disclaimers, ...editBoxes, ...inputs, textarea]

    elemsToRemoves.forEach((elem) => {
      if (elem) elem.remove()
    })

    const elems = cloned.querySelectorAll('*')
    for (const elem of elems) {
      elem.removeAttribute('contenteditable')
      elem.removeAttribute('spellcheck')
      removeClasses(elem, 'tip_edit')
    }
    return cloned
  }

  function processText(section) {
    let cleared = clearSection(section)
    return cleared.outerHTML
  }

  function processEmbed(section) {
    const iframe = section.querySelector('iframe')
    if (!iframe) {
      showMessage('Export Error: No iframe found in Embed Section , ECA-E9')
      return null
    }
    let cleared = clearSection(section)
    return cleared.outerHTML
  }

  function processProduct(section) {
    let items = {}

    const inputs = [...section.querySelectorAll('input')]

    for (const input of inputs) {
      const value = input.value
      const index = inputs.indexOf(input)
      if (!value) {
        if (!input.required) {
          continue
        } else {
          error(`Export Error: Link for product not found. Section: ${section.dataset.contentType}`, 'ECA-E10')
          continue
        }
      } else {
        if (input.classList.contains(__INVALID)) {
          error(`Export Error: Link for product is invalid. Section: ${section.dataset.contentType}`, 'ECA-E11')
          continue
        } else {
          items[index] = {
            link: value,
            id: value.match(/-\d{4}$/)[0].slice(1)
          }
        }
      }
    }

    return items
  }

  /**
   * 
   * Create Section Elements
   * 
   */
  var Create = new Object()
  Create.blogCard = () => {
    const card = createElem('div', {
      className: 'blog-card',
      innerHTML: `
      <a href="#" target="_blank" class="blog-card__media">
        <img src="./assets/product-sample1.webp" alt="">
      </a>
      <div class="blog-card__details">
        <h5 class="blog-card__name">
          <a href="" target="_blank">Prong Set Diamond Tennis Bracelet 14K Solid Gold 1.50ctw</a>
        </h5>
        <span class="blog-card__price">$11,190</span>
        <a href="#" target="_blank" class="blog-card__link">Shop Now</a>
        <input data-input="blogCardLink" type="text" placeholder="Paste product link" class="blog-card__input" required="true">
      </div>
      `
    })
    return card
  }
  Create.disclaimer = () => {
    return createElem('div', { className: 'blog__cards-disclaimer' })
  }
  Create.sectionControls = () => {
    const controls = createElem('div', {
      className: 'content-section-controls',
      innerHTML: `
      <button data-section-modify="moveUp">Move Up</button>
      <button data-section-modify="moveDown">Move Down</button>
      <button data-section-modify="remove">Remove</button>
      `
    })
    return controls
  }

  /**
   * 
   * Create Sections
   * 
   */
  var CreateSection = new Object()
  CreateSection.largeTitle = () => {
    const section = createElem('div', {
      className: 'article-content-section --heading',
      attributes: {
        'data-content-type': 'large_title'
      }
    })
    const heading = createElem('h3', {
      innerHTML: 'Large Heading',
      attributes: {
        contenteditable: true,
        spellcheck: false
      }
    })
    append(section, heading, Create.sectionControls())
    return section
  }
  CreateSection.tinyTitle = () => {
    const section = createElem('div', {
      className: 'article-content-section --heading',
      attributes: {
        'data-content-type': 'tiny_title'
      }
    })
    const heading = createElem('h4', {
      innerHTML: 'Tiny Heading',
      attributes: {
        contenteditable: true,
        spellcheck: false
      }
    })
    append(section, heading, Create.sectionControls())
    return section
  }
  CreateSection.textBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --text',
      attributes: {
        'data-content-type': 'text'
      }
    })
    const p = createElem('p', {
      className: 'tip_edit',
      innerHTML: this.loremMd,
      attributes: {
        contenteditable: true,
        spellcheck: false
      }
    })
    append(section, p, Create.sectionControls())
    return section
  }
  CreateSection.spacer = () => {
    const section = createElem('div', {
      className: 'article-content-section --spacer',
      attributes: {
        'data-content-type': 'spacer'
      }
    })
    append(section, Create.sectionControls())
    return section
  }
  CreateSection.productBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --product',
      attributes: {
        'data-content-type': 'product'
      }
    })
    const grid = createElem('div', { className: 'blog__cards-grid' })
    const moreBtn = createElem('button', {
      className: 'blog-edit-box',
      attributes: {
        'data-content-edit': true,
        'data-edit-box': 'addProductCard'
      },
      innerHTML: `<span>Add Product</span>`
    })
    const disclaimer = Create.disclaimer()
    const card = Create.blogCard()
    append(grid, card, moreBtn)
    append(section, grid, disclaimer, Create.sectionControls())
    return section
  }
  CreateSection.sliderBlock = () => {
    const section = createElem('div', {
      className: 'article-content-section --slider',
      innerHTML: `
      <div class="blog__cards-disclaimer"></div>
      `,
      attributes: {
        'data-content-type': 'slider'
      }
    })
    const inputs = []
    for (let i = 0; i < 3; i++) {
      const input = createElem('input', {
        className: 'blog__product-input',
        attributes: {
          placeholder: 'Paste product link',
          'data-input': 'blogSliderCard',
          'data-input-initial': true,
          required: true
        }
      })
      inputs.push(input)
    }
    append(section, ...inputs, Create.sectionControls())
    return section
  }
  CreateSection.ytEmbed = () => {
    const section = createElem('div', {
      className: 'article-content-section --yt-embed',
      attributes: {
        'data-content-type': 'youtube'
      }
    })
    const disclaimer = createElem('div', {
      className: 'blog__cards-disclaimer'
    })
    const textarea = createElem('textarea', {
      className: 'blog__product-input',
      attributes: {
        placeholder: 'YouTube Embed Link',
        'data-input': 'ytEmbed'
      }
    })
    append(section, disclaimer, textarea, Create.sectionControls())
    return section
  }
  CreateSection.list = () => {
    return
  }

  /**
   * 
   * Append Welcome
   * 
   */
  var HandleWelcome = new Object()
  HandleWelcome.heading = (input) => {
    const
      value = input.value,
      holder = document.querySelector('.article__title-wrap'),
      box = input.closest('.blog-edit-box')
    if (!holder) throw new Error('JS : Append Welcome Heading : Title Holder not found')
    if (!box) throw new Error('JS : Append Welcome Heading : Title Box not found')
    if (value) {
      const heading = createElem('h3', {
        className: 'article-title editable',
        innerHTML: value,
        attributes: {
          id: 'article_title'
        }
      })
      prepend(holder, heading)
      hide(box)
      clearValue(input)

      const toggle = () => {
        const value = heading.innerHTML
        heading.remove()
        show(box)
        setValue(value, input)
        input.focus()
      }
      bind(heading, ['click', 'contextmenu'], toggle)
    }
  }
  HandleWelcome.summary = (input) => {
    const value = input.value ? /lorem/i.test(input.value) ? 'Add Summary' : input.value : 'Add Summary'
    const holder = document.querySelector('.article__title-wrap')
    const box = input.closest('.blog-edit-box')
    if (!holder) throw new Error('JS : Append Welcome Summary : Title Holder not found')
    if (!box) throw new Error('JS : Append Welcome Summary : Title Box not found')

    const summary = createElem('p', {
      className: 'article-summary editable',
      innerHTML: value,
      attributes: {
        id: 'article_summary'
      }
    })
    append(holder, summary)
    hide(box)
    clearValue(input)

    const toggle = () => {
      const value = /Lorem/gi.test(summary.innerHTML) ? '' : summary.innerHTML
      summary.remove()
      show(box)
      setValue(value, input)
      input.focus()
    }
    bind(summary, ['click', 'contextmenu'], toggle)
  }
  HandleWelcome.minutes = (input) => {
    const value = input.value
    const holder = document.querySelector('.article-welcome')
    const box = input.closest('.blog-edit-box')
    if (!holder) throw new Error('JS : Append Welcome Minutes : Minutes Holder not found')
    if (!box) throw new Error('JS : Append Welcome Minutes : Minutes Box not found')

    const minutes = createElem('span', {
      className: 'read-time editable',
      innerHTML: `${value} min reading`,
      attributes: {
        id: 'article_read_time'
      }
    })
    append(holder, minutes)
    hide(box)
    clearValue(input)

    const toggle = () => {
      const value = minutes.innerHTML.replace(' min reading', '');
      minutes.remove()
      show(box)
      setValue(value, input)
      input.focus()
    }
    bind(minutes, ['click', 'contextmenu'], toggle)
  }
  HandleWelcome.author = (input) => {
    const
      value = input.value,
      holder = document.querySelector('.post-author'),
      box = input.closest('.blog-edit-box')
    if (!holder) throw new Error('JS : Append Welcome Author : Author Holder not found')
    if (!box) throw new Error('JS : Append Welcome Author : Author Box not found')

    if (value) {
      const element = createElem('span', {
        className: 'article-author editable',
        innerHTML: value,
        attributes: {
          id: 'article_author'
        }
      })
      const date = createElem('span', {
        className: 'article_editable',
        innerHTML: `Posted on ${getCurrentDate()}`,
        attributes: {
          id: 'article_date'
        }
      })

      append(holder, element, date)
      hide(box)
      clearValue(input)

      const toggle = () => {
        const value = element.innerHTML
        element.remove()
        date.remove()
        show(box)
        setValue(value, input)
        input.focus()
      }
      bind(element, ['click', 'contextmenu'], toggle)
      bind(date, ['click', 'contextmenu'], toggle)
    }
  }
  HandleWelcome.cover = (input) => {
    const box = closestParent(input, '.blog-edit-box')
    if (!box) throw new Error('JS : Append Welcome Cover : Cover Edit Box not found')

    function processFile(file) {
      if (!file) throw new Error('No file selected')
      if (!file.type.match('image.*')) throw new Error('Not an image')
      let reader = new FileReader()
      reader.onload = (e) => {
        updateCover(e.target.result)
      }
      reader.readAsDataURL(file)
    }

    box.onclick = () => { input.click() }
    input.onchange = (e) => {
      processFile(e.target.files[0])
      input.value = ''
    }
    box.ondragover = (e) => {
      e.preventDefault()
      box.classList.add(IS_ACTIVE)
    }
    box.ondragleave = (e) => {
      e.preventDefault()
      box.classList.remove(IS_ACTIVE)
    }
    box.ondrop = (e) => {
      e.preventDefault()
      box.classList.remove(IS_ACTIVE)
      processFile(e.dataTransfer.files[0])
    }
  }

  /**
   * 
   * Add Sections
   * 
   */
  var AddSection = new Object()
  AddSection.largeTitle = () => {
    const section = CreateSection.largeTitle()
    append(articleContent, section)
  }
  AddSection.tinyTitle = () => {
    const section = CreateSection.tinyTitle()
    append(articleContent, section)
  }
  AddSection.textBlock = () => {
    const section = CreateSection.textBlock()
    append(articleContent, section)
  }
  AddSection.spacer = () => {
    const section = CreateSection.spacer()
    append(articleContent, section)
  }
  AddSection.productBlock = () => {
    const section = CreateSection.productBlock()
    append(articleContent, section)
  }
  AddSection.sliderBlock = () => {
    const section = CreateSection.sliderBlock()
    append(articleContent, section)
  }
  AddSection.ytEmbed = () => {
    const section = CreateSection.ytEmbed()
    append(articleContent, section)
  }
  AddSection.list = () => {
    return
  }

  /**
   * 
   * Section Modify Events
   * 
   */
  var _section = new Object()
  _section.remove = (section) => {
    const h = section.scrollHeight
    section.style.height = h + 'px'
    setTimeout(() => {
      section.style.height = 0
      section.style.opacity = 0
      setTimeout(() => {
        section.remove()
        updateSectionsControls()
      }, getTransitionTime(section))
    }, 1);
  }
  _section.moveUp = (section) => {
    const prev = section.previousElementSibling
    if (prev !== null) {
      section.style.opacity = 0
      prev.style.opacity = 0
      setTimeout(() => {
        articleContent.insertBefore(section, prev)
        updateSectionsControls()
        setTimeout(() => {
          section.style.opacity = 1
          prev.style.opacity = 1
        }, 1);
      }, getTransitionTime(section))
    }
  }
  _section.moveDown = (section) => {
    const next = section.nextElementSibling
    if (next !== null) {
      section.style.opacity = 0
      next.style.opacity = 0
      setTimeout(() => {
        articleContent.insertBefore(next, section)
        setTimeout(() => {
          section.style.opacity = 1
          next.style.opacity = 1
        }, 1);
        updateSectionsControls()
      }, getTransitionTime(section))
    }
  }

  /**
   * 
   * Bind Document Events
   * --section controls
   * --add product : product block
   * --add slider : slider block
   * --youtube embed input
   */
  var BindDocument = new Object()
  BindDocument.sectionControls = () => {
    document.addEventListener('click', (event) => {
      const target = event.target
      const attr = target.getAttribute('data-section-modify')
      if (attr) {
        const section = closestParent(target, '.article-content-section')
        const content = articleContent
        if (!section) throw new Error(`Expected to find closest article-content-section`)
        switch (attr) {
          case 'remove':
            _section.remove(section)
            break;
          case 'moveUp':
            _section.moveUp(section)
            break;
          case 'moveDown':
            _section.moveDown(section)
            break;
        }
      }
    })
  }
  BindDocument.addProductCard = () => {
    document.addEventListener('click', (event) => {
      const target = event.target
      if (target.closest('[data-edit-box="addProductCard"]')) {
        const grid = target.closest('.blog__cards-grid')
        if (!grid) throw new Error(`Expected to find closest .blog__cards-grid`)
        const card = Create.blogCard()
        const arr = [...grid.querySelectorAll('.blog-card')]
        if (!arr.length) {
          t.before(card)
        } else {
          arr.at(-1).after(card)
        }
      }
    })
  }
  BindDocument.ytEmbedInput = () => {
    const validateRegExp = /^<iframe.*src=["'].*youtube.*["'].*<\/iframe>$/i
    document.addEventListener('input', (event) => {
      const target = event.target
      const value = target.value
      if (target.closest('textarea[data-input="ytEmbed"]')) {
        const section = target.closest('.article-content-section')
        if (!section) throw new Error(`Expected to find closest article-content-section`)

        if (value.length == 0) {
          removeClasses(target, __VALID, __INVALID)
          removeClasses(section, __VALID, __INVALID, __PENDING)
          const iFrame = section.querySelector('iframe')
          if (iFrame) iFrame.remove()
          return
        } else {
          if (validateRegExp.test(value)) {
            addClasses(target, __VALID)
            addClasses(section, __VALID, __PENDING)
            removeClasses(target, __INVALID)
            removeClasses(section, __INVALID)
            target.blur()
            setTimeout(() => {
              section.insertAdjacentHTML('afterbegin', value)
              setTimeout(() => {
                section.classList.remove(__PENDING)
              }, 1500);
            }, 200);
          } else {
            const iFrame = section.querySelector('iframe')
            if (iFrame) iFrame.remove()
            addClasses(target, __INVALID)
            addClasses(section, __INVALID)
            removeClasses(target, __VALID)
            removeClasses(section, __VALID, __PENDING)
          }
        }
      }
    })
  }
  BindDocument.productCardInput = () => {
    const validate = (input) => {
      const val = input.value
      let valid

      if (val.length == 0) return
      const id = val.split('-').at(-1)
      const urlRegex = /^(?:https?:\/\/)?(?:www\.)?icebox\.com\/(?:product\/)?[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/i

      if (id.match(/^[0-9]+$/) && urlRegex.test(val) && id.length >= 4) {
        addClasses(input, __VALID)
        removeClasses(input, __INVALID)
        valid = true
      } else {
        addClasses(input, __INVALID)
        removeClasses(input, __VALID)
        valid = false
      }

      return valid
    }

    document.addEventListener('input', (e) => {
      const t = e.target

      if (t.closest('[data-input="blogCardLink"]')) {
        const val = t.value
        if (!val.length) {
          t.classList.remove(__VALID)
          t.classList.remove(__INVALID)
        } else {
          validate(t)
        }
      }

      if (t.closest('[data-input="blogSliderCard"]')) {
        const val = t.value
        const nextInput = t.nextElementSibling ? t.nextElementSibling.tagName === 'INPUT' ? t.nextElementSibling : null : null

        if (val.length === 0) {
          t.classList.remove(__VALID)
          t.classList.remove(__INVALID)
          if (nextInput && !nextInput.required) {
            nextInput.remove()
            return
          }
        } else {
          validate(t)
          if (!nextInput) {
            if (validate(t)) {
              const input = createElem('input', {
                className: 'blog__product-input',
                attributes: {
                  placeholder: 'Paste product link',
                  'data-input': 'blogSliderCard'
                }
              })
              t.after(input)
            }
          } else {
            if (!nextInput.required && !(validate(nextInput))) {
              nextInput.remove()
            }
          }
        }
      }
    })
  }
  BindDocument.selectionChange = () => {
    document.addEventListener('selectionchange', (event) => {
      const element = event.target.activeElement
      const selection = window.getSelection()
      Tip.hide()
      if (String(selection).length > 0) {
        const range = selection.getRangeAt(0)
        const anchor = selection.anchorNode
        let parent = anchor.parentElement
        if (parent.tagName === 'SPAN' || parent.tagName === 'A') {
          parent = parent.parentNode.closest('p.tip_edit')
        }
        if (parent) {
          if (parent.classList.contains('tip_edit') && String(selection).length > 0) {
            Tip.move(range)
          }
        }
      }
    })
  }

  var Tip = new Object()
  Tip.move = (selectionRange) => {
    const tip = document.querySelector('.edit-tip')
    if (!tip || !selectionRange) return
    const rangeRect = selectionRange.getBoundingClientRect()
    const tipRect = tip.getBoundingClientRect()
    const left = Math.min(
      Math.max(rangeRect.left + rangeRect.width / 2 - tipRect.width / 2),
      window.innerWidth - tipRect.width - 8
    )
    tip.style.top = `${rangeRect.top + window.scrollY - 54}px`
    tip.style.left = `${left}px`
    tip.classList.add(IS_VISIBLE)
  }
  Tip.hide = () => {
    const tip = document.querySelector('.edit-tip')
    if (!tip) return
    tip.classList.remove(IS_VISIBLE)
  }
  Tip.bind = () => {
    const arr = [
      ...document.querySelectorAll('[data-edit-tip="bold"]'),
      ...document.querySelectorAll('[data-edit-tip="italic"]'),
      ...document.querySelectorAll('[data-edit-tip="highlight"]'),
      ...document.querySelectorAll('[data-edit-tip="highlightFull"]'),
      ...document.querySelectorAll('[data-edit-tip="list"]'),
      ...document.querySelectorAll('[data-edit-tip="clear"]'),
      ...document.querySelectorAll('[data-edit-tip="link"]')
    ]
    for (const btn of arr) {
      const cls = btn.dataset.editTip
      if (!cls) throw new Error(`Expected to find data-edit-tip attribute`)
      btn.addEventListener('click', function () {
        Editable.wrapIntoSpan(cls)
        clearSelection()
      })
    }
  }

  var Editable = new Object()
  Editable.clear = function (spans) {
    spans = toArray(spans)
    for (const span of spans) {
      const text = span.textContent
      const fragment = document.createDocumentFragment()
      const div = document.createElement('div')

      div.innerHTML = text
      while (div.firstChild) {
        fragment.appendChild(div.firstChild)
      }
      span.parentNode.replaceChild(fragment, span)
    }
  }
  Editable.wrap = function (range, cls, customTag) {
    const tag = customTag || 'span'
    const attributes = tag == 'a' ? {
      href: '#',
      target: '_blank'
    } : {}
    const currentFragment = range.cloneContents()
    const newSpan = createElem(tag, { className: cls, toAppend: currentFragment, attributes })
    range.deleteContents()
    range.insertNode(newSpan)
  }
  Editable.wrapIntoSpan = (cls) => {
    const selection = window.getSelection()
    if (String(selection).length < 1) {
      showMessage('Expected to have selectiom, ECA-2')
      throw new Error(`Expected to have selection`)
    }
    const anchor = selection.anchorNode
    if (anchor === null) {
      showMessage('Expected selection to have anchor, ECA-3')
      throw new Error(`Expected selection to have anchor`)
    }
    const parent = anchor.parentElement
    const paragraphParent = parent.classList.contains('tip_edit') ? parent : parent.closest('p.tip_edit')
    const range = selection.getRangeAt(0)

    // If no editable paragraph
    if (!paragraphParent) {
      showMessage('Expected to find closest Editable Paragraph, ECA-4')
      throw new Error(`Expected to find closest Editable Paragraph`)
    }
    if (!range) {
      showMessage('Expected to have range, ECA-5')
      throw new Error(`Expected to have range`)
    }

    // If clear parent
    if (cls === 'clear') {
      const spans = [...paragraphParent.querySelectorAll('span'), ...paragraphParent.querySelectorAll('a')].filter(span => range.intersectsNode(span))
      Editable.clear(spans)
      return
    }

    if (cls === 'link') {
      const spans = [...paragraphParent.querySelectorAll('span'), ...paragraphParent.querySelectorAll('a')].filter(span => range.intersectsNode(span))
      Editable.clear(spans)
      Editable.wrap(range, cls, 'a')
      return
    }

    // If parent is a SPAN
    if (parent.tagName === 'SPAN') {
      parent.className = cls
      return
    }

    // If parent is a LINK
    if (parent.tagName === 'A') {
      let spanParent = parent.parentNode.closest('span')
      if (spanParent) {
        while (spanParent.parentNode.tagName == 'SPAN') {
          spanParent = spanParent.parentNode.closest('span')
        }
        const spansWithinSpanParent = spanParent.querySelectorAll('span')
        Editable.clear([...spansWithinSpanParent, parent])
        spanParent.className = cls
      } else {
        parent.outerHTML = `<span class="${cls}">${parent.textContent}<span>`
      }
      return
    }

    // If parent is a PARAGRAPH
    if (parent.tagName === 'P') {
      const spans = [...parent.querySelectorAll('span'), ...parent.querySelectorAll('a')].filter(span => range.intersectsNode(span))
      Editable.clear(spans)
    }

    // Wrap selection into span
    Editable.wrap(range, cls)
  }

  /**
   * 
   * Main
   * 
   */
  var Article = new Object()
  Article.bindAddSections = function () {
    this.arr = [...document.querySelectorAll('[data-add-section]')]
    for (const box of this.arr) {
      const attr = box.dataset.addSection
      if (!attr) {
        console.error(box, `has no data-add-section attribute`)
        continue
      }
      const func = AddSection[attr]
      if (!func) {
        console.error(box, `has no related function ${attr} in Add Object`)
        continue
      }
      bind(box, 'click', func)
      bind(box, 'click', clearSelection)
      bind(box, 'click', updateSectionsControls)
    }
  }
  Article.bindWelcomeSection = function () {
    const inputsArr = [
      ...document.querySelectorAll('[data-blog-edit="heading"]'),
      ...document.querySelectorAll('[data-blog-edit="summary"]'),
      ...document.querySelectorAll('[data-blog-edit="minutes"]'),
      ...document.querySelectorAll('[data-blog-edit="author"]')
    ]
    const inputCoverUpload = document.querySelector('[data-blog-edit="cover"]')

    for (const input of inputsArr) {
      let attr = input.getAttribute('data-blog-edit')

      input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          e.preventDefault()
          input.blur()
        }
      }
      const Event = HandleWelcome[attr]
      if (!Event) {
        console.error(input, `has no related function ${attr} in HandleWelcome Object`)
        continue
      }
      input.onblur = () => {
        HandleWelcome[attr](input)
      }
      input.onfocus = () => {
        if (attr == 'minutes') input.select()
      }
      input.oninput = (e) => {
        if (attr == 'minutes') e.target.value = e.target.value.replace(/\D/g, '')
      }
    }
    if (inputCoverUpload) {
      const Event = HandleWelcome.cover
      if (!Event) {
        console.error(inputCoverUpload, `has no related function cover in HandleWelcome Object`)
        return
      }
      HandleWelcome.cover(inputCoverUpload)
    }
  }
  Article.bindDocumentEvents = function () {
    BindDocument.sectionControls()
    BindDocument.addProductCard()
    BindDocument.ytEmbedInput()
    BindDocument.productCardInput()
    BindDocument.selectionChange()
  }
  Article.bindTip = function () {
    Tip.bind()
  }
  Article.setInitialLayout = function () {
    if (!options.setInitialLayout) return
    const { largeTitle, tinyTitle, textBlock, productBlock, sliderBlock, spacer, ytEmbed } = AddSection
    largeTitle()
    tinyTitle()
    textBlock()
  }
  Article.initSplide = function () {
    const splides = [...document.querySelectorAll('.splide_blog')]
    for (const splide of splides) {
      new Splide(splide, {
        type: 'loop',
        perPage: 3,
        pagination: 0,
        gap: 8,
        perMove: 1,
        breakpoints: {
          768: {
            perPage: 2
          },
          479: {
            perPage: 1
          }
        }
      }).mount()
    }
  }
  Article.init = function () {
    const funcArr = [
      this.setInitialLayout,
      updateSectionsControls,
      this.bindAddSections,
      this.bindWelcomeSection,
      this.bindDocumentEvents,
      this.bindTip,
      this.initSplide
    ]
    for (const func of funcArr) {
      try { func() }
      catch (err) {
        console.error(err.message)
      }
    }
  }

  /**
   * Export Article
   */
  var _export = {}
  _export.obj = {}
  _export.obj.raw = String()
  _export.getTitle = () => {
    const title = document.querySelector('#article_title')
    if (!title || !title.innerHTML) {
      showMessage('Export Error: Title is not provided, ECA-E1')
      return null
    }
    return title.innerHTML
  }
  _export.getSummary = () => {
    const summary = document.querySelector('#article_summary')
    if (!summary || !summary.innerHTML) {
      showMessage('Export Error: Provide excerpt or type "lorem", ECA-E2')
      return null
    }
    return summary.innerHTML
  }
  _export.getAuthor = () => {
    const author = document.querySelector('#article_author')
    if (!author || !author.innerHTML) {
      showMessage('Export Error: Author is not provided, ECA-E3')
      return null
    }
    return author.innerHTML
  }
  _export.getReadTime = () => {
    const minutes = document.querySelector('#article_read_time')
    if (!minutes || !minutes.innerHTML) {
      showMessage('Export Error: Read time is not provided, ECA-E4')
      return null
    }
    return parseInt(minutes.innerHTML)
  }
  _export.getCover = () => {
    return UPLOADED_BLOG_IMG;
  }
  _export.getContent = () => {
    let sections = {}
    const sectionsArr = [...articleContent.querySelectorAll('.article-content-section')]
    if (!sectionsArr.length) {
      showMessage('Export Error: No content found, ECA-E6')
      return null
    }
    for (const section of sectionsArr) {
      const type = section.dataset.contentType
      if (!type) {
        error(`Export Error: No content type found. Section Index: ${sectionsArr.indexOf(section)}`, 'ECA-E7')
      } else {
        const index = sectionsArr.indexOf(section)
        let targetSection = sections[index] = {}
        targetSection.type = type
        //targetSection.element = section

        const textTypes = ['large_title', 'tiny_title', 'text', 'spacer']
        const productTypes = ['product', 'slider']
        const embedTypes = ['youtube']

        if (textTypes.includes(type)) {
          targetSection.raw = processText(section)

        } else if (productTypes.includes(type)) {
          targetSection.items = processProduct(section)

        } else if (embedTypes.includes(type)) {
          targetSection.raw = processEmbed(section)

        } else {
          error(`Export Error: No processor for such content type. Section Index: ${sectionsArr.indexOf(section)}`, 'ECA-E8')
        }
      }
    }

    return sections
  }
  _export.do = () => {

    _export.obj.content = _export.getContent()
    _export.obj.author = _export.getAuthor()
    _export.obj.cover = _export.getCover()
    _export.obj.read_time = _export.getReadTime()
    _export.obj.summary = _export.getSummary()
    _export.obj.title = _export.getTitle()
    SaveAdminBlog(_export.obj);
  }

  Article.add = AddSection
  Article.create = CreateSection
  Article.holder = this.articleContent
  Article.export = _export

  return Article
}

/**
 * Init Edit Blog / Add Article
 */
document.addEventListener('DOMContentLoaded', () => {
  const articleContent = document.querySelector('.editable__content')

  if (articleContent) {
    const Article = new EditArticle('editable__content', {
      setInitialLayout: true
    })
    Article.init()

    const saveArticleArr = [...document.querySelectorAll('[data-evt="saveArticle"]')]
    for (const btn of saveArticleArr) {
      btn.onclick = Article.export.do
    }

  }
})

/* #region  Loan App */
/**
 * 
 * Loan App
 * Icebox Financing Application
 * Financing Form
 * 
 */
class LoanApp {
  constructor(holder, settings = {}) {
    this.holder = holder
    this.filesHolder = this.holder.querySelector('#loan_files_upload')
    this.sections = [...this.holder.querySelectorAll('[data-loan-section]')]
    this.content = this.holder.querySelector('.loan-case__content')
    this.scroller = this.holder.querySelector('.loan-scroller')
    this.footer = this.holder.querySelector('.loan-case__footer')
    this.btnGroup = this.holder.querySelector('.loan-case__btn-group')
    this.evtGo = [...this.holder.querySelectorAll('[data-loan-evt="go"]')]
    this.evtToggle = [...this.holder.querySelectorAll('[data-loan-evt="toggle"]')]
    this.evtSubmit = [...this.holder.querySelectorAll('[data-loan-evt="submit"]')]
    this.evtBack = [...this.holder.querySelectorAll('[data-loan-evt="back"]')]
    this.bar = this.holder.querySelector('.loan-bar')
    this.bar_progress = this.holder.querySelector('.loan-bar__progress')
    this.flow = this.holder.querySelector('.loan-flow')
    this.finish = this.holder.querySelector('.loan-finish')
    this.maxSteps = undefined
    this.currentStep = undefined
    this.stepsLeft = undefined
    this.endReached = undefined
    this.atStart = undefined
    this.sliding = false
    this.data = {}
    this.settings = {
      scrollSpeed: settings.scrollSpeed || 600,
      easing: settings.easing || 'cubic-bezier(.39, .575, .565, 1)',
    }
  }

  /**
   * Utils
   */
  get getLeftSteps() {
    return this.steps - this.currentStep
  }
  get getActiveSection() {
    return this.sections[this.currentStep]
  }
  get getActiveInput() {
    const section = this.getActiveSection
    if (section && section.contains(document.activeElement)) {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') {
        return document.activeElement
      }
    } else {
      return undefined
    }
  }
  get getLoaderHTML() {
    return `
                            <div>
                                <div>
                                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                                        <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                                        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"></path>
                                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                                    </svg>
                                </div>
                            </div>
    `
  }
  createElem(tagName, options) {
    const { className, id, innerHTML, style, attributes, toAppend } = options
    const elem = document.createElement(tagName)
    if (className) elem.className = className;
    if (id) elem.id = id;
    if (innerHTML) elem.innerHTML = innerHTML;
    if (style) {
      for (const key in options.style) { elem.style[key] = options.style[key] }
    }
    if (attributes) {
      for (const key in options.attributes) { elem.setAttribute(key, options.attributes[key]) }
    }
    if (toAppend) {
      for (const child of toArray(toAppend)) { elem.appendChild(child) }
    }
    return elem
  }
  toArray(target) {
    return Array.isArray(target) ? target : [target]
  }
  loadingOn(timeToRemove) {
    if (this.holder.querySelector('.loan-case-loader')) return
    const loader = createElem('div', {
      className: 'loan-case-loader',
      innerHTML: this.getLoaderHTML
    })
    this.holder.appendChild(loader)
    setTimeout(() => {
      this.holder.classList.add(__LOCKED)
      if (timeToRemove) {
        setTimeout(() => {
          this.holder.classList.remove(__LOCKED)
          setTimeout(() => {
            loader.remove()
          }, 350);
        }, timeToRemove);
      }
    }, 1);
  }
  loadingOff() {
    this.holder.classList.remove(__LOCKED)
    const loader = this.holder.querySelector('.loan-case-loader')
    if (loader) {
      setTimeout(() => {
        loader.remove()
      }, 350);
    }
  }
  showInputError(input, text) {
    const err = document.querySelector('.loan-input-error') ? document.querySelector('.loan-input-error') : createElem('div', {
      className: 'loan-input-error',
      innerHTML: text
    })
    input.classList.add(__INVALID)
    this.footer.prepend(err)
  }
  clearErrors() {
    const activeSection = this.getActiveSection
    const inputs = [...activeSection.querySelectorAll('input'), ...activeSection.querySelectorAll('select')]
    inputs.forEach(input => input.classList.remove(__INVALID))
    const err = this.holder.querySelector('.loan-input-error')
    if (err) err.remove()
  }
  observeBar() {
    const prevSections = this.sections.slice(0, this.currentStep).length
    const progress = (prevSections + 1) / this.steps * 100
    this.bar_progress.style.width = `${progress}%`
  }
  clearAllFields() {
    const inputs = [...this.holder.querySelectorAll('input:not([type="checkbox"])')]
    const selects = [...this.holder.querySelectorAll('select')]
    const checkboxes = [...this.holder.querySelectorAll('input[type="checkbox"]')]
    const fullArr = [...inputs, ...selects, ...checkboxes]

    inputs.forEach(input => input.value = '')
    selects.forEach(select => select.selectedIndex = 0)
    checkboxes.forEach((checkbox) => { checkbox.checked = false })
    fullArr.forEach(elem => elem.dispatchEvent(new Event('change')))
  }

  /**
   * Main
   */
  save() {
    $('#loan_form').submit();
  }
  finishMessage() {
    this.loadingOn(1000)
    setTimeout(() => {
      this.flow.style.opacity = 0
      let currentHeight = this.holder.offsetHeight
      this.holder.style.height = `${currentHeight}px`
      setTimeout(() => {
        this.finish.style.display = 'block'
        let scrollH = this.finish.scrollHeight
        this.holder.style.height = `${scrollH}px`
        setTimeout(() => {
          this.finish.style.opacity = 1
          window.scrollTo(0, 0)
          const confetti = new PageConfetti()
          confetti.push(false)
        }, 10);
      }, getTransitionTime(this.flow) + 10)
    }, 800);
  }
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
    }
  }
  validate(section) {
    const requiredTextInputs = [...section.querySelectorAll('input[type="text"][required]:not(.--disabled'), ...section.querySelectorAll('input[type="email"][required]')]
    const emptyInputs = requiredTextInputs.filter(input => !input.value)
    const numberInputs = section.querySelectorAll('input[data-validate="number"]')
    const selectInputs = section.querySelectorAll('select[required]')
    const emailInputs = section.querySelectorAll('input[data-validate="email"]')
    const zipInputs = section.querySelectorAll('input[data-validate="zip_code"]')
    const sectionID = section.dataset.loanSection

    if (requiredTextInputs.some(input => input.classList.contains(__INVALID))) return false
    if (numberInputs.length) {
      const value = numberInputs[0].value
      const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}\-\d{4}$/
      if (!regex.test(value)) {
        this.showInputError(numberInputs[0], 'Please enter a valid phone number')
        return false
      }
    }
    if (emailInputs.length) {
      const value = emailInputs[0].value
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!regex.test(value)) {
        this.showInputError(emailInputs[0], 'Please enter a valid email')
        return false
      }
    }
    if (zipInputs.length) {
      const value = zipInputs[0].value
      const regex = /^\d{5}$/
      if (!regex.test(value)) {
        this.showInputError(zipInputs[0], 'Please enter a valid zip code')
        return false
      }
    }
    if (emptyInputs.length) {
      this.showInputError(emptyInputs[0], 'This field is required')
      return false
    }
    if (selectInputs.length) {
      for (const select of selectInputs) {
        if (!select.value) {
          this.showInputError(select, 'Please select an option')
          return false
        }
      }
    }
    return true
  }
  adjustActiveSectionHeight() {
    const activeSection = this.getActiveSection
    if (activeSection) {
      const height = activeSection.scrollHeight
      this.content.style.height = `${height}px`
    }
  }
  toggle() {
    const body = document.querySelector('body')
    const headerNav = document.querySelector('.header__sub-nav')
    const welcome = document.querySelector('.subpage__welcome')
    const footerMain = document.querySelector('.footer__wrapper > .wrapper')
    const loanWelcome = document.querySelector('.loan-welcome')
    const heading = document.querySelector('.loan-case__heading')
    const backGroup = document.querySelector('.loan-case__back-group')
    const CASE_CLASS = 'loan_case'
    const elements = [headerNav, welcome, footerMain, loanWelcome]

    const hideElement = (el) => {
      const curHeight = el.scrollHeight
      el.style.height = `${curHeight}px`
      setTimeout(() => {
        el.style.overflow = 'hidden'
        el.style.height = '0px'
      }, 1);
    }
    const showElement = (el) => {
      const curHeight = window.getComputedStyle(el).getPropertyValue('height')
      const scrollHeight = el.scrollHeight
      el.style.height = `${curHeight}`
      setTimeout(() => {
        el.style.overflow = 'visible'
        el.style.height = `${scrollHeight}px`
      }, 1)
    }

    const hideLoan = () => {
      body.classList.remove(CASE_CLASS)
      for (const element of elements) {
        if (element) showElement(element)
      }

      this.scroller.style.display = 'none'
      this.content.style.height = `0px`

      if (backGroup) {
        backGroup.style.height = `0px`
      }

      if (heading) {
        heading.innerHTML = 'Welcome To the Icebox Max Approval Financing Form'
        heading.classList.remove('--big')
      }

      this.clearErrors()
      this.back(1)
      this.clearAllFields()
    }
    const showLoan = () => {
      body.classList.add('loan_case')
      for (const element of elements) {
        if (element) hideElement(element)
      }

      this.scroller.style.display = 'flex'
      this.content.style.height = `${this.sections[0].scrollHeight}px`

      if (backGroup) {
        backGroup.style.height = `${backGroup.scrollHeight}px`
      }

      if (heading) {
        heading.innerHTML = 'Financing Application'
        heading.classList.add('--big')
      }
    }

    if (body.classList.contains(CASE_CLASS)) {
      const askModal = new AskModal({
        heading: 'Are You Sure You Want To Exit Financing App?',
        subheading: 'You will lose all the progress. Keep filling out the form and get approved as soon as possible!',
        exitText: 'Exit',
        keepText: 'Keep Filling',
        exitCallback: hideLoan,
      })
      askModal.show()
    } else {
      showLoan()
    }
  }
  tabPress() {
    if (!this.sliding) {
      const activeInput = this.getActiveInput
      if (!activeInput) {
        const section = this.getActiveSection
        const inputArray = [...section.querySelectorAll('input:not(.--disabled), select:not(.--disabled)')]
        if (inputArray.length) {
          let inputToFocus
          const invalidInputs = inputArray.filter(input => input.classList.contains('--invalid'))
          if (invalidInputs.length) {
            inputToFocus = invalidInputs[0]
          } else {
            const emptyInputs = inputArray.filter(input => !input.value && input.value !== 0)
            if (emptyInputs.length) {
              inputToFocus = emptyInputs[0]
            } else {
              inputToFocus = inputArray[0]
            }
          }
          inputToFocus.focus()
        }
      } else {
        const activeInputWrap = activeInput.parentNode.closest('.loan-input-wrap')
        const nextInputWrap = activeInputWrap.nextElementSibling
        if (nextInputWrap) {
          const nextInput = nextInputWrap.querySelector('input, select')
          if (nextInput) {
            nextInput.focus()
          }
        } else {
          const firstInputWrap = this.getActiveSection.querySelector('.loan-input-wrap')
          const firstInput = firstInputWrap.querySelector('input, select')
          if (firstInput) {
            firstInput.focus()
          }
        }
      }
    }
  }

  /**
   * Bind Events
   */
  bindStepEvt() {
    this.evtGo.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const section = this.getActiveSection
        if (this.validate(section)) this.go()
      })
    })
    this.evtBack.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.back()
      })
    })
    this.evtSubmit.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        this.evtGo[0].click()
      })
    })
    this.evtToggle.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.toggle()
      })
    })

  }
  bindInputEvents() {
    const inputs = [...this.holder.querySelectorAll('input')]
    const selects = [...this.holder.querySelectorAll('select')]
    const noWebsiteCheckbox = this.holder.querySelector('#loan_employer_website')
    const inputWebsiteEmployer = this.holder.querySelector('#loan_employer_website')

    document.addEventListener('keydown', (e) => {
      const isTab = e.key === 'Tab'
      if (isTab) {
        if (document.body.classList.contains('loan_case')) {
          e.preventDefault()
          this.tabPress()
        }
      }
    })

    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        this.clearErrors()
        const parent = input.parentNode.closest('.loan-input-wrap')
        if (parent) {
          parent.classList.add('--focused')
        }
      })
      input.addEventListener('blur', () => {
        const parent = input.parentNode.closest('.loan-input-wrap')
        if (parent) {
          parent.classList.remove('--focused')
        }
      })
      input.addEventListener('keydown', (e) => {
        this.clearErrors()
        const isEnter = e.key === 'Enter'
        const isTab = e.key === 'Tab'
        if (isEnter) {
          this.evtGo[0].click()
        }
      })
    })
    selects.forEach((select) => {
      select.addEventListener('change', () => {
        this.clearErrors()
      })
    })
  }
  bindSSNInput() {
    const inputs = this.holder.querySelectorAll('input[data-format="ssn"]')
    for (const input of inputs) {
      input.addEventListener('input', (e) => {
        const value = e.target.value
        let newValue = ''
        for (let i = 0; i < value.length; i++) {
          const char = value.charAt(i)
          if (char.match(/^[0-9]$/) && newValue.length < 9) {
            newValue += char
          }
        }
        e.target.value = newValue
      })
      input.addEventListener('blur', (e) => {
        const value = e.target.value
        if (value) {
          let newValue = value.replace(/([^0-9])/g, '')
          newValue = newValue.slice(0, 3) + '—' + newValue.slice(3, 5) + '—' + newValue.slice(5)
          e.target.value = newValue
        }
      })
      input.addEventListener('focus', (e) => {
        e.target.value = e.target.value.replace(/([^0-9])/g, '')
      })
    }
  }
  bindNumberInput() {
    const inputs = this.holder.querySelectorAll('input[data-validate="number"]')
    for (const input of inputs) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault()
        let matrix = "+1 (___) ___-____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
      input.addEventListener('mouseup', event => {
        event.preventDefault()
        if (input.value.length < 4) {
          input.setSelectionRange(4, 4)
        } else {
          input.setSelectionRange(input.value.length, input.value.length)
        }
      })
    }
  }
  bindIDUpload() {
    const input = document.querySelector('#loan_id')
    const box = document.querySelector('[data-loan="files_upload"]')
    const holder = this.filesHolder
    // if (!input || !box || !holder) throw new Error('JS : Bind ID Upload : Input or Box or Holder not found')

    if (input && box && holder) {
      function processFiles(files) {
        if (!files) throw new Error('No files selected')
        files = [...files]
        if (!files.length) return
        for (const file of files) {
          if (!file.type.match('image.*')) continue
          const images = holder.querySelectorAll('img')
          for (const image of images) {
            image.remove()
          }
          let reader = new FileReader()
          reader.onload = (e) => {
            appendImage(e.target.result)
          }
          reader.readAsDataURL(file)
        }
      }

      function appendImage(imgURL) {
        const img = createElem('img', {
          style: {
            'background-image': `url(${imgURL})`
          },
        })
        holder.append(img)
      }

      box.onclick = () => { input.click() }
      input.onchange = (e) => {
        processFiles(e.target.files)
        // input.value = ''
        setTimeout(() => {
          this.adjustActiveSectionHeight()
        }, 10);
      }
      box.ondragover = (e) => {
        e.preventDefault()
        box.classList.add(IS_ACTIVE)
      }
      box.ondragleave = (e) => {
        e.preventDefault()
        box.classList.remove(IS_ACTIVE)
      }
      box.ondrop = (e) => {
        e.preventDefault()
        box.classList.remove(IS_ACTIVE)
        processFiles(e.dataTransfer.files)
      }
    }
  }
  bindDualSelect() {
    const dualArr = this.holder.querySelectorAll('[data-loan-evt="dual_select"]')
    for (const dual of dualArr) {
      const input = dual.querySelector('input:not([type="checkbox"])')
      const checkbox = dual.querySelector('input[type="checkbox"]')
      if (input && checkbox) {
        checkbox.onchange = () => {
          let isChecked = checkbox.checked
          if (isChecked) {
            input.classList.add('--disabled')
            input.setAttribute('disabled', 'disabled')
            if (input.type !== 'range') {
              input.value = ''
            }
          } else {
            input.removeAttribute('disabled')
            input.classList.remove('--disabled')
          }
        }
      }
    }

    const rangeOutputArr = [...this.holder.querySelectorAll('.custom-range__output')]
    for (const input of rangeOutputArr) {
      const parent = input.closest('[data-loan-evt="dual_select"]')
      if (parent) {
        const rangeInput = parent.querySelector('input[type="range"]')
        if (rangeInput) {
          const maxValue = rangeInput.max
          const minValue = rangeInput.min

          input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '')
          })

          input.addEventListener('blur', (e) => {
            e.target.value = Math.max(Math.min(e.target.value, maxValue), minValue)
            rangeInput.value = e.target.value
            rangeInput.dispatchEvent(new Event('input'))
          })
        }
      }
    }
  }
  bindFormatting() {
    const currencyArr = document.querySelectorAll('[data-format="currency"]')
    for (const input of currencyArr) {
      input.addEventListener('blur', () => {
        const val = input.value
        if (val.length) {
          input.value = formatAsCurrency(val)
        }
      })
    }
  }

  /**
   * Initial
   */
  setInitialVar() {
    this.steps = this.sections.length
    if (!this.steps) throw new Error('No Loan Sections Found')
    this.currentStep = 0
    this.stepsLeft = this.steps
    this.endReached = false
    this.atTheStart = true
  }
  setInitialLayout() {
    const firstSection = this.sections[0]
    const height = firstSection.scrollHeight
    this.content.style.height = `${height}px`
    this.content.style.transition = `all ${this.settings.scrollSpeed}ms ${this.settings.easing}`
    this.scroller.style.transition = `all ${this.settings.scrollSpeed}ms ${this.settings.easing}`
    // this.sections.forEach(section => section.style.display = 'flex')
  }
  init() {
    this.setInitialLayout()
    this.setInitialVar()
    this.bindStepEvt()
    this.bindInputEvents()
    this.bindNumberInput()
    this.bindSSNInput()
    this.bindIDUpload()
    this.bindDualSelect()
    this.bindFormatting()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loanCaseHolder = document.querySelector('[data-id="loan-apply"]')
  if (loanCaseHolder) {
    const loanApp = new LoanApp(loanCaseHolder)
    loanApp.init()
  }
})
/* #endregion */

/* #region  Job Apply App */
/**
 * 
 * Job App
 * Icebox Job Apply Application
 * Job Apply Form
 * 
 */
class JobApp {
  constructor(holder, settings = {}) {
    this.holder = holder
    this.filesHolder = this.holder.querySelector('#job_files_upload')
    this.sections = [...this.holder.querySelectorAll('[data-loan-section]')]
    this.content = this.holder.querySelector('.loan-case__content')
    this.scroller = this.holder.querySelector('.loan-scroller')
    this.footer = this.holder.querySelector('.loan-case__footer')
    this.btnGroup = this.holder.querySelector('.loan-case__btn-group')
    this.evtGo = [...this.holder.querySelectorAll('[data-loan-evt="go"]')]
    this.evtToggle = [...this.holder.querySelectorAll('[data-loan-evt="toggle"]')]
    this.evtSubmit = [...this.holder.querySelectorAll('[data-loan-evt="submit"]')]
    this.evtBack = [...this.holder.querySelectorAll('[data-loan-evt="back"]')]
    this.bar = this.holder.querySelector('.loan-bar')
    this.bar_progress = this.holder.querySelector('.loan-bar__progress')
    this.flow = this.holder.querySelector('.loan-flow')
    this.finish = this.holder.querySelector('.loan-finish')
    this.maxSteps = undefined
    this.currentStep = undefined
    this.stepsLeft = undefined
    this.endReached = undefined
    this.atStart = undefined
    this.sliding = false
    this.data = {}
    this.settings = {
      scrollSpeed: settings.scrollSpeed || 600,
      easing: settings.easing || 'cubic-bezier(.39, .575, .565, 1)',
    }
  }

  /**
   * Utils
   */
  get getLeftSteps() {
    return this.steps - this.currentStep
  }
  get getActiveSection() {
    return this.sections[this.currentStep]
  }
  get getActiveInput() {
    const section = this.getActiveSection
    if (section && section.contains(document.activeElement)) {
      if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT') {
        return document.activeElement
      }
    } else {
      return undefined
    }
  }
  get getLoaderHTML() {
    return `
                            <div>
                                <div>
                                    <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xml:space="preserve">
                                        <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946 s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634 c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"></path>
                                        <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0C22.32,8.481,24.301,9.057,26.013,10.047z"></path>
                                        <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20" dur="0.5s" repeatCount="indefinite"></animateTransform>
                                    </svg>
                                </div>
                            </div>
    `
  }
  createElem(tagName, options) {
    const { className, id, innerHTML, style, attributes, toAppend } = options
    const elem = document.createElement(tagName)
    if (className) elem.className = className;
    if (id) elem.id = id;
    if (innerHTML) elem.innerHTML = innerHTML;
    if (style) {
      for (const key in options.style) { elem.style[key] = options.style[key] }
    }
    if (attributes) {
      for (const key in options.attributes) { elem.setAttribute(key, options.attributes[key]) }
    }
    if (toAppend) {
      for (const child of toArray(toAppend)) { elem.appendChild(child) }
    }
    return elem
  }
  toArray(target) {
    return Array.isArray(target) ? target : [target]
  }
  loadingOn(timeToRemove) {
    if (this.holder.querySelector('.loan-case-loader')) return
    const loader = createElem('div', {
      className: 'loan-case-loader',
      innerHTML: this.getLoaderHTML
    })
    this.holder.appendChild(loader)
    setTimeout(() => {
      this.holder.classList.add(__LOCKED)
      if (timeToRemove) {
        setTimeout(() => {
          this.holder.classList.remove(__LOCKED)
          setTimeout(() => {
            loader.remove()
          }, 350);
        }, timeToRemove);
      }
    }, 1);
  }
  loadingOff() {
    this.holder.classList.remove(__LOCKED)
    const loader = this.holder.querySelector('.loan-case-loader')
    if (loader) {
      setTimeout(() => {
        loader.remove()
      }, 350);
    }
  }
  showInputError(input, text) {
    const err = document.querySelector('.loan-input-error') ? document.querySelector('.loan-input-error') : createElem('div', {
      className: 'loan-input-error',
      innerHTML: text
    })
    if (input) {
      input.classList.add(__INVALID)
    }
    this.footer.prepend(err)
  }
  clearErrors() {
    const activeSection = this.getActiveSection
    const inputs = [...activeSection.querySelectorAll('input'), ...activeSection.querySelectorAll('select')]
    inputs.forEach(input => input.classList.remove(__INVALID))
    const err = this.holder.querySelector('.loan-input-error')
    if (err) err.remove()
  }
  observeBar() {
    const prevSections = this.sections.slice(0, this.currentStep).length
    const progress = (prevSections + 1) / this.steps * 100
    this.bar_progress.style.width = `${progress}%`
  }
  clearAllFields() {
    const inputs = [...this.holder.querySelectorAll('input:not([type="checkbox"])')]
    const selects = [...this.holder.querySelectorAll('select')]
    const checkboxes = [...this.holder.querySelectorAll('input[type="checkbox"]')]
    const fullArr = [...inputs, ...selects, ...checkboxes]

    inputs.forEach(input => input.value = '')
    selects.forEach(select => select.selectedIndex = 0)
    checkboxes.forEach((checkbox) => { checkbox.checked = false })
    fullArr.forEach(elem => elem.dispatchEvent(new Event('change')))
  }

  /**
   * Main
   */
  save() {
    $('#job_application_form').submit();
  }
  finishMessage() {
    this.loadingOn(1000)
    setTimeout(() => {
      this.flow.style.opacity = 0
      let currentHeight = this.holder.offsetHeight
      this.holder.style.height = `${currentHeight}px`
      setTimeout(() => {
        this.finish.style.display = 'block'
        let scrollH = this.finish.scrollHeight
        this.holder.style.height = `${scrollH}px`
        setTimeout(() => {
          this.finish.style.opacity = 1
          window.scrollTo(0, 0)
          const confetti = new PageConfetti()
          confetti.push(false)
        }, 10);
      }, getTransitionTime(this.flow) + 10)
    }, 800);
  }
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
  validate(section) {
    const requiredTextInputs = [...section.querySelectorAll('input[type="text"][required]:not(.--disabled'), ...section.querySelectorAll('input[type="email"][required]')]
    const emptyInputs = requiredTextInputs.filter(input => !input.value)
    const numberInputs = section.querySelectorAll('input[data-validate="number"]')
    const selectInputs = section.querySelectorAll('select[required]')
    const emailInputs = section.querySelectorAll('input[data-validate="email"]')
    const zipInputs = section.querySelectorAll('input[data-validate="zip_code"]')
    const fileInputs = section.querySelectorAll('input[required][type="file"]')
    const sectionID = section.dataset.loanSection

    if (requiredTextInputs.some(input => input.classList.contains(__INVALID))) return false

    if (selectInputs.length) {
      for (const select of selectInputs) {
        if (!select.value) {
          this.showInputError(select, 'Please select an option')
          return false
        }
      }
    }
    if (numberInputs.length) {
      const value = numberInputs[0].value
      const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}\-\d{4}$/
      if (!regex.test(value)) {
        this.showInputError(numberInputs[0], 'Please enter a valid phone number')
        return false
      }
    }
    if (emailInputs.length) {
      const value = emailInputs[0].value
      const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      if (!regex.test(value)) {
        this.showInputError(emailInputs[0], 'Please enter a valid email')
        return false
      }
    }
    if (zipInputs.length) {
      const value = zipInputs[0].value
      const regex = /^\d{5}$/
      if (!regex.test(value)) {
        this.showInputError(zipInputs[0], 'Please enter a valid zip code')
        return false
      }
    }
    if (emptyInputs.length) {
      this.showInputError(emptyInputs[0], 'This field is required')
      return false
    }
    if (fileInputs.length) {
      for (const input of fileInputs) {
        if (!input.files[0]) {
          console.log(input.files)
          this.showInputError(null, 'Please upload a file')
          return false
        }
      }
    }
    this.clearErrors()
    return true
  }
  adjustActiveSectionHeight() {
    const activeSection = this.getActiveSection
    if (activeSection) {
      const height = activeSection.scrollHeight
      this.content.style.height = `${height}px`
    }
  }
  toggle() {
    const body = document.querySelector('body')
    const headerNav = document.querySelector('.header__sub-nav')
    const welcome = document.querySelector('.subpage__welcome')
    const footerMain = document.querySelector('.footer__wrapper > .wrapper')
    const loanWelcome = document.querySelector('.loan-welcome')
    const heading = document.querySelector('.loan-case__heading')
    const backGroup = document.querySelector('.loan-case__back-group')
    const CASE_CLASS = 'loan_case'
    const elements = [headerNav, welcome, footerMain, loanWelcome]

    const hideElement = (el) => {
      const curHeight = el.scrollHeight
      el.style.height = `${curHeight}px`
      setTimeout(() => {
        el.style.overflow = 'hidden'
        el.style.height = '0px'
      }, 1);
    }
    const showElement = (el) => {
      const curHeight = window.getComputedStyle(el).getPropertyValue('height')
      const scrollHeight = el.scrollHeight
      el.style.height = `${curHeight}`
      setTimeout(() => {
        el.style.overflow = 'visible'
        el.style.height = `${scrollHeight}px`
      }, 1)
    }

    const hideLoan = () => {
      body.classList.remove(CASE_CLASS)
      for (const element of elements) {
        if (element) showElement(element)
      }

      this.scroller.style.display = 'none'
      this.content.style.height = `0px`

      if (backGroup) {
        backGroup.style.height = `0px`
      }

      if (heading) {
        heading.innerHTML = 'Welcome To the Icebox Max Approval Financing Form'
        heading.classList.remove('--big')
      }

      this.clearErrors()
      this.back(1)
      this.clearAllFields()
    }
    const showLoan = () => {
      body.classList.add('loan_case')
      for (const element of elements) {
        if (element) hideElement(element)
      }

      this.scroller.style.display = 'flex'
      this.content.style.height = `${this.sections[0].scrollHeight}px`

      if (backGroup) {
        backGroup.style.height = `${backGroup.scrollHeight}px`
      }

      if (heading) {
        heading.innerHTML = 'Job Application'
        heading.classList.add('--big')
      }
    }

    if (body.classList.contains(CASE_CLASS)) {
      const askModal = new AskModal({
        heading: 'Are You Sure You Want To Exit Financing App?',
        subheading: 'You will lose all the progress. Keep filling out the form and get approved as soon as possible!',
        exitText: 'Exit',
        keepText: 'Keep Filling',
        exitCallback: hideLoan,
      })
      askModal.show()
    } else {
      showLoan()
    }
  }
  tabPress() {
    if (!this.sliding) {
      const activeInput = this.getActiveInput
      if (!activeInput) {
        const section = this.getActiveSection
        const inputArray = [...section.querySelectorAll('input:not(.--disabled), select:not(.--disabled)')]
        if (inputArray.length) {
          let inputToFocus
          const invalidInputs = inputArray.filter(input => input.classList.contains('--invalid'))
          if (invalidInputs.length) {
            inputToFocus = invalidInputs[0]
          } else {
            const emptyInputs = inputArray.filter(input => !input.value && input.value !== 0)
            if (emptyInputs.length) {
              inputToFocus = emptyInputs[0]
            } else {
              inputToFocus = inputArray[0]
            }
          }
          inputToFocus.focus()
        }
      } else {
        const activeInputWrap = activeInput.parentNode.closest('.loan-input-wrap')
        const nextInputWrap = activeInputWrap.nextElementSibling
        if (nextInputWrap) {
          const nextInput = nextInputWrap.querySelector('input, select')
          if (nextInput) {
            nextInput.focus()
          }
        } else {
          const firstInputWrap = this.getActiveSection.querySelector('.loan-input-wrap')
          const firstInput = firstInputWrap.querySelector('input, select')
          if (firstInput) {
            firstInput.focus()
          }
        }
      }
    }
  }

  /**
   * Bind Events
   */
  bindStepEvt() {
    this.evtGo.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        const section = this.getActiveSection
        if (this.validate(section)) this.go()
      })
    })
    this.evtBack.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.back()
      })
    })
    this.evtSubmit.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        this.evtGo[0].click()
      })
    })
    this.evtToggle.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        this.toggle()
      })
    })

  }
  bindInputEvents() {
    const inputs = [...this.holder.querySelectorAll('input')]
    const selects = [...this.holder.querySelectorAll('select')]
    const noWebsiteCheckbox = this.holder.querySelector('#loan_employer_website')
    const inputWebsiteEmployer = this.holder.querySelector('#loan_employer_website')

    document.addEventListener('keydown', (e) => {
      const isTab = e.key === 'Tab'
      if (isTab) {
        if (document.body.classList.contains('loan_case')) {
          e.preventDefault()
          this.tabPress()
        }
      }
    })

    inputs.forEach((input) => {
      input.addEventListener('focus', () => {
        this.clearErrors()
        const parent = input.parentNode.closest('.loan-input-wrap')
        if (parent) {
          parent.classList.add('--focused')
        }
      })
      input.addEventListener('blur', () => {
        const parent = input.parentNode.closest('.loan-input-wrap')
        if (parent) {
          parent.classList.remove('--focused')
        }
      })
      input.addEventListener('keydown', (e) => {
        this.clearErrors()
        const isEnter = e.key === 'Enter'
        const isTab = e.key === 'Tab'
        if (isEnter) {
          this.evtGo[0].click()
        }
      })
    })
    selects.forEach((select) => {
      select.addEventListener('change', () => {
        this.clearErrors()
      })
    })
  }
  bindSSNInput() {
    const inputs = this.holder.querySelectorAll('input[data-format="ssn"]')
    for (const input of inputs) {
      input.addEventListener('input', (e) => {
        const value = e.target.value
        let newValue = ''
        for (let i = 0; i < value.length; i++) {
          const char = value.charAt(i)
          if (char.match(/^[0-9]$/) && newValue.length < 9) {
            newValue += char
          }
        }
        e.target.value = newValue
      })
      input.addEventListener('blur', (e) => {
        const value = e.target.value
        if (value) {
          let newValue = value.replace(/([^0-9])/g, '')
          newValue = newValue.slice(0, 3) + '—' + newValue.slice(3, 5) + '—' + newValue.slice(5)
          e.target.value = newValue
        }
      })
      input.addEventListener('focus', (e) => {
        e.target.value = e.target.value.replace(/([^0-9])/g, '')
      })
    }
  }
  bindNumberInput() {
    const inputs = this.holder.querySelectorAll('input[data-validate="number"]')
    for (const input of inputs) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault()
        let matrix = "+1 (___) ___-____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
      input.addEventListener('mouseup', event => {
        event.preventDefault()
        if (input.value.length < 4) {
          input.setSelectionRange(4, 4)
        } else {
          input.setSelectionRange(input.value.length, input.value.length)
        }
      })
    }
  }
  bindResumeUpload() {
    const input = document.querySelector('#job_resume')
    const box = document.querySelector('[data-loan="files_upload"]')
    const holder = this.filesHolder
    // if (!input || !box || !holder) throw new Error('JS : Bind ID Upload : Input or Box or Holder not found')

    if (input && box && holder) {

      function processFiles(files) {
        const allowedExtensions = ['pdf', 'docx', 'doc']
        for (const file of files) {
          const name = file.name.toLowerCase()
          const extension = name.split('.').pop()
          if (allowedExtensions.includes(extension)) {
            console.log(file)
          }
        }
      }

      box.onclick = () => {
        this.clearErrors()
        input.click()
      }
      input.onchange = (e) => {
        processFiles(e.target.files)
      }
      box.ondragover = (e) => {
        this.clearErrors()
        e.preventDefault()
        box.classList.add(IS_ACTIVE)
      }
      box.ondragleave = (e) => {
        this.clearErrors()
        e.preventDefault()
        box.classList.remove(IS_ACTIVE)
      }
      box.ondrop = (e) => {
        this.clearErrors()
        e.preventDefault()
        box.classList.remove(IS_ACTIVE)
      }
    }
  }
  bindDualSelect() {
    const dualArr = this.holder.querySelectorAll('[data-loan-evt="dual_select"]')
    for (const dual of dualArr) {
      const input = dual.querySelector('input:not([type="checkbox"])')
      const checkbox = dual.querySelector('input[type="checkbox"]')
      if (input && checkbox) {
        checkbox.onchange = () => {
          let isChecked = checkbox.checked
          if (isChecked) {
            input.classList.add('--disabled')
            input.setAttribute('disabled', 'disabled')
            if (input.type !== 'range') {
              input.value = ''
            }
          } else {
            input.removeAttribute('disabled')
            input.classList.remove('--disabled')
          }
        }
      }
    }

    const rangeOutputArr = [...this.holder.querySelectorAll('.custom-range__output')]
    for (const input of rangeOutputArr) {
      const parent = input.closest('[data-loan-evt="dual_select"]')
      if (parent) {
        const rangeInput = parent.querySelector('input[type="range"]')
        if (rangeInput) {
          const maxValue = rangeInput.max
          const minValue = rangeInput.min

          input.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, '')
          })

          input.addEventListener('blur', (e) => {
            e.target.value = Math.max(Math.min(e.target.value, maxValue), minValue)
            rangeInput.value = e.target.value
            rangeInput.dispatchEvent(new Event('input'))
          })
        }
      }
    }
  }
  bindFormatting() {
    const currencyArr = document.querySelectorAll('[data-format="currency"]')
    for (const input of currencyArr) {
      input.addEventListener('blur', () => {
        const val = input.value
        if (val.length) {
          input.value = formatAsCurrency(val)
        }
      })
    }
  }

  /**
   * Initial
   */
  setInitialVar() {
    this.steps = this.sections.length
    if (!this.steps) throw new Error('No Loan Sections Found')
    this.currentStep = 0
    this.stepsLeft = this.steps
    this.endReached = false
    this.atTheStart = true
  }
  setInitialLayout() {
    const firstSection = this.sections[0]
    const height = firstSection.scrollHeight
    this.content.style.height = `${height}px`
    this.content.style.transition = `all ${this.settings.scrollSpeed}ms ${this.settings.easing}`
    this.scroller.style.transition = `all ${this.settings.scrollSpeed}ms ${this.settings.easing}`
    // this.sections.forEach(section => section.style.display = 'flex')
  }
  init() {
    this.setInitialLayout()
    this.setInitialVar()
    this.bindStepEvt()
    this.bindInputEvents()
    this.bindNumberInput()
    this.bindSSNInput()
    this.bindResumeUpload()
    this.bindDualSelect()
    this.bindFormatting()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const jobCaseHolder = document.querySelector('[data-id="job-apply"]')
  if (jobCaseHolder) {
    const jobApp = new JobApp(jobCaseHolder)
    jobApp.init()
  }
})
/* #endregion */


/* #region  Sell My Watch */
/**
 * Sell My Watch Class
 * @class
 */
class SellWatch {
  constructor() {
    this.form = document.querySelector('form#sell_my_watch')
    this.sectionsArr = [...document.querySelectorAll('[data-ask-section]')]
    this.progressBar = document.querySelector('.ask-page__progress-bar')
    this.currentStepElem = document.querySelector('[data-step-current]')
    this.countStepElem = document.querySelector('[data-step-count]')
    this.contentContainer = document.querySelector('.ask-page__quiz-content')
    this.adjustContainer = document.querySelector('.ask-page__quiz-adjust')

    this.focusedEl = undefined
    this.watchBrand = {
      name: undefined
    }
    this.uploadInput = this.form.querySelector('input[type="file"]')
    this.regExp = {
      rolex: /\brolex\b/i,
      audemars: /\baudemars\b/i,
      richard: /\brichard\b/i,
      patek: /\bpatek\b/i,
      cartier: /\bcartier\b/i,
      breitling: /\bbreitling\b/i
    }

    this.locked = false
    this.steps = this.sectionsArr.length
    this.currentStep = 1
    this.activeSection = this.sectionsArr[0]
    this.endReached = false
    this.atTheStart = true
  }

  /**
   * Getters
   */
  get getActiveSection() {
    return this.activeSection
  }
  get getCurrentStep() {
    return this.currentStep
  }
  get getFocusedEl() {
    return this.focusedEl
  }

  /**
   * Methods
   */
  toggleSectionStatus(section, condition) {
    if (condition === false) {
      section.classList.remove(__VALID)
    } else {
      section.classList.add(__VALID)
    }
    const btn = [...section.querySelectorAll('[data-sell-evt="next"]')]
    btn.forEach(btn => btn.disabled = !condition)
  }
  validateSection(section) {
    section = this.getActiveSection

    const
      requiredArr = [...section.querySelectorAll('[required]:not([disabled])')],
      radioArr = [...section.querySelectorAll('input[type="radio"]:not([disabled])')],
      checkboxArr = [...section.querySelectorAll('input[type="checkbox"]:not([disabled])')],
      inputArr = [...section.querySelectorAll('input:not([type="checkbox"]):not([type="radio"])')],
      selectArr = [...section.querySelectorAll('select[required]')],
      phoneArr = [...section.querySelectorAll('[data-validate="phone"]')],
      fileArr = [...section.querySelectorAll('input[type="file"]')]

    const radioArrByName = Array.from(
      new Set(radioArr.map(radio => radio.name)),
      name => radioArr.filter(radio => radio.name === name)
    )

    if (requiredArr.some(input => !input.value)) {
      this.toggleSectionStatus(section, false)
      return false
    }

    for (const radioGroup of radioArrByName) {
      if (radioGroup.every(radio => !radio.checked)) {
        this.toggleSectionStatus(section, false)
        return false
      }
    }

    if (checkboxArr.length && checkboxArr.every(checkbox => !checkbox.checked)) {
      this.toggleSectionStatus(section, false)
      return false
    }

    if (phoneArr.length) {
      for (const input of phoneArr) {
        const value = input.value
        const valueDigits = value.replace(/\D/g, '').length
        const regex = /^\+\d{1}\s\(\d{3}\)\s\d{3}\-\d{4}$/
        if (!regex.test(value) && valueDigits < 11) {
          this.toggleSectionStatus(section, false)
          return false
        }
      }
    }

    for (const fileInput of fileArr) {
      const files = fileInput.files
      if (!files.length) {
        this.toggleSectionStatus(section, false)
        return false
      }
    }

    this.toggleSectionStatus(section, true)
    return true
  }
  arrangeModels(string) {
    const
      inputArr = [...this.form.querySelectorAll('input[type="radio"][name="model"]')],
      groupInputArr = inputArr.filter(input => input.dataset.group),
      filteredArr = groupInputArr.filter(input => { return string.toLowerCase().includes(input.dataset.group) }),
      modelGrid = this.form.querySelector('[data-sell-grid="model"]'),
      modelInput = this.form.querySelector('input#watch_model'),
      modelInputParent = modelInput.closest('.survey-box__named-grid')

    inputArr.forEach(input => input.checked = false)
    // inputArr.forEach(input => input.dispatchEvent(new Event('change')))
    modelInput.value = ''
    modelInput.dispatchEvent(new Event('input'))

    if (!filteredArr.length) {
      modelGrid.style.display = 'none'
      modelInputParent.style.display = 'flex'
      modelInput.disabled = false
      inputArr.forEach(input => {
        input.disabled = true
        input.checked = false
        // input.dispatchEvent(new Event('change'))
      })
    } else {
      modelGrid.style.display = 'flex'
      modelInputParent.style.display = 'none'
      modelInput.disabled = true
      inputArr.forEach(input => {
        const label = input.closest('label')
        input.disabled = false
        input.checked = false
        if (!filteredArr.includes(input) && input.value !== 'Other') {
          if (input.value) {
            label.style.display = 'none'
          }
        } else {
          label.style.display = 'block'
        }
        // input.dispatchEvent(new Event('change'))
      })
    }
  }

  /**
   * Utils
   */
  observeStepsElements() {
    this.currentStepElem.innerHTML = this.currentStep
  }
  observeBarElements() {
    const elements = this.progressBar.querySelectorAll('span')
    elements.forEach((element, index) => {
      if (index < this.currentStep) {
        element.classList.add(__ACTIVE)
      } else {
        element.classList.remove(__ACTIVE)
      }
    })
  }
  scrollToForm() {
    if (this.form) {
      const headerHeight = parseInt(window.getComputedStyle(document.querySelector('header')).getPropertyValue('height'))
      const boundTop = this.form.getBoundingClientRect().top
      if ((boundTop - headerHeight) < -30) {
        const distance = (window.scrollY + this.form.getBoundingClientRect().top) - (headerHeight + 70)
        zenscroll.toY(distance)
      }
    }
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
            if (type === 'file') {
              elem.click()
            } else {
              elem.focus()
            }
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

  /**
   * Events
   */
  slide(section, activeSection, number) {
    const sectionIndex = this.sectionsArr.indexOf(section)
    const activeSectionIndex = this.sectionsArr.indexOf(activeSection)

    let fromTranslate = 'translateY(24px)'
    let toTranslate = 'translateY(-24px)'

    if (activeSectionIndex > sectionIndex) {
      fromTranslate = 'translateY(-24px)'
      toTranslate = 'translateY(24px)'

      const inputs = [...activeSection.querySelectorAll('input')]
    }

    this.locked = true
    activeSection.style.opacity = 0
    activeSection.style.pointerEvents = 'none'
    activeSection.style.transform = toTranslate
    section.style.opacity = 0
    section.style.pointerEvents = 'none'
    section.style.transform = fromTranslate
    setTimeout(() => {
      activeSection.style.display = 'none'
      activeSection.classList.remove(__ACTIVE)
      section.style.display = 'flex'
      section.classList.add(__ACTIVE)
      setTimeout(() => {
        section.style.opacity = 1
        section.style.transform = 'translateY(0px)'
        section.style.pointerEvents = 'auto'

        this.locked = false
        this.activeSection = section
        this.currentStep = number
        this.observeStepsElements()
        this.observeBarElements()

        if (section === this.sectionsArr[this.sectionsArr.length - 1]) {
          this.form.submit()
        }
      }, 30)
    }, getTransitionTime(activeSection))
  }
  finish() {
    const confetti = new PageConfetti()
    confetti.push()
  }
  go(number) {
    if (!this.locked) {
      const section = this.sectionsArr[number - 1]
      const activeSection = this.getActiveSection

      if (!section) {
        const error = number < 1 ? 'Section number cannot be less than 1' : 'Section number cannot be greater than ' + this.sectionsArr.length
        throw new Error(error)
      }
      if (!activeSection) {
        throw new Error('No active section')
      }

      if (section !== activeSection) {
        this.slide(section, activeSection, number)
        this.scrollToForm()
        this.focusedEl = undefined
      }
    }
  }


  /**
   * Bind Events
   */
  bindToggleStepsControls() {
    for (const section of this.sectionsArr) {
      const inputs = [...section.querySelectorAll('input, select')]
      inputs.forEach((input) => {
        const isCheckboxOrRadio = input.type === 'checkbox' || input.type === 'radio' || input.type === 'file'
        if (isCheckboxOrRadio) {
          input.addEventListener('change', (e) => {
            this.validateSection(section)
          })
        } else {
          input.addEventListener('input', (e) => {
            this.validateSection(section)
          })
        }
      })
    }
  }
  bindDualSelect() {
    const dualArr = [...this.form.querySelectorAll('input[data-dual]')]
    for (const input of dualArr) {
      const
        name = input.name,
        dualName = input.dataset.dual,
        nameInputArr = [...this.form.querySelectorAll(`input[name="${name}"]`)],
        holder = this.form.querySelector(`div[data-dual="${dualName}"]`)

      if (holder) {
        const select = holder.querySelector('select, input')
        if (select) {
          nameInputArr.forEach((nameInput) => {
            nameInput.addEventListener('change', () => {
              if (input.checked) {
                select.disabled = false
                holder.style.display = 'flex'
              } else {
                select.disabled = true
                holder.style.display = 'none'
              }
            })
          })
        }
      }
    }
  }
  bindBrandSelect() {
    const brandSelectArr = [...this.form.querySelectorAll('*[name="brand"]')]
    const elsToName = [...this.form.querySelectorAll('[data-sell-brand]')]
    for (const input of brandSelectArr) {
      input.addEventListener('change', (e) => {
        if (input.disabled) return
        const value = input.value
        if (value && value.toLowerCase() !== 'other') {
          this.watchBrand.name = value
          elsToName.forEach(el => el.innerHTML = this.watchBrand.name)
        } else {
          this.watchBrand.name = undefined
          elsToName.forEach(el => el.innerHTML = 'your brand')
        }

        // Setup models
        this.arrangeModels(value)
      })
    }
  }
  bindPhoneInput() {
    const inputs = [...this.form.querySelectorAll('input[data-validate="phone"]')]
    for (const input of inputs) {
      let keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault()
        let matrix = "+1 (___) ___-____",
          i = 0,
          def = matrix.replace(/\D/g, ""),
          val = this.value.replace(/\D/g, ""),
          newValue = matrix.replace(/[_\d]/g, function (a) {
            return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
          });
        i = newValue.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          newValue = newValue.slice(0, i);
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
          function (a) {
            return "\\d{1," + a.length + "}";
          }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = newValue;
        if (event.type == "blur" && this.value.length < 5) this.value = "";
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false);
      input.addEventListener('mouseup', event => {
        event.preventDefault()
        if (input.value.length < 4) {
          input.setSelectionRange(4, 4)
        } else {
          input.setSelectionRange(input.value.length, input.value.length)
        }
      })
    }
  }
  bindCurrencyInput() {
    const inputArr = [...this.form.querySelectorAll('input[data-format="currency"]')]
    for (const input of inputArr) {
      input.addEventListener('blur', () => {
        if (input.value) {
          input.value = formatAsCurrency(input.value)
        }
      })
    }
  }
  bindHandlers() {
    const nextArr = [...this.form.querySelectorAll('[data-sell-evt="next"]')]
    const backArr = [...this.form.querySelectorAll('[data-sell-evt="back"]')]

    for (const btn of nextArr) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        if (!btn.disabled) {
          this.go(this.getCurrentStep + 1)
        }
      })
    }

    for (const btn of backArr) {
      btn.addEventListener('click', (e) => {
        e.preventDefault()
        if (!btn.disabled) {
          this.go(this.getCurrentStep - 1)
        }
      })
    }
  }
  bindSetFocusedElement() {
    const inputs = [...this.form.querySelectorAll('input, select, textarea')]
    for (const input of inputs) {
      input.addEventListener('change', () => { this.focusedEl = input })
      input.addEventListener('focus', () => { this.focusedEl = input })
    }
  }
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
        if (!document.activeElement || !document.activeElement.contains(section)) return
        const btn = section.querySelector('[data-sell-evt="back"]')
        if (btn && !btn.disabled) {
          e.preventDefault()
          btn.click()
        }
      }

      if (keyIsEnter) {
        const btn = section.querySelector('[data-sell-evt="next"]')
        if (btn) {
          e.preventDefault()
          if (!btn.disabled) {
            btn.click()
          }
        }
      }

      if (keyIsTab) {
        e.preventDefault()
        const focusedEl = this.getFocusedEl
        const inputs = [...section.querySelectorAll('input, select, textarea')].filter((input) => {
          if (!input.disabled) {
            const selectBox = input.parentNode.closest('.survey-select')
            if (selectBox) {
              if (selectBox.style.display !== 'none') {
                return input
              }
            } else {
              return input
            }
          }
        }).sort((a, b) => a.compareDocumentPosition(b) - 2)
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
          } else {
            elem = inputs[0]
          }
        }

        this.dispatchFocusEvent(elem)
      }
    })
  }
  bindSubmit() {
    $(this.form).on('submit', function (e) {
      e.preventDefault();
      var form = $(this);
      var formData = new FormData(this);
      var actionUrl = form.attr('action');
      $.ajax({
        url: actionUrl,
        type: 'POST',
        data: formData,
        cache: false,
        contentType: false,
        processData: false,
        success: function (data) {
          var r = $.parseJSON(data);
          if (!r.error) {
            this.finish()
          } else {
            //show error message 
            alert(r.msg);
          }
        }
      })
    });
  }

  /**
   * Setup
   */
  setupBar() {
    if (this.progressBar) {
      let html = ''
      this.sectionsArr.forEach((section, index) => {
        html += `<span data-bar-id="${index}"></span>`
      })
      this.progressBar.innerHTML = html
    }
    if (this.currentStepElem && this.countStepElem) {
      this.currentStepElem.innerHTML = 1
      this.countStepElem.innerHTML = this.sectionsArr.length
    }
  }
  setup() {
    this.setupBar()
    this.go(1)
    this.observeStepsElements()
    this.observeBarElements()
    this.bindHandlers()
  }


  /**
   * Initialize
   */
  init() {
    if (this.form) {
      this.bindDualSelect()
      this.bindToggleStepsControls()
      this.bindBrandSelect()
      this.bindPhoneInput()
      this.bindCurrencyInput()
      this.bindSetFocusedElement()
      this.bindKeyEvents()
      this.bindSubmit()
      this.setup()
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form#sell_my_watch')
  if (form) {
    window.sellMyWatch = new SellWatch()
    window.sellMyWatch.init()
  }
})
/* #endregion */


/* #region  Loose Diamonds */
class LooseDiamonds {
  constructor() {
    this.main = document.querySelector('.loose_diamonds')
    this.resultsContainer = document.querySelector('.loose__results')
    this.viewBtnArr = [...document.querySelectorAll('.loose__view-btn')]
    this.looseSelectArr = [...document.querySelectorAll('.loose-select')]
    this.dmBtnArr = [...document.querySelectorAll('.dm-filter-btn')]
    this.sortModalActive = false
    if (this.main) {
      this.init()
    }
  }

  // Methods
  listView() {
    this.main.classList.add('--list')
  }
  gridView() {
    this.main.classList.remove('--list')
  }
  observeFilters() {
    for (const select of this.looseSelectArr) {
      const btnArr = [...select.querySelectorAll('.loose-filter-btn')]
      const inputArr = [...select.querySelectorAll('input[type="text"]')]

      const someIsChecked = btnArr.some(el => el.classList.contains(__ACTIVE))
      const someIsValue = inputArr.some(el => el.value.length > 0)

      if (someIsChecked || someIsValue) {
        select.classList.add(__SELECTED)
      } else {
        select.classList.remove(__SELECTED)
      }
    }
  }
  resetFilters() {
    for (const select of this.looseSelectArr) {
      const btnArr = [...select.querySelectorAll('.loose-filter-btn')]
      const inputArr = [...select.querySelectorAll('input[type="text"]')]

      btnArr.forEach(el => el.classList.remove(__ACTIVE))
      inputArr.forEach(el => el.value = '')

      select.classList.remove(__SELECTED)
    }
  }
  openSortModal() {
    const sortModal = document.querySelector('.sort-modal')
    const closeCallback = () => { this.closeSortModal(true) }
    if (sortModal) {
      window.looseSortBackdrop = new Backdrop({
        half: true,
        callback: closeCallback
      })
      lockScroll()
      sortModal.style.display = 'block'
      setTimeout(() => {
        sortModal.classList.add(__ACTIVE)
      }, 5);
    }
  }
  closeSortModal(cond = false) {
    const sortModal = document.querySelector('.sort-modal')
    if (sortModal) {
      unlockScroll()
      sortModal.classList.remove(__ACTIVE)
      setTimeout(() => {
        sortModal.style.display = 'none'
      }, getTransitionTime(sortModal));
      if (!cond) {
        const backdrop = window.looseSortBackdrop
        if (backdrop) {
          backdrop.hide()
        }
      }

      const rowArr = [...document.querySelectorAll('.sort-modal-row')]
      for (const row of rowArr) {
        row.querySelector('.sort-modal-row__body').style.height = 0
      }
    }
  }
  applyFilters() {
    this.closeSortModal()
  }

  // Bind Events
  bindLooseSelects() {
    for (const select of this.looseSelectArr) {
      const btn = select.querySelector('.loose-select__btn')
      const drop = select.querySelector('.loose-select__drop')
      if (btn && drop) {
        btn.addEventListener('click', () => {
          if (select.classList.contains(__ACTIVE)) {
            select.classList.remove(__ACTIVE)
          } else {
            this.looseSelectArr.forEach(el => el.classList.remove(__ACTIVE))
            select.classList.add(__ACTIVE)
          }
        })
      }
    }

    window.addEventListener('scroll', () => {
      if (this.looseSelectArr.some(el => el.classList.contains(__ACTIVE))) {
        this.looseSelectArr.forEach(el => el.classList.remove(__ACTIVE))
      }
    })

    document.addEventListener('click', (e) => {
      const target = e.target
      if (!target.closest('.loose-select')) {
        this.looseSelectArr.forEach(el => el.classList.remove(__ACTIVE))
      }
    })
  }
  bindFilterBtnGroup() {
    const groupArr = [...document.querySelectorAll('[data-filter-group]')]
    for (const group of groupArr) {
      const btnArr = [...group.querySelectorAll('.loose-filter-btn')]
      for (const btn of btnArr) {
        btn.addEventListener('click', () => {
          btn.classList.toggle(__ACTIVE)
          this.observeFilters()
        })
      }
    }

    for (const select of this.looseSelectArr) {
      const inputArr = [...select.querySelectorAll('input[type="text"]')]
      for (const input of inputArr) {
        input.addEventListener('input', () => {
          this.observeFilters()
        })
      }
    }
  }
  bindDmSelectClick() {
    const fade = (except = undefined) => {
      this.dmBtnArr.forEach(el => {
        if (el !== except && !el.classList.contains(__ACTIVE)) {
          el.classList.add(__FADE)
        }
      })
    }

    const reset = () => {
      this.dmBtnArr.forEach(el => {
        el.classList.remove(__ACTIVE)
        el.classList.remove(__FADE)
      })
    }

    for (const btn of this.dmBtnArr) {
      btn.addEventListener('click', () => {
        const someFaded = this.dmBtnArr.some(el => el.classList.contains(__FADE))
        const targetActive = btn.classList.contains(__ACTIVE)
        const targetFaded = btn.classList.contains(__FADE)
        const target = btn

        if (targetActive) {
          target.classList.remove(__ACTIVE)
          if (this.dmBtnArr.some(el => el.classList.contains(__ACTIVE))) {
            target.classList.add(__FADE)
          } else {
            reset()
          }
        } else {
          target.classList.add(__ACTIVE)
          target.classList.remove(__FADE)
          fade(target)
        }

      })
    }
  }
  bindSortModalEvents() {
    const modal = document.querySelector('.sort-modal')
    if (modal) {
      const rowArr = [...modal.querySelectorAll('.sort-modal-row')]
      for (const row of rowArr) {
        const head = row.querySelector('.sort-modal-row__head')
        const body = row.querySelector('.sort-modal-row__body')

        if (head && body) {
          head.addEventListener('click', () => {
            if (body.clientHeight > 0) {
              row.classList.remove(__ACTIVE)
              body.style.height = 0
            } else {
              rowArr.forEach((r) => {
                if (r !== row) {
                  r.classList.remove(__ACTIVE)
                  r.querySelector('.sort-modal-row__body').style.height = 0
                }
              })
              row.classList.add(__ACTIVE)
              const content = body.querySelector('.sort-modal-row__content')
              body.style.height = `${content.scrollHeight + 1}px`
            }
          })
        }
      }
    }
  }

  init() {
    this.bindLooseSelects()
    this.bindFilterBtnGroup()
    this.bindDmSelectClick()
    this.observeFilters()
    this.bindSortModalEvents()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.loose = new LooseDiamonds()
})
/* #endregion */

/* #region Watch Variants Modal */
class VariantsModal {
  constructor() {
    this.rootEl = document.querySelector('#watchVariants')
    if (this.rootEl) {
      this.init()
    }
  }

  init() {
    new Backdrop({
      half: true
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // window.watchVariants = new VariantsModal()
})
/* #endregion */