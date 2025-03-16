import apiClient from "./apiClient";  
const API_URL = "/GetTiposEventos";

export const GetTiposEventos = async() =>{ 
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No hay token disponible");
        }

        const response = await apiClient.get(API_URL, {
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


const API_URL_X_COACH = "/GetDeportesXusuario";

export const GetDeportesXusuario = async() =>{ 
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No hay token disponible");
        }

        const response = await apiClient.get(API_URL_X_COACH, {
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