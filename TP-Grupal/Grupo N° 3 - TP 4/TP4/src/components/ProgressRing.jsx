// src/components/ui/ProgressRing.jsx
import React, { useEffect, useState } from "react";

export default function ProgressRing({ daysLeft, totalDays = 7, size = 160 }) {
  const [current, setCurrent] = useState(0);

  // Calcular porcentaje
  const value = Math.max(0, Math.min(100, (daysLeft / totalDays) * 100));

  // animación suave
  useEffect(() => {
    let raf;
    let start;
    const dur = 900;
    const tick = (t) => {
      if (!start) start = t;
      const p = Math.min(1, (t - start) / dur);
      setCurrent(Math.round(value * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const angle = current * 3.6; // 100% -> 360deg

  // Color dinámico: si falta 1 día → rojo
  const ringColor = daysLeft <= 1 ? "#e74c3c" : "#007bff";

  return (
    <div
      className="ring d-flex flex-column align-items-center justify-content-center"
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        border: `8px solid ${ringColor}`,
        position: "relative",
        background: `conic-gradient(${ringColor} ${angle}deg, #e0e0e0 ${angle}deg)`,
        color: daysLeft <= 1 ? "#e74c3c" : "#007bff",
        transition: "0.4s",
      }}
    >
      <span className="fw-bold fs-4">{daysLeft}d</span>
      <small className="text-muted">restantes</small>
    </div>
  );
}
