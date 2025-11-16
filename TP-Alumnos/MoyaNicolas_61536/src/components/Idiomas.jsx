import '../styles/Idiomas.css';

function Idiomas({ data }) {
  return (
    <div className="idiomas-container">
      <h2 className="section-title">Idiomas</h2>
      <div className="idiomas-grid">
        {data.map((idioma) => (
          <div key={idioma.id} className="idioma-card">
            <h3>{idioma.nombre}</h3>
            <div className="nivel-container">
              {/* Barra que se rellena según el porcentaje del idioma */}
              <div className="nivel-bar">
                <div 
                  className="nivel-fill" 
                  style={{ width: `${idioma.nivel}%` }}
                ></div>
              </div>
              <span className="nivel-text">{idioma.nivelTexto}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Idiomas;
