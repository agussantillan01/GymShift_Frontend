import { GetUsuario } from "../api/UserService"
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
const UsuarioEdit = () => {
  const { userId } = useParams(); 
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        console.log("📌 ID recibido:", userId); // Agregar log para verificar si el ID llega correctamente
        if (userId) {
          const data = await GetUsuario(userId);
          console.log("DATA USUARIO: ", data);
          setUsuario({
            nombre: data.nombre || "",
            apellido: data.apellido || "",
            email: data.email || "",
            username: data.userName || "",
          });
        }
      } catch (error) {
        console.error("❌ Error al obtener usuario:", error);
      }
    };

    fetchUsuario();
  }, [userId]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("✅ Datos actualizados:", usuario);
  };

  return (
    <div>
      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={usuario.nombre}
          onChange={handleChange}
          required
        />

        <label>Apellido:</label>
        <input
          type="text"
          name="apellido"
          value={usuario.apellido}
          onChange={handleChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={usuario.email}
          onChange={handleChange}
          required
        />

        <label>Usuario:</label>
        <input
          type="text"
          name="username"
          value={usuario.username}
          onChange={handleChange}
          required
        />

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default UsuarioEdit;
