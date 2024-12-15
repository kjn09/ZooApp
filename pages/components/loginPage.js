import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './auth.module.css';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/users');
      const users = await response.json();

      const user = users.find(
        user => user.username === username && user.password === password
      );

      if (user) {
        localStorage.setItem('user', JSON.stringify({ username: user.username }));
        router.push('/MainPage');
      } else {
        setMessage('Ohh, something went wrong, try again.');
      }
    } catch (error) {
      setMessage('An error occurred while connecting to the server.');
    }
  };

  const GoBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <img
        src="../arrow-left.avif"
        className={styles.backImage}
        onClick={GoBack}
        alt="Go Back"
      />
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <h2 className={styles.title}>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
        />
        <button className={styles.button} onClick={handleLogin}>Login</button>
        <a className={styles.label} href='./registerPage'>Don't have an Account?</a>
      </form>
      <p>{message}</p>
    </div>
  );
}
