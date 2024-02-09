import React from 'react';
import '../../styles/Loader.css'; // Asegúrate de tener un archivo de estilos (puedes ajustar según tus necesidades)

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Cargando...</p>
    </div>
  );
};

export default Loader;
