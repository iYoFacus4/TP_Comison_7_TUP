# 🧾 Auditoría — Semana 3  
### Grupo Nº: ___  
### Tema asignado: ___  
### Integrantes (Nombre completo + Legajo):
- … Benitez Gabriel (61682)
- … Diaz Vega Facudo (61760)
- … Ruiz Franco (61454)

---

## 1) RELEVAMIENTO — Antes de comenzar a trabajar

Describir brevemente lo encontrado al abrir el proyecto:

- Errores detectados (bugs, warnings, import fallidos, rutas rotas, etc.)
- Faltantes respecto a Semana 1 (carpetas vacías, componentes incompletos, etc.)
- Problemas de estructura, naming, uso de git o dependencias

> Este apartado debe completarse **ANTES** de modificar el código.

---Dependencia Total de localStorage: El principal problema. Toda la información (members, sports, payments, usuario) se guarda como texto en el navegador. No hay base de datos real.
---Funcionalidad Incompleta (Login): Al hacer clic en "¿Olvidaste tu contraseña?" en la pantalla de login, el sistema solo muestra una alerta (alert()) con el mensaje "Funcionalidad de recuperación de contraseña próximamente", en lugar de iniciar un flujo real de recuperación.
---Flujo de Navegación (Landing Page): El proyecto tiene una página de bienvenida o "landing page" estática
---Datos Falsos en el Dashboard: Los contadores (Total Socios: 150, Deportes: 8, Pagos del Mes: 120) son texto estático (hardcodeado). No reflejan los datos reales del localStorage, al agregar un deporte y ver que el número no cambia
Error Lógico en "Miembros": El número de "miembros" de un deporte se ingresa manualmente al crearlo, en lugar de ser un cálculo de cuántos socios reales se inscribieron.
---Inconsistencia de Datos: El error anterior lleva a la inconsistencia que notaste: el sistema muestra 238 miembros totales cuando en realidad solo hay 4 socios en la "base de datos".
Funcionalidad Incompleta: Se puede "Desactivar" un deporte, pero no se puede "Eliminar".

## 2) SOLUCIONES IMPLEMENTADAS + NUEVO AGREGADO

### ✅ Soluciones aplicadas a problemas detectados
- 
---Eliminación de localStorage: Se refactorizaron todas las páginas (Socios, Deportes, Pagos) y componentes (PaymentTable, SportsTable) para que dejen de usar localStorage. Ahora, todos los datos se obtienen y persisten a través de peticiones al nuevo backend.

---Conexión de Datos Reales: Se reemplazó toda la data "falsa" (hardcodeada):

-El Dashboard fue conectado a un nuevo endpoint (/api/dashboard/stats) que calcula las estadísticas (Total Socios, Total Deportes, etc.) directamente desde la base de datos.

-Las páginas de Socios, Deportes y Pagos ahora cargan sus datos desde la API (apiService) al iniciar, mostrando información real de la base de datos.

---Corrección de Lógica de "Miembros": Se eliminó el campo "Miembros" de los formularios de "Deportes". Este dato ya no se ingresa manualmente, corrigiendo el error lógico que causaba inconsistencias.

---Implementación de CRUD Completo: Se implementó la funcionalidad DELETE que faltaba en Deportes. Ahora todas las secciones tienen un CRUD completo (Crear, Leer, Actualizar, Eliminar) conectado al backend.

---Refactorización de "Asociar Deportes": Se conectó la sección "Deportes Asociados" en el detalle del socio. Ahora, la lista de deportes se carga desde el backend (/api/deportes?estado=Activo) y los cambios se guardan en la tabla intermedia (socios_deportes) usando una transacción segura.

### ✅ Nuevos requerimientos de Semana 3 agregados
- …
---Creación del Servidor Backend: Se configuró un servidor completo con Node.js + Express en la carpeta BackEnd, siguiendo la estructura solicitada.

---Migración a MySQL: Se instaló el driver mysql2 y se migraron todos los archivos de la lógica de datos (db.js y todos los controllers) para funcionar con una base de datos MySQL real, en lugar de SQLite o json-server.

---Implementación de Zustand: Se instaló zustand y se creó el store (useAuthStore.js) para manejar el estado de autenticación. Se refactorizó Login.jsx para usar este store en lugar de localStorage.

---Creación de API RESTful: Se crearon todos los controllers y routers necesarios para proveer una API (/api/socios, /api/deportes, /api/cuotas, /api/dashboard) que el frontend consume para todas sus operaciones.

---Variables de Entorno: Se configuró el servidor para que lea las credenciales de la base de datos de forma segura desde un archivo .env.

## Observaciones finales (opcional)
- Comentarios sobre el flujo de trabajo, dificultades o acuerdos del equipo.
