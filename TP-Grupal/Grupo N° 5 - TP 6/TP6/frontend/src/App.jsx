import { Navigate, Route, Routes } from 'react-router-dom';

import IniciarSesion from './Components/FormLogin.jsx';
import Dashboard from './Pages/DashBoard/Dashboard.jsx';

import Artistas from './Pages/DashBoard/Artistas.jsx';
import Asistentes from './Pages/DashBoard/Asistentes.jsx';
import Eventos from './Pages/DashBoard/Eventos.jsx';
import RutaPrivada from './Components/RutaPrivada.jsx';

import Home from './Components/Home.jsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/*  Ruta Pública */}
        <Route path="/login" element={<IniciarSesion />} />

        {/* 3. Rutas Privadas Protegidas */}
        {/* Envolvemos el Dashboard con el componente RutaPrivada */}
        <Route element={<RutaPrivada />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Home />} />
            <Route path="artistas" element={<Artistas />} />
            <Route path="asistentes" element={<Asistentes />} />
            <Route path="eventos" element={<Eventos />} />
          </Route>
        </Route>

        {/* Opcional: Una ruta "catch-all" por si no matchea nada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;