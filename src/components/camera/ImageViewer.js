import React, { useState } from "react";
import PropTypes from "prop-types";
const ImageViewer = (props) => {
  const [size, setSize] = useState({ width: "50%", height: "50%" });

  const handleMouseDown = (e) => {
    const initialX = e.clientX;
    const initialY = e.clientY;

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - initialX;
      const deltaY = e.clientY - initialY;

      setSize((prevSize) => ({
        width: prevSize.width + deltaX,
        height: prevSize.height + deltaY,
      }));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div>
      <img
        src={props.imageUrl}
        alt="Resizable"
        style={{ width: size.width, height: size.height }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default ImageViewer;
ImageViewer.propTypes = {
  imageUrl: PropTypes.string,
};
