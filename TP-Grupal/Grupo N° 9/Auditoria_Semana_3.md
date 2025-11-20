# Auditoría Semana 3 — Grupo 9 — Comisión 7

## 1️⃣ ANTES DE TRABAJAR

- El proyecto de la semana anterior funcionaba con **json-server** (db.json) como backend fake, apuntando a `http://localhost:4000`.
- El **login** estaba simulado usando **localStorage** (guardaba datos del usuario de forma manual y no verificaba contra una base real).
- No existía una carpeta `backend/` ni un servidor **Node.js + Express** dedicado al TP.
- El proyecto **no estaba conectado a MySQL**: todos los datos (libros, alumnos, préstamos) se manejaban en archivos JSON y se perdían si se modificaban directo desde código.
- No había archivo SQL documentando la estructura de la base ni datos iniciales de prueba.
- La lógica del usuario logueado dependía de funciones propias y de localStorage, **sin uso de Zustand** para manejar el estado global de autenticación.
- Las rutas del frontend estaban armadas, pero dependían de endpoints de json-server y de un login “falso”, no de un backend real.
- Existía deuda técnica: falta de separación clara entre **frontend** (React) y **backend real**, y poca trazabilidad de qué datos venían de dónde.


## 2️⃣ DESPUÉS DE TRABAJAR

- Se creó la estructura de **Semana 3** con dos carpetas separadas dentro del grupo:
  - `SEMANA 3 TP1/frontend` (proyecto React)
  - `SEMANA 3 TP1/backend` (Node.js + Express + MySQL)
- Se desarrolló un **backend real** en Node.js + Express, con:
  - Archivo `index.js` configurando servidor en `http://localhost:3001`.
  - Uso de middlewares `cors`, `helmet`, `morgan` y `express.json`.
  - Archivo `db.js` con conexión a MySQL utilizando variables de entorno desde `.env`.
- Se configuró la conexión a una base **MySQL**:
  - Base de datos: `biblioteca_tp`.
  - Servidor MySQL escuchando en el puerto `3308`.
  - Usuario: `root` con contraseña configurada.
  - Conexión probada y mensaje de **“Base de datos conectada exitosamente”** en consola.
- Se creó el archivo **`database.sql`** con toda la estructura de la base y datos de prueba:
  - Tabla `usuarios` (para login real, con nombre, email, password y rol).
  - Tablas `libros`, `alumnos` y `prestamos` con sus relaciones.
  - Inserts iniciales para poder probar el sistema (un usuario admin, libros, alumnos y préstamos).
- Se implementaron rutas REST en el backend:
  - `/api/auth/login` para autenticación de usuarios.
  - `/api/libros` con CRUD para libros.
  - `/api/alumnos` con CRUD para alumnos.
  - `/api/prestamos` con CRUD para préstamos.
- El **frontend** fue actualizado para consumir este backend real:
  - `src/endpoints/index.js` ahora apunta a `API_URL = 'http://localhost:3001/api'`.
  - `src/services/http.js` usa `fetch` contra el backend en lugar de json-server.
- Se dejó de usar **json-server** y se migró toda la lógica de datos al backend + MySQL.
- Se eliminó el uso de **localStorage** para manejar el login y se implementó **Zustand**:
  - `src/store/authStore.js` maneja `user`, `token`, `login` y `logout`.
  - `src/services/auth.js` implementa `AuthService.login`, que hace `POST` al backend (`/api/auth/login`) y recibe `{ token, user }`.
  - `src/pages/Login.jsx` ahora llama a `AuthService.login`, guarda el usuario y el token en el store de Zustand y redirige al dashboard al iniciar sesión.
- Se actualizaron las **rutas privadas**:
  - `src/router/RouterProtect.jsx` ahora verifica el `token` desde Zustand para permitir o no el acceso a las vistas protegidas.
- Se realizaron pruebas manuales de extremo a extremo:
  - Iniciar el backend con `npm run dev` (Node + MySQL).
  - Iniciar el frontend con `npm run dev`.
  - Login con el usuario de prueba `admin@biblioteca.com` / `admin123`.
  - Visualización y consumo de datos de libros, alumnos y préstamos desde la base de datos real.

Con estos cambios, el proyecto de la Semana 3 queda migrado a un entorno **Full Stack real**:  
React en el frontend, Node.js + Express en el backend y MySQL como base de datos, cumpliendo los requerimientos de eliminar json-server/localStorage y usar Zustand para el manejo del usuario logueado.

Grupo 6 - TP1
TP sacado de github de Agustin Correa Nuñez y Cynthia Carrizo;
https://github.com/CyntiaCarrizo/Gestion-de-cursos-Online
