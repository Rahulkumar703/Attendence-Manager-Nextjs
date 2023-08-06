"use client"
import { useEffect, useState } from 'react';
import { PiCloudMoonBold, PiCloudSunBold, PiGearSixBold } from 'react-icons/pi';
import { HiOutlineDesktopComputer } from 'react-icons/hi';
import './Theme.css'
import { useTheme } from 'next-themes';


export default function Theme() {

    const [themeBox, setThemeBox] = useState(false);

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])


    const handleClick = (e) => {
        e.target.classList.toggle('spin');
        setThemeBox((prev) => !prev);
    }

    if (mounted)
        return (
            <div className='theme_box'>
                <PiGearSixBold title='Theme' size={20} onClick={handleClick} className='theme_icon' />
                <div className={`theme_container ${themeBox ? 'active' : ''}`}>
                    <div className="mode_container">
                        <PiCloudSunBold title='Light Theme' size={20} className={`mode_icon ${theme === 'light' ? 'active' : ''}`} onClick={() => { setTheme('light') }} />
                        <HiOutlineDesktopComputer title='System theme' size={20} className={`mode_icon ${theme === 'system' ? 'active' : ''}`} onClick={() => { setTheme('system') }} />
                        <PiCloudMoonBold title='Dark Theme' size={20} className={`mode_icon ${theme === 'dark' ? 'active' : ''}`} onClick={() => { setTheme('dark') }} />
                    </div>
                </div>
            </div>
        )
    else return null
}
