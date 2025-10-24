// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
import styles from './Header.module.css';


// EXPORT
function Header({ children }) {

    return <>
        <header className={styles.header}>
            {children}
        </header>
    </>
}


// EXPORT MEMO()
export default memo(Header);