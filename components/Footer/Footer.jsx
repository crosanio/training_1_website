// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
import styles from './Footer.module.css';


// EXPORT
function Footer({ children }) {

    // SUPPORT
    function toTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return <>
        <footer>
            <div className={styles.buttonContainer}>
                <button className={styles.toTopButton} onClick={() => toTop()}>
                    <span className={styles.icon}>◤</span>
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