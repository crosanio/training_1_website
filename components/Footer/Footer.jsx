// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
import styles from './Footer.module.css';


// EXPORT
function Footer({ children }) {

    return <>
        <footer className={styles.footer}>
            {children}
        </footer>
    </>
}


// EXPORT MEMO()
export default memo(Footer);