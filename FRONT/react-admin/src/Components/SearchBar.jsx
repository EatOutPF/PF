import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRestauranName,
  searchByRestaurantByUser,
} from "../Redux/Actions";
import sweetAlert from "sweetalert";
import search from "../assets/lupa.png";
import styles from "../Styles/General.module.css";
import { BiSearchAlt } from "react-icons/bi";

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
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        padding: 5,
        flexGrow: 1,
      }}
    >
      <input
        type="text"
        placeholder="Inserta nombre"
        onChange={handleChange}
        value={state}
        onClick={(e) => e.key === "Enter" && handleSubmit(e)}
        className={styles.inputSearch}
      />

      <button type="submit" onClick={handleSubmit} className={styles.btnSearch}>
        {/*  <img src={search} alt="lupa" style={{ width: 20 }} /> */}
        <BiSearchAlt size={25} />
      </button>
    </div>
  );
}

export default Searchbar;
