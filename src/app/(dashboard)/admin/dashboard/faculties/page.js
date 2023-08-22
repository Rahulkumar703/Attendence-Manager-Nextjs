import React, { Suspense } from 'react'
import styles from '@/styles/admin_dashboard.module.scss'
import DashboardHeader from '@/components/DashboardHeader'
import { FacultyForm } from '@/components/AdminDashboard/Faculties/FacultyForm'
import FilteredFaculties from '@/components/AdminDashboard/Faculties/FilteredFaculties'
import { fetchDepartments, fetchFaculties } from '@/lib/dataFetcher'

export default async function Faculties() {

    const facultyData = await fetchFaculties();
    const departmentData = await fetchDepartments();


    return (
        <div className={styles.dashboard_section}>
            <DashboardHeader heading={'Manage Faculties'} />
            <FacultyForm departments={departmentData?.departments || []} />
            <Suspense fallback={<h1>Loading...</h1>}>
                <FilteredFaculties data={facultyData?.faculties || []} />
            </Suspense>
        </div>
    )
}

