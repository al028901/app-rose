import React, { useState } from 'react';

const InputComponent = ({ id }) => {
  
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div>
      <label htmlFor={id}>ROS connection status:</label>
      <input
        type="text"
        id={id}
        value={inputValue}
        onChange={handleChange}
        placeholder="ROS connection status"
      />
    
    </div>
  );
};

export default InputComponent;
