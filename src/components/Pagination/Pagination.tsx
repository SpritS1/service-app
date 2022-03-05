import React from 'react';
import './Pagination.scss';

type Props = {
    setPaginationLimit: any;
    currentPage: number;
    setCurrentPage: any;
    totalPages: number;
};

const Pagination = ({
    currentPage,
    setCurrentPage,
    totalPages,
    setPaginationLimit,
}: Props) => {
    const handleCurrentPageChange = (pageNumber: number) => {
        if (pageNumber > 0 && pageNumber <= totalPages)
            setCurrentPage(pageNumber);
    };

    return (
        <div className="pagination">
            <div className="pagination__page-info">
                Page {currentPage} from {totalPages}
            </div>
            <ul className="pagination__navigation">
                <div
                    className={`pagination__button ${
                        currentPage === 1 && 'pagination__button--disabled'
                    }`}
                    onClick={() => handleCurrentPageChange(1)}
                >
                    <i className="fas fa-angle-double-left" />
                </div>
                <div
                    className={`pagination__button ${
                        currentPage === 1 && 'pagination__button--disabled'
                    }`}
                    onClick={() => handleCurrentPageChange(currentPage - 1)}
                >
                    <i className="fas fa-angle-left" />
                </div>

                <div className="pagination__button pagination__button pagination__button--active">
                    {currentPage}
                </div>

                {/* {totalPages > 3 && (
                    <>
                        <div className="pagination__button pagination__button pagination__button">
                            {currentPage + 1}
                        </div>
                        <div className="pagination__button pagination__button pagination__button">
                            {currentPage + 2}
                        </div>
                    </>
                )} */}
                {/* <div className="pagination__button pagination__button">
                    {totalPages}
                </div> */}
                <div
                    className={`pagination__button ${
                        currentPage === totalPages &&
                        'pagination__button--disabled'
                    }`}
                    onClick={() => handleCurrentPageChange(currentPage + 1)}
                >
                    <i className="fas fas fa-angle-right" />
                </div>
                <div
                    className={`pagination__button ${
                        currentPage === totalPages &&
                        'pagination__button--disabled'
                    }`}
                    onClick={() => handleCurrentPageChange(totalPages)}
                >
                    <i className="fas fa-angle-double-right" />
                </div>
            </ul>
        </div>
    );
};

export default Pagination;
