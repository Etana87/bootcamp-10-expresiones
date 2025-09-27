import {
  normalizeIban,
  isWellFormedSpanishIban,
  isWellFormedSpanishIbanStrict,
  parseSpanishIban,
  formatSpanishIban,
} from './iban';

const samples = [
  'ES21 1465 0100 72 2030876293',
  'ES2114650100722030876293',
  'ES21-1465-0100-72-2030876293',
  'ES6621000418401234567891',
  'ES21_1465_0100_72_2030876293', // separadores no válidos en "estricta", pero sí normalizable
  'ES661234',                      // demasiado corto → mal
  'PT50123456789012345678901',     // país incorrecto → mal
];

for (const input of samples) {
  const normalized = normalizeIban(input);
  const okSoft = isWellFormedSpanishIban(input);
  const okStrict = isWellFormedSpanishIbanStrict(input);
  const parts = parseSpanishIban(input);
  const pretty = formatSpanishIban(input);

  console.log('='.repeat(60));
  console.log('Entrada:      ', input);
  console.log('Normalizado:  ', normalized);
  console.log('Válido (suave): ', okSoft);
  console.log('Válido (estricto): ', okStrict);
  console.log('Partes:       ', parts);
  console.log('Formateado:   ', pretty);
}
