import { Navigate, Outlet } from "react-router-dom";

export default function RouterProtect() {
  const isLogged = localStorage.getItem("userLogged");

  if (!isLogged || isLogged === "false") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
