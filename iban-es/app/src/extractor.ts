// Busca todas las etiquetas <img ... src="..."> en un HTML y devuelve las URLs.

export function extractImageUrls(html: string): string[] {
  const regex = /<img[^>]*\bsrc\s*=\s*"([^"]+)"[^>]*>/gi;
  const results: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    results.push(match[1]);
  }

  return results;
}
