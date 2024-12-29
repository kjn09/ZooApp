import React from 'react';
import { useRouter } from 'next/router';
import styles from './mapsPage.module.css';

export default function MapPage() {
  const router = useRouter();

  const openAnimalMap = () => {
    router.push('/animalMap');
  };

  const openRestaurantMap = () => {
    router.push('./restaurantMap');
  };

  return (
    <div className={styles.container}>
      <h1>Select a Map</h1>
      <div className={styles.mapContainer}>
        <div className={styles.mapCard} onClick={openAnimalMap}>
          <img
            src="/animal_map.jpg"
            alt="Animal Map"
            className={styles.mapImage}
          />
          <h2>Animal Map</h2>
        </div>

        <div className={styles.mapCard} onClick={openRestaurantMap}>
          <img
            src="/restaurant_map.jpg"
            alt="Restaurant Map"
            className={styles.mapImage}
          />
          <h2>Restaurant Map</h2>
        </div>
      </div>
    </div>
  );
}
