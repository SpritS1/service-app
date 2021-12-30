import React from "react";
import "./App.scss";
import Header from "components/Header/Header";

interface Props {}

const App = (props: Props) => {
  return (
    <div className="app">
      <Header />
    </div>
  );
};

export default App;
