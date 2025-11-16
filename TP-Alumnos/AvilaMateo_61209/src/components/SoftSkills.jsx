export default function SoftSkills() {
  const habilidades = [
    "Trabajo en equipo",
    "Buena comunicación",
    "Respuesta bajo presión",
    "Resolución de problemas",
    "Adaptabilidad"
  ];

  return (
    <section className="section container-soft" id="softskills">
      <h2 className="title">Soft Skills</h2>
      <div className="skills-container">
        {habilidades.map((skill, index) => (
          <span key={index} className="skill-pill">{skill}</span>
        ))}
      </div>
    </section>
  );
}
