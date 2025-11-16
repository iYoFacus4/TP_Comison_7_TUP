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
      sectionTitulo: {
            fontSize: '2.2rem',
            fontWeight: '700',
            color: '#007bff',
            borderBottom: '2px solid #333',
            paddingBottom: '10px',
            marginBottom: '25px',
      },

      jobItem: {
            marginBottom: '30px',
      },
      jobTitulo: {
            fontSize: '1.4rem',
            fontWeight: '600',
            margin: '0 0 5px 0',
            color: '#ffffff',
      },
      jobCompaniaFecha: {
            fontSize: '1.1rem',
            fontStyle: 'italic',
            fontWeight: '300',
            color: '#999',
            margin: '0 0 10px 0',
      },
      jobDescripcion: {
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#c0c0c0',
      },
      noExperienciaText: {
            fontSize: '1.1rem',
            color: '#999',
            textAlign: 'center',
            fontStyle: 'italic',
      }
};

const experiencia = [
      {
            titulo: 'Atención al Cliente',
            compania: 'Panadería Cainzo',
            fecha: '2022 - Presente',
            descripcion: 'Responsable de la atención al público, manejo de caja y gestión de pedidos.'
      },
];

function Experiencias() {
      return (
            <section style={styles.section}>
                  <h2 style={styles.sectionTitulo}>Experiencia Laboral</h2>
                  {experiencia.map((job, index) => (
                        <div key={index} style={styles.jobItem}>
                              <h3 style={styles.jobTitulo}>{job.titulo}</h3>
                              <p style={styles.jobCompaniaFecha}>
                                    {job.compania} | {job.fecha}
                              </p>
                              <p style={styles.jobDescripcion}>{job.descripcion}</p>
                        </div>
                  ))
                  }

            </section>
      );
}

export default Experiencias;