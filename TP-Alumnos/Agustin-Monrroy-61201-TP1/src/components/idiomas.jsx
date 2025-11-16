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
 
  languageItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '1.2rem',
    color: '#ffffff',
    padding: '10px 0',
  },
  languageName: {
    fontWeight: '600',
  },
  languageLevel: {
    fontWeight: '300',
    color: '#999',
    backgroundColor: '#333',
    padding: '5px 12px',
    borderRadius: '8px',
  }
};

function Idiomas() {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>Idiomas</h2>
      
      <div style={styles.languageItem}>
        <span style={styles.languageName}>Inglés</span>
        <span style={styles.languageLevel}>Nivel B2 (Intermedio-Avanzado)</span>
      </div>

    </section>
  );
}

export default Idiomas;