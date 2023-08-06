import Sidebar from "./Sidebar"

export const metadata = {
    title: 'Dashboard',
    description: 'Attendence Manager Of Motihari College Of Engineering, Motihari',
}

export default function DashboardLayout({ children }) {

    return (
        <main className="dashboard">
            <Sidebar />
            {
                children
            }
        </main>
    )

}
