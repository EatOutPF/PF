import React, { useEffect } from "react";
import Card from '../Card/Card'
import { useSelector } from "react-redux";
import style from "./Cards.module.css";
const Cards = ({ currentRestaurants }) => {
  useEffect(() => {
    console.log(currentRestaurants);
  });

  return (
    <div  className={style.containerCards}>
      {!currentRestaurants?.length ? (
        <div>No se encontraron resultados</div>
      ) : (
        <table>
          <thead>
            <tr  className={style.containerTitle}>
              <th>Restaurante</th>
              <th>Comida</th>
              <th>Puntuación</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>País</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {currentRestaurants.map((r) => {
              return (
                <Card
                  key={r._id}
                  id={r._id}
                  name={r.name}
                  address={r.address}
                  contact={r.contact}
                  tables={r.tables}
                  schedule={r.schedule}
                  menu={r.menu}
                  diets={r.diets}
                  atmosphere={r.atmosphere}
                  extras={r.extras}
                  ranking={r.ranking}
                  active={r.active}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cards;