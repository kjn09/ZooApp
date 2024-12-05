import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './auth.module.css';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();

    const newUser = {
      username,
      age: parseInt(age, 10),
      mail: email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setMessage('Registrierung erfolgreich!');
        router.push("./loginPage");
      } else {
        setMessage('Fehler bei der Registrierung');
      }
    } catch (error) {
      setMessage('Fehler beim Verbinden mit dem Server');
    }
  };
  const GoBack = () =>{
    router.back()
  }

  return (
    <div className={styles.container}>
      <img
        src="../arrow-left.avif"
        className={styles.backImage}
        onClick={GoBack}
      />
      <form className={styles.form} onSubmit={handleRegister}>
      <h2 className={styles.title}>Registrierung</h2>
        <input
          type="text"
          placeholder="Benutzername"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="number"
          placeholder="Alter"
          value={age}
          onChange={e => setAge(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="email"
          placeholder="E-Mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button className={styles.button} type="submit">Registrieren</button>
        <a className={styles.label} href='./loginPage'>Do you already have an Account?</a>
      </form>
      <p>{message}</p>
    </div>
  );
}
