// Compresión de imágenes en el cliente.
// Reescala a un máximo de 1280px en el lado mayor y exporta JPEG calidad 0.78.
// Una foto típica de celu (3-5 MB) queda en ~200-400 KB.

const MAX_DIMENSION = 1280;
const QUALITY = 0.78;

export async function compressImage(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('El archivo no es una imagen');
  }

  const bitmap = await loadBitmap(file);
  const { width, height } = scaleDimensions(bitmap.width, bitmap.height, MAX_DIMENSION);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo procesar la imagen');
  ctx.drawImage(bitmap, 0, 0, width, height);
  if (bitmap instanceof ImageBitmap) bitmap.close();

  return canvas.toDataURL('image/jpeg', QUALITY);
}

async function loadBitmap(file: File): Promise<ImageBitmap | HTMLImageElement> {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file);
    } catch {
      // fallback
    }
  }
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('No se pudo leer la imagen'));
    img.src = URL.createObjectURL(file);
  });
}

function scaleDimensions(w: number, h: number, max: number): { width: number; height: number } {
  if (w <= max && h <= max) return { width: w, height: h };
  if (w >= h) {
    return { width: max, height: Math.round((h * max) / w) };
  }
  return { width: Math.round((w * max) / h), height: max };
}
