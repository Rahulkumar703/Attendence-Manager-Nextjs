import Sidebar from '@/components/Sidebar';
import styles from '@/styles/admin_dashboard.module.scss'
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FiBook } from 'react-icons/fi';
import { LuLayoutDashboard } from 'react-icons/lu';
import { PiBuildingsBold, PiStudentBold } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';

export const metadata = {
    title: 'Dashboard',
    description: 'Attendence Manager Of Motihari College Of Engineering, Motihari',
}

export default function DashboardLayout({ children }) {

    const SidebarLinks = [
        {
            name: "dashboard",
            icon: <LuLayoutDashboard size={20} />,
            href: "/admin/dashboard"
        },
        {
            name: "Manage Faculties",
            icon: <FaChalkboardTeacher size={20} />,
            href: "/admin/dashboard/faculties"
        },
        {
            name: "Manage Students",
            icon: <PiStudentBold size={20} />,
            href: "/admin/dashboard/students"
        },
        {
            name: "Manage Subjects",
            icon: <FiBook size={20} />,
            href: "/admin/dashboard/subjects"
        },
        {
            name: "Manage Departments",
            icon: <PiBuildingsBold size={20} />,
            href: "/admin/dashboard/departments"
        },
        {
            name: "Manage Classes",
            icon: <SiGoogleclassroom size={20} />,
            href: "/admin/dashboard/classes"
        }
    ]

    return (
        <section className={styles.dashboard}>
            <Sidebar links={SidebarLinks} />
            {
                children
            }
        </section>
    )

}
