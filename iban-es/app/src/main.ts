const textarea = document.getElementById("html-input") as HTMLTextAreaElement;
const button = document.getElementById("extract-btn") as HTMLButtonElement;
const results = document.getElementById("results") as HTMLDivElement;

button.addEventListener("click", () => {
  const html = textarea.value;

  // Regex para extraer los src de los tags <img ... src="...">
  const regex = /<img[^>]+src="([^"]+)"[^>]*>/g;

  results.innerHTML = ""; // limpiar resultados previos

  let match;
  while ((match = regex.exec(html)) !== null) {
    const url = match[1];
    const img = document.createElement("img");
    img.src = url;
    img.alt = "Imagen extraída";
    results.appendChild(img);
  }
});
