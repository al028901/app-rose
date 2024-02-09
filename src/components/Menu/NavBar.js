import styled from "styled-components";

import React, { useEffect } from "react";
import { useMyContext } from "../../common/context/appContext/appContext";
import { Link } from "react-router-dom";
import ROSLIB from "roslib";

import LightboxROS from "../lightbox/LightboxROS";

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  padding: 1rem;
`;

const NavItem = styled.li`
  list-style: none;
  margin: 0 1rem;

  a {
    color: #fff;
    text-decoration: none;
    transition: all 0.3s ease;

    &:hover {
      color: #bada55;
    }
  }
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  margin: 0;
`;

const MobileNavToggle = styled.button`
  display: block;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #bada55;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const DesktopNav = styled.ul`
  display: flex;
  flex-direction: row;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MobileNav = styled.ul`
  display: none;
  flex-direction: column;
  margin: 0;
  padding: 0;

  @media (max-width: 767px) {
    display: flex;
  }
`;

const NavBar = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const [isconfigReady, setIsConfigReady] = React.useState(false);
  const {
    webSocketIP,
    setWebSocketIP,
    setRosInstance,
    setRosConnected,
    demo,
    setRosTopics,
    setDemo,
    rosInstance,
  } = useMyContext();

  useEffect(() => {
    if (demo !== undefined && !demo) {
      const loadConfigFile = async () => {
        try {
          const response = await fetch("/../../settings.json");
          const data = await response.json();
          setWebSocketIP(data.webSocketIP);
          setIsConfigReady(true);
        } catch (error) {
          console.error("Error loading config file:", error);
        }
      };
      loadConfigFile();
    }
  }, [demo]);
  useEffect(() => {
    // Configuración de la conexión ROS
    if (
      demo !== undefined &&
      !demo &&
      webSocketIP !== undefined &&
      webSocketIP !== "" &&
      isconfigReady !== undefined &&
      isconfigReady
    ) {
      setRosTopics([]);

      if (rosInstance === undefined) {
        const ros = new ROSLIB.Ros({
          url: "ws://" + webSocketIP,
        });
        setRosInstance(ros);
      }
    } else {
      setRosTopics(["demo/topic1@@type1 ", "demo/topic2@@type2"]);

      setRosInstance(undefined);
    }
  }, [demo, webSocketIP, isconfigReady]);
  useEffect(() => {
    // Configuración de la conexión ROS
    if (demo !== undefined && !demo && rosInstance !== undefined) {
      setRosTopics([]);

      rosInstance.on("error", function (error) {
        console.log(" Error conexion=" + error);
        setRosConnected(false);
        setRosTopics([]);
      });
      rosInstance.on("connection", function () {
        setRosConnected(true);
      });
      // Obtener la lista de topics
      rosInstance.getTopics((result) => {
        const listaFusionada = result.topics.map((topic, index) => ({
          topic,
          type: result.types[index],
        }));
        setRosTopics(listaFusionada);
      });
    } else {
      setRosTopics(["demo/topic1@@type1 ", "demo/topic2@@type2"]);
      setRosConnected(false);
    }
  }, [rosInstance]);

  const handleSubmitDemo = (event) => {
    let value = event.currentTarget.checked;
    setDemo(value);
  };

  return (
    <>
      <Nav>
        <Logo>T.ROSIE</Logo>
        <MobileNavToggle onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}>
          {isMobileNavOpen ? "Close" : "Menu"}
        </MobileNavToggle>
        <DesktopNav>
          <NavItem>
            <Link to={"/drive"}>Drive</Link>
          </NavItem>
          <NavItem>
            <Link to={"/control"}>Robot Control</Link>
          </NavItem>
          <NavItem>
            <Link to={"/tech"}>TechPage</Link>
          </NavItem>
          <NavItem>
            <Link to={"/settings"}>Settings</Link>
          </NavItem>
        </DesktopNav>
        <MobileNav style={{ display: isMobileNavOpen ? "flex" : "none" }}>
          <NavItem>
            <Link to={"/drive"}>Drive</Link>
          </NavItem>
          <NavItem>
            <Link to={"/control"}>Robot Control</Link>
          </NavItem>
          <NavItem>
            <Link to={"/tech"}>TechPage</Link>
          </NavItem>
          <NavItem>
            <Link to={"/settings"}>Settings</Link>
          </NavItem>
        </MobileNav>
        <div>
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              checked={demo}
              id="flexSwitchCheckChecked"
              onChange={handleSubmitDemo}
            ></input>
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              Demo
            </label>
          </div>
          <LightboxROS />
        </div>
      </Nav>
    </>
  );
};
export default NavBar;
