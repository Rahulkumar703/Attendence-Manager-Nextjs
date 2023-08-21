import React, { Suspense } from 'react'
import styles from '@/styles/admin_dashboard.module.scss'
import DashboardHeader from '@/components/DashboardHeader'
import { FacultyForm } from '@/components/AdminDashboard/Faculties/FacultyForm'
import FilteredFaculties from '@/components/AdminDashboard/Faculties/FilteredFaculties'
import { fetchDepartments, fetchFaculties } from '@/lib/dataFetcher'

export default async function Faculties() {

    const FacRes = await fetch(
        `${process.env.URL}/api/faculty`,
        {
            method: "GET",
            headers: {
                "Content-Type": 'application/json'
            },
            cache: 'no-store'
        },
    )
    const facultyData = await FacRes.json();
    // const facultyData = await fetchFaculties();


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
            <DashboardHeader heading={'Manage Faculties'} />
            <FacultyForm departments={departmentData?.departments || []} />
            <Suspense fallback={<h1>Loading...</h1>}>
                <FilteredFaculties data={facultyData?.faculties || []} />
            </Suspense>
        </div>
    )
}

