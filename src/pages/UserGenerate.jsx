import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { GetTiposEventos } from "../api/TipoEventoService";
import {RegiserAsync} from "../api/AuthService";
import "../assets/styles/UserGenerate.css";

const UserGenerate = () => {
  const { user } = useAuth();
  const rolUsuarioLogueado = user?.role[0];

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  const [tiposEventos, setTiposEventos] = useState([]);
  const [eventosSeleccionados, setEventosSeleccionados] = useState([]);
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false);

  const fetchTiposEventos = async () => {
    try {
      const data = await GetTiposEventos();
      setTiposEventos(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener los tipos de eventos:", error);
      setTiposEventos([]);
    }
  };

  useEffect(() => {
    if (
      (rolUsuarioLogueado === "ADMIN" && tipoUsuario === "Coach") ||
      rolUsuarioLogueado === "RECEPCIONISTA"
    ) {
      fetchTiposEventos();
    } else {
      setTiposEventos([]);
    }
  }, [tipoUsuario, rolUsuarioLogueado]);

  const handleSeleccionarActividad = (evento) => {
    if (!eventosSeleccionados.some((e) => e.id === evento.id)) {
      setEventosSeleccionados([...eventosSeleccionados, evento]);
    }
    setMostrarDesplegable(false); 
  };

  const handleEliminarActividad = (eventoId) => {
    setEventosSeleccionados(eventosSeleccionados.filter((e) => e.id !== eventoId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNombre("");
    setApellido("");
    setEmail("");
    setTipoUsuario("");
    setEventosSeleccionados([]);
  };

  const handleBtnCreate = async() => { 
    let evSelec = eventosSeleccionados.map((evento) => evento.nombre);
    console.log("Datos del formulario 2:", {
    nombre,
    apellido,
    email,
    tipoUsuario: rolUsuarioLogueado === "ADMIN" ? tipoUsuario : null,
    eventosSeleccionados,
    });
    
    const data = await RegiserAsync(nombre, apellido, email, tipoUsuario, eventosSeleccionados);
    console.log(data);
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
                <option value="Coach">Coach</option>
                <option value="Recepcionista">Recepcionista</option>
              </select>
            </div>
          </div>
        )}

        {(rolUsuarioLogueado === "ADMIN" && tipoUsuario === "Coach") ||
        rolUsuarioLogueado === "RECEPCIONISTA" ? (
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Actividades:</label>
              <div className="actividades-container">
                <div className="desplegable-container">
                  <button
                    type="button"
                    className="desplegable-button"
                    onClick={() => setMostrarDesplegable(!mostrarDesplegable)}
                  >
                    Seleccionar actividades
                  </button>
                  {mostrarDesplegable && (
                    <div className="desplegable-lista">
                      {tiposEventos.map((evento) => (
                        <div
                          key={evento.id}
                          className="desplegable-item"
                          onClick={() => handleSeleccionarActividad(evento)}
                        >
                          {evento.nombre}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                  <div className="tarjetas-container">
                    {eventosSeleccionados.map((evento) => (
                    <div className="tarjeta-actividad">
                    <span>{evento.nombre}</span>
                    <button type="button"className="eliminar-button"onClick={() => handleEliminarActividad(evento.id)}>×</button>
                  </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <button type="submit" className="form-button" onClick={handleBtnCreate}> 
          Generar Usuario
        </button>
      </form>
    </div>
  );
};

export default UserGenerate;