import React, { useState, useEffect } from "react";
import "../assets/styles/Usuarios.css";
import { Link } from "react-router-dom";

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]); 
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsuarios = async (pageNumber, pageSize, filter) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No hay token disponible");
        return;
      }

      const response = await fetch(
        `https://localhost:7242/GetUsuarios?pageNumber=${pageNumber}&pageSize=${pageSize}&filter=${filter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Error al obtener los usuarios");
      }

      const data = await response.json();
      console.log("Datos recibidos:", data); 
      if (data && Array.isArray(data)) {
        setUsuarios(data); 
        setTotalPages(Math.ceil(data.length / pageSize)); 
      } else {
        setUsuarios([]);
        setTotalPages(0);
        console.warn("La estructura de la respuesta no es la esperada:", data);
      }
    } catch (error) {
      console.error("Error:", error);
      setUsuarios([]);
      setTotalPages(0);
    }
  };

  useEffect(() => {
    fetchUsuarios(pageNumber, pageSize, searchTerm);
  }, [pageNumber, pageSize, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPageNumber(1); 
  };

  const handlePageChange = (newPageNumber) => {
    setPageNumber(newPageNumber);
  };

  return (
    <div className="Usuarios-container">
      <div className="alignButton">
        <Link to="/UserGenerate">
          <button className="button-usuarios">Crear Usuario</button>
        </Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar usuario..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

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
            {usuarios.map((usuario) => (
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

      <div className="pagination">
        <button
          onClick={() => handlePageChange(pageNumber - 1)}
          disabled={pageNumber === 1}
        >
          Atras
        </button>
        <span>
          Página {pageNumber} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(pageNumber + 1)}
          disabled={pageNumber === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Usuarios;