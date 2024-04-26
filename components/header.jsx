import styles from '../styles/Home.module.css';
import Link from 'next/link'; 

export default function Header() {
  return (
    <header className={styles.header}>
      
      <h1 className={styles.title}>Weather Wiz!</h1>
      <nav>
        <Link href="/" className={styles.ctaButton} passHref>
          Home
        </Link>
        <br />
        <Link href="/weather" className={styles.ctaButton} passHref>
          Weather Dashboard
        </Link>
      </nav>
    </header>
  );
}