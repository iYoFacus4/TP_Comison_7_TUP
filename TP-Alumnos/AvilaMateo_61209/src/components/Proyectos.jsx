export default function Proyectos({ items = [] }) {
  return (
    <>
      <h2 className="title">Proyectos Realizados</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((p, i) => (
          <article key={i} className="card">
            <h3 className="text-xl font-semibold">{p.nombre}</h3>
            <p className="text-white/80 mt-2">{p.descripcion}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.tecnologias?.map((t, j) => (
                <span key={j} className="pill">{t}</span>
              ))}
            </div>
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer" className="link mt-3 inline-block">
                Ver repositorio
              </a>
            )}
          </article>
        ))}
      </div>
    </>
  );
}
