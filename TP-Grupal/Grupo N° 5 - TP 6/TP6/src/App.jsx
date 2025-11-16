import { Navigate, Route, Routes } from 'react-router-dom';

import IniciarSesion from './Components/FormLogin.jsx'; 
import Dashboard from './Pages/DashBoard/Dashboard.jsx';

import Artistas from './Pages/DashBoard/Artistas.jsx'; 
import ArtistaCard from './Components/ArtistaCard.jsx'; 
import Asistentes from './Pages/DashBoard/Asistentes.jsx';
import Eventos from './Pages/DashBoard/Eventos.jsx';

function App() {
  return (
    <>
      <Routes>
        
        <Route path='/' element={<Navigate to='/login' replace />} />

        
        <Route path='/login' element={<IniciarSesion />} />

        
        <Route path='/dashboard' element={<Dashboard />}>
          <Route index element={
            <div>
              <h1 style={{ color: '#2c3e50', marginBottom: '20px' }}>ADMINISTRACIÓN</h1>
              <p style={{ color: '#7f8c8d', fontSize: '16px' }}>
                Selecciona una opción del menú lateral para comenzar
              </p>
            </div>
          } />

          <Route path='artistas' element={<Artistas />} /> 
          
          <Route path='asistentes' element={<Asistentes />} />
          <Route path='eventos' element={<Eventos />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;