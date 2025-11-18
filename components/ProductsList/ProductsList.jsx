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


// EXPORT
function ProductsList({ productsArray, useFilters, sortByKeys }) {

    // SUPPORT
    const uniqueKeys = useMemo(() => getUniqueKeys(productsArray), [productsArray]);
    const allowedSortKeys = useMemo(() => getAllowedSortKeys(sortByKeys, uniqueKeys), [sortByKeys, uniqueKeys]);

    // Settings
    const elementSettings = {
        useFilters: useFilters === false ? false : true,
        sortingKeys: allowedSortKeys || ["name"],
        offsetTags: 10,
        offsetProducts: 5,
        productsPerPage: 20,
        showPagination: true
    };

    // USE-STATE
    const [showSorting, setShowSorting] = useState(false);
    const [sortByKey, setSortByKey] = useState("name");
    const [sortDirection, setSortDirection] = useState(0); // 0 = ASC, 1 = DESC

    const [showFilters, setShowFilters] = useState(false);
    const [query, setQuery] = useState([]); // array of search strings
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);
    const [showTags, setShowTags] = useState(false);
    const [offsetTags, setOffsetTags] = useState(elementSettings.offsetTags);

    const [page, setPage] = useState(1);

    // SUPPORT

    // Derived values
    const categories = useMemo(() => {
        return getUniqueValuesByKey(productsArray, "category");
    }, [productsArray]);

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
        if (Array.isArray(query) && query.length > 0) {
            list = list.filter(product =>
                query.every(q =>
                    Object.values(product).some(value =>
                        String(value ?? "").toLowerCase().includes(q.toLowerCase())
                    )
                )
            );
        }

        // Category filter
        if (selectedCategory) {
            list = list.filter(p => p.category === selectedCategory);
        }

        // Tags filter
        if (selectedTags.length > 0) {
            list = list.filter(product => {
                const pTags = Array.isArray(product.tags)
                    ? product.tags
                    : String(product.tags || "")
                        .split(",")
                        .map(t => t.trim());

                return selectedTags.some(tag => pTags.includes(tag));
            });
        }

        return list;
    }, [productsArray, query, selectedCategory, selectedTags]);

    // Sorted products
    const sortedProducts = useMemo(() => {
        const list = [...filteredProducts];

        list.sort((a, b) => {
            const aVal = a?.[sortByKey];
            const bVal = b?.[sortByKey];

            // String sorting
            if (typeof aVal === "string" && typeof bVal === "string") {
                return sortDirection === 0
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            // Numeric sorting
            if (typeof aVal === "number" && typeof bVal === "number") {
                return sortDirection === 0
                    ? aVal - bVal
                    : bVal - aVal;
            }

            // Fallback string comparison
            return sortDirection === 0
                ? String(aVal ?? "").localeCompare(String(bVal ?? ""))
                : String(bVal ?? "").localeCompare(String(aVal ?? ""));
        });

        return list;
    }, [filteredProducts, sortByKey, sortDirection]);

    // SUPPORT
    const sortArrow = sortDirection === 0 ? "▲" : "▼";

    // Handle tag click
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    };

    const isSelectedTag = tag => selectedTags.includes(tag);

    // Active filters boolean
    const activeFilters = useMemo(() => {
        const hasQuery = query.filter(v => v !== "").length > 0;
        const hasTags = selectedTags.length > 0;
        const defaultSorting = sortByKey === "name" && sortDirection === 0;

        return hasQuery || selectedCategory || hasTags || !defaultSorting;
    }, [query, selectedCategory, selectedTags, sortByKey, sortDirection]);

    // Reset
    const resetAll = () => {
        setShowFilters(false);
        setShowSorting(false);
        setShowTags(false);
        setSortByKey("name");
        setSortDirection(0);
        setQuery([]);
        setSelectedCategory("");
        setSelectedTags([]);
        setOffsetTags(elementSettings.offsetTags);
        setPage(1);
    };

    return (
        <div className={styles.customCssProperties}>

            {elementSettings.useFilters && (
                <>
                    {/* Results count */}
                    <h3 className={styles.resultsCount}>{sortedProducts.length} results</h3>

                    {/* Top buttons */}
                    <div className={styles.container}>

                        {/* Sorting toggle */}
                        <button
                            className={styles.button}
                            onClick={() => setShowSorting(!showSorting)}
                        >
                            {showSorting ? "▼" : "▶"} Sorting
                        </button>

                        {/* Filters toggle */}
                        <button
                            className={styles.button}
                            onClick={() => {
                                const next = !showFilters;
                                setShowFilters(next);
                                if (!next) setShowTags(false);
                            }}
                        >
                            {showFilters ? "▼" : "▶"} Filters
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
                    {showFilters && (
                        <div className={styles.filtersSection}>

                            {/* Search input */}
                            <Searchbar
                                placeholder="Search"
                                setExternalValue={setQuery}
                                externalValue={query}
                            />

                            {/* Select */}
                            <Select
                                placeholder="▶ Category"
                                options={categories}
                                value={selectedCategory}
                                setValue={setSelectedCategory}
                            />

                            {/* Tags */}
                            <div className={styles.filterContainer}>
                                <p
                                    className={styles.filterInput}
                                    onClick={() => {
                                        setShowTags(!showTags);
                                        setOffsetTags(elementSettings.offsetTags);
                                    }}
                                >
                                    {showTags ? "▼" : "▶"} Tags
                                    {selectedTags.length > 0 ? `〈${selectedTags.length}〉` : ""}
                                </p>

                                <button onClick={() => { setSelectedTags([]); setShowTags(false); }}>
                                    ✖
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TAGS LIST */}
                    {showTags && (
                        <>
                            <h4 className={styles.h4}>Select tags</h4>

                            <ul className={styles.labelsContainer}>
                                {tags.slice(0, offsetTags).map((tag, i) => (
                                    <li
                                        key={i}
                                        className={`${styles.label} ${isSelectedTag(tag) ? styles.selectedLabel : ""
                                            }`}
                                        onClick={() => handleTagClick(tag)}
                                    >
                                        <p>{tag}</p>
                                    </li>
                                ))}

                                {offsetTags < tags.length && (
                                    <button
                                        onClick={() => setOffsetTags(offsetTags + elementSettings.offsetTags)}
                                        className={`${styles.label} ${styles.loadMoreTagsButton}`}
                                    >
                                        Show more ✚
                                    </button>
                                )}
                            </ul>
                        </>
                    )}

                    {/* SORTING */}
                    {showSorting && (
                        <>
                            <h4 className={styles.h4}>Sort by</h4>

                            <div className={styles.labelsContainer}>
                                {elementSettings.sortingKeys.map((key, index) => (
                                    <button
                                        key={index}
                                        className={`${styles.label} ${sortByKey === key ? styles.selectedLabel : ""
                                            }`}
                                        onClick={() => {
                                            if (sortByKey !== key) {
                                                // switch to new key → reset to ascending
                                                setSortByKey(key);
                                                setSortDirection(0);
                                            } else {
                                                // same key → toggle asc/desc
                                                setSortDirection(prev => (prev === 0 ? 1 : 0));
                                            }
                                        }}
                                    >
                                        {sortByKey === key ? sortArrow : "⊸"} {key}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}

            {/* PRODUCTS LIST */}
            {sortedProducts.length === 0 ? (
                <div className={styles.zeroResults}>
                    <p>No products found.</p>
                </div>
            ) : (
                <ul className={styles.productsList}>
                    {sortedProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
                </ul>
            )}
        </div>
    );
}

// EXPORT (memoized)
export default memo(ProductsList);