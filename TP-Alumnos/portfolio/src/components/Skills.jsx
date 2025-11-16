import React from 'react';
import './styles/Skills.css';
import { 
  FaReact, 
  FaNodeJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaJs 
} from 'react-icons/fa';
import { 
  SiCsharp, 
  SiDotnet 
} from 'react-icons/si';

const Skills = () => {
  const skills = [
    { name: 'C#', icon: <SiCsharp />, color: '#239120', level: 85 },
    { name: '.NET', icon: <SiDotnet />, color: '#512BD4', level: 80 },
    { name: 'React', icon: <FaReact />, color: '#61DAFB', level: 85 },
    { name: 'Node.js', icon: <FaNodeJs />, color: '#339933', level: 75 },
    { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E', level: 90 },
    { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26', level: 95 },
    { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6', level: 90 },
  ];

  return (
    <section id="habilidades" className="skills">
      <div className="container">
        <h2 className="section-title">Habilidades Técnicas</h2>
        <p className="section-subtitle">
          Tecnologías y herramientas que domino
        </p>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-icon" style={{ color: skill.color }}>
                {skill.icon}
              </div>
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-bar">
                <div 
                  className="skill-progress" 
                  style={{ 
                    width: `${skill.level}%`,
                    backgroundColor: skill.color 
                  }}
                ></div>
              </div>
              <span className="skill-level">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
