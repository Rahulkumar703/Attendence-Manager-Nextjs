import DashboardCard from '@/components/DashboardCard';
import DashboardHeader from '@/components/DashboardHeader'
import { fetchDepartments, fetchFaculties, fetchStudents, fetchSubjects } from '@/lib/dataFetcher'
import styles from '@/styles/admin_dashboard.module.scss'
import { PiBuildingsBold, PiStudentBold } from 'react-icons/pi';
import { GrWorkshop } from 'react-icons/gr';
import { LiaBookSolid } from 'react-icons/lia';
import { Suspense } from 'react';


export default async function AdminDashboard() {

    const FacultiesData = await fetchFaculties();
    const StudentsData = await fetchStudents();
    const SubjectsData = await fetchSubjects();
    const DepartmentsData = await fetchDepartments();

    return (
        <section className={styles.dashboard_section}>
            <DashboardHeader heading={'Admin Dashboard'} />
            <div className={styles.dashboard_card_container}>
                <Suspense fallback={<h1>Loading...</h1>}>
                    <DashboardCard
                        icon={<GrWorkshop size={50} />}
                        text="Faculties"
                        data={FacultiesData.faculties.length}
                        link={'/admin/dashboard/faculties'}
                    />
                    <DashboardCard
                        icon={<PiStudentBold size={50} />}
                        text="Students"
                        data={StudentsData.students.length}
                        link={'/admin/dashboard/students'}
                    />
                    <DashboardCard
                        icon={<LiaBookSolid size={50} />}
                        text="Subjects"
                        data={SubjectsData.subjects.length}
                        link={'/admin/dashboard/subjects'}
                    />
                    <DashboardCard
                        icon={<PiBuildingsBold size={50} />}
                        text="Departments"
                        data={DepartmentsData.departments.length}
                        link={'/admin/dashboard/departments'}
                    />
                </Suspense>
            </div>
        </section>
    )
}
