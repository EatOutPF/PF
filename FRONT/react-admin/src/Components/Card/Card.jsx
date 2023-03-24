import React from "react";
import style from "./Card.module.css";

const Card = (props) => {
  return (
    <div>
      <tr key={props.key}>
        <td>{props.name}</td>
        <td>{props.menu}</td>
        <td>{props.ranking}</td>
        <td>
          {props.address.streetName} - {props.address.streetNumber}
        </td>
        <td>{props.address.city}</td>
        <td>{props.address.country}</td>
        <td>
          <button>editar</button>
          <button>borrar</button>
        </td>
      </tr>
    </div>
  );
};

export default Card;
