import React, { useState } from 'react';
import '../Style/Proyectos.css';
import carwashVideo from '../resources/carwash.mp4';
import software from '../resources/Software.mp4';

const slidesData = [
  {
    videoUrl: software, 
    descripcion: "Software de escritorio el cual gestiona ventas, empleados y demas complementos",
    repoUrl: "https://github.com/tu-usuario/proyecto-1"
  },
  {
    videoUrl: carwashVideo, 
    descripcion: "Pagina Informativa para un lavadero de autos. Click para ir al sitio.",
    repoUrl: "https://399carwash.netlify.app/"
  },
];

const CarruselProyectos = () => {
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
    <section id="mis-proyectos"> 
    <div className="carrusel-container">    
    <h1>Proyectos</h1>   
      <button onClick={goToPrevious} className="carrusel-button prev">‹</button>
      <div className="carrusel-viewport">
        <div 
          className="carrusel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slidesData.map((slide, index) => (
            <div className="carrusel-slide" key={index}>
              <a href={slide.repoUrl} target="_blank" rel="noopener noreferrer" className="proyecto-enlace">
                {}
                <video 
                  src={slide.videoUrl} 
                  className="proyecto-video"
                  autoPlay 
                  loop     
                  muted     
                  playsInline 
                >
                  Tu navegador no soporta el elemento de video.
                </video>
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

export default CarruselProyectos;