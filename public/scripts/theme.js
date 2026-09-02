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
    getToggleButtons().forEach(function (button) {
      var next = theme === 'dark' ? 'light' : 'dark';
      button.setAttribute('aria-label', 'Cambiar a modo ' + (next === 'dark' ? 'oscuro' : 'claro'));
      button.textContent = theme === 'dark' ? 'Modo claro' : 'Modo oscuro';
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
