import DashboardHeader from "@/components/DashboardHeader";
import styles from '@/styles/admin_dashboard.module.scss'
import Link from "next/link";

export default function ClassesPage() {

    const semesterArray = [
        {
            number: 1,
            prefix: 'st'
        },
        {
            number: 2,
            prefix: 'st'
        },
        {
            number: 3,
            prefix: 'rd'
        },
        {
            number: 4,
            prefix: 'th'
        },
        {
            number: 5,
            prefix: 'th'
        },
        {
            number: 6,
            prefix: 'th'
        },
        {
            number: 7,
            prefix: 'th'
        },
        {
            number: 8,
            prefix: 'th'
        },
    ]

    return (
        <div className={styles.dashboard_section}>
            <DashboardHeader heading={'Manage Classes'} />

            <div className={styles.semester_container}>
                {
                    semesterArray.map(sem => {
                        return <Link href={`classes/${sem.number}`} key={sem.number} className={styles.semester_links}>
                            <p>{sem.number}<sup>{sem.prefix}</sup> Semester</p>
                        </Link>
                    })
                }
            </div>
        </div>
    )
}
