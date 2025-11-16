import React from 'react'

const Certificados = ({ items }) => {
  if (!items?.length) return <p className="sub">Sin certificados cargados.</p>
  return (
    <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
      {items.map((c, i) => (
        <span key={i} style={{
          border:'1px solid var(--ring)', padding:'4px 8px',
          borderRadius:999, fontSize:12, background:'rgba(0,0,0,.04)'
        }}>{c}</span>
      ))}
    </div>
  )
}

export default Certificados
