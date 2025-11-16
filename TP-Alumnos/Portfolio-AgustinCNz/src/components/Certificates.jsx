// Certificates.jsx
// Galería responsive con cards. Abre Modal al clickear las imágenes.
// Requiere las imágenes en /public/certificates/* (evita problemas de import).

import { useState, useCallback } from "react";
import Modal from "./Modal";

// Nota: asegurate que estos archivos existan en /public/certificates/
const items = [
  { src: "/certificates/agustin-global-learning-testing.png", title: "Testing — Global Learning (2023)" },
  { src: "/certificates/Global-learning-js-react-.png",      title: "JavaScript / React Avanzado — Global Learning (2023)" },
  { src: "/certificates/agustin-agenciai-hab-blandas.png",   title: "Habilidades Blandas — Agencia I (2021)" },
  { src: "/certificates/agustin-agenciai-programacion.png",  title: "Programación — Agencia I (2021)" },
  { src: "/certificates/aticana-agustincorrea-.png",         title: "Inglés 2º Acelerado — ATICANA (2025)" },
];

export default function Certificates() {
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(null);

  // Abre modal con la imagen seleccionada
  const openModal = useCallback((item) => {
    setImg(item);
    setOpen(true);
  }, []);

  // Cierra modal
  const closeModal = useCallback(() => {
    setOpen(false);
    setImg(null);
  }, []);

  return (
    <section id="certificados" className="section">
      <h2 className="title">Certificados</h2>

      {/* Grid auto con cards */}
      <div className="grid-auto">
        {items.map((it) => (
          <figure className="card" style={{ margin: 0 }} key={it.src}>
            {/* Imagen clickeable: abre modal */}
            <img
              className="cert-img"
              src={it.src}
              alt={it.title}
              loading="lazy"         // ahorro datos / mejora performance
              onClick={() => openModal(it)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && openModal(it)} // accesible con teclado
              tabIndex={0}           // foco accesible
              role="button"          // semántica accesible
              aria-label={`Abrir ${it.title}`}
            />
            <figcaption className="caption">{it.title}</figcaption>
          </figure>
        ))}
      </div>

      {/* Modal con la imagen en grande */}
      <Modal open={open} onClose={closeModal}>
        {img && <img src={img.src} alt={img.title} />}
        {img && <div className="caption" style={{ marginTop: 8 }}>{img.title}</div>}
      </Modal>
    </section>
  );
}
