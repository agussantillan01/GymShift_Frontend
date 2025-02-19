import React from "react";
import "../assets/styles/Header.css"; 

const Header = ({ title }) => {
  return (
    <header className="styleHeader">
      <h2>{title}</h2>
      <div className="divider" />
    </header>
  );
};

export default Header;