import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  findDetailRestaurant,
  getAllRestaurants,
  modifyRestaurant,
} from "../../Redux/Actions";
import style from "./ModifyRestaurant.module.css";

const ModifyRestaurant = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { detailRestaurant } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [input, setInput] = useState(detailRestaurant);

  const handlerChange = (e) => {
    const { name, value } = e.target;
    console.log({ name, value });
    setInput({ ...input, [name]: value });
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    if (detailRestaurant) {
      dispatch(modifyRestaurant(input));
      dispatch(getAllRestaurants());
    }
  };

  useEffect(() => {
    dispatch(findDetailRestaurant(id));
    console.log(input);
  }, [id]);

  useEffect(() => {
    if (detailRestaurant) {
      setInput(detailRestaurant);
    }
  }, [detailRestaurant]);

  return (
    <div>
      {input && (
        <div>
          <NavLink to="/home">
            <button>Cerrar</button>
          </NavLink>

          <form onSubmit={handlerSubmit}>
            <label htmlFor="name">Restaurante</label>
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handlerChange}
            />
            <label htmlFor="menu">Menú</label>
            <input
              type="text"
              id="menu"
              name="menu"
              value={input.menu}
              onChange={handlerChange}
            />
            <label htmlFor="streetName">Nombre de la calle</label>
            <input
              type="text"
              id="streetName"
              name="address.streetName"
              value={!input.address ? "" : input.address[0]?.streetName}
              onChange={handlerChange}
            />
            <label htmlFor="streetNumber">Numero de Calle</label>
            <input
              type="number"
              id="streetNumber"
              name="address.streetNumber"
              value={!input.address ? 0 : input.address[0]?.streetNumber}
              onChange={handlerChange}
            />
            <label htmlFor="city">Ciudad</label>
            <input
              type="text"
              id="city"
              name="address.city"
              value={!input.address ? "" : input.address[0].city}
              onChange={handlerChange}
            />
            <label htmlFor="country">Pais</label>
            <input
              type="text"
              id="country"
              name="country"
              value={!input.address ? "" : input.address[0].country}
              onChange={handlerChange}
            />
            <label htmlFor="tables">Pais</label>
            <input
              type="text"
              id="tables"
              name="tables"
              value={input.tables}
              onChange={handlerChange}
            />
            <button>Guardar</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ModifyRestaurant;
