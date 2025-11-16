export default function Experiencia({ items = [] }) {
  return (
    <>
      <h2 className="title">Experiencia Laboral</h2>
      <ul className="space-y-4">
        {items.map((exp, i) => (
          <li key={i} className="card">
            <p className="text-lg font-medium">
              {exp.puesto} — <span className="text-white/80">{exp.empresa}</span>
            </p>
            <p className="text-white/60">{exp.periodo}</p>
            {exp.tareas && (
              <ul className="list-disc pl-5 mt-2 text-white/80">
                {exp.tareas.map((t, j) => <li key={j}>{t}</li>)}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
