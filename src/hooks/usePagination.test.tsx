import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import usePagination from './usePagination';

const elements = ['1', '2', '3', '3', '4', '5', '6', '7', '8', '9'];

const TestComponent = () => {
    const {
        paginationLimit,
        setPaginationLimit,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedElements,
    } = usePagination(elements, 2);
    return (
        <div className="test-component">
            <div data-testid="current-page">{currentPage}</div>
            <div data-testid="total-pages">{totalPages}</div>
            <div data-testid="paginated-elements">
                {paginatedElements[0] + ' ' + paginatedElements[1]}
            </div>
        </div>
    );
};

describe('usePagination hook tests', () => {
    test('Default current page is 1', () => {
        render(<TestComponent />);
        const currentPageElement = screen.getByTestId('current-page');
        expect(currentPageElement).toHaveTextContent('1');
    });

    test('Properly calculates number of pages', () => {
        render(<TestComponent />);
        const totalPagesElement = screen.getByTestId('total-pages');
        expect(totalPagesElement).toHaveTextContent('5');
    });

    test('Properly returns paginatedElements for currentPage === 1', () => {
        render(<TestComponent />);
        const paginatedElements = screen.getByTestId('paginated-elements');
        expect(paginatedElements).toHaveTextContent('1 2');
    });

    // test('Properly returns paginatedElements for currentPage === 5', () => {
    //     render(<TestComponent />);
    //     const paginatedElements = screen.getByTestId('paginated-elements');
    //     expect(paginatedElements).toHaveTextContent('8 9 ');
    // });
});
