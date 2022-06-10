import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./CSS/BreedCard.module.css";

export default function BreedCard({ id, name, image, temperament, min_weight, max_weight}){
    return( 
            <div className={styles.bodyDiv}>   
                    <h5 className={styles.name}>{name}</h5>
                    <NavLink exact to={`/breedDetail/${id}`} className={styles.navLink}>
                    <img src={image} alt= {`Created breed ${name}`} className={styles.image}/>
                    </NavLink> 
                    <h6 className={styles.temperament}>{temperament ? `Temperament: ${temperament}` : `Unknown temperament`}</h6>
                    <h6 className={styles.weightAndHeight}>{min_weight === 0 ? `Min weight: unknown` : `Min weight: ${min_weight} kg`}</h6>
                    <h6 className={styles.weightAndHeight}>{max_weight === 0 ? `Max weight: unknown` : `Max weight: ${max_weight} kg`}</h6>
            </div>

    ) 
}

