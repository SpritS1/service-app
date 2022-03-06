import React from 'react';
import './FilterSection.scss';
import SearchBar from 'components/SearchBar/SearchBar';
import SortBy from 'components/SortBy/SortBy';

interface Props {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
}

const FilterSection = ({ searchValue, setSearchValue }: Props) => {
    return (
        <div className="filter-section">
            {/* <SortBy /> */}
            <SearchBar
                searchValue={searchValue}
                setSearchValue={setSearchValue}
            />
        </div>
    );
};

export default FilterSection;
