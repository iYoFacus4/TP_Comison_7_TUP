import Estudios from "./Estudios";
import SoftSkills from "./SoftSkills";
import Proyectos from "./Proyectos";
import Experiencia from "./Experiencia";
import Idiomas from "./Idiomas";
import Certificados from "./Certificados";

export default function Main({
  estudios,
  softSkills,
  proyectos,
  experiencia,
  idiomas,
  certificados,
}) {
  return (
    <main className="container-soft">
      {/* Requisito: al menos 2 secciones como componentes navegables */}
      <section id="estudios" className="section">
        <Estudios items={estudios} />
      </section>

      <section id="softskills" className="section">
        <SoftSkills items={softSkills} />
      </section>

      <section id="proyectos" className="section">
        <Proyectos items={proyectos} />
      </section>

      <section id="experiencia" className="section">
        <Experiencia items={experiencia} />
      </section>

      <section id="idiomas" className="section">
        <Idiomas items={idiomas} />
      </section>

      <section id="certificados" className="section">
        <Certificados items={certificados} />
      </section>
    </main>
  );
}
