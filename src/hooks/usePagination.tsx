import { useEffect, useState } from 'react';

const usePagination = (elements: any[], limit: number = 5) => {
    const [paginationLimit, setPaginationLimit] = useState<number>(limit);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [paginatedElements, setPaginatedElements] = useState<any[]>([]);

    // Calculates totalPages
    useEffect(() => {
        const totalPages = Math.ceil(elements.length / paginationLimit);

        setTotalPages(totalPages);
    }, [elements.length, paginationLimit]);

    useEffect(() => {
        const paginatedElements = elements.slice(
            0 + paginationLimit * (currentPage - 1),
            paginationLimit + paginationLimit * (currentPage - 1),
        );

        setPaginatedElements(paginatedElements);
    }, [currentPage, elements, paginationLimit]);

    return {
        paginationLimit,
        setPaginationLimit,
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedElements,
    };
};

export default usePagination;
