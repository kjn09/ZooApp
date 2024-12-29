import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styles from './profilePage.module.css';
import Header from "./components/header";
import Navbar from "./components/navBar";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      router.push('/components/loginPage');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/components/loginPage');
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <div>
      <Header onMenuClick={toggleNavbar} title={"Welcome to your Profile"} />

      {isNavbarOpen && <Navbar onClose={closeNavbar} />}
        <div class={styles.container}>
          {user ? (
            <div>
              <p className={styles.info}>Username: <strong>{user.username}</strong></p>
              <button className={styles.button} onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
    </div>
  );
}
