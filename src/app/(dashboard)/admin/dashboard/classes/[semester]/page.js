import { ClassesForm } from '@/components/AdminDashboard/Classes/ClassesForm'
import FilteredClasses from '@/components/AdminDashboard/Classes/FilteredClasses'
import DashboardHeader from '@/components/DashboardHeader'
import { fetchFaculties, fetchSubjects } from '@/lib/dataFetcher'
import styles from '@/styles/admin_dashboard.module.scss'
import { Suspense } from 'react'

export default async function SemesterPage({ params }) {

    const subjectsData = await fetchSubjects(params.semester);
    const facultyData = await fetchFaculties();

    const semesterHeading = () => {
        switch (params.semester) {
            case '1': return "1st";
            case '2': return "2nd";
            case '3': return "3rd";
            default: return `${params.semester}th`;
        }
    }


    return (
        <div className={styles.dashboard_section}>
            <DashboardHeader heading={`${semesterHeading()} Semester`} />
            <ClassesForm subjects={subjectsData?.subjects || []} faculties={facultyData?.faculties || []} />
            <Suspense fallback={<h1>Loading...</h1>}>
                <FilteredClasses data={subjectsData?.subjects || []} />
            </Suspense>
        </div>
    )
}