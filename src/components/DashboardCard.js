import React from 'react'
import styles from '@/components/styles/DashboardCard.module.scss'
import Link from 'next/link'

const DashboardCard = ({ icon, text, data, link }) => {
    return (
        <Link href={link} className={styles.card_container}>
            <div className={styles.card_icon}>
                {icon}
            </div>
            <h3 className={styles.card_data}>
                {data}
            </h3>
            <h3 className={styles.card_text}>
                {text}
            </h3>

        </Link>
    )
}

export default DashboardCard