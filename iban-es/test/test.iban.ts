import { describe, it, expect } from 'vitest';
import {
  normalizeIban,
  isWellFormedSpanishIban,
  isWellFormedSpanishIbanStrict,
  parseSpanishIban,
  formatSpanishIban,
} from '../src/iban';

describe('Apartado A - IBAN español bien formado', () => {
  const valids = [
    'ES21 1465 0100 72 2030876293',
    'ES2114650100722030876293',
    'ES21-1465-0100-72-2030876293',
    'ES6621000418401234567891',
    'es21 1465 0100 72 2030876293', // minúsculas
  ];

  it('normalizeIban quita separadores y pasa a mayúsculas', () => {
    expect(normalizeIban('es21-1465 0100_72/2030876293')).toBe('ES2114650100722030876293');
  });

  it('isWellFormedSpanishIban (suave) acepta entradas válidas', () => {
    for (const v of valids) {
      expect(isWellFormedSpanishIban(v), v).toBe(true);
    }
  });

  it('isWellFormedSpanishIbanStrict (estricto) acepta con espacios o guiones en los límites correctos', () => {
    expect(isWellFormedSpanishIbanStrict('ES21 1465 0100 72 2030876293')).toBe(true);
    expect(isWellFormedSpanishIbanStrict('ES21-1465-0100-72-2030876293')).toBe(true);
    expect(isWellFormedSpanishIbanStrict('ES2114650100722030876293')).toBe(true); // sin separadores

    // separadores inconsistentes o en posiciones erróneas → false:
    expect(isWellFormedSpanishIbanStrict('ES21_1465_0100_72_2030876293')).toBe(false);
    expect(isWellFormedSpanishIbanStrict('ES2 11465 0100 72 2030876293')).toBe(false);
  });

  it('rechaza países o longitudes incorrectas', () => {
    expect(isWellFormedSpanishIban('PT50123456789012345678901')).toBe(false); // país PT
    expect(isWellFormedSpanishIban('ES661234')).toBe(false); // demasiado corto
  });

  it('parseSpanishIban extrae partes si es bien formado (suave)', () => {
    const p = parseSpanishIban('ES21 1465 0100 72 2030876293');
    expect(p).toEqual({
      country: 'ES',
      check: '21',
      bank: '1465',
      branch: '0100',
      control: '72',
      account: '2030876293',
    });
  });

  it('formatSpanishIban presenta bonito con espacios por defecto', () => {
    const pretty = formatSpanishIban('ES2114650100722030876293');
    expect(pretty).toBe('ES21 1465 0100 72 2030876293');
  });
});
