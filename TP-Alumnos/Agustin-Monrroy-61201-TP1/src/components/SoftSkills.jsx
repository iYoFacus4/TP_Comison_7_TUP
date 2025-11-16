
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
 
  skillsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', 
    gap: '20px', 
  },
 
  skillItem: {
    backgroundColor: '#333',
    color: '#e0e0e0',
    padding: '12px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '500',
    boxShadow: '0 10px 5px rgba(6, 7, 100, 0.3)',
  }
};

const skills = [
  'Aprendizaje Activo',
  'Organización y Estructura',
  'Comunicación Efectiva',
  'Resolución de Problemas',
  'Atención al Detalle', 
];

function SoftSkills() {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>Soft Skills</h2>
      
      <div style={styles.skillsGrid}>
        {skills.map((skill, index) => (
          <div key={index} style={styles.skillItem}>
            {skill}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SoftSkills;