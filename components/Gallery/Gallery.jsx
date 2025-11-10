// NOTES

/* WARNING:
This component depends on the existence of the folder "public/Gallery", used to extract the paths of images to render in the grid.
Move the local folder "/utility/Gallery" to the "/public" folder in the root of the project or use another folder at
"/public/(folder)" and provide an array of image paths via the prop "externalImgPaths".
*/


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, useEffect, useMemo, memo } from "react";
import { createPortal } from "react-dom";


// LOCAL_CSS
import styles from './Gallery.module.css';


// LOCAL_ASSETS
import { getPaths } from "./functions/getPaths";
import LazyItem from './utility/LazyItem';


// EXPORT
function Gallery({ externalImgPaths }) {

    // SUPPORT
    const offsetStep = 6;

    // USE-STATE
    const [offset, setOffset] = useState(offsetStep);
    const [zoomImg, setZoomImg] = useState(null);

    // SUPPORT
    const imgPaths = externalImgPaths || getPaths();
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