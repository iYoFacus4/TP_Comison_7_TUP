## Hooks Disponibles

### useAuth

**Archivo:** `useAuth.js`

**Propósito:** Gestiona toda la lógica de autenticación y sesión de usuarios.

**Estado que maneja:**

- `user` - Datos del usuario autenticado
- `isAuthenticated` - Bandera booleana que indica si hay sesión activa
- `isLoading` - Estado de carga durante operaciones
- `error` - Mensajes de error de autenticación

**Funciones proporcionadas:**

- `login(credentials)` - Inicia sesión con email y contraseña
- `logout(redirect)` - Cierra la sesión del usuario
- `register(userData)` - Registra un nuevo usuario
- `verifySession()` - Verifica si existe una sesión válida
- `updateProfile(userData)` - Actualiza datos del perfil
- `changePassword(passwords)` - Cambia la contraseña del usuario
- `clearError()` - Limpia mensajes de error

**Comportamiento:**

- Se ejecuta `verifySession()` automáticamente al montar el componente
- Mantiene sincronizado el estado de autenticación
- Integrado con el sistema de eventos de autenticación

---

### useDoctors

**Archivo:** `useDoctors.js`

**Propósito:** Gestiona la obtención y filtrado de información de doctores.

**Estado que maneja:**

- `doctors` - Array con todos los doctores
- `especialidades` - Array con las especialidades disponibles
- `isLoading` - Estado de carga
- `error` - Mensajes de error

**Funciones proporcionadas:**

- `fetchDoctors()` - Obtiene todos los doctores
- `getDoctorById(id)` - Busca un doctor específico por ID
- `filterByEspecialidad(especialidad)` - Filtra doctores por especialidad
- `searchDoctors(query)` - Busca doctores por nombre o especialidad
- `clearError()` - Limpia mensajes de error

**Comportamiento:**

- Carga automáticamente doctores y especialidades al montar
- Los datos son de solo lectura (no incluye operaciones de modificación)
- Útil para listados y selección de doctores en formularios

---

### usePatients

**Archivo:** `usePatients.js`

**Propósito:** Gestiona todas las operaciones CRUD de pacientes.

**Estado que maneja:**

- `patients` - Array con todos los pacientes
- `isLoading` - Estado de carga durante operaciones
- `error` - Mensajes de error

**Funciones proporcionadas:**

- `fetchPatients()` - Obtiene todos los pacientes
- `getPatientById(id)` - Obtiene un paciente específico por ID
- `createPatient(patientData)` - Crea un nuevo paciente
- `updatePatient(id, patientData)` - Actualiza un paciente existente
- `deletePatient(id)` - Elimina un paciente
- `searchPatients(query)` - Busca pacientes por diferentes criterios
- `clearError()` - Limpia mensajes de error

**Comportamiento:**

- Carga automáticamente los pacientes al montar
- Actualiza el estado local inmediatamente después de operaciones exitosas
- Esto hace que la UI se actualice automáticamente sin necesidad de recargar
- Las operaciones Create, Update y Delete modifican el array local para reflejar cambios instantáneamente

**Actualización automática:**
Cuando se crea, actualiza o elimina un paciente:

1. La operación se ejecuta en el servicio
2. Si tiene éxito, el estado local se actualiza inmediatamente
3. React detecta el cambio y re-renderiza los componentes
4. No es necesario llamar a `fetchPatients()` manualmente

---

### useAppointments

**Archivo:** `useAppointments.js`

**Propósito:** Gestiona todas las operaciones relacionadas con turnos médicos.

**Estado que maneja:**

- `appointments` - Array con todos los turnos
- `isLoading` - Estado de carga
- `error` - Mensajes de error

**Funciones proporcionadas:**

- `fetchAppointments()` - Obtiene todos los turnos
- `getAppointmentById(id)` - Obtiene un turno específico
- `createAppointment(appointmentData)` - Crea un nuevo turno
- `updateAppointment(id, appointmentData)` - Actualiza un turno
- `deleteAppointment(id)` - Elimina un turno
- `searchAppointments(query)` - Busca turnos
- `getAppointmentsByDoctor(doctorId)` - Filtra turnos por doctor
- `getAppointmentsByPatient(patientId)` - Filtra turnos por paciente
- `getAppointmentsByStatus(estado)` - Filtra turnos por estado
- `getAppointmentsByDateRange(fechaInicio, fechaFin)` - Filtra por rango de fechas
- `updateAppointmentStatus(id, nuevoEstado)` - Actualiza solo el estado
- `clearError()` - Limpia mensajes de error
- `getEstados()` - Obtiene los estados disponibles

**Comportamiento:**

- Carga automáticamente los turnos al montar
- Actualiza el estado local tras operaciones exitosas
- Incluye múltiples métodos de filtrado para diferentes vistas
- Relaciona doctores y pacientes mediante IDs

---

## Patrón de Uso

Todos los hooks siguen un patrón consistente:

```javascript
import { useAuth, usePatients, useDoctors, useAppointments } from "../hooks";

function MiComponente() {
  const { patients, isLoading, error, createPatient } = usePatients();

  if (isLoading) return <Spinner />;
  if (error) return <Alert>{error}</Alert>;

  return (
    // Renderizar usando patients
  );
}
```

## Características Comunes

1. **Gestión de Estado:** Todos los hooks manejan su propio estado interno
2. **Loading States:** Proporcionan bandera `isLoading` para mostrar indicadores de carga
3. **Error Handling:** Capturan y exponen errores para manejo en UI
4. **Actualización Automática:** Modifican el estado local para reflejar cambios inmediatamente
5. **Carga Inicial:** La mayoría se ejecutan automáticamente al montar el componente

## Integración con Servicios

Los hooks actúan como una capa intermedia entre los componentes de UI y los servicios:

```
Componente → Hook → Service → HTTP Client → Fake/Real API
```

Esta arquitectura permite:

- Separación de responsabilidades
- Código más limpio en componentes
- Reutilización de lógica
- Testing más fácil
- Transición simple entre mock y API real

## Notas Importantes

- Los hooks utilizan `useCallback` para memorizar funciones y evitar re-renders innecesarios
- Todos los hooks son asíncronos y devuelven promesas en sus operaciones
- El estado se actualiza de forma inmutable usando el spread operator
- Los hooks pueden usarse en múltiples componentes simultáneamente
