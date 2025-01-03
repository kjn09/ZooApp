import React from 'react';
import styles from './navBar.module.css';
import { useRouter } from 'next/router';

export default function Navbar({ onClose }) {
  const router = useRouter();

  const goToPage = (page) => {
    router.push(page);
    onClose(); // Schließt die Navbar nach Navigation
  };

  return (
    <div className={styles.NavbarContainer}>
      <img
        src="../arrow-left.avif"
        className={styles.backImage}
        onClick={onClose} // Schließt die Navbar
        alt="Back"
      />
      <ul className={styles.NavbarList}>
        <li onClick={() => goToPage('./MainPage')}>Home</li>
        <li onClick={() => goToPage('./profilePage')}>Profile</li>
        <li onClick={() => goToPage('./group')}>Groups</li>
        <li onClick={() => goToPage('./mapsPage')}>Maps</li>
      </ul>
    </div>
  );
}
