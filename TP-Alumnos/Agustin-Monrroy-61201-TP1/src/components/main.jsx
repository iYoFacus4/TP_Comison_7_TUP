import Estudios from '../components/estudios';
import SoftSkills from "../components/softskills";
import Proyectos from "../components/Proyectos";
import Experiencias from '../components/Experiencias';
import Idiomas from "../components/Idiomas";

const styles = {
  main: {
    backgroundColor: '#121212',
    color: '#e0e0e0',
    padding: '40px 60px',
    flex: '1', // 👈 
  },

  section: {
    marginBottom: '50px',
    maxWidth: '900px',
    margin: '0 auto 50px auto',
    padding: '30px',
    backgroundColor: '#1a1a1a',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
  },
  sectionTitle: {
    fontSize: '2.2rem',
    fontWeight: '700',
    color: '#007bff',
    borderBottom: 'none',
    marginBottom: '15px',
  },
  bio: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    textAlign: 'center',
  }
};

function Main() {
  return (
    <div style={styles.main}>

      {/* PRESENTACIÓN PERSONAL*/}
      <section style={{ ...styles.section, textAlign: 'center' }}>
        <h2 style={styles.sectionTitle}>
          ¡Hola! Soy Agustín
        </h2>
        <p style={styles.bio}>
          Soy desarrollador web enfocado en crear soluciones
          digitales. Actualmente ampliando mis
          habilidades y conocimientos en el desarrollo de software.
        </p>
      </section>

      <Proyectos />
      <Estudios />
      <SoftSkills />
      <Experiencias />
      <Idiomas />

    </div>
  );
}

export default Main;