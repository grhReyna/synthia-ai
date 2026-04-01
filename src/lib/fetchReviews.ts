const REVIEWS_SHEET_ID = process.env.REVIEWS_SHEET_ID || '';

export interface Review {
  nombre: string;
  calidadVideo: number;
  tiempoEntrega: number;
  recomienda: boolean;
  estrellas: number;
  comentario?: string;
}

export async function fetchReviewsFromSheet(): Promise<Review[]> {
  if (!REVIEWS_SHEET_ID) return [];

  const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(REVIEWS_SHEET_ID)}/export?format=csv`;

  const res = await fetch(url, { next: { revalidate: 300 } }); // cache 5 min
  if (!res.ok) return [];

  const csv = await res.text();
  const lines = csv.split('\n').filter(l => l.trim());

  if (lines.length < 2) return [];

  // Skip header row
  const reviews: Review[] = [];

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCSVLine(lines[i]);
    // A=timestamp, B=calidad, C=tiempo, D=recomienda, E=estrellas, F=nombre, G=comentario (optional)
    const calidadVideo = parseInt(cols[1]) || 0;
    const tiempoEntrega = parseInt(cols[2]) || 0;
    const recomienda = (cols[3] || '').toLowerCase().startsWith('s');
    const estrellas = parseInt(cols[4]) || 0;
    const nombre = (cols[5] || '').trim();
    const comentario = (cols[6] || '').trim();

    if (!nombre || estrellas === 0) continue;

    reviews.push({
      nombre,
      calidadVideo,
      tiempoEntrega,
      recomienda,
      estrellas,
      ...(comentario ? { comentario } : {}),
    });
  }

  return reviews;
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (inQuotes) {
      if (char === '"' && line[i + 1] === '"') {
        current += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
  }
  result.push(current);
  return result;
}
