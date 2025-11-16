import React, { useEffect } from 'react'
import Home from './pages/Home'
import ThemeToggle from './components/ThemeToggle'

const App = () => {
  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = saved || (prefersDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', theme)
  }, [])

  return (
    <>
      <ThemeToggle />
      <Home />
    </>
  )
}

export default App
