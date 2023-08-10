'use client'
import styles from '@/styles/admin_dashboard.module.scss'
import { FiArrowLeft } from 'react-icons/fi'


export default function AdminDashboard() {

    return (
        <section className={styles.dashboard_section}>
            <div className={styles.section_heading}>
                <FiArrowLeft className={styles.back_btn} size={20} onClick={() => { router.back() }} />
                <h2>Admin Dashboard</h2>
            </div>
        </section>
    )
}
