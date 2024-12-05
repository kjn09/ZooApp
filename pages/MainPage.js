import React from 'react';
import Header from './components/header';
import styles from "./mainPage.module.css"
import { useRouter } from 'next/router';

export default function MainPage(){
  return(

    <div className={styles.Background}>
      <Header/>
      
    </div>
  )
}

