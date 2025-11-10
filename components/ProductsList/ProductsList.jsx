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
    const tags = getUniqueValuesByKey(productsArray, 'tags');

    // Settings
    const elementSettings = {
        useFilters: true,
        offsetTags: 5,
        offsetProducts: 10,
        showPagination: true,
        productsPerPage: 20,
    }

    // USE-STATE
    const [offsetProducts, setOffsetProducts] = useState(elementSettings.offsetProducts);

    const [showSorting, setShowSorting] = useState(false);
    const [sortByKey, setSortByKey] = useState('name');
    const [sortDirection, setSortDirection] = useState(1);

    const [showFilters, setShowFilters] = useState(false);
    const [query, setQuery] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [showTags, setShowTags] = useState(false);
    const [offsetTags, setOffsetTags] = useState(elementSettings.offsetTags);
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
    //     return paginate(sorted, page, elementSettings.productsPerPage);
    // }, [
    //     productsArray,
    //     query,
    //     selectedCategory,
    //     selectedTags,
    //     sortByKey,
    //     sortDirection,
    //     page,
    // ]);

    // SUPPORT

    // Reset Filters
    const resetAll = () => {
        setShowFilters(false);
        setShowSorting(false);
        setShowTags(false);
        setQuery([]);
        setSelectedCategory("");
        setSelectedTags([]);
    }

    return <>

        <div className={styles.customCssProperties}>

            <h3 className={styles.resultsCount}>{productsArray.length} results</h3>

            {/* LIST SETTINGS */}
            <div className={styles.container}>

                <button
                    className={`${styles.button} ${styles.resetButton}`}
                    onClick={() => { resetAll(); }}
                >
                    <span>✖</span><span>Reset all</span>
                </button>

                <button
                    className={styles.button}
                    onClick={() => {
                        const newShowFilters = !showFilters;
                        setShowFilters(newShowFilters);

                        if (newShowFilters === false) {
                            setShowTags(false);
                        }
                    }}
                >
                    {showFilters ? '▼' : '▶'} Filters
                </button>

                <button
                    className={styles.button}
                    onClick={() => {
                        const newShowSorting = !showSorting;
                        setShowSorting(newShowSorting);
                    }}
                >
                    {showSorting ? '▼' : '▶'} Sorting
                </button>

            </div>

            {/* FILTERS + SORTING */}
            <div className={styles.container}>

            </div>

            {/* LIST SETTINGS */}
            <div className={styles.listSettings} >


                {/* FILTERS */}
                {showFilters &&
                    <div className={styles.filtersSection}>

                        {/* QUERY */}
                        <Searchbar
                            placeholder="Search products"
                            setExternalValue={setQuery}
                            externalValue={query}
                        />

                        {/* CATEGORY */}
                        <Select
                            placeholder="▶ Filter by category"
                            options={categories}
                            value={selectedCategory}
                            setValue={setSelectedCategory}
                        />

                        {/* SHOW TAGS */}
                        <div className={styles.filterContainer}>
                            <p className={styles.filterInput} onClick={() => setShowTags(!showTags)}>
                                {showTags ? '▼' : '▶'} Filter by Tags {selectedTags.length > 0 ? `〈${selectedTags.length}〉` : ''}
                            </p>

                            <button onClick={() => { setSelectedTags([]); setShowTags(false); }}>
                                ✖
                            </button>
                        </div>

                        {/* TAGS LIST */}
                        {showTags && <p>tags list</p>}
                    </div>
                }

                {/* SORTING */}
                {showSorting &&
                    <div className={styles.filtersSection}>
                        <h3 className="debug">Sorting keys here</h3>
                    </div>
                }

            </div>


            {/* PRODUCTS LIST */}
            {/* {visibleProducts.map((product, index) => */}
            {productsArray.map((product, index) =>

                <ProductCard key={index} product={product} />

            )}

        </div >


    </>
}


// EXPORT MEMO()
export default memo(ProductsList);