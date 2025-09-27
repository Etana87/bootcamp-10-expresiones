export interface SpanishIbanParts {
  country: 'ES';
  check: string;   // dígitos de control del IBAN (2)
  bank: string;    // código de banco (4)
  branch: string;  // código de sucursal (4)
  control: string; // dígito(s) de control nacionales (2)
  account: string; // número de cuenta (10)
}

/**
 * Quita todo lo que no sea [A-Za-z0-9] y convierte a mayúsculas.
 * Deja el IBAN en una forma "canónica" para validar o parsear.
 */
export function normalizeIban(raw: string): string {
  return raw.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
}

/**
 * Validación de IBAN español:
 * - Tras normalizar, debe cumplir ES + 22 dígitos (total 24 caracteres).
 */
export function isWellFormedSpanishIban(raw: string): boolean {
  const n = normalizeIban(raw);
  return /^ES\d{22}$/.test(n);
}

/**
 * Validación "estricta" de IBAN español (si hay separadores, deben ser todos espacios o todos guiones,
 * y solo en los límites correctos). También acepta la forma sin separadores.
 *
 * Formas válidas:
 *   - ESXX XXXX XXXX XX XXXXXXXXX
 *   - ESXX-XXXX-XXXX-XX-XXXXXXXXX
 *   - ESXXXXXXXXXXXXXXXXXXXXX 
 */
export function isWellFormedSpanishIbanStrict(raw: string): boolean {
  const s = raw.trim();

  // Acepta sin separadores o con separadores uniformes y en posiciones correctas.
  const re = /^ES\d{2}(?:([ -])\d{4}\1\d{4}\1\d{2}\1\d{10}|\d{20})$/i;

  return re.test(s);
}

/**
 * Extrae las partes de un IBAN español (asume que es "bien formado").
 * Devuelve null si no es bien formado (según validación suave).
 */
export function parseSpanishIban(raw: string): SpanishIbanParts | null {
  const n = normalizeIban(raw);
  const m = /^ES(\d{2})(\d{4})(\d{4})(\d{2})(\d{10})$/.exec(n);
  if (!m) return null;

  return {
    country: 'ES',
    check: m[1],
    bank: m[2],
    branch: m[3],
    control: m[4],
    account: m[5],
  };
}

/**
 * (Opcional) Formatea un IBAN normalizado con separador elegido (espacio por defecto).
 * Útil para mostrar bonito: ESdd dddd dddd dd dddddddddd
 */
export function formatSpanishIban(raw: string, sep: ' ' | '-' = ' '): string {
  const parts = parseSpanishIban(raw);
  if (!parts) return normalizeIban(raw); // si no es ES válido, devolvemos la normalización

  return `ES${parts.check}${sep}${parts.bank}${sep}${parts.branch}${sep}${parts.control}${sep}${parts.account}`;
}
