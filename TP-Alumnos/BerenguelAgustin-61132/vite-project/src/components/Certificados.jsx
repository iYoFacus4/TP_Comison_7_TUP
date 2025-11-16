import React, { useState } from 'react';
import '../Style/Certificados.css';

const slidesData = [
  {
    imagenUrl: "#", 
    descripcion: "Certificado 1",
    repoUrl: "#" 
  },
  {
    imagenUrl: "#",
    descripcion: "Certificado 2",
    repoUrl: "#"
  },
];

const CarruselCertificados = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slidesData.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slidesData.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <section id="Certificados">
    <div className="carrusel-container">
      <button onClick={goToPrevious} className="carrusel-button prev">‹</button>
      
      <div className="carrusel-viewport">
        <div 
          className="carrusel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slidesData.map((slide, index) => (
            <div className="carrusel-slide" key={index}>
              {/* El enlace envuelve la imagen */}
              <a href={slide.repoUrl} target="_blank" rel="noopener noreferrer" className="proyecto-enlace">
                <img src={slide.imagenUrl} alt={`Imagen del proyecto ${index + 1}`} className="proyecto-imagen" />
              </a>
              <p className="proyecto-descripcion">{slide.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
      
      <button onClick={goToNext} className="carrusel-button next">›</button>
    </div>
    </section>
  );
};

export default CarruselCertificados;