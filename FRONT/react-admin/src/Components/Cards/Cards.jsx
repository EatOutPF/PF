import React from "react";
import Card from "../Card/Card";
import style from "./Cards.module.css";

const Cards = ({ currentRestaurants }) => {
  return (
    <div className={style.containerCards}>
      {!currentRestaurants?.length > 0 ? (
        <div>No se encontraron resultados</div>
      ) : (
        <table>
          <thead className={style.containerThead}>
            <tr className={style.containerTitle}>
              <th>Restaurante</th>
              <th>Tipo Comida</th>
              <th>Cuenta con</th>
              <th>Dirección</th>
              <th>Ciudad</th>
              <th>País</th>
              <th>Saldo Actual</th>
              <th>Puntuación</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className={style.containerBodyTable}>
            {currentRestaurants?.map(
              (r) =>
                r && (
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
                    advance={r.advance ? r.advance : 0}
                    balance={r.balance ? r.balance : 0}
                  />
                )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Cards;
