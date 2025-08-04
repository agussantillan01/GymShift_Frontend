import apiClient from "./apiClient"; 
const API_URL = "/GetUsuarios";

export const getUsuarios = async (pageNumber = 1, pageSize = 10, filter = "") => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No hay token disponible");
        }

        const response = await apiClient.get(API_URL, {
            params: { pageNumber, pageSize, filter },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return response.data; 
    } catch (error) {
        console.error("❌ Error al obtener usuarios:", error);
        throw error.response?.data?.message || "Error al obtener los usuarios";
    }
};

const API_URL_Usuario = "/GetUsuario";

export const GetUsuario = async (idUsuario) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No hay token disponible");
    }

    const response = await apiClient.get(`${API_URL_Usuario}/${idUsuario}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener usuario:", error);
    throw error.response?.data?.message || "Error al obtener el usuario";
  }
};


const API_URL_UPDATE = "/Update";
export const Update = async (usuario) => {
  try {
      const usuarioCorregido = {
          Id: parseInt(usuario.userId),  
          Nombre: usuario.nombre,
          Apellido: usuario.apellido,
          Email: usuario.email,
          UserName: usuario.username,
          Rol: usuario.tipoUsuario, 
          Actividades: usuario.actividades
      };


      const response = await apiClient.post(API_URL_UPDATE, usuarioCorregido, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
          }
      });

      return response.data;
  } catch (error) {
      console.error("❌ Error al actualizar usuario:", error);
      throw error;
  }
};
