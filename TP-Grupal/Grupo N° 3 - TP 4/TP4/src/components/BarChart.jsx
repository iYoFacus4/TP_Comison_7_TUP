import React, { useEffect, useState } from "react";

/** Gráfico de barras sin librerías, con animación */
export default function BarChart({ values = [], labels = [] }){
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, [values]);

  const max = Math.max(1, ...values);
  return (
    <div className="bar-chart">
      {values.map((v, i) => {
        const h = Math.round((v / max) * 100);
        return (
          <div className="bar-col" key={i}>
            <div className={`bar ${ready ? "fill" : ""}`} style={{ "--h": `${h}%` }}/>
            <div className="bar-label">{labels[i] ?? ""}</div>
          </div>
        );
      })}
    </div>
  );
}
