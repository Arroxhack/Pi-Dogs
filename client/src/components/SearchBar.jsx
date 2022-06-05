import React from 'react';
import { useState, useEffect } from 'react' ;
import { searchBreedName } from '../store/actions';
import { useDispatch } from 'react-redux';

export default function SearchBar() {
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()

    let onInputChange = (e) => { // seteo mi estado a lo que el usuario tipea
        e.preventDefault(e);
        setSearch(e.target.value)
    }

    useEffect(() => {
      dispatch(searchBreedName(search))
    }, [search, dispatch])

  return (
    <div>
        <input  
        type="text"  
        onChange={onInputChange} 
        placeholder='Ingrese una raza de perro'
        value = {search}
        />
    </div>
  )
}
