import React, { useEffect, useState } from "react";

const PropiedadesReader = () => {
  const [properties, setProperties] = useState(null);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    cargarPropiedades();
  }, []);

  const cargarPropiedades = async () => {
    try {
      const response = await fetch("../../settings.properties");
      const data = await response.text();

      // Parsear las propiedades
      const parsedProperties = parseProperties(data);
      setProperties(parsedProperties);
    } catch (error) {
      console.error("Error al cargar el archivo de propiedades:", error);
    }
  };

  const parseProperties = (propertiesString) => {
    const lines = propertiesString.split("\n");
    const parsedProperties = {};

    lines.forEach((line) => {
      const keyValue = line.split("=");
      if (keyValue.length === 2) {
        const key = keyValue[0].trim();
        const value = keyValue[1].trim();
        parsedProperties[key] = value;
      }
    });

    return parsedProperties;
  };

  return (
    <div>
      {properties && (
        <div>
          <h2>Propiedades:</h2>
          <ul>
            {Object.entries(properties).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PropiedadesReader;
