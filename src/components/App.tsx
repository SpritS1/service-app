import React from "react";
import "./App.scss";
import Header from "components/Header/Header";
import TopSection from "components/TopSection/TopSection";
import FilterSection from "./FilterSection/FilterSection";

interface Props {}

const App = (props: Props) => {
  return (
    <div className="app">
      <Header />
      <TopSection />
      <FilterSection />
    </div>
  );
};

export default App;
