import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./Card.module.css";

const Card = (props) => {
  const [openEdit, setOpen] = useState(false);
  const [closeEdit, setClose] = useState(true);

  const handlerClick = () => {
    setOpen(!openEdit);
    setClose(!closeEdit);
  };

  return (
    <>
      <tr key={props._id}>
        <td>{props.name}</td>
        <td>{props.menu}</td>
        <td>{props.ranking}</td>
        <td>
          {props.address[0].streetName} - {props.address[0].streetNumber}
        </td>
        <td>{props.address[0].city}</td>
        <td>{props.address[0].country}</td>
        <td className={style.rows}>
          <NavLink to={`/modify/${props.id}`}>
            <button onClick={handlerClick}>editar</button>
          </NavLink>
          <button>borrar</button>
        </td>
      </tr>
    </>
  );
};

export default Card;