import React from 'react';
import styles from './zooInfos.module.css';

export default function ZooInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <h2>ZOOBESUCH PLANEN</h2>
        <div className={styles.infoGrid}>
          <div>
            <p><strong>Tickets kaufen</strong></p>
          </div>
          <div>
            <p><strong>Anreise planen</strong></p>
          </div>
          <div>
            <p><strong>Zoo-App holen</strong></p>
          </div>
        </div>
        <div className={styles.current}>
          <p><strong>Aktuelles im Zoo</strong></p>
          <input type="date" className={styles.dateInput} />
          <button className={styles.button}>ANZEIGEN</button>
        </div>
      </div>

      <div className={styles.box}>
        <h2>ÖFFNUNGSZEITEN</h2>
        <div className={styles.hours}>
          <div>
            <h3>MÄRZ BIS OKTOBER</h3>
            <p>Zoo: 9–18 Uhr</p>
            <p>Masoala Regenwald: 10–18 Uhr</p>
          </div>
          <div>
            <h3>NOVEMBER BIS FEBRUAR</h3>
            <p>Zoo: 9–17 Uhr</p>
            <p>Masoala Regenwald: 10–17 Uhr</p>
          </div>
        </div>
      </div>
    </div>
  );
}
