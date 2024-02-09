import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";

const ROSReader = ({ topicName }) => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Configuración de la conexión ROS
    const ros = new ROSLIB.Ros({
      url: "ws://192.168.92.128:9090", // Ajusta la URL según la configuración de tu servidor ROS
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
      messageType: "geometry_msgs/Twist", // Ajusta el tipo de mensaje según tu caso
    });

    // Manejador de mensajes
    listener.subscribe((message) => {
      setMessage(message.linear.x);
    });

    // Cierre del suscriptor cuando el componente se desmonta
    return () => {
      listener.unsubscribe();
    };
  }, [topicName]);

  return (
    <div>
      <h3>{`Mensaje del topic ${topicName}:`}</h3>
      <p>{message}</p>
    </div>
  );
};

export default ROSReader;
