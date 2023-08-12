"use client"
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { FiAlertCircle, FiArrowLeft, FiCheck, FiEdit3, FiLoader, FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import styles from '@/styles/admin_dashboard.module.scss'
import Input from '@/components/Input'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Faculties() {

    const session = useSession();

    const [currentUser, setCurrentUser] = useState();

    const [faculties, setFaculties] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [facultyForm, setFacultyForm] = useState({
        name: '',
        email: '',
        userId: '',
        department: { _id: '', name: '' }
    });
    const [isUpdate, setIsUpdate] = useState(false);

    const [addFacultyLoading, setAddFacultyLoading] = useState(false);
    const [fetchDepartmentLoading, setFetchDepartmentLoading] = useState(true);
    const [fetchFacultiesLoading, setFetchFacultiesLoading] = useState(true);

    const [departments, setDepartments] = useState();
    const [deleteFaculty, setDeleteFaculty] = useState({
        popup: false,
        _id: ''
    });

    const router = useRouter();

    useEffect(() => {

        const getDepartments = async () => {
            try {
                const res = await fetch('/api/department', {
                    method: "GET",
                }, { next: { revalidate: 60 } });

                const data = await res.json();
                if (data.type === 'success') {
                    setDepartments(data.departments);
                }
            } catch (error) {
                toast.error(error.message, { toastId: 'getDepartmentError' });
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
                }, { next: { revalidate: 60 } })

                const data = await res.json();
                if (res.status === 200) {
                    setFaculties(data.faculties);
                }
                toast[data.type](data.message, { toastId: 'getFaculty' });


            } catch (error) {
                toast.error(error.message, { toastId: 'getFacultyError' });
            }
            finally {
                setFetchFacultiesLoading(false);
            }
        }

        getFaculties();

        getDepartments();

    }, [])

    useEffect(() => {
        try {
            if (session?.status === 'authenticated') {
                setCurrentUser(session?.data?.user)
            }
        } catch (error) {
            console.log(error.message);
        }
    }, [session])

    const handleChange = (e) => {
        setFacultyForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (facultyForm.name === '' || facultyForm.email === '' || facultyForm.userId === '' || facultyForm.department === '') {
                toast.error('Please Fill all Details.', { toastId: 'emptyForm' });
                return;
            }

            setAddFacultyLoading(true);
            const { signal } = new AbortController()
            const method = isUpdate ? 'PUT' : 'POST';
            const res = await fetch('/api/faculty', {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        ...facultyForm,
                        password: facultyForm.userId,
                        department: facultyForm.department._id
                    }
                ),
                cache: "no-store"
            }, { signal });

            const data = await res.json();
            if (res.status === 200) {
                if (isUpdate) {
                    setFaculties((prev) =>
                        prev.map((fac) => (fac._id === facultyForm._id ? facultyForm : fac))
                    );
                }
                else {
                    setFaculties(prev => ([...prev, { ...data.faculty }]));
                }
                setShowForm(false);
                setFacultyForm({
                    name: '',
                    email: '',
                    userId: '',
                    department: { _id: '', name: '' }
                })
            }
            toast[data.type](data.message, { toastId: 'addFaculty' });

        } catch (error) {
            toast.error(error.message, { toastId: 'addFacultyError' });
        }
        finally {
            setAddFacultyLoading(false);
            setShowForm(false);
        }

    }


    const handleEdit = (fac) => {
        setShowForm(true);
        setIsUpdate(true);
        window.scrollTo(0, 0);
        setFacultyForm(fac);
    }

    const handleDelete = async (_id) => {
        try {
            if (_id !== currentUser?._id) {

                const res = await fetch('/api/faculty', {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ _id })
                })

                const data = await res.json();

                if (res.status === 200) {
                    setFaculties(prev => {
                        const filteredFaculties = prev.filter(fac => {
                            return fac._id !== _id;
                        });
                        return filteredFaculties;
                    })
                    setDeleteFaculty({ popup: false, _id: '' })
                }
                toast[data.type](data.message, { toastId: 'deleteFaculty' });
            }
            else {
                toast.error('You Can\'t remove yourself.', { toastId: 'selfDeleteFacultyError' })
            }


        } catch (error) {
            toast.error(error.message, { toastId: 'deleteFacultyError' });
        }
    }



    return (
        <div className={styles.dashboard_section}>
            <div className={styles.section_heading}>
                <FiArrowLeft className={styles.back_btn} size={20} onClick={() => { router.back() }} />
                <h2>Manage Faculties</h2>
            </div>

            <div className={styles.form_container}>
                <div className={styles.form_toggle_btn}>
                    <Button
                        varrient="outline"
                        type="button"
                        onClick={() => {
                            setShowForm(prev => !prev);
                            setIsUpdate(false);
                            setFacultyForm({
                                name: '',
                                email: '',
                                userId: '',
                                department: { _id: '', name: '' }
                            })
                        }}
                    >
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
                    onSubmit={handleSubmit}
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
                                    value={facultyForm.name}
                                    disabled={addFacultyLoading}
                                />
                                <Input
                                    type={"email"}
                                    name={"email"}
                                    id={"email"}
                                    label={"Email"}
                                    onChange={handleChange}
                                    value={facultyForm.email}
                                    disabled={addFacultyLoading}
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
                                    label={"Faculty Id"}
                                    onChange={handleChange}
                                    value={facultyForm.userId}
                                    disabled={addFacultyLoading}
                                />
                                <Input
                                    type={"select"}
                                    options={departments}
                                    name={"department"}
                                    id={"department"}
                                    label={"Department"}
                                    onChange={handleChange}
                                    value={facultyForm.department.name}
                                    disabled={fetchDepartmentLoading}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        className={styles.form_submit_btn}
                        type="submit"
                        varrient="filled"
                        onClick={handleSubmit}
                        loading={addFacultyLoading}
                    >
                        <FiUserPlus size={20} />
                        {isUpdate ? 'Update Faculty' : 'Add Faculty'}
                    </Button>

                </form>
            </div>

            <div className={styles.data_container}>
                {
                    fetchFacultiesLoading ?
                        <div className={styles.message_container}>
                            <FiLoader size={20} className={styles.spin} />
                            <p className={styles.message}>
                                Please wait Fetching Faculties...
                            </p>
                        </div>
                        :
                        faculties?.length === 0 ?
                            <div className={styles.message_container}>
                                <FiAlertCircle size={20} />
                                <p className={styles.message}>
                                    No Faculties are Added
                                </p>
                            </div>
                            :
                            faculties?.map(fac => {
                                const department = () => {
                                    let depName = fac?.department?.name?.split(' ') || [' '];
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
                                return <div key={fac._id} className={styles.data}>
                                    <p className={styles.data_id}>{fac.userId}</p>
                                    <div className={styles.col}>
                                        <p className={styles.data_name}>{fac.name}</p>
                                        <p className={styles.data_email}>{fac.email}</p>
                                    </div>
                                    {department()}
                                    <div className={styles.data_actions}>
                                        <div className={styles.data_actions}>
                                            {
                                                deleteFaculty.popup && deleteFaculty._id === fac._id ?
                                                    <>
                                                        <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { handleDelete(fac._id); }}>
                                                            <FiCheck size={20} />
                                                        </Button>
                                                        <Button type="button" varrient="filled" className={styles.edit_btn} onClick={() => { setDeleteFaculty({ popup: false, _id: '' }) }}>
                                                            <FiX size={20} />
                                                        </Button>
                                                    </>
                                                    :
                                                    <>
                                                        <Button type="button" varrient="filled" className={styles.edit_btn} onClick={() => { handleEdit(fac) }}>
                                                            <FiEdit3 size={20} />
                                                        </Button>
                                                        <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { setDeleteFaculty({ popup: true, _id: fac._id }) }}>
                                                            <AiOutlineDelete size={20} />
                                                        </Button>
                                                    </>

                                            }
                                        </div>
                                    </div>
                                </div>
                            }).reverse()

                }
            </div>

        </div>
    )
}
