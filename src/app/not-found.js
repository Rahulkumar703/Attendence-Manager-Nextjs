"use client"
import React from 'react'
import Style from '@/app/page.module.css'
import Button from '@/components/Button'
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export default function Custom404() {
    const { back } = useRouter()
    return (
        <main className={Style.not_found}>
            <h1>404 <span>|</span> <span>Page Not Found</span></h1>
            <Button varrient="outline" icon={<BiArrowBack size={20} />} onClick={back}>Go Back</Button>
        </main>
    )
}
