'use client'
import React, { useState } from 'react'
import Input from '@/Components/Input'
import Button from '@/Components/Button';
import { GrFormAdd, GrFormClose } from 'react-icons/gr';
import './style.css'
import { useSession } from 'next-auth/react';



export default function DashboardPage() {

    const { data } = useSession();

    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({});

    const addClass = (e) => {
        e.preventDefault();
        setShowPopup(false);
    }
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    return (
        <main>
            <div className={`dashboard_header${showPopup ? ' active' : ''}`}>
                <div className="row">
                    <h2>Add Your Classes</h2>
                    <Button
                        type="submit"
                        varrient="outline"
                        onClick={() => { setShowPopup(prev => !prev) }}
                        icon={showPopup ? <GrFormClose size={20} /> : <GrFormAdd size={20} />}
                    >
                        {showPopup ? 'Close' : 'Add'}
                    </Button>
                </div>

                <div className={`form_wrapper${showPopup ? ' active' : ''}`}>
                    <form onSubmit={addClass} className={`subject_form`}>
                        <Input type={'text'} id={'subject'} label={'Subject'} onChange={handleChange} name={"subject"} />
                        <Input type={'number'} id={'semester'} label={'Semester'} onChange={handleChange} name={"semester"} />
                        <Button type="submit" varrient="filled" onClick={addClass} icon={<GrFormAdd size={20} />}>Add</Button>
                    </form>
                </div>
            </div>
            <div className="dashboard_body">
            </div>
        </main>
    )
}
