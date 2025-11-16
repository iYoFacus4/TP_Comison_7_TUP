function Experiencia() {
    const experiencias = [
        {id: 1, nombre: "Secretario De Abogado", tiempo: "1 Año"},
        {id: 2, nombre: "Trabador De Redes", tiempo: "6 Meses"},
        {id: 3, nombre: "Desarrollador Full Stack", tiempo: "2 Años" }
    ]
    return (
    <section id="experiencias" style={{ padding: '40px 60px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>Experiencias</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', /*maxWidth: "600px"*/}}>
        {experiencias.map((experiencia) => (
          <div key={experiencia.id} style={{
            backgroundColor: '#2a2a2a',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              {experiencia.nombre}
            </span>
            <span style={{ 
              color: '#999', 
              fontSize: '1rem',
              backgroundColor: '#1a1a1a',
              padding: '5px 15px',
              borderRadius: '20px'
            }}>
              {experiencia.tiempo}
            </span>
          </div>
        ))}
      </div>
    </section>
    )
}

export default Experiencia;