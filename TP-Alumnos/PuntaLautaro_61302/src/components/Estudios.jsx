export default function Estudios() {
  const estudios = [
    {
      institucion: "UTN FRT",
      titulo: "Tecnicatura Univ. en Programación",
      periodo: "2024–2026 (en curso)",
    },
    {
      institucion: "Cursos online",
      titulo: "React + Git",
      periodo: "2024",
    },
  ];

  return (
    <section id="estudios" className="card">
      <h3>Estudios</h3>

      <ul>
        {estudios.map((e, i) => (
          <li key={i}>
            <strong>{e.titulo}</strong> — {e.institucion}{" "}
            <span className="muted">({e.periodo})</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
