import Estudios from "./Estudios.jsx";
import SoftSkills from "./SoftSkills.jsx";
import Proyectos from "./Proyectos.jsx";
import Experiencia from "./Experiencia.jsx";
import Idiomas from "./Idiomas.jsx";
import Certificados from "./Certificados.jsx";
import { personalData } from "../data/data.js"; // <--- ESTA LÍNEA ES LA SOLUCIÓN

const Main = () => {
  return (
    <main className="portfolio-main">
      <section id="presentacion" className="section-padding">
        <h2 className="section-title">Acerca de Mí</h2>
        <p>{personalData.bio}</p>
      </section>

      <Proyectos />
      <Estudios />
      <Experiencia />
      <SoftSkills />
      <Idiomas />
      <Certificados />
      
    </main>
  );
};

export default Main;