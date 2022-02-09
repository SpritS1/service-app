import React from "react";
import "./DevicesPage.scss";
import TopSection from "components/TopSection/TopSection";
import FilterSection from "components/FilterSection/FilterSection";
import Table from "components/DevicesTable/DevicesTable";
import Header from "components/Header/Header";
import HeaderDesktop from "components/HeaderDesktop/HeaderDesktop";

interface Props {}

const DevicesPage = (props: Props) => {
  return (
    <div className="devices-page">
      <Header />
      <HeaderDesktop />
      <TopSection />
      <FilterSection />
      <Table />
    </div>
  );
};

export default DevicesPage;
