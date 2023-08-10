"use client"
import { useSession } from "next-auth/react"

export default function ProfilePage() {
    const session = useSession();

    if (session.status === 'authenticated') {
        const { user } = session.data;
        console.log(user);
        return (
            <div>
                <h1>Name : {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>Branch : {user.department.name}</h1>
                <h1>UserId. : {user.userId}</h1>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }
}
