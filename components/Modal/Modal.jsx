// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { useState, memo } from "react";
import { createPortal } from "react-dom";


// LOCAL_CSS
import styles from './Modal.module.css';


// EXPORT
function Modal({ text, confirmAction }) {

    // USE-STATE
    const [showModal, setShowModal] = useState(true);

    return <>

        {(showModal && text && confirmAction) && createPortal(
            <div className={styles.customCssProperties}>

                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <p className={styles.modalText}>{text}</p>

                        <div className={styles.modalButtonsContainer}>
                            <button onClick={() => {
                                confirmAction();
                                setShowModal(false);
                            }}>
                                CONFIRM
                            </button>

                            <button className={styles.modalCloseButton} onClick={() => setShowModal(false)}>
                                ✖ CANCEL
                            </button>
                        </div>

                    </div>
                </div>

            </div>,
            document.body
        )}

    </>
}


// EXPORT MEMO()
export default memo(Modal);