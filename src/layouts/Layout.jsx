import React from "react";
import "../assets/styles/Layout.css"; 
import { Link } from "react-router-dom"; // Para el menú de navegación

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <nav>
          <Link to="/Dashboard" className="nav-link">Eventos</Link>
          <Link to="/Somos" className="nav-link">¿Quienes Somos?</Link>
          <Link to="/UserGenerate" className="nav-link">Crear Usuario</Link>
        </nav>
      </header>

      <main className="main-content">{children}</main>

      <footer className="footer">
        <p>© 2025 GymShift. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;