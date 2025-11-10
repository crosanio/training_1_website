// NOTES


// READY FOR CLIENT SIDE
"use client";


// UTILITY
import { memo } from "react";


// LOCAL_CSS
// Parent component CSS import
import styles from '../ProductsList.module.css';


// SUPPORT


// COMPONENTS


// EXPORT
function ProductCard({ product }) {

    return <>

        <div className={styles.productCard}>
            <h4>{product.name}</h4>
            <p>Category: {product.category}</p>
            <p>Value: {product.value} €</p>
        </div>

    </>
}


// EXPORT MEMO()
export default memo(ProductCard);