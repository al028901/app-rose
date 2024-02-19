import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
//import PointCloudViewer from "../visualComponents/Three";
import Arm3D from "../Ros/Arm3D";
import RobotArmSimulation from "../robot/RobotArmSimulation";

import RobotArmPeacetolero from "../robot/RobotArmPeacetolero";

const RobotControl = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <RobotArmPeacetolero />
    </div>
  );
};

export default RobotControl;
