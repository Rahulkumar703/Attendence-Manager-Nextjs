import styles from './page.module.css'


export default function Home() {
  return (
    <main className={styles.landing_page}>
      <div className={styles.landing_page}>
        <div className={styles.title_text}>Keep track of your attendence</div>
        <div className={styles.title_text}>with</div>
        <h1 className={`${styles.title_text} ${styles.gradient_text}`}>Attendence Manager</h1>
      </div>
    </main>
  )
}
