import '../styles/Certificados.css';

function Certificados({ data }) {
  return (
    <div className="certificados-container">
      <h2 className="section-title">Certificados</h2>
      <div className="certificados-grid">
        {data.map((cert) => (
          <div key={cert.id} className="certificado-card">
            <h3>{cert.nombre}</h3>
            <p className="cert-emisor">{cert.emisor}</p>
            <p className="cert-fecha">{cert.fecha}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Certificados;
