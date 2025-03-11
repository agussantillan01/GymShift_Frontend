import React from "react";
import Layout from "../layouts/Layout" 
import { Link } from "react-router-dom"; // Agregar useNavigate

import "../assets/styles/Dashboard.css";
const Dashboard = () => {
  return (
        <div className="Eventos-container">
          <div className="alignButton">
            <Link to="/GenerarEvento">
              <button className="button-crearEvento">Crear Evento</button>
            </Link>
          </div>

          <div className="MisEventos-container">
            <h2>Mis Clases</h2>
          </div>

        </div>
  );
};

export default Dashboard;