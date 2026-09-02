(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;

  var statusEl = document.getElementById('contact-form-status');
  var submitBtn = form.querySelector('[type="submit"]');

  function setStatus(message, type) {
    if (!statusEl) return;
    statusEl.textContent = message;
    statusEl.className = 'contact-form__status contact-form__status--' + type;
    statusEl.setAttribute('role', 'status');
    statusEl.setAttribute('aria-live', 'polite');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (!submitBtn) return;

    submitBtn.disabled = true;
    setStatus('Enviando mensaje…', 'loading');

    var formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
      .then(function (response) {
        return response.json().then(function (data) {
          return { ok: response.ok, data: data };
        });
      })
      .then(function (result) {
        if (result.ok && result.data.ok) {
          form.reset();
          setStatus('Mensaje enviado correctamente. Responderé a la brevedad.', 'success');
        } else {
          setStatus(result.data.error || 'No se pudo enviar el mensaje.', 'error');
        }
      })
      .catch(function () {
        setStatus('Error de conexión. Intente nuevamente o use el email directo.', 'error');
      })
      .finally(function () {
        submitBtn.disabled = false;
      });
  });
})();
