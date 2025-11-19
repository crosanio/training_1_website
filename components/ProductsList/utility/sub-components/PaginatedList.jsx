// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useMemo } from 'react';


// LOCAL_CSS
// Parent component CSS import
import styles from '../../ProductsList.module.css';


// LOCAL_ASSETS
import ProductCard from './ProductCard';
import { getPaginationControls } from '../../functions/getPaginationControls';


// EXPORT
function PaginatedList({ itemsArray, itemsPerPage }) {

    // USE-STATE
    const [currentPage, setCurrentPage] = useState(1);

    // SUPPORT

    function toTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    // Paginated products
    const paginatedProducts = useMemo(() => {

        if (!itemsArray || itemsArray.length === 0) {
            return {
                paginatedItems: [],
                pages: []
            };
        }

        // Assign page number to each item
        const paginatedItems = itemsArray.map((item, index) => {
            const page = Math.floor(index / itemsPerPage) + 1;

            return {
                ...item,
                pagination: page
            };
        });

        // Extract unique page numbers
        const pages = [...new Set(paginatedItems.map(item => item.pagination))];

        return {
            paginatedItems,
            pages
        };
    }, [itemsArray, itemsPerPage]);

    // SUPPORT
    const maxPage = Math.max(...paginatedProducts.pages);
    const pageNumbers = getPaginationControls(paginatedProducts.pages, currentPage, 1);

    return <>

        {/* PAGINATION CONTROLS - TOP */}
        <div className={styles.paginationControls}>
            <h6 className={styles.paginationTitle}>Page {currentPage} of {maxPage}</h6>

            <div className={styles.pageNumbersContainer}>

                {/* PREVIOUS PAGE */}
                <button
                    className={styles.shiftPageButton}
                    onClick={() => { toTop(); setCurrentPage(currentPage - 1); }}
                    disabled={currentPage === pageNumbers[0]}
                >
                    {currentPage > 1 ? '◀' : '|'}
                </button>

                {/* PAGE BUTTONS */}
                <div className={styles.numbersContainer}>
                    {pageNumbers.map(page => (
                        <button
                            key={page}
                            className={`${styles.pageButton} ${currentPage === page ? styles.currentPageButton : ''}`}
                            onClick={() => { setCurrentPage(page); }}
                            disabled={currentPage === page}
                        >
                            {page}
                        </button>
                    ))}
                </div>


                {/* NEXT PAGE */}
                <button
                    className={styles.shiftPageButton}
                    onClick={() => { setCurrentPage(currentPage + 1); }}
                    disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
                >
                    {currentPage < pageNumbers[pageNumbers.length - 1] ? '▶' : '|'}
                </button>

            </div>
        </div>

        {/* PRODUCTS LIST */}
        {paginatedProducts.paginatedItems
            .filter(item => item.pagination === currentPage)
            .map(product => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))
        }

        {/* PAGINATION CONTROLS - BOTTOM */}
        <div className={styles.paginationControls}>

            <div className={styles.pageNumbersContainer}>

                {/* PREVIOUS PAGE */}
                <button
                    className={styles.shiftPageButton}
                    onClick={() => { toTop(); setCurrentPage(currentPage - 1); }}
                    disabled={currentPage === pageNumbers[0]}
                >
                    {currentPage > 1 ? '◀' : '|'}
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
                                    setTimeout(() => {
                                        window.scrollTo({ top: 0, behavior: "smooth" });
                                    }, 0);
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
                    onClick={() => { setCurrentPage(currentPage + 1); }}
                    disabled={currentPage === pageNumbers[pageNumbers.length - 1]}
                >
                    {currentPage < pageNumbers[pageNumbers.length - 1] ? '▶' : '|'}
                </button>

            </div>

            <h6 className={styles.paginationTitle}>Page {currentPage} of {maxPage}</h6>
        </div>


    </>
}


// EXPORT MEMO()
export default PaginatedList;
