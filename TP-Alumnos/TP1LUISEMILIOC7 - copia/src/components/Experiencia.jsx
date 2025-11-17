import React from 'react'

const Experiencia = ({ data }) => {
  return (
    <div className="list">
      {data.map((e, i) => (
        <div key={i} className="item">
          <strong>{e.rol}</strong> — {e.empresa} <br/>
          <small>{e.periodo}</small>
          {e.logros?.length ? (
            <ul>
              {e.logros.map((l, idx) => <li key={idx}>{l}</li>)}
            </ul>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default Experiencia
