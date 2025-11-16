import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "../utils/auth";

export default function RouterProtect({ children }) {
  const auth = getAuth();
  const loc = useLocation();

  if (!auth?.token) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  }
  return children;
}

export function RequireAdmin({ children }) {
  const auth = getAuth();
  if (auth?.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
