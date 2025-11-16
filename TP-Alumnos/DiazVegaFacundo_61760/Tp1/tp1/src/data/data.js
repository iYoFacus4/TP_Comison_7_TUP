export const personalData = {
  nombre: "Facundo Díaz Vega",
  rol: "Estudiante de Programación | Desarrollador Front-end Jr.",
  // Bio actualizada con la información que proporcionaste
  bio: "Soy un estudiante avanzado de la Tecnicatura Universitaria en Programación con fuerte enfoque en el desarrollo Front-end. Busco aplicar conocimientos de React, consumo de APIs y buenas prácticas de desarrollo. Mi formación técnica me permite abordar problemas desde una perspectiva integral de hardware y software.",
  github: "https://github.com/iYoFacus4", 
  linkedin: "https://www.linkedin.com/in/facundo-díaz-vega-385606294",
};

// Estudios Académicos
export const estudiosData = [
  {
    id: 1,
    titulo: "Tecnicatura Universitaria en Programación",
    institucion: "Universidad Tecnológica Nacional (UTN)",
    periodo: "Actualidad",
  },
  {
    id: 2,
    titulo: "Título Secundario Completo",
    institucion: "Colegio Salesiano Gral Belgrano", 
    periodo: "Finalizado",
  },
  {
    id: 3,
    titulo: "Título Inicial Completo",
    institucion: "Colegio Salesiano Gral Belgrano", 
    periodo: "Finalizado",
  },
];

// Proyectos (Usa .map() para renderizar)
export const proyectosData = [
  {
    id: 1,
    nombre: "Gestor de Clientes para Gimnasio",
    descripcion: "Aplicación de escritorio para la administración de clientes, pagos y membresías de un gimnasio.",
    tecnologias: ["C#", "WinForms", "SQL Server"],
    link: "#",
  },
  {
    id: 2,
    nombre: "Biblioteca Web",
    descripcion: "Plataforma web para catalogar y buscar libros, con interfaz de usuario moderna.",
    tecnologias: ["HTML5", "CSS3", "JavaScript", "API REST"],
    link: "#",
  },
];

// Soft Skills (Usa .map() para renderizar)
export const softSkillsData = [
  "Trabajo en equipo", // Proporcionado por el usuario
  "Resolución de problemas",
  "Adaptabilidad y Flexibilidad",
  "Comunicación efectiva",
  "Orientación al detalle",
];

// Experiencia Laboral / Cursos Técnicos Avanzados
export const experienciaData = [
    {
        id: 1,
        puesto: "Técnico en Reparación de PC (Nivel Intermedio)",
        empresa: "Curso de Formación Técnica",
        periodo: "2024",
        descripcion: "Especialización en diagnóstico avanzado, reemplazo de componentes y solución de problemas complejos de hardware y software.",
    },
    {
        id: 2,
        puesto: "Técnico en Reparación de PC (Nivel Inicial)",
        empresa: "Curso de Formación Técnica",
        periodo: "2023",
        descripcion: "Adquisición de bases para el montaje, configuración inicial y mantenimiento preventivo de equipos de cómputo.",
    }
];

// Idiomas
export const idiomasData = [
    { id: 1, idioma: "Español", nivel: "Nativo" },
    { id: 2, idioma: "Inglés", nivel: "Intermedio / Conversacional" }, // El nivel exacto es flexible
];

export const certificadosData = [
    { id: 1, nombre: "Curso de Técnico en Reparación (Intermedio)", emisor: "Centro de Formación Técnica" },
    { id: 2, nombre: "Curso de Técnico en Reparación (Inicial)", emisor: "Centro de Formación Técnica" },
];