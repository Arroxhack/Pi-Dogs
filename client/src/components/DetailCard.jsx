import React from 'react';
import styles from "./CSS/DetailCard.module.css";

export default function DetailCard({dogId}) {
  if(dogId.notFound || dogId === null){
    return (
      <div>
        <h3>{dogId.notFound}</h3>
      </div>
    )
  }
  return (
    <div className={styles.bodyDiv}>
      <h3 className={styles.name}>{dogId.name}</h3>
      <img src={dogId.image} alt= {`Created breed ${dogId.name}`} className={styles.image} />  
      <h4 className={styles.temperament}>{dogId.temperament ? `Temperament: ${dogId.temperament}` : `Unknown temperament`}</h4>
      <h4 className={styles.weightAndHeight}>{dogId.min_weight === null ? `Min weight: unknown` : `Min weight: ${dogId.min_weight} kg`}</h4>
      <h4 className={styles.weightAndHeight}>{dogId.max_weight === null ? `Max weight: unknown` : `Max weight: ${dogId.max_weight} kg`}</h4>
      <h4 className={styles.weightAndHeight}>{dogId.min_height === null ? `Min height: unknown` : `Min height: ${dogId.min_height} cm`}</h4>
      <h4 className={styles.weightAndHeight}>{dogId.max_height === null ? `Max height: unknown` : `Max height: ${dogId.max_height} cm`}</h4>
      <h4 className={styles.weightAndHeight}>{dogId.min_life_span === null || dogId.min_life_span === false ? `Min life span: unknown` : `Min life span: ${dogId.min_life_span}`}</h4>
      <h4 className={styles.weightAndHeight}>{dogId.max_life_span === null || dogId.max_life_span === false ? `Max life span: unknown` : `Max life span: ${dogId.max_life_span}`}</h4>
    </div>
  )
}

