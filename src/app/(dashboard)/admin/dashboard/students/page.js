"use client"
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { FiAlertCircle, FiArrowLeft, FiEdit3, FiLoader, FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import styles from '@/styles/admin_dashboard.module.scss'
import Input from '@/components/Input'
import { useRouter } from 'next/navigation'

export default function Student() {

    const [students, setStudents] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [studentForm, setStudentForm] = useState({});

    const [addStudentLoading, setAddStudentLoading] = useState(false);
    const [fetchDepartmentLoading, setFetchDepartmentLoading] = useState(true);
    const [fetchStudentsLoading, setFetchStudentsLoading] = useState(true);

    const [departments, setDepartments] = useState();

    const router = useRouter();

    useEffect(() => {
        const getDepartments = async () => {
            try {
                const res = await fetch('/api/department', {
                    method: "GET",
                }, { next: { revalidate: 24 * 60 * 60 } });

                const data = await res.json();
                if (data.type === 'success') {
                    setDepartments(data.departments);
                }
            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setFetchDepartmentLoading(false);
            }
        }
        const getStudents = async () => {
            try {
                const res = await fetch('/api/student', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }, { next: { revalidate: 24 * 60 * 60 } })

                const data = await res.json();
                if (res.status === 200)
                    setStudents(data.students);
                toast[data.type](data.message);


            } catch (error) {
                toast.error(data.message);
            }
            finally {
                setFetchStudentsLoading(false);
            }
        }

        getStudents();

        getDepartments();

    }, []);

    const handleChange = (e) => {
        setStudentForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addStudent = async (e) => {
        e.preventDefault();

        try {
            setAddStudentLoading(true);
            const { signal } = new AbortController()
            const res = await fetch('/api/student', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...studentForm, password: studentForm.userId }),
                cache: "no-store"
            }, { signal });

            const data = await res.json();
            if (res.status === 200) {
                setStudents(prev => ([...prev, { ...data.student }]));
                setShowForm(false);
            }
            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setAddStudentLoading(false);
        }

    }

    const editStudent = () => { }
    const deleteStudent = async (_id) => {
        try {
            const res = await fetch('/api/student', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id })
            })

            const data = await res.json();

            if (res.status === 200) {
                setStudents(prev => {
                    const filteredStudents = prev.filter(stu => {
                        return stu._id !== _id;
                    });
                    return filteredStudents;
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
                <h2>Manage Students</h2>
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
                    className={`${styles.form} ${showForm ? styles.active : ''}`}
                    onSubmit={addStudent}
                >
                    <div>
                        <div className={styles.form_input_section}>
                            <h3 className={styles.form_heading}>Personal Details:</h3>
                            <div className={styles.form_body}>
                                <Input
                                    type={"text"}
                                    name={"name"}
                                    id={"name"}
                                    label={"Name"}
                                    onChange={handleChange}
                                    disabled={addStudentLoading}
                                />
                                <Input
                                    type={"email"}
                                    name={"email"}
                                    id={"email"}
                                    label={"Email"}
                                    onChange={handleChange}
                                    disabled={addStudentLoading}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className={styles.form_input_section}>
                            <h3 className={styles.form_heading}>Academic  Details:</h3>
                            <div className={styles.form_body}>
                                <Input
                                    type={"number"}
                                    name={"userId"}
                                    id={"userId"}
                                    label={"Student Roll no."}
                                    onChange={handleChange}
                                    min={100} max={90000}
                                    disabled={addStudentLoading}
                                />
                                <Input
                                    type={"select"}
                                    options={departments}
                                    name={"department"}
                                    id={"department"}
                                    label={"Branch"}
                                    onChange={handleChange}
                                    disabled={fetchDepartmentLoading}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        className={styles.form_submit_btn}
                        type="submit"
                        varrient="filled"
                        onClick={addStudent}
                        loading={addStudentLoading}
                    >
                        <FiUserPlus size={20} />
                        Add Student
                    </Button>

                </form>
            </div>


            <div className={styles.data_container}>
                {
                    fetchStudentsLoading ?
                        <div className={styles.message_container}>
                            <FiLoader size={20} className={styles.spin} />
                            <p className={styles.message}>
                                Please wait Fetching Students...
                            </p>
                        </div>
                        :
                        students?.length === 0 ?
                            <div className={styles.message_container}>
                                <FiAlertCircle size={20} />
                                <p className={styles.message}>
                                    No Students are Added, Please add first.
                                </p>
                            </div>
                            :
                            students?.map(stu => {
                                const department = () => {
                                    let depName = stu?.department?.name?.split(' ') || [' '];
                                    depName = depName[depName?.length - 1];

                                    switch (depName) {
                                        case "(CSE)":
                                            depName = "cse";
                                            return <p className={`${styles.data_department} ${styles.cse}`}>{depName}</p>
                                        case "(CE)":
                                            depName = "civil";
                                            return <p className={`${styles.data_department} ${styles.civil}`}>{depName}</p>
                                        case "(ME)":
                                            depName = "mech";
                                            return <p className={`${styles.data_department} ${styles.mech}`}>{depName}</p>
                                        case "(EEE)":
                                            depName = "eee";
                                            return <p className={`${styles.data_department} ${styles.eee}`}>{depName}</p>
                                        case "(CA)":
                                            depName = "ca";
                                            return <p className={`${styles.data_department} ${styles.ca}`}>{depName}</p>
                                        case "(AI)":
                                            depName = "ai";
                                            return <p className={`${styles.data_department} ${styles.ai}`}>{depName}</p>
                                        default:
                                            depName = "N/A";
                                            return <p className={`${styles.data_department} ${styles.na}`}>{depName}</p>

                                    }
                                }
                                return <div key={stu._id} className={`${styles.data}`}>
                                    <p className={styles.data_id}>{stu.userId}</p>
                                    <div>
                                        <p className={styles.data_name}>{stu.name}</p>
                                        <p className={styles.data_email}>{stu.email}</p>
                                    </div>
                                    {department()}
                                    <div className={styles.data_actions}>
                                        <Button type="button" varrient="filled" className={styles.edit_btn} onClick={() => { editStudent(stu._id) }}>
                                            <FiEdit3 size={20} />
                                        </Button>
                                        <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { deleteStudent(stu._id) }}>
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
