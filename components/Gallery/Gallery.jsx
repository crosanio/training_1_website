// NOTES

/*
WARNING:
This component depends on the existence of the folder "public/Gallery/(sub-folders here)", used to extract the paths of images to render, and group them by folder.
Wherever this component is used, ensure that the images are stored in "/public/Gallery/(folder)" and provide the relative array of image paths via the prop "imgPaths".

INSTRUCTIONS:
1. Import this component into your desired page or component.
2. Import "galleriesPaths" from this component's folder into the desired page to access available arrays of image paths.
3. Pass the chosen array as the "imgPaths" prop.
*/


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, useMemo, memo } from "react";
import { createPortal } from "react-dom";


// LOCAL_CSS
import styles from './Gallery.module.css';


// LOCAL_ASSETS
import LazyItem from './utility/LazyItem';
import galleriesPaths from './utility/galleriesPaths';


// EXPORT
function Gallery({ imgPaths }) {

    // SUPPORT
    const offsetStep = 6;

    // USE-STATE
    const [offset, setOffset] = useState(offsetStep);
    const [zoomImg, setZoomImg] = useState(null);

    // SUPPORT
    const visibleImgs = useMemo(() => {
        return imgPaths.slice(0, offset);
    }, [imgPaths, offset]);


    // // USE-EFFECT
    useEffect(() => {
        if (zoomImg) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [zoomImg]);

    // DEBUG
    console.log("galleriesPaths:");
    console.log(galleriesPaths);

    return <>

        {/* GALLERY GRID */}

        <div className={styles.customCssProperties}>
            <div className={styles.galleryContainer + ' ' + styles.fullwidthGrid}>
                <div className={styles.gallery}>

                    {visibleImgs.map((path, index) => {
                        let extraClass = styles.galleryItem;
                        if (offset < imgPaths.length && index >= visibleImgs.length - 3) {
                            extraClass += ` ${styles.transparency}`;
                        }

                        return (
                            <LazyItem key={index} extraClass={extraClass}>
                                <img
                                    className={styles.galleryImg}
                                    src={path}
                                    alt={`Gallery image ${index + 1}`}
                                    onClick={() => setZoomImg(path)}
                                />
                            </LazyItem>
                        );
                    })}

                    {
                        offset < imgPaths.length &&
                        <div className={styles.loadMoreContainer}>
                            <button className={styles.loadMoreButton} onClick={() => setOffset(offset + offsetStep)}>Show more ✚</button>
                        </div>
                    }

                </div>
            </div>
        </div>



        {/* ZOOMED IMAGE OVERLAY */}

        {zoomImg && createPortal(
            <div
                className={styles.zoomOverlay}
                onClick={() => setZoomImg(null)}
            >
                <div className={styles.zoomImgContainer}>
                    <img
                        className={styles.zoomImg}
                        src={zoomImg}
                        alt="Zoomed"
                    />
                    <button className={styles.zoomCloseButton} onClick={() => setZoomImg(null)}>✖</button>
                </div>
            </div>,
            document.body
        )}

    </>
}



// EXPORT MEMO()
export default memo(Gallery);