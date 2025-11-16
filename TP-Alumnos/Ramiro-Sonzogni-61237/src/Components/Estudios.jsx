import Idiomas from "./Idiomas"

function Estudios() {
    const estudios = [
        {id: 1, nombre: "Colegio Suizo ", nivel: "6 Años"},
        {id: 2, nombre: "Universidad Tecnologica Nacional", nivel: "2 Años"}
    ]
    return (
    <section id="estudios" style={{ padding: '40px 60px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>Estudios</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', /*maxWidth: "600px"*/}}>
        {estudios.map((estudio) => (
          <div key={estudio.id} style={{
            backgroundColor: '#2a2a2a',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              {estudio.nombre}
            </span>
            <span style={{ 
              color: '#999', 
              fontSize: '1rem',
              backgroundColor: '#1a1a1a',
              padding: '5px 15px',
              borderRadius: '20px'
            }}>
              {estudio.nivel}
            </span>
          </div>
        ))}
      </div>
    </section>
    )
}

export default Estudios;