import React, { useState } from 'react';
import EntregaItem from '../components/EntregaItem';
import FormularioEntrega from '../components/FormEntregas';

// Los datos iniciales ahora son el valor por defecto de nuestro estado
const entregasIniciales = [
  {
    id: 'D001',
    contenido: 'Cajas de alimentos no perecederos',
    destino: 'Comedor Los Piletones',
    fechaSalida: '2025-10-23',
    fechaLlegada: '25/10/2025',
    estadoInicial: 'en_camino'
  },
   {
    id: 'D003',
    contenido: 'Útiles escolares',
    destino: 'Escuela Rural N° 45',
    fechaSalida: '2025-10-20',
    fechaLlegada: '21/10/2025',
    estadoInicial: 'entregado'
  }
];

const EntregasPage = () => {
  // Estado para almacenar la lista de entregas
  const [entregas, setEntregas] = useState(entregasIniciales);

  // Función para agregar una nueva entrega a la lista
  const handleAgregarEntrega = (nuevaEntrega) => {
    // Usamos el operador "spread" (...) para crear una nueva lista
    // que contiene todas las entregas anteriores más la nueva
    setEntregas([...entregas, nuevaEntrega]);
  };

  return (
    <div className="container mt-5">
      
      {/* Incluimos el formulario y le pasamos la función para agregar entregas */}
      <FormularioEntrega onAgregarEntrega={handleAgregarEntrega} />
      
      <h1 className="mb-4 mt-5">Seguimiento de Entregas</h1>
      
      {/* Si no hay entregas, mostramos un mensaje */}
      {entregas.length === 0 ? (
        <div className="alert alert-info">Aún no hay entregas pendientes.</div>
      ) : (
        entregas.map(entrega => (
          <EntregaItem key={entrega.id} donacion={entrega} />
        ))
      )}

    </div>
  );
};

export default EntregasPage;