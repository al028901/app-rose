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
export const getProperty = async (name) => {
  try {
    const response = await fetch("../../../../settings.properties");
    const data = await response.text();

    // Parsear las propiedades
    const parsedProperties = parseProperties(data);
    return parsedProperties.getPropertie(name);
  } catch (error) {
    console.error("Error al cargar el archivo de propiedades:", error);
  }
};
