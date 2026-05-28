import type { Fixture } from '../types/fixture';
import { LA_FORTALEZA } from './constants';

// Dataset de partidos oficiales de Lanús Primera masculina.
// Fuentes: BeSoccer, ESPN Argentina, Wikipedia (Sudamericana 2025), Promiedos.
// Para partidos de 2024 incompletos, usar "Cargar histórico" en la app.

const F = (
  id: string,
  date: string,
  opponent: string,
  condition: Fixture['condition'],
  tournament: Fixture['tournament'],
  stadium: string,
  goalsFor: number | null,
  goalsAgainst: number | null,
  notes?: string,
): Fixture => ({ id, date, opponent, condition, tournament, stadium, goalsFor, goalsAgainst, notes });

export const FIXTURES: Fixture[] = [
  // ───────── LIGA PROFESIONAL 2025 ─────────
  F('2025-01-23-riestra', '2025-01-23', 'Deportivo Riestra', 'local', 'Liga', LA_FORTALEZA, 0, 2),
  F('2025-01-28-rosario', '2025-01-28', 'Rosario Central', 'visitante', 'Liga', 'Gigante de Arroyito', 1, 2),
  F('2025-02-01-sarmiento', '2025-02-01', 'Sarmiento', 'local', 'Liga', LA_FORTALEZA, 2, 0),
  F('2025-02-09-talleres', '2025-02-09', 'Talleres', 'visitante', 'Liga', 'Mario Alberto Kempes', 1, 0),
  F('2025-02-13-gimnasia', '2025-02-13', 'Gimnasia La Plata', 'local', 'Liga', LA_FORTALEZA, 0, 0),
  F('2025-02-16-river', '2025-02-16', 'River Plate', 'visitante', 'Liga', 'Monumental', 0, 1),
  F('2025-02-21-velez', '2025-02-21', 'Vélez Sarsfield', 'local', 'Liga', LA_FORTALEZA, 0, 0),
  F('2025-03-02-rivadavia', '2025-03-02', 'Independiente Rivadavia', 'visitante', 'Liga', 'Bautista Gargantini', 1, 1),
  F('2025-03-08-platense', '2025-03-08', 'Platense', 'visitante', 'Liga', 'Ciudad de Vicente López', 0, 0),
  F('2025-03-16-instituto', '2025-03-16', 'Instituto', 'local', 'Liga', LA_FORTALEZA, 4, 1),
  F('2025-03-28-sanlorenzo', '2025-03-28', 'San Lorenzo', 'visitante', 'Liga', 'Pedro Bidegain', 1, 1),
  F('2025-04-06-independiente', '2025-04-06', 'Independiente', 'local', 'Liga', LA_FORTALEZA, 1, 1),
  F('2025-04-14-godoy', '2025-04-14', 'Godoy Cruz', 'visitante', 'Liga', 'Feliciano Gambarte', 0, 0),
  F('2025-04-19-banfield-l', '2025-04-19', 'Banfield', 'local', 'Liga', LA_FORTALEZA, 1, 1),
  F('2025-04-27-sanmartinsj', '2025-04-27', 'San Martín de San Juan', 'local', 'Liga', LA_FORTALEZA, 1, 0),
  F('2025-05-03-atltucuman', '2025-05-03', 'Atlético Tucumán', 'visitante', 'Liga', 'Monumental José Fierro', 0, 1),
  F('2025-05-10-boca', '2025-05-10', 'Boca Juniors', 'visitante', 'Liga', 'La Bombonera', 0, 0, 'Octavos Apertura — Eliminado por penales 4-2'),

  F('2025-07-14-riestra', '2025-07-14', 'Deportivo Riestra', 'visitante', 'Liga', 'Guillermo Laza', 0, 1),
  F('2025-07-19-rosario', '2025-07-19', 'Rosario Central', 'local', 'Liga', LA_FORTALEZA, 0, 1),
  F('2025-07-25-sarmiento', '2025-07-25', 'Sarmiento', 'visitante', 'Liga', 'Eva Perón', 2, 0),
  F('2025-08-08-talleres', '2025-08-08', 'Talleres', 'local', 'Liga', LA_FORTALEZA, 1, 0),
  F('2025-08-17-gimnasia', '2025-08-17', 'Gimnasia La Plata', 'visitante', 'Liga', 'Juan Carmelo Zerillo', 2, 1),
  F('2025-08-25-river', '2025-08-25', 'River Plate', 'local', 'Liga', LA_FORTALEZA, 1, 1),
  F('2025-08-30-velez', '2025-08-30', 'Vélez Sarsfield', 'visitante', 'Liga', 'José Amalfitani', 0, 3),
  F('2025-09-12-rivadavia', '2025-09-12', 'Independiente Rivadavia', 'local', 'Liga', LA_FORTALEZA, 1, 0),
  F('2025-09-19-platense', '2025-09-19', 'Platense', 'local', 'Liga', LA_FORTALEZA, 2, 1),
  F('2025-09-28-instituto', '2025-09-28', 'Instituto', 'visitante', 'Liga', 'Monumental de Alta Córdoba', 0, 0),
  F('2025-10-04-sanlorenzo', '2025-10-04', 'San Lorenzo', 'local', 'Liga', LA_FORTALEZA, 2, 1),
  F('2025-10-12-independiente', '2025-10-12', 'Independiente', 'visitante', 'Liga', 'Libertadores de América', 2, 0),
  F('2025-10-17-godoy', '2025-10-17', 'Godoy Cruz', 'local', 'Liga', LA_FORTALEZA, 2, 0),
  F('2025-11-03-banfield', '2025-11-03', 'Banfield', 'visitante', 'Liga', 'Florencio Sola', 1, 2),
  F('2025-11-08-sanmartinsj', '2025-11-08', 'San Martín de San Juan', 'visitante', 'Liga', 'Hilario Sánchez', 1, 1),
  F('2025-11-14-atltucuman', '2025-11-14', 'Atlético Tucumán', 'local', 'Liga', LA_FORTALEZA, 3, 1),
  F('2025-11-26-tigre', '2025-11-26', 'Tigre', 'visitante', 'Liga', 'José Dellagiovanna', 0, 1, 'Octavos Clausura — Eliminado'),

  // ───────── COPA SUDAMERICANA 2025 (Campeón!) ─────────
  F('2025-04-03-puerto', '2025-04-03', 'Academia Puerto Cabello', 'visitante', 'Sudamericana', 'Misael Delgado', 2, 2),
  F('2025-04-09-melgar', '2025-04-09', 'Melgar', 'local', 'Sudamericana', LA_FORTALEZA, 3, 0),
  F('2025-04-22-vasco', '2025-04-22', 'Vasco da Gama', 'visitante', 'Sudamericana', 'São Januário', 0, 0),
  F('2025-05-06-melgar', '2025-05-06', 'Melgar', 'visitante', 'Sudamericana', 'Monumental de la UNSA', 0, 1),
  F('2025-05-13-vasco', '2025-05-13', 'Vasco da Gama', 'local', 'Sudamericana', LA_FORTALEZA, 1, 0),
  F('2025-05-27-puerto', '2025-05-27', 'Academia Puerto Cabello', 'local', 'Sudamericana', LA_FORTALEZA, 2, 2),
  F('2025-08-14-centralcba', '2025-08-14', 'Central Córdoba (SdE)', 'visitante', 'Sudamericana', 'Madre de Ciudades', 0, 1, 'Octavos ida'),
  F('2025-08-21-centralcba', '2025-08-21', 'Central Córdoba (SdE)', 'local', 'Sudamericana', LA_FORTALEZA, 1, 0, 'Octavos vuelta — Pasó por penales 4-2'),
  F('2025-09-16-fluminense', '2025-09-16', 'Fluminense', 'local', 'Sudamericana', LA_FORTALEZA, 1, 0, 'Cuartos ida'),
  F('2025-09-23-fluminense', '2025-09-23', 'Fluminense', 'visitante', 'Sudamericana', 'Maracaná', 1, 1, 'Cuartos vuelta'),
  F('2025-10-22-uchile', '2025-10-22', 'Universidad de Chile', 'neutral', 'Sudamericana', 'Nacional de Santiago', 2, 2, 'Semifinal ida (a puerta cerrada)'),
  F('2025-10-29-uchile', '2025-10-29', 'Universidad de Chile', 'local', 'Sudamericana', LA_FORTALEZA, 1, 0, 'Semifinal vuelta'),
  F('2025-11-22-mineiro', '2025-11-22', 'Atlético Mineiro', 'neutral', 'Sudamericana', 'Defensores del Chaco', 0, 0, 'FINAL — ¡Campeón por penales 5-4!'),

  // ───────── LIGA PROFESIONAL 2026 ─────────
  F('2026-01-23-sanlorenzo', '2026-01-23', 'San Lorenzo', 'visitante', 'Liga', 'Pedro Bidegain', 3, 2),
  F('2026-01-29-union', '2026-01-29', 'Unión', 'local', 'Liga', LA_FORTALEZA, 2, 1),
  F('2026-02-03-instituto', '2026-02-03', 'Instituto', 'visitante', 'Liga', 'Monumental de Alta Córdoba', 2, 2),
  F('2026-02-09-talleres', '2026-02-09', 'Talleres', 'local', 'Liga', LA_FORTALEZA, 1, 1),
  F('2026-02-13-independiente', '2026-02-13', 'Independiente', 'visitante', 'Liga', 'Libertadores de América', 0, 2),
  F('2026-03-01-defensa', '2026-03-01', 'Defensa y Justicia', 'visitante', 'Liga', 'Norberto Tomaghello', 1, 1),
  F('2026-03-04-boca', '2026-03-04', 'Boca Juniors', 'local', 'Liga', LA_FORTALEZA, 0, 3),
  F('2026-03-13-estudiantes', '2026-03-13', 'Estudiantes', 'visitante', 'Liga', 'UNO', 1, 0),
  F('2026-03-17-newells', '2026-03-17', "Newell's Old Boys", 'local', 'Liga', LA_FORTALEZA, 5, 0),
  F('2026-03-21-velez', '2026-03-21', 'Vélez Sarsfield', 'visitante', 'Liga', 'José Amalfitani', 1, 0),
  F('2026-03-26-argentinos', '2026-03-26', 'Argentinos Juniors', 'visitante', 'Liga', 'Diego Armando Maradona', 1, 2),
  F('2026-04-01-platense', '2026-04-01', 'Platense', 'local', 'Liga', LA_FORTALEZA, 0, 0),
  F('2026-04-13-banfield', '2026-04-13', 'Banfield', 'local', 'Liga', LA_FORTALEZA, 1, 0),
  F('2026-04-20-gimnasiamza', '2026-04-20', 'Gimnasia de Mendoza', 'visitante', 'Liga', 'Víctor Legrotaglie', 0, 1),
  F('2026-04-24-centralcba', '2026-04-24', 'Central Córdoba (SdE)', 'local', 'Liga', LA_FORTALEZA, 0, 0),
  F('2026-05-02-riestra', '2026-05-02', 'Deportivo Riestra', 'local', 'Liga', LA_FORTALEZA, 0, 0),
  F('2026-05-09-argentinos', '2026-05-09', 'Argentinos Juniors', 'visitante', 'Liga', 'Diego Armando Maradona', 0, 2, 'Octavos Apertura — Eliminado'),

  // ───────── COPA ARGENTINA 2026 ─────────
  F('2026-01-18-sarmientob', '2026-01-18', 'Sarmiento de La Banda', 'neutral', 'Copa Argentina', 'Desconocida', 4, 1, '32avos'),
  F('2026-05-30-instituto', '2026-05-30', 'Instituto', 'neutral', 'Copa Argentina', 'Desconocida', null, null, '16avos'),

  // ───────── RECOPA SUDAMERICANA 2026 (Campeón!) ─────────
  F('2026-02-19-flamengo', '2026-02-19', 'Flamengo', 'local', 'Recopa', LA_FORTALEZA, 1, 0, 'Ida'),
  F('2026-02-26-flamengo', '2026-02-26', 'Flamengo', 'visitante', 'Recopa', 'Maracaná', 3, 2, 'Vuelta — ¡Campeón global 4-2!'),

  // ───────── COPA LIBERTADORES 2026 ─────────
  F('2026-04-08-mirassol', '2026-04-08', 'Mirassol', 'visitante', 'Libertadores', 'Maião', 0, 1, 'Grupo G'),
  F('2026-04-16-alwaysready', '2026-04-16', 'Always Ready', 'local', 'Libertadores', LA_FORTALEZA, 1, 0, 'Grupo G'),
  F('2026-04-28-ldu', '2026-04-28', 'LDU Quito', 'local', 'Libertadores', LA_FORTALEZA, 1, 0, 'Grupo G'),
  F('2026-05-05-alwaysready', '2026-05-05', 'Always Ready', 'visitante', 'Libertadores', 'Hernando Siles', 0, 4, 'Grupo G'),
  F('2026-05-20-ldu', '2026-05-20', 'LDU Quito', 'visitante', 'Libertadores', 'Rodrigo Paz Delgado', 0, 2, 'Grupo G'),
  F('2026-05-26-mirassol', '2026-05-26', 'Mirassol', 'local', 'Libertadores', LA_FORTALEZA, 1, 0, 'Grupo G'),

  // ───────── LIGA PROFESIONAL 2026 — FUTUROS ─────────
  F('2026-07-26-sanlorenzo', '2026-07-26', 'San Lorenzo', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-07-29-union', '2026-07-29', 'Unión', 'visitante', 'Liga', '15 de Abril', null, null),
  F('2026-08-02-instituto', '2026-08-02', 'Instituto', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-08-09-talleres', '2026-08-09', 'Talleres', 'visitante', 'Liga', 'Mario Alberto Kempes', null, null),
  F('2026-08-16-independiente', '2026-08-16', 'Independiente', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-08-23-argentinos', '2026-08-23', 'Argentinos Juniors', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-08-30-boca', '2026-08-30', 'Boca Juniors', 'visitante', 'Liga', 'La Bombonera', null, null),
  F('2026-09-06-defensa', '2026-09-06', 'Defensa y Justicia', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-09-13-riestra', '2026-09-13', 'Deportivo Riestra', 'visitante', 'Liga', 'Guillermo Laza', null, null),
  F('2026-09-20-estudiantes', '2026-09-20', 'Estudiantes', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-10-04-newells', '2026-10-04', "Newell's Old Boys", 'visitante', 'Liga', 'Marcelo Bielsa', null, null),
  F('2026-10-11-velez', '2026-10-11', 'Vélez Sarsfield', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-10-18-platense', '2026-10-18', 'Platense', 'visitante', 'Liga', 'Ciudad de Vicente López', null, null),
  F('2026-10-25-banfield', '2026-10-25', 'Banfield', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-11-01-gimnasiamza', '2026-11-01', 'Gimnasia de Mendoza', 'local', 'Liga', LA_FORTALEZA, null, null),
  F('2026-11-08-centralcba', '2026-11-08', 'Central Córdoba (SdE)', 'visitante', 'Liga', 'Único Madre de Ciudades', null, null),
];
