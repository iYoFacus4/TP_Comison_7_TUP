import React from 'react'

const Estudios = ({ data }) => {
  return (
    <div className="list">
      {data.map((e, i) => (
        <div key={i} className="item">
          <strong>{e.institucion}</strong> — {e.titulo} <br/>
          <small>{e.periodo}</small>
          {e.detalles?.length ? (
            <ul>
              {e.detalles.map((d, idx) => <li key={idx}>{d}</li>)}
            </ul>
          ) : null}
          {e.certificados?.length ? (
            <div style={{marginTop:8, display:'flex', gap:8, flexWrap:'wrap'}}>
              {e.certificados.map((c, idx) => (
                <span key={idx} style={{
                  border:'1px solid var(--ring)', padding:'4px 8px',
                  borderRadius:999, fontSize:12, background:'rgba(0,0,0,.04)'
                }}>{c}</span>
              ))}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default Estudios
