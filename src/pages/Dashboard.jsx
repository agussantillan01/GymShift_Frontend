import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Dashboard.css";
import { GetEventoXCoach } from "../api/EventosService";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [eventos, setEventos] = useState([]);

  const tienePermiso = user?.usuario.permissions?.includes("evento.create");

  useEffect(() => {
    if (user?.usuario?.id) {
      console.log("📩 Obteniendo eventos del coach con ID:", user.usuario.id);
      GetEventoXCoach(user.usuario.id)
        .then((data) => {
          setEventos(data);
          console.log("Eventos recibidos:", data);
        })
        .catch((error) => {
          console.error(" Error obteniendo eventos:", error.message);
        });
    }
  }, [user?.usuario?.id]); 

  return (
    <div className="Eventos-container">
      {tienePermiso && (
        <div>
          <div className="alignButton">
            <Link to="/GenerarEvento">
              <button className="button-crearEvento">Crear Evento</button>
            </Link>
          </div>
          <div className="MisEventos-container">
            <h2>Mis Clases</h2>
            <ul>
              {eventos.length > 0 ? (
                eventos.map((evento) => (
                  <li key={evento.id}>{evento.nombre}</li>
                ))
              ) : (
                <p>No hay eventos disponibles.</p>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
