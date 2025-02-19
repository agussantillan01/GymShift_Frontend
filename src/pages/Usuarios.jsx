import React, { useState, useEffect } from "react";
import "../assets/styles/Usuarios.css";
import { Link } from "react-router-dom";

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  // Obtener el ID del usuario autenticado desde el localStorage
  const userId = localStorage.getItem("userId");

  // Función para obtener los usuarios
  const fetchUsuarios = async () => {
    try {
      const response = await fetch(`https://localhost:7242/GetUsuarios?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }
      const data = await response.json();
      setUsuarios(data); // Almacena los usuarios en el estado
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Llama a fetchUsuarios cuando el componente se monta
  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="Usuarios-container">
      <div className="alignButton">
        <Link to="/UserGenerate">
          <button className="button-usuarios">Crear Usuario</button>
        </Link>
      </div>

      {/* Campo de búsqueda */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      {/* Grilla de usuarios */}
      <div className="usuarios-grid">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {usuarios
              .filter((usuario) =>
                usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((usuario) => (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.rol}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Usuarios;