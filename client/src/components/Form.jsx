import React, {useState, useEffect} from 'react';
import { NavLink} from 'react-router-dom';
import { postNewBreed, getAllTemperaments } from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import styles from "./CSS/Form.module.css";


export default function Form() {

const [errors, setErrors] = useState({})


function validate(newBreed){
    let errors = {};

    if(!/^[a-zA-Z\s]*$/.test(newBreed.name)){
        errors.name = "Complete this field with alphabetic characters"
    }

    if(!/^[1-9][0-9]?$|^100$/.test(newBreed.min_height)){
        errors.min_height = "Complete with a number between 1 and 100 that does not exceed the maximum height"
    } 
    if(!/^[1-9][0-9]?$|^100$/.test(newBreed.max_height)){
        errors.max_height = "Complete with a number between 1 and 100 that is more than the minimum height"
    }
    if(parseInt(newBreed.min_height) > parseInt(newBreed.max_height)){
        errors.min_height = "Complete with a number between 1 and 100 that does not exceed the maximum height"
        errors.max_height = "Complete with a number between 1 and 100 that is more than the minimum height"
    }

    if(!/^[1-9][0-9]?$|^100$/.test(newBreed.min_weight)){
        errors.min_weight = "Complete with a number between 1 and 100 that does not exceed the maximum weight"
    }
    if(!/^[1-9][0-9]?$|^100$/.test(newBreed.max_weight)){
        errors.max_weight = "Complete with a number between 1 and 100 that is more than the minimum weight"
    }
    if(parseInt(newBreed.min_weight) > parseInt(newBreed.max_weight)){
        errors.min_weight = "Complete with a number between 1 and 100 that does not exceed the maximum weight"
        errors.max_weight = "Complete with a number between 1 and 100 that is more than the minimum weight"
    }

    if(newBreed.life_span && !/\b([1-9]|[12][0-9]|3[0])\b/.test(newBreed.life_span)){
        errors.life_span = "If completed, the number must be between 1 and 30"
    }

    if(newBreed.image && !/[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/.test(newBreed.image)){
        errors.image = "If completed, use a valid https url. E.g.:https://placedog.net/600/100"
    }

    return errors
}

const [temperamentName, setTemperamentName] = useState({
    name: []
})

const [newBreed, setNewBreed] = useState({
    name: "",
    min_height: 1,
    max_height: 1,
    min_weight: 1,
    max_weight: 1,
    life_span: "",
    temperament: [],
    image: ""
});

const dispatch = useDispatch()
const temperaments = useSelector(state => state.temperaments)

useEffect(() => {
    dispatch(getAllTemperaments())
}, [dispatch])

let onInputChange = (e) => { //name: lo que escribaa
    setNewBreed({
        ...newBreed,
        [e.target.name]: e.target.value // el e.target.name corresponde con la propiedad del estado en cada caso.
    })
    setErrors(validate({
        ...newBreed,
        [e.target.name]: e.target.value
    }))
}

let onSelectChange = (e) => {
    if(!newBreed.temperament.includes(e.target.value.split(",")[0]) && e.target.value !== ""){
        setNewBreed({
            ...newBreed,
            temperament: [...newBreed.temperament, e.target.value.split(",")[0]]
        })
        setTemperamentName({
            name: [...temperamentName.name, e.target.value.split(",")[1]]
        })
        console.log(temperamentName.name)
        console.log(newBreed.temperament)
    }
}

let removeTemperamentButton = (e) => {
    e.preventDefault();
        let temperamentToDeleteName = e.target.value //Active
        let temperamentToDelete = temperaments.filter(e => e.name === temperamentToDeleteName) //[0]temperamentToDelete.id y .name
        console.log(temperamentToDeleteName)
        console.log(temperamentToDelete)
        let deleteTemperament = newBreed.temperament.filter(e => e !== temperamentToDelete[0].id)
        let deleteTemperamentName = temperamentName.name.filter(e => e !== temperamentToDelete[0].name )
        setNewBreed({
            ...newBreed,
            temperament: deleteTemperament
        })
        setTemperamentName({
            name: deleteTemperamentName
        })
}

let submitDog = (e) => {
    e.preventDefault();
    console.log(newBreed)
    dispatch(postNewBreed(newBreed))
    alert(`Raza ${newBreed.name} creada con exito!`)
    setNewBreed({
        name: "",
        min_height: 1,
        max_height: 1,
        min_weight: 1,
        max_weight: 1,
        life_span: "",
        temperament: [],
        image: ""
    })
    setTemperamentName({
        name: []
    })
}


  return (
    <div className={styles.body}>           
        <button className={styles.homeButton}>
            <NavLink className={styles.navLink} exact to="/home">Home</NavLink>
        </button>
        <h4 className={styles.h4}>Complete the form to create your own breed!</h4>
        <div className={styles.formDiv}>
            <form onSubmit={submitDog}>
                <div> 
                    <span>*Breed: </span>
                    <input  // SI o SI
                    type="text" 
                    placeholder='Name your breed'
                    value={newBreed.name}
                    name= "name"
                    onChange={onInputChange}/>
                    {errors.name && (
                        <p className={styles.errorP}>{errors.name}</p>
                    )}
                </div>
                <div> 
                    <span>*Min height: </span>
                    <input // SI o SI
                    type="text"
                    placeholder='Altura min' 
                    value={newBreed.min_height}
                    name= "min_height"
                    onChange={onInputChange}/>
                    <span> cm</span> 
                    {errors.min_height && (
                        <p className={styles.errorP}>{errors.min_height}</p>
                    )}
                </div>
                <div>
                    <span>*Max height: </span>
                    <input // SI o SI
                    type="text"
                    placeholder='Altura max' 
                    value={newBreed.max_height}
                    name= "max_height"
                    onChange={onInputChange}/>
                    <span> cm</span>
                    {errors.max_height && (
                        <p className={styles.errorP}>{errors.max_height}</p>
                    )}
                </div>
                <div> 
                    <span>*Min weight: </span>
                    <input // SI o SI
                    type="text"
                    placeholder='Peso min' 
                    value={newBreed.min_weight}
                    name= "min_weight"
                    onChange={onInputChange}/>
                    <span> kg</span>
                    {errors.min_weight && (
                        <p className={styles.errorP}>{errors.min_weight}</p>
                    )}
                </div>
                <div>
                    <span>*Max weight: </span>
                    <input // SI o SI
                    type="text"
                    placeholder='Peso max' 
                    value={newBreed.max_weight}
                    name= "max_weight"
                    onChange={onInputChange}/>
                    <span> kg</span>
                    {errors.max_weight && (
                        <p className={styles.errorP}>{errors.max_weight}</p>
                    )}
                </div>
                <div> 
                    <span>Life span: </span> 
                    <input 
                    type="text"
                    placeholder='Life span'
                    value={newBreed.life_span}
                    name="life_span"
                    onChange={onInputChange}/>
                    <span> years</span>
                    {errors.life_span && (
                        <p className={styles.errorP}>{errors.life_span}</p>
                    )} 
                </div>
                <div> 
                    <span>Image: </span> 
                    <input 
                    type="text" 
                    placeholder='Image'
                    value={newBreed.image}
                    name="image"
                    onChange={onInputChange}/>
                    {errors.image && (
                        <p className={styles.errorP}>{errors.image}</p>
                    )} 
                </div>
                <div>
                    <select name="temperament" id="" onChange={onSelectChange}>
                        <option value="">Select temperaments</option>
                        {temperaments.map(e => { 
                            return <option key={e.id} value={`${e.id},${e.name}`}>{e.name}</option>
                        })}
                    </select>
                    {temperamentName.name.map(el => { 
                    return <p key={el}>{" -" + el} <button value={el} onClick={removeTemperamentButton}>X</button></p>
                    })}
                </div>
                {Object.keys(errors).length === 0 &&  newBreed.name !== "" && newBreed.min_height !== "" && newBreed.max_height !== "" && newBreed.min_weight !== "" && newBreed.max_weight !== ""
                ? <button className={styles.createButton} type='submit'>Create new breed!</button> 
                : <p className={styles.errorP}>Complete * fields to create your breed</p>}
            </form>
        </div>
    </div>

  )
}



