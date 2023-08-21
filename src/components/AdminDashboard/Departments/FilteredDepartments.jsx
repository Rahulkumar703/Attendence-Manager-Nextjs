"use client"
import { useContext } from 'react'
import styles from '@/components/AdminDashboard/FilteredData.module.scss'
import GlobalContext from '@/context/global/GlobalContext'
import { FiAlertCircle } from 'react-icons/fi'
import ActionButtons from '@/components/AdminDashboard/ActionButtons'

const FilteredDepartments = ({ data }) => {
    const { globalState } = useContext(GlobalContext);

    const filteredData = data
        .filter(
            (sub) => sub.name.toLowerCase().includes(globalState.search.toLowerCase()) ||
                sub.code.toString().toLowerCase().includes(globalState.search.toLowerCase())
        )

    if (data.length === 0) {
        return <div className={styles.data_container} >
            <div className={styles.message_container}>
                <FiAlertCircle size={20} />
                <p className={styles.message}>
                    No Departments are Added, Please add first.
                </p>
            </div>
        </div>
    }
    else if (filteredData.length)
        return <div className={styles.data_container} >
            {
                filteredData
                    .map(sub => {
                        return <div key={sub._id} className={`${styles.data}`}>
                            <p className={styles.data_id}>{sub.code}</p>
                            <p className={styles.data_name}>{sub.name}</p>
                            <ActionButtons data={sub} name={'department'} />
                        </div>
                    })
            }
        </div >

    else
        return <div className={styles.data_container} >
            <div className={styles.message_container}>
                <FiAlertCircle size={20} />
                <p className={styles.message}>
                    No Department Matches with your search
                </p>
            </div>
        </div >
}

export default FilteredDepartments