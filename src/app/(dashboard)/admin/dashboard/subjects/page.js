import FilteredSubjects from '@/components/AdminDashboard/Subjects/FilteredSubjects';
import { SubjectForm } from '@/components/AdminDashboard/Subjects/SubjectForm';
import DashboardHeader from '@/components/DashboardHeader'
import { fetchSubjects } from '@/lib/dataFetcher'
import styles from '@/styles/admin_dashboard.module.scss'
import { Suspense } from 'react';

const SubjectPage = async () => {

    const data = await fetchSubjects();

    return (
        <div className={styles.dashboard_section}>
            <DashboardHeader heading={'Manage Subjects'} />
            <SubjectForm />
            <Suspense fallback={<h1>Loading...</h1>}>
                <FilteredSubjects data={data?.subjects || []} />
            </Suspense>
        </div>
    )
}

export default SubjectPage