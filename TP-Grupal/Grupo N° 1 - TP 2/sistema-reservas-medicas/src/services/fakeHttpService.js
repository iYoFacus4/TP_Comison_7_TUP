const SIMULATED_DELAY = 800;

const simulateNetworkDelay = () => {
  return new Promise((resolve) => setTimeout(resolve, SIMULATED_DELAY));
};

const simulateHttpResponse = (data, status = 200) => {
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: status === 200 ? "OK" : "Error",
    data,
    headers: {
      "content-type": "application/json",
    },
  };
};

const simulateError = (message, status = 400) => {
  return {
    ok: false,
    status,
    statusText: "Error",
    error: message,
  };
};

class FakeHttpService {
  async get(url, options = {}) {
    await simulateNetworkDelay();

    try {
      if (url.includes("/auth/verify")) {
        const user = localStorage.getItem("user");
        if (user) {
          return simulateHttpResponse({
            success: true,
            user: JSON.parse(user),
          });
        }
        return simulateError("No autenticado", 401);
      }

      if (url.includes("/patients") || url.includes("/pacientes")) {
        const patients = JSON.parse(localStorage.getItem("patients") || "[]");

        const idMatch = url.match(/\/(\d+)$/);
        if (idMatch) {
          const id = idMatch[1];
          const patient = patients.find((p) => p.id === id);
          if (patient) {
            return simulateHttpResponse({
              success: true,
              data: patient,
            });
          }
          return simulateError("Paciente no encontrado", 404);
        }

        const searchMatch = url.match(/[?&]search=([^&]+)/);
        if (searchMatch) {
          const searchTerm = decodeURIComponent(searchMatch[1]).toLowerCase();
          const filtered = patients.filter(
            (p) =>
              p.nombre.toLowerCase().includes(searchTerm) ||
              p.apellido.toLowerCase().includes(searchTerm) ||
              p.dni.includes(searchTerm) ||
              p.email.toLowerCase().includes(searchTerm)
          );
          return simulateHttpResponse({
            success: true,
            data: filtered,
            total: filtered.length,
          });
        }

        return simulateHttpResponse({
          success: true,
          data: patients,
          total: patients.length,
        });
      }

      if (url.includes("/doctors") || url.includes("/medicos")) {
        const doctors = JSON.parse(localStorage.getItem("doctors") || "[]");

        const idMatch = url.match(/\/(\d+)$/);
        if (idMatch) {
          const id = idMatch[1];
          const doctor = doctors.find((d) => d.id === id);
          if (doctor) {
            return simulateHttpResponse({
              success: true,
              data: doctor,
            });
          }
          return simulateError("Doctor no encontrado", 404);
        }

        return simulateHttpResponse({
          success: true,
          data: doctors,
          total: doctors.length,
        });
      }

      if (url.includes("/appointments") || url.includes("/turnos")) {
        const appointments = JSON.parse(
          localStorage.getItem("appointments") || "[]"
        );

        const idMatch = url.match(/\/(\d+)$/);
        if (idMatch) {
          const id = idMatch[1];
          const appointment = appointments.find((a) => a.id === id);
          if (appointment) {
            return simulateHttpResponse({
              success: true,
              data: appointment,
            });
          }
          return simulateError("Turno no encontrado", 404);
        }

        return simulateHttpResponse({
          success: true,
          data: appointments,
          total: appointments.length,
        });
      }

      return simulateError("Endpoint no encontrado", 404);
    } catch (error) {
      return simulateError(error.message || "Error en la petición", 500);
    }
  }

