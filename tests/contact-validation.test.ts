import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { resolvePublicSiteUrl } from '../src/lib/site-url.ts';

describe('site-url', () => {
  it('rejects example.com', () => {
    assert.equal(resolvePublicSiteUrl('https://example.com'), undefined);
  });

  it('accepts valid production URL', () => {
    assert.equal(resolvePublicSiteUrl('https://edinsondelgado.com'), 'https://edinsondelgado.com');
  });

  it('returns undefined for empty', () => {
    assert.equal(resolvePublicSiteUrl(''), undefined);
  });
});

describe('contact validation rules', () => {
  function validate(payload: Record<string, string>) {
    const errors: string[] = [];
    const name = payload.name?.trim() ?? '';
    const email = payload.email?.trim() ?? '';
    const subject = payload.subject?.trim() ?? '';
    const message = payload.message?.trim() ?? '';

    if (name.length < 2) errors.push('Nombre inválido');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Email inválido');
    if (/[\r\n]/.test(email) || /[\r\n]/.test(subject)) errors.push('Inyección de cabeceras');
    if (subject.length < 5) errors.push('Asunto corto');
    if (message.length < 20) errors.push('Mensaje corto');
    if (payload.website) errors.push('Honeypot');

    return errors;
  }

  it('rejects honeypot', () => {
    const errors = validate({
      name: 'Edinson',
      email: 'test@example.org',
      subject: 'Consulta proyecto',
      message: 'Mensaje de prueba con longitud suficiente.',
      website: 'spam',
    });
    assert.ok(errors.includes('Honeypot'));
  });

  it('accepts valid payload', () => {
    const errors = validate({
      name: 'Edinson',
      email: 'test@example.org',
      subject: 'Consulta proyecto',
      message: 'Mensaje de prueba con longitud suficiente.',
      website: '',
    });
    assert.equal(errors.length, 0);
  });
});
