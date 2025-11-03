// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
import styles from './Footer.module.css';


// LOCAL ASSETS
import chevronDownUrl from './utility/chevronDown.svg';


// EXPORT
function Footer({ children }) {

    // SUPPORT
    function toTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const svgIcon = true;

    return <>
        <footer>
            <div className={styles.buttonContainer}>
                <button className={styles.toTopButton} onClick={() => toTop()}>

                    {!svgIcon ?
                        <span className={styles.icon}>◤</span>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="25" height="25" >
                            <path className={styles.svg} d="M5.41 16.41 L4 15 l8-8 8 8 -1.41 1.41 L12 9.83"></path>
                        </svg>
                    }

                </button>
            </div>
            <div className={styles.footerContent}>
                {children}

            </div>
        </footer>
    </>
}


// EXPORT MEMO()
export default memo(Footer);