// NOTES
/*
- Import example:
    If the itemsPerPage prop will exceed the "maxItemsPerPage" limit, the component will automatically set it to that limit.
    In the following example, assuming:
    - maxItemsPerPage = 5
    - itemsPerPage = 7
    - resulting max number of items per page = 5
    - ref created in parent component to access resetPage() method

    <PaginatedList
        ref={paginatedListRef}
        itemsArray={arrayToPaginate}
        itemsPerPage={7}
    />
*/


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useMemo, forwardRef, useImperativeHandle } from 'react';


// LOCAL_CSS
// Parent component CSS import
import styles from '../../ProductsList.module.css';


// LOCAL_ASSETS
import ProductCard from './ProductCard';
import { getPaginationControls } from '../../functions/getPaginationControls';


// EXPORT
const PaginatedList = forwardRef(({ itemsArray, itemsPerPage }, ref) => {

    // USE-STATE
    const [currentPage, setCurrentPage] = useState(1);

    // SUPPORT

    // Maximum items allowed per page
    const maxItemsPerPage = 8;
    const itemsPerPageLimit = Math.min(itemsPerPage, maxItemsPerPage);

    // Expose functions to parent via ref
    useImperativeHandle(ref, () => ({
        resetPage: () => setCurrentPage(1) // Expose reset function
    }));

    // Scroll helper
    function toTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Paginated products calculation
    const paginatedProducts = useMemo(() => {

        if (!itemsArray || itemsArray.length === 0) {
            return { paginatedItems: [], pages: [] };
        }

        // Assign page number to each item
        const paginatedItems = itemsArray.map((item, index) => ({
            ...item,
            pagination: Math.floor(index / itemsPerPageLimit) + 1
        }));

        // Extract unique page numbers
        const pages = [...new Set(paginatedItems.map(item => item.pagination))];

        return { paginatedItems, pages };
    }, [itemsArray, itemsPerPageLimit]);

    const maxPage = Math.max(...paginatedProducts.pages, 1);
    const pageNumbers = getPaginationControls(paginatedProducts.pages, currentPage, 1);

    // -----------------------------
    // INTERNAL FUNCTION TO RENDER PAGINATION CONTROLS
    const renderPaginationControls = () => (
        <div className={styles.paginationControls}>
            <h6 className={styles.paginationTitle}>Page {currentPage} of {maxPage}</h6>

            <div className={styles.pageNumbersContainer}>

                {/* PREVIOUS PAGE */}
                <button
                    className={styles.shiftPageButton}
                    onClick={() => { toTop(); setCurrentPage(currentPage - 1); }}
                    disabled={currentPage === pageNumbers[0]}
                >
                    {currentPage > 1 ? '◀' : '︱'}
                </button>

                {/* PAGE BUTTONS */}
                <div className={styles.numbersContainer}>
                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            className={`${styles.pageButton} ${currentPage === page ? styles.currentPageButton : ''}`}
                            onClick={() => {
                                if (currentPage !== page) {
                                    setCurrentPage(page);
                                    setTimeout(() => { toTop(); }, 0); // Scroll to top smoothly
                                }
                            }}
                            disabled={currentPage === page}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {/* NEXT PAGE */}
                <button
                    className={styles.shiftPageButton}
                    onClick={() => { toTop(); setCurrentPage(currentPage + 1); }}
                    disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
                >
                    {currentPage < pageNumbers[pageNumbers.length - 1] ? '▶' : '︱'}
                </button>

            </div>
        </div>
    );

    return <>
        {/* PAGINATION CONTROLS - TOP */}
        {renderPaginationControls()}

        {/* PRODUCTS LIST */}
        {paginatedProducts.paginatedItems
            .filter(item => item.pagination === currentPage)
            .map(product => (
                <ProductCard key={product.id} product={product} />
            ))
        }

        {/* PAGINATION CONTROLS - BOTTOM */}
        {renderPaginationControls()}
    </>
});


// EXPORT
export default PaginatedList;
