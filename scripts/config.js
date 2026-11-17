/**
 * config.js — Configuración central de Braven Studio
 *
 * ⚠ ESTE ES EL ARCHIVO QUE MÁS VAS A EDITAR.
 * Si cambia un precio, el WA o el dominio → edita aquí.
 */

/* ── Precios de lista de los planes (en DOP) ─────────────── */
export const PRECIOS = {
  'BRV-01': 20000,
  'BRV-02': 24000,
  'BRV-03': 42000,
  'BRV-04': 70000,
};

/* ── Precio de lanzamiento (en DOP) ──────────────────────────
 * Los planes que estén aquí muestran el precio de lista tachado
 * y el de lanzamiento. Si se acaban los cupos, borra la línea
 * y el sitio vuelve al precio de lista. */
export const PRECIOS_LANZAMIENTO = {
  'BRV-01': 15000,
};

/* ── Mantenimiento mensual recomendado por plan (en DOP) ─────
 * Esencial = RD$2,800. El Profesional se cotiza en USD según
 * el sitio, por eso va como texto. */
export const MANTENIMIENTO = {
  'BRV-01': 2800,
  'BRV-02': 2800,
  'BRV-03': 2800,
};
export const MANTENIMIENTO_TEXTO = {
  'BRV-04': 'US$100–150/mes',
};

/* ── Tasas de conversión (1 DOP = X unidades) ────────────── */
export const TASAS = {
  DOP: 1,
  USD: 62,
  EUR: 67,
};

/* ── Símbolo de cada moneda ──────────────────────────────── */
export const SIMBOLOS = {
  DOP: 'RD$',
  USD: 'US$',
  EUR: '€',
};

/* ── Contacto ─────────────────────────────────────────────── */
export const WA_NUMERO  = '18298052619';
export const EMAIL      = 'bravenweb@gmail.com';
export const DOMINIO    = 'https://bravenweb.com';

/* ── Mensaje pre-llenado para WhatsApp ───────────────────── */
export const WA_MENSAJE = encodeURIComponent(
  'Hola Braven, vi su web y quiero cotizar un proyecto.'
);
