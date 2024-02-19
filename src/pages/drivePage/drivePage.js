import React, { useState, useEffect } from "react";
import loading from "../../assets/img/loading.gif";
import Nipple from "../../components/joystick/Nipple";
import { useMyContext } from "../../common/context/appContext/appContext";
import ImageViewer from "../../components/camera/ImageViewer";
import ROSLIB from "roslib";
import RobotArmPeacetolero from "../../components/robot/RobotArmPeacetolero";
const DrivePage = () => {
  const { webSocketIP, demo, rosInstance } = useMyContext();
  const [imageSrc, setImageSrc] = useState("");
  const [isSubscribeImageTopic, setIsSubscribeImageTopic] = useState(false);
  const [isSubscribeComdVel, setIsSubscribeComdVel] = useState(false);

  const [cmdVelPublisher, setcmdVelPublisher] = useState();

  useEffect(() => {
    if (
      demo !== undefined &&
      !demo &&
      rosInstance !== undefined &&
      rosInstance !== ""
    ) {
      if (!isSubscribeImageTopic) {
        const imageTopic = new ROSLIB.Topic({
          ros: rosInstance,
          name: "/webcam_image_compres",
          messageType: "sensor_msgs/CompressedImage",
        });
        imageTopic.subscribe((message) => {
          setIsSubscribeImageTopic(true);
          setImageSrc("data:image/jpeg;base64," + message.data);
        });
      }
      if (!isSubscribeComdVel) {
        setcmdVelPublisher(
          new ROSLIB.Topic({
            ros: rosInstance,
            name: "turtle1/cmd_vel",
            messageType: "geometry_msgs/Twist",
          })
        );
        setIsSubscribeComdVel(true);
      }
    }
  }, [demo, rosInstance]); // Se ejecuta solo una vez al montar el componente
  const [width, setWidth] = useState(200); // Ancho inicial
  const [height, setHeight] = useState(200); // Alto inicial

  const handleWidthChange = (e) => {
    setWidth(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };
  return (
    <>
      {webSocketIP}
      <div
        style={{
          border: "1px solid black",

          padding: "10px",
          display: "inline-block",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "10px" }}>
            <div>
              <label htmlFor="width">W: </label>
              <input
                type="number"
                id="width"
                value={width}
                size="4"
                onChange={handleWidthChange}
              />
            </div>
            <div>
              <label htmlFor="height">H: </label>
              <input
                type="number"
                id="height"
                value={height}
                size="4"
                onChange={handleHeightChange}
              />
            </div>
            {demo ? (
              <img
                style={{ width: `${width}px`, height: `${height}px` }}
                src={loading}
                alt="Descripción de la imagen"
              />
            ) : (
              imageSrc && <ImageViewer imageUrl={imageSrc} alt="ROS" />
            )}
          </div>
        </div>
      </div>
      <RobotArmPeacetolero />
      <Nipple
        cmdVelPublisher={cmdVelPublisher}
        id={"direction"}
        left={"30%"}
        top={"70%"}
        type={"linear"}
      />
      <Nipple
        cmdVelPublisher={cmdVelPublisher}
        type={"angular"}
        id={"velocity"}
        left={"70%"}
        top={"70%"}
      />
    </>
  );
};

export default DrivePage;
