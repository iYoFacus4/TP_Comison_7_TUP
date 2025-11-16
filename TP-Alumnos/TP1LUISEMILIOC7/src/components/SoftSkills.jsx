import React from 'react'

const SoftSkills = ({ data }) => {
  return (
    <div className="list">
      {data.map((s, i) => (
        <div key={i} className="item">
          <strong>{s.nombre}</strong><br/>
          <small>{s.descripcion}</small>
        </div>
      ))}
    </div>
  )
}

export default SoftSkills
