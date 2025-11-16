export default function Proyectos() {
  return (
    <section id="proyectos" className="section">
      <h2>Proyectos</h2>
      <div className="grid">
        <article className="card">
          <h3>Q’ Ricos (Panadería)</h3>
          <p>Sistema de gestión de panadería.</p>
          <p className="stack">React · Node · MySQL</p>
          <a className="btn-link" href="#" target="_blank" rel="noreferrer">Ver más</a>
        </article>

        <article className="card">
          <h3>Innovatec</h3>
          <p>E-commerce de celulares.</p>
          <p className="stack">html · css · sass</p>
          <a className="btn-link" href="https://innovatec-ibanez.netlify.app/" target="_blank" rel="noopener noreferrer">Ver más</a>
        </article>
      </div>
    </section>
  );
}
