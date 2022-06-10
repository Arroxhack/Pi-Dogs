import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./CSS/LandingPage.module.css";


export default function LandingPage() {
  return (
    <div className={styles.backgroundPicture}>
        <button className={styles.button}>
            <NavLink className={styles.navLink} exact to="/home" >BRING.. THE.. DOGGIES!
            </NavLink>
        </button>
        
    </div>
  )
}
