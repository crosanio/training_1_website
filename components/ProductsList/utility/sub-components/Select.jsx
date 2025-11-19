// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
// Parent component CSS import
import styles from '../../ProductsList.module.css';


// EXPORT
function Select({ placeholder, options, value, setValue }) {

    // SUPPORT
    const updateValue = (newValue) => {
        if (Array.isArray(value)) {
            // CASE 1: array
            setValue(newValue);
        } else if (typeof value === 'object' && value !== null) {
            // CASE 2: object
            setValue(prev => ({ ...prev, value: newValue }));
        } else {
            // CASE 3: primitive value
            setValue(newValue);
        }
    };

    return (
        <>
            <div className={styles.filterContainer}>

                {/* OPTIONS */}
                <select
                    onChange={e => updateValue(e.target.value)}
                    value={typeof value === 'object' && value !== null ? value.value ?? '' : value}
                    className={styles.filterInput}
                >
                    <option className={`${styles.selectOption} ${styles.placeholder}`} value=''>
                        {placeholder || '▼ Filter by..'}
                    </option>

                    {options
                        ? options.map((option, index) => (
                            <option
                                key={index}
                                value={option}
                                className={styles.selectOption}
                            >
                                {option}
                            </option>
                        ))
                        : null
                    }
                </select>

                {/* RESET BUTTON */}
                <button
                    onClick={() => updateValue('')}
                >
                    ✖
                </button>
            </div>
        </>
    );
}


// EXPORT MEMO()
export default memo(Select);