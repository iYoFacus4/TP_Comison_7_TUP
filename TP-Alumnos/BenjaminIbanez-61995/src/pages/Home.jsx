import Header from "../components/Header";
import Footer from "../components/Footer";
import Idiomas from "../components/Idiomas";
import Estudios from "../components/Estudios";
import Proyectos from "../components/Proyectos";
import SoftSkills from "../components/SoftSkills";
import Experiencia from "../components/Experiencia";
import Certificados from "../components/Certificados";

function Home() {
  return (
    <div>
      <Header />
      <main className="container">
        <Proyectos />
        <Estudios />
        <Idiomas />
        <Experiencia />
        <SoftSkills />
        <Certificados />
      </main>
      <Footer />
    </div>
  );
}

export default Home;
