import React from "react";
import "../assets/styles/Usuarios.css";
import { Link } from "react-router-dom"; 
const Usuarios = () => {
  return (
    <div className="Usuarios-container">
      
      <div className="alignButton">
        <Link to="/UserGenerate">
          <button className="button-usuarios">
            Crear Usuario
          </button>
        </Link>
      </div>


    </div>
  );
};

export default Usuarios;