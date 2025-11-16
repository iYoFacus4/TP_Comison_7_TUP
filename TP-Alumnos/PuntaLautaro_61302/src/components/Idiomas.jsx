export default function Idiomas() {
  const idiomas = [
    { idioma: "Español", nivel: "Nativo" },
    { idioma: "Inglés", nivel: "Intermedio" },
  ];

  return (
    <section id="idiomas" className="card">
      <h3>Idiomas</h3>

      <ul>
        {idiomas.map((i, idx) => (
          <li key={idx}>
            <strong>{i.idioma}</strong>: {i.nivel}
          </li>
        ))}
      </ul>
    </section>
  );
}
