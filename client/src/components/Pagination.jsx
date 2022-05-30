import React from 'react'

export default function Pagination({breedsPerPage, totalBreeds, paginate}) {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalBreeds/breedsPerPage); i++){
        pageNumbers.push(i);
    }

  return (
    <div>
        <ul>
            {pageNumbers.map(pageNumber => (
                <li key={pageNumber}>
                    <button onClick={()=> paginate(pageNumber)}>
                        {pageNumber}
                    </button>
                </li>
            ))}
        </ul>
    </div>
  )
}
