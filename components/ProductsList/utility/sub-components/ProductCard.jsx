// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
// Parent component CSS import
import styles from '../../ProductsList.module.css';


// SUPPORT


// COMPONENTS


// EXPORT
function ProductCard({ product }) {

    return <>

        <li className={styles.productCard}>
            <h4>{product.name}</h4>
            <p>Category: {product.category}</p>
            <p>Value: {product.price} €</p>

            <div className={styles.labelsContainer}>
                {product.tags.map((tag, index) => (
                    <p key={index} className={styles.label}>{tag}</p>
                ))}
            </div>
        </li>

    </>
}


// EXPORT MEMO()
export default memo(ProductCard);