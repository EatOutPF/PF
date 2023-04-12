import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./User.module.css";
import { useDispatch, useSelector } from "react-redux";
import pen from "../../assets/boligrafo-rosa.png";
import papelera from "../../assets/papelera-de-reciclaje.png";
import recuperar from "../../assets/desarchivar.png";

import sweetAlert from "sweetalert";
import { deleteUser, getAllUsers } from "../../Redux/Actions";

const User = (props) => {
  const [openEdit, setOpen] = useState(false);
  const [closeEdit, setClose] = useState(true);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const handlerClick = () => {
    setOpen(!openEdit);
    setClose(!closeEdit);
  };

  const handlerDelete = () => {
    if (props?.id) {
      dispatch(deleteUser(props));
      return props.active
        ? sweetAlert(
            "Se inactivó",
            `Se ha deshabilitado el Usuario ${props.name}`
          )
        : sweetAlert("Se activó", `Se ha habilitado el Usuario ${props.name}`);
    }
  };

  return (
    <>
      {props && (
        <tr key={props._id} className={!props.active ? style.disable : null}>
          <td style={{ textAlign: "initial" }}>{props.name}</td>
          <td style={{ textAlign: "initial" }}>{props.email}</td>
          <td>{props.role}</td>
          <td>{props.active ? "Activo" : "Inactivo"}</td>
          <td className={style.rows}>
            {/* ESTO SE DESCOMENTA CUANDO SE HAGA LA FUNCION DE MODIFICAR USUARIO */}
            {/* {props.active ? (
              <>
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
            )} */}

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
      )}
    </>
  );
};

export default User;
