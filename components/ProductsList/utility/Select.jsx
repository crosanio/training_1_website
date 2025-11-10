// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
// Parent component CSS import
import styles from '../ProductsList.module.css';


// EXPORT
function Select({ placeholder, options, value, setValue }) {

    return <>

        <div className={styles.filterContainer}>

            {/* OPTIONS */}
            <select
                onChange={e => setValue(e.target.value)}
                value={value}
                className={styles.filterInput}
            >
                <option className={styles.selectOption} value=''>{placeholder || '▼ Filter by..'}</option>

                {options ? options.map((option, index) => (
                    <option
                        key={index}
                        value={option}
                        className={styles.selectOption}
                    >
                        {option}
                    </option>
                ))

                    :

                    null
                }
            </select>

            {/* RESET BUTTON */}
            <button
                onClick={() => { setValue('') }}
                className={styles.resetButton}
            >
                ✖
            </button>
        </div>
    </>
}


// EXPORT MEMO()
export default memo(Select);



