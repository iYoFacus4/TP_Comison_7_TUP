import ess from "../src/assets/ess.png";
import es from "../src/assets/es.png";


export default function Idiomas({ titulo }) {
  const idiomas = [
    { nombre: "Español", nivel: "Nativo", img: ess},
    { nombre: "Inglés", nivel: "Básico" ,img: es},
  ];

  return (
    <section id="idiomas" className="section" data-aos="zoom-in">
      <h2>{titulo}</h2>
      <ul className="lista-formacion">
        {idiomas.map((i, idx) => (
          <li key={idx} className="card">
            <img src={i.img} alt={i.nombre} className="icono-idioma" />
            <h3>{i.nombre}</h3>
            <p>{i.nivel}</p>
            
          </li>
        ))}
      </ul>
    </section>
  );
}
