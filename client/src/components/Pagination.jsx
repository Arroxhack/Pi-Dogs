import React from 'react';
import styles from "./CSS/Pagination.module.css";

export default function Pagination({breedsPerPage, totalBreeds, paginate}) { // 8 // 175 // setCurrentPage(pageNumber)
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalBreeds/breedsPerPage); i++){ //175 / 8 = 21 // ceil, o sea que si da 21,7 es 22
        pageNumbers.push(i);
    }

  return (
    <div className={styles.bodyDiv}>
            {pageNumbers.map(pageNumber => ( // por cada page number un boton con el numero y que al hacer click se ejecuta la funcion setCurrentPage(pageNumber)
                <li key={pageNumber} className={styles.li}>
                    <button onClick={()=> paginate(pageNumber)}>
                        {pageNumber}
                    </button>
                </li>
            ))}

    </div>
  )
}
