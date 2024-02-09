import React from "react";
import "../../styles/TopMenu.css"; // Asegúrate de tener un archivo de estilos (puedes ajustar según tus necesidades)
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
const TopMenu = () => {
  return (
    <div className="top-menu">
      <div className="menu-item">
        <Link to="/control">Robot Control</Link>
      </div>
      <div className="menu-item">
        <Link to="/tech">TechPage</Link>
      </div>
      <div className="menu-item">
        <Link to="/settings">Settings</Link>
      </div>
      <div className="menu-item">
        <Link to="/drive">Drive</Link>
      </div>
      <div className="menu-item">Contacto</div>
    </div>
  );
};

export default TopMenu;
