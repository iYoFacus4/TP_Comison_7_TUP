export default function Proyectos() {
  const proyectos = [
    {
      nombre: "SmartLogistics (consola .NET)",
      descripcion: "Gestión de vehículos y envíos con persistencia JSON.",
      tags: ["C#", ".NET", "SOLID"],
    },
    {
      nombre: "Encuestas (WinForms + Web API)",
      descripcion: "Múltiples formularios conectados a endpoints JSON.",
      tags: ["C#", "WinForms", "API"],
    },
  ];

  return (
    <section id="proyectos" className="card">
      <h3>Proyectos Realizados</h3>
      <div className="grid">
        {proyectos.map((p, i) => (
          <article key={i} className="project">
            <h4>{p.nombre}</h4>
            <p>{p.descripcion}</p>

            <ul className="tags">
              {p.tags.map((t, j) => (
                <li key={j} className="tag">{t}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
