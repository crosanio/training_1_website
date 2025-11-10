// NOTES
// The input "value" is linked to "externalValue" so it can be reset by actions outside the Searchbar.
// This also allows for the enhanced search function for ARRAYS of STRINGS.
// To filter by an ARRAY of STRINGS, you need an auxiliary function, "splitQuery," that converts the input string into an ARRAY.


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useEffect, useState, useCallback, memo } from 'react';


// LOCAL_CSS
// Parent component CSS import
import styles from '../ProductsList.module.css';


// LOCAL_ASSETS
import { debounce } from '../functions/debounce';
import { splitQuery } from '../functions/splitQuery';


// EXPORT
function Searchbar({ placeholder, setExternalValue, externalValue }) {

    // SUPPORT

    // USE-STATE
    const [localValue, setLocalValue] = useState("");

    // USE-CALLBACK
    const debouncedChange = useCallback(
        debounce((localValue) => {
            setExternalValue(splitQuery(localValue));
        }, 500),
        [setExternalValue]
    );

    // USE-EFFECT

    // Debounce
    useEffect(() => {
        debouncedChange(localValue);
    }, [localValue, debouncedChange]);

    // Reset to resetted External Value
    useEffect(() => {
        setLocalValue(externalValue.join(' '));
    }, [externalValue]);

    return (
        <div className={styles.filterContainer}>
            <input
                type="text"
                placeholder={placeholder}
                className={styles.searchbarInput}
                value={localValue}
                onChange={e => setLocalValue(e.target.value)}
            />

            {/* RESET BUTTON */}
            <button
                onClick={() => { setLocalValue(''); setExternalValue(['']); }}
            >
                ✖
            </button>
        </div>
    );
}


// EXPORT MEMO()
export default memo(Searchbar);
