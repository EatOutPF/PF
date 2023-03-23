import React, { useEffect } from "react";
import Card from "./Card/Card";
import { useSelector } from "react-redux";

const Cards = () => {
  const currentListRestaurants = useSelector(
    (state) => state.currentListRestaurants
  );

  useEffect(() => {
    console.log(currentListRestaurants);
  });

  return (
    <div>
      {!currentListRestaurants?.length ? (
        <div>No se encontraron resultados</div>
      ) : (
        <table>
          <tr>
            <th>Restaurante</th>
            <th>Comida</th>
            <th>Puntuación</th>
            <th>Dirección</th>
            <th>Ciudad</th>
            <th>País</th>
            <th> </th>
          </tr>
          {currentListRestaurants.map((r) => {
            return (
              <Card
                key={r._id}
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
        </table>
      )}
    </div>
  );
};

export default Cards;
