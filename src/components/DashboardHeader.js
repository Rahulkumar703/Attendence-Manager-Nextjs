"use client"
import { FiArrowLeft } from 'react-icons/fi'
import styles from './styles/DashboardHeader.module.scss'
import { useRouter } from 'next/navigation'

export default function DashboardHeader({ heading }) {

    const router = useRouter();

    return (
        <div className={styles.dashboard_header}>
            <FiArrowLeft className={styles.back_btn} size={20} onClick={() => { router.back() }} />
            <h2>{heading}</h2>
        </div>
    )
}
