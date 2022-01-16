import React from "react";
import "./App.scss";
import Header from "components/Header/Header";
import HeaderDesktop from "components/HeaderDesktop/HeaderDesktop";
import DevicesPage from "components/DevicesPage/DevicesPage";

interface Props {}

const App = (props: Props) => {
  return (
    <div className="app">
      <Header />
      <HeaderDesktop />
      <DevicesPage />
    </div>
  );
};

export default App;
