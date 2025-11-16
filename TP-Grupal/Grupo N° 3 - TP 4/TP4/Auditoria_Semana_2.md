# 🧩 Auditoría de Avances — Semana 2
**Proyecto:** Sistema de Gestión de Biblioteca Escolar  
**Comisión:** 7 — Grupo 6  
**Integrantes:** Carrizo Cynthia – Correa Núñez Luis Agustín  

---

## 📘 Situación inicial (Semana 1)

El proyecto entregado inicialmente presentaba:

- Estructura básica de React creada con `vite`.
- Sin ruteo implementado (`react-router-dom` no instalado).
- Estilos generales en una sola hoja `styles.css`.
- Componentes sin modularización clara.
- Login simulado **sin validación ni persistencia**.
- Falta de carpetas para servicios, hooks y layouts.
- Sin `json-server` ni API fake configurada.
- Íconos genéricos poco estéticos.
- README incompleto y sin pasos de ejecución.

---

## 🚀 Cambios y mejoras implementadas (Semana 2)

### 🔧 Configuración y dependencias
- Instalado y configurado **`react-router-dom`** para ruteo público y privado.
- Instalado **Bootstrap 5** y adaptado a todos los componentes principales.
- Instalado **lucide-react** para reemplazar íconos por una alternativa moderna y profesional.
- Creado script `pnpm run api` con **`json-server`** en el puerto 4000.

### 🧱 Nueva estructura de carpetas

src/
├── components/
│ ├── ThemeSwitcher.jsx / BarChart.jsx BookStatHeader.jsx / ConfirmModal.jsx / DataTable.jsx / EmptyState.jsx / Loader.jsx / Pagination.jsx / ProgressRing.jsx / StatCard.jsx
│ └── 
├── layout/
│ └── AppLayout.jsx
├── pages/
│ ├── Login.jsx
│ ├── About.jsx
│ ├── Audit.jsx
│ ├── Libros/
│ │ ├── LibrosPage.jsx
│ │ └── FormLibros.jsx
│ ├── Alumnos/
│ │ ├── AlumnosPage.jsx
│ │ └── FormAlumno.jsx
│ └── Prestamos/
│ ├── PrestamoPage.jsx
│ └── FormPrestamo.jsx
├── router/
│ ├── index.jsx
│ └── RouterProtect.jsx
├── services/
│ ├── books.service.js
│ ├── students.service.js
│ ├── loans.service.js
│ └── audit.service.js
├── utils/
│ └── auth.js
└── styles/theme.css
└── styles/base
├── variables.css
└── styles/components
├── cards.css
└── charts.css
└── login.css


### 💻 Funcionalidades nuevas
- **Login simulado persistente** con `localStorage` y roles (`admin`, `user`).
- **Rutas privadas** protegidas mediante `RouterProtect.jsx`.
- **Ruta `/audit`** accesible solo por administradores (`RequireAdmin`).
- **Ruta `/about`** con información técnica del proyecto y credenciales de prueba.
- **AppLayout.jsx** con:
  - Navbar principal responsive.
  - Sidebar.
  - Switch de tema (oscuro/claro).
  - Dropdown de usuario con cierre de sesión.
- **Auditoría (Audit.jsx):**
  - Listado con paginación, íconos, badges de acción y botón *Volver*.
- **Formularios CRUD** conectados al `json-server`.
- **Alerts y modales de confirmación visual**.
- **Código modularizado y comentado** para facilitar mantenimiento.

### 🧩 API fake (`db.json`)
```json
{
  "users": [
    { "id": 1, "email": "admin@escuela.edu", "password": "1234", "role": "admin", "name": "Demo Admin" },
    { "id": 2, "email": "ana@escuela.edu", "password": "1234", "role": "user", "name": "Usuario" }
  ],
  "books": [],
  "students": [],
  "loans": [],
  "audit": []
}

Próximamente se ampliará con campos detallados de libros, alumnos y préstamos.

```
### Mejoras visuales:
| Elemento | Antes                    | Ahora                                     |
| -------- | ------------------------ | ----------------------------------------- |
| Íconos   | genéricos y desalineados | `lucide-react`, coherentes y minimalistas |
| Layout   | sin estructura fija      | Navbar + Sidebar + Dashboard responsive   |
| Colores  | base Vite                | paleta Bootstrap 5 + variantes oscuras    |


### Estado Actual:

> Ruteo completo (publico/privado)
> Login persistente con roles
> Integracion json-server
> Auditoria funcional y paginada
> About Page con documentacion intena
> Codigo modular y escalable
>> Pendiente: agregar contrasena reales y seeds de datos de prueba.

### Conclusion :
El proyecto paso de una base estatica sin ruteo ni modularizacion a un sistema React funcional, con rutas protegidas, servicios HTTP simulados, y un diseno moderno basado en Bootstrap + Lucide.




