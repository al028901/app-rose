import React, { useState } from "react";
import JoyStick from "react-joystick";
import "../../styles/Joystick.css"; // Include a CSS file for styling (you can customize it)

const JoyWrapper = () => {
  const [state, setState] = useState({ positionX: 0, positionY: 0 });

  const managerListener = (manager) => {
    manager.on("move", (e, stick) => {
      setState({
        positionX: manager[0].frontPosition.y,
        positionY: manager[0].frontPosition.x,
      });

      console.log("positionX =" + state.positionX);
      console.log("positionY =" + state.positionY);
      console.log("manager X =" + manager[0].frontPosition.x);
      console.log("manager Y =" + manager[0].frontPosition.y);
      console.log(joyOptions);
    });
    manager.on("end", () => {
      console.log("I ended!");
    });
  };

  const joyOptions = {
    // Zone où mettre le joystick (element HTML zone: getElementById('myid')) :
    //  zone: Element,
    // Valid CSS color :
    color: "#123456",
    // Default to 100 :
    size: 100,
    // Defaults to 0.1 (0 -> 1) :
    //  threshold: Float,
    // Defaults to 250 :
    //  fadeTime: 200,
    // Defaults to false (no multitouch for 'static' or 'semi' modes) :
    //  multitouch: Boolean,
    // Defaults to 1 (with mutlitouch) :
    //  maxNumberOfNipples: 1,
    // Defaults to false (rien compris, à tester) :
    //  dataOnly: Boolean,
    // Defaults to {top: 0, left: 0} (static mode) ex: {left: '10%', bottom: '10%'} :
    // position: { top: "700px", left: "700px" },
    // Defaults to ‘dynamic’ (other : 'static' or 'semi') :
    mode: "static",
    // Reset joystick position (defaults to true) :
    restJoystick: true,
    // Defaults to 0.5 (not with 'dynamics' mode) :
    restOpacity: 0.5,
    // Defaults to 200 (which distance we recycle the previous js - 'semi' mode) :
    catchDistance: 0,
    // defaults to false (locks movement to the X axis)
    lockX: true,
    // defaults to false (locks movement to the Y axis)
    lockY: true,
  };

  const containerStyle = {
    //position: "absolute",
    height: "100px",
    width: "100px",
    background: "red",
  };
  return (
    <div>
      <JoyStick
        joyOptions={joyOptions}
        containerStyle={containerStyle}
        managerListener={managerListener}
      />
    </div>
  );
};

export default JoyWrapper;
