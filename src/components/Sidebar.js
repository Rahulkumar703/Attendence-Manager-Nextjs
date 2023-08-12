"use client"
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri'
import styles from './styles/Sidebar.module.scss'
import { usePathname } from 'next/navigation'

export default function Sidebar({ links }) {

    const pathname = usePathname();

    const [sideBarExpanded, setSideBarExpanded] = useState(false);

    const sidebarContainerRef = useRef();

    useEffect(() => {
        const handleOutClick = (e) => {
            if (!sidebarContainerRef.current.contains(e.target))
                setSideBarExpanded(false);
        }

        document.addEventListener('mousedown', handleOutClick);

        return () => {
            document.removeEventListener('mousedown', handleOutClick);
        }
    })

    return (
        <aside className={`${styles.sidebar} ${sideBarExpanded ? styles.expanded : ''}`} ref={sidebarContainerRef}>
            <div className={styles.sidebar_toggle} onClick={() => { setSideBarExpanded(prev => !prev) }}>
                {
                    sideBarExpanded ?

                        <RiMenuFoldFill size={20} className={styles.sidebar_toggle__icon} />
                        :
                        <RiMenuUnfoldFill size={20} className={styles.sidebar_toggle__icon} />
                }
            </div>

            {
                links.map((link, index) => {
                    return <Link
                        key={index}
                        href={link.href}
                        className={`${styles.sidebar_links} ${pathname === link.href ? styles.active : ''}`}
                        onClick={() => { setSideBarExpanded(false) }}
                    >
                        {link.icon}
                        <p>{link.name}</p>
                    </Link>
                })
            }

        </aside>
    )
}
