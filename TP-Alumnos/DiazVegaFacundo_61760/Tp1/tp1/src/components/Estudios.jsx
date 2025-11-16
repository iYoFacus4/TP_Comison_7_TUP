import { estudiosData } from "../data/data";

const Estudios = () => {
  return (
    <section id="estudios" className="section-padding">
      <h2 className="section-title">Estudios Académicos</h2>
      <div className="card-list">
        {estudiosData.map((estudio) => (
          <div key={estudio.id} className="card">
            <h3>{estudio.titulo}</h3>
            <p>
              Institución: {estudio.institucion}
            </p>
            <p>
              Período: {estudio.periodo}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Estudios;