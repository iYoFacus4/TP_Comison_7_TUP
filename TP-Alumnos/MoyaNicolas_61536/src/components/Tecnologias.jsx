import { FaHtml5, FaCss3Alt, FaJs } from 'react-icons/fa';
import '../styles/Tecnologias.css';

function Tecnologias() {
  // Arreglo con las tecnologías que conozco
  const tecnologias = [
    { id: 1, nombre: 'HTML', icono: <FaHtml5 /> },
    { id: 2, nombre: 'CSS', icono: <FaCss3Alt /> },
    { id: 3, nombre: 'JAVASCRIPT', icono: <FaJs /> },
  ];

  return (
    <div className="tecnologias-container">
      <h2 className="section-title">Tecnologías</h2>
      <div className="tecnologias-grid">
        {/* Recorro el arreglo y creo una tarjeta por cada tecnología */}
        {tecnologias.map((tech) => (
          <div key={tech.id} className="tech-card">
            <div className="tech-icon">{tech.icono}</div>
            <h3 className="tech-nombre">{tech.nombre}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tecnologias;
