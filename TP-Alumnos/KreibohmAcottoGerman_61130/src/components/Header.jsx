import React, { useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false)

  const toggle = () => setOpen((v) => !v)
  const close = () => setOpen(false)

  return (
    <header className="flex justify-center align-items-center z-10 mt-4">
      <nav className="container p-4 rounded-full border border-white/10 bg-neutral-900/40 backdrop-blur-xl shadow-2xl relative">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="logo.png" alt="Logo" className="h-16 w-16 object-cover object-center rounded-full" />
          </div>

          {/* Desktop links */}
          <div className="nav-links hidden md:flex gap-8">
            <a href="#home" className="nav-link text-white/90 hover:text-white transition-colors">
              Inicio
            </a>
            <a href="#experiencia" className="nav-link text-white/90 hover:text-white transition-colors">
              Experiencia
            </a>
            <a href="#proyectos" className="nav-link text-white/90 hover:text-white transition-colors">
              Proyectos
            </a>
            <a href="#idiomas" className="nav-link text-white/90 hover:text-white transition-colors">
              Idiomas
            </a>
            <a href="#softskills" className="nav-link text-white/90 hover:text-white transition-colors">
              Skills
            </a>
          </div>

          {/* Hamburger button (mobile) */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors w-10 h-10 text-white"
            aria-label="Abrir menú"
            aria-controls="mobile-menu"
            aria-expanded={open}
            onClick={toggle}
          >
            {/* Icon */}
            <svg className={`w-5 h-5 transition-transform ${open ? 'scale-0' : 'scale-100'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <svg className={`w-5 h-5 absolute transition-transform ${open ? 'scale-100' : 'scale-0'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile dropdown panel */}
        {open && (
          <div id="mobile-menu" className="md:hidden absolute left-0 right-0 mt-6 px-2">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex flex-col py-2">
                <a onClick={close} href="#home" className="px-4 py-3 text-white/90 hover:bg-white/10 transition-colors">Inicio</a>
                <a onClick={close} href="#experiencia" className="px-4 py-3 text-white/90 hover:bg-white/10 transition-colors">Experiencia</a>
                <a onClick={close} href="#proyectos" className="px-4 py-3 text-white/90 hover:bg-white/10 transition-colors">Proyectos</a>
                <a onClick={close} href="#idiomas" className="px-4 py-3 text-white/90 hover:bg-white/10 transition-colors">Idiomas</a>
                <a onClick={close} href="#softskills" className="px-4 py-3 text-white/90 hover:bg-white/10 transition-colors">Skills</a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
