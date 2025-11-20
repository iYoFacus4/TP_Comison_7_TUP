import React from 'react'

const Footer = ({ github, linkedin }) => {
  return (
    <footer className="footer">
      <nav style={{display:'flex', gap:12, flexWrap:'wrap'}}>
        <a href="#estudios">Estudios</a>
        <a href="#proyectos">Proyectos</a>
      </nav>
      <div style={{display:'flex', gap:12}}>
        <a href={github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </div>
    </footer>
  )
}

export default Footer
