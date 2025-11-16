export const profile = {
  name: 'Luis Emilio Nuñez Salvador',
  age: 20,
  legajo: '61687',      
  country: 'Argentina',
  bio: 'Backend & Frontend Dev — PHP, JS, MySQL, C#, enfoque en calidad y aprendizaje constante.',
  photo: '/IMG/pfp.jpg',
  github: 'https://github.com/LuisENS',
  linkedin: 'https://www.linkedin.com/in/luis-emilio-nu%C3%B1ez-salvador-86459a38b/'
}

export const estudios = [
  {
    institucion: 'UTN FRT Tucumán',
    titulo: 'Tecnicatura Universitaria en Programación (1° año)',
    periodo: '2024 – 2025',
    detalles: ['Estructuras de datos, Programación orientada a objetos, Bases de datos.'],
    certificados: ['Certificados (a completar si aplica)']
  }
]

export const softSkills = [
  { nombre:'Trabajo en equipo', descripcion:'Colaboración efectiva y comunicación clara.' },
  { nombre:'Aprendizaje autodidacta', descripcion:'Adaptación rápida a nuevas tecnologías.' },
  { nombre:'Resolución de problemas', descripcion:'Análisis y enfoque práctico.' },
  { nombre:'Gestión del tiempo', descripcion:'Planificación y entregas a tiempo.' },
]

export const proyectos = [
  { titulo:'Panadería CRUD',  descripcion:'WinForms C# + SQL Server (3 capas).', stack:['C#','WinForms','.NET','SQL Server'], repo:'#' },
  { titulo:'SistemaAgenda',   descripcion:'React + Vite, componentes reutilizables.', stack:['React','Vite','CSS'], repo:'#' },
  { titulo:'LentStore Demo',  descripcion:'API REST Node/Express para productos/órdenes.', stack:['Node.js','Express','REST','JSON'], repo:'#' },
  { titulo:'Stadium Manager', descripcion:'Consola C# para gestión de estadio.', stack:['C#','.NET'], repo:'#' },
]

export const experiencia = [
  { rol:'Frontend Developer', empresa:'Digital Flow Inc.', periodo:'', logros:['UI con HTML/CSS/JS, interacción accesible','Mejoras de UX y performance'] },
  { rol:'Backend Developer',  empresa:'MixBase Studios',   periodo:'Enero 2019 – Mayo 2020', logros:['Esquemas MySQL optimizados','Integraciones externas','Seguridad de datos'] },
  { rol:'Backend Manager',    empresa:'Forge Technologies', periodo:'Enero 2021 – Febrero 2022', logros:['Gestión BD y automatización','Coordinación de equipo'] },
]

export const idiomas = [
  { idioma:'Spanish',    nivel10:10, color:'#8be9fd' },
  { idioma:'English',    nivel10:6,  color:'#a78bfa' },
  { idioma:'Portuguese', nivel10:4,  color:'#f472b6' },
  { idioma:'French',     nivel10:5,  color:'#fbbf24' },
]
