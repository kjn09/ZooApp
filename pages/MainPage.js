import React, { useState } from 'react';
import Header from './components/header';
import styles from "./mainPage.module.css";
import Navbar from './components/navbar';
import ZooInfo from "./components/zooInfos"

export default function MainPage() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  return (
    <div className={styles.Background}>
      <Header onMenuClick={toggleNavbar} />
      {isNavbarOpen && <Navbar onClose={closeNavbar} />}
      <ZooInfo/>
    </div>
  );
}
