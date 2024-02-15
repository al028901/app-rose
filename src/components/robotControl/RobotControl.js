import React from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
//import PointCloudViewer from "../visualComponents/Three";
import Arm3D from "../Ros/Arm3D";
import RobotArmSimulation from "../robot/RobotArmSimulation";

const RobotControl = () => {
  return (
    <div>
      <Container>
        <h1>Módulos</h1>
        <Row>
          <Col sm={6} md={6}>
            <Card>
              <Card.Body>
                <Card.Header>Camera </Card.Header>
                <Card.Title>Robot Control</Card.Title>
                <Card.Text>
                  <RobotArmSimulation />{" "}
                </Card.Text>
                <Card.Footer>Camera Footer</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={6}>
            <Card>
              <Card.Body>
                <Card.Header>Camera </Card.Header>
                <Card.Title>Robot Control</Card.Title>
                <Card.Text>
                  <Arm3D />{" "}
                </Card.Text>
                <Card.Footer>Camera Footer</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          {/*       <Col sm={6} md={6}>
            <Card>
              <Card.Body>
                <Card.Header>pointCloud </Card.Header>
                <Card.Title>pointCloud</Card.Title>
                <Card.Text>
                  <div id="pointCloud">
                    <PointCloudViewer />
                  </div>
                </Card.Text>
                <Card.Footer>pointCloud Footer </Card.Footer>
              </Card.Body>
            </Card>
          </Col> */}
          <Col sm={6} md={6}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default RobotControl;
