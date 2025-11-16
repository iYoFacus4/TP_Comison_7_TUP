import React from 'react';
import '../styles/Estudios.css';

export default function Estudios() {
  return (
    <section id="estudios" className="estudios-section">
      <h2 className="estudios-title">Estudios</h2>
      <div className="estudios-card">
        <h3 className="estudios-degree">Tecnicatura Universitaria en Programación</h3>
        <p className="estudios-university">Universidad Tecnologica Nacional</p>
        <p className="estudios-period">2024-2026</p>
      </div>

      <div className="estudios-card">
        <h3 className="estudios-degree">Desarrollador Full-Stack</h3>
        <p className="estudios-university">Rolling Code School</p>
        <p className="estudios-period">2022-2023</p>
      </div>

    </section>
  );
}
