import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteRestaurant, getAllRestaurants } from "../../Redux/Actions";
import style from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import pen from "../../assets/boligrafo-rosa.png";
import papelera from "../../assets/papelera-de-reciclaje.png";
import recuperar from "../../assets/desarchivar.png";

const Card = (props) => {
  const [openEdit, setOpen] = useState(false);
  const [closeEdit, setClose] = useState(true);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handlerClick = () => {
    setOpen(!openEdit);
    setClose(!closeEdit);
  };

  const handlerDelete = () => {
    console.log(props);
    dispatch(deleteRestaurant(props));
    dispatch(getAllRestaurants());
    if (message) alert(message);
  };

  return (
    <>
      <tr key={props._id} className={!props.active ? style.disable : null}>
        <td>{props.name}</td>
        <td>{props.menu}</td>
        <td>{props.ranking}</td>
        <td>
          {props.address?.streetName} - {props.address?.streetNumber}
        </td>
        <td>{props.address?.city}</td>
        <td>{props.address?.country}</td>
        <td>{props.active ? "Activo" : "Inactivo"}</td>
        <td className={style.rows}>
          {props.active ? (
            <>
              {" "}
              <NavLink to={`/modify/${props.id}`}>
                <button onClick={handlerClick}>
                  <div title="editar">
                    <img src={pen} alt="editar" />
                  </div>
                </button>
              </NavLink>
            </>
          ) : (
            <></>
          )}

          <button
            onClick={handlerDelete}
            className={props.active ? style.rowsActive : style.rowsInactive}
          >
            {props.active ? (
              <>
                <div title="Desactivar">
                  <img src={papelera} alt="desactivar" />
                </div>
              </>
            ) : (
              <div title="Activar">
                <img src={recuperar} alt="desactivar" />
              </div>
            )}
          </button>
        </td>
      </tr>
    </>
  );
};

export default Card;
