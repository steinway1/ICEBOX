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
  return function(...args) {
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
  hideSkeleton
}