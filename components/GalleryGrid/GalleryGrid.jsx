// NOTES

/* WARNING:
This component depends on the existence of the folder "public/GalleryGrid_img", used to extract the paths of images to render in the grid.
Move the local folder "/utility/GalleryGrid_img" to the public root of the project if not already done.
*/


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, memo } from "react";


// LOCAL_CSS
import styles from './GalleryGrid.module.css';


// LOCAL_ASSETS
import { getPaths } from "./functions/getPaths";
import LazyItem from './utility/LazyItem';


// EXPORT
function GalleryGrid() {

    // SUPPORT
    const imgPaths = getPaths();

    // USE-STATE
    const [customState, setCustomState] = useState('');

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
        <div className={styles.customCssProperties}>
            <div className={styles.galleryContainer}>
                <div className={styles.galleryGrid}>

                    {imgPaths.map((path, index) => (
                        <LazyItem key={index} extraClass={styles.galleryItem}>
                            <img
                                className={styles.galleryImg}
                                src={path}
                                alt={`Gallery image ${index + 1}`}
                            />
                        </LazyItem>
                    ))}

                    <div className={styles.loadMoreContainer}>
                        <button className={styles.loadMoreButton}>Load More ✚</button>
                    </div>

                </div>
            </div>
        </div>
    </>
}



// EXPORT MEMO()
export default memo(GalleryGrid);