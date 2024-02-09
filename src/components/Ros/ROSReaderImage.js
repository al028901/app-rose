import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";
import { useMyContext } from "../../common/context/appContext/appContext";

const ROSReader = ({ topicName }) => {
  const [message, setMessage] = useState(null);
  const { webSocketIP } = useMyContext();
  useEffect(() => {
    // Configuración de la conexión ROS
    const ros = new ROSLIB.Ros({
      url: webSocketIP, // Ajusta la URL según la configuración de tu servidor ROS
    });
    ros.on("error", function (error) {
      console.log(error);
    });
    ros.on("connection", function () {
      console.log("connected");
      document.getElementById("status").value = "Connected";
    });

    // Configuración del suscriptor al topic
    const listener = new ROSLIB.Topic({
      ros: ros,
      name: topicName,
      messageType: "sensor_msgs/Image", // Ajusta el tipo de mensaje según tu caso
    });

    // Manejador de mensajes
    listener.subscribe((message) => {
      setMessage(message.data);
    });

    // Cierre del suscriptor cuando el componente se desmonta
    return () => {
      listener.unsubscribe();
    };
  }, [topicName]);

  return (
    <div>
      <h3>{`Mensaje del topic ${topicName}:`}</h3>
      <p>la imagen = {message}</p>
    </div>
  );
};

export default ROSReader;
