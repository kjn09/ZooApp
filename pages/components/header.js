import React from 'react';
import styles from "./header.module.css"
import { useRouter } from 'next/router';

export default function Header() {

const router = useRouter();

const Navbar = () =>{
  router.back()
}
const Reload = () =>{
  router.push("./MainPage")
}
const Profile = () =>{
  router.push("./profilePage")
}


  return (
    <div className={styles.Background}>
      <div className={styles.Header}>
        <div onClick={Navbar}><img className={styles.MenuImage} src='/Menu_Icon.jpg'></img></div>
        <div onClick={Reload}>Zoo</div>
        <div onClick={Profile}>LoginProfile</div>
      </div>      
    </div>
  );
}

