import React from 'react'

const Idiomas = () => {
  return (
    <section id="idiomas" className='mx-auto container p-16 rounded-4xl backdrop-blur-3xl bg-neutral-100/5 shadow-2xl mb-16'>
          <h2 className='text-3xl font-bold mb-8'>Idiomas</h2>
          <div className="languages-list">
            <article className="language-item mb-4 p-4 scale-100 hover:scale-102 hover:shadow-2xl transition-transform flex gap-4">
              <h3>Español</h3>
              -
              <p className="level">Nativo</p>
            </article>
            <article className="language-item mb-4 p-4 scale-100 hover:scale-102 hover:shadow-2xl transition-transform flex gap-4">
              <h3>Inglés</h3>
              -
              <p className="level">Intermedio</p>
            </article>
          </div>
        </section>
  )
}

export default Idiomas
