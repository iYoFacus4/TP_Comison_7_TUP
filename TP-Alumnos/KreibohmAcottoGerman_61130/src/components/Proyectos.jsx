import React, { useState } from 'react'

import projectsData from '../data/projects'

const Proyectos = () => {
  const [selectedProject, setSelectedProject] = useState(null)

  const openModal = (project) => {
    setSelectedProject(project)
  }

  const closeModal = () => {
    setSelectedProject(null)
  }

  return (
    <>
    <section id="proyectos" className='mx-auto container p-16 rounded-4xl backdrop-blur-3xl bg-neutral-100/5 shadow-2xl mb-16'>
          <h2 className='text-3xl font-bold mb-8'>Proyectos</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {projectsData.map((item, index) => (
              <article 
                className="project-item mb-4 p-4 scale-100 hover:scale-102 hover:shadow-2xl transition-transform flex flex-col justify-center align-middle cursor-pointer" 
                key={index}
                onClick={() => openModal(item)}
              >
                <h3 className='text-center text-2xl mb-4'>{item.title}</h3>
                <img src={item.image} alt={item.title} className='w-100 h-auto object-cover object-center mb-4' />
              </article>
            ))}
          </div>          
    </section>

    {/* Modal */}
          {selectedProject && (
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={closeModal}
            >
              <div 
                className="bg-neutral-900/80 backdrop-blur-xl rounded-3xl max-w-4xl w-full p-6 md:p-8 relative max-h-[90vh] overflow-y-auto border border-white/10 shadow-2xl ring-1 ring-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Botón cerrar */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-white/60 hover:text-white text-3xl font-bold w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-all"
                  aria-label="Cerrar modal"
                >
                  &times;
                </button>

                {/* Contenido del modal */}
                <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Imagen cuadrada */}
                  <div className="rounded-xl overflow-hidden border border-white/10 shadow-xl">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="w-full aspect-square object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Detalles */}
                  <div className="flex flex-col">
                    <h3 className="text-3xl font-bold mb-3">{selectedProject.title}</h3>
                    <p className="text-base md:text-lg mb-4 text-white/80 leading-relaxed">
                      {selectedProject.description}
                    </p>

                    {/* Chips de tecnologías */}
                    {Array.isArray(selectedProject.tech) && selectedProject.tech.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedProject.tech.map((t, i) => (
                          <span
                            key={`${t}-${i}`}
                            className="px-2.5 py-1 text-xs rounded-full bg-white/10 text-white/80 border border-white/10"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Acciones */}
                    <div className="mt-auto flex flex-wrap gap-3">
                      {selectedProject.url && (
                        <a
                          href={selectedProject.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all font-semibold shadow-lg shadow-blue-500/20"
                        >
                          Ver sitio web
                        </a>
                      )}
                      <button
                        onClick={closeModal}
                        className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all"
                      >
                        Cerrar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
    </>
  )
}

export default Proyectos
