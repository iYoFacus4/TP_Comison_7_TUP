
import './App.css'
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import EstudiosPage from './pages/Estudios/EstudiosPage'
import EstudiosEditar from './pages/Estudios/EstudiosEditar'
import EstudiosCrear from './pages/Estudios/EstudiosCrear'
import EstudiosVer from './pages/Estudios/EstudiosVer'
import AdminPage from './pages/AdminPage'
import { Route,Routes } from 'react-router-dom'
import { HOME,ADMIN } from './routers/HomePage.routes'
import { LOGIN } from './routers/HomePage.routes'
import RouteProtect from './RouteProtect/RouteProtect'
import { ESTUDIOS, ESTUDIOS_CREAR, ESTUDIOS_EDITAR, ESTUDIOS_VER } from './routers/estudios.routes'

function App() {


  return (
    <>
   {/* funciona para la navegacion */}
    
    <Routes>
      <Route path={HOME} element={<HomePage />} />
      <Route path={LOGIN} element={ <LoginPage />}/>
      {/* rutas privadas */}
      <Route path={ADMIN} element={<RouteProtect rolesRequired={['admin']}><AdminPage /></RouteProtect>} />
      <Route path={ESTUDIOS} element={<RouteProtect rolesRequired={['admin']}><EstudiosPage /></RouteProtect>} />
      <Route path={ESTUDIOS_EDITAR} element={<RouteProtect rolesRequired={['admin']}><EstudiosEditar /></RouteProtect>} />
      <Route path={ESTUDIOS_CREAR} element={<RouteProtect rolesRequired={['admin']}><EstudiosCrear /></RouteProtect>} />
      <Route path={ESTUDIOS_VER} element={<RouteProtect rolesRequired={['admin']}><EstudiosVer /></RouteProtect>} />
    </Routes>
    </>
  )
}

export default App
