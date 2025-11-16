import React from 'react'

const Certificados = () => {
  return (
    <section id="certificates">
      <h2>Certificados</h2>
      <div className="certificates-list">
        <article className="certificate-item">
          <h3>Nombre del certificado</h3>
          <p className="issuer">Entidad emisora</p>
          <p className="date">Fecha de obtención</p>
        </article>
      </div>
    </section>
  )
}

export default Certificados
