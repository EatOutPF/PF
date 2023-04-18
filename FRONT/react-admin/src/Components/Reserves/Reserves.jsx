import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { findDetailRestaurant } from "../../Redux/Actions";
import Reserve from "../Reserve/Reserve";
import style from "./Reserves.module.css";

const Reserves = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detailRestaurant = useSelector((state) => state.detailRestaurant);

  useEffect(() => {
    dispatch(findDetailRestaurant(id));
  }, [id]);

  return (
    <div className={style.containerCards}>
      <NavLink to="/home" className={style.containerBack}>
        <button>Volver</button>
      </NavLink>
      <h1 style={{ marginBottom: 0 }}>Reservas restaurante </h1>
      <h2 style={{ marginTop: 0, textTransform: "uppercase" }}>
        {detailRestaurant.name}
      </h2>
      {!detailRestaurant?.reserve?.length > 0 ? (
        "Aún no hay reservas"
      ) : (
        <table>
          <thead className={style.containerThead}>
            <tr className={style.containerTitle}>
              <th>Id Usuario</th>
              <th>Nombre usuario</th>
              <th>email usuario</th>
              <th>telefono usuario</th>
              <th>Fecha </th>
              <th>Hora </th>
              <th>Mesa </th>
              <th>Pago Reserva</th>
              <th>Fecha de Pago</th>
            </tr>
          </thead>
          <tbody className={style.containerBodyTable}>
            {detailRestaurant.reserve?.map((rsv) => {
              return (
                <>
                  <Reserve
                    key={rsv._id}
                    id={rsv._id}
                    date={rsv.date}
                    time={rsv.time}
                    payment={rsv.payment}
                    table={rsv.table}
                    user={rsv.user}
                  />
                </>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reserves;
