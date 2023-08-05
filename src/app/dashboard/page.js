'use client'
import React, { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button';
import { GrFormAdd, GrFormClose } from 'react-icons/gr';
import './style.css'
import { useSession } from 'next-auth/react';
import AdminDashboard from '@/components/AdminDashboard';
import FacultyDashboard from '@/components/FacultyDashboard';
import StudentDashboard from '@/components/StudentDashboard';



export default function DashboardPage() {

    const { data } = useSession();
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({});

    const session = useSession();



    const addClass = (e) => {
        e.preventDefault();
        setShowPopup(false);
    }
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    if (session.status === 'authenticated') {

        const { user } = session.data;

        switch (user.level) {
            case 3:
                return <AdminDashboard />
            case 2:
                return <FacultyDashboard />
            default:
                return <StudentDashboard />
        }
    }
    else {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }

}
