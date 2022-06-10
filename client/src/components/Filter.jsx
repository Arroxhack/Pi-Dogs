import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import { filterTemperament, filterDbOrApiBreeds } from '../store/actions';
import styles from "./CSS/Filter.module.css";

export default function Filter() {
    const dispatch = useDispatch();
    const temperaments = useSelector(state => state.temperaments);

    function onSelectTemperament(e){
        dispatch(filterTemperament(e.target.value))
    }

    function onSelectDbOrApiBreed(e){
        dispatch(filterDbOrApiBreeds(e.target.value))
    }

    return (
        <div className={styles.bodyDivFilter}>
            <select name="select" onChange={onSelectTemperament} className={styles.select}>
                <option value="">All temperaments</option>
                {temperaments.map(e => {
                    return <option key={e.id} value={e.name}>{e.name}</option>
                })}
            </select>
            <select name="select" onChange={onSelectDbOrApiBreed} className={styles.select}>
                <option value="">Db and Api breeds</option>
                <option value="Api">Api breeds</option>
                <option value="Db">Db breeds</option>
            </select>
      </div>
    )
}

