import { certificadosData } from "../data/data";

const Certificados = () => {
  return (
    <section id="certificados" className="section-padding">
      <h2 className="section-title">Certificados</h2>
      <div className="card-list">
        {certificadosData.map((cert) => (
          <div key={cert.id} className="card">
            <h3>{cert.nombre}</h3>
            <p>Emitido por: {cert.emisor}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificados;