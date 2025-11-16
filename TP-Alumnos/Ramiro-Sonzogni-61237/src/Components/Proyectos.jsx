function Proyectos() {
    const proyectos = [
        {id: 1, nombre: "Proyecto Personal"},
        {id: 2, nombre: "Sistema De Gestion Panificadora Cainzo"},
        {id: 3, nombre: "Pagnia Web De Juegos"}
    ]
    return(
    <section id="proyectos" style={{ padding: '40px 60px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>Proyectos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', /*maxWidth: "600px"*/}}>
        {proyectos.map((proyecto) => (
          <div key={proyecto.id} style={{
            backgroundColor: '#2a2a2a',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              {proyecto.nombre}
            </span>
            
          </div>
        ))}
      </div>
    </section>
    )
}

export default Proyectos;