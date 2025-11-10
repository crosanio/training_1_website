// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, useMemo, memo } from "react";


// LOCAL_CSS
import styles from './ProductsList.module.css';


// LOCAL_ASSETS
import { localProductsArray } from "./utility/localProductsArray";
import { getUniqueValuesByKey } from "./functions/getUniqueValuesByKey";
import { getUniqueKeys } from "./functions/getUniqueKeys";
import { sortBy } from "./functions/sortBy";


// SUPPORT


// COMPONENTS
import ProductCard from "./utility/ProductCard";
import Searchbar from "./utility/Searchbar";
import Select from "./utility/Select";


// EXPORT
function ProductsList({ externalProductsArray }) {

    // SUPPORT
    const productsArray = externalProductsArray || localProductsArray;
    const uniqueKeys = getUniqueKeys(productsArray);
    const categories = getUniqueValuesByKey(productsArray, 'category');

    // Settings
    const listSettings = {
        offsetTags: 5,
        offsetProducts: 10,
        showPagination: true,
        productsPerPage: 20,
    }

    // USE-STATE
    const [offsetProducts, setOffsetProducts] = useState(listSettings.offsetProducts);

    const [showSorting, setShowSorting] = useState(false);
    const [sortByKey, setSortByKey] = useState('name');
    const [sortDirection, setSortDirection] = useState(1);

    const [showFilters, setShowFilters] = useState(false);

    const [query, setQuery] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showTags, setShowTags] = useState(false);
    const [offsetTags, setOffsetTags] = useState(listSettings.offsetTags);
    const [selectedTags, setSelectedTags] = useState([]);

    const [page, setPage] = useState(1);

    const [showModal, setShowModal] = useState(false);

    // SUPPORT
    const sortArrow = sortDirection === 1 ? '▼' : '▲';

    // Visible Products
    // const visibleProducts = useMemo(() => {
    //     let filtered = filterByQuery(productsArray, query);
    //     filtered = filterByCategory(filtered, selectedCategory);
    //     filtered = scoreByTags(filtered, selectedTags);
    //     const sorted = sortProducts(filtered, sortByKey, sortDirection);
    //     return paginate(sorted, page, listSettings.productsPerPage);
    // }, [
    //     productsArray,
    //     query,
    //     selectedCategory,
    //     selectedTags,
    //     sortByKey,
    //     sortDirection,
    //     page,
    // ]);

    return <>

        <div className={styles.customCssProperties}>

            <div className={styles.filtersSection}>
                <Searchbar
                    placeholder="Search products..."
                    setExternalValue={setQuery}
                    externalValue={query}
                />

                <Select
                    placeholder="▼ Filter by category"
                    options={categories}
                    value={selectedCategory}
                    setValue={setSelectedCategory}
                />
            </div>


            {/* {visibleProducts.map((product, index) => */}
            {productsArray.map((product, index) =>

                <ProductCard key={index} product={product} />

            )}

        </div>


    </>
}


// EXPORT MEMO()
export default memo(ProductsList);