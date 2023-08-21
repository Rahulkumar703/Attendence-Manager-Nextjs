"use client"
import Button from '@/components/Button';
import DashboardHeader from '@/components/DashboardHeader'
import Input from '@/components/Input';
import SearchBar from '@/components/SearchBar';
import styles from '@/styles/admin_dashboard.module.scss'
import { useEffect, useState } from 'react';
import { FiAlertCircle, FiLoader, FiPlus, FiX } from 'react-icons/fi';
import { LuBookPlus } from 'react-icons/lu';
import { toast } from 'react-toastify';

export default function SemesterPage({ params }) {

    const [classes, setClasses] = useState({
        data: [],
        loading: true
    })
    const [faculties, setFaculties] = useState({
        data: [],
        loading: true
    })
    const [subjects, setSubjects] = useState({
        data: [],
        loading: true

    })


    const [classForm, setClassForm] = useState({
        data: {
            userId: { _id: '', name: '' },
            subjectId: { _id: '', name: '' }
        },
        loading: false
    })

    const [searchValue, setSearchValue] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);

    const semesterHeading = () => {
        switch (params.semester) {
            case '1': return "1st";
            case '2': return "2nd";
            case '3': return "3rd";
            default: return `${params.semester}th`;
        }
    }

    useEffect(() => {

        const getClasses = async () => {
            try {
                const res = await fetch(`/api/classes`, { next: { revalidate: 24 * 60 * 60 } });

                const data = await res.json();

                if (res.status === 200) {
                    setClasses(prev => ({ ...prev, data: data.classes }))
                }

                toast[data.type](data.message, { toastId: 'getClass' });

            } catch (error) {
                toast.error(error.message, { toastId: 'getClassError' });
            }
            finally {
                setClasses(prev => ({ ...prev, loading: false }))
            }
        }
        const getFaculties = async () => {
            try {
                const res = await fetch(`/api/faculty`, { next: { revalidate: 24 * 60 * 60 } });

                const data = await res.json();

                if (res.status === 200) {
                    setFaculties(prev => ({ ...prev, data: data.faculties }))
                }

            } catch (error) {
                toast.error(error.message, { toastId: 'getFacultiesError' });
            }
            finally {
                setFaculties(prev => ({ ...prev, loading: false }))
            }
        }

        getClasses();
        getFaculties();

    }, []);


    useEffect(() => {
        const getSubjects = async () => {
            try {
                const res = await fetch(`/api/subject/${params.semester}`, { next: { revalidate: 24 * 60 * 60 } });

                const data = await res.json();

                if (res.status === 200) {
                    setSubjects(prev => ({ ...prev, data: data.subjects }))
                }

            } catch (error) {
                toast.error(error.message, { toastId: 'getSubjectsError' });
            }
            finally {
                setSubjects(prev => ({ ...prev, loading: false }))
            }
        }
        getSubjects();

    }, [params])

    const handleChange = async (e) => {
        console.log(classForm);
        setClassForm(prev => ({ ...prev, data: { ...prev.data, [e.target.name]: e.target.value } }));
        console.log(classForm);
    }
    const handleSubmit = async () => {
        try {
            const res = await fetch(`/api/classes`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId: classForm.data.userId._id, subjectId: classForm.data.subjectId._id })
            });

            const data = await res.json();

            if (res.status === 200) {
                setClasses(prev => ({ ...prev, data: [...prev.data, data.classes] }))
            }
            toast[data.type](data.message, { toastId: 'addClass' });

        } catch (error) {
            toast.error(error.message, { toastId: 'addClassError' });
        }
        finally {
            setSubjects(prev => ({ ...prev, loading: false }))
        }
    }

    return (
        <div className={styles.dashboard_section}>
            <DashboardHeader heading={`${semesterHeading()} Semester`} />

            <div className={styles.form_container}>

                <div className={styles.form_toggle_btn}>
                    <SearchBar value={searchValue} setValue={setSearchValue} />

                    <Button
                        varrient="outline"
                        type="button" onClick={() => {
                            setShowForm(prev => !prev);
                            setIsUpdate(false);
                            setClassForm({
                                data: {
                                    userId: { _id: '', name: '' },
                                    subjectId: { _id: '', name: '' }
                                },
                                loading: false
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
                    className={`${styles.form} ${styles.row} ${showForm ? styles.active : ''}`}
                    onSubmit={handleSubmit}
                >
                    <div>
                        <div className={styles.form_input_section}>
                            <h3 className={styles.form_heading}>Class Details:</h3>
                            <div className={styles.form_body}>
                                <Input
                                    type={"select"}
                                    name={"userId"}
                                    id={"userId"}
                                    label={"Class Faculty"}
                                    onChange={handleChange}
                                    value={classForm.data.userId.name}
                                    disabled={faculties.loading}
                                    options={faculties.data}
                                />

                                <Input
                                    type={"select"}
                                    name={"subjectId"}
                                    id={"subjectId"}
                                    label={"Class Subject"}
                                    onChange={handleChange}
                                    value={classForm.data.subjectId.name}
                                    disabled={subjects.loading}
                                    options={subjects.data}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        className={styles.form_submit_btn}
                        type="submit"
                        varrient="filled"
                        loading={classForm.loading}
                    >
                        <LuBookPlus size={20} />
                        {
                            isUpdate ?
                                'Update Class'
                                :
                                'Assign Class'
                        }
                    </Button>
                </form>
            </div>

            <div className={styles.data_container}>
                {
                    classes.loading ?
                        <div className={styles.message_container}>
                            <FiLoader size={20} className={styles.spin} />
                            <p className={styles.message}>
                                Please wait Fetching Classes for this Semester ...
                            </p>
                        </div>
                        :
                        !classes.data.length ?
                            <div className={styles.message_container}>
                                <FiAlertCircle size={20} />
                                <p className={styles.message}>
                                    No Classes are Added for this Semester, Please add first.
                                </p>
                            </div>
                            :
                            classes.data
                                .filter((cls) => cls.subject.name.toLowerCase().includes(searchValue.toLowerCase()) || cls.faculty.name.includes(searchValue.toLowerCase()))
                                .map((cls) => {
                                    return <div className={styles.data} key={cls._id}>

                                        <p className={styles.data_name}>{cls.subject.name}</p>
                                        <p className={styles.data_faculty}>
                                            {cls.faculty ? cls.faculty.name : 'No Faclty'}
                                        </p>

                                        <div className={styles.data_actions}>
                                        </div>

                                    </div>
                                })
                }
                {
                    !classes.loading && classes.data.length && classes.data
                        .filter((cls) => cls.subject.name.toLowerCase().includes(searchValue.toLowerCase()) || cls.faculty.name.includes(searchValue.toLowerCase()))
                        .length === 0 ?
                        <div className={styles.message_container}>
                            <FiAlertCircle size={20} />
                            <p className={styles.message}>
                                No Subject Matches with your search
                            </p>
                        </div>
                        : null
                }
            </div>
        </div>
    )
}
