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


// EXPORT
function PaginatedList({ itemsArray, itemsPerPage, }) {

    // USE-STATE
    const [currentPage, setCurrentPage] = useState(1);

    // SUPPORT

    // Paginated products
    const paginatedProducts = useMemo(() => {

        if (!itemsArray || itemsArray.length === 0) {
            return {
                paginatedItems: [],
                pages: []
            };
        }

        const paginatedItems = itemsArray.map((item, index) => {
            const page = Math.floor(index / itemsPerPage) + 1;

            return {
                ...item,
                pagination: page
            };
        });

        const pages = [...new Set(paginatedItems.map(item => item.pagination))];

        return {
            paginatedItems,
            pages
        };
    }, [itemsArray, itemsPerPage]);

    return <>

        {paginatedProducts.paginatedItems.filter(item => item.pagination === currentPage).map((product) =>

            <ProductCard
                key={product.id}
                product={product}
            />

        )}
    </>
}


// EXPORT MEMO()
export default PaginatedList;
