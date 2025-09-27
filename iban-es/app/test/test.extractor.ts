import { describe, it, expect } from "vitest";
import { extractImageUrls } from "../src/extractor";

describe("Apartado B - extractImageUrls", () => {
  const html = `
    <div>
      <img src="http://localhost:3000/mortadelo.webp" />
      <p>Texto</p>
      <img alt="personaje" src="http://localhost:3000/filemon.webp" />
    </div>
  `;

  it("extrae todas las URLs de imágenes", () => {
    const urls = extractImageUrls(html);
    expect(urls).toEqual([
      "http://localhost:3000/mortadelo.webp",
      "http://localhost:3000/filemon.webp",
    ]);
  });

  it("devuelve array vacío si no hay <img>", () => {
    const urls = extractImageUrls("<p>Hola</p>");
    expect(urls).toEqual([]);
  });
});
