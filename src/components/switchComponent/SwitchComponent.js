import React from "react";

import PropTypes from "prop-types";

const SwitchComponent = (props) => {
  return (
    <div>
      <label>
        {props.desc}
        <input type="checkbox" checked={props.id} onChange={props.onChange} />
      </label>

      {/*props.id ? (
        <p>El interruptor está encendido.</p>
      ) : (
        <p>El interruptor está apagado.</p>
      )*/}
    </div>
  );
};

export default SwitchComponent;
SwitchComponent.propTypes = {
  id: PropTypes.bool,
  desc: PropTypes.string,
  onChange: PropTypes.func,
};
