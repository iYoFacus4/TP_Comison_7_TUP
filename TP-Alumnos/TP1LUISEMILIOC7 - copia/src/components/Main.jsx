import React from 'react'
import CircleNav from './CircleNav'
import Estudios from './Estudios'
import Proyectos from './Proyectos'
import { estudios, proyectos } from '../data/data'

const Main = () => {
  return (
    <main>
      <CircleNav />

      <section id="estudios" className="section">
        <h2>Estudios</h2>
        <p className="sub">Formación académica y certificados.</p>
        <Estudios data={estudios} />
      </section>

      <section id="proyectos" className="section">
        <h2>Proyectos</h2>
        <p className="sub">Trabajos y demos destacados.</p>
        <Proyectos data={proyectos} />
      </section>
    </main>
  )
}

export default Main
