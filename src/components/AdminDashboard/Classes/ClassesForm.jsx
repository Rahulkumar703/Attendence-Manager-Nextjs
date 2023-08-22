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
import { createUpdateClasses } from '@/lib/dataFetcher';

export const ClassesForm = ({ faculties, subjects }) => {

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
                subject: { name: '', _id: '' },
                faculty: { name: '', _id: '' }
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
                loading: true,
            }
        }))


        try {

            if (form.subject._id === '' || form.faculty._id === '') {
                toast.error('Please Fill all Details.', { toastId: 'emptyForm' });
                return;
            }

            const { subject, faculty } = form

            const data = await createUpdateClasses(subject._id, faculty._id, form.isUpdate);

            if (data) {
                setGlobalState(prev => ({
                    ...prev,
                    form: {
                        ...prev,
                        show: false,
                        isUpdate: false,
                        subject: { name: '', _id: '' },
                        faculty: { name: '', _id: '' }
                    }
                }))
            }

            router.refresh();

            toast[data.type](data.message, { toastId: 'addDepartment' });

        } catch (error) {
            toast.error(error.message, { toastId: 'addDepartmentError' });
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
                        <h3 className={styles.form_heading}>Class Details:</h3>
                        <div className={`${styles.form_body} ${styles.row}`}>
                            <Input
                                type={"select"}
                                name={"faculty"}
                                id={"faculty"}
                                label={"Faculty Name"}
                                onChange={handleChange}
                                value={form.faculty.name}
                                disabled={form.loading}
                                options={faculties}
                            />
                            <Input
                                type={"select"}
                                name={"subject"}
                                id={"subject"}
                                label={"Subject Name"}
                                onChange={handleChange}
                                value={form.subject.name}
                                disabled={form.loading || form.isUpdate}
                                options={subjects}
                            />
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
                    {form.isUpdate ? 'Update Class' : 'Assign Class'}
                </Button>

            </form>
        </div>
    )
}
