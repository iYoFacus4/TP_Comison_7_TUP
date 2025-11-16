import Estudios from "./Estudios.jsx";
import SoftSkills from "./SoftSkills.jsx";
import Proyectos from "./Proyectos.jsx";
import Experiencia from "./Experiencia.jsx";
import Idiomas from "./Idiomas.jsx";
import Certificados from "./Certificados.jsx";

export default function Main() {
  return (
    <main className="main">
      <section className="presentacion">
        <h2>Sobre mí</h2>
        <p>
          Soy <strong>Lautaro Punta</strong>, estudiante de Programación en la
          Facultad Regional Tucumán. Me apasiona la tecnología, el desarrollo
          web y aprender herramientas modernas como React.
        </p>
      </section>

      <Estudios />
      <SoftSkills />
      <Proyectos />
      <Experiencia />
      <Idiomas />
      <Certificados />
    </main>
  );
}
