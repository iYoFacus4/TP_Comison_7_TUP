# Auditoría — Semana 2 (Grupo 9)

## REPORTE ANTES DE TRABAJAR
- Faltaba ruteo con `react-router-dom` y rutas privadas.
- No había API fake (`json-server`) ni datos de ejemplo.
- No existían hooks personalizados para peticiones.
- Faltaba carpeta `services/` y funciones HTTP.
- Faltaban `constants/` y `store/` con contenido (requeridos en Semana 1).

## REPORTE DE SOLUCIONES + NUEVO AGREGADO
- Se configuró `react-router-dom` y `RouterProtect` para proteger rutas.
- Se agregó `json-server` con `db.json` y script `npm run dev:full`.
- Se crearon `services/http.js`, `services/libros.js`, `services/alumnos.js`, `services/prestamos.js`.
- Se implementó el hook `useService` para lecturas y recarga.
- Se añadió `Dashboard` protegido con métricas y tabla (usa react-bootstrap).
- Se incorporó `react-bootstrap` y `bootstrap` y se aplicó en cards/tablas/forms (Semana 1).
- Se añadieron `constants/` y `store/` con contenido mínimo (Semana 1).
- Login simulado por `localStorage` (Semana 1).
