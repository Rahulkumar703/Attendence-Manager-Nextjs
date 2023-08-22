"use client"
import { useEffect, useState } from 'react'
import GlobalContext from './GlobalContext'
import { usePathname } from 'next/navigation';

function GlobalProvider({ children }) {

    const pathname = usePathname();

    const [globalState, setGlobalState] = useState({
        search: '',
        form: {
            loading: false,
            show: false,
            isUpdate: false,
            name: '',
            email: '',
            registration_number: '',
            userId: '',
            code: '',
            department: { name: '', _id: '' },
            subject: { name: '', _id: '' },
            faculty: { name: '', _id: '' },
            semester: ''
        }
    });

    useEffect(() => {
        setGlobalState({
            search: '',
            form: {
                loading: false,
                show: false,
                isUpdate: false,
                name: '',
                email: '',
                registration_number: '',
                userId: '',
                code: '',
                batch: '',
                department: { name: '', _id: '' },
                subject: { name: '', _id: '' },
                faculty: { name: '', _id: '' },
                semester: ''
            }
        })
    }, [pathname])


    return (
        <GlobalContext.Provider value={{ globalState, setGlobalState }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider