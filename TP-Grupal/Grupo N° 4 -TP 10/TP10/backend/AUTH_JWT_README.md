# 🔐 Autenticación JWT - Implementación Completa

## ✅ Archivos Creados

### Middleware

- `middleware/auth.middleware.js` - Middleware de autenticación JWT con verificación de tokens

### Controllers

- `controllers/auth.controller.js` - Controladores de login, register y perfil de usuario

### Routes

- `routes/auth.routes.js` - Rutas de autenticación (`/api/auth/login`, `/api/auth/register`, `/api/auth/me`)

### Database

- `db/schema.sql` - Actualizado con tabla `users` para autenticación

## 🔧 Configuración

### 1. Crear archivo `.env`

Copiar `.env.example` y configurar las variables:

```bash
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=tp_semana3
JWT_SECRET=supersecreto_cambiar_en_produccion
JWT_EXPIRES_IN=24h
```

### 2. Ejecutar el schema SQL

Ejecutar el archivo `db/schema.sql` en MySQL para crear la tabla `users` y los datos de prueba.

### 3. Instalar dependencias (ya instaladas)

```bash
npm install bcrypt jsonwebtoken
```

## 🧪 Pruebas de Autenticación

### 1. Iniciar el servidor

```bash
npm run dev
```

### 2. Registrar un nuevo usuario

**POST** `http://localhost:3001/api/auth/register`

```json
{
  "username": "barbero_test",
  "email": "test@barberia.com",
  "password": "password123",
  "nombre": "Barbero de Prueba",
  "rol": "barbero"
}
```

**Respuesta esperada** (201):

```json
{
  "success": true,
  "message": "Usuario registrado exitosamente.",
  "data": {
    "id": 3,
    "username": "barbero_test",
    "email": "test@barberia.com",
    "nombre": "Barbero de Prueba",
    "rol": "barbero",
    "fecha_registro": "2025-11-15T..."
  }
}
```

### 3. Iniciar sesión (Login)

**POST** `http://localhost:3001/api/auth/login`

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Respuesta esperada** (200):

```json
{
  "success": true,
  "message": "Login exitoso.",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "username": "admin",
      "email": "admin@barberia.com",
      "nombre": "Administrador",
      "rol": "admin"
    }
  }
}
```

### 4. Obtener perfil del usuario autenticado

**GET** `http://localhost:3001/api/auth/me`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Respuesta esperada** (200):

```json
{
  "success": true,
  "data": {
    "id": 1,
    "username": "admin",
    "email": "admin@barberia.com",
    "nombre": "Administrador",
    "rol": "admin",
    "activo": 1,
    "fecha_registro": "2025-11-15T...",
    "ultimo_acceso": "2025-11-15T..."
  }
}
```

### 5. Probar rutas protegidas

#### Sin token (debe fallar con 401)

**POST** `http://localhost:3001/api/clients`

```json
{
  "name": "Nuevo Cliente",
  "email": "nuevo@cliente.com"
}
```

**Respuesta esperada** (401):

```json
{
  "success": false,
  "message": "Acceso denegado. No se proporcionó token de autenticación."
}
```

#### Con token válido (debe funcionar)

**POST** `http://localhost:3001/api/clients`

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**Body:**

```json
{
  "name": "Nuevo Cliente Autenticado",
  "email": "autenticado@cliente.com",
  "phone": "3515123456"
}
```

**Respuesta esperada** (201):

```json
{
  "ok": true,
  "message": "Cliente creado exitosamente",
  "data": {
    "id": 6,
    "name": "Nuevo Cliente Autenticado",
    "email": "autenticado@cliente.com",
    "phone": "3515123456"
  }
}
```

### 6. Probar token inválido o expirado

**GET** `http://localhost:3001/api/auth/me`

**Headers:**

```
Authorization: Bearer token_invalido_o_expirado
```

**Respuesta esperada** (403):

```json
{
  "success": false,
  "message": "Token inválido o expirado.",
  "error": "..."
}
```

## 🔒 Rutas Protegidas

Las siguientes rutas requieren autenticación JWT (token en header `Authorization: Bearer <token>`):

### Clientes

- `POST /api/clients` - Crear cliente
- `PUT /api/clients/:id` - Actualizar cliente
- `DELETE /api/clients/:id` - Eliminar cliente

### Servicios

- `POST /api/services` - Crear servicio
- `PUT /api/services/:id` - Actualizar servicio
- `DELETE /api/services/:id` - Eliminar servicio

### Citas (Appointments)

- `POST /api/appointments` - Crear cita
- `PUT /api/appointments/:id` - Actualizar cita
- `PATCH /api/appointments/:id/status` - Actualizar estado de cita
- `DELETE /api/appointments/:id` - Eliminar cita

### Autenticación

- `GET /api/auth/me` - Obtener perfil (requiere token)

## 📋 Usuarios de Prueba

Los siguientes usuarios están pre-creados en el schema:

| Username | Email                | Password   | Rol     |
| -------- | -------------------- | ---------- | ------- |
| admin    | admin@barberia.com   | admin123   | admin   |
| barbero1 | barbero@barberia.com | barbero123 | barbero |

**Nota:** Las contraseñas están hasheadas con bcrypt en la base de datos.

## ✅ Criterios de Aceptación Cumplidos

- ✅ Login devuelve token JWT válido con datos del usuario (id, nombre, rol)
- ✅ Middleware verifica correctamente tokens válidos e inválidos
- ✅ Rutas protegidas rechazan peticiones sin token (401)
- ✅ Contraseñas se almacenan hasheadas en la DB (bcrypt con 10 rounds)
- ✅ Middleware agrega datos del usuario a `req.user`
- ✅ JWT_SECRET configurado en `.env.example`
- ✅ Implementado hash de contraseñas con bcrypt
- ✅ Rutas de registro y login funcionando

## 🛠 Testing con Postman/Thunder Client

1. Crear una colección con las rutas de autenticación
2. Guardar el token recibido del login
3. Usar el token en el header `Authorization: Bearer <token>` para las rutas protegidas
4. Verificar respuestas 401 sin token y 200/201 con token válido

## 📝 Notas Adicionales

- El token expira en 24h por defecto (configurable en `.env`)
- El middleware `authenticateToken` puede ser aplicado a cualquier ruta
- El middleware `authorizeRoles` permite restringir por roles (admin, barbero, cliente)
- Las contraseñas deben tener al menos 6 caracteres
- El email debe tener formato válido
