import React, { useEffect, useState } from "react";
import { useMyContext } from "../../common/context/appContext/appContext";

const LoadSettings = () => {
  const { setWebSocketIP } = useMyContext();

  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    const loadConfigFile = async () => {
      try {
        const response = await fetch("/../../settings.json");
        const data = await response.json();
        setWebSocketIP(data.webSocketIP);

        setJsonData(JSON.stringify(data, null, 2));
      } catch (error) {
        console.error("Error loading config file:", error);
      }
    };

    loadConfigFile();
  }, []);

  // Manejar cambios en el textarea
  const handleInputChange = (event) => {
    setJsonData(event.target.value);
  };

  // Manejar clic en el botón de guardar
  const handleSaveClick = () => {
    try {
      const parsedData = JSON.parse(jsonData);
      // Puedes hacer algo con el JSON parseado, como enviarlo a un servidor o actualizar el estado de tu aplicación
      console.log("JSON parseado:", parsedData);
    } catch (error) {
      console.error("Error al analizar JSON:", error);
    }
  };

  return (
    <div>
      <h1>Settings</h1>

      <textarea
        rows={10}
        cols={50}
        value={jsonData}
        onChange={handleInputChange}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <button onClick={handleSaveClick}>Guardar</button>
    </div>
  );
};

export default LoadSettings;
