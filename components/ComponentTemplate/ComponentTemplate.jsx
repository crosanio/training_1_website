// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, memo } from "react";


// ENV


// CONTEXTS


// GLOBAL_ASSETS


// LOCAL_CSS
import styles from './ComponentTemplate.module.css';


// LOCAL_ASSETS
import { testFunction } from "./functions/testFunction";


// SUPPORT


// COMPONENTS


// EXPORT
function ComponentTemplate() {

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

        <h1 className={styles.test}>ComponentTemplate content</h1>

        <button onClick={testFunction} className={styles.test}>Test Function button</button>

    </>
}


// EXPORT MEMO()
export default memo(ComponentTemplate);