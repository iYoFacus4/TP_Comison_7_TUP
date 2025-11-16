import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Idiomas from "../Components/Idiomas";
import Estudios from "../Components/Estudios";
import Proyectos from "../Components/Proyectos";
import SoftSkills from "../Components/Softskills";
import Experiencia from "../Components/Experiencia";
import Certificados from "../Components/Certificados";
function Home() {
    return (
        <div>
        <Header />
        <Proyectos />
        <Estudios />
        <Idiomas />
        <Experiencia />
        <SoftSkills />
        <Certificados />
        <Footer />
        </div>
        
    )
}

export default Home;