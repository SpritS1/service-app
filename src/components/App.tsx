import React from "react";
import "./App.scss";
import Header from "components/Header/Header";
import TopSection from "components/TopSection/TopSection";
import FilterSection from "./FilterSection/FilterSection";
import Table from "./Table/Table";
import HeaderDesktop from "./HeaderDesktop/HeaderDesktop";

interface Props {}

const App = (props: Props) => {
  return (
    <div className="app">
      <Header />
      <HeaderDesktop />
      <TopSection />
      <FilterSection />
      <Table />
    </div>
  );
};

export default App;
