export default function SoftSkills() {
  const skills = [
    "Trabajo en equipo",
    "Comunicación",
    "Responsabilidad",
    "Aprendizaje rápido",
  ];

  return (
    <section id="softskills" className="card">
      <h3>Soft Skills</h3>

      <ul className="chips">
        {skills.map((s, i) => (
          <li key={i} className="chip">
            {s}
          </li>
        ))}
      </ul>
    </section>
  );
}
