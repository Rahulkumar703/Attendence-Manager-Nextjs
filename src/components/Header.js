'use client';
import Link from "next/link"
import './Header.css'
import Image from "next/image"
import { useState } from "react";
import { BiLogIn, BiLogOut, BiUserCircle } from 'react-icons/bi'
import { signOut, useSession } from "next-auth/react";



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
                        <li className="nav_items">
                            <Link href={'/profile'}>
                                <BiUserCircle size={20} />
                                <p>{user && user?.name?.split(' ')[0] || ''}</p>
                            </Link>
                        </li>
                        <li className="nav_items">
                            <Link href={''} onClick={signOut}>
                                <BiLogOut size={20} />
                                <p>Log Out</p>
                            </Link>
                        </li>
                    </>
                )
            default:
                return (
                    <li className="nav_items">
                        <Link href={'login'}>
                            <BiLogIn size={20} />
                            <p>Login</p>
                        </Link>
                    </li>
                )
        }

    }
}


function Header() {
    const [scroll, setScroll] = useState(false);


    return (
        <header className={scroll ? 'blured' : null}>
            <Link href={'/'}>
                <div className="title">
                    <Image width={30} height={30} src={'/favicon.ico'} alt="logo"></Image>
                    <h1>Attendence Manager</h1>
                </div>
            </Link>
            <nav>
                <ul className="nav_list">
                    <Navlist />
                </ul>
            </nav>
        </header>
    )
}

export default Header