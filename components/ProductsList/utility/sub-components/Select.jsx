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
    const handleChange = (newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className={styles.filterContainer}>

                {/* OPTIONS */}
                <select
                    onChange={e => handleChange(e.target.value)}
                    value={value}
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
                    onClick={() => handleChange('')}
                >
                    ✖
                </button>
            </div>
        </>
    );
}


// EXPORT MEMO()
export default memo(Select);