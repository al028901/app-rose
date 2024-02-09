import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SettingsPage from "./pages/settingsPage/settingsPage";
import TechPage from "./pages/techPage/techPage";
import NavBar from "./components/Menu/NavBar";
import DrivePage from "./pages/drivePage/drivePage";
import RobotControlPage from "./pages/robotControlPage/robotControlPage";
import { MyContextProvider } from "./common/context/appContext/appContext";

function App() {
  return (
    <div>
      <div>
        <BrowserRouter>
          <MyContextProvider>
            <NavBar />
            <Routes>
              <Route exact path="/" element={<DrivePage />}></Route>
              <Route
                exact
                path="/control"
                element={<RobotControlPage />}
              ></Route>
              <Route exact path="/tech" element={<TechPage />}></Route>
              <Route exact path="/settings" element={<SettingsPage />}></Route>
              <Route exact path="/drive" element={<DrivePage />}></Route>
            </Routes>
          </MyContextProvider>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
