import { useQuery } from "@tanstack/react-query";
import { createContext, useContext, useEffect, useState } from "react";
import { checkLoginStatus } from "../apis/Users/userApi";

export const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { isError, isSuccess, isLoading, data } = useQuery({
        queryFn: checkLoginStatus,
        queryKey: ['checkAuth']
    });


    useEffect(() => {
        if (isSuccess) {
            setIsAuthenticated(data);
        }
    }, [data, isSuccess]);

    const login = () => {
        setIsAuthenticated(true);
    }

    const logout = () => {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            isError,
            isSuccess,
            isLoading,
            login,
            logout
        }}> 
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}