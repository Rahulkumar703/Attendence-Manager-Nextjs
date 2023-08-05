"use client"
import { useSession } from "next-auth/react"

export default function ProfilePage() {
    const session = useSession();

    if (session.status === 'authenticated') {
        const { user } = session.data;
        return (
            <main>
                <h1>Name : {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>Branch : {user.branch}</h1>
                <h1>Roll No. : {user.roll}</h1>
                <h1>Semester : {user.semester}</h1>
            </main>
        )
    }
    else {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }
}