  async post(url, body, options = {}) {
    await simulateNetworkDelay();

    try {
      if (url.includes("/auth/login")) {
        const { email, password } = body;

        if (!email || !password) {
          return simulateError("Email y contraseña requeridos", 400);
        }

        // 👥 Usuarios de prueba con diferentes roles
        const USUARIOS_PRUEBA = {
          "admin@test.com": {
            id: "1",
            email: "admin@test.com",
            nombre: "Admin",
            apellido: "Sistema",
            telefono: "3512345678",
            role: "admin",
          },
          "recepcion@test.com": {
            id: "2",
            email: "recepcion@test.com",
            nombre: "María",
            apellido: "Recepcionista",
            telefono: "3519876543",
            role: "recepcionista",
          },
          "medico@test.com": {
            id: "3",
            email: "medico@test.com",
            nombre: "Dr. Carlos",
            apellido: "García",
            telefono: "3511122334",
            role: "medico",
          },
          "paciente@test.com": {
            id: "4",
            email: "paciente@test.com",
            nombre: "Juan",
            apellido: "Pérez",
            telefono: "3519988776",
            role: "paciente",
          },
        };

        // Verificar si es un usuario de prueba
        let user;
        if (USUARIOS_PRUEBA[email]) {
          user = USUARIOS_PRUEBA[email];
        } else {
          // Usuario genérico con rol admin para cualquier otro email
          user = {
            id: Date.now().toString(),
            email,
            nombre: email.split("@")[0],
            apellido: "Usuario",
            telefono: "",
            role: "admin",
          };
        }

        localStorage.setItem("user", JSON.stringify(user));

        return simulateHttpResponse({
          success: true,
          user,
          message: "Login exitoso",
        });
      }

      if (url.includes("/auth/register")) {
        const { email, password, nombre } = body;

        if (!email || !password) {
          return simulateError("Email y contraseña requeridos", 400);
        }

        const user = {
          id: Date.now().toString(),
          email,
          nombre: nombre || email.split("@")[0],
          rol: "user",
        };

        localStorage.setItem("user", JSON.stringify(user));

        return simulateHttpResponse({
          success: true,
          user,
          message: "Registro exitoso",
        });
      }

      if (url.includes("/patients") || url.includes("/pacientes")) {
        const patients = JSON.parse(localStorage.getItem("patients") || "[]");

        if (patients.some((p) => p.dni === body.dni)) {
          return simulateError("Ya existe un paciente con ese DNI", 400);
        }

        const newPatient = {
          id: Date.now().toString(),
          ...body,
        };

        patients.push(newPatient);
        localStorage.setItem("patients", JSON.stringify(patients));

        return simulateHttpResponse(
          {
            success: true,
            data: newPatient,
            message: "Paciente creado exitosamente",
          },
          201
        );
      }

      if (url.includes("/appointments") || url.includes("/turnos")) {
        const appointments = JSON.parse(
          localStorage.getItem("appointments") || "[]"
        );

        const conflict = appointments.find(
          (a) =>
            a.doctorId === body.doctorId &&
            a.fecha === body.fecha &&
            a.hora === body.hora &&
            a.estado !== "cancelado"
        );

        if (conflict) {
          return simulateError(
            "El doctor ya tiene un turno en ese horario",
            409
          );
        }

        const newAppointment = {
          id: Date.now().toString(),
          estado: "pendiente",
          ...body,
        };

        appointments.push(newAppointment);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        return simulateHttpResponse(
          {
            success: true,
            data: newAppointment,
            message: "Turno creado exitosamente",
          },
          201
        );
      }

      return simulateError("Endpoint no encontrado", 404);
    } catch (error) {
      return simulateError(error.message || "Error en la petición", 500);
    }
  }

