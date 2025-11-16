function Idiomas() {
  const idiomas = [
    { id: 1, nombre: "Español", nivel: "Nativo" },
    { id: 2, nombre: "Inglés", nivel: "Intermedio" }
  ];

  return (
    <section id="idiomas" style={{ padding: '40px 60px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>Idiomas</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', /*maxWidth: "600px"*/}}>
        {idiomas.map((idioma) => (
          <div key={idioma.id} style={{
            backgroundColor: '#2a2a2a',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              {idioma.nombre}
            </span>
            <span style={{ 
              color: '#999', 
              fontSize: '1rem',
              backgroundColor: '#1a1a1a',
              padding: '5px 15px',
              borderRadius: '20px'
            }}>
              {idioma.nivel}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Idiomas;