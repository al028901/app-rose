import React, { useState, useEffect } from "react";
import "../../styles/Joystick.css"; // Include a CSS file for styling (you can customize it)

const Joystick = ({ onMove }) => {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const [isJoystickActive, setIsJoystickActive] = useState(false);

  const handleStart = (event) => {
    setIsJoystickActive(true);
    handleMove(event);
  };
  const handleEnd = () => {
    setIsJoystickActive(false);
    setJoystickPosition({ x: 0, y: 0 });

    // Inform the parent component that the joystick is released
    onMove({ x: 0, y: 0 });
  };
  const handleMove = (event) => {
    if (isJoystickActive) {
      const boundingRect = event.currentTarget.getBoundingClientRect();
      const offsetX = event.clientX - boundingRect.left;
      const offsetY = event.clientY - boundingRect.top;

      const normalizedX =
        (offsetX - boundingRect.width / 2) / (boundingRect.width / 2);
      const normalizedY =
        (offsetY - boundingRect.height / 2) / (boundingRect.height / 2);

      setJoystickPosition({ x: normalizedX, y: normalizedY });

      // Pass joystick position to the parent component
      onMove({ x: normalizedX, y: normalizedY });
    }
  };

  useEffect(() => {
    // Ensure the joystick is released when the component unmounts
    const handleEnd = () => {
      setIsJoystickActive(false);
      setJoystickPosition({ x: 0, y: 0 });

      // Inform the parent component that the joystick is released
      onMove({ x: 0, y: 0 });
    };
    return () => {
      handleEnd();
    };
  }, []);

  return (
    <div>
      <div
        className="joystick"
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onTouchStart={handleStart}
        onTouchMove={handleMove}
        onTouchEnd={handleEnd}
      >
        <div
          className="joystick-handle"
          style={{
            transform: `translate(${joystickPosition.x * 50}px, ${
              joystickPosition.y * 50
            }px)`,
          }}
        ></div>
      </div>

      <div></div>
    </div>
  );
};

export default Joystick;
