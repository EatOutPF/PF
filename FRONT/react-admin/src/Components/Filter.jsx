import React from "react";
import { getFilterByDiets, getAllRestaurants, getFilterByMenu , getFilterActive} from "../Redux/Actions";
import { useDispatch , useSelector} from "react-redux";

function Filter ({setOrder, setCurrentPage, resetFilter, setResetFilter}) {
  const dispatch = useDispatch();
  

  function handleSubmit(evt) {
    evt.preventDefault();
    dispatch(getFilterByDiets(evt.target.value));
    setOrder(`${evt.target.value}`);
  }
  function handleOnClick(evt){
    evt.preventDefault()
    dispatch(getFilterByMenu(evt.target.value))
    setOrder(`${evt.target.value}`)
  }
  function handleActive(e){
    console.log(e.target.value)
    e.preventDefault()
    dispatch(getFilterActive(true))
    setCurrentPage(1)
    setOrder("")
   
} 
     function handleInactivo(e){
    console.log(e.target.value)
    e.preventDefault()
    dispatch(getFilterActive(false))
    setCurrentPage(1)
    setOrder("")
   
} 



function handleClearFilter(evt) {
  evt.preventDefault();
  dispatch(getAllRestaurants());
  setResetFilter(!resetFilter);
  setCurrentPage(1);
  setOrder("");
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
      <select
        defaultValue={resetFilter}
        onChange={(event) => handleOnClick(event)}
        className="form-selected"
      >
        <option>Filter by Menu</option>
        <option key="internacional" value="internacional">
        internacional
        </option>
        <option key="italiana" value="italiana">
        italiana
        </option>
        <option key="asiática" value="asiática">
        asiática
        </option> 
        <option key="hamburguesas" value="hamburguesas">
        hamburguesas
        </option> 
        <option key="alta cocina" value="alta cocina">
        alta cocina
        </option>
         <option key="bares" value="bares">
         bares
        </option>
         <option key="pizzerías" value="pizzerías">
         pizzerías
        </option> 
        <option key="mediterránea" value="mediterránea">
        mediterránea
        </option> 
        <option key="gourmet" value="gourmet">
        gourmet
        </option>
        ...
      </select>
      <button onClick={handleActive} >Activo</button>
       <button onClick={handleInactivo} >Inactivo</button>
      <button onClick={handleClearFilter}>Restablecer</button>
    </div>
  );
}

export default Filter;




