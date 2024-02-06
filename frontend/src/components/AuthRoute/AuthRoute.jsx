import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext"
import AuthCheckingComponent from "../Alerts/AuthCheckingComponent";


const AuthRoute = ({ children }) => {
    const { isAuthenticated, isError, isLoading } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <AuthCheckingComponent/>
    }

    if (isError || isAuthenticated === false) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default AuthRoute;