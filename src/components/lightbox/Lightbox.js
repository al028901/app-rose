import React, { useState } from "react";

const Lightbox = ({ imageUrl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openLightbox = () => {
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openLightbox}>ejemplo</button>

      {isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                fontSize: 20,
                color: "white",
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              X
            </button>
            <img
              src={imageUrl}
              alt="Imagen ampliada"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Lightbox;
