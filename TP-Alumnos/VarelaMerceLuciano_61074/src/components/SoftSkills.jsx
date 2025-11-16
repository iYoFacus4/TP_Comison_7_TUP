import React from 'react';

function SoftSkills({ skills }) {
  
  return (
    <section id="soft-skills" className="seccion">
      <h2>Habilidades Blandas</h2>
      <ul className="skills-lista">
        
        {skills.map( (skill) => (
          
          <li key={skill.id} className="skill-item">
            {skill.nombre}
          </li>

        ))}

      </ul>
    </section>
  );
}

export default SoftSkills;