import { BrowserRouter, Routes, Route } from "react-router-dom";


import Login from "../pages/Login";
import DashboardLayout from "../layout/DashboardLayout";
import SeccionDonaciones from "../pages/SeccionDonaciones";
import Donantes from "../pages/Donantes"; 
import Entregas from "../pages/Entregas"; 

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login fuera del layout */}
        <Route path="/" element={<Login />} />

        {/* Dashboard con layout persistente */}
        <Route element={<DashboardLayout />}>
          <Route path="/SeccionDonaciones" element={<SeccionDonaciones />} />
          <Route path="/Donantes" element={<Donantes />} />
          <Route path="/Entregas" element={<Entregas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}