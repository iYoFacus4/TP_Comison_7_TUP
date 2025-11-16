import React from 'react';

const Footer = () => {
  return (
    <footer>
      <nav>
        {/* Enlaces a secciones internas */}
        <a href="#estudios">Estudios</a>
        <a href="#proyectos">Proyectos</a>
      </nav>
      <div>
        {/* Enlaces externos */}
        <a href="https://www.linkedin.com/in/franco-ruiz-83b463264/" target="_blank">LinkedIn</a>
        <a href="https://github.com/Rzfranco" target="_blank">GitHub</a>
      </div>
    </footer>
  );
};

export default Footer;