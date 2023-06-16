import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePagination from 'hooks/usePagination';
import Pagination from './Pagination';

const elements = ['1', '2', '3', '3', '4', '5', '6', '7', '8', '9'];

const PaginationContainer = () => {
    const {
        // paginationLimit,
        setPaginationLimit,
        currentPage,
        setCurrentPage,
        totalPages,
        // paginatedElements,
    } = usePagination(elements, 2);
    return (
        <div className="test-component">
            <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                setPaginationLimit={setPaginationLimit}
            />
        </div>
    );
};

describe('Pagination component tests', () => {
    it('Shows current page to be 1 by default', () => {
        render(<PaginationContainer />);

        const currentPageElement = screen.getByTestId('current-page');
        expect(currentPageElement).toHaveTextContent('1');
    });

    it('Increses currentPage by 1 when click arrow right button', () => {
        render(<PaginationContainer />);

        const currentPageElement = screen.getByTestId('current-page');
        const arrowRightButton = screen.getByTestId('arrow-right');

        fireEvent.click(arrowRightButton);
        fireEvent.click(arrowRightButton);

        expect(currentPageElement).toHaveTextContent('3');
    });

    it('Changes currentPage to last page when click double arrow right button', () => {
        render(<PaginationContainer />);

        const currentPageElement = screen.getByTestId('current-page');
        const arrowDoubleRightButton = screen.getByTestId('arrow-double-right');

        fireEvent.click(arrowDoubleRightButton);

        expect(currentPageElement).toHaveTextContent('5');
    });

    it('Changes currentPage to first page when click double arrow left button', () => {
        render(<PaginationContainer />);

        const currentPageElement = screen.getByTestId('current-page');
        const arrowDoubleRightButton = screen.getByTestId('arrow-double-right');
        const arrowDoubleLeftButton = screen.getByTestId('arrow-double-left');

        fireEvent.click(arrowDoubleRightButton);
        fireEvent.click(arrowDoubleLeftButton);

        expect(currentPageElement).toHaveTextContent('1');
    });
});
