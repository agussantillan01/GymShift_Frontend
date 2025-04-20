import React, { useEffect, useState } from "react";
import { GetEventosAprbadosXCoach, GetClasesSolicitadasXCoach, GetClasesSolicitadas } from "../api/EventosService";
import "../assets/styles/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [eventosAprobados, setEventosAprobados] = useState([]);
  const [eventosSolicitadosXCoach, setEventosSolicitadosXCoach] = useState([]);
  const [eventosSolicitados, setEventosSolicitados] = useState([]);
  const [loading, setLoading] = useState(true); // Estado de carga

  const user = JSON.parse(localStorage.getItem("user"));
  const tienePermisoCrearEvento = user?.usuario.permissions?.includes("evento.create");
  const tienePermisoEventoView = user?.usuario.permissions?.includes("evento.view");
  const tienePermisoSolicitudView = user?.usuario.permissions?.includes("solicitud.view");

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const id = user?.id;
        const eventosObtenidos = await GetEventosAprbadosXCoach(id);
        const eventosPendientesAprobacion = await GetClasesSolicitadasXCoach();
        const todosEventosSolicitados = await GetClasesSolicitadas();
        
        setEventosAprobados(eventosObtenidos);
        setEventosSolicitadosXCoach(eventosPendientesAprobacion);
        setEventosSolicitados(todosEventosSolicitados);
        
        setLoading(false); 
      } catch (error) {
        console.error("❌ Error al obtener eventos:", error);
        setLoading(false); 
      }
    };

    if (user) { 
      fetchEventos();
    }
  }, [user]); 

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="dashboard-container">
      {tienePermisoCrearEvento && (
        <div className="button-container">
          <Link to="/GenerarEvento">
            <button className="crear-evento">➕ Crear Evento</button>
          </Link>
        </div>
      )}

      {tienePermisoEventoView && (
        <div>
          <div className="eventos-section">
            <h4>📅 Mis Eventos Aprobados</h4>
            <div className="eventos-grid">
              {eventosAprobados.length > 0 ? (
                eventosAprobados.map((evento) => (
                  <div className="evento-card" key={evento.id}>
                    <h3>{evento.tipoEvento}</h3>
                    <p><strong>Fecha Inicio:</strong> {evento.fechaInicio}</p>
                    <p><strong>Fecha Fin:</strong> {evento.fechaFin}</p>
                    <p><strong>Horario:</strong> {evento.horario}</p>
                    <p><strong>Días:</strong> {evento.dias}</p>
                  </div>
                ))
              ) : (
                <p className="no-eventos">No hay eventos disponibles.</p>
              )}
            </div>
          </div>

          <div className="eventos-section">
            <h4>📅 Mis Solicitudes</h4>
            <div className="eventos-grid">
              {eventosSolicitadosXCoach.length > 0 ? (
                eventosSolicitadosXCoach.map((evento) => (
                  <div className="evento-card" key={evento.id}>
                    <h3>{evento.tipoEvento}</h3>
                    <p><strong>Fecha Inicio:</strong> {evento.fechaInicio}</p>
                    <p><strong>Fecha Fin:</strong> {evento.fechaFin}</p>
                    <p><strong>Horario:</strong> {evento.horario}</p>
                    <p><strong>Días:</strong> {evento.dias}</p>
                  </div>
                ))
              ) : (
                <p className="no-eventos">No hay eventos disponibles.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {tienePermisoSolicitudView && (
        <div className="eventos-section">
          <h4>Solicitudes de aprobación</h4>
          <div className="eventos-grid">
            {eventosSolicitados.length > 0 ? (
              eventosSolicitados.map((evento) => (
                <div className="evento-card" key={evento.id}>
                  <h3>{evento.tipoEvento}</h3>
                  <p><strong>Fecha Inicio:</strong> {evento.fechaInicio}</p>
                  <p><strong>Fecha Fin:</strong> {evento.fechaFin}</p>
                  <p><strong>Horario:</strong> {evento.horario}</p>
                  <p><strong>Días:</strong> {evento.dias}</p>
                </div>
              ))
            ) : (
              <p className="no-eventos">No hay solicitudes disponibles.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
