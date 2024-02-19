import React from "react";
import "../../css/robotArm.css";
import PropTypes from "prop-types";

const RobotArm = (props) => {
  return (
    <div className="robot-arm">
      <div className="base">
        <div
          className="joint"
          style={{ transform: "rotate(" + props.angle1 + "deg)" }}
        >
          <div
            className="arm"
            style={{ transform: "rotate(" + props.angle1 + "deg)" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default RobotArm;
RobotArm.propTypes = {
  angle1: PropTypes.number,
  angle2: PropTypes.number,
};
