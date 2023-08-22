import FilteredSubjects from '@/components/AdminDashboard/Subjects/FilteredSubjects';
import { SubjectForm } from '@/components/AdminDashboard/Subjects/SubjectForm';
import DashboardHeader from '@/components/DashboardHeader'
import { fetchDepartments, fetchSubjects } from '@/lib/dataFetcher'
import styles from '@/styles/admin_dashboard.module.scss'
import { Suspense } from 'react';

const SubjectPage = async () => {

    const subjectsData = await fetchSubjects();
    const departmentData = await fetchDepartments();

    return (
        <div className={styles.dashboard_section}>
            <DashboardHeader heading={'Manage Subjects'} />
            <SubjectForm departments={departmentData?.departments || []} />
            <Suspense fallback={<h1>Loading...</h1>}>
                <FilteredSubjects subjects={subjectsData?.subjects || []} />
            </Suspense>
        </div>
    )
}

export default SubjectPage