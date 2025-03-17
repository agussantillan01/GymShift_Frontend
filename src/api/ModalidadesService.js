import apiClient from "./apiClient";  
const API_URL_MODALIDADES = "/GetModalidades";

export const GetModalidades = async() =>{ 
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No hay token disponible");
        }

        const response = await apiClient.get(API_URL_MODALIDADES, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data; 
    } catch (error) {
        console.error("❌ Error al obtener los eventos:", error);
        throw error.response?.data?.message || "Error al obtener los eventos";
    }
};