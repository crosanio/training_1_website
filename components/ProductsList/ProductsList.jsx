// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, useMemo, memo } from "react";


// LOCAL_CSS
import styles from './ProductsList.module.css';


// LOCAL_ASSETS
import { getUniqueKeys } from "./functions/getUniqueKeys";
import { sortBy } from "./functions/sortBy";

import { localProductsArray } from "./utility/localProductsArray";

import ProductCard from "./utility/ProductCard";


// SUPPORT


// COMPONENTS


// EXPORT
function ProductsList({ externalProductsArray }) {

    // SUPPORT
    const productsArray = externalProductsArray || localProductsArray;
    const uniqueKeys = getUniqueKeys(productsArray);

    // Settings
    const listSettings = {
        showFilters: true,
        showSorting: true,
        offsetTags: 5,
        offsetProducts: 10,
        showPagination: true,
        productsPerPage: 20,
    }

    // USE-STATE
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState(1);

    const [offsetTags, setOffsetTags] = useState(listSettings.offsetTags);
    const [offsetProducts, setOffsetProducts] = useState(listSettings.offsetProducts);
    const [showModal, setShowModal] = useState(false);

    // SUPPORT
    const sortArrow = sortDirection === 1 ? '▼' : '▲';

    return <>

        <div className={styles.customCssProperties}>

            {productsArray.map((product, index) =>

                <ProductCard key={index} product={product} />

            )}

        </div>


    </>
}


// EXPORT MEMO()
export default memo(ProductsList);