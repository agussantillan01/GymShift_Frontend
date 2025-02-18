import { createContext, useContext, useState, useEffect } from "react";
import { login as loginService, logout as logoutService } from "../api/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("usuario");
        const storedToken = localStorage.getItem("token");
        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
        }
    }, []); 

    const login = async (email, password) => {
        try {
            const response = await loginService(email, password);
            if (response && response.jwToken) {
                setUser(response.usuario); 
                localStorage.setItem("token", response.jwToken);
                localStorage.setItem("usuario", JSON.stringify(response.usuario));
            } else {
                throw new Error("Error en la autenticación: Respuesta inválida");
            }
        } catch (error) {
            console.error("Error en el login:", error);
            throw error; 
        }
    };

    const logout = () => {
        logoutService();
        setUser(null); 
        localStorage.removeItem("usuario"); 
        localStorage.removeItem("token"); 
    };

    const value = {
        user,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }
    return context;
};