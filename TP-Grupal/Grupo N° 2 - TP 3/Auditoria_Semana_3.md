# 🧾 Auditoría — Semana 3  
### Grupo Nº: ___  
### Tema asignado: ___  
### Integrantes (Nombre completo + Legajo):
- …
- …
- …

---

## 1) RELEVAMIENTO — Antes de comenzar a trabajar

- Arquitectura de Servicios Rígida: Todos los archivos de la carpeta services/ (ej. clientesService.js, productosService.js) definen su propia API_URL de forma "hardcodeada" (http://localhost:5000/...). Esto viola el principio DRY y hace que la migración a un nuevo backend sea muy tediosa, ya que requiere modificar múltiples archivos.

- Bug Crítico en el CRUD de Productos: La función addProducto en productosService.js calcula manualmente el nextId en el frontend. Este es un bug conocido que genera desincronización de datos y errores 404 al intentar actualizar o eliminar registros que se acaban de crear.

- Autenticación Insegura y Simulada: La página Login.jsx utiliza credenciales "mock" (hardcodeadas) y escribe directamente en localStorage (ej. localStorage.setItem('userLogged', 'true')). Esto no es seguro y es el punto principal a reemplazar en la Semana 3.

- Dependencia de useFetch: Todo el proyecto depende de un hook useFetch que recibe la URL completa (http://localhost:5000/clientes). Esto acopla fuertemente las páginas a json-server y complica la migración.

- Estructura de Ventas No Relacional: El db.json y la página Ventas.jsx guardan las ventas con un array de productos anidado ("productos": [...]). Esta estructura es incompatible con una base de datos relacional como MySQL y requerirá un rediseño completo de la base de datos (creando tablas sales y sale_details).

## 2) SOLUCIONES IMPLEMENTADAS + NUEVO AGREGADO

### ✅ Soluciones aplicadas a problemas detectados
- …

### ✅ Nuevos requerimientos de Semana 2 agregados
- …

---

## Observaciones finales (opcional)
- Comentarios sobre el flujo de trabajo, dificultades o acuerdos del equipo.
