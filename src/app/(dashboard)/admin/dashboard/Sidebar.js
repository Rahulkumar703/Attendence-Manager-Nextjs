"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { LuLayoutDashboard } from 'react-icons/lu'
import { PiChalkboardTeacherBold } from 'react-icons/pi'
import { RiMenuFoldFill, RiMenuUnfoldFill } from 'react-icons/ri'

export default function Sidebar() {
    const [sideBarExpanded, setSideBarExpanded] = useState(true)
    return (
        <aside className={`sidebar${sideBarExpanded ? ' expanded' : ''}`}>
            <div className="sidebar_toggle" onClick={() => { setSideBarExpanded(prev => !prev) }}>
                {
                    sideBarExpanded ?

                        <RiMenuFoldFill size={20} className='sidebar_toggle__icon' />
                        :
                        <RiMenuUnfoldFill size={20} className='sidebar_toggle__icon' />
                }
            </div>

            <Link href="/" className='sidebar_links'>
                <LuLayoutDashboard size={20} />
                <p>Dashboard</p>
            </Link>
            <Link href="/admin/dashboard/manage-faculties" className='sidebar_links'>
                <PiChalkboardTeacherBold size={20} />
                <p>Manage Faculties</p>
            </Link>
        </aside>
    )
}
