import React, { useState } from 'react';

const EntregaItem = ({ donacion }) => {
  const [estado, setEstado] = useState(donacion.estadoInicial); // 'pendiente', 'en_camino', 'entregado'

  const handleMarcarEntregado = () => {
    setEstado('entregado');
    console.log(`La donación ${donacion.id} ha sido marcada como entregada.`);
  };

  // Colores de la barra de progreso según el estado
  const progressWidth = estado === 'pendiente' ? '0%' : estado === 'en_camino' ? '50%' : '100%';
  const progressColor = estado === 'pendiente' ? 'bg-secondary' : estado === 'en_camino' ? 'bg-warning' : 'bg-success';

  return (
    <div className="card mb-4 shadow-sm border-0">
      <div className="card-header d-flex justify-content-between align-items-center bg-primary text-white">
        <span>ID: <strong>{donacion.id}</strong></span>
        <span className="badge bg-light text-dark">{donacion.destino}</span>
      </div>
      
      <div className="card-body">
        <h5 className="card-title fw-bold">{donacion.contenido}</h5>
        <p className="card-text">
          <strong>Destino:</strong> {donacion.destino} <br />
          <strong>Fecha Salida:</strong> {donacion.fechaSalida} <br />
          <strong>Fecha Llegada:</strong> {donacion.fechaLlegada}
        </p>

        {/* Barra de progreso */}
        <div className="progress mb-2" style={{ height: '6px' }}>
          <div
            className={`progress-bar ${progressColor}`}
            role="progressbar"
            style={{ width: progressWidth }}
            aria-valuenow={estado === 'en_camino' ? 50 : estado === 'entregado' ? 100 : 0}
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>

        {/* Fechas con colores según progreso */}
        <div className="d-flex justify-content-between text-center mb-3">
          <div className={`fw-bold ${estado !== 'pendiente' ? 'text-success' : 'text-muted'}`}>
            Salió
            <div className="small">{donacion.fechaSalida}</div>
          </div>
          <div className={`fw-bold ${estado === 'entregado' ? 'text-success' : 'text-muted'}`}>
            Llegada
            <div className="small">{donacion.fechaLlegada}</div>
          </div>
        </div>

        {/* Botón o mensaje final */}
        {estado !== 'entregado' ? (
          <div className="text-end">
            <button className="btn btn-primary" onClick={handleMarcarEntregado}>
              Marcar como Entregado
            </button>
          </div>
        ) : (
          <div className="alert alert-success text-center mb-0">
            ¡Entrega completada! ✅
          </div>
        )}
      </div>
    </div>
  );
};

export default EntregaItem;
