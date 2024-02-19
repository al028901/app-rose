import React, { useState } from "react";
import ROSList from "../Ros/ROSList";
import { useMyContext } from "../../common/context/appContext/appContext";
import SwitchComponent from "../switchComponent/SwitchComponent";
const LightboxROS = () => {
  const { setRosConnected, setDemo, rosConnected, demo, webSocketIP } =
    useMyContext();
  const [isOpen, setIsOpen] = useState(false);
  const openLightbox = () => {
    setIsOpen(!isOpen);
  };

  let offsetX, offsetY;
  const move = (e) => {
    const el = e.target;
    el.style.left = `${e.pageX - offsetX}px`;
    el.style.top = `${e.pageY - offsetY}px`;
  };
  const add = (e) => {
    const el = e.target;
    offsetX = e.clientX - el.getBoundingClientRect().left;
    offsetY = e.clientY - el.getBoundingClientRect().top;
    el.addEventListener("mousemove", move);
  };
  const remove = (e) => {
    const el = e.target;
    el.removeEventListener("mousemove", move);
  };
  const handleSubmitDemo = (event) => {
    let value = event.currentTarget.checked;
    setDemo(value);
  };
  const handleSubmitConnection = (event) => {
    let value = event.currentTarget.checked;
    setRosConnected(value);
  };
  return (
    <div>
      <button onClick={openLightbox}>ROS</button>

      {isOpen && (
        <div
          onMouseDown={add}
          onMouseUp={remove}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "50%",
            height: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(117, 73, 73, 0.7)",
            }}
          >
            <SwitchComponent
              desc="Demo"
              id={demo}
              onChange={handleSubmitDemo}
            />
            <br></br>
            <SwitchComponent
              desc="Ros Coneccted"
              id={rosConnected}
              onChange={handleSubmitConnection}
            />{" "}
            {webSocketIP}
            <ROSList />
          </div>
        </div>
      )}
    </div>
  );
};

export default LightboxROS;
