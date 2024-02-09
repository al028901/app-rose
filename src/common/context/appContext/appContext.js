import React, { useState } from "react";
import PropTypes from "prop-types";

const MyContext = React.createContext(undefined);

const initialState = {
  webSocketIP: "",
  rosConnected: false,
  demo: true,
  rosInstance: undefined,
  rosTopics: [],
};
// Paso 2: Crear un proveedor para el contexto
const MyContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState); // VALOR INICIAL DEL ESTADO

  return (
    <MyContext.Provider value={getCtxValue(state, setState)}>
      {children}
    </MyContext.Provider>
  );
};
const getCtxValue = (state, setState) => {
  //todos los métodos accesibles desde RequestsContext
  // nos da la ultima respuesta devuelta por el servicio
  return {
    webSocketIP: state.webSocketIP,
    rosConnected: state.rosConnected,
    demo: state.demo,
    rosTopics: state.rosTopics,
    rosInstance: state.rosInstance,
    resetContext: () => {
      setState(initialState);
    },
    setWebSocketIP: (webSocketIP) => {
      setState({ ...state, webSocketIP: webSocketIP });
    },
    setRosConnected: (rosConnected) => {
      setState({ ...state, rosConnected: rosConnected });
    },
    setDemo: (demo) => {
      setState({ ...state, demo: demo });
    },
    setRosTopics: (rosTopics) => {
      setState({ ...state, rosTopics: rosTopics });
    },
    setRosInstance: (rosInstance) => {
      setState({ ...state, rosInstance: rosInstance });
    },
  };
};

// Paso 3: Crear un hook personalizado para acceder al contexto
const useMyContext = () => {
  const ctx = React.useContext(MyContext);
  if (ctx === undefined) throw new Error("Bad context implementation");
  return ctx;
};
MyContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export { MyContextProvider, useMyContext };
