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

    const [subjects, setSubjects] = useState({
        data: [],
        loading: true
    })
    const [searchValue, setSearchValue] = useState('');
    const [showForm, setShowForm] = useState(false);

    const semesterHeading = () => {
        switch (params.semester) {
            case '1': return "1st";
            case '2': return "2nd";
            case '3': return "3rd";
            default: return `${params.semester}th`;
        }
    }

    useEffect(() => {
        const getSubjects = async () => {
            try {

                const res = await fetch(`/api/subject/${params.semester}`);

                const data = await res.json();

                if (res.status === 200) {
                    setSubjects(prev => ({ ...prev, data: data.subjects }))
                }

                toast[data.type](data.message, { toastId: 'getSemesterSubjects' });

            } catch (error) {
                toast.error(error.message, { toastId: 'getSemesterSubjectsError' });
            }
            finally {
                setSubjects(prev => ({ ...prev, loading: false }))
            }
        }
        getSubjects();
    }, [params])

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
                            // setIsUpdate(false);
                            // setDepartmentForm({ name: '', code: '' })
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
                {/* <form
                    method="POST"
                    className={`${styles.form} ${styles.row} ${showForm ? styles.active : ''}`}
                    onSubmit={handleSubmit}
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
                                    value={departmentForm.name}
                                    disabled={addDepartmentLoading}
                                />
                                <Input
                                    type={"text"}
                                    name={"code"}
                                    id={"code"}
                                    label={"Department Code"}
                                    onChange={handleChange}
                                    value={departmentForm.code}
                                    disabled={addDepartmentLoading}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        className={styles.form_submit_btn}
                        type="submit"
                        varrient="filled"
                        onClick={handleSubmit}
                        loading={addDepartmentLoading}
                    >
                        <LuBookPlus size={20} />
                        {
                            isUpdate ?
                                'Update Department'
                                :
                                'Add Department'
                        }
                    </Button>
                </form> */}
            </div>

            <div className={styles.data_container}>
                {
                    subjects.loading ?
                        <div className={styles.message_container}>
                            <FiLoader size={20} className={styles.spin} />
                            <p className={styles.message}>
                                Please wait Fetching Departments...
                            </p>
                        </div>
                        :
                        !subjects.data.length ?
                            <div className={styles.message_container}>
                                <FiAlertCircle size={20} />
                                <p className={styles.message}>
                                    No Subjects are Added for this Semester, Please add first.
                                </p>
                            </div>
                            :
                            subjects.data
                                .filter((sub) => sub.name.toLowerCase().includes(searchValue.toLowerCase()) || (sub.code + '').includes(searchValue))
                                .map((sub) => {
                                    return <div className={styles.data} key={sub._id}>

                                        <p className={styles.data_id}>{sub.code}</p>
                                        <p className={styles.data_name}>{sub.name}</p>

                                    </div>
                                }).sort((a, b) => a.semester - b.semester)
                }
                {
                    !subjects.loading && subjects.data.length && subjects.data
                        .filter((sub) => sub.name.toLowerCase().includes(searchValue.toLowerCase()) || (sub.code + '').includes(searchValue)).length === 0 ?
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
