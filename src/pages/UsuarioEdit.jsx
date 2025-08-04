import { GetUsuario } from "../api/UserService";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetTiposEventos } from "../api/TipoEventoService"; 
import { Update } from "../api/UserService";
import "../assets/styles/UsuarioEdit.css";
const UsuarioEdit = () => {
  const { userId } = useParams();
  const [usuario, setUsuario] = useState({
    nombre: "",
    apellido: "",
    email: "",
    username: "",
    tipoUsuario: "", 
    actividades: [],
  });

  const [tiposEventos, setTiposEventos] = useState([]); 
  const [eventosSeleccionados, setEventosSeleccionados] = useState([]); 
  const [mostrarDesplegable, setMostrarDesplegable] = useState(false); 

  const fetchTiposEventos = async () => {
    try {
      const data = await GetTiposEventos();
      setTiposEventos(data || []);
    } catch (error) {
      console.error("Error al obtener actividades:", error);
    }
  };

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        if (userId) {
          const data = await GetUsuario(userId);
          setUsuario({
            nombre: data.nombre || "",
            apellido: data.apellido || "",
            email: data.email || "",
            username: data.userName || "",
            tipoUsuario: data.rol || "", 
            actividades: data.actividades || [],
          });
          setEventosSeleccionados(data.actividades || []);
        }
      } catch (error) {
        console.error("❌ Error al obtener usuario:", error);
      }
    };

    fetchUsuario();
    fetchTiposEventos(); 
  }, [userId]);

  const handleSeleccionarActividad = (evento) => {
    if (!eventosSeleccionados.includes(evento.nombre)) {  
      setEventosSeleccionados([...eventosSeleccionados, evento.nombre]);
    }
    setMostrarDesplegable(false);
  };

  const handleEliminarActividad = (eventoNombre) => {
    setEventosSeleccionados(eventosSeleccionados.filter((e) => e !== eventoNombre));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipoUsuario") {
      setUsuario({ ...usuario, tipoUsuario: value });
    } else {
      setUsuario({ ...usuario, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleClickGuardar = () => {
    const usuarioCompleto = {
      userId,
      ...usuario, 
      actividades: eventosSeleccionados,
    };
    
    var res = Update(usuarioCompleto);    
  };

  return (
    <div>
      <div className="usuario-edit-container">
        <h2 className="usuario-edit-title">Editar Usuario</h2>
        <form onSubmit={handleSubmit} className="usuario-edit-form">
          <div className="form-group">
            <label className="form-label">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={usuario.nombre}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Apellido:</label>
            <input
              type="text"
              name="apellido"
              value={usuario.apellido}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              name="email"
              value={usuario.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Usuario:</label>
            <input
              type="text"
              name="username"
              value={usuario.username}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tipo de Usuario:</label>
            <select
              name="tipoUsuario"
              value={usuario.tipoUsuario}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Seleccione un tipo</option>
              <option value="coach">Coach</option>
              <option value="recepcionista">Recepcionista</option>
              <option value="alumno">Alumno</option>
            </select>
          </div>


          {usuario.tipoUsuario === "coach" && (
          <div className="form-group">
            <label className="form-label">Actividades:</label>
            <div>
              <button
                type="button"
                className="form-button"
                onClick={() => setMostrarDesplegable(!mostrarDesplegable)}
              >
                Seleccionar Actividades
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

            <div>
              {eventosSeleccionados.map((evento, index) => (
                <div key={index} className="tarjeta-actividad">
                  <span>{evento}</span>  
                  <button
                    type="button"
                    className="eliminar-button"
                    onClick={() => handleEliminarActividad(evento)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
  )}
          <button type="submit" className="form-button" onClick={handleClickGuardar}>Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default UsuarioEdit;
