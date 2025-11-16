import React, { useEffect, useState } from "react";
import efset from "../assets/Certificaciones/efset.png";
import mkt from "../assets/Certificaciones/marketing-digital.png";
import rolling from "../assets/Certificaciones/rolling.png";
import scrum from "../assets/Certificaciones/scrum.jpeg";
import kanban from "../assets/Certificaciones/kanban.jpeg";
import "../styles/Certificados/certificados.css";
export const Certificados = () => {
  const certificados = [
    {
      nombre: "EF SET Certificate 2023",
      descripcion: "Nivel C1 en inglés",
      imagen: efset,
    },
    {
      nombre: "Aleph Marketing Digital",
      descripcion: "Certificación en Marketing Digital",
      imagen: mkt,
    },
    {
      nombre: "Rolling Code School",
      descripcion: "Certificación en Desarrollo Web Full Stack",
      imagen: rolling,
    },
    {
      nombre: "Scrum Avanzado",
      descripcion: "Certificación en fundamentos de Scrum",
      imagen: scrum,
    },
    {
      nombre: "Kanban",
      descripcion: "Certificación en fundamentos de Kanban",
      imagen: kanban,
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % certificados.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [certificados.length, isAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? certificados.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % certificados.length);
  };
  const handleDotClick = (index) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <>
      <section className="certificados-wrapper" id="certificados">
        <div className="section-cert-header">
          <h2 className="certificados-title">Certificaciones</h2>
          <p className="section-subtitle">Mis certificaciones</p>
        </div>
        <div className="certificados-section">
          <div className="certificados-info">
            <div className="certificado-header">
              <span className="certificado-numero">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(certificados.length).padStart(2, "0")}
              </span>
              <span className="certificado-tipo">Certificación</span>
            </div>
            <h3 className="titulo-certificado">
              {certificados[currentIndex].nombre}
            </h3>
            <p className="descripcion-certificado">
              {certificados[currentIndex].descripcion}
            </p>
            <div className="certificado-image-container">
              <img
                className="imagen-certificado"
                src={certificados[currentIndex].imagen}
                alt={certificados[currentIndex].nombre}
              ></img>
            </div>
          </div>
        </div>
        <div className="certificados-controls">
          <button className="control-btn prev-btn" onClick={handlePrev}>
            ← Anterior
          </button>
          <div className="pagination-dots">
            {certificados.map((certificado, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Ir a certificación ${index + 1}`}
              ></button>
            ))}
          </div>
          <button className="control-btn next-btn" onClick={handleNext}>
            Siguiente →
          </button>
        </div>
      </section>
    </>
  );
};
