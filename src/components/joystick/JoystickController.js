import React, { useState } from "react";
import Joystick from "./Joystick"; // Assuming the Joystick component is in the same directory

const JoystickController = () => {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

  const handleJoystickMove = (position) => {
    // Handle joystick movement updates here
    setJoystickPosition(position);
    console.log("enviar" + position);
  };

  return (
    <div>
      <h1>Joystick Controller</h1>
      <div>
        {/* Render the Joystick component and pass the onMove callback */}
        <Joystick onMove={handleJoystickMove} />
      </div>
      <div>
        <p>Joystick Position:</p>
        <p>X: {joystickPosition.x.toFixed(2)}</p>
        <p>Y: {joystickPosition.y.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default JoystickController;
