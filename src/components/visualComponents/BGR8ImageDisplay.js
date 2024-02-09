import React, { useRef, useEffect } from "react";

const BGR8ImageDisplay = ({ imageData, width, height }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && imageData) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      // Create an ImageData object
      const imageDataObject = new ImageData(
        new Uint8ClampedArray(imageData),
        width,
        height
      );

      // Draw the image data on the canvas
      ctx.putImageData(imageDataObject, 0, 0);
    }
  }, [canvasRef, imageData, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} />;
};

export default BGR8ImageDisplay;
