# Lanús Tracker

PWA personal para trackear los partidos del Club Atlético Lanús a los que vas como hincha. Funciona 100% offline, guarda todo en tu dispositivo, no necesita backend ni login.

## Stack

- Vite + React 18 + TypeScript estricto
- Tailwind CSS
- LocalStorage para persistencia
- `vite-plugin-pwa` (Workbox) — manifest, service worker, ícono maskable
- `react-router-dom`, `lucide-react`, `recharts`

## Correr en desarrollo

```bash
npm install
npm run dev
```

Abrí http://localhost:5173

## Build de producción

```bash
npm run build
npm run preview   # sirve dist/ en local para probar
```

El build pasa type-check estricto y genera la PWA lista para servir desde cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.).

## Regenerar íconos

Los íconos PNG (192, 512, maskable, apple-touch) se generan desde `public/favicon.svg`:

```bash
node scripts/gen-icons.mjs
```

## Instalar en el celular

### Android (Chrome / Edge)
1. Abrí la URL donde está deployada la app.
2. Menú ⋮ → **Agregar a pantalla de inicio** (o "Instalar app" si aparece el banner).
3. Se instala como app nativa, abre sin barra del navegador, anda offline.

### iOS (Safari)
1. Abrí la URL en **Safari** (no Chrome — en iOS solo Safari instala PWAs).
2. Tocá el botón **Compartir** (cuadrado con flecha).
3. **Agregar a pantalla de inicio**.

## Estructura

```
src/
├── app/MatchesContext.tsx     # provider compartido del estado
├── components/
│   ├── layout/                # AppShell, Header, BottomTabs, escudo SVG
│   ├── matches/               # MatchCard, MatchFilters, MatchDetail
│   ├── form/MatchForm.tsx     # form de carga / edición
│   ├── stats/                 # StatCard
│   └── ui/                    # Toast, ConfirmDialog
├── hooks/
│   ├── useMatches.ts          # CRUD + persistencia
│   ├── useStats.ts            # stats derivadas
│   ├── useFilters.ts          # filtros + búsqueda
│   └── useTheme.ts            # light/dark/system
├── lib/
│   ├── storage.ts             # wrapper LocalStorage + import/export JSON
│   ├── matchUtils.ts          # resultado, clásico, formato fechas
│   └── constants.ts
├── pages/                     # Resumen, Partidos, Cargar, Estadisticas, Ajustes
├── types/match.ts
└── App.tsx
```

## Backup

Andá a **Ajustes → Exportar** para descargar un JSON con todos tus partidos. Para restaurar (mismo dispositivo o cambio de celu): **Ajustes → Importar**.

## Notas

- No hay tracking, no hay analytics, no hay terceros.
- Los datos viven en `localStorage` con la clave `lanus-tracker:matches:v1`.
- El theme color granate (#6B1219) está en el manifest y en el meta `theme-color` (se actualiza en dark mode).
