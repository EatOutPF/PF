import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { deleteRestaurant } from "../../Redux/Actions";
import style from "./Card.module.css";
import { useDispatch, useSelector } from "react-redux";
import pen from "../../assets/boligrafo-rosa.png";
import papelera from "../../assets/papelera-de-reciclaje.png";
import recuperar from "../../assets/desarchivar.png";
import showReviews from "../../assets/customer-review.png";
import axios from "axios";
import sweetAlert from "sweetalert";

const Card = (props) => {
  const [openEdit, setOpen] = useState(false);
  const [closeEdit, setClose] = useState(true);
  const { message, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handlerClick = () => {
    setOpen(!openEdit);
    setClose(!closeEdit);
  };

  const handlerDelete = () => {
    dispatch(deleteRestaurant(props));
    console.log(message);

    if (message) {
      return props?.active
        ? sweetAlert("Se inactivó", message)
        : sweetAlert("Se activó", message);
    }
  };

  /* ------MERCADOPAGO-------- DEBER IR EN LA ACTION DE REDUX*/

  const handlerPayment = () => {
    axios
      .post("https://eatout.onrender.com/mercadopago", props)
      .then((res) => (window.location.href = res.data.response.init_point));
  };

  return (
    <>
      {props && (
        <tr key={props._id} className={!props.active ? style.disable : null}>
          <td>{props.name}</td>
          <td>{props.menu}</td>
          <td>{props?.diets?.map((d) => `${d} `)}</td>
          <td>
            {props.address?.streetName} - {props.address?.streetNumber}
          </td>
          <td>{props.address?.city}</td>
          <td>{props.address?.country}</td>
          <td>{props.balance}</td>
          <td>{props.ranking}</td>
          <td>{props.active ? "Activo" : "Inactivo"}</td>
          <td className={style.rows}>
            {props.active && user?.role === "admin" ? (
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
            )}

            <NavLink to={`/reviews/${props.id}`}>
              <button onClick={handlerClick} className={style.rowsInactive}>
                <div title="Ver Reviews">
                  <img src={showReviews} alt="reviews" />
                </div>
              </button>
            </NavLink>

            {user.role === "superadmin" && (
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
            )}

            {/* -----------MERCADOPAGO--------- */}
            {/* <button onClick={handlerPayment}> Pagar Reserva </button> */}
          </td>
        </tr>
      )}
    </>
  );
};

export default Card;
