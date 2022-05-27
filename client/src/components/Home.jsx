import React from "react";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllBreeds} from "../store/actions/index";


function Home(){
    const dispatch = useDispatch();
    const breeds = useSelector(state => state.breeds)

    useEffect(() => { // al montarse se ejecuta getAllBreeds()
        dispatch(getAllBreeds())
    }, [dispatch])

    return(
        <div>
            {
            breeds && breeds.map(e => {
                return(
                    <div key = {e.id}>
                        <h3>{e.name}</h3>
                        <img src={e.image} alt= {`Raza Creada ${e.name}`} />
                    </div>
                )
            })
            }
        </div>
    )
}

export default Home;