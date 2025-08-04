import apiClient from "./apiClient"; 

const API_URL_AUTH = "/Authenticate";  
const API_URL_REGISTER = "/Register";  
export const login = async (Usuario, Password) => {
    try {
        const response = await apiClient.post(
            API_URL_AUTH, 
            { Usuario, Password }, 
            {
                headers: {
                    'Content-Type': 'application/json' 
                }
            }
        );

        if (response.data && response.data.data) {
            localStorage.setItem("user", JSON.stringify(response.data.data));
            return response.data.data; 
        }
    } catch (error) {
        console.error("❌ Error en la autenticación:", error);
        throw error.response?.data?.message || "Error al iniciar sesión";
    }
};


export const logout = () => {
    localStorage.removeItem("user");
};

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

export const RegiserAsync = async (FirstName, LastName, Email, Rol, ActividadesArray) => { 
try {
    const UserName = Email;
    const Actividades = ActividadesArray.map(act => act.nombre);
    const response = await apiClient.post(
        API_URL_REGISTER, 
        { FirstName, LastName, Email,UserName,  Rol, Actividades},
        {
            headers: {
                'Content-Type': 'application/json' 
            }
        }
    );
} catch (error) {
    throw error.response?.data?.message || "Error al registrar el usuario.";
}
};