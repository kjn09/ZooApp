import React from 'react';
import { useRouter } from 'next/router';
import styles from "./index.module.css"


export default function IndexPage() {
  const router = useRouter()

  const RegisterPage = () => {
    router.push("./components/registerPage")
  }
  const LoginPage = () => {
    router.push("./components/loginPage")
  }



  return (
    <div className={styles.container}>
      <img
        src="logo.avif"
        alt="Reptile Zoo Logo"
        className={styles.logo}
      />
      <button className={styles.button} onClick={RegisterPage}>Registrieren</button>
      <button className={styles.button} onClick={LoginPage}>Anmelden</button>
    </div>
  );
}

