import js from "../src/assets/js.png";
import csharp from "../src/assets/csharp.png";
import html from "../src/assets/html.png";
import css from "../src/assets/css.png";
import sql from "../src/assets/sql.png";

export default function Lenguajes() {
  const lenguajes = [
    { id: 1, nombre: "JavaScript", nivel: "Básico", img: js },
    { id: 2, nombre: "C#", nivel: "Intermedio", img: csharp },
    { id: 3, nombre: "HTML", nivel: "Básico", img: html },
    { id: 4, nombre: "CSS", nivel: "Básico", img: css },
    { id: 5, nombre: "SQL", nivel: "Intermedio", img: sql },
  ];

  return (
    <section id="lenguajes" className="section" data-aos="zoom-in">
      <h2>Lenguajes</h2>
      <ul className="lista-formacion">
        {lenguajes.map((l) => (
          <li key={l.id} className="card">
            <img src={l.img} alt={l.nombre} className="icono-lenguaje" />
            <h3>{l.nombre}</h3>
            <p>{l.nivel}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
