import Estudios from './Estudios';
import Tecnologias from './Tecnologias';
import Certificados from './Certificados';
import Idiomas from './Idiomas';
import '../styles/Main.css';

// Recibo los datos que me pasa Home como props
function Main({ nombre, apellido, dataEstudios, dataCertificados, dataIdiomas }) { 
  return (
    <main className="main-content">
      
      {/* Sección principal con mi foto y presentación */}
      <section className="hero-section">
        <div className="hero-content">
          <img src="/perfil.jpg" alt="Nicolás Moya" className="hero-profile-pic" />
          <h1 className="hero-name">{nombre} {apellido}</h1>
          <p className="hero-description">
            Soy Técnico Superior en Comunicación Social y actualmente estoy cursando la carrera de Programación en la Universidad Tecnológica Nacional.
            Mi primer contacto con la programación fue durante la pandemia en 2020, cuando inicié un curso de desarrollo full stack en Rolling Code.
            Me considero una persona proactiva, con ganas de aprender y crecer profesionalmente en el ámbito del desarrollo de software.
          </p>
        </div>
      </section>

      <section id="estudios" className="section">
        <Estudios data={dataEstudios} /> 
      </section>

      <section id="tecnologias" className="section">
        <Tecnologias />
      </section>

      <section id="certificados" className="section">
        <Certificados data={dataCertificados} />
      </section>

      <section id="idiomas" className="section">
        <Idiomas data={dataIdiomas} />
      </section>
      
    </main>
  );
}
export default Main;