import React from "react";
import "../assets/styles/Layout.css";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <aside className="sidebar">
        <h1 className="sidebar-title">GymShift 💪🏽</h1> 
        <nav className="sidebar-nav">
          <Link to="/Dashboard" className="nav-link">Eventos</Link>
          <Link to="/Somos" className="nav-link">¿Quienes Somos?</Link>
          <Link to="/UserGenerate" className="nav-link">Crear Usuario</Link>
        </nav>
        <button className="logout-button">Log Out</button> 
      </aside>

      <main className="main-content">{children}</main>

    </div>
  );
};

export default Layout;