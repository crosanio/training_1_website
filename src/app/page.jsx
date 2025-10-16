import styles from './page.module.css';
import Link from 'next/link';
import ComponentTemplate from "../../components/ComponentTemplate/ComponentTemplate"



export default function HomePage() {
    return (
        <main>
            <ComponentTemplate />

            <div className={styles.navigationLinks}>
                <Link href="/products">
                    <button>NAVIGATE - Products</button>
                </Link>

                <Link href="/products/product-details">
                    <button>NAVIGATE - Product Details</button>
                </Link>

                <Link href="/about-us">
                    <button>NAVIGATE - About Us</button>
                </Link>

                <Link href="/gallery">
                    <button>NAVIGATE - Gallery</button>
                </Link>

                <Link href="/faq">
                    <button>NAVIGATE - FAQ</button>
                </Link>

                <Link href="/contacts">
                    <button>NAVIGATE - Contacts</button>
                </Link>

                <Link href="/privacy-policy">
                    <button>NAVIGATE - Privacy Policy</button>
                </Link>

                <Link href="/not-found">
                    <button>NAVIGATE - Not Found</button>
                </Link>
            </div>
        </main>
    )
}
