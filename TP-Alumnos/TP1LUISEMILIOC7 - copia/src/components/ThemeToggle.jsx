import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const t = saved || (prefersDark ? 'dark' : 'light')
    setTheme(t)
    document.documentElement.setAttribute('data-theme', t)
  }, [])

  const toggle = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
  }

  return (
    <div className="theme-toggle">
      <button aria-label="Cambiar tema" onClick={toggle}>
        {theme === 'light' ? '🌙 Modo oscuro' : '☀️ Modo claro'}
      </button>
    </div>
  )
}

export default ThemeToggle
