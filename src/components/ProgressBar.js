"use client"
import { useEffect, useState } from "react";
import styles from './styles/ProgressBar.module.scss'

export default function ProgressBar() {

    const [progress, setProgress] = useState(10)

    useEffect(() => {

        const interval = setInterval(() => {
            setProgress(prev => {
                return prev >= 100 ? 0 : prev + 10;
            })
        }, 600)

        return () => {
            clearInterval(interval);
        }

    }, []);

    return (
        <div className={styles.progressbar_container}>
            <div className={styles.progressbar} style={{ width: `${progress}%` }}></div>
        </div>
    );
}