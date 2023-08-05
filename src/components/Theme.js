"use client"
import { useEffect, useState } from 'react';
import { BsGearWideConnected } from 'react-icons/bs';
import { PiCloudMoonDuotone, PiCloudSunDuotone } from 'react-icons/pi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import './Theme.css'


export default function Theme() {

    const [themeBox, setThemeBox] = useState(false);
    const [theme, setTheme] = useState('system');


    const handleClick = (e) => {
        e.target.classList.toggle('spin');
        setThemeBox((prev) => !prev);
    }

    useEffect(() => {
        // Setting initial Theme
        const localTheme = localStorage.getItem('theme') || 'system';
        setTheme(localTheme);

        if (typeof window !== "undefined") {
            // Checking for Window theme Change
            const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

            darkQuery.addEventListener('change', (e) => {
                if (!("theme" in localStorage)) {
                    if (e.matches) {
                        document.body.classList.add('dark');
                    }
                    else
                        document.body.classList.remove('dark');
                }
            })

        }
    }, [])


    function onWindowMatch() {
        if ((typeof window !== "undefined")) {

            const darkQuery = window.matchMedia('(prefers-color-scheme: dark)')

            if (darkQuery.matches) {
                document.body.classList.add('dark');
            }
            else
                document.body.classList.remove('dark');
        }
    }


    useEffect(() => {
        switch (theme) {
            case 'dark':
                document.body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                break;
            case 'light':
                document.body.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                break;
            default:
                onWindowMatch();
                localStorage.removeItem('theme');
        }
    }, [theme])



    return (
        <div className='theme_box'>
            <BsGearWideConnected size={30} onClick={handleClick} className='theme_icon' />
            <div className={`theme_container ${themeBox ? 'active' : ''}`}>
                <div className="mode_container">
                    <PiCloudSunDuotone size={20} className={`mode_icon ${theme === 'light' ? 'active' : ''}`} onClick={() => { setTheme('light') }} />
                    <HiOutlineDesktopComputer size={20} className={`mode_icon ${theme === 'system' ? 'active' : ''}`} onClick={() => { setTheme('system') }} />
                    <PiCloudMoonDuotone size={20} className={`mode_icon ${theme === 'dark' ? 'active' : ''}`} onClick={() => { setTheme('dark') }} />
                </div>
            </div>
        </div>
    )
}
