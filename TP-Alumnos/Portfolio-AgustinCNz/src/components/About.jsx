// About.jsx
// Sección “Sobre mí” minimalista, usa clases globales (sin estilos inline).
// Mobile-first: un bloque simple, texto legible y botón al CV.

export default function About() {
  return (
    <section id="sobre-mi" className="section">
      {/* Título consistente en todo el sitio */}
      <h2 className="title">Sobre mí</h2>

      {/* Párrafo de presentación (texto secundario con .muted) */}
      <p className="muted">
        Soy <strong>Luis Agustín Correa Núñez</strong> (Software Engineer Jr).
        Trabajo con C#, .NET, JavaScript, React, MySQL y Git/GitHub. Me enfoco en
        soluciones simples, funcionales y una UI prolija.
      </p>

      {/* Acción: descargar CV (archivo colocado en /public) */}
      <div style={{ marginTop: 20 }}>
        <a className="btn" href="/CV-AgustinCorreaNunez.pdf" target="_blank" rel="noreferrer">
          Descargar CV (PDF)
        </a>
      </div>
    </section>
  );
}
