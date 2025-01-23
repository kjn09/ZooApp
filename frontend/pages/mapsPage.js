import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './mapsPage.module.css';
import Header from './components/header';
import Navbar from './components/navbar';

export default function MapPage() {
  const router = useRouter();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const openAnimalMap = () => {
    router.push('/animalMap');
  };

  const openRestaurantMap = () => {
    router.push('./restaurantMap');
  };

  return (
    <div className={styles.container}>
    <Header onMenuClick={toggleNavbar} title="Our Maps"/>
      {isNavbarOpen && <Navbar onClose={closeNavbar} />}
      <h1>Select a Map</h1>
      <div className={styles.mapContainer}>
        <div className={styles.mapCard} onClick={openAnimalMap}>
          <img
            src="/animalia.jpg"
            alt="Animal Map"
            className={styles.mapImage}
          />
          <h2>Animal Map</h2>
        </div>

        <div className={styles.mapCard} onClick={openRestaurantMap}>
          <img
            src="/restaurant.jpg"
            alt="Restaurant Map"
            className={styles.mapImage}
          />
          <h2>Restaurant Map</h2>
        </div>
      </div>
    </div>
  );
}
