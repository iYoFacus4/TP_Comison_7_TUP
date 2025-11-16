import { httpClient } from "./httpClient";

const MOCK_PATIENTS = [
  {
    id: "1",
    nombre: "Pedro",
    apellido: "García",
    dni: "12345678",
    fechaNacimiento: "1990-05-15",
    telefono: "011-1234-5678",
    email: "pedro.garcia@email.com",
    direccion: "Av. Corrientes 1234, CABA",
    obraSocial: "OSDE",
  },
  {
    id: "2",
    nombre: "Laura",
    apellido: "Fernández",
    dni: "23456789",
    fechaNacimiento: "1985-08-22",
    telefono: "011-2345-6789",
    email: "laura.fernandez@email.com",
    direccion: "Calle San Martín 567, CABA",
    obraSocial: "Swiss Medical",
  },
  {
    id: "3",
    nombre: "Roberto",
    apellido: "Martínez",
    dni: "34567890",
    fechaNacimiento: "1995-03-10",
    telefono: "011-3456-7890",
    email: "roberto.martinez@email.com",
    direccion: "Av. Rivadavia 890, CABA",
    obraSocial: "Galeno",
  },
  {
    id: "4",
    nombre: "Carolina",
    apellido: "López",
    dni: "45678901",
    fechaNacimiento: "1988-11-30",
    telefono: "011-4567-8901",
    email: "carolina.lopez@email.com",
    direccion: "Calle Belgrano 234, CABA",
    obraSocial: "OSDE",
  },
  {
    id: "5",
    nombre: "Martín",
    apellido: "González",
    dni: "56789012",
    fechaNacimiento: "1992-07-18",
    telefono: "011-5678-9012",
    email: "martin.gonzalez@email.com",
    direccion: "Av. Santa Fe 456, CABA",
    obraSocial: "Medicus",
  },
];

class PatientService {
  constructor() {
    this.initializeMockData();
  }

  initializeMockData() {
    const stored = localStorage.getItem("patients");
    if (!stored) {
      localStorage.setItem("patients", JSON.stringify(MOCK_PATIENTS));
    }
  }

  async getAll() {
    try {
      const response = await httpClient.get("/api/patients");

      if (response.ok && response.data.success) {
        return {
          success: true,
          data: response.data.data,
          total: response.data.total,
        };
      } else {
        return {
          success: false,
          error: response.error || "Error al obtener pacientes",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }

  async getById(id) {
    try {
      const response = await httpClient.get(`/api/patients/${id}`);

      if (response.ok && response.data.success) {
        return {
          success: true,
          data: response.data.data,
        };
      } else {
        return {
          success: false,
          error: response.error || "Paciente no encontrado",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }

  async create(patientData) {
    try {
      const response = await httpClient.post("/api/patients", patientData);

      if (response.ok && response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Paciente creado exitosamente",
        };
      } else {
        return {
          success: false,
          error: response.error || "Error al crear paciente",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }

  async update(id, patientData) {
    try {
      const response = await httpClient.put(`/api/patients/${id}`, patientData);

      if (response.ok && response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Paciente actualizado exitosamente",
        };
      } else {
        return {
          success: false,
          error: response.error || "Error al actualizar paciente",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }

  async delete(id) {
    try {
      const response = await httpClient.delete(`/api/patients/${id}`);

      if (response.ok && response.data.success) {
        return {
          success: true,
          data: response.data.data,
          message: response.data.message || "Paciente eliminado exitosamente",
        };
      } else {
        return {
          success: false,
          error: response.error || "Error al eliminar paciente",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }

  async search(query) {
    try {
      if (!query || query.trim() === "") {
        return this.getAll();
      }

      const response = await httpClient.get(`/api/patients?search=${query}`);

      if (response.ok && response.data.success) {
        return {
          success: true,
          data: response.data.data,
          total: response.data.total,
        };
      } else {
        return {
          success: false,
          error: response.error || "Error al buscar pacientes",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }
}

export const patientService = new PatientService();
export default patientService;
