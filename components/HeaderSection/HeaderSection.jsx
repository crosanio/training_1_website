// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
import styles from './HeaderSection.module.css';


// EXPORT
function HeaderSection({ title, caption }) {

    return <>

        {title &&
            <div className={styles.customCssProperties}>

                <div className={styles.container}>
                    <h1 className={styles.title}>{title}</h1>
                    {caption && <p className={styles.caption}>{caption}</p>}
                </div>

            </div>
        }

    </>
}


// EXPORT MEMO()
export default memo(HeaderSection);