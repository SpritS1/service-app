import React from "react";
import "./App.scss";
import DevicesPage from "components/DevicesPage/DevicesPage";
import AuthorizationPage from "./AuthorizationPage/AuthorizationPage";

interface Props {}

const App = (props: Props) => {
  return (
    <div className="app">
      {/* <DevicesPage /> */}
      <AuthorizationPage />
    </div>
  );
};

export default App;
