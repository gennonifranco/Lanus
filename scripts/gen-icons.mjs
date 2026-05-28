// Genera los íconos PWA y el apple-touch desde public/shield.png.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'public/icons');
mkdirSync(outDir, { recursive: true });

const source = resolve(root, 'public/shield.png');
const shield = readFileSync(source);

// Ícono base: escudo centrado sobre fondo blanco, con padding para que no quede
// pegado a los bordes en pantalla de inicio.
async function makeIcon(size, { background = '#ffffff', padding = 0.1 } = {}) {
  const inner = Math.round(size * (1 - padding * 2));
  const resized = await sharp(shield).resize(inner, inner, { fit: 'contain', background }).png().toBuffer();
  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background,
    },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toBuffer();
}

// Maskable: el escudo más chico sobre fondo granate sólido (para que el sistema
// pueda recortar a círculo/cuadrado sin perder partes del escudo).
async function makeMaskable(size) {
  const inner = Math.round(size * 0.6);
  const resized = await sharp(shield)
    .resize(inner, inner, { fit: 'contain', background: { r: 107, g: 18, b: 25 } })
    .png()
    .toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: { r: 107, g: 18, b: 25 } },
  })
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toBuffer();
}

writeFileSync(resolve(outDir, 'icon-192.png'), await makeIcon(192));
writeFileSync(resolve(outDir, 'icon-512.png'), await makeIcon(512));
writeFileSync(resolve(outDir, 'icon-maskable.png'), await makeMaskable(512));
writeFileSync(resolve(root, 'public/apple-touch-icon.png'), await makeIcon(180));

// Favicon: el escudo recortado a 64x64, sin padding, fondo transparente.
const favicon = await sharp(shield).resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
writeFileSync(resolve(root, 'public/favicon.png'), favicon);

console.log('Íconos generados desde shield.png');
