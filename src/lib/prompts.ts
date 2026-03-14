// Simulated prompts data - will be replaced with Google Sheets data
export const prompts = [
  {
    id: "placeholder-1",
    slug: "placeholder-1",
    universo: "Placeholder",
    titulo: "Prompt de Ejemplo",
    descripcion: "Este es un prompt de ejemplo",
    promptText: "Carga tus propios prompts en la Google Sheet",
    imagenReferencia: "https://via.placeholder.com/150",
    imagenResultado: "https://via.placeholder.com/400",
    imagenSpicy: "https://via.placeholder.com/400",
    tags: ["ejemplo"],
    fecha: "2025-03-13",
  },
];

export function getPrompts() {
  return prompts;
}

export function getPromptBySlug(slug: string) {
  return prompts.find((p) => p.slug === slug);
}

export function getUniversos() {
  return Array.from(new Set(prompts.map((p) => p.universo)));
}
