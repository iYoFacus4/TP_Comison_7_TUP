// Skills.jsx
// Grid responsive con íconos (React Icons). Auto-fill para saltar 1→2→3+ columnas.
// Sin estilos inline: usa .grid-auto + .card + .skill.

import { FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt, FaJs } from "react-icons/fa";

const skills = [
  { icon: <FaReact size={22} />,    title: "React / Vite",      level: "Intermedio" },
  { icon: <FaNodeJs size={22} />,   title: "Node.js / Express", level: "Intermedio" },
  { icon: <FaDatabase size={22} />, title: "MySQL / SQL",       level: "Intermedio" },
  { icon: <FaHtml5 size={22} />,    title: "HTML5",             level: "Avanzado" },
  { icon: <FaCss3Alt size={22} />,  title: "CSS / Tailwind",    level: "Intermedio" },
  { icon: <FaJs size={22} />,       title: "JavaScript",        level: "Intermedio" },
];

export default function Skills() {
  return (
    <section id="habilidades" className="section">
      <h2 className="title">Habilidades</h2>

      {/* Grid responsive: se ajusta solo con minmax(220px, 1fr) */}
      <div className="grid-auto">
        {skills.map((s) => (
          <div className="card skill" key={s.title}>
            {/* Ícono */}
            {s.icon}
            {/* Texto: título + nivel en gris */}
            <div>
              <strong>{s.title}</strong>
              <small className="muted" style={{ display: "block" }}>{s.level}</small>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
