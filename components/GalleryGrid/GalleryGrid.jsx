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
                    <div className={styles.galleryItem}>
                        <img
                            className={styles.galleryImg}
                            src={imgPaths[0]}
                            alt={`Gallery image 1`}
                        />
                    </div>
                    <div className={styles.galleryItem}>
                        <img
                            className={styles.galleryImg}
                            src={imgPaths[1]}
                            alt={`Gallery image 2`}
                        />
                    </div>
                    <div className={styles.galleryItem}>
                        <img
                            className={styles.galleryImg}
                            src={imgPaths[2]}
                            alt={`Gallery image 3`}
                        />
                    </div>
                    <div className={styles.galleryItem}>
                        <img
                            className={styles.galleryImg}
                            src={imgPaths[3]}
                            alt={`Gallery image 4`}
                        />
                    </div>
                    <div className={styles.galleryItem}>
                        <img
                            className={styles.galleryImg}
                            src={imgPaths[4]}
                            alt={`Gallery image 5`}
                        />
                    </div>
                </div>
            </div>
        </div>



        {/* <div className={styles.galleryContainer}>
            <div className={styles.galleryGrid}>
                {imgPaths.map((path, index) => (
                    <div key={index} className={styles.galleryItem}>
                        <img
                            className={styles.galleryImg}
                            src={path}
                            alt={`Gallery image ${index + 1}`}
                        />
                        <p>Image {index + 1}</p>
                    </div>
                ))}
            </div>
        </div> */}
    </>
}



// EXPORT MEMO()
export default memo(GalleryGrid);