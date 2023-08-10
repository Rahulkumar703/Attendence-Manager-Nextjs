"use client"
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { FiAlertCircle, FiArrowLeft, FiEdit3, FiLoader, FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import styles from '@/styles/admin_dashboard.module.scss'
import Input from '@/components/Input'
import { useRouter } from 'next/navigation'
import { LuBookPlus } from 'react-icons/lu'

export default function Department() {

    const [departments, setDepartments] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [departmentForm, setDepartmentForm] = useState({});

    const [addDepartmentLoading, setAddDepartmentLoading] = useState(false);
    const [fetchDepartmentsLoading, setFetchDepartmentsLoading] = useState(false);


    const router = useRouter();

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const res = await fetch('/api/department', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }, { next: { revalidate: 24 * 60 * 60 } })

                const data = await res.json();
                if (res.status === 200)
                    setDepartments(data.departments);
                toast[data.type](data.message);

            } catch (error) {
                toast.error(data.message);
            }
            finally {
                setFetchDepartmentsLoading(false);
            }
        }

        getDepartments();
    }, []);

    const handleChange = (e) => {
        setDepartmentForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addDepartment = async (e) => {
        e.preventDefault();

        try {
            setAddDepartmentLoading(true);
            const { signal } = new AbortController()
            const res = await fetch('/api/department', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...departmentForm }),
                cache: "no-store"
            }, { signal });

            const data = await res.json();
            if (res.status === 200) {
                console.log(departments);
                setDepartments(prev => ([...prev, { ...data.department }]));
                setShowForm(false);
                setDepartmentForm({});
            }
            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setAddDepartmentLoading(false);
        }

    }

    const editDepartment = () => { }
    const deleteDepartment = async (_id) => {
        try {
            const res = await fetch('/api/department', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id })
            })

            const data = await res.json();

            if (res.status === 200) {
                setDepartments(prev => {
                    const filteredDepartments = prev.filter(dep => {
                        return dep._id !== _id;
                    });
                    return filteredDepartments;
                })
            }

            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
    }



    return (
        <div className={styles.dashboard_section}>
            <div className={styles.section_heading}>
                <FiArrowLeft className={styles.back_btn} size={20} onClick={() => { router.back() }} />
                <h2>Manage Departments</h2>
            </div>

            <div className={styles.form_container}>
                <div className={styles.form_toggle_btn}>
                    <Button varrient="outline" type="button" onClick={() => { setShowForm(prev => !prev) }}>
                        {
                            showForm ?
                                <>
                                    <FiX size={20} />
                                    <p>Close</p>
                                </>
                                :
                                <>
                                    <FiPlus size={20} />
                                    <p>Add</p>
                                </>
                        }
                    </Button>

                </div>
                <form
                    method="POST"
                    className={`${styles.form} ${styles.row} ${showForm ? styles.active : ''}`}
                    onSubmit={addDepartment}
                >
                    <div>
                        <div className={styles.form_input_section}>
                            <h3 className={styles.form_heading}>Department Details:</h3>
                            <div className={styles.form_body}>
                                <Input
                                    type={"text"}
                                    name={"name"}
                                    id={"name"}
                                    label={"Department Name"}
                                    onChange={handleChange}
                                    disabled={addDepartmentLoading}
                                />
                                <Input
                                    type={"text"}
                                    name={"code"}
                                    id={"code"}
                                    label={"Department Code"}
                                    onChange={handleChange}
                                    disabled={addDepartmentLoading}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        className={styles.form_submit_btn}
                        type="submit"
                        varrient="filled"
                        onClick={addDepartment}
                        loading={addDepartmentLoading}
                    >
                        <LuBookPlus size={20} />
                        Add Department
                    </Button>

                </form>
            </div>


            <div className={styles.data_container}>
                {
                    fetchDepartmentsLoading ?
                        <div className={styles.message_container}>
                            <FiLoader size={20} className={styles.spin} />
                            <p className={styles.message}>
                                Please wait Fetching Departments...
                            </p>
                        </div>
                        :
                        departments?.length === 0 ?
                            <div className={styles.message_container}>
                                <FiAlertCircle size={20} />
                                <p className={styles.message}>
                                    No Departments are Added, Please add first.
                                </p>
                            </div>
                            :
                            departments?.map(sub => {
                                return <div key={sub._id} className={`${styles.data}`}>
                                    <p className={styles.data_id}>{sub.code}</p>
                                    <p className={styles.data_name}>{sub.name}</p>
                                    <div className={styles.data_actions}>
                                        <Button type="button" varrient="filled" className={styles.edit_btn} onClick={() => { editDepartment(sub._id) }}>
                                            <FiEdit3 size={20} />
                                        </Button>
                                        <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { deleteDepartment(sub._id) }}>
                                            <AiOutlineDelete size={20} />
                                        </Button>
                                    </div>
                                </div>
                            }).reverse()

                }
            </div>

        </div>
    )
}
