import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";

export default function Home() {
  
  const estudios = [
    { titulo: "Secundario", institucion: "Tulio García Fernández", estado: "Egresado" },
    { titulo: "Tecnicatura Universitaria en Programación (TUP)", institucion: "UTN", estado: "En curso" },
  ];

  const softSkills = [
    "Trabajo en equipo",
    "Buena comunicación",
    "Respuesta bajo presión",
    "Resolución de problemas", 
  ];

  const proyectos = [
    {
      nombre: "E-commerce tipo supermercado",
      descripcion:
        "Sitio con vista cliente y panel admin: catálogo, stock, ventas, y flujo completo. Front con React/JS/CSS y backend con MongoDB + Firebase.",
      tecnologias: ["React", "JavaScript", "CSS", "MongoDB", "Firebase"],
    },
    {
      nombre: "Sistema de stock para empresa de calzados",
      descripcion:
        "Aplicación de escritorio (Windows Forms, C#) + API REST y MySQL para gestión de inventario, sucursales y operaciones.",
      tecnologias: ["C#", "Windows Forms", "API REST", "MySQL"]
    },
  ];

  const experiencia = [
    {
      puesto: "Vendedor / Administrativo",
      empresa: "Empresa de alquiler de autos sin chofer",
      periodo: "Experiencia previa",
      tareas: ["Atención al cliente", "Gestión de reservas y tareas administrativas"],
    },
  ];

  const idiomas = [
    { nombre: "Español", nivel: "Nativo" },
    { nombre: "Inglés", nivel: "Intermedio" },
  ];

  const certificados = [
    { nombre: "Full Stack", entidad: "Rolling Code", anio: "—" },
  ];

  const links = {
    github: "https://github.com/mateoavila10",
    linkedin: "https://www.linkedin.com/in/mateo-avila-59932b345",
  };

  const bio =
    "Programador full stack, siempre con ganas de aprender y mejorar día a día. Fan del básquet y del código limpio.";

  const nombre = "Avila Mateo";

  return (
    <>
      <Header nombre={nombre} bio={bio} links={links} />
      <Main
        estudios={estudios}
        softSkills={softSkills}
        proyectos={proyectos}
        experiencia={experiencia}
        idiomas={idiomas}
        certificados={certificados}
      />
      <Footer links={links} />
    </>
  );
}
