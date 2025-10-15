import styles from './ExampleComponent.module.css'

export default function ExampleComponent({ children }) {
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Example Component</h2>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    )
}
