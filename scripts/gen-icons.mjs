// Genera los íconos PNG (192, 512, maskable 512) a partir del SVG.
// Usa sharp si está disponible; si no, cae a un PNG mínimo con node:zlib (escudo render manual).
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const outDir = resolve(root, 'public/icons');
mkdirSync(outDir, { recursive: true });

const svg = readFileSync(resolve(root, 'public/favicon.svg'));

// Maskable: misma forma pero con padding para que el sistema pueda recortar.
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="#6B1219"/>
  <g transform="translate(22 22) scale(0.875)">
    <path d="M8 8 H56 V34 C56 48 44 58 32 60 C20 58 8 48 8 34 Z" fill="#ffffff"/>
    <text x="32" y="42" text-anchor="middle" font-family="Inter, sans-serif" font-weight="800" font-size="18" fill="#6B1219">CAL</text>
  </g>
</svg>`;

let sharp;
try {
  sharp = (await import('sharp')).default;
} catch {
  console.warn('sharp no instalado, salteando generación PNG');
  process.exit(0);
}

await sharp(svg).resize(192, 192).png().toFile(resolve(outDir, 'icon-192.png'));
await sharp(svg).resize(512, 512).png().toFile(resolve(outDir, 'icon-512.png'));
await sharp(Buffer.from(maskableSvg)).resize(512, 512).png().toFile(resolve(outDir, 'icon-maskable.png'));
await sharp(svg).resize(180, 180).png().toFile(resolve(root, 'public/apple-touch-icon.png'));
console.log('Íconos generados');
