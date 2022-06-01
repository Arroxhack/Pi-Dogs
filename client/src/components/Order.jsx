import React from 'react';
import { useDispatch } from 'react-redux';
import { sort } from '../store/actions';


export default function Order() {
    const dispatch = useDispatch();

    function onSelectChange(e){
        dispatch(sort(e.target.value))
    }

  return (
      <div>
    <select name="select" onChange={onSelectChange}>
        <option value="">Ordenar</option>
        <option value="ascendente">A - Z</option>
        <option value="descendente">Z - A</option>
        <option value="minWeight">Min weight</option>
        <option value="maxWeight">Max weight</option> 
    </select>
    </div>
  )
}
