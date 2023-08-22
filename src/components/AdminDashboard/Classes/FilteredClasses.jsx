"use client"
import { useContext } from 'react'
import styles from '@/components/AdminDashboard/FilteredData.module.scss'
import GlobalContext from '@/context/global/GlobalContext'
import { FiAlertCircle } from 'react-icons/fi'
import ActionButtons from '@/components/AdminDashboard/ActionButtons'

const FilteredClasses = ({ data }) => {
    const { globalState } = useContext(GlobalContext);

    const filteredData = data
        .filter(
            (sub) => sub?.name.toLowerCase().includes(globalState.search.toLowerCase()) ||
                sub?.code.toString().toLowerCase().includes(globalState.search.toLowerCase()) ||
                sub?.faculty?.name.toLowerCase().includes(globalState.search.toLowerCase()) ||
                sub?.faculty?.userId.toString().toLowerCase().includes(globalState.search.toLowerCase())
        )

    if (data.length === 0) {
        return <div className={styles.data_container} >
            <div className={styles.message_container}>
                <FiAlertCircle size={20} />
                <p className={styles.message}>
                    No Subjects are Added In This Semester, Please add first.
                </p>
            </div>
        </div>
    }
    else if (filteredData.length)
        return <div className={styles.data_container} >
            {
                filteredData
                    .map(sub => {
                        return <div key={sub._id} className={`${styles.data} ${styles.col}`}>
                            <div className={styles.row}>
                                <p className={styles.data_id}>{sub.code}</p>
                                <p className={styles.data_name}>{sub.name}</p>
                            </div>
                            <div className={styles.row}>
                                {
                                    sub?.faculty?.name ?
                                        <>
                                            <p className={styles.data_id}>{sub?.faculty?.userId}</p>
                                            <p className={styles.data_name}>{sub?.faculty?.name}</p>
                                        </>
                                        :
                                        <p className={styles.data_nofaculty}>Not Assigned to Any Faculty</p>
                                }
                            </div>
                            <ActionButtons data={{ subject: { _id: sub._id, name: sub.name }, faculty: { _id: sub?.faculty?._id || '', name: sub?.faculty?.name || '' } }} name={'class'} />
                        </div>
                    })
            }
        </div >

    else
        return <div className={styles.data_container} >
            <div className={styles.message_container}>
                <FiAlertCircle size={20} />
                <p className={styles.message}>
                    No Subjects Matches with your search
                </p>
            </div>
        </div >
}

export default FilteredClasses