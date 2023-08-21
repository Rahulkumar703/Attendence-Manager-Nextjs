"use client"
import { FiArrowLeft } from 'react-icons/fi'
import styles from './styles/DashboardHeader.module.scss'
import { useRouter } from 'next/navigation'
import SearchBar from './SearchBar';
import { useContext } from 'react';
import GlobalContext from '@/context/global/GlobalContext';

export default function DashboardHeader({ heading }) {

    const { globalState, setGlobalState } = useContext(GlobalContext);

    const setSearchValue = (value) => {
        setGlobalState(prev => ({ ...prev, search: value }))
    }

    const router = useRouter();

    return (
        <div className={styles.dashboard_header}>
            <div className={styles.heading}>
                <FiArrowLeft className={styles.back_btn} size={20} onClick={() => { router.back() }} />
                <h2>{heading}</h2>
            </div>
            <SearchBar value={globalState.search} setValue={setSearchValue} />
        </div>
    )
}
