import adashop from "../src/assets/adashoppp.mp4";
import tienda from "../src/assets/tiendadeportess.mp4";


export default function Proyectos({ titulo }) {
  const proyectos = [
    {
      id: 1,
      nombre: "ADA Shop",
      descripcion: "E-commerce con Node.js, Express y React.",
      video: adashop,
    },
    {
      id: 2,
      nombre: "Tienda Deportes",
      descripcion: "Sistema de ventas online con React y base de datos local.",
      video: tienda,
    },
  ];

  return (
    <section id="proyectos" className="section" data-aos="zoom-in">
      <h2>{titulo || "Proyectos Realizados"}</h2>
      <ul className="lista-formacion">
        {proyectos.map((p) => (
          <li key={p.id} className="card">
            <video autoPlay muted loop playsInline className="video-container">
              <source src={p.video} type="video/mp4" />
            </video>

            <h3>{p.nombre}</h3>
            <p>{p.descripcion}</p>

          </li>
        ))}
      </ul>
    </section>
  );
}
