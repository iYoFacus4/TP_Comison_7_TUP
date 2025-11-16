import React from 'react'
import experienceData from '../data/experience'

const Experiencia = () => {
  return (
    <section id="experience" className='mx-auto container p-16 rounded-4xl backdrop-blur-3xl bg-neutral-100/5 shadow-2xl mb-16'>
      <h2 className='text-3xl font-bold mb-8'>Experiencia Laboral</h2>
      <div className="experience-list">
        {experienceData.map((item, index) => (
          <article className="experience-item mb-4 p-4 scale-100 hover:scale-102 hover:shadow-2xl transition-transform" key={index}>
            <h3>{item.role}</h3>
            <p className="company">{item.company}</p>
            <p className="period">{item.period}</p>
            <p className="description">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experiencia
