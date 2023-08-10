import styles from '@/styles/admin_dashboard.module.scss'

export default function loading() {
    return (
        <section className={`${styles.dashboard_section} ${styles.loader}`}>
            <h1>Loading...</h1>
        </section>
    )
}
