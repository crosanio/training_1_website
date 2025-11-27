// NOTES
/*
- Receives items array and itemsPerPage; manages internal pagination state.
- Calculates paginated items and total pages.
- Exposes resetPage() to parent via ref.
- Renders current page items and pagination controls.
- Optimized with useMemo/useCallback to avoid unnecessary re-renders.
*/


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import React, { useState, useMemo, useEffect, forwardRef, useImperativeHandle, useCallback, memo } from 'react';
import styles from '../../ProductsList.module.css';


// LOCAL_ASSETS
import ProductCard from './ProductCard';
import { getPaginationControls } from '../../functions/getPaginationControls';


// EXPORT
const PaginatedList = forwardRef(({ itemsArray = [], itemsPerPage = 7 }, ref) => {

    // DEBUG
    // console.log("RENDER: PaginatedList");

    const [currentPage, setCurrentPage] = useState(1);

    const MAX_ITEMS_PER_PAGE = 8;
    const effectiveItemsPerPage = Math.min(itemsPerPage || 1, MAX_ITEMS_PER_PAGE);

    // expose resetPage to parent: only set if different to avoid unnecessary renders
    useImperativeHandle(ref, () => ({
        resetPage: () => {
            setCurrentPage(prev => (prev === 1 ? prev : 1));
        }
    }), []);

    // compute totalPages only when itemsArray or effectiveItemsPerPage changes
    const totalPages = useMemo(() => {
        if (!Array.isArray(itemsArray) || itemsArray.length === 0) return 1;
        return Math.max(1, Math.ceil(itemsArray.length / effectiveItemsPerPage));
    }, [itemsArray, effectiveItemsPerPage]);

    // ensure currentPage is within bounds when itemsArray changes
    useEffect(() => {
        setCurrentPage(prev => {
            if (prev > totalPages) return totalPages;
            if (prev < 1) return 1;
            return prev;
        });
    }, [totalPages]);

    const maxPage = totalPages;

    // pages array for pagination controls
    const pages = useMemo(() => Array.from({ length: totalPages }, (_, i) => i + 1), [totalPages]);

    const pageNumbers = useMemo(() => getPaginationControls(pages, currentPage, 1), [pages, currentPage]);

    const goToPage = useCallback((page) => {
        setCurrentPage(prev => {
            if (typeof page !== 'number') return prev;
            if (page < 1) return prev;
            if (page > maxPage) return prev;
            if (page === prev) return prev;
            return page;
        });
    }, [maxPage]);

    // scroll to top on page change (keep)
    useEffect(() => {
        // only run client-side when page changes
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [currentPage]);

    // compute itemsToRender by slicing the original array (no mapping, no new objects)
    const itemsToRender = useMemo(() => {
        if (!Array.isArray(itemsArray) || itemsArray.length === 0) return [];
        const start = (currentPage - 1) * effectiveItemsPerPage;
        const end = start + effectiveItemsPerPage;
        return itemsArray.slice(start, end);
    }, [itemsArray, currentPage, effectiveItemsPerPage]);

    const renderPaginationControls = useMemo(() => (
        <div className={styles.paginationControls}>
            <div className={styles.paginationTitleContainer}>
                <h6 className={styles.paginationTitle}>
                    Page {currentPage} / {maxPage}
                </h6>
                <button
                    className={styles.resetPageButton}
                    onClick={() => {
                        // only set if needed
                        setCurrentPage(prev => (prev === 1 ? prev : 1));
                    }}
                >
                    |↩
                </button>
            </div>

            <div className={styles.pageNumbersContainer}>
                <button
                    className={styles.shiftPageButton}
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ◀
                </button>

                <div className={styles.numbersContainer}>
                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            className={`${styles.pageButton} ${currentPage === page ? styles.currentPageButton : ''}`}
                            onClick={() => goToPage(page)}
                            disabled={currentPage === page}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                <button
                    className={styles.shiftPageButton}
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === maxPage}
                >
                    ▶
                </button>
            </div>
        </div>
    ), [currentPage, maxPage, pageNumbers, goToPage]);

    return (
        <>
            {renderPaginationControls}

            {itemsToRender.map((product, idx) => (
                <ProductCard key={product.id ?? idx} product={product} />
            ))}

            {renderPaginationControls}
        </>
    );
});


// EXPORT MEMO()
export default memo(PaginatedList);
