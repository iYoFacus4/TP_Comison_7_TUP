export default function Experiencia({ titulo }) {
  const trabajos = [
    { id: 1, puesto: "Asistente Técnico en Desarrollo", empresa: "CIDEPT", periodo: "2022" },
  ];

  return (
    <section id="experiencia" className="section" data-aos="zoom-in">
      <h2>{titulo}</h2>
      <ul className="lista-formacion">
      {trabajos.map((t) => (
        <div key={t.id} className="card">
          <h3>{t.puesto}</h3>
          <p>{t.empresa} — {t.periodo}</p>
        </div>
      ))}
      </ul>
    </section>
  );
}
