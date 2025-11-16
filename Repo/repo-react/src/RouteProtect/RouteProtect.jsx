import { Navigate,Outlet } from "react-router-dom";
import {LOGIN} from '../routers/HomePage.routes.js';
import { useAuth } from "../hook/useAuth.js";

const RouteProtect = ({rolesRequired = [], children}) => {
    const { user } = useAuth();

    // Verificar si el usuario está autenticado
    if (!user) {
        return <Navigate to={LOGIN} />;
    }

    // Verificar roles si se requieren
    if (rolesRequired.length > 0) {
        const userRole = user.Rol?.toLowerCase();
        const hasRequiredRole = rolesRequired.some(role => role.toLowerCase() === userRole);
        
        if (!hasRequiredRole) {
            return <Navigate to={LOGIN} />;
        }
        
    }

    return children ? children : <Outlet />;
};

export default RouteProtect;