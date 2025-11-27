// NOTES
/*
- This component displays a list of products with filtering and sorting capabilities.
- By editing the "defaultSettings" object, you can customize the behavior of the component, like pagination, products per page, and more.
- Import example:

    In this example, filters are disabled and pagination is enabled.

    <ProductsList
            productsArray={testProductsArray}
            sortByKeys={['name', 'price', 'category']}
            useFilters={false}
            initialProductsNumber={1}
            usePagination={true}
            itemsPerPage={2}
    />
*/


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useMemo, memo, useRef } from "react";


// LOCAL_CSS
import styles from './ProductsList.module.css';


// LOCAL_ASSETS
import { getUniqueValuesByKey } from "./functions/getUniqueValuesByKey";
import { getUniqueKeys } from "./functions/getUniqueKeys";
import { getAllowedSortKeys } from "./functions/getAllowedSortKeys";

import ProductCard from "./utility/sub-components/ProductCard";
import Searchbar from "./utility/sub-components/Searchbar";
import Select from "./utility/sub-components/Select";
import PaginatedList from "./utility/sub-components/PaginatedList";


// EXPORT
function ProductsList({ productsArray, sortByKeys, useFilters, initialItemsNumber, usePagination, itemsPerPage }) {

    // SUPPORT
    const uniqueKeys = getUniqueKeys(productsArray);
    const allowedSortKeys = getAllowedSortKeys(sortByKeys, uniqueKeys);

    // Initial Settings
    const initOffsetTags = 5;
    const initOffsetProducts = initialItemsNumber || 5;

    // REF for PaginatedList
    const paginatedListRef = useRef(null);

    // USE-STATE

    // Settings states
    const [defaultSettings, setDefaultSettings] = useState({
        // Filters
        useFilters: useFilters !== false,
        showFilters: false,
        // Query: array of search strings
        query: [],
        selectedCategory: "",
        selectedTags: [],
        showTags: false,
        // Sorting
        showSorting: false,
        sortingKeys: allowedSortKeys || ["name"],
        sortByKey: "name",
        // Sort direction: 0 = ASC, 1 = DESC
        sortDirection: 0,
        // Offsets
        offsetTags: initOffsetTags,
        offsetProducts: initOffsetProducts,
        itemsPerPage: itemsPerPage,
        // Pagination
        usePagination: usePagination,
        page: 1,
    });

    // SUPPORT

    // Derived values
    const categories = useMemo(() => getUniqueValuesByKey(productsArray, "category"), [productsArray]);

    // Unique tags
    const tags = useMemo(() => {
        return [...new Set(
            getUniqueValuesByKey(productsArray, "tags")
                .flatMap(item => Array.isArray(item) ? item : String(item).split(","))
                .map(tag => tag.trim())
        )].sort((a, b) => a.localeCompare(b));
    }, [productsArray]);

    // Filtered products
    const filteredProducts = useMemo(() => {
        let list = [...productsArray];

        // Search filter
        if (Array.isArray(defaultSettings.query) && defaultSettings.query.length > 0) {
            list = list.filter(product =>
                defaultSettings.query.every(q =>
                    Object.values(product).some(value =>
                        String(value ?? "").toLowerCase().includes(q.toLowerCase())
                    )
                )
            );
        }

        // Category filter
        if (defaultSettings.selectedCategory) {
            list = list.filter(p => p.category === defaultSettings.selectedCategory);
        }

        // Tags filter
        if (defaultSettings.selectedTags.length > 0) {
            list = list.filter(product => {
                const pTags = Array.isArray(product.tags)
                    ? product.tags
                    : String(product.tags || "")
                        .split(",")
                        .map(t => t.trim());

                return defaultSettings.selectedTags.some(tag => pTags.includes(tag));
            });
        }

        return list;
    }, [productsArray, defaultSettings.query, defaultSettings.selectedCategory, defaultSettings.selectedTags]);

    // Sorted products
    const sortedProducts = useMemo(() => {
        const list = [...filteredProducts];

        // Sorting logic
        list.sort((a, b) => {
            const aVal = a?.[defaultSettings.sortByKey];
            const bVal = b?.[defaultSettings.sortByKey];

            // String sorting
            if (typeof aVal === "string" && typeof bVal === "string") {
                return defaultSettings.sortDirection === 0
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            // Numeric sorting
            if (typeof aVal === "number" && typeof bVal === "number") {
                return defaultSettings.sortDirection === 0
                    ? aVal - bVal
                    : bVal - aVal;
            }

            // Fallback string comparison
            return defaultSettings.sortDirection === 0
                ? String(aVal ?? "").localeCompare(String(bVal ?? ""))
                : String(bVal ?? "").localeCompare(String(aVal ?? ""));
        });

        return list;
    }, [filteredProducts, defaultSettings.sortByKey, defaultSettings.sortDirection]);

    // Sort direction arrow
    const sortArrow = defaultSettings.sortDirection === 0 ? "▲" : "▼";

    // Handle tag click
    const handleTagClick = (tag) => {
        if (defaultSettings.selectedTags.includes(tag)) {
            updateSettings({
                selectedTags: defaultSettings.selectedTags.filter(t => t !== tag)
            });
        } else {
            updateSettings({
                selectedTags: [...defaultSettings.selectedTags, tag]
            });
        }
    };

    const isSelectedTag = tag => defaultSettings.selectedTags.includes(tag);

    // Active filters (boolean)
    const activeFilters = useMemo(() => {
        const hasQuery = defaultSettings.query.filter(v => v !== "").length > 0;
        const hasTags = defaultSettings.selectedTags.length > 0;
        const defaultSorting = defaultSettings.sortByKey === "name" && defaultSettings.sortDirection === 0;

        return hasQuery || defaultSettings.selectedCategory || hasTags || !defaultSorting;
    }, [defaultSettings.query, defaultSettings.selectedCategory, defaultSettings.selectedTags, defaultSettings.sortByKey, defaultSettings.sortDirection]);

    const updateSettings = (newSettings, resetPage = true) => {
        setDefaultSettings(prev => ({ ...prev, ...newSettings }));

        // Conditional pagination reset
        if (resetPage && defaultSettings.usePagination && paginatedListRef.current) {
            paginatedListRef.current.resetPage();
        }
    };

    // Reset all
    const resetAll = () => {
        setDefaultSettings(prev => ({
            ...prev,
            showFilters: false,
            showSorting: false,
            showTags: false,
            sortByKey: "name",
            sortDirection: 0,
            query: [],
            selectedCategory: "",
            selectedTags: [],
            offsetTags: initOffsetTags,
            page: 1,
        }));

        if (defaultSettings.usePagination && paginatedListRef.current) {
            paginatedListRef.current.resetPage();
        }
    };

    return (
        <div className={styles.customCssProperties}>
            {defaultSettings.useFilters && (
                <>
                    {/* Filters toggles */}
                    <div className={styles.container}>

                        {/* Sorting toggle */}
                        <button
                            className={styles.button}
                            onClick={() => updateSettings({ showSorting: !defaultSettings.showSorting })}
                        >
                            {defaultSettings.showSorting ? "▼" : "▶"} Sorting
                        </button>

                        {/* Filters toggle */}
                        <button
                            className={styles.button}
                            onClick={() => updateSettings({ showFilters: !defaultSettings.showFilters, showTags: false })}
                        >
                            {defaultSettings.showFilters ? "▼" : "▶"} Filters
                        </button>

                        {/* Reset all */}
                        <button
                            className={`${styles.button} ${styles.resetButton} ${activeFilters ? "" : styles.inactiveResetButton}`}
                            onClick={resetAll}
                            disabled={!activeFilters}
                        >
                            ✖ Reset all
                        </button>
                    </div>

                    {/* FILTERS SECTION */}
                    {defaultSettings.showFilters && (
                        <div className={styles.filtersSection}>
                            {/* Search input */}
                            <Searchbar
                                placeholder="Search"
                                externalValue={defaultSettings.query}
                                setExternalValue={(newQuery) => updateSettings({ query: newQuery })}
                            />

                            {/* Select */}
                            <Select
                                placeholder="▶ Category"
                                options={categories}
                                value={defaultSettings.selectedCategory}
                                setValue={(newCategory) => updateSettings({ selectedCategory: newCategory })}
                            />

                            {/* Tags */}
                            <div className={styles.filterContainer}>
                                <p
                                    className={styles.filterInput}
                                    onClick={() => updateSettings({ showTags: !defaultSettings.showTags, offsetTags: initOffsetTags })}
                                >
                                    {defaultSettings.showTags ? "▼" : "▶"} Tags
                                    {defaultSettings.selectedTags.length > 0 ? `〈${defaultSettings.selectedTags.length}〉` : ""}
                                </p>

                                <button onClick={() => updateSettings({ selectedTags: [], showTags: false })}>
                                    ✖
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TAGS LIST */}
                    {defaultSettings.showTags && (
                        <>
                            <h4 className={styles.h4}>Select tags</h4>
                            <ul className={styles.labelsContainer}>
                                {tags.slice(0, defaultSettings.offsetTags).map((tag, i) => (
                                    <li
                                        key={i}
                                        className={`${styles.label} ${isSelectedTag(tag) ? styles.selectedLabel : ""}`}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        <p>{tag}</p>
                                    </li>
                                ))}

                                {defaultSettings.offsetTags < tags.length && (
                                    <button
                                        onClick={() => updateSettings({ offsetTags: defaultSettings.offsetTags + initOffsetTags })}
                                        className={`${styles.label} ${styles.loadMoreTagsButton}`}
                                    >
                                        Show more ✚
                                    </button>
                                )}
                            </ul>
                        </>
                    )}

                    {/* SORTING */}
                    {defaultSettings.showSorting && (
                        <>
                            <h4 className={styles.h4}>Sort by</h4>
                            <div className={styles.labelsContainer}>
                                {defaultSettings.sortingKeys.map((key, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.label} ${defaultSettings.sortByKey === key ? styles.selectedLabel : ""}`}
                                        onClick={() => {
                                            if (defaultSettings.sortByKey !== key) {
                                                updateSettings({ sortByKey: key, sortDirection: 0 });
                                            } else {
                                                updateSettings({ sortDirection: defaultSettings.sortDirection === 0 ? 1 : 0 });
                                            }
                                        }}
                                    >
                                        {defaultSettings.sortByKey === key ? sortArrow : "⊸"} {key}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )
            }

            {/* --------------------------------- PRODUCTS --------------------------------- */}

            {/* Results count */}
            <h3 className={styles.resultsCount}>{sortedProducts.length} results</h3>

            {sortedProducts.length === 0 ? (
                <div className={styles.zeroResults}>
                    <p>No products found.</p>
                </div>
            ) : (
                defaultSettings.usePagination ? (
                    <PaginatedList
                        ref={paginatedListRef}
                        itemsArray={sortedProducts}
                        itemsPerPage={defaultSettings.itemsPerPage}
                    />
                ) : (
                    <ul className={styles.productsList}>
                        {sortedProducts.slice(0, defaultSettings.offsetProducts).map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                    </ul>
                )
            )}


        </div >
    );
};


// EXPORT MEMO()
export default memo(ProductsList);