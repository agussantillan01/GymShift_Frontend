import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/styles/UserGenerate.css";

const UserGenerate = () => {
  const { user } = useAuth();
  const rolUsuarioLogueado = user?.role[0];

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
    <div className="user-generate-container">
      <h2 className="user-generate-title">Generar Usuario</h2>
      <form onSubmit={handleSubmit} className="user-generate-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="nombre" className="form-label">
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="apellido" className="form-label">
              Apellido:
            </label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="userName" className="form-label">
              Nombre de usuario:
            </label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-input"
              required
            />
          </div>
        </div>

        {rolUsuarioLogueado === "ADMIN" && (
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoUsuario" className="form-label">
                Tipo de usuario:
              </label>
              <select
                id="tipoUsuario"
                value={tipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="form-input"
                required
              >
                <option value="">Seleccione un tipo</option>
                <option value="Trainer">Trainer</option>
                <option value="Secretario/a">Secretario/a</option>
              </select>
            </div>
          </div>
        )}

        <button type="submit" className="form-button">
          Generar Usuario
        </button>
      </form>
    </div>
  );
};

export default UserGenerate;