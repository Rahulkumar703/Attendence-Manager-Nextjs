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
import { createUpdateDepartments } from '@/lib/dataFetcher';

export const DepartmentForm = () => {

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
                code: ''
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

            if (form.name === '' || form.code === '') {
                toast.error('Please Fill all Details.', { toastId: 'emptyForm' });
                return;
            }

            const { _id, name, code } = form

            const data = await createUpdateDepartments(_id, name, code, form.isUpdate);

            if (data) {
                setGlobalState(prev => ({
                    ...prev,
                    form: {
                        ...prev,
                        show: false,
                        isUpdate: false,
                        name: "",
                        code: ""
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
                        <h3 className={styles.form_heading}>Department Details:</h3>
                        <div className={`${styles.form_body} ${styles.row}`}>
                            <Input
                                type={"text"}
                                name={"name"}
                                id={"name"}
                                label={"Department Name"}
                                onChange={handleChange}
                                value={form.name}
                                disabled={form.loading}
                            />
                            <Input
                                type={"text"}
                                name={"code"}
                                id={"code"}
                                label={"Department Code"}
                                onChange={handleChange}
                                value={form.code}
                                disabled={form.loading}
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
                    {form.isUpdate ? 'Update Department' : 'Add Department'}
                </Button>

            </form>
        </div>
    )
}
