import apiClient from "./apiClient"; 

const API_URL = "/Authenticate";  

export const login = async (Usuario, Password) => { // Mayúsculas para coincidir con el backend
    try {
        console.log("🟢 Enviando datos al backend:", { Usuario, Password });

        const response = await apiClient.post(
            API_URL, 
            { Usuario, Password }, // Asegúrate de que coincidan con el backend
            {
                headers: {
                    'Content-Type': 'application/json' // Enviar como JSON
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
