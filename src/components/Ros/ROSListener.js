import React, { useEffect, useState } from "react";
import ROSLIB from "roslib";
const ROSListener = ({ topicName }) => {
  const [message] = useState(null);

  useEffect(() => {
    // Configuración de la conexión ROS
    const ros = new ROSLIB.Ros({
      url: "ws://192.168.92.128:9090", // Ajusta la URL según la configuración de tu servidor ROS
    });
    var txt_listener = new ROSLIB.Topic({
      ros: ros,
      name: "/txt_msg",
      messageType: "std_msgs/String",
    });

    txt_listener.subscribe(function (m) {
      document.getElementById("msg").innerHTML = m.data;
    });
  }, [topicName]);

  return (
    <div>
      <h3>{`Mensaje del topic ${topicName}:`}</h3>
      <p>{message || "Esperando mensaje..."}</p>
    </div>
  );
};

export default ROSListener;
