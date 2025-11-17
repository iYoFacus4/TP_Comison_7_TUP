
# 🧾 Auditoría — Semana 3  
### Grupo Nº: 2
### Tema asignado: Control de Stock y Ventas para Local de Indumentaria 
### Integrantes (Nombre completo + Legajo): 

- Zavalia Thomas 61055
- Santillan Mateo 61254
- German Davalos Lucas 61155

---

## 1) RELEVAMIENTO — Antes de comenzar a trabajar

* **Arquitectura de Servicios Rígida:**  Todos los archivos de la carpeta services/ (ej. clientesService.js, productosService.js) definen su propia API_URL de forma "hardcodeada" (http://localhost:5000/...). Esto viola el principio DRY y hace que la migración a un nuevo backend sea muy tediosa, ya que requiere modificar múltiples archivos.

* **Bug Crítico (IDs):** La función `addProducto` calculaba IDs manualmente en el cliente (`Math.max`), lo que generaba colisiones y errores de integridad.

* **Datos No Relacionales:** El archivo `db.json` guardaba las ventas con un array anidado de productos, estructura incompatible con bases de datos SQL relacionales.

* **Autenticación Insegura:** El login simulado escribía directamente en `localStorage` sin validación real ni manejo de sesiones seguras.

* **Falta de Lógica de Negocio:** No existía la funcionalidad para descontar stock al realizar una venta.

## 2) SOLUCIONES IMPLEMENTADAS + NUEVO AGREGADO

### ✅ Soluciones aplicadas a problemas detectados

* **Base de Datos Relacional (MySQL):** Se diseñó e implementó el script schema.sql normalizando la base de datos. Se solucionó el problema de las ventas creando una tabla intermedia sale_details para la relación N:M.

* **Transacciones SQL**: Se implementó una transacción compleja en el endpoint POST /api/sales que asegura la integridad de datos: inserta la venta, sus detalles y descuenta el stock de los productos en una sola operación atómica.

* **Corrección de IDs:** Se eliminó la generación manual de IDs en el frontend; ahora se delega completamente en el AUTO_INCREMENT de MySQL.

* **Cliente HTTP Centralizado:** Se configuró una instancia de Axios con interceptores en el frontend (services/api.js), eliminando las URLs hardcodeadas y adjuntando el Token JWT automáticamente.

### ✅ Nuevos requerimientos de Semana 2 agregados


* **Gestión de Estado Global (Zustand):** Se implementó authStore para gestionar la sesión del usuario y sus roles, reemplazando el uso manual de localStorage.

* **Seguridad (JWT + Bcrypt):** Se implementó autenticación real. Las contraseñas se hashean con bcryptjs y el acceso a rutas protegidas se valida mediante jsonwebtoken (Bearer Token).

* **Sistema de Roles (Admin vs User):**

Frontend: Se implementó lógica condicional en el Sidebar (oculta "Reportes") y en tablas (oculta botón "Borrar") según el rol. Se creó un componente RequireAdmin para proteger rutas sensibles.

Backend: Se configuraron usuarios con distintos roles en la base de datos.

* **Dashboard y Reportes Reales:** Se eliminaron los datos falsos (fakeData). Los gráficos y KPIs ahora se calculan en tiempo real consumiendo los datos de la base de datos MySQL.

* **UX en Ventas:** Se mejoró la experiencia de usuario en la carga de ventas, agrupando productos por cantidad y validando stock disponible antes de agregar al carrito.



## Observaciones finales (opcional)

-- Base de Datos: El script de creación de tablas y datos de prueba se encuentra en backend/db/schema.sql.
