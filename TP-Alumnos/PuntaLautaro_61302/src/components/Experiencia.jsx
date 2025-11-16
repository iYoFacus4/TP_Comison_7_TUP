export default function Experiencia() {
  const experiencias = [
    {
      puesto: "Soporte técnico",
      empresa: "Freelance",
      periodo: "2023–2024",
      tareas: ["Mantenimiento de PCs", "Instalación de software"],
    },
  ];

  return (
    <section id="experiencia" className="card">
      <h3>Experiencia Laboral</h3>

      <ul>
        {experiencias.map((x, i) => (
          <li key={i}>
            <strong>{x.puesto}</strong> — {x.empresa}{" "}
            <span className="muted">({x.periodo})</span>

            <ul>
              {x.tareas.map((t, j) => (
                <li key={j}>• {t}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
