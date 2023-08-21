"use client"
import { useContext } from 'react'
import styles from '@/components/AdminDashboard/FilteredData.module.scss'
import GlobalContext from '@/context/global/GlobalContext'
import { FiAlertCircle } from 'react-icons/fi'
import ActionButtons from '@/components/AdminDashboard/ActionButtons'

const FilteredFaculties = ({ data }) => {
    const { globalState } = useContext(GlobalContext);



    const filteredData = data
        .filter((fac) => fac.name.toLowerCase().includes(globalState.search.toLowerCase()) ||
            fac.userId.toString().includes(globalState.search) ||
            fac.email.toString().includes(globalState.search)
        )


    if (data.length === 0) {
        return <div className={styles.data_container} >
            <div className={styles.message_container}>
                <FiAlertCircle size={20} />
                <p className={styles.message}>
                    No Faculties are Added, Please add first.
                </p>
            </div>
        </div>
    }
    else if (filteredData.length)
        return <div className={styles.data_container} >
            {
                filteredData
                    .map(fac => {
                        const department = () => {
                            let depName = fac?.department?.name?.split(' ') || [' '];
                            depName = depName[depName?.length - 1];

                            switch (depName) {
                                case "(CSE)":
                                    depName = "cse";
                                    return <p className={`${styles.data_department} ${styles.cse}`}>{depName}</p>
                                case "(CE)":
                                    depName = "civil";
                                    return <p className={`${styles.data_department} ${styles.civil}`}>{depName}</p>
                                case "(ME)":
                                    depName = "mech";
                                    return <p className={`${styles.data_department} ${styles.mech}`}>{depName}</p>
                                case "(EEE)":
                                    depName = "eee";
                                    return <p className={`${styles.data_department} ${styles.eee}`}>{depName}</p>
                                case "(CA)":
                                    depName = "ca";
                                    return <p className={`${styles.data_department} ${styles.ca}`}>{depName}</p>
                                case "(AI)":
                                    depName = "ai";
                                    return <p className={`${styles.data_department} ${styles.ai}`}>{depName}</p>
                                default:
                                    depName = fac?.department?.name;
                                    return <p className={`${styles.data_department} ${styles.other}`}>{depName}</p>

                            }
                        }

                        return <div key={fac._id} className={`${styles.data}`}>
                            <p className={styles.data_id}>{fac.userId}</p>
                            <div>
                                <p className={styles.data_name}>{fac.name}</p>
                                <p className={styles.data_email}>{fac.email}</p>
                            </div>
                            {department()}
                            <ActionButtons data={fac} name={'faculty'} />
                        </div>
                    })
            }
        </div >

    else
        return <div className={styles.data_container} >
            <div className={styles.message_container}>
                <FiAlertCircle size={20} />
                <p className={styles.message}>
                    No Faculties Matches with your search
                </p>
            </div>
        </div >

}

export default FilteredFaculties