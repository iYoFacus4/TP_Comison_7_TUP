import React, { useState } from 'react';

const FormularioEntrega = ({ onAgregarEntrega }) => {
  const [contenido, setContenido] = useState('');
  const [destino, setDestino] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    if (!contenido || !destino || !fechaSalida) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Creamos el nuevo objeto de entrega
    const nuevaEntrega = {
      id: `D${Math.floor(Math.random() * 1000)}`, // Un ID simple y aleatorio
      contenido,
      destino,
      fechaSalida,
      fechaLlegada: 'Calculada...', // Podrías calcular esto dinámicamente
      estadoInicial: 'pendiente'
    };

    // Llamamos a la función del componente padre para agregar la entrega
    onAgregarEntrega(nuevaEntrega);

    // Limpiamos el formulario
    setContenido('');
    setDestino('');
    setFechaSalida('');
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h3>Agregar Nueva Entrega</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="contenido" className="form-label">Contenido de la Donación</label>
            <input
              type="text"
              className="form-control"
              id="contenido"
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="destino" className="form-label">Destino</label>
            <input
              type="text"
              className="form-control"
              id="destino"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="fechaSalida" className="form-label">Fecha de Salida</label>
            <input
              type="date"
              className="form-control"
              id="fechaSalida"
              value={fechaSalida}
              onChange={(e) => setFechaSalida(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100">
            Agregar Entrega
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormularioEntrega;