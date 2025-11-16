// Contact.jsx
// Formulario simple con mailto y WhatsApp. 100% responsive, usa clases globales.

import { useState } from "react";

export default function Contact() {
  // Estado local del formulario (nombre, email, mensaje)
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });

  // Handler de cambios de inputs
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Armado del mailto con encode (abre cliente de correo del usuario)
  const mailto = `mailto:luisagustincorreanunez@alu.frt.utn.edu.ar?subject=Contacto%20desde%20Portfolio&body=${encodeURIComponent(
    `Nombre: ${form.nombre}\nEmail: ${form.email}\n\n${form.mensaje}`
  )}`;

  return (
    <section id="contacto" className="section">
      <h2 className="title">Contacto</h2>

      {/* Grid simple que stackea en mobile */}
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <input
          className="input"
          name="nombre"
          placeholder="Tu nombre"
          value={form.nombre}
          onChange={onChange}
          required
        />

        <input
          className="input"
          name="email"
          type="email"
          placeholder="tu@mail.com"
          value={form.email}
          onChange={onChange}
          required
        />

        <textarea
          className="textarea"
          name="mensaje"
          placeholder="Contame tu idea…"
          value={form.mensaje}
          onChange={onChange}
          required
        />

        {/* Acciones: Email y WhatsApp */}
        <div className="actions" style={{ marginTop: 8 }}>
          <a className="btn primary" href={mailto}>Enviar por Email</a>
          <a className="btn" href="https://wa.me/message/K6GGA457NSIRB1" target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </form>
    </section>
  );
}
