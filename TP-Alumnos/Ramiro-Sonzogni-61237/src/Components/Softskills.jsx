function SoftSkills() {
    const skills = [
        {id: 1, nombre: "C#", nivel: "Basico"},
        {id: 2, nombre: "Java-Script", nivel: "Intermedio"},
        {id: 3, nombre: "React", nivel: "Basico"}
    ]
    return (
    <section id="softSkills" style={{ padding: '40px 60px' }}>
      <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>SoftSkills</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', /*maxWidth: "600px"*/}}>
        {skills.map((skill) => (
          <div key={skill.id} style={{
            backgroundColor: '#2a2a2a',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '1.2rem', fontWeight: '500' }}>
              {skill.nombre}
            </span>
            <span style={{ 
              color: '#999', 
              fontSize: '1rem',
              backgroundColor: '#1a1a1a',
              padding: '5px 15px',
              borderRadius: '20px'
            }}>
              {skill.nivel}
            </span>
          </div>
        ))}
      </div>
    </section>
    )
}

export default SoftSkills;