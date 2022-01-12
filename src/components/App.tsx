import React from "react";
import "./App.scss";
import Header from "components/Header/Header";
import TopSection from "components/TopSection/TopSection";
import FilterSection from "./FilterSection/FilterSection";
import SideBar from "./SideBar/SideBar";
import Table from "./Table/Table";

interface Props {}

const App = (props: Props) => {
  return (
    <div className="app">
      <Header />
      <TopSection />
      <FilterSection />
      <Table />
    </div>
  );
};

export default App;
