export default function Certificados({ items = [] }) {
  return (
    <>
      <h2 className="title">Certificados</h2>
      {items.length === 0 ? (
        <p className="text-white/70">Sin certificados por el momento.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 gap-4">
          {items.map((c, i) => (
            <li key={i} className="card">
              <p className="text-lg font-medium">{c.nombre}</p>
              <p className="text-white/80">{c.entidad}</p>
              {c.anio && <p className="text-white/60">{c.anio}</p>}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
