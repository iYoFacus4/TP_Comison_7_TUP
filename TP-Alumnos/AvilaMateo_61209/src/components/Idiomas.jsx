export default function Idiomas() {
  const idiomas = [
    { nombre: "Español", nivel: "Nativo" },
    { nombre: "Inglés", nivel: "Intermedio" },
  ];

  return (
    <section className="section container-soft" id="idiomas">
      <h2 className="title">Idiomas</h2>
      <div className="idiomas-container">
        {idiomas.map((idioma, index) => (
          <div key={index} className="idioma-pill">
            <span className="idioma-nombre">{idioma.nombre}</span>
            <span className="idioma-nivel">{idioma.nivel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
