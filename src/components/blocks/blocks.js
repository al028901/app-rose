import React from "react";
import "../../index.css"; // Asegúrate de tener un archivo de estilos (puedes ajustar según tus necesidades)
import InputComponent from "../visualComponents/InputComponent";

const PantallaDividida = () => {
  return (
    <div className="contenedor">
      <div className="block block1">
        <div>
          <InputComponent id="status" />
        </div>
      </div>
    </div>
  );
};

export default PantallaDividida;
