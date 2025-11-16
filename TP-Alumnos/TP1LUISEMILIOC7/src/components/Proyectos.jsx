import React from 'react'

const Proyectos = ({ data }) => {
  return (
    <div className="list">
      {data.map((p, i) => (
        <div key={i} className="item">
          <strong>{p.titulo}</strong>
          <p style={{margin:'6px 0 8px'}}>{p.descripcion}</p>
          {p.stack?.length ? (
            <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
              {p.stack.map((t, idx) => (
                <span key={idx} style={{
                  border:'1px solid var(--ring)', padding:'4px 8px',
                  borderRadius:999, fontSize:12, background:'rgba(0,0,0,.04)'
                }}>{t}</span>
              ))}
            </div>
          ) : null}
          {p.repo && p.repo !== '#' ? (
            <div style={{marginTop:6}}>
              <a href={p.repo} target="_blank" rel="noreferrer">Ver repositorio</a>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default Proyectos
