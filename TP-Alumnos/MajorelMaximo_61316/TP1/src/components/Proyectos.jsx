import React, { useState, useEffect } from "react";
import "../styles/Proyectos/proyectos.css";
import indatabiz from "../assets/Proyectos/indatabiz.png";
import openit from "../assets/Proyectos/openit.png";
import zontes from "../assets/Proyectos/zontes.jpg";
import erma from "../assets/Proyectos/comercialerma.jpg";
import cmdweb from "../assets/Proyectos/cmd.png";
import cmdsys from "../assets/Proyectos/cmd-sistema.png";
import radix from "../assets/Proyectos/radix.png";
export const Proyectos = () => {
  const proyectosRealizados = [
    {
      nombre: "InDataBiz",
      rol: "Dev & Product Manager",
      descripcion:
        "Desarrollo integral de la web coorporativa de InDataBiz, empresa especializada en ciencia de datos",
      imagen: indatabiz,
    },
    {
      nombre: "OpenIT",
      rol: "Dev & Product Manager",
      descripcion:
        "Auditoría y sanitización de vulnerabilidades de seguridad del sitio corporativo de la empresa OpenIT, empresa especializada en infraestructura IT ",
      imagen: openit,
    },
    {
      nombre: "Zontes Barcelona",
      rol: "Dev & Product Manager",
      descripcion:
        "Desarrollo integral del sitio web para concesionaria oficial de marca Zontes, en Barcelona, España",
      imagen: zontes,
    },
    {
      nombre: "Comercial Erma",
      rol: "Product Manager",
      descripcion:
        "Gestión del equipo de desarrolladores durante el desarrollo del sitio corporativo para la empresa Comercial Erma, especializada en distribución de Azucar nacional e internacional",
      imagen: erma,
    },
    {
      nombre: "Centro Dermatologico Tucumán - Web",
      rol: "Dev & Product Manager",
      descripcion:
        "Desarrollo integral del sitio web para Centro Dermatologico Tucumán.",
      imagen: cmdweb,
    },
    {
      nombre: "Centro Dermatologico Tucumán - Sistema",
      rol: "Backend dev & Product Manager",
      descripcion:
        "Sistema en desarrollo para gestión de movimientos dentro del Centro Medico, con trazabilidad de las transacciones",
      imagen: cmdsys,
    },
    {
      nombre: "Radix Web",
      rol: "Founder",
      descripcion:
        "Radix es mi empresa de desarrollo fundada con colegas con orientación al desarrollo de soluciones digitales y publicidad para PyMES",
      imagen: radix,
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % proyectosRealizados.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [proyectosRealizados.length, isAutoPlay]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? proyectosRealizados.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % proyectosRealizados.length
    );
  };

  const handleDotClick = (index) => {
    setIsAutoPlay(false);
    setCurrentIndex(index);
  };

  return (
    <>
      <section className="proyectos-wrapper" id="proyectos">
        <div className="section-header">
          <h2 className="proyectos-title">Proyectos Destacados</h2>
          <p className="section-subtitle">Portfolio de mis proyectos</p>
        </div>
        <div className="proyectos-section">
          <div className="proyectos-info">
            <div className="proyecto-header">
              <span className="proyecto-numero">
                {String(currentIndex + 1).padStart(2, "0")} /{" "}
                {String(proyectosRealizados.length).padStart(2, "0")}
              </span>
              <span className="proyecto-tipo">Proyecto Web</span>
            </div>
            <h3 className="titulo-proyecto">
              {proyectosRealizados[currentIndex].nombre}
            </h3>
            <div className="proyecto-rol">
              <span className="rol-label">Rol:</span>
              <span className="rol-value">
                {proyectosRealizados[currentIndex].rol}
              </span>
            </div>
            <p className="descripcion-proyecto">
              {proyectosRealizados[currentIndex].descripcion}
            </p>
          </div>
          <div className="proyectos-info image-container">
            <div className="image-wrapper">
              <img
                className="imagen-proyecto"
                src={proyectosRealizados[currentIndex].imagen}
                alt={proyectosRealizados[currentIndex].nombre}
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
        <div className="proyectos-controls">
          <button className="control-btn prev-btn" onClick={handlePrev}>
            ← Anterior
          </button>
          <div className="pagination-dots">
            {proyectosRealizados.map((proyecto, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Ir al proyecto ${index + 1}`}
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