  async put(url, body, options = {}) {
    await simulateNetworkDelay();

    try {
      const idMatch = url.match(/\/(\d+)$/);
      if (!idMatch) {
        return simulateError("ID no proporcionado", 400);
      }

      const id = idMatch[1];

      if (url.includes("/patients") || url.includes("/pacientes")) {
        const patients = JSON.parse(localStorage.getItem("patients") || "[]");
        const index = patients.findIndex((p) => p.id === id);

        if (index === -1) {
          return simulateError("Paciente no encontrado", 404);
        }

        if (
          body.dni &&
          patients.some((p) => p.dni === body.dni && p.id !== id)
        ) {
          return simulateError("Ya existe otro paciente con ese DNI", 400);
        }

        patients[index] = {
          ...patients[index],
          ...body,
          id,
        };

        localStorage.setItem("patients", JSON.stringify(patients));

        return simulateHttpResponse({
          success: true,
          data: patients[index],
          message: "Paciente actualizado exitosamente",
        });
      }

      if (url.includes("/appointments") || url.includes("/turnos")) {
        const appointments = JSON.parse(
          localStorage.getItem("appointments") || "[]"
        );
        const index = appointments.findIndex((a) => a.id === id);

        if (index === -1) {
          return simulateError("Turno no encontrado", 404);
        }

        if (body.fecha && body.hora) {
          const conflict = appointments.find(
            (a) =>
              a.id !== id &&
              a.doctorId === (body.doctorId || appointments[index].doctorId) &&
              a.fecha === body.fecha &&
              a.hora === body.hora &&
              a.estado !== "cancelado"
          );

          if (conflict) {
            return simulateError(
              "El doctor ya tiene un turno en ese horario",
              409
            );
          }
        }

        appointments[index] = {
          ...appointments[index],
          ...body,
          id,
        };

        localStorage.setItem("appointments", JSON.stringify(appointments));

        return simulateHttpResponse({
          success: true,
          data: appointments[index],
          message: "Turno actualizado exitosamente",
        });
      }

      return simulateError("Endpoint no encontrado", 404);
    } catch (error) {
      return simulateError(error.message || "Error en la petición", 500);
    }
  }

  async patch(url, body, options = {}) {
    return this.put(url, body, options);
  }

  async delete(url, options = {}) {
    await simulateNetworkDelay();

    try {
      const idMatch = url.match(/\/(\d+)$/);

      if (url.includes("/auth/logout")) {
        localStorage.removeItem("user");

        return simulateHttpResponse({
          success: true,
          message: "Sesión cerrada exitosamente",
        });
      }

      if (!idMatch) {
        return simulateError("ID no proporcionado", 400);
      }

      const id = idMatch[1];

      if (url.includes("/patients") || url.includes("/pacientes")) {
        const patients = JSON.parse(localStorage.getItem("patients") || "[]");
        const index = patients.findIndex((p) => p.id === id);

        if (index === -1) {
          return simulateError("Paciente no encontrado", 404);
        }

        const deletedPatient = patients[index];
        patients.splice(index, 1);
        localStorage.setItem("patients", JSON.stringify(patients));

        return simulateHttpResponse({
          success: true,
          data: deletedPatient,
          message: "Paciente eliminado exitosamente",
        });
      }

      if (url.includes("/appointments") || url.includes("/turnos")) {
        const appointments = JSON.parse(
          localStorage.getItem("appointments") || "[]"
        );
        const index = appointments.findIndex((a) => a.id === id);

        if (index === -1) {
          return simulateError("Turno no encontrado", 404);
        }

        const deletedAppointment = appointments[index];
        appointments.splice(index, 1);
        localStorage.setItem("appointments", JSON.stringify(appointments));

        return simulateHttpResponse({
          success: true,
          data: deletedAppointment,
          message: "Turno eliminado exitosamente",
        });
      }

      return simulateError("Endpoint no encontrado", 404);
    } catch (error) {
      return simulateError(error.message || "Error en la petición", 500);
    }
  }

  async request(url, options = {}) {
    const method = (options.method || "GET").toUpperCase();

    switch (method) {
      case "GET":
        return this.get(url, options);
      case "POST":
        return this.post(url, options.body, options);
      case "PUT":
        return this.put(url, options.body, options);
      case "PATCH":
        return this.patch(url, options.body, options);
      case "DELETE":
        return this.delete(url, options);
      default:
        return simulateError(`Método ${method} no soportado`, 405);
    }
  }
}

export const fakeHttpService = new FakeHttpService();
export default fakeHttpService;
