# 📝 Auditoría – Semana 3  
## TP7 – Sistema de Gestión de Reservas de Gimnasio  
**Grupo 6 – Comisión 7**
Carrizo cyntia 61529
corera luis Agustin 61065
---

# 1️⃣ ANTES DE TRABAJAR  
## Diagnóstico del estado inicial del proyecto  
Durante la revisión del trabajo existente antes de comenzar la Semana 3, se identificaron los siguientes problemas, faltantes y bugs:

### 🔹 **Autenticación y Roles**
- Solo existía el rol **admin**.
- No había sistema de login real (sin verificación de roles ni permisos).
.

### 🔹 **Socios y Actividades**
- No se podían registrar nuevos usuarios (socios).
- No existía vista ni flujo para gestionar reservas.
- No se verificaba la disponibilidad de cupos al reservar.
- Los inscriptos no se calculaban en base a reservas reales.

### 🔹 **Panel Administrativo**
Funcionalidades existentes (pero limitadas):
- Dashboard con conteo correcto de:
  - Total miembros
  - Activos / Inactivos
  - Total actividades
- Edición de socios y actividades funcionando.
- Filtros por nombre, estado y plan funcionando.

Limitaciones detectadas:
- No había forma de agregar usuarios desde el sistema.
- No había relación real socio → reserva → actividad.

### 🔹 **Reportes**
- El resumen del período seleccionado **no funcionaba**.
- Solo funcionaban las gráficas de:
  - Distribución por plan
  - Distribución por estado

### 🔹 **Backend y Base de Datos**
- El backend no implementaba los cupos reales.
- Las reservas no estaban integradas.
- No existía lógica para impedir sobrecupos.
- No había endpoints diferenciados por rol.
- No se manejaba el historial del socio.

---

# 2️⃣ DESPUÉS DE TRABAJAR  
## Mejoras, correcciones e implementaciones realizadas

### 🟦 **A. Sistema de Autenticación Completo**
Implementamos un sistema profesional con:

- Tabla `usuarios` para login.
- Contraseñas encriptadas con **bcrypt**.
- Roles reales:
  - `admin`
  - `user` (socio)
- Uso de Zustand para almacenar:
  - token
  - usuario actual
  - rol
  - logout

Redirección automática:
- **admin → /dashboard**
- **user → /usuario**

Protección de rutas:
- `ProtectedRoute`
- `AdminRoute`
- `UserRoute`

---

### 🟩 **B. Separación total de vistas ADMIN vs USUARIO**

#### 🔵 ADMIN ve:
- Dashboard  
- Miembros y Actividades  
- Reportes  
- Sidebar completo  
- Navbar con cierre de sesión  

#### 🟢 USUARIO ve:
- Actividades disponibles
- Mis reservas
- Sidebar reducido
- Navbar con cierre de sesión

✔ Ya no comparten las mismas pantallas.  
✔ Cumple el requerimiento del TP: *“futura diferenciación de permisos por rol”.*

---

### 🟧 **C. Sistema REAL de cupo y reservas**
Ahora existe un sistema funcional de reservas:

#### ✔ Cupos ocupados en tiempo real
Backend implementado:

```sql
SELECT COUNT(*) 
FROM reservas 
WHERE actividad_id = X AND estado = 'activa';
