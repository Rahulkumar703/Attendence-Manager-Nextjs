"use client"
import Button from '@/components/Button'
import React, { useEffect, useState } from 'react'
import { FiAlertCircle, FiArrowLeft, FiCheck, FiEdit3, FiLoader, FiPlus, FiUserPlus, FiX } from 'react-icons/fi'
import { AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import styles from '@/styles/admin_dashboard.module.scss'
import Input from '@/components/Input'
import { useRouter } from 'next/navigation'
import { LuBookPlus } from 'react-icons/lu'

export default function Subject() {

    const [subjects, setSubjects] = useState([]);

    const [showForm, setShowForm] = useState(false);
    const [subjectForm, setSubjectForm] = useState({
        name: '',
        code: ''
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const [deleteSubject, setDeleteSubject] = useState({
        popup: false,
        _id: ''
    });

    const [addSubjectLoading, setAddSubjectLoading] = useState(false);
    const [fetchSubjectsLoading, setFetchSubjectsLoading] = useState(true);

    const router = useRouter();

    useEffect(() => {
        const getSubjects = async () => {
            try {
                const res = await fetch('/api/subject', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }, { next: { revalidate: 60 } })

                const data = await res.json();
                if (res.status === 200) {
                    setSubjects(data.subjects);
                }
                toast[data.type](data.message, { toastId: 'getSubject' });


            } catch (error) {
                toast.error(data.message, { toastId: 'getSubjectError' });
            }
            finally {
                setFetchSubjectsLoading(false);
            }
        }

        getSubjects();

    }, []);

    const handleChange = (e) => {
        setSubjectForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            if (subjectForm.name === '' || subjectForm.code === '') {
                toast.error('Please Fill all Details.', { toastId: 'emptyForm' });
                return;
            }

            setAddSubjectLoading(true);
            const method = isUpdate ? 'PUT' : 'POST';
            const res = await fetch('/api/subject', {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...subjectForm }),
                cache: "no-store"
            }, { next: { revalidate: 24 * 60 * 60 } });

            const data = await res.json();
            if (res.status === 200) {
                if (isUpdate) {
                    setSubjects((prev) =>
                        prev.map((sub) => (sub._id === subjectForm._id ? subjectForm : sub))
                    );
                } else {
                    setSubjects((prev) => [...prev, { ...data.subject }]);
                }
                setShowForm(false);
                setSubjectForm({
                    name: '',
                    code: ''
                })
            }
            toast[data.type](data.message, { toastId: 'addSubject' });

        } catch (error) {
            toast.error(error.message, { toastId: 'addSubjectError' });
        }
        finally {
            setAddSubjectLoading(false);
        }

    }

    const handleEdit = (sub) => {
        setShowForm(true);
        setIsUpdate(true);
        window.scrollTo(0, 0);
        setSubjectForm(sub);
    }
    const handleDelete = async (_id) => {
        try {
            const res = await fetch('/api/subject', {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ _id })
            }, { next: { revalidate: 24 * 60 * 60 } })

            const data = await res.json();

            if (res.status === 200) {
                setSubjects(prev => {
                    const filteredSubjects = prev.filter(sub => {
                        return sub._id !== _id;
                    });
                    return filteredSubjects;
                })
                setDeleteSubject({ popup: '', _id: '' })
            }

            toast[data.type](data.message, { toastId: 'deleteSubject' });

        } catch (error) {
            toast.error(error.message, { toastId: 'deleteSubjectError' });
        }
    }



    return (
        <div className={styles.dashboard_section}>
            <div className={styles.section_heading}>
                <FiArrowLeft className={styles.back_btn} size={20} onClick={() => { router.back() }} />
                <h2>Manage Subjects</h2>
            </div>

            <div className={styles.form_container}>
                <div className={styles.form_toggle_btn}>
                    <Button
                        varrient="outline"
                        type="button"
                        onClick={() => {
                            setShowForm(prev => !prev);
                            setIsUpdate(false);
                            setSubjectForm({ name: '', code: '' })
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
                            <h3 className={styles.form_heading}>Subject Details:</h3>
                            <div className={styles.form_body}>
                                <Input
                                    type={"text"}
                                    name={"name"}
                                    id={"name"}
                                    label={"Subject Name"}
                                    onChange={handleChange}
                                    value={subjectForm.name}
                                    disabled={addSubjectLoading}
                                />
                                <Input
                                    type={"text"}
                                    name={"code"}
                                    id={"code"}
                                    label={"Subject Code"}
                                    onChange={handleChange}
                                    value={subjectForm.code}
                                    disabled={addSubjectLoading}
                                />
                            </div>
                        </div>
                    </div>
                    <Button
                        className={styles.form_submit_btn}
                        type="submit"
                        varrient="filled"
                        onClick={handleSubmit}
                        loading={addSubjectLoading}
                    >
                        <LuBookPlus size={20} />
                        {isUpdate ? 'Update Subject' : 'Add Subject'}
                    </Button>

                </form>
            </div>


            <div className={styles.data_container}>
                {
                    fetchSubjectsLoading ?
                        <div className={styles.message_container}>
                            <FiLoader size={20} className={styles.spin} />
                            <p className={styles.message}>
                                Please wait Fetching Subjects...
                            </p>
                        </div>
                        :
                        subjects?.length === 0 ?
                            <div className={styles.message_container}>
                                <FiAlertCircle size={20} />
                                <p className={styles.message}>
                                    No Subjects are Added, Please add first.
                                </p>
                            </div>
                            :
                            subjects?.map(sub => {
                                return <div key={sub._id} className={`${styles.data}`}>
                                    <p className={styles.data_id}>{sub.code}</p>
                                    <p className={styles.data_name}>{sub.name}</p>

                                    <div className={styles.data_actions}>
                                        {
                                            deleteSubject.popup && deleteSubject._id === sub._id ?
                                                <>
                                                    <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { handleDelete(sub._id); }}>
                                                        <FiCheck size={20} />
                                                    </Button>
                                                    <Button type="button" varrient="filled" className={styles.edit_btn} onClick={() => { setDeleteSubject({ popup: false, _id: '' }) }}>
                                                        <FiX size={20} />
                                                    </Button>
                                                </>
                                                :
                                                <>
                                                    <Button type="button" varrient="filled" className={styles.edit_btn} onClick={() => { handleEdit(sub) }}>
                                                        <FiEdit3 size={20} />
                                                    </Button>
                                                    <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { setDeleteSubject({ popup: true, _id: sub._id }) }}>
                                                        <AiOutlineDelete size={20} />
                                                    </Button>
                                                </>

                                        }
                                    </div>
                                </div>
                            }).reverse()

                }
            </div>

        </div>
    )
}
