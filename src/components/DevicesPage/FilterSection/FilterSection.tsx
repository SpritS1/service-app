import React from "react";
import "./FilterSection.scss";
import SearchBar from "components/DevicesPage/FilterSection/SearchBar/SearchBar";
import SortBy from "components/DevicesPage/FilterSection/SortBy/SortBy";

interface Props {}

const FilterSection = (props: Props) => {
  return (
    <div className="filter-section">
      <SortBy />
      <SearchBar />
    </div>
  );
};

export default FilterSection;
