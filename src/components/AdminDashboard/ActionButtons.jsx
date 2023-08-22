"use client"
import React, { useContext, useState } from 'react'
import Button from '../Button';
import { FiCheck, FiEdit3, FiX } from 'react-icons/fi';
import { AiOutlineDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import styles from '@/components/AdminDashboard/FilteredData.module.scss'
import GlobalContext from '@/context/global/GlobalContext';
import { useRouter } from 'next/navigation';

const ActionButtons = ({ data, name }) => {

    const [deleteData, setDeleteData] = useState({ popup: false, _id: '' });
    const { setGlobalState } = useContext(GlobalContext);

    const router = useRouter();

    const handleEdit = () => {
        setGlobalState(prev => ({
            ...prev,
            form: {
                ...prev.form,
                ...data,
                isUpdate: true,
                show: true,
            }
        })
        )
        window.scrollTo(0, 0);
    }

    const handleDelete = async () => {
        try {
            const body = {};

            if (name === 'class') {
                body.faculty = data?.faculty?._id || '';
                body.subject = data.subject._id;
            }
            else {
                body._id = data._id;
            }
            const res = await fetch(`/api/${name}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const classData = await res.json();

            if (res.status === 200) {
                setDeleteData({ popup: '', _id: '' })
                router.refresh();
            }

            toast[classData.type](classData.message, { toastId: 'deleteData' });

        } catch (error) {
            toast.error(error.message, { toastId: 'deleteDataError' });
        }
    }




    return (
        <div className={styles.data_actions}>
            {
                deleteData.popup && deleteData._id === data._id ?
                    <>
                        <Button
                            type="button"
                            varrient="filled"
                            className={styles.delete_btn}
                            onClick={() => { handleDelete(data._id); }}
                        >
                            <FiCheck size={20} />
                        </Button>

                        <Button
                            type="button"
                            varrient="filled"
                            className={styles.edit_btn}
                            onClick={() => { setDeleteData({ popup: false, _id: '' }) }}
                        >
                            <FiX size={20} />
                        </Button>
                    </>
                    :
                    <>
                        <Button
                            type="button"
                            varrient="filled"
                            className={styles.edit_btn}
                            onClick={handleEdit}
                        >
                            <FiEdit3 size={20} />
                        </Button>

                        <Button
                            type="button"
                            varrient="filled"
                            className={styles.delete_btn}
                            onClick={() => { setDeleteData({ popup: true, _id: data._id }) }}
                        >
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>

            }
        </div>
    )
}

export default ActionButtons