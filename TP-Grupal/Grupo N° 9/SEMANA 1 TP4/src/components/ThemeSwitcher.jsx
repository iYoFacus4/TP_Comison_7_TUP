import React, { useEffect, useState } from "react";

const THEMES = {
  light: "light",
  dark: "dark",
  navy: "navy"
};

const KEY = "app_theme";

export default function ThemeSwitcher(){
  const [theme, setTheme] = useState(localStorage.getItem(KEY) || THEMES.light);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(KEY, theme);
  }, [theme]);

  return (
    <div className="theme-switcher">
      <button
        className={`chip ${theme===THEMES.light?"active":""}`}
        onClick={()=>setTheme(THEMES.light)}
        title="Claro"
      >Claro</button>
      <button
        className={`chip ${theme===THEMES.dark?"active":""}`}
        onClick={()=>setTheme(THEMES.dark)}
        title="Oscuro"
      >Oscuro</button>
      <button
        className={`chip ${theme===THEMES.navy?"active":""}`}
        onClick={()=>setTheme(THEMES.navy)}
        title="Azul suave"
      >Azul</button>
    </div>
  );
}
