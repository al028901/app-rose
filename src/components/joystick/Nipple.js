import nipplejs from "nipplejs";
import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../../styles/control.css";
import { useMyContext } from "../../common/context/appContext/appContext";

import ROSLIB from "roslib";

const Nipple = (props) => {
  const [linearVelocity, setLinearVelocity] = useState(0.0);
  const [angularVelocity, setAngularVelocity] = useState(0.0);
  const [distance, setDistance] = useState(0.0);
  const [onPresure, setOnPresure] = useState(false);
  const progressTimer = useRef();
  const { demo } = useMyContext();

  function publish(linearVelocity, angularVelocity, distance) {
    let xVal = linearVelocity.x + (linearVelocity.x * distance) / 100;
    let yVal = linearVelocity.y + (linearVelocity.y * distance) / 100;

    if ("linear" === props.type) {
      xVal = 0.0;
      yVal = 0.0;
    } else {
      angularVelocity = 0.0;
    }
    const twist = new ROSLIB.Message({
      linear: { x: xVal, y: yVal, z: 0.0 },
      angular: { x: 0.0, y: 0.0, z: angularVelocity },
    });
    if (props.cmdVelPublisher !== undefined) {
      console.log("publish");
      props.cmdVelPublisher.publish(twist);
    }
  }

  useEffect(() => {
    if (!demo) {
      // Función para enviar el comando de velocidad

      progressTimer.current = setInterval(
        publish(linearVelocity, angularVelocity, distance),
        50
      );
    }
  }, [demo, onPresure, distance, linearVelocity, angularVelocity]);

  const sId = (sel) => {
    return document.getElementById(sel);
  };

  useEffect(() => {
    const joystick = nipplejs.create({
      zone: document.getElementById(props.id),
      mode: "static",
      position: { left: props.left, top: props.top },
      color: "red",
      size: "150",
    });

    joystick
      .on("start end", function (evt, data) {
        //console.log(evt.type);
        //debug(data);
      })
      .on("move", function (evt, data) {
        //console.log("move" + data.distance);

        setDistance(data.distance);
        setLinearVelocity(data.vector);
        setAngularVelocity(data.angle.radian);
      })
      .on(
        "dir:up plain:up dir:left plain:left dir:down " +
          "plain:down dir:right plain:right",
        function (evt, data) {
          //console.log(evt.type);
        }
      )
      .on("pressure", function (evt, data) {
        console.log({
          //pressure: data,
        });
        setOnPresure(!onPresure);
      });
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col md="auto">
            {" "}
            <div className="border" id={props.id}></div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Nipple;
Nipple.propTypes = {
  left: PropTypes.string,
  top: PropTypes.string,
  id: PropTypes.string,
  cmdVelPublisher: PropTypes.object,
  type: PropTypes.string,
};
