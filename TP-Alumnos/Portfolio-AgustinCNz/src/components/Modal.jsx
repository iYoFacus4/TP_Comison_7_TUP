// Modal.jsx
// Modal reutilizable. Cierra con click en overlay y botón “Cerrar”.

export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* Detengo la propagación para no cerrar al click dentro del modal */}
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>Cerrar ✕</button>
        {children}
      </div>
    </div>
  );
}
