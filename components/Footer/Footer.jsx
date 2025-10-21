// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, memo } from "react";


// ENV


// CONTEXTS


// GLOBAL_ASSETS


// LOCAL_CSS
import styles from './Footer.module.css';


// LOCAL_ASSETS
import { testFunction } from "./functions/testFunction";


// SUPPORT


// COMPONENTS


// EXPORT
function Footer({ children }) {

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
        <footer className={styles.footer}>
            {children}
        </footer>
    </>
}


// EXPORT MEMO()
export default memo(Footer);