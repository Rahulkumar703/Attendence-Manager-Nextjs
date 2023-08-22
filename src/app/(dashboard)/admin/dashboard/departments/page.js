import styles from '@/styles/admin_dashboard.module.scss'
import DashboardHeader from '@/components/DashboardHeader'
import { fetchDepartments } from '@/lib/dataFetcher';
import { DepartmentForm } from '@/components/AdminDashboard/Departments/DepartmentForm';
import { Suspense } from 'react';
import FilteredDepartments from '@/components/AdminDashboard/Departments/FilteredDepartments';

export default async function Department() {


    const data = await fetchDepartments();

    return (
        <div className={styles.dashboard_section}>
            <DashboardHeader heading={'Manage Departments'} />
            <DepartmentForm />
            <Suspense fallback={<h1>Loading...</h1>}>
                <FilteredDepartments data={data?.departments || []} />
            </Suspense>
        </div>
    )
}
