// NOTES
/*
INSTRUCTIONS:
- This is a Products List component with sorting and filtering functionalities.
- Assign an array of products to the `externalProductsArray` prop.
- Assign the value "true" to the `useFilters` variable to enable filters.
- If filters are enabled, assign an array of sorting keys to the `sortByKeys` prop: e.g.: `['name', 'price', 'category']`.
- If sorting is enabled, make sure each chosen Key exists in at least one product in the assigned array of products.
*/

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
function ProductsList({ externalProductsArray, sortByKeys }) {

    // SUPPORT
    const productsArray = externalProductsArray || localProductsArray;

    // Settings
    const elementSettings = {
        useFilters: true,
        sortingKeys: sortByKeys,
        offsetTags: 5,
        offsetProducts: 5,
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

    const activeFilters = useMemo(() => {
        const realQueryActive = query.filter(v => v !== "").length > 0;
        const realTagsActive = selectedTags.filter(v => v !== "").length > 0;
        const defaultSorting = sortByKey === 'name' && sortDirection === 1;

        return (
            realQueryActive ||
            selectedCategory !== "" ||
            realTagsActive ||
            defaultSorting === false
        );
    }, [
        query,
        selectedCategory,
        selectedTags,
        sortByKey,
        sortDirection
    ]);

    // Reset Filters
    const resetAll = () => {
        setShowFilters(false);
        setShowSorting(false);
        setShowTags(false);
        setSortByKey('name');
        setSortDirection(1);
        setQuery([]);
        setSelectedCategory("");
        setSelectedTags([]);
        setOffsetProducts(elementSettings.offsetProducts);
        setOffsetTags(elementSettings.offsetTags);
        setPage(1);
    }

    // Derived Values
    const uniqueKeys = useMemo(() => {
        return getUniqueKeys(productsArray);
    }, [productsArray]);

    const categories = useMemo(() => {
        return getUniqueValuesByKey(productsArray, 'category');
    }, [productsArray]);
    const tags = useMemo(() => {
        return [...new Set(
            getUniqueValuesByKey(productsArray, "tags")
                .flatMap(item =>
                    Array.isArray(item)
                        ? item
                        : String(item).split(",")
                )
                .map(tag => tag.trim())
        )];
    }, [productsArray]);

    // Handle Tag Click
    const handleTagClick = (tag) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(selectedTags.filter(t => t !== tag));
        } else {
            setSelectedTags([...selectedTags, tag]);
        }
    }

    // Selected Tags
    const isSelectedTag = (tag) => {
        return selectedTags.includes(tag);
    }

    return <>

        <div className={styles.customCssProperties}>

            {elementSettings.useFilters &&
                <h3 className={styles.resultsCount}>{productsArray.length} results</h3>
            }

            {/* SHOW / RESET BUTTONS */}
            {elementSettings.useFilters &&
                <div className={styles.container}>

                    {sortByKeys && sortByKeys.length > 0 &&
                        <button
                            className={styles.button}
                            onClick={() => {
                                const newShowSorting = !showSorting;
                                setShowSorting(newShowSorting);
                            }}
                        >
                            {showSorting ? '▼' : '▶'} Sorting
                        </button>
                    }

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
                        className={`${styles.button} ${styles.resetButton} ${activeFilters ? '' : styles.unactiveResetButton}`}
                        onClick={() => { resetAll(); }}
                        disabled={!activeFilters}
                    >
                        <span>✖</span><span>Reset all</span>
                    </button>

                </div>
            }


            {/* SORTING */}
            {showSorting &&
                <div className={styles.labelsContainer}>

                    {elementSettings.sortingKeys.map((key, index) =>

                        <button
                            key={index}
                            className={`${styles.label} ${sortByKey === key ? styles.selectedLabel : ''}`}
                            onClick={() => {
                                if (sortByKey === key) {
                                    setSortDirection(sortDirection * -1);
                                }
                                setSortByKey(key);
                            }}
                        >
                            {sortByKey === key ? sortArrow : "⊸"} {key}
                        </button>
                    )}
                </div>
            }

            {/* FILTERS */}
            {showFilters && <>
                <div className={styles.filtersSection}>

                    <Searchbar
                        placeholder="Search"
                        setExternalValue={setQuery}
                        externalValue={query}
                    />

                    <Select
                        placeholder="▶ Category"
                        options={categories}
                        value={selectedCategory}
                        setValue={setSelectedCategory}
                    />

                    <div className={styles.filterContainer}>
                        <p
                            className={styles.filterInput}
                            onClick={() => {
                                setShowTags(!showTags);
                                setOffsetTags(elementSettings.offsetTags);
                            }}
                        >
                            {showTags ? '▼' : '▶'} Tags {selectedTags.length > 0 ? `〈${selectedTags.length}〉` : ''}
                        </p>

                        <button onClick={() => { setSelectedTags([]); setShowTags(false); }}>
                            ✖
                        </button>
                    </div>


                </div>

            </>
            }

            {/* TAGS LIST */}
            {showTags &&
                <ul className={styles.labelsContainer}>
                    {tags.slice(0, offsetTags).map((tag, index) =>
                        <li
                            key={index}
                            className={`${styles.label} ${isSelectedTag(tag) ? styles.selectedLabel : ''}`}
                            onClick={() => handleTagClick(tag)}
                        >
                            <p>{tag}</p>
                        </li>
                    )}
                    {offsetTags < tags.length && (
                        <li
                            onClick={() => setOffsetTags(offsetTags + elementSettings.offsetTags)}
                            className={`${styles.label} ${styles.loadMoreTagsButton}`}
                        >
                            Show more ✚
                        </li>
                    )}
                </ul>}


            {/* PRODUCTS LIST */}
            <ul>
                {productsArray.map((product, index) =>

                    <ProductCard key={index} product={product} />

                )}
            </ul>

        </div >


    </>
}


// EXPORT MEMO()
export default memo(ProductsList);