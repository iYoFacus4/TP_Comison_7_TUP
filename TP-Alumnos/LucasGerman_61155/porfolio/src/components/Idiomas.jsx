import "../styles/Idiomas.css";

export default function Idiomas({ id }) {


    const idiomasData = [
    {
        id: 1,
        idioma: 'Español',
        nivel: 'Nativo',
    },
    {
        id: 2,
        idioma: 'Inglés',
        nivel: 'Avanzado (B2/C1)',
    },
    ];




  return (
    <section id={id} className="seccion-idiomas">
      <h2 className="h2-idiomas">Idiomas</h2>
      <div className="idiomas-div">
        {idiomasData.map((item) => (
          <div key={item.id} className="idioma-card">
            <span className="idioma-nombre">{item.idioma}</span>
            <span className="idioma-nivel">{item.nivel}</span>
          </div>
        ))}
      </div>
    </section>
  );
}