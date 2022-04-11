import React from 'react';
import './SearchBar.scss';

interface Props {
    searchValue: string;
    setSearchValue: React.Dispatch<React.SetStateAction<string>>;
    placeholder?: string;
}

const SearchBar = ({ searchValue, setSearchValue, placeholder }: Props) => {
    return (
        <div className="search-bar">
            <input
                className="search-bar__input"
                placeholder={placeholder}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <i className="search-bar__icon fas fa-search" />
        </div>
    );
};

export default SearchBar;
