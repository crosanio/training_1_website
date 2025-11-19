// NOTES
// The input "value" is linked to "externalValue" so it can be reset by actions outside the Searchbar.
// This also allows for the enhanced search function for ARRAYS of STRINGS, even if nested in objects.
// This element depends on the "splitQuery" function, which converts the input string into an ARRAY.


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useEffect, useState, useCallback, memo } from 'react';


// LOCAL_CSS
// Parent component CSS import
import styles from '../../ProductsList.module.css';


// LOCAL_ASSETS
import { debounce } from '../../functions/debounce';
import { splitQuery } from '../../functions/splitQuery';


// EXPORT
function Searchbar({ placeholder, setExternalValue, externalValue }) {

    // USE-STATE
    const [localValue, setLocalValue] = useState("");

    // USE-CALLBACK
    const debouncedChange = useCallback(
        debounce((val) => {
            // Split the input string into an array and send it to parent
            setExternalValue(splitQuery(val));
        }, 500),
        [setExternalValue]
    );

    // USE-EFFECT
    useEffect(() => {
        setLocalValue(
            Array.isArray(externalValue)
                ? externalValue.join(' ')
                : String(externalValue ?? '')
        );
    }, [externalValue]);

    // USE-EFFECT
    useEffect(() => {
        debouncedChange(localValue);
    }, [localValue, debouncedChange]);

    return (
        <div className={styles.filterContainer}>

            {/* INPUT FIELD */}
            <input
                type="text"
                placeholder={placeholder}
                className={styles.filterInput}
                value={localValue}
                onChange={e => setLocalValue(e.target.value)}
            />

            {/* RESET BUTTON */}
            <button
                onClick={() => setLocalValue('')}
            >
                ✖
            </button>
        </div>
    );
}


// EXPORT MEMO()
export default memo(Searchbar);
