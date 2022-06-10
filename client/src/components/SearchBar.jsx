import React from 'react';
import { useState, useEffect } from 'react' ;
import { searchBreedName } from '../store/actions';
import { useDispatch } from 'react-redux';
import styles from "./CSS/SearchBar.module.css";

export default function SearchBar() {
    const [search, setSearch] = useState("")

    const dispatch = useDispatch()

    let onInputChange = (e) => { 
        e.preventDefault(e);
        setSearch(e.target.value)
    }

    useEffect(() => {
      dispatch(searchBreedName(search))
    }, [search, dispatch])

  return (
    <div className={styles.inputDiv}>
        <input
        className={styles.input}  
        type="text"  
        onChange={onInputChange} 
        placeholder='Enter breed name'
        value = {search}
        />
    </div>
  )
}
