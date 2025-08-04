import apiClient from "./apiClient";  
const API_URL_Generar = "/GenerarEvento"; 
export const GenerarEvento = async (clase) => {  

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

        return response.data;  
    } catch (error) {
        const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
        console.error("❌ Error al generar el evento:", errorMessage);
        throw new Error(errorMessage);
    }
};



const API_URL_OBTENER_X_COACH = "/GetClasesAprobadasXcoach";

export const GetEventosAprbadosXCoach = async (id) => {
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

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
    console.error("❌ Error al obtener eventos:", errorMessage);
    throw new Error(errorMessage);
  }
};

const API_URL_OBTENER_SOLICITADAS_x_COACH = "/GetClasesSolicitadasXCoach";

export const GetClasesSolicitadasXCoach = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("❌ No hay token disponible");
    }

    const response = await apiClient.get(
      API_URL_OBTENER_SOLICITADAS_x_COACH,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
    console.error("❌ Error al obtener eventos:", errorMessage);
    throw new Error(errorMessage);
  }
};


const API_URL_OBTENER_SOLICITADAS = "/GetClasesSolicitadas";

export const GetClasesSolicitadas = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("❌ No hay token disponible");
    }

    const response = await apiClient.get(
      API_URL_OBTENER_SOLICITADAS,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data;
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message || "Error desconocido";
    console.error("❌ Error al obtener eventos:", errorMessage);
    throw new Error(errorMessage);
  }
};


