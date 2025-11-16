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
    this.pacientes = this.getAll()
  }



  async getAll() {
    try {
      const response = await fetch("http://localhost:3001/pacientes");
    const data = await response.json();
      if (data.success) {
        return {
          success: true,
          data: data.data,
          total: data.total,
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
      
      const response = await fetch(`http://localhost:3001/pacientes`,
      {
        method: "POST", // o "PUT" si tu backend lo espera así
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: patientData.nombre,// el contenido que querés enviar
          apellido: patientData.apellido,
          dni: patientData.dni,
          fecha_nacimiento: patientData.fechaNacimiento,
          telefono: patientData.telefono,
          email: patientData.email,
          direccion: patientData.direccion
        }),
      });
    const data = await response.json();
console.log(data)
      if (data.success) {
        return {
          success: true,
          data: data.data,
          message:  "Paciente creado exitosamente",
        };
      } else {
        return {
          success: false,
          error:  "Error al crear paciente",
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
      const response = await fetch(`http://localhost:3001/pacientes/${id}`,
      {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: patientData.nombre,
          apellido: patientData.apellido,
          dni: patientData.dni,
          fecha_nacimiento: patientData.fechaNacimiento,
          telefono: patientData.telefono,
          email: patientData.email,
          direccion: patientData.direccion
        }),
      });
    const data = await response.json();

      if (data.success) {
        return {
          success: true,
          data: data.data,
          message: data.message || "Paciente actualizado exitosamente",
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
      const response = await fetch(`http://localhost:3001/pacientes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
console.log(data)
      if (data.success) {
        return {
          success: true,
          data: data.data,
          message: "Paciente eliminado exitosamente",
        };
      } else {
        return {
          success: false,
          error: "Error al eliminar paciente",
        };
      }
    } catch (error) {
      return {
        success: false,
        error: error.message || "Error de conexión",
      };
    }
  }

  async search(query, pacientes) {
    if (!query || query.trim() === "") {
      return this.pacientes
    }
    const searchTerm = query.toLowerCase();
    const filtered = pacientes.filter(
      (p) =>
        p.apellido.toLowerCase().includes(searchTerm) ||
        p.nombre.toLowerCase().includes(searchTerm)
    );
    return {
      success: true,
      data: filtered,
      total: filtered.length,
    };
  }
}

export const patientService = new PatientService();
export default patientService;
