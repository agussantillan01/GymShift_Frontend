import React, { useState, useEffect } from "react";
import "../assets/styles/Usuarios.css";
import { Link } from "react-router-dom";
import { getUsuarios } from "../api/UserService"; 
import iconDelete from "../assets/images/iconDelete.svg";
import iconEdit from "../assets/images/iconEdit.svg"; 
const Usuarios = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]); 
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsuarios = async (pageNumber, pageSize, filter) => {
    try 
    {
      const data = await getUsuarios(pageNumber, pageSize, filter);
      setUsuarios(data);
      setTotalPages(Math.ceil(data.length / pageSize)); 
    } catch (error) 
    {
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
  const handleUpdate = () => { 

  };
  const handleDelete= () => { 
    
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
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
                <tr key={usuario.id}>
                <td>{usuario.id}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.email}</td>
                <td>{usuario.rol}</td>
                <td><button onClick={handleUpdate} className="btnModificar"><img src={iconEdit}></img></button></td> 
                <td><button onClick={handleDelete} className="btnDelete"><img src={iconDelete}></img></button></td>
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