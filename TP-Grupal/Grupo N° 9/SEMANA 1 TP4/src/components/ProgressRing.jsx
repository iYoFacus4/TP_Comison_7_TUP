import React, { useEffect, useState } from "react";

export default function ProgressRing({ value = 45, size = 160 }){
  const [current, setCurrent] = useState(0);

  // animación simple desde 0 hasta value
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

  return (
    <div
      className="ring"
      style={{
        width: size, height: size,
        "--angle": `${angle}deg`
      }}
    >
      <span>{current}%</span>
    </div>
  );
}
