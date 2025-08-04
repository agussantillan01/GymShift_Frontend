import React, { useEffect, useState, useMemo } from "react";
import {
  GetEventosAprbadosXCoach,
  GetClasesSolicitadasXCoach,
  GetClasesSolicitadas,
} from "../api/EventosService";
import "../assets/styles/Dashboard.css";
import { Link, useNavigate } from "react-router-dom";

import iconEdit from "../assets/images/iconEdit.svg";
const Dashboard = () => {
  const [eventosAprobados, setEventosAprobados] = useState([]);
  const [eventosSolicitadosXCoach, setEventosSolicitadosXCoach] = useState([]);
  const [eventosSolicitados, setEventosSolicitados] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  }, []);
  const rol = useMemo(() => {
    const roles = user?.usuario?.role || [];
    return {
      perfilRepecionista: roles.includes("RECEPCIONISTA"),
      perfilCoach: roles.includes("COACH"),
      perfilAlumno: roles.includes("ALUMNO"),
    };
  }, [user]);
  const { perfilRepecionista, perfilCoach, perfilAlumno } = rol;

  const navigate = useNavigate();
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

  const handleUpdateSolicitudPendiente = (id) => {
    navigate(`/GenerarEvento/${id}`);
  };
  return (
    <div className="dashboard-container">
      {perfilCoach && (
        <>
          <div className="button-container">
            <Link to="/GenerarEvento">
              <button className="crear-evento">➕ Crear Evento</button>
            </Link>
          </div>
          <div>
            <div className="eventos-section">
              <h4>📅 Mis Eventos Aprobados</h4>
              <div className="eventos-grid">
                {eventosAprobados.length > 0 ? (
                  eventosAprobados.map((evento) => (
                    <div className="evento-card" key={evento.id}>
                      <h3>{evento.tipoEvento}</h3>
                      <p>
                        <strong>Fecha Inicio:</strong> {evento.fechaInicio}
                      </p>
                      <p>
                        <strong>Fecha Fin:</strong> {evento.fechaFin}
                      </p>
                      <p>
                        <strong>Horario:</strong> {evento.horario}
                      </p>
                      <p>
                        <strong>Días:</strong> {evento.dias}
                      </p>
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
                      <p>
                        <strong>Fecha Inicio:</strong> {evento.fechaInicio}
                      </p>
                      <p>
                        <strong>Fecha Fin:</strong> {evento.fechaFin}
                      </p>
                      <p>
                        <strong>Horario:</strong> {evento.horario}
                      </p>
                      <p>
                        <strong>Días:</strong> {evento.dias}
                      </p>

                      <button
                        onClick={() =>
                          handleUpdateSolicitudPendiente(evento.id)
                        }
                        className="btnModificarMisSolicitudes"
                      >
                        <img src={iconEdit} alt="Editar" />
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="no-eventos">No hay eventos disponibles.</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {perfilRepecionista && (
        <div className="eventos-section">
          <h4>Solicitudes de aprobación</h4>
          <div className="eventos-grid">
            {eventosSolicitados.length > 0 ? (
              eventosSolicitados.map((evento) => (
                <div className="evento-card" key={evento.id}>
                  <h3>{evento.tipoEvento}</h3>
                  <p>
                    <strong>Fecha Inicio:</strong> {evento.fechaInicio}
                  </p>
                  <p>
                    <strong>Fecha Fin:</strong> {evento.fechaFin}
                  </p>
                  <p>
                    <strong>Horario:</strong> {evento.horario}
                  </p>
                  <p>
                    <strong>Días:</strong> {evento.dias}
                  </p>
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
