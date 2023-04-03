import React from "react";
import { useDispatch } from "react-redux";
import { resetFilters, resetSearchResults } from "../Redux/Actions";

function ResetButton() {
  const dispatch = useDispatch();

  function handleReset() {
    dispatch(resetFilters());
    dispatch(resetSearchResults());
    
  }

  return (
    <button onClick={handleReset}>
      Restablecer
    </button>
  );
}

export default ResetButton;