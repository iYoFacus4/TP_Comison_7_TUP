import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Gestión de Peluquería - TP10 Grupo N° 4",
      version: "1.0.0",
      description:
        "API REST para la gestión de clientes, servicios y turnos de una peluquería",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: "Servidor de desarrollo",
      },
      {
        url: "http://localhost:3001",
        description: "Servidor local alternativo",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Ingrese el token JWT (sin 'Bearer')",
        },
      },
      schemas: {
        Cliente: {
          type: "object",
          required: ["nombre", "apellido", "telefono"],
          properties: {
            id: {
              type: "integer",
              description: "ID único del cliente (auto-generado)",
              example: 1,
            },
            nombre: {
              type: "string",
              description: "Nombre del cliente",
              example: "Juan",
            },
            apellido: {
              type: "string",
              description: "Apellido del cliente",
              example: "Pérez",
            },
            telefono: {
              type: "string",
              description: "Número de teléfono del cliente",
              example: "3515123456",
            },
            email: {
              type: "string",
              format: "email",
              description: "Correo electrónico del cliente (opcional)",
              example: "juan.perez@email.com",
            },
          },
        },
        Servicio: {
          type: "object",
          required: ["nombre", "precio", "duracion"],
          properties: {
            id: {
              type: "integer",
              description: "ID único del servicio (auto-generado)",
              example: 1,
            },
            nombre: {
              type: "string",
              description: "Nombre del servicio",
              example: "Corte de cabello",
            },
            descripcion: {
              type: "string",
              description: "Descripción detallada del servicio",
              example: "Corte personalizado según preferencias del cliente",
            },
            precio: {
              type: "number",
              format: "decimal",
              description: "Precio del servicio en pesos",
              example: 5000.0,
            },
            duracion: {
              type: "integer",
              description: "Duración estimada del servicio en minutos",
              example: 30,
            },
          },
        },
        Turno: {
          type: "object",
          required: ["cliente_id", "servicio_id", "fecha", "hora"],
          properties: {
            id: {
              type: "integer",
              description: "ID único del turno (auto-generado)",
              example: 1,
            },
            cliente_id: {
              type: "integer",
              description: "ID del cliente que solicitó el turno",
              example: 1,
            },
            servicio_id: {
              type: "integer",
              description: "ID del servicio solicitado",
              example: 1,
            },
            fecha: {
              type: "string",
              format: "date",
              description: "Fecha del turno (YYYY-MM-DD)",
              example: "2025-11-20",
            },
            hora: {
              type: "string",
              format: "time",
              description: "Hora del turno (HH:MM:SS)",
              example: "14:30:00",
            },
            estado: {
              type: "string",
              enum: ["pendiente", "confirmado", "cancelado", "completado"],
              description: "Estado actual del turno",
              example: "pendiente",
              default: "pendiente",
            },
            notas: {
              type: "string",
              description: "Notas adicionales sobre el turno",
              example: "Cliente prefiere el estilista María",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            ok: {
              type: "boolean",
              example: false,
            },
            error: {
              type: "string",
              description: "Mensaje de error",
              example: "Recurso no encontrado",
            },
          },
        },
        Success: {
          type: "object",
          properties: {
            ok: {
              type: "boolean",
              example: true,
            },
            message: {
              type: "string",
              description: "Mensaje de éxito",
              example: "Operación realizada exitosamente",
            },
          },
        },
      },
      responses: {
        NotFound: {
          description: "Recurso no encontrado",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        BadRequest: {
          description: "Datos inválidos en la solicitud",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
        InternalError: {
          description: "Error interno del servidor",
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Error",
              },
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Clientes",
        description: "Gestión de clientes de la peluquería",
      },
      {
        name: "Servicios",
        description: "Gestión de servicios ofrecidos",
      },
      {
        name: "Turnos",
        description: "Gestión de turnos y citas",
      },
      {
        name: "Sistema",
        description: "Endpoints de sistema y pruebas",
      },
    ],
  },
  apis: [
    "./index.js",
    "./routes/*.js",
    // Agrega aquí otros archivos que contengan documentación de rutas
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
