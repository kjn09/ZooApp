import React from 'react';
import styles from "./header.module.css";
import { useRouter } from 'next/router';

export default function Header({ onMenuClick, title }) {

  const router = useRouter();

    const Reload = () => {
      window.location.reload();
    };

  const Profile = () => {
    router.push("./profilePage");
  };

  return (
    <div className={styles.Background}>
      <div className={styles.Header}>
        <div onClick={onMenuClick}>
          <img className={styles.MenuImage} src='/Menu_Icon.jpg' alt="Menu Icon" />
        </div>
        <div onClick={Reload}>{title}</div>
        <div onClick={Profile}>LoginProfile</div>
      </div>
    </div>
  );
}
