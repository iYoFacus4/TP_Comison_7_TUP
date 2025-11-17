import React, { useEffect, useState } from 'react'

const Idiomas = ({ data, animate=false }) => {
  const percentFrom10 = (n)=> Math.max(0, Math.min(10, n)) * 10
  const targets = data.map(d => percentFrom10(d.nivel10))
  const [vals, setVals] = useState(animate ? targets.map(()=>0) : targets)

  useEffect(() => {
    if (!animate) return
    setVals(targets.map(()=>0))
    const t = setTimeout(() => setVals(targets), 60)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animate, data.length])

  return (
    <div className="lang-list">
      {data.map((d, i) => (
        <div key={d.idioma} className="lang-row">
          <div className="lang-label">
            <span>{d.idioma}</span>
            <span>{d.nivel10}/10</span>
          </div>
          <div className="progress-track" role="progressbar"
               aria-valuemin={0} aria-valuemax={100} aria-valuenow={vals[i]}>
            <div className="progress-fill"
                 style={{ width: `${vals[i]}%`, backgroundColor: d.color }} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Idiomas
