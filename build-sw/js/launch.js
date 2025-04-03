(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
/*!
 * Splide.js
 * Version  : 4.1.4
 * License  : MIT
 * Copyright: 2022 Naotoshi Fujita
 */
'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
Object.defineProperty(exports, '__esModule', {
  value: true
});
var MEDIA_PREFERS_REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
var CREATED = 1;
var MOUNTED = 2;
var IDLE = 3;
var MOVING = 4;
var SCROLLING = 5;
var DRAGGING = 6;
var DESTROYED = 7;
var STATES = {
  CREATED: CREATED,
  MOUNTED: MOUNTED,
  IDLE: IDLE,
  MOVING: MOVING,
  SCROLLING: SCROLLING,
  DRAGGING: DRAGGING,
  DESTROYED: DESTROYED
};
function empty(array) {
  array.length = 0;
}
function slice(arrayLike, start, end) {
  return Array.prototype.slice.call(arrayLike, start, end);
}
function apply(func) {
  return func.bind.apply(func, [null].concat(slice(arguments, 1)));
}
var nextTick = setTimeout;
var noop = function noop() {};
function raf(func) {
  return requestAnimationFrame(func);
}
function typeOf(type, subject) {
  return _typeof(subject) === type;
}
function isObject(subject) {
  return !isNull(subject) && typeOf("object", subject);
}
var isArray = Array.isArray;
var isFunction = apply(typeOf, "function");
var isString = apply(typeOf, "string");
var isUndefined = apply(typeOf, "undefined");
function isNull(subject) {
  return subject === null;
}
function isHTMLElement(subject) {
  try {
    return subject instanceof (subject.ownerDocument.defaultView || window).HTMLElement;
  } catch (e) {
    return false;
  }
}
function toArray(value) {
  return isArray(value) ? value : [value];
}
function forEach(values, iteratee) {
  toArray(values).forEach(iteratee);
}
function includes(array, value) {
  return array.indexOf(value) > -1;
}
function push(array, items) {
  array.push.apply(array, toArray(items));
  return array;
}
function toggleClass(elm, classes, add) {
  if (elm) {
    forEach(classes, function (name) {
      if (name) {
        elm.classList[add ? "add" : "remove"](name);
      }
    });
  }
}
function addClass(elm, classes) {
  toggleClass(elm, isString(classes) ? classes.split(" ") : classes, true);
}
function append(parent, children) {
  forEach(children, parent.appendChild.bind(parent));
}
function before(nodes, ref) {
  forEach(nodes, function (node) {
    var parent = (ref || node).parentNode;
    if (parent) {
      parent.insertBefore(node, ref);
    }
  });
}
function matches(elm, selector) {
  return isHTMLElement(elm) && (elm["msMatchesSelector"] || elm.matches).call(elm, selector);
}
function children(parent, selector) {
  var children2 = parent ? slice(parent.children) : [];
  return selector ? children2.filter(function (child) {
    return matches(child, selector);
  }) : children2;
}
function child(parent, selector) {
  return selector ? children(parent, selector)[0] : parent.firstElementChild;
}
var ownKeys = Object.keys;
function forOwn(object, iteratee, right) {
  if (object) {
    (right ? ownKeys(object).reverse() : ownKeys(object)).forEach(function (key) {
      key !== "__proto__" && iteratee(object[key], key);
    });
  }
  return object;
}
function assign(object) {
  slice(arguments, 1).forEach(function (source) {
    forOwn(source, function (value, key) {
      object[key] = source[key];
    });
  });
  return object;
}
function merge(object) {
  slice(arguments, 1).forEach(function (source) {
    forOwn(source, function (value, key) {
      if (isArray(value)) {
        object[key] = value.slice();
      } else if (isObject(value)) {
        object[key] = merge({}, isObject(object[key]) ? object[key] : {}, value);
      } else {
        object[key] = value;
      }
    });
  });
  return object;
}
function omit(object, keys) {
  forEach(keys || ownKeys(object), function (key) {
    delete object[key];
  });
}
function removeAttribute(elms, attrs) {
  forEach(elms, function (elm) {
    forEach(attrs, function (attr) {
      elm && elm.removeAttribute(attr);
    });
  });
}
function setAttribute(elms, attrs, value) {
  if (isObject(attrs)) {
    forOwn(attrs, function (value2, name) {
      setAttribute(elms, name, value2);
    });
  } else {
    forEach(elms, function (elm) {
      isNull(value) || value === "" ? removeAttribute(elm, attrs) : elm.setAttribute(attrs, String(value));
    });
  }
}
function create(tag, attrs, parent) {
  var elm = document.createElement(tag);
  if (attrs) {
    isString(attrs) ? addClass(elm, attrs) : setAttribute(elm, attrs);
  }
  parent && append(parent, elm);
  return elm;
}
function style(elm, prop, value) {
  if (isUndefined(value)) {
    return getComputedStyle(elm)[prop];
  }
  if (!isNull(value)) {
    elm.style[prop] = "" + value;
  }
}
function display(elm, display2) {
  style(elm, "display", display2);
}
function focus(elm) {
  elm["setActive"] && elm["setActive"]() || elm.focus({
    preventScroll: true
  });
}
function getAttribute(elm, attr) {
  return elm.getAttribute(attr);
}
function hasClass(elm, className) {
  return elm && elm.classList.contains(className);
}
function rect(target) {
  return target.getBoundingClientRect();
}
function remove(nodes) {
  forEach(nodes, function (node) {
    if (node && node.parentNode) {
      node.parentNode.removeChild(node);
    }
  });
}
function parseHtml(html) {
  return child(new DOMParser().parseFromString(html, "text/html").body);
}
function prevent(e, stopPropagation) {
  e.preventDefault();
  if (stopPropagation) {
    e.stopPropagation();
    e.stopImmediatePropagation();
  }
}
function query(parent, selector) {
  return parent && parent.querySelector(selector);
}
function queryAll(parent, selector) {
  return selector ? slice(parent.querySelectorAll(selector)) : [];
}
function removeClass(elm, classes) {
  toggleClass(elm, classes, false);
}
function timeOf(e) {
  return e.timeStamp;
}
function unit(value) {
  return isString(value) ? value : value ? value + "px" : "";
}
var PROJECT_CODE = "splide";
var DATA_ATTRIBUTE = "data-" + PROJECT_CODE;
function assert(condition, message) {
  if (!condition) {
    throw new Error("[" + PROJECT_CODE + "] " + (message || ""));
  }
}
var min = Math.min,
  max = Math.max,
  floor = Math.floor,
  ceil = Math.ceil,
  abs = Math.abs;
function approximatelyEqual(x, y, epsilon) {
  return abs(x - y) < epsilon;
}
function between(number, x, y, exclusive) {
  var minimum = min(x, y);
  var maximum = max(x, y);
  return exclusive ? minimum < number && number < maximum : minimum <= number && number <= maximum;
}
function clamp(number, x, y) {
  var minimum = min(x, y);
  var maximum = max(x, y);
  return min(max(minimum, number), maximum);
}
function sign(x) {
  return +(x > 0) - +(x < 0);
}
function camelToKebab(string) {
  return string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}
function format(string, replacements) {
  forEach(replacements, function (replacement) {
    string = string.replace("%s", "" + replacement);
  });
  return string;
}
function pad(number) {
  return number < 10 ? "0" + number : "" + number;
}
var ids = {};
function uniqueId(prefix) {
  return "" + prefix + pad(ids[prefix] = (ids[prefix] || 0) + 1);
}
function EventBinder() {
  var listeners = [];
  function bind(targets, events, callback, options) {
    forEachEvent(targets, events, function (target, event, namespace) {
      var isEventTarget = "addEventListener" in target;
      var remover = isEventTarget ? target.removeEventListener.bind(target, event, callback, options) : target["removeListener"].bind(target, callback);
      isEventTarget ? target.addEventListener(event, callback, options) : target["addListener"](callback);
      listeners.push([target, event, namespace, callback, remover]);
    });
  }
  function unbind(targets, events, callback) {
    forEachEvent(targets, events, function (target, event, namespace) {
      listeners = listeners.filter(function (listener) {
        if (listener[0] === target && listener[1] === event && listener[2] === namespace && (!callback || listener[3] === callback)) {
          listener[4]();
          return false;
        }
        return true;
      });
    });
  }
  function dispatch(target, type, detail) {
    var e;
    var bubbles = true;
    if (typeof CustomEvent === "function") {
      e = new CustomEvent(type, {
        bubbles: bubbles,
        detail: detail
      });
    } else {
      e = document.createEvent("CustomEvent");
      e.initCustomEvent(type, bubbles, false, detail);
    }
    target.dispatchEvent(e);
    return e;
  }
  function forEachEvent(targets, events, iteratee) {
    forEach(targets, function (target) {
      target && forEach(events, function (events2) {
        events2.split(" ").forEach(function (eventNS) {
          var fragment = eventNS.split(".");
          iteratee(target, fragment[0], fragment[1]);
        });
      });
    });
  }
  function destroy() {
    listeners.forEach(function (data) {
      data[4]();
    });
    empty(listeners);
  }
  return {
    bind: bind,
    unbind: unbind,
    dispatch: dispatch,
    destroy: destroy
  };
}
var EVENT_MOUNTED = "mounted";
var EVENT_READY = "ready";
var EVENT_MOVE = "move";
var EVENT_MOVED = "moved";
var EVENT_CLICK = "click";
var EVENT_ACTIVE = "active";
var EVENT_INACTIVE = "inactive";
var EVENT_VISIBLE = "visible";
var EVENT_HIDDEN = "hidden";
var EVENT_REFRESH = "refresh";
var EVENT_UPDATED = "updated";
var EVENT_RESIZE = "resize";
var EVENT_RESIZED = "resized";
var EVENT_DRAG = "drag";
var EVENT_DRAGGING = "dragging";
var EVENT_DRAGGED = "dragged";
var EVENT_SCROLL = "scroll";
var EVENT_SCROLLED = "scrolled";
var EVENT_OVERFLOW = "overflow";
var EVENT_DESTROY = "destroy";
var EVENT_ARROWS_MOUNTED = "arrows:mounted";
var EVENT_ARROWS_UPDATED = "arrows:updated";
var EVENT_PAGINATION_MOUNTED = "pagination:mounted";
var EVENT_PAGINATION_UPDATED = "pagination:updated";
var EVENT_NAVIGATION_MOUNTED = "navigation:mounted";
var EVENT_AUTOPLAY_PLAY = "autoplay:play";
var EVENT_AUTOPLAY_PLAYING = "autoplay:playing";
var EVENT_AUTOPLAY_PAUSE = "autoplay:pause";
var EVENT_LAZYLOAD_LOADED = "lazyload:loaded";
var EVENT_SLIDE_KEYDOWN = "sk";
var EVENT_SHIFTED = "sh";
var EVENT_END_INDEX_CHANGED = "ei";
function EventInterface(Splide2) {
  var bus = Splide2 ? Splide2.event.bus : document.createDocumentFragment();
  var binder = EventBinder();
  function on(events, callback) {
    binder.bind(bus, toArray(events).join(" "), function (e) {
      callback.apply(callback, isArray(e.detail) ? e.detail : []);
    });
  }
  function emit(event) {
    binder.dispatch(bus, event, slice(arguments, 1));
  }
  if (Splide2) {
    Splide2.event.on(EVENT_DESTROY, binder.destroy);
  }
  return assign(binder, {
    bus: bus,
    on: on,
    off: apply(binder.unbind, bus),
    emit: emit
  });
}
function RequestInterval(interval, onInterval, onUpdate, limit) {
  var now = Date.now;
  var startTime;
  var rate = 0;
  var id;
  var paused = true;
  var count = 0;
  function update() {
    if (!paused) {
      rate = interval ? min((now() - startTime) / interval, 1) : 1;
      onUpdate && onUpdate(rate);
      if (rate >= 1) {
        onInterval();
        startTime = now();
        if (limit && ++count >= limit) {
          return pause();
        }
      }
      id = raf(update);
    }
  }
  function start(resume) {
    resume || cancel();
    startTime = now() - (resume ? rate * interval : 0);
    paused = false;
    id = raf(update);
  }
  function pause() {
    paused = true;
  }
  function rewind() {
    startTime = now();
    rate = 0;
    if (onUpdate) {
      onUpdate(rate);
    }
  }
  function cancel() {
    id && cancelAnimationFrame(id);
    rate = 0;
    id = 0;
    paused = true;
  }
  function set(time) {
    interval = time;
  }
  function isPaused() {
    return paused;
  }
  return {
    start: start,
    rewind: rewind,
    pause: pause,
    cancel: cancel,
    set: set,
    isPaused: isPaused
  };
}
function State(initialState) {
  var state = initialState;
  function set(value) {
    state = value;
  }
  function is(states) {
    return includes(toArray(states), state);
  }
  return {
    set: set,
    is: is
  };
}
function Throttle(func, duration) {
  var interval = RequestInterval(duration || 0, func, null, 1);
  return function () {
    interval.isPaused() && interval.start();
  };
}
function Media(Splide2, Components2, options) {
  var state = Splide2.state;
  var breakpoints = options.breakpoints || {};
  var reducedMotion = options.reducedMotion || {};
  var binder = EventBinder();
  var queries = [];
  function setup() {
    var isMin = options.mediaQuery === "min";
    ownKeys(breakpoints).sort(function (n, m) {
      return isMin ? +n - +m : +m - +n;
    }).forEach(function (key) {
      register(breakpoints[key], "(" + (isMin ? "min" : "max") + "-width:" + key + "px)");
    });
    register(reducedMotion, MEDIA_PREFERS_REDUCED_MOTION);
    update();
  }
  function destroy(completely) {
    if (completely) {
      binder.destroy();
    }
  }
  function register(options2, query) {
    var queryList = matchMedia(query);
    binder.bind(queryList, "change", update);
    queries.push([options2, queryList]);
  }
  function update() {
    var destroyed = state.is(DESTROYED);
    var direction = options.direction;
    var merged = queries.reduce(function (merged2, entry) {
      return merge(merged2, entry[1].matches ? entry[0] : {});
    }, {});
    omit(options);
    set(merged);
    if (options.destroy) {
      Splide2.destroy(options.destroy === "completely");
    } else if (destroyed) {
      destroy(true);
      Splide2.mount();
    } else {
      direction !== options.direction && Splide2.refresh();
    }
  }
  function reduce(enable) {
    if (matchMedia(MEDIA_PREFERS_REDUCED_MOTION).matches) {
      enable ? merge(options, reducedMotion) : omit(options, ownKeys(reducedMotion));
    }
  }
  function set(opts, base, notify) {
    merge(options, opts);
    base && merge(Object.getPrototypeOf(options), opts);
    if (notify || !state.is(CREATED)) {
      Splide2.emit(EVENT_UPDATED, options);
    }
  }
  return {
    setup: setup,
    destroy: destroy,
    reduce: reduce,
    set: set
  };
}
var ARROW = "Arrow";
var ARROW_LEFT = ARROW + "Left";
var ARROW_RIGHT = ARROW + "Right";
var ARROW_UP = ARROW + "Up";
var ARROW_DOWN = ARROW + "Down";
var LTR = "ltr";
var RTL = "rtl";
var TTB = "ttb";
var ORIENTATION_MAP = {
  width: ["height"],
  left: ["top", "right"],
  right: ["bottom", "left"],
  x: ["y"],
  X: ["Y"],
  Y: ["X"],
  ArrowLeft: [ARROW_UP, ARROW_RIGHT],
  ArrowRight: [ARROW_DOWN, ARROW_LEFT]
};
function Direction(Splide2, Components2, options) {
  function resolve(prop, axisOnly, direction) {
    direction = direction || options.direction;
    var index = direction === RTL && !axisOnly ? 1 : direction === TTB ? 0 : -1;
    return ORIENTATION_MAP[prop] && ORIENTATION_MAP[prop][index] || prop.replace(/width|left|right/i, function (match, offset) {
      var replacement = ORIENTATION_MAP[match.toLowerCase()][index] || match;
      return offset > 0 ? replacement.charAt(0).toUpperCase() + replacement.slice(1) : replacement;
    });
  }
  function orient(value) {
    return value * (options.direction === RTL ? 1 : -1);
  }
  return {
    resolve: resolve,
    orient: orient
  };
}
var ROLE = "role";
var TAB_INDEX = "tabindex";
var DISABLED = "disabled";
var ARIA_PREFIX = "aria-";
var ARIA_CONTROLS = ARIA_PREFIX + "controls";
var ARIA_CURRENT = ARIA_PREFIX + "current";
var ARIA_SELECTED = ARIA_PREFIX + "selected";
var ARIA_LABEL = ARIA_PREFIX + "label";
var ARIA_LABELLEDBY = ARIA_PREFIX + "labelledby";
var ARIA_HIDDEN = ARIA_PREFIX + "hidden";
var ARIA_ORIENTATION = ARIA_PREFIX + "orientation";
var ARIA_ROLEDESCRIPTION = ARIA_PREFIX + "roledescription";
var ARIA_LIVE = ARIA_PREFIX + "live";
var ARIA_BUSY = ARIA_PREFIX + "busy";
var ARIA_ATOMIC = ARIA_PREFIX + "atomic";
var ALL_ATTRIBUTES = [ROLE, TAB_INDEX, DISABLED, ARIA_CONTROLS, ARIA_CURRENT, ARIA_LABEL, ARIA_LABELLEDBY, ARIA_HIDDEN, ARIA_ORIENTATION, ARIA_ROLEDESCRIPTION];
var CLASS_PREFIX = PROJECT_CODE + "__";
var STATUS_CLASS_PREFIX = "is-";
var CLASS_ROOT = PROJECT_CODE;
var CLASS_TRACK = CLASS_PREFIX + "track";
var CLASS_LIST = CLASS_PREFIX + "list";
var CLASS_SLIDE = CLASS_PREFIX + "slide";
var CLASS_CLONE = CLASS_SLIDE + "--clone";
var CLASS_CONTAINER = CLASS_SLIDE + "__container";
var CLASS_ARROWS = CLASS_PREFIX + "arrows";
var CLASS_ARROW = CLASS_PREFIX + "arrow";
var CLASS_ARROW_PREV = CLASS_ARROW + "--prev";
var CLASS_ARROW_NEXT = CLASS_ARROW + "--next";
var CLASS_PAGINATION = CLASS_PREFIX + "pagination";
var CLASS_PAGINATION_PAGE = CLASS_PAGINATION + "__page";
var CLASS_PROGRESS = CLASS_PREFIX + "progress";
var CLASS_PROGRESS_BAR = CLASS_PROGRESS + "__bar";
var CLASS_TOGGLE = CLASS_PREFIX + "toggle";
var CLASS_TOGGLE_PLAY = CLASS_TOGGLE + "__play";
var CLASS_TOGGLE_PAUSE = CLASS_TOGGLE + "__pause";
var CLASS_SPINNER = CLASS_PREFIX + "spinner";
var CLASS_SR = CLASS_PREFIX + "sr";
var CLASS_INITIALIZED = STATUS_CLASS_PREFIX + "initialized";
var CLASS_ACTIVE = STATUS_CLASS_PREFIX + "active";
var CLASS_PREV = STATUS_CLASS_PREFIX + "prev";
var CLASS_NEXT = STATUS_CLASS_PREFIX + "next";
var CLASS_VISIBLE = STATUS_CLASS_PREFIX + "visible";
var CLASS_LOADING = STATUS_CLASS_PREFIX + "loading";
var CLASS_FOCUS_IN = STATUS_CLASS_PREFIX + "focus-in";
var CLASS_OVERFLOW = STATUS_CLASS_PREFIX + "overflow";
var STATUS_CLASSES = [CLASS_ACTIVE, CLASS_VISIBLE, CLASS_PREV, CLASS_NEXT, CLASS_LOADING, CLASS_FOCUS_IN, CLASS_OVERFLOW];
var CLASSES = {
  slide: CLASS_SLIDE,
  clone: CLASS_CLONE,
  arrows: CLASS_ARROWS,
  arrow: CLASS_ARROW,
  prev: CLASS_ARROW_PREV,
  next: CLASS_ARROW_NEXT,
  pagination: CLASS_PAGINATION,
  page: CLASS_PAGINATION_PAGE,
  spinner: CLASS_SPINNER
};
function closest(from, selector) {
  if (isFunction(from.closest)) {
    return from.closest(selector);
  }
  var elm = from;
  while (elm && elm.nodeType === 1) {
    if (matches(elm, selector)) {
      break;
    }
    elm = elm.parentElement;
  }
  return elm;
}
var FRICTION = 5;
var LOG_INTERVAL = 200;
var POINTER_DOWN_EVENTS = "touchstart mousedown";
var POINTER_MOVE_EVENTS = "touchmove mousemove";
var POINTER_UP_EVENTS = "touchend touchcancel mouseup click";
function Elements(Splide2, Components2, options) {
  var _EventInterface = EventInterface(Splide2),
    on = _EventInterface.on,
    bind = _EventInterface.bind;
  var root = Splide2.root;
  var i18n = options.i18n;
  var elements = {};
  var slides = [];
  var rootClasses = [];
  var trackClasses = [];
  var track;
  var list;
  var isUsingKey;
  function setup() {
    collect();
    init();
    update();
  }
  function mount() {
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, setup);
    on(EVENT_UPDATED, update);
    bind(document, POINTER_DOWN_EVENTS + " keydown", function (e) {
      isUsingKey = e.type === "keydown";
    }, {
      capture: true
    });
    bind(root, "focusin", function () {
      toggleClass(root, CLASS_FOCUS_IN, !!isUsingKey);
    });
  }
  function destroy(completely) {
    var attrs = ALL_ATTRIBUTES.concat("style");
    empty(slides);
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    removeAttribute([track, list], attrs);
    removeAttribute(root, completely ? attrs : ["style", ARIA_ROLEDESCRIPTION]);
  }
  function update() {
    removeClass(root, rootClasses);
    removeClass(track, trackClasses);
    rootClasses = getClasses(CLASS_ROOT);
    trackClasses = getClasses(CLASS_TRACK);
    addClass(root, rootClasses);
    addClass(track, trackClasses);
    setAttribute(root, ARIA_LABEL, options.label);
    setAttribute(root, ARIA_LABELLEDBY, options.labelledby);
  }
  function collect() {
    track = find("." + CLASS_TRACK);
    list = child(track, "." + CLASS_LIST);
    assert(track && list, "A track/list element is missing.");
    push(slides, children(list, "." + CLASS_SLIDE + ":not(." + CLASS_CLONE + ")"));
    forOwn({
      arrows: CLASS_ARROWS,
      pagination: CLASS_PAGINATION,
      prev: CLASS_ARROW_PREV,
      next: CLASS_ARROW_NEXT,
      bar: CLASS_PROGRESS_BAR,
      toggle: CLASS_TOGGLE
    }, function (className, key) {
      elements[key] = find("." + className);
    });
    assign(elements, {
      root: root,
      track: track,
      list: list,
      slides: slides
    });
  }
  function init() {
    var id = root.id || uniqueId(PROJECT_CODE);
    var role = options.role;
    root.id = id;
    track.id = track.id || id + "-track";
    list.id = list.id || id + "-list";
    if (!getAttribute(root, ROLE) && root.tagName !== "SECTION" && role) {
      setAttribute(root, ROLE, role);
    }
    setAttribute(root, ARIA_ROLEDESCRIPTION, i18n.carousel);
    setAttribute(list, ROLE, "presentation");
  }
  function find(selector) {
    var elm = query(root, selector);
    return elm && closest(elm, "." + CLASS_ROOT) === root ? elm : void 0;
  }
  function getClasses(base) {
    return [base + "--" + options.type, base + "--" + options.direction, options.drag && base + "--draggable", options.isNavigation && base + "--nav", base === CLASS_ROOT && CLASS_ACTIVE];
  }
  return assign(elements, {
    setup: setup,
    mount: mount,
    destroy: destroy
  });
}
var SLIDE = "slide";
var LOOP = "loop";
var FADE = "fade";
function Slide$1(Splide2, index, slideIndex, slide) {
  var event = EventInterface(Splide2);
  var on = event.on,
    emit = event.emit,
    bind = event.bind;
  var Components = Splide2.Components,
    root = Splide2.root,
    options = Splide2.options;
  var isNavigation = options.isNavigation,
    updateOnMove = options.updateOnMove,
    i18n = options.i18n,
    pagination = options.pagination,
    slideFocus = options.slideFocus;
  var resolve = Components.Direction.resolve;
  var styles = getAttribute(slide, "style");
  var label = getAttribute(slide, ARIA_LABEL);
  var isClone = slideIndex > -1;
  var container = child(slide, "." + CLASS_CONTAINER);
  var destroyed;
  function mount() {
    if (!isClone) {
      slide.id = root.id + "-slide" + pad(index + 1);
      setAttribute(slide, ROLE, pagination ? "tabpanel" : "group");
      setAttribute(slide, ARIA_ROLEDESCRIPTION, i18n.slide);
      setAttribute(slide, ARIA_LABEL, label || format(i18n.slideLabel, [index + 1, Splide2.length]));
    }
    listen();
  }
  function listen() {
    bind(slide, "click", apply(emit, EVENT_CLICK, self));
    bind(slide, "keydown", apply(emit, EVENT_SLIDE_KEYDOWN, self));
    on([EVENT_MOVED, EVENT_SHIFTED, EVENT_SCROLLED], update);
    on(EVENT_NAVIGATION_MOUNTED, initNavigation);
    if (updateOnMove) {
      on(EVENT_MOVE, onMove);
    }
  }
  function destroy() {
    destroyed = true;
    event.destroy();
    removeClass(slide, STATUS_CLASSES);
    removeAttribute(slide, ALL_ATTRIBUTES);
    setAttribute(slide, "style", styles);
    setAttribute(slide, ARIA_LABEL, label || "");
  }
  function initNavigation() {
    var controls = Splide2.splides.map(function (target) {
      var Slide2 = target.splide.Components.Slides.getAt(index);
      return Slide2 ? Slide2.slide.id : "";
    }).join(" ");
    setAttribute(slide, ARIA_LABEL, format(i18n.slideX, (isClone ? slideIndex : index) + 1));
    setAttribute(slide, ARIA_CONTROLS, controls);
    setAttribute(slide, ROLE, slideFocus ? "button" : "");
    slideFocus && removeAttribute(slide, ARIA_ROLEDESCRIPTION);
  }
  function onMove() {
    if (!destroyed) {
      update();
    }
  }
  function update() {
    if (!destroyed) {
      var curr = Splide2.index;
      updateActivity();
      updateVisibility();
      toggleClass(slide, CLASS_PREV, index === curr - 1);
      toggleClass(slide, CLASS_NEXT, index === curr + 1);
    }
  }
  function updateActivity() {
    var active = isActive();
    if (active !== hasClass(slide, CLASS_ACTIVE)) {
      toggleClass(slide, CLASS_ACTIVE, active);
      setAttribute(slide, ARIA_CURRENT, isNavigation && active || "");
      emit(active ? EVENT_ACTIVE : EVENT_INACTIVE, self);
    }
  }
  function updateVisibility() {
    var visible = isVisible();
    var hidden = !visible && (!isActive() || isClone);
    if (!Splide2.state.is([MOVING, SCROLLING])) {
      setAttribute(slide, ARIA_HIDDEN, hidden || "");
    }
    setAttribute(queryAll(slide, options.focusableNodes || ""), TAB_INDEX, hidden ? -1 : "");
    if (slideFocus) {
      setAttribute(slide, TAB_INDEX, hidden ? -1 : 0);
    }
    if (visible !== hasClass(slide, CLASS_VISIBLE)) {
      toggleClass(slide, CLASS_VISIBLE, visible);
      emit(visible ? EVENT_VISIBLE : EVENT_HIDDEN, self);
    }
    if (!visible && document.activeElement === slide) {
      var Slide2 = Components.Slides.getAt(Splide2.index);
      Slide2 && focus(Slide2.slide);
    }
  }
  function style$1(prop, value, useContainer) {
    style(useContainer && container || slide, prop, value);
  }
  function isActive() {
    var curr = Splide2.index;
    return curr === index || options.cloneStatus && curr === slideIndex;
  }
  function isVisible() {
    if (Splide2.is(FADE)) {
      return isActive();
    }
    var trackRect = rect(Components.Elements.track);
    var slideRect = rect(slide);
    var left = resolve("left", true);
    var right = resolve("right", true);
    return floor(trackRect[left]) <= ceil(slideRect[left]) && floor(slideRect[right]) <= ceil(trackRect[right]);
  }
  function isWithin(from, distance) {
    var diff = abs(from - index);
    if (!isClone && (options.rewind || Splide2.is(LOOP))) {
      diff = min(diff, Splide2.length - diff);
    }
    return diff <= distance;
  }
  var self = {
    index: index,
    slideIndex: slideIndex,
    slide: slide,
    container: container,
    isClone: isClone,
    mount: mount,
    destroy: destroy,
    update: update,
    style: style$1,
    isWithin: isWithin
  };
  return self;
}
function Slides(Splide2, Components2, options) {
  var _EventInterface2 = EventInterface(Splide2),
    on = _EventInterface2.on,
    emit = _EventInterface2.emit,
    bind = _EventInterface2.bind;
  var _Components2$Elements = Components2.Elements,
    slides = _Components2$Elements.slides,
    list = _Components2$Elements.list;
  var Slides2 = [];
  function mount() {
    init();
    on(EVENT_REFRESH, destroy);
    on(EVENT_REFRESH, init);
  }
  function init() {
    slides.forEach(function (slide, index) {
      register(slide, index, -1);
    });
  }
  function destroy() {
    forEach$1(function (Slide2) {
      Slide2.destroy();
    });
    empty(Slides2);
  }
  function update() {
    forEach$1(function (Slide2) {
      Slide2.update();
    });
  }
  function register(slide, index, slideIndex) {
    var object = Slide$1(Splide2, index, slideIndex, slide);
    object.mount();
    Slides2.push(object);
    Slides2.sort(function (Slide1, Slide2) {
      return Slide1.index - Slide2.index;
    });
  }
  function get(excludeClones) {
    return excludeClones ? filter(function (Slide2) {
      return !Slide2.isClone;
    }) : Slides2;
  }
  function getIn(page) {
    var Controller = Components2.Controller;
    var index = Controller.toIndex(page);
    var max = Controller.hasFocus() ? 1 : options.perPage;
    return filter(function (Slide2) {
      return between(Slide2.index, index, index + max - 1);
    });
  }
  function getAt(index) {
    return filter(index)[0];
  }
  function add(items, index) {
    forEach(items, function (slide) {
      if (isString(slide)) {
        slide = parseHtml(slide);
      }
      if (isHTMLElement(slide)) {
        var ref = slides[index];
        ref ? before(slide, ref) : append(list, slide);
        addClass(slide, options.classes.slide);
        observeImages(slide, apply(emit, EVENT_RESIZE));
      }
    });
    emit(EVENT_REFRESH);
  }
  function remove$1(matcher) {
    remove(filter(matcher).map(function (Slide2) {
      return Slide2.slide;
    }));
    emit(EVENT_REFRESH);
  }
  function forEach$1(iteratee, excludeClones) {
    get(excludeClones).forEach(iteratee);
  }
  function filter(matcher) {
    return Slides2.filter(isFunction(matcher) ? matcher : function (Slide2) {
      return isString(matcher) ? matches(Slide2.slide, matcher) : includes(toArray(matcher), Slide2.index);
    });
  }
  function style(prop, value, useContainer) {
    forEach$1(function (Slide2) {
      Slide2.style(prop, value, useContainer);
    });
  }
  function observeImages(elm, callback) {
    var images = queryAll(elm, "img");
    var length = images.length;
    if (length) {
      images.forEach(function (img) {
        bind(img, "load error", function () {
          if (! --length) {
            callback();
          }
        });
      });
    } else {
      callback();
    }
  }
  function getLength(excludeClones) {
    return excludeClones ? slides.length : Slides2.length;
  }
  function isEnough() {
    return Slides2.length > options.perPage;
  }
  return {
    mount: mount,
    destroy: destroy,
    update: update,
    register: register,
    get: get,
    getIn: getIn,
    getAt: getAt,
    add: add,
    remove: remove$1,
    forEach: forEach$1,
    filter: filter,
    style: style,
    getLength: getLength,
    isEnough: isEnough
  };
}
function Layout(Splide2, Components2, options) {
  var _EventInterface3 = EventInterface(Splide2),
    on = _EventInterface3.on,
    bind = _EventInterface3.bind,
    emit = _EventInterface3.emit;
  var Slides = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var _Components2$Elements2 = Components2.Elements,
    root = _Components2$Elements2.root,
    track = _Components2$Elements2.track,
    list = _Components2$Elements2.list;
  var getAt = Slides.getAt,
    styleSlides = Slides.style;
  var vertical;
  var rootRect;
  var overflow;
  function mount() {
    init();
    bind(window, "resize load", Throttle(apply(emit, EVENT_RESIZE)));
    on([EVENT_UPDATED, EVENT_REFRESH], init);
    on(EVENT_RESIZE, resize);
  }
  function init() {
    vertical = options.direction === TTB;
    style(root, "maxWidth", unit(options.width));
    style(track, resolve("paddingLeft"), cssPadding(false));
    style(track, resolve("paddingRight"), cssPadding(true));
    resize(true);
  }
  function resize(force) {
    var newRect = rect(root);
    if (force || rootRect.width !== newRect.width || rootRect.height !== newRect.height) {
      style(track, "height", cssTrackHeight());
      styleSlides(resolve("marginRight"), unit(options.gap));
      styleSlides("width", cssSlideWidth());
      styleSlides("height", cssSlideHeight(), true);
      rootRect = newRect;
      emit(EVENT_RESIZED);
      if (overflow !== (overflow = isOverflow())) {
        toggleClass(root, CLASS_OVERFLOW, overflow);
        emit(EVENT_OVERFLOW, overflow);
      }
    }
  }
  function cssPadding(right) {
    var padding = options.padding;
    var prop = resolve(right ? "right" : "left");
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
  }
  function cssTrackHeight() {
    var height = "";
    if (vertical) {
      height = cssHeight();
      assert(height, "height or heightRatio is missing.");
      height = "calc(" + height + " - " + cssPadding(false) + " - " + cssPadding(true) + ")";
    }
    return height;
  }
  function cssHeight() {
    return unit(options.height || rect(list).width * options.heightRatio);
  }
  function cssSlideWidth() {
    return options.autoWidth ? null : unit(options.fixedWidth) || (vertical ? "" : cssSlideSize());
  }
  function cssSlideHeight() {
    return unit(options.fixedHeight) || (vertical ? options.autoHeight ? null : cssSlideSize() : cssHeight());
  }
  function cssSlideSize() {
    var gap = unit(options.gap);
    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
  }
  function listSize() {
    return rect(list)[resolve("width")];
  }
  function slideSize(index, withoutGap) {
    var Slide = getAt(index || 0);
    return Slide ? rect(Slide.slide)[resolve("width")] + (withoutGap ? 0 : getGap()) : 0;
  }
  function totalSize(index, withoutGap) {
    var Slide = getAt(index);
    if (Slide) {
      var right = rect(Slide.slide)[resolve("right")];
      var left = rect(list)[resolve("left")];
      return abs(right - left) + (withoutGap ? 0 : getGap());
    }
    return 0;
  }
  function sliderSize(withoutGap) {
    return totalSize(Splide2.length - 1) - totalSize(0) + slideSize(0, withoutGap);
  }
  function getGap() {
    var Slide = getAt(0);
    return Slide && parseFloat(style(Slide.slide, resolve("marginRight"))) || 0;
  }
  function getPadding(right) {
    return parseFloat(style(track, resolve("padding" + (right ? "Right" : "Left")))) || 0;
  }
  function isOverflow() {
    return Splide2.is(FADE) || sliderSize(true) > listSize();
  }
  return {
    mount: mount,
    resize: resize,
    listSize: listSize,
    slideSize: slideSize,
    sliderSize: sliderSize,
    totalSize: totalSize,
    getPadding: getPadding,
    isOverflow: isOverflow
  };
}
var MULTIPLIER = 2;
function Clones(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on = event.on;
  var Elements = Components2.Elements,
    Slides = Components2.Slides;
  var resolve = Components2.Direction.resolve;
  var clones = [];
  var cloneCount;
  function mount() {
    on(EVENT_REFRESH, remount);
    on([EVENT_UPDATED, EVENT_RESIZE], observe);
    if (cloneCount = computeCloneCount()) {
      generate(cloneCount);
      Components2.Layout.resize(true);
    }
  }
  function remount() {
    destroy();
    mount();
  }
  function destroy() {
    remove(clones);
    empty(clones);
    event.destroy();
  }
  function observe() {
    var count = computeCloneCount();
    if (cloneCount !== count) {
      if (cloneCount < count || !count) {
        event.emit(EVENT_REFRESH);
      }
    }
  }
  function generate(count) {
    var slides = Slides.get().slice();
    var length = slides.length;
    if (length) {
      while (slides.length < count) {
        push(slides, slides);
      }
      push(slides.slice(-count), slides.slice(0, count)).forEach(function (Slide, index) {
        var isHead = index < count;
        var clone = cloneDeep(Slide.slide, index);
        isHead ? before(clone, slides[0].slide) : append(Elements.list, clone);
        push(clones, clone);
        Slides.register(clone, index - count + (isHead ? 0 : length), Slide.index);
      });
    }
  }
  function cloneDeep(elm, index) {
    var clone = elm.cloneNode(true);
    addClass(clone, options.classes.clone);
    clone.id = Splide2.root.id + "-clone" + pad(index + 1);
    return clone;
  }
  function computeCloneCount() {
    var clones2 = options.clones;
    if (!Splide2.is(LOOP)) {
      clones2 = 0;
    } else if (isUndefined(clones2)) {
      var fixedSize = options[resolve("fixedWidth")] && Components2.Layout.slideSize(0);
      var fixedCount = fixedSize && ceil(rect(Elements.track)[resolve("width")] / fixedSize);
      clones2 = fixedCount || options[resolve("autoWidth")] && Splide2.length || options.perPage * MULTIPLIER;
    }
    return clones2;
  }
  return {
    mount: mount,
    destroy: destroy
  };
}
function Move(Splide2, Components2, options) {
  var _EventInterface4 = EventInterface(Splide2),
    on = _EventInterface4.on,
    emit = _EventInterface4.emit;
  var set = Splide2.state.set;
  var _Components2$Layout = Components2.Layout,
    slideSize = _Components2$Layout.slideSize,
    getPadding = _Components2$Layout.getPadding,
    totalSize = _Components2$Layout.totalSize,
    listSize = _Components2$Layout.listSize,
    sliderSize = _Components2$Layout.sliderSize;
  var _Components2$Directio = Components2.Direction,
    resolve = _Components2$Directio.resolve,
    orient = _Components2$Directio.orient;
  var _Components2$Elements3 = Components2.Elements,
    list = _Components2$Elements3.list,
    track = _Components2$Elements3.track;
  var Transition;
  function mount() {
    Transition = Components2.Transition;
    on([EVENT_MOUNTED, EVENT_RESIZED, EVENT_UPDATED, EVENT_REFRESH], reposition);
  }
  function reposition() {
    if (!Components2.Controller.isBusy()) {
      Components2.Scroll.cancel();
      jump(Splide2.index);
      Components2.Slides.update();
    }
  }
  function move(dest, index, prev, callback) {
    if (dest !== index && canShift(dest > prev)) {
      cancel();
      translate(shift(getPosition(), dest > prev), true);
    }
    set(MOVING);
    emit(EVENT_MOVE, index, prev, dest);
    Transition.start(index, function () {
      set(IDLE);
      emit(EVENT_MOVED, index, prev, dest);
      callback && callback();
    });
  }
  function jump(index) {
    translate(toPosition(index, true));
  }
  function translate(position, preventLoop) {
    if (!Splide2.is(FADE)) {
      var destination = preventLoop ? position : loop(position);
      style(list, "transform", "translate" + resolve("X") + "(" + destination + "px)");
      position !== destination && emit(EVENT_SHIFTED);
    }
  }
  function loop(position) {
    if (Splide2.is(LOOP)) {
      var index = toIndex(position);
      var exceededMax = index > Components2.Controller.getEnd();
      var exceededMin = index < 0;
      if (exceededMin || exceededMax) {
        position = shift(position, exceededMax);
      }
    }
    return position;
  }
  function shift(position, backwards) {
    var excess = position - getLimit(backwards);
    var size = sliderSize();
    position -= orient(size * (ceil(abs(excess) / size) || 1)) * (backwards ? 1 : -1);
    return position;
  }
  function cancel() {
    translate(getPosition(), true);
    Transition.cancel();
  }
  function toIndex(position) {
    var Slides = Components2.Slides.get();
    var index = 0;
    var minDistance = Infinity;
    for (var i = 0; i < Slides.length; i++) {
      var slideIndex = Slides[i].index;
      var distance = abs(toPosition(slideIndex, true) - position);
      if (distance <= minDistance) {
        minDistance = distance;
        index = slideIndex;
      } else {
        break;
      }
    }
    return index;
  }
  function toPosition(index, trimming) {
    var position = orient(totalSize(index - 1) - offset(index));
    return trimming ? trim(position) : position;
  }
  function getPosition() {
    var left = resolve("left");
    return rect(list)[left] - rect(track)[left] + orient(getPadding(false));
  }
  function trim(position) {
    if (options.trimSpace && Splide2.is(SLIDE)) {
      position = clamp(position, 0, orient(sliderSize(true) - listSize()));
    }
    return position;
  }
  function offset(index) {
    var focus = options.focus;
    return focus === "center" ? (listSize() - slideSize(index, true)) / 2 : +focus * slideSize(index) || 0;
  }
  function getLimit(max) {
    return toPosition(max ? Components2.Controller.getEnd() : 0, !!options.trimSpace);
  }
  function canShift(backwards) {
    var shifted = orient(shift(getPosition(), backwards));
    return backwards ? shifted >= 0 : shifted <= list[resolve("scrollWidth")] - rect(track)[resolve("width")];
  }
  function exceededLimit(max, position) {
    position = isUndefined(position) ? getPosition() : position;
    var exceededMin = max !== true && orient(position) < orient(getLimit(false));
    var exceededMax = max !== false && orient(position) > orient(getLimit(true));
    return exceededMin || exceededMax;
  }
  return {
    mount: mount,
    move: move,
    jump: jump,
    translate: translate,
    shift: shift,
    cancel: cancel,
    toIndex: toIndex,
    toPosition: toPosition,
    getPosition: getPosition,
    getLimit: getLimit,
    exceededLimit: exceededLimit,
    reposition: reposition
  };
}
function Controller(Splide2, Components2, options) {
  var _EventInterface5 = EventInterface(Splide2),
    on = _EventInterface5.on,
    emit = _EventInterface5.emit;
  var Move = Components2.Move;
  var getPosition = Move.getPosition,
    getLimit = Move.getLimit,
    toPosition = Move.toPosition;
  var _Components2$Slides = Components2.Slides,
    isEnough = _Components2$Slides.isEnough,
    getLength = _Components2$Slides.getLength;
  var omitEnd = options.omitEnd;
  var isLoop = Splide2.is(LOOP);
  var isSlide = Splide2.is(SLIDE);
  var getNext = apply(getAdjacent, false);
  var getPrev = apply(getAdjacent, true);
  var currIndex = options.start || 0;
  var endIndex;
  var prevIndex = currIndex;
  var slideCount;
  var perMove;
  var perPage;
  function mount() {
    init();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], init);
    on(EVENT_RESIZED, onResized);
  }
  function init() {
    slideCount = getLength(true);
    perMove = options.perMove;
    perPage = options.perPage;
    endIndex = getEnd();
    var index = clamp(currIndex, 0, omitEnd ? endIndex : slideCount - 1);
    if (index !== currIndex) {
      currIndex = index;
      Move.reposition();
    }
  }
  function onResized() {
    if (endIndex !== getEnd()) {
      emit(EVENT_END_INDEX_CHANGED);
    }
  }
  function go(control, allowSameIndex, callback) {
    if (!isBusy()) {
      var dest = parse(control);
      var index = loop(dest);
      if (index > -1 && (allowSameIndex || index !== currIndex)) {
        setIndex(index);
        Move.move(dest, index, prevIndex, callback);
      }
    }
  }
  function scroll(destination, duration, snap, callback) {
    Components2.Scroll.scroll(destination, duration, snap, function () {
      var index = loop(Move.toIndex(getPosition()));
      setIndex(omitEnd ? min(index, endIndex) : index);
      callback && callback();
    });
  }
  function parse(control) {
    var index = currIndex;
    if (isString(control)) {
      var _ref = control.match(/([+\-<>])(\d+)?/) || [],
        indicator = _ref[1],
        number = _ref[2];
      if (indicator === "+" || indicator === "-") {
        index = computeDestIndex(currIndex + +("" + indicator + (+number || 1)), currIndex);
      } else if (indicator === ">") {
        index = number ? toIndex(+number) : getNext(true);
      } else if (indicator === "<") {
        index = getPrev(true);
      }
    } else {
      index = isLoop ? control : clamp(control, 0, endIndex);
    }
    return index;
  }
  function getAdjacent(prev, destination) {
    var number = perMove || (hasFocus() ? 1 : perPage);
    var dest = computeDestIndex(currIndex + number * (prev ? -1 : 1), currIndex, !(perMove || hasFocus()));
    if (dest === -1 && isSlide) {
      if (!approximatelyEqual(getPosition(), getLimit(!prev), 1)) {
        return prev ? 0 : endIndex;
      }
    }
    return destination ? dest : loop(dest);
  }
  function computeDestIndex(dest, from, snapPage) {
    if (isEnough() || hasFocus()) {
      var index = computeMovableDestIndex(dest);
      if (index !== dest) {
        from = dest;
        dest = index;
        snapPage = false;
      }
      if (dest < 0 || dest > endIndex) {
        if (!perMove && (between(0, dest, from, true) || between(endIndex, from, dest, true))) {
          dest = toIndex(toPage(dest));
        } else {
          if (isLoop) {
            dest = snapPage ? dest < 0 ? -(slideCount % perPage || perPage) : slideCount : dest;
          } else if (options.rewind) {
            dest = dest < 0 ? endIndex : 0;
          } else {
            dest = -1;
          }
        }
      } else {
        if (snapPage && dest !== from) {
          dest = toIndex(toPage(from) + (dest < from ? -1 : 1));
        }
      }
    } else {
      dest = -1;
    }
    return dest;
  }
  function computeMovableDestIndex(dest) {
    if (isSlide && options.trimSpace === "move" && dest !== currIndex) {
      var position = getPosition();
      while (position === toPosition(dest, true) && between(dest, 0, Splide2.length - 1, !options.rewind)) {
        dest < currIndex ? --dest : ++dest;
      }
    }
    return dest;
  }
  function loop(index) {
    return isLoop ? (index + slideCount) % slideCount || 0 : index;
  }
  function getEnd() {
    var end = slideCount - (hasFocus() || isLoop && perMove ? 1 : perPage);
    while (omitEnd && end-- > 0) {
      if (toPosition(slideCount - 1, true) !== toPosition(end, true)) {
        end++;
        break;
      }
    }
    return clamp(end, 0, slideCount - 1);
  }
  function toIndex(page) {
    return clamp(hasFocus() ? page : perPage * page, 0, endIndex);
  }
  function toPage(index) {
    return hasFocus() ? min(index, endIndex) : floor((index >= endIndex ? slideCount - 1 : index) / perPage);
  }
  function toDest(destination) {
    var closest = Move.toIndex(destination);
    return isSlide ? clamp(closest, 0, endIndex) : closest;
  }
  function setIndex(index) {
    if (index !== currIndex) {
      prevIndex = currIndex;
      currIndex = index;
    }
  }
  function getIndex(prev) {
    return prev ? prevIndex : currIndex;
  }
  function hasFocus() {
    return !isUndefined(options.focus) || options.isNavigation;
  }
  function isBusy() {
    return Splide2.state.is([MOVING, SCROLLING]) && !!options.waitForTransition;
  }
  return {
    mount: mount,
    go: go,
    scroll: scroll,
    getNext: getNext,
    getPrev: getPrev,
    getAdjacent: getAdjacent,
    getEnd: getEnd,
    setIndex: setIndex,
    getIndex: getIndex,
    toIndex: toIndex,
    toPage: toPage,
    toDest: toDest,
    hasFocus: hasFocus,
    isBusy: isBusy
  };
}
var XML_NAME_SPACE = "http://www.w3.org/2000/svg";
var PATH = "m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z";
var SIZE = 40;
function Arrows(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on = event.on,
    bind = event.bind,
    emit = event.emit;
  var classes = options.classes,
    i18n = options.i18n;
  var Elements = Components2.Elements,
    Controller = Components2.Controller;
  var placeholder = Elements.arrows,
    track = Elements.track;
  var wrapper = placeholder;
  var prev = Elements.prev;
  var next = Elements.next;
  var created;
  var wrapperClasses;
  var arrows = {};
  function mount() {
    init();
    on(EVENT_UPDATED, remount);
  }
  function remount() {
    destroy();
    mount();
  }
  function init() {
    var enabled = options.arrows;
    if (enabled && !(prev && next)) {
      createArrows();
    }
    if (prev && next) {
      assign(arrows, {
        prev: prev,
        next: next
      });
      display(wrapper, enabled ? "" : "none");
      addClass(wrapper, wrapperClasses = CLASS_ARROWS + "--" + options.direction);
      if (enabled) {
        listen();
        update();
        setAttribute([prev, next], ARIA_CONTROLS, track.id);
        emit(EVENT_ARROWS_MOUNTED, prev, next);
      }
    }
  }
  function destroy() {
    event.destroy();
    removeClass(wrapper, wrapperClasses);
    if (created) {
      remove(placeholder ? [prev, next] : wrapper);
      prev = next = null;
    } else {
      removeAttribute([prev, next], ALL_ATTRIBUTES);
    }
  }
  function listen() {
    on([EVENT_MOUNTED, EVENT_MOVED, EVENT_REFRESH, EVENT_SCROLLED, EVENT_END_INDEX_CHANGED], update);
    bind(next, "click", apply(go, ">"));
    bind(prev, "click", apply(go, "<"));
  }
  function go(control) {
    Controller.go(control, true);
  }
  function createArrows() {
    wrapper = placeholder || create("div", classes.arrows);
    prev = createArrow(true);
    next = createArrow(false);
    created = true;
    append(wrapper, [prev, next]);
    !placeholder && before(wrapper, track);
  }
  function createArrow(prev2) {
    var arrow = "<button class=\"" + classes.arrow + " " + (prev2 ? classes.prev : classes.next) + "\" type=\"button\"><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\" focusable=\"false\"><path d=\"" + (options.arrowPath || PATH) + "\" />";
    return parseHtml(arrow);
  }
  function update() {
    if (prev && next) {
      var index = Splide2.index;
      var prevIndex = Controller.getPrev();
      var nextIndex = Controller.getNext();
      var prevLabel = prevIndex > -1 && index < prevIndex ? i18n.last : i18n.prev;
      var nextLabel = nextIndex > -1 && index > nextIndex ? i18n.first : i18n.next;
      prev.disabled = prevIndex < 0;
      next.disabled = nextIndex < 0;
      setAttribute(prev, ARIA_LABEL, prevLabel);
      setAttribute(next, ARIA_LABEL, nextLabel);
      emit(EVENT_ARROWS_UPDATED, prev, next, prevIndex, nextIndex);
    }
  }
  return {
    arrows: arrows,
    mount: mount,
    destroy: destroy,
    update: update
  };
}
var INTERVAL_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-interval";
function Autoplay(Splide2, Components2, options) {
  var _EventInterface6 = EventInterface(Splide2),
    on = _EventInterface6.on,
    bind = _EventInterface6.bind,
    emit = _EventInterface6.emit;
  var interval = RequestInterval(options.interval, Splide2.go.bind(Splide2, ">"), onAnimationFrame);
  var isPaused = interval.isPaused;
  var Elements = Components2.Elements,
    _Components2$Elements4 = Components2.Elements,
    root = _Components2$Elements4.root,
    toggle = _Components2$Elements4.toggle;
  var autoplay = options.autoplay;
  var hovered;
  var focused;
  var stopped = autoplay === "pause";
  function mount() {
    if (autoplay) {
      listen();
      toggle && setAttribute(toggle, ARIA_CONTROLS, Elements.track.id);
      stopped || play();
      update();
    }
  }
  function listen() {
    if (options.pauseOnHover) {
      bind(root, "mouseenter mouseleave", function (e) {
        hovered = e.type === "mouseenter";
        autoToggle();
      });
    }
    if (options.pauseOnFocus) {
      bind(root, "focusin focusout", function (e) {
        focused = e.type === "focusin";
        autoToggle();
      });
    }
    if (toggle) {
      bind(toggle, "click", function () {
        stopped ? play() : pause(true);
      });
    }
    on([EVENT_MOVE, EVENT_SCROLL, EVENT_REFRESH], interval.rewind);
    on(EVENT_MOVE, onMove);
  }
  function play() {
    if (isPaused() && Components2.Slides.isEnough()) {
      interval.start(!options.resetProgress);
      focused = hovered = stopped = false;
      update();
      emit(EVENT_AUTOPLAY_PLAY);
    }
  }
  function pause(stop) {
    if (stop === void 0) {
      stop = true;
    }
    stopped = !!stop;
    update();
    if (!isPaused()) {
      interval.pause();
      emit(EVENT_AUTOPLAY_PAUSE);
    }
  }
  function autoToggle() {
    if (!stopped) {
      hovered || focused ? pause(false) : play();
    }
  }
  function update() {
    if (toggle) {
      toggleClass(toggle, CLASS_ACTIVE, !stopped);
      setAttribute(toggle, ARIA_LABEL, options.i18n[stopped ? "play" : "pause"]);
    }
  }
  function onAnimationFrame(rate) {
    var bar = Elements.bar;
    bar && style(bar, "width", rate * 100 + "%");
    emit(EVENT_AUTOPLAY_PLAYING, rate);
  }
  function onMove(index) {
    var Slide = Components2.Slides.getAt(index);
    interval.set(Slide && +getAttribute(Slide.slide, INTERVAL_DATA_ATTRIBUTE) || options.interval);
  }
  return {
    mount: mount,
    destroy: interval.cancel,
    play: play,
    pause: pause,
    isPaused: isPaused
  };
}
function Cover(Splide2, Components2, options) {
  var _EventInterface7 = EventInterface(Splide2),
    on = _EventInterface7.on;
  function mount() {
    if (options.cover) {
      on(EVENT_LAZYLOAD_LOADED, apply(toggle, true));
      on([EVENT_MOUNTED, EVENT_UPDATED, EVENT_REFRESH], apply(cover, true));
    }
  }
  function cover(cover2) {
    Components2.Slides.forEach(function (Slide) {
      var img = child(Slide.container || Slide.slide, "img");
      if (img && img.src) {
        toggle(cover2, img, Slide);
      }
    });
  }
  function toggle(cover2, img, Slide) {
    Slide.style("background", cover2 ? "center/cover no-repeat url(\"" + img.src + "\")" : "", true);
    display(img, cover2 ? "none" : "");
  }
  return {
    mount: mount,
    destroy: apply(cover, false)
  };
}
var BOUNCE_DIFF_THRESHOLD = 10;
var BOUNCE_DURATION = 600;
var FRICTION_FACTOR = 0.6;
var BASE_VELOCITY = 1.5;
var MIN_DURATION = 800;
function Scroll(Splide2, Components2, options) {
  var _EventInterface8 = EventInterface(Splide2),
    on = _EventInterface8.on,
    emit = _EventInterface8.emit;
  var set = Splide2.state.set;
  var Move = Components2.Move;
  var getPosition = Move.getPosition,
    getLimit = Move.getLimit,
    exceededLimit = Move.exceededLimit,
    translate = Move.translate;
  var isSlide = Splide2.is(SLIDE);
  var interval;
  var callback;
  var friction = 1;
  function mount() {
    on(EVENT_MOVE, clear);
    on([EVENT_UPDATED, EVENT_REFRESH], cancel);
  }
  function scroll(destination, duration, snap, onScrolled, noConstrain) {
    var from = getPosition();
    clear();
    if (snap && (!isSlide || !exceededLimit())) {
      var size = Components2.Layout.sliderSize();
      var offset = sign(destination) * size * floor(abs(destination) / size) || 0;
      destination = Move.toPosition(Components2.Controller.toDest(destination % size)) + offset;
    }
    var noDistance = approximatelyEqual(from, destination, 1);
    friction = 1;
    duration = noDistance ? 0 : duration || max(abs(destination - from) / BASE_VELOCITY, MIN_DURATION);
    callback = onScrolled;
    interval = RequestInterval(duration, onEnd, apply(update, from, destination, noConstrain), 1);
    set(SCROLLING);
    emit(EVENT_SCROLL);
    interval.start();
  }
  function onEnd() {
    set(IDLE);
    callback && callback();
    emit(EVENT_SCROLLED);
  }
  function update(from, to, noConstrain, rate) {
    var position = getPosition();
    var target = from + (to - from) * easing(rate);
    var diff = (target - position) * friction;
    translate(position + diff);
    if (isSlide && !noConstrain && exceededLimit()) {
      friction *= FRICTION_FACTOR;
      if (abs(diff) < BOUNCE_DIFF_THRESHOLD) {
        scroll(getLimit(exceededLimit(true)), BOUNCE_DURATION, false, callback, true);
      }
    }
  }
  function clear() {
    if (interval) {
      interval.cancel();
    }
  }
  function cancel() {
    if (interval && !interval.isPaused()) {
      clear();
      onEnd();
    }
  }
  function easing(t) {
    var easingFunc = options.easingFunc;
    return easingFunc ? easingFunc(t) : 1 - Math.pow(1 - t, 4);
  }
  return {
    mount: mount,
    destroy: clear,
    scroll: scroll,
    cancel: cancel
  };
}
var SCROLL_LISTENER_OPTIONS = {
  passive: false,
  capture: true
};
function Drag(Splide2, Components2, options) {
  var _EventInterface9 = EventInterface(Splide2),
    on = _EventInterface9.on,
    emit = _EventInterface9.emit,
    bind = _EventInterface9.bind,
    unbind = _EventInterface9.unbind;
  var state = Splide2.state;
  var Move = Components2.Move,
    Scroll = Components2.Scroll,
    Controller = Components2.Controller,
    track = Components2.Elements.track,
    reduce = Components2.Media.reduce;
  var _Components2$Directio2 = Components2.Direction,
    resolve = _Components2$Directio2.resolve,
    orient = _Components2$Directio2.orient;
  var getPosition = Move.getPosition,
    exceededLimit = Move.exceededLimit;
  var basePosition;
  var baseEvent;
  var prevBaseEvent;
  var isFree;
  var dragging;
  var exceeded = false;
  var clickPrevented;
  var disabled;
  var target;
  function mount() {
    bind(track, POINTER_MOVE_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_UP_EVENTS, noop, SCROLL_LISTENER_OPTIONS);
    bind(track, POINTER_DOWN_EVENTS, onPointerDown, SCROLL_LISTENER_OPTIONS);
    bind(track, "click", onClick, {
      capture: true
    });
    bind(track, "dragstart", prevent);
    on([EVENT_MOUNTED, EVENT_UPDATED], init);
  }
  function init() {
    var drag = options.drag;
    disable(!drag);
    isFree = drag === "free";
  }
  function onPointerDown(e) {
    clickPrevented = false;
    if (!disabled) {
      var isTouch = isTouchEvent(e);
      if (isDraggable(e.target) && (isTouch || !e.button)) {
        if (!Controller.isBusy()) {
          target = isTouch ? track : window;
          dragging = state.is([MOVING, SCROLLING]);
          prevBaseEvent = null;
          bind(target, POINTER_MOVE_EVENTS, onPointerMove, SCROLL_LISTENER_OPTIONS);
          bind(target, POINTER_UP_EVENTS, onPointerUp, SCROLL_LISTENER_OPTIONS);
          Move.cancel();
          Scroll.cancel();
          save(e);
        } else {
          prevent(e, true);
        }
      }
    }
  }
  function onPointerMove(e) {
    if (!state.is(DRAGGING)) {
      state.set(DRAGGING);
      emit(EVENT_DRAG);
    }
    if (e.cancelable) {
      if (dragging) {
        Move.translate(basePosition + constrain(diffCoord(e)));
        var expired = diffTime(e) > LOG_INTERVAL;
        var hasExceeded = exceeded !== (exceeded = exceededLimit());
        if (expired || hasExceeded) {
          save(e);
        }
        clickPrevented = true;
        emit(EVENT_DRAGGING);
        prevent(e);
      } else if (isSliderDirection(e)) {
        dragging = shouldStart(e);
        prevent(e);
      }
    }
  }
  function onPointerUp(e) {
    if (state.is(DRAGGING)) {
      state.set(IDLE);
      emit(EVENT_DRAGGED);
    }
    if (dragging) {
      move(e);
      prevent(e);
    }
    unbind(target, POINTER_MOVE_EVENTS, onPointerMove);
    unbind(target, POINTER_UP_EVENTS, onPointerUp);
    dragging = false;
  }
  function onClick(e) {
    if (!disabled && clickPrevented) {
      prevent(e, true);
    }
  }
  function save(e) {
    prevBaseEvent = baseEvent;
    baseEvent = e;
    basePosition = getPosition();
  }
  function move(e) {
    var velocity = computeVelocity(e);
    var destination = computeDestination(velocity);
    var rewind = options.rewind && options.rewindByDrag;
    reduce(false);
    if (isFree) {
      Controller.scroll(destination, 0, options.snap);
    } else if (Splide2.is(FADE)) {
      Controller.go(orient(sign(velocity)) < 0 ? rewind ? "<" : "-" : rewind ? ">" : "+");
    } else if (Splide2.is(SLIDE) && exceeded && rewind) {
      Controller.go(exceededLimit(true) ? ">" : "<");
    } else {
      Controller.go(Controller.toDest(destination), true);
    }
    reduce(true);
  }
  function shouldStart(e) {
    var thresholds = options.dragMinThreshold;
    var isObj = isObject(thresholds);
    var mouse = isObj && thresholds.mouse || 0;
    var touch = (isObj ? thresholds.touch : +thresholds) || 10;
    return abs(diffCoord(e)) > (isTouchEvent(e) ? touch : mouse);
  }
  function isSliderDirection(e) {
    return abs(diffCoord(e)) > abs(diffCoord(e, true));
  }
  function computeVelocity(e) {
    if (Splide2.is(LOOP) || !exceeded) {
      var time = diffTime(e);
      if (time && time < LOG_INTERVAL) {
        return diffCoord(e) / time;
      }
    }
    return 0;
  }
  function computeDestination(velocity) {
    return getPosition() + sign(velocity) * min(abs(velocity) * (options.flickPower || 600), isFree ? Infinity : Components2.Layout.listSize() * (options.flickMaxPages || 1));
  }
  function diffCoord(e, orthogonal) {
    return coordOf(e, orthogonal) - coordOf(getBaseEvent(e), orthogonal);
  }
  function diffTime(e) {
    return timeOf(e) - timeOf(getBaseEvent(e));
  }
  function getBaseEvent(e) {
    return baseEvent === e && prevBaseEvent || baseEvent;
  }
  function coordOf(e, orthogonal) {
    return (isTouchEvent(e) ? e.changedTouches[0] : e)["page" + resolve(orthogonal ? "Y" : "X")];
  }
  function constrain(diff) {
    return diff / (exceeded && Splide2.is(SLIDE) ? FRICTION : 1);
  }
  function isDraggable(target2) {
    var noDrag = options.noDrag;
    return !matches(target2, "." + CLASS_PAGINATION_PAGE + ", ." + CLASS_ARROW) && (!noDrag || !matches(target2, noDrag));
  }
  function isTouchEvent(e) {
    return typeof TouchEvent !== "undefined" && e instanceof TouchEvent;
  }
  function isDragging() {
    return dragging;
  }
  function disable(value) {
    disabled = value;
  }
  return {
    mount: mount,
    disable: disable,
    isDragging: isDragging
  };
}
var NORMALIZATION_MAP = {
  Spacebar: " ",
  Right: ARROW_RIGHT,
  Left: ARROW_LEFT,
  Up: ARROW_UP,
  Down: ARROW_DOWN
};
function normalizeKey(key) {
  key = isString(key) ? key : key.key;
  return NORMALIZATION_MAP[key] || key;
}
var KEYBOARD_EVENT = "keydown";
function Keyboard(Splide2, Components2, options) {
  var _EventInterface10 = EventInterface(Splide2),
    on = _EventInterface10.on,
    bind = _EventInterface10.bind,
    unbind = _EventInterface10.unbind;
  var root = Splide2.root;
  var resolve = Components2.Direction.resolve;
  var target;
  var disabled;
  function mount() {
    init();
    on(EVENT_UPDATED, destroy);
    on(EVENT_UPDATED, init);
    on(EVENT_MOVE, onMove);
  }
  function init() {
    var keyboard = options.keyboard;
    if (keyboard) {
      target = keyboard === "global" ? window : root;
      bind(target, KEYBOARD_EVENT, onKeydown);
    }
  }
  function destroy() {
    unbind(target, KEYBOARD_EVENT);
  }
  function disable(value) {
    disabled = value;
  }
  function onMove() {
    var _disabled = disabled;
    disabled = true;
    nextTick(function () {
      disabled = _disabled;
    });
  }
  function onKeydown(e) {
    if (!disabled) {
      var key = normalizeKey(e);
      if (key === resolve(ARROW_LEFT)) {
        Splide2.go("<");
      } else if (key === resolve(ARROW_RIGHT)) {
        Splide2.go(">");
      }
    }
  }
  return {
    mount: mount,
    destroy: destroy,
    disable: disable
  };
}
var SRC_DATA_ATTRIBUTE = DATA_ATTRIBUTE + "-lazy";
var SRCSET_DATA_ATTRIBUTE = SRC_DATA_ATTRIBUTE + "-srcset";
var IMAGE_SELECTOR = "[" + SRC_DATA_ATTRIBUTE + "], [" + SRCSET_DATA_ATTRIBUTE + "]";
function LazyLoad(Splide2, Components2, options) {
  var _EventInterface11 = EventInterface(Splide2),
    on = _EventInterface11.on,
    off = _EventInterface11.off,
    bind = _EventInterface11.bind,
    emit = _EventInterface11.emit;
  var isSequential = options.lazyLoad === "sequential";
  var events = [EVENT_MOVED, EVENT_SCROLLED];
  var entries = [];
  function mount() {
    if (options.lazyLoad) {
      init();
      on(EVENT_REFRESH, init);
    }
  }
  function init() {
    empty(entries);
    register();
    if (isSequential) {
      loadNext();
    } else {
      off(events);
      on(events, check);
      check();
    }
  }
  function register() {
    Components2.Slides.forEach(function (Slide) {
      queryAll(Slide.slide, IMAGE_SELECTOR).forEach(function (img) {
        var src = getAttribute(img, SRC_DATA_ATTRIBUTE);
        var srcset = getAttribute(img, SRCSET_DATA_ATTRIBUTE);
        if (src !== img.src || srcset !== img.srcset) {
          var className = options.classes.spinner;
          var parent = img.parentElement;
          var spinner = child(parent, "." + className) || create("span", className, parent);
          entries.push([img, Slide, spinner]);
          img.src || display(img, "none");
        }
      });
    });
  }
  function check() {
    entries = entries.filter(function (data) {
      var distance = options.perPage * ((options.preloadPages || 1) + 1) - 1;
      return data[1].isWithin(Splide2.index, distance) ? load(data) : true;
    });
    entries.length || off(events);
  }
  function load(data) {
    var img = data[0];
    addClass(data[1].slide, CLASS_LOADING);
    bind(img, "load error", apply(onLoad, data));
    setAttribute(img, "src", getAttribute(img, SRC_DATA_ATTRIBUTE));
    setAttribute(img, "srcset", getAttribute(img, SRCSET_DATA_ATTRIBUTE));
    removeAttribute(img, SRC_DATA_ATTRIBUTE);
    removeAttribute(img, SRCSET_DATA_ATTRIBUTE);
  }
  function onLoad(data, e) {
    var img = data[0],
      Slide = data[1];
    removeClass(Slide.slide, CLASS_LOADING);
    if (e.type !== "error") {
      remove(data[2]);
      display(img, "");
      emit(EVENT_LAZYLOAD_LOADED, img, Slide);
      emit(EVENT_RESIZE);
    }
    isSequential && loadNext();
  }
  function loadNext() {
    entries.length && load(entries.shift());
  }
  return {
    mount: mount,
    destroy: apply(empty, entries),
    check: check
  };
}
function Pagination(Splide2, Components2, options) {
  var event = EventInterface(Splide2);
  var on = event.on,
    emit = event.emit,
    bind = event.bind;
  var Slides = Components2.Slides,
    Elements = Components2.Elements,
    Controller = Components2.Controller;
  var hasFocus = Controller.hasFocus,
    getIndex = Controller.getIndex,
    go = Controller.go;
  var resolve = Components2.Direction.resolve;
  var placeholder = Elements.pagination;
  var items = [];
  var list;
  var paginationClasses;
  function mount() {
    destroy();
    on([EVENT_UPDATED, EVENT_REFRESH, EVENT_END_INDEX_CHANGED], mount);
    var enabled = options.pagination;
    placeholder && display(placeholder, enabled ? "" : "none");
    if (enabled) {
      on([EVENT_MOVE, EVENT_SCROLL, EVENT_SCROLLED], update);
      createPagination();
      update();
      emit(EVENT_PAGINATION_MOUNTED, {
        list: list,
        items: items
      }, getAt(Splide2.index));
    }
  }
  function destroy() {
    if (list) {
      remove(placeholder ? slice(list.children) : list);
      removeClass(list, paginationClasses);
      empty(items);
      list = null;
    }
    event.destroy();
  }
  function createPagination() {
    var length = Splide2.length;
    var classes = options.classes,
      i18n = options.i18n,
      perPage = options.perPage;
    var max = hasFocus() ? Controller.getEnd() + 1 : ceil(length / perPage);
    list = placeholder || create("ul", classes.pagination, Elements.track.parentElement);
    addClass(list, paginationClasses = CLASS_PAGINATION + "--" + getDirection());
    setAttribute(list, ROLE, "tablist");
    setAttribute(list, ARIA_LABEL, i18n.select);
    setAttribute(list, ARIA_ORIENTATION, getDirection() === TTB ? "vertical" : "");
    for (var i = 0; i < max; i++) {
      var li = create("li", null, list);
      var button = create("button", {
        "class": classes.page,
        type: "button"
      }, li);
      var controls = Slides.getIn(i).map(function (Slide) {
        return Slide.slide.id;
      });
      var text = !hasFocus() && perPage > 1 ? i18n.pageX : i18n.slideX;
      bind(button, "click", apply(onClick, i));
      if (options.paginationKeyboard) {
        bind(button, "keydown", apply(onKeydown, i));
      }
      setAttribute(li, ROLE, "presentation");
      setAttribute(button, ROLE, "tab");
      setAttribute(button, ARIA_CONTROLS, controls.join(" "));
      setAttribute(button, ARIA_LABEL, format(text, i + 1));
      setAttribute(button, TAB_INDEX, -1);
      items.push({
        li: li,
        button: button,
        page: i
      });
    }
  }
  function onClick(page) {
    go(">" + page, true);
  }
  function onKeydown(page, e) {
    var length = items.length;
    var key = normalizeKey(e);
    var dir = getDirection();
    var nextPage = -1;
    if (key === resolve(ARROW_RIGHT, false, dir)) {
      nextPage = ++page % length;
    } else if (key === resolve(ARROW_LEFT, false, dir)) {
      nextPage = (--page + length) % length;
    } else if (key === "Home") {
      nextPage = 0;
    } else if (key === "End") {
      nextPage = length - 1;
    }
    var item = items[nextPage];
    if (item) {
      focus(item.button);
      go(">" + nextPage);
      prevent(e, true);
    }
  }
  function getDirection() {
    return options.paginationDirection || options.direction;
  }
  function getAt(index) {
    return items[Controller.toPage(index)];
  }
  function update() {
    var prev = getAt(getIndex(true));
    var curr = getAt(getIndex());
    if (prev) {
      var button = prev.button;
      removeClass(button, CLASS_ACTIVE);
      removeAttribute(button, ARIA_SELECTED);
      setAttribute(button, TAB_INDEX, -1);
    }
    if (curr) {
      var _button = curr.button;
      addClass(_button, CLASS_ACTIVE);
      setAttribute(_button, ARIA_SELECTED, true);
      setAttribute(_button, TAB_INDEX, "");
    }
    emit(EVENT_PAGINATION_UPDATED, {
      list: list,
      items: items
    }, prev, curr);
  }
  return {
    items: items,
    mount: mount,
    destroy: destroy,
    getAt: getAt,
    update: update
  };
}
var TRIGGER_KEYS = [" ", "Enter"];
function Sync(Splide2, Components2, options) {
  var isNavigation = options.isNavigation,
    slideFocus = options.slideFocus;
  var events = [];
  function mount() {
    Splide2.splides.forEach(function (target) {
      if (!target.isParent) {
        sync(Splide2, target.splide);
        sync(target.splide, Splide2);
      }
    });
    if (isNavigation) {
      navigate();
    }
  }
  function destroy() {
    events.forEach(function (event) {
      event.destroy();
    });
    empty(events);
  }
  function remount() {
    destroy();
    mount();
  }
  function sync(splide, target) {
    var event = EventInterface(splide);
    event.on(EVENT_MOVE, function (index, prev, dest) {
      target.go(target.is(LOOP) ? dest : index);
    });
    events.push(event);
  }
  function navigate() {
    var event = EventInterface(Splide2);
    var on = event.on;
    on(EVENT_CLICK, onClick);
    on(EVENT_SLIDE_KEYDOWN, onKeydown);
    on([EVENT_MOUNTED, EVENT_UPDATED], update);
    events.push(event);
    event.emit(EVENT_NAVIGATION_MOUNTED, Splide2.splides);
  }
  function update() {
    setAttribute(Components2.Elements.list, ARIA_ORIENTATION, options.direction === TTB ? "vertical" : "");
  }
  function onClick(Slide) {
    Splide2.go(Slide.index);
  }
  function onKeydown(Slide, e) {
    if (includes(TRIGGER_KEYS, normalizeKey(e))) {
      onClick(Slide);
      prevent(e);
    }
  }
  return {
    setup: apply(Components2.Media.set, {
      slideFocus: isUndefined(slideFocus) ? isNavigation : slideFocus
    }, true),
    mount: mount,
    destroy: destroy,
    remount: remount
  };
}
function Wheel(Splide2, Components2, options) {
  var _EventInterface12 = EventInterface(Splide2),
    bind = _EventInterface12.bind;
  var lastTime = 0;
  function mount() {
    if (options.wheel) {
      bind(Components2.Elements.track, "wheel", onWheel, SCROLL_LISTENER_OPTIONS);
    }
  }
  function onWheel(e) {
    if (e.cancelable) {
      var deltaY = e.deltaY;
      var backwards = deltaY < 0;
      var timeStamp = timeOf(e);
      var _min = options.wheelMinThreshold || 0;
      var sleep = options.wheelSleep || 0;
      if (abs(deltaY) > _min && timeStamp - lastTime > sleep) {
        Splide2.go(backwards ? "<" : ">");
        lastTime = timeStamp;
      }
      shouldPrevent(backwards) && prevent(e);
    }
  }
  function shouldPrevent(backwards) {
    return !options.releaseWheel || Splide2.state.is(MOVING) || Components2.Controller.getAdjacent(backwards) !== -1;
  }
  return {
    mount: mount
  };
}
var SR_REMOVAL_DELAY = 90;
function Live(Splide2, Components2, options) {
  var _EventInterface13 = EventInterface(Splide2),
    on = _EventInterface13.on;
  var track = Components2.Elements.track;
  var enabled = options.live && !options.isNavigation;
  var sr = create("span", CLASS_SR);
  var interval = RequestInterval(SR_REMOVAL_DELAY, apply(toggle, false));
  function mount() {
    if (enabled) {
      disable(!Components2.Autoplay.isPaused());
      setAttribute(track, ARIA_ATOMIC, true);
      sr.textContent = "\u2026";
      on(EVENT_AUTOPLAY_PLAY, apply(disable, true));
      on(EVENT_AUTOPLAY_PAUSE, apply(disable, false));
      on([EVENT_MOVED, EVENT_SCROLLED], apply(toggle, true));
    }
  }
  function toggle(active) {
    setAttribute(track, ARIA_BUSY, active);
    if (active) {
      append(track, sr);
      interval.start();
    } else {
      remove(sr);
      interval.cancel();
    }
  }
  function destroy() {
    removeAttribute(track, [ARIA_LIVE, ARIA_ATOMIC, ARIA_BUSY]);
    remove(sr);
  }
  function disable(disabled) {
    if (enabled) {
      setAttribute(track, ARIA_LIVE, disabled ? "off" : "polite");
    }
  }
  return {
    mount: mount,
    disable: disable,
    destroy: destroy
  };
}
var ComponentConstructors = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Media: Media,
  Direction: Direction,
  Elements: Elements,
  Slides: Slides,
  Layout: Layout,
  Clones: Clones,
  Move: Move,
  Controller: Controller,
  Arrows: Arrows,
  Autoplay: Autoplay,
  Cover: Cover,
  Scroll: Scroll,
  Drag: Drag,
  Keyboard: Keyboard,
  LazyLoad: LazyLoad,
  Pagination: Pagination,
  Sync: Sync,
  Wheel: Wheel,
  Live: Live
});
var I18N = {
  prev: "Previous slide",
  next: "Next slide",
  first: "Go to first slide",
  last: "Go to last slide",
  slideX: "Go to slide %s",
  pageX: "Go to page %s",
  play: "Start autoplay",
  pause: "Pause autoplay",
  carousel: "carousel",
  slide: "slide",
  select: "Select a slide to show",
  slideLabel: "%s of %s"
};
var DEFAULTS = {
  type: "slide",
  role: "region",
  speed: 400,
  perPage: 1,
  cloneStatus: true,
  arrows: true,
  pagination: true,
  paginationKeyboard: true,
  interval: 5e3,
  pauseOnHover: true,
  pauseOnFocus: true,
  resetProgress: true,
  easing: "cubic-bezier(0.25, 1, 0.5, 1)",
  drag: true,
  direction: "ltr",
  trimSpace: true,
  focusableNodes: "a, button, textarea, input, select, iframe",
  live: true,
  classes: CLASSES,
  i18n: I18N,
  reducedMotion: {
    speed: 0,
    rewindSpeed: 0,
    autoplay: "pause"
  }
};
function Fade(Splide2, Components2, options) {
  var Slides = Components2.Slides;
  function mount() {
    EventInterface(Splide2).on([EVENT_MOUNTED, EVENT_REFRESH], init);
  }
  function init() {
    Slides.forEach(function (Slide) {
      Slide.style("transform", "translateX(-" + 100 * Slide.index + "%)");
    });
  }
  function start(index, done) {
    Slides.style("transition", "opacity " + options.speed + "ms " + options.easing);
    nextTick(done);
  }
  return {
    mount: mount,
    start: start,
    cancel: noop
  };
}
function Slide(Splide2, Components2, options) {
  var Move = Components2.Move,
    Controller = Components2.Controller,
    Scroll = Components2.Scroll;
  var list = Components2.Elements.list;
  var transition = apply(style, list, "transition");
  var endCallback;
  function mount() {
    EventInterface(Splide2).bind(list, "transitionend", function (e) {
      if (e.target === list && endCallback) {
        cancel();
        endCallback();
      }
    });
  }
  function start(index, done) {
    var destination = Move.toPosition(index, true);
    var position = Move.getPosition();
    var speed = getSpeed(index);
    if (abs(destination - position) >= 1 && speed >= 1) {
      if (options.useScroll) {
        Scroll.scroll(destination, speed, false, done);
      } else {
        transition("transform " + speed + "ms " + options.easing);
        Move.translate(destination, true);
        endCallback = done;
      }
    } else {
      Move.jump(index);
      done();
    }
  }
  function cancel() {
    transition("");
    Scroll.cancel();
  }
  function getSpeed(index) {
    var rewindSpeed = options.rewindSpeed;
    if (Splide2.is(SLIDE) && rewindSpeed) {
      var prev = Controller.getIndex(true);
      var end = Controller.getEnd();
      if (prev === 0 && index >= end || prev >= end && index === 0) {
        return rewindSpeed;
      }
    }
    return options.speed;
  }
  return {
    mount: mount,
    start: start,
    cancel: cancel
  };
}
var _Splide = /*#__PURE__*/function () {
  function _Splide(target, options) {
    this.event = EventInterface();
    this.Components = {};
    this.state = State(CREATED);
    this.splides = [];
    this._o = {};
    this._E = {};
    var root = isString(target) ? query(document, target) : target;
    assert(root, root + " is invalid.");
    this.root = root;
    options = merge({
      label: getAttribute(root, ARIA_LABEL) || "",
      labelledby: getAttribute(root, ARIA_LABELLEDBY) || ""
    }, DEFAULTS, _Splide.defaults, options || {});
    try {
      merge(options, JSON.parse(getAttribute(root, DATA_ATTRIBUTE)));
    } catch (e) {
      assert(false, "Invalid JSON");
    }
    this._o = Object.create(merge({}, options));
  }
  var _proto = _Splide.prototype;
  _proto.mount = function mount(Extensions, Transition) {
    var _this = this;
    var state = this.state,
      Components2 = this.Components;
    assert(state.is([CREATED, DESTROYED]), "Already mounted!");
    state.set(CREATED);
    this._C = Components2;
    this._T = Transition || this._T || (this.is(FADE) ? Fade : Slide);
    this._E = Extensions || this._E;
    var Constructors = assign({}, ComponentConstructors, this._E, {
      Transition: this._T
    });
    forOwn(Constructors, function (Component, key) {
      var component = Component(_this, Components2, _this._o);
      Components2[key] = component;
      component.setup && component.setup();
    });
    forOwn(Components2, function (component) {
      component.mount && component.mount();
    });
    this.emit(EVENT_MOUNTED);
    addClass(this.root, CLASS_INITIALIZED);
    state.set(IDLE);
    this.emit(EVENT_READY);
    return this;
  };
  _proto.sync = function sync(splide) {
    this.splides.push({
      splide: splide
    });
    splide.splides.push({
      splide: this,
      isParent: true
    });
    if (this.state.is(IDLE)) {
      this._C.Sync.remount();
      splide.Components.Sync.remount();
    }
    return this;
  };
  _proto.go = function go(control) {
    this._C.Controller.go(control);
    return this;
  };
  _proto.on = function on(events, callback) {
    this.event.on(events, callback);
    return this;
  };
  _proto.off = function off(events) {
    this.event.off(events);
    return this;
  };
  _proto.emit = function emit(event) {
    var _this$event;
    (_this$event = this.event).emit.apply(_this$event, [event].concat(slice(arguments, 1)));
    return this;
  };
  _proto.add = function add(slides, index) {
    this._C.Slides.add(slides, index);
    return this;
  };
  _proto.remove = function remove(matcher) {
    this._C.Slides.remove(matcher);
    return this;
  };
  _proto.is = function is(type) {
    return this._o.type === type;
  };
  _proto.refresh = function refresh() {
    this.emit(EVENT_REFRESH);
    return this;
  };
  _proto.destroy = function destroy(completely) {
    if (completely === void 0) {
      completely = true;
    }
    var event = this.event,
      state = this.state;
    if (state.is(CREATED)) {
      EventInterface(this).on(EVENT_READY, this.destroy.bind(this, completely));
    } else {
      forOwn(this._C, function (component) {
        component.destroy && component.destroy(completely);
      }, true);
      event.emit(EVENT_DESTROY);
      event.destroy();
      completely && empty(this.splides);
      state.set(DESTROYED);
    }
    return this;
  };
  _createClass(_Splide, [{
    key: "options",
    get: function get() {
      return this._o;
    },
    set: function set(options) {
      this._C.Media.set(options, true, true);
    }
  }, {
    key: "length",
    get: function get() {
      return this._C.Slides.getLength(true);
    }
  }, {
    key: "index",
    get: function get() {
      return this._C.Controller.getIndex();
    }
  }]);
  return _Splide;
}();
var Splide = _Splide;
Splide.defaults = {};
Splide.STATES = STATES;
var CLASS_RENDERED = "is-rendered";
var RENDERER_DEFAULT_CONFIG = {
  listTag: "ul",
  slideTag: "li"
};
var Style = /*#__PURE__*/function () {
  function Style(id, options) {
    this.styles = {};
    this.id = id;
    this.options = options;
  }
  var _proto2 = Style.prototype;
  _proto2.rule = function rule(selector, prop, value, breakpoint) {
    breakpoint = breakpoint || "default";
    var selectors = this.styles[breakpoint] = this.styles[breakpoint] || {};
    var styles = selectors[selector] = selectors[selector] || {};
    styles[prop] = value;
  };
  _proto2.build = function build() {
    var _this2 = this;
    var css = "";
    if (this.styles["default"]) {
      css += this.buildSelectors(this.styles["default"]);
    }
    Object.keys(this.styles).sort(function (n, m) {
      return _this2.options.mediaQuery === "min" ? +n - +m : +m - +n;
    }).forEach(function (breakpoint) {
      if (breakpoint !== "default") {
        css += "@media screen and (max-width: " + breakpoint + "px) {";
        css += _this2.buildSelectors(_this2.styles[breakpoint]);
        css += "}";
      }
    });
    return css;
  };
  _proto2.buildSelectors = function buildSelectors(selectors) {
    var _this3 = this;
    var css = "";
    forOwn(selectors, function (styles, selector) {
      selector = ("#" + _this3.id + " " + selector).trim();
      css += selector + " {";
      forOwn(styles, function (value, prop) {
        if (value || value === 0) {
          css += prop + ": " + value + ";";
        }
      });
      css += "}";
    });
    return css;
  };
  return Style;
}();
var SplideRenderer = /*#__PURE__*/function () {
  function SplideRenderer(contents, options, config, defaults) {
    this.slides = [];
    this.options = {};
    this.breakpoints = [];
    merge(DEFAULTS, defaults || {});
    merge(merge(this.options, DEFAULTS), options || {});
    this.contents = contents;
    this.config = assign({}, RENDERER_DEFAULT_CONFIG, config || {});
    this.id = this.config.id || uniqueId("splide");
    this.Style = new Style(this.id, this.options);
    this.Direction = Direction(null, null, this.options);
    assert(this.contents.length, "Provide at least 1 content.");
    this.init();
  }
  SplideRenderer.clean = function clean(splide) {
    var _EventInterface14 = EventInterface(splide),
      on = _EventInterface14.on;
    var root = splide.root;
    var clones = queryAll(root, "." + CLASS_CLONE);
    on(EVENT_MOUNTED, function () {
      remove(child(root, "style"));
    });
    remove(clones);
  };
  var _proto3 = SplideRenderer.prototype;
  _proto3.init = function init() {
    this.parseBreakpoints();
    this.initSlides();
    this.registerRootStyles();
    this.registerTrackStyles();
    this.registerSlideStyles();
    this.registerListStyles();
  };
  _proto3.initSlides = function initSlides() {
    var _this4 = this;
    push(this.slides, this.contents.map(function (content, index) {
      content = isString(content) ? {
        html: content
      } : content;
      content.styles = content.styles || {};
      content.attrs = content.attrs || {};
      _this4.cover(content);
      var classes = _this4.options.classes.slide + " " + (index === 0 ? CLASS_ACTIVE : "");
      assign(content.attrs, {
        "class": (classes + " " + (content.attrs["class"] || "")).trim(),
        style: _this4.buildStyles(content.styles)
      });
      return content;
    }));
    if (this.isLoop()) {
      this.generateClones(this.slides);
    }
  };
  _proto3.registerRootStyles = function registerRootStyles() {
    var _this5 = this;
    this.breakpoints.forEach(function (_ref2) {
      var width = _ref2[0],
        options = _ref2[1];
      _this5.Style.rule(" ", "max-width", unit(options.width), width);
    });
  };
  _proto3.registerTrackStyles = function registerTrackStyles() {
    var _this6 = this;
    var Style2 = this.Style;
    var selector = "." + CLASS_TRACK;
    this.breakpoints.forEach(function (_ref3) {
      var width = _ref3[0],
        options = _ref3[1];
      Style2.rule(selector, _this6.resolve("paddingLeft"), _this6.cssPadding(options, false), width);
      Style2.rule(selector, _this6.resolve("paddingRight"), _this6.cssPadding(options, true), width);
      Style2.rule(selector, "height", _this6.cssTrackHeight(options), width);
    });
  };
  _proto3.registerListStyles = function registerListStyles() {
    var _this7 = this;
    var Style2 = this.Style;
    var selector = "." + CLASS_LIST;
    this.breakpoints.forEach(function (_ref4) {
      var width = _ref4[0],
        options = _ref4[1];
      Style2.rule(selector, "transform", _this7.buildTranslate(options), width);
      if (!_this7.cssSlideHeight(options)) {
        Style2.rule(selector, "aspect-ratio", _this7.cssAspectRatio(options), width);
      }
    });
  };
  _proto3.registerSlideStyles = function registerSlideStyles() {
    var _this8 = this;
    var Style2 = this.Style;
    var selector = "." + CLASS_SLIDE;
    this.breakpoints.forEach(function (_ref5) {
      var width = _ref5[0],
        options = _ref5[1];
      Style2.rule(selector, "width", _this8.cssSlideWidth(options), width);
      Style2.rule(selector, "height", _this8.cssSlideHeight(options) || "100%", width);
      Style2.rule(selector, _this8.resolve("marginRight"), unit(options.gap) || "0px", width);
      Style2.rule(selector + " > img", "display", options.cover ? "none" : "inline", width);
    });
  };
  _proto3.buildTranslate = function buildTranslate(options) {
    var _this$Direction = this.Direction,
      resolve = _this$Direction.resolve,
      orient = _this$Direction.orient;
    var values = [];
    values.push(this.cssOffsetClones(options));
    values.push(this.cssOffsetGaps(options));
    if (this.isCenter(options)) {
      values.push(this.buildCssValue(orient(-50), "%"));
      values.push.apply(values, this.cssOffsetCenter(options));
    }
    return values.filter(Boolean).map(function (value) {
      return "translate" + resolve("X") + "(" + value + ")";
    }).join(" ");
  };
  _proto3.cssOffsetClones = function cssOffsetClones(options) {
    var _this$Direction2 = this.Direction,
      resolve = _this$Direction2.resolve,
      orient = _this$Direction2.orient;
    var cloneCount = this.getCloneCount();
    if (this.isFixedWidth(options)) {
      var _this$parseCssValue = this.parseCssValue(options[resolve("fixedWidth")]),
        value = _this$parseCssValue.value,
        unit2 = _this$parseCssValue.unit;
      return this.buildCssValue(orient(value) * cloneCount, unit2);
    }
    var percent = 100 * cloneCount / options.perPage;
    return orient(percent) + "%";
  };
  _proto3.cssOffsetCenter = function cssOffsetCenter(options) {
    var _this$Direction3 = this.Direction,
      resolve = _this$Direction3.resolve,
      orient = _this$Direction3.orient;
    if (this.isFixedWidth(options)) {
      var _this$parseCssValue2 = this.parseCssValue(options[resolve("fixedWidth")]),
        value = _this$parseCssValue2.value,
        unit2 = _this$parseCssValue2.unit;
      return [this.buildCssValue(orient(value / 2), unit2)];
    }
    var values = [];
    var perPage = options.perPage,
      gap = options.gap;
    values.push(orient(50 / perPage) + "%");
    if (gap) {
      var _this$parseCssValue3 = this.parseCssValue(gap),
        _value = _this$parseCssValue3.value,
        _unit = _this$parseCssValue3.unit;
      var gapOffset = (_value / perPage - _value) / 2;
      values.push(this.buildCssValue(orient(gapOffset), _unit));
    }
    return values;
  };
  _proto3.cssOffsetGaps = function cssOffsetGaps(options) {
    var cloneCount = this.getCloneCount();
    if (cloneCount && options.gap) {
      var orient = this.Direction.orient;
      var _this$parseCssValue4 = this.parseCssValue(options.gap),
        value = _this$parseCssValue4.value,
        unit2 = _this$parseCssValue4.unit;
      if (this.isFixedWidth(options)) {
        return this.buildCssValue(orient(value * cloneCount), unit2);
      }
      var perPage = options.perPage;
      var gaps = cloneCount / perPage;
      return this.buildCssValue(orient(gaps * value), unit2);
    }
    return "";
  };
  _proto3.resolve = function resolve(prop) {
    return camelToKebab(this.Direction.resolve(prop));
  };
  _proto3.cssPadding = function cssPadding(options, right) {
    var padding = options.padding;
    var prop = this.Direction.resolve(right ? "right" : "left", true);
    return padding && unit(padding[prop] || (isObject(padding) ? 0 : padding)) || "0px";
  };
  _proto3.cssTrackHeight = function cssTrackHeight(options) {
    var height = "";
    if (this.isVertical()) {
      height = this.cssHeight(options);
      assert(height, '"height" is missing.');
      height = "calc(" + height + " - " + this.cssPadding(options, false) + " - " + this.cssPadding(options, true) + ")";
    }
    return height;
  };
  _proto3.cssHeight = function cssHeight(options) {
    return unit(options.height);
  };
  _proto3.cssSlideWidth = function cssSlideWidth(options) {
    return options.autoWidth ? "" : unit(options.fixedWidth) || (this.isVertical() ? "" : this.cssSlideSize(options));
  };
  _proto3.cssSlideHeight = function cssSlideHeight(options) {
    return unit(options.fixedHeight) || (this.isVertical() ? options.autoHeight ? "" : this.cssSlideSize(options) : this.cssHeight(options));
  };
  _proto3.cssSlideSize = function cssSlideSize(options) {
    var gap = unit(options.gap);
    return "calc((100%" + (gap && " + " + gap) + ")/" + (options.perPage || 1) + (gap && " - " + gap) + ")";
  };
  _proto3.cssAspectRatio = function cssAspectRatio(options) {
    var heightRatio = options.heightRatio;
    return heightRatio ? "" + 1 / heightRatio : "";
  };
  _proto3.buildCssValue = function buildCssValue(value, unit2) {
    return "" + value + unit2;
  };
  _proto3.parseCssValue = function parseCssValue(value) {
    if (isString(value)) {
      var number = parseFloat(value) || 0;
      var unit2 = value.replace(/\d*(\.\d*)?/, "") || "px";
      return {
        value: number,
        unit: unit2
      };
    }
    return {
      value: value,
      unit: "px"
    };
  };
  _proto3.parseBreakpoints = function parseBreakpoints() {
    var _this9 = this;
    var breakpoints = this.options.breakpoints;
    this.breakpoints.push(["default", this.options]);
    if (breakpoints) {
      forOwn(breakpoints, function (options, width) {
        _this9.breakpoints.push([width, merge(merge({}, _this9.options), options)]);
      });
    }
  };
  _proto3.isFixedWidth = function isFixedWidth(options) {
    return !!options[this.Direction.resolve("fixedWidth")];
  };
  _proto3.isLoop = function isLoop() {
    return this.options.type === LOOP;
  };
  _proto3.isCenter = function isCenter(options) {
    if (options.focus === "center") {
      if (this.isLoop()) {
        return true;
      }
      if (this.options.type === SLIDE) {
        return !this.options.trimSpace;
      }
    }
    return false;
  };
  _proto3.isVertical = function isVertical() {
    return this.options.direction === TTB;
  };
  _proto3.buildClasses = function buildClasses() {
    var options = this.options;
    return [CLASS_ROOT, CLASS_ROOT + "--" + options.type, CLASS_ROOT + "--" + options.direction, options.drag && CLASS_ROOT + "--draggable", options.isNavigation && CLASS_ROOT + "--nav", CLASS_ACTIVE, !this.config.hidden && CLASS_RENDERED].filter(Boolean).join(" ");
  };
  _proto3.buildAttrs = function buildAttrs(attrs) {
    var attr = "";
    forOwn(attrs, function (value, key) {
      attr += value ? " " + camelToKebab(key) + "=\"" + value + "\"" : "";
    });
    return attr.trim();
  };
  _proto3.buildStyles = function buildStyles(styles) {
    var style = "";
    forOwn(styles, function (value, key) {
      style += " " + camelToKebab(key) + ":" + value + ";";
    });
    return style.trim();
  };
  _proto3.renderSlides = function renderSlides() {
    var _this10 = this;
    var tag = this.config.slideTag;
    return this.slides.map(function (content) {
      return "<" + tag + " " + _this10.buildAttrs(content.attrs) + ">" + (content.html || "") + "</" + tag + ">";
    }).join("");
  };
  _proto3.cover = function cover(content) {
    var styles = content.styles,
      _content$html = content.html,
      html = _content$html === void 0 ? "" : _content$html;
    if (this.options.cover && !this.options.lazyLoad) {
      var src = html.match(/<img.*?src\s*=\s*(['"])(.+?)\1.*?>/);
      if (src && src[2]) {
        styles.background = "center/cover no-repeat url('" + src[2] + "')";
      }
    }
  };
  _proto3.generateClones = function generateClones(contents) {
    var classes = this.options.classes;
    var count = this.getCloneCount();
    var slides = contents.slice();
    while (slides.length < count) {
      push(slides, slides);
    }
    push(slides.slice(-count).reverse(), slides.slice(0, count)).forEach(function (content, index) {
      var attrs = assign({}, content.attrs, {
        "class": content.attrs["class"] + " " + classes.clone
      });
      var clone = assign({}, content, {
        attrs: attrs
      });
      index < count ? contents.unshift(clone) : contents.push(clone);
    });
  };
  _proto3.getCloneCount = function getCloneCount() {
    if (this.isLoop()) {
      var options = this.options;
      if (options.clones) {
        return options.clones;
      }
      var perPage = max.apply(void 0, this.breakpoints.map(function (_ref6) {
        var options2 = _ref6[1];
        return options2.perPage;
      }));
      return perPage * ((options.flickMaxPages || 1) + 1);
    }
    return 0;
  };
  _proto3.renderArrows = function renderArrows() {
    var html = "";
    html += "<div class=\"" + this.options.classes.arrows + "\">";
    html += this.renderArrow(true);
    html += this.renderArrow(false);
    html += "</div>";
    return html;
  };
  _proto3.renderArrow = function renderArrow(prev) {
    var _this$options = this.options,
      classes = _this$options.classes,
      i18n = _this$options.i18n;
    var attrs = {
      "class": classes.arrow + " " + (prev ? classes.prev : classes.next),
      type: "button",
      ariaLabel: prev ? i18n.prev : i18n.next
    };
    return "<button " + this.buildAttrs(attrs) + "><svg xmlns=\"" + XML_NAME_SPACE + "\" viewBox=\"0 0 " + SIZE + " " + SIZE + "\" width=\"" + SIZE + "\" height=\"" + SIZE + "\"><path d=\"" + (this.options.arrowPath || PATH) + "\" /></svg></button>";
  };
  _proto3.html = function html() {
    var _this$config = this.config,
      rootClass = _this$config.rootClass,
      listTag = _this$config.listTag,
      arrows = _this$config.arrows,
      beforeTrack = _this$config.beforeTrack,
      afterTrack = _this$config.afterTrack,
      slider = _this$config.slider,
      beforeSlider = _this$config.beforeSlider,
      afterSlider = _this$config.afterSlider;
    var html = "";
    html += "<div id=\"" + this.id + "\" class=\"" + this.buildClasses() + " " + (rootClass || "") + "\">";
    html += "<style>" + this.Style.build() + "</style>";
    if (slider) {
      html += beforeSlider || "";
      html += "<div class=\"splide__slider\">";
    }
    html += beforeTrack || "";
    if (arrows) {
      html += this.renderArrows();
    }
    html += "<div class=\"splide__track\">";
    html += "<" + listTag + " class=\"splide__list\">";
    html += this.renderSlides();
    html += "</" + listTag + ">";
    html += "</div>";
    html += afterTrack || "";
    if (slider) {
      html += "</div>";
      html += afterSlider || "";
    }
    html += "</div>";
    return html;
  };
  return SplideRenderer;
}();
exports.CLASSES = CLASSES;
exports.CLASS_ACTIVE = CLASS_ACTIVE;
exports.CLASS_ARROW = CLASS_ARROW;
exports.CLASS_ARROWS = CLASS_ARROWS;
exports.CLASS_ARROW_NEXT = CLASS_ARROW_NEXT;
exports.CLASS_ARROW_PREV = CLASS_ARROW_PREV;
exports.CLASS_CLONE = CLASS_CLONE;
exports.CLASS_CONTAINER = CLASS_CONTAINER;
exports.CLASS_FOCUS_IN = CLASS_FOCUS_IN;
exports.CLASS_INITIALIZED = CLASS_INITIALIZED;
exports.CLASS_LIST = CLASS_LIST;
exports.CLASS_LOADING = CLASS_LOADING;
exports.CLASS_NEXT = CLASS_NEXT;
exports.CLASS_OVERFLOW = CLASS_OVERFLOW;
exports.CLASS_PAGINATION = CLASS_PAGINATION;
exports.CLASS_PAGINATION_PAGE = CLASS_PAGINATION_PAGE;
exports.CLASS_PREV = CLASS_PREV;
exports.CLASS_PROGRESS = CLASS_PROGRESS;
exports.CLASS_PROGRESS_BAR = CLASS_PROGRESS_BAR;
exports.CLASS_ROOT = CLASS_ROOT;
exports.CLASS_SLIDE = CLASS_SLIDE;
exports.CLASS_SPINNER = CLASS_SPINNER;
exports.CLASS_SR = CLASS_SR;
exports.CLASS_TOGGLE = CLASS_TOGGLE;
exports.CLASS_TOGGLE_PAUSE = CLASS_TOGGLE_PAUSE;
exports.CLASS_TOGGLE_PLAY = CLASS_TOGGLE_PLAY;
exports.CLASS_TRACK = CLASS_TRACK;
exports.CLASS_VISIBLE = CLASS_VISIBLE;
exports.DEFAULTS = DEFAULTS;
exports.EVENT_ACTIVE = EVENT_ACTIVE;
exports.EVENT_ARROWS_MOUNTED = EVENT_ARROWS_MOUNTED;
exports.EVENT_ARROWS_UPDATED = EVENT_ARROWS_UPDATED;
exports.EVENT_AUTOPLAY_PAUSE = EVENT_AUTOPLAY_PAUSE;
exports.EVENT_AUTOPLAY_PLAY = EVENT_AUTOPLAY_PLAY;
exports.EVENT_AUTOPLAY_PLAYING = EVENT_AUTOPLAY_PLAYING;
exports.EVENT_CLICK = EVENT_CLICK;
exports.EVENT_DESTROY = EVENT_DESTROY;
exports.EVENT_DRAG = EVENT_DRAG;
exports.EVENT_DRAGGED = EVENT_DRAGGED;
exports.EVENT_DRAGGING = EVENT_DRAGGING;
exports.EVENT_END_INDEX_CHANGED = EVENT_END_INDEX_CHANGED;
exports.EVENT_HIDDEN = EVENT_HIDDEN;
exports.EVENT_INACTIVE = EVENT_INACTIVE;
exports.EVENT_LAZYLOAD_LOADED = EVENT_LAZYLOAD_LOADED;
exports.EVENT_MOUNTED = EVENT_MOUNTED;
exports.EVENT_MOVE = EVENT_MOVE;
exports.EVENT_MOVED = EVENT_MOVED;
exports.EVENT_NAVIGATION_MOUNTED = EVENT_NAVIGATION_MOUNTED;
exports.EVENT_OVERFLOW = EVENT_OVERFLOW;
exports.EVENT_PAGINATION_MOUNTED = EVENT_PAGINATION_MOUNTED;
exports.EVENT_PAGINATION_UPDATED = EVENT_PAGINATION_UPDATED;
exports.EVENT_READY = EVENT_READY;
exports.EVENT_REFRESH = EVENT_REFRESH;
exports.EVENT_RESIZE = EVENT_RESIZE;
exports.EVENT_RESIZED = EVENT_RESIZED;
exports.EVENT_SCROLL = EVENT_SCROLL;
exports.EVENT_SCROLLED = EVENT_SCROLLED;
exports.EVENT_SHIFTED = EVENT_SHIFTED;
exports.EVENT_SLIDE_KEYDOWN = EVENT_SLIDE_KEYDOWN;
exports.EVENT_UPDATED = EVENT_UPDATED;
exports.EVENT_VISIBLE = EVENT_VISIBLE;
exports.EventBinder = EventBinder;
exports.EventInterface = EventInterface;
exports.FADE = FADE;
exports.LOOP = LOOP;
exports.LTR = LTR;
exports.RTL = RTL;
exports.RequestInterval = RequestInterval;
exports.SLIDE = SLIDE;
exports.STATUS_CLASSES = STATUS_CLASSES;
exports.Splide = Splide;
exports.SplideRenderer = SplideRenderer;
exports.State = State;
exports.TTB = TTB;
exports.Throttle = Throttle;
exports["default"] = Splide;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * component - object with instance, rootSelector
 * example:
 * {
 *  instance: Splide,
 *  rootSelector: '.splide',
 * }
 */
var PageManager = exports["default"] = /*#__PURE__*/function () {
  function PageManager() {
    var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    _classCallCheck(this, PageManager);
    this.components = components;
    this.init();
  }
  return _createClass(PageManager, [{
    key: "init",
    value: function init() {
      this.components.forEach(function (component) {
        if (!component.instance) {
          console.warn("Component is missing instance property:", component);
          return;
        }
        if (!component.rootSelector || !document.querySelector(component.rootSelector)) {
          console.warn("Component root element not found:", component);
          return;
        }
        try {
          new component.instance(component.rootSelector);
        } catch (error) {
          console.warn("Failed to initialize component:", component, error);
        }
      });
    }
  }]);
}();

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onContentLoaded = onContentLoaded;
function onContentLoaded(callback) {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

},{}],4:[function(require,module,exports){
"use strict";

var _utils = require("./general/utils");
var _pageManager = _interopRequireDefault(require("./general/page-manager"));
var _launch = _interopRequireDefault(require("./pages/launch"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// General

// Pages

(0, _utils.onContentLoaded)(function () {
  new _pageManager["default"]([{
    instance: _launch["default"],
    rootSelector: ".page_launch"
  }]);
});

},{"./general/page-manager":2,"./general/utils":3,"./pages/launch":5}],5:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _splide = _interopRequireDefault(require("@splidejs/splide"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
var _LaunchPage_brand = /*#__PURE__*/new WeakSet();
var LaunchPage = /*#__PURE__*/function () {
  function LaunchPage(rootSelector) {
    _classCallCheck(this, LaunchPage);
    _classPrivateMethodInitSpec(this, _LaunchPage_brand);
    var rootEl = document.querySelector(rootSelector);
    if (!rootEl) {
      throw new Error("No element found with selector ".concat(rootSelector));
    }
    this.rootEl = rootEl;
    this.cardsGrid = this.rootEl.querySelector("#launchCards");
    this.init();
  }
  return _createClass(LaunchPage, [{
    key: "init",
    value: function init() {
      console.log("LaunchPage init");
    }
  }]);
}();
function _initSplide() {
  var launchSplide = new _splide["default"](this.cardsGrid, {
    type: "loop",
    perPage: 6,
    perMove: 1,
    gap: 12,
    breakpoints: {
      1860: {
        perPage: 5
      },
      1024: {
        perPage: 4
      },
      768: {
        perPage: 3
      },
      620: {
        perPage: 2
      },
      320: {
        perPage: 1
      }
    }
  });
  launchSplide.mount();
}
var _default = exports["default"] = LaunchPage;

},{"@splidejs/splide":1}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvQHNwbGlkZWpzL3NwbGlkZS9kaXN0L2pzL3NwbGlkZS5janMuanMiLCJzcmMvc3dpc3N3YXRjaGVzL2pzL2dlbmVyYWwvcGFnZS1tYW5hZ2VyLmpzIiwic3JjL3N3aXNzd2F0Y2hlcy9qcy9nZW5lcmFsL3V0aWxzLmpzIiwic3JjL3N3aXNzd2F0Y2hlcy9qcy9sYXVuY2guanMiLCJzcmMvc3dpc3N3YXRjaGVzL2pzL3BhZ2VzL2xhdW5jaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7O0FBQUMsU0FBQSxRQUFBLENBQUEsc0NBQUEsT0FBQSx3QkFBQSxNQUFBLHVCQUFBLE1BQUEsQ0FBQSxRQUFBLGFBQUEsQ0FBQSxrQkFBQSxDQUFBLGdCQUFBLENBQUEsV0FBQSxDQUFBLHlCQUFBLE1BQUEsSUFBQSxDQUFBLENBQUEsV0FBQSxLQUFBLE1BQUEsSUFBQSxDQUFBLEtBQUEsTUFBQSxDQUFBLFNBQUEscUJBQUEsQ0FBQSxLQUFBLE9BQUEsQ0FBQSxDQUFBO0FBRWIsU0FBUyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFO0VBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFBRSxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQUUsVUFBVSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxJQUFJLEtBQUs7SUFBRSxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUk7SUFBRSxJQUFJLE9BQU8sSUFBSSxVQUFVLEVBQUUsVUFBVSxDQUFDLFFBQVEsR0FBRyxJQUFJO0lBQUUsTUFBTSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFB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YXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLyohXG4gKiBTcGxpZGUuanNcbiAqIFZlcnNpb24gIDogNC4xLjRcbiAqIExpY2Vuc2UgIDogTUlUXG4gKiBDb3B5cmlnaHQ6IDIwMjIgTmFvdG9zaGkgRnVqaXRhXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfVxuXG5mdW5jdGlvbiBfY3JlYXRlQ2xhc3MoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb25zdHJ1Y3RvciwgXCJwcm90b3R5cGVcIiwgeyB3cml0YWJsZTogZmFsc2UgfSk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBNRURJQV9QUkVGRVJTX1JFRFVDRURfTU9USU9OID0gXCIocHJlZmVycy1yZWR1Y2VkLW1vdGlvbjogcmVkdWNlKVwiO1xudmFyIENSRUFURUQgPSAxO1xudmFyIE1PVU5URUQgPSAyO1xudmFyIElETEUgPSAzO1xudmFyIE1PVklORyA9IDQ7XG52YXIgU0NST0xMSU5HID0gNTtcbnZhciBEUkFHR0lORyA9IDY7XG52YXIgREVTVFJPWUVEID0gNztcbnZhciBTVEFURVMgPSB7XG4gIENSRUFURUQ6IENSRUFURUQsXG4gIE1PVU5URUQ6IE1PVU5URUQsXG4gIElETEU6IElETEUsXG4gIE1PVklORzogTU9WSU5HLFxuICBTQ1JPTExJTkc6IFNDUk9MTElORyxcbiAgRFJBR0dJTkc6IERSQUdHSU5HLFxuICBERVNUUk9ZRUQ6IERFU1RST1lFRFxufTtcblxuZnVuY3Rpb24gZW1wdHkoYXJyYXkpIHtcbiAgYXJyYXkubGVuZ3RoID0gMDtcbn1cblxuZnVuY3Rpb24gc2xpY2UoYXJyYXlMaWtlLCBzdGFydCwgZW5kKSB7XG4gIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcnJheUxpa2UsIHN0YXJ0LCBlbmQpO1xufVxuXG5mdW5jdGlvbiBhcHBseShmdW5jKSB7XG4gIHJldHVybiBmdW5jLmJpbmQuYXBwbHkoZnVuYywgW251bGxdLmNvbmNhdChzbGljZShhcmd1bWVudHMsIDEpKSk7XG59XG5cbnZhciBuZXh0VGljayA9IHNldFRpbWVvdXQ7XG5cbnZhciBub29wID0gZnVuY3Rpb24gbm9vcCgpIHt9O1xuXG5mdW5jdGlvbiByYWYoZnVuYykge1xuICByZXR1cm4gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGZ1bmMpO1xufVxuXG5mdW5jdGlvbiB0eXBlT2YodHlwZSwgc3ViamVjdCkge1xuICByZXR1cm4gdHlwZW9mIHN1YmplY3QgPT09IHR5cGU7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KHN1YmplY3QpIHtcbiAgcmV0dXJuICFpc051bGwoc3ViamVjdCkgJiYgdHlwZU9mKFwib2JqZWN0XCIsIHN1YmplY3QpO1xufVxuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgaXNGdW5jdGlvbiA9IGFwcGx5KHR5cGVPZiwgXCJmdW5jdGlvblwiKTtcbnZhciBpc1N0cmluZyA9IGFwcGx5KHR5cGVPZiwgXCJzdHJpbmdcIik7XG52YXIgaXNVbmRlZmluZWQgPSBhcHBseSh0eXBlT2YsIFwidW5kZWZpbmVkXCIpO1xuXG5mdW5jdGlvbiBpc051bGwoc3ViamVjdCkge1xuICByZXR1cm4gc3ViamVjdCA9PT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNIVE1MRWxlbWVudChzdWJqZWN0KSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIHN1YmplY3QgaW5zdGFuY2VvZiAoc3ViamVjdC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IHx8IHdpbmRvdykuSFRNTEVsZW1lbnQ7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gdG9BcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNBcnJheSh2YWx1ZSkgPyB2YWx1ZSA6IFt2YWx1ZV07XG59XG5cbmZ1bmN0aW9uIGZvckVhY2godmFsdWVzLCBpdGVyYXRlZSkge1xuICB0b0FycmF5KHZhbHVlcykuZm9yRWFjaChpdGVyYXRlZSk7XG59XG5cbmZ1bmN0aW9uIGluY2x1ZGVzKGFycmF5LCB2YWx1ZSkge1xuICByZXR1cm4gYXJyYXkuaW5kZXhPZih2YWx1ZSkgPiAtMTtcbn1cblxuZnVuY3Rpb24gcHVzaChhcnJheSwgaXRlbXMpIHtcbiAgYXJyYXkucHVzaC5hcHBseShhcnJheSwgdG9BcnJheShpdGVtcykpO1xuICByZXR1cm4gYXJyYXk7XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKGVsbSwgY2xhc3NlcywgYWRkKSB7XG4gIGlmIChlbG0pIHtcbiAgICBmb3JFYWNoKGNsYXNzZXMsIGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICBpZiAobmFtZSkge1xuICAgICAgICBlbG0uY2xhc3NMaXN0W2FkZCA/IFwiYWRkXCIgOiBcInJlbW92ZVwiXShuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhZGRDbGFzcyhlbG0sIGNsYXNzZXMpIHtcbiAgdG9nZ2xlQ2xhc3MoZWxtLCBpc1N0cmluZyhjbGFzc2VzKSA/IGNsYXNzZXMuc3BsaXQoXCIgXCIpIDogY2xhc3NlcywgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZChwYXJlbnQsIGNoaWxkcmVuKSB7XG4gIGZvckVhY2goY2hpbGRyZW4sIHBhcmVudC5hcHBlbmRDaGlsZC5iaW5kKHBhcmVudCkpO1xufVxuXG5mdW5jdGlvbiBiZWZvcmUobm9kZXMsIHJlZikge1xuICBmb3JFYWNoKG5vZGVzLCBmdW5jdGlvbiAobm9kZSkge1xuICAgIHZhciBwYXJlbnQgPSAocmVmIHx8IG5vZGUpLnBhcmVudE5vZGU7XG5cbiAgICBpZiAocGFyZW50KSB7XG4gICAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIHJlZik7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gbWF0Y2hlcyhlbG0sIHNlbGVjdG9yKSB7XG4gIHJldHVybiBpc0hUTUxFbGVtZW50KGVsbSkgJiYgKGVsbVtcIm1zTWF0Y2hlc1NlbGVjdG9yXCJdIHx8IGVsbS5tYXRjaGVzKS5jYWxsKGVsbSwgc2VsZWN0b3IpO1xufVxuXG5mdW5jdGlvbiBjaGlsZHJlbihwYXJlbnQsIHNlbGVjdG9yKSB7XG4gIHZhciBjaGlsZHJlbjIgPSBwYXJlbnQgPyBzbGljZShwYXJlbnQuY2hpbGRyZW4pIDogW107XG4gIHJldHVybiBzZWxlY3RvciA/IGNoaWxkcmVuMi5maWx0ZXIoZnVuY3Rpb24gKGNoaWxkKSB7XG4gICAgcmV0dXJuIG1hdGNoZXMoY2hpbGQsIHNlbGVjdG9yKTtcbiAgfSkgOiBjaGlsZHJlbjI7XG59XG5cbmZ1bmN0aW9uIGNoaWxkKHBhcmVudCwgc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID8gY2hpbGRyZW4ocGFyZW50LCBzZWxlY3RvcilbMF0gOiBwYXJlbnQuZmlyc3RFbGVtZW50Q2hpbGQ7XG59XG5cbnZhciBvd25LZXlzID0gT2JqZWN0LmtleXM7XG5cbmZ1bmN0aW9uIGZvck93bihvYmplY3QsIGl0ZXJhdGVlLCByaWdodCkge1xuICBpZiAob2JqZWN0KSB7XG4gICAgKHJpZ2h0ID8gb3duS2V5cyhvYmplY3QpLnJldmVyc2UoKSA6IG93bktleXMob2JqZWN0KSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBrZXkgIT09IFwiX19wcm90b19fXCIgJiYgaXRlcmF0ZWUob2JqZWN0W2tleV0sIGtleSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBhc3NpZ24ob2JqZWN0KSB7XG4gIHNsaWNlKGFyZ3VtZW50cywgMSkuZm9yRWFjaChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgZm9yT3duKHNvdXJjZSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIG9iamVjdFtrZXldID0gc291cmNlW2tleV07XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBtZXJnZShvYmplY3QpIHtcbiAgc2xpY2UoYXJndW1lbnRzLCAxKS5mb3JFYWNoKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICBmb3JPd24oc291cmNlLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWUuc2xpY2UoKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gbWVyZ2Uoe30sIGlzT2JqZWN0KG9iamVjdFtrZXldKSA/IG9iamVjdFtrZXldIDoge30sIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICByZXR1cm4gb2JqZWN0O1xufVxuXG5mdW5jdGlvbiBvbWl0KG9iamVjdCwga2V5cykge1xuICBmb3JFYWNoKGtleXMgfHwgb3duS2V5cyhvYmplY3QpLCBmdW5jdGlvbiAoa2V5KSB7XG4gICAgZGVsZXRlIG9iamVjdFtrZXldO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQXR0cmlidXRlKGVsbXMsIGF0dHJzKSB7XG4gIGZvckVhY2goZWxtcywgZnVuY3Rpb24gKGVsbSkge1xuICAgIGZvckVhY2goYXR0cnMsIGZ1bmN0aW9uIChhdHRyKSB7XG4gICAgICBlbG0gJiYgZWxtLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZShlbG1zLCBhdHRycywgdmFsdWUpIHtcbiAgaWYgKGlzT2JqZWN0KGF0dHJzKSkge1xuICAgIGZvck93bihhdHRycywgZnVuY3Rpb24gKHZhbHVlMiwgbmFtZSkge1xuICAgICAgc2V0QXR0cmlidXRlKGVsbXMsIG5hbWUsIHZhbHVlMik7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZm9yRWFjaChlbG1zLCBmdW5jdGlvbiAoZWxtKSB7XG4gICAgICBpc051bGwodmFsdWUpIHx8IHZhbHVlID09PSBcIlwiID8gcmVtb3ZlQXR0cmlidXRlKGVsbSwgYXR0cnMpIDogZWxtLnNldEF0dHJpYnV0ZShhdHRycywgU3RyaW5nKHZhbHVlKSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlKHRhZywgYXR0cnMsIHBhcmVudCkge1xuICB2YXIgZWxtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuXG4gIGlmIChhdHRycykge1xuICAgIGlzU3RyaW5nKGF0dHJzKSA/IGFkZENsYXNzKGVsbSwgYXR0cnMpIDogc2V0QXR0cmlidXRlKGVsbSwgYXR0cnMpO1xuICB9XG5cbiAgcGFyZW50ICYmIGFwcGVuZChwYXJlbnQsIGVsbSk7XG4gIHJldHVybiBlbG07XG59XG5cbmZ1bmN0aW9uIHN0eWxlKGVsbSwgcHJvcCwgdmFsdWUpIHtcbiAgaWYgKGlzVW5kZWZpbmVkKHZhbHVlKSkge1xuICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKGVsbSlbcHJvcF07XG4gIH1cblxuICBpZiAoIWlzTnVsbCh2YWx1ZSkpIHtcbiAgICBlbG0uc3R5bGVbcHJvcF0gPSBcIlwiICsgdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGxheShlbG0sIGRpc3BsYXkyKSB7XG4gIHN0eWxlKGVsbSwgXCJkaXNwbGF5XCIsIGRpc3BsYXkyKTtcbn1cblxuZnVuY3Rpb24gZm9jdXMoZWxtKSB7XG4gIGVsbVtcInNldEFjdGl2ZVwiXSAmJiBlbG1bXCJzZXRBY3RpdmVcIl0oKSB8fCBlbG0uZm9jdXMoe1xuICAgIHByZXZlbnRTY3JvbGw6IHRydWVcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGdldEF0dHJpYnV0ZShlbG0sIGF0dHIpIHtcbiAgcmV0dXJuIGVsbS5nZXRBdHRyaWJ1dGUoYXR0cik7XG59XG5cbmZ1bmN0aW9uIGhhc0NsYXNzKGVsbSwgY2xhc3NOYW1lKSB7XG4gIHJldHVybiBlbG0gJiYgZWxtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xufVxuXG5mdW5jdGlvbiByZWN0KHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmUobm9kZXMpIHtcbiAgZm9yRWFjaChub2RlcywgZnVuY3Rpb24gKG5vZGUpIHtcbiAgICBpZiAobm9kZSAmJiBub2RlLnBhcmVudE5vZGUpIHtcbiAgICAgIG5vZGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChub2RlKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJzZUh0bWwoaHRtbCkge1xuICByZXR1cm4gY2hpbGQobmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhodG1sLCBcInRleHQvaHRtbFwiKS5ib2R5KTtcbn1cblxuZnVuY3Rpb24gcHJldmVudChlLCBzdG9wUHJvcGFnYXRpb24pIHtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGlmIChzdG9wUHJvcGFnYXRpb24pIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gcXVlcnkocGFyZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gcGFyZW50ICYmIHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKTtcbn1cblxuZnVuY3Rpb24gcXVlcnlBbGwocGFyZW50LCBzZWxlY3Rvcikge1xuICByZXR1cm4gc2VsZWN0b3IgPyBzbGljZShwYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpIDogW107XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsbSwgY2xhc3Nlcykge1xuICB0b2dnbGVDbGFzcyhlbG0sIGNsYXNzZXMsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gdGltZU9mKGUpIHtcbiAgcmV0dXJuIGUudGltZVN0YW1wO1xufVxuXG5mdW5jdGlvbiB1bml0KHZhbHVlKSB7XG4gIHJldHVybiBpc1N0cmluZyh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID8gdmFsdWUgKyBcInB4XCIgOiBcIlwiO1xufVxuXG52YXIgUFJPSkVDVF9DT0RFID0gXCJzcGxpZGVcIjtcbnZhciBEQVRBX0FUVFJJQlVURSA9IFwiZGF0YS1cIiArIFBST0pFQ1RfQ09ERTtcblxuZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcIltcIiArIFBST0pFQ1RfQ09ERSArIFwiXSBcIiArIChtZXNzYWdlIHx8IFwiXCIpKTtcbiAgfVxufVxuXG52YXIgbWluID0gTWF0aC5taW4sXG4gICAgbWF4ID0gTWF0aC5tYXgsXG4gICAgZmxvb3IgPSBNYXRoLmZsb29yLFxuICAgIGNlaWwgPSBNYXRoLmNlaWwsXG4gICAgYWJzID0gTWF0aC5hYnM7XG5cbmZ1bmN0aW9uIGFwcHJveGltYXRlbHlFcXVhbCh4LCB5LCBlcHNpbG9uKSB7XG4gIHJldHVybiBhYnMoeCAtIHkpIDwgZXBzaWxvbjtcbn1cblxuZnVuY3Rpb24gYmV0d2VlbihudW1iZXIsIHgsIHksIGV4Y2x1c2l2ZSkge1xuICB2YXIgbWluaW11bSA9IG1pbih4LCB5KTtcbiAgdmFyIG1heGltdW0gPSBtYXgoeCwgeSk7XG4gIHJldHVybiBleGNsdXNpdmUgPyBtaW5pbXVtIDwgbnVtYmVyICYmIG51bWJlciA8IG1heGltdW0gOiBtaW5pbXVtIDw9IG51bWJlciAmJiBudW1iZXIgPD0gbWF4aW11bTtcbn1cblxuZnVuY3Rpb24gY2xhbXAobnVtYmVyLCB4LCB5KSB7XG4gIHZhciBtaW5pbXVtID0gbWluKHgsIHkpO1xuICB2YXIgbWF4aW11bSA9IG1heCh4LCB5KTtcbiAgcmV0dXJuIG1pbihtYXgobWluaW11bSwgbnVtYmVyKSwgbWF4aW11bSk7XG59XG5cbmZ1bmN0aW9uIHNpZ24oeCkge1xuICByZXR1cm4gKyh4ID4gMCkgLSArKHggPCAwKTtcbn1cblxuZnVuY3Rpb24gY2FtZWxUb0tlYmFiKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbYS16MC05XSkoW0EtWl0pL2csIFwiJDEtJDJcIikudG9Mb3dlckNhc2UoKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0KHN0cmluZywgcmVwbGFjZW1lbnRzKSB7XG4gIGZvckVhY2gocmVwbGFjZW1lbnRzLCBmdW5jdGlvbiAocmVwbGFjZW1lbnQpIHtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZShcIiVzXCIsIFwiXCIgKyByZXBsYWNlbWVudCk7XG4gIH0pO1xuICByZXR1cm4gc3RyaW5nO1xufVxuXG5mdW5jdGlvbiBwYWQobnVtYmVyKSB7XG4gIHJldHVybiBudW1iZXIgPCAxMCA/IFwiMFwiICsgbnVtYmVyIDogXCJcIiArIG51bWJlcjtcbn1cblxudmFyIGlkcyA9IHt9O1xuXG5mdW5jdGlvbiB1bmlxdWVJZChwcmVmaXgpIHtcbiAgcmV0dXJuIFwiXCIgKyBwcmVmaXggKyBwYWQoaWRzW3ByZWZpeF0gPSAoaWRzW3ByZWZpeF0gfHwgMCkgKyAxKTtcbn1cblxuZnVuY3Rpb24gRXZlbnRCaW5kZXIoKSB7XG4gIHZhciBsaXN0ZW5lcnMgPSBbXTtcblxuICBmdW5jdGlvbiBiaW5kKHRhcmdldHMsIGV2ZW50cywgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBmdW5jdGlvbiAodGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlKSB7XG4gICAgICB2YXIgaXNFdmVudFRhcmdldCA9IChcImFkZEV2ZW50TGlzdGVuZXJcIiBpbiB0YXJnZXQpO1xuICAgICAgdmFyIHJlbW92ZXIgPSBpc0V2ZW50VGFyZ2V0ID8gdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIuYmluZCh0YXJnZXQsIGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucykgOiB0YXJnZXRbXCJyZW1vdmVMaXN0ZW5lclwiXS5iaW5kKHRhcmdldCwgY2FsbGJhY2spO1xuICAgICAgaXNFdmVudFRhcmdldCA/IHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgb3B0aW9ucykgOiB0YXJnZXRbXCJhZGRMaXN0ZW5lclwiXShjYWxsYmFjayk7XG4gICAgICBsaXN0ZW5lcnMucHVzaChbdGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlLCBjYWxsYmFjaywgcmVtb3Zlcl0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdW5iaW5kKHRhcmdldHMsIGV2ZW50cywgY2FsbGJhY2spIHtcbiAgICBmb3JFYWNoRXZlbnQodGFyZ2V0cywgZXZlbnRzLCBmdW5jdGlvbiAodGFyZ2V0LCBldmVudCwgbmFtZXNwYWNlKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuZmlsdGVyKGZ1bmN0aW9uIChsaXN0ZW5lcikge1xuICAgICAgICBpZiAobGlzdGVuZXJbMF0gPT09IHRhcmdldCAmJiBsaXN0ZW5lclsxXSA9PT0gZXZlbnQgJiYgbGlzdGVuZXJbMl0gPT09IG5hbWVzcGFjZSAmJiAoIWNhbGxiYWNrIHx8IGxpc3RlbmVyWzNdID09PSBjYWxsYmFjaykpIHtcbiAgICAgICAgICBsaXN0ZW5lcls0XSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwYXRjaCh0YXJnZXQsIHR5cGUsIGRldGFpbCkge1xuICAgIHZhciBlO1xuICAgIHZhciBidWJibGVzID0gdHJ1ZTtcblxuICAgIGlmICh0eXBlb2YgQ3VzdG9tRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgZSA9IG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgICAgIGJ1YmJsZXM6IGJ1YmJsZXMsXG4gICAgICAgIGRldGFpbDogZGV0YWlsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiQ3VzdG9tRXZlbnRcIik7XG4gICAgICBlLmluaXRDdXN0b21FdmVudCh0eXBlLCBidWJibGVzLCBmYWxzZSwgZGV0YWlsKTtcbiAgICB9XG5cbiAgICB0YXJnZXQuZGlzcGF0Y2hFdmVudChlKTtcbiAgICByZXR1cm4gZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZvckVhY2hFdmVudCh0YXJnZXRzLCBldmVudHMsIGl0ZXJhdGVlKSB7XG4gICAgZm9yRWFjaCh0YXJnZXRzLCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgJiYgZm9yRWFjaChldmVudHMsIGZ1bmN0aW9uIChldmVudHMyKSB7XG4gICAgICAgIGV2ZW50czIuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TlMpIHtcbiAgICAgICAgICB2YXIgZnJhZ21lbnQgPSBldmVudE5TLnNwbGl0KFwiLlwiKTtcbiAgICAgICAgICBpdGVyYXRlZSh0YXJnZXQsIGZyYWdtZW50WzBdLCBmcmFnbWVudFsxXSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGxpc3RlbmVycy5mb3JFYWNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICBkYXRhWzRdKCk7XG4gICAgfSk7XG4gICAgZW1wdHkobGlzdGVuZXJzKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYmluZDogYmluZCxcbiAgICB1bmJpbmQ6IHVuYmluZCxcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG52YXIgRVZFTlRfTU9VTlRFRCA9IFwibW91bnRlZFwiO1xudmFyIEVWRU5UX1JFQURZID0gXCJyZWFkeVwiO1xudmFyIEVWRU5UX01PVkUgPSBcIm1vdmVcIjtcbnZhciBFVkVOVF9NT1ZFRCA9IFwibW92ZWRcIjtcbnZhciBFVkVOVF9DTElDSyA9IFwiY2xpY2tcIjtcbnZhciBFVkVOVF9BQ1RJVkUgPSBcImFjdGl2ZVwiO1xudmFyIEVWRU5UX0lOQUNUSVZFID0gXCJpbmFjdGl2ZVwiO1xudmFyIEVWRU5UX1ZJU0lCTEUgPSBcInZpc2libGVcIjtcbnZhciBFVkVOVF9ISURERU4gPSBcImhpZGRlblwiO1xudmFyIEVWRU5UX1JFRlJFU0ggPSBcInJlZnJlc2hcIjtcbnZhciBFVkVOVF9VUERBVEVEID0gXCJ1cGRhdGVkXCI7XG52YXIgRVZFTlRfUkVTSVpFID0gXCJyZXNpemVcIjtcbnZhciBFVkVOVF9SRVNJWkVEID0gXCJyZXNpemVkXCI7XG52YXIgRVZFTlRfRFJBRyA9IFwiZHJhZ1wiO1xudmFyIEVWRU5UX0RSQUdHSU5HID0gXCJkcmFnZ2luZ1wiO1xudmFyIEVWRU5UX0RSQUdHRUQgPSBcImRyYWdnZWRcIjtcbnZhciBFVkVOVF9TQ1JPTEwgPSBcInNjcm9sbFwiO1xudmFyIEVWRU5UX1NDUk9MTEVEID0gXCJzY3JvbGxlZFwiO1xudmFyIEVWRU5UX09WRVJGTE9XID0gXCJvdmVyZmxvd1wiO1xudmFyIEVWRU5UX0RFU1RST1kgPSBcImRlc3Ryb3lcIjtcbnZhciBFVkVOVF9BUlJPV1NfTU9VTlRFRCA9IFwiYXJyb3dzOm1vdW50ZWRcIjtcbnZhciBFVkVOVF9BUlJPV1NfVVBEQVRFRCA9IFwiYXJyb3dzOnVwZGF0ZWRcIjtcbnZhciBFVkVOVF9QQUdJTkFUSU9OX01PVU5URUQgPSBcInBhZ2luYXRpb246bW91bnRlZFwiO1xudmFyIEVWRU5UX1BBR0lOQVRJT05fVVBEQVRFRCA9IFwicGFnaW5hdGlvbjp1cGRhdGVkXCI7XG52YXIgRVZFTlRfTkFWSUdBVElPTl9NT1VOVEVEID0gXCJuYXZpZ2F0aW9uOm1vdW50ZWRcIjtcbnZhciBFVkVOVF9BVVRPUExBWV9QTEFZID0gXCJhdXRvcGxheTpwbGF5XCI7XG52YXIgRVZFTlRfQVVUT1BMQVlfUExBWUlORyA9IFwiYXV0b3BsYXk6cGxheWluZ1wiO1xudmFyIEVWRU5UX0FVVE9QTEFZX1BBVVNFID0gXCJhdXRvcGxheTpwYXVzZVwiO1xudmFyIEVWRU5UX0xBWllMT0FEX0xPQURFRCA9IFwibGF6eWxvYWQ6bG9hZGVkXCI7XG52YXIgRVZFTlRfU0xJREVfS0VZRE9XTiA9IFwic2tcIjtcbnZhciBFVkVOVF9TSElGVEVEID0gXCJzaFwiO1xudmFyIEVWRU5UX0VORF9JTkRFWF9DSEFOR0VEID0gXCJlaVwiO1xuXG5mdW5jdGlvbiBFdmVudEludGVyZmFjZShTcGxpZGUyKSB7XG4gIHZhciBidXMgPSBTcGxpZGUyID8gU3BsaWRlMi5ldmVudC5idXMgOiBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gIHZhciBiaW5kZXIgPSBFdmVudEJpbmRlcigpO1xuXG4gIGZ1bmN0aW9uIG9uKGV2ZW50cywgY2FsbGJhY2spIHtcbiAgICBiaW5kZXIuYmluZChidXMsIHRvQXJyYXkoZXZlbnRzKS5qb2luKFwiIFwiKSwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGNhbGxiYWNrLmFwcGx5KGNhbGxiYWNrLCBpc0FycmF5KGUuZGV0YWlsKSA/IGUuZGV0YWlsIDogW10pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZW1pdChldmVudCkge1xuICAgIGJpbmRlci5kaXNwYXRjaChidXMsIGV2ZW50LCBzbGljZShhcmd1bWVudHMsIDEpKTtcbiAgfVxuXG4gIGlmIChTcGxpZGUyKSB7XG4gICAgU3BsaWRlMi5ldmVudC5vbihFVkVOVF9ERVNUUk9ZLCBiaW5kZXIuZGVzdHJveSk7XG4gIH1cblxuICByZXR1cm4gYXNzaWduKGJpbmRlciwge1xuICAgIGJ1czogYnVzLFxuICAgIG9uOiBvbixcbiAgICBvZmY6IGFwcGx5KGJpbmRlci51bmJpbmQsIGJ1cyksXG4gICAgZW1pdDogZW1pdFxuICB9KTtcbn1cblxuZnVuY3Rpb24gUmVxdWVzdEludGVydmFsKGludGVydmFsLCBvbkludGVydmFsLCBvblVwZGF0ZSwgbGltaXQpIHtcbiAgdmFyIG5vdyA9IERhdGUubm93O1xuICB2YXIgc3RhcnRUaW1lO1xuICB2YXIgcmF0ZSA9IDA7XG4gIHZhciBpZDtcbiAgdmFyIHBhdXNlZCA9IHRydWU7XG4gIHZhciBjb3VudCA9IDA7XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGlmICghcGF1c2VkKSB7XG4gICAgICByYXRlID0gaW50ZXJ2YWwgPyBtaW4oKG5vdygpIC0gc3RhcnRUaW1lKSAvIGludGVydmFsLCAxKSA6IDE7XG4gICAgICBvblVwZGF0ZSAmJiBvblVwZGF0ZShyYXRlKTtcblxuICAgICAgaWYgKHJhdGUgPj0gMSkge1xuICAgICAgICBvbkludGVydmFsKCk7XG4gICAgICAgIHN0YXJ0VGltZSA9IG5vdygpO1xuXG4gICAgICAgIGlmIChsaW1pdCAmJiArK2NvdW50ID49IGxpbWl0KSB7XG4gICAgICAgICAgcmV0dXJuIHBhdXNlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWQgPSByYWYodXBkYXRlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChyZXN1bWUpIHtcbiAgICByZXN1bWUgfHwgY2FuY2VsKCk7XG4gICAgc3RhcnRUaW1lID0gbm93KCkgLSAocmVzdW1lID8gcmF0ZSAqIGludGVydmFsIDogMCk7XG4gICAgcGF1c2VkID0gZmFsc2U7XG4gICAgaWQgPSByYWYodXBkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgIHBhdXNlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiByZXdpbmQoKSB7XG4gICAgc3RhcnRUaW1lID0gbm93KCk7XG4gICAgcmF0ZSA9IDA7XG5cbiAgICBpZiAob25VcGRhdGUpIHtcbiAgICAgIG9uVXBkYXRlKHJhdGUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZCAmJiBjYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gICAgcmF0ZSA9IDA7XG4gICAgaWQgPSAwO1xuICAgIHBhdXNlZCA9IHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBzZXQodGltZSkge1xuICAgIGludGVydmFsID0gdGltZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzUGF1c2VkKCkge1xuICAgIHJldHVybiBwYXVzZWQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHN0YXJ0OiBzdGFydCxcbiAgICByZXdpbmQ6IHJld2luZCxcbiAgICBwYXVzZTogcGF1c2UsXG4gICAgY2FuY2VsOiBjYW5jZWwsXG4gICAgc2V0OiBzZXQsXG4gICAgaXNQYXVzZWQ6IGlzUGF1c2VkXG4gIH07XG59XG5cbmZ1bmN0aW9uIFN0YXRlKGluaXRpYWxTdGF0ZSkge1xuICB2YXIgc3RhdGUgPSBpbml0aWFsU3RhdGU7XG5cbiAgZnVuY3Rpb24gc2V0KHZhbHVlKSB7XG4gICAgc3RhdGUgPSB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzKHN0YXRlcykge1xuICAgIHJldHVybiBpbmNsdWRlcyh0b0FycmF5KHN0YXRlcyksIHN0YXRlKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2V0OiBzZXQsXG4gICAgaXM6IGlzXG4gIH07XG59XG5cbmZ1bmN0aW9uIFRocm90dGxlKGZ1bmMsIGR1cmF0aW9uKSB7XG4gIHZhciBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChkdXJhdGlvbiB8fCAwLCBmdW5jLCBudWxsLCAxKTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpbnRlcnZhbC5pc1BhdXNlZCgpICYmIGludGVydmFsLnN0YXJ0KCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIE1lZGlhKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBzdGF0ZSA9IFNwbGlkZTIuc3RhdGU7XG4gIHZhciBicmVha3BvaW50cyA9IG9wdGlvbnMuYnJlYWtwb2ludHMgfHwge307XG4gIHZhciByZWR1Y2VkTW90aW9uID0gb3B0aW9ucy5yZWR1Y2VkTW90aW9uIHx8IHt9O1xuICB2YXIgYmluZGVyID0gRXZlbnRCaW5kZXIoKTtcbiAgdmFyIHF1ZXJpZXMgPSBbXTtcblxuICBmdW5jdGlvbiBzZXR1cCgpIHtcbiAgICB2YXIgaXNNaW4gPSBvcHRpb25zLm1lZGlhUXVlcnkgPT09IFwibWluXCI7XG4gICAgb3duS2V5cyhicmVha3BvaW50cykuc29ydChmdW5jdGlvbiAobiwgbSkge1xuICAgICAgcmV0dXJuIGlzTWluID8gK24gLSArbSA6ICttIC0gK247XG4gICAgfSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICByZWdpc3RlcihicmVha3BvaW50c1trZXldLCBcIihcIiArIChpc01pbiA/IFwibWluXCIgOiBcIm1heFwiKSArIFwiLXdpZHRoOlwiICsga2V5ICsgXCJweClcIik7XG4gICAgfSk7XG4gICAgcmVnaXN0ZXIocmVkdWNlZE1vdGlvbiwgTUVESUFfUFJFRkVSU19SRURVQ0VEX01PVElPTik7XG4gICAgdXBkYXRlKCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KGNvbXBsZXRlbHkpIHtcbiAgICBpZiAoY29tcGxldGVseSkge1xuICAgICAgYmluZGVyLmRlc3Ryb3koKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcihvcHRpb25zMiwgcXVlcnkpIHtcbiAgICB2YXIgcXVlcnlMaXN0ID0gbWF0Y2hNZWRpYShxdWVyeSk7XG4gICAgYmluZGVyLmJpbmQocXVlcnlMaXN0LCBcImNoYW5nZVwiLCB1cGRhdGUpO1xuICAgIHF1ZXJpZXMucHVzaChbb3B0aW9uczIsIHF1ZXJ5TGlzdF0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHZhciBkZXN0cm95ZWQgPSBzdGF0ZS5pcyhERVNUUk9ZRUQpO1xuICAgIHZhciBkaXJlY3Rpb24gPSBvcHRpb25zLmRpcmVjdGlvbjtcbiAgICB2YXIgbWVyZ2VkID0gcXVlcmllcy5yZWR1Y2UoZnVuY3Rpb24gKG1lcmdlZDIsIGVudHJ5KSB7XG4gICAgICByZXR1cm4gbWVyZ2UobWVyZ2VkMiwgZW50cnlbMV0ubWF0Y2hlcyA/IGVudHJ5WzBdIDoge30pO1xuICAgIH0sIHt9KTtcbiAgICBvbWl0KG9wdGlvbnMpO1xuICAgIHNldChtZXJnZWQpO1xuXG4gICAgaWYgKG9wdGlvbnMuZGVzdHJveSkge1xuICAgICAgU3BsaWRlMi5kZXN0cm95KG9wdGlvbnMuZGVzdHJveSA9PT0gXCJjb21wbGV0ZWx5XCIpO1xuICAgIH0gZWxzZSBpZiAoZGVzdHJveWVkKSB7XG4gICAgICBkZXN0cm95KHRydWUpO1xuICAgICAgU3BsaWRlMi5tb3VudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkaXJlY3Rpb24gIT09IG9wdGlvbnMuZGlyZWN0aW9uICYmIFNwbGlkZTIucmVmcmVzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZHVjZShlbmFibGUpIHtcbiAgICBpZiAobWF0Y2hNZWRpYShNRURJQV9QUkVGRVJTX1JFRFVDRURfTU9USU9OKS5tYXRjaGVzKSB7XG4gICAgICBlbmFibGUgPyBtZXJnZShvcHRpb25zLCByZWR1Y2VkTW90aW9uKSA6IG9taXQob3B0aW9ucywgb3duS2V5cyhyZWR1Y2VkTW90aW9uKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0KG9wdHMsIGJhc2UsIG5vdGlmeSkge1xuICAgIG1lcmdlKG9wdGlvbnMsIG9wdHMpO1xuICAgIGJhc2UgJiYgbWVyZ2UoT2JqZWN0LmdldFByb3RvdHlwZU9mKG9wdGlvbnMpLCBvcHRzKTtcblxuICAgIGlmIChub3RpZnkgfHwgIXN0YXRlLmlzKENSRUFURUQpKSB7XG4gICAgICBTcGxpZGUyLmVtaXQoRVZFTlRfVVBEQVRFRCwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXR1cDogc2V0dXAsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICByZWR1Y2U6IHJlZHVjZSxcbiAgICBzZXQ6IHNldFxuICB9O1xufVxuXG52YXIgQVJST1cgPSBcIkFycm93XCI7XG52YXIgQVJST1dfTEVGVCA9IEFSUk9XICsgXCJMZWZ0XCI7XG52YXIgQVJST1dfUklHSFQgPSBBUlJPVyArIFwiUmlnaHRcIjtcbnZhciBBUlJPV19VUCA9IEFSUk9XICsgXCJVcFwiO1xudmFyIEFSUk9XX0RPV04gPSBBUlJPVyArIFwiRG93blwiO1xudmFyIExUUiA9IFwibHRyXCI7XG52YXIgUlRMID0gXCJydGxcIjtcbnZhciBUVEIgPSBcInR0YlwiO1xudmFyIE9SSUVOVEFUSU9OX01BUCA9IHtcbiAgd2lkdGg6IFtcImhlaWdodFwiXSxcbiAgbGVmdDogW1widG9wXCIsIFwicmlnaHRcIl0sXG4gIHJpZ2h0OiBbXCJib3R0b21cIiwgXCJsZWZ0XCJdLFxuICB4OiBbXCJ5XCJdLFxuICBYOiBbXCJZXCJdLFxuICBZOiBbXCJYXCJdLFxuICBBcnJvd0xlZnQ6IFtBUlJPV19VUCwgQVJST1dfUklHSFRdLFxuICBBcnJvd1JpZ2h0OiBbQVJST1dfRE9XTiwgQVJST1dfTEVGVF1cbn07XG5cbmZ1bmN0aW9uIERpcmVjdGlvbihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICBmdW5jdGlvbiByZXNvbHZlKHByb3AsIGF4aXNPbmx5LCBkaXJlY3Rpb24pIHtcbiAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gfHwgb3B0aW9ucy5kaXJlY3Rpb247XG4gICAgdmFyIGluZGV4ID0gZGlyZWN0aW9uID09PSBSVEwgJiYgIWF4aXNPbmx5ID8gMSA6IGRpcmVjdGlvbiA9PT0gVFRCID8gMCA6IC0xO1xuICAgIHJldHVybiBPUklFTlRBVElPTl9NQVBbcHJvcF0gJiYgT1JJRU5UQVRJT05fTUFQW3Byb3BdW2luZGV4XSB8fCBwcm9wLnJlcGxhY2UoL3dpZHRofGxlZnR8cmlnaHQvaSwgZnVuY3Rpb24gKG1hdGNoLCBvZmZzZXQpIHtcbiAgICAgIHZhciByZXBsYWNlbWVudCA9IE9SSUVOVEFUSU9OX01BUFttYXRjaC50b0xvd2VyQ2FzZSgpXVtpbmRleF0gfHwgbWF0Y2g7XG4gICAgICByZXR1cm4gb2Zmc2V0ID4gMCA/IHJlcGxhY2VtZW50LmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVwbGFjZW1lbnQuc2xpY2UoMSkgOiByZXBsYWNlbWVudDtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9yaWVudCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAqIChvcHRpb25zLmRpcmVjdGlvbiA9PT0gUlRMID8gMSA6IC0xKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmVzb2x2ZTogcmVzb2x2ZSxcbiAgICBvcmllbnQ6IG9yaWVudFxuICB9O1xufVxuXG52YXIgUk9MRSA9IFwicm9sZVwiO1xudmFyIFRBQl9JTkRFWCA9IFwidGFiaW5kZXhcIjtcbnZhciBESVNBQkxFRCA9IFwiZGlzYWJsZWRcIjtcbnZhciBBUklBX1BSRUZJWCA9IFwiYXJpYS1cIjtcbnZhciBBUklBX0NPTlRST0xTID0gQVJJQV9QUkVGSVggKyBcImNvbnRyb2xzXCI7XG52YXIgQVJJQV9DVVJSRU5UID0gQVJJQV9QUkVGSVggKyBcImN1cnJlbnRcIjtcbnZhciBBUklBX1NFTEVDVEVEID0gQVJJQV9QUkVGSVggKyBcInNlbGVjdGVkXCI7XG52YXIgQVJJQV9MQUJFTCA9IEFSSUFfUFJFRklYICsgXCJsYWJlbFwiO1xudmFyIEFSSUFfTEFCRUxMRURCWSA9IEFSSUFfUFJFRklYICsgXCJsYWJlbGxlZGJ5XCI7XG52YXIgQVJJQV9ISURERU4gPSBBUklBX1BSRUZJWCArIFwiaGlkZGVuXCI7XG52YXIgQVJJQV9PUklFTlRBVElPTiA9IEFSSUFfUFJFRklYICsgXCJvcmllbnRhdGlvblwiO1xudmFyIEFSSUFfUk9MRURFU0NSSVBUSU9OID0gQVJJQV9QUkVGSVggKyBcInJvbGVkZXNjcmlwdGlvblwiO1xudmFyIEFSSUFfTElWRSA9IEFSSUFfUFJFRklYICsgXCJsaXZlXCI7XG52YXIgQVJJQV9CVVNZID0gQVJJQV9QUkVGSVggKyBcImJ1c3lcIjtcbnZhciBBUklBX0FUT01JQyA9IEFSSUFfUFJFRklYICsgXCJhdG9taWNcIjtcbnZhciBBTExfQVRUUklCVVRFUyA9IFtST0xFLCBUQUJfSU5ERVgsIERJU0FCTEVELCBBUklBX0NPTlRST0xTLCBBUklBX0NVUlJFTlQsIEFSSUFfTEFCRUwsIEFSSUFfTEFCRUxMRURCWSwgQVJJQV9ISURERU4sIEFSSUFfT1JJRU5UQVRJT04sIEFSSUFfUk9MRURFU0NSSVBUSU9OXTtcbnZhciBDTEFTU19QUkVGSVggPSBQUk9KRUNUX0NPREUgKyBcIl9fXCI7XG52YXIgU1RBVFVTX0NMQVNTX1BSRUZJWCA9IFwiaXMtXCI7XG52YXIgQ0xBU1NfUk9PVCA9IFBST0pFQ1RfQ09ERTtcbnZhciBDTEFTU19UUkFDSyA9IENMQVNTX1BSRUZJWCArIFwidHJhY2tcIjtcbnZhciBDTEFTU19MSVNUID0gQ0xBU1NfUFJFRklYICsgXCJsaXN0XCI7XG52YXIgQ0xBU1NfU0xJREUgPSBDTEFTU19QUkVGSVggKyBcInNsaWRlXCI7XG52YXIgQ0xBU1NfQ0xPTkUgPSBDTEFTU19TTElERSArIFwiLS1jbG9uZVwiO1xudmFyIENMQVNTX0NPTlRBSU5FUiA9IENMQVNTX1NMSURFICsgXCJfX2NvbnRhaW5lclwiO1xudmFyIENMQVNTX0FSUk9XUyA9IENMQVNTX1BSRUZJWCArIFwiYXJyb3dzXCI7XG52YXIgQ0xBU1NfQVJST1cgPSBDTEFTU19QUkVGSVggKyBcImFycm93XCI7XG52YXIgQ0xBU1NfQVJST1dfUFJFViA9IENMQVNTX0FSUk9XICsgXCItLXByZXZcIjtcbnZhciBDTEFTU19BUlJPV19ORVhUID0gQ0xBU1NfQVJST1cgKyBcIi0tbmV4dFwiO1xudmFyIENMQVNTX1BBR0lOQVRJT04gPSBDTEFTU19QUkVGSVggKyBcInBhZ2luYXRpb25cIjtcbnZhciBDTEFTU19QQUdJTkFUSU9OX1BBR0UgPSBDTEFTU19QQUdJTkFUSU9OICsgXCJfX3BhZ2VcIjtcbnZhciBDTEFTU19QUk9HUkVTUyA9IENMQVNTX1BSRUZJWCArIFwicHJvZ3Jlc3NcIjtcbnZhciBDTEFTU19QUk9HUkVTU19CQVIgPSBDTEFTU19QUk9HUkVTUyArIFwiX19iYXJcIjtcbnZhciBDTEFTU19UT0dHTEUgPSBDTEFTU19QUkVGSVggKyBcInRvZ2dsZVwiO1xudmFyIENMQVNTX1RPR0dMRV9QTEFZID0gQ0xBU1NfVE9HR0xFICsgXCJfX3BsYXlcIjtcbnZhciBDTEFTU19UT0dHTEVfUEFVU0UgPSBDTEFTU19UT0dHTEUgKyBcIl9fcGF1c2VcIjtcbnZhciBDTEFTU19TUElOTkVSID0gQ0xBU1NfUFJFRklYICsgXCJzcGlubmVyXCI7XG52YXIgQ0xBU1NfU1IgPSBDTEFTU19QUkVGSVggKyBcInNyXCI7XG52YXIgQ0xBU1NfSU5JVElBTElaRUQgPSBTVEFUVVNfQ0xBU1NfUFJFRklYICsgXCJpbml0aWFsaXplZFwiO1xudmFyIENMQVNTX0FDVElWRSA9IFNUQVRVU19DTEFTU19QUkVGSVggKyBcImFjdGl2ZVwiO1xudmFyIENMQVNTX1BSRVYgPSBTVEFUVVNfQ0xBU1NfUFJFRklYICsgXCJwcmV2XCI7XG52YXIgQ0xBU1NfTkVYVCA9IFNUQVRVU19DTEFTU19QUkVGSVggKyBcIm5leHRcIjtcbnZhciBDTEFTU19WSVNJQkxFID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwidmlzaWJsZVwiO1xudmFyIENMQVNTX0xPQURJTkcgPSBTVEFUVVNfQ0xBU1NfUFJFRklYICsgXCJsb2FkaW5nXCI7XG52YXIgQ0xBU1NfRk9DVVNfSU4gPSBTVEFUVVNfQ0xBU1NfUFJFRklYICsgXCJmb2N1cy1pblwiO1xudmFyIENMQVNTX09WRVJGTE9XID0gU1RBVFVTX0NMQVNTX1BSRUZJWCArIFwib3ZlcmZsb3dcIjtcbnZhciBTVEFUVVNfQ0xBU1NFUyA9IFtDTEFTU19BQ1RJVkUsIENMQVNTX1ZJU0lCTEUsIENMQVNTX1BSRVYsIENMQVNTX05FWFQsIENMQVNTX0xPQURJTkcsIENMQVNTX0ZPQ1VTX0lOLCBDTEFTU19PVkVSRkxPV107XG52YXIgQ0xBU1NFUyA9IHtcbiAgc2xpZGU6IENMQVNTX1NMSURFLFxuICBjbG9uZTogQ0xBU1NfQ0xPTkUsXG4gIGFycm93czogQ0xBU1NfQVJST1dTLFxuICBhcnJvdzogQ0xBU1NfQVJST1csXG4gIHByZXY6IENMQVNTX0FSUk9XX1BSRVYsXG4gIG5leHQ6IENMQVNTX0FSUk9XX05FWFQsXG4gIHBhZ2luYXRpb246IENMQVNTX1BBR0lOQVRJT04sXG4gIHBhZ2U6IENMQVNTX1BBR0lOQVRJT05fUEFHRSxcbiAgc3Bpbm5lcjogQ0xBU1NfU1BJTk5FUlxufTtcblxuZnVuY3Rpb24gY2xvc2VzdChmcm9tLCBzZWxlY3Rvcikge1xuICBpZiAoaXNGdW5jdGlvbihmcm9tLmNsb3Nlc3QpKSB7XG4gICAgcmV0dXJuIGZyb20uY2xvc2VzdChzZWxlY3Rvcik7XG4gIH1cblxuICB2YXIgZWxtID0gZnJvbTtcblxuICB3aGlsZSAoZWxtICYmIGVsbS5ub2RlVHlwZSA9PT0gMSkge1xuICAgIGlmIChtYXRjaGVzKGVsbSwgc2VsZWN0b3IpKSB7XG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICBlbG0gPSBlbG0ucGFyZW50RWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiBlbG07XG59XG5cbnZhciBGUklDVElPTiA9IDU7XG52YXIgTE9HX0lOVEVSVkFMID0gMjAwO1xudmFyIFBPSU5URVJfRE9XTl9FVkVOVFMgPSBcInRvdWNoc3RhcnQgbW91c2Vkb3duXCI7XG52YXIgUE9JTlRFUl9NT1ZFX0VWRU5UUyA9IFwidG91Y2htb3ZlIG1vdXNlbW92ZVwiO1xudmFyIFBPSU5URVJfVVBfRVZFTlRTID0gXCJ0b3VjaGVuZCB0b3VjaGNhbmNlbCBtb3VzZXVwIGNsaWNrXCI7XG5cbmZ1bmN0aW9uIEVsZW1lbnRzKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlLm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZS5iaW5kO1xuXG4gIHZhciByb290ID0gU3BsaWRlMi5yb290O1xuICB2YXIgaTE4biA9IG9wdGlvbnMuaTE4bjtcbiAgdmFyIGVsZW1lbnRzID0ge307XG4gIHZhciBzbGlkZXMgPSBbXTtcbiAgdmFyIHJvb3RDbGFzc2VzID0gW107XG4gIHZhciB0cmFja0NsYXNzZXMgPSBbXTtcbiAgdmFyIHRyYWNrO1xuICB2YXIgbGlzdDtcbiAgdmFyIGlzVXNpbmdLZXk7XG5cbiAgZnVuY3Rpb24gc2V0dXAoKSB7XG4gICAgY29sbGVjdCgpO1xuICAgIGluaXQoKTtcbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIGRlc3Ryb3kpO1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIHNldHVwKTtcbiAgICBvbihFVkVOVF9VUERBVEVELCB1cGRhdGUpO1xuICAgIGJpbmQoZG9jdW1lbnQsIFBPSU5URVJfRE9XTl9FVkVOVFMgKyBcIiBrZXlkb3duXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICBpc1VzaW5nS2V5ID0gZS50eXBlID09PSBcImtleWRvd25cIjtcbiAgICB9LCB7XG4gICAgICBjYXB0dXJlOiB0cnVlXG4gICAgfSk7XG4gICAgYmluZChyb290LCBcImZvY3VzaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgdG9nZ2xlQ2xhc3Mocm9vdCwgQ0xBU1NfRk9DVVNfSU4sICEhaXNVc2luZ0tleSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KGNvbXBsZXRlbHkpIHtcbiAgICB2YXIgYXR0cnMgPSBBTExfQVRUUklCVVRFUy5jb25jYXQoXCJzdHlsZVwiKTtcbiAgICBlbXB0eShzbGlkZXMpO1xuICAgIHJlbW92ZUNsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICByZW1vdmVDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICByZW1vdmVBdHRyaWJ1dGUoW3RyYWNrLCBsaXN0XSwgYXR0cnMpO1xuICAgIHJlbW92ZUF0dHJpYnV0ZShyb290LCBjb21wbGV0ZWx5ID8gYXR0cnMgOiBbXCJzdHlsZVwiLCBBUklBX1JPTEVERVNDUklQVElPTl0pO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHJlbW92ZUNsYXNzKHJvb3QsIHJvb3RDbGFzc2VzKTtcbiAgICByZW1vdmVDbGFzcyh0cmFjaywgdHJhY2tDbGFzc2VzKTtcbiAgICByb290Q2xhc3NlcyA9IGdldENsYXNzZXMoQ0xBU1NfUk9PVCk7XG4gICAgdHJhY2tDbGFzc2VzID0gZ2V0Q2xhc3NlcyhDTEFTU19UUkFDSyk7XG4gICAgYWRkQ2xhc3Mocm9vdCwgcm9vdENsYXNzZXMpO1xuICAgIGFkZENsYXNzKHRyYWNrLCB0cmFja0NsYXNzZXMpO1xuICAgIHNldEF0dHJpYnV0ZShyb290LCBBUklBX0xBQkVMLCBvcHRpb25zLmxhYmVsKTtcbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTExFREJZLCBvcHRpb25zLmxhYmVsbGVkYnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29sbGVjdCgpIHtcbiAgICB0cmFjayA9IGZpbmQoXCIuXCIgKyBDTEFTU19UUkFDSyk7XG4gICAgbGlzdCA9IGNoaWxkKHRyYWNrLCBcIi5cIiArIENMQVNTX0xJU1QpO1xuICAgIGFzc2VydCh0cmFjayAmJiBsaXN0LCBcIkEgdHJhY2svbGlzdCBlbGVtZW50IGlzIG1pc3NpbmcuXCIpO1xuICAgIHB1c2goc2xpZGVzLCBjaGlsZHJlbihsaXN0LCBcIi5cIiArIENMQVNTX1NMSURFICsgXCI6bm90KC5cIiArIENMQVNTX0NMT05FICsgXCIpXCIpKTtcbiAgICBmb3JPd24oe1xuICAgICAgYXJyb3dzOiBDTEFTU19BUlJPV1MsXG4gICAgICBwYWdpbmF0aW9uOiBDTEFTU19QQUdJTkFUSU9OLFxuICAgICAgcHJldjogQ0xBU1NfQVJST1dfUFJFVixcbiAgICAgIG5leHQ6IENMQVNTX0FSUk9XX05FWFQsXG4gICAgICBiYXI6IENMQVNTX1BST0dSRVNTX0JBUixcbiAgICAgIHRvZ2dsZTogQ0xBU1NfVE9HR0xFXG4gICAgfSwgZnVuY3Rpb24gKGNsYXNzTmFtZSwga2V5KSB7XG4gICAgICBlbGVtZW50c1trZXldID0gZmluZChcIi5cIiArIGNsYXNzTmFtZSk7XG4gICAgfSk7XG4gICAgYXNzaWduKGVsZW1lbnRzLCB7XG4gICAgICByb290OiByb290LFxuICAgICAgdHJhY2s6IHRyYWNrLFxuICAgICAgbGlzdDogbGlzdCxcbiAgICAgIHNsaWRlczogc2xpZGVzXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBpZCA9IHJvb3QuaWQgfHwgdW5pcXVlSWQoUFJPSkVDVF9DT0RFKTtcbiAgICB2YXIgcm9sZSA9IG9wdGlvbnMucm9sZTtcbiAgICByb290LmlkID0gaWQ7XG4gICAgdHJhY2suaWQgPSB0cmFjay5pZCB8fCBpZCArIFwiLXRyYWNrXCI7XG4gICAgbGlzdC5pZCA9IGxpc3QuaWQgfHwgaWQgKyBcIi1saXN0XCI7XG5cbiAgICBpZiAoIWdldEF0dHJpYnV0ZShyb290LCBST0xFKSAmJiByb290LnRhZ05hbWUgIT09IFwiU0VDVElPTlwiICYmIHJvbGUpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShyb290LCBST0xFLCByb2xlKTtcbiAgICB9XG5cbiAgICBzZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9ST0xFREVTQ1JJUFRJT04sIGkxOG4uY2Fyb3VzZWwpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBST0xFLCBcInByZXNlbnRhdGlvblwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZpbmQoc2VsZWN0b3IpIHtcbiAgICB2YXIgZWxtID0gcXVlcnkocm9vdCwgc2VsZWN0b3IpO1xuICAgIHJldHVybiBlbG0gJiYgY2xvc2VzdChlbG0sIFwiLlwiICsgQ0xBU1NfUk9PVCkgPT09IHJvb3QgPyBlbG0gOiB2b2lkIDA7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDbGFzc2VzKGJhc2UpIHtcbiAgICByZXR1cm4gW2Jhc2UgKyBcIi0tXCIgKyBvcHRpb25zLnR5cGUsIGJhc2UgKyBcIi0tXCIgKyBvcHRpb25zLmRpcmVjdGlvbiwgb3B0aW9ucy5kcmFnICYmIGJhc2UgKyBcIi0tZHJhZ2dhYmxlXCIsIG9wdGlvbnMuaXNOYXZpZ2F0aW9uICYmIGJhc2UgKyBcIi0tbmF2XCIsIGJhc2UgPT09IENMQVNTX1JPT1QgJiYgQ0xBU1NfQUNUSVZFXTtcbiAgfVxuXG4gIHJldHVybiBhc3NpZ24oZWxlbWVudHMsIHtcbiAgICBzZXR1cDogc2V0dXAsXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3lcbiAgfSk7XG59XG5cbnZhciBTTElERSA9IFwic2xpZGVcIjtcbnZhciBMT09QID0gXCJsb29wXCI7XG52YXIgRkFERSA9IFwiZmFkZVwiO1xuXG5mdW5jdGlvbiBTbGlkZSQxKFNwbGlkZTIsIGluZGV4LCBzbGlkZUluZGV4LCBzbGlkZSkge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub24sXG4gICAgICBlbWl0ID0gZXZlbnQuZW1pdCxcbiAgICAgIGJpbmQgPSBldmVudC5iaW5kO1xuICB2YXIgQ29tcG9uZW50cyA9IFNwbGlkZTIuQ29tcG9uZW50cyxcbiAgICAgIHJvb3QgPSBTcGxpZGUyLnJvb3QsXG4gICAgICBvcHRpb25zID0gU3BsaWRlMi5vcHRpb25zO1xuICB2YXIgaXNOYXZpZ2F0aW9uID0gb3B0aW9ucy5pc05hdmlnYXRpb24sXG4gICAgICB1cGRhdGVPbk1vdmUgPSBvcHRpb25zLnVwZGF0ZU9uTW92ZSxcbiAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG4sXG4gICAgICBwYWdpbmF0aW9uID0gb3B0aW9ucy5wYWdpbmF0aW9uLFxuICAgICAgc2xpZGVGb2N1cyA9IG9wdGlvbnMuc2xpZGVGb2N1cztcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgc3R5bGVzID0gZ2V0QXR0cmlidXRlKHNsaWRlLCBcInN0eWxlXCIpO1xuICB2YXIgbGFiZWwgPSBnZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfTEFCRUwpO1xuICB2YXIgaXNDbG9uZSA9IHNsaWRlSW5kZXggPiAtMTtcbiAgdmFyIGNvbnRhaW5lciA9IGNoaWxkKHNsaWRlLCBcIi5cIiArIENMQVNTX0NPTlRBSU5FUik7XG4gIHZhciBkZXN0cm95ZWQ7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKCFpc0Nsb25lKSB7XG4gICAgICBzbGlkZS5pZCA9IHJvb3QuaWQgKyBcIi1zbGlkZVwiICsgcGFkKGluZGV4ICsgMSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFJPTEUsIHBhZ2luYXRpb24gPyBcInRhYnBhbmVsXCIgOiBcImdyb3VwXCIpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX1JPTEVERVNDUklQVElPTiwgaTE4bi5zbGlkZSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfTEFCRUwsIGxhYmVsIHx8IGZvcm1hdChpMThuLnNsaWRlTGFiZWwsIFtpbmRleCArIDEsIFNwbGlkZTIubGVuZ3RoXSkpO1xuICAgIH1cblxuICAgIGxpc3RlbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKCkge1xuICAgIGJpbmQoc2xpZGUsIFwiY2xpY2tcIiwgYXBwbHkoZW1pdCwgRVZFTlRfQ0xJQ0ssIHNlbGYpKTtcbiAgICBiaW5kKHNsaWRlLCBcImtleWRvd25cIiwgYXBwbHkoZW1pdCwgRVZFTlRfU0xJREVfS0VZRE9XTiwgc2VsZikpO1xuICAgIG9uKFtFVkVOVF9NT1ZFRCwgRVZFTlRfU0hJRlRFRCwgRVZFTlRfU0NST0xMRURdLCB1cGRhdGUpO1xuICAgIG9uKEVWRU5UX05BVklHQVRJT05fTU9VTlRFRCwgaW5pdE5hdmlnYXRpb24pO1xuXG4gICAgaWYgKHVwZGF0ZU9uTW92ZSkge1xuICAgICAgb24oRVZFTlRfTU9WRSwgb25Nb3ZlKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGRlc3Ryb3llZCA9IHRydWU7XG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIHJlbW92ZUNsYXNzKHNsaWRlLCBTVEFUVVNfQ0xBU1NFUyk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKHNsaWRlLCBBTExfQVRUUklCVVRFUyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBcInN0eWxlXCIsIHN0eWxlcyk7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBsYWJlbCB8fCBcIlwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXROYXZpZ2F0aW9uKCkge1xuICAgIHZhciBjb250cm9scyA9IFNwbGlkZTIuc3BsaWRlcy5tYXAoZnVuY3Rpb24gKHRhcmdldCkge1xuICAgICAgdmFyIFNsaWRlMiA9IHRhcmdldC5zcGxpZGUuQ29tcG9uZW50cy5TbGlkZXMuZ2V0QXQoaW5kZXgpO1xuICAgICAgcmV0dXJuIFNsaWRlMiA/IFNsaWRlMi5zbGlkZS5pZCA6IFwiXCI7XG4gICAgfSkuam9pbihcIiBcIik7XG4gICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0xBQkVMLCBmb3JtYXQoaTE4bi5zbGlkZVgsIChpc0Nsb25lID8gc2xpZGVJbmRleCA6IGluZGV4KSArIDEpKTtcbiAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfQ09OVFJPTFMsIGNvbnRyb2xzKTtcbiAgICBzZXRBdHRyaWJ1dGUoc2xpZGUsIFJPTEUsIHNsaWRlRm9jdXMgPyBcImJ1dHRvblwiIDogXCJcIik7XG4gICAgc2xpZGVGb2N1cyAmJiByZW1vdmVBdHRyaWJ1dGUoc2xpZGUsIEFSSUFfUk9MRURFU0NSSVBUSU9OKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW92ZSgpIHtcbiAgICBpZiAoIWRlc3Ryb3llZCkge1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGlmICghZGVzdHJveWVkKSB7XG4gICAgICB2YXIgY3VyciA9IFNwbGlkZTIuaW5kZXg7XG4gICAgICB1cGRhdGVBY3Rpdml0eSgpO1xuICAgICAgdXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgdG9nZ2xlQ2xhc3Moc2xpZGUsIENMQVNTX1BSRVYsIGluZGV4ID09PSBjdXJyIC0gMSk7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfTkVYVCwgaW5kZXggPT09IGN1cnIgKyAxKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVBY3Rpdml0eSgpIHtcbiAgICB2YXIgYWN0aXZlID0gaXNBY3RpdmUoKTtcblxuICAgIGlmIChhY3RpdmUgIT09IGhhc0NsYXNzKHNsaWRlLCBDTEFTU19BQ1RJVkUpKSB7XG4gICAgICB0b2dnbGVDbGFzcyhzbGlkZSwgQ0xBU1NfQUNUSVZFLCBhY3RpdmUpO1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0NVUlJFTlQsIGlzTmF2aWdhdGlvbiAmJiBhY3RpdmUgfHwgXCJcIik7XG4gICAgICBlbWl0KGFjdGl2ZSA/IEVWRU5UX0FDVElWRSA6IEVWRU5UX0lOQUNUSVZFLCBzZWxmKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVWaXNpYmlsaXR5KCkge1xuICAgIHZhciB2aXNpYmxlID0gaXNWaXNpYmxlKCk7XG4gICAgdmFyIGhpZGRlbiA9ICF2aXNpYmxlICYmICghaXNBY3RpdmUoKSB8fCBpc0Nsb25lKTtcblxuICAgIGlmICghU3BsaWRlMi5zdGF0ZS5pcyhbTU9WSU5HLCBTQ1JPTExJTkddKSkge1xuICAgICAgc2V0QXR0cmlidXRlKHNsaWRlLCBBUklBX0hJRERFTiwgaGlkZGVuIHx8IFwiXCIpO1xuICAgIH1cblxuICAgIHNldEF0dHJpYnV0ZShxdWVyeUFsbChzbGlkZSwgb3B0aW9ucy5mb2N1c2FibGVOb2RlcyB8fCBcIlwiKSwgVEFCX0lOREVYLCBoaWRkZW4gPyAtMSA6IFwiXCIpO1xuXG4gICAgaWYgKHNsaWRlRm9jdXMpIHtcbiAgICAgIHNldEF0dHJpYnV0ZShzbGlkZSwgVEFCX0lOREVYLCBoaWRkZW4gPyAtMSA6IDApO1xuICAgIH1cblxuICAgIGlmICh2aXNpYmxlICE9PSBoYXNDbGFzcyhzbGlkZSwgQ0xBU1NfVklTSUJMRSkpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHNsaWRlLCBDTEFTU19WSVNJQkxFLCB2aXNpYmxlKTtcbiAgICAgIGVtaXQodmlzaWJsZSA/IEVWRU5UX1ZJU0lCTEUgOiBFVkVOVF9ISURERU4sIHNlbGYpO1xuICAgIH1cblxuICAgIGlmICghdmlzaWJsZSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBzbGlkZSkge1xuICAgICAgdmFyIFNsaWRlMiA9IENvbXBvbmVudHMuU2xpZGVzLmdldEF0KFNwbGlkZTIuaW5kZXgpO1xuICAgICAgU2xpZGUyICYmIGZvY3VzKFNsaWRlMi5zbGlkZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3R5bGUkMShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKSB7XG4gICAgc3R5bGUodXNlQ29udGFpbmVyICYmIGNvbnRhaW5lciB8fCBzbGlkZSwgcHJvcCwgdmFsdWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNBY3RpdmUoKSB7XG4gICAgdmFyIGN1cnIgPSBTcGxpZGUyLmluZGV4O1xuICAgIHJldHVybiBjdXJyID09PSBpbmRleCB8fCBvcHRpb25zLmNsb25lU3RhdHVzICYmIGN1cnIgPT09IHNsaWRlSW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiBpc1Zpc2libGUoKSB7XG4gICAgaWYgKFNwbGlkZTIuaXMoRkFERSkpIHtcbiAgICAgIHJldHVybiBpc0FjdGl2ZSgpO1xuICAgIH1cblxuICAgIHZhciB0cmFja1JlY3QgPSByZWN0KENvbXBvbmVudHMuRWxlbWVudHMudHJhY2spO1xuICAgIHZhciBzbGlkZVJlY3QgPSByZWN0KHNsaWRlKTtcbiAgICB2YXIgbGVmdCA9IHJlc29sdmUoXCJsZWZ0XCIsIHRydWUpO1xuICAgIHZhciByaWdodCA9IHJlc29sdmUoXCJyaWdodFwiLCB0cnVlKTtcbiAgICByZXR1cm4gZmxvb3IodHJhY2tSZWN0W2xlZnRdKSA8PSBjZWlsKHNsaWRlUmVjdFtsZWZ0XSkgJiYgZmxvb3Ioc2xpZGVSZWN0W3JpZ2h0XSkgPD0gY2VpbCh0cmFja1JlY3RbcmlnaHRdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzV2l0aGluKGZyb20sIGRpc3RhbmNlKSB7XG4gICAgdmFyIGRpZmYgPSBhYnMoZnJvbSAtIGluZGV4KTtcblxuICAgIGlmICghaXNDbG9uZSAmJiAob3B0aW9ucy5yZXdpbmQgfHwgU3BsaWRlMi5pcyhMT09QKSkpIHtcbiAgICAgIGRpZmYgPSBtaW4oZGlmZiwgU3BsaWRlMi5sZW5ndGggLSBkaWZmKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGlmZiA8PSBkaXN0YW5jZTtcbiAgfVxuXG4gIHZhciBzZWxmID0ge1xuICAgIGluZGV4OiBpbmRleCxcbiAgICBzbGlkZUluZGV4OiBzbGlkZUluZGV4LFxuICAgIHNsaWRlOiBzbGlkZSxcbiAgICBjb250YWluZXI6IGNvbnRhaW5lcixcbiAgICBpc0Nsb25lOiBpc0Nsb25lLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIHVwZGF0ZTogdXBkYXRlLFxuICAgIHN0eWxlOiBzdHlsZSQxLFxuICAgIGlzV2l0aGluOiBpc1dpdGhpblxuICB9O1xuICByZXR1cm4gc2VsZjtcbn1cblxuZnVuY3Rpb24gU2xpZGVzKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UyID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTIub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlMi5lbWl0LFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTIuYmluZDtcblxuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICBzbGlkZXMgPSBfQ29tcG9uZW50czIkRWxlbWVudHMuc2xpZGVzLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50cy5saXN0O1xuICB2YXIgU2xpZGVzMiA9IFtdO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBkZXN0cm95KTtcbiAgICBvbihFVkVOVF9SRUZSRVNILCBpbml0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2xpZGVzLmZvckVhY2goZnVuY3Rpb24gKHNsaWRlLCBpbmRleCkge1xuICAgICAgcmVnaXN0ZXIoc2xpZGUsIGluZGV4LCAtMSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGVtcHR5KFNsaWRlczIpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIGZvckVhY2gkMShmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICBTbGlkZTIudXBkYXRlKCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiByZWdpc3RlcihzbGlkZSwgaW5kZXgsIHNsaWRlSW5kZXgpIHtcbiAgICB2YXIgb2JqZWN0ID0gU2xpZGUkMShTcGxpZGUyLCBpbmRleCwgc2xpZGVJbmRleCwgc2xpZGUpO1xuICAgIG9iamVjdC5tb3VudCgpO1xuICAgIFNsaWRlczIucHVzaChvYmplY3QpO1xuICAgIFNsaWRlczIuc29ydChmdW5jdGlvbiAoU2xpZGUxLCBTbGlkZTIpIHtcbiAgICAgIHJldHVybiBTbGlkZTEuaW5kZXggLSBTbGlkZTIuaW5kZXg7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXQoZXhjbHVkZUNsb25lcykge1xuICAgIHJldHVybiBleGNsdWRlQ2xvbmVzID8gZmlsdGVyKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiAhU2xpZGUyLmlzQ2xvbmU7XG4gICAgfSkgOiBTbGlkZXMyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW4ocGFnZSkge1xuICAgIHZhciBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcjtcbiAgICB2YXIgaW5kZXggPSBDb250cm9sbGVyLnRvSW5kZXgocGFnZSk7XG4gICAgdmFyIG1heCA9IENvbnRyb2xsZXIuaGFzRm9jdXMoKSA/IDEgOiBvcHRpb25zLnBlclBhZ2U7XG4gICAgcmV0dXJuIGZpbHRlcihmdW5jdGlvbiAoU2xpZGUyKSB7XG4gICAgICByZXR1cm4gYmV0d2VlbihTbGlkZTIuaW5kZXgsIGluZGV4LCBpbmRleCArIG1heCAtIDEpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXQoaW5kZXgpIHtcbiAgICByZXR1cm4gZmlsdGVyKGluZGV4KVswXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZChpdGVtcywgaW5kZXgpIHtcbiAgICBmb3JFYWNoKGl0ZW1zLCBmdW5jdGlvbiAoc2xpZGUpIHtcbiAgICAgIGlmIChpc1N0cmluZyhzbGlkZSkpIHtcbiAgICAgICAgc2xpZGUgPSBwYXJzZUh0bWwoc2xpZGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNIVE1MRWxlbWVudChzbGlkZSkpIHtcbiAgICAgICAgdmFyIHJlZiA9IHNsaWRlc1tpbmRleF07XG4gICAgICAgIHJlZiA/IGJlZm9yZShzbGlkZSwgcmVmKSA6IGFwcGVuZChsaXN0LCBzbGlkZSk7XG4gICAgICAgIGFkZENsYXNzKHNsaWRlLCBvcHRpb25zLmNsYXNzZXMuc2xpZGUpO1xuICAgICAgICBvYnNlcnZlSW1hZ2VzKHNsaWRlLCBhcHBseShlbWl0LCBFVkVOVF9SRVNJWkUpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBlbWl0KEVWRU5UX1JFRlJFU0gpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlJDEobWF0Y2hlcikge1xuICAgIHJlbW92ZShmaWx0ZXIobWF0Y2hlcikubWFwKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiBTbGlkZTIuc2xpZGU7XG4gICAgfSkpO1xuICAgIGVtaXQoRVZFTlRfUkVGUkVTSCk7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JFYWNoJDEoaXRlcmF0ZWUsIGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICBnZXQoZXhjbHVkZUNsb25lcykuZm9yRWFjaChpdGVyYXRlZSk7XG4gIH1cblxuICBmdW5jdGlvbiBmaWx0ZXIobWF0Y2hlcikge1xuICAgIHJldHVybiBTbGlkZXMyLmZpbHRlcihpc0Z1bmN0aW9uKG1hdGNoZXIpID8gbWF0Y2hlciA6IGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIHJldHVybiBpc1N0cmluZyhtYXRjaGVyKSA/IG1hdGNoZXMoU2xpZGUyLnNsaWRlLCBtYXRjaGVyKSA6IGluY2x1ZGVzKHRvQXJyYXkobWF0Y2hlciksIFNsaWRlMi5pbmRleCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdHlsZShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKSB7XG4gICAgZm9yRWFjaCQxKGZ1bmN0aW9uIChTbGlkZTIpIHtcbiAgICAgIFNsaWRlMi5zdHlsZShwcm9wLCB2YWx1ZSwgdXNlQ29udGFpbmVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9ic2VydmVJbWFnZXMoZWxtLCBjYWxsYmFjaykge1xuICAgIHZhciBpbWFnZXMgPSBxdWVyeUFsbChlbG0sIFwiaW1nXCIpO1xuICAgIHZhciBsZW5ndGggPSBpbWFnZXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgaW1hZ2VzLmZvckVhY2goZnVuY3Rpb24gKGltZykge1xuICAgICAgICBiaW5kKGltZywgXCJsb2FkIGVycm9yXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoISAtLWxlbmd0aCkge1xuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGVuZ3RoKGV4Y2x1ZGVDbG9uZXMpIHtcbiAgICByZXR1cm4gZXhjbHVkZUNsb25lcyA/IHNsaWRlcy5sZW5ndGggOiBTbGlkZXMyLmxlbmd0aDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW5vdWdoKCkge1xuICAgIHJldHVybiBTbGlkZXMyLmxlbmd0aCA+IG9wdGlvbnMucGVyUGFnZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgdXBkYXRlOiB1cGRhdGUsXG4gICAgcmVnaXN0ZXI6IHJlZ2lzdGVyLFxuICAgIGdldDogZ2V0LFxuICAgIGdldEluOiBnZXRJbixcbiAgICBnZXRBdDogZ2V0QXQsXG4gICAgYWRkOiBhZGQsXG4gICAgcmVtb3ZlOiByZW1vdmUkMSxcbiAgICBmb3JFYWNoOiBmb3JFYWNoJDEsXG4gICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIGdldExlbmd0aDogZ2V0TGVuZ3RoLFxuICAgIGlzRW5vdWdoOiBpc0Vub3VnaFxuICB9O1xufVxuXG5mdW5jdGlvbiBMYXlvdXQoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTMgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMy5vbixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UzLmJpbmQsXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlMy5lbWl0O1xuXG4gIHZhciBTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXM7XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciBfQ29tcG9uZW50czIkRWxlbWVudHMyID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICByb290ID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMi5yb290LFxuICAgICAgdHJhY2sgPSBfQ29tcG9uZW50czIkRWxlbWVudHMyLnRyYWNrLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czIubGlzdDtcbiAgdmFyIGdldEF0ID0gU2xpZGVzLmdldEF0LFxuICAgICAgc3R5bGVTbGlkZXMgPSBTbGlkZXMuc3R5bGU7XG4gIHZhciB2ZXJ0aWNhbDtcbiAgdmFyIHJvb3RSZWN0O1xuICB2YXIgb3ZlcmZsb3c7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaW5pdCgpO1xuICAgIGJpbmQod2luZG93LCBcInJlc2l6ZSBsb2FkXCIsIFRocm90dGxlKGFwcGx5KGVtaXQsIEVWRU5UX1JFU0laRSkpKTtcbiAgICBvbihbRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVGUkVTSF0sIGluaXQpO1xuICAgIG9uKEVWRU5UX1JFU0laRSwgcmVzaXplKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmVydGljYWwgPSBvcHRpb25zLmRpcmVjdGlvbiA9PT0gVFRCO1xuICAgIHN0eWxlKHJvb3QsIFwibWF4V2lkdGhcIiwgdW5pdChvcHRpb25zLndpZHRoKSk7XG4gICAgc3R5bGUodHJhY2ssIHJlc29sdmUoXCJwYWRkaW5nTGVmdFwiKSwgY3NzUGFkZGluZyhmYWxzZSkpO1xuICAgIHN0eWxlKHRyYWNrLCByZXNvbHZlKFwicGFkZGluZ1JpZ2h0XCIpLCBjc3NQYWRkaW5nKHRydWUpKTtcbiAgICByZXNpemUodHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNpemUoZm9yY2UpIHtcbiAgICB2YXIgbmV3UmVjdCA9IHJlY3Qocm9vdCk7XG5cbiAgICBpZiAoZm9yY2UgfHwgcm9vdFJlY3Qud2lkdGggIT09IG5ld1JlY3Qud2lkdGggfHwgcm9vdFJlY3QuaGVpZ2h0ICE9PSBuZXdSZWN0LmhlaWdodCkge1xuICAgICAgc3R5bGUodHJhY2ssIFwiaGVpZ2h0XCIsIGNzc1RyYWNrSGVpZ2h0KCkpO1xuICAgICAgc3R5bGVTbGlkZXMocmVzb2x2ZShcIm1hcmdpblJpZ2h0XCIpLCB1bml0KG9wdGlvbnMuZ2FwKSk7XG4gICAgICBzdHlsZVNsaWRlcyhcIndpZHRoXCIsIGNzc1NsaWRlV2lkdGgoKSk7XG4gICAgICBzdHlsZVNsaWRlcyhcImhlaWdodFwiLCBjc3NTbGlkZUhlaWdodCgpLCB0cnVlKTtcbiAgICAgIHJvb3RSZWN0ID0gbmV3UmVjdDtcbiAgICAgIGVtaXQoRVZFTlRfUkVTSVpFRCk7XG5cbiAgICAgIGlmIChvdmVyZmxvdyAhPT0gKG92ZXJmbG93ID0gaXNPdmVyZmxvdygpKSkge1xuICAgICAgICB0b2dnbGVDbGFzcyhyb290LCBDTEFTU19PVkVSRkxPVywgb3ZlcmZsb3cpO1xuICAgICAgICBlbWl0KEVWRU5UX09WRVJGTE9XLCBvdmVyZmxvdyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY3NzUGFkZGluZyhyaWdodCkge1xuICAgIHZhciBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nO1xuICAgIHZhciBwcm9wID0gcmVzb2x2ZShyaWdodCA/IFwicmlnaHRcIiA6IFwibGVmdFwiKTtcbiAgICByZXR1cm4gcGFkZGluZyAmJiB1bml0KHBhZGRpbmdbcHJvcF0gfHwgKGlzT2JqZWN0KHBhZGRpbmcpID8gMCA6IHBhZGRpbmcpKSB8fCBcIjBweFwiO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzVHJhY2tIZWlnaHQoKSB7XG4gICAgdmFyIGhlaWdodCA9IFwiXCI7XG5cbiAgICBpZiAodmVydGljYWwpIHtcbiAgICAgIGhlaWdodCA9IGNzc0hlaWdodCgpO1xuICAgICAgYXNzZXJ0KGhlaWdodCwgXCJoZWlnaHQgb3IgaGVpZ2h0UmF0aW8gaXMgbWlzc2luZy5cIik7XG4gICAgICBoZWlnaHQgPSBcImNhbGMoXCIgKyBoZWlnaHQgKyBcIiAtIFwiICsgY3NzUGFkZGluZyhmYWxzZSkgKyBcIiAtIFwiICsgY3NzUGFkZGluZyh0cnVlKSArIFwiKVwiO1xuICAgIH1cblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NIZWlnaHQoKSB7XG4gICAgcmV0dXJuIHVuaXQob3B0aW9ucy5oZWlnaHQgfHwgcmVjdChsaXN0KS53aWR0aCAqIG9wdGlvbnMuaGVpZ2h0UmF0aW8pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3NzU2xpZGVXaWR0aCgpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5hdXRvV2lkdGggPyBudWxsIDogdW5pdChvcHRpb25zLmZpeGVkV2lkdGgpIHx8ICh2ZXJ0aWNhbCA/IFwiXCIgOiBjc3NTbGlkZVNpemUoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NTbGlkZUhlaWdodCgpIHtcbiAgICByZXR1cm4gdW5pdChvcHRpb25zLmZpeGVkSGVpZ2h0KSB8fCAodmVydGljYWwgPyBvcHRpb25zLmF1dG9IZWlnaHQgPyBudWxsIDogY3NzU2xpZGVTaXplKCkgOiBjc3NIZWlnaHQoKSk7XG4gIH1cblxuICBmdW5jdGlvbiBjc3NTbGlkZVNpemUoKSB7XG4gICAgdmFyIGdhcCA9IHVuaXQob3B0aW9ucy5nYXApO1xuICAgIHJldHVybiBcImNhbGMoKDEwMCVcIiArIChnYXAgJiYgXCIgKyBcIiArIGdhcCkgKyBcIikvXCIgKyAob3B0aW9ucy5wZXJQYWdlIHx8IDEpICsgKGdhcCAmJiBcIiAtIFwiICsgZ2FwKSArIFwiKVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gbGlzdFNpemUoKSB7XG4gICAgcmV0dXJuIHJlY3QobGlzdClbcmVzb2x2ZShcIndpZHRoXCIpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlU2l6ZShpbmRleCwgd2l0aG91dEdhcCkge1xuICAgIHZhciBTbGlkZSA9IGdldEF0KGluZGV4IHx8IDApO1xuICAgIHJldHVybiBTbGlkZSA/IHJlY3QoU2xpZGUuc2xpZGUpW3Jlc29sdmUoXCJ3aWR0aFwiKV0gKyAod2l0aG91dEdhcCA/IDAgOiBnZXRHYXAoKSkgOiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gdG90YWxTaXplKGluZGV4LCB3aXRob3V0R2FwKSB7XG4gICAgdmFyIFNsaWRlID0gZ2V0QXQoaW5kZXgpO1xuXG4gICAgaWYgKFNsaWRlKSB7XG4gICAgICB2YXIgcmlnaHQgPSByZWN0KFNsaWRlLnNsaWRlKVtyZXNvbHZlKFwicmlnaHRcIildO1xuICAgICAgdmFyIGxlZnQgPSByZWN0KGxpc3QpW3Jlc29sdmUoXCJsZWZ0XCIpXTtcbiAgICAgIHJldHVybiBhYnMocmlnaHQgLSBsZWZ0KSArICh3aXRob3V0R2FwID8gMCA6IGdldEdhcCgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlclNpemUod2l0aG91dEdhcCkge1xuICAgIHJldHVybiB0b3RhbFNpemUoU3BsaWRlMi5sZW5ndGggLSAxKSAtIHRvdGFsU2l6ZSgwKSArIHNsaWRlU2l6ZSgwLCB3aXRob3V0R2FwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEdhcCgpIHtcbiAgICB2YXIgU2xpZGUgPSBnZXRBdCgwKTtcbiAgICByZXR1cm4gU2xpZGUgJiYgcGFyc2VGbG9hdChzdHlsZShTbGlkZS5zbGlkZSwgcmVzb2x2ZShcIm1hcmdpblJpZ2h0XCIpKSkgfHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBhZGRpbmcocmlnaHQpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZSh0cmFjaywgcmVzb2x2ZShcInBhZGRpbmdcIiArIChyaWdodCA/IFwiUmlnaHRcIiA6IFwiTGVmdFwiKSkpKSB8fCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPdmVyZmxvdygpIHtcbiAgICByZXR1cm4gU3BsaWRlMi5pcyhGQURFKSB8fCBzbGlkZXJTaXplKHRydWUpID4gbGlzdFNpemUoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIHJlc2l6ZTogcmVzaXplLFxuICAgIGxpc3RTaXplOiBsaXN0U2l6ZSxcbiAgICBzbGlkZVNpemU6IHNsaWRlU2l6ZSxcbiAgICBzbGlkZXJTaXplOiBzbGlkZXJTaXplLFxuICAgIHRvdGFsU2l6ZTogdG90YWxTaXplLFxuICAgIGdldFBhZGRpbmc6IGdldFBhZGRpbmcsXG4gICAgaXNPdmVyZmxvdzogaXNPdmVyZmxvd1xuICB9O1xufVxuXG52YXIgTVVMVElQTElFUiA9IDI7XG5cbmZ1bmN0aW9uIENsb25lcyhTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgdmFyIG9uID0gZXZlbnQub247XG4gIHZhciBFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzO1xuICB2YXIgcmVzb2x2ZSA9IENvbXBvbmVudHMyLkRpcmVjdGlvbi5yZXNvbHZlO1xuICB2YXIgY2xvbmVzID0gW107XG4gIHZhciBjbG9uZUNvdW50O1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIG9uKEVWRU5UX1JFRlJFU0gsIHJlbW91bnQpO1xuICAgIG9uKFtFVkVOVF9VUERBVEVELCBFVkVOVF9SRVNJWkVdLCBvYnNlcnZlKTtcblxuICAgIGlmIChjbG9uZUNvdW50ID0gY29tcHV0ZUNsb25lQ291bnQoKSkge1xuICAgICAgZ2VuZXJhdGUoY2xvbmVDb3VudCk7XG4gICAgICBDb21wb25lbnRzMi5MYXlvdXQucmVzaXplKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW91bnQoKSB7XG4gICAgZGVzdHJveSgpO1xuICAgIG1vdW50KCk7XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIHJlbW92ZShjbG9uZXMpO1xuICAgIGVtcHR5KGNsb25lcyk7XG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gb2JzZXJ2ZSgpIHtcbiAgICB2YXIgY291bnQgPSBjb21wdXRlQ2xvbmVDb3VudCgpO1xuXG4gICAgaWYgKGNsb25lQ291bnQgIT09IGNvdW50KSB7XG4gICAgICBpZiAoY2xvbmVDb3VudCA8IGNvdW50IHx8ICFjb3VudCkge1xuICAgICAgICBldmVudC5lbWl0KEVWRU5UX1JFRlJFU0gpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdlbmVyYXRlKGNvdW50KSB7XG4gICAgdmFyIHNsaWRlcyA9IFNsaWRlcy5nZXQoKS5zbGljZSgpO1xuICAgIHZhciBsZW5ndGggPSBzbGlkZXMubGVuZ3RoO1xuXG4gICAgaWYgKGxlbmd0aCkge1xuICAgICAgd2hpbGUgKHNsaWRlcy5sZW5ndGggPCBjb3VudCkge1xuICAgICAgICBwdXNoKHNsaWRlcywgc2xpZGVzKTtcbiAgICAgIH1cblxuICAgICAgcHVzaChzbGlkZXMuc2xpY2UoLWNvdW50KSwgc2xpZGVzLnNsaWNlKDAsIGNvdW50KSkuZm9yRWFjaChmdW5jdGlvbiAoU2xpZGUsIGluZGV4KSB7XG4gICAgICAgIHZhciBpc0hlYWQgPSBpbmRleCA8IGNvdW50O1xuICAgICAgICB2YXIgY2xvbmUgPSBjbG9uZURlZXAoU2xpZGUuc2xpZGUsIGluZGV4KTtcbiAgICAgICAgaXNIZWFkID8gYmVmb3JlKGNsb25lLCBzbGlkZXNbMF0uc2xpZGUpIDogYXBwZW5kKEVsZW1lbnRzLmxpc3QsIGNsb25lKTtcbiAgICAgICAgcHVzaChjbG9uZXMsIGNsb25lKTtcbiAgICAgICAgU2xpZGVzLnJlZ2lzdGVyKGNsb25lLCBpbmRleCAtIGNvdW50ICsgKGlzSGVhZCA/IDAgOiBsZW5ndGgpLCBTbGlkZS5pbmRleCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbG9uZURlZXAoZWxtLCBpbmRleCkge1xuICAgIHZhciBjbG9uZSA9IGVsbS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgYWRkQ2xhc3MoY2xvbmUsIG9wdGlvbnMuY2xhc3Nlcy5jbG9uZSk7XG4gICAgY2xvbmUuaWQgPSBTcGxpZGUyLnJvb3QuaWQgKyBcIi1jbG9uZVwiICsgcGFkKGluZGV4ICsgMSk7XG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZUNsb25lQ291bnQoKSB7XG4gICAgdmFyIGNsb25lczIgPSBvcHRpb25zLmNsb25lcztcblxuICAgIGlmICghU3BsaWRlMi5pcyhMT09QKSkge1xuICAgICAgY2xvbmVzMiA9IDA7XG4gICAgfSBlbHNlIGlmIChpc1VuZGVmaW5lZChjbG9uZXMyKSkge1xuICAgICAgdmFyIGZpeGVkU2l6ZSA9IG9wdGlvbnNbcmVzb2x2ZShcImZpeGVkV2lkdGhcIildICYmIENvbXBvbmVudHMyLkxheW91dC5zbGlkZVNpemUoMCk7XG4gICAgICB2YXIgZml4ZWRDb3VudCA9IGZpeGVkU2l6ZSAmJiBjZWlsKHJlY3QoRWxlbWVudHMudHJhY2spW3Jlc29sdmUoXCJ3aWR0aFwiKV0gLyBmaXhlZFNpemUpO1xuICAgICAgY2xvbmVzMiA9IGZpeGVkQ291bnQgfHwgb3B0aW9uc1tyZXNvbHZlKFwiYXV0b1dpZHRoXCIpXSAmJiBTcGxpZGUyLmxlbmd0aCB8fCBvcHRpb25zLnBlclBhZ2UgKiBNVUxUSVBMSUVSO1xuICAgIH1cblxuICAgIHJldHVybiBjbG9uZXMyO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveVxuICB9O1xufVxuXG5mdW5jdGlvbiBNb3ZlKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U0ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTQub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlNC5lbWl0O1xuXG4gIHZhciBzZXQgPSBTcGxpZGUyLnN0YXRlLnNldDtcbiAgdmFyIF9Db21wb25lbnRzMiRMYXlvdXQgPSBDb21wb25lbnRzMi5MYXlvdXQsXG4gICAgICBzbGlkZVNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnNsaWRlU2l6ZSxcbiAgICAgIGdldFBhZGRpbmcgPSBfQ29tcG9uZW50czIkTGF5b3V0LmdldFBhZGRpbmcsXG4gICAgICB0b3RhbFNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnRvdGFsU2l6ZSxcbiAgICAgIGxpc3RTaXplID0gX0NvbXBvbmVudHMyJExheW91dC5saXN0U2l6ZSxcbiAgICAgIHNsaWRlclNpemUgPSBfQ29tcG9uZW50czIkTGF5b3V0LnNsaWRlclNpemU7XG4gIHZhciBfQ29tcG9uZW50czIkRGlyZWN0aW8gPSBDb21wb25lbnRzMi5EaXJlY3Rpb24sXG4gICAgICByZXNvbHZlID0gX0NvbXBvbmVudHMyJERpcmVjdGlvLnJlc29sdmUsXG4gICAgICBvcmllbnQgPSBfQ29tcG9uZW50czIkRGlyZWN0aW8ub3JpZW50O1xuICB2YXIgX0NvbXBvbmVudHMyJEVsZW1lbnRzMyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgbGlzdCA9IF9Db21wb25lbnRzMiRFbGVtZW50czMubGlzdCxcbiAgICAgIHRyYWNrID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzMy50cmFjaztcbiAgdmFyIFRyYW5zaXRpb247XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgVHJhbnNpdGlvbiA9IENvbXBvbmVudHMyLlRyYW5zaXRpb247XG4gICAgb24oW0VWRU5UX01PVU5URUQsIEVWRU5UX1JFU0laRUQsIEVWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCByZXBvc2l0aW9uKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlcG9zaXRpb24oKSB7XG4gICAgaWYgKCFDb21wb25lbnRzMi5Db250cm9sbGVyLmlzQnVzeSgpKSB7XG4gICAgICBDb21wb25lbnRzMi5TY3JvbGwuY2FuY2VsKCk7XG4gICAgICBqdW1wKFNwbGlkZTIuaW5kZXgpO1xuICAgICAgQ29tcG9uZW50czIuU2xpZGVzLnVwZGF0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG1vdmUoZGVzdCwgaW5kZXgsIHByZXYsIGNhbGxiYWNrKSB7XG4gICAgaWYgKGRlc3QgIT09IGluZGV4ICYmIGNhblNoaWZ0KGRlc3QgPiBwcmV2KSkge1xuICAgICAgY2FuY2VsKCk7XG4gICAgICB0cmFuc2xhdGUoc2hpZnQoZ2V0UG9zaXRpb24oKSwgZGVzdCA+IHByZXYpLCB0cnVlKTtcbiAgICB9XG5cbiAgICBzZXQoTU9WSU5HKTtcbiAgICBlbWl0KEVWRU5UX01PVkUsIGluZGV4LCBwcmV2LCBkZXN0KTtcbiAgICBUcmFuc2l0aW9uLnN0YXJ0KGluZGV4LCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZXQoSURMRSk7XG4gICAgICBlbWl0KEVWRU5UX01PVkVELCBpbmRleCwgcHJldiwgZGVzdCk7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24ganVtcChpbmRleCkge1xuICAgIHRyYW5zbGF0ZSh0b1Bvc2l0aW9uKGluZGV4LCB0cnVlKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2xhdGUocG9zaXRpb24sIHByZXZlbnRMb29wKSB7XG4gICAgaWYgKCFTcGxpZGUyLmlzKEZBREUpKSB7XG4gICAgICB2YXIgZGVzdGluYXRpb24gPSBwcmV2ZW50TG9vcCA/IHBvc2l0aW9uIDogbG9vcChwb3NpdGlvbik7XG4gICAgICBzdHlsZShsaXN0LCBcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZVwiICsgcmVzb2x2ZShcIlhcIikgKyBcIihcIiArIGRlc3RpbmF0aW9uICsgXCJweClcIik7XG4gICAgICBwb3NpdGlvbiAhPT0gZGVzdGluYXRpb24gJiYgZW1pdChFVkVOVF9TSElGVEVEKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsb29wKHBvc2l0aW9uKSB7XG4gICAgaWYgKFNwbGlkZTIuaXMoTE9PUCkpIHtcbiAgICAgIHZhciBpbmRleCA9IHRvSW5kZXgocG9zaXRpb24pO1xuICAgICAgdmFyIGV4Y2VlZGVkTWF4ID0gaW5kZXggPiBDb21wb25lbnRzMi5Db250cm9sbGVyLmdldEVuZCgpO1xuICAgICAgdmFyIGV4Y2VlZGVkTWluID0gaW5kZXggPCAwO1xuXG4gICAgICBpZiAoZXhjZWVkZWRNaW4gfHwgZXhjZWVkZWRNYXgpIHtcbiAgICAgICAgcG9zaXRpb24gPSBzaGlmdChwb3NpdGlvbiwgZXhjZWVkZWRNYXgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNoaWZ0KHBvc2l0aW9uLCBiYWNrd2FyZHMpIHtcbiAgICB2YXIgZXhjZXNzID0gcG9zaXRpb24gLSBnZXRMaW1pdChiYWNrd2FyZHMpO1xuICAgIHZhciBzaXplID0gc2xpZGVyU2l6ZSgpO1xuICAgIHBvc2l0aW9uIC09IG9yaWVudChzaXplICogKGNlaWwoYWJzKGV4Y2VzcykgLyBzaXplKSB8fCAxKSkgKiAoYmFja3dhcmRzID8gMSA6IC0xKTtcbiAgICByZXR1cm4gcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgdHJhbnNsYXRlKGdldFBvc2l0aW9uKCksIHRydWUpO1xuICAgIFRyYW5zaXRpb24uY2FuY2VsKCk7XG4gIH1cblxuICBmdW5jdGlvbiB0b0luZGV4KHBvc2l0aW9uKSB7XG4gICAgdmFyIFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcy5nZXQoKTtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIHZhciBtaW5EaXN0YW5jZSA9IEluZmluaXR5O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBzbGlkZUluZGV4ID0gU2xpZGVzW2ldLmluZGV4O1xuICAgICAgdmFyIGRpc3RhbmNlID0gYWJzKHRvUG9zaXRpb24oc2xpZGVJbmRleCwgdHJ1ZSkgLSBwb3NpdGlvbik7XG5cbiAgICAgIGlmIChkaXN0YW5jZSA8PSBtaW5EaXN0YW5jZSkge1xuICAgICAgICBtaW5EaXN0YW5jZSA9IGRpc3RhbmNlO1xuICAgICAgICBpbmRleCA9IHNsaWRlSW5kZXg7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaW5kZXg7XG4gIH1cblxuICBmdW5jdGlvbiB0b1Bvc2l0aW9uKGluZGV4LCB0cmltbWluZykge1xuICAgIHZhciBwb3NpdGlvbiA9IG9yaWVudCh0b3RhbFNpemUoaW5kZXggLSAxKSAtIG9mZnNldChpbmRleCkpO1xuICAgIHJldHVybiB0cmltbWluZyA/IHRyaW0ocG9zaXRpb24pIDogcG9zaXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQb3NpdGlvbigpIHtcbiAgICB2YXIgbGVmdCA9IHJlc29sdmUoXCJsZWZ0XCIpO1xuICAgIHJldHVybiByZWN0KGxpc3QpW2xlZnRdIC0gcmVjdCh0cmFjaylbbGVmdF0gKyBvcmllbnQoZ2V0UGFkZGluZyhmYWxzZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJpbShwb3NpdGlvbikge1xuICAgIGlmIChvcHRpb25zLnRyaW1TcGFjZSAmJiBTcGxpZGUyLmlzKFNMSURFKSkge1xuICAgICAgcG9zaXRpb24gPSBjbGFtcChwb3NpdGlvbiwgMCwgb3JpZW50KHNsaWRlclNpemUodHJ1ZSkgLSBsaXN0U2l6ZSgpKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBvc2l0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gb2Zmc2V0KGluZGV4KSB7XG4gICAgdmFyIGZvY3VzID0gb3B0aW9ucy5mb2N1cztcbiAgICByZXR1cm4gZm9jdXMgPT09IFwiY2VudGVyXCIgPyAobGlzdFNpemUoKSAtIHNsaWRlU2l6ZShpbmRleCwgdHJ1ZSkpIC8gMiA6ICtmb2N1cyAqIHNsaWRlU2l6ZShpbmRleCkgfHwgMDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExpbWl0KG1heCkge1xuICAgIHJldHVybiB0b1Bvc2l0aW9uKG1heCA/IENvbXBvbmVudHMyLkNvbnRyb2xsZXIuZ2V0RW5kKCkgOiAwLCAhIW9wdGlvbnMudHJpbVNwYWNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhblNoaWZ0KGJhY2t3YXJkcykge1xuICAgIHZhciBzaGlmdGVkID0gb3JpZW50KHNoaWZ0KGdldFBvc2l0aW9uKCksIGJhY2t3YXJkcykpO1xuICAgIHJldHVybiBiYWNrd2FyZHMgPyBzaGlmdGVkID49IDAgOiBzaGlmdGVkIDw9IGxpc3RbcmVzb2x2ZShcInNjcm9sbFdpZHRoXCIpXSAtIHJlY3QodHJhY2spW3Jlc29sdmUoXCJ3aWR0aFwiKV07XG4gIH1cblxuICBmdW5jdGlvbiBleGNlZWRlZExpbWl0KG1heCwgcG9zaXRpb24pIHtcbiAgICBwb3NpdGlvbiA9IGlzVW5kZWZpbmVkKHBvc2l0aW9uKSA/IGdldFBvc2l0aW9uKCkgOiBwb3NpdGlvbjtcbiAgICB2YXIgZXhjZWVkZWRNaW4gPSBtYXggIT09IHRydWUgJiYgb3JpZW50KHBvc2l0aW9uKSA8IG9yaWVudChnZXRMaW1pdChmYWxzZSkpO1xuICAgIHZhciBleGNlZWRlZE1heCA9IG1heCAhPT0gZmFsc2UgJiYgb3JpZW50KHBvc2l0aW9uKSA+IG9yaWVudChnZXRMaW1pdCh0cnVlKSk7XG4gICAgcmV0dXJuIGV4Y2VlZGVkTWluIHx8IGV4Y2VlZGVkTWF4O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgbW92ZTogbW92ZSxcbiAgICBqdW1wOiBqdW1wLFxuICAgIHRyYW5zbGF0ZTogdHJhbnNsYXRlLFxuICAgIHNoaWZ0OiBzaGlmdCxcbiAgICBjYW5jZWw6IGNhbmNlbCxcbiAgICB0b0luZGV4OiB0b0luZGV4LFxuICAgIHRvUG9zaXRpb246IHRvUG9zaXRpb24sXG4gICAgZ2V0UG9zaXRpb246IGdldFBvc2l0aW9uLFxuICAgIGdldExpbWl0OiBnZXRMaW1pdCxcbiAgICBleGNlZWRlZExpbWl0OiBleGNlZWRlZExpbWl0LFxuICAgIHJlcG9zaXRpb246IHJlcG9zaXRpb25cbiAgfTtcbn1cblxuZnVuY3Rpb24gQ29udHJvbGxlcihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U1Lm9uLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTUuZW1pdDtcblxuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmU7XG4gIHZhciBnZXRQb3NpdGlvbiA9IE1vdmUuZ2V0UG9zaXRpb24sXG4gICAgICBnZXRMaW1pdCA9IE1vdmUuZ2V0TGltaXQsXG4gICAgICB0b1Bvc2l0aW9uID0gTW92ZS50b1Bvc2l0aW9uO1xuICB2YXIgX0NvbXBvbmVudHMyJFNsaWRlcyA9IENvbXBvbmVudHMyLlNsaWRlcyxcbiAgICAgIGlzRW5vdWdoID0gX0NvbXBvbmVudHMyJFNsaWRlcy5pc0Vub3VnaCxcbiAgICAgIGdldExlbmd0aCA9IF9Db21wb25lbnRzMiRTbGlkZXMuZ2V0TGVuZ3RoO1xuICB2YXIgb21pdEVuZCA9IG9wdGlvbnMub21pdEVuZDtcbiAgdmFyIGlzTG9vcCA9IFNwbGlkZTIuaXMoTE9PUCk7XG4gIHZhciBpc1NsaWRlID0gU3BsaWRlMi5pcyhTTElERSk7XG4gIHZhciBnZXROZXh0ID0gYXBwbHkoZ2V0QWRqYWNlbnQsIGZhbHNlKTtcbiAgdmFyIGdldFByZXYgPSBhcHBseShnZXRBZGphY2VudCwgdHJ1ZSk7XG4gIHZhciBjdXJySW5kZXggPSBvcHRpb25zLnN0YXJ0IHx8IDA7XG4gIHZhciBlbmRJbmRleDtcbiAgdmFyIHByZXZJbmRleCA9IGN1cnJJbmRleDtcbiAgdmFyIHNsaWRlQ291bnQ7XG4gIHZhciBwZXJNb3ZlO1xuICB2YXIgcGVyUGFnZTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oW0VWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0gsIEVWRU5UX0VORF9JTkRFWF9DSEFOR0VEXSwgaW5pdCk7XG4gICAgb24oRVZFTlRfUkVTSVpFRCwgb25SZXNpemVkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc2xpZGVDb3VudCA9IGdldExlbmd0aCh0cnVlKTtcbiAgICBwZXJNb3ZlID0gb3B0aW9ucy5wZXJNb3ZlO1xuICAgIHBlclBhZ2UgPSBvcHRpb25zLnBlclBhZ2U7XG4gICAgZW5kSW5kZXggPSBnZXRFbmQoKTtcbiAgICB2YXIgaW5kZXggPSBjbGFtcChjdXJySW5kZXgsIDAsIG9taXRFbmQgPyBlbmRJbmRleCA6IHNsaWRlQ291bnQgLSAxKTtcblxuICAgIGlmIChpbmRleCAhPT0gY3VyckluZGV4KSB7XG4gICAgICBjdXJySW5kZXggPSBpbmRleDtcbiAgICAgIE1vdmUucmVwb3NpdGlvbigpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uUmVzaXplZCgpIHtcbiAgICBpZiAoZW5kSW5kZXggIT09IGdldEVuZCgpKSB7XG4gICAgICBlbWl0KEVWRU5UX0VORF9JTkRFWF9DSEFOR0VEKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnbyhjb250cm9sLCBhbGxvd1NhbWVJbmRleCwgY2FsbGJhY2spIHtcbiAgICBpZiAoIWlzQnVzeSgpKSB7XG4gICAgICB2YXIgZGVzdCA9IHBhcnNlKGNvbnRyb2wpO1xuICAgICAgdmFyIGluZGV4ID0gbG9vcChkZXN0KTtcblxuICAgICAgaWYgKGluZGV4ID4gLTEgJiYgKGFsbG93U2FtZUluZGV4IHx8IGluZGV4ICE9PSBjdXJySW5kZXgpKSB7XG4gICAgICAgIHNldEluZGV4KGluZGV4KTtcbiAgICAgICAgTW92ZS5tb3ZlKGRlc3QsIGluZGV4LCBwcmV2SW5kZXgsIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGwoZGVzdGluYXRpb24sIGR1cmF0aW9uLCBzbmFwLCBjYWxsYmFjaykge1xuICAgIENvbXBvbmVudHMyLlNjcm9sbC5zY3JvbGwoZGVzdGluYXRpb24sIGR1cmF0aW9uLCBzbmFwLCBmdW5jdGlvbiAoKSB7XG4gICAgICB2YXIgaW5kZXggPSBsb29wKE1vdmUudG9JbmRleChnZXRQb3NpdGlvbigpKSk7XG4gICAgICBzZXRJbmRleChvbWl0RW5kID8gbWluKGluZGV4LCBlbmRJbmRleCkgOiBpbmRleCk7XG4gICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2UoY29udHJvbCkge1xuICAgIHZhciBpbmRleCA9IGN1cnJJbmRleDtcblxuICAgIGlmIChpc1N0cmluZyhjb250cm9sKSkge1xuICAgICAgdmFyIF9yZWYgPSBjb250cm9sLm1hdGNoKC8oWytcXC08Pl0pKFxcZCspPy8pIHx8IFtdLFxuICAgICAgICAgIGluZGljYXRvciA9IF9yZWZbMV0sXG4gICAgICAgICAgbnVtYmVyID0gX3JlZlsyXTtcblxuICAgICAgaWYgKGluZGljYXRvciA9PT0gXCIrXCIgfHwgaW5kaWNhdG9yID09PSBcIi1cIikge1xuICAgICAgICBpbmRleCA9IGNvbXB1dGVEZXN0SW5kZXgoY3VyckluZGV4ICsgKyhcIlwiICsgaW5kaWNhdG9yICsgKCtudW1iZXIgfHwgMSkpLCBjdXJySW5kZXgpO1xuICAgICAgfSBlbHNlIGlmIChpbmRpY2F0b3IgPT09IFwiPlwiKSB7XG4gICAgICAgIGluZGV4ID0gbnVtYmVyID8gdG9JbmRleCgrbnVtYmVyKSA6IGdldE5leHQodHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKGluZGljYXRvciA9PT0gXCI8XCIpIHtcbiAgICAgICAgaW5kZXggPSBnZXRQcmV2KHRydWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbmRleCA9IGlzTG9vcCA/IGNvbnRyb2wgOiBjbGFtcChjb250cm9sLCAwLCBlbmRJbmRleCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGluZGV4O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QWRqYWNlbnQocHJldiwgZGVzdGluYXRpb24pIHtcbiAgICB2YXIgbnVtYmVyID0gcGVyTW92ZSB8fCAoaGFzRm9jdXMoKSA/IDEgOiBwZXJQYWdlKTtcbiAgICB2YXIgZGVzdCA9IGNvbXB1dGVEZXN0SW5kZXgoY3VyckluZGV4ICsgbnVtYmVyICogKHByZXYgPyAtMSA6IDEpLCBjdXJySW5kZXgsICEocGVyTW92ZSB8fCBoYXNGb2N1cygpKSk7XG5cbiAgICBpZiAoZGVzdCA9PT0gLTEgJiYgaXNTbGlkZSkge1xuICAgICAgaWYgKCFhcHByb3hpbWF0ZWx5RXF1YWwoZ2V0UG9zaXRpb24oKSwgZ2V0TGltaXQoIXByZXYpLCAxKSkge1xuICAgICAgICByZXR1cm4gcHJldiA/IDAgOiBlbmRJbmRleDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdGluYXRpb24gPyBkZXN0IDogbG9vcChkZXN0KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVEZXN0SW5kZXgoZGVzdCwgZnJvbSwgc25hcFBhZ2UpIHtcbiAgICBpZiAoaXNFbm91Z2goKSB8fCBoYXNGb2N1cygpKSB7XG4gICAgICB2YXIgaW5kZXggPSBjb21wdXRlTW92YWJsZURlc3RJbmRleChkZXN0KTtcblxuICAgICAgaWYgKGluZGV4ICE9PSBkZXN0KSB7XG4gICAgICAgIGZyb20gPSBkZXN0O1xuICAgICAgICBkZXN0ID0gaW5kZXg7XG4gICAgICAgIHNuYXBQYWdlID0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZXN0IDwgMCB8fCBkZXN0ID4gZW5kSW5kZXgpIHtcbiAgICAgICAgaWYgKCFwZXJNb3ZlICYmIChiZXR3ZWVuKDAsIGRlc3QsIGZyb20sIHRydWUpIHx8IGJldHdlZW4oZW5kSW5kZXgsIGZyb20sIGRlc3QsIHRydWUpKSkge1xuICAgICAgICAgIGRlc3QgPSB0b0luZGV4KHRvUGFnZShkZXN0KSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzTG9vcCkge1xuICAgICAgICAgICAgZGVzdCA9IHNuYXBQYWdlID8gZGVzdCA8IDAgPyAtKHNsaWRlQ291bnQgJSBwZXJQYWdlIHx8IHBlclBhZ2UpIDogc2xpZGVDb3VudCA6IGRlc3Q7XG4gICAgICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnJld2luZCkge1xuICAgICAgICAgICAgZGVzdCA9IGRlc3QgPCAwID8gZW5kSW5kZXggOiAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZXN0ID0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc25hcFBhZ2UgJiYgZGVzdCAhPT0gZnJvbSkge1xuICAgICAgICAgIGRlc3QgPSB0b0luZGV4KHRvUGFnZShmcm9tKSArIChkZXN0IDwgZnJvbSA/IC0xIDogMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3QgPSAtMTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVNb3ZhYmxlRGVzdEluZGV4KGRlc3QpIHtcbiAgICBpZiAoaXNTbGlkZSAmJiBvcHRpb25zLnRyaW1TcGFjZSA9PT0gXCJtb3ZlXCIgJiYgZGVzdCAhPT0gY3VyckluZGV4KSB7XG4gICAgICB2YXIgcG9zaXRpb24gPSBnZXRQb3NpdGlvbigpO1xuXG4gICAgICB3aGlsZSAocG9zaXRpb24gPT09IHRvUG9zaXRpb24oZGVzdCwgdHJ1ZSkgJiYgYmV0d2VlbihkZXN0LCAwLCBTcGxpZGUyLmxlbmd0aCAtIDEsICFvcHRpb25zLnJld2luZCkpIHtcbiAgICAgICAgZGVzdCA8IGN1cnJJbmRleCA/IC0tZGVzdCA6ICsrZGVzdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3AoaW5kZXgpIHtcbiAgICByZXR1cm4gaXNMb29wID8gKGluZGV4ICsgc2xpZGVDb3VudCkgJSBzbGlkZUNvdW50IHx8IDAgOiBpbmRleDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEVuZCgpIHtcbiAgICB2YXIgZW5kID0gc2xpZGVDb3VudCAtIChoYXNGb2N1cygpIHx8IGlzTG9vcCAmJiBwZXJNb3ZlID8gMSA6IHBlclBhZ2UpO1xuXG4gICAgd2hpbGUgKG9taXRFbmQgJiYgZW5kLS0gPiAwKSB7XG4gICAgICBpZiAodG9Qb3NpdGlvbihzbGlkZUNvdW50IC0gMSwgdHJ1ZSkgIT09IHRvUG9zaXRpb24oZW5kLCB0cnVlKSkge1xuICAgICAgICBlbmQrKztcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsYW1wKGVuZCwgMCwgc2xpZGVDb3VudCAtIDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9JbmRleChwYWdlKSB7XG4gICAgcmV0dXJuIGNsYW1wKGhhc0ZvY3VzKCkgPyBwYWdlIDogcGVyUGFnZSAqIHBhZ2UsIDAsIGVuZEluZGV4KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvUGFnZShpbmRleCkge1xuICAgIHJldHVybiBoYXNGb2N1cygpID8gbWluKGluZGV4LCBlbmRJbmRleCkgOiBmbG9vcigoaW5kZXggPj0gZW5kSW5kZXggPyBzbGlkZUNvdW50IC0gMSA6IGluZGV4KSAvIHBlclBhZ2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9EZXN0KGRlc3RpbmF0aW9uKSB7XG4gICAgdmFyIGNsb3Nlc3QgPSBNb3ZlLnRvSW5kZXgoZGVzdGluYXRpb24pO1xuICAgIHJldHVybiBpc1NsaWRlID8gY2xhbXAoY2xvc2VzdCwgMCwgZW5kSW5kZXgpIDogY2xvc2VzdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEluZGV4KGluZGV4KSB7XG4gICAgaWYgKGluZGV4ICE9PSBjdXJySW5kZXgpIHtcbiAgICAgIHByZXZJbmRleCA9IGN1cnJJbmRleDtcbiAgICAgIGN1cnJJbmRleCA9IGluZGV4O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEluZGV4KHByZXYpIHtcbiAgICByZXR1cm4gcHJldiA/IHByZXZJbmRleCA6IGN1cnJJbmRleDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGhhc0ZvY3VzKCkge1xuICAgIHJldHVybiAhaXNVbmRlZmluZWQob3B0aW9ucy5mb2N1cykgfHwgb3B0aW9ucy5pc05hdmlnYXRpb247XG4gIH1cblxuICBmdW5jdGlvbiBpc0J1c3koKSB7XG4gICAgcmV0dXJuIFNwbGlkZTIuc3RhdGUuaXMoW01PVklORywgU0NST0xMSU5HXSkgJiYgISFvcHRpb25zLndhaXRGb3JUcmFuc2l0aW9uO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZ286IGdvLFxuICAgIHNjcm9sbDogc2Nyb2xsLFxuICAgIGdldE5leHQ6IGdldE5leHQsXG4gICAgZ2V0UHJldjogZ2V0UHJldixcbiAgICBnZXRBZGphY2VudDogZ2V0QWRqYWNlbnQsXG4gICAgZ2V0RW5kOiBnZXRFbmQsXG4gICAgc2V0SW5kZXg6IHNldEluZGV4LFxuICAgIGdldEluZGV4OiBnZXRJbmRleCxcbiAgICB0b0luZGV4OiB0b0luZGV4LFxuICAgIHRvUGFnZTogdG9QYWdlLFxuICAgIHRvRGVzdDogdG9EZXN0LFxuICAgIGhhc0ZvY3VzOiBoYXNGb2N1cyxcbiAgICBpc0J1c3k6IGlzQnVzeVxuICB9O1xufVxuXG52YXIgWE1MX05BTUVfU1BBQ0UgPSBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI7XG52YXIgUEFUSCA9IFwibTE1LjUgMC45MzItNC4zIDQuMzggMTQuNSAxNC42LTE0LjUgMTQuNSA0LjMgNC40IDE0LjYtMTQuNiA0LjQtNC4zLTQuNC00LjQtMTQuNi0xNC42elwiO1xudmFyIFNJWkUgPSA0MDtcblxuZnVuY3Rpb24gQXJyb3dzKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBldmVudCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpO1xuICB2YXIgb24gPSBldmVudC5vbixcbiAgICAgIGJpbmQgPSBldmVudC5iaW5kLFxuICAgICAgZW1pdCA9IGV2ZW50LmVtaXQ7XG4gIHZhciBjbGFzc2VzID0gb3B0aW9ucy5jbGFzc2VzLFxuICAgICAgaTE4biA9IG9wdGlvbnMuaTE4bjtcbiAgdmFyIEVsZW1lbnRzID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICBDb250cm9sbGVyID0gQ29tcG9uZW50czIuQ29udHJvbGxlcjtcbiAgdmFyIHBsYWNlaG9sZGVyID0gRWxlbWVudHMuYXJyb3dzLFxuICAgICAgdHJhY2sgPSBFbGVtZW50cy50cmFjaztcbiAgdmFyIHdyYXBwZXIgPSBwbGFjZWhvbGRlcjtcbiAgdmFyIHByZXYgPSBFbGVtZW50cy5wcmV2O1xuICB2YXIgbmV4dCA9IEVsZW1lbnRzLm5leHQ7XG4gIHZhciBjcmVhdGVkO1xuICB2YXIgd3JhcHBlckNsYXNzZXM7XG4gIHZhciBhcnJvd3MgPSB7fTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpbml0KCk7XG4gICAgb24oRVZFTlRfVVBEQVRFRCwgcmVtb3VudCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdW50KCkge1xuICAgIGRlc3Ryb3koKTtcbiAgICBtb3VudCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgZW5hYmxlZCA9IG9wdGlvbnMuYXJyb3dzO1xuXG4gICAgaWYgKGVuYWJsZWQgJiYgIShwcmV2ICYmIG5leHQpKSB7XG4gICAgICBjcmVhdGVBcnJvd3MoKTtcbiAgICB9XG5cbiAgICBpZiAocHJldiAmJiBuZXh0KSB7XG4gICAgICBhc3NpZ24oYXJyb3dzLCB7XG4gICAgICAgIHByZXY6IHByZXYsXG4gICAgICAgIG5leHQ6IG5leHRcbiAgICAgIH0pO1xuICAgICAgZGlzcGxheSh3cmFwcGVyLCBlbmFibGVkID8gXCJcIiA6IFwibm9uZVwiKTtcbiAgICAgIGFkZENsYXNzKHdyYXBwZXIsIHdyYXBwZXJDbGFzc2VzID0gQ0xBU1NfQVJST1dTICsgXCItLVwiICsgb3B0aW9ucy5kaXJlY3Rpb24pO1xuXG4gICAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgICBsaXN0ZW4oKTtcbiAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIHNldEF0dHJpYnV0ZShbcHJldiwgbmV4dF0sIEFSSUFfQ09OVFJPTFMsIHRyYWNrLmlkKTtcbiAgICAgICAgZW1pdChFVkVOVF9BUlJPV1NfTU9VTlRFRCwgcHJldiwgbmV4dCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBldmVudC5kZXN0cm95KCk7XG4gICAgcmVtb3ZlQ2xhc3Mod3JhcHBlciwgd3JhcHBlckNsYXNzZXMpO1xuXG4gICAgaWYgKGNyZWF0ZWQpIHtcbiAgICAgIHJlbW92ZShwbGFjZWhvbGRlciA/IFtwcmV2LCBuZXh0XSA6IHdyYXBwZXIpO1xuICAgICAgcHJldiA9IG5leHQgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmVBdHRyaWJ1dGUoW3ByZXYsIG5leHRdLCBBTExfQVRUUklCVVRFUyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbGlzdGVuKCkge1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9NT1ZFRCwgRVZFTlRfUkVGUkVTSCwgRVZFTlRfU0NST0xMRUQsIEVWRU5UX0VORF9JTkRFWF9DSEFOR0VEXSwgdXBkYXRlKTtcbiAgICBiaW5kKG5leHQsIFwiY2xpY2tcIiwgYXBwbHkoZ28sIFwiPlwiKSk7XG4gICAgYmluZChwcmV2LCBcImNsaWNrXCIsIGFwcGx5KGdvLCBcIjxcIikpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ28oY29udHJvbCkge1xuICAgIENvbnRyb2xsZXIuZ28oY29udHJvbCwgdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJvd3MoKSB7XG4gICAgd3JhcHBlciA9IHBsYWNlaG9sZGVyIHx8IGNyZWF0ZShcImRpdlwiLCBjbGFzc2VzLmFycm93cyk7XG4gICAgcHJldiA9IGNyZWF0ZUFycm93KHRydWUpO1xuICAgIG5leHQgPSBjcmVhdGVBcnJvdyhmYWxzZSk7XG4gICAgY3JlYXRlZCA9IHRydWU7XG4gICAgYXBwZW5kKHdyYXBwZXIsIFtwcmV2LCBuZXh0XSk7XG4gICAgIXBsYWNlaG9sZGVyICYmIGJlZm9yZSh3cmFwcGVyLCB0cmFjayk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVBcnJvdyhwcmV2Mikge1xuICAgIHZhciBhcnJvdyA9IFwiPGJ1dHRvbiBjbGFzcz1cXFwiXCIgKyBjbGFzc2VzLmFycm93ICsgXCIgXCIgKyAocHJldjIgPyBjbGFzc2VzLnByZXYgOiBjbGFzc2VzLm5leHQpICsgXCJcXFwiIHR5cGU9XFxcImJ1dHRvblxcXCI+PHN2ZyB4bWxucz1cXFwiXCIgKyBYTUxfTkFNRV9TUEFDRSArIFwiXFxcIiB2aWV3Qm94PVxcXCIwIDAgXCIgKyBTSVpFICsgXCIgXCIgKyBTSVpFICsgXCJcXFwiIHdpZHRoPVxcXCJcIiArIFNJWkUgKyBcIlxcXCIgaGVpZ2h0PVxcXCJcIiArIFNJWkUgKyBcIlxcXCIgZm9jdXNhYmxlPVxcXCJmYWxzZVxcXCI+PHBhdGggZD1cXFwiXCIgKyAob3B0aW9ucy5hcnJvd1BhdGggfHwgUEFUSCkgKyBcIlxcXCIgLz5cIjtcbiAgICByZXR1cm4gcGFyc2VIdG1sKGFycm93KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICBpZiAocHJldiAmJiBuZXh0KSB7XG4gICAgICB2YXIgaW5kZXggPSBTcGxpZGUyLmluZGV4O1xuICAgICAgdmFyIHByZXZJbmRleCA9IENvbnRyb2xsZXIuZ2V0UHJldigpO1xuICAgICAgdmFyIG5leHRJbmRleCA9IENvbnRyb2xsZXIuZ2V0TmV4dCgpO1xuICAgICAgdmFyIHByZXZMYWJlbCA9IHByZXZJbmRleCA+IC0xICYmIGluZGV4IDwgcHJldkluZGV4ID8gaTE4bi5sYXN0IDogaTE4bi5wcmV2O1xuICAgICAgdmFyIG5leHRMYWJlbCA9IG5leHRJbmRleCA+IC0xICYmIGluZGV4ID4gbmV4dEluZGV4ID8gaTE4bi5maXJzdCA6IGkxOG4ubmV4dDtcbiAgICAgIHByZXYuZGlzYWJsZWQgPSBwcmV2SW5kZXggPCAwO1xuICAgICAgbmV4dC5kaXNhYmxlZCA9IG5leHRJbmRleCA8IDA7XG4gICAgICBzZXRBdHRyaWJ1dGUocHJldiwgQVJJQV9MQUJFTCwgcHJldkxhYmVsKTtcbiAgICAgIHNldEF0dHJpYnV0ZShuZXh0LCBBUklBX0xBQkVMLCBuZXh0TGFiZWwpO1xuICAgICAgZW1pdChFVkVOVF9BUlJPV1NfVVBEQVRFRCwgcHJldiwgbmV4dCwgcHJldkluZGV4LCBuZXh0SW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXJyb3dzOiBhcnJvd3MsXG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgdXBkYXRlOiB1cGRhdGVcbiAgfTtcbn1cblxudmFyIElOVEVSVkFMX0RBVEFfQVRUUklCVVRFID0gREFUQV9BVFRSSUJVVEUgKyBcIi1pbnRlcnZhbFwiO1xuXG5mdW5jdGlvbiBBdXRvcGxheShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNiA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U2Lm9uLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTYuYmluZCxcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2U2LmVtaXQ7XG5cbiAgdmFyIGludGVydmFsID0gUmVxdWVzdEludGVydmFsKG9wdGlvbnMuaW50ZXJ2YWwsIFNwbGlkZTIuZ28uYmluZChTcGxpZGUyLCBcIj5cIiksIG9uQW5pbWF0aW9uRnJhbWUpO1xuICB2YXIgaXNQYXVzZWQgPSBpbnRlcnZhbC5pc1BhdXNlZDtcbiAgdmFyIEVsZW1lbnRzID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICBfQ29tcG9uZW50czIkRWxlbWVudHM0ID0gQ29tcG9uZW50czIuRWxlbWVudHMsXG4gICAgICByb290ID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzNC5yb290LFxuICAgICAgdG9nZ2xlID0gX0NvbXBvbmVudHMyJEVsZW1lbnRzNC50b2dnbGU7XG4gIHZhciBhdXRvcGxheSA9IG9wdGlvbnMuYXV0b3BsYXk7XG4gIHZhciBob3ZlcmVkO1xuICB2YXIgZm9jdXNlZDtcbiAgdmFyIHN0b3BwZWQgPSBhdXRvcGxheSA9PT0gXCJwYXVzZVwiO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChhdXRvcGxheSkge1xuICAgICAgbGlzdGVuKCk7XG4gICAgICB0b2dnbGUgJiYgc2V0QXR0cmlidXRlKHRvZ2dsZSwgQVJJQV9DT05UUk9MUywgRWxlbWVudHMudHJhY2suaWQpO1xuICAgICAgc3RvcHBlZCB8fCBwbGF5KCk7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0ZW4oKSB7XG4gICAgaWYgKG9wdGlvbnMucGF1c2VPbkhvdmVyKSB7XG4gICAgICBiaW5kKHJvb3QsIFwibW91c2VlbnRlciBtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGhvdmVyZWQgPSBlLnR5cGUgPT09IFwibW91c2VlbnRlclwiO1xuICAgICAgICBhdXRvVG9nZ2xlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wYXVzZU9uRm9jdXMpIHtcbiAgICAgIGJpbmQocm9vdCwgXCJmb2N1c2luIGZvY3Vzb3V0XCIsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGZvY3VzZWQgPSBlLnR5cGUgPT09IFwiZm9jdXNpblwiO1xuICAgICAgICBhdXRvVG9nZ2xlKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodG9nZ2xlKSB7XG4gICAgICBiaW5kKHRvZ2dsZSwgXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0b3BwZWQgPyBwbGF5KCkgOiBwYXVzZSh0cnVlKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uKFtFVkVOVF9NT1ZFLCBFVkVOVF9TQ1JPTEwsIEVWRU5UX1JFRlJFU0hdLCBpbnRlcnZhbC5yZXdpbmQpO1xuICAgIG9uKEVWRU5UX01PVkUsIG9uTW92ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBwbGF5KCkge1xuICAgIGlmIChpc1BhdXNlZCgpICYmIENvbXBvbmVudHMyLlNsaWRlcy5pc0Vub3VnaCgpKSB7XG4gICAgICBpbnRlcnZhbC5zdGFydCghb3B0aW9ucy5yZXNldFByb2dyZXNzKTtcbiAgICAgIGZvY3VzZWQgPSBob3ZlcmVkID0gc3RvcHBlZCA9IGZhbHNlO1xuICAgICAgdXBkYXRlKCk7XG4gICAgICBlbWl0KEVWRU5UX0FVVE9QTEFZX1BMQVkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhdXNlKHN0b3ApIHtcbiAgICBpZiAoc3RvcCA9PT0gdm9pZCAwKSB7XG4gICAgICBzdG9wID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBzdG9wcGVkID0gISFzdG9wO1xuICAgIHVwZGF0ZSgpO1xuXG4gICAgaWYgKCFpc1BhdXNlZCgpKSB7XG4gICAgICBpbnRlcnZhbC5wYXVzZSgpO1xuICAgICAgZW1pdChFVkVOVF9BVVRPUExBWV9QQVVTRSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYXV0b1RvZ2dsZSgpIHtcbiAgICBpZiAoIXN0b3BwZWQpIHtcbiAgICAgIGhvdmVyZWQgfHwgZm9jdXNlZCA/IHBhdXNlKGZhbHNlKSA6IHBsYXkoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgaWYgKHRvZ2dsZSkge1xuICAgICAgdG9nZ2xlQ2xhc3ModG9nZ2xlLCBDTEFTU19BQ1RJVkUsICFzdG9wcGVkKTtcbiAgICAgIHNldEF0dHJpYnV0ZSh0b2dnbGUsIEFSSUFfTEFCRUwsIG9wdGlvbnMuaTE4bltzdG9wcGVkID8gXCJwbGF5XCIgOiBcInBhdXNlXCJdKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkFuaW1hdGlvbkZyYW1lKHJhdGUpIHtcbiAgICB2YXIgYmFyID0gRWxlbWVudHMuYmFyO1xuICAgIGJhciAmJiBzdHlsZShiYXIsIFwid2lkdGhcIiwgcmF0ZSAqIDEwMCArIFwiJVwiKTtcbiAgICBlbWl0KEVWRU5UX0FVVE9QTEFZX1BMQVlJTkcsIHJhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Nb3ZlKGluZGV4KSB7XG4gICAgdmFyIFNsaWRlID0gQ29tcG9uZW50czIuU2xpZGVzLmdldEF0KGluZGV4KTtcbiAgICBpbnRlcnZhbC5zZXQoU2xpZGUgJiYgK2dldEF0dHJpYnV0ZShTbGlkZS5zbGlkZSwgSU5URVJWQUxfREFUQV9BVFRSSUJVVEUpIHx8IG9wdGlvbnMuaW50ZXJ2YWwpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogaW50ZXJ2YWwuY2FuY2VsLFxuICAgIHBsYXk6IHBsYXksXG4gICAgcGF1c2U6IHBhdXNlLFxuICAgIGlzUGF1c2VkOiBpc1BhdXNlZFxuICB9O1xufVxuXG5mdW5jdGlvbiBDb3ZlcihTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlNyA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2U3Lm9uO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGlmIChvcHRpb25zLmNvdmVyKSB7XG4gICAgICBvbihFVkVOVF9MQVpZTE9BRF9MT0FERUQsIGFwcGx5KHRvZ2dsZSwgdHJ1ZSkpO1xuICAgICAgb24oW0VWRU5UX01PVU5URUQsIEVWRU5UX1VQREFURUQsIEVWRU5UX1JFRlJFU0hdLCBhcHBseShjb3ZlciwgdHJ1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNvdmVyKGNvdmVyMikge1xuICAgIENvbXBvbmVudHMyLlNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChTbGlkZSkge1xuICAgICAgdmFyIGltZyA9IGNoaWxkKFNsaWRlLmNvbnRhaW5lciB8fCBTbGlkZS5zbGlkZSwgXCJpbWdcIik7XG5cbiAgICAgIGlmIChpbWcgJiYgaW1nLnNyYykge1xuICAgICAgICB0b2dnbGUoY292ZXIyLCBpbWcsIFNsaWRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvZ2dsZShjb3ZlcjIsIGltZywgU2xpZGUpIHtcbiAgICBTbGlkZS5zdHlsZShcImJhY2tncm91bmRcIiwgY292ZXIyID8gXCJjZW50ZXIvY292ZXIgbm8tcmVwZWF0IHVybChcXFwiXCIgKyBpbWcuc3JjICsgXCJcXFwiKVwiIDogXCJcIiwgdHJ1ZSk7XG4gICAgZGlzcGxheShpbWcsIGNvdmVyMiA/IFwibm9uZVwiIDogXCJcIik7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBhcHBseShjb3ZlciwgZmFsc2UpXG4gIH07XG59XG5cbnZhciBCT1VOQ0VfRElGRl9USFJFU0hPTEQgPSAxMDtcbnZhciBCT1VOQ0VfRFVSQVRJT04gPSA2MDA7XG52YXIgRlJJQ1RJT05fRkFDVE9SID0gMC42O1xudmFyIEJBU0VfVkVMT0NJVFkgPSAxLjU7XG52YXIgTUlOX0RVUkFUSU9OID0gODAwO1xuXG5mdW5jdGlvbiBTY3JvbGwoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIF9FdmVudEludGVyZmFjZTggPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlOC5vbixcbiAgICAgIGVtaXQgPSBfRXZlbnRJbnRlcmZhY2U4LmVtaXQ7XG5cbiAgdmFyIHNldCA9IFNwbGlkZTIuc3RhdGUuc2V0O1xuICB2YXIgTW92ZSA9IENvbXBvbmVudHMyLk1vdmU7XG4gIHZhciBnZXRQb3NpdGlvbiA9IE1vdmUuZ2V0UG9zaXRpb24sXG4gICAgICBnZXRMaW1pdCA9IE1vdmUuZ2V0TGltaXQsXG4gICAgICBleGNlZWRlZExpbWl0ID0gTW92ZS5leGNlZWRlZExpbWl0LFxuICAgICAgdHJhbnNsYXRlID0gTW92ZS50cmFuc2xhdGU7XG4gIHZhciBpc1NsaWRlID0gU3BsaWRlMi5pcyhTTElERSk7XG4gIHZhciBpbnRlcnZhbDtcbiAgdmFyIGNhbGxiYWNrO1xuICB2YXIgZnJpY3Rpb24gPSAxO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIG9uKEVWRU5UX01PVkUsIGNsZWFyKTtcbiAgICBvbihbRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVGUkVTSF0sIGNhbmNlbCk7XG4gIH1cblxuICBmdW5jdGlvbiBzY3JvbGwoZGVzdGluYXRpb24sIGR1cmF0aW9uLCBzbmFwLCBvblNjcm9sbGVkLCBub0NvbnN0cmFpbikge1xuICAgIHZhciBmcm9tID0gZ2V0UG9zaXRpb24oKTtcbiAgICBjbGVhcigpO1xuXG4gICAgaWYgKHNuYXAgJiYgKCFpc1NsaWRlIHx8ICFleGNlZWRlZExpbWl0KCkpKSB7XG4gICAgICB2YXIgc2l6ZSA9IENvbXBvbmVudHMyLkxheW91dC5zbGlkZXJTaXplKCk7XG4gICAgICB2YXIgb2Zmc2V0ID0gc2lnbihkZXN0aW5hdGlvbikgKiBzaXplICogZmxvb3IoYWJzKGRlc3RpbmF0aW9uKSAvIHNpemUpIHx8IDA7XG4gICAgICBkZXN0aW5hdGlvbiA9IE1vdmUudG9Qb3NpdGlvbihDb21wb25lbnRzMi5Db250cm9sbGVyLnRvRGVzdChkZXN0aW5hdGlvbiAlIHNpemUpKSArIG9mZnNldDtcbiAgICB9XG5cbiAgICB2YXIgbm9EaXN0YW5jZSA9IGFwcHJveGltYXRlbHlFcXVhbChmcm9tLCBkZXN0aW5hdGlvbiwgMSk7XG4gICAgZnJpY3Rpb24gPSAxO1xuICAgIGR1cmF0aW9uID0gbm9EaXN0YW5jZSA/IDAgOiBkdXJhdGlvbiB8fCBtYXgoYWJzKGRlc3RpbmF0aW9uIC0gZnJvbSkgLyBCQVNFX1ZFTE9DSVRZLCBNSU5fRFVSQVRJT04pO1xuICAgIGNhbGxiYWNrID0gb25TY3JvbGxlZDtcbiAgICBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChkdXJhdGlvbiwgb25FbmQsIGFwcGx5KHVwZGF0ZSwgZnJvbSwgZGVzdGluYXRpb24sIG5vQ29uc3RyYWluKSwgMSk7XG4gICAgc2V0KFNDUk9MTElORyk7XG4gICAgZW1pdChFVkVOVF9TQ1JPTEwpO1xuICAgIGludGVydmFsLnN0YXJ0KCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbkVuZCgpIHtcbiAgICBzZXQoSURMRSk7XG4gICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICBlbWl0KEVWRU5UX1NDUk9MTEVEKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZShmcm9tLCB0bywgbm9Db25zdHJhaW4sIHJhdGUpIHtcbiAgICB2YXIgcG9zaXRpb24gPSBnZXRQb3NpdGlvbigpO1xuICAgIHZhciB0YXJnZXQgPSBmcm9tICsgKHRvIC0gZnJvbSkgKiBlYXNpbmcocmF0ZSk7XG4gICAgdmFyIGRpZmYgPSAodGFyZ2V0IC0gcG9zaXRpb24pICogZnJpY3Rpb247XG4gICAgdHJhbnNsYXRlKHBvc2l0aW9uICsgZGlmZik7XG5cbiAgICBpZiAoaXNTbGlkZSAmJiAhbm9Db25zdHJhaW4gJiYgZXhjZWVkZWRMaW1pdCgpKSB7XG4gICAgICBmcmljdGlvbiAqPSBGUklDVElPTl9GQUNUT1I7XG5cbiAgICAgIGlmIChhYnMoZGlmZikgPCBCT1VOQ0VfRElGRl9USFJFU0hPTEQpIHtcbiAgICAgICAgc2Nyb2xsKGdldExpbWl0KGV4Y2VlZGVkTGltaXQodHJ1ZSkpLCBCT1VOQ0VfRFVSQVRJT04sIGZhbHNlLCBjYWxsYmFjaywgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2xlYXIoKSB7XG4gICAgaWYgKGludGVydmFsKSB7XG4gICAgICBpbnRlcnZhbC5jYW5jZWwoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKGludGVydmFsICYmICFpbnRlcnZhbC5pc1BhdXNlZCgpKSB7XG4gICAgICBjbGVhcigpO1xuICAgICAgb25FbmQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlYXNpbmcodCkge1xuICAgIHZhciBlYXNpbmdGdW5jID0gb3B0aW9ucy5lYXNpbmdGdW5jO1xuICAgIHJldHVybiBlYXNpbmdGdW5jID8gZWFzaW5nRnVuYyh0KSA6IDEgLSBNYXRoLnBvdygxIC0gdCwgNCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBjbGVhcixcbiAgICBzY3JvbGw6IHNjcm9sbCxcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufVxuXG52YXIgU0NST0xMX0xJU1RFTkVSX09QVElPTlMgPSB7XG4gIHBhc3NpdmU6IGZhbHNlLFxuICBjYXB0dXJlOiB0cnVlXG59O1xuXG5mdW5jdGlvbiBEcmFnKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2U5ID0gRXZlbnRJbnRlcmZhY2UoU3BsaWRlMiksXG4gICAgICBvbiA9IF9FdmVudEludGVyZmFjZTkub24sXG4gICAgICBlbWl0ID0gX0V2ZW50SW50ZXJmYWNlOS5lbWl0LFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTkuYmluZCxcbiAgICAgIHVuYmluZCA9IF9FdmVudEludGVyZmFjZTkudW5iaW5kO1xuXG4gIHZhciBzdGF0ZSA9IFNwbGlkZTIuc3RhdGU7XG4gIHZhciBNb3ZlID0gQ29tcG9uZW50czIuTW92ZSxcbiAgICAgIFNjcm9sbCA9IENvbXBvbmVudHMyLlNjcm9sbCxcbiAgICAgIENvbnRyb2xsZXIgPSBDb21wb25lbnRzMi5Db250cm9sbGVyLFxuICAgICAgdHJhY2sgPSBDb21wb25lbnRzMi5FbGVtZW50cy50cmFjayxcbiAgICAgIHJlZHVjZSA9IENvbXBvbmVudHMyLk1lZGlhLnJlZHVjZTtcbiAgdmFyIF9Db21wb25lbnRzMiREaXJlY3RpbzIgPSBDb21wb25lbnRzMi5EaXJlY3Rpb24sXG4gICAgICByZXNvbHZlID0gX0NvbXBvbmVudHMyJERpcmVjdGlvMi5yZXNvbHZlLFxuICAgICAgb3JpZW50ID0gX0NvbXBvbmVudHMyJERpcmVjdGlvMi5vcmllbnQ7XG4gIHZhciBnZXRQb3NpdGlvbiA9IE1vdmUuZ2V0UG9zaXRpb24sXG4gICAgICBleGNlZWRlZExpbWl0ID0gTW92ZS5leGNlZWRlZExpbWl0O1xuICB2YXIgYmFzZVBvc2l0aW9uO1xuICB2YXIgYmFzZUV2ZW50O1xuICB2YXIgcHJldkJhc2VFdmVudDtcbiAgdmFyIGlzRnJlZTtcbiAgdmFyIGRyYWdnaW5nO1xuICB2YXIgZXhjZWVkZWQgPSBmYWxzZTtcbiAgdmFyIGNsaWNrUHJldmVudGVkO1xuICB2YXIgZGlzYWJsZWQ7XG4gIHZhciB0YXJnZXQ7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgYmluZCh0cmFjaywgUE9JTlRFUl9NT1ZFX0VWRU5UUywgbm9vcCwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIGJpbmQodHJhY2ssIFBPSU5URVJfVVBfRVZFTlRTLCBub29wLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgYmluZCh0cmFjaywgUE9JTlRFUl9ET1dOX0VWRU5UUywgb25Qb2ludGVyRG93biwgU0NST0xMX0xJU1RFTkVSX09QVElPTlMpO1xuICAgIGJpbmQodHJhY2ssIFwiY2xpY2tcIiwgb25DbGljaywge1xuICAgICAgY2FwdHVyZTogdHJ1ZVxuICAgIH0pO1xuICAgIGJpbmQodHJhY2ssIFwiZHJhZ3N0YXJ0XCIsIHByZXZlbnQpO1xuICAgIG9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9VUERBVEVEXSwgaW5pdCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBkcmFnID0gb3B0aW9ucy5kcmFnO1xuICAgIGRpc2FibGUoIWRyYWcpO1xuICAgIGlzRnJlZSA9IGRyYWcgPT09IFwiZnJlZVwiO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Qb2ludGVyRG93bihlKSB7XG4gICAgY2xpY2tQcmV2ZW50ZWQgPSBmYWxzZTtcblxuICAgIGlmICghZGlzYWJsZWQpIHtcbiAgICAgIHZhciBpc1RvdWNoID0gaXNUb3VjaEV2ZW50KGUpO1xuXG4gICAgICBpZiAoaXNEcmFnZ2FibGUoZS50YXJnZXQpICYmIChpc1RvdWNoIHx8ICFlLmJ1dHRvbikpIHtcbiAgICAgICAgaWYgKCFDb250cm9sbGVyLmlzQnVzeSgpKSB7XG4gICAgICAgICAgdGFyZ2V0ID0gaXNUb3VjaCA/IHRyYWNrIDogd2luZG93O1xuICAgICAgICAgIGRyYWdnaW5nID0gc3RhdGUuaXMoW01PVklORywgU0NST0xMSU5HXSk7XG4gICAgICAgICAgcHJldkJhc2VFdmVudCA9IG51bGw7XG4gICAgICAgICAgYmluZCh0YXJnZXQsIFBPSU5URVJfTU9WRV9FVkVOVFMsIG9uUG9pbnRlck1vdmUsIFNDUk9MTF9MSVNURU5FUl9PUFRJT05TKTtcbiAgICAgICAgICBiaW5kKHRhcmdldCwgUE9JTlRFUl9VUF9FVkVOVFMsIG9uUG9pbnRlclVwLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgICAgICAgTW92ZS5jYW5jZWwoKTtcbiAgICAgICAgICBTY3JvbGwuY2FuY2VsKCk7XG4gICAgICAgICAgc2F2ZShlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcmV2ZW50KGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Qb2ludGVyTW92ZShlKSB7XG4gICAgaWYgKCFzdGF0ZS5pcyhEUkFHR0lORykpIHtcbiAgICAgIHN0YXRlLnNldChEUkFHR0lORyk7XG4gICAgICBlbWl0KEVWRU5UX0RSQUcpO1xuICAgIH1cblxuICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgIGlmIChkcmFnZ2luZykge1xuICAgICAgICBNb3ZlLnRyYW5zbGF0ZShiYXNlUG9zaXRpb24gKyBjb25zdHJhaW4oZGlmZkNvb3JkKGUpKSk7XG4gICAgICAgIHZhciBleHBpcmVkID0gZGlmZlRpbWUoZSkgPiBMT0dfSU5URVJWQUw7XG4gICAgICAgIHZhciBoYXNFeGNlZWRlZCA9IGV4Y2VlZGVkICE9PSAoZXhjZWVkZWQgPSBleGNlZWRlZExpbWl0KCkpO1xuXG4gICAgICAgIGlmIChleHBpcmVkIHx8IGhhc0V4Y2VlZGVkKSB7XG4gICAgICAgICAgc2F2ZShlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNsaWNrUHJldmVudGVkID0gdHJ1ZTtcbiAgICAgICAgZW1pdChFVkVOVF9EUkFHR0lORyk7XG4gICAgICAgIHByZXZlbnQoZSk7XG4gICAgICB9IGVsc2UgaWYgKGlzU2xpZGVyRGlyZWN0aW9uKGUpKSB7XG4gICAgICAgIGRyYWdnaW5nID0gc2hvdWxkU3RhcnQoZSk7XG4gICAgICAgIHByZXZlbnQoZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25Qb2ludGVyVXAoZSkge1xuICAgIGlmIChzdGF0ZS5pcyhEUkFHR0lORykpIHtcbiAgICAgIHN0YXRlLnNldChJRExFKTtcbiAgICAgIGVtaXQoRVZFTlRfRFJBR0dFRCk7XG4gICAgfVxuXG4gICAgaWYgKGRyYWdnaW5nKSB7XG4gICAgICBtb3ZlKGUpO1xuICAgICAgcHJldmVudChlKTtcbiAgICB9XG5cbiAgICB1bmJpbmQodGFyZ2V0LCBQT0lOVEVSX01PVkVfRVZFTlRTLCBvblBvaW50ZXJNb3ZlKTtcbiAgICB1bmJpbmQodGFyZ2V0LCBQT0lOVEVSX1VQX0VWRU5UUywgb25Qb2ludGVyVXApO1xuICAgIGRyYWdnaW5nID0gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgICBpZiAoIWRpc2FibGVkICYmIGNsaWNrUHJldmVudGVkKSB7XG4gICAgICBwcmV2ZW50KGUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNhdmUoZSkge1xuICAgIHByZXZCYXNlRXZlbnQgPSBiYXNlRXZlbnQ7XG4gICAgYmFzZUV2ZW50ID0gZTtcbiAgICBiYXNlUG9zaXRpb24gPSBnZXRQb3NpdGlvbigpO1xuICB9XG5cbiAgZnVuY3Rpb24gbW92ZShlKSB7XG4gICAgdmFyIHZlbG9jaXR5ID0gY29tcHV0ZVZlbG9jaXR5KGUpO1xuICAgIHZhciBkZXN0aW5hdGlvbiA9IGNvbXB1dGVEZXN0aW5hdGlvbih2ZWxvY2l0eSk7XG4gICAgdmFyIHJld2luZCA9IG9wdGlvbnMucmV3aW5kICYmIG9wdGlvbnMucmV3aW5kQnlEcmFnO1xuICAgIHJlZHVjZShmYWxzZSk7XG5cbiAgICBpZiAoaXNGcmVlKSB7XG4gICAgICBDb250cm9sbGVyLnNjcm9sbChkZXN0aW5hdGlvbiwgMCwgb3B0aW9ucy5zbmFwKTtcbiAgICB9IGVsc2UgaWYgKFNwbGlkZTIuaXMoRkFERSkpIHtcbiAgICAgIENvbnRyb2xsZXIuZ28ob3JpZW50KHNpZ24odmVsb2NpdHkpKSA8IDAgPyByZXdpbmQgPyBcIjxcIiA6IFwiLVwiIDogcmV3aW5kID8gXCI+XCIgOiBcIitcIik7XG4gICAgfSBlbHNlIGlmIChTcGxpZGUyLmlzKFNMSURFKSAmJiBleGNlZWRlZCAmJiByZXdpbmQpIHtcbiAgICAgIENvbnRyb2xsZXIuZ28oZXhjZWVkZWRMaW1pdCh0cnVlKSA/IFwiPlwiIDogXCI8XCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBDb250cm9sbGVyLmdvKENvbnRyb2xsZXIudG9EZXN0KGRlc3RpbmF0aW9uKSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgcmVkdWNlKHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkU3RhcnQoZSkge1xuICAgIHZhciB0aHJlc2hvbGRzID0gb3B0aW9ucy5kcmFnTWluVGhyZXNob2xkO1xuICAgIHZhciBpc09iaiA9IGlzT2JqZWN0KHRocmVzaG9sZHMpO1xuICAgIHZhciBtb3VzZSA9IGlzT2JqICYmIHRocmVzaG9sZHMubW91c2UgfHwgMDtcbiAgICB2YXIgdG91Y2ggPSAoaXNPYmogPyB0aHJlc2hvbGRzLnRvdWNoIDogK3RocmVzaG9sZHMpIHx8IDEwO1xuICAgIHJldHVybiBhYnMoZGlmZkNvb3JkKGUpKSA+IChpc1RvdWNoRXZlbnQoZSkgPyB0b3VjaCA6IG1vdXNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzU2xpZGVyRGlyZWN0aW9uKGUpIHtcbiAgICByZXR1cm4gYWJzKGRpZmZDb29yZChlKSkgPiBhYnMoZGlmZkNvb3JkKGUsIHRydWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVWZWxvY2l0eShlKSB7XG4gICAgaWYgKFNwbGlkZTIuaXMoTE9PUCkgfHwgIWV4Y2VlZGVkKSB7XG4gICAgICB2YXIgdGltZSA9IGRpZmZUaW1lKGUpO1xuXG4gICAgICBpZiAodGltZSAmJiB0aW1lIDwgTE9HX0lOVEVSVkFMKSB7XG4gICAgICAgIHJldHVybiBkaWZmQ29vcmQoZSkgLyB0aW1lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZURlc3RpbmF0aW9uKHZlbG9jaXR5KSB7XG4gICAgcmV0dXJuIGdldFBvc2l0aW9uKCkgKyBzaWduKHZlbG9jaXR5KSAqIG1pbihhYnModmVsb2NpdHkpICogKG9wdGlvbnMuZmxpY2tQb3dlciB8fCA2MDApLCBpc0ZyZWUgPyBJbmZpbml0eSA6IENvbXBvbmVudHMyLkxheW91dC5saXN0U2l6ZSgpICogKG9wdGlvbnMuZmxpY2tNYXhQYWdlcyB8fCAxKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkaWZmQ29vcmQoZSwgb3J0aG9nb25hbCkge1xuICAgIHJldHVybiBjb29yZE9mKGUsIG9ydGhvZ29uYWwpIC0gY29vcmRPZihnZXRCYXNlRXZlbnQoZSksIG9ydGhvZ29uYWwpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlmZlRpbWUoZSkge1xuICAgIHJldHVybiB0aW1lT2YoZSkgLSB0aW1lT2YoZ2V0QmFzZUV2ZW50KGUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJhc2VFdmVudChlKSB7XG4gICAgcmV0dXJuIGJhc2VFdmVudCA9PT0gZSAmJiBwcmV2QmFzZUV2ZW50IHx8IGJhc2VFdmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvb3JkT2YoZSwgb3J0aG9nb25hbCkge1xuICAgIHJldHVybiAoaXNUb3VjaEV2ZW50KGUpID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGUpW1wicGFnZVwiICsgcmVzb2x2ZShvcnRob2dvbmFsID8gXCJZXCIgOiBcIlhcIildO1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3RyYWluKGRpZmYpIHtcbiAgICByZXR1cm4gZGlmZiAvIChleGNlZWRlZCAmJiBTcGxpZGUyLmlzKFNMSURFKSA/IEZSSUNUSU9OIDogMSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc0RyYWdnYWJsZSh0YXJnZXQyKSB7XG4gICAgdmFyIG5vRHJhZyA9IG9wdGlvbnMubm9EcmFnO1xuICAgIHJldHVybiAhbWF0Y2hlcyh0YXJnZXQyLCBcIi5cIiArIENMQVNTX1BBR0lOQVRJT05fUEFHRSArIFwiLCAuXCIgKyBDTEFTU19BUlJPVykgJiYgKCFub0RyYWcgfHwgIW1hdGNoZXModGFyZ2V0Miwgbm9EcmFnKSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc1RvdWNoRXZlbnQoZSkge1xuICAgIHJldHVybiB0eXBlb2YgVG91Y2hFdmVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBlIGluc3RhbmNlb2YgVG91Y2hFdmVudDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRHJhZ2dpbmcoKSB7XG4gICAgcmV0dXJuIGRyYWdnaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzYWJsZSh2YWx1ZSkge1xuICAgIGRpc2FibGVkID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG1vdW50OiBtb3VudCxcbiAgICBkaXNhYmxlOiBkaXNhYmxlLFxuICAgIGlzRHJhZ2dpbmc6IGlzRHJhZ2dpbmdcbiAgfTtcbn1cblxudmFyIE5PUk1BTElaQVRJT05fTUFQID0ge1xuICBTcGFjZWJhcjogXCIgXCIsXG4gIFJpZ2h0OiBBUlJPV19SSUdIVCxcbiAgTGVmdDogQVJST1dfTEVGVCxcbiAgVXA6IEFSUk9XX1VQLFxuICBEb3duOiBBUlJPV19ET1dOXG59O1xuXG5mdW5jdGlvbiBub3JtYWxpemVLZXkoa2V5KSB7XG4gIGtleSA9IGlzU3RyaW5nKGtleSkgPyBrZXkgOiBrZXkua2V5O1xuICByZXR1cm4gTk9STUFMSVpBVElPTl9NQVBba2V5XSB8fCBrZXk7XG59XG5cbnZhciBLRVlCT0FSRF9FVkVOVCA9IFwia2V5ZG93blwiO1xuXG5mdW5jdGlvbiBLZXlib2FyZChTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTAgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTAub24sXG4gICAgICBiaW5kID0gX0V2ZW50SW50ZXJmYWNlMTAuYmluZCxcbiAgICAgIHVuYmluZCA9IF9FdmVudEludGVyZmFjZTEwLnVuYmluZDtcblxuICB2YXIgcm9vdCA9IFNwbGlkZTIucm9vdDtcbiAgdmFyIHJlc29sdmUgPSBDb21wb25lbnRzMi5EaXJlY3Rpb24ucmVzb2x2ZTtcbiAgdmFyIHRhcmdldDtcbiAgdmFyIGRpc2FibGVkO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGluaXQoKTtcbiAgICBvbihFVkVOVF9VUERBVEVELCBkZXN0cm95KTtcbiAgICBvbihFVkVOVF9VUERBVEVELCBpbml0KTtcbiAgICBvbihFVkVOVF9NT1ZFLCBvbk1vdmUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIga2V5Ym9hcmQgPSBvcHRpb25zLmtleWJvYXJkO1xuXG4gICAgaWYgKGtleWJvYXJkKSB7XG4gICAgICB0YXJnZXQgPSBrZXlib2FyZCA9PT0gXCJnbG9iYWxcIiA/IHdpbmRvdyA6IHJvb3Q7XG4gICAgICBiaW5kKHRhcmdldCwgS0VZQk9BUkRfRVZFTlQsIG9uS2V5ZG93bik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICB1bmJpbmQodGFyZ2V0LCBLRVlCT0FSRF9FVkVOVCk7XG4gIH1cblxuICBmdW5jdGlvbiBkaXNhYmxlKHZhbHVlKSB7XG4gICAgZGlzYWJsZWQgPSB2YWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG9uTW92ZSgpIHtcbiAgICB2YXIgX2Rpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgZGlzYWJsZWQgPSB0cnVlO1xuICAgIG5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGRpc2FibGVkID0gX2Rpc2FibGVkO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gb25LZXlkb3duKGUpIHtcbiAgICBpZiAoIWRpc2FibGVkKSB7XG4gICAgICB2YXIga2V5ID0gbm9ybWFsaXplS2V5KGUpO1xuXG4gICAgICBpZiAoa2V5ID09PSByZXNvbHZlKEFSUk9XX0xFRlQpKSB7XG4gICAgICAgIFNwbGlkZTIuZ28oXCI8XCIpO1xuICAgICAgfSBlbHNlIGlmIChrZXkgPT09IHJlc29sdmUoQVJST1dfUklHSFQpKSB7XG4gICAgICAgIFNwbGlkZTIuZ28oXCI+XCIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIGRlc3Ryb3k6IGRlc3Ryb3ksXG4gICAgZGlzYWJsZTogZGlzYWJsZVxuICB9O1xufVxuXG52YXIgU1JDX0RBVEFfQVRUUklCVVRFID0gREFUQV9BVFRSSUJVVEUgKyBcIi1sYXp5XCI7XG52YXIgU1JDU0VUX0RBVEFfQVRUUklCVVRFID0gU1JDX0RBVEFfQVRUUklCVVRFICsgXCItc3Jjc2V0XCI7XG52YXIgSU1BR0VfU0VMRUNUT1IgPSBcIltcIiArIFNSQ19EQVRBX0FUVFJJQlVURSArIFwiXSwgW1wiICsgU1JDU0VUX0RBVEFfQVRUUklCVVRFICsgXCJdXCI7XG5cbmZ1bmN0aW9uIExhenlMb2FkKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UxMSA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgb24gPSBfRXZlbnRJbnRlcmZhY2UxMS5vbixcbiAgICAgIG9mZiA9IF9FdmVudEludGVyZmFjZTExLm9mZixcbiAgICAgIGJpbmQgPSBfRXZlbnRJbnRlcmZhY2UxMS5iaW5kLFxuICAgICAgZW1pdCA9IF9FdmVudEludGVyZmFjZTExLmVtaXQ7XG5cbiAgdmFyIGlzU2VxdWVudGlhbCA9IG9wdGlvbnMubGF6eUxvYWQgPT09IFwic2VxdWVudGlhbFwiO1xuICB2YXIgZXZlbnRzID0gW0VWRU5UX01PVkVELCBFVkVOVF9TQ1JPTExFRF07XG4gIHZhciBlbnRyaWVzID0gW107XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKG9wdGlvbnMubGF6eUxvYWQpIHtcbiAgICAgIGluaXQoKTtcbiAgICAgIG9uKEVWRU5UX1JFRlJFU0gsIGluaXQpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgZW1wdHkoZW50cmllcyk7XG4gICAgcmVnaXN0ZXIoKTtcblxuICAgIGlmIChpc1NlcXVlbnRpYWwpIHtcbiAgICAgIGxvYWROZXh0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9mZihldmVudHMpO1xuICAgICAgb24oZXZlbnRzLCBjaGVjayk7XG4gICAgICBjaGVjaygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlZ2lzdGVyKCkge1xuICAgIENvbXBvbmVudHMyLlNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChTbGlkZSkge1xuICAgICAgcXVlcnlBbGwoU2xpZGUuc2xpZGUsIElNQUdFX1NFTEVDVE9SKS5mb3JFYWNoKGZ1bmN0aW9uIChpbWcpIHtcbiAgICAgICAgdmFyIHNyYyA9IGdldEF0dHJpYnV0ZShpbWcsIFNSQ19EQVRBX0FUVFJJQlVURSk7XG4gICAgICAgIHZhciBzcmNzZXQgPSBnZXRBdHRyaWJ1dGUoaW1nLCBTUkNTRVRfREFUQV9BVFRSSUJVVEUpO1xuXG4gICAgICAgIGlmIChzcmMgIT09IGltZy5zcmMgfHwgc3Jjc2V0ICE9PSBpbWcuc3Jjc2V0KSB7XG4gICAgICAgICAgdmFyIGNsYXNzTmFtZSA9IG9wdGlvbnMuY2xhc3Nlcy5zcGlubmVyO1xuICAgICAgICAgIHZhciBwYXJlbnQgPSBpbWcucGFyZW50RWxlbWVudDtcbiAgICAgICAgICB2YXIgc3Bpbm5lciA9IGNoaWxkKHBhcmVudCwgXCIuXCIgKyBjbGFzc05hbWUpIHx8IGNyZWF0ZShcInNwYW5cIiwgY2xhc3NOYW1lLCBwYXJlbnQpO1xuICAgICAgICAgIGVudHJpZXMucHVzaChbaW1nLCBTbGlkZSwgc3Bpbm5lcl0pO1xuICAgICAgICAgIGltZy5zcmMgfHwgZGlzcGxheShpbWcsIFwibm9uZVwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVjaygpIHtcbiAgICBlbnRyaWVzID0gZW50cmllcy5maWx0ZXIoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBkaXN0YW5jZSA9IG9wdGlvbnMucGVyUGFnZSAqICgob3B0aW9ucy5wcmVsb2FkUGFnZXMgfHwgMSkgKyAxKSAtIDE7XG4gICAgICByZXR1cm4gZGF0YVsxXS5pc1dpdGhpbihTcGxpZGUyLmluZGV4LCBkaXN0YW5jZSkgPyBsb2FkKGRhdGEpIDogdHJ1ZTtcbiAgICB9KTtcbiAgICBlbnRyaWVzLmxlbmd0aCB8fCBvZmYoZXZlbnRzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWQoZGF0YSkge1xuICAgIHZhciBpbWcgPSBkYXRhWzBdO1xuICAgIGFkZENsYXNzKGRhdGFbMV0uc2xpZGUsIENMQVNTX0xPQURJTkcpO1xuICAgIGJpbmQoaW1nLCBcImxvYWQgZXJyb3JcIiwgYXBwbHkob25Mb2FkLCBkYXRhKSk7XG4gICAgc2V0QXR0cmlidXRlKGltZywgXCJzcmNcIiwgZ2V0QXR0cmlidXRlKGltZywgU1JDX0RBVEFfQVRUUklCVVRFKSk7XG4gICAgc2V0QXR0cmlidXRlKGltZywgXCJzcmNzZXRcIiwgZ2V0QXR0cmlidXRlKGltZywgU1JDU0VUX0RBVEFfQVRUUklCVVRFKSk7XG4gICAgcmVtb3ZlQXR0cmlidXRlKGltZywgU1JDX0RBVEFfQVRUUklCVVRFKTtcbiAgICByZW1vdmVBdHRyaWJ1dGUoaW1nLCBTUkNTRVRfREFUQV9BVFRSSUJVVEUpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Mb2FkKGRhdGEsIGUpIHtcbiAgICB2YXIgaW1nID0gZGF0YVswXSxcbiAgICAgICAgU2xpZGUgPSBkYXRhWzFdO1xuICAgIHJlbW92ZUNsYXNzKFNsaWRlLnNsaWRlLCBDTEFTU19MT0FESU5HKTtcblxuICAgIGlmIChlLnR5cGUgIT09IFwiZXJyb3JcIikge1xuICAgICAgcmVtb3ZlKGRhdGFbMl0pO1xuICAgICAgZGlzcGxheShpbWcsIFwiXCIpO1xuICAgICAgZW1pdChFVkVOVF9MQVpZTE9BRF9MT0FERUQsIGltZywgU2xpZGUpO1xuICAgICAgZW1pdChFVkVOVF9SRVNJWkUpO1xuICAgIH1cblxuICAgIGlzU2VxdWVudGlhbCAmJiBsb2FkTmV4dCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZE5leHQoKSB7XG4gICAgZW50cmllcy5sZW5ndGggJiYgbG9hZChlbnRyaWVzLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogYXBwbHkoZW1wdHksIGVudHJpZXMpLFxuICAgIGNoZWNrOiBjaGVja1xuICB9O1xufVxuXG5mdW5jdGlvbiBQYWdpbmF0aW9uKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBldmVudCA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpO1xuICB2YXIgb24gPSBldmVudC5vbixcbiAgICAgIGVtaXQgPSBldmVudC5lbWl0LFxuICAgICAgYmluZCA9IGV2ZW50LmJpbmQ7XG4gIHZhciBTbGlkZXMgPSBDb21wb25lbnRzMi5TbGlkZXMsXG4gICAgICBFbGVtZW50cyA9IENvbXBvbmVudHMyLkVsZW1lbnRzLFxuICAgICAgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXI7XG4gIHZhciBoYXNGb2N1cyA9IENvbnRyb2xsZXIuaGFzRm9jdXMsXG4gICAgICBnZXRJbmRleCA9IENvbnRyb2xsZXIuZ2V0SW5kZXgsXG4gICAgICBnbyA9IENvbnRyb2xsZXIuZ287XG4gIHZhciByZXNvbHZlID0gQ29tcG9uZW50czIuRGlyZWN0aW9uLnJlc29sdmU7XG4gIHZhciBwbGFjZWhvbGRlciA9IEVsZW1lbnRzLnBhZ2luYXRpb247XG4gIHZhciBpdGVtcyA9IFtdO1xuICB2YXIgbGlzdDtcbiAgdmFyIHBhZ2luYXRpb25DbGFzc2VzO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIGRlc3Ryb3koKTtcbiAgICBvbihbRVZFTlRfVVBEQVRFRCwgRVZFTlRfUkVGUkVTSCwgRVZFTlRfRU5EX0lOREVYX0NIQU5HRURdLCBtb3VudCk7XG4gICAgdmFyIGVuYWJsZWQgPSBvcHRpb25zLnBhZ2luYXRpb247XG4gICAgcGxhY2Vob2xkZXIgJiYgZGlzcGxheShwbGFjZWhvbGRlciwgZW5hYmxlZCA/IFwiXCIgOiBcIm5vbmVcIik7XG5cbiAgICBpZiAoZW5hYmxlZCkge1xuICAgICAgb24oW0VWRU5UX01PVkUsIEVWRU5UX1NDUk9MTCwgRVZFTlRfU0NST0xMRURdLCB1cGRhdGUpO1xuICAgICAgY3JlYXRlUGFnaW5hdGlvbigpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgICBlbWl0KEVWRU5UX1BBR0lOQVRJT05fTU9VTlRFRCwge1xuICAgICAgICBsaXN0OiBsaXN0LFxuICAgICAgICBpdGVtczogaXRlbXNcbiAgICAgIH0sIGdldEF0KFNwbGlkZTIuaW5kZXgpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGlmIChsaXN0KSB7XG4gICAgICByZW1vdmUocGxhY2Vob2xkZXIgPyBzbGljZShsaXN0LmNoaWxkcmVuKSA6IGxpc3QpO1xuICAgICAgcmVtb3ZlQ2xhc3MobGlzdCwgcGFnaW5hdGlvbkNsYXNzZXMpO1xuICAgICAgZW1wdHkoaXRlbXMpO1xuICAgICAgbGlzdCA9IG51bGw7XG4gICAgfVxuXG4gICAgZXZlbnQuZGVzdHJveSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlUGFnaW5hdGlvbigpIHtcbiAgICB2YXIgbGVuZ3RoID0gU3BsaWRlMi5sZW5ndGg7XG4gICAgdmFyIGNsYXNzZXMgPSBvcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIGkxOG4gPSBvcHRpb25zLmkxOG4sXG4gICAgICAgIHBlclBhZ2UgPSBvcHRpb25zLnBlclBhZ2U7XG4gICAgdmFyIG1heCA9IGhhc0ZvY3VzKCkgPyBDb250cm9sbGVyLmdldEVuZCgpICsgMSA6IGNlaWwobGVuZ3RoIC8gcGVyUGFnZSk7XG4gICAgbGlzdCA9IHBsYWNlaG9sZGVyIHx8IGNyZWF0ZShcInVsXCIsIGNsYXNzZXMucGFnaW5hdGlvbiwgRWxlbWVudHMudHJhY2sucGFyZW50RWxlbWVudCk7XG4gICAgYWRkQ2xhc3MobGlzdCwgcGFnaW5hdGlvbkNsYXNzZXMgPSBDTEFTU19QQUdJTkFUSU9OICsgXCItLVwiICsgZ2V0RGlyZWN0aW9uKCkpO1xuICAgIHNldEF0dHJpYnV0ZShsaXN0LCBST0xFLCBcInRhYmxpc3RcIik7XG4gICAgc2V0QXR0cmlidXRlKGxpc3QsIEFSSUFfTEFCRUwsIGkxOG4uc2VsZWN0KTtcbiAgICBzZXRBdHRyaWJ1dGUobGlzdCwgQVJJQV9PUklFTlRBVElPTiwgZ2V0RGlyZWN0aW9uKCkgPT09IFRUQiA/IFwidmVydGljYWxcIiA6IFwiXCIpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXg7IGkrKykge1xuICAgICAgdmFyIGxpID0gY3JlYXRlKFwibGlcIiwgbnVsbCwgbGlzdCk7XG4gICAgICB2YXIgYnV0dG9uID0gY3JlYXRlKFwiYnV0dG9uXCIsIHtcbiAgICAgICAgY2xhc3M6IGNsYXNzZXMucGFnZSxcbiAgICAgICAgdHlwZTogXCJidXR0b25cIlxuICAgICAgfSwgbGkpO1xuICAgICAgdmFyIGNvbnRyb2xzID0gU2xpZGVzLmdldEluKGkpLm1hcChmdW5jdGlvbiAoU2xpZGUpIHtcbiAgICAgICAgcmV0dXJuIFNsaWRlLnNsaWRlLmlkO1xuICAgICAgfSk7XG4gICAgICB2YXIgdGV4dCA9ICFoYXNGb2N1cygpICYmIHBlclBhZ2UgPiAxID8gaTE4bi5wYWdlWCA6IGkxOG4uc2xpZGVYO1xuICAgICAgYmluZChidXR0b24sIFwiY2xpY2tcIiwgYXBwbHkob25DbGljaywgaSkpO1xuXG4gICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uS2V5Ym9hcmQpIHtcbiAgICAgICAgYmluZChidXR0b24sIFwia2V5ZG93blwiLCBhcHBseShvbktleWRvd24sIGkpKTtcbiAgICAgIH1cblxuICAgICAgc2V0QXR0cmlidXRlKGxpLCBST0xFLCBcInByZXNlbnRhdGlvblwiKTtcbiAgICAgIHNldEF0dHJpYnV0ZShidXR0b24sIFJPTEUsIFwidGFiXCIpO1xuICAgICAgc2V0QXR0cmlidXRlKGJ1dHRvbiwgQVJJQV9DT05UUk9MUywgY29udHJvbHMuam9pbihcIiBcIikpO1xuICAgICAgc2V0QXR0cmlidXRlKGJ1dHRvbiwgQVJJQV9MQUJFTCwgZm9ybWF0KHRleHQsIGkgKyAxKSk7XG4gICAgICBzZXRBdHRyaWJ1dGUoYnV0dG9uLCBUQUJfSU5ERVgsIC0xKTtcbiAgICAgIGl0ZW1zLnB1c2goe1xuICAgICAgICBsaTogbGksXG4gICAgICAgIGJ1dHRvbjogYnV0dG9uLFxuICAgICAgICBwYWdlOiBpXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvbkNsaWNrKHBhZ2UpIHtcbiAgICBnbyhcIj5cIiArIHBhZ2UsIHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25LZXlkb3duKHBhZ2UsIGUpIHtcbiAgICB2YXIgbGVuZ3RoID0gaXRlbXMubGVuZ3RoO1xuICAgIHZhciBrZXkgPSBub3JtYWxpemVLZXkoZSk7XG4gICAgdmFyIGRpciA9IGdldERpcmVjdGlvbigpO1xuICAgIHZhciBuZXh0UGFnZSA9IC0xO1xuXG4gICAgaWYgKGtleSA9PT0gcmVzb2x2ZShBUlJPV19SSUdIVCwgZmFsc2UsIGRpcikpIHtcbiAgICAgIG5leHRQYWdlID0gKytwYWdlICUgbGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSByZXNvbHZlKEFSUk9XX0xFRlQsIGZhbHNlLCBkaXIpKSB7XG4gICAgICBuZXh0UGFnZSA9ICgtLXBhZ2UgKyBsZW5ndGgpICUgbGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIkhvbWVcIikge1xuICAgICAgbmV4dFBhZ2UgPSAwO1xuICAgIH0gZWxzZSBpZiAoa2V5ID09PSBcIkVuZFwiKSB7XG4gICAgICBuZXh0UGFnZSA9IGxlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgdmFyIGl0ZW0gPSBpdGVtc1tuZXh0UGFnZV07XG5cbiAgICBpZiAoaXRlbSkge1xuICAgICAgZm9jdXMoaXRlbS5idXR0b24pO1xuICAgICAgZ28oXCI+XCIgKyBuZXh0UGFnZSk7XG4gICAgICBwcmV2ZW50KGUsIHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERpcmVjdGlvbigpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5wYWdpbmF0aW9uRGlyZWN0aW9uIHx8IG9wdGlvbnMuZGlyZWN0aW9uO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QXQoaW5kZXgpIHtcbiAgICByZXR1cm4gaXRlbXNbQ29udHJvbGxlci50b1BhZ2UoaW5kZXgpXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICB2YXIgcHJldiA9IGdldEF0KGdldEluZGV4KHRydWUpKTtcbiAgICB2YXIgY3VyciA9IGdldEF0KGdldEluZGV4KCkpO1xuXG4gICAgaWYgKHByZXYpIHtcbiAgICAgIHZhciBidXR0b24gPSBwcmV2LmJ1dHRvbjtcbiAgICAgIHJlbW92ZUNsYXNzKGJ1dHRvbiwgQ0xBU1NfQUNUSVZFKTtcbiAgICAgIHJlbW92ZUF0dHJpYnV0ZShidXR0b24sIEFSSUFfU0VMRUNURUQpO1xuICAgICAgc2V0QXR0cmlidXRlKGJ1dHRvbiwgVEFCX0lOREVYLCAtMSk7XG4gICAgfVxuXG4gICAgaWYgKGN1cnIpIHtcbiAgICAgIHZhciBfYnV0dG9uID0gY3Vyci5idXR0b247XG4gICAgICBhZGRDbGFzcyhfYnV0dG9uLCBDTEFTU19BQ1RJVkUpO1xuICAgICAgc2V0QXR0cmlidXRlKF9idXR0b24sIEFSSUFfU0VMRUNURUQsIHRydWUpO1xuICAgICAgc2V0QXR0cmlidXRlKF9idXR0b24sIFRBQl9JTkRFWCwgXCJcIik7XG4gICAgfVxuXG4gICAgZW1pdChFVkVOVF9QQUdJTkFUSU9OX1VQREFURUQsIHtcbiAgICAgIGxpc3Q6IGxpc3QsXG4gICAgICBpdGVtczogaXRlbXNcbiAgICB9LCBwcmV2LCBjdXJyKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaXRlbXM6IGl0ZW1zLFxuICAgIG1vdW50OiBtb3VudCxcbiAgICBkZXN0cm95OiBkZXN0cm95LFxuICAgIGdldEF0OiBnZXRBdCxcbiAgICB1cGRhdGU6IHVwZGF0ZVxuICB9O1xufVxuXG52YXIgVFJJR0dFUl9LRVlTID0gW1wiIFwiLCBcIkVudGVyXCJdO1xuXG5mdW5jdGlvbiBTeW5jKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBpc05hdmlnYXRpb24gPSBvcHRpb25zLmlzTmF2aWdhdGlvbixcbiAgICAgIHNsaWRlRm9jdXMgPSBvcHRpb25zLnNsaWRlRm9jdXM7XG4gIHZhciBldmVudHMgPSBbXTtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBTcGxpZGUyLnNwbGlkZXMuZm9yRWFjaChmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICBpZiAoIXRhcmdldC5pc1BhcmVudCkge1xuICAgICAgICBzeW5jKFNwbGlkZTIsIHRhcmdldC5zcGxpZGUpO1xuICAgICAgICBzeW5jKHRhcmdldC5zcGxpZGUsIFNwbGlkZTIpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGlzTmF2aWdhdGlvbikge1xuICAgICAgbmF2aWdhdGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZXZlbnQuZGVzdHJveSgpO1xuICAgIH0pO1xuICAgIGVtcHR5KGV2ZW50cyk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdW50KCkge1xuICAgIGRlc3Ryb3koKTtcbiAgICBtb3VudCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3luYyhzcGxpZGUsIHRhcmdldCkge1xuICAgIHZhciBldmVudCA9IEV2ZW50SW50ZXJmYWNlKHNwbGlkZSk7XG4gICAgZXZlbnQub24oRVZFTlRfTU9WRSwgZnVuY3Rpb24gKGluZGV4LCBwcmV2LCBkZXN0KSB7XG4gICAgICB0YXJnZXQuZ28odGFyZ2V0LmlzKExPT1ApID8gZGVzdCA6IGluZGV4KTtcbiAgICB9KTtcbiAgICBldmVudHMucHVzaChldmVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBuYXZpZ2F0ZSgpIHtcbiAgICB2YXIgZXZlbnQgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKTtcbiAgICB2YXIgb24gPSBldmVudC5vbjtcbiAgICBvbihFVkVOVF9DTElDSywgb25DbGljayk7XG4gICAgb24oRVZFTlRfU0xJREVfS0VZRE9XTiwgb25LZXlkb3duKTtcbiAgICBvbihbRVZFTlRfTU9VTlRFRCwgRVZFTlRfVVBEQVRFRF0sIHVwZGF0ZSk7XG4gICAgZXZlbnRzLnB1c2goZXZlbnQpO1xuICAgIGV2ZW50LmVtaXQoRVZFTlRfTkFWSUdBVElPTl9NT1VOVEVELCBTcGxpZGUyLnNwbGlkZXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIHNldEF0dHJpYnV0ZShDb21wb25lbnRzMi5FbGVtZW50cy5saXN0LCBBUklBX09SSUVOVEFUSU9OLCBvcHRpb25zLmRpcmVjdGlvbiA9PT0gVFRCID8gXCJ2ZXJ0aWNhbFwiIDogXCJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBvbkNsaWNrKFNsaWRlKSB7XG4gICAgU3BsaWRlMi5nbyhTbGlkZS5pbmRleCk7XG4gIH1cblxuICBmdW5jdGlvbiBvbktleWRvd24oU2xpZGUsIGUpIHtcbiAgICBpZiAoaW5jbHVkZXMoVFJJR0dFUl9LRVlTLCBub3JtYWxpemVLZXkoZSkpKSB7XG4gICAgICBvbkNsaWNrKFNsaWRlKTtcbiAgICAgIHByZXZlbnQoZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXR1cDogYXBwbHkoQ29tcG9uZW50czIuTWVkaWEuc2V0LCB7XG4gICAgICBzbGlkZUZvY3VzOiBpc1VuZGVmaW5lZChzbGlkZUZvY3VzKSA/IGlzTmF2aWdhdGlvbiA6IHNsaWRlRm9jdXNcbiAgICB9LCB0cnVlKSxcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGVzdHJveTogZGVzdHJveSxcbiAgICByZW1vdW50OiByZW1vdW50XG4gIH07XG59XG5cbmZ1bmN0aW9uIFdoZWVsKFNwbGlkZTIsIENvbXBvbmVudHMyLCBvcHRpb25zKSB7XG4gIHZhciBfRXZlbnRJbnRlcmZhY2UxMiA9IEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLFxuICAgICAgYmluZCA9IF9FdmVudEludGVyZmFjZTEyLmJpbmQ7XG5cbiAgdmFyIGxhc3RUaW1lID0gMDtcblxuICBmdW5jdGlvbiBtb3VudCgpIHtcbiAgICBpZiAob3B0aW9ucy53aGVlbCkge1xuICAgICAgYmluZChDb21wb25lbnRzMi5FbGVtZW50cy50cmFjaywgXCJ3aGVlbFwiLCBvbldoZWVsLCBTQ1JPTExfTElTVEVORVJfT1BUSU9OUyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gb25XaGVlbChlKSB7XG4gICAgaWYgKGUuY2FuY2VsYWJsZSkge1xuICAgICAgdmFyIGRlbHRhWSA9IGUuZGVsdGFZO1xuICAgICAgdmFyIGJhY2t3YXJkcyA9IGRlbHRhWSA8IDA7XG4gICAgICB2YXIgdGltZVN0YW1wID0gdGltZU9mKGUpO1xuXG4gICAgICB2YXIgX21pbiA9IG9wdGlvbnMud2hlZWxNaW5UaHJlc2hvbGQgfHwgMDtcblxuICAgICAgdmFyIHNsZWVwID0gb3B0aW9ucy53aGVlbFNsZWVwIHx8IDA7XG5cbiAgICAgIGlmIChhYnMoZGVsdGFZKSA+IF9taW4gJiYgdGltZVN0YW1wIC0gbGFzdFRpbWUgPiBzbGVlcCkge1xuICAgICAgICBTcGxpZGUyLmdvKGJhY2t3YXJkcyA/IFwiPFwiIDogXCI+XCIpO1xuICAgICAgICBsYXN0VGltZSA9IHRpbWVTdGFtcDtcbiAgICAgIH1cblxuICAgICAgc2hvdWxkUHJldmVudChiYWNrd2FyZHMpICYmIHByZXZlbnQoZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkUHJldmVudChiYWNrd2FyZHMpIHtcbiAgICByZXR1cm4gIW9wdGlvbnMucmVsZWFzZVdoZWVsIHx8IFNwbGlkZTIuc3RhdGUuaXMoTU9WSU5HKSB8fCBDb21wb25lbnRzMi5Db250cm9sbGVyLmdldEFkamFjZW50KGJhY2t3YXJkcykgIT09IC0xO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnRcbiAgfTtcbn1cblxudmFyIFNSX1JFTU9WQUxfREVMQVkgPSA5MDtcblxuZnVuY3Rpb24gTGl2ZShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgX0V2ZW50SW50ZXJmYWNlMTMgPSBFdmVudEludGVyZmFjZShTcGxpZGUyKSxcbiAgICAgIG9uID0gX0V2ZW50SW50ZXJmYWNlMTMub247XG5cbiAgdmFyIHRyYWNrID0gQ29tcG9uZW50czIuRWxlbWVudHMudHJhY2s7XG4gIHZhciBlbmFibGVkID0gb3B0aW9ucy5saXZlICYmICFvcHRpb25zLmlzTmF2aWdhdGlvbjtcbiAgdmFyIHNyID0gY3JlYXRlKFwic3BhblwiLCBDTEFTU19TUik7XG4gIHZhciBpbnRlcnZhbCA9IFJlcXVlc3RJbnRlcnZhbChTUl9SRU1PVkFMX0RFTEFZLCBhcHBseSh0b2dnbGUsIGZhbHNlKSk7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgaWYgKGVuYWJsZWQpIHtcbiAgICAgIGRpc2FibGUoIUNvbXBvbmVudHMyLkF1dG9wbGF5LmlzUGF1c2VkKCkpO1xuICAgICAgc2V0QXR0cmlidXRlKHRyYWNrLCBBUklBX0FUT01JQywgdHJ1ZSk7XG4gICAgICBzci50ZXh0Q29udGVudCA9IFwiXFx1MjAyNlwiO1xuICAgICAgb24oRVZFTlRfQVVUT1BMQVlfUExBWSwgYXBwbHkoZGlzYWJsZSwgdHJ1ZSkpO1xuICAgICAgb24oRVZFTlRfQVVUT1BMQVlfUEFVU0UsIGFwcGx5KGRpc2FibGUsIGZhbHNlKSk7XG4gICAgICBvbihbRVZFTlRfTU9WRUQsIEVWRU5UX1NDUk9MTEVEXSwgYXBwbHkodG9nZ2xlLCB0cnVlKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdG9nZ2xlKGFjdGl2ZSkge1xuICAgIHNldEF0dHJpYnV0ZSh0cmFjaywgQVJJQV9CVVNZLCBhY3RpdmUpO1xuXG4gICAgaWYgKGFjdGl2ZSkge1xuICAgICAgYXBwZW5kKHRyYWNrLCBzcik7XG4gICAgICBpbnRlcnZhbC5zdGFydCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZW1vdmUoc3IpO1xuICAgICAgaW50ZXJ2YWwuY2FuY2VsKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICByZW1vdmVBdHRyaWJ1dGUodHJhY2ssIFtBUklBX0xJVkUsIEFSSUFfQVRPTUlDLCBBUklBX0JVU1ldKTtcbiAgICByZW1vdmUoc3IpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzYWJsZShkaXNhYmxlZCkge1xuICAgIGlmIChlbmFibGVkKSB7XG4gICAgICBzZXRBdHRyaWJ1dGUodHJhY2ssIEFSSUFfTElWRSwgZGlzYWJsZWQgPyBcIm9mZlwiIDogXCJwb2xpdGVcIik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtb3VudDogbW91bnQsXG4gICAgZGlzYWJsZTogZGlzYWJsZSxcbiAgICBkZXN0cm95OiBkZXN0cm95XG4gIH07XG59XG5cbnZhciBDb21wb25lbnRDb25zdHJ1Y3RvcnMgPSAvKiNfX1BVUkVfXyovT2JqZWN0LmZyZWV6ZSh7XG4gIF9fcHJvdG9fXzogbnVsbCxcbiAgTWVkaWE6IE1lZGlhLFxuICBEaXJlY3Rpb246IERpcmVjdGlvbixcbiAgRWxlbWVudHM6IEVsZW1lbnRzLFxuICBTbGlkZXM6IFNsaWRlcyxcbiAgTGF5b3V0OiBMYXlvdXQsXG4gIENsb25lczogQ2xvbmVzLFxuICBNb3ZlOiBNb3ZlLFxuICBDb250cm9sbGVyOiBDb250cm9sbGVyLFxuICBBcnJvd3M6IEFycm93cyxcbiAgQXV0b3BsYXk6IEF1dG9wbGF5LFxuICBDb3ZlcjogQ292ZXIsXG4gIFNjcm9sbDogU2Nyb2xsLFxuICBEcmFnOiBEcmFnLFxuICBLZXlib2FyZDogS2V5Ym9hcmQsXG4gIExhenlMb2FkOiBMYXp5TG9hZCxcbiAgUGFnaW5hdGlvbjogUGFnaW5hdGlvbixcbiAgU3luYzogU3luYyxcbiAgV2hlZWw6IFdoZWVsLFxuICBMaXZlOiBMaXZlXG59KTtcbnZhciBJMThOID0ge1xuICBwcmV2OiBcIlByZXZpb3VzIHNsaWRlXCIsXG4gIG5leHQ6IFwiTmV4dCBzbGlkZVwiLFxuICBmaXJzdDogXCJHbyB0byBmaXJzdCBzbGlkZVwiLFxuICBsYXN0OiBcIkdvIHRvIGxhc3Qgc2xpZGVcIixcbiAgc2xpZGVYOiBcIkdvIHRvIHNsaWRlICVzXCIsXG4gIHBhZ2VYOiBcIkdvIHRvIHBhZ2UgJXNcIixcbiAgcGxheTogXCJTdGFydCBhdXRvcGxheVwiLFxuICBwYXVzZTogXCJQYXVzZSBhdXRvcGxheVwiLFxuICBjYXJvdXNlbDogXCJjYXJvdXNlbFwiLFxuICBzbGlkZTogXCJzbGlkZVwiLFxuICBzZWxlY3Q6IFwiU2VsZWN0IGEgc2xpZGUgdG8gc2hvd1wiLFxuICBzbGlkZUxhYmVsOiBcIiVzIG9mICVzXCJcbn07XG52YXIgREVGQVVMVFMgPSB7XG4gIHR5cGU6IFwic2xpZGVcIixcbiAgcm9sZTogXCJyZWdpb25cIixcbiAgc3BlZWQ6IDQwMCxcbiAgcGVyUGFnZTogMSxcbiAgY2xvbmVTdGF0dXM6IHRydWUsXG4gIGFycm93czogdHJ1ZSxcbiAgcGFnaW5hdGlvbjogdHJ1ZSxcbiAgcGFnaW5hdGlvbktleWJvYXJkOiB0cnVlLFxuICBpbnRlcnZhbDogNWUzLFxuICBwYXVzZU9uSG92ZXI6IHRydWUsXG4gIHBhdXNlT25Gb2N1czogdHJ1ZSxcbiAgcmVzZXRQcm9ncmVzczogdHJ1ZSxcbiAgZWFzaW5nOiBcImN1YmljLWJlemllcigwLjI1LCAxLCAwLjUsIDEpXCIsXG4gIGRyYWc6IHRydWUsXG4gIGRpcmVjdGlvbjogXCJsdHJcIixcbiAgdHJpbVNwYWNlOiB0cnVlLFxuICBmb2N1c2FibGVOb2RlczogXCJhLCBidXR0b24sIHRleHRhcmVhLCBpbnB1dCwgc2VsZWN0LCBpZnJhbWVcIixcbiAgbGl2ZTogdHJ1ZSxcbiAgY2xhc3NlczogQ0xBU1NFUyxcbiAgaTE4bjogSTE4TixcbiAgcmVkdWNlZE1vdGlvbjoge1xuICAgIHNwZWVkOiAwLFxuICAgIHJld2luZFNwZWVkOiAwLFxuICAgIGF1dG9wbGF5OiBcInBhdXNlXCJcbiAgfVxufTtcblxuZnVuY3Rpb24gRmFkZShTcGxpZGUyLCBDb21wb25lbnRzMiwgb3B0aW9ucykge1xuICB2YXIgU2xpZGVzID0gQ29tcG9uZW50czIuU2xpZGVzO1xuXG4gIGZ1bmN0aW9uIG1vdW50KCkge1xuICAgIEV2ZW50SW50ZXJmYWNlKFNwbGlkZTIpLm9uKFtFVkVOVF9NT1VOVEVELCBFVkVOVF9SRUZSRVNIXSwgaW5pdCk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIFNsaWRlcy5mb3JFYWNoKGZ1bmN0aW9uIChTbGlkZSkge1xuICAgICAgU2xpZGUuc3R5bGUoXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVYKC1cIiArIDEwMCAqIFNsaWRlLmluZGV4ICsgXCIlKVwiKTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KGluZGV4LCBkb25lKSB7XG4gICAgU2xpZGVzLnN0eWxlKFwidHJhbnNpdGlvblwiLCBcIm9wYWNpdHkgXCIgKyBvcHRpb25zLnNwZWVkICsgXCJtcyBcIiArIG9wdGlvbnMuZWFzaW5nKTtcbiAgICBuZXh0VGljayhkb25lKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBjYW5jZWw6IG5vb3BcbiAgfTtcbn1cblxuZnVuY3Rpb24gU2xpZGUoU3BsaWRlMiwgQ29tcG9uZW50czIsIG9wdGlvbnMpIHtcbiAgdmFyIE1vdmUgPSBDb21wb25lbnRzMi5Nb3ZlLFxuICAgICAgQ29udHJvbGxlciA9IENvbXBvbmVudHMyLkNvbnRyb2xsZXIsXG4gICAgICBTY3JvbGwgPSBDb21wb25lbnRzMi5TY3JvbGw7XG4gIHZhciBsaXN0ID0gQ29tcG9uZW50czIuRWxlbWVudHMubGlzdDtcbiAgdmFyIHRyYW5zaXRpb24gPSBhcHBseShzdHlsZSwgbGlzdCwgXCJ0cmFuc2l0aW9uXCIpO1xuICB2YXIgZW5kQ2FsbGJhY2s7XG5cbiAgZnVuY3Rpb24gbW91bnQoKSB7XG4gICAgRXZlbnRJbnRlcmZhY2UoU3BsaWRlMikuYmluZChsaXN0LCBcInRyYW5zaXRpb25lbmRcIiwgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gbGlzdCAmJiBlbmRDYWxsYmFjaykge1xuICAgICAgICBjYW5jZWwoKTtcbiAgICAgICAgZW5kQ2FsbGJhY2soKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KGluZGV4LCBkb25lKSB7XG4gICAgdmFyIGRlc3RpbmF0aW9uID0gTW92ZS50b1Bvc2l0aW9uKGluZGV4LCB0cnVlKTtcbiAgICB2YXIgcG9zaXRpb24gPSBNb3ZlLmdldFBvc2l0aW9uKCk7XG4gICAgdmFyIHNwZWVkID0gZ2V0U3BlZWQoaW5kZXgpO1xuXG4gICAgaWYgKGFicyhkZXN0aW5hdGlvbiAtIHBvc2l0aW9uKSA+PSAxICYmIHNwZWVkID49IDEpIHtcbiAgICAgIGlmIChvcHRpb25zLnVzZVNjcm9sbCkge1xuICAgICAgICBTY3JvbGwuc2Nyb2xsKGRlc3RpbmF0aW9uLCBzcGVlZCwgZmFsc2UsIGRvbmUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNpdGlvbihcInRyYW5zZm9ybSBcIiArIHNwZWVkICsgXCJtcyBcIiArIG9wdGlvbnMuZWFzaW5nKTtcbiAgICAgICAgTW92ZS50cmFuc2xhdGUoZGVzdGluYXRpb24sIHRydWUpO1xuICAgICAgICBlbmRDYWxsYmFjayA9IGRvbmU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIE1vdmUuanVtcChpbmRleCk7XG4gICAgICBkb25lKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIHRyYW5zaXRpb24oXCJcIik7XG4gICAgU2Nyb2xsLmNhbmNlbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0U3BlZWQoaW5kZXgpIHtcbiAgICB2YXIgcmV3aW5kU3BlZWQgPSBvcHRpb25zLnJld2luZFNwZWVkO1xuXG4gICAgaWYgKFNwbGlkZTIuaXMoU0xJREUpICYmIHJld2luZFNwZWVkKSB7XG4gICAgICB2YXIgcHJldiA9IENvbnRyb2xsZXIuZ2V0SW5kZXgodHJ1ZSk7XG4gICAgICB2YXIgZW5kID0gQ29udHJvbGxlci5nZXRFbmQoKTtcblxuICAgICAgaWYgKHByZXYgPT09IDAgJiYgaW5kZXggPj0gZW5kIHx8IHByZXYgPj0gZW5kICYmIGluZGV4ID09PSAwKSB7XG4gICAgICAgIHJldHVybiByZXdpbmRTcGVlZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9ucy5zcGVlZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbW91bnQ6IG1vdW50LFxuICAgIHN0YXJ0OiBzdGFydCxcbiAgICBjYW5jZWw6IGNhbmNlbFxuICB9O1xufVxuXG52YXIgX1NwbGlkZSA9IC8qI19fUFVSRV9fKi9mdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIF9TcGxpZGUodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgdGhpcy5ldmVudCA9IEV2ZW50SW50ZXJmYWNlKCk7XG4gICAgdGhpcy5Db21wb25lbnRzID0ge307XG4gICAgdGhpcy5zdGF0ZSA9IFN0YXRlKENSRUFURUQpO1xuICAgIHRoaXMuc3BsaWRlcyA9IFtdO1xuICAgIHRoaXMuX28gPSB7fTtcbiAgICB0aGlzLl9FID0ge307XG4gICAgdmFyIHJvb3QgPSBpc1N0cmluZyh0YXJnZXQpID8gcXVlcnkoZG9jdW1lbnQsIHRhcmdldCkgOiB0YXJnZXQ7XG4gICAgYXNzZXJ0KHJvb3QsIHJvb3QgKyBcIiBpcyBpbnZhbGlkLlwiKTtcbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIG9wdGlvbnMgPSBtZXJnZSh7XG4gICAgICBsYWJlbDogZ2V0QXR0cmlidXRlKHJvb3QsIEFSSUFfTEFCRUwpIHx8IFwiXCIsXG4gICAgICBsYWJlbGxlZGJ5OiBnZXRBdHRyaWJ1dGUocm9vdCwgQVJJQV9MQUJFTExFREJZKSB8fCBcIlwiXG4gICAgfSwgREVGQVVMVFMsIF9TcGxpZGUuZGVmYXVsdHMsIG9wdGlvbnMgfHwge30pO1xuXG4gICAgdHJ5IHtcbiAgICAgIG1lcmdlKG9wdGlvbnMsIEpTT04ucGFyc2UoZ2V0QXR0cmlidXRlKHJvb3QsIERBVEFfQVRUUklCVVRFKSkpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGFzc2VydChmYWxzZSwgXCJJbnZhbGlkIEpTT05cIik7XG4gICAgfVxuXG4gICAgdGhpcy5fbyA9IE9iamVjdC5jcmVhdGUobWVyZ2Uoe30sIG9wdGlvbnMpKTtcbiAgfVxuXG4gIHZhciBfcHJvdG8gPSBfU3BsaWRlLnByb3RvdHlwZTtcblxuICBfcHJvdG8ubW91bnQgPSBmdW5jdGlvbiBtb3VudChFeHRlbnNpb25zLCBUcmFuc2l0aW9uKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBzdGF0ZSA9IHRoaXMuc3RhdGUsXG4gICAgICAgIENvbXBvbmVudHMyID0gdGhpcy5Db21wb25lbnRzO1xuICAgIGFzc2VydChzdGF0ZS5pcyhbQ1JFQVRFRCwgREVTVFJPWUVEXSksIFwiQWxyZWFkeSBtb3VudGVkIVwiKTtcbiAgICBzdGF0ZS5zZXQoQ1JFQVRFRCk7XG4gICAgdGhpcy5fQyA9IENvbXBvbmVudHMyO1xuICAgIHRoaXMuX1QgPSBUcmFuc2l0aW9uIHx8IHRoaXMuX1QgfHwgKHRoaXMuaXMoRkFERSkgPyBGYWRlIDogU2xpZGUpO1xuICAgIHRoaXMuX0UgPSBFeHRlbnNpb25zIHx8IHRoaXMuX0U7XG4gICAgdmFyIENvbnN0cnVjdG9ycyA9IGFzc2lnbih7fSwgQ29tcG9uZW50Q29uc3RydWN0b3JzLCB0aGlzLl9FLCB7XG4gICAgICBUcmFuc2l0aW9uOiB0aGlzLl9UXG4gICAgfSk7XG4gICAgZm9yT3duKENvbnN0cnVjdG9ycywgZnVuY3Rpb24gKENvbXBvbmVudCwga2V5KSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gQ29tcG9uZW50KF90aGlzLCBDb21wb25lbnRzMiwgX3RoaXMuX28pO1xuICAgICAgQ29tcG9uZW50czJba2V5XSA9IGNvbXBvbmVudDtcbiAgICAgIGNvbXBvbmVudC5zZXR1cCAmJiBjb21wb25lbnQuc2V0dXAoKTtcbiAgICB9KTtcbiAgICBmb3JPd24oQ29tcG9uZW50czIsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgIGNvbXBvbmVudC5tb3VudCAmJiBjb21wb25lbnQubW91bnQoKTtcbiAgICB9KTtcbiAgICB0aGlzLmVtaXQoRVZFTlRfTU9VTlRFRCk7XG4gICAgYWRkQ2xhc3ModGhpcy5yb290LCBDTEFTU19JTklUSUFMSVpFRCk7XG4gICAgc3RhdGUuc2V0KElETEUpO1xuICAgIHRoaXMuZW1pdChFVkVOVF9SRUFEWSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnN5bmMgPSBmdW5jdGlvbiBzeW5jKHNwbGlkZSkge1xuICAgIHRoaXMuc3BsaWRlcy5wdXNoKHtcbiAgICAgIHNwbGlkZTogc3BsaWRlXG4gICAgfSk7XG4gICAgc3BsaWRlLnNwbGlkZXMucHVzaCh7XG4gICAgICBzcGxpZGU6IHRoaXMsXG4gICAgICBpc1BhcmVudDogdHJ1ZVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXMoSURMRSkpIHtcbiAgICAgIHRoaXMuX0MuU3luYy5yZW1vdW50KCk7XG5cbiAgICAgIHNwbGlkZS5Db21wb25lbnRzLlN5bmMucmVtb3VudCgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIF9wcm90by5nbyA9IGZ1bmN0aW9uIGdvKGNvbnRyb2wpIHtcbiAgICB0aGlzLl9DLkNvbnRyb2xsZXIuZ28oY29udHJvbCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8ub24gPSBmdW5jdGlvbiBvbihldmVudHMsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy5ldmVudC5vbihldmVudHMsIGNhbGxiYWNrKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8ub2ZmID0gZnVuY3Rpb24gb2ZmKGV2ZW50cykge1xuICAgIHRoaXMuZXZlbnQub2ZmKGV2ZW50cyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmVtaXQgPSBmdW5jdGlvbiBlbWl0KGV2ZW50KSB7XG4gICAgdmFyIF90aGlzJGV2ZW50O1xuXG4gICAgKF90aGlzJGV2ZW50ID0gdGhpcy5ldmVudCkuZW1pdC5hcHBseShfdGhpcyRldmVudCwgW2V2ZW50XS5jb25jYXQoc2xpY2UoYXJndW1lbnRzLCAxKSkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmFkZCA9IGZ1bmN0aW9uIGFkZChzbGlkZXMsIGluZGV4KSB7XG4gICAgdGhpcy5fQy5TbGlkZXMuYWRkKHNsaWRlcywgaW5kZXgpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZShtYXRjaGVyKSB7XG4gICAgdGhpcy5fQy5TbGlkZXMucmVtb3ZlKG1hdGNoZXIpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgX3Byb3RvLmlzID0gZnVuY3Rpb24gaXModHlwZSkge1xuICAgIHJldHVybiB0aGlzLl9vLnR5cGUgPT09IHR5cGU7XG4gIH07XG5cbiAgX3Byb3RvLnJlZnJlc2ggPSBmdW5jdGlvbiByZWZyZXNoKCkge1xuICAgIHRoaXMuZW1pdChFVkVOVF9SRUZSRVNIKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfcHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3koY29tcGxldGVseSkge1xuICAgIGlmIChjb21wbGV0ZWx5ID09PSB2b2lkIDApIHtcbiAgICAgIGNvbXBsZXRlbHkgPSB0cnVlO1xuICAgIH1cblxuICAgIHZhciBldmVudCA9IHRoaXMuZXZlbnQsXG4gICAgICAgIHN0YXRlID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChzdGF0ZS5pcyhDUkVBVEVEKSkge1xuICAgICAgRXZlbnRJbnRlcmZhY2UodGhpcykub24oRVZFTlRfUkVBRFksIHRoaXMuZGVzdHJveS5iaW5kKHRoaXMsIGNvbXBsZXRlbHkpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yT3duKHRoaXMuX0MsIGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICAgICAgY29tcG9uZW50LmRlc3Ryb3kgJiYgY29tcG9uZW50LmRlc3Ryb3koY29tcGxldGVseSk7XG4gICAgICB9LCB0cnVlKTtcbiAgICAgIGV2ZW50LmVtaXQoRVZFTlRfREVTVFJPWSk7XG4gICAgICBldmVudC5kZXN0cm95KCk7XG4gICAgICBjb21wbGV0ZWx5ICYmIGVtcHR5KHRoaXMuc3BsaWRlcyk7XG4gICAgICBzdGF0ZS5zZXQoREVTVFJPWUVEKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBfY3JlYXRlQ2xhc3MoX1NwbGlkZSwgW3tcbiAgICBrZXk6IFwib3B0aW9uc1wiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX287XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldChvcHRpb25zKSB7XG4gICAgICB0aGlzLl9DLk1lZGlhLnNldChvcHRpb25zLCB0cnVlLCB0cnVlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6IFwibGVuZ3RoXCIsXG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5fQy5TbGlkZXMuZ2V0TGVuZ3RoKHRydWUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogXCJpbmRleFwiLFxuICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgcmV0dXJuIHRoaXMuX0MuQ29udHJvbGxlci5nZXRJbmRleCgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBfU3BsaWRlO1xufSgpO1xuXG52YXIgU3BsaWRlID0gX1NwbGlkZTtcblNwbGlkZS5kZWZhdWx0cyA9IHt9O1xuU3BsaWRlLlNUQVRFUyA9IFNUQVRFUztcbnZhciBDTEFTU19SRU5ERVJFRCA9IFwiaXMtcmVuZGVyZWRcIjtcbnZhciBSRU5ERVJFUl9ERUZBVUxUX0NPTkZJRyA9IHtcbiAgbGlzdFRhZzogXCJ1bFwiLFxuICBzbGlkZVRhZzogXCJsaVwiXG59O1xuXG52YXIgU3R5bGUgPSAvKiNfX1BVUkVfXyovZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBTdHlsZShpZCwgb3B0aW9ucykge1xuICAgIHRoaXMuc3R5bGVzID0ge307XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMub3B0aW9ucyA9IG9wdGlvbnM7XG4gIH1cblxuICB2YXIgX3Byb3RvMiA9IFN0eWxlLnByb3RvdHlwZTtcblxuICBfcHJvdG8yLnJ1bGUgPSBmdW5jdGlvbiBydWxlKHNlbGVjdG9yLCBwcm9wLCB2YWx1ZSwgYnJlYWtwb2ludCkge1xuICAgIGJyZWFrcG9pbnQgPSBicmVha3BvaW50IHx8IFwiZGVmYXVsdFwiO1xuICAgIHZhciBzZWxlY3RvcnMgPSB0aGlzLnN0eWxlc1ticmVha3BvaW50XSA9IHRoaXMuc3R5bGVzW2JyZWFrcG9pbnRdIHx8IHt9O1xuICAgIHZhciBzdHlsZXMgPSBzZWxlY3RvcnNbc2VsZWN0b3JdID0gc2VsZWN0b3JzW3NlbGVjdG9yXSB8fCB7fTtcbiAgICBzdHlsZXNbcHJvcF0gPSB2YWx1ZTtcbiAgfTtcblxuICBfcHJvdG8yLmJ1aWxkID0gZnVuY3Rpb24gYnVpbGQoKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICB2YXIgY3NzID0gXCJcIjtcblxuICAgIGlmICh0aGlzLnN0eWxlcy5kZWZhdWx0KSB7XG4gICAgICBjc3MgKz0gdGhpcy5idWlsZFNlbGVjdG9ycyh0aGlzLnN0eWxlcy5kZWZhdWx0KTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyh0aGlzLnN0eWxlcykuc29ydChmdW5jdGlvbiAobiwgbSkge1xuICAgICAgcmV0dXJuIF90aGlzMi5vcHRpb25zLm1lZGlhUXVlcnkgPT09IFwibWluXCIgPyArbiAtICttIDogK20gLSArbjtcbiAgICB9KS5mb3JFYWNoKGZ1bmN0aW9uIChicmVha3BvaW50KSB7XG4gICAgICBpZiAoYnJlYWtwb2ludCAhPT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgICAgY3NzICs9IFwiQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogXCIgKyBicmVha3BvaW50ICsgXCJweCkge1wiO1xuICAgICAgICBjc3MgKz0gX3RoaXMyLmJ1aWxkU2VsZWN0b3JzKF90aGlzMi5zdHlsZXNbYnJlYWtwb2ludF0pO1xuICAgICAgICBjc3MgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGNzcztcbiAgfTtcblxuICBfcHJvdG8yLmJ1aWxkU2VsZWN0b3JzID0gZnVuY3Rpb24gYnVpbGRTZWxlY3RvcnMoc2VsZWN0b3JzKSB7XG4gICAgdmFyIF90aGlzMyA9IHRoaXM7XG5cbiAgICB2YXIgY3NzID0gXCJcIjtcbiAgICBmb3JPd24oc2VsZWN0b3JzLCBmdW5jdGlvbiAoc3R5bGVzLCBzZWxlY3Rvcikge1xuICAgICAgc2VsZWN0b3IgPSAoXCIjXCIgKyBfdGhpczMuaWQgKyBcIiBcIiArIHNlbGVjdG9yKS50cmltKCk7XG4gICAgICBjc3MgKz0gc2VsZWN0b3IgKyBcIiB7XCI7XG4gICAgICBmb3JPd24oc3R5bGVzLCBmdW5jdGlvbiAodmFsdWUsIHByb3ApIHtcbiAgICAgICAgaWYgKHZhbHVlIHx8IHZhbHVlID09PSAwKSB7XG4gICAgICAgICAgY3NzICs9IHByb3AgKyBcIjogXCIgKyB2YWx1ZSArIFwiO1wiO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNzcyArPSBcIn1cIjtcbiAgICB9KTtcbiAgICByZXR1cm4gY3NzO1xuICB9O1xuXG4gIHJldHVybiBTdHlsZTtcbn0oKTtcblxudmFyIFNwbGlkZVJlbmRlcmVyID0gLyojX19QVVJFX18qL2Z1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gU3BsaWRlUmVuZGVyZXIoY29udGVudHMsIG9wdGlvbnMsIGNvbmZpZywgZGVmYXVsdHMpIHtcbiAgICB0aGlzLnNsaWRlcyA9IFtdO1xuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIHRoaXMuYnJlYWtwb2ludHMgPSBbXTtcbiAgICBtZXJnZShERUZBVUxUUywgZGVmYXVsdHMgfHwge30pO1xuICAgIG1lcmdlKG1lcmdlKHRoaXMub3B0aW9ucywgREVGQVVMVFMpLCBvcHRpb25zIHx8IHt9KTtcbiAgICB0aGlzLmNvbnRlbnRzID0gY29udGVudHM7XG4gICAgdGhpcy5jb25maWcgPSBhc3NpZ24oe30sIFJFTkRFUkVSX0RFRkFVTFRfQ09ORklHLCBjb25maWcgfHwge30pO1xuICAgIHRoaXMuaWQgPSB0aGlzLmNvbmZpZy5pZCB8fCB1bmlxdWVJZChcInNwbGlkZVwiKTtcbiAgICB0aGlzLlN0eWxlID0gbmV3IFN0eWxlKHRoaXMuaWQsIHRoaXMub3B0aW9ucyk7XG4gICAgdGhpcy5EaXJlY3Rpb24gPSBEaXJlY3Rpb24obnVsbCwgbnVsbCwgdGhpcy5vcHRpb25zKTtcbiAgICBhc3NlcnQodGhpcy5jb250ZW50cy5sZW5ndGgsIFwiUHJvdmlkZSBhdCBsZWFzdCAxIGNvbnRlbnQuXCIpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgU3BsaWRlUmVuZGVyZXIuY2xlYW4gPSBmdW5jdGlvbiBjbGVhbihzcGxpZGUpIHtcbiAgICB2YXIgX0V2ZW50SW50ZXJmYWNlMTQgPSBFdmVudEludGVyZmFjZShzcGxpZGUpLFxuICAgICAgICBvbiA9IF9FdmVudEludGVyZmFjZTE0Lm9uO1xuXG4gICAgdmFyIHJvb3QgPSBzcGxpZGUucm9vdDtcbiAgICB2YXIgY2xvbmVzID0gcXVlcnlBbGwocm9vdCwgXCIuXCIgKyBDTEFTU19DTE9ORSk7XG4gICAgb24oRVZFTlRfTU9VTlRFRCwgZnVuY3Rpb24gKCkge1xuICAgICAgcmVtb3ZlKGNoaWxkKHJvb3QsIFwic3R5bGVcIikpO1xuICAgIH0pO1xuICAgIHJlbW92ZShjbG9uZXMpO1xuICB9O1xuXG4gIHZhciBfcHJvdG8zID0gU3BsaWRlUmVuZGVyZXIucHJvdG90eXBlO1xuXG4gIF9wcm90bzMuaW5pdCA9IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdGhpcy5wYXJzZUJyZWFrcG9pbnRzKCk7XG4gICAgdGhpcy5pbml0U2xpZGVzKCk7XG4gICAgdGhpcy5yZWdpc3RlclJvb3RTdHlsZXMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyVHJhY2tTdHlsZXMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyU2xpZGVTdHlsZXMoKTtcbiAgICB0aGlzLnJlZ2lzdGVyTGlzdFN0eWxlcygpO1xuICB9O1xuXG4gIF9wcm90bzMuaW5pdFNsaWRlcyA9IGZ1bmN0aW9uIGluaXRTbGlkZXMoKSB7XG4gICAgdmFyIF90aGlzNCA9IHRoaXM7XG5cbiAgICBwdXNoKHRoaXMuc2xpZGVzLCB0aGlzLmNvbnRlbnRzLm1hcChmdW5jdGlvbiAoY29udGVudCwgaW5kZXgpIHtcbiAgICAgIGNvbnRlbnQgPSBpc1N0cmluZyhjb250ZW50KSA/IHtcbiAgICAgICAgaHRtbDogY29udGVudFxuICAgICAgfSA6IGNvbnRlbnQ7XG4gICAgICBjb250ZW50LnN0eWxlcyA9IGNvbnRlbnQuc3R5bGVzIHx8IHt9O1xuICAgICAgY29udGVudC5hdHRycyA9IGNvbnRlbnQuYXR0cnMgfHwge307XG5cbiAgICAgIF90aGlzNC5jb3Zlcihjb250ZW50KTtcblxuICAgICAgdmFyIGNsYXNzZXMgPSBfdGhpczQub3B0aW9ucy5jbGFzc2VzLnNsaWRlICsgXCIgXCIgKyAoaW5kZXggPT09IDAgPyBDTEFTU19BQ1RJVkUgOiBcIlwiKTtcbiAgICAgIGFzc2lnbihjb250ZW50LmF0dHJzLCB7XG4gICAgICAgIGNsYXNzOiAoY2xhc3NlcyArIFwiIFwiICsgKGNvbnRlbnQuYXR0cnMuY2xhc3MgfHwgXCJcIikpLnRyaW0oKSxcbiAgICAgICAgc3R5bGU6IF90aGlzNC5idWlsZFN0eWxlcyhjb250ZW50LnN0eWxlcylcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkpO1xuXG4gICAgaWYgKHRoaXMuaXNMb29wKCkpIHtcbiAgICAgIHRoaXMuZ2VuZXJhdGVDbG9uZXModGhpcy5zbGlkZXMpO1xuICAgIH1cbiAgfTtcblxuICBfcHJvdG8zLnJlZ2lzdGVyUm9vdFN0eWxlcyA9IGZ1bmN0aW9uIHJlZ2lzdGVyUm9vdFN0eWxlcygpIHtcbiAgICB2YXIgX3RoaXM1ID0gdGhpcztcblxuICAgIHRoaXMuYnJlYWtwb2ludHMuZm9yRWFjaChmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICAgIHZhciB3aWR0aCA9IF9yZWYyWzBdLFxuICAgICAgICAgIG9wdGlvbnMgPSBfcmVmMlsxXTtcblxuICAgICAgX3RoaXM1LlN0eWxlLnJ1bGUoXCIgXCIsIFwibWF4LXdpZHRoXCIsIHVuaXQob3B0aW9ucy53aWR0aCksIHdpZHRoKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLnJlZ2lzdGVyVHJhY2tTdHlsZXMgPSBmdW5jdGlvbiByZWdpc3RlclRyYWNrU3R5bGVzKCkge1xuICAgIHZhciBfdGhpczYgPSB0aGlzO1xuXG4gICAgdmFyIFN0eWxlMiA9IHRoaXMuU3R5bGU7XG4gICAgdmFyIHNlbGVjdG9yID0gXCIuXCIgKyBDTEFTU19UUkFDSztcbiAgICB0aGlzLmJyZWFrcG9pbnRzLmZvckVhY2goZnVuY3Rpb24gKF9yZWYzKSB7XG4gICAgICB2YXIgd2lkdGggPSBfcmVmM1swXSxcbiAgICAgICAgICBvcHRpb25zID0gX3JlZjNbMV07XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgX3RoaXM2LnJlc29sdmUoXCJwYWRkaW5nTGVmdFwiKSwgX3RoaXM2LmNzc1BhZGRpbmcob3B0aW9ucywgZmFsc2UpLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgX3RoaXM2LnJlc29sdmUoXCJwYWRkaW5nUmlnaHRcIiksIF90aGlzNi5jc3NQYWRkaW5nKG9wdGlvbnMsIHRydWUpLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJoZWlnaHRcIiwgX3RoaXM2LmNzc1RyYWNrSGVpZ2h0KG9wdGlvbnMpLCB3aWR0aCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZWdpc3Rlckxpc3RTdHlsZXMgPSBmdW5jdGlvbiByZWdpc3Rlckxpc3RTdHlsZXMoKSB7XG4gICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICB2YXIgU3R5bGUyID0gdGhpcy5TdHlsZTtcbiAgICB2YXIgc2VsZWN0b3IgPSBcIi5cIiArIENMQVNTX0xJU1Q7XG4gICAgdGhpcy5icmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmNCkge1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjRbMF0sXG4gICAgICAgICAgb3B0aW9ucyA9IF9yZWY0WzFdO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwidHJhbnNmb3JtXCIsIF90aGlzNy5idWlsZFRyYW5zbGF0ZShvcHRpb25zKSwgd2lkdGgpO1xuXG4gICAgICBpZiAoIV90aGlzNy5jc3NTbGlkZUhlaWdodChvcHRpb25zKSkge1xuICAgICAgICBTdHlsZTIucnVsZShzZWxlY3RvciwgXCJhc3BlY3QtcmF0aW9cIiwgX3RoaXM3LmNzc0FzcGVjdFJhdGlvKG9wdGlvbnMpLCB3aWR0aCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5yZWdpc3RlclNsaWRlU3R5bGVzID0gZnVuY3Rpb24gcmVnaXN0ZXJTbGlkZVN0eWxlcygpIHtcbiAgICB2YXIgX3RoaXM4ID0gdGhpcztcblxuICAgIHZhciBTdHlsZTIgPSB0aGlzLlN0eWxlO1xuICAgIHZhciBzZWxlY3RvciA9IFwiLlwiICsgQ0xBU1NfU0xJREU7XG4gICAgdGhpcy5icmVha3BvaW50cy5mb3JFYWNoKGZ1bmN0aW9uIChfcmVmNSkge1xuICAgICAgdmFyIHdpZHRoID0gX3JlZjVbMF0sXG4gICAgICAgICAgb3B0aW9ucyA9IF9yZWY1WzFdO1xuICAgICAgU3R5bGUyLnJ1bGUoc2VsZWN0b3IsIFwid2lkdGhcIiwgX3RoaXM4LmNzc1NsaWRlV2lkdGgob3B0aW9ucyksIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBcImhlaWdodFwiLCBfdGhpczguY3NzU2xpZGVIZWlnaHQob3B0aW9ucykgfHwgXCIxMDAlXCIsIHdpZHRoKTtcbiAgICAgIFN0eWxlMi5ydWxlKHNlbGVjdG9yLCBfdGhpczgucmVzb2x2ZShcIm1hcmdpblJpZ2h0XCIpLCB1bml0KG9wdGlvbnMuZ2FwKSB8fCBcIjBweFwiLCB3aWR0aCk7XG4gICAgICBTdHlsZTIucnVsZShzZWxlY3RvciArIFwiID4gaW1nXCIsIFwiZGlzcGxheVwiLCBvcHRpb25zLmNvdmVyID8gXCJub25lXCIgOiBcImlubGluZVwiLCB3aWR0aCk7XG4gICAgfSk7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZFRyYW5zbGF0ZSA9IGZ1bmN0aW9uIGJ1aWxkVHJhbnNsYXRlKG9wdGlvbnMpIHtcbiAgICB2YXIgX3RoaXMkRGlyZWN0aW9uID0gdGhpcy5EaXJlY3Rpb24sXG4gICAgICAgIHJlc29sdmUgPSBfdGhpcyREaXJlY3Rpb24ucmVzb2x2ZSxcbiAgICAgICAgb3JpZW50ID0gX3RoaXMkRGlyZWN0aW9uLm9yaWVudDtcbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgdmFsdWVzLnB1c2godGhpcy5jc3NPZmZzZXRDbG9uZXMob3B0aW9ucykpO1xuICAgIHZhbHVlcy5wdXNoKHRoaXMuY3NzT2Zmc2V0R2FwcyhvcHRpb25zKSk7XG5cbiAgICBpZiAodGhpcy5pc0NlbnRlcihvcHRpb25zKSkge1xuICAgICAgdmFsdWVzLnB1c2godGhpcy5idWlsZENzc1ZhbHVlKG9yaWVudCgtNTApLCBcIiVcIikpO1xuICAgICAgdmFsdWVzLnB1c2guYXBwbHkodmFsdWVzLCB0aGlzLmNzc09mZnNldENlbnRlcihvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlcy5maWx0ZXIoQm9vbGVhbikubWFwKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgcmV0dXJuIFwidHJhbnNsYXRlXCIgKyByZXNvbHZlKFwiWFwiKSArIFwiKFwiICsgdmFsdWUgKyBcIilcIjtcbiAgICB9KS5qb2luKFwiIFwiKTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc09mZnNldENsb25lcyA9IGZ1bmN0aW9uIGNzc09mZnNldENsb25lcyhvcHRpb25zKSB7XG4gICAgdmFyIF90aGlzJERpcmVjdGlvbjIgPSB0aGlzLkRpcmVjdGlvbixcbiAgICAgICAgcmVzb2x2ZSA9IF90aGlzJERpcmVjdGlvbjIucmVzb2x2ZSxcbiAgICAgICAgb3JpZW50ID0gX3RoaXMkRGlyZWN0aW9uMi5vcmllbnQ7XG4gICAgdmFyIGNsb25lQ291bnQgPSB0aGlzLmdldENsb25lQ291bnQoKTtcblxuICAgIGlmICh0aGlzLmlzRml4ZWRXaWR0aChvcHRpb25zKSkge1xuICAgICAgdmFyIF90aGlzJHBhcnNlQ3NzVmFsdWUgPSB0aGlzLnBhcnNlQ3NzVmFsdWUob3B0aW9uc1tyZXNvbHZlKFwiZml4ZWRXaWR0aFwiKV0pLFxuICAgICAgICAgIHZhbHVlID0gX3RoaXMkcGFyc2VDc3NWYWx1ZS52YWx1ZSxcbiAgICAgICAgICB1bml0MiA9IF90aGlzJHBhcnNlQ3NzVmFsdWUudW5pdDtcblxuICAgICAgcmV0dXJuIHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQodmFsdWUpICogY2xvbmVDb3VudCwgdW5pdDIpO1xuICAgIH1cblxuICAgIHZhciBwZXJjZW50ID0gMTAwICogY2xvbmVDb3VudCAvIG9wdGlvbnMucGVyUGFnZTtcbiAgICByZXR1cm4gb3JpZW50KHBlcmNlbnQpICsgXCIlXCI7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NPZmZzZXRDZW50ZXIgPSBmdW5jdGlvbiBjc3NPZmZzZXRDZW50ZXIob3B0aW9ucykge1xuICAgIHZhciBfdGhpcyREaXJlY3Rpb24zID0gdGhpcy5EaXJlY3Rpb24sXG4gICAgICAgIHJlc29sdmUgPSBfdGhpcyREaXJlY3Rpb24zLnJlc29sdmUsXG4gICAgICAgIG9yaWVudCA9IF90aGlzJERpcmVjdGlvbjMub3JpZW50O1xuXG4gICAgaWYgKHRoaXMuaXNGaXhlZFdpZHRoKG9wdGlvbnMpKSB7XG4gICAgICB2YXIgX3RoaXMkcGFyc2VDc3NWYWx1ZTIgPSB0aGlzLnBhcnNlQ3NzVmFsdWUob3B0aW9uc1tyZXNvbHZlKFwiZml4ZWRXaWR0aFwiKV0pLFxuICAgICAgICAgIHZhbHVlID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTIudmFsdWUsXG4gICAgICAgICAgdW5pdDIgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlMi51bml0O1xuXG4gICAgICByZXR1cm4gW3RoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQodmFsdWUgLyAyKSwgdW5pdDIpXTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWVzID0gW107XG4gICAgdmFyIHBlclBhZ2UgPSBvcHRpb25zLnBlclBhZ2UsXG4gICAgICAgIGdhcCA9IG9wdGlvbnMuZ2FwO1xuICAgIHZhbHVlcy5wdXNoKG9yaWVudCg1MCAvIHBlclBhZ2UpICsgXCIlXCIpO1xuXG4gICAgaWYgKGdhcCkge1xuICAgICAgdmFyIF90aGlzJHBhcnNlQ3NzVmFsdWUzID0gdGhpcy5wYXJzZUNzc1ZhbHVlKGdhcCksXG4gICAgICAgICAgX3ZhbHVlID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTMudmFsdWUsXG4gICAgICAgICAgX3VuaXQgPSBfdGhpcyRwYXJzZUNzc1ZhbHVlMy51bml0O1xuXG4gICAgICB2YXIgZ2FwT2Zmc2V0ID0gKF92YWx1ZSAvIHBlclBhZ2UgLSBfdmFsdWUpIC8gMjtcbiAgICAgIHZhbHVlcy5wdXNoKHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQoZ2FwT2Zmc2V0KSwgX3VuaXQpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzT2Zmc2V0R2FwcyA9IGZ1bmN0aW9uIGNzc09mZnNldEdhcHMob3B0aW9ucykge1xuICAgIHZhciBjbG9uZUNvdW50ID0gdGhpcy5nZXRDbG9uZUNvdW50KCk7XG5cbiAgICBpZiAoY2xvbmVDb3VudCAmJiBvcHRpb25zLmdhcCkge1xuICAgICAgdmFyIG9yaWVudCA9IHRoaXMuRGlyZWN0aW9uLm9yaWVudDtcblxuICAgICAgdmFyIF90aGlzJHBhcnNlQ3NzVmFsdWU0ID0gdGhpcy5wYXJzZUNzc1ZhbHVlKG9wdGlvbnMuZ2FwKSxcbiAgICAgICAgICB2YWx1ZSA9IF90aGlzJHBhcnNlQ3NzVmFsdWU0LnZhbHVlLFxuICAgICAgICAgIHVuaXQyID0gX3RoaXMkcGFyc2VDc3NWYWx1ZTQudW5pdDtcblxuICAgICAgaWYgKHRoaXMuaXNGaXhlZFdpZHRoKG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJ1aWxkQ3NzVmFsdWUob3JpZW50KHZhbHVlICogY2xvbmVDb3VudCksIHVuaXQyKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHBlclBhZ2UgPSBvcHRpb25zLnBlclBhZ2U7XG4gICAgICB2YXIgZ2FwcyA9IGNsb25lQ291bnQgLyBwZXJQYWdlO1xuICAgICAgcmV0dXJuIHRoaXMuYnVpbGRDc3NWYWx1ZShvcmllbnQoZ2FwcyAqIHZhbHVlKSwgdW5pdDIpO1xuICAgIH1cblxuICAgIHJldHVybiBcIlwiO1xuICB9O1xuXG4gIF9wcm90bzMucmVzb2x2ZSA9IGZ1bmN0aW9uIHJlc29sdmUocHJvcCkge1xuICAgIHJldHVybiBjYW1lbFRvS2ViYWIodGhpcy5EaXJlY3Rpb24ucmVzb2x2ZShwcm9wKSk7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NQYWRkaW5nID0gZnVuY3Rpb24gY3NzUGFkZGluZyhvcHRpb25zLCByaWdodCkge1xuICAgIHZhciBwYWRkaW5nID0gb3B0aW9ucy5wYWRkaW5nO1xuICAgIHZhciBwcm9wID0gdGhpcy5EaXJlY3Rpb24ucmVzb2x2ZShyaWdodCA/IFwicmlnaHRcIiA6IFwibGVmdFwiLCB0cnVlKTtcbiAgICByZXR1cm4gcGFkZGluZyAmJiB1bml0KHBhZGRpbmdbcHJvcF0gfHwgKGlzT2JqZWN0KHBhZGRpbmcpID8gMCA6IHBhZGRpbmcpKSB8fCBcIjBweFwiO1xuICB9O1xuXG4gIF9wcm90bzMuY3NzVHJhY2tIZWlnaHQgPSBmdW5jdGlvbiBjc3NUcmFja0hlaWdodChvcHRpb25zKSB7XG4gICAgdmFyIGhlaWdodCA9IFwiXCI7XG5cbiAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIGhlaWdodCA9IHRoaXMuY3NzSGVpZ2h0KG9wdGlvbnMpO1xuICAgICAgYXNzZXJ0KGhlaWdodCwgJ1wiaGVpZ2h0XCIgaXMgbWlzc2luZy4nKTtcbiAgICAgIGhlaWdodCA9IFwiY2FsYyhcIiArIGhlaWdodCArIFwiIC0gXCIgKyB0aGlzLmNzc1BhZGRpbmcob3B0aW9ucywgZmFsc2UpICsgXCIgLSBcIiArIHRoaXMuY3NzUGFkZGluZyhvcHRpb25zLCB0cnVlKSArIFwiKVwiO1xuICAgIH1cblxuICAgIHJldHVybiBoZWlnaHQ7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NIZWlnaHQgPSBmdW5jdGlvbiBjc3NIZWlnaHQob3B0aW9ucykge1xuICAgIHJldHVybiB1bml0KG9wdGlvbnMuaGVpZ2h0KTtcbiAgfTtcblxuICBfcHJvdG8zLmNzc1NsaWRlV2lkdGggPSBmdW5jdGlvbiBjc3NTbGlkZVdpZHRoKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5hdXRvV2lkdGggPyBcIlwiIDogdW5pdChvcHRpb25zLmZpeGVkV2lkdGgpIHx8ICh0aGlzLmlzVmVydGljYWwoKSA/IFwiXCIgOiB0aGlzLmNzc1NsaWRlU2l6ZShvcHRpb25zKSk7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NTbGlkZUhlaWdodCA9IGZ1bmN0aW9uIGNzc1NsaWRlSGVpZ2h0KG9wdGlvbnMpIHtcbiAgICByZXR1cm4gdW5pdChvcHRpb25zLmZpeGVkSGVpZ2h0KSB8fCAodGhpcy5pc1ZlcnRpY2FsKCkgPyBvcHRpb25zLmF1dG9IZWlnaHQgPyBcIlwiIDogdGhpcy5jc3NTbGlkZVNpemUob3B0aW9ucykgOiB0aGlzLmNzc0hlaWdodChvcHRpb25zKSk7XG4gIH07XG5cbiAgX3Byb3RvMy5jc3NTbGlkZVNpemUgPSBmdW5jdGlvbiBjc3NTbGlkZVNpemUob3B0aW9ucykge1xuICAgIHZhciBnYXAgPSB1bml0KG9wdGlvbnMuZ2FwKTtcbiAgICByZXR1cm4gXCJjYWxjKCgxMDAlXCIgKyAoZ2FwICYmIFwiICsgXCIgKyBnYXApICsgXCIpL1wiICsgKG9wdGlvbnMucGVyUGFnZSB8fCAxKSArIChnYXAgJiYgXCIgLSBcIiArIGdhcCkgKyBcIilcIjtcbiAgfTtcblxuICBfcHJvdG8zLmNzc0FzcGVjdFJhdGlvID0gZnVuY3Rpb24gY3NzQXNwZWN0UmF0aW8ob3B0aW9ucykge1xuICAgIHZhciBoZWlnaHRSYXRpbyA9IG9wdGlvbnMuaGVpZ2h0UmF0aW87XG4gICAgcmV0dXJuIGhlaWdodFJhdGlvID8gXCJcIiArIDEgLyBoZWlnaHRSYXRpbyA6IFwiXCI7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZENzc1ZhbHVlID0gZnVuY3Rpb24gYnVpbGRDc3NWYWx1ZSh2YWx1ZSwgdW5pdDIpIHtcbiAgICByZXR1cm4gXCJcIiArIHZhbHVlICsgdW5pdDI7XG4gIH07XG5cbiAgX3Byb3RvMy5wYXJzZUNzc1ZhbHVlID0gZnVuY3Rpb24gcGFyc2VDc3NWYWx1ZSh2YWx1ZSkge1xuICAgIGlmIChpc1N0cmluZyh2YWx1ZSkpIHtcbiAgICAgIHZhciBudW1iZXIgPSBwYXJzZUZsb2F0KHZhbHVlKSB8fCAwO1xuICAgICAgdmFyIHVuaXQyID0gdmFsdWUucmVwbGFjZSgvXFxkKihcXC5cXGQqKT8vLCBcIlwiKSB8fCBcInB4XCI7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZTogbnVtYmVyLFxuICAgICAgICB1bml0OiB1bml0MlxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgdW5pdDogXCJweFwiXG4gICAgfTtcbiAgfTtcblxuICBfcHJvdG8zLnBhcnNlQnJlYWtwb2ludHMgPSBmdW5jdGlvbiBwYXJzZUJyZWFrcG9pbnRzKCkge1xuICAgIHZhciBfdGhpczkgPSB0aGlzO1xuXG4gICAgdmFyIGJyZWFrcG9pbnRzID0gdGhpcy5vcHRpb25zLmJyZWFrcG9pbnRzO1xuICAgIHRoaXMuYnJlYWtwb2ludHMucHVzaChbXCJkZWZhdWx0XCIsIHRoaXMub3B0aW9uc10pO1xuXG4gICAgaWYgKGJyZWFrcG9pbnRzKSB7XG4gICAgICBmb3JPd24oYnJlYWtwb2ludHMsIGZ1bmN0aW9uIChvcHRpb25zLCB3aWR0aCkge1xuICAgICAgICBfdGhpczkuYnJlYWtwb2ludHMucHVzaChbd2lkdGgsIG1lcmdlKG1lcmdlKHt9LCBfdGhpczkub3B0aW9ucyksIG9wdGlvbnMpXSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgX3Byb3RvMy5pc0ZpeGVkV2lkdGggPSBmdW5jdGlvbiBpc0ZpeGVkV2lkdGgob3B0aW9ucykge1xuICAgIHJldHVybiAhIW9wdGlvbnNbdGhpcy5EaXJlY3Rpb24ucmVzb2x2ZShcImZpeGVkV2lkdGhcIildO1xuICB9O1xuXG4gIF9wcm90bzMuaXNMb29wID0gZnVuY3Rpb24gaXNMb29wKCkge1xuICAgIHJldHVybiB0aGlzLm9wdGlvbnMudHlwZSA9PT0gTE9PUDtcbiAgfTtcblxuICBfcHJvdG8zLmlzQ2VudGVyID0gZnVuY3Rpb24gaXNDZW50ZXIob3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmZvY3VzID09PSBcImNlbnRlclwiKSB7XG4gICAgICBpZiAodGhpcy5pc0xvb3AoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50eXBlID09PSBTTElERSkge1xuICAgICAgICByZXR1cm4gIXRoaXMub3B0aW9ucy50cmltU3BhY2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIF9wcm90bzMuaXNWZXJ0aWNhbCA9IGZ1bmN0aW9uIGlzVmVydGljYWwoKSB7XG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5kaXJlY3Rpb24gPT09IFRUQjtcbiAgfTtcblxuICBfcHJvdG8zLmJ1aWxkQ2xhc3NlcyA9IGZ1bmN0aW9uIGJ1aWxkQ2xhc3NlcygpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcbiAgICByZXR1cm4gW0NMQVNTX1JPT1QsIENMQVNTX1JPT1QgKyBcIi0tXCIgKyBvcHRpb25zLnR5cGUsIENMQVNTX1JPT1QgKyBcIi0tXCIgKyBvcHRpb25zLmRpcmVjdGlvbiwgb3B0aW9ucy5kcmFnICYmIENMQVNTX1JPT1QgKyBcIi0tZHJhZ2dhYmxlXCIsIG9wdGlvbnMuaXNOYXZpZ2F0aW9uICYmIENMQVNTX1JPT1QgKyBcIi0tbmF2XCIsIENMQVNTX0FDVElWRSwgIXRoaXMuY29uZmlnLmhpZGRlbiAmJiBDTEFTU19SRU5ERVJFRF0uZmlsdGVyKEJvb2xlYW4pLmpvaW4oXCIgXCIpO1xuICB9O1xuXG4gIF9wcm90bzMuYnVpbGRBdHRycyA9IGZ1bmN0aW9uIGJ1aWxkQXR0cnMoYXR0cnMpIHtcbiAgICB2YXIgYXR0ciA9IFwiXCI7XG4gICAgZm9yT3duKGF0dHJzLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgYXR0ciArPSB2YWx1ZSA/IFwiIFwiICsgY2FtZWxUb0tlYmFiKGtleSkgKyBcIj1cXFwiXCIgKyB2YWx1ZSArIFwiXFxcIlwiIDogXCJcIjtcbiAgICB9KTtcbiAgICByZXR1cm4gYXR0ci50cmltKCk7XG4gIH07XG5cbiAgX3Byb3RvMy5idWlsZFN0eWxlcyA9IGZ1bmN0aW9uIGJ1aWxkU3R5bGVzKHN0eWxlcykge1xuICAgIHZhciBzdHlsZSA9IFwiXCI7XG4gICAgZm9yT3duKHN0eWxlcywgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgIHN0eWxlICs9IFwiIFwiICsgY2FtZWxUb0tlYmFiKGtleSkgKyBcIjpcIiArIHZhbHVlICsgXCI7XCI7XG4gICAgfSk7XG4gICAgcmV0dXJuIHN0eWxlLnRyaW0oKTtcbiAgfTtcblxuICBfcHJvdG8zLnJlbmRlclNsaWRlcyA9IGZ1bmN0aW9uIHJlbmRlclNsaWRlcygpIHtcbiAgICB2YXIgX3RoaXMxMCA9IHRoaXM7XG5cbiAgICB2YXIgdGFnID0gdGhpcy5jb25maWcuc2xpZGVUYWc7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLm1hcChmdW5jdGlvbiAoY29udGVudCkge1xuICAgICAgcmV0dXJuIFwiPFwiICsgdGFnICsgXCIgXCIgKyBfdGhpczEwLmJ1aWxkQXR0cnMoY29udGVudC5hdHRycykgKyBcIj5cIiArIChjb250ZW50Lmh0bWwgfHwgXCJcIikgKyBcIjwvXCIgKyB0YWcgKyBcIj5cIjtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIF9wcm90bzMuY292ZXIgPSBmdW5jdGlvbiBjb3Zlcihjb250ZW50KSB7XG4gICAgdmFyIHN0eWxlcyA9IGNvbnRlbnQuc3R5bGVzLFxuICAgICAgICBfY29udGVudCRodG1sID0gY29udGVudC5odG1sLFxuICAgICAgICBodG1sID0gX2NvbnRlbnQkaHRtbCA9PT0gdm9pZCAwID8gXCJcIiA6IF9jb250ZW50JGh0bWw7XG5cbiAgICBpZiAodGhpcy5vcHRpb25zLmNvdmVyICYmICF0aGlzLm9wdGlvbnMubGF6eUxvYWQpIHtcbiAgICAgIHZhciBzcmMgPSBodG1sLm1hdGNoKC88aW1nLio/c3JjXFxzKj1cXHMqKFsnXCJdKSguKz8pXFwxLio/Pi8pO1xuXG4gICAgICBpZiAoc3JjICYmIHNyY1syXSkge1xuICAgICAgICBzdHlsZXMuYmFja2dyb3VuZCA9IFwiY2VudGVyL2NvdmVyIG5vLXJlcGVhdCB1cmwoJ1wiICsgc3JjWzJdICsgXCInKVwiO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBfcHJvdG8zLmdlbmVyYXRlQ2xvbmVzID0gZnVuY3Rpb24gZ2VuZXJhdGVDbG9uZXMoY29udGVudHMpIHtcbiAgICB2YXIgY2xhc3NlcyA9IHRoaXMub3B0aW9ucy5jbGFzc2VzO1xuICAgIHZhciBjb3VudCA9IHRoaXMuZ2V0Q2xvbmVDb3VudCgpO1xuICAgIHZhciBzbGlkZXMgPSBjb250ZW50cy5zbGljZSgpO1xuXG4gICAgd2hpbGUgKHNsaWRlcy5sZW5ndGggPCBjb3VudCkge1xuICAgICAgcHVzaChzbGlkZXMsIHNsaWRlcyk7XG4gICAgfVxuXG4gICAgcHVzaChzbGlkZXMuc2xpY2UoLWNvdW50KS5yZXZlcnNlKCksIHNsaWRlcy5zbGljZSgwLCBjb3VudCkpLmZvckVhY2goZnVuY3Rpb24gKGNvbnRlbnQsIGluZGV4KSB7XG4gICAgICB2YXIgYXR0cnMgPSBhc3NpZ24oe30sIGNvbnRlbnQuYXR0cnMsIHtcbiAgICAgICAgY2xhc3M6IGNvbnRlbnQuYXR0cnMuY2xhc3MgKyBcIiBcIiArIGNsYXNzZXMuY2xvbmVcbiAgICAgIH0pO1xuICAgICAgdmFyIGNsb25lID0gYXNzaWduKHt9LCBjb250ZW50LCB7XG4gICAgICAgIGF0dHJzOiBhdHRyc1xuICAgICAgfSk7XG4gICAgICBpbmRleCA8IGNvdW50ID8gY29udGVudHMudW5zaGlmdChjbG9uZSkgOiBjb250ZW50cy5wdXNoKGNsb25lKTtcbiAgICB9KTtcbiAgfTtcblxuICBfcHJvdG8zLmdldENsb25lQ291bnQgPSBmdW5jdGlvbiBnZXRDbG9uZUNvdW50KCkge1xuICAgIGlmICh0aGlzLmlzTG9vcCgpKSB7XG4gICAgICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9ucztcblxuICAgICAgaWYgKG9wdGlvbnMuY2xvbmVzKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLmNsb25lcztcbiAgICAgIH1cblxuICAgICAgdmFyIHBlclBhZ2UgPSBtYXguYXBwbHkodm9pZCAwLCB0aGlzLmJyZWFrcG9pbnRzLm1hcChmdW5jdGlvbiAoX3JlZjYpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMyID0gX3JlZjZbMV07XG4gICAgICAgIHJldHVybiBvcHRpb25zMi5wZXJQYWdlO1xuICAgICAgfSkpO1xuICAgICAgcmV0dXJuIHBlclBhZ2UgKiAoKG9wdGlvbnMuZmxpY2tNYXhQYWdlcyB8fCAxKSArIDEpO1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9O1xuXG4gIF9wcm90bzMucmVuZGVyQXJyb3dzID0gZnVuY3Rpb24gcmVuZGVyQXJyb3dzKCkge1xuICAgIHZhciBodG1sID0gXCJcIjtcbiAgICBodG1sICs9IFwiPGRpdiBjbGFzcz1cXFwiXCIgKyB0aGlzLm9wdGlvbnMuY2xhc3Nlcy5hcnJvd3MgKyBcIlxcXCI+XCI7XG4gICAgaHRtbCArPSB0aGlzLnJlbmRlckFycm93KHRydWUpO1xuICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJBcnJvdyhmYWxzZSk7XG4gICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgIHJldHVybiBodG1sO1xuICB9O1xuXG4gIF9wcm90bzMucmVuZGVyQXJyb3cgPSBmdW5jdGlvbiByZW5kZXJBcnJvdyhwcmV2KSB7XG4gICAgdmFyIF90aGlzJG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMsXG4gICAgICAgIGNsYXNzZXMgPSBfdGhpcyRvcHRpb25zLmNsYXNzZXMsXG4gICAgICAgIGkxOG4gPSBfdGhpcyRvcHRpb25zLmkxOG47XG4gICAgdmFyIGF0dHJzID0ge1xuICAgICAgY2xhc3M6IGNsYXNzZXMuYXJyb3cgKyBcIiBcIiArIChwcmV2ID8gY2xhc3Nlcy5wcmV2IDogY2xhc3Nlcy5uZXh0KSxcbiAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICBhcmlhTGFiZWw6IHByZXYgPyBpMThuLnByZXYgOiBpMThuLm5leHRcbiAgICB9O1xuICAgIHJldHVybiBcIjxidXR0b24gXCIgKyB0aGlzLmJ1aWxkQXR0cnMoYXR0cnMpICsgXCI+PHN2ZyB4bWxucz1cXFwiXCIgKyBYTUxfTkFNRV9TUEFDRSArIFwiXFxcIiB2aWV3Qm94PVxcXCIwIDAgXCIgKyBTSVpFICsgXCIgXCIgKyBTSVpFICsgXCJcXFwiIHdpZHRoPVxcXCJcIiArIFNJWkUgKyBcIlxcXCIgaGVpZ2h0PVxcXCJcIiArIFNJWkUgKyBcIlxcXCI+PHBhdGggZD1cXFwiXCIgKyAodGhpcy5vcHRpb25zLmFycm93UGF0aCB8fCBQQVRIKSArIFwiXFxcIiAvPjwvc3ZnPjwvYnV0dG9uPlwiO1xuICB9O1xuXG4gIF9wcm90bzMuaHRtbCA9IGZ1bmN0aW9uIGh0bWwoKSB7XG4gICAgdmFyIF90aGlzJGNvbmZpZyA9IHRoaXMuY29uZmlnLFxuICAgICAgICByb290Q2xhc3MgPSBfdGhpcyRjb25maWcucm9vdENsYXNzLFxuICAgICAgICBsaXN0VGFnID0gX3RoaXMkY29uZmlnLmxpc3RUYWcsXG4gICAgICAgIGFycm93cyA9IF90aGlzJGNvbmZpZy5hcnJvd3MsXG4gICAgICAgIGJlZm9yZVRyYWNrID0gX3RoaXMkY29uZmlnLmJlZm9yZVRyYWNrLFxuICAgICAgICBhZnRlclRyYWNrID0gX3RoaXMkY29uZmlnLmFmdGVyVHJhY2ssXG4gICAgICAgIHNsaWRlciA9IF90aGlzJGNvbmZpZy5zbGlkZXIsXG4gICAgICAgIGJlZm9yZVNsaWRlciA9IF90aGlzJGNvbmZpZy5iZWZvcmVTbGlkZXIsXG4gICAgICAgIGFmdGVyU2xpZGVyID0gX3RoaXMkY29uZmlnLmFmdGVyU2xpZGVyO1xuICAgIHZhciBodG1sID0gXCJcIjtcbiAgICBodG1sICs9IFwiPGRpdiBpZD1cXFwiXCIgKyB0aGlzLmlkICsgXCJcXFwiIGNsYXNzPVxcXCJcIiArIHRoaXMuYnVpbGRDbGFzc2VzKCkgKyBcIiBcIiArIChyb290Q2xhc3MgfHwgXCJcIikgKyBcIlxcXCI+XCI7XG4gICAgaHRtbCArPSBcIjxzdHlsZT5cIiArIHRoaXMuU3R5bGUuYnVpbGQoKSArIFwiPC9zdHlsZT5cIjtcblxuICAgIGlmIChzbGlkZXIpIHtcbiAgICAgIGh0bWwgKz0gYmVmb3JlU2xpZGVyIHx8IFwiXCI7XG4gICAgICBodG1sICs9IFwiPGRpdiBjbGFzcz1cXFwic3BsaWRlX19zbGlkZXJcXFwiPlwiO1xuICAgIH1cblxuICAgIGh0bWwgKz0gYmVmb3JlVHJhY2sgfHwgXCJcIjtcblxuICAgIGlmIChhcnJvd3MpIHtcbiAgICAgIGh0bWwgKz0gdGhpcy5yZW5kZXJBcnJvd3MoKTtcbiAgICB9XG5cbiAgICBodG1sICs9IFwiPGRpdiBjbGFzcz1cXFwic3BsaWRlX190cmFja1xcXCI+XCI7XG4gICAgaHRtbCArPSBcIjxcIiArIGxpc3RUYWcgKyBcIiBjbGFzcz1cXFwic3BsaWRlX19saXN0XFxcIj5cIjtcbiAgICBodG1sICs9IHRoaXMucmVuZGVyU2xpZGVzKCk7XG4gICAgaHRtbCArPSBcIjwvXCIgKyBsaXN0VGFnICsgXCI+XCI7XG4gICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgIGh0bWwgKz0gYWZ0ZXJUcmFjayB8fCBcIlwiO1xuXG4gICAgaWYgKHNsaWRlcikge1xuICAgICAgaHRtbCArPSBcIjwvZGl2PlwiO1xuICAgICAgaHRtbCArPSBhZnRlclNsaWRlciB8fCBcIlwiO1xuICAgIH1cblxuICAgIGh0bWwgKz0gXCI8L2Rpdj5cIjtcbiAgICByZXR1cm4gaHRtbDtcbiAgfTtcblxuICByZXR1cm4gU3BsaWRlUmVuZGVyZXI7XG59KCk7XG5cbmV4cG9ydHMuQ0xBU1NFUyA9IENMQVNTRVM7XG5leHBvcnRzLkNMQVNTX0FDVElWRSA9IENMQVNTX0FDVElWRTtcbmV4cG9ydHMuQ0xBU1NfQVJST1cgPSBDTEFTU19BUlJPVztcbmV4cG9ydHMuQ0xBU1NfQVJST1dTID0gQ0xBU1NfQVJST1dTO1xuZXhwb3J0cy5DTEFTU19BUlJPV19ORVhUID0gQ0xBU1NfQVJST1dfTkVYVDtcbmV4cG9ydHMuQ0xBU1NfQVJST1dfUFJFViA9IENMQVNTX0FSUk9XX1BSRVY7XG5leHBvcnRzLkNMQVNTX0NMT05FID0gQ0xBU1NfQ0xPTkU7XG5leHBvcnRzLkNMQVNTX0NPTlRBSU5FUiA9IENMQVNTX0NPTlRBSU5FUjtcbmV4cG9ydHMuQ0xBU1NfRk9DVVNfSU4gPSBDTEFTU19GT0NVU19JTjtcbmV4cG9ydHMuQ0xBU1NfSU5JVElBTElaRUQgPSBDTEFTU19JTklUSUFMSVpFRDtcbmV4cG9ydHMuQ0xBU1NfTElTVCA9IENMQVNTX0xJU1Q7XG5leHBvcnRzLkNMQVNTX0xPQURJTkcgPSBDTEFTU19MT0FESU5HO1xuZXhwb3J0cy5DTEFTU19ORVhUID0gQ0xBU1NfTkVYVDtcbmV4cG9ydHMuQ0xBU1NfT1ZFUkZMT1cgPSBDTEFTU19PVkVSRkxPVztcbmV4cG9ydHMuQ0xBU1NfUEFHSU5BVElPTiA9IENMQVNTX1BBR0lOQVRJT047XG5leHBvcnRzLkNMQVNTX1BBR0lOQVRJT05fUEFHRSA9IENMQVNTX1BBR0lOQVRJT05fUEFHRTtcbmV4cG9ydHMuQ0xBU1NfUFJFViA9IENMQVNTX1BSRVY7XG5leHBvcnRzLkNMQVNTX1BST0dSRVNTID0gQ0xBU1NfUFJPR1JFU1M7XG5leHBvcnRzLkNMQVNTX1BST0dSRVNTX0JBUiA9IENMQVNTX1BST0dSRVNTX0JBUjtcbmV4cG9ydHMuQ0xBU1NfUk9PVCA9IENMQVNTX1JPT1Q7XG5leHBvcnRzLkNMQVNTX1NMSURFID0gQ0xBU1NfU0xJREU7XG5leHBvcnRzLkNMQVNTX1NQSU5ORVIgPSBDTEFTU19TUElOTkVSO1xuZXhwb3J0cy5DTEFTU19TUiA9IENMQVNTX1NSO1xuZXhwb3J0cy5DTEFTU19UT0dHTEUgPSBDTEFTU19UT0dHTEU7XG5leHBvcnRzLkNMQVNTX1RPR0dMRV9QQVVTRSA9IENMQVNTX1RPR0dMRV9QQVVTRTtcbmV4cG9ydHMuQ0xBU1NfVE9HR0xFX1BMQVkgPSBDTEFTU19UT0dHTEVfUExBWTtcbmV4cG9ydHMuQ0xBU1NfVFJBQ0sgPSBDTEFTU19UUkFDSztcbmV4cG9ydHMuQ0xBU1NfVklTSUJMRSA9IENMQVNTX1ZJU0lCTEU7XG5leHBvcnRzLkRFRkFVTFRTID0gREVGQVVMVFM7XG5leHBvcnRzLkVWRU5UX0FDVElWRSA9IEVWRU5UX0FDVElWRTtcbmV4cG9ydHMuRVZFTlRfQVJST1dTX01PVU5URUQgPSBFVkVOVF9BUlJPV1NfTU9VTlRFRDtcbmV4cG9ydHMuRVZFTlRfQVJST1dTX1VQREFURUQgPSBFVkVOVF9BUlJPV1NfVVBEQVRFRDtcbmV4cG9ydHMuRVZFTlRfQVVUT1BMQVlfUEFVU0UgPSBFVkVOVF9BVVRPUExBWV9QQVVTRTtcbmV4cG9ydHMuRVZFTlRfQVVUT1BMQVlfUExBWSA9IEVWRU5UX0FVVE9QTEFZX1BMQVk7XG5leHBvcnRzLkVWRU5UX0FVVE9QTEFZX1BMQVlJTkcgPSBFVkVOVF9BVVRPUExBWV9QTEFZSU5HO1xuZXhwb3J0cy5FVkVOVF9DTElDSyA9IEVWRU5UX0NMSUNLO1xuZXhwb3J0cy5FVkVOVF9ERVNUUk9ZID0gRVZFTlRfREVTVFJPWTtcbmV4cG9ydHMuRVZFTlRfRFJBRyA9IEVWRU5UX0RSQUc7XG5leHBvcnRzLkVWRU5UX0RSQUdHRUQgPSBFVkVOVF9EUkFHR0VEO1xuZXhwb3J0cy5FVkVOVF9EUkFHR0lORyA9IEVWRU5UX0RSQUdHSU5HO1xuZXhwb3J0cy5FVkVOVF9FTkRfSU5ERVhfQ0hBTkdFRCA9IEVWRU5UX0VORF9JTkRFWF9DSEFOR0VEO1xuZXhwb3J0cy5FVkVOVF9ISURERU4gPSBFVkVOVF9ISURERU47XG5leHBvcnRzLkVWRU5UX0lOQUNUSVZFID0gRVZFTlRfSU5BQ1RJVkU7XG5leHBvcnRzLkVWRU5UX0xBWllMT0FEX0xPQURFRCA9IEVWRU5UX0xBWllMT0FEX0xPQURFRDtcbmV4cG9ydHMuRVZFTlRfTU9VTlRFRCA9IEVWRU5UX01PVU5URUQ7XG5leHBvcnRzLkVWRU5UX01PVkUgPSBFVkVOVF9NT1ZFO1xuZXhwb3J0cy5FVkVOVF9NT1ZFRCA9IEVWRU5UX01PVkVEO1xuZXhwb3J0cy5FVkVOVF9OQVZJR0FUSU9OX01PVU5URUQgPSBFVkVOVF9OQVZJR0FUSU9OX01PVU5URUQ7XG5leHBvcnRzLkVWRU5UX09WRVJGTE9XID0gRVZFTlRfT1ZFUkZMT1c7XG5leHBvcnRzLkVWRU5UX1BBR0lOQVRJT05fTU9VTlRFRCA9IEVWRU5UX1BBR0lOQVRJT05fTU9VTlRFRDtcbmV4cG9ydHMuRVZFTlRfUEFHSU5BVElPTl9VUERBVEVEID0gRVZFTlRfUEFHSU5BVElPTl9VUERBVEVEO1xuZXhwb3J0cy5FVkVOVF9SRUFEWSA9IEVWRU5UX1JFQURZO1xuZXhwb3J0cy5FVkVOVF9SRUZSRVNIID0gRVZFTlRfUkVGUkVTSDtcbmV4cG9ydHMuRVZFTlRfUkVTSVpFID0gRVZFTlRfUkVTSVpFO1xuZXhwb3J0cy5FVkVOVF9SRVNJWkVEID0gRVZFTlRfUkVTSVpFRDtcbmV4cG9ydHMuRVZFTlRfU0NST0xMID0gRVZFTlRfU0NST0xMO1xuZXhwb3J0cy5FVkVOVF9TQ1JPTExFRCA9IEVWRU5UX1NDUk9MTEVEO1xuZXhwb3J0cy5FVkVOVF9TSElGVEVEID0gRVZFTlRfU0hJRlRFRDtcbmV4cG9ydHMuRVZFTlRfU0xJREVfS0VZRE9XTiA9IEVWRU5UX1NMSURFX0tFWURPV047XG5leHBvcnRzLkVWRU5UX1VQREFURUQgPSBFVkVOVF9VUERBVEVEO1xuZXhwb3J0cy5FVkVOVF9WSVNJQkxFID0gRVZFTlRfVklTSUJMRTtcbmV4cG9ydHMuRXZlbnRCaW5kZXIgPSBFdmVudEJpbmRlcjtcbmV4cG9ydHMuRXZlbnRJbnRlcmZhY2UgPSBFdmVudEludGVyZmFjZTtcbmV4cG9ydHMuRkFERSA9IEZBREU7XG5leHBvcnRzLkxPT1AgPSBMT09QO1xuZXhwb3J0cy5MVFIgPSBMVFI7XG5leHBvcnRzLlJUTCA9IFJUTDtcbmV4cG9ydHMuUmVxdWVzdEludGVydmFsID0gUmVxdWVzdEludGVydmFsO1xuZXhwb3J0cy5TTElERSA9IFNMSURFO1xuZXhwb3J0cy5TVEFUVVNfQ0xBU1NFUyA9IFNUQVRVU19DTEFTU0VTO1xuZXhwb3J0cy5TcGxpZGUgPSBTcGxpZGU7XG5leHBvcnRzLlNwbGlkZVJlbmRlcmVyID0gU3BsaWRlUmVuZGVyZXI7XG5leHBvcnRzLlN0YXRlID0gU3RhdGU7XG5leHBvcnRzLlRUQiA9IFRUQjtcbmV4cG9ydHMuVGhyb3R0bGUgPSBUaHJvdHRsZTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gU3BsaWRlO1xuIiwiLyoqXG4gKiBjb21wb25lbnQgLSBvYmplY3Qgd2l0aCBpbnN0YW5jZSwgcm9vdFNlbGVjdG9yXG4gKiBleGFtcGxlOlxuICoge1xuICogIGluc3RhbmNlOiBTcGxpZGUsXG4gKiAgcm9vdFNlbGVjdG9yOiAnLnNwbGlkZScsXG4gKiB9XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBhZ2VNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoY29tcG9uZW50cyA9IFtdKSB7XG4gICAgdGhpcy5jb21wb25lbnRzID0gY29tcG9uZW50cztcbiAgICB0aGlzLmluaXQoKTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5jb21wb25lbnRzLmZvckVhY2goKGNvbXBvbmVudCkgPT4ge1xuICAgICAgaWYgKCFjb21wb25lbnQuaW5zdGFuY2UpIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiQ29tcG9uZW50IGlzIG1pc3NpbmcgaW5zdGFuY2UgcHJvcGVydHk6XCIsIGNvbXBvbmVudCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAhY29tcG9uZW50LnJvb3RTZWxlY3RvciB8fFxuICAgICAgICAhZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb21wb25lbnQucm9vdFNlbGVjdG9yKVxuICAgICAgKSB7XG4gICAgICAgIGNvbnNvbGUud2FybihcIkNvbXBvbmVudCByb290IGVsZW1lbnQgbm90IGZvdW5kOlwiLCBjb21wb25lbnQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIG5ldyBjb21wb25lbnQuaW5zdGFuY2UoY29tcG9uZW50LnJvb3RTZWxlY3Rvcik7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLndhcm4oXCJGYWlsZWQgdG8gaW5pdGlhbGl6ZSBjb21wb25lbnQ6XCIsIGNvbXBvbmVudCwgZXJyb3IpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iLCJmdW5jdGlvbiBvbkNvbnRlbnRMb2FkZWQoY2FsbGJhY2spIHtcbiAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwibG9hZGluZ1wiKSB7XG4gICAgY2FsbGJhY2soKTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBjYWxsYmFjayk7XG4gIH1cbn1cblxuZXhwb3J0IHsgb25Db250ZW50TG9hZGVkIH07XG4iLCIvLyBHZW5lcmFsXG5pbXBvcnQgeyBvbkNvbnRlbnRMb2FkZWQgfSBmcm9tIFwiLi9nZW5lcmFsL3V0aWxzXCI7XG5pbXBvcnQgUGFnZU1hbmFnZXIgZnJvbSBcIi4vZ2VuZXJhbC9wYWdlLW1hbmFnZXJcIjtcblxuLy8gUGFnZXNcbmltcG9ydCBMYXVuY2hQYWdlIGZyb20gXCIuL3BhZ2VzL2xhdW5jaFwiO1xuXG5vbkNvbnRlbnRMb2FkZWQoKCkgPT4ge1xuICBuZXcgUGFnZU1hbmFnZXIoW1xuICAgIHtcbiAgICAgIGluc3RhbmNlOiBMYXVuY2hQYWdlLFxuICAgICAgcm9vdFNlbGVjdG9yOiBcIi5wYWdlX2xhdW5jaFwiLFxuICAgIH0sXG4gIF0pO1xufSk7XG4iLCJpbXBvcnQgU3BsaWRlIGZyb20gXCJAc3BsaWRlanMvc3BsaWRlXCI7XG5cbmNsYXNzIExhdW5jaFBhZ2Uge1xuICBjb25zdHJ1Y3Rvcihyb290U2VsZWN0b3IpIHtcbiAgICBjb25zdCByb290RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHJvb3RTZWxlY3Rvcik7XG4gICAgaWYgKCFyb290RWwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgTm8gZWxlbWVudCBmb3VuZCB3aXRoIHNlbGVjdG9yICR7cm9vdFNlbGVjdG9yfWApO1xuICAgIH1cbiAgICB0aGlzLnJvb3RFbCA9IHJvb3RFbDtcbiAgICB0aGlzLmNhcmRzR3JpZCA9IHRoaXMucm9vdEVsLnF1ZXJ5U2VsZWN0b3IoXCIjbGF1bmNoQ2FyZHNcIik7XG4gICAgdGhpcy5pbml0KCk7XG4gIH1cbiAgaW5pdCgpIHtcbiAgICBjb25zb2xlLmxvZyhcIkxhdW5jaFBhZ2UgaW5pdFwiKTtcbiAgfVxuICAjaW5pdFNwbGlkZSgpIHtcbiAgICBjb25zdCBsYXVuY2hTcGxpZGUgPSBuZXcgU3BsaWRlKHRoaXMuY2FyZHNHcmlkLCB7XG4gICAgICB0eXBlOiBcImxvb3BcIixcbiAgICAgIHBlclBhZ2U6IDYsXG4gICAgICBwZXJNb3ZlOiAxLFxuICAgICAgZ2FwOiAxMixcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDE4NjA6IHtcbiAgICAgICAgICBwZXJQYWdlOiA1LFxuICAgICAgICB9LFxuICAgICAgICAxMDI0OiB7XG4gICAgICAgICAgcGVyUGFnZTogNCxcbiAgICAgICAgfSxcbiAgICAgICAgNzY4OiB7XG4gICAgICAgICAgcGVyUGFnZTogMyxcbiAgICAgICAgfSxcbiAgICAgICAgNjIwOiB7XG4gICAgICAgICAgcGVyUGFnZTogMixcbiAgICAgICAgfSxcbiAgICAgICAgMzIwOiB7XG4gICAgICAgICAgcGVyUGFnZTogMSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgbGF1bmNoU3BsaWRlLm1vdW50KCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTGF1bmNoUGFnZTtcbiJdfQ==
