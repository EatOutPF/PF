import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { findDetailRestaurant } from "../../Redux/Actions";
import style from "./Reviews.module.css";

const Reviews = (props) => {
  const { id } = useParams();
  const { detailRestaurant } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findDetailRestaurant(id));
  }, [id]);

  return (
    <div className={style.containerCards}>
      <NavLink to="/home" className={style.containerBack}>
        <button>Volver</button>
      </NavLink>
      <h1>Calificaciones Restaurante {detailRestaurant?.name}</h1>
      {detailRestaurant && (
        <table>
          <thead className={style.containerThead}>
            <tr className={style.containerTitle}>
              <th>Review</th>
              <th>Puntaje</th>
            </tr>
          </thead>
          <tbody className={style.containerBodyTable}>
            {detailRestaurant?.review?.map((r) => {
              <>
                <td>{r.review}</td>
                <td>{r.score}</td>
              </>;
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Reviews;
