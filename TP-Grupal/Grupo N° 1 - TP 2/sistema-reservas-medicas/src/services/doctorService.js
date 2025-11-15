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
    this.doctores = this.getAll()
  }

async getAll() {
  try {
    const response = await fetch("http://localhost:3000/doctores");
    const data = await response.json();

    console.log("Doctores:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener doctores:", error);
    return {
      success: false,
      error: "Error al obtener doctores",
    };
  }
}


  async getById(id) {
  try {
    const response = await fetch(`http://localhost:3000/doctores/${id}`);
    const data = await response.json();

    console.log("Doctores:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener doctores:", error);
    return {
      success: false,
      error: "Error al obtener doctores",
    };
  }
  }

  async getByEspecialidad(especialidad) {
      try {
    const response = await fetch(`http://localhost:3000/doctores/${especialidad}`);
    const data = await response.json();

    console.log("Doctores:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener doctores:", error);
    return {
      success: false,
      error: "Error al obtener doctores",
    };
  }
  }

  async search(query, doctores) {
    if (!query || query.trim() === "") {
      return this.doctores
    }
    const searchTerm = query.toLowerCase();
    const filtered = doctores.filter(
      (d) =>
        d.apellido.toLowerCase().includes(searchTerm) ||
        d.nombre.toLowerCase().includes(searchTerm)
    );
    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }

async getEspecialidades() {
      try {
    const response = await fetch("http://localhost:3000/especialidades");
    const data = await response.json();
    const nombres = data.data.map(e => e.nombre);
    console.log(nombres);
    return {success: true,
      data: nombres.sort()};
  } catch (error) {
    console.error("Error al obtener las especialidades:", error);
    return {
      success: false,
      error: "Error al obtener las especialidades",
    };
  }
  }
}

export const doctorService = new DoctorService();
export default doctorService;
