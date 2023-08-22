import ProgressBar from '@/components/ProgressBar'
import styles from '@/styles/admin_dashboard.module.scss'

export default function loading() {
    return (
        <section className={`${styles.dashboard_section} ${styles.loader}`}>
            <ProgressBar />
            <div className={styles.dashboard_section}>
                <h2>Loading...</h2>
            </div>
        </section>
    )
}
