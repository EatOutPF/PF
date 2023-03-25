import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findDetailRestaurant, modifyRestaurant } from "../../Redux/Actions";
import style from "./ModifyRestaurant.module.css";

const ModifyRestaurant = ({ openEdit, closeEdit, id }) => {
  const { detailRestaurant, allRestaurants } = useSelector((state) => state);
  const dispatch = useDispatch();

  const detail = allRestaurants.find((r) => r._id === id);

  const [input, setInput] = useState(
    detail
    //OJO QUITAR ESTO CUANDO HAGAN LA RUTA
  );

  useEffect(() => {
    console.log(input);
  });

  const handlerChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (detail) {
      dispatch(modifyRestaurant(input, allRestaurants));
    }
  };

  /*   useEffect(() => {
    dispatch(findDetailRestaurant(id));
  }, [id]);*/

  /* useEffect(() => {
    if (detail) setInput(detailRestaurant);
  }, [detail]); */

  return (
    <div
      className={openEdit ? style.modalOpen : style.modal}
      onClick={closeEdit}
    >
      <button>Cerrar</button>

      <form onSubmit={handlerSubmit}>
        <label htmlFor="name"></label>
        <input
          type="text"
          id="name"
          value={input.name}
          onChange={handlerChange}
        />
        <label htmlFor="menu"></label>
        <input
          type="text"
          id="menu"
          value={input.menu}
          onChange={handlerChange}
        />
        <label htmlFor="streetName"></label>
        <input
          type="text"
          id="streetName"
          value={input.address[0].streetName}
          onChange={handlerChange}
        />
        <label htmlFor="streetNumber"></label>
        <input
          type="text"
          id="streetNumber"
          value={input.address[0].streetNumber}
          onChange={handlerChange}
        />
        <label htmlFor="city"></label>
        <input
          type="text"
          id="city"
          value={input.address[0].city}
          onChange={handlerChange}
        />
        <label htmlFor="country"></label>
        <input
          type="text"
          id="country"
          value={input.address[0].country}
          onChange={handlerChange}
        />
        <button>Guardar</button>
      </form>
    </div>
  );
};

export default ModifyRestaurant;
