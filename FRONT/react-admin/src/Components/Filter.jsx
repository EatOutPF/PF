import React, { useEffect, useState } from "react";
import {
  getAllRestaurants,
  getFilterOptions,
  getAllRestaurantsByUser,
} from "../Redux/Actions";
import { useDispatch, useSelector } from "react-redux";
import style from "../Styles/General.module.css";
import { FiFilter } from "react-icons/fi";
import { BiShow } from "react-icons/bi";

function Filter({ resetFilter, setResetFilter }) {
  const dispatch = useDispatch();
  const [order, setOrder] = useState();
  const [currentPage, setCurrentPage] = useState();

  const user = useSelector((state) => state.user);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [visibility, setVisibility] = useState(false);

  function onChangefilter(evt) {
    evt.preventDefault();
    setSelectedOptions({
      ...selectedOptions,
      [evt.target.name]: evt.target.value,
    });
  }

  const onChangeVisibility = () => {
    setVisibility(!visibility);
  };

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
    <div className={style.containerGeneral} style={{ gap: 20 }}>
      <div className={style.containerColumn}>
        <button onClick={onChangeVisibility} style={{ position: "relative" }}>
          <FiFilter size={15} style={{ alignSelf: "center" }} /> Filtrar{" "}
        </button>
        {visibility && (
          <div className={style.containerVisibility}>
            <select
              defaultValue={resetFilter}
              onChange={onChangefilter}
              name="diets"
              className="form-selected"
            >
              <option value="">Por Dieta</option>
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
              <option value="">Por Menú</option>
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
              <option>Por estado</option>
              <option key="active" value="active">
                Active
              </option>
              <option key="inactive" value="inactive">
                Inactive
              </option>
            </select>
          </div>
        )}
      </div>

      <button
        onClick={handleClearFilter}
        style={{ backgroundColor: "#282c34", padding: "8px 11px" }}
      >
        Mostrar todo
      </button>
    </div>
  );
}

export default Filter;
