import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestauranName,
  searchByRestaurantByUser,
} from "../Redux/Actions";
import sweetAlert from "sweetalert";

function Searchbar() {
  const [state, setState] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  function handleChange(e) {
    setState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.length > 0) {
      if (user?.role === "superadmin") dispatch(getAllRestauranName(state));
      else {
        dispatch(searchByRestaurantByUser(state));
      }
      setState("");
    } else {
      sweetAlert("Restaurante no encontrado");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Inserta nombre"
        onChange={handleChange}
        value={state}
        onClick={(e) => e.key === "Enter" && handleSubmit(e)}
      />

      <button type="submit" onClick={handleSubmit}>
        <samp>Buscar</samp>
      </button>
    </div>
  );
}

export default Searchbar;
