import apiClient from "./apiClient";  
const API_URL_Generar = "/GenerarEvento"; 

export const GenerarEventoAsync = async() =>{ 
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No hay token disponible");
        }

        const response = await apiClient.post(API_URL_Generar, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("❌ Error al obtener los eventos:", error);
        throw error.response?.data?.message || "Error al obtener los eventos";
    }
};