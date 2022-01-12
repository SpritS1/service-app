import React from "react";
import "./App.scss";
import Header from "components/Header/Header";
import TopSection from "components/TopSection/TopSection";
import FilterSection from "./FilterSection/FilterSection";
import SideBar from "./SideBar/SideBar";

interface Props {}

const App = (props: Props) => {
  return (
    <div className="app">
      <Header />
      {/* <SideBar /> */}
      <TopSection />
      <FilterSection />
    </div>
  );
};

export default App;
