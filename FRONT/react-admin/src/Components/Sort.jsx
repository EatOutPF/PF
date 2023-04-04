import React from "react";
import {
  getAllRestaurants,
  orderByName,
  orderByPopularity,
} from "../Redux/Actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import style from "../Styles/General.module.css";

function Sort({ setOrder, setCurrentPage, resetFilter }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllRestaurants());
  }, [dispatch]);

  function handleSortByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${e.target.value}`);
  }

  function handleOrderByPopularity(event) {
    dispatch(orderByPopularity(event.target.value));
    setCurrentPage(1);
    setOrder(`Ordered ${event.target.value}`);
  }

  return (
    <div className={style.containerGeneral}>
      <h3>Ordenar</h3>
      <div>
        <select
          defaultValue={resetFilter}
          onChange={(e) => handleSortByName(e)}
          className="form-selected"
        >
          <option value="">Order by alphabetical</option>
          <option value="asc"> A to Z</option>
          <option value="desc"> Z to A</option>
        </select>
      </div>
      <div>
        <select
          defaultValue={resetFilter}
          onChange={(e) => handleOrderByPopularity(e)}
          className="form-selected"
        >
          <option value="">Order by ranking</option>
          <option value="max">Ascendent popularity</option>
          <option value="min">Descendent popularity</option>
        </select>
      </div>
    </div>
  );
}

export default Sort;
