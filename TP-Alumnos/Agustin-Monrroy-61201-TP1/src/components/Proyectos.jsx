
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
  
  projectGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
    gap: '30px',
  },
  
  projectCard: {
    backgroundColor: '#242424',
    border: '1px solid #333',
    borderRadius: '8px',
    padding: '25px',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 3px 10px rgba(0,0,0,0.4)',
  },
  projectTitle: {
    fontSize: '1.5rem',
    fontWeight: '600',
    color: '#ffffff',
    margin: '0 0 10px 0',
  },
  projectDescription: {
    fontSize: '1rem',
    color: '#999',
    lineHeight: '1.6',
    flexGrow: 1, 
  },
  
  techList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    margin: '15px 0',
  },
  techItem: {
    backgroundColor: '#007bff',
    color: '#ffffff',
    padding: '5px 12px',
    borderRadius: '15px',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  
  linksContainer: {
    display: 'flex',
    gap: '15px',
    marginTop: 'auto', 
  },
  projectLink: {
    backgroundColor: 'transparent',
    border: '1px solid #007bff',
    color: '#007bff',
    padding: '8px 15px',
    borderRadius: '5px',
    textDecoration: 'none',
    fontWeight: '600',
    textAlign: 'center',
    transition: 'all 0.3s ease',
  },

};


const proyectos = [
  {
    title: 'Pagina web de una biblioteca',
    description: 'Página web de Alquiler de inventario para una biblioteca publica',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    title: 'Control de stock y venta de panaderia (EN DESARROLLO)',
    description: 'Clásica aplicación para gestionar stock y venta del producto y tambien gestios de clientes favoritos',
    tech: ['React', 'HTML', 'CSS', 'MySQL'],
    githubLink: 'https.://github.com/tu-usuario/tu-repo-todo',
    demoLink: 'https.://tu-demo-link-todo.com',
  },
  
];

function Proyectos() {
  return (
    <section style={styles.section}>
      <h2 style={styles.sectionTitle}>Proyectos Realizados y en Proceso</h2>
      
      <div style={styles.projectGrid}>
        {proyectos.map((proyecto, index) => (
          <div key={index} style={styles.projectCard}>
            <h3 style={styles.projectTitle}>{proyecto.title}</h3>
            <p style={styles.projectDescription}>{proyecto.description}</p>
            
            <div style={styles.techList}>
              {proyecto.tech.map((tech, i) => (
                <span key={i} style={styles.techItem}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Proyectos;