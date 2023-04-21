import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./User.module.css";
import { useDispatch /* , useSelector */ } from "react-redux";
import pen from "../../assets/boligrafo-rosa.png";
import papelera from "../../assets/papelera-de-reciclaje.png";
import recuperar from "../../assets/desarchivar.png";
/* 
import sweetAlert from "sweetalert"; */
import { deleteUser /* , getAllUsers */ } from "../../Redux/Actions";
/* import { useEffect } from "react"; */
import Loading from "../Loading/Loading";

const User = (props) => {
  const [openEdit, setOpen] = useState(false);
  const [closeEdit, setClose] = useState(true);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handlerClick = () => {
    setOpen(!openEdit);
    setClose(!closeEdit);
  };

  const handlerDelete = () => {
    setLoading(true);

    if (props?.id) {
      dispatch(deleteUser(props));
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        props && (
          <tr key={props._id} className={!props.active ? style.disable : null}>
            <td style={{ textAlign: "initial" }}>{props.name}</td>
            <td style={{ textAlign: "initial" }}>{props.email}</td>
            <td>{props.role}</td>
            <td>{props.active ? "Activo" : "Inactivo"}</td>
            <td className={style.rows}>
              {props.active ? (
                <>
                  <NavLink to={`/modifyUser/${props.id}`}>
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

              {loading ? (
                <Loading />
              ) : (
                <>
                  <button
                    onClick={handlerDelete}
                    className={
                      props.active ? style.rowsActive : style.rowsInactive
                    }
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
                </>
              )}
            </td>
          </tr>
        )
      )}
    </>
  );
};

export default User;
