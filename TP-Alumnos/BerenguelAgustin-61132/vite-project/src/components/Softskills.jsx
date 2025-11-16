import React from "react";
import '../Style/Softskills.css';

import { FaReact, FaHtml5, FaCss3Alt, FaGitAlt } from 'react-icons/fa'; // <-- 1. Agregamos FaGitAlt
import { DiDotnet, DiMongodb, DiMysql } from 'react-icons/di';
import { TbBrandCSharp, TbBrandJavascript } from "react-icons/tb"; // <-- 2. Agregamos TbBrandJavascript

const Softskills = () => {
  const hardSkills = [
    { name: 'C#', icon: <TbBrandCSharp /> },
    { name: '.NET', icon: <DiDotnet /> },
    { name: 'React', icon: <FaReact /> },
    { name: 'MySQL', icon: <DiMysql /> },
    { name: 'Mongo DB', icon: <DiMongodb /> },
    { name: 'CSS', icon: <FaCss3Alt /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'JavaScript', icon: <TbBrandJavascript /> }, // <-- 3. Añadimos JavaScript
    { name: 'Git', icon: <FaGitAlt /> },               // <-- 4. Añadimos Git
  ];

  return (
    <div className="skills-container">
      <section id="softskills">
      <h2 className="skills-title">Mis Habilidades Técnicas</h2>
      <div className="skills-grid">
        {hardSkills.map((skill, index) => (
          <div className="skill-item" key={index}>
            <div className="skill-icon">{skill.icon}</div>
            <h3 className="skill-name">{skill.name}</h3>
          </div>
        ))}
      </div>
      </section>
    </div>
  );
};

export default Softskills;