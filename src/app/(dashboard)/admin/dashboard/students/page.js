"use client"
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { FiEdit3, FiLoader, FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import styles from '@/styles/admin_dashboard.module.scss'
import Input from '@/components/Input'

export default function Student() {

    const [students, setStudents] = useState([
        {
            classes: [],
            department: { _id: '64cfdd92c7d06ec62a904e54', name: 'Computer Science Engineering (CSE)', code: 105 },
            email: "golusir@gmail.com",
            isVarified: false,
            level: 2,
            name: "golu",
            userId: 999,
            _id: "64d278ff3dfbd7a316b0ffa8"
        },
        {
            classes: [],
            department: { _id: '64cfdd92c7d06ec62a904e54', name: 'Computer Science Engineering (CSE)', code: 105 },
            email: "golusir@gmail.com",
            isVarified: false,
            level: 2,
            name: "golu",
            userId: 999,
            _id: "64d278ff3dfbd7a316b0ffa8"
        }
    ]);

    const [showForm, setShowForm] = useState(false);
    const [studentForm, setStudentForm] = useState({});

    const [addStudentLoading, setAddStudentLoading] = useState(false);
    const [fetchDepartmentLoading, setFetchDepartmentLoading] = useState(true);
    const [fetchStudentsLoading, setFetchStudentsLoading] = useState(true);

    const [department, setDepartment] = useState();

    useEffect(() => {
        const getDepartment = async () => {
            try {
                const res = await fetch('/api/department', {
                    method: "GET",
                }, { next: { revalidate: 60 } });

                const data = await res.json();
                if (data.type === 'success') {
                    setDepartment(data.department);
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
                }, { next: { revalidate: 60 } })

                const data = await res.json();
                if (res.status === 200)
                    setStudents(data.data);
                toast[data.type](data.message);


            } catch (error) {
                toast.error(data.message);
            }
            finally {
                setFetchStudentsLoading(false);
            }
        }

        // getStudents();

        // getDepartment();

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
                setStudents(prev => ([...prev, { ...data.data }]))
            }
            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setAddStudentLoading(false);
            setShowForm(false);
        }

    }

    const editStudent = () => { }
    const deleteStudent = async (userId) => {
        try {
            const res = await fetch('/api/student', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId })
            })

            const data = await res.json();

            if (res.status === 200) {
                setStudents(prev => {
                    const filteredStudents = prev.filter(stu => {
                        return stu.userId !== userId;
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
        <section className={styles.section}>
            <h1 className={styles.section_heading}>
                Manage Students
            </h1>

            <div className={styles.add_faculty_container}>
                <div className={styles.faculty_form_toggler}>
                    <Button varrient="outline" type="button" onClick={() => { setShowForm(prev => !prev) }}>
                        {
                            showForm ?
                                <>
                                    <FiX size={20} />
                                    Close
                                </>
                                :
                                <>
                                    <FiPlus size={20} />
                                    Add
                                </>
                        }
                    </Button>

                </div>
                {
                    showForm ?
                        <div className={styles.add_faculty_form_container}>
                            <form method="POST" className={styles.form_grid} onSubmit={addStudent}>
                                <div>
                                    <div className={styles.input_section}>
                                        <h3 className={styles.section_heading}>Personal Details:</h3>
                                        <div className={styles.section_body}>
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
                                    <div className={styles.input_section}>
                                        <h3 className={styles.section_heading}>Academic  Details:</h3>
                                        <div className={styles.section_body}>
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
                                                options={department}
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
                                    className={styles.button}
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
                        :
                        null
                }
            </div>


            <div className={styles.faculty_container}>
                {
                    fetchStudentsLoading ?
                        <div className={styles.loader}>
                            <p className={styles.message}>
                                <FiLoader size={20} className={styles.spin} />
                                Please wait Fetching Students...
                            </p>
                        </div>
                        :
                        students?.length === 0 ?
                            <p className={styles.message}>No Students are Added</p>
                            :
                            students?.map(stu => {
                                const department = () => {
                                    let depName = stu.department.name.split(' ');
                                    depName = depName[depName.length - 1];

                                    switch (depName) {
                                        case "(CSE)":
                                            depName = "C.S.E";
                                            return <p className={`${styles.faculty_department} ${styles.cse}`}>{depName}</p>
                                        case "(CE)":
                                            depName = "C.E";
                                            return <p className={`${styles.faculty_department} ${styles.civil}`}>{depName}</p>
                                        case "(ME)":
                                            depName = "M.E";
                                            return <p className={`${styles.faculty_department} ${styles.mech}`}>{depName}</p>
                                        case "(EEE)":
                                            depName = "E.E.E";
                                            return <p className={`${styles.faculty_department} ${styles.eee}`}>{depName}</p>
                                        case "(CA)":
                                            depName = "C.A";
                                            return <p className={`${styles.faculty_department} ${styles.ca}`}>{depName}</p>
                                        case "(AI)":
                                            depName = "A.I";
                                            return <p className={`${styles.faculty_department} ${styles.ai}`}>{depName}</p>

                                    }
                                }
                                return <div key={stu._id} className={styles.faculty}>
                                    <p className={styles.faculty_id}>{stu.userId}</p>
                                    <div className={styles.col}>
                                        <p className={styles.faculty_name}>{stu.name}</p>
                                        <p className={styles.faculty_email}>{stu.email}</p>
                                    </div>
                                    <p className={styles.faculty_department}>
                                        {department()}
                                    </p>
                                    <div className={styles.actions}>
                                        <Button type="button" varrient="filled" onClick={editStudent}>
                                            <FiEdit3 size={20} />
                                        </Button>
                                        <Button type="button" varrient="filled" onClick={() => { deleteStudent(stu.userId) }}>
                                            <AiOutlineDelete size={20} />
                                        </Button>
                                    </div>
                                </div>
                            }).reverse()

                }
            </div>

        </section>
    )
}
