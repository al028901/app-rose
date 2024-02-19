import React, { useState } from "react";
import PropTypes from "prop-types";

const InputComponent = (props) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor={props.id}>ROS connection status:</label>
      <input
        type="text"
        id={props.id}
        value={inputValue}
        onChange={handleChange}
        placeholder="ROS connection status"
      />
    </div>
  );
};

export default InputComponent;
InputComponent.propTypes = {
  id: PropTypes.string,
};
