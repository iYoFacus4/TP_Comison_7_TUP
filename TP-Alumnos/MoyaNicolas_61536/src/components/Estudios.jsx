import '../styles/Estudios.css';

function Estudios({ data }) {
  return (
    <div className="estudios-container">
      <h2 className="section-title">Formación Académica</h2>
      <div className="estudios-grid">
        {/* map recorre el arreglo y crea una tarjeta por cada estudio */}
        {data.map((estudio) => (
          <div key={estudio.id} className="estudio-card">
            <h3>{estudio.titulo}</h3>
            <p className="institucion">{estudio.institucion}</p>
            <p className="anio">{estudio.anio}</p>
            {estudio.descripcion && <p className="descripcion">{estudio.descripcion}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Estudios;
