import React, { useState } from "react";

const DropdownTab = () => {
  // Estado para rastrear si la pestaña está abierta o cerrada
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Función para cambiar el estado de la pestaña
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      {/* Encabezado de la pestaña */}
      <div
        style={{ cursor: "pointer", padding: "10px", border: "1px solid #ccc" }}
        onClick={toggleDropdown}
      >
        <strong>Desplegable</strong>
      </div>

      {/* Contenido de la pestaña (se muestra/oculta según el estado) */}
      {isDropdownOpen && (
        <div style={{ border: "1px solid #ccc", padding: "10px" }}>
          <p>Contenido de la pestaña desplegable...</p>
        </div>
      )}
    </div>
  );
};

export default DropdownTab;
