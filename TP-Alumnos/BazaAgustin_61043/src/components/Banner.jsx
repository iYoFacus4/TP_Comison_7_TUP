import React from "react";
import "../styles/Banner.css";
import Foto from "../assets/MiFoto.jpg";

export default function Banner() {
  return (
    <section className="banner-section">
      <div className="banner-avatar-wrapper">
        <div className="banner-avatar">
          <img src={Foto} alt="Agustin Baza" />
        </div>
      </div>
      <h1 className="banner-name">Agustin Baza</h1>
      <p className="banner-subtitle">Desarrollador Full-Stack</p>
      <p className="banner-description">
        Soy un desarrollador enfocado en crear soluciones funcionales e interfaces claras, siempre buscando mejorar mis habilidades técnicas.
      </p>
    </section>
  );
}
