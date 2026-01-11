'use client';

import React from 'react';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
                                       totalItems,
                                       itemsPerPage,
                                       currentPage,
                                       onPageChange
                                   }: PaginationProps) {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Jeśli nie ma danych, nie wyświetlaj paginacji
    if (totalItems === 0) return null;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const getPageNumbers = () => {
        const maxButtons = 3;
        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex items-center justify-between border-t border-border-dark px-4 py-3 sm:px-6 bg-surface-dark">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-400">
                        Pokazuję od <span className="font-medium text-white">{indexOfFirstItem + 1}</span> do{' '}
                        <span className="font-medium text-white">{Math.min(indexOfLastItem, totalItems)}</span> z{' '}
                        <span className="font-medium text-white">{totalItems}</span> rekordów
                    </p>
                </div>
                <div>
                    <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        {/* Przycisk Poprzednia */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-border-dark focus:z-20 focus:outline-offset-0 ${
                                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-dark-hover'
                            }`}
                        >
                            <span className="sr-only">Poprzednia</span>
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>

                        {/* Numery stron */}
                        {getPageNumbers().map(number => (
                            <button
                                key={number}
                                onClick={() => handlePageChange(number)}
                                className={`relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                                ${currentPage === number
                                    ? 'bg-primary text-white focus-visible:outline-primary'
                                    : 'text-white ring-1 ring-inset ring-border-dark hover:bg-surface-dark-hover'
                                }`}
                            >
                                {number}
                            </button>
                        ))}

                        {/* Kropki (...) jeśli jest więcej stron */}
                        {totalPages > 3 && currentPage < totalPages - 1 && (
                            <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-400 ring-1 ring-inset ring-border-dark focus:outline-offset-0">...</span>
                        )}

                        {/* Przycisk Następna */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-border-dark focus:z-20 focus:outline-offset-0 ${
                                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-surface-dark-hover'
                            }`}
                        >
                            <span className="sr-only">Następna</span>
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}