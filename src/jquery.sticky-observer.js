import stickyObserver from "./sticky-observer";

/**
 * jQuery wrapper for stickyObserver
 */
const plugin = window.$ || window.jQuery;
if (plugin) {
  plugin.fn.stickyObserver = function(opts) {
    return stickyObserver(this.get(), opts);
  };
}
