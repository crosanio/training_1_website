import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <main>
            <h1 className={styles.test}>404 - Page Not Found</h1>
            <p className={styles.test}>The page you are looking for does not exist.</p>
        </main>
    )
}
