import apiClient from "./apiClient"; 

const API_URL_AUTH = "/Authenticate";  
const API_URL_REGISTER = "/Register";  
export const login = async (Usuario, Password) => {
    try {
        console.log("🟢 Enviando datos al backend:", { Usuario, Password });

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

export const RegiserAsync = async (FirstName, LastName, Email, UserName, Rol, ActividadesArray) => { 
try {
    console.log("Desde register async: FirstName:", FirstName);
    console.log("Desde register async: LastName:", LastName);
    console.log("Desde register async: Email:", Email);
    console.log("Desde register async: UserName:", UserName);
    console.log("Desde register async: Rol:", Rol);

    const Actividades = ActividadesArray.map(act => act.nombre);
    console.log("Desde register async: Actividades:", Actividades);
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