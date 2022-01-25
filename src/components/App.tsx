import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import DevicesPage from "components/DevicesPage/DevicesPage";
import AuthorizationPage from "./AuthorizationPage/AuthorizationPage";

interface Props {}

const App = (props: Props) => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route index element={<DevicesPage />} />
          <Route path="/auth/:authType" element={<AuthorizationPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
