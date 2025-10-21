// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, memo } from "react";


// ENV


// CONTEXTS


// GLOBAL_ASSETS


// LOCAL_CSS
import styles from './Header.module.css';


// LOCAL_ASSETS
import { testFunction } from "./functions/testFunction";


// SUPPORT


// COMPONENTS


// EXPORT
function Header({ children }) {

    // USE-ROUTER

    // CONTEXT

    // USE-STATE
    const [customState, setCustomState] = useState('');

    // SUPPORT

    // USE-EFFECT
    useEffect(() => {

        // debug
        return console.log('USE-EFFECT');
    }, [customState]);

    // INIT USE-EFFECT
    useEffect(() => {

        // debug
        return console.log('INIT USE-EFFECT');
    }, []);

    return <>
        <header className={styles.header}>
            {children}
        </header>
    </>
}


// EXPORT MEMO()
export default memo(Header);