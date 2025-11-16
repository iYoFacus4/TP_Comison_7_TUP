import { Outlet, Link, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { ROUTES } from "../constants/routes";
import Sidebar from "../components/ui/Sidebar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName") || "Usuario";

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
