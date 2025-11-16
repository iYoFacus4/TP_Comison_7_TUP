export default function Estudios({ titulo }) {
  const estudios = [
    { id: 1, nombre: "Escuela Justiniano Frías", institucion: "2009", anio: "2015" },
    { id: 2, nombre: "Técnico en Equipos e Instalaciones Electromecánicas", institucion: "Escuela Técnica N°5", anio: "2016-2022" },
    { id: 3, nombre: "Tecnicatura Universitaria en Programación", institucion: "Universidad Tecnológica Nacional- Facultad Regional Tucumán", anio: "2024-Actualmente ,75% de carrera realizada" }
  ];

  return (
    <section id="estudios" className="section" data-aos="zoom-in">
      <h2>{titulo}</h2>
      <ul className="lista-formacion">
        {estudios.map((e) => (
          <li key={e.id} className="card">
            <h3>{e.nombre}</h3>
            <p>{e.institucion} — <span>{e.anio}</span></p>
          </li>
        ))}
      </ul>
    </section>
  );
}
