// Fetch prompts from Google Sheet
const SHEET_ID = process.env.SHEET_ID || '';

export interface Prompt {
  id: string;
  nombre: string;
  universo: string;
  descripcion: string;
  imagen: string;
  precio?: number;
  gumroad?: string;
  referencia?: string;
  sujeto?: boolean;
}

// Parser más robusto para CSV con saltos de línea en las celdas
function parseCSVRobust(csv: string): string[][] {
  const rows: string[][] = [];
  const lines = csv.split('\n');
  let currentRow: string[] = [];
  let currentCell = '';
  let insideQuotes = false;

  for (const line of lines) {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (insideQuotes && nextChar === '"') {
          currentCell += '"';
          i++;
        } else {
          insideQuotes = !insideQuotes;
        }
      } else if (char === ',' && !insideQuotes) {
        currentRow.push(currentCell.trim());
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    // Si encontramos fin de línea sin comillas abiertas, es fin de fila
    if (!insideQuotes && currentCell) {
      currentRow.push(currentCell.trim());
      if (currentRow.length > 0) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else if (insideQuotes) {
      // Si hay comillas abiertas, agregar salto de línea a la celda actual
      currentCell += '\n';
    }
  }

  // Agregar última celda y fila si existe
  if (currentCell) {
    currentRow.push(currentCell.trim());
  }
  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return rows;
}

export async function fetchPromptsFromSheet(): Promise<Prompt[]> {
  try {
    const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`;
    
    const response = await fetch(csvUrl, { 
      next: { revalidate: 0 },
      headers: {
        'Accept': 'text/csv',
      }
    });
    
    if (!response.ok) {
      console.error(`Error fetching sheet: ${response.status}`);
      return [];
    }
    
    const csv = await response.text();
    
    if (!csv || csv.trim().length === 0) {
      console.error('CSV vacío');
      return [];
    }
    
    // Parsear CSV robusto
    const rows = parseCSVRobust(csv);
    
    if (rows.length < 2) {
      console.error('No hay datos en el sheet');
      return [];
    }

    // Primera fila es header
    const headerRow = rows[0];
    const headers = headerRow.map((h, idx) => {
      const clean = h.toLowerCase().trim();
      console.log(`Header[${idx}]: "${h}" -> "${clean}"`);
      return clean;
    });

    console.log('Headers:', headers);

    const prompts: Prompt[] = [];

    // Procesar datos (desde fila 1)
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      
      const nombreIdx = headers.findIndex(h => h.includes('nombre'));
      const universoIdx = headers.findIndex(h => h.includes('universo'));
      const descripcionIdx = headers.findIndex(h => h.includes('descripción') || h.includes('descripcion'));
      const imagenIdx = headers.findIndex(h => (h.includes('image') || h.includes('imagen')) && !h.includes('referencia'));
      const precioIdx = headers.findIndex(h => h.includes('precio'));
      const gumroadIdx = headers.findIndex(h => h.includes('gumroad'));
      const referenciaIdx = headers.findIndex(h => h.includes('referencia'));
      const sujetoIdx = headers.findIndex(h => h.includes('sujeto'));

      if (i === 1) {
        console.log(`Column indices: imagen=${imagenIdx}, referencia=${referenciaIdx}, sujeto=${sujetoIdx}`);
        console.log(`Row length: ${row.length}, Headers length: ${headers.length}`);
      }

      const nombre = row[nombreIdx]?.trim() || '';
      const universo = row[universoIdx]?.trim() || '';

      // Solo agregar si tiene nombre Y universo
      if (nombre && universo) {
        const precioStr = row[precioIdx]?.trim().toUpperCase() || '';
        let precio = 0;
        
        if (precioStr && precioStr !== 'GRATIS') {
          precio = parseFloat(precioStr.replace(/[^\d.]/g, '')) || 0;
        }

        const prompt: Prompt = {
          id: `prompt-${prompts.length}`,
          nombre,
          universo,
          descripcion: row[descripcionIdx]?.trim() || '',
          imagen: row[imagenIdx]?.trim() || '',
          precio,
          gumroad: row[gumroadIdx]?.trim() || '',
          referencia: referenciaIdx >= 0 ? (row[referenciaIdx]?.trim() || '') : '',
          sujeto: sujetoIdx >= 0 ? (row[sujetoIdx]?.trim().toUpperCase() === 'YES') : false,
        };

        prompts.push(prompt);
        if (i <= 3) {
          console.log(`✓ Prompt: "${nombre}" (${universo}) - ref: "${prompt.referencia}" sujeto: ${prompt.sujeto}`);
        }
      }
    }

    console.log(`Total prompts válidos: ${prompts.length}`);
    return prompts;
  } catch (error) {
    console.error('Error fetching prompts from sheet:', error);
    return [];
  }
}
