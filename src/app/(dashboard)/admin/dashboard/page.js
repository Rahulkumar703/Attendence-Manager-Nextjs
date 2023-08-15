import DashboardHeader from '@/components/DashboardHeader'
import styles from '@/styles/admin_dashboard.module.scss'


export default function AdminDashboard() {

    return (
        <section className={styles.dashboard_section}>
            <DashboardHeader heading={'Admin Dashboard'} />
        </section>
    )
}
