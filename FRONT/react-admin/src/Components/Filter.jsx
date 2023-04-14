import React, { useEffect, useState } from "react";
import {
  getAllRestaurants,
  getFilterOptions,
  getAllRestaurantsByUser,
} from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import style from "../Styles/General.module.css";

function Filter({ resetFilter, setResetFilter }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState();
  const [currentPage, setCurrentPage] = useState();

  const user = useSelector((state) => state.user);
  const [selectedOptions, setSelectedOptions] = useState({});

  function onChangefilter(evt) {
    evt.preventDefault();
    setSelectedOptions({
      ...selectedOptions,
      [evt.target.name]: evt.target.value,
    });
  }

  useEffect(() => {
    dispatch(getFilterOptions(selectedOptions));
  }, [selectedOptions]);

  function handleClearFilter(evt) {
    evt.preventDefault();

    setResetFilter(!resetFilter);
    setCurrentPage(1);
    setOrder("");
    setSelectedOptions({
      diets: "",
      menu: "",
      active: "",
    });

    if (user.role === "superadmin") dispatch(getAllRestaurants());
    else {
      dispatch(getAllRestaurantsByUser(user));
    }
  }

  return (
    <div className={style.containerGeneral}>
      <h3>Filtrar </h3>
      <select
        defaultValue={resetFilter}
        onChange={onChangefilter}
        name="diets"
        className="form-selected"
      >
        <option value="">Filtrar por Dieta</option>
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
        onChange={onChangefilter}
        name="menu"
        className="form-selected"
      >
        <option value="">Filtrar por Menú</option>
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

      <select
        onChange={onChangefilter}
        name="active"
        className="form-selected"
        defaultValue="Filtrar por estado"
      >
        <option>Filtrar por estado</option>
        <option key="active" value="active">
          Active
        </option>
        <option key="inactive" value="inactive">
          Inactive
        </option>
      </select>
      <button onClick={handleClearFilter}>Borrar Filtros</button>
    </div>
  );
}

export default Filter;
