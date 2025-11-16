import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1000, 
  once: false,   
  offset: 200, 
});

import perfil from "../src/assets/IMG-20230223-WA0000.jpg";

import Estudios from "./Estudios";
import Experiencia from "./Experiencia";
import Proyectos from "./Proyectos";
import Lenguajes from "./Lenguajes";
import Softskills from "./SoftSkills";
import Idiomas from "./Idiomas";

export default function Main() {
  const descripcion = "Soy estudiante de la Tecnicatura Universitaria en Programación en la UTN , apasionado por el desarrollo de software, especialmente en C#, JavaScript y HTML. Me gusta aprender nuevas tecnologías y aplicar buenas prácticas de programación.";

  return (
    <main className="main" id="inicio">
      <div className="perfil-container">
        <img src={perfil} alt="Foto personal" className="perfil" />
      </div>

      <h1 className="nombre">Fabricio Luciano Toranzo</h1>



      <section className="sobre-mi" data-aos="zoom-in">
        <h2>Sobre mí</h2>
        <div className="card">
          <p>{descripcion}</p>
        </div>
      </section>

      <Estudios titulo="Formación Académica" />
      <Proyectos titulo="Proyectos Realizados" />
      <Experiencia titulo="Experiencia Laboral" />
      <Lenguajes titulo="Lenguajes Dominados"/>
      <Softskills titulo="Habilidades" />
      <Idiomas titulo="Idiomas" />
    </main>
  );
}
