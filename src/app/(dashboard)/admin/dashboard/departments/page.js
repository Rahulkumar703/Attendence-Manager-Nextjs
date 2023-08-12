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
import SearchBar from '@/components/SearchBar'

export default function Department() {


    const [searchValue, setSearchValue] = useState('')
    const [departments, setDepartments] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [departmentForm, setDepartmentForm] = useState({
        _id: '',
        name: '',
        code: ''
    });
    const [isUpdate, setIsUpdate] = useState(false);
    const [deleteDepartment, setDeleteDepartment] = useState({
        popup: false,
        _id: ''
    });

    const [addDepartmentLoading, setAddDepartmentLoading] = useState(false);
    const [fetchDepartmentsLoading, setFetchDepartmentsLoading] = useState(true);


    useEffect(() => {
        async function getDepartments() {
            try {
                const res = await fetch('/api/department', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                });
                const data = await res.json();
                setDepartments(data.departments);
                toast[data.type](data.message, { toastId: 'getDepartment' });
            } catch (error) {
                toast.error(error.message, { toastId: 'getDepartmentError' });
            } finally {
                setFetchDepartmentsLoading(false);
            }
        }
        getDepartments();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartmentForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (departmentForm.name === '' || departmentForm.code === '') {
                toast.error('Please Fill all Details.', { toastId: 'emptyForm' });
                return;
            }

            setAddDepartmentLoading(true);
            const method = isUpdate ? 'PUT' : 'POST';
            const res = await fetch('/api/department',
                {
                    method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ ...departmentForm }),
                    cache: 'no-store'
                }
            );

            const data = await res.json();
            if (res.status === 200) {
                if (isUpdate) {
                    setDepartments((prev) =>
                        prev.map((dep) => (dep._id === departmentForm._id ? departmentForm : dep))
                    );
                } else {
                    setDepartments((prev) => [...prev, { ...data.department }]);
                }
                setShowForm(false);
                setDepartmentForm({
                    name: '',
                    code: ''
                });
                setIsUpdate(false);
            }
            toast[data.type](data.message, { toastId: 'addDepartment' });
        } catch (error) {
            toast.error(error.message, { toastId: 'addDepartmentError' });
        } finally {
            setAddDepartmentLoading(false);
        }
    };

    const handleEdit = (dep) => {
        setShowForm(true);
        setIsUpdate(true);
        window.scrollTo(0, 0);
        setDepartmentForm(dep);
    };

    const handleDelete = async (_id) => {
        try {
            const res = await fetch('/api/department', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ _id })
            });
            const data = await res.json();
            if (res.status === 200) {
                setDepartments((prev) => prev.filter((dep) => dep._id !== _id));
                setDeleteDepartment({ popup: false, _id: '' })
            }
            toast[data.type](data.message, { toastId: 'deleteDepartment' });
        } catch (error) {
            toast.error(error.message, { toastId: 'deleteDepartmentError' });
        }
    };



    return (
        <div className={styles.dashboard_section}>
            <div className={styles.section_heading}>
                <FiArrowLeft className={styles.back_btn} size={20} onClick={() => { router.back() }} />
                <h2>Manage Departments</h2>
            </div>

            <div className={styles.form_container}>
                <div className={styles.form_toggle_btn}>
                    <SearchBar value={searchValue} setValue={setSearchValue} />
                    <Button
                        varrient="outline"
                        type="button" onClick={() => {
                            setShowForm(prev => !prev);
                            setIsUpdate(false);
                            setDepartmentForm({ name: '', code: '' })
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
                        departments.length === 0 ?
                            <div className={styles.message_container}>
                                <FiAlertCircle size={20} />
                                <p className={styles.message}>
                                    No Departments are Added, Please add first.
                                </p>
                            </div>
                            :
                            departments
                                .filter((dep) => dep.name.toLowerCase().includes(searchValue.toLowerCase()) || dep.code.includes(searchValue))
                                .map(dep => {
                                    return <div key={dep._id} className={`${styles.data}`}>
                                        <p className={styles.data_id}>{dep.code}</p>
                                        <p className={styles.data_name}>{dep.name}</p>
                                        <div className={styles.data_actions}>
                                            {
                                                deleteDepartment.popup && deleteDepartment._id === dep._id ?
                                                    <>
                                                        <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { handleDelete(dep._id); }}>
                                                            <FiCheck size={20} />
                                                        </Button>
                                                        <Button type="button" varrient="filled" className={styles.edit_btn} onClick={() => { setDeleteDepartment({ popup: false, _id: '' }) }}>
                                                            <FiX size={20} />
                                                        </Button>
                                                    </>
                                                    :
                                                    <>
                                                        <Button type="button" varrient="filled" className={styles.edit_btn} onClick={() => { handleEdit(dep) }}>
                                                            <FiEdit3 size={20} />
                                                        </Button>
                                                        <Button type="button" varrient="filled" className={styles.delete_btn} onClick={() => { setDeleteDepartment({ popup: true, _id: dep._id }) }}>
                                                            <AiOutlineDelete size={20} />
                                                        </Button>
                                                    </>

                                            }
                                        </div>
                                    </div>
                                }).reverse()
                }

                {
                    !fetchDepartmentsLoading && departments
                        .filter((dep) => dep.name.toLowerCase().includes(searchValue.toLowerCase()) || dep.code.includes(searchValue)).length === 0 ?
                        <div className={styles.message_container}>
                            <FiAlertCircle size={20} />
                            <p className={styles.message}>
                                No Department Matches with your search
                            </p>
                        </div>
                        : null
                }
            </div>

        </div>
    )
}
