import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ rolesPermitidos = [], permisosPermitidos = [] }) => {
    const { user } = useAuth();
    if (!user) return <Navigate to="/" />;
    const tieneRol = rolesPermitidos.length === 0 || rolesPermitidos.some(rol => user?.role?.includes(rol));
    const tienePermiso = permisosPermitidos.length === 0 || permisosPermitidos.some(permiso => user?.permissions?.includes(permiso));
    if (!tieneRol || !tienePermiso) {
        return <Navigate to="/unauthorized" />;
    }

    return <Outlet />;
};

export default PrivateRoute;
