import React, { useState } from 'react'
import skillsData from '../data/skills.json'

const Skills = () => {
  // Obtener categorías únicas
  const categories = [...new Set(skillsData.map(skill => skill.category))]
  const [selectedCategory, setSelectedCategory] = useState('Todas')

  // Función para filtrar por categoría
  const filteredSkills = selectedCategory === 'Todas' 
    ? skillsData 
    : skillsData.filter(skill => skill.category === selectedCategory)

  return (
    <section id="skills" className='mx-auto container p-16 rounded-4xl backdrop-blur-3xl bg-neutral-100/5 shadow-2xl mb-16'>
      <h2 className='text-3xl font-bold mb-8'>Habilidades Técnicas</h2>
      
      {/* Botones de filtrado */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setSelectedCategory('Todas')}
          className={`px-4 py-2 rounded-lg transition-all ${
            selectedCategory === 'Todas'
              ? 'bg-neutral-950/40 text-white'
              : 'bg-white/10 hover:bg-white/20'
          }`}
        >
          Todas
        </button>
        {categories.map((category, index) => (
          <button
            key={`${category}-${index}`}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category
                ? 'bg-neutral-950/40 text-white'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Grid de skills */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredSkills.map((skill, idx) => (
          <div 
            key={`${skill.name}-${idx}`} 
            className="flex flex-col items-center justify-center p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-all hover:scale-105"
          >
            <img 
              src={skill.icon} 
              alt={skill.name} 
              className="w-12 h-12 mb-2"
              loading="lazy"
            />
            <span className="text-sm text-center">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Skills
