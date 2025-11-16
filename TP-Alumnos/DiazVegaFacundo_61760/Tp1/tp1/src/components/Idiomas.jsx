import { idiomasData } from "../data/data";

const Idiomas = () => {
  return (
    <section id="idiomas" className="section-padding">
      <h2 className="section-title">Idiomas</h2>
      <div className="card-list">
        {idiomasData.map((idioma) => (
          <div key={idioma.id} className="card">
            <h3>{idioma.idioma}</h3>
            <p>Nivel: {idioma.nivel}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Idiomas;