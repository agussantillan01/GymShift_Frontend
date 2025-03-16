import apiClient from "./apiClient";  
const API_URL_Generar = "/GenerarEvento"; 

export const GenerarEvento = async (clase) => {  
    console.log("📤 Enviando datos al backend:", clase);

    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("❌ No hay token disponible");
        }

        const response = await apiClient.post(
            API_URL_Generar, 
            clase,  // Se envía directamente el objeto sin envolver en `{ clase }`
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("✅ Evento generado con éxito:", response.data);
        return response.data;  // Retorna la respuesta del backend
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        console.error("❌ Error al generar el evento:", errorMessage);
        throw new Error(errorMessage);
    }
};
