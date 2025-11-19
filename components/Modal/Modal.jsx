// NOTES
/*
- Import example:
    Modal's visibility can be easily handled with a useState boolean in the parent component.

<Modal
                visibility={visibility}
                setVisibility={setVisibility}
                title="Delete item"
                text="By confirming, you will delete this item permanently. Are you sure you want to proceed?"
                confirmAction={function to be executed here}
            />
*/



// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useEffect, memo } from "react";
import { createPortal } from "react-dom";


// LOCAL_CSS
import styles from './Modal.module.css';


// EXPORT
function Modal({ visibility, setVisibility, title, text, confirmAction }) {

    // USE-EFFECT
    useEffect(() => {
        if (visibility) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [visibility]);

    return <>

        {(visibility && text && confirmAction) && createPortal(
            <div className={styles.customCssProperties}>
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>

                        <h4 className={styles.modalTitle}>{title ? title : "Action required"}</h4>

                        <p className={styles.modalText}>{text}</p>

                        <div className={styles.modalButtonsContainer}>
                            <button onClick={() => {
                                confirmAction();
                                setVisibility(false);
                            }}>
                                CONFIRM
                            </button>

                            <button className={styles.modalCloseButton} onClick={() => setVisibility(false)}>
                                ✖ CANCEL
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            ,
            document.body
        )}

    </>
}


// EXPORT MEMO()
export default memo(Modal);