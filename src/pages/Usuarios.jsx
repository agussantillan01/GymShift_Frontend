import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Agregar useNavigate
import "../assets/styles/Usuarios.css";
import { getUsuarios } from "../api/UserService"; 
import iconDelete from "../assets/images/iconDelete.svg";
import iconEdit from "../assets/images/iconEdit.svg"; 

const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]); 
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate(); // Hook para la navegación

  const fetchUsuarios = async (pageNumber, pageSize, filter) => {
    try {
      const data = await getUsuarios(pageNumber, pageSize, filter);
      setUsuarios(Array.isArray(data) ? data : []); 
      setTotalPages(Math.ceil((data.length || 1) / pageSize)); 
    } catch (error) {
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

  const handleUpdate = (id) => { 
    if (!id) {
      console.error("❌ ID no definido");
      return;
    }
    navigate(`/UsuarioEdit/${id}`);
  };
  

  const handleDelete = () => { };

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

      <div className="usuarios-grid-cards">
        {usuarios.map((usuario) => (
          <div key={usuario.id} className="usuario-card">
            <h3>{usuario.nombre} {usuario.apellido}</h3>
            <div className="usuario-rol">
              <p>{usuario.email}</p>
              <p>{usuario.rol}</p>
            </div>

            <div className="usuario-actions">
              <button onClick={() => handleUpdate(usuario.id)} className="btnModificar">
                <img src={iconEdit} alt="Editar" />
              </button>
              <button onClick={handleDelete} className="btnDelete">
                <img src={iconDelete} alt="Eliminar" />
              </button>
            </div>
          </div>
        ))}
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
