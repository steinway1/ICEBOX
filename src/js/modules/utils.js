function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
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
function elemDisplayed(elem) {
  if (!elem) return false
  let target = elem instanceof jQuery ? elem.get(0) : elem
  return window.getComputedStyle(target).getPropertyValue('display') !== 'none'
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
function removeClasses(elem, ...classes) {
  for (const cls of classes) {
    elem.classList.remove(cls)
  }
}
function addClasses(elem, ...classes) {
  for (const cls of classes) {
    elem.classList.add(cls)
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
function getEvtDOM(attr) {
  return $(`[data-evt="${attr}"]`);
}
function getTransitionTime(elem) {
  let el = elem instanceof jQuery ? elem[0] : elem;
  return parseFloat(window.getComputedStyle(el).transitionDuration) * 1000;
}
function getOrdinalTxt(n) {
  return n % 10 == 1 && n % 100 != 11 ? 'st' : n % 10 == 2 && n % 100 != 12 ? 'nd' : n % 10 == 3 && n % 100 != 13 ? 'rd' : 'th'
}
function getZIndex(elem) {
  return parseInt(window.getComputedStyle(elem).getPropertyValue('z-index'))
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
function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}
function saveCartEmail() {
  var email = $('#cart_email').val();
  if (email != '' && isEmail(email)) {
    $.ajax({
      type: "POST",
      url: '/json/cart-email',
      data: { email_address: email },
      success: function (data) {
        klaviyo.identify({ '$email': email });
        mailModal.close();
        showMessage('success', 'Thank you', 'Item was added to your cart.');
        $('.cart_trigger').click();
      }
    });
  } else {
    showMessage('error', 'Error', 'Please enter a valid email address !');
  }
}
function showMessage(type, title, msg) {
  var alert_type = (type === 'success') ? pageAlerts.classes.info : pageAlerts.classes.error;
  pageAlerts.showAlert(alert_type, title, msg);
}

function debounce(func, wait) {
  let timeout
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function showSkeleton() {
  document.body.classList.add('--skeleton')
}

function hideSkeleton() {
  document.body.classList.remove('--skeleton')
}

function openPriceModal(target, id) {
  const card = target.closest('.product-card')
  if (!card) return

  window.signPriceModal = new window.priceModal(card, id)
}

function signupPrice() {
  if (!window.signPriceModal) {
    console.warn('No price modal found')
    return
  }

  window.signPriceModal.signup()
}

/**
 * Countdown timer
 * Example of usage : 
 *    createTimer({
      daySelector: '#sale_timer_days',
      hourSelector: '#sale_timer_hours',
      minuteSelector: '#sale_timer_minutes',
      secondSelector: '#sale_timer_seconds',
      date: '2024-11-30 10:00:00'
    })
 */

function createTimer(settings = {}) {
  let { daySelector, hourSelector, minuteSelector, secondSelector, date } = settings

  const dayElem = daySelector ? [...document.querySelectorAll(daySelector)] : null
  const hourElem = hourSelector ? [...document.querySelectorAll(hourSelector)] : null
  const minuteElem = minuteSelector ? [...document.querySelectorAll(minuteSelector)] : null
  const secondElem = secondSelector ? [...document.querySelectorAll(secondSelector)] : null
  const endDate = new Date(date)
  let timer

  if (!dayElem && !hourElem && !minuteElem && !secondElem) {
    return
  }

  if (isNaN(endDate)) {
    console.error('Incorrect date format passed to createTimer.')
    return
  }

  const pad = (num) => num.toString().padStart(2, '0')

  timer = setInterval(function () {
    updateTimer()
  }, 1000)

  function updateTimer() {
    const now = new Date().getTime()
    let diff = endDate - now

    if (diff <= 0) {
      diff = 0
      clearInterval(timer)
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    
    for (const elem of dayElem) {
      if (elem !== null) {
        elem.textContent = pad(days)
      }
    }
    
    for (const elem of hourElem) {
      if (elem !== null) {
        elem.textContent = pad(hours)
      }
    }
    
    for (const elem of minuteElem) {
      if (elem !== null) {
        elem.textContent = pad(minutes)
      }
    }
    
    for (const elem of secondElem) {
      if (elem !== null) {
        elem.textContent = pad(seconds)
      }
    }
  }
}

function getFakeProduct() {
  return {
    title: "Crosses Lightning Bolt Diamond Pendant 14k Solid Gold .15ctw",
    image: "https://cdn.prod.website-files.com/6631ecc8ac2b58c38761ff4a/67148792fc8b5f4949e7a59e_ap5.webp",
    price: "$3,990",
    show_discount: true,
    original_price: "$4,990",
    category: "Crosses"
  }
}

module.exports = {
  toArray,
  lockScroll,
  unlockScroll,
  elemDisplayed,
  createElem,
  removeClasses,
  addClasses,
  formatAsCurrency,
  getEvtDOM,
  getTransitionTime,
  getOrdinalTxt,
  getZIndex,
  toggleAdminBar,
  isEmail,
  saveCartEmail,
  showMessage,
  debounce,
  showSkeleton,
  hideSkeleton,
  openPriceModal,
  signupPrice,
  createTimer,
  getFakeProduct
}