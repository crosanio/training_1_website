// NOTES
/*
- Receives products array and manages filtering, sorting, and optional pagination.
- Computes derived lists: categories, tags, filteredProducts, sortedProducts.
- Maintains separate states for UI toggles and filter/sort settings.
- updateSettings() updates filters/sorting and optionally resets pagination.
- Renders products directly or via PaginatedList if pagination is enabled.
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


// SUPPORT
function shallowArrayEquals(a, b) {
    if (a === b) return true;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


// EXPORT
function ProductsList({
    productsArray = [],
    sortByKeys = [],
    useFilters = true,
    initialItemsNumber,
    usePagination = true,
    itemsPerPage = 5
}) {

    // SUPPORT
    const uniqueKeys = useMemo(() => getUniqueKeys(productsArray), [productsArray]);
    const allowedSortKeys = useMemo(() => getAllowedSortKeys(sortByKeys, uniqueKeys), [sortByKeys, uniqueKeys]);

    // Initial Settings
    const initOffsetTags = 5;
    const initOffsetProducts = initialItemsNumber || 5;

    // REF for PaginatedList
    const paginatedListRef = useRef(null);

    // USE-STATE
    const [showFilters, setShowFilters] = useState(false);

    const [defaultSettings, setDefaultSettings] = useState({
        useFilters: useFilters !== false,
        query: [],
        selectedCategory: "",
        selectedTags: [],
        showTags: false,
        showSorting: false,
        sortingKeys: allowedSortKeys?.length ? allowedSortKeys : ["name"],
        sortByKey: allowedSortKeys?.length ? allowedSortKeys[0] : "name",
        sortDirection: 0, // 0 = ASC, 1 = DESC
        offsetTags: initOffsetTags,
        offsetProducts: initOffsetProducts,
        itemsPerPage: itemsPerPage,
        usePagination: usePagination,
    });

    // SUPPORT

    // Derived values
    const categories = useMemo(() => getUniqueValuesByKey(productsArray, "category"), [productsArray]);

    const tags = useMemo(() => {
        return [...new Set(
            getUniqueValuesByKey(productsArray, "tags")
                .flatMap(item => Array.isArray(item) ? item : String(item).split(","))
                .map(tag => tag.trim())
        )].sort((a, b) => a.localeCompare(b));
    }, [productsArray]);

    // updateSettings: functional setState, avoids updates when nothing changed
    const updateSettings = (newSettings, resetPage = true) => {
        setDefaultSettings(prev => {
            const merged = { ...prev, ...newSettings };

            // quick shallow compare of changed keys to avoid unnecessary state change
            const keys = Object.keys(newSettings);
            let changed = false;
            for (const k of keys) {
                const a = prev[k];
                const b = merged[k];
                if (Array.isArray(a) && Array.isArray(b)) {
                    if (!shallowArrayEquals(a, b)) { changed = true; break; }
                } else {
                    if (a !== b) { changed = true; break; }
                }
            }
            if (!changed) return prev;

            if (resetPage && merged.usePagination && paginatedListRef.current?.resetPage) {
                try { paginatedListRef.current.resetPage(); } catch (e) { /* ignore */ }
            }

            return merged;
        });
    };

    // Reset all
    const resetAll = () => {
        setDefaultSettings(prev => {
            const merged = {
                ...prev,
                query: [],
                selectedCategory: "",
                selectedTags: [],
                sortByKey: prev.sortingKeys && prev.sortingKeys.length ? prev.sortingKeys[0] : "name",
                sortDirection: 0,
                offsetTags: initOffsetTags,
                showTags: false,
                showSorting: false,
            };

            // reset pagination on change
            if (prev.usePagination && paginatedListRef.current?.resetPage) {
                try { paginatedListRef.current.resetPage(); } catch (e) { /* ignore */ }
            }

            return merged;
        });

        setShowFilters(false);
    };

    // Filtered products
    const filteredProducts = useMemo(() => {
        let list = productsArray;
        if (!Array.isArray(list) || list.length === 0) return [];

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
        if (defaultSettings.selectedTags && defaultSettings.selectedTags.length > 0) {
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
        // console.log("CALCULATION: Filtered Products");

        return list;
    }, [
        productsArray,
        defaultSettings.query,
        defaultSettings.selectedCategory,
        defaultSettings.selectedTags
    ]);

    // Sorted products
    const sortedProducts = useMemo(() => {
        if (!Array.isArray(filteredProducts) || filteredProducts.length === 0) return [];

        const list = [...filteredProducts];

        list.sort((a, b) => {
            const aVal = a?.[defaultSettings.sortByKey];
            const bVal = b?.[defaultSettings.sortByKey];

            if (typeof aVal === "string" && typeof bVal === "string") {
                return defaultSettings.sortDirection === 0
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }

            if (typeof aVal === "number" && typeof bVal === "number") {
                return defaultSettings.sortDirection === 0
                    ? aVal - bVal
                    : bVal - aVal;
            }

            return defaultSettings.sortDirection === 0
                ? String(aVal ?? "").localeCompare(String(bVal ?? ""))
                : String(bVal ?? "").localeCompare(String(aVal ?? ""));
        });

        // DEBUG
        // console.log("CALCULATION: Sorted Products");

        return list;
    }, [filteredProducts, defaultSettings.sortByKey, defaultSettings.sortDirection]);

    const sortArrow = defaultSettings.sortDirection === 0 ? "▲" : "▼";

    const handleTagClick = (tag) => {
        const current = defaultSettings.selectedTags || [];
        if (current.includes(tag)) {
            updateSettings({ selectedTags: current.filter(t => t !== tag) });
        } else {
            updateSettings({ selectedTags: [...current, tag] });
        }
    };

    const isSelectedTag = (tag) => (defaultSettings.selectedTags || []).includes(tag);

    const activeFilters = useMemo(() => {
        const hasQuery = Array.isArray(defaultSettings.query) && defaultSettings.query.filter(v => v !== "").length > 0;
        const hasTags = Array.isArray(defaultSettings.selectedTags) && defaultSettings.selectedTags.length > 0;
        const defaultSorting = defaultSettings.sortByKey === (defaultSettings.sortingKeys?.[0] ?? "name") && defaultSettings.sortDirection === 0;

        return hasQuery || defaultSettings.selectedCategory || hasTags || !defaultSorting;
    }, [defaultSettings.query, defaultSettings.selectedCategory, defaultSettings.selectedTags, defaultSettings.sortByKey, defaultSettings.sortDirection, defaultSettings.sortingKeys]);

    return (
        <div className={styles.customCssProperties}>
            {defaultSettings.useFilters && (
                <>
                    <div className={styles.container}>
                        <button
                            className={styles.button}
                            onClick={() => updateSettings({ showSorting: !defaultSettings.showSorting })}
                        >
                            {defaultSettings.showSorting ? "▼" : "▶"} Sorting
                        </button>

                        <button
                            className={styles.button}
                            onClick={() => setShowFilters(prev => !prev)}
                        >
                            {showFilters ? "▼" : "▶"} Filters
                        </button>

                        <button
                            className={`${styles.button} ${styles.resetButton} ${activeFilters ? "" : styles.inactiveResetButton}`}
                            onClick={resetAll}
                            disabled={!activeFilters}
                        >
                            ✖ Reset all
                        </button>
                    </div>

                    {showFilters && (
                        <div className={styles.filtersSection}>
                            <Searchbar
                                placeholder="Search"
                                externalValue={defaultSettings.query}
                                setExternalValue={(newQuery) => updateSettings({ query: newQuery })}
                            />

                            <Select
                                placeholder="▶ Category"
                                options={categories}
                                value={defaultSettings.selectedCategory}
                                setValue={(newCategory) => updateSettings({ selectedCategory: newCategory })}
                            />

                            <div className={styles.filterContainer}>
                                <p
                                    className={styles.filterInput}
                                    onClick={() => updateSettings({ showTags: !defaultSettings.showTags, offsetTags: initOffsetTags })}
                                >
                                    {defaultSettings.showTags ? "▼" : "▶"} Tags
                                    {defaultSettings.selectedTags?.length > 0 ? `〈${defaultSettings.selectedTags.length}〉` : ""}
                                </p>

                                <button onClick={() => updateSettings({ selectedTags: [], showTags: false })}>
                                    ✖
                                </button>
                            </div>
                        </div>
                    )}

                    {defaultSettings.showTags && (
                        <>
                            <h4 className={styles.h4}>Select tags</h4>
                            <ul className={styles.labelsContainer}>
                                {tags.slice(0, defaultSettings.offsetTags).map((tag, i) => (
                                    <li
                                        key={tag + "-" + i}
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

                    {defaultSettings.showSorting && (
                        <>
                            <h4 className={styles.h4}>Sort by</h4>
                            <div className={styles.labelsContainer}>
                                {defaultSettings.sortingKeys.map((key, index) => (
                                    <button
                                        key={key + "-" + index}
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
            )}

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
                    <>
                        <ul className={styles.productsList}>
                            {sortedProducts.slice(0, defaultSettings.offsetProducts).map((product, index) => (
                                <ProductCard key={product.id ?? index} product={product} />
                            ))}
                        </ul>

                        {defaultSettings.offsetProducts < sortedProducts.length && (
                            <div className={styles.loadMoreContainer}>
                                <button className={styles.loadMoreButton} onClick={() => updateSettings({ offsetProducts: defaultSettings.offsetProducts + initOffsetProducts })}>
                                    Load more ✚
                                </button>
                            </div>
                        )}
                    </>
                )
            )}
        </div>
    );
}


// EXPORT MEMO()
export default memo(ProductsList);
