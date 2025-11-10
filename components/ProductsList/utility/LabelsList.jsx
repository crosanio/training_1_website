// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
// Parent component CSS import
import styles from '../ProductsList.module.css';


// EXPORT
function LabelsList({ placeholder, options, value, setValue }) {

    return <>

        <div className={styles.filterContainer}>

            <p className={tagsFilter} onClick={() => showTagsList()}>
                {showTags ? '▼' : '▶'} Filtra per Tags {selectedTags.length > 0 ? `〈${selectedTags.length}〉` : ''}
            </p>

            {/* RESET BUTTON */}
            <button
                onClick={() => setValue('')}
            >
                ✖
            </button>
        </div>
    </>
}


// EXPORT MEMO()
export default memo(LabelsList);



