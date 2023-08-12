"use client"
import styles from '@/styles/admin_dashboard.module.scss'
import { useRouter } from 'next/navigation'
import { FiArrowLeft } from 'react-icons/fi'

export default function Subject() {

    const router = useRouter()

    return (
        <div className={styles.dashboard_section}>
            <div className={styles.section_heading}>
                <FiArrowLeft className={styles.back_btn} size={20} onClick={() => { router.back() }} />
                <h2>Manage Classes</h2>
            </div>
        </div>
    )
}
