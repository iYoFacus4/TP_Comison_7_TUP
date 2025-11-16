import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "../constants/routes";

// Layouts
import DashboardLayout from "../layout/DashboardLayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import Dashboard from "../dashboard/Dashboard";
import Pagos from "../pages/Pagos";
import Deportes from "../pages/Deportes";
import Socios from "../pages/Socios";
import RouterProtect from "./RouterProtect"; 

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />

        {/* Rutas del dashboard (PROTEGIDAS) */}
        <Route path={ROUTES.DASHBOARD} element={<RouterProtect><DashboardLayout /></RouterProtect>}>
          <Route index element={<Dashboard />} />
          <Route path={ROUTES.SOCIOS} element={<Socios />} />
          <Route path={ROUTES.PAGOS} element={<Pagos />} />
          <Route path={ROUTES.DEPORTES} element={<Deportes />} />
          {/* Las demás rutas se agregarán después */}
        </Route>

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

