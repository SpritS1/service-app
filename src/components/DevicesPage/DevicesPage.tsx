import React from "react";
import TopSection from "components/DevicesPage/TopSection/TopSection";
import FilterSection from "components/DevicesPage/FilterSection/FilterSection";
import Table from "components/DevicesPage/DevicesTable/DevicesTable";

interface Props {}

const DevicesPage = (props: Props) => {
  return (
    <div className="devices-page">
      <TopSection />
      <FilterSection />
      <Table />
    </div>
  );
};

export default DevicesPage;
