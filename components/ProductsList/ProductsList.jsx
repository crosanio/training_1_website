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

    // Settings
    const elementSettings = {
        useFilters: true,
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

    const activeFilters = useMemo(() => {
        const realQueryActive = query.filter(v => v !== "").length > 0;
        const realTagsActive = selectedTags.filter(v => v !== "").length > 0;

        return (
            realQueryActive ||
            selectedCategory !== "" ||
            realTagsActive
        );
    }, [query, selectedCategory, selectedTags]);

    // Reset Filters
    const resetAll = () => {
        // setShowFilters(false);
        setShowSorting(false);
        setShowTags(false);
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

    // Allowed Sorting Keys
    const allowedSortingKeys = useMemo(() => {
        return ['name', 'price', 'category'];
    }, []);

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

    // DEBUG
    console.log('Tags:');
    console.log(tags);

    return <>

        <div className={styles.customCssProperties}>

            <h3 className={styles.resultsCount}>{productsArray.length} results</h3>

            {/* LIST SETTINGS */}
            <div className={styles.container}>

                <button
                    className={styles.button}
                    onClick={() => {
                        const newShowSorting = !showSorting;
                        setShowSorting(newShowSorting);
                    }}
                >
                    {showSorting ? '▼' : '▶'} Sorting
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
                    className={`${styles.button} ${styles.resetButton} ${activeFilters ? '' : styles.unactiveResetButton}`}
                    onClick={() => { resetAll(); }}
                    disabled={!activeFilters}
                >
                    <span>✖</span><span>Reset all</span>
                </button>

            </div>


            {/* SORTING */}
            {showSorting &&
                <div className={styles.filtersSection}>
                    <h3 className="debug">Sorting keys here</h3>
                </div>
            }

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
                <div className={styles.tagsContainer}>
                    {tags.slice(0, offsetTags).map((tag, index) =>
                        <p
                            key={index}
                            className={styles.tagLabel}
                            onClick={() => handleTagClick(tag)}
                        >
                            {tag}
                        </p>
                    )}
                    {offsetTags < tags.length && (
                        <button
                            onClick={() => setOffsetTags(offsetTags + elementSettings.offsetTags)}
                            className={`${styles.tagLabel} ${styles.loadMoreTagsButton}`}
                        >
                            Show more ✚
                        </button>
                    )}
                </div>}


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