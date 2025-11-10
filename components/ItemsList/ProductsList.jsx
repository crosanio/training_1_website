// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, useMemo, memo } from "react";


// LOCAL_CSS
import styles from './ProductsList.module.css';


// LOCAL_ASSETS
import { sortBy } from "./functions/sortBy";
import { productsArray } from "../utility/productsArray";


// SUPPORT


// COMPONENTS


// EXPORT
function ProductsList() {

    // SUPPORT

    // Settings
    const listSettings = {
        showFilters: true,
        showSorting: true,
        showPagination: true,
        itemsPerPage: 20,
        offsetTags: 5,
        offsetItems: 10,
    }

    // USE-STATE
    const [sortBy, setSortBy] = useState('name');
    const [sortDirection, setSortDirection] = useState(1);

    const [offsetTags, setOffsetTags] = useState(listSettings.offsetTags);
    const [offsetItems, setOffsetItems] = useState(listSettings.offsetItems);
    const [showModal, setShowModal] = useState(false);

    // SUPPORT
    const sortArrow = sortDirection === 1 ? '▼' : '▲';

    return <>

        <div className={styles.customCssProperties}>

            {itemsArray.map((item, index) =>

                <div key={index} className={styles.itemCard}>
                    <h4>{item.name}</h4>
                    <p>Category: {item.category}</p>
                    <p>Value: ${item.value}</p>
                </div>

            )}

        </div>


    </>
}


// EXPORT MEMO()
export default memo(ProductsList);