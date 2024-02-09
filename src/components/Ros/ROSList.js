import React, { useState } from "react";

import { useMyContext } from "../../common/context/appContext/appContext";

const ROSList = () => {
  const { rosTopics } = useMyContext();

  // Estado para almacenar la opción seleccionada
  const [selectedOptionTopic, setSelectedOptionTopic] = useState("");

  const handleOptionChangeTopic = (event) => {
    setSelectedOptionTopic(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">Topics:</label>
      <select
        id="dropdown"
        value={selectedOptionTopic}
        onChange={handleOptionChangeTopic}
      >
        <option value="">-- Selecciona --</option>
        {rosTopics.map((option, index) => (
          <option key={index} value={option.topic}>
            {option.topic}
          </option>
        ))}
      </select>
      {selectedOptionTopic && <p>Has seleccionado: {selectedOptionTopic}</p>}
    </div>
  );
};

export default ROSList;
