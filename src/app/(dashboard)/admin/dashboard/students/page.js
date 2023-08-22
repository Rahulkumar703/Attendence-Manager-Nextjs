import styles from '@/styles/admin_dashboard.module.scss'
import DashboardHeader from '@/components/DashboardHeader'
import { Suspense } from 'react'
import { fetchDepartments, fetchStudents } from '@/lib/dataFetcher'
import { StudentForm } from '@/components/AdminDashboard/Students/StudentForm'
import FilteredStudents from '@/components/AdminDashboard/Students/FilteredStudents'

export default async function Student() {


    const studentsData = await fetchStudents();
    const departmentData = await fetchDepartments();


    return (
        <div className={styles.dashboard_section}>
            <DashboardHeader heading={'Manage Students'} />
            <StudentForm departments={departmentData?.departments || []} />
            <Suspense fallback={<h1>Loading...</h1>}>
                <FilteredStudents data={studentsData?.students || []} />
            </Suspense>
        </div>
    )
}
