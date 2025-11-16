export default function Certificados() {
  const certificados = [];

  return (
    <section id="certificados" className="card">
      <h3>Certificados</h3>

      {certificados.length === 0 ? (
        <p className="muted">Sin certificados cargados por ahora.</p>
      ) : (
        <ul>
          {certificados.map((c, i) => (
            <li key={i}>
              <strong>{c.nombre}</strong> — {c.entidad} ({c.anio})
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
