function Certificados() {
  const certificados = [
    { id: 1, nombre: "Diploma Colegio Suizo", nivel: "Secundario"}
  ];

  return (
    <section id="certificados" style={{ padding: '40px 60px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>Certificados</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', /*maxWidth: "600px"*/}}>
        {certificados.map((certificado) => (
          <div key={certificado.id} style={{
            backgroundColor: '#2a2a2a',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              {certificado.nombre}
            </span>
            <span style={{ 
              color: '#999', 
              fontSize: '1rem',
              backgroundColor: '#1a1a1a',
              padding: '5px 15px',
              borderRadius: '20px'
            }}>
              {certificado.nivel}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Certificados;