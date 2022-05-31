import React from 'react';
import { useDispatch } from 'react-redux';
import { ASCENDENTE, DESCENDENTE, MIN_WEIGHT, MAX_WEIGHT } from '../constantes/sort';
import { sort } from '../store/actions';


export default function Order() {
    const dispatch = useDispatch();

    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }

  return (
      <div>
    <select name="select" onChange={onSelectChange}>
        <option value="">Order dogs</option>
        <option value={ASCENDENTE}>A - Z</option>
        <option value={DESCENDENTE}>Z - A</option>
        <option value={MIN_WEIGHT}>Min weight</option>
        <option value={MAX_WEIGHT}>Max weight</option>
        
    </select>

    </div>
  )
}
