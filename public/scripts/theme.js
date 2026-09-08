(function () {
  var storageKey = 'portfolio-theme';

  function getToggleButtons() {
    return document.querySelectorAll('[data-theme-toggle]');
  }

  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {
      /* ignore */
    }

    var next = theme === 'dark' ? 'light' : 'dark';
    var nextLabel = next === 'dark' ? 'oscuro' : 'claro';
    var actionLabel = 'Cambiar a modo ' + nextLabel;
    var shortLabel = next === 'dark' ? 'Modo oscuro' : 'Modo claro';

    getToggleButtons().forEach(function (button) {
      button.setAttribute('aria-label', actionLabel);
      button.setAttribute('title', actionLabel);
      button.setAttribute('data-theme-current', theme);

      var textLabel = button.querySelector('[data-theme-label]');
      if (textLabel) {
        textLabel.textContent = shortLabel;
      } else if (!button.classList.contains('site-nav__theme--icon')) {
        button.textContent = shortLabel;
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    getToggleButtons().forEach(function (button) {
      button.addEventListener('click', function () {
        var current = getCurrentTheme();
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
    });
    applyTheme(getCurrentTheme());
  });
})();
