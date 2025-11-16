
const styles = {
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
    borderBottom: '2px solid #333',
    paddingBottom: '10px',
    marginBottom: '25px',
  },
  studyItem: {
    marginBottom: '20px',
  },
  studyTitle: {
    fontSize: '1.4rem',
    fontWeight: '600',
    margin: '0 0 5px 0',
    color: '#ffffff',
  },
  studyInstitution: {
    fontSize: '1.1rem',
    fontWeight: '300',
    color: '#999',
    margin: '0',
  }
};

function Estudios() {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>Estudios</h2>
      
      <div style={styles.studyItem}>
        <h3 style={styles.studyTitle}>Tecnicatura Universitaria en Programación</h3>
        <p style={styles.studyInstitution}>
          Universidad Tecnológica Nacional (UTN) - (En curso)
        </p>
      </div>
      
      <div style={styles.studyItem}>
        <h3 style={styles.studyTitle}>Secundario Completo</h3>
        <p style={styles.studyInstitution}>
          [Institu Jhonn Kennedy] - (Finalizado)
        </p>
      </div>
    </section>
  );
}

export default Estudios;