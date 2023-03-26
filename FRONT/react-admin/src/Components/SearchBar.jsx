import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRestauranName } from "../Redux/Actions";

function Searchbar({ setSearchResults }) {
  const [state, setState] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setState(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (state.length > 1) {
      dispatch(getAllRestauranName(state)).then((response) => {
        setSearchResults(response.payload);
      });
      setState("");
    } else {
      alert("No está el restaurante");
    }
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Inserta nombre"
        onChange={handleChange}
        value={state}
        onKeyPress={(e) => e.key === "Enter" && handleSubmit(e)}
      />

      <button type="submit" onClick={handleSubmit}>
        <samp>Buscar</samp>
      </button>
    </div>
  );
}

export default Searchbar;