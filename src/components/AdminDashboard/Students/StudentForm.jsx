"use client"
import Input from '@/components/Input';
import Button from '@/components/Button';
import { LuBookPlus } from 'react-icons/lu';
import { FiPlus, FiX } from 'react-icons/fi';
import GlobalContext from '@/context/global/GlobalContext';
import { useContext } from 'react';
import styles from '@/components/AdminDashboard/DataForm.module.scss'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

import { createUpdateStudents } from '@/lib/dataFetcher';

export const StudentForm = ({ departments }) => {

    const { globalState, setGlobalState } = useContext(GlobalContext);
    const router = useRouter();


    const { form } = globalState;

    const toggleForm = () => {
        setGlobalState(prev => ({
            ...prev,
            form: {
                ...form,
                isUpdate: false,
                show: !form.show,
                loading: false,
                name: '',
                userId: '',
                semester: '',
                registration_number: '',
                department: { name: '', _id: '' },
            }
        })
        )
    }


    const handleChange = (e) => {
        setGlobalState(prev => ({
            ...prev,
            form: {
                ...form,
                [e.target.name]: e.target.value
            }
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setGlobalState(prev => ({
            ...prev,
            form: {
                ...form,
                loading: true
            }
        }))

        try {

            if (form.name === '' ||
                form.registration_number === '' ||
                form.userId === '' ||
                form.department._id === '' ||
                form.semester === '') {
                toast.error('Please Fill all Details.', { toastId: 'emptyForm' });
                return;
            }

            const { _id, name, userId, registration_number, semester, department } = form

            const data = await createUpdateStudents(_id, name, userId, registration_number, semester, department._id, form.isUpdate);

            if (data) {
                setGlobalState(prev => ({
                    ...prev,
                    form: {
                        ...form,
                        show: false,
                        isUpdate: false,
                        name: '',
                        userId: '',
                        semester: '',
                        registration_number: '',
                        department: { name: '', _id: '' },
                    }
                }))
            }

            router.refresh();

            toast[data.type](data.message, { toastId: 'addSubject' });

        } catch (error) {
            toast.error(error.message, { toastId: 'addSubjectError' });
        }
        finally {
            setGlobalState(prev => ({
                ...prev,
                form: {
                    ...form,
                    loading: false,
                }
            }))
        }



    }

    return (
        <div className={styles.form_container}>
            <div className={styles.form_toggle_btn}>
                <Button
                    varrient="outline"
                    type="button"
                    onClick={toggleForm}
                >
                    {
                        form.show ?
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
                className={`${styles.form} ${styles.row} ${form.show ? styles.active : ''}`}
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
                                value={form.name}
                                disabled={form.loading}
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles.form_input_section}>
                        <h3 className={styles.form_heading}>Academic  Details:</h3>
                        <div className={styles.form_body}>
                            <div className={styles.grid}>
                                <Input
                                    type={"number"}
                                    name={"userId"}
                                    id={"userId"}
                                    label={"Student Roll no."}
                                    onChange={handleChange}
                                    value={form.userId}
                                    disabled={form.loading}
                                />
                                <Input
                                    type={"number"}
                                    name={"registration_number"}
                                    id={"registration_number"}
                                    label={"Registration Number"}
                                    onChange={handleChange}
                                    value={form.registration_number}
                                    disabled={form.loading}
                                />
                                <Input
                                    type={"number"}
                                    name={"semester"}
                                    id={"semester"}
                                    label={"Student Semester"}
                                    onChange={handleChange}
                                    value={form.semester}
                                    disabled={form.loading}
                                />
                                <Input
                                    type={"select"}
                                    options={departments}
                                    name={"department"}
                                    id={"department"}
                                    label={"Branch"}
                                    onChange={handleChange}
                                    value={form.department.name}
                                    disabled={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    className={styles.form_submit_btn}
                    type="submit"
                    varrient="filled"
                    loading={form.loading}
                >
                    <LuBookPlus size={20} />
                    {form.isUpdate ? 'Update Student' : 'Add Student'}
                </Button>

            </form>
        </div>
    )
}
