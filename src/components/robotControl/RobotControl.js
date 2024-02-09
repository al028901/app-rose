import React, { useState, useEffect } from "react";

import { Container, Row, Col, Card } from "react-bootstrap";
import PointCloudViewer from "../visualComponents/Three";

const RobotControl = () => {
  const [setConfigData] = useState(null);
  async function fetchMyDocument() {
    try {
      let response = await fetch("../../../src/indexRobot.html"); // Gets a promise
      document.body.innerHTML = await response.text(); // Replaces body with response
    } catch (err) {
      console.log("Fetch error:" + err); // Error handling
    }
  }
  useEffect(() => {
    const loadConfigFile = async () => {
      try {
        const response = await fetch(indexRobot);
        const data = await response.json();
        setConfigData(data);
      } catch (error) {
        console.error("Error loading config file:", error);
      }
    };

    loadConfigFile();
    fetchMyDocument();
  }, []); // Se ejecuta solo una vez al montar el componente

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
                <Card.Text></Card.Text>
                <Card.Footer>Camera Footer</Card.Footer>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} md={6}>
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
          </Col>
          <Col sm={6} md={6}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default RobotControl;
