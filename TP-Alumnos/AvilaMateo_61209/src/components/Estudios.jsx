export default function Estudios({ items = [] }) {
  return (
    <>
      <h2 className="title">Estudios</h2>
      <ul className="grid md:grid-cols-2 gap-4">
        {items.map((e, idx) => (
          <li key={idx} className="card">
            <p className="text-lg font-medium">{e.titulo}</p>
            <p className="text-white/80">{e.institucion}</p>
            <p className="text-white/60">{e.estado}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
