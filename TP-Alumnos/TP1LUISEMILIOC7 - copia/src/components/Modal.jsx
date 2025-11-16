import React, { useEffect, useRef } from 'react'

const Modal = ({ isOpen, title, onClose, children }) => {
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const focusables = dialogRef.current.querySelectorAll(
          'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    setTimeout(() => {
      const btn = dialogRef.current.querySelector('button, [href], [tabindex]')
      btn && btn.focus()
    }, 0)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={onClose}>
      <div className="modal card" ref={dialogRef} onMouseDown={(e)=>e.stopPropagation()}>
        <header>
          <h3>{title}</h3>
          <button onClick={onClose} aria-label="Cerrar">Cerrar ✕</button>
        </header>
        <div style={{marginTop:12}}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
