// NOTES
// The input "value" is linked to "externalValue" so it can be reset by actions outside the Searchbar.
// This also allows for the enhanced search function for ARRAYS of STRINGS.
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

    // SUPPORT
    const updateExternalValue = (value) => {
        if (Array.isArray(externalValue)) {
            // CASE 1: array
            setExternalValue(value);
        } else if (typeof externalValue === 'object' && externalValue !== null) {
            // CASE 2: object
            setExternalValue(prev => ({ ...prev, externalValue: value }));
        } else {
            // CASE 3: primitive value
            setExternalValue(value);
        }
    };

    // USE-CALLBACK
    const debouncedChange = useCallback(
        debounce((val) => {
            updateExternalValue(splitQuery(val));
        }, 500),
        [setExternalValue, externalValue]
    );

    // USSE-EFFECT
    useEffect(() => {
        debouncedChange(localValue);
    }, [localValue, debouncedChange]);

    useEffect(() => {
        if (Array.isArray(externalValue)) {
            setLocalValue(externalValue.join(' '));
        } else if (typeof externalValue === 'object' && externalValue !== null) {
            setLocalValue((externalValue.externalValue || []).join(' '));
        } else {
            setLocalValue(String(externalValue ?? ''));
        }
    }, [externalValue]);

    return (
        <div className={styles.filterContainer}>
            <input
                type="text"
                placeholder={placeholder}
                className={styles.filterInput}
                value={localValue}
                onChange={e => setLocalValue(e.target.value)}
            />

            {/* RESET BUTTON */}
            <button
                onClick={() => {
                    setLocalValue('');
                    updateExternalValue(
                        Array.isArray(externalValue)
                            ? ['']
                            : (typeof externalValue === 'object' && externalValue !== null)
                                ? { ...externalValue, externalValue: [''] }
                                : ''
                    );
                }}
            >
                ✖
            </button>
        </div>
    );
}

// EXPORT MEMO()
export default memo(Searchbar);