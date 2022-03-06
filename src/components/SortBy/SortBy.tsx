import React from 'react';
import './SortBy.scss';
import SelectButton from 'components/SelectButton/SelectButton';

interface Props {
    sortBy: string;
    setSortBy: React.Dispatch<React.SetStateAction<any>>;
    sortingOptions: string[];
}

const SortBy = ({ sortBy, setSortBy, sortingOptions }: Props) => {
    return (
        <div className="sort-by">
            <span className="sort-by__text">Sort By: </span>
            <SelectButton
                text={sortBy}
                selectedOption={sortBy}
                setSelectedOption={setSortBy}
                options={sortingOptions}
            />
        </div>
    );
};

export default SortBy;
