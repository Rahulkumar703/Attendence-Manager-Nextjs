import styles from '@/styles/admin_dashboard.module.scss'
import DashboardHeader from '@/components/DashboardHeader'
import { Suspense } from 'react'
import { fetchDepartments, fetchStudents } from '@/lib/dataFetcher'
import { StudentForm } from '@/components/AdminDashboard/Students/StudentForm'
import FilteredStudents from '@/components/AdminDashboard/Students/FilteredStudents'

export default async function Student() {


    const StuRes = await fetch(
        `${process.env.URL}/api/student`,
        {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            },
            cache: 'no-store'
        },
    )
    const studentsData = await StuRes.json();
    // const studentsData = await fetchStudents();

    const DepRes = await fetch(
        `${process.env.URL}/api/department`,
        {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            },
            cache: 'no-store'
        },
    )
    const departmentData = await DepRes.json();
    // const departmentData = await fetchDepartments();


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
