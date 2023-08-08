"use client"
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { FiEdit3, FiLoader, FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import styles from '@/styles/admin_dashboard.module.scss'
import Input from '@/components/Input'
import { useSession } from 'next-auth/react'

export default function Faculties() {

    const session = useSession();


    const [currentUser, setCurrentUser] = useState();

    const [faculties, setFaculties] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [facultyForm, setFacultyForm] = useState({});

    const [addFacultyLoading, setAddFacultyLoading] = useState(false);
    const [fetchDepartmentLoading, setFetchDepartmentLoading] = useState(true);
    const [fetchFacultiesLoading, setFetchFacultiesLoading] = useState(true);

    const [department, setDepartment] = useState();

    useEffect(() => {

        const getDepartment = async () => {
            try {
                const res = await fetch('/api/department', {
                    method: "GET",
                }, { next: { revalidate: 60 * 60 * 24 } });

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

        const getFaculties = async () => {
            try {
                const res = await fetch('/api/faculty', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

                const data = await res.json();
                if (res.status === 200) {
                    setFaculties(data.data);
                }
                toast[data.type](data.message);


            } catch (error) {
                toast.error(data.message);
            }
            finally {
                setFetchFacultiesLoading(false);
            }
        }

        getFaculties();

        getDepartment();

    }, [])

    useEffect(() => {
        if (session?.status === 'authenticated') {
            setCurrentUser(session?.data?.user)
        }
    }, [session])

    const handleChange = (e) => {
        setFacultyForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const addFaculty = async (e) => {
        e.preventDefault();

        try {
            setAddFacultyLoading(true);
            const { signal } = new AbortController()
            const res = await fetch('/api/faculty', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...facultyForm, password: facultyForm.userId }),
                cache: "no-store"
            }, { signal });

            const data = await res.json();
            if (res.status === 200) {
                setFaculties(prev => ([...prev, { ...data.data }]))
            }
            toast[data.type](data.message);

        } catch (error) {
            toast.error(error.message);
        }
        finally {
            setAddFacultyLoading(false);
            setShowForm(false);
        }

    }


    const editFaculty = () => { }

    const deleteFaculty = async (userId) => {
        try {
            if (userId !== currentUser?.userId) {

                const res = await fetch('/api/faculty', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ userId })
                })

                const data = await res.json();

                if (res.status === 200) {
                    setFaculties(prev => {
                        const filteredFaculties = prev.filter(fac => {
                            return fac.userId !== userId;
                        });
                        return filteredFaculties;
                    })
                }
                toast[data.type](data.message);
            }
            else {
                toast.error('You Can\'t remove yourself.')
            }


        } catch (error) {
            toast.error(error.message);
        }
    }



    return (
        <section className={styles.section}>
            <h1 className={styles.section_heading}>
                Manage Faculties
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
                            <form method="POST" className={styles.form_grid} onSubmit={addFaculty}>
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
                                                disabled={addFacultyLoading}
                                            />
                                            <Input
                                                type={"email"}
                                                name={"email"}
                                                id={"email"}
                                                label={"Email"}
                                                onChange={handleChange}
                                                disabled={addFacultyLoading}
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
                                                label={"Faculty Id"}
                                                onChange={handleChange}
                                                min={10000} max={90000}
                                                disabled={addFacultyLoading}
                                            />
                                            <Input
                                                type={"select"}
                                                options={department}
                                                name={"department"}
                                                id={"department"}
                                                label={"Department"}
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
                                    onClick={addFaculty}
                                    loading={addFacultyLoading}
                                >
                                    <FiUserPlus size={20} />
                                    Add Faculty
                                </Button>

                            </form>
                        </div>
                        :
                        null
                }
            </div>


            <div className={styles.faculty_container}>
                {
                    fetchFacultiesLoading ?
                        <div className={styles.loader}>
                            <p className={styles.message}>
                                <FiLoader size={20} className={styles.spin} />
                                Please wait Fetching Faculties...
                            </p>
                        </div>
                        :
                        faculties?.length === 0 ?
                            <p className={styles.message}>No Faculties are Added</p>
                            :
                            faculties?.map(fac => {
                                const department = () => {
                                    let depName = fac.department.name.split(' ');
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
                                return <div key={fac._id} className={styles.faculty}>
                                    <p className={styles.faculty_id}>{fac.userId}</p>
                                    <div className={styles.col}>
                                        <p className={styles.faculty_name}>{fac.name}</p>
                                        <p className={styles.faculty_email}>{fac.email}</p>
                                    </div>
                                    <p className={styles.faculty_department}>
                                        {department()}
                                    </p>
                                    <div className={styles.actions}>
                                        <Button type="button" varrient="filled" onClick={() => { editFaculty(fac.userId) }}>
                                            <FiEdit3 size={20} />
                                        </Button>
                                        <Button type="button" varrient="filled" onClick={() => { deleteFaculty(fac.userId) }}>
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
