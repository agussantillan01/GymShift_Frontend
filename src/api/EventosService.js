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
            clase, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        console.log("✅ Evento generado con éxito:", response.data);
        return response.data;  
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        console.error("❌ Error al generar el evento:", errorMessage);
        throw new Error(errorMessage);
    }
};



const API_URL_OBTENER_X_COACH = "/GetClasesXcoach";

export const GetEventoXCoach = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("❌ No hay token disponible");
    }

    const response = await apiClient.get(
      `${API_URL_OBTENER_X_COACH}?id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("✅ Eventos obtenidos:", response.data);
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
    console.error("❌ Error al obtener eventos:", errorMessage);
    throw new Error(errorMessage);
  }
};


