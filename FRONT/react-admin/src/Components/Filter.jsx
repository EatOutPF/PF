import React from "react";
import { getFilterByDiets,
getAllRestaurants} from "../Redux/Actions";
import { useDispatch } from "react-redux";





function Filter ({setOrder, setFilter, resetFilter}){
  const dispatch= useDispatch()

  function handleSubmit(evt){

    evt.preventDefault()
    dispatch(getFilterByDiets(evt.target.value))
    setOrder(`${evt.target.value}`)
  }
function handleSubmitReset (evt){
evt.preventDefault()
dispatch(getAllRestaurants())
setFilter('')
}
  return (
    <div>
      <select
        defaultValue={resetFilter}
        onChange={(event) => handleSubmit(event)}
        className="form-selected"
      >
        <option>Filter by type</option>
        <option key="vegetariano" value="vegetariano">
          vegetariano
        </option>  
         <option key="vegano" value="vegano">
          vegano
        </option>   
        <option key="celiaco" value="celiaco">
          celiaco
        </option>  
       
        ...
      </select>
      <button onClick={handleSubmitReset}>
        Restaurantes
      </button>
      
    </div>
  );
}
export default Filter





