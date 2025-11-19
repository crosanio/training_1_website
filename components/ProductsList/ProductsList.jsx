// NOTES
/*
- This component displays a list of products with filtering and sorting capabilities.
- By editing the "defaultSettings" object, you can customize the behavior of the component, like pagination, products per page, and more.
*/


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useMemo, memo } from "react";


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

    // USE-STATE

    // Settings states
    const [defaultSettings, setDefaultSettings] = useState({
        // Filters
        useFilters: useFilters !== false,
        showFilters: false,
        // QUERY: array of search strings
        query: [],
        selectedCategory: "",
        selectedTags: [],
        showTags: false,
        // Sorting
        showSorting: false,
        sortingKeys: allowedSortKeys || ["name"],
        sortByKey: "name",
        // SORT DIRECTION: 0 = ASC, 1 = DESC
        sortDirection: 0,
        // Offsets
        offsetTags: initOffsetTags,
        offsetProducts: initOffsetProducts,
        usePagination: usePagination !== false,
        itemsPerPage: itemsPerPage || 5,
        // Pagination
        usePagination: usePagination !== false,
        page: 1,
    });

    // SUPPORT

    // Derived values
    const categories = useMemo(() => getUniqueValuesByKey(productsArray, "category"), [productsArray]);

    const tags = useMemo(() => {
        // Flatten tags arrays, split strings by comma, trim spaces, remove duplicates and sort
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

        // DEBUG
        // console.log("Filtered Products:", list);

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

        // DEBUG
        // console.log("Sorted Products:", list);

        return list;
    }, [filteredProducts, defaultSettings.sortByKey, defaultSettings.sortDirection]);

    // Sort direction arrow
    const sortArrow = defaultSettings.sortDirection === 0 ? "▲" : "▼";

    // Handle tag click
    const handleTagClick = (tag) => {
        if (defaultSettings.selectedTags.includes(tag)) {
            setDefaultSettings({
                ...defaultSettings,
                selectedTags: defaultSettings.selectedTags.filter(t => t !== tag)
            });
        } else {
            setDefaultSettings({
                ...defaultSettings,
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

    // Reset
    const resetAll = () => {
        setDefaultSettings({
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
        });
    };

    return (
        <div className={styles.customCssProperties}>
            {defaultSettings.useFilters && (
                <>
                    {/* Results count */}
                    <h3 className={styles.resultsCount}>{sortedProducts.length} results</h3>

                    {/* Top buttons */}
                    <div className={styles.container}>
                        {/* Sorting toggle */}
                        <button
                            className={styles.button}
                            onClick={() => setDefaultSettings({ ...defaultSettings, showSorting: !defaultSettings.showSorting })}
                        >
                            {defaultSettings.showSorting ? "▼" : "▶"} Sorting
                        </button>

                        {/* Filters toggle */}
                        <button
                            className={styles.button}
                            onClick={() => {
                                const next = !defaultSettings.showFilters;
                                setDefaultSettings({ ...defaultSettings, showFilters: next });
                                if (!next) setDefaultSettings({ ...defaultSettings, showTags: false });
                            }}
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
                                setExternalValue={setDefaultSettings}
                                externalValue={defaultSettings.query}
                            />

                            {/* Select */}
                            <Select
                                placeholder="▶ Category"
                                options={categories}
                                value={defaultSettings.selectedCategory}
                                setValue={setDefaultSettings}
                            />

                            {/* Tags */}
                            <div className={styles.filterContainer}>
                                <p
                                    className={styles.filterInput}
                                    onClick={() => {
                                        setDefaultSettings({ ...defaultSettings, showTags: !showTags, offsetTags: initOffsetTags });
                                    }}
                                >
                                    {defaultSettings.showTags ? "▼" : "▶"} Tags
                                    {defaultSettings.selectedTags.length > 0 ? `〈${defaultSettings.selectedTags.length}〉` : ""}
                                </p>

                                <button onClick={() => { setDefaultSettings({ ...defaultSettings, selectedTags: [], showTags: false }); }}>
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
                                        onClick={() => setDefaultSettings({ ...defaultSettings, offsetTags: defaultSettings.offsetTags + initOffsetTags })}
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

                                                setDefaultSettings({ ...defaultSettings, sortByKey: key, sortDirection: 0 });
                                            } else {
                                                setDefaultSettings({
                                                    ...defaultSettings,
                                                    sortDirection: defaultSettings.sortDirection === 0 ? 1 : 0
                                                });
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
            )}


            {/* --------------------------------- PRODUCTS --------------------------------- */}
            {defaultSettings.usePagination ?
                <PaginatedList
                    itemsArray={sortedProducts}
                    itemsPerPage={defaultSettings.itemsPerPage}
                />
                :
                <>
                    {sortedProducts.length === 0 ? (
                        <div className={styles.zeroResults}>
                            <p>No products found.</p>
                        </div>
                    ) : (
                        <ul className={styles.productsList}>
                            {sortedProducts.slice(0, defaultSettings.offsetProducts).map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </ul>
                    )}
                </>
            }


        </div>
    );
};



// EXPORT MEMO()
export default memo(ProductsList);
