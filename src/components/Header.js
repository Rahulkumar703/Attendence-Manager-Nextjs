'use client';
import Link from "next/link"
import styles from './styles/Header.module.scss'
import Image from "next/image"
import { useEffect, useState } from "react";
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import { signOut, useSession } from "next-auth/react";
import { PiUserCircleBold } from "react-icons/pi";



const Navlist = () => {
    const session = useSession();

    if (session) {
        switch (session.status) {
            case 'loading':
                return (<h1>Loading...</h1>)
            case 'authenticated':
                const { user } = session.data;
                return (
                    <>
                        <li className={styles.nav_items}>
                            <Link href={'/profile'}>
                                <PiUserCircleBold size={20} />
                                <p>{user && user?.name?.split(' ')[0] || ''}</p>
                            </Link>
                        </li>
                        <li className={styles.nav_items}>
                            <Link href={''} onClick={signOut}>
                                <FiLogOut size={20} />
                                <p>Log Out</p>
                            </Link>
                        </li>
                    </>
                )
            default:
                return (
                    <li className={styles.nav_items}>
                        <Link href={'login'}>
                            <FiLogIn size={20} />
                            <p>Login</p>
                        </Link>
                    </li>
                )
        }

    }
}


function Header() {
    const [scroll, setScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10)
                setScroll(true);
            else setScroll(false);

        }

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    })


    return (
        <header className={`${styles.header} ${scroll ? styles.blured : ''}`}>
            <Link href={'/'}>
                <div className={styles.title}>
                    <Image width={30} height={30} src={'/favicon.ico'} alt="logo"></Image>
                    <h1>Attendence Manager</h1>
                </div>
            </Link>
            <nav>
                <ul className={styles.nav_list}>
                    <Navlist />
                </ul>
            </nav>
        </header>
    )
}

export default Header