import "../styles/SoftSkills.css"


export default function SoftSkills({ id }) {

    const softSkillsData = [
        {
         id: 1,
         habilidad: 'Trabajo en Equipo',
         descripcion: 'Capacidad para colaborar eficazmente en equipo, aportando ideas y respetando las de los demás para alcanzar objetivos comunes.'
         },
         {
         id: 2,
         habilidad: 'Resolución de Problemas',
          descripcion: 'Habilidad para analizar problemas complejos, identificar sus causas y desarrollar soluciones creativas y eficientes.'
        },
        {
         id: 3,
         habilidad: 'Comunicación Efectiva',
         descripcion: 'Facilidad para expresar ideas de manera clara y concisa, tanto de forma oral como escrita, adaptándome a diferentes audiencias.'
        },
         {
          id: 4,
          habilidad: 'Adaptabilidad',
          descripcion: 'Flexibilidad para adaptarme a nuevos entornos, tecnologías y metodologías de trabajo, manteniendo siempre una actitud positiva.'
         }
     ];







  return (
    <section id={id} className="seccion-softskills">
      <h2 className="h2-softskills">Habilidades Blandas</h2>
      <div className="softskills-container">
        {softSkillsData.map((skill) => (
          <article key={skill.id} className="softskill-card">
            {/* Ya no está el div del ícono */}
            <h3>{skill.habilidad}</h3>
            <p>{skill.descripcion}</p>
          </article>
        ))}
      </div>
    </section>
  );
}