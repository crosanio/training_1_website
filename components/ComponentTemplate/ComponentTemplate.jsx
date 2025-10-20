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

        <h1>H1 Title</h1>
        <h2>H2 Title</h2>
        <h3>H3 Title</h3>
        <h4>H4 Title</h4>
        <h5>H5 Title</h5>
        <h6>H6 Title</h6>
        <p>Paragraph text</p>
        <p className="small-text">Small text</p>

        <a href="">Link</a>

        <p>Text with <a href="">Link</a> in the middle.</p>

        <button onClick={testFunction} className={styles.test}>Test Function button</button>

    </>
}


// EXPORT MEMO()
export default memo(ComponentTemplate);