(function () {
  var panel;
  var toggle;
  var links;
  var focusable;
  var lastFocused;

  function getFocusable(container) {
    return Array.prototype.slice
      .call(
        container.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      )
      .filter(function (el) {
        return !el.hasAttribute('disabled') && el.offsetParent !== null;
      });
  }

  function openMenu() {
    if (!panel || !toggle) return;
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('nav-open');
    focusable = getFocusable(panel);
    if (focusable.length) focusable[0].focus();
  }

  function closeMenu() {
    if (!panel || !toggle) return;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('nav-open');
    if (lastFocused) lastFocused.focus();
  }

  function isOpen() {
    return panel && !panel.hidden;
  }

  document.addEventListener('DOMContentLoaded', function () {
    panel = document.querySelector('[data-nav-panel]');
    toggle = document.querySelector('[data-nav-toggle]');
    links = document.querySelectorAll('[data-nav-link]');

    if (!panel || !toggle) return;

    toggle.addEventListener('click', function () {
      if (isOpen()) {
        closeMenu();
      } else {
        lastFocused = document.activeElement;
        openMenu();
      }
    });

    document.addEventListener('keydown', function (event) {
      if (!isOpen()) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key !== 'Tab') return;

      focusable = getFocusable(panel);
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    links.forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.matchMedia('(max-width: 1023px)').matches) {
          closeMenu();
        }
      });
    });

    if (window.matchMedia('(min-width: 1024px)').matches) {
      panel.hidden = false;
    } else {
      panel.hidden = true;
    }

    window.addEventListener('resize', function () {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        panel.hidden = false;
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      } else if (!isOpen()) {
        panel.hidden = true;
      }
    });
  });
})();
