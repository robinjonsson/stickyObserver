/**
 * Version: {{version}}
 * Observer changes on sticky elements
 * @param {HTMLElement} target - DOM element(s) to observe.
 * @param {function} enter - Function triggerd when enters sticky state.
 * @param {function} leave - Function triggerd when leaves sticky state.
 * @param {string} stickyClass - When then container was created.
 */
function stickyObserver(
  target,
  { stickyClass = "is-sticky", enter = null, leave = null } = {}
) {
  if (target === 0) return;
  if (!("length" in target)) target = [target];

  const eventsToBind = [
    [document, "scroll"],
    [document, "touchmove"],
    [window, "resize"],
    [window, "orientationchange"]
  ];

  target.forEach(el => {
    let active = 0;
    observe(el);

    // Bind events
    eventsToBind.forEach(eventPair => {
      eventPair[0].addEventListener(eventPair[1], observe, { passive: true });
    });

    /**
     * Observe and trigger sticky events
     */
    function observe() {
      const elementOffset = el.getBoundingClientRect().top;
      const stickyOffset = parseInt(getComputedStyle(el).top);
      const isSticky = elementOffset === stickyOffset;

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
}

export default stickyObserver;
