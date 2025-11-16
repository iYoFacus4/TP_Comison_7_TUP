const MOCK_DOCTORS = [
  {
    id: "1",
    nombre: "Dr. Juan Pérez",
    especialidad: "Cardiología",
    matricula: "MN 12345",
    telefono: "011-4567-8900",
    email: "juan.perez@hospital.com",
    horarioAtencion: "Lunes a Viernes 9:00-17:00",
  },
  {
    id: "2",
    nombre: "Dra. María González",
    especialidad: "Pediatría",
    matricula: "MN 23456",
    telefono: "011-4567-8901",
    email: "maria.gonzalez@hospital.com",
    horarioAtencion: "Lunes a Viernes 8:00-16:00",
  },
  {
    id: "3",
    nombre: "Dr. Carlos Rodríguez",
    especialidad: "Traumatología",
    matricula: "MN 34567",
    telefono: "011-4567-8902",
    email: "carlos.rodriguez@hospital.com",
    horarioAtencion: "Lunes a Viernes 10:00-18:00",
  },
  {
    id: "4",
    nombre: "Dra. Ana Martínez",
    especialidad: "Dermatología",
    matricula: "MN 45678",
    telefono: "011-4567-8903",
    email: "ana.martinez@hospital.com",
    horarioAtencion: "Martes a Sábado 9:00-15:00",
  },
  {
    id: "5",
    nombre: "Dr. Luis Fernández",
    especialidad: "Neurología",
    matricula: "MN 56789",
    telefono: "011-4567-8904",
    email: "luis.fernandez@hospital.com",
    horarioAtencion: "Lunes a Viernes 11:00-19:00",
  },
  {
    id: "6",
    nombre: "Dra. Sofia López",
    especialidad: "Ginecología",
    matricula: "MN 67890",
    telefono: "011-4567-8905",
    email: "sofia.lopez@hospital.com",
    horarioAtencion: "Lunes a Viernes 8:00-14:00",
  },
  {
    id: "7",
    nombre: "Dr. Miguel Sánchez",
    especialidad: "Oftalmología",
    matricula: "MN 78901",
    telefono: "011-4567-8906",
    email: "miguel.sanchez@hospital.com",
    horarioAtencion: "Lunes a Viernes 9:00-17:00",
  },
  {
    id: "8",
    nombre: "Dra. Laura Torres",
    especialidad: "Psiquiatría",
    matricula: "MN 89012",
    telefono: "011-4567-8907",
    email: "laura.torres@hospital.com",
    horarioAtencion: "Lunes a Jueves 10:00-18:00",
  },
];

class DoctorService {
  constructor() {
    this.doctors = [...MOCK_DOCTORS];
  }

  async getAll() {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      success: true,
      data: this.doctors,
      total: this.doctors.length,
    };
  }

  async getById(id) {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const doctor = this.doctors.find((d) => d.id === id);

    if (!doctor) {
      return {
        success: false,
        error: "Doctor no encontrado",
      };
    }

    return {
      success: true,
      data: doctor,
    };
  }

  async getByEspecialidad(especialidad) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    const filtered = this.doctors.filter(
      (d) => d.especialidad.toLowerCase() === especialidad.toLowerCase()
    );

    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

  async search(query) {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!query || query.trim() === "") {
      return this.getAll();
    }

    const searchTerm = query.toLowerCase();
    const filtered = this.doctors.filter(
      (d) =>
        d.nombre.toLowerCase().includes(searchTerm) ||
        d.especialidad.toLowerCase().includes(searchTerm) ||
        d.matricula.toLowerCase().includes(searchTerm)
    );

    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

  async getEspecialidades() {
    await new Promise((resolve) => setTimeout(resolve, 300));

    const especialidades = [
      ...new Set(this.doctors.map((d) => d.especialidad)),
    ];

    return {
      success: true,
      data: especialidades.sort(),
    };
  }
}

export const doctorService = new DoctorService();
export default doctorService;
