import React from 'react';
import styles from './navBar.module.css';
import { useRouter } from 'next/router';

export default function Navbar({ onClose }) {
  const router = useRouter();

  const goToPage = (page) => {
    router.push(page);
    onClose();
  };

  return (
    <div className={styles.NavbarContainer}>
      <img
        src="../arrow-left.avif"
        className={styles.backImage}
        onClick={onClose}
        alt="Back"
      />
      <ul className={styles.NavbarList}>
        <li onClick={() => goToPage('./MainPage')}>Home</li>
        <li onClick={() => goToPage('./profilePage')}>Profile</li>
        <li onClick={() => goToPage('./about')}>About</li>
        <li onClick={() => goToPage('./contact')}>Contact</li>
      </ul>
    </div>
  );
}
