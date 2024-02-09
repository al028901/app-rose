import { Route, BrowserRouter, Routes } from "react-router-dom";
import App from "./App";

import SettingsPage from "./pages/settingsPage/settingsPage";
import { MyContextProvider } from "./common/context/appContext/appContext";

const routes = () => (
  <BrowserRouter>
    <MyContextProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<SettingsPage />} />
        </Route>
      </Routes>
    </MyContextProvider>
  </BrowserRouter>
);

export default routes;
