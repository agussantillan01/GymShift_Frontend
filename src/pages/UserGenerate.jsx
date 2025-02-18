import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import "../assets/styles/UserGenerate.css";

const UserGenerate = () => {
  const { user } = useAuth();
  const rolUsuarioLogueado = user?.role[0];

  console.log("Usuario logueado:", user);
  console.log("Rol del usuario logueado:", rolUsuarioLogueado);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault(); 

    console.log("Datos del formulario:", {
      nombre,
      apellido,
      email,
      userName,
      tipoUsuario: rolUsuarioLogueado === "ADMIN" ? tipoUsuario : null, 
    });


    setNombre("");
    setApellido("");
    setEmail("");
    setUserName("");
    setTipoUsuario("");
  };

  return (
    <div className="container">
      <h2 className="title">Generar Usuario</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="nombre" className="label">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="apellido" className="label">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>

        <div className="formGroup">
          <label htmlFor="userName" className="label">
            Nombre de usuario:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="input"
            required
          />
        </div>

        {rolUsuarioLogueado === "ADMIN" && (
          <div className="formGroup">
            <label htmlFor="tipoUsuario" className="label">
              Tipo de usuario:
            </label>
            <select
              id="tipoUsuario"
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              className="input"
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="Profesor">Profesor</option>
              <option value="Secretario/a">Secretario/a</option>
            </select>
          </div>
        )}

        <button type="submit" className="button">
          Generar Usuario
        </button>
      </form>
    </div>
  );
};

export default UserGenerate;