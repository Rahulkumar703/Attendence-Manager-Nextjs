"use client"
import { useEffect, useRef, useState } from 'react';
import styles from './styles/Theme.module.scss'
import { useTheme } from 'next-themes';
import { FiMonitor, FiMoon, FiSettings, FiSun } from 'react-icons/fi';


export default function Theme() {

    const [themeBox, setThemeBox] = useState(false);

    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false);

    const themeContainerRef = useRef();


    useEffect(() => {

        const handleOutClick = (e) => {
            if (!themeContainerRef?.current?.contains(e.target)) {
                setThemeBox(false);
            }
        }
        document.addEventListener('mousedown', handleOutClick)

        return () => {
            document.removeEventListener('mousedown', handleOutClick)
        }
    })

    useEffect(() => {
        setMounted(true);
    }, [])

    const handleClick = (e) => {
        e.target.classList.toggle('spin');
        setThemeBox((prev) => !prev);
    }

    if (mounted)
        return (
            <div className={styles.theme_box} ref={themeContainerRef}>
                <FiSettings title='Theme' size={20} onClick={handleClick} className={`${styles.theme_icon} ${themeBox ? styles.spin : ''}`} />
                <div className={`${styles.theme_container} ${themeBox ? styles.active : ''}`}>
                    <div className={styles.mode_container}>
                        <FiSun title='Light Theme' size={20} className={`${styles.mode_icon} ${theme === 'light' ? styles.active : ''}`} onClick={() => { setTheme('light') }} />
                        <FiMonitor title='System theme' size={20} className={`${styles.mode_icon} ${theme === 'system' ? styles.active : ''}`} onClick={() => { setTheme('system') }} />
                        <FiMoon title='Dark Theme' size={20} className={`${styles.mode_icon} ${theme === 'dark' ? styles.active : ''}`} onClick={() => { setTheme('dark') }} />
                    </div>
                </div>
            </div>
        )
    else return null
}
