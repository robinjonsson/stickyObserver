(function(){'use strict';/**
 * Version: 1.0.0
 * Observer changes on sticky elements
 * @param {HTMLElement} target - DOM element(s) to observe.
 * @param {function} enter - Function triggerd when enters sticky state.
 * @param {function} leave - Function triggerd when leaves sticky state.
 * @param {string} stickyClass - When then container was created.
 */
function stickyObserver(target, _temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$stickyClass = _ref.stickyClass,
      stickyClass = _ref$stickyClass === void 0 ? "is-sticky" : _ref$stickyClass,
      _ref$enter = _ref.enter,
      enter = _ref$enter === void 0 ? null : _ref$enter,
      _ref$leave = _ref.leave,
      leave = _ref$leave === void 0 ? null : _ref$leave;

  if (target === 0) return;
  if (!("length" in target)) target = [target];
  var eventsToBind = [[document, "scroll"], [document, "touchmove"], [window, "resize"], [window, "orientationchange"]];
  target.forEach(function (el) {
    var active = 0;
    observe(el); // Bind events

    eventsToBind.forEach(function (eventPair) {
      eventPair[0].addEventListener(eventPair[1], observe, {
        passive: true
      });
    });
    /**
     * Observe and trigger sticky events
     */

    function observe() {
      var elementOffset = el.getBoundingClientRect().top;
      var stickyOffset = parseInt(getComputedStyle(el).top);
      var isSticky = elementOffset === stickyOffset;

      if (isSticky && active === 0) {
        el.classList.add(stickyClass);
        if (enter) enter();
        active = 1;
      } else if (!isSticky && active === 1) {
        el.classList.remove(stickyClass);
        if (leave) leave();
        active = 0;
      }
    }
  });
}/**
 * jQuery wrapper for stickyObserver
 */

var plugin = window.$ || window.jQuery;

if (plugin) {
  plugin.fn.stickyObserver = function (opts) {
    return stickyObserver(this.get(), opts);
  };
}}());