import React, { useState } from "react";
import ROSLIB from "roslib";
import { useMyContext } from "../../common/context/appContext/appContext";
const ROSPublish = ({ topicName }) => {
  const [mensaje, setMensaje] = useState("");
  const [estado, setEstado] = useState("Sin enviar");
  const { webSocketIP } = useMyContext();
  const handleInputChange = (event) => {
    setMensaje(event.target.value);
  };

  const enviarMensaje = () => {
    const ros = new ROSLIB.Ros({
      url: { webSocketIP }, // Ajusta la URL según la configuración de tu servidor ROS
    });

    const publicador = new ROSLIB.Topic({
      ros: ros,
      name: topicName,
      messageType: "geometry_msgs/Twist", // Ajusta el tipo de mensaje según tu caso
    });

    const mensajeROS = new ROSLIB.Message({
      linear: {
        x: 1,
        y: 0,
        z: 0,
      },
      angular: {
        x: 0,
        y: 0,
        z: 0,
      },
    });

    publicador.publish(mensajeROS);
    setEstado("Enviado");
  };

  return (
    <div>
      <label htmlFor="mensaje">Mensaje:</label>
      <input
        type="text"
        id="mensaje"
        value={mensaje}
        onChange={handleInputChange}
      />
      <button onClick={enviarMensaje}>Enviar a {topicName}</button>
      <p>Estado: {estado}</p>
    </div>
  );
};

export default ROSPublish;
