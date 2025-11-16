const MOCK_APPOINTMENTS = [
  {
    id: "1",
    doctorId: "1",
    patientId: "1",
    fecha: "2025-11-15",
    hora: "09:00",
    motivo: "Control cardíaco de rutina",
    estado: "confirmado",
    observaciones: "",
  },
  {
    id: "2",
    doctorId: "2",
    patientId: "2",
    fecha: "2025-11-16",
    hora: "10:30",
    motivo: "Consulta pediátrica - control de crecimiento",
    estado: "pendiente",
    observaciones: "",
  },
  {
    id: "3",
    doctorId: "3",
    patientId: "3",
    fecha: "2025-11-18",
    hora: "14:00",
    motivo: "Dolor de rodilla",
    estado: "confirmado",
    observaciones: "Traer estudios previos",
  },
  {
    id: "4",
    doctorId: "4",
    patientId: "4",
    fecha: "2025-11-20",
    hora: "11:00",
    motivo: "Dolor abdominal recurrente",
    estado: "pendiente",
    observaciones: "",
  },
  {
    id: "5",
    doctorId: "5",
    patientId: "5",
    fecha: "2025-11-22",
    hora: "16:30",
    motivo: "Examen de la vista",
    estado: "confirmado",
    observaciones: "",
  },
  {
    id: "6",
    doctorId: "1",
    patientId: "4",
    fecha: "2025-11-10",
    hora: "10:00",
    motivo: "Consulta cardiológica",
    estado: "completado",
    observaciones: "Paciente estable",
  },
  {
    id: "7",
    doctorId: "6",
    patientId: "1",
    fecha: "2025-11-12",
    hora: "15:00",
    motivo: "Consulta dermatológica",
    estado: "completado",
    observaciones: "Se recetó tratamiento",
  },
  {
    id: "8",
    doctorId: "7",
    patientId: "2",
    fecha: "2025-11-05",
    hora: "09:30",
    motivo: "Chequeo neurológico",
    estado: "cancelado",
    observaciones: "Cancelado por el paciente",
  },
];

class AppointmentService {
  constructor() {
    this.loadAppointmentsFromStorage();
  }

  loadAppointmentsFromStorage() {
    const stored = localStorage.getItem("appointments");
    if (stored) {
      try {
        this.appointments = JSON.parse(stored);
      } catch {
        this.appointments = [...MOCK_APPOINTMENTS];
        this.saveAppointmentsToStorage();
      }
    } else {
      this.appointments = [...MOCK_APPOINTMENTS];
      this.saveAppointmentsToStorage();
    }
  }

  saveAppointmentsToStorage() {
    localStorage.setItem("appointments", JSON.stringify(this.appointments));
  }

  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: this.appointments,
      total: this.appointments.length,
    };
  }

  async getById(id) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const appointment = this.appointments.find((a) => a.id === id);

    if (!appointment) {
      return {
        success: false,
        error: "Turno no encontrado",
      };
    }

    return {
      success: true,
      data: appointment,
    };
  }

  async create(appointmentData) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (
      !appointmentData.doctorId ||
      !appointmentData.patientId ||
      !appointmentData.fecha ||
      !appointmentData.hora
    ) {
      return {
        success: false,
        error: "Doctor, paciente, fecha y hora son requeridos",
      };
    }

    const conflictingAppointment = this.appointments.find(
      (a) =>
        a.doctorId === appointmentData.doctorId &&
        a.fecha === appointmentData.fecha &&
        a.hora === appointmentData.hora &&
        a.estado !== "cancelado"
    );

    if (conflictingAppointment) {
      return {
        success: false,
        error: "El doctor ya tiene un turno asignado en ese horario",
      };
    }

    const newAppointment = {
      id: Date.now().toString(),
      estado: "pendiente",
      observaciones: "",
      ...appointmentData,
    };

    this.appointments.push(newAppointment);
    this.saveAppointmentsToStorage();

    return {
      success: true,
      data: newAppointment,
      message: "Turno creado exitosamente",
    };
  }

  async update(id, appointmentData) {
    await new Promise((resolve) => setTimeout(resolve, 600));

    const index = this.appointments.findIndex((a) => a.id === id);

    if (index === -1) {
      return {
        success: false,
        error: "Turno no encontrado",
      };
    }

    if (appointmentData.fecha && appointmentData.hora) {
      const conflictingAppointment = this.appointments.find(
        (a) =>
          a.id !== id &&
          a.doctorId ===
            (appointmentData.doctorId || this.appointments[index].doctorId) &&
          a.fecha === appointmentData.fecha &&
          a.hora === appointmentData.hora &&
          a.estado !== "cancelado"
      );

      if (conflictingAppointment) {
        return {
          success: false,
          error: "El doctor ya tiene un turno asignado en ese horario",
        };
      }
    }

    this.appointments[index] = {
      ...this.appointments[index],
      ...appointmentData,
      id: id,
    };

    this.saveAppointmentsToStorage();

    return {
      success: true,
      data: this.appointments[index],
      message: "Turno actualizado exitosamente",
    };
  }

  async delete(id) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const index = this.appointments.findIndex((a) => a.id === id);

    if (index === -1) {
      return {
        success: false,
        error: "Turno no encontrado",
      };
    }

    const deletedAppointment = this.appointments[index];
    this.appointments.splice(index, 1);
    this.saveAppointmentsToStorage();

    return {
      success: true,
      data: deletedAppointment,
      message: "Turno eliminado exitosamente",
    };
  }

  async search(query) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!query || query.trim() === "") {
      return this.getAll();
    }

    const searchTerm = query.toLowerCase();
    const filtered = this.appointments.filter(
      (a) =>
        a.motivo.toLowerCase().includes(searchTerm) ||
        a.estado.toLowerCase().includes(searchTerm) ||
        a.observaciones.toLowerCase().includes(searchTerm)
    );

    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

  async getByDoctor(doctorId) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const filtered = this.appointments.filter((a) => a.doctorId === doctorId);

    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

  async getByPatient(patientId) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const filtered = this.appointments.filter((a) => a.patientId === patientId);

    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

  async getByStatus(estado) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const filtered = this.appointments.filter((a) => a.estado === estado);

    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

  async getByDateRange(fechaInicio, fechaFin) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const filtered = this.appointments.filter((a) => {
      return a.fecha >= fechaInicio && a.fecha <= fechaFin;
    });

    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

  async updateStatus(id, nuevoEstado) {
    return this.update(id, { estado: nuevoEstado });
  }

  getEstados() {
    return ["pendiente", "confirmado", "cancelado", "completado"];
  }
}

export const appointmentService = new AppointmentService();
export default appointmentService;
